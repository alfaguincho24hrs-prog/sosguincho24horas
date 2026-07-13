// Helpers para gerar srcset responsivo (AVIF/WebP) a partir de URLs de imagem.
// Suporta URLs do Supabase Storage (usa a API de transformação de imagem).
// Para URLs externas ou data URLs, retorna null (usar <img> simples).

export type ResponsiveSources = {
  avif: string;
  webp: string;
  fallback: string;
  sizesAttr: string;
} | null;

const SUPABASE_OBJECT_RE = /\/storage\/v1\/object\/(public|sign)\//;

function isSupabaseStorage(url: string): boolean {
  return SUPABASE_OBJECT_RE.test(url);
}

function toRender(url: string): string {
  return url.replace(SUPABASE_OBJECT_RE, "/storage/v1/render/image/$1/");
}

function withParams(url: string, params: Record<string, string | number>): string {
  const sep = url.includes("?") ? "&" : "?";
  const qs = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join("&");
  return `${url}${sep}${qs}`;
}

/**
 * Gera srcset AVIF/WebP em múltiplas larguras para uma imagem hospedada no
 * Supabase Storage. Retorna null quando a URL não é transformável (data URL,
 * CDN externo, etc.) — nesse caso use <img> simples com loading="lazy".
 *
 * @param widths larguras em CSS px do slot renderizado; o helper multiplica
 *               por 1x/2x para cobrir DPR alto.
 */
export function buildResponsiveSources(
  url: string | undefined,
  widths: number[],
  sizesAttr: string,
): ResponsiveSources {
  if (!url) return null;
  if (!isSupabaseStorage(url)) return null;

  const base = toRender(url);
  const dprs = [1, 2];
  const uniqueWidths = Array.from(
    new Set(widths.flatMap((w) => dprs.map((d) => Math.round(w * d)))),
  ).sort((a, b) => a - b);

  const build = (format: "avif" | "webp" | "origin") =>
    uniqueWidths
      .map((w) => {
        const params: Record<string, string | number> = { width: w, quality: 75 };
        if (format !== "origin") params.format = format;
        return `${withParams(base, params)} ${w}w`;
      })
      .join(", ");

  const largest = uniqueWidths[uniqueWidths.length - 1];
  return {
    avif: build("avif"),
    webp: build("webp"),
    fallback: withParams(base, { width: largest, quality: 80 }),
    sizesAttr,
  };
}
