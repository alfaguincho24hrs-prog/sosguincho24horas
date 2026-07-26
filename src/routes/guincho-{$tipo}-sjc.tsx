import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, Clock, Truck, CheckCircle2, AlertTriangle, ChevronRight } from "lucide-react";
import { SITE } from "@/components/site-data";
import { SJC_VEICULOS, getTipoVeiculo, type TipoVeiculo } from "@/lib/sjc-veiculos";

const ORIGIN = "https://sosguincho24horas.com.br";
const TEL = "tel:+5511996451510";

export const Route = createFileRoute("/guincho-{$tipo}-sjc")({
  loader: ({ params }) => {
    const tipo = getTipoVeiculo(params.tipo);
    if (!tipo) throw notFound();
    return { tipo };
  },
  head: ({ params, loaderData }) => {
    const url = `${ORIGIN}/guincho-${params.tipo}-sjc`;
    if (!loaderData) {
      return {
        meta: [{ title: "Serviço não encontrado" }, { name: "robots", content: "noindex" }],
      };
    }
    const v = loaderData.tipo;
    const title = `${v.title} | ${SITE.name}`;
    const description = v.description;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: v.keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "robots", content: "index,follow" },
        { name: "geo.region", content: "BR-SP" },
        { name: "geo.placename", content: "São José dos Campos" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": `${url}#service`,
                name: v.h1,
                serviceType: `Guincho e reboque — ${v.nome}`,
                description,
                url,
                areaServed: {
                  "@type": "City",
                  name: "São José dos Campos",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "São José dos Campos",
                    addressRegion: "SP",
                    addressCountry: "BR",
                  },
                },
                provider: {
                  "@type": "LocalBusiness",
                  "@id": `${url}#business`,
                  name: `${SITE.name} — São José dos Campos`,
                  telephone: "+5511996451510",
                  url,
                  priceRange: "$$",
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ],
                      opens: "00:00",
                      closes: "23:59",
                    },
                  ],
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: `Serviços de guincho para ${v.nome} em São José dos Campos`,
                  itemListElement: v.servicos.map((s) => ({
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: s },
                  })),
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Início", item: `${ORIGIN}/` },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Guincho SJC",
                    item: `${ORIGIN}/guincho-sjc`,
                  },
                  { "@type": "ListItem", position: 3, name: v.h1, item: url },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: v.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: TipoNotFound,
  component: TipoVeiculoPage,
});

function TipoNotFound() {
  return (
    <div className="container flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-accent">Serviço não encontrado</h1>
      <p className="text-muted-foreground">
        Não localizamos esta página de serviço. Veja os tipos de guincho que atendemos em São José
        dos Campos.
      </p>
      <Button asChild>
        <Link to="/guincho-sjc">Ver guincho em SJC</Link>
      </Button>
    </div>
  );
}

function TipoVeiculoPage() {
  const { tipo: v } = Route.useLoaderData() as { tipo: TipoVeiculo };
  const outros = SJC_VEICULOS.filter((o) => o.slug !== v.slug);
  const waText = encodeURIComponent(
    `Olá! Preciso de guincho para ${v.nome} em São José dos Campos.`,
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background py-14 md:py-16">
        <div className="container max-w-5xl">
          <Badge className="mb-4">São José dos Campos — SP</Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-accent md:text-5xl">{v.h1}</h1>
          <p className="mb-6 max-w-3xl text-lg text-muted-foreground">{v.intro}</p>
          <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" /> Chegada em {v.eta}
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-primary" /> Atendimento 24h em toda SJC
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95"
            >
              <a href={TEL}>
                <Phone className="mr-2 h-4 w-4" /> Ligar agora — {SITE.phone}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={`https://wa.me/5511996451510?text=${waText}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp 24h
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-5xl grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Serviços de guincho para {v.nome} em São José dos Campos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {v.servicos.map((s) => (
                  <li key={s} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Situações mais comuns em SJC</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {v.situacoes.map((s) => (
                  <li key={s} className="flex gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-12">
        <div className="container max-w-5xl">
          <h2 className="mb-4 text-2xl font-bold text-accent md:text-3xl">
            Equipamento usado no guincho para {v.nome} em São José dos Campos
          </h2>
          <p className="mb-6 max-w-3xl text-muted-foreground">{v.equipamento}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {v.diferenciais.map((d) => (
              <div key={d} className="flex gap-2 rounded-lg border bg-background p-4 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-accent md:text-3xl">
            Perguntas frequentes — guincho para {v.nome} em SJC
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {v.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-12">
        <div className="container max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-accent md:text-3xl">
            Outros tipos de guincho em São José dos Campos
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {outros.map((o) => (
              <Link
                key={o.slug}
                to="/guincho-{$tipo}-sjc"
                params={{ tipo: o.slug }}
                className="group flex items-start justify-between gap-2 rounded-lg border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Truck className="h-4 w-4 shrink-0 text-primary" /> Guincho para {o.nome}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    São José dos Campos — {o.eta}
                  </span>
                </span>
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/guincho-sjc">Guincho por bairro em SJC</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guincho-em-{$slug}" params={{ slug: "sao-jose-dos-campos-sp" }}>
                Página da cidade de SJC
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guincho-postos-dutra-sao-jose-dos-campos">Postos da Dutra</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
