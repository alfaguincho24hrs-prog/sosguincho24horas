import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Search, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SITE } from "@/components/site-data";
import { ALL_CITIES, ALPHABET, CITIES_BY_LETTER } from "@/components/cities-data";

export const Route = createFileRoute("/servicos-de-guincho-e-reboque")({
  head: () => ({
    meta: [
      {
        title:
          "Serviços de Guincho e Reboque 24h em Todo o Brasil | Cidades de A a Z",
      },
      {
        name: "description",
        content:
          "Encontre serviços de guincho e reboque 24 horas em mais de 100 cidades brasileiras. Atendimento rápido em capitais e interior — auto socorro, pane seca e reboque leve e pesado.",
      },
      {
        name: "keywords",
        content:
          "guincho 24 horas, reboque 24h, guincho perto de mim, auto socorro, pane seca, reboque leve, reboque pesado, guincho de moto, cidades Brasil",
      },
      { property: "og:title", content: "Guincho e Reboque 24h — Cidades de A a Z" },
      {
        property: "og:description",
        content:
          "Serviço nacional de guincho 24 horas. Veja todas as cidades atendidas em ordem alfabética.",
      },
      { name: "robots", content: "index, follow" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "SOS Guincho 24 horas - Cidades Atendidas",
          "image": "https://sosguincho24horas.com.br/assets/imagem-do-guincho.webp",
          "@id": "https://sosguincho24horas.com.br/servicos-de-guincho-e-reboque.html",
          "url": "https://sosguincho24horas.com.br/servicos-de-guincho-e-reboque",
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
    links: [
      { rel: "canonical", href: "https://sosguincho24horas.com.br/servicos-de-guincho-e-reboque" }
    ],
  }),
  component: CitiesIndexPage,
});

function CitiesIndexPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return ALL_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.uf.toLowerCase().includes(q) ||
        `${c.name} ${c.uf}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero */}
      <header className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-3">
          Cobertura nacional
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-accent">
          Serviços de guincho e reboque 24h em todo o Brasil
        </h1>
        <p className="mt-4 text-muted-foreground">
          Localize um guincho próximo de você em qualquer cidade brasileira.
          Listamos abaixo, em ordem alfabética, as principais regiões com
          atendimento ininterrupto — pronto para auxiliar sua emergência a
          qualquer hora do dia ou da noite.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
            <a href="https://w.app/guincho24horas">
              <Phone className="h-4 w-4" /> (11) 99645-1510
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/cobertura">Ver empresas parceiras</Link>
          </Button>
        </div>
      </header>

      {/* Busca */}
      <section className="mx-auto mt-10 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque sua cidade (ex: Campinas, SP, Belo...)"
            className="pl-9"
            aria-label="Buscar cidade"
          />
        </div>
      </section>

      {/* Índice alfabético */}
      {!filtered && (
        <nav
          aria-label="Índice alfabético"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {ALPHABET.map((l) => (
            <a
              key={l}
              href={`#letra-${l}`}
              className="flex h-9 w-9 items-center justify-center rounded-md border bg-secondary/40 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
      )}

      {/* Resultados de busca */}
      {filtered && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold">
            {filtered.length} cidade(s) encontrada(s)
          </h2>
          <CitiesGrid cities={filtered} />
        </section>
      )}

      {/* Lista A-Z */}
      {!filtered && (
        <div className="mt-12 space-y-12">
          {ALPHABET.map((letter) => (
            <section key={letter} id={`letra-${letter}`} className="scroll-mt-24">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-cta)] text-primary">
                  <span className="text-lg font-bold">{letter}</span>
                </div>
                <h2 className="text-2xl font-bold text-accent/90">Cidades com letra {letter}</h2>
              </div>
              <CitiesGrid cities={CITIES_BY_LETTER[letter]} />
            </section>
          ))}
        </div>
      )}

      {/* CTA final */}
      <section className="mt-16 rounded-2xl bg-secondary/50 p-10 text-center">
        <h2 className="text-2xl font-bold">
          Não encontrou sua cidade na lista?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Trabalhamos com uma rede de parceiros em expansão por todo o território
          nacional. Fale conosco e localizaremos o guincho mais próximo de você.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
            <a href="https://w.app/guincho24horas">
              <Phone className="h-4 w-4" /> Ligar agora
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contato">Enviar mensagem</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function CitiesGrid({
  cities,
}: {
  cities: { name: string; uf: string; slug: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cities.map((c) => (
        <Link
          key={`${c.slug}-${c.uf}`}
          to="/guincho-em-{$slug}"
          params={{ slug: `${c.slug}-${c.uf.toLowerCase()}` }}
          className="block"
        >
          <Card className="border-border/60 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-elegant)]">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">Guincho 24h em {c.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {c.name} - {c.uf}
                </p>
              </div>
              <Phone className="h-4 w-4 text-primary" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
