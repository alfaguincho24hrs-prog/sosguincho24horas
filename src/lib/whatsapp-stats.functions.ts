import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function ensureAdmin() {
  const { requireAdminSession } = await import("@/lib/admin-auth.server");
  await requireAdminSession();
}

export const getWhatsappStats = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ days: z.number().int().min(1).max(365).default(30) }).parse(d))
  .handler(async ({ data }) => {
    await ensureAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - data.days * 24 * 60 * 60 * 1000).toISOString();

    const { data: rows, error } = await supabaseAdmin
      .from("whatsapp_clicks")
      .select("created_at, source_path, button_label")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) throw error;

    const list = rows ?? [];
    const total = list.length;

    const byDay = new Map<string, number>();
    const byPath = new Map<string, number>();
    const byButton = new Map<string, number>();
    for (const r of list) {
      const day = (r.created_at as string).slice(0, 10);
      byDay.set(day, (byDay.get(day) ?? 0) + 1);
      const p = r.source_path ?? "(desconhecido)";
      byPath.set(p, (byPath.get(p) ?? 0) + 1);
      const b = r.button_label ?? "(sem rótulo)";
      byButton.set(b, (byButton.get(b) ?? 0) + 1);
    }

    const toSorted = (m: Map<string, number>) =>
      Array.from(m.entries())
        .map(([key, count]) => ({ key, count }))
        .sort((a, b) => b.count - a.count);

    const daily = toSorted(byDay).sort((a, b) => a.key.localeCompare(b.key));

    return {
      total,
      days: data.days,
      daily,
      byPath: toSorted(byPath).slice(0, 50),
      byButton: toSorted(byButton).slice(0, 50),
      recent: list.slice(0, 50),
    };
  });
