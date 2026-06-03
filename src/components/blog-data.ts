// Blog posts storage with localStorage persistence + default seed posts.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown-ish plain text with double newlines as paragraph breaks
  date: string;
  category: string;
  coverUrl?: string;
};

const STORAGE_KEY = "blog_posts_v1";

export const DEFAULT_POSTS: BlogPost[] = [
  // NOVO: Post consolidado das Rodovias (Marginais e Principais)
  {
    slug: "guincho-24h-marginais-e-principais-rodovias-sp",
    title: "Guincho 24h nas Marginais e Principais Rodovias de SP: O Guia Completo",
    excerpt: "Precisa de guincho na Marginal Tietê, Pinheiros, Castelo Branco, Dutra ou Imigrantes? Saiba como funciona o socorro rápido 24h nas principais vias de São Paulo.",
    date: "03 de junho de 2026",
    category: "Rodovias",
    content: "Circular pelas grandes rodovias e marginais de São Paulo exige atenção constante. Quando ocorre uma pane mecânica ou acidente, a agilidade no resgate é fundamental para a sua segurança e para a fluidez do trânsito.\n\n### Atendimento nas Marginais Tietê e Pinheiros\nAs Marginais são as veias artérias de São Paulo. Atendemos todos os trechos:\n- **Marginal Tietê:** Cobertura completa nos trechos Norte (Santana/Casa Verde) e Leste (Tatuapé/Penha).\n- **Marginal Pinheiros:** Socorro imediato nos trechos Sul (Santo Amaro/Interlagos) e Oeste (Butantã/Pinheiros).\nNossas equipes estão posicionadas em pontos estratégicos para chegar em até 20 minutos, mesmo em horários de pico.\n\n### Principais Rodovias: Conexão Capital e Interior\nSeja para o interior ou para o litoral, garantimos reboque 24h com plataforma hidráulica nas seguintes vias:\n- **Rodovia Presidente Dutra (BR-116):** Atendimento especializado em todo o Vale do Paraíba.\n- **Rodovia Fernão Dias (BR-381):** Especialistas em trechos de serra e áreas urbanas de Guarulhos e Mairiporã.\n- **Rodovia Castelo Branco (SP-280):** Ligação rápida para Barueri, Sorocaba e região oeste.\n- **Rodovia Ayrton Senna e Carvalho Pinto:** Alternativa segura para o Litoral Norte e Vale.\n- **Rodovias Anchieta e Imigrantes:** Descida e subida da serra com equipamentos de alta performance.\n- **Rodovias Anhanguera e Bandeirantes:** Eixo econômico para Jundiaí e Campinas.\n- **Rodoanel Mario Covas:** Conexão entre todas as rodovias com suporte em todas as alças de acesso.\n- **Rodovia Raposo Tavares:** Atendimento na Zona Oeste, Cotia e Sorocaba.\n\n### Por que escolher o SOS Guincho 24h?\nContamos com frotas modernas de guinchos leves e pesados, prontos para qualquer situação. Se o seu veículo apresentou problemas na Rodovia dos Bandeirantes ou no Rodoanel, nossa central está disponível agora para enviar o socorro mais próximo.\n\n**Chame agora no WhatsApp ou Telefone para um orçamento rápido!**",
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
