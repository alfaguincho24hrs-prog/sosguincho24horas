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
      !['admin.tsx', 'anuncie.tsx', 'servicos-de-guincho-e-reboque.tsx'].includes(file) // Omit duplicate service route if needed
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

const generateSitemap = (routes) => {
  const now = new Date().toISOString().split('T')[0];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
routes.map(route => '  <url>\n' +
'    <loc>' + SITE_URL + route + '</loc>\n' +
'    <lastmod>' + now + '</lastmod>\n' +
'    <changefreq>' + (route === '/' ? 'daily' : 'weekly') + '</changefreq>\n' +
'    <priority>' + (route === '/' ? '1.0' : route.includes('guincho-em') ? '0.8' : '0.6') + '</priority>\n' +
'  </url>').join('\n') +
'\n</urlset>';
  
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public', { recursive: true });
  }
  
  fs.writeFileSync('./public/sitemap.xml', xml);
  console.log('✅ Sitemap generated with ' + routes.length + ' routes.');
};

const generateRobots = () => {
  const content = 'User-agent: *\n' +
'Allow: /\n' +
'\n' +
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
