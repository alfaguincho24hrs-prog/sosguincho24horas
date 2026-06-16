import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { DEFAULT_POSTS, type BlogPost } from "@/components/blog-data";
import {
  getRawCityProviders,
  listProviderCities,
  type AdminOverrides,
  type Provider,
  type ProviderOverride,
  type ProviderTier,
} from "@/components/city-providers";
import type { Database } from "@/integrations/supabase/types";

const providerTierSchema = z.enum(["gold", "silver", "bronze", "ghost"]);

const providerSchema: z.ZodType<Provider> = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(120),
  tier: providerTierSchema,
  whatsapp: z.string().optional(),
  phoneMasked: z.string().optional(),
  area: z.string().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  verified: z.boolean().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

const providerPatchSchema: z.ZodType<ProviderOverride> = z.object({
  tier: providerTierSchema.optional(),
  whatsapp: z.string().optional(),
  phoneMasked: z.string().optional(),
  name: z.string().optional(),
  area: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  logoUrl: z.string().optional(),
  description: z.string().optional(),
  verified: z.boolean().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

const blogPostSchema: z.ZodType<BlogPost> = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(140),
  excerpt: z.string().max(300),
  content: z.string().min(1),
  date: z.string().max(60),
  category: z.string().max(60),
  coverUrl: z.string().optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
});

type StoredBlogPost = BlogPost & { deleted?: boolean };

function getPublicClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Cloud database is not configured");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

async function getAdminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function ensureAdminSession() {
  const { requireAdminSession } = await import("@/lib/admin-auth.server");
  await requireAdminSession();
}

function cleanProvider(p: Provider): Provider {
  const copy: Partial<Provider> = { ...p, tier: p.tier as ProviderTier };
  Object.keys(copy).forEach((key) => {
    if (copy[key as keyof Provider] === undefined || copy[key as keyof Provider] === "") {
      delete copy[key as keyof Provider];
    }
  });
  return providerSchema.parse(copy);
}

function applyOverridesToList(list: Provider[], overrides: AdminOverrides[string] | undefined): Provider[] {
  if (!overrides) return list;
  return list.map((provider) => {
    if (!provider.id) return provider;
    return overrides[provider.id] ? { ...provider, ...overrides[provider.id] } : provider;
  });
}

async function readProviderData(citySlug: string, admin = false) {
  const client = admin ? await getAdminClient() : getPublicClient();
  const normalizedCity = citySlug.toLowerCase();
  const [overridesResult, addedResult] = await Promise.all([
    client.from("provider_overrides").select("city_slug, provider_id, patch").eq("city_slug", normalizedCity),
    client.from("added_providers").select("id, city_slug, provider").eq("city_slug", normalizedCity),
  ]);

  if (overridesResult.error) throw overridesResult.error;
  if (addedResult.error) throw addedResult.error;

  const overrides: AdminOverrides[string] = {};
  for (const row of overridesResult.data ?? []) {
    overrides[row.provider_id] = providerPatchSchema.parse(row.patch ?? {});
  }

  const added = (addedResult.data ?? []).map((row) =>
    cleanProvider({ ...(row.provider as Provider), id: row.id }),
  );

  const base = getRawCityProviders(normalizedCity);
  return {
    providers: [...applyOverridesToList(base, overrides), ...applyOverridesToList(added, overrides)],
    addedProviderIds: added.map((p) => p.id).filter(Boolean) as string[],
  };
}

async function readProviderCities() {
  const client = await getAdminClient();
  const [addedResult, overridesResult] = await Promise.all([
    client.from("added_providers").select("city_slug"),
    client.from("provider_overrides").select("city_slug"),
  ]);
  if (addedResult.error) throw addedResult.error;
  if (overridesResult.error) throw overridesResult.error;
  return Array.from(
    new Set([
      ...listProviderCities(),
      ...(addedResult.data ?? []).map((row) => row.city_slug),
      ...(overridesResult.data ?? []).map((row) => row.city_slug),
    ]),
  ).sort();
}

