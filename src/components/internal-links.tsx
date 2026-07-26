import { memo } from "react";
import { Link } from "@tanstack/react-router";

/**
 * Bloco global de links internos — acelera a descoberta das páginas novas
 * (serviços por tipo de veículo, hubs locais e a landing B2B de marketing)
 * pelos rastreadores, a partir de qualquer rota do site.
 */

const SERVICOS: Array<{ to: string; label: string }> = [
  { to: "/guincho-leve", label: "Guincho Leve" },
  { to: "/guincho-pesado", label: "Guincho Pesado" },
  { to: "/guincho-de-motos", label: "Guincho de Motos" },
  { to: "/auto-socorro", label: "Auto Socorro 24h" },
  { to: "/pane-seca", label: "Pane Seca" },
  { to: "/remocao-veicular", label: "Remoção Veicular" },
  { to: "/servicos-de-guincho-e-reboque", label: "Todos os Serviços de Guincho e Reboque" },
  { to: "/frota-guincho", label: "Nossa Frota de Guinchos" },
];

const LOCAIS: Array<{ to: string; label: string }> = [
  { to: "/guincho-sjc", label: "Guincho em São José dos Campos" },
  { to: "/guincho-postos-dutra-sao-jose-dos-campos", label: "Guincho nos Postos da Dutra (SJC)" },
  { to: "/rodovias-vale-do-paraiba", label: "Guincho nas Rodovias do Vale do Paraíba" },
  { to: "/cobertura", label: "Cobertura por Cidade" },
  { to: "/areas-atendidas", label: "Áreas Atendidas" },
];

const SJC_TIPOS: Array<{ tipo: string; label: string }> = [
  { tipo: "carro", label: "Guincho para Carro em SJC" },
  { tipo: "moto", label: "Guincho para Moto em SJC" },
  { tipo: "caminhao", label: "Guincho para Caminhão em SJC" },
  { tipo: "transporte-de-veiculos", label: "Transporte de Veículos em SJC" },
];

const linkClass =
  "text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline";

function InternalLinksComponent() {
  return (
    <section
      aria-labelledby="links-internos-titulo"
      className="defer-paint border-t border-border bg-muted/30"
    >
      <div className="container mx-auto px-4 py-8">
        <h2
          id="links-internos-titulo"
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground"
        >
          Navegue pelo site
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-2 text-xs font-semibold text-foreground">Serviços</h3>
            <ul className="space-y-1.5">
              {SERVICOS.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold text-foreground">Onde atendemos</h3>
            <ul className="space-y-1.5">
              {LOCAIS.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold text-foreground">Por tipo de veículo</h3>
            <ul className="space-y-1.5">
              {SJC_TIPOS.map((s) => (
                <li key={s.tipo}>
                  <Link
                    to="/guincho-{$tipo}-sjc"
                    params={{ tipo: s.tipo }}
                    className={linkClass}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className={linkClass}>
                  Blog de Guincho e Reboque
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold text-foreground">Para empresas de guincho</h3>
            <ul className="space-y-1.5">
              <li>
                <Link to="/marketing-para-guinchos" className={linkClass}>
                  Marketing e SEO para Guinchos
                </Link>
              </li>
              <li>
                <Link to="/anuncie" className={linkClass}>
                  Anuncie seu Guincho
                </Link>
              </li>
              <li>
                <Link to="/contato" className={linkClass}>
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export const InternalLinks = memo(InternalLinksComponent);
