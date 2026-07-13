import { DEFAULT_POSTS, type BlogPost } from "@/components/blog-data";
import { getStaticCityProviders, type AdminOverrides, type Provider, type ProviderOverride } from "@/components/city-providers";
import { supabase } from "@/integrations/supabase/client";

type StoredBlogPost = BlogPost & { deleted?: boolean };

function cleanProvider(provider: Provider): Provider {
  const copy: Provider = { ...provider };
  Object.keys(copy).forEach((key) => {
    if (copy[key as keyof Provider] === undefined || copy[key as keyof Provider] === "") {
      delete copy[key as keyof Provider];
    }
  });
  return copy;
}

function applyOverridesToList(list: Provider[], overrides: AdminOverrides[string] | undefined): Provider[] {
  if (!overrides) return list;
  return list.map((provider) => {
    if (!provider.id) return provider;
    return overrides[provider.id] ? { ...provider, ...overrides[provider.id] } : provider;
  });
}

export async function fetchPublicCityProvidersClient(citySlug: string): Promise<Provider[]> {
  const normalizedCity = citySlug.toLowerCase();
  const [overridesResult, addedResult] = await Promise.all([
    supabase.from("provider_overrides").select("city_slug, provider_id, patch").eq("city_slug", normalizedCity),
    supabase.from("added_providers").select("id, city_slug, provider").eq("city_slug", normalizedCity),
  ]);

  if (overridesResult.error) throw overridesResult.error;
  if (addedResult.error) throw addedResult.error;

  const overrides: AdminOverrides[string] = {};
  for (const row of overridesResult.data ?? []) {
    overrides[row.provider_id] = (row.patch ?? {}) as ProviderOverride;
  }

  const added = (addedResult.data ?? []).map((row) => cleanProvider({ ...((row.provider ?? {}) as Provider), id: row.id }));
  const base = getStaticCityProviders(normalizedCity);
  return [...applyOverridesToList(base, overrides), ...applyOverridesToList(added, overrides)];
}

export async function fetchPublicBlogPostsClient(): Promise<BlogPost[]> {
  const { data, error } = await supabase.from("blog_posts").select("slug, post, updated_at").order("updated_at", { ascending: false });
  if (error) throw error;

  const bySlug = new Map(DEFAULT_POSTS.map((post) => [post.slug, post as StoredBlogPost]));
  for (const row of data ?? []) {
    const stored = { ...((row.post ?? {}) as StoredBlogPost), slug: row.slug };
    if (stored.deleted) bySlug.delete(row.slug);
    else bySlug.set(row.slug, stored);
  }
  return Array.from(bySlug.values()).filter((post) => !post.deleted) as BlogPost[];
}

export async function fetchPublicBlogPostClient(slug: string): Promise<BlogPost | null> {
  const posts = await fetchPublicBlogPostsClient();
  return posts.find((post) => post.slug === slug) ?? null;
}