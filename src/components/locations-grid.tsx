import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LOCATIONS } from "@/data/locations";
import { ALL_CITIES, CITIES_BY_LETTER, ALPHABET } from "@/components/cities-data";

const INITIAL_BAIRROS = 24;

export function LocationsGrid() {
  const [expandedBairros, setExpandedBairros] = useState(false);
  const [query, setQuery] = useState("");

  const visibleBairros = expandedBairros ? LOCATIONS : LOCATIONS.slice(0, INITIAL_BAIRROS);
  const hasMoreBairros = LOCATIONS.length > INITIAL_BAIRROS;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return ALL_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.uf.toLowerCase().includes(q) ||
        c.slug.includes(q),
    ).slice(0, 200);
  }, [query]);

  return (
    <section
      aria-labelledby="locations-grid-title"
      className="border-t border-border/60 bg-secondary/30 py-16"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-2xl">
          <Badge variant="secondary" className="mb-3">
            <MapPin className="mr-1 h-3 w-3" /> Cidades atendidas
          </Badge>
          <h2
            id="locations-grid-title"
            className="text-2xl font-bold tracking-tight md:text-3xl text-accent/90"
          >
            Guincho 24 horas em todos os bairros de São Paulo
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Atendimento rápido em qualquer região. Selecione seu bairro ou cidade para ver os
            detalhes do serviço de guincho na sua localidade.
          </p>
        </div>

        {/* Bairros de SP */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {visibleBairros.map((loc) => (
            <li key={loc.slug}>
              <Link
                to="/guincho-em-{$slug}"
                params={{ slug: loc.slug }}
                className="block text-sm text-muted-foreground no-underline transition-colors hover:text-primary hover:underline"
              >
                Guincho em {loc.name}
              </Link>
            </li>
          ))}
        </ul>

        {hasMoreBairros && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpandedBairros((v) => !v)}
              aria-expanded={expandedBairros}
            >
              {expandedBairros ? (
                <>
                  <ChevronUp className="h-4 w-4" /> Ver menos bairros
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" /> Ver mais bairros (
                  {LOCATIONS.length - INITIAL_BAIRROS}+)
                </>
              )}
            </Button>
          </div>
        )}

        {/* Diretório completo de cidades — <details> mantém todos os links no DOM
            para indexação, mas colapsados para boa UX. */}
        <details className="group mt-10 rounded-lg border border-border/60 bg-background/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/40">
            <div>
              <h3 className="text-base font-semibold text-accent/90 md:text-lg">
                Ver todas as cidades atendidas no Brasil
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {ALL_CITIES.length.toLocaleString("pt-BR")} cidades — atendimento em todo o
                território nacional
              </p>
            </div>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>

          <div className="border-t border-border/60 px-5 py-6">
            {/* Busca */}
            <label className="relative mb-5 flex items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar cidade ou UF (ex.: Campinas, RJ, ABC)"
                className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"
                aria-label="Buscar cidade atendida"
              />
            </label>

            {/* Navegação A-Z (oculta quando há busca) */}
            {!filtered && (
              <nav
                aria-label="Navegação alfabética"
                className="mb-6 flex flex-wrap gap-1.5"
              >
                {ALPHABET.map((letter) => (
                  <a
                    key={letter}
                    href={`#cidades-${letter}`}
                    className="inline-flex h-7 min-w-7 items-center justify-center rounded border border-border bg-secondary/40 px-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {letter}
                  </a>
                ))}
              </nav>
            )}

            {/* Resultados filtrados */}
            {filtered ? (
              <div>
                <p className="mb-3 text-xs text-muted-foreground">
                  {filtered.length === 0
                    ? "Nenhuma cidade encontrada."
                    : `${filtered.length} resultado(s)${filtered.length === 200 ? " (refine sua busca)" : ""}`}
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {filtered.map((c) => (
                    <li key={`${c.slug}-${c.uf}`}>
                      <Link
                        to="/guincho-em-{$slug}"
                        params={{ slug: `${c.slug}-${c.uf.toLowerCase()}` }}
                        className="block text-sm text-muted-foreground no-underline transition-colors hover:text-primary hover:underline"
                      >
                        Guincho em {c.name} <span className="text-xs opacity-60">/{c.uf}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="space-y-6">
                {ALPHABET.map((letter) => {
                  const cities = CITIES_BY_LETTER[letter] ?? [];
                  return (
                    <section
                      key={letter}
                      id={`cidades-${letter}`}
                      aria-labelledby={`cidades-${letter}-title`}
                      className="scroll-mt-24"
                    >
                      <h4
                        id={`cidades-${letter}-title`}
                        className="mb-2 border-b border-border/60 pb-1 text-sm font-bold text-accent/90"
                      >
                        {letter}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          ({cities.length})
                        </span>
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {cities.map((c) => (
                          <li key={`${c.slug}-${c.uf}`}>
                            <Link
                              to="/guincho-em-{$slug}"
                              params={{ slug: `${c.slug}-${c.uf.toLowerCase()}` }}
                              className="block text-sm text-muted-foreground no-underline transition-colors hover:text-primary hover:underline"
                            >
                              {c.name}{" "}
                              <span className="text-xs opacity-60">/{c.uf}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}

export default LocationsGrid;
