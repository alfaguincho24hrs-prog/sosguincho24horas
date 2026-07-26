import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SJC_BAIRROS, type Bairro } from "@/lib/sjc-bairros";

const TEL = "tel:+5511996451510";

/** Coordenadas aproximadas (lat/lng) de cada bairro/região de São José dos Campos */
const COORDS: Record<string, { lat: number; lng: number }> = {
  centro: { lat: -23.1896, lng: -45.8841 },
  "vila-adyana": { lat: -23.1975, lng: -45.893 },
  "jardim-esplanada": { lat: -23.199, lng: -45.879 },
  "jardim-aquarius": { lat: -23.22, lng: -45.901 },
  urbanova: { lat: -23.213, lng: -45.935 },
  "jardim-satelite": { lat: -23.232, lng: -45.883 },
  "bosque-dos-eucaliptos": { lat: -23.25, lng: -45.883 },
  "campo-dos-alemaes": { lat: -23.262, lng: -45.876 },
  "jardim-morumbi": { lat: -23.244, lng: -45.86 },
  "parque-industrial": { lat: -23.211, lng: -45.86 },
  "vila-industrial": { lat: -23.205, lng: -45.877 },
  santana: { lat: -23.176, lng: -45.888 },
  "jardim-paulista": { lat: -23.181, lng: -45.876 },
  "vista-verde": { lat: -23.17, lng: -45.856 },
  "eugenio-de-melo": { lat: -23.188, lng: -45.8 },
  putim: { lat: -23.232, lng: -45.846 },
  "zona-norte": { lat: -23.161, lng: -45.885 },
  "zona-sul": { lat: -23.247, lng: -45.892 },
  "zona-leste": { lat: -23.2, lng: -45.83 },
};

const TIPOS: Array<{ slug: string; label: string }> = [
  { slug: "carro", label: "Carro" },
  { slug: "moto", label: "Moto" },
  { slug: "caminhao", label: "Caminhão" },
  { slug: "transporte-de-veiculos", label: "Transporte" },
];

const LAT_MIN = -23.272;
const LAT_MAX = -23.152;
const LNG_MIN = -45.945;
const LNG_MAX = -45.788;
const W = 800;
const H = 620;

function project(slug: string) {
  const c = COORDS[slug] ?? { lat: -23.19, lng: -45.88 };
  const x = ((c.lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (W - 120) + 60;
  const y = ((LAT_MAX - c.lat) / (LAT_MAX - LAT_MIN)) * (H - 120) + 60;
  return { x, y };
}

export function SjcMapaBairros() {
  const [ativo, setAtivo] = useState<Bairro>(SJC_BAIRROS[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
      <div className="relative overflow-hidden rounded-2xl border bg-secondary/30">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Mapa das áreas de São José dos Campos atendidas pelo guincho 24 horas, por bairro"
        >
          <title>
            Áreas atendidas por guincho 24h em São José dos Campos, por bairro
          </title>
          <defs>
            <pattern
              id="sjc-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border"
              />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#sjc-grid)" />

          {/* Rio Paraíba do Sul (referência aproximada) */}
          <path
            d="M 40 330 C 180 300, 300 350, 430 300 S 660 250, 770 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            className="text-primary/15"
          />
          <text x="52" y="322" className="fill-muted-foreground text-[13px]">
            Rio Paraíba do Sul
          </text>

          {/* Via Dutra (BR-116) */}
          <path
            d="M 30 300 C 200 275, 340 320, 480 275 S 700 215, 780 205"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="12 8"
            className="text-accent/60"
          />
          <text x="600" y="196" className="fill-muted-foreground text-[13px]">
            Via Dutra (BR-116)
          </text>

          {/* Rodovia dos Tamoios (sentido Litoral Norte) */}
          <path
            d="M 470 300 C 520 400, 560 500, 600 590"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="12 8"
            className="text-accent/60"
          />
          <text x="604" y="570" className="fill-muted-foreground text-[13px]">
            Tamoios / Litoral
          </text>

          {SJC_BAIRROS.map((b) => {
            const { x, y } = project(b.slug);
            const selecionado = b.slug === ativo.slug;
            return (
              <g
                key={b.slug}
                onMouseEnter={() => setAtivo(b)}
                onFocus={() => setAtivo(b)}
                onClick={() => setAtivo(b)}
                tabIndex={0}
                role="button"
                aria-label={`Ver guincho 24h em ${b.nome}, São José dos Campos`}
                className="cursor-pointer outline-none"
              >
                <circle
                  cx={x}
                  cy={y}
                  r={selecionado ? 13 : 8}
                  className={
                    selecionado
                      ? "fill-primary stroke-background"
                      : "fill-accent/70 stroke-background"
                  }
                  strokeWidth="3"
                />
                {selecionado && (
                  <circle
                    cx={x}
                    cy={y}
                    r="22"
                    className="fill-none stroke-primary/40"
                    strokeWidth="2"
                  />
                )}
                <text
                  x={x + 17}
                  y={y + 5}
                  className={
                    selecionado
                      ? "fill-foreground text-[15px] font-semibold"
                      : "fill-muted-foreground text-[14px]"
                  }
                >
                  {b.nome}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="border-t bg-background/70 px-4 py-2 text-xs text-muted-foreground">
          Mapa esquemático das áreas atendidas em SJC. Passe o mouse ou toque em
          um bairro para ver o tempo médio de chegada e abrir a página do
          bairro.
        </p>
      </div>

      <div className="rounded-2xl border bg-background p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          Bairro selecionado
        </span>
        <h3 className="mt-1 flex items-center gap-2 text-2xl font-bold">
          <MapPin className="h-5 w-5 text-primary" /> {ativo.nome}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> Chegada média em {ativo.eta}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{ativo.resumo}</p>

        <Link
          to="/guincho-sjc/$bairro"
          params={{ bairro: ativo.slug }}
          className="mt-4 flex items-center justify-between rounded-lg border bg-secondary/40 p-3 text-sm font-semibold transition-colors hover:border-primary"
        >
          Guincho 24h em {ativo.nome}
          <ChevronRight className="h-4 w-4 text-primary" />
        </Link>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Por tipo de veículo em {ativo.nome}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {TIPOS.map((t) => (
            <Link
              key={t.slug}
              to="/guincho-{$tipo}-sjc/$bairro"
              params={{ tipo: t.slug, bairro: ativo.slug }}
              className="rounded-lg border px-3 py-2 text-center text-sm transition-colors hover:border-primary hover:text-primary"
            >
              {t.label}
            </Link>
          ))}
        </div>

        <Button asChild className="mt-5 w-full">
          <a href={TEL}>
            <Phone className="mr-2 h-4 w-4" /> (11) 99645-1510
          </a>
        </Button>
      </div>
    </div>
  );
}

/** Lista completa de links (renderizada no SSR) — garante rastreamento de todas as URLs tipo × bairro */
export function SjcMapaLinks() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {SJC_BAIRROS.map((b) => (
        <div key={b.slug} className="rounded-lg border bg-background p-4">
          <Link
            to="/guincho-sjc/$bairro"
            params={{ bairro: b.slug }}
            className="flex items-center gap-1.5 font-semibold hover:text-primary"
          >
            <MapPin className="h-4 w-4 shrink-0 text-primary" /> Guincho em{" "}
            {b.nome}
          </Link>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TIPOS.map((t) => (
              <Link
                key={t.slug}
                to="/guincho-{$tipo}-sjc/$bairro"
                params={{ tipo: t.slug, bairro: b.slug }}
                className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
