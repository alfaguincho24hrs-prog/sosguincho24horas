#!/usr/bin/env node
/**
 * Monitor pós-deploy: roda todas as auditorias e alerta se algo quebrar.
 * Uso: node monitor-deploy.mjs [--url=https://sosguincho24horas.com.br]
 *
 * Variáveis de ambiente opcionais para alerta:
 *   ALERT_WEBHOOK_URL   - Webhook (Slack/Discord/Teams) para notificação em caso de falha
 *   ALERT_EMAIL_TO      - (placeholder) email de destino para alertas
 */
import { execSync } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const SITE_URL =
  process.argv.find((a) => a.startsWith("--url="))?.split("=")[1] ??
  "https://sosguincho24horas.com.br";

const CHECKS = [
  { name: "check-links", cmd: "node check-links.mjs" },
  { name: "generate-sitemap", cmd: "node generate-sitemap.mjs" },
  { name: "check-seo", cmd: "node check-seo.mjs" },
  { name: "audit-testimonials", cmd: "node check-testimonials.mjs" },
  { name: "audit-highways", cmd: "node audit-highway-seo.mjs" },
];

const REMOTE_CHECKS = [
  { name: "home", path: "/" },
  { name: "sitemap", path: "/sitemap.xml" },
  { name: "robots", path: "/robots.txt" },
  { name: "cidade-exemplo", path: "/guincho-em-taubate-sp" },
  { name: "rodovias-exemplo", path: "/guinchos-nas-rodovias-marginal-tiete" },
];

const htmlProblemPattern = /Something went wrong|An unexpected error occurred|Failed to fetch dynamically imported module/i;

function extractAssetPaths(html) {
  const paths = new Set();
  for (const match of html.matchAll(/(?:href|src)=["'](\/assets\/[^"']+)["']/g)) {
    paths.add(match[1].replace(/\\$/, ""));
  }
  for (const match of html.matchAll(/import\(["'](\/assets\/[^"']+)["']\)/g)) {
    paths.add(match[1].replace(/\\$/, ""));
  }
  return [...paths];
}

async function validatePageAndAssets(path) {
  const res = await fetch(`${SITE_URL}${path}`, {
    redirect: "follow",
    headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return { assets: 0 };

  const html = await res.text();
  if (htmlProblemPattern.test(html)) throw new Error("página renderizou tela de erro");

  const assets = extractAssetPaths(html);
  for (const asset of assets) {
    const assetRes = await fetch(`${SITE_URL}${asset}`, { method: "HEAD", redirect: "follow" });
    if (!assetRes.ok) throw new Error(`asset ausente ${asset} (${assetRes.status})`);
  }
  return { assets: assets.length };
}

async function getSitemapPaths() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`, { redirect: "follow" });
  if (!res.ok) throw new Error(`sitemap HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(url).pathname || "/");
}

const results = [];

console.log(`\n🔎 Monitor pós-deploy — alvo: ${SITE_URL}\n`);

// 1) Auditorias locais (build-time)
for (const c of CHECKS) {
  process.stdout.write(`▶ ${c.name}... `);
  try {
    execSync(c.cmd, { stdio: "pipe" });
    console.log("✅");
    results.push({ name: c.name, ok: true });
  } catch (e) {
    console.log("❌");
    results.push({
      name: c.name,
      ok: false,
      error: (e.stdout?.toString() || "") + (e.stderr?.toString() || ""),
    });
  }
}

// 2) HTTP smoke-tests no site publicado
for (const r of REMOTE_CHECKS) {
  process.stdout.write(`🌐 ${r.path}... `);
  try {
    const checked = await validatePageAndAssets(r.path);
    console.log(`✅ (${checked.assets} assets)`);
    results.push({ name: `remote:${r.name}`, ok: true });
  } catch (e) {
    console.log(`❌ ${e.message}`);
    results.push({ name: `remote:${r.name}`, ok: false, error: e.message });
  }
  await wait(150);
}

// 3) Varredura completa do sitemap publicado: todas as URLs precisam abrir e referenciar assets existentes.
process.stdout.write("🗺️ todas as rotas do sitemap... ");
try {
  const paths = [...new Set(await getSitemapPaths())];
  let checked = 0;
  for (const path of paths) {
    await validatePageAndAssets(path);
    checked += 1;
    if (checked % 100 === 0) process.stdout.write(`${checked}/${paths.length} `);
    await wait(25);
  }
  console.log(`✅ ${checked}/${paths.length}`);
  results.push({ name: "remote:sitemap-all-routes", ok: true });
} catch (e) {
  console.log(`❌ ${e.message}`);
  results.push({ name: "remote:sitemap-all-routes", ok: false, error: e.message });
}

const failed = results.filter((r) => !r.ok);

console.log(`\n📊 Resultado: ${results.length - failed.length}/${results.length} OK`);

if (failed.length > 0) {
  console.error("\n❌ Falhas detectadas:");
  failed.forEach((f) => console.error(`  - ${f.name}: ${(f.error || "").slice(0, 200)}`));

  // Webhook (Slack/Discord/Teams)
  if (process.env.ALERT_WEBHOOK_URL) {
    const text = `🚨 *Deploy ${SITE_URL}* falhou em ${failed.length} verificação(ões):\n${failed
      .map((f) => `• ${f.name}`)
      .join("\n")}`;
    try {
      await fetch(process.env.ALERT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, content: text }),
      });
      console.log("📨 Alerta enviado via webhook.");
    } catch (e) {
      console.error("⚠️ Falha ao enviar webhook:", e.message);
    }
  }

  process.exit(1);
}

console.log("\n✅ Tudo OK — deploy validado.");
