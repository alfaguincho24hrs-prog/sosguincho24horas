import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LOCATIONS } from "@/data/locations";

const INITIAL_COUNT = 24;

export function LocationsGrid() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? LOCATIONS : LOCATIONS.slice(0, INITIAL_COUNT);
  const hasMore = LOCATIONS.length > INITIAL_COUNT;

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
            Atendimento rápido em qualquer região. Selecione seu bairro para ver os detalhes
            do serviço de guincho na sua localidade.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {visible.map((loc) => (
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

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="locations-grid-title"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" /> Ver menos cidades
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" /> Ver cidades atendidas (
                  {LOCATIONS.length - INITIAL_COUNT}+)
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default LocationsGrid;
