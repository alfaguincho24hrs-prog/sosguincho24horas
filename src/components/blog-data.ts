// Blog posts storage with localStorage persistence + default seed posts.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown-ish plain text with double newlines as paragraph breaks
  date: string;
  category: string;
  coverUrl?: string;
  faq?: { q: string; a: string }[];
};

const STORAGE_KEY = "blog_posts_v1";

export const DEFAULT_POSTS: BlogPost[] = [
  {
    slug: "guincho-na-marginal-tiete-norte-e-leste",
    title: "Guincho 24h na Marginal Tietê: Socorro nos Trechos Norte e Leste",
    excerpt: "Pane na Marginal Tietê? Saiba como solicitar guincho rápido nos trechos Norte e Leste para garantir sua segurança.",
    date: "03 de junho de 2026",
    category: "Rodovias",
    content: "A Marginal Tietê é uma das vias mais complexas de SP. Nosso serviço de guincho atende com prioridade os trechos Norte (região de Santana e Vila Maria) e Leste (região do Tatuapé e Penha).\n\nSe o seu veículo parar na pista central ou local, sinalize imediatamente. Nossas bases próximas permitem chegada rápida para evitar congestionamentos e garantir a remoção segura do seu automóvel ou moto. Além da Marginal Tietê, também oferecemos suporte na [Marginal Pinheiros](/blog/guincho-marginal-pinheiros-sul-e-oeste) e no [Rodoanel](/blog/socorro-guincho-na-castelo-branco-e-rodoanel).",
    faq: [
      { q: "Qual o tempo de chegada na Marginal Tietê?", a: "Pela nossa presença estratégica, o tempo médio de chegada é de 15 a 25 minutos em qualquer trecho da Marginal." },
      { q: "Atendem veículos pesados na Marginal?", a: "Sim, possuímos guinchos de grande porte para caminhões e ônibus, respeitando as normas de circulação." }
    ]
  },
  {
    slug: "guincho-marginal-pinheiros-sul-e-oeste",
    title: "Guincho na Marginal Pinheiros: Atendimento nos Trechos Sul e Oeste",
    excerpt: "Serviço de reboque 24h na Marginal Pinheiros. Atendemos com agilidade as regiões de Santo Amaro e Butantã.",
    date: "03 de junho de 2026",
    category: "Rodovias",
    content: "Na Marginal Pinheiros, o fluxo é intenso e qualquer parada pode ser perigosa. Oferecemos guincho 24h especializado no Trecho Sul (Santo Amaro/Interlagos) e no Trecho Oeste (Butantã/Pinheiros).\n\nCom equipamentos modernos, realizamos o auto socorro em tempo recorde. Seja para pane elétrica, mecânica ou acidentes, conte com o SOS Guincho 24h para um atendimento profissional na Zona Sul e Oeste de São Paulo. Conectamos você rapidamente à [Rodovia Castelo Branco](/blog/socorro-guincho-na-castelo-branco-e-rodoanel) ou à [Raposo Tavares](/blog/guincho-anhanguera-bandeirantes-raposo-tavares).",
    faq: [
      { q: "Atendem próximo à Ponte Estaiada?", a: "Sim, temos equipes baseadas na região do Brooklin e Itaim para socorro rápido em toda a extensão da Marginal Pinheiros." },
      { q: "O guincho atende motos na Marginal Pinheiros?", a: "Sim, temos equipamentos específicos para o transporte seguro de motocicletas de todas as cilindradas." }
    ]
  },
  {
    slug: "socorro-guincho-na-castelo-branco-e-rodoanel",
    title: "Socorro e Guincho na Castelo Branco e Rodoanel Mario Covas",
    excerpt: "Precisa de guincho na Rodovia Castelo Branco ou no Rodoanel? Atendimento rápido em todas as alças e trechos.",
    date: "03 de junho de 2026",
    category: "Rodovias",
    content: "A Rodovia Castelo Branco e o Rodoanel Mario Covas são rotas fundamentais para o transporte em SP. Nossa cobertura abrange desde o início da Castelo em SP até Barueri e Sorocaba, além de todos os trechos do Rodoanel (Sul, Leste, Oeste e Norte).\n\nNossas plataformas estão prontas para atender veículos de passeio e pesados. Se você ficou parado em uma alça de acesso ou no acostamento, ligue agora para o socorro mais ágil da região. Caso esteja vindo da [Marginal Tietê](/blog/guincho-na-marginal-tiete-norte-e-leste), nossa equipe já pode estar a caminho.",
    faq: [
      { q: "Atendem no pedágio de Barueri?", a: "Sim, temos bases próximas a Alphaville e Barueri para atendimento imediato na Rodovia Castelo Branco." },
      { q: "O Rodoanel Sul tem cobertura completa?", a: "Sim, cobrimos toda a extensão do Rodoanel Sul, conectando o ABC à região da Imigrantes e Anchieta." }
    ]
  },
  {
    slug: "guincho-fernao-dias-e-presidente-dutra-seguranca",
    title: "Guincho na Fernão Dias e Dutra: Segurança em Longas Distâncias",
    excerpt: "Atendimento de reboque nas rodovias Fernão Dias e Presidente Dutra. Socorro 24h em trechos urbanos e de serra.",
    date: "03 de junho de 2026",
    category: "Rodovias",
    content: "As rodovias Fernão Dias (BR-381) e Presidente Dutra (BR-116) exigem atenção redobrada, especialmente nos trechos de serra. Oferecemos serviço de guincho 24h com foco na segurança do motorista e dos passageiros.\n\nAtendemos ocorrências em Guarulhos, Mairiporã, São José dos Campos e demais cidades do Vale do Paraíba. Nossa equipe é treinada para realizar remoções em vias de alta velocidade com total eficiência. Se o seu destino for o litoral via [Ayrton Senna](/blog/guincho-carvalho-pinto-ayrton-senna-vale), também cobrimos esse trajeto.",
    faq: [
      { q: "Atendem na Serra da Cantareira (Fernão Dias)?", a: "Sim, operamos com segurança máxima nos trechos sinuosos da Fernão Dias, entre SP e Mairiporã." },
      { q: "Qual a cobertura na Rodovia Dutra?", a: "Cobrimos desde a saída da Marginal Tietê em São Paulo até o Vale do Paraíba e região." }
    ]
  },
  {
    slug: "guincho-carvalho-pinto-ayrton-senna-vale",
    title: "Guincho na Carvalho Pinto e Ayrton Senna: Rumo ao Vale e Litoral",
    excerpt: "Guincho rápido nas rodovias Ayrton Senna e Carvalho Pinto. Atendimento especializado para quem viaja ao Vale do Paraíba.",
    date: "03 de junho de 2026",
    category: "Rodovias",
    content: "Para quem utiliza o corredor Ayrton Senna/Carvalho Pinto, o SOS Guincho 24h garante tranquilidade em caso de imprevistos. Cobrimos toda a extensão dessas rodovias, facilitando o acesso ao Vale do Paraíba e Litoral Norte.\n\nNossos guinchos possuem tecnologia de ponta para o transporte de veículos leves e utilitários. Se o seu carro apresentou falha mecânica, nosso resgate chega rápido para te tirar da rodovia com segurança. Fazemos a conexão segura entre a [Marginal Tietê](/blog/guincho-na-marginal-tiete-norte-e-leste) e o interior.",
    faq: [
      { q: "Atendem próximo ao Aeroporto de Guarulhos?", a: "Sim, temos unidades posicionadas estrategicamente próximas ao acesso do Aeroporto pela Ayrton Senna." },
      { q: "O guincho chega até Jacareí pela Carvalho Pinto?", a: "Sim, cobrimos toda a extensão da Carvalho Pinto, atendendo Jacareí, São José dos Campos e Taubaté." }
    ]
  },
  {
    slug: "reboque-imigrantes-anchieta-serra-litoral",
    title: "Reboque nas Rodovias Imigrantes e Anchieta: Serra e Litoral",
    excerpt: "Socorro 24h no Sistema Anchieta-Imigrantes. Guincho especializado para trechos de serra e túneis.",
    date: "03 de junho de 2026",
    category: "Rodovias",
    content: "O Sistema Anchieta-Imigrantes é o principal acesso ao Porto de Santos e às praias. Por isso, nosso serviço de reboque é especializado em trechos sinuosos e de baixa visibilidade, como túneis e neblina.\n\nAtendemos veículos leves e pesados na Rodovia dos Imigrantes e na Rodovia Anchieta. Se precisar de guincho na descida ou subida da serra, conte com nossa equipe experiente para um atendimento ágil e seguro. Também atendemos o trecho sul do [Rodoanel](/blog/socorro-guincho-na-castelo-branco-e-rodoanel) que se conecta a estas vias.",
    faq: [
      { q: "Atendem em caso de neblina na Imigrantes?", a: "Sim, nossas equipes são treinadas para operar com segurança mesmo em condições de visibilidade reduzida na serra." },
      { q: "O reboque leva o veículo até Santos?", a: "Sim, realizamos o transporte seguro de veículos avariados para qualquer cidade da Baixada Santista ou de volta para a Capital." }
    ]
  },
  {
    slug: "guincho-anhanguera-bandeirantes-raposo-tavares",
    title: "Guincho na Anhanguera, Bandeirantes e Raposo Tavares",
    excerpt: "Atendimento de auto socorro nas rodovias Anhanguera, Bandeirantes e Raposo Tavares. Reboque 24h para o interior.",
    date: "03 de junho de 2026",
    category: "Rodovias",
    content: "As rodovias Anhanguera, Bandeirantes e Raposo Tavares conectam a capital ao próspero interior paulista. Oferecemos guincho 24h para essas vias, atendendo desde a Marginal até cidades como Jundiaí, Campinas e Sorocaba.\n\nSeja por falta de combustível (pane seca) ou falha no motor, nossas plataformas hidráulicas garantem o transporte seguro do seu veículo. Priorizamos a agilidade para que você siga sua viagem o mais rápido possível. Estas rodovias têm fácil acesso à [Marginal Pinheiros](/blog/guincho-marginal-pinheiros-sul-e-oeste) e [Castelo Branco](/blog/socorro-guincho-na-castelo-branco-e-rodoanel).",
    faq: [
      { q: "Atendem na Anhanguera em Campinas?", a: "Sim, cobrimos todo o trecho urbano de Campinas e as saídas para o interior pela Rodovia Anhanguera." },
      { q: "Qual o tempo de chegada na Raposo Tavares?", a: "Temos bases em Cotia e na Zona Oeste de SP, garantindo chegada em aproximadamente 20 a 30 minutos." }
    ]
  },
  // SILO 1 – Rodovias
  {
    slug: "o-que-fazer-se-o-carro-quebrar-na-dutra",
    title: "O que fazer se o carro quebrar na Rodovia Presidente Dutra",
    excerpt: "Guia de segurança para pane na Dutra: como sinalizar, onde aguardar e como pedir socorro rápido na BR-116.",
    date: "20 de maio de 2026",
    category: "Rodovias",
    content: "A Rodovia Presidente Dutra é uma das mais movimentadas do Brasil. Se o seu carro quebrar, a prioridade é a sua segurança.\n\n1. Sinalize imediatamente com o pisca-alerta e posicione o triângulo a pelo menos 30 metros.\n2. Se possível, leve o carro para o acostamento ou gramado lateral.\n3. Saia do veículo pelo lado oposto ao trânsito e aguarde atrás da barreira de proteção.\n4. Ligue para o SOS Guincho 24h informando o KM aproximado e o sentido da rodovia.\n\nAtendemos todos os trechos da Dutra, desde São Paulo até o Rio de Janeiro, com foco especial no Vale do Paraíba.",
  },
  {
    slug: "guincho-na-rodovia-presidente-dutra-atendimento",
    title: "Guincho na Rodovia Presidente Dutra: Atendimento Especializado",
    excerpt: "Saiba como funciona o resgate veicular na Dutra e as vantagens de contratar um serviço especializado 24 horas.",
    date: "18 de maio de 2026",
    category: "Rodovias",
    content: "O atendimento de guincho na Dutra exige rapidez devido ao alto fluxo de caminhões e veículos leves.\n\nNossas bases em Taubaté, São José dos Campos e Guarulhos permitem que a plataforma chegue ao local da ocorrência em tempo recorde.\n\nTrabalhamos com equipamentos preparados para rodovias, garantindo que a remoção seja feita de forma ágil, liberando a via e garantindo a segurança dos passageiros.",
  },

  // SILO 2 – Problemas Automotivos
  {
    slug: "carro-nao-liga-principais-causas",
    title: "Carro não liga? Conheça as principais causas e o que fazer",
    excerpt: "Bateria, motor de arranque ou pane elétrica? Saiba diagnosticar por que seu carro não quer pegar.",
    date: "15 de maio de 2026",
    category: "Mecânica",
    content: "É frustrante quando você entra no carro e ele não liga. Os motivos podem variar de algo simples a problemas complexos.\n\nVerifique as luzes do painel: se estiverem fracas, a causa pode ser a bateria descarregada. Se houver um barulho de estalo, pode ser o motor de arranque.\n\nCaso o problema persista, acione nosso serviço de Auto Socorro Mecânico. Muitas vezes uma simples carga de bateria (chupeta) ou reparo elétrico no local resolve o problema.",
  },
  {
    slug: "bateria-descarregada-como-proceder",
    title: "Bateria descarregada: como pedir socorro e evitar danos",
    excerpt: "Dicas para lidar com bateria morta e por que o serviço de auto socorro é mais seguro que a 'chupeta' caseira.",
    date: "12 de maio de 2026",
    category: "Mecânica",
    content: "A bateria é o coração elétrico do veículo. Esquecer as luzes acionadas ou o rádio ligado é a causa número um de descarga.\n\nEmbora a 'chupeta' seja comum, ela pode queimar componentes eletrônicos se feita incorretamente. Nosso serviço de socorro usa equipamentos com proteção contra surtos, garantindo a integridade do sistema do seu carro.",
  },

  // SILO 3 – Situações de Emergência
  {
    slug: "guincho-de-madrugada-seguranca-rapidez",
    title: "Guincho de madrugada: segurança e rapidez no atendimento",
    excerpt: "Precisa de guincho à noite? Saiba como funciona nosso plantão 24h e dicas de segurança para esperar o resgate.",
    date: "10 de maio de 2026",
    category: "Emergência",
    content: "Ficar parado na rua durante a madrugada traz preocupações extras com a segurança. Por isso, nosso atendimento noturno é prioridade absoluta.\n\nAo ligar para nossa central, fornecemos o nome do motorista e o modelo do guincho que irá te atender. Mantenha os vidros fechados e as portas travadas até a chegada da plataforma identificada.",
  },

  // SILO 4 – Conteúdo Local
  {
    slug: "guincho-rapido-em-sao-jose-dos-campos",
    title: "Guincho rápido em São José dos Campos e Região",
    excerpt: "Atendimento de reboque em SJC com chegada em menos de 30 minutos em bairros como Aquarius, Satélite e Centro.",
    date: "05 de maio de 2026",
    category: "Local",
    content: "São José dos Campos é o coração do Vale do Paraíba. Com bases espalhadas pela cidade, garantimos o guincho mais rápido para bairros urbanos e para a via Dutra.\n\nSeja para uma remoção programada ou socorro imediato, conte com o SOS Guincho 24h para um serviço profissional e com preço justo na região de SJC.",
  },
];

function readStored(): BlogPost[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as BlogPost[];
  } catch {
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const stored = readStored();
  return stored ?? DEFAULT_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

function persist(posts: BlogPost[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function upsertPost(post: BlogPost) {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) posts[idx] = post;
  else posts.unshift(post);
  persist(posts);
}

export function deletePost(slug: string) {
  const posts = getAllPosts().filter((p) => p.slug !== slug);
  persist(posts);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
