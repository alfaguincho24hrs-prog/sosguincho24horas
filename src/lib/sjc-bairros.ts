export interface Bairro {
  slug: string;
  nome: string;
  /** Região da cidade, usada em títulos e no schema */
  regiao: string;
  /** Frase curta usada em meta description e no hero */
  resumo: string;
  /** Vias e pontos de referência reais do bairro */
  referencias: string[];
  /** Ocorrências mais comuns na região */
  ocorrencias: string[];
  /** Bairros vizinhos (slugs) para links internos */
  vizinhos: string[];
  /** Tempo médio de chegada exibido na página */
  eta: string;
}

export const SJC_BAIRROS: Bairro[] = [
  {
    slug: "zona-leste",
    nome: "Zona Leste",
    regiao: "Zona Leste de São José dos Campos",
    resumo:
      "Atendimento de guincho 24h em toda a Zona Leste de São José dos Campos, do Jardim Satélite a Eugênio de Melo, com base próxima à Via Dutra.",
    referencias: [
      "Avenida Andrômeda e entorno do Jardim Satélite",
      "Avenida Cassiano Ricardo (trecho leste)",
      "Eugênio de Melo e acesso à Dutra sentido Rio",
      "Campo dos Alemães e Dom Pedro I",
    ],
    ocorrencias: [
      "Pane elétrica e bateria descarregada em conjuntos residenciais",
      "Colisões nos cruzamentos da Avenida Andrômeda",
      "Veículos parados nas alças de acesso à BR-116",
    ],
    vizinhos: ["jardim-satelite", "eugenio-de-melo", "campo-dos-alemaes", "putim"],
    eta: "20 a 35 minutos",
  },
  {
    slug: "zona-sul",
    nome: "Zona Sul",
    regiao: "Zona Sul de São José dos Campos",
    resumo:
      "Guincho e reboque 24 horas na Zona Sul de São José dos Campos, cobrindo Bosque dos Eucaliptos, Parque Industrial e adjacências.",
    referencias: [
      "Avenida Andrômeda e Shopping Colinas",
      "Bosque dos Eucaliptos e Jardim Morumbi",
      "Parque Industrial e Dutra Business",
      "Avenida Ouro Fino e Rua Iolanda",
    ],
    ocorrencias: [
      "Superaquecimento em congestionamento de fim de tarde",
      "Pane seca na saída para a Dutra",
      "Remoção de veículos de estacionamentos e garagens de prédios",
    ],
    vizinhos: ["bosque-dos-eucaliptos", "parque-industrial", "jardim-morumbi", "jardim-satelite"],
    eta: "20 a 35 minutos",
  },
  {
    slug: "zona-norte",
    nome: "Zona Norte",
    regiao: "Zona Norte de São José dos Campos",
    resumo:
      "Socorro veicular 24h na Zona Norte de São José dos Campos, incluindo Santana, Jardim Paulista e acessos à rodovia dos Tamoios.",
    referencias: [
      "Bairro de Santana e Avenida Alfredo Ignácio Nogueira Penido",
      "Jardim Paulista e Vila Rossi",
      "Acesso à Rodovia dos Tamoios (SP-099)",
      "Distrito de São Francisco Xavier (estrada de serra)",
    ],
    ocorrencias: [
      "Veículos com pane na subida para São Francisco Xavier",
      "Atolamento em vias sem pavimento na área rural",
      "Reboque de veículos após colisão na Tamoios",
    ],
    vizinhos: ["santana", "jardim-paulista", "vista-verde", "urbanova"],
    eta: "25 a 40 minutos",
  },
  {
    slug: "centro",
    nome: "Centro",
    regiao: "Centro de São José dos Campos",
    resumo:
      "Guincho 24 horas no Centro de São José dos Campos, com remoção de veículos em ruas estreitas, garagens e estacionamentos verticais.",
    referencias: [
      "Praça Afonso Pena e Rua Sete de Setembro",
      "Avenida São José e Parque Santos Dumont",
      "Rua Rubião Júnior e Vila Adyana",
      "Terminal Rodoviário e Mercado Municipal",
    ],
    ocorrencias: [
      "Veículos bloqueados em vaga de garagem subterrânea",
      "Remoção por multa e falta de documentação",
      "Bateria descarregada em estacionamento rotativo",
    ],
    vizinhos: ["vila-adyana", "jardim-aquarius", "vila-industrial", "santana"],
    eta: "15 a 30 minutos",
  },
  {
    slug: "jardim-satelite",
    nome: "Jardim Satélite",
    regiao: "Jardim Satélite, São José dos Campos",
    resumo:
      "Guincho 24h no Jardim Satélite: base próxima permite chegada rápida na Avenida Andrômeda e em todo o entorno.",
    referencias: [
      "Avenida Andrômeda, do início ao trevo da Dutra",
      "Avenida Cassiano Ricardo (trecho sul)",
      "Shopping Jardim Oriente e entorno",
      "Rua Andorra e conjuntos residenciais vizinhos",
    ],
    ocorrencias: [
      "Colisões no fluxo intenso da Avenida Andrômeda",
      "Pane elétrica e alternador em veículos parados no comércio",
      "Reboque de motos após queda em cruzamento",
    ],
    vizinhos: ["zona-leste", "bosque-dos-eucaliptos", "parque-industrial", "campo-dos-alemaes"],
    eta: "15 a 30 minutos",
  },
  {
    slug: "jardim-aquarius",
    nome: "Jardim Aquarius",
    regiao: "Jardim Aquarius, São José dos Campos",
    resumo:
      "Reboque e guincho 24 horas no Jardim Aquarius, com plataforma adequada para carros importados, blindados e veículos rebaixados.",
    referencias: [
      "Avenida Salmão e Avenida Cassiano Ricardo",
      "Parque da Cidade e Praça Ulisses Guimarães",
      "Torres comerciais da Avenida Shishima Hifumi",
      "Colinas Shopping e entorno",
    ],
    ocorrencias: [
      "Remoção de veículo blindado ou importado com guincho de plataforma",
      "Carro rebaixado preso em rampa de garagem",
      "Bateria descarregada em condomínio fechado",
    ],
    vizinhos: ["urbanova", "vila-adyana", "centro", "jardim-esplanada"],
    eta: "15 a 30 minutos",
  },
  {
    slug: "urbanova",
    nome: "Urbanova",
    regiao: "Urbanova, São José dos Campos",
    resumo:
      "Guincho 24h no Urbanova e condomínios da região, com atendimento em vias de acesso restrito e trechos de terra.",
    referencias: [
      "Avenida Deputado Benedito Matarazzo (acesso Urbanova)",
      "Condomínios do Urbanova I ao VII",
      "Ponte Estaiada e margens do Rio Paraíba",
      "Univap Campus Urbanova",
    ],
    ocorrencias: [
      "Atolamento em estradas de terra e trilhas 4x4",
      "Resgate de veículo em condomínio com portaria controlada",
      "Transporte de jet ski e barco para a represa",
    ],
    vizinhos: ["jardim-aquarius", "zona-norte", "jardim-esplanada", "vista-verde"],
    eta: "20 a 40 minutos",
  },
  {
    slug: "jardim-esplanada",
    nome: "Jardim Esplanada",
    regiao: "Jardim Esplanada, São José dos Campos",
    resumo:
      "Guincho e auto socorro 24 horas no Jardim Esplanada e Vila Ema, com resposta rápida na Avenida São João.",
    referencias: [
      "Avenida São João e Avenida Cassiano Ricardo",
      "Vila Ema e Jardim Esplanada II",
      "Hospital Vivalle e entorno",
      "Avenida Anchieta",
    ],
    ocorrencias: [
      "Colisões no corredor da Avenida São João",
      "Pane seca em trajeto para a Dutra",
      "Troca de pneu e chaveiro automotivo em via pública",
    ],
    vizinhos: ["jardim-aquarius", "vila-adyana", "centro", "urbanova"],
    eta: "15 a 30 minutos",
  },
  {
    slug: "vila-adyana",
    nome: "Vila Adyana",
    regiao: "Vila Adyana, São José dos Campos",
    resumo:
      "Guincho 24h na Vila Adyana, com remoção em ruas estreitas, garagens residenciais e estacionamentos comerciais.",
    referencias: [
      "Avenida Nove de Julho e Rua Paraibuna",
      "Praça Ulisses Guimarães",
      "Rua Euclides Miragaia e comércio do entorno",
      "Avenida São José",
    ],
    ocorrencias: [
      "Veículo travado em vaga apertada de prédio",
      "Bateria e pane elétrica em carros de uso urbano",
      "Reboque após pequena colisão em cruzamento",
    ],
    vizinhos: ["centro", "jardim-aquarius", "jardim-esplanada", "vila-industrial"],
    eta: "15 a 30 minutos",
  },
  {
    slug: "bosque-dos-eucaliptos",
    nome: "Bosque dos Eucaliptos",
    regiao: "Bosque dos Eucaliptos, São José dos Campos",
    resumo:
      "Guincho 24 horas no Bosque dos Eucaliptos e região sul, com plataforma leve e asa-delta disponíveis a qualquer hora.",
    referencias: [
      "Avenida Andrômeda e Avenida Salmão",
      "Rua Sirius e conjuntos habitacionais",
      "Shopping Colinas e Jardim Oriente",
      "Avenida Ouro Fino",
    ],
    ocorrencias: [
      "Pane elétrica em veículos populares",
      "Colisão em rotatórias da região sul",
      "Remoção de moto por falta de documentação",
    ],
    vizinhos: ["zona-sul", "jardim-satelite", "jardim-morumbi", "parque-industrial"],
    eta: "20 a 35 minutos",
  },
  {
    slug: "parque-industrial",
    nome: "Parque Industrial",
    regiao: "Parque Industrial, São José dos Campos",
    resumo:
      "Guincho pesado e leve 24h no Parque Industrial de São José dos Campos, com atendimento a caminhões, empilhadeiras e frotas.",
    referencias: [
      "Rodovia Presidente Dutra (BR-116), trecho industrial",
      "Avenida Cidade Jardim e Rua Icatu",
      "Dutra Business Park e galpões logísticos",
      "Acesso ao trevo Dutra/Tamoios",
    ],
    ocorrencias: [
      "Caminhão e carreta parados em pátio de galpão",
      "Transporte de empilhadeira e máquinas com prancha",
      "Resgate de veículo de frota após pane mecânica",
    ],
    vizinhos: ["zona-sul", "jardim-satelite", "eugenio-de-melo", "putim"],
    eta: "20 a 40 minutos",
  },
  {
    slug: "eugenio-de-melo",
    nome: "Eugênio de Melo",
    regiao: "Eugênio de Melo, São José dos Campos",
    resumo:
      "Guincho 24h em Eugênio de Melo, com base próxima aos postos da Dutra e ao acesso para Caçapava.",
    referencias: [
      "Rodovia Presidente Dutra, km 152 ao km 158",
      "Avenida Doutor Cirandinha e centro do distrito",
      "Postos e conveniências da BR-116",
      "Acesso ao Jardim Sant'Ana e Vista Verde",
    ],
    ocorrencias: [
      "Veículo parado no acostamento da Dutra",
      "Pane seca em trajeto de longa distância",
      "Colisão no acesso ao distrito industrial",
    ],
    vizinhos: ["zona-leste", "parque-industrial", "putim", "vista-verde"],
    eta: "20 a 40 minutos",
  },
  {
    slug: "putim",
    nome: "Putim",
    regiao: "Putim, São José dos Campos",
    resumo:
      "Guincho e reboque 24 horas no Putim e região do aeroporto, com acesso rápido à Dutra sentido São Paulo.",
    referencias: [
      "Avenida Nelson d'Ávila (trecho sul)",
      "Entorno do Aeroporto Professor Urbano Ernesto Stumpf",
      "Rua Vinte e Um e conjuntos do Putim",
      "Acesso à Dutra sentido São Paulo",
    ],
    ocorrencias: [
      "Alagamento e veículo parado em ponto de acúmulo de água",
      "Pane elétrica em vias do conjunto habitacional",
      "Remoção para pátio e oficina",
    ],
    vizinhos: ["zona-leste", "parque-industrial", "eugenio-de-melo", "campo-dos-alemaes"],
    eta: "20 a 35 minutos",
  },
  {
    slug: "campo-dos-alemaes",
    nome: "Campo dos Alemães",
    regiao: "Campo dos Alemães, São José dos Campos",
    resumo:
      "Guincho 24h no Campo dos Alemães e região sudeste, com plataforma leve e socorro mecânico no local.",
    referencias: [
      "Avenida Dom Pedro I e Rua Bandeirantes",
      "Praça do Campo dos Alemães",
      "Jardim das Indústrias (trecho sul)",
      "Acesso à Avenida Andrômeda",
    ],
    ocorrencias: [
      "Bateria descarregada e chaveiro automotivo",
      "Colisão em cruzamento sem semáforo",
      "Reboque de veículo antigo sem condição de rodar",
    ],
    vizinhos: ["zona-leste", "jardim-satelite", "putim", "jardim-morumbi"],
    eta: "20 a 35 minutos",
  },
  {
    slug: "jardim-morumbi",
    nome: "Jardim Morumbi",
    regiao: "Jardim Morumbi, São José dos Campos",
    resumo:
      "Guincho 24 horas no Jardim Morumbi e Conjunto Residencial Morumbi, com atendimento em ruas internas e vielas.",
    referencias: [
      "Avenida Ouro Fino e Rua Ismênia",
      "Conjunto Residencial Morumbi",
      "Cidade Morumbi e Jardim Colonial",
      "Acesso à Avenida Andrômeda",
    ],
    ocorrencias: [
      "Veículo parado em rua estreita, exigindo plataforma curta",
      "Pane mecânica em veículos de uso diário",
      "Remoção de moto acidentada",
    ],
    vizinhos: ["bosque-dos-eucaliptos", "zona-sul", "campo-dos-alemaes", "jardim-satelite"],
    eta: "20 a 35 minutos",
  },
  {
    slug: "vila-industrial",
    nome: "Vila Industrial",
    regiao: "Vila Industrial, São José dos Campos",
    resumo:
      "Guincho 24h na Vila Industrial, com resposta rápida na Avenida Engenheiro Sebastião Gualberto e entorno.",
    referencias: [
      "Avenida Engenheiro Sebastião Gualberto",
      "Rua Maria Cândida de Jesus",
      "Entorno do Estádio Martins Pereira",
      "Acesso ao Centro e à Avenida São José",
    ],
    ocorrencias: [
      "Colisão em corredor de ônibus",
      "Veículo com pane em oficina mecânica da região",
      "Remoção para concessionária",
    ],
    vizinhos: ["centro", "vila-adyana", "santana", "jardim-esplanada"],
    eta: "15 a 30 minutos",
  },
  {
    slug: "santana",
    nome: "Santana",
    regiao: "Santana, São José dos Campos",
    resumo:
      "Guincho e auto socorro 24 horas em Santana, cobrindo a Avenida Nelson d'Ávila e o acesso norte da cidade.",
    referencias: [
      "Avenida Nelson d'Ávila e Rua Santo Antônio",
      "Avenida Alfredo Ignácio Nogueira Penido",
      "Parque Vicentina Aranha e entorno",
      "Acesso ao Jardim Paulista e Vila Rossi",
    ],
    ocorrencias: [
      "Pane elétrica em corredor comercial",
      "Colisão em cruzamento de avenida movimentada",
      "Remoção de veículo estacionado irregularmente",
    ],
    vizinhos: ["centro", "jardim-paulista", "zona-norte", "vila-industrial"],
    eta: "15 a 30 minutos",
  },
  {
    slug: "jardim-paulista",
    nome: "Jardim Paulista",
    regiao: "Jardim Paulista, São José dos Campos",
    resumo:
      "Guincho 24h no Jardim Paulista e região norte, com plataforma leve, asa-delta e socorro mecânico no local.",
    referencias: [
      "Avenida Sebastião Gualberto (trecho norte)",
      "Rua Jaguari e Vila Rossi",
      "Acesso à Rodovia dos Tamoios",
      "Jardim Bela Vista e Bosque dos Ipês",
    ],
    ocorrencias: [
      "Veículo parado na alça de acesso à Tamoios",
      "Pane seca em trajeto para o Litoral Norte",
      "Reboque de utilitário e van",
    ],
    vizinhos: ["santana", "zona-norte", "vista-verde", "urbanova"],
    eta: "20 a 35 minutos",
  },
  {
    slug: "vista-verde",
    nome: "Vista Verde",
    regiao: "Vista Verde, São José dos Campos",
    resumo:
      "Guincho 24 horas no Vista Verde e Jardim Sant'Ana, com acesso direto à Dutra e à Carvalho Pinto.",
    referencias: [
      "Avenida Doutor João Batista Soares de Queiroz Júnior",
      "Jardim Sant'Ana e Vista Verde II",
      "Acesso à Rodovia Carvalho Pinto (SP-070)",
      "Entorno do Parque Tecnológico",
    ],
    ocorrencias: [
      "Colisão no acesso à Carvalho Pinto",
      "Pane mecânica em veículos de frota do Parque Tecnológico",
      "Remoção de carro após enchente localizada",
    ],
    vizinhos: ["zona-norte", "eugenio-de-melo", "jardim-paulista", "urbanova"],
    eta: "20 a 40 minutos",
  },
];

