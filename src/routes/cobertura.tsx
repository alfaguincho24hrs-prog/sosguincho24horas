import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Phone, Star, Truck, Pencil, BadgeCheck, ArrowUpDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PARTNERS, CITIES } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { getFeaturedPartners } from "@/lib/admin-data.functions";
import { buildResponsiveSources } from "@/lib/responsive-image";
import { ALL_CITIES, SP_REGIONS, SP_CITIES } from "@/components/cities-data";
import { TIPOS_VEICULO } from "@/lib/city-veiculos";
import { TIPO_ROUTE } from "@/components/city-vehicle-page";

const norm = (v: string) =>
  v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

/** Casa o nome exibido em CITIES com a base completa de cidades */
function cityBySlug(label: string) {
  const clean = norm(label.split("-")[0].split("/")[0]);
  return ALL_CITIES.find((c) => norm(c.name) === clean);
}

/** Cidades usadas como vitrine nos blocos por tipo de veículo */
const DESTAQUE_CIDADES = [
  "sao-paulo", "sao-jose-dos-campos", "taubate", "jacarei", "campinas",
  "guarulhos", "santo-andre", "sao-bernardo-do-campo", "santos", "sorocaba",
  "rio-de-janeiro", "belo-horizonte",
]
  .map((slug) => ALL_CITIES.find((c) => c.slug === slug))
  .filter((c): c is (typeof ALL_CITIES)[number] => Boolean(c));

type FeaturedPartner = Awaited<ReturnType<typeof getFeaturedPartners>>[number];

