// SEO Programático — Location Siloing
// Bairros e regiões de São Paulo para páginas de guincho hiper-segmentadas.
// Cada entrada gera uma rota /guincho-em-[slug].
// Para escalar para 885 rotas, basta adicionar novas entradas neste array.

export type Location = {
  name: string;
  slug: string;
  /** Cidade base (default: "São Paulo") */
  city?: string;
  /** UF (default: "SP") */
  uf?: string;
};

export const LOCATIONS: Location[] = [
  { name: "Avenida Paulista", slug: "avenida-paulista" },
  { name: "Vila Madalena", slug: "vila-madalena" },
  { name: "Pinheiros", slug: "pinheiros" },
  { name: "Itaim Bibi", slug: "itaim-bibi" },
  { name: "Moema", slug: "moema" },
  { name: "Jardins", slug: "jardins" },
  { name: "Vila Mariana", slug: "vila-mariana" },
  { name: "Brooklin", slug: "brooklin" },
  { name: "Morumbi", slug: "morumbi" },
  { name: "Tatuapé", slug: "tatuape" },
  { name: "Mooca", slug: "mooca" },
  { name: "Santana", slug: "santana" },
  { name: "Lapa", slug: "lapa" },
  { name: "Perdizes", slug: "perdizes" },
  { name: "Higienópolis", slug: "higienopolis" },
  { name: "Liberdade", slug: "liberdade" },
  { name: "Bela Vista", slug: "bela-vista" },
  { name: "Consolação", slug: "consolacao" },
  { name: "Vila Olímpia", slug: "vila-olimpia" },
  { name: "Berrini", slug: "berrini" },
];

const byName = new Map<string, Location>();
const bySlug = new Map<string, Location>();
for (const l of LOCATIONS) {
  byName.set(l.name.toLowerCase(), l);
  bySlug.set(l.slug.toLowerCase(), l);
}

export function findLocationBySlug(slug: string): Location | undefined {
  return bySlug.get(slug.toLowerCase().trim());
}
