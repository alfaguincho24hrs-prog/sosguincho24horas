CREATE TABLE public.provider_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city_slug TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  patch JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (city_slug, provider_id)
);
GRANT SELECT ON public.provider_overrides TO anon;
GRANT SELECT ON public.provider_overrides TO authenticated;
GRANT ALL ON public.provider_overrides TO service_role;
ALTER TABLE public.provider_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view provider overrides"
ON public.provider_overrides
FOR SELECT
TO anon, authenticated
USING (true);

CREATE TABLE public.added_providers (
  id TEXT NOT NULL PRIMARY KEY,
  city_slug TEXT NOT NULL,
  provider JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.added_providers TO anon;
GRANT SELECT ON public.added_providers TO authenticated;
GRANT ALL ON public.added_providers TO service_role;
ALTER TABLE public.added_providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view added providers"
ON public.added_providers
FOR SELECT
TO anon, authenticated
USING (true);

CREATE TABLE public.blog_posts (
  slug TEXT NOT NULL PRIMARY KEY,
  post JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view blog posts"
ON public.blog_posts
FOR SELECT
TO anon, authenticated
USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_provider_overrides_updated_at
BEFORE UPDATE ON public.provider_overrides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_added_providers_updated_at
BEFORE UPDATE ON public.added_providers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();