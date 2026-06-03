import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCityLocalData } from "@/components/city-neighborhoods";
import {
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  Fuel,
  Bike,
  Car,
} from "lucide-react";
import { lazy, Suspense, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SITE } from "@/components/site-data";
import { ALL_CITIES, type City } from "@/components/cities-data";
import { getCityProviders } from "@/components/city-providers";
import { ProviderDirectory } from "@/components/provider-cards";
import { getCityCopy } from "@/components/city-variations";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { AdminEditButton } from "@/components/admin-edit-button";
import { EtaBadge } from "@/components/eta-badge";
import { LeadFormGeo } from "@/components/lead-form-geo";
import { CitySocialProof } from "@/components/city-social-proof";

const SITE_URL = "https://sosguincho24horas.com.br";

function findCity(slug: string): City | undefined {
  const normalized = slug.toLowerCase().trim();
  // Match exact slug (e.g. "sao-paulo")
  let city = ALL_CITIES.find((c) => c.slug === normalized);
  if (city) return city;
  // Match slug with UF suffix (e.g. "americana-sp" or "sao-paulo-sp")
  city = ALL_CITIES.find(
    (c) => `${c.slug}-${c.uf.toLowerCase()}` === normalized
  );
  if (city) return city;
  // Match slug where UF prefix is part (fallback)
  const ufMatch = normalized.match(/-([a-z]{2})$/);
  if (ufMatch) {
    const baseSlug = normalized.slice(0, -3);
    const uf = ufMatch[1].toUpperCase();
    city = ALL_CITIES.find((c) => c.slug === baseSlug && c.uf === uf);
    if (city) return city;
    city = ALL_CITIES.find((c) => c.slug === baseSlug);
    if (city) return city;
  }
  return undefined;
}

