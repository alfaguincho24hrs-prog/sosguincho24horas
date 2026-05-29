import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Star, Truck, Pencil } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PARTNERS, CITIES } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export const Route = createFileRoute("/cobertura")({
  head: () => ({
    meta: [
      { title: "Cobertura Nacional de Guincho | Cidades Atendidas em Todo o Brasil" },
      { name: "description", content: "Veja todas as capitais e cidades com atendimento de guincho e reboque 24h. Cobertura nacional com empresas parceiras qualificadas em cada região." },
      { property: "og:title", content: "Cobertura Nacional de Guincho 24h" },
      { property: "og:description", content: "Capitais e cidades atendidas em todo o Brasil." },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { property: "og:url", content: "https://sosguincho24horas.com.br/cobertura" },
      { name: "twitter:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "SOS Guincho 24 horas - Cobertura",
          "image": "https://sosguincho24horas.com.br/assets/imagem-do-guincho.webp",
          "@id": "https://sosguincho24horas.com.br/cobertura.html",
          "url": "https://sosguincho24horas.com.br/cobertura",
          "telephone": ["+5511996451510", "+5512992184913"],
          "priceRange": "$$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Brasil",
            "addressRegion": "SP",
            "addressCountry": "BR"
          },
          "description": "Serviço de guincho 24 horas, reboque de carros e motos, auto socorro mecânico, remoção de veículos pesados, transporte de vans, empilhadeiras e embarcações. Atendimento rápido e preço justo.",
          "areaServed": { "@type": "Country", "name": "Brasil" },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços de Reboque, Auto Socorro e Transporte",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Guincho 24 Horas" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Guincho Plataforma Leve e Pesado" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Guincho para carros" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Guincho para Motos" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transporte de Carros de Colecionador e Veículos Antigos" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transporte de Embarcações (Jet Ski, Lancha, Barco)" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transporte de Máquinas (Empilhadeira, Trator, Bobcat)" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Remoção de Veículo em Subsolo" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Socorro Mecânico e Pane Seca" } }
            ]
          }
        })
      }
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/cobertura" }],
  }),
  component: CoveragePage,
});

function CoveragePage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Início", url: "/" }, { name: "Cobertura", url: "/cobertura" }]} />
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-3">Cobertura</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-accent">Atendimento em todo o Brasil</h1>
          <p className="mt-4 text-muted-foreground">
            Operamos com uma rede consolidada de empresas de guincho parceiras em todas as capitais e principais regiões metropolitanas, garantindo socorro rápido onde quer que você esteja.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Empresas parceiras em destaque</h2>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin" search={{ city: "" }}>
              <Pencil className="h-4 w-4" /> Editar empresas parceiras
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p) => (
            <Card key={p.name} className="border-border/60 transition-all hover:border-accent/60 hover:shadow-[var(--shadow-elegant)]">
              <CardContent className="space-y-3 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="h-4 w-4 fill-accent text-accent" /> {p.rating}
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {p.city}</p>
                <Button asChild className="w-full" variant="secondary">
                  <a href={`tel:${p.phone.replace(/\D/g, "")}`}><Phone className="h-4 w-4" /> {p.phone}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold">Capitais atendidas</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <span key={c} className="rounded-full border bg-secondary/40 px-4 py-1.5 text-sm">{c}</span>
          ))}
        </div>
      </div>

      <SeoBlock
        badge="Cobertura nacional de guincho 24h"
        title="Rede de guincho e reboque 24 horas presente em todo o Brasil"
        paragraphs={[
          "O <strong>SOS Guincho 24 horas</strong> mantém parcerias estratégicas com empresas locais de <strong>reboque 24 horas</strong> em todas as regiões do país, com forte presença no <strong>Estado de São Paulo</strong> — incluindo Capital, ABC, Grande SP, Vale do Paraíba, Litoral Norte, Serra da Mantiqueira, interior, Campinas, Sorocaba, Baixada Santista — e em todas as capitais brasileiras como <strong>Rio de Janeiro</strong>, <strong>Belo Horizonte</strong>, <strong>Curitiba</strong>, <strong>Porto Alegre</strong>, <strong>Salvador</strong>, <strong>Recife</strong>, <strong>Fortaleza</strong>, <strong>Brasília</strong>, <strong>Goiânia</strong>, <strong>Manaus</strong> e <strong>Florianópolis</strong>.",
          "Cobrimos com prioridade as principais rodovias do país: <strong>BR-116 (Dutra e Régis Bittencourt)</strong>, <strong>BR-101</strong>, <strong>BR-040</strong>, <strong>BR-381 (Fernão Dias)</strong>, <strong>SP-070 (Ayrton Senna/Carvalho Pinto)</strong>, <strong>SP-099 (Tamoios)</strong>, <strong>SP-280 (Castello Branco)</strong>, <strong>SP-330 (Anhanguera)</strong>, <strong>SP-348 (Bandeirantes)</strong>, <strong>SP-150 (Anchieta)</strong> e <strong>SP-160 (Imigrantes)</strong>.",
          "Em cada região contamos com bases distribuídas para garantir <strong>tempo médio de chegada inferior a 45 minutos</strong>, mesmo em trechos de serra, áreas rurais e madrugada. As empresas parceiras passam por verificação documental, vistoria de frota e avaliação de reputação antes de integrar nossa rede.",
        ]}
        bullets={[
          "<strong>+1.000 cidades atendidas</strong> com guincho leve, médio, pesado e moto.",
          "<strong>100% das rodovias federais e estaduais de SP</strong> com cobertura prioritária.",
          "<strong>Bases urbanas e rurais</strong> distribuídas para resposta rápida.",
          "<strong>Atendimento interestadual</strong> com prancha rebaixada e cegonha.",
        ]}
        faqs={[
          { q: "Vocês atendem cidades pequenas do interior?", a: "Sim. Nossa rede inclui mais de 1.000 municípios, incluindo cidades de pequeno porte do interior de SP, MG e RJ." },
          { q: "Qual o tempo de chegada em rodovia?", a: "Em média 40 a 60 minutos, dependendo do KM exato e da base parceira mais próxima." },
          { q: "Atendem na madrugada e feriados?", a: "Sim. Operamos 24 horas, 7 dias por semana, inclusive feriados nacionais e regionais." },
        ]}
      />

      <LazyTestimonialsCarousel />
    </div>
  );
}
