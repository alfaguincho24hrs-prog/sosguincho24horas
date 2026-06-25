import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://sosguincho24horas.com.br';
const ROUTES_DIR = './src/routes';

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getStaticRoutes = () => {
  if (!fs.existsSync(ROUTES_DIR)) return ['/'];
  const files = fs.readdirSync(ROUTES_DIR);
  return files
    .filter(file => 
      !file.startsWith('__') && 
      file.endsWith('.tsx') && 
      !file.includes('$slug') && 
      !file.includes('{$slug}') &&
      !['admin.tsx', 'anuncie.tsx'].includes(file)
    )
    .map(file => {
      const slug = file.replace('.tsx', '');
      return slug === 'index' ? '/' : `/${slug}`;
    });
};

const getDynamicRoutes = () => {
  const citiesDataPath = './src/components/cities-data.ts';
  if (!fs.existsSync(citiesDataPath)) return [];
  
  const citiesDataContent = fs.readFileSync(citiesDataPath, 'utf-8');
  
  const cityRegex = /\[\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\]/g;
  const cities = [];
  let match;
  
  while ((match = cityRegex.exec(citiesDataContent)) !== null) {
    const name = match[1];
    const uf = match[2];
    const slug = slugify(name);
    cities.push({ name, uf, slug });
  }

  const blogRoutes = [];
  const blogDataPath = './src/components/blog-data.ts';
  if (fs.existsSync(blogDataPath)) {
    const blogDataContent = fs.readFileSync(blogDataPath, 'utf-8');
    const blogSlugRegex = /slug:\s*"([^"]+)"/g;
    let blogMatch;
    while ((blogMatch = blogSlugRegex.exec(blogDataContent)) !== null) {
      blogRoutes.push('/blog/' + blogMatch[1]);
    }
  }

  const highwayRoutes = [];
  const highwayDataPath = './src/routes/guinchos-nas-rodovias-{$slug}.tsx';
  if (fs.existsSync(highwayDataPath)) {
    const highwayDataContent = fs.readFileSync(highwayDataPath, 'utf-8');
    const highwaySlugRegex = /"([^"]+)":\s*{/g;
    let highwayMatch;
    // Pula o primeiro match que geralmente é HIGHWAYS_DATA = {
    while ((highwayMatch = highwaySlugRegex.exec(highwayDataContent)) !== null) {
      if (highwayMatch[1] !== 'name' && highwayMatch[1] !== 'slug' && highwayMatch[1] !== 'sigla' && highwayMatch[1] !== 'region') {
        highwayRoutes.push('/guinchos-nas-rodovias-' + highwayMatch[1]);
      }
    }
  }

  const uniqueCities = Array.from(new Map(cities.map(c => [c.slug + '-' + c.uf, c])).values());

  return [
    ...uniqueCities.map(city => '/guincho-em-' + city.slug + '-' + city.uf.toLowerCase()),
    ...blogRoutes,
    ...highwayRoutes
  ];
};

const buildUrlEntry = (route, { changefreq, priority, now }) =>
  '  <url>\n' +
  '    <loc>' + SITE_URL + route + '</loc>\n' +
  '    <lastmod>' + now + '</lastmod>\n' +
  '    <changefreq>' + changefreq + '</changefreq>\n' +
  '    <priority>' + priority + '</priority>\n' +
  '  </url>';

const writeUrlset = (filename, routes, defaults) => {
  const now = new Date().toISOString().split('T')[0];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routes.map(r => buildUrlEntry(r.path, {
      changefreq: r.changefreq || defaults.changefreq,
      priority: r.priority || defaults.priority,
      now,
    })).join('\n') +
    '\n</urlset>';
  fs.writeFileSync('./public/' + filename, xml);
  console.log('✅ ' + filename + ': ' + routes.length + ' URLs.');
};

// Tier de prioridade para melhor uso do crawl budget:
// - capitais e cidades-âncora SP recebem priority alta + changefreq daily
// - demais cidades SP recebem priority média
// - cidades fora de SP recebem priority padrão
const TOP_TIER_CITY_SLUGS = new Set([
  'sao-paulo','guarulhos','campinas','santos','sao-bernardo-do-campo','santo-andre','sao-caetano-do-sul',
  'diadema','osasco','ribeirao-preto','sorocaba','sao-jose-dos-campos','taubate','jacarei','pindamonhangaba',
  'rio-de-janeiro','belo-horizonte','curitiba','porto-alegre','brasilia','salvador','recife','fortaleza'
]);

