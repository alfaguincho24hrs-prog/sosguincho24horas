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
  "/anuncie",
  "/contato",
  "/servicos-de-guincho-e-reboque",
  "/rodovias-vale-do-paraiba",
  "/guincho-leve",
  "/guincho-pesado",
  "/guincho-de-motos",
  "/auto-socorro",
  "/pane-seca",
  "/remocao-veicular",
];

function generateSeoFiles(): Plugin {
  const generate = async () => {
    // Dynamic import so SSR/edge bundle doesn't pull cities-data
    const { ALL_CITIES } = await import("./src/components/cities-data");
    const today = new Date().toISOString().split("T")[0];
    
    const HIGHWAY_SLUGS = [
      "marginal-tiete", "marginal-tiete-norte", "marginal-tiete-leste",
      "rodovia-castelo-branco", "rodovia-fernao-dias",
      "rodovia-presidente-dutra", "rodovia-carvalho-pinto", "rodovia-dos-imigrantes",
      "rodovia-anchieta", "rodovia-anhanguera", "rodoanel-mario-covas",
      "rodovia-ayrton-senna", "rodovia-raposo-tavares", "rodovia-dos-bandeirantes",
      "marginal-pinheiros", "marginal-pinheiros-sul", "marginal-pinheiros-oeste"
    ];

    const urls: string[] = [];
    for (const path of STATIC_ROUTES) {
      urls.push(`  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`);
    }
    for (const c of ALL_CITIES) {
      const slug = `${c.slug}-${c.uf.toLowerCase()}`;
      urls.push(`  <url><loc>${SITE_URL}/guincho-em-${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    }
    for (const slug of HIGHWAY_SLUGS) {
      urls.push(`  <url><loc>${SITE_URL}/guinchos-nas-rodovias-${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
    }
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
    const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
    const dir = resolve(process.cwd(), "public");
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "sitemap.xml"), sitemap, "utf-8");
    writeFileSync(resolve(dir, "robots.txt"), robots, "utf-8");
  };
  return {
    name: "lovable-seo-files",
    apply: () => true,
    async buildStart() {
      try { await generate(); } catch (e) { this.warn(`SEO gen failed: ${(e as Error).message}`); }
    },
    async configureServer() {
      try { await generate(); } catch { /* noop in dev */ }
    },
  };
}

export default defineConfig({ vite: { plugins: [generateSeoFiles()] } });
