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
  regionalContext?: {
    highways: string[];
    mainAvenues: string[];
    localFlow: string;
    landmarks: string[];
    zones?: Record<string, string[]>;
  };
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

  // Contexto regional específico se disponível; fallback gera variações únicas por cidade
  const fallbackHighways = [
    ["rodovias estaduais da região", "vicinais municipais"],
    ["acessos rodoviários regionais", "estradas vicinais"],
    ["malha rodoviária regional", "trechos urbanos de acesso"],
    ["principais conexões rodoviárias", "vias de saída para o interior"],
  ];
  const fallbackAvenues = [
    [`a avenida principal do centro de ${c}`, "ruas comerciais movimentadas"],
    [`o eixo central de ${c}`, "vias do entorno do comércio"],
    [`as avenidas de maior movimento em ${c}`, "ruas dos bairros centrais"],
    [`a via principal de chegada a ${c}`, "ruas residenciais próximas ao centro"],
  ];
  const fallbackFlows = [
    `tráfego urbano característico de ${c}, com picos no início e fim do expediente`,
    `circulação local de ${c}, com maior intensidade nos dias úteis e fins de semana`,
    `dinâmica viária de ${c}, marcada por trajetos curtos entre bairros e ligações intermunicipais`,
    `fluxo de ${c} com particularidades de horário comercial e saída de fábricas e escolas`,
  ];
  const regional = REGIONAL_CONTEXT[`${slug}-${uf.toLowerCase()}`] || {
    highways: pick(fallbackHighways, seed),
    mainAvenues: pick(fallbackAvenues, seed, 1),
    localFlow: pick(fallbackFlows, seed, 2),
    landmarks: [
      `o centro de ${c}`,
      `a região comercial de ${c}`,
      `os bairros residenciais de ${c}`,
      `o entorno da rodoviária de ${c}`,
    ],
  };

  const heroIntros = [
    `Precisa de socorro em ${c}? Atendemos toda a região com foco em ${regional.highways[0]} e ${regional.mainAvenues[0]}. Nossa equipe conhece o ${regional.localFlow}.`,
    `Guincho 24 horas em ${c}. Seja perto de ${regional.landmarks[0]} ou nas vias ${regional.highways.join(" e ")}, chegamos rápido. Resolvemos pane, pane seca e remoção veicular com agilidade.`,
    `Reboque profissional em ${c} a qualquer hora. Operamos com bases estratégicas próximas a ${regional.landmarks[0]}, garantindo deslocamento curto para emergências em ${regional.mainAvenues[0]} e adjacências.`,
    `Quebrou o carro em ${c}? Nossa central despacha o guincho mais próximo da sua localização — cobrindo desde ${regional.highways[0]} até ${regional.landmarks[1]}, com transparência no preço e prazo.`,
    `Em ${c}, o tempo conta. Por isso mantemos plataformas hidráulicas e equipes 24h para atender ocorrências em ${regional.mainAvenues[0]} e nas rotas de ${regional.highways[0]}, sem espera.`,
    `Auto socorro em ${c} com técnicos experientes no ${regional.localFlow}. Atendemos carros, motos, SUVs e veículos pesados em ${regional.landmarks[0]} e bairros vizinhos.`,
  ];

  const servicesIntros = [
    `Atendemos ocorrências em ${c} considerando o ${regional.localFlow}. Seja em ${regional.landmarks[0]} ou ${regional.landmarks[1]}, temos equipamento adequado para cada veículo.`,
    `Cada chamado em ${c} recebe a infraestrutura certa — plataforma para carros, guincho de lança para pesados, içamento para motos — esteja você em ${regional.landmarks[0]} ou na ${regional.mainAvenues[0]}.`,
    `Os serviços em ${c} são dimensionados pela natureza da via: ${regional.highways[0]} pede equipamento robusto, enquanto ${regional.landmarks[1]} exige manobra precisa em espaço urbano.`,
    `Combinamos cobertura ampla em ${c} com tempo de resposta curto. Da ${regional.mainAvenues[0]} até ${regional.landmarks[0]}, mantemos prontidão real, sem repasse para terceiros.`,
  ];

  const longIntros = [
    `Com foco na mobilidade de ${c}, nosso serviço entende o contexto das vias ${regional.mainAvenues.join(", ")} e a importância da rapidez para liberar o fluxo após qualquer imprevisto.`,
    `Em ${c}, cada minuto parado significa risco para o motorista e congestionamento para quem passa. Por isso operamos com despacho automático e equipes posicionadas perto de ${regional.landmarks[0]} e ${regional.highways[0]}.`,
    `Nossa atuação em ${c} é construída em torno de três pilares: chegada rápida em ${regional.mainAvenues[0]}, equipamento adequado para ${regional.highways[0]} e atendimento honesto com preço fechado antes do serviço.`,
    `Atender ${c} significa entender o ${regional.localFlow}. Nossa central monitora o trânsito em tempo real e direciona o guincho mais próximo do ponto da ocorrência.`,
  ];

  const faqsPool = [
    [
      { q: `Vocês atendem a ${regional.highways[0]} em ${c}?`, a: `Sim, atendemos toda a extensão de ${regional.highways[0]} em ${c} com equipes de plantão permanente.` },
      { q: `Qual o tempo médio de atendimento perto de ${regional.landmarks[0]}?`, a: `Pela proximidade com nosso posto de atendimento, o reboque na região de ${regional.landmarks[0]} costuma ser rápido, frequentemente em menos de 30 minutos.` },
      { q: `Como identificar o guincho de vocês nas vias de ${c}?`, a: `Nossos caminhões operam sinalizados e identificados. Em ${regional.mainAvenues[0]}, peça ao motorista para confirmar o pedido pelo número informado na ligação.` },
      { q: `Atendem ${regional.landmarks[1]} em ${c}?`, a: `Sim, nossa cobertura em ${c} é completa, incluindo ${regional.landmarks[1]} e bairros vizinhos.` },
    ],
    [
      { q: `Qual o preço médio de um guincho em ${c}?`, a: `O valor em ${c} varia conforme distância, tipo de veículo e horário. Damos o preço fechado antes do envio — sem surpresas ao chegar no destino.` },
      { q: `Atendem moto e veículo pesado em ${c}?`, a: `Sim. Em ${c} operamos plataformas para carros e SUVs, içamento para motos e guincho de lança para caminhões, ônibus e máquinas pesadas.` },
      { q: `Funcionam de madrugada e em feriado em ${c}?`, a: `Sim, operamos 24 horas, 7 dias por semana em ${c}, incluindo feriados e madrugada — sem acréscimo abusivo.` },
      { q: `Qual a área de cobertura em ${c}?`, a: `Cobrimos toda a malha urbana de ${c}, ${regional.highways[0]} e estradas vicinais, além de cidades vizinhas mediante combinação prévia.` },
    ],
    [
      { q: `Quanto tempo para o guincho chegar em ${c}?`, a: `O tempo médio em ${c} é de 25 a 45 minutos, dependendo do trânsito em ${regional.mainAvenues[0]} e do ponto exato da ocorrência.` },
      { q: `Posso acompanhar a chegada do guincho em ${c}?`, a: `Sim, ao confirmar o chamado em ${c} enviamos contato direto do motorista para acompanhamento em tempo real até o local.` },
      { q: `Atendem pane seca e bateria descarregada em ${c}?`, a: `Sim, em ${c} fazemos entrega emergencial de combustível, partida com chupeta e troca de pneu no local — sem necessidade de reboque na maioria dos casos.` },
      { q: `Para onde levam o veículo em ${c}?`, a: `Em ${c} levamos para a oficina, residência, concessionária ou pátio indicado pelo cliente, dentro do raio combinado no orçamento.` },
    ],
  ];

  const neighborhoodsTitles = [
    `Atendimento em ${c} e região`,
    `Cobertura em ${c}: bairros e arredores`,
    `Onde atuamos em ${c}`,
  ];
  const whyTitles = [
    `Por que somos referência em ${c}`,
    `O diferencial do nosso guincho em ${c}`,
    `Quem confia no nosso serviço em ${c}`,
  ];
  const faqTitles = [
    `Dúvidas sobre nosso guincho em ${c}`,
    `Perguntas frequentes — Guincho em ${c}`,
    `Tire suas dúvidas sobre reboque em ${c}`,
  ];
  const longTitles = [
    `Guincho 24 Horas em ${c} — Socorro rápido e profissional`,
    `Reboque e auto socorro em ${c}: atendimento que chega na hora`,
    `${c}: referência em guincho 24h e remoção veicular`,
  ];

  return {
    heroIntro: pick(heroIntros, seed),
    servicesTitle: `Soluções de reboque em ${c}`,
    servicesIntro: pick(servicesIntros, seed, 1),
    neighborhoodsTitle: pick(neighborhoodsTitles, seed, 4),
    whyTitle: pick(whyTitles, seed, 5),
    faqTitle: pick(faqTitles, seed, 6),
    longTitle: pick(longTitles, seed, 7),
    longIntro: pick(longIntros, seed, 2),
    faqs: pick(faqsPool, seed, 3),
    ctaTitle: `Guincho em ${c}: Acione agora`,
    regionalContext: regional,
  };
}