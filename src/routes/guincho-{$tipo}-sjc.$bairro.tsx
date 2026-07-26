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
import { Phone, Clock, Truck, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import { SITE } from "@/components/site-data";
import { SJC_VEICULOS, getTipoVeiculo, labelServico, type TipoVeiculo } from "@/lib/sjc-veiculos";
import { SJC_BAIRROS, getBairro, noBairro, type Bairro } from "@/lib/sjc-bairros";
import {
  buildLocalBusiness,
  OPENING_HOURS_24_7,
  TEL_E164,
} from "@/lib/local-business-schema";

const ORIGIN = "https://sosguincho24horas.com.br";
const TEL = "tel:+5511996451510";

function buildComboFaqs(v: TipoVeiculo, b: Bairro) {
  const em = noBairro(b);
  return [
    {
      q: `Vocês fazem guincho para ${v.nome} ${em} ${b.nome} 24 horas?`,
      a: `Sim. O atendimento de guincho para ${v.nome} ${em} ${b.nome}, em São José dos Campos, funciona 24 horas por dia, todos os dias, incluindo madrugada, fim de semana e feriado.`,
    },
    {
      q: `Quanto tempo demora o guincho para ${v.nome} ${em} ${b.nome}?`,
      a: `O tempo médio de chegada ${em} ${b.nome} é de ${b.eta}, variando conforme o trânsito e o ponto exato da ocorrência dentro de SJC.`,
    },
    {
      q: `Qual equipamento é usado no guincho para ${v.nome} em ${b.nome}?`,
      a: v.equipamento,
    },
    {
      q: `Quanto custa o guincho para ${v.nome} ${em} ${b.nome}, em São José dos Campos?`,
      a: `O valor depende da distância até o destino e da complexidade da remoção. O preço é fechado antes do envio da plataforma — informe o ponto ${em} ${b.nome} e o destino ao ligar para ${SITE.phone}.`,
    },
    {
      q: `Vocês atendem as vias principais ${em} ${b.nome}?`,
      a: `Sim. Cobrimos ${b.referencias.slice(0, 3).join(", ")} e todo o entorno de ${b.regiao}.`,
    },
  ];
}

export const Route = createFileRoute("/guincho-{$tipo}-sjc/$bairro")({
  loader: ({ params }) => {
    const tipo = getTipoVeiculo(params.tipo);
    const bairro = getBairro(params.bairro);
    if (!tipo || !bairro) throw notFound();
    return { tipo, bairro };
  },
  head: ({ params, loaderData }) => {
    const url = `${ORIGIN}/guincho-${params.tipo}-sjc/${params.bairro}`;
    if (!loaderData) {
      return {
        meta: [{ title: "Página não encontrada" }, { name: "robots", content: "noindex" }],
      };
    }
    const v = loaderData.tipo;
    const b = loaderData.bairro;
    const em = noBairro(b);
    const title = `${cap(labelServico(v))} ${em} ${b.nome} — SJC 24h`;
    const description = `${labelServico(v)} ${em} ${b.nome}, São José dos Campos (SJC), 24 horas. Chegada em ${b.eta}. ${v.equipamento}`;
    const faqs = buildComboFaqs(v, b);

    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 300) },
        {
          name: "keywords",
          content: `guincho ${v.nome} ${b.nome.toLowerCase()}, guincho ${v.nome} sjc, guincho ${b.nome.toLowerCase()} são josé dos campos, reboque ${v.nome} ${b.nome.toLowerCase()}`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 300) },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description.slice(0, 300) },
        { name: "robots", content: "index,follow" },
        { name: "geo.region", content: "BR-SP" },
        { name: "geo.placename", content: `${b.nome}, São José dos Campos` },
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
                name: `${labelServico(v)} ${em} ${b.nome} — São José dos Campos`,
                serviceType: `Guincho e reboque — ${v.nome}`,
                description: description.slice(0, 300),
                url,
                areaServed: {
                  "@type": "Place",
                  name: `${b.nome}, São José dos Campos - SP`,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "São José dos Campos",
                    addressRegion: "SP",
                    addressCountry: "BR",
                  },
                },
                provider: { "@id": `${url}#business` },
                availableChannel: {
                  "@type": "ServiceChannel",
                  serviceUrl: url,
                  servicePhone: { "@type": "ContactPoint", telephone: TEL_E164 },
                },
                hoursAvailable: OPENING_HOURS_24_7,
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: `Serviços de guincho para ${v.nome} ${em} ${b.nome}`,
                  itemListElement: v.servicos.map((s) => ({
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: s },
                  })),
                },
              },
              buildLocalBusiness({
                url,
                areaLabel: `${b.nome}, São José dos Campos - SP`,
                areaServed: {
                  "@type": "Place",
                  name: `${b.nome}, São José dos Campos - SP`,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "São José dos Campos",
                    addressRegion: "SP",
                    addressCountry: "BR",
                  },
                },
              }),
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
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: `Guincho para ${v.nome} em SJC`,
                    item: `${ORIGIN}/guincho-${params.tipo}-sjc`,
                  },
                  { "@type": "ListItem", position: 4, name: b.nome, item: url },
                ],
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                url,
                mainEntity: faqs.map((f) => ({
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
  component: ComboPage,
});

function cap(s: string) {
  if (s.startsWith("Guincho para ")) {
    const r = s.slice("Guincho para ".length);
    return `Guincho para ${r.charAt(0).toUpperCase()}${r.slice(1)}`;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ComboPage() {
  const { tipo: v, bairro: b } = Route.useLoaderData() as { tipo: TipoVeiculo; bairro: Bairro };
  const em = noBairro(b);
  const faqs = buildComboFaqs(v, b);
  const vizinhos = b.vizinhos
    .map((s) => SJC_BAIRROS.find((x) => x.slug === s))
    .filter((x): x is Bairro => Boolean(x));
  const outrosTipos = SJC_VEICULOS.filter((o) => o.slug !== v.slug);
  const wa = `https://wa.me/5511996451510?text=${encodeURIComponent(
    `Olá! Preciso de guincho para ${v.nome} ${em} ${b.nome}, São José dos Campos.`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background py-14 md:py-16">
        <div className="container max-w-5xl">
          <nav aria-label="Trilha de navegação" className="mb-4 text-sm text-muted-foreground">
            <Link to="/guincho-sjc" className="hover:text-primary">
              Guincho SJC
            </Link>
            <span className="mx-1">/</span>
            <Link
              to="/guincho-{$tipo}-sjc"
              params={{ tipo: v.slug }}
              className="hover:text-primary"
            >
              {cap(v.nome)}
            </Link>
            <span className="mx-1">/</span>
            <span className="text-foreground">{b.nome}</span>
          </nav>
          <Badge className="mb-4">{b.regiao}</Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-accent md:text-5xl">
            {labelServico(v)} {em} {b.nome} — São José dos Campos (SJC) 24h
          </h1>
          <p className="mb-6 max-w-3xl text-lg text-muted-foreground">
            {v.intro} {em === "na" ? "Na" : "No"} {b.nome} a chegada média é de {b.eta}.
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5">
              <Clock className="h-4 w-4 text-primary" /> {b.eta}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5">
              <Truck className="h-4 w-4 text-primary" /> Guincho para {v.nome}
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
              <a href={wa} target="_blank" rel="noreferrer">
                WhatsApp 24h
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="defer-paint py-12">
        <div className="container grid max-w-5xl gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Truck className="h-5 w-5 text-primary" /> O que fazemos com {v.nome} {em} {b.nome}
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
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-primary" /> Vias atendidas {em} {b.nome}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {b.referencias.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">{v.equipamento}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="defer-paint border-t bg-muted/30 py-12">
        <div className="container max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-accent md:text-3xl">
            Perguntas frequentes — guincho para {v.nome} {em} {b.nome}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="defer-paint py-12">
        <div className="container max-w-5xl space-y-8">
          <div>
            <h2 className="mb-3 text-xl font-bold text-accent">
              Guincho para {v.nome} em bairros vizinhos
            </h2>
            <div className="flex flex-wrap gap-2">
              {vizinhos.map((n) => (
                <Link
                  key={n.slug}
                  to="/guincho-{$tipo}-sjc/$bairro"
                  params={{ tipo: v.slug, bairro: n.slug }}
                  className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {cap(v.nome)} {noBairro(n)} {n.nome}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold text-accent">
              Outros tipos de guincho {em} {b.nome}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {outrosTipos.map((o) => (
                <Link
                  key={o.slug}
                  to="/guincho-{$tipo}-sjc/$bairro"
                  params={{ tipo: o.slug, bairro: b.slug }}
                  className="group flex items-center justify-between gap-2 rounded-lg border bg-background p-3 text-sm font-semibold transition-all hover:border-primary"
                >
                  Guincho para {o.nome} {em} {b.nome}
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/guincho-sjc/$bairro" params={{ bairro: b.slug }}>
                Guincho {em} {b.nome}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guincho-{$tipo}-sjc" params={{ tipo: v.slug }}>
                Guincho para {v.nome} em toda SJC
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guincho-sjc">Todos os bairros de SJC</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