const classifyCityRoute = (route) => {
  // route shape: /guincho-em-<slug>-<uf>
  const m = route.match(/^\/guincho-em-(.+)-([a-z]{2})$/);
  if (!m) return { priority: '0.7', changefreq: 'weekly' };
  const [, slug, uf] = m;
  if (TOP_TIER_CITY_SLUGS.has(slug)) return { priority: '0.9', changefreq: 'daily' };
  if (uf === 'sp') return { priority: '0.8', changefreq: 'weekly' };
  return { priority: '0.6', changefreq: 'monthly' };
};

const generateSitemap = (allRoutes) => {
  if (!fs.existsSync('./public')) fs.mkdirSync('./public', { recursive: true });

  const staticRoutes = allRoutes
    .filter(r => !r.startsWith('/guincho-em-') && !r.startsWith('/guinchos-nas-rodovias-') && !r.startsWith('/blog/'))
    .map(path => ({
      path,
      priority: path === '/' ? '1.0' : '0.7',
      changefreq: path === '/' ? 'daily' : 'monthly',
    }));

  const cityRoutes = allRoutes
    .filter(r => r.startsWith('/guincho-em-'))
    .map(path => ({ path, ...classifyCityRoute(path) }));

  const highwayRoutes = allRoutes
    .filter(r => r.startsWith('/guinchos-nas-rodovias-'))
    .map(path => ({ path, priority: '0.8', changefreq: 'weekly' }));

  const blogRoutes = allRoutes
    .filter(r => r.startsWith('/blog/'))
    .map(path => ({ path, priority: '0.6', changefreq: 'monthly' }));

  writeUrlset('sitemap-static.xml', staticRoutes, { priority: '0.7', changefreq: 'monthly' });
  writeUrlset('sitemap-cities.xml', cityRoutes, { priority: '0.8', changefreq: 'weekly' });
  writeUrlset('sitemap-highways.xml', highwayRoutes, { priority: '0.8', changefreq: 'weekly' });
  writeUrlset('sitemap-blog.xml', blogRoutes, { priority: '0.6', changefreq: 'monthly' });

  // Sitemap index agregador
  const now = new Date().toISOString();
  const indexXml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ['sitemap-static.xml','sitemap-cities.xml','sitemap-highways.xml','sitemap-blog.xml']
      .map(name => '  <sitemap>\n    <loc>' + SITE_URL + '/' + name + '</loc>\n    <lastmod>' + now + '</lastmod>\n  </sitemap>')
      .join('\n') +
    '\n</sitemapindex>';

  // Mantemos sitemap.xml como índice E também como urlset completo (compat com check-seo.mjs)
  // Estratégia: sitemap.xml = urlset plano (validação interna), sitemap-index.xml = índice (Google)
  const flatRoutes = [
    ...staticRoutes,
    ...cityRoutes,
    ...highwayRoutes,
    ...blogRoutes,
  ];
  writeUrlset('sitemap.xml', flatRoutes, { priority: '0.7', changefreq: 'weekly' });
  fs.writeFileSync('./public/sitemap-index.xml', indexXml);
  console.log('✅ sitemap-index.xml gerado (4 sub-sitemaps).');
};

const generateRobots = () => {
  const content =
    'User-agent: *\n' +
    'Allow: /\n' +
    'Allow: /guincho-em-\n' +
    'Allow: /guinchos-nas-rodovias-\n' +
    'Allow: /blog/\n' +
    'Disallow: /admin\n' +
    'Disallow: /lovable/\n' +
    '\n' +
    '# Googlebot — prioridade nas páginas de cidade (SP) e rodovias\n' +
    'User-agent: Googlebot\n' +
    'Allow: /\n' +
    'Allow: /guincho-em-\n' +
    'Allow: /guinchos-nas-rodovias-\n' +
    'Disallow: /admin\n' +
    '\n' +
    'Sitemap: ' + SITE_URL + '/sitemap-index.xml\n' +
    'Sitemap: ' + SITE_URL + '/sitemap.xml\n';
  fs.writeFileSync('./public/robots.txt', content);
  console.log('✅ robots.txt generated.');
};


const run = () => {
  const staticRoutes = getStaticRoutes();
  const dynamicRoutes = getDynamicRoutes();
  const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])];
  
  generateSitemap(allRoutes);
  generateRobots();

  if (dynamicRoutes.length < 100) {
    console.warn('⚠️ Warning: Few dynamic routes found. Check cities-data.ts parsing.');
  }
};

run();
