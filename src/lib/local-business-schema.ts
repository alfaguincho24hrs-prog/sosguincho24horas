import { SITE } from "@/components/site-data";

/**
 * Fonte única de verdade para os dados de negócio usados nos schemas
 * (telefone, horários, endereço). Evita divergência entre páginas.
 */
export const TEL_E164 = `+${SITE.whatsapp}`;

export const OPENING_HOURS_24_7 = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
];

type AreaServed = Record<string, unknown>;

interface LocalBusinessOptions {
  /** URL canônica da página (usada no @id e no url). */
  url: string;
  /** Sufixo do nome, ex.: "Centro, São José dos Campos" ou "Taubaté - SP". */
  areaLabel: string;
  /** Nó areaServed já montado (Place ou City). */
  areaServed: AreaServed;
  /** Bloco opcional de avaliações agregadas. */
  aggregateRating?: Record<string, unknown>;
  review?: Record<string, unknown>[];
}

/**
 * LocalBusiness completo e idêntico em todas as páginas de guincho:
 * telefone, e-mail, endereço, geo, faixa de preço e atendimento 24h.
 */
export function buildLocalBusiness({
  url,
  areaLabel,
  areaServed,
  aggregateRating,
  review,
}: LocalBusinessOptions) {
  return {
    "@type": ["LocalBusiness", "AutomotiveBusiness"],
    "@id": `${url}#business`,
    name: `${SITE.name} — ${areaLabel}`,
    description: `${SITE.tagline}. Atendimento 24 horas em ${areaLabel}.`,
    telephone: TEL_E164,
    email: SITE.email,
    url,
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, Pix, Cartão de crédito, Cartão de débito",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed,
    openingHours: "Mo-Su 00:00-23:59",
    openingHoursSpecification: OPENING_HOURS_24_7,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: TEL_E164,
      contactType: "emergency",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
      hoursAvailable: OPENING_HOURS_24_7,
    },
    ...(aggregateRating ? { aggregateRating } : {}),
    ...(review && review.length ? { review } : {}),
  };
}
