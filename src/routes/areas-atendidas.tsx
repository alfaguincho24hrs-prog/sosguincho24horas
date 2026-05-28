import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Truck } from "lucide-react";
import { CITIES } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";

export const Route = createFileRoute("/areas-atendidas")({
  head: () => ({
    meta: [
      { title: "Áreas Atendidas — Cobertura Nacional SOS Guincho 24h" },
      { name: "description", content: "Confira as cidades, rodovias e regiões atendidas pela nossa rede de guincho 24 horas. Atendimento prioritário no Vale do Paraíba e todo o Brasil." },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/areas-atendidas" }],
  }),
  component: AreasAtendidasPage,
});

function AreasAtendidasPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Áreas Atendidas</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Atendemos com exclusividade em todo o território nacional, com bases distribuídas estrategicamente para garantir socorro em menos de 45 minutos.
      </p>

      <h2 className="text-2xl font-bold mb-6">Cidades em destaque</h2>
      <div className="flex flex-wrap gap-3 mb-12">
        {CITIES.map((c) => (
          <div key={c} className="px-4 py-2 bg-secondary rounded-full flex items-center gap-2 text-sm border">
            <MapPin className="h-4 w-4 text-accent" /> {c}
          </div>
        ))}
      </div>

      <SeoBlock
        badge="Autoridade Regional"
        title="Estrutura logística de reboque no Vale do Paraíba e Brasil"
        paragraphs={[
          "Nosso foco logístico no Vale do Paraíba inclui todas as cidades da região e a cobertura total da Rodovia Presidente Dutra (BR-116), Rodovia Carvalho Pinto (SP-070) e Tamoios (SP-099).",
          "Atendemos bairros urbanos, áreas industriais e trechos rurais com frota adaptada para cada necessidade geográfica."
        ]}
      />
    </div>
  );
}
