import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Truck, Phone, MessageCircle } from "lucide-react";
import { CITIES, SITE } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export const Route = createFileRoute("/areas-atendidas")({
  head: () => ({
    meta: [
      { title: "Áreas Atendidas — Cobertura Nacional SOS Guincho 24h" },
      { name: "description", content: "Confira as cidades, rodovias e regiões atendidas pela nossa rede de guincho 24 horas. Oferecemos atendimento prioritário no Vale do Paraíba, São Paulo e cobertura em todo o território nacional." },
      { property: "og:title", content: "Áreas Atendidas — Cobertura Nacional SOS Guincho 24h" },
      { property: "og:description", content: "Confira as cidades, rodovias e regiões atendidas pela nossa rede de guincho 24 horas. Oferecemos atendimento prioritário no Vale do Paraíba, São Paulo e cobertura em todo o território nacional." },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { property: "og:url", content: "https://sosguincho24horas.com.br/areas-atendidas" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `${SITE.name} - Áreas Atendidas`,
          "image": "https://sosguincho24horas.com.br/assets/reboque.webp",
          "@id": "https://sosguincho24horas.com.br/areas-atendidas.html",
          "url": "https://sosguincho24horas.com.br/areas-atendidas",
          "telephone": SITE.phone,
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Brasil",
            "addressRegion": "SP",
            "addressCountry": "BR"
          }
        })
      }
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/areas-atendidas" }],
  }),
  component: AreasAtendidasPage,
});

function AreasAtendidasPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Início", url: "/" }, { name: "Áreas Atendidas", url: "/areas-atendidas" }]} />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-accent">Áreas Atendidas</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Atendemos com exclusividade em todo o território nacional, com bases distribuídas estrategicamente para garantir socorro em menos de 45 minutos.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-accent/90">Cidades em destaque</h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {CITIES.map((c) => (
            <div key={c} className="px-4 py-2 bg-secondary rounded-full flex items-center gap-2 text-sm border hover:bg-secondary/80 transition-colors">
              <MapPin className="h-4 w-4 text-accent" /> {c}
            </div>
          ))}
        </div>

        <div className="mb-12 rounded-2xl bg-secondary/30 p-8 border border-border/40">
          <h2 className="text-2xl font-bold mb-4">Precisa de guincho em alguma destas regiões?</h2>
          <p className="mb-6 text-muted-foreground">Nossa central está disponível 24 horas por dia para despachar a unidade mais próxima até você.</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary">
              <a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" /> Solicitar agora</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </Button>
          </div>
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
    </div>
  );
}
