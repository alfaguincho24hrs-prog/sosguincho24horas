// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const SITE_URL = "https://sosguincho24horas.com.br";

const STATIC_ROUTES = [
  "/",
  "/servicos",
  "/cobertura",
  "/areas-atendidas",
  "/contato",
  "/blog",
  "/frota-guincho",
  "/servicos-de-guincho-e-reboque",
  "/rodovias-vale-do-paraiba",
  "/guincho-leve",
  "/guincho-pesado",
  "/guincho-de-motos",
  "/auto-socorro",
  "/pane-seca",
  "/remocao-veicular",
  "/guincho-postos-dutra-sao-jose-dos-campos",
  "/guincho-sjc",
];

const HIGHWAY_SLUGS = [
  "marginal-tiete",
  "marginal-tiete-norte",
  "marginal-tiete-leste",
  "rodovia-castelo-branco",
  "rodovia-fernao-dias",
  "rodovia-presidente-dutra",
  "rodovia-carvalho-pinto",
  "rodovia-dos-imigrantes",
  "rodovia-anchieta",
  "rodovia-anhanguera",
  "rodoanel-mario-covas",
  "rodovia-ayrton-senna",
  "rodovia-raposo-tavares",
  "rodovia-dos-bandeirantes",
  "marginal-pinheiros",
  "marginal-pinheiros-sul",
  "marginal-pinheiros-oeste",
];

const VEHICLE_TYPES = ["carro", "moto", "caminhao", "transporte-de-veiculos"];

type Entry = { path: string; changefreq: string; priority: string };

const urlsetXml = (entries: Entry[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries
    .map(
      (e) =>
        `  <url><loc>${SITE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

function generateSeoFiles(): Plugin {
  const generate = async () => {
    // Dynamic imports so the SSR/edge bundle doesn't pull in these data modules
    const { ALL_CITIES } = await import("./src/components/cities-data");
    const { BLOG_POSTS } = await import("./src/components/blog-data");
    const { SJC_BAIRROS } = await import("./src/lib/sjc-bairros");

    const statics: Entry[] = STATIC_ROUTES.map((path) => ({
      path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? "1.0" : "0.8",
    }));

    const cities: Entry[] = [];
    const vehicles: Entry[] = [];
    for (const c of ALL_CITIES) {
      const slug = `${c.slug}-${c.uf.toLowerCase()}`;
      const isSP = c.uf.toUpperCase() === "SP";
      cities.push({
        path: `/guincho-em-${slug}`,
        changefreq: isSP ? "weekly" : "monthly",
        priority: isSP ? "0.9" : "0.6",
      });
      for (const tipo of VEHICLE_TYPES) {
        vehicles.push({
          path: `/guincho-${tipo}-em-${slug}`,
          changefreq: isSP ? "weekly" : "monthly",
          priority: isSP ? "0.7" : "0.5",
        });
      }
    }

    const highways: Entry[] = HIGHWAY_SLUGS.map((slug) => ({
      path: `/guinchos-nas-rodovias-${slug}`,
      changefreq: "monthly",
      priority: "0.8",
    }));

    const blog: Entry[] = (BLOG_POSTS ?? []).map((p: { slug: string }) => ({
      path: `/blog/${p.slug}`,
      changefreq: "monthly",
      priority: "0.6",
    }));

    const sjc: Entry[] = [];
    for (const b of SJC_BAIRROS) {
      sjc.push({ path: `/guincho-sjc/${b.slug}`, changefreq: "weekly", priority: "0.8" });
      for (const tipo of VEHICLE_TYPES) {
        sjc.push({
          path: `/guincho-${tipo}-sjc/${b.slug}`,
          changefreq: "weekly",
          priority: "0.7",
        });
      }
    }
    for (const tipo of VEHICLE_TYPES) {
      sjc.push({ path: `/guincho-${tipo}-sjc`, changefreq: "weekly", priority: "0.8" });
    }

    const files: Array<[string, Entry[]]> = [
      ["sitemap-static.xml", statics],
      ["sitemap-cities.xml", cities],
      ["sitemap-veiculos.xml", vehicles],
      ["sitemap-highways.xml", highways],
      ["sitemap-sjc.xml", sjc],
      ["sitemap-blog.xml", blog],
    ];

    const dir = resolve(process.cwd(), "public");
    mkdirSync(dir, { recursive: true });

    for (const [name, entries] of files) {
      writeFileSync(resolve(dir, name), urlsetXml(entries), "utf-8");
    }

    // sitemap.xml — índice apontando para os sub-sitemaps (padrão lido pelo Google)
    const indexXml =
      `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      files.map(([name]) => `  <sitemap><loc>${SITE_URL}/${name}</loc></sitemap>`).join("\n") +
      `\n</sitemapindex>\n`;
    writeFileSync(resolve(dir, "sitemap.xml"), indexXml, "utf-8");
    writeFileSync(resolve(dir, "sitemap-index.xml"), indexXml, "utf-8");

    const robots = [
      `User-agent: *`,
      `Allow: /`,
      `Allow: /guincho-em-`,
      `Allow: /guincho-sjc`,
      `Allow: /guinchos-nas-rodovias-`,
      `Allow: /blog/`,
      `Disallow: /admin`,
      `Disallow: /api/`,
      `Disallow: /lovable/`,
      ``,
      `# Googlebot — prioridade nas páginas de cidade, bairro e rodovia`,
      `User-agent: Googlebot`,
      `Allow: /`,
      `Disallow: /admin`,
      `Disallow: /api/`,
      ``,
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      ``,
    ].join("\n");
    writeFileSync(resolve(dir, "robots.txt"), robots, "utf-8");
  };
  return {
    name: "lovable-seo-files",
    apply: () => true,
    async buildStart() {
      try {
        await generate();
      } catch (e) {
        this.warn(`SEO gen failed: ${(e as Error).message}`);
      }
    },
    async configureServer() {
      try {
        await generate();
      } catch {
        /* noop in dev */
      }
    },
  };
}

export default defineConfig({ vite: { plugins: [generateSeoFiles()] } });
