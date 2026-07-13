// Diretório de prestadores por cidade (slug-uf).
// Tiers:
//  - "gold"   = parceiro Ouro (telefone real, destaque máximo)
//  - "silver" = parceiro Prata (telefone real, destaque médio)
//  - "bronze" = parceiro Bronze (telefone real, destaque básico)
//  - "ghost"  = não pagante (telefone borrado, CTA central)
//
// Overrides do admin são lidos de localStorage ("admin_provider_overrides_v1").

export type ProviderTier = "gold" | "silver" | "bronze" | "ghost";

export type Provider = {
  id?: string; // chave estável para overrides
  name: string;
  tier: ProviderTier;
  whatsapp?: string; // formato 5511999999999
  phoneMasked?: string; // ex: (12) 9****-****
  area?: string;
  rating?: number;
  reviews?: number;
  // Campos extras de perfil
  phone?: string; // telefone para ligação (com DDD, dígitos)
  address?: string; // endereço completo
  logoUrl?: string; // URL ou data URL do logo
  description?: string; // descrição da empresa
  verified?: boolean; // selo de verificação
  instagram?: string; // URL do Instagram
  website?: string; // URL do site
  photos?: string[]; // até 4 fotos (URLs ou data URLs)
};

const GENERIC_GHOSTS: Provider[] = [
  { id: "g-estrada-real", name: "Auto Socorro Estrada Real", tier: "ghost", phoneMasked: "9****-****", area: "Centro" },
  { id: "g-sao-cristovao", name: "Reboques São Cristóvão", tier: "ghost", phoneMasked: "9****-****", area: "Zona Norte" },
  { id: "g-express-rod", name: "Guincho Express Rodoviário", tier: "ghost", phoneMasked: "9****-****", area: "Rodovia" },
  { id: "g-tow-24h", name: "Tow Service 24h Local", tier: "ghost", phoneMasked: "9****-****", area: "Zona Sul" },
  { id: "g-aguia-veloz", name: "Reboque Águia Veloz", tier: "ghost", phoneMasked: "9****-****", area: "Zona Leste" },
  { id: "g-pronto-auto", name: "Guincho Pronto Socorro Auto", tier: "ghost", phoneMasked: "9****-****", area: "Zona Oeste" },
];

