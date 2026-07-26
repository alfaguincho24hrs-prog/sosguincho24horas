import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MapPin, ChevronRight } from "lucide-react";
import { SITE } from "@/components/site-data";
import { SJC_BAIRROS } from "@/lib/sjc-bairros";

const ORIGIN = "https://sosguincho24horas.com.br";
const URL = `${ORIGIN}/guincho-sjc`;
const TEL = "tel:+5511996451510";

const FAQS = [
  {
    q: "O guincho SJC atende quais bairros de São José dos Campos?",
    a: "Atendemos toda a cidade: Zona Leste, Zona Sul, Zona Norte, Centro, Jardim Satélite, Jardim Aquarius, Urbanova, Jardim Esplanada, Vila Adyana, Bosque dos Eucaliptos, Parque Industrial, Eugênio de Melo, Putim, Campo dos Alemães, Jardim Morumbi, Vila Industrial, Santana, Jardim Paulista e Vista Verde, além da área rural e das rodovias que cortam o município.",
  },
  {
    q: "Qual o telefone do guincho 24 horas em SJC?",
    a: `Ligue para ${SITE.phone} ou chame no WhatsApp. A central funciona 24 horas por dia, todos os dias do ano, inclusive madrugada e feriado.`,
  },
  {
    q: "Quanto tempo demora o guincho em São José dos Campos?",
    a: "O tempo médio de chegada é de 15 a 40 minutos, dependendo do bairro e do trânsito. Regiões centrais como Centro, Vila Adyana e Jardim Aquarius costumam ser atendidas em até 30 minutos.",
  },
  {
    q: "Vocês atendem nas rodovias que passam por SJC?",
    a: "Sim. Cobrimos a Via Dutra (BR-116) em todo o trecho de São José dos Campos, incluindo postos e áreas de descanso, a Rodovia dos Tamoios (SP-099) rumo ao Litoral Norte e a Carvalho Pinto (SP-070).",
  },
];

export const Route = createFileRoute("/guincho-sjc/")({
  head: () => {
    const title = "Guincho SJC 24 Horas — Guincho por Bairro em São José dos Campos";
    const description =
      "Guincho SJC 24h: atendimento por bairro em São José dos Campos — Zona Leste, Zona Sul, Centro, Jardim Satélite, Aquarius, Urbanova e mais. Chegada em 15 a 40 min.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "guincho sjc, guincho são josé dos campos, guincho 24 horas sjc, reboque sjc, auto socorro são josé dos campos, guincho por bairro sjc",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: URL },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "robots", content: "index,follow" },
        { name: "geo.region", content: "BR-SP" },
        { name: "geo.placename", content: "São José dos Campos" },
      ],
      links: [{ rel: "canonical", href: URL }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "@id": `${URL}#business`,
                name: `${SITE.name} — São José dos Campos`,
                description,
                url: URL,
                telephone: "+5511996451510",
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
                areaServed: SJC_BAIRROS.map((b) => ({
                  "@type": "Place",
                  name: `${b.nome}, São José dos Campos - SP`,
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Início", item: `${ORIGIN}/` },
                  { "@type": "ListItem", position: 2, name: "Guincho SJC", item: URL },
                ],
              },
              {
                "@type": "ItemList",
                name: "Bairros atendidos em São José dos Campos",
                itemListElement: SJC_BAIRROS.map((b, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: `Guincho 24h no ${b.nome}`,
                  url: `${URL}/${b.slug}`,
                })),
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQS.map((f) => ({
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
  component: GuinchoSjcHub,
});

function GuinchoSjcHub() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background py-14 md:py-16">
        <div className="container max-w-5xl">
          <Badge className="mb-4">São José dos Campos — SP</Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-accent md:text-5xl">
            Guincho SJC 24 horas — atendimento bairro a bairro
          </h1>
          <p className="mb-6 max-w-3xl text-lg text-muted-foreground">
            Precisa de guincho em São José dos Campos agora? Escolha o seu bairro abaixo e veja o
            tempo médio de chegada, as vias atendidas e o tipo de plataforma disponível. Central
            aberta 24 horas, todos os dias.
          </p>
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
                href="https://wa.me/5511996451510?text=Ol%C3%A1!%20Preciso%20de%20guincho%20em%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos."
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
        <div className="container max-w-5xl">
          <h2 className="mb-6 text-3xl font-bold text-accent">
            Bairros de São José dos Campos atendidos
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SJC_BAIRROS.map((b) => (
              <Link
                key={b.slug}
                to="/guincho-sjc/$bairro"
                params={{ bairro: b.slug }}
                className="group flex items-start justify-between gap-2 rounded-lg border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" /> {b.nome}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Chegada em {b.eta}
                  </span>
                </span>
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-12">
        <div className="container max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-accent">
            Perguntas frequentes sobre guincho em SJC
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/guincho-em-{$slug}" params={{ slug: "sao-jose-dos-campos-sp" }}>
                Página da cidade de SJC
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guincho-postos-dutra-sao-jose-dos-campos">Postos da Dutra</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/rodovias-vale-do-paraiba">Rodovias do Vale do Paraíba</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
