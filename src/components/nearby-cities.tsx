import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Agrupamento regional para interlinking contextual.
// Cada cidade pertence a uma ou mais regiões. Slug = `${slug}-${uf}` para casar com a rota /guincho-em-{slug}.
export type NearbyCity = { name: string; slug: string };
export type RegionGroup = {
  id: string;
  title: string;
  description: string;
  cities: NearbyCity[];
};

export const REGION_GROUPS: RegionGroup[] = [
  {
    id: "capital-sp",
    title: "São Paulo capital e Grande SP",
    description:
      "Capital paulista e municípios da Região Metropolitana de São Paulo, incluindo ABC, Guarulhos, Osasco e Barueri.",
    cities: [
      { name: "São Paulo", slug: "sao-paulo-sp" },
      { name: "Guarulhos", slug: "guarulhos-sp" },
      { name: "Osasco", slug: "osasco-sp" },
      { name: "Barueri", slug: "barueri-sp" },
      { name: "Santo André", slug: "santo-andre-sp" },
      { name: "São Bernardo do Campo", slug: "sao-bernardo-do-campo-sp" },
      { name: "Mogi das Cruzes", slug: "mogi-das-cruzes-sp" },
    ],
  },
  {
    id: "vale-paraiba",
    title: "Vale do Paraíba",
    description:
      "Corredor da Rodovia Presidente Dutra e Carvalho Pinto: São José dos Campos, Taubaté, Jacareí e Pindamonhangaba.",
    cities: [
      { name: "São José dos Campos", slug: "sao-jose-dos-campos-sp" },
      { name: "Taubaté", slug: "taubate-sp" },
      { name: "Jacareí", slug: "jacarei-sp" },
      { name: "Pindamonhangaba", slug: "pindamonhangaba-sp" },
    ],
  },
  {
    id: "litoral-norte",
    title: "Litoral Norte de SP",
    description:
      "Trecho da Rio-Santos (BR-101) e Tamoios: Caraguatatuba, Ubatuba e São Sebastião.",
    cities: [
      { name: "Caraguatatuba", slug: "caraguatatuba-sp" },
      { name: "Ubatuba", slug: "ubatuba-sp" },
      { name: "São Sebastião", slug: "sao-sebastiao-sp" },
    ],
  },
  {
    id: "baixada-santista",
    title: "Baixada Santista",
    description:
      "Anchieta e Imigrantes descendo para o litoral sul paulista: Santos e região.",
    cities: [
      { name: "Santos", slug: "santos-sp" },
    ],
  },
  {
    id: "campinas",
    title: "Região de Campinas",
    description:
      "Eixo Anhanguera e Bandeirantes: Campinas, Jundiaí, Limeira, Americana e Piracicaba.",
    cities: [
      { name: "Campinas", slug: "campinas-sp" },
      { name: "Jundiaí", slug: "jundiai-sp" },
      { name: "Limeira", slug: "limeira-sp" },
      { name: "Americana", slug: "americana-sp" },
      { name: "Piracicaba", slug: "piracicaba-sp" },
    ],
  },
  {
    id: "sorocaba-interior",
    title: "Sorocaba e Interior",
    description:
      "Castelo Branco, Raposo Tavares e interior paulista: Sorocaba, Ribeirão Preto, São José do Rio Preto e Bauru.",
    cities: [
      { name: "Sorocaba", slug: "sorocaba-sp" },
      { name: "Ribeirão Preto", slug: "ribeirao-preto-sp" },
      { name: "São José do Rio Preto", slug: "sao-jose-do-rio-preto-sp" },
      { name: "Bauru", slug: "bauru-sp" },
    ],
  },
  {
    id: "serra-mantiqueira",
    title: "Serra da Mantiqueira",
    description: "Atibaia, Campos do Jordão e cidades de serra próximas à Fernão Dias.",
    cities: [
      { name: "Atibaia", slug: "atibaia-sp" },
      { name: "Campos do Jordão", slug: "campos-do-jordao-sp" },
    ],
  },
  {
    id: "capitais",
    title: "Principais capitais do Brasil",
    description:
      "Cobertura em capitais com parceiros credenciados para reboque 24h.",
    cities: [
      { name: "Rio de Janeiro", slug: "rio-de-janeiro-rj" },
      { name: "Belo Horizonte", slug: "belo-horizonte-mg" },
      { name: "Brasília", slug: "brasilia-df" },
      { name: "Curitiba", slug: "curitiba-pr" },
      { name: "Porto Alegre", slug: "porto-alegre-rs" },
      { name: "Florianópolis", slug: "florianopolis-sc" },
      { name: "Salvador", slug: "salvador-ba" },
      { name: "Recife", slug: "recife-pe" },
      { name: "Fortaleza", slug: "fortaleza-ce" },
      { name: "Goiânia", slug: "goiania-go" },
      { name: "Vitória", slug: "vitoria-es" },
    ],
  },
];

/** Retorna o(s) grupo(s) regionais que contêm a cidade indicada. */
export function findRegionsForCity(citySlugUf: string): RegionGroup[] {
  const key = citySlugUf.toLowerCase();
  return REGION_GROUPS.filter((g) => g.cities.some((c) => c.slug === key));
}

type Props = {
  /** Slug `${slug}-${uf}` da cidade atual; quando informado, exibe apenas as regiões dela e exclui a cidade atual da lista. */
  currentSlug?: string;
  /** Limita o número de regiões mostradas (default: todas). */
  limit?: number;
  title?: string;
  intro?: string;
};

/**
 * Módulo de links internos contextuais apontando para cidades próximas
 * agrupadas por região (Grande SP/ABC, Vale do Paraíba, Litoral Norte, etc.).
 */
export function NearbyCitiesModule({
  currentSlug,
  limit,
  title,
  intro,
}: Props) {
  const current = currentSlug?.toLowerCase();
  let groups = current ? findRegionsForCity(current) : REGION_GROUPS;
  if (current && groups.length === 0) {
    // Sem grupo conhecido — cai para "Capitais" como vizinhança nacional padrão.
    groups = REGION_GROUPS.filter((g) => g.id === "capitais");
  }
  if (limit) groups = groups.slice(0, limit);

  const heading =
    title ?? (current ? "Cidades próximas da mesma região" : "Cidades próximas por região");
  const description =
    intro ??
    (current
      ? "Atendemos também cidades vizinhas da mesma região. Veja as páginas dedicadas para acionar guincho 24h mais próximo de você."
      : "Encontre rapidamente o serviço de guincho 24h na cidade mais próxima — agrupado pelas principais regiões que atendemos.");

  return (
    <section className="mt-14" aria-labelledby="nearby-cities-title">
      <div className="mb-6 flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit">
          <MapPin className="mr-1 h-3 w-3" /> Cobertura regional
        </Badge>
        <h2
          id="nearby-cities-title"
          className="text-2xl font-bold md:text-3xl text-accent"
        >
          {heading}
        </h2>
        <p className="text-muted-foreground max-w-3xl">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => {
          const cities = group.cities.filter((c) => c.slug !== current);
          if (cities.length === 0) return null;
          return (
            <Card key={group.id} className="border-border/60">
              <CardContent className="p-5">
                <h3 className="font-semibold text-accent">{group.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {group.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      to="/guincho-em-{$slug}"
                      params={{ slug: c.slug }}
                      className="rounded-full border bg-secondary/40 px-3 py-1 text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Guincho em {c.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