export const Route = createFileRoute("/cobertura")({
  loader: async (): Promise<{ featured: FeaturedPartner[] }> => {
    try {
      const featured = await getFeaturedPartners();
      return { featured };
    } catch {
      return { featured: [] };
    }
  },
  head: () => ({
    meta: [
      { title: "Cobertura Nacional de Guincho | Cidades Atendidas em Todo o Brasil" },
      { name: "description", content: "Veja a lista completa de capitais e cidades com atendimento de guincho e reboque 24h. Oferecemos cobertura nacional com empresas parceiras qualificadas para socorro veicular rápido." },
      { property: "og:title", content: "Cobertura Nacional de Guincho 24h" },
      { property: "og:description", content: "Confira todas as capitais e cidades atendidas pela nossa rede de guincho e reboque 24h em todo o Brasil." },
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

const TIER_PRIORITY: Record<string, number> = { gold: 0, silver: 1, bronze: 2, ghost: 3 };

function CoveragePage() {
  const { featured } = Route.useLoaderData();
  const [sortBy, setSortBy] = useState<"priority" | "date">("priority");

  const sortedFeatured = useMemo(() => {
    const list = [...featured];
    if (sortBy === "date") {
      list.sort((a, b) => {
        const da = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const db = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return db - da;
      });
    } else {
      list.sort((a, b) => {
        const pa = TIER_PRIORITY[a.tier ?? "ghost"] ?? 99;
        const pb = TIER_PRIORITY[b.tier ?? "ghost"] ?? 99;
        if (pa !== pb) return pa - pb;
        return (b.rating ?? 0) - (a.rating ?? 0);
      });
    }
    return list;
  }, [featured, sortBy]);

  const waLink = (phone?: string) => {
    const digits = (phone || "5511996451510").replace(/\D/g, "");
    return `https://wa.me/${digits.length >= 12 ? digits : "5511996451510"}`;
  };
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

        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <h2 className="min-w-0 text-2xl font-bold">Empresas parceiras em destaque</h2>
          <div className="flex flex-wrap items-center gap-2">
            {featured.length > 0 && (
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" aria-hidden />
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as "priority" | "date")}>
                  <SelectTrigger className="h-9 w-[170px]" aria-label="Ordenar empresas parceiras">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Por prioridade</SelectItem>
                    <SelectItem value="date">Mais recentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button asChild variant="outline" size="sm">
              <Link to="/admin" search={{ city: "" }}>
                <Pencil className="h-4 w-4" /> Editar empresas parceiras
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {sortedFeatured.length > 0 ? (
            sortedFeatured.map((p: FeaturedPartner) => (
              <Card key={p.id} className="border-border/60 transition-all hover:border-accent/60 hover:shadow-[var(--shadow-elegant)]">
                <CardContent className="space-y-3 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground">
                      {p.logoUrl ? (
                        (() => {
                          const sources = buildResponsiveSources(p.logoUrl, [44, 64], "44px");
                          if (sources) {
                            return (
                              <picture>
                                <source type="image/avif" srcSet={sources.avif} sizes={sources.sizesAttr} />
                                <source type="image/webp" srcSet={sources.webp} sizes={sources.sizesAttr} />
                                <img
                                  src={sources.fallback}
                                  alt={`Logotipo ${p.name}`}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                  decoding="async"
                                  width={44}
                                  height={44}
                                />
                              </picture>
                            );
                          }
                          return (
                            <img
                              src={p.logoUrl}
                              alt={`Logotipo ${p.name}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              decoding="async"
                              width={44}
                              height={44}
                            />
                          );
                        })()
                      ) : (
                        <Truck className="h-5 w-5" />
                      )}
                    </div>
                    {typeof p.rating === "number" && (
                      <div className="flex shrink-0 items-center gap-1 text-sm font-medium">
                        <Star className="h-4 w-4 fill-accent text-accent" /> {p.rating}
                      </div>
                    )}
                  </div>
                  <h3 className="flex min-w-0 items-center gap-1 text-base font-semibold sm:text-lg">
                    <span className="truncate">{p.name}</span>
                    {p.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
                  </h3>
                  {(p.area || p.citySlug) && (
                    <p className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{p.area || p.citySlug}</span>
                    </p>
                  )}
                  <Button asChild className="w-full bg-[image:var(--gradient-cta)] text-primary hover:opacity-95 shadow-sm">
                    <a href={waLink(p.whatsapp || p.phone)}>
                      <Phone className="h-4 w-4" /> {p.phoneMasked || p.phone || "(11) 99645-1510"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            PARTNERS.map((p) => (
              <Card key={p.name} className="border-border/60 transition-all hover:border-accent/60 hover:shadow-[var(--shadow-elegant)]">
                <CardContent className="space-y-3 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div className="flex shrink-0 items-center gap-1 text-sm font-medium">
                      <Star className="h-4 w-4 fill-accent text-accent" /> {p.rating}
                    </div>
                  </div>
                  <h3 className="truncate text-base font-semibold sm:text-lg">{p.name}</h3>
                  <p className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="truncate">{p.city}</span>
                  </p>
                  <Button asChild className="w-full bg-[image:var(--gradient-cta)] text-primary hover:opacity-95 shadow-sm">
                    <a href="https://wa.me/5511996451510"><Phone className="h-4 w-4" /> (11) 99645-1510</a>
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>



        <h2 className="mt-16 text-2xl font-bold">Capitais atendidas</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {CITIES.map((c) => {
            const match = cityBySlug(c);
            if (!match) {
              return (
                <span key={c} className="rounded-full border bg-secondary/40 px-4 py-1.5 text-sm">{c}</span>
              );
            }
            return (
              <Link
                key={c}
                to="/guincho-em-{$slug}"
                params={{ slug: `${match.slug}-${match.uf.toLowerCase()}` }}
                className="rounded-full border bg-secondary/40 px-4 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {c}
              </Link>
            );
          })}
        </div>

        {/* Serviços por tipo de veículo nas principais cidades */}
        <section className="defer-paint mt-16">
          <h2 className="text-2xl font-bold">Guincho por tipo de veículo</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Cada veículo exige plataforma, amarração e operador diferentes.
            Escolha o serviço e a cidade para ver a página com tempo de chegada,
            equipamento e perguntas frequentes daquela região.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {TIPOS_VEICULO.map((t) => (
              <div key={t.slug} className="rounded-xl border border-border/60 p-5">
                <h3 className="font-semibold">{t.rotulo}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Chegada média: {t.eta}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {DESTAQUE_CIDADES.map((c) => (
                    <Link
                      key={`${t.slug}-${c.slug}`}
                      to={TIPO_ROUTE[t.slug]}
                      params={{ slug: `${c.slug}-${c.uf.toLowerCase()}` }}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs transition-colors hover:text-primary"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Sua cidade não está aqui?{" "}
            <Link to="/servicos-de-guincho-e-reboque" className="text-primary underline">
              Veja a lista completa de cidades de A a Z
            </Link>{" "}
            — cada uma tem página própria para carro, moto, caminhão e transporte.
          </p>
        </section>
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