export const Route = createFileRoute("/guincho-em-{$slug}")({
  loader: ({ params }) => {
    const city = findCity(params.slug);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { city } = loaderData;
    const copy = getCityCopy(city.name, city.uf, city.slug);
    
    // SEO Titles and Descriptions optimized for highways
    let title = `Guincho em ${city.name} - ${city.uf} | Reboque 24 Horas | ${SITE.name}`;
    let description = `Precisa de guincho em ${city.name}/${city.uf}? Oferecemos reboque 24 horas rápido e seguro para carros, motos e pesados em toda a região de ${city.name}. Auto socorro imediato com o melhor preço!`;
    
    if (city.slug === 'sao-paulo' || city.slug === 'sao-paulo-sp') {
      title = `Guincho 24h SP: Marginal, Dutra, Castelo Branco | Reboque Rápido`;
      description = `Socorro e guincho 24h em São Paulo/SP. Atendimento imediato nas Marginais, Bandeirantes, Anhanguera, Imigrantes e Dutra. Chegada rápida em todas as zonas de SP!`;
    } else if (copy.regionalContext?.highways?.length) {
      const mainHighway = copy.regionalContext.highways[0];
      title = `Guincho em ${city.name} - ${mainHighway} | Reboque 24h`;
      description = `Precisa de guincho na ${mainHighway} em ${city.name}? Atendimento 24 horas para carros e motos com chegada rápida. Ligue agora!`;
    }

    const url = `${SITE_URL}/guincho-em-${city.slug}-${city.uf.toLowerCase()}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content: `guincho ${city.name}, reboque ${city.name}, guincho 24 horas ${city.name} ${city.uf}, auto socorro ${city.name}, pane seca ${city.name}, guincho perto de mim ${city.name}${copy.regionalContext?.highways?.length ? `, guincho ${copy.regionalContext.highways[0]}` : ""}`,
        },
        { name: "robots", content: "index, follow" },
        { name: "geo.region", content: `BR-${city.uf}` },
        { name: "geo.placename", content: city.name },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h2 className="text-3xl font-bold">Cidade não encontrada</h2>
      <p className="mt-3 text-muted-foreground">
        Não localizamos esta cidade em nossa cobertura.
      </p>
      <Button asChild className="mt-6">
        <Link to="/servicos-de-guincho-e-reboque">Ver todas as cidades</Link>
      </Button>
    </div>
  ),
  component: CityPage,
});

const SERVICE_ITEMS = [
  { icon: Car, title: "Guincho para carros", desc: "Plataforma hidráulica para veículos de passeio, SUVs e utilitários." },
  { icon: Truck, title: "Guincho pesado", desc: "Resgate de caminhões, ônibus e máquinas com equipamento robusto." },
  { icon: Bike, title: "Guincho de motos", desc: "Transporte seguro com içamento adequado, sem riscos à pintura." },
  { icon: Wrench, title: "Auto socorro mecânico", desc: "Pequenos reparos, troca de pneu e bateria descarregada no local." },
  { icon: Fuel, title: "Pane seca", desc: "Entrega emergencial de combustível na via pública ou rodovia." },
  { icon: ShieldCheck, title: "Remoção veicular", desc: "Retirada de sinistrados, leilões e transportes programados." },
];

function CityPage() {
  const { city } = Route.useLoaderData();
  const telHref = `tel:${SITE.phone.replace(/\D/g, "")}`;
  const local = getCityLocalData(`${city.slug}-${city.uf.toLowerCase()}`, city.uf);
  const copy = getCityCopy(city.name, city.uf, city.slug);

  const mapQuery = encodeURIComponent(`Guincho 24h ${city.name} ${city.uf}`);
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `SOS Guincho 24 horas - ${city.name}`,
    "image": "https://sosguincho24horas.com.br/assets/imagem-do-guincho.webp",
    "@id": `https://sosguincho24horas.com.br/guincho-em-${city.slug}-${city.uf.toLowerCase()}.html`,
    "url": `https://sosguincho24horas.com.br/guincho-em-${city.slug}-${city.uf.toLowerCase()}`,
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
      "addressLocality": city.name,
      "addressRegion": city.uf,
      "addressCountry": "BR"
    },
    "description": `Serviço de guincho 24 horas em ${city.name}, reboque de carros e motos, auto socorro mecânico, remoção de veículos pesados em toda a região. Atendimento rápido e preço justo.`,
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "64"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Serviços de Reboque em ${city.name}`,
      "itemListElement": SERVICE_ITEMS.map((s, i) => ({
        "@type": "Offer",
        "position": i + 1,
        "itemOffered": {
          "@type": "Service",
          "name": `${s.title} em ${city.name}${city.slug === 'sao-paulo' ? ' e Marginais' : ''}`,
          "description": s.desc,
          "provider": {
            "@type": "LocalBusiness",
            "name": SITE.name,
            "telephone": SITE.phone,
            "url": SITE_URL
          }
        }
      }))
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        ...copy.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        })),
        ...(city.slug === 'sao-paulo' ? [
          {
            "@type": "Question",
            "name": "Vocês atendem guincho nas marginais Tietê e Pinheiros?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, temos unidades de prontidão em pontos estratégicos das Marginais Tietê e Pinheiros para atendimento imediato em qualquer horário."
            }
          }
        ] : [])
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: "/" },
          { name: "Cidades atendidas", url: "/servicos-de-guincho-e-reboque" },
          { name: `Guincho em ${city.name} - ${city.uf}`, url: `/guincho-em-${city.slug}-${city.uf.toLowerCase()}` },
        ]}
      />

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Início</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/servicos-de-guincho-e-reboque">Cidades</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {city.name} - {city.uf}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero */}
      <header className="rounded-2xl bg-[image:var(--gradient-hero,linear-gradient(135deg,hsl(var(--secondary)),hsl(var(--background))))] p-8 md:p-12">
        <Badge variant="secondary" className="mb-3">
          <MapPin className="mr-1 h-3 w-3" /> {city.name} - {city.uf}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-accent">
          <span className="inline-block mr-2">Guincho 24 Horas em</span>
          <span className="inline-block">{city.name} - {city.uf}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{copy.heroIntro}</p>
        <div className="mt-5">
          <EtaBadge cityName={city.name} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
            <a href="https://w.app/guincho24horas">
              <Phone className="h-4 w-4" /> Ligar para (11) 99645-1510
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://w.app/guincho24horas"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> Atendimento 24h
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4" /> Empresas credenciadas
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-500" /> Nota 4.9/5
          </span>
        </div>
      </header>

      {/* Diretório de prestadores (Cards Ouro + Fantasma) */}
      <ProviderDirectory
        providers={getCityProviders(`${city.slug}-${city.uf.toLowerCase()}`)}
        cityName={city.name}
        cityUf={city.uf}
      />


      {/* Serviços na cidade */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold md:text-3xl text-accent/90">{copy.servicesTitle}</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">{copy.servicesIntro}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_ITEMS.map((s) => (
            <Card key={s.title} className="border-border/60">
              <CardContent className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold">
                  {s.title} em {city.name}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bairros e CEPs - SEO local hiper-segmentado */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold md:text-3xl text-accent/90">{copy.neighborhoodsTitle}</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Nosso serviço de guincho 24h cobre todos os bairros de {city.name}/{city.uf},
          incluindo região central, zona industrial, bairros residenciais e
          rodovias de acesso. {local.cepRange ? (
            <>Atendemos a faixa de CEP <strong>{local.cepRange}</strong>.</>
          ) : null}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {local.neighborhoods.map((b) => (
            <span
              key={b}
              className="rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-sm"
            >
              Guincho no {b}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Não encontrou seu bairro? Atendemos toda a região metropolitana de
          {" "}{city.name}. Ligue agora e confirme a cobertura no seu endereço.
        </p>

        {/* Mapa Google incorporado para SEO local — Otimizado com useMemo e carregamento eficiente */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border/60 shadow-[var(--shadow-elegant)] bg-muted/20 min-h-[360px] relative">
          <Suspense fallback={<div className="h-[360px] w-full flex items-center justify-center bg-muted/20">Carregando mapa...</div>}>
            <OptimizedMap city={city} mapEmbedSrc={mapEmbedSrc} />
          </Suspense>
        </div>
      </section>

      {/* Por que escolher */}
      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl text-accent/90">{copy.whyTitle}</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                Empresas locais credenciadas em {city.name} com motoristas
                experientes e veículos vistoriados.
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                Tempo médio de chegada reduzido graças à malha de parceiros
                distribuída por toda a região metropolitana de {city.name}.
              </span>
            </li>
            <li className="flex gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                Frota completa: plataformas leves, asas-delta e guinchos pesados
                para qualquer porte de veículo.
              </span>
            </li>
            <li className="flex gap-3">
              <Star className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>
                Avaliações positivas de clientes atendidos em {city.name}/{city.uf}.
              </span>
            </li>
          </ul>
        </div>
        <LeadFormGeo defaultCity={city.name} />
      </section>

      {/* Prova social por cidade */}
      <CitySocialProof cityName={city.name} neighborhoods={local.neighborhoods} uf={city.uf} />

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold md:text-3xl text-accent/90">{copy.faqTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {copy.faqs.map((f) => (
            <Card key={f.q} className="border-border/60">
              <CardContent className="p-5">
                <h4 className="font-semibold">{f.q}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </CardContent>
            </Card>
          ))}
          {(city.slug === 'sao-paulo' || city.slug === 'sao-paulo-sp') && (
            <>
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <h4 className="font-semibold">Vocês atendem guincho nas marginais Tietê e Pinheiros?</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Sim, temos unidades de prontidão em pontos estratégicos das Marginais Tietê e Pinheiros para atendimento imediato em qualquer horário, garantindo a retirada rápida do veículo.</p>
                </CardContent>
              </Card>
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <h4 className="font-semibold">Quanto tempo demora o guincho para chegar na Rodovia dos Bandeirantes?</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Nosso tempo médio de chegada na Rodovia dos Bandeirantes, trecho capital, é de 30 a 45 minutos, dependendo das condições do trânsito no momento do chamado.</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      {/* Cidades vizinhas + serviços relacionados — interlinking semântico regional */}
      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-accent/90">Atendimento Regional em {city.uf}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Operamos com uma rede logística que permite interligar o socorro entre {city.name} e cidades vizinhas com rapidez.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ALL_CITIES.filter((c) => {
              // Interlinking semântico: se for Taubaté, mostra Tremembé, Caçapava, Pinda
              const regionalMap: Record<string, string[]> = {
                "taubate-sp": ["tremembe-sp", "cacapava-sp", "pindamonhangaba-sp", "sao-jose-dos-campos-sp"],
                "sao-jose-dos-campos-sp": ["jacarei-sp", "cacapava-sp", "santa-branca-sp", "monteiro-lobato-sp"],
                "pindamonhangaba-sp": ["taubate-sp", "tremembe-sp", "roseira-sp", "aparecida-sp"],
                "jacarei-sp": ["sao-jose-dos-campos-sp", "santa-branca-sp", "guarulhos-sp", "igara-sp"]
              };
              const cityKey = `${city.slug}-${city.uf.toLowerCase()}`;
              if (regionalMap[cityKey]) {
                return regionalMap[cityKey].includes(`${c.slug}-${c.uf.toLowerCase()}`);
              }
              // Fallback para cidades da mesma UF
              return c.uf === city.uf && c.slug !== city.slug;
            })
              .slice(0, 6)
              .map((c) => (
                <Link
                  key={c.slug}
                  to="/guincho-em-{$slug}"
                  params={{ slug: `${c.slug}-${c.uf.toLowerCase()}` }}
                  className="rounded-full border bg-secondary/40 px-3 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Guincho em {c.name}
                </Link>
              ))}
          </div>
          <div className="mt-6 space-y-2">
            <h4 className="font-semibold text-sm">Rodovias Atendidas</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Rod. Presidente Dutra", slug: "rodovia-presidente-dutra" },
                { name: "Rod. Carvalho Pinto", slug: "rodovia-carvalho-pinto" },
                { name: "Marginal Tietê", slug: "marginal-tiete" },
                { name: "Castelo Branco", slug: "rodovia-castelo-branco" },
                { name: "Anhanguera", slug: "rodovia-anhanguera" },
                { name: "Bandeirantes", slug: "rodovia-dos-bandeirantes" },
                { name: "Imigrantes", slug: "rodovia-dos-imigrantes" },
                { name: "Anchieta", slug: "rodovia-anchieta" },
                { name: "Rodoanel", slug: "rodoanel-mario-covas" },
                { name: "Ayrton Senna", slug: "rodovia-ayrton-senna" },
                { name: "Raposo Tavares", slug: "rodovia-raposo-tavares" },
                { name: "Fernão Dias", slug: "rodovia-fernao-dias" },
                { name: "Marginal Pinheiros", slug: "marginal-pinheiros" },
              ].map(highway => (
                <Link
                  key={highway.slug}
                  to="/guinchos-nas-rodovias-{$slug}"
                  params={{ slug: highway.slug }}
                  className="text-xs bg-muted px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors"
                >
                  {highway.name}
                </Link>
              ))}
              {city.slug === 'sao-paulo' && (
                <div className="w-full mt-4 space-y-4">
                  {copy.regionalContext?.zones && Object.entries(copy.regionalContext.zones).map(([zone, roads]) => (
                    <div key={zone} className="space-y-2">
                      <h5 className="text-sm font-bold text-accent/80">{zone}</h5>
                      <div className="flex flex-wrap gap-2">
                        {roads.map(road => (
                          <span key={road} className="text-xs bg-muted px-2 py-1 rounded">{road}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Mapa interativo de rodovias e pontos de atendimento para SP */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-accent">Pontos de Apoio em Rodovias</h5>
                      <Badge variant="outline" className="text-[10px] animate-pulse bg-green-500/5 text-green-600 border-green-200">
                        Unidades Online
                      </Badge>
                    </div>
                    
                    <div className="overflow-hidden rounded-xl border border-border/60 shadow-md bg-muted/10 relative group">
                      <iframe
                        title="Mapa de Atendimento em Rodovias de São Paulo"
                        src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d117036.01254881845!2d-46.6333!3d-23.5505!3m2!1i1024!2i768!4f13.1!2m1!1sguincho+24h+rodovias+sao+paulo!5e0!3m2!1spt-BR!2sbr!4v1717430400000!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="filter grayscale-[0.2] contrast-[1.1]"
                      />
                      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                         <div className="bg-background/95 backdrop-blur-sm p-3 rounded-lg border shadow-lg flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                            <p className="text-[11px] font-medium">Bases móveis monitoradas via GPS em tempo real</p>
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { name: "Base Norte", loc: "Marginal Tietê / Dutra" },
                        { name: "Base Sul", loc: "Pinheiros / Imigrantes" },
                        { name: "Base Leste", loc: "Radial / Ayrton Senna" },
                        { name: "Base Oeste", loc: "Castelo / Raposo" },
                        { name: "Base Centro", loc: "23 de Maio / Tiradentes" },
                        { name: "Rodoanel", loc: "Trecho Sul e Oeste" }
                      ].map((base) => (
                        <div key={base.name} className="p-3 bg-secondary/30 rounded-lg border border-border/40 hover:border-primary/40 transition-colors">
                          <p className="text-[9px] uppercase font-bold text-muted-foreground mb-1">{base.name}</p>
                          <p className="text-[11px] font-semibold leading-tight">{base.loc}</p>
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs font-bold gap-2"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(() => {
                            // Em um app real, aqui calcularíamos a base mais próxima
                            // Por agora, apenas simulamos um feedback visual
                            alert("Localizando base mais próxima... Unidade Marginal Tietê a 8 min de você.");
                          });
                        }
                      }}
                    >
                      <MapPin className="h-3 w-3" /> Localizar unidade mais próxima
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Link

              to="/servicos-de-guincho-e-reboque"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Ver todas as cidades atendidas →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-accent/90">Serviços em {city.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { to: "/guincho-leve" as const, label: `Guincho leve em ${city.name}` },
              { to: "/guincho-pesado" as const, label: `Guincho pesado em ${city.name}` },
              { to: "/guincho-de-motos" as const, label: `Guincho de motos em ${city.name}` },
              { to: "/auto-socorro" as const, label: `Auto socorro em ${city.name}` },
              { to: "/pane-seca" as const, label: `Pane seca em ${city.name}` },
              { to: "/remocao-veicular" as const, label: `Remoção veicular em ${city.name}` },
            ].map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="rounded-full border bg-secondary/40 px-3 py-1 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO LONGO — autoridade local */}
      <section className="mt-14 max-w-4xl space-y-5">
        <h2 className="text-2xl font-bold md:text-3xl text-accent/90">{copy.longTitle}</h2>
        <p className="text-muted-foreground leading-relaxed">{copy.longIntro}</p>
        <p className="text-muted-foreground leading-relaxed">
          Nossa central despacha o socorro mais próximo da sua localização em{" "}
          <strong>{city.name}</strong> em poucos minutos, com tempo médio de chegada entre 20 e 40
          minutos em áreas urbanas. Se a pane aconteceu em <strong>rodovia</strong>, descida de
          serra ou estrada vicinal próxima a {city.name}, também temos equipes preparadas com
          sinalização rodoviária completa, freio motor reforçado e operadores experientes em
          condução em aclives e declives. Os bairros mais demandados — como{" "}
          {local.neighborhoods.slice(0, 6).map((b, i, arr) => (
            <span key={b}>
              <strong>{b}</strong>{i < arr.length - 1 ? ", " : ""}
            </span>
          ))} — recebem atendimento prioritário em qualquer horário do dia ou da noite.
        </p>
        <h3 className="text-xl font-bold pt-2 text-accent/90">Quando acionar um guincho em {city.name}?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Acidentes de trânsito, colisões, capotamentos, panes elétricas, problemas no câmbio,
          superaquecimento de motor, pneu furado sem estepe, falta de combustível, bateria
          descarregada, chave trancada dentro do carro, embreagem queimada, vazamento de óleo,
          atolamentos em terrenos irregulares e transporte de veículos batidos para oficinas e
          seguradoras — todas essas situações exigem um <strong>guincho profissional em {city.name}</strong>{" "}
          imediatamente. Tentar empurrar ou rebocar de forma improvisada pode causar acidentes
          graves, multas de trânsito e danos ainda maiores ao seu veículo.
        </p>
        <h3 className="text-xl font-bold pt-2 text-accent/90">Por que escolher nossa rede em {city.name}/{city.uf}?</h3>
        <ul className="space-y-2 text-muted-foreground leading-relaxed">
          <li>✅ <strong>Atendimento 24h, 7 dias por semana</strong>, inclusive feriados e madrugada.</li>
          <li>✅ <strong>Empresas verificadas</strong> com CNPJ ativo, ANTT regularizada e seguro.</li>
          <li>✅ <strong>Orçamento transparente</strong> antes de iniciar o serviço — sem taxa surpresa.</li>
          <li>✅ <strong>Pagamento facilitado</strong>: PIX, dinheiro, cartão e principais aplicativos.</li>
          <li>✅ <strong>Tempo médio de chegada inferior a 40 minutos</strong> em {city.name}.</li>
          <li>✅ <strong>Cobertura completa</strong> em todos os bairros e rodovias de acesso.</li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary">
            <a href="https://w.app/guincho24horas"><Phone className="h-5 w-5" /> Ligar agora — (11) 99645-1510</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://w.app/guincho24horas" target="_blank" rel="noreferrer">
              WhatsApp 24h
            </a>
          </Button>
        </div>
      </section>

      {/* CTA final */}
      <section className="mt-14 rounded-2xl bg-secondary/50 p-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl text-accent/90">{copy.ctaTitle}</h2>
        <p className="mt-2 text-muted-foreground">
          Não fique parado na estrada. Acione agora e resolva sua emergência com
          rapidez e segurança em {city.name}/{city.uf}.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary">
            <a href="https://w.app/guincho24horas">
              <Phone className="h-4 w-4" /> Ligar agora
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contato">Enviar mensagem</Link>
          </Button>
        </div>
      </section>

      {/* Depoimentos rotacionados por cidade (variação anti-doorway) */}
      <LazyTestimonialsCarousel citySeed={`${city.slug}-${city.uf}`} />

      {/* Botão de edição (login na rota /admin) */}
      <AdminEditButton citySlugUf={`${city.slug}-${city.uf.toLowerCase()}`} />
    </div>
  );
}

function OptimizedMap({ city, mapEmbedSrc }: { city: City; mapEmbedSrc: string }) {
  const mapElement = useMemo(() => (
    <iframe
      title={`Mapa de cobertura — Guincho em ${city.name}/${city.uf}`}
      src={mapEmbedSrc}
      width="100%"
      height="360"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="block w-full"
      allowFullScreen
      style={{ border: 0 }}
    />
  ), [city.name, city.uf, mapEmbedSrc]);

  return mapElement;
}