export const BAIRRO_MAP = new Map(SJC_BAIRROS.map((b) => [b.slug, b]));

export function getBairro(slug: string): Bairro | undefined {
  return BAIRRO_MAP.get(slug);
}

export function buildFaqs(b: Bairro) {
  return [
    {
      q: `Vocês têm guincho 24 horas no ${b.nome} em São José dos Campos?`,
      a: `Sim. Atendemos ${b.regiao} 24 horas por dia, todos os dias, incluindo madrugada, fins de semana e feriados. A central despacha a plataforma mais próxima assim que você liga ou chama no WhatsApp.`,
    },
    {
      q: `Quanto tempo o guincho leva para chegar no ${b.nome}?`,
      a: `O tempo médio de chegada no ${b.nome} é de ${b.eta}, variando conforme o trânsito e o ponto exato da ocorrência. Trabalhamos com bases distribuídas em São José dos Campos para reduzir a espera.`,
    },
    {
      q: `Quanto custa um guincho no ${b.nome}?`,
      a: `O valor depende do tipo de veículo, da distância até o destino e da complexidade do resgate. Informamos o preço fechado por telefone ou WhatsApp antes de enviar a plataforma — sem cobrança de taxa de deslocamento surpresa.`,
    },
    {
      q: `Que tipos de veículo vocês rebocam no ${b.nome}?`,
      a: `Carros de passeio, SUVs, motos, utilitários, veículos blindados e rebaixados, caminhões e ônibus com guincho pesado, além de empilhadeiras, tratores, barcos e jet skis com prancha rebaixada.`,
    },
    {
      q: `É possível fazer o socorro no local em vez de rebocar?`,
      a: `Sim. Em muitos chamados no ${b.nome} resolvemos no local: carga de bateria, troca de pneu, pane seca com combustível, chaveiro automotivo e pequenos reparos elétricos. Só rebocamos quando o veículo realmente não tem condição de rodar.`,
    },
  ];
}
