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
import { Phone, MapPin, AlertTriangle, Clock, ChevronRight, Truck, Star } from "lucide-react";
import { SITE } from "@/components/site-data";
import { SJC_BAIRROS, getBairro, buildFaqs, noBairro, type Bairro } from "@/lib/sjc-bairros";
import { SJC_VEICULOS } from "@/lib/sjc-veiculos";
import { getDepoimentos, getAggregate } from "@/lib/sjc-reviews";

const ORIGIN = "https://sosguincho24horas.com.br";
const TEL = "tel:+5511996451510";

export const Route = createFileRoute("/guincho-sjc/$bairro")({
  loader: ({ params }) => {
    const bairro = getBairro(params.bairro);
    if (!bairro) throw notFound();
    return { bairro };
  },
  head: ({ params, loaderData }) => {
    const url = `${ORIGIN}/guincho-sjc/${params.bairro}`;
    if (!loaderData) {
      return {
        meta: [{ title: "Bairro não encontrado" }, { name: "robots", content: "noindex" }],
      };
    }
    const b = loaderData.bairro;
    const em = noBairro(b);
    const title = `Guincho 24h ${em} ${b.nome} — São José dos Campos/SP | SOS Guincho`;
    const description = b.resumo;
    const faqs = buildFaqs(b);
    const depoimentos = getDepoimentos(b, 3);
    const agg = getAggregate(b);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content: `guincho ${b.nome.toLowerCase()}, guincho ${b.nome.toLowerCase()} sjc, reboque ${b.nome.toLowerCase()} são josé dos campos, guincho 24 horas ${b.nome.toLowerCase()}, auto socorro ${b.nome.toLowerCase()}`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
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
                "@type": "LocalBusiness",
                "@id": `${url}#business`,
                name: `${SITE.name} — ${b.nome}, São José dos Campos`,
                description,
                url,
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
                areaServed: [
                  { "@type": "Place", name: `${b.nome}, São José dos Campos - SP` },
                  { "@type": "City", name: "São José dos Campos" },
                ],
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: agg.ratingValue,
                  reviewCount: agg.reviewCount,
                  bestRating: "5",
                  worstRating: "1",
                },
                review: depoimentos.map((d) => ({
                  "@type": "Review",
                  author: { "@type": "Person", name: d.autor },
                  datePublished: d.data,
                  reviewBody: d.texto,
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: String(d.nota),
                    bestRating: "5",
                    worstRating: "1",
                  },
                  itemReviewed: { "@id": `${url}#business` },
                })),
              },
              {
                "@type": "Service",
                name: `Guincho e reboque 24 horas ${em} ${b.nome}`,
                serviceType: "Guincho, reboque e auto socorro 24 horas",
                provider: { "@id": `${url}#business` },
                areaServed: { "@type": "Place", name: `${b.nome}, São José dos Campos - SP` },
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
                  { "@type": "ListItem", position: 3, name: b.nome, item: url },
                ],
              },
              {
                "@type": "FAQPage",
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
  notFoundComponent: BairroNotFound,
  component: BairroPage,
});

function BairroNotFound() {
  return (
    <div className="container flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-accent">Bairro não encontrado</h1>
      <p className="text-muted-foreground">
        Não localizamos esta região em São José dos Campos. Veja a lista completa de bairros
        atendidos.
      </p>
      <Button asChild>
        <Link to="/guincho-sjc">Ver todos os bairros de SJC</Link>
      </Button>
    </div>
  );
}

