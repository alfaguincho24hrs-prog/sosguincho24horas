DROP POLICY IF EXISTS "Anyone can record a whatsapp click" ON public.whatsapp_clicks;
REVOKE INSERT ON public.whatsapp_clicks FROM anon, authenticated;