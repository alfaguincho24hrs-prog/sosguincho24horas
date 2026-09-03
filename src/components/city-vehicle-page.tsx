import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Clock,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Star,
  MapPin,
} from "lucide-react";
import { SITE } from "@/components/site-data";
import { ALL_CITIES, type City } from "@/components/cities-data";
import { TIPOS_VEICULO, findTipo, tituloRotulo, type TipoVeiculoBase } from "@/lib/city-veiculos";
import { getCityDepoimentos, getCityAggregate } from "@/lib/city-reviews";
import {
  buildLocalBusiness,
  OPENING_HOURS_24_7,
  TEL_E164,
} from "@/lib/local-business-schema";

const ORIGIN = "https://sosguincho24horas.com.br";
const TEL = "tel:+5511996451510";

function findCity(slug: string): City | undefined {
  const normalized = slug.toLowerCase().trim();
  let city = ALL_CITIES.find((c) => c.slug === normalized);
  if (city) return city;
  city = ALL_CITIES.find(
    (c) => `${c.slug}-${c.uf.toLowerCase()}` === normalized,
  );
  return city;
}


export type LoaderData = { tipo: TipoVeiculoBase; city: City };

export const TIPO_ROUTE: Record<string, "/guincho-carro-em-$slug" | "/guincho-moto-em-$slug" | "/guincho-caminhao-em-$slug" | "/guincho-transporte-de-veiculos-em-$slug"> = {
  carro: "/guincho-carro-em-$slug",
  moto: "/guincho-moto-em-$slug",
  caminhao: "/guincho-caminhao-em-$slug",
  "transporte-de-veiculos": "/guincho-transporte-de-veiculos-em-$slug",
};

/** Loader compartilhado pelas 4 rotas por tipo de veículo */
export function loadVehicleCity(tipoSlug: string, slug: string): LoaderData | null {
  const tipo = findTipo(tipoSlug);
  const city = findCity(slug);
  if (!tipo || !city) return null;
  return { tipo, city };
}

