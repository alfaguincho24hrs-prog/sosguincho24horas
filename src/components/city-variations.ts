// Gera variações determinísticas de textos por cidade, evitando "doorway pages".
// O mesmo slug sempre produz o mesmo conteúdo (estável para SEO), mas cidades
// diferentes recebem títulos, parágrafos e FAQs distintos — como se um redator
// humano tivesse escrito cada página.

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, salt = 0): T {
  return arr[(seed + salt) % arr.length];
}

export type CityCopy = {
  heroIntro: string;
  servicesTitle: string;
  servicesIntro: string;
  neighborhoodsTitle: string;
  whyTitle: string;
  faqTitle: string;
  longTitle: string;
  longIntro: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
};

// Contexto Regional Real por Cidade
const REGIONAL_CONTEXT: Record<string, {
  highways: string[];
  mainAvenues: string[];
  localFlow: string;
  landmarks: string[];
  zones?: Record<string, string[]>;
}> = {
  "sao-paulo-sp": {
    highways: ["Marginal Tietê", "Marginal Pinheiros", "Rodovia dos Bandeirantes", "Rodovia Anhanguera", "Rodovia Castelo Branco", "Rodovia Imigrantes", "Rodovia Anchieta", "Rodoanel"],
    mainAvenues: ["Av. Paulista", "Av. 23 de Maio", "Av. Brasil", "Av. do Estado", "Av. Rebouças"],
    localFlow: "fluxo intenso das marginais e grandes eixos radiais que ligam a capital ao interior e litoral.",
    landmarks: ["MASP", "Parque Ibirapuera", "Aeroporto de Congonhas", "Estádio do Morumbi"],
    zones: {
      "Zona Norte": ["Rodovia Fernão Dias", "Rodovia Presidente Dutra", "Marginal Tietê (trecho Norte)", "Av. Cruzeiro do Sul", "Av. Engenheiro Caetano Álvares"],
      "Zona Sul": ["Marginal Pinheiros", "Rodovia dos Imigrantes", "Rodovia Anchieta", "Av. Interlagos", "Av. Washington Luís", "Av. Ricardo Jafet"],
      "Zona Leste": ["Radial Leste", "Rodovia Ayrton Senna", "Jacu-Pêssego", "Av. Aricanduva", "Marginal Tietê (trecho Leste)"],
      "Zona Oeste": ["Rodovia Raposo Tavares", "Rodovia Castelo Branco", "Rodovia Anhanguera", "Rodovia dos Bandeirantes", "Av. Francisco Morato", "Marginal Pinheiros (trecho Oeste)"]
    }
  },
  "taubate-sp": {
    highways: ["Dutra (BR-116)", "Oswaldo Cruz (SP-125)", "Floriano Rodrigues Pinheiro"],
    mainAvenues: ["Independência", "Charles Schnneider", "Granadeiro Guimarães"],
    localFlow: "Acesso direto à Dutra facilitando o escoamento para SP e RJ.",
    landmarks: ["Quiririm (bairro histórico)", "Taubaté Shopping", "Centro Universitário UNITAU"]
  },
  "sao-jose-dos-campos-sp": {
    highways: ["Dutra (BR-116)", "Tamoios (SP-099)", "Anel Viário"],
    mainAvenues: ["Cidade Jardim", "Adhemar de Barros", "Andrômeda"],
    localFlow: "Fluxo intenso entre o pólo tecnológico e a Serra do Mar.",
    landmarks: ["Urbanova", "CenterVale Shopping", "CTA/ITA"]
  },
  "pindamonhangaba-sp": {
    highways: ["Dutra (BR-116)", "SP-062"],
    mainAvenues: ["Nossa Senhora do Bonsucesso", "Luiz Gonzaga de Azevedo"],
    localFlow: "Trânsito ágil conectando Moreira César ao centro urbano.",
    landmarks: ["Araretama", "Parque da Cidade", "Shopping Pátio Pinda"]
  },
  "jacarei-sp": {
    highways: ["Dutra (BR-116)", "Carvalho Pinto (SP-070)"],
    mainAvenues: ["Engenheiro Davi Monteiro Lino", "Siqueira Campos"],
    localFlow: "Fluxo pendular constante com SJC.",
    landmarks: ["Vila Branca", "Parque dos Eucaliptos", "Rio Paraíba do Sul"]
  }
};

export function getCityCopy(cityName: string, uf: string, slug: string): CityCopy {
  const seed = hash(`${slug}-${uf}`);
  const c = cityName;
  const cu = `${cityName}/${uf}`;
  
  // Contexto regional específico se disponível
  const regional = REGIONAL_CONTEXT[`${slug}-${uf.toLowerCase()}`] || {
    highways: ["rodovias estaduais"],
    mainAvenues: ["principais vias urbanas"],
    localFlow: "fluxo regional estável",
    landmarks: ["pontos conhecidos locais"]
  };

  const heroIntros = [
    `Precisa de socorro em ${c}? Atendemos em toda a região, com foco nas vias como ${regional.highways[0]} e avenidas como ${regional.mainAvenues[0]}. Nossa equipe conhece bem o fluxo de ${regional.localFlow}`,
    `Guincho 24 horas em ${c}. Seja próximo a ${regional.landmarks[0]} ou nas rodovias ${regional.highways.join(" e ")}, chegamos rapidamente. Resolvemos pane, falta de combustível e remoção veicular com agilidade.`,
  ];

  const servicesTitles = [`Soluções de reboque em ${c}`];
  
  const servicesIntro = `Atendemos ocorrências automotivas em ${c} considerando o contexto de ${regional.localFlow}. Seja no ${regional.landmarks[0]} ou no ${regional.landmarks[1]}, temos equipamento adequado.`;

  const faqs = [
    { q: `Vocês atendem a ${regional.highways[0]} em ${c}?`, a: `Sim, atendemos toda a extensão da ${regional.highways[0]} em ${c} com equipes de plantão permanente.` },
    { q: `Qual o tempo médio de atendimento perto de ${regional.landmarks[0]}?`, a: `Pela proximidade com nosso posto de atendimento, o reboque na região de ${regional.landmarks[0]} costuma ser muito rápido, frequentemente em menos de 30 minutos.` },
    { q: `Como identificar o guincho de vocês nas vias de ${c}?`, a: `Nossos caminhões operam sinalizados e identificados. Em casos de dúvida nas vias principais como a ${regional.mainAvenues[0]}, peça ao motorista para se identificar.` },
    { q: `Atendem bairros como ${regional.landmarks[0]} em ${c}?`, a: `Sim, nossa cobertura em ${c} é completa, incluindo toda a área de ${regional.landmarks[0]} e bairros vizinhos.` }
  ];

  return {
    heroIntro: heroIntros[seed % heroIntros.length],
    servicesTitle: servicesTitles[0],
    servicesIntro: servicesIntro,
    neighborhoodsTitle: `Atendimento em ${c} e região`,
    whyTitle: `Por que somos referência em ${c}`,
    faqTitle: `Dúvidas sobre nosso guincho em ${c}`,
    longTitle: `Guincho 24 Horas em ${c} — Socorro rápido e profissional`,
    longIntro: `Com foco na mobilidade de ${c}, nosso serviço de reboque entende o contexto das vias ${regional.mainAvenues.join(", ")} e a importância da rapidez para liberar o fluxo após qualquer imprevisto.`,
    faqs,
    ctaTitle: `Guincho em ${c}: Acione agora`
  };
}