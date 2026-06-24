import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const payloadSchema = z.object({
  source_path: z.string().max(500).optional(),
  button_label: z.string().max(120).optional(),
  referrer: z.string().max(500).optional(),
});

export const Route = createFileRoute("/api/public/track-whatsapp")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const raw = await request.text();
          if (!raw) return new Response("ok");
          let json: unknown;
          try {
            json = JSON.parse(raw);
          } catch {
            return new Response("bad payload", { status: 400 });
          }
          const parsed = payloadSchema.safeParse(json);
          if (!parsed.success) return new Response("invalid", { status: 400 });
          const ua = request.headers.get("user-agent")?.slice(0, 500) ?? null;
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("whatsapp_clicks").insert({
            source_path: parsed.data.source_path ?? null,
            button_label: parsed.data.button_label ?? null,
            referrer: parsed.data.referrer ?? null,
            user_agent: ua,
          });
          if (error) {
            console.error("[track-whatsapp] insert error:", error.message);
            return new Response("insert error", { status: 500 });
          }
          return new Response("ok");
        } catch (err) {
          console.error("[track-whatsapp] unexpected:", err);
          return new Response("error", { status: 500 });
        }
      },
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "content-type",
          },
        }),
    },
  },
});