export function buildVehicleCityHead(loaderData: LoaderData | undefined) {
    if (!loaderData) {
      return {
        meta: [
          { title: "Página não encontrada" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { tipo: v, city } = loaderData;
    const citySlugUf = `${city.slug}-${city.uf.toLowerCase()}`;
    const url = `${ORIGIN}/guincho-${v.slug}-em-${citySlugUf}`;
    const cidade = `${city.name} - ${city.uf}`;
    const title = `${tituloRotulo(v.rotulo)} em ${city.name} 24h | ${city.uf}`;
    const description = `${v.rotulo} em ${cidade} 24 horas. ${v.equipamento} Chegada média em ${v.eta} na cidade e nas rodovias da região. Orçamento fechado antes do envio.`;
    const keywords = [
      `${v.kw} ${city.name.toLowerCase()}`,
      `${v.kw} em ${city.name.toLowerCase()} ${city.uf.toLowerCase()}`,
      `${v.kw} 24 horas ${city.name.toLowerCase()}`,
      `reboque de ${v.nome} ${city.name.toLowerCase()}`,
      `guincho 24h ${city.name.toLowerCase()}`,
    ].join(", ");

    const agg = getCityAggregate(`${citySlugUf}-${v.slug}`);
    const reviews = getCityDepoimentos(city.name, `${citySlugUf}-${v.slug}`);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "robots", content: "index,follow" },
        { name: "geo.region", content: `BR-${city.uf}` },
        { name: "geo.placename", content: city.name },
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
                name: `${v.rotulo} em ${cidade} 24 horas`,
                serviceType: `Guincho e reboque — ${v.nome}`,
                description,
                url,
                areaServed: {
                  "@type": "City",
                  name: city.name,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: city.name,
                    addressRegion: city.uf,
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
                  name: `${v.rotulo} em ${city.name}`,
                  itemListElement: v.servicos.map((s) => ({
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: `${s} em ${city.name}` },
                  })),
                },
              },
              buildLocalBusiness({
                url,
                areaLabel: `${city.name} - ${city.uf}`,
                areaServed: {
                  "@type": "City",
                  name: city.name,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: city.name,
                    addressRegion: city.uf,
                    addressCountry: "BR",
                  },
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: agg.ratingValue,
                  reviewCount: String(agg.reviewCount),
                },
                review: reviews.map((r) => ({
                  "@type": "Review",
                  author: { "@type": "Person", name: r.autor },
                  datePublished: r.data,
                  reviewBody: r.texto,
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: String(r.nota),
                    bestRating: "5",
                  },
                })),
              }),
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                url,
                mainEntity: v.faqs(city.name).map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },

              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Início", item: `${ORIGIN}/` },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: `Guincho em ${city.name}`,
                    item: `${ORIGIN}/guincho-em-${citySlugUf}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: `${v.rotulo} em ${city.name}`,
                    item: url,
                  },
                ],
              },
            ],
          }),
        },
      ],
    };
  }

export function VehicleCityNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-4 text-muted-foreground">
        Não encontramos esse serviço para a cidade informada.
      </p>
      <Button asChild className="mt-8">
        <Link to="/servicos-de-guincho-e-reboque">Ver todas as cidades</Link>
      </Button>
    </main>
  );
}

export function VehicleCityPage({ data }: { data: LoaderData }) {
  const v = data.tipo;
  const city = data.city;
  const citySlugUf = `${city.slug}-${city.uf.toLowerCase()}`;
  const cidade = `${city.name} - ${city.uf}`;
  const faqs = v.faqs(city.name);
  const depoimentos = getCityDepoimentos(city.name, `${citySlugUf}-${v.slug}`);
  const agg = getCityAggregate(`${citySlugUf}-${v.slug}`);
  const outros = TIPOS_VEICULO.filter((t) => t.slug !== v.slug);
  const vizinhas = ALL_CITIES.filter(
    (c) => c.uf === city.uf && c.slug !== city.slug,
  ).slice(0, 8);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Navegação estrutural" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link to="/" className="hover:text-primary">Início</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
          <li>
            <Link
              to="/guincho-em-{$slug}"
              params={{ slug: citySlugUf }}
              className="hover:text-primary"
            >
              Guincho em {city.name}
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
          <li aria-current="page" className="text-foreground">{v.rotulo}</li>
        </ol>
      </nav>

      <header>
        <Badge variant="secondary" className="mb-3">
          <Clock className="mr-1 h-3.5 w-3.5" /> Chegada média: {v.eta}
        </Badge>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          {v.rotulo} em {city.name} 24 horas
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Precisa de {v.rotulo.toLowerCase()} em {cidade}? Atendemos a cidade
          inteira e as rodovias da região, 24 horas por dia, com orçamento
          fechado antes do envio do guincho.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={TEL}>
              <Phone className="mr-2 h-4 w-4" /> Ligar agora — (11) 99645-1510
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://wa.me/5511996451510">Chamar no WhatsApp</a>
          </Button>
        </div>
      </header>

      <section className="defer-paint mt-12">
        <h2 className="text-2xl font-semibold">
          Equipamento usado no {v.rotulo.toLowerCase()} em {city.name}
        </h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">{v.equipamento}</p>
      </section>

      <section className="defer-paint mt-12">
        <h2 className="text-2xl font-semibold">
          O que está incluso em {city.name}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {v.servicos.map((s) => (
            <Card key={s}>
              <CardContent className="flex gap-3 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">{s}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="defer-paint mt-12">
        <h2 className="text-2xl font-semibold">
          Situações mais comuns em {city.name}
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {v.situacoes.map((s) => (
            <li key={s} className="flex gap-3 rounded-lg border p-4 text-sm">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {s.replace("{cidade}", city.name)}
            </li>
          ))}
        </ul>
      </section>

      <section className="defer-paint mt-12">
        <h2 className="text-2xl font-semibold">Por que chamar a gente</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {v.diferenciais.map((d) => (
            <li key={d} className="flex gap-3 rounded-lg bg-secondary/40 p-4 text-sm">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="defer-paint mt-12">
        <h2 className="text-2xl font-semibold">
          Quem já chamou em {city.name}
        </h2>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </span>
          {agg.ratingValue} de 5 — {agg.reviewCount} avaliações
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {depoimentos.map((d) => (
            <Card key={d.autor}>
              <CardContent className="p-5">
                <div className="flex gap-0.5" aria-label={`Nota ${d.nota} de 5`}>
                  {Array.from({ length: d.nota }, (_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{d.texto}</p>
                <p className="mt-4 text-sm font-medium">
                  {d.autor} · {d.cidade}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="defer-paint mt-12">
        <h2 className="text-2xl font-semibold">
          Perguntas frequentes — {v.rotulo.toLowerCase()} em {city.name}
        </h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="defer-paint mt-12">
        <h2 className="text-2xl font-semibold">
          Outros serviços em {city.name}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {outros.map((t) => (
            <Link
              key={t.slug}
              to={TIPO_ROUTE[t.slug]}
              params={{ slug: citySlugUf }}
              className="rounded-lg border p-4 text-sm font-medium hover:border-primary hover:text-primary"
            >
              {t.rotulo} em {city.name}
            </Link>
          ))}
          <Link
            to="/guincho-em-{$slug}"
            params={{ slug: citySlugUf }}
            className="rounded-lg border p-4 text-sm font-medium hover:border-primary hover:text-primary"
          >
            Guincho 24h em {city.name} (página completa)
          </Link>
        </div>
      </section>

      {vizinhas.length > 0 && (
        <section className="defer-paint mt-12">
          <h2 className="text-2xl font-semibold">
            {v.rotulo} em cidades próximas
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {vizinhas.map((c) => (
              <Link
                key={c.slug}
                to={TIPO_ROUTE[v.slug]}
                params={{ slug: `${c.slug}-${c.uf.toLowerCase()}` }}
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
              >
                <MapPin className="h-3.5 w-3.5" /> {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="defer-paint mt-14 rounded-2xl bg-secondary/50 p-10 text-center">
        <h2 className="text-2xl font-semibold">
          {v.rotulo} em {cidade} agora
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Atendimento 24 horas, todos os dias. Informe o local e o destino e o
          valor é fechado antes de sair.
        </p>
        <Button asChild size="lg" className="mt-6">
          <a href={TEL}>
            <Phone className="mr-2 h-4 w-4" /> (11) 99645-1510
          </a>
        </Button>
      </section>
    </main>
  );
}
