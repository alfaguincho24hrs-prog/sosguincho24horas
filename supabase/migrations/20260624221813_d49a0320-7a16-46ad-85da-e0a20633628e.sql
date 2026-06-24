CREATE TABLE public.whatsapp_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source_path text,
  button_label text,
  referrer text,
  user_agent text
);
CREATE INDEX whatsapp_clicks_created_at_idx ON public.whatsapp_clicks (created_at DESC);
CREATE INDEX whatsapp_clicks_source_path_idx ON public.whatsapp_clicks (source_path);

GRANT INSERT ON public.whatsapp_clicks TO anon, authenticated;
GRANT ALL ON public.whatsapp_clicks TO service_role;

ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a whatsapp click"
  ON public.whatsapp_clicks
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);