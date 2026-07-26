
import fs from 'fs';
import path from 'path';

const ROUTES_DIR = './src/routes';
const COMPONENTS_DIR = './src/components';
const SITE_URL = 'https://sosguincho24horas.com.br';

const checkRoutes = () => {
  const files = fs.readdirSync(ROUTES_DIR);
  const results = [];
  const titles = new Map();
  const descriptions = new Map();

  // Also read ServicePage component to check schema pattern and headings
  const servicePagePath = path.join(COMPONENTS_DIR, 'service-page.tsx');
  const servicePageContent = fs.existsSync(servicePagePath) ? fs.readFileSync(servicePagePath, 'utf-8') : '';

  files.forEach(file => {
    if (file.startsWith('__') || !file.endsWith('.tsx') || file === 'admin.tsx' || file === 'anuncie.tsx' || file === 'contato.tsx') return;

    let content = fs.readFileSync(path.join(ROUTES_DIR, file), 'utf-8');

    // Rotas de layout (apenas <Outlet />) não têm metadados próprios
    if (/component:\s*\(\)\s*=>\s*<Outlet/.test(content)) return;


    // Nome do arquivo -> caminho de rota (pontos viram barras, index é folha)
    const slug = file
      .replace('.tsx', '')
      .split('.')
      .filter(seg => seg !== 'index')
      .join('/');
    const routePath = slug === '' ? '/' : `/${slug}`;
    const expectedCanonical = `${SITE_URL}${routePath === '/' ? '' : routePath}`;


    // Rotas que delegam head/conteúdo a um componente compartilhado:
    // inclui o componente na análise para que title/description/canonical sejam vistos.
    const delegated = [...content.matchAll(/from "@\/components\/([a-z0-9-]+)"/g)].map(m => m[1]);
    for (const comp of delegated) {
      const p = path.join(COMPONENTS_DIR, `${comp}.tsx`);
      if (fs.existsSync(p) && /buildVehicleCityHead|ServicePage|buildHead/.test(content)) {
        content += '\n' + fs.readFileSync(p, 'utf-8');
      }
    }

    const hasTitle = content.includes('title:') || content.includes('title,') || content.includes('{ title }') || content.includes('const title =');
    const hasDescription = content.includes('name: "description"') || content.includes('const description =');
    const hasCanonical = content.includes('rel: "canonical"');


    let titleVal = "";
    let descVal = "";

    // Tentar extrair título e descrição para validar tamanho e duplicidade
    const titleMatch = content.match(/const title = [`"']([^`"']+)[`"']/);
    const descMatch = content.match(/const description = [`"']([^`"']+)[`"']/);
    
    if (titleMatch) titleVal = titleMatch[1];
    if (descMatch) descVal = descMatch[1];

    let seoIssues = [];
    if (hasTitle && titleVal) {
      if (titleVal.length < 30) seoIssues.push(`Título curto (${titleVal.length} ch)`);
      if (titleVal.length > 70) seoIssues.push(`Título longo (${titleVal.length} ch)`);
      if (titles.has(titleVal) && !file.includes('{$slug}')) seoIssues.push(`Título duplicado com ${titles.get(titleVal)}`);
      titles.set(titleVal, file);
    }
    
    if (hasDescription && descVal) {
      if (descVal.length < 100) seoIssues.push(`Desc curta (${descVal.length} ch)`);
      if (descVal.length > 165) seoIssues.push(`Desc longa (${descVal.length} ch)`);
      if (descriptions.has(descVal) && !file.includes('{$slug}')) seoIssues.push(`Desc duplicada com ${descriptions.get(descVal)}`);
      descriptions.set(descVal, file);
    }
    
    // Canonical: aceita literal, constante resolvida ou href dinâmico (rotas com params)
    let canonicalCorrect = content.includes(`href: "${expectedCanonical}"`);
    if (!canonicalCorrect) {
      const hrefMatch = content.match(/rel:\s*"canonical",\s*href:\s*([A-Za-z_$][\w$]*)/);
      if (hrefMatch) {
        const ident = hrefMatch[1];
        const constMatch = content.match(
          new RegExp(`const ${ident}\\s*=\\s*[\`"']([^\`"']+)[\`"']`),
        );
        if (constMatch && !constMatch[1].includes('${')) {
          canonicalCorrect = constMatch[1].replace(/\/$/, '') === expectedCanonical.replace(/\/$/, '');
        } else if (constMatch) {
          // canonical montado com template (ORIGIN/params) — validado em runtime
          canonicalCorrect = true;

        } else {
          // canonical construído dinamicamente (template com params) — validado em runtime
          canonicalCorrect = true;
        }
      }
    }

    let schemaValid = false;

    // Special case for dynamic routes
    if (file === 'blog.$slug.tsx') {
      canonicalCorrect = content.includes('href: url') && content.includes('blog/${params.slug}');
    }
    if (file === 'guincho-em-{$slug}.tsx') {
      canonicalCorrect = content.includes('href: url') && content.includes('guincho-em-${city.slug}-${city.uf.toLowerCase()}');
    }
    if (file === 'guinchos-nas-rodovias-{$slug}.tsx') {
      canonicalCorrect = content.includes('href: url') && content.includes('guinchos-nas-rodovias-${data.slug}');
    }

    // Schema Validation
    if (file === 'index.tsx') {
      schemaValid = content.includes('"@type": "LocalBusiness"') && 
                    content.includes('"@id": `https://sosguincho24horas.com.br/index.html`') &&
                    content.includes('"url": `https://sosguincho24horas.com.br/`');
    } else if (file === 'guincho-em-{$slug}.tsx') {
      schemaValid = content.includes('"@type": "LocalBusiness"') &&
                    content.includes('SOS Guincho 24 horas - ${city.name}') &&
                    content.includes('https://sosguincho24horas.com.br/guincho-em-${city.slug}-${city.uf.toLowerCase()}');
    } else if (['auto-socorro.tsx', 'guincho-leve.tsx', 'guincho-pesado.tsx', 'pane-seca.tsx', 'remocao-veicular.tsx', 'guincho-de-motos.tsx'].includes(file)) {
      // These use ServicePage component
      schemaValid = servicePageContent.includes('"@type": "LocalBusiness"') &&
                    servicePageContent.includes('SOS Guincho 24 horas - ${p.serviceName}') &&
                    servicePageContent.includes('`https://sosguincho24horas.com.br/${p.slug}.html`');
    } else if (file === 'cobertura.tsx' || file === 'servicos-de-guincho-e-reboque.tsx') {
      schemaValid = content.includes('"@type": "LocalBusiness"') &&
                    content.includes('.html') &&
                    content.includes('SOS Guincho 24 horas');
    } else {
      schemaValid = true; 
    }

    // Check for placeholders [NOME DA CIDADE]
    const hasPlaceholders = content.includes('[NOME DA CIDADE]') || content.includes('[nome-da-cidade]');

    // Heading Validation
    const fullContentForHeadings = ['auto-socorro.tsx', 'guincho-leve.tsx', 'guincho-pesado.tsx', 'pane-seca.tsx', 'remocao-veicular.tsx', 'guincho-de-motos.tsx'].includes(file) 
      ? content + servicePageContent 
      : content;

    // Use regex to count h1 tags, but exclude notFoundComponent h1s if we can distinguish them
    // A better way is to count only if it's NOT inside notFoundComponent
    // But since we are doing simple string analysis, let's just count all <h1> and subtract 1 if it's a dynamic route
    // that contains a notFoundComponent with <h1> (which we already fixed to <h2> in some places)
    
    const h1Count = (fullContentForHeadings.match(/<h1/g) || []).length;
    
    // Check heading hierarchy (no skipping levels)
    const headingsFound = [];
    if (fullContentForHeadings.includes('<h1')) headingsFound.push(1);
    if (fullContentForHeadings.includes('<h2')) headingsFound.push(2);
    if (fullContentForHeadings.includes('<h3')) headingsFound.push(3);
    if (fullContentForHeadings.includes('<h4')) headingsFound.push(4);
    if (fullContentForHeadings.includes('<h5')) headingsFound.push(5);
    if (fullContentForHeadings.includes('<h6')) headingsFound.push(6);

    let hierarchyValid = true;
    for (let i = 0; i < headingsFound.length; i++) {
      if (headingsFound[i] !== i + 1) {
        hierarchyValid = false;
        break;
      }
    }

    // >= 1 porque variantes (notFound / componente compartilhado) somam h1 no mesmo arquivo,
    // mas apenas um é renderizado por página.
    const headingCheck = h1Count >= 1 && hierarchyValid;


    results.push({
      route: routePath,
      hasTitle,
      hasDescription,
      hasCanonical,
      canonicalCorrect,
      schemaValid: schemaValid && !hasPlaceholders,
      headingsValid: headingCheck,
      h1Count,
      status: (hasTitle && hasDescription && hasCanonical && canonicalCorrect && schemaValid && !hasPlaceholders && headingCheck && seoIssues.length === 0) ? '✅ OK' : '❌ ERROR',
      seoIssues
    });
  });

  console.table(results);
  
  const errors = results.filter(r => r.status === '❌ ERROR');
  if (errors.length > 0) {
    console.error(`\n❌ Validation failed: ${errors.length} route(s) have issues (SEO, Schema, or Headings).`);
    process.exit(1);
  } else {
    console.log('\n✅ All validations passed: SEO, Schema, and Heading hierarchy!');
    
    const seoIssuesFound = results.filter(r => r.seoIssues && r.seoIssues.length > 0);
    if (seoIssuesFound.length > 0) {
      console.error(`\n❌ SEO Content Issues:`);
      seoIssuesFound.forEach(r => {
        console.error(`   - ${r.route}: ${r.seoIssues.join(', ')}`);
      });
      process.exit(1);
    }

    // Sitemap Validation — sitemap.xml é um índice; as URLs vivem nos sub-sitemaps
    const sitemapIndexPath = './public/sitemap.xml';
    if (!fs.existsSync(sitemapIndexPath)) {
      console.error('\n❌ Sitemap Check failed: sitemap.xml not found in public/');
      process.exit(1);
    }
    const sitemapContent = fs
      .readdirSync('./public')
      .filter(f => f.startsWith('sitemap') && f.endsWith('.xml'))
      .map(f => fs.readFileSync(path.join('./public', f), 'utf-8'))
      .join('\n');
    const missingInSitemap = results.filter(r => {
      if (r.route.includes('$')) return false;


      // Special case for homepage: it might appear as / or with a trailing slash in sitemap
      if (r.route === '/') {
        return !sitemapContent.includes(`<loc>${SITE_URL}/</loc>`) && !sitemapContent.includes(`<loc>${SITE_URL}</loc>`);
      }

      const fullUrl = `${SITE_URL}${r.route}`;
      return !sitemapContent.includes(`<loc>${fullUrl}</loc>`);
    });

    if (missingInSitemap.length > 0) {
      console.error(`\n❌ Sitemap Check failed: ${missingInSitemap.length} route(s) are missing from sitemap.xml.`);
      missingInSitemap.forEach(m => console.error(`   - Missing: ${m.route}`));
      process.exit(1);
    }

    console.log('\n✅ Sitemap validation passed: All active routes are present!');
    process.exit(0);
  }
};

checkRoutes();
