import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { LOCATIONS } from "@/data/locations";

export type CityMetricsRow = {
  city_slug: string;
  city_name: string;
  uf: string;
  source: string; // "file" | "db" | "location" | "mixed"
  base_providers: number;
  added_providers: number;
  overrides: number;
  blog_posts: number;
};

export type CityMetricsResult = {
  generated_at: string;
  rows: CityMetricsRow[];
  totals: {
    cities: number;
    added_providers: number;
    overrides: number;
    blog_posts: number;
  };
};

function getPublicClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Cloud database is not configured");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

// Lightweight slug parser: "taubate-sp" -> { name: "Taubate", uf: "SP" }.
function parseSlug(slug: string): { name: string; uf: string } {
  const parts = slug.split("-");
  const maybeUf = parts[parts.length - 1];
  if (maybeUf && maybeUf.length === 2 && /^[a-z]{2}$/.test(maybeUf)) {
    const uf = maybeUf.toUpperCase();
    const name = parts
      .slice(0, -1)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
    return { name, uf };
  }
  const name = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  return { name, uf: "" };
}

export const getCityMetrics = createServerFn({ method: "GET" }).handler(async (): Promise<CityMetricsResult> => {
  const { requireAdminSession } = await import("@/lib/admin-auth.server");
  await requireAdminSession();

  const client = getPublicClient();
  const [addedRes, overridesRes, postsRes] = await Promise.all([
    client.from("added_providers").select("city_slug"),
    client.from("provider_overrides").select("city_slug"),
    client.from("blog_posts").select("post"),
  ]);
  if (addedRes.error) throw addedRes.error;
  if (overridesRes.error) throw overridesRes.error;
  if (postsRes.error) throw postsRes.error;

  // Per-slug counters from DB
  const added = new Map<string, number>();
  for (const r of addedRes.data ?? []) {
    const k = (r.city_slug || "").toLowerCase();
    if (k) added.set(k, (added.get(k) ?? 0) + 1);
  }
  const overrides = new Map<string, number>();
  for (const r of overridesRes.data ?? []) {
    const k = (r.city_slug || "").toLowerCase();
    if (k) overrides.set(k, (overrides.get(k) ?? 0) + 1);
  }

  // Blog posts per slug (heuristic: post.category contains city, or post.slug starts with city)
  const blogPerSlug = new Map<string, number>();
  let totalPosts = 0;
  for (const row of postsRes.data ?? []) {
    totalPosts++;
    const post = row.post as Record<string, unknown> | null;
    if (!post) continue;
    const haystack = `${String(post.slug ?? "")} ${String(post.category ?? "")} ${String(post.title ?? "")}`.toLowerCase();
    for (const loc of LOCATIONS) {
      if (haystack.includes(loc.slug)) {
        blogPerSlug.set(loc.slug, (blogPerSlug.get(loc.slug) ?? 0) + 1);
      }
    }
  }

  // Universe of city slugs: LOCATIONS + DB
  const universe = new Map<string, { source: Set<string>; name?: string; uf?: string }>();
  for (const loc of LOCATIONS) {
    universe.set(loc.slug, {
      source: new Set(["location"]),
      name: loc.name,
      uf: loc.uf ?? "SP",
    });
  }
  for (const k of [...added.keys(), ...overrides.keys()]) {
    const ex = universe.get(k);
    if (ex) ex.source.add("db");
    else universe.set(k, { source: new Set(["db"]) });
  }

  const rows: CityMetricsRow[] = [];
  for (const [slug, meta] of universe) {
    const parsed = parseSlug(slug);
    rows.push({
      city_slug: slug,
      city_name: meta.name ?? parsed.name,
      uf: meta.uf ?? parsed.uf,
      source: Array.from(meta.source).sort().join("+"),
      base_providers: 0, // file-based catalog is bundled client-side; left at 0 here
      added_providers: added.get(slug) ?? 0,
      overrides: overrides.get(slug) ?? 0,
      blog_posts: blogPerSlug.get(slug) ?? 0,
    });
  }

  rows.sort((a, b) => a.city_slug.localeCompare(b.city_slug));

  return {
    generated_at: new Date().toISOString(),
    rows,
    totals: {
      cities: rows.length,
      added_providers: Array.from(added.values()).reduce((s, n) => s + n, 0),
      overrides: Array.from(overrides.values()).reduce((s, n) => s + n, 0),
      blog_posts: totalPosts,
    },
  };
});