async function readBlogPosts(admin = false): Promise<BlogPost[]> {
  const client = admin ? await getAdminClient() : getPublicClient();
  const { data, error } = await client.from("blog_posts").select("slug, post").order("updated_at", { ascending: false });
  if (error) throw error;

  const bySlug = new Map(DEFAULT_POSTS.map((post) => [post.slug, post as StoredBlogPost]));
  for (const row of data ?? []) {
    const parsed = z.object({ deleted: z.boolean().optional() }).passthrough().parse(row.post) as StoredBlogPost;
    if (parsed.deleted) bySlug.delete(row.slug);
    else bySlug.set(row.slug, blogPostSchema.parse({ ...parsed, slug: row.slug }));
  }
  return Array.from(bySlug.values()).filter((post) => !post.deleted) as BlogPost[];
}

export const getPublicCityProviders = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ citySlug: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    return readProviderData(data.citySlug, false).then((result) => result.providers);
  });

export const getAdminProviderData = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ citySlug: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    await ensureAdminSession();
    const [providerData, cities] = await Promise.all([readProviderData(data.citySlug, true), readProviderCities()]);
    return { ...providerData, cities };
  });

export const saveAdminProviderOverride = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ citySlug: z.string().min(1), providerId: z.string().min(1), patch: providerPatchSchema }).parse(data),
  )
  .handler(async ({ data }) => {
    await ensureAdminSession();
    const client = await getAdminClient();
    const { error } = await client.from("provider_overrides").upsert(
      {
        city_slug: data.citySlug.toLowerCase(),
        provider_id: data.providerId,
        patch: data.patch,
      },
      { onConflict: "city_slug,provider_id" },
    );
    if (error) throw error;
    return { ok: true };
  });

export const createAdminProvider = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ citySlug: z.string().min(1), provider: providerSchema }).parse(data))
  .handler(async ({ data }) => {
    await ensureAdminSession();
    const client = await getAdminClient();
    const provider = cleanProvider({
      ...data.provider,
      id: data.provider.id || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    });
    const { error } = await client.from("added_providers").upsert({
      id: provider.id!,
      city_slug: data.citySlug.toLowerCase(),
      provider,
    });
    if (error) throw error;
    return provider;
  });

export const deleteAdminProvider = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ citySlug: z.string().min(1), providerId: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    await ensureAdminSession();
    const client = await getAdminClient();
    const [{ error: deleteProviderError }, { error: deleteOverrideError }] = await Promise.all([
      client.from("added_providers").delete().eq("id", data.providerId).eq("city_slug", data.citySlug.toLowerCase()),
      client.from("provider_overrides").delete().eq("provider_id", data.providerId).eq("city_slug", data.citySlug.toLowerCase()),
    ]);
    if (deleteProviderError) throw deleteProviderError;
    if (deleteOverrideError) throw deleteOverrideError;
    return { ok: true };
  });

export const getPublicBlogPosts = createServerFn({ method: "GET" }).handler(async () => readBlogPosts(false));

export const getPublicBlogPost = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const posts = await readBlogPosts(false);
    return posts.find((post) => post.slug === data.slug) ?? null;
  });

export const getAdminBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  await ensureAdminSession();
  return readBlogPosts(true);
});

export const saveAdminBlogPost = createServerFn({ method: "POST" })
  .inputValidator((data) => blogPostSchema.parse(data))
  .handler(async ({ data }) => {
    await ensureAdminSession();
    const client = await getAdminClient();
    const post = blogPostSchema.parse(data);
    const { error } = await client.from("blog_posts").upsert({ slug: post.slug, post });
    if (error) throw error;
    return post;
  });

export const deleteAdminBlogPost = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    await ensureAdminSession();
    const client = await getAdminClient();
    const isDefaultPost = DEFAULT_POSTS.some((post) => post.slug === data.slug);
    const { error } = isDefaultPost
      ? await client.from("blog_posts").upsert({ slug: data.slug, post: { slug: data.slug, deleted: true } })
      : await client.from("blog_posts").delete().eq("slug", data.slug);
    if (error) throw error;
    return { ok: true };
  });