function BairroPage() {
  const { bairro: b } = Route.useLoaderData() as { bairro: Bairro };
  const faqs = buildFaqs(b);
  const em = noBairro(b);
  const depoimentos = getDepoimentos(b, 3);
  const agg = getAggregate(b);
  const vizinhos = b.vizinhos
    .map((slug) => SJC_BAIRROS.find((x) => x.slug === slug))
    .filter((x): x is (typeof SJC_BAIRROS)[number] => Boolean(x));
  const wa = `https://wa.me/5511996451510?text=${encodeURIComponent(
    `Olá! Preciso de guincho ${noBairro(b)} ${b.nome}, São José dos Campos.`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background py-14 md:py-16">
        <div className="container max-w-5xl">
          <nav aria-label="Trilha de navegação" className="mb-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Início
            </Link>
            <span className="mx-1">/</span>
            <Link to="/guincho-sjc" className="hover:text-primary">
              Guincho SJC
            </Link>
            <span className="mx-1">/</span>
            <span className="text-foreground">{b.nome}</span>
          </nav>
          <Badge className="mb-4">{b.regiao}</Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-accent md:text-5xl">
            Guincho 24h {em} {b.nome} — São José dos Campos
          </h1>
          <p className="mb-6 max-w-3xl text-lg text-muted-foreground">{b.resumo}</p>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5">
              <Clock className="h-4 w-4 text-primary" /> Chegada média: {b.eta}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5">
              <Truck className="h-4 w-4 text-primary" /> Leve, pesado, moto e prancha
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="h-5 w-5 text-primary" /> Onde atendemos {em} {b.nome}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {b.referencias.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="h-5 w-5 text-primary" /> Chamados mais comuns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {b.ocorrencias.map((o) => (
                  <li key={o}>• {o}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="defer-paint border-t bg-muted/30 py-12">
        <div className="container max-w-4xl space-y-4">
          <h2 className="text-3xl font-bold text-accent">
            Serviços disponíveis {em} {b.nome} 24 horas
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["/guincho-leve", "Guincho leve e plataforma"],
              ["/guincho-pesado", "Guincho pesado para caminhão"],
              ["/guincho-de-motos", "Guincho de motos"],
              ["/auto-socorro", "Auto socorro mecânico"],
              ["/pane-seca", "Pane seca e combustível"],
              ["/remocao-veicular", "Remoção veicular e pátio"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center justify-between rounded-lg border bg-background p-3 text-sm font-semibold transition-all hover:border-primary"
              >
                {label}
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="defer-paint py-12">
        <div className="container max-w-5xl">
          <div className="mb-6 flex flex-wrap items-baseline gap-3">
            <h2 className="text-3xl font-bold text-accent">
              Quem já chamou guincho {em} {b.nome}
            </h2>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground">
              <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
              {agg.ratingValue} de 5 — {agg.reviewCount} avaliações
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {depoimentos.map((d) => (
              <figure
                key={d.autor + d.data}
                className="flex h-full flex-col justify-between rounded-lg border bg-background p-5"
              >
                <blockquote className="text-sm text-muted-foreground">“{d.texto}”</blockquote>
                <figcaption className="mt-4 border-t pt-3 text-sm">
                  <span className="block font-semibold text-foreground">{d.autor}</span>
                  <span className="block text-xs text-muted-foreground">
                    {b.nome}, São José dos Campos ·{" "}
                    {new Date(d.data + "T12:00:00").toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span
                    className="mt-1 flex gap-0.5"
                    aria-label={`Nota ${d.nota} de 5`}
                    role="img"
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className={
                          i < d.nota
                            ? "h-3.5 w-3.5 fill-primary text-primary"
                            : "h-3.5 w-3.5 text-muted-foreground/40"
                        }
                      />
                    ))}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="defer-paint border-t bg-muted/30 py-12">
        <div className="container max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-accent md:text-3xl">
            Guincho por tipo de veículo {em} {b.nome}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SJC_VEICULOS.map((v) => (
              <Link
                key={v.slug}
                to="/guincho-{$tipo}-sjc/$bairro"
                params={{ tipo: v.slug, bairro: b.slug }}
                className="group flex items-center justify-between gap-2 rounded-lg border bg-background p-4 text-sm font-semibold transition-all hover:border-primary hover:shadow-md"
              >
                <span className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 shrink-0 text-primary" /> Guincho para {v.nome} {em}{" "}
                  {b.nome}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="defer-paint py-12">
        <div className="container max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-accent">
            Perguntas frequentes sobre guincho {em} {b.nome}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="defer-paint border-t bg-muted/30 py-12">
        <div className="container max-w-5xl space-y-8">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-accent">
              Bairros vizinhos {em === "na" ? "à" : "ao"} {b.nome} que também atendemos
            </h2>
            <div className="flex flex-wrap gap-2">
              {vizinhos.map((v) => (
                <Link
                  key={v.slug}
                  to="/guincho-sjc/$bairro"
                  params={{ bairro: v.slug }}
                  className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Guincho {noBairro(v)} {v.nome}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/guincho-sjc">Todos os bairros de São José dos Campos</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guincho-em-{$slug}" params={{ slug: "sao-jose-dos-campos-sp" }}>
                Guincho em São José dos Campos
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/guincho-postos-dutra-sao-jose-dos-campos">Postos da Dutra em SJC</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
