import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "./site-data";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  city: z.string().trim().min(2, "Informe a cidade").max(80),
  details: z.string().trim().max(300).optional(),
});

type Props = {
  defaultCity?: string;
};

export function LeadFormGeo({ defaultCity = "" }: Props) {
  const [city, setCity] = useState(defaultCity);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (defaultCity) setCity(defaultCity);
  }, [defaultCity]);

  function detectLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus("error");
      toast.error("Geolocalização não suportada neste navegador");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`,
            { headers: { Accept: "application/json" } },
          );
          const data = await res.json();
          const found =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.municipality ||
            "";
          if (found) setCity(found);
          setGeoStatus("ok");
          toast.success(found ? `Cidade detectada: ${found}` : "Localização capturada");
        } catch {
          setGeoStatus("ok");
          toast.success("Localização capturada");
        }
      },
      () => {
        setGeoStatus("error");
        toast.error("Não foi possível obter sua localização");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      city: fd.get("city"),
      details: fd.get("details") || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    setSubmitting(true);
    const { name, phone, city: c, details } = parsed.data;
    const loc = coords ? ` (https://maps.google.com/?q=${coords.lat},${coords.lng})` : "";
    const msg =
      `Olá! Preciso de guincho 24h.%0A` +
      `Nome: ${name}%0A` +
      `Telefone: ${phone}%0A` +
      `Cidade: ${c}${loc}%0A` +
      (details ? `Detalhes: ${details}` : "");
    const url = `https://wa.me/${SITE.whatsapp}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Abrindo WhatsApp para confirmar o pedido...");
    setSubmitting(false);
    form.reset();
    setCity(defaultCity);
  }

  return (
    <Card className="border-border/60">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">Solicite agora — resposta em minutos</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Preenchemos automaticamente sua cidade pela localização para acelerar o atendimento.
        </p>
        <form onSubmit={onSubmit} className="mt-5 grid gap-3">
          <Input name="name" placeholder="Seu nome" required maxLength={80} aria-label="Seu nome completo" />
          <Input name="phone" placeholder="Telefone com DDD" required maxLength={20} inputMode="tel" aria-label="Telefone com DDD" />
          <div className="flex gap-2">
            <Input
              name="city"
              placeholder="Sua cidade"
              required
              maxLength={80}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="Sua cidade"
            />
            <Button
              type="button"
              variant="outline"
              onClick={detectLocation}
              disabled={geoStatus === "loading"}
              aria-label="Detectar minha localização"
            >
              {geoStatus === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Input name="details" placeholder="Veículo / problema (opcional)" maxLength={300} aria-label="Detalhes sobre o veículo ou problema (opcional)" />
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95"
          >
            <Send className="h-4 w-4" /> Enviar pelo WhatsApp
          </Button>
          {coords && (
            <p className="text-xs text-muted-foreground">
              Localização anexada: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