const CITY_PROVIDERS: Record<string, Provider[]> = {
  "taubate-sp": [
    {
      id: "tau-premium-24h",
      name: "Guincho Taubaté Premium 24h — Parceiro Oficial",
      tier: "gold",
      whatsapp: "5511996451510",
      area: "Centro / Independência / Jardim Eulália / Cobertura total",
      rating: 5,
      reviews: 312,
    },
    { id: "tau-1", name: "Auto Socorro Taubaté 24 Horas", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Centro" },
    { id: "tau-2", name: "Guincho Taubaté Reboque", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Vila São José" },
    { id: "tau-3", name: "Reboque Vale do Paraíba Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Quiririm" },
    { id: "tau-4", name: "Guincho Estrada Real Taubaté", tier: "ghost", phoneMasked: "(12) 3***-****", area: "Rod. Pres. Dutra km 117" },
    { id: "tau-5", name: "Pronto Socorro Veicular Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Bonfim" },
    { id: "tau-6", name: "Reboque Cidade Jardim Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim das Nações" },
    { id: "tau-7", name: "Guincho e Reboque Independência", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Independência" },
    { id: "tau-8", name: "Auto Socorro Vale Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Esplanada Santa Terezinha" },
    { id: "tau-9", name: "Reboque Taubaté Express", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim Eulália" },
    { id: "tau-10", name: "Guincho Plataforma Taubaté SP", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Parque São Luís" },
    { id: "tau-11", name: "Auto Socorro Oswaldo Cruz", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Rod. Oswaldo Cruz" },
    { id: "tau-12", name: "Reboque 24h Taubaté Centro", tier: "ghost", phoneMasked: "(12) 3***-****", area: "Centro Histórico" },
    { id: "tau-13", name: "Guincho Pesado Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Distrito Industrial" },
    { id: "tau-14", name: "Guincho de Motos Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Vila Marli" },
    { id: "tau-15", name: "Auto Socorro Dutra Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Rod. Dutra" },
    { id: "tau-16", name: "Reboque Jardim Russi", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Jardim Russi" },
    { id: "tau-17", name: "Guincho São Gonçalo Taubaté", tier: "ghost", phoneMasked: "(12) 9****-****", area: "São Gonçalo" },
    { id: "tau-18", name: "Pane Seca Taubaté 24h", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Toda a cidade" },
    { id: "tau-19", name: "Reboque Granjas Reunidas", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Granjas Reunidas" },
    { id: "tau-20", name: "Guincho Chácara do Visconde", tier: "ghost", phoneMasked: "(12) 9****-****", area: "Chácara do Visconde" },
  ],
};

// ---------- Overrides via localStorage (admin) ----------

export type ProviderOverride = {
  tier?: ProviderTier;
  whatsapp?: string;
  phoneMasked?: string;
  name?: string;
  area?: string;
  phone?: string;
  address?: string;
  logoUrl?: string;
  description?: string;
  verified?: boolean;
  instagram?: string;
  website?: string;
  photos?: string[];
};

export type AdminOverrides = Record<string, Record<string, ProviderOverride>>;
// formato: { [citySlug]: { [providerId]: override } }

const STORAGE_KEY = "admin_provider_overrides_v1";
const ADDED_KEY = "admin_provider_added_v1";

export function readOverrides(): AdminOverrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminOverrides) : {};
  } catch {
    return {};
  }
}

export function writeOverrides(data: AdminOverrides) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function setProviderOverride(citySlug: string, providerId: string, patch: ProviderOverride) {
  const all = readOverrides();
  all[citySlug] = { ...(all[citySlug] || {}), [providerId]: { ...(all[citySlug]?.[providerId] || {}), ...patch } };
  writeOverrides(all);
}

// ---------- Anunciantes adicionados pelo admin ----------

export type AddedProviders = Record<string, Provider[]>;

export function readAddedProviders(): AddedProviders {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ADDED_KEY);
    return raw ? (JSON.parse(raw) as AddedProviders) : {};
  } catch {
    return {};
  }
}

export function writeAddedProviders(data: AddedProviders) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADDED_KEY, JSON.stringify(data));
}

export function addProvider(citySlug: string, p: Omit<Provider, "id"> & { id?: string }): Provider {
  const all = readAddedProviders();
  const id = p.id || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const provider: Provider = { ...p, id };
  all[citySlug] = [...(all[citySlug] || []), provider];
  writeAddedProviders(all);
  return provider;
}

export function removeAddedProvider(citySlug: string, providerId: string) {
  const all = readAddedProviders();
  if (!all[citySlug]) return;
  all[citySlug] = all[citySlug].filter((p) => p.id !== providerId);
  writeAddedProviders(all);
}

function applyOverrides(citySlug: string, list: Provider[]): Provider[] {
  const all = readOverrides();
  const cityOv = all[citySlug];
  if (!cityOv) return list;
  return list.map((p) => {
    if (!p.id) return p;
    const ov = cityOv[p.id];
    return ov ? { ...p, ...ov } : p;
  });
}

const FALLBACK: Provider[] = [
  {
    id: "central-verified",
    name: "Central SOS Guincho 24 horas — Parceiro Verificado",
    tier: "gold",
    whatsapp: "5511996451510",
    area: "Cobertura total da cidade",
    rating: 5,
    reviews: 248,
  },
  ...GENERIC_GHOSTS,
];

export function getCityProviders(slugWithUf: string): Provider[] {
  const key = slugWithUf.toLowerCase();
  const direct = CITY_PROVIDERS[key];
  const base = direct && direct.length ? direct : FALLBACK;
  const withOv = applyOverrides(key, base);
  const added = readAddedProviders()[key] || [];
  // Anunciantes adicionados também passam por overrides (caso editados depois)
  const addedWithOv = applyOverrides(key, added);
  return [...withOv, ...addedWithOv];
}

export function getStaticCityProviders(slugWithUf: string): Provider[] {
  const key = slugWithUf.toLowerCase();
  const direct = CITY_PROVIDERS[key];
  const base = direct && direct.length ? direct : FALLBACK;
  return base.map((provider) => ({ ...provider }));
}

// Lista cidades com cadastro próprio (file) + cidades com providers adicionados
export function listProviderCities(): string[] {
  const fileCities = Object.keys(CITY_PROVIDERS);
  const addedCities = typeof window !== "undefined" ? Object.keys(readAddedProviders()) : [];
  return Array.from(new Set([...fileCities, ...addedCities])).sort();
}

export function getRawCityProviders(slugWithUf: string): Provider[] {
  const key = slugWithUf.toLowerCase();
  const base = CITY_PROVIDERS[key] || FALLBACK;
  const added = readAddedProviders()[key] || [];
  return [...base, ...added];
}

