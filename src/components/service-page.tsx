import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/components/site-data";
import { SeoBlock, type FAQItem } from "@/components/seo-block";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export type ServicePageProps = {
  serviceName: string; // ex: "Guincho Leve"
  slug: string; // ex: "guincho-leve"
  heroTitle: string;
  heroSubtitle: string;
  intro: string[]; // parágrafos
  features: string[]; // bullets
  whenToUse: string[]; // bullets
  vehicles: string[]; // bullets de veículos atendidos
  faqs: FAQItem[];
  whatsappMsg: string;
  schemaServiceType: string; // ex: "TowingService"
};

export function ServicePage(p: ServicePageProps) {
  const wppHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(p.whatsappMsg)}`;
  const url = `https://sosguincho24horas.com.br/${p.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `SOS Guincho 24 horas - ${p.serviceName}`,
    "image": "https://sosguincho24horas.com.br/assets/imagem-do-guincho.webp",
    "@id": `https://sosguincho24horas.com.br/${p.slug}.html`,
    "url": `https://sosguincho24horas.com.br/${p.slug}.html`,
    "telephone": [
      "+5511996451510",
      "+5512992184913"
    ],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
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
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Reboque, Auto Socorro e Transporte",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Guincho 24 Horas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Guincho Plataforma Leve e Pesado"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Guincho para carros"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Guincho para Motos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transporte de Carros de Colecionador e Veículos Antigos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transporte de Embarcações (Jet Ski, Lancha, Barco)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transporte de Máquinas (Empilhadeira, Trator, Bobcat)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Remoção de Veículo em Subsolo"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Auto Socorro Mecânico e Pane Seca"
          }
        }
      ]
    }
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: "/" },
          { name: "Serviços", url: "/servicos" },
          { name: p.serviceName, url: `/${p.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-[image:var(--gradient-hero)] py-20 text-primary-foreground">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-3 border-accent/40 bg-accent/15 text-accent">{p.serviceName} 24h</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-accent">
            {p.heroTitle.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.3em] last:mr-0">{word}</span>
            ))}
          </h1>
          <p className="mt-4 text-primary-foreground/85">{p.heroSubtitle}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href={`tel:${SITE.phone}`} aria-label={`Ligar para ${SITE.name} agora`}><Phone className="h-5 w-5" aria-hidden="true" /> {SITE.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <a href={wppHref} target="_blank" rel="noreferrer" aria-label={`Falar no WhatsApp para ${p.serviceName}`}><MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp 24h</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro + features + vehicles */}
      <section className="container mx-auto max-w-4xl px-4 py-16 space-y-6">
        {p.intro.map((t, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t }} />
        ))}

        <h2 className="text-2xl font-bold pt-4 text-accent/90">O que está incluso no serviço de {p.serviceName.toLowerCase()}</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {p.features.map((f) => (
            <li key={f} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><span dangerouslySetInnerHTML={{ __html: f }} /></li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold pt-4 text-accent/90">Quando acionar nosso {p.serviceName.toLowerCase()}?</h2>
        <ul className="space-y-2 text-muted-foreground">
          {p.whenToUse.map((w) => (
            <li key={w}>• {w}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold pt-4 text-accent/90">Veículos atendidos</h2>
        <div className="flex flex-wrap gap-2">
          {p.vehicles.map((v) => (
            <span key={v} className="rounded-full border bg-secondary/40 px-3 py-1.5 text-sm">{v}</span>
          ))}
        </div>

        <Card className="border-border/60 bg-secondary/40 mt-8">
          <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-accent/90">Precisa de {p.serviceName.toLowerCase()} agora?</h2>
                <p className="text-muted-foreground text-sm">Atendimento 24 horas em todo o Brasil.</p>
              </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-[image:var(--gradient-cta)] text-primary hover:opacity-95 shadow-sm"><a href={`tel:${SITE.phone}`} aria-label={`Ligar para ${SITE.name}`}><Phone className="h-4 w-4" aria-hidden="true" /> {SITE.phone}</a></Button>
              <Button asChild variant="outline"><a href={wppHref} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">WhatsApp</a></Button>
              <Button asChild variant="secondary"><Link to="/servicos-de-guincho-e-reboque" aria-label="Ver todas as cidades atendidas">Ver cidades</Link></Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <SeoBlock
        badge={`${p.serviceName} 24h em todo o Brasil`}
        title={`${p.serviceName}: atendimento profissional, rápido e seguro 24 horas`}
        paragraphs={p.intro}
        bullets={p.features}
        faqs={p.faqs}
        whatsappMessage={p.whatsappMsg}
      />

      <LazyTestimonialsCarousel />
    </div>
  );
}
