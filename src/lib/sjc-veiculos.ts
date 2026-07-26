export interface TipoVeiculo {
  slug: string;
  /** Nome curto usado em títulos */
  nome: string;
  /** Rótulo do H1 */
  h1: string;
  title: string;
  description: string;
  keywords: string;
  /** Frase de abertura do hero */
  intro: string;
  /** Equipamento/plataforma utilizada */
  equipamento: string;
  /** O que está incluso no atendimento */
  servicos: string[];
  /** Situações mais comuns em SJC */
  situacoes: string[];
  /** Diferenciais técnicos */
  diferenciais: string[];
  faqs: { q: string; a: string }[];
  eta: string;
}

const TEL_TXT = "(11) 99645-1510";

export const SJC_VEICULOS: TipoVeiculo[] = [
  {
    slug: "carro",
    nome: "carro",
    h1: "Guincho para carro em São José dos Campos 24 horas",
    title: "Guincho para Carro em São José dos Campos 24h | SJC",
    description:
      "Guincho para carro em São José dos Campos 24 horas. Plataforma para carros de passeio, SUV e importados, com chegada em 20 a 40 minutos em toda SJC e rodovias.",
    keywords:
      "guincho para carro sjc, guincho carro são josé dos campos, reboque de carro sjc, guincho de automóvel são josé dos campos, guincho 24 horas carro sjc",
    intro:
      "Carro parado em São José dos Campos? Enviamos plataforma para veículos de passeio, SUV, sedã, hatch e importados em qualquer bairro de SJC, nas rodovias e no acesso ao Litoral Norte.",
    equipamento:
      "Caminhão-plataforma (asa delta) com rampa e guincho elétrico, atendendo carros de até 3.500 kg — inclusive veículos rebaixados, automáticos e elétricos.",
    servicos: [
      "Remoção de carro por pane mecânica ou elétrica",
      "Transporte após colisão, com içamento por cinta",
      "Carro com câmbio automático travado (roda livre / carrinho auxiliar)",
      "Retirada de garagem, subsolo e estacionamento com pé-direito baixo",
      "Veículo apreendido, sinistrado ou sem documentação em dia",
      "Chaveiro automotivo, pane seca e bateria no local",
    ],
    situacoes: [
      "Carro sem partida em condomínios do Jardim Aquarius e Urbanova",
      "Panes na Via Dutra (BR-116) nos dois sentidos, dentro de SJC",
      "Colisões na Avenida Cassiano Ricardo e Anchieta",
      "Veículo alagado ou atolado após chuva forte na Zona Sul",
      "Carro quebrado na subida da Tamoios rumo a Caraguatatuba",
    ],
    diferenciais: [
      "Plataforma com piso emborrachado, sem risco de arranhar a pintura",
      "Amarração por cinta nos pneus (não prende no chassi)",
      "Motorista habilitado para carros automáticos e elétricos",
      "Cobertura para seguradora ou particular",
    ],
    faqs: [
      {
        q: "Quanto custa um guincho para carro em São José dos Campos?",
        a: `O valor depende da distância, do horário e do tipo de remoção. O orçamento é fechado antes do envio da plataforma, sem cobrança de surpresa. Ligue para ${TEL_TXT} e informe o bairro de SJC e o destino do veículo.`,
      },
      {
        q: "Vocês rebocam carro com câmbio automático em SJC?",
        a: "Sim. Carro automático deve ser transportado com as quatro rodas fora do solo, e é exatamente isso que a plataforma faz. Quando o veículo não engata neutro, usamos carrinhos auxiliares para embarcar sem danificar a transmissão.",
      },
      {
        q: "O guincho para carro atende garagem de prédio em São José dos Campos?",
        a: "Atendemos garagens e subsolos com pé-direito baixo. Nesses casos o carro é retirado com guincho de arraste manual até a rua e só então embarcado na plataforma.",
      },
      {
        q: "Qual o tempo de chegada do guincho para carro em SJC?",
        a: "Em média de 20 a 40 minutos dentro de São José dos Campos, variando conforme o bairro e o trânsito. Nas rodovias o tempo depende do trecho e do sentido.",
      },
    ],
    eta: "20 a 40 minutos",
  },
  {
    slug: "moto",
    nome: "moto",
    h1: "Guincho para moto em São José dos Campos 24 horas",
    title: "Guincho para Moto em São José dos Campos 24h | SJC",
    description:
      "Guincho para moto em São José dos Campos 24h. Transporte com rampa, calço de roda e cintas próprias para motos, scooters e big trails em toda SJC.",
    keywords:
      "guincho para moto sjc, guincho moto são josé dos campos, reboque de moto sjc, transporte de moto são josé dos campos, guincho 24 horas moto sjc",
    intro:
      "Moto quebrada, sem gasolina ou envolvida em queda em São José dos Campos? Transportamos motos, scooters, big trails e esportivas com equipamento próprio, sem risco de riscar carenagem.",
    equipamento:
      "Plataforma com rampa de embarque, calço dianteiro (trava de roda) e cintas de amarração específicas para motocicletas — sem uso de corda no guidão.",
    servicos: [
      "Remoção de moto após queda ou colisão",
      "Moto sem partida, com pane elétrica ou corrente arrebentada",
      "Pane seca com abastecimento no local",
      "Transporte de moto de leilão, seminova ou recém-comprada",
      "Moto com pneu furado ou roda travada",
      "Remoção de duas ou mais motos na mesma viagem",
    ],
    situacoes: [
      "Quedas na Avenida São João e Avenida Cassiano Ricardo",
      "Motos em pane no anel viário e na Rodovia Presidente Dutra",
      "Motoboys parados na região central e Vila Adyana",
      "Moto sem partida em condomínios do Jardim Satélite",
      "Retorno de trilha no Banhado e área rural de SJC",
    ],
    diferenciais: [
      "Trava de roda dianteira: a moto viaja em pé, sem tombar",
      "Cintas com protetor, sem marcar guidão ou carenagem",
      "Atendimento também para triciclos e quadriciclos",
      "Transporte entre SJC, Taubaté, Jacareí e Litoral Norte",
    ],
    faqs: [
      {
        q: "Como a moto é presa no guincho em São José dos Campos?",
        a: "A moto sobe pela rampa, é encaixada num calço que trava a roda dianteira e depois amarrada por cintas nas mesas de suspensão. Ela viaja em pé, sem deitar e sem apoiar peso no guidão ou nas carenagens.",
      },
      {
        q: "Vocês fazem guincho de moto de madrugada em SJC?",
        a: `Sim, a central é 24 horas, inclusive madrugada, domingo e feriado. Basta ligar para ${TEL_TXT} ou chamar no WhatsApp informando a localização exata.`,
      },
      {
        q: "Dá para transportar mais de uma moto na mesma plataforma?",
        a: "Sim. A plataforma comporta duas ou três motos por viagem, o que reduz o custo quando há mais de um veículo no mesmo local — comum em quedas de grupo ou compra em leilão.",
      },
      {
        q: "Quanto custa o guincho de moto em São José dos Campos?",
        a: "O preço costuma ser menor que o de carro, pois exige menos manobra. O orçamento é informado antes do envio, considerando bairro de origem e destino.",
      },
    ],
    eta: "20 a 35 minutos",
  },
  {
    slug: "caminhao",
    nome: "caminhão",
    h1: "Guincho para caminhão em São José dos Campos 24 horas",
    title: "Guincho para Caminhão em São José dos Campos 24h | SJC",
    description:
      "Guincho pesado para caminhão em São José dos Campos 24h. Munck, resgate e reboque de caminhões, ônibus, vans e carretas na Dutra, Tamoios e Carvalho Pinto.",
    keywords:
      "guincho para caminhão sjc, guincho pesado são josé dos campos, reboque de caminhão sjc, guincho de ônibus são josé dos campos, socorro pesado dutra",
    intro:
      "Caminhão, carreta, ônibus ou van parados em São José dos Campos e região? Operamos guincho pesado com equipamento de resgate para veículos de grande porte na cidade e nas rodovias do Vale do Paraíba.",
    equipamento:
      "Guincho pesado com lança, munck e sistema de suspensão de eixo, dimensionado para caminhões, ônibus, carretas e utilitários acima de 3.500 kg.",
    servicos: [
      "Reboque de caminhão por pane mecânica ou elétrica",
      "Resgate de veículo pesado tombado ou fora da pista",
      "Suspensão de eixo dianteiro ou traseiro para deslocamento curto",
      "Remoção de ônibus e micro-ônibus",
      "Transporte de vans, utilitários e caminhões-baú",
      "Apoio a frotas e transportadoras com contrato",
    ],
    situacoes: [
      "Panes na Via Dutra (BR-116) nos trechos de SJC, Jacareí e Caçapava",
      "Caminhões parados nos postos e áreas de descanso da Dutra",
      "Ocorrências na subida da Rodovia dos Tamoios (SP-099)",
      "Veículos pesados na Carvalho Pinto (SP-070)",
      "Pátios e galpões do Parque Industrial e Eugênio de Melo",
    ],
    diferenciais: [
      "Equipe com experiência em resgate rodoviário",
      "Sinalização e apoio no local até a liberação da pista",
      "Atendimento a seguradoras, frotas e transportadoras",
      "Cobertura em todo o Vale do Paraíba e Litoral Norte",
    ],
    faqs: [
      {
        q: "Vocês fazem guincho pesado na Dutra em São José dos Campos?",
        a: "Sim. Atendemos toda a extensão da BR-116 dentro de São José dos Campos e cidades vizinhas, nos dois sentidos, incluindo postos, acostamento e áreas de descanso.",
      },
      {
        q: "Qual o peso máximo que o guincho para caminhão suporta em SJC?",
        a: "O equipamento pesado atende veículos bem acima de 3.500 kg, incluindo caminhões toco, truck, ônibus e carretas. Informe o modelo e a carga na ligação para dimensionarmos o guincho certo.",
      },
      {
        q: "Quanto tempo demora o guincho pesado em São José dos Campos?",
        a: "Na área urbana de SJC, entre 40 e 90 minutos. Em rodovia, o tempo depende do trecho, do sentido e das condições de tráfego no momento do chamado.",
      },
      {
        q: "Vocês resgatam caminhão tombado ou atolado perto de SJC?",
        a: "Sim. Fazemos resgate com lança e munck para veículos tombados, atolados ou fora da pista, com sinalização adequada até a conclusão do serviço.",
      },
    ],
    eta: "40 a 90 minutos",
  },
  {
    slug: "transporte-de-veiculos",
    nome: "transporte de veículos",
    h1: "Transporte de veículos em São José dos Campos 24 horas",
    title: "Transporte de Veículos em São José dos Campos | SJC 24h",
    description:
      "Transporte de veículos em São José dos Campos: mudança de carro entre cidades, leilão, concessionária, carro de coleção e blindado. Plataforma 24h saindo de SJC.",
    keywords:
      "transporte de veículos sjc, transporte de carro são josé dos campos, cegonha sjc, transporte de veículo leilão sjc, levar carro de sjc para outra cidade",
    intro:
      "Precisa levar um veículo de São José dos Campos para outra cidade ou receber um carro em SJC? Fazemos transporte agendado ou emergencial em plataforma, com veículo travado e conferência de estado antes do embarque.",
    equipamento:
      "Plataforma para transporte porta a porta, com amarração por cinta nos pneus, ideal para viagens curtas e longas saindo de ou chegando a São José dos Campos.",
    servicos: [
      "Transporte de carro comprado em leilão ou em outra cidade",
      "Mudança de veículo entre SJC e Litoral Norte, capital ou interior",
      "Entrega de veículo para concessionária, loja e revenda",
      "Carro de coleção, importado, rebaixado ou sem documentação",
      "Veículo blindado e utilitários especiais",
      "Transporte de veículo que não liga ou está sinistrado",
    ],
    situacoes: [
      "Carro arrematado em leilão a ser retirado e trazido para SJC",
      "Mudança de residência de São José dos Campos para outro estado",
      "Veículo de coleção indo para evento ou oficina especializada",
      "Entrega de carro vendido on-line para comprador de outra cidade",
      "Transporte SJC ↔ Caraguatatuba, Ubatuba, São Sebastião e Ilhabela",
    ],
    diferenciais: [
      "Agendamento com data e horário combinados",
      "Registro fotográfico do veículo antes e depois do transporte",
      "Orçamento fechado por rota, sem cobrança por atraso de trânsito",
      "Também disponível em regime emergencial 24h",
    ],
    faqs: [
      {
        q: "Como funciona o transporte de veículos saindo de São José dos Campos?",
        a: "Você informa origem, destino e o modelo do veículo. Fechamos o valor da rota, agendamos a coleta em SJC, registramos o estado do carro em fotos e entregamos no endereço combinado.",
      },
      {
        q: "Dá para transportar carro que não liga a partir de SJC?",
        a: "Sim. Veículos sem partida, sinistrados ou sem documentação são embarcados com o guincho elétrico da plataforma, sem necessidade de dar partida no motor.",
      },
      {
        q: "Vocês transportam veículos de SJC para o Litoral Norte?",
        a: "Transportamos com frequência entre São José dos Campos e Caraguatatuba, Ubatuba, São Sebastião e Ilhabela pela Rodovia dos Tamoios, além de rotas para a capital e o interior.",
      },
      {
        q: "O transporte de veículos precisa ser agendado?",
        a: `Rotas longas costumam ser agendadas para garantir plataforma disponível, mas também atendemos em regime emergencial 24 horas. Consulte pelo ${TEL_TXT}.`,
      },
    ],
    eta: "agendamento no mesmo dia",
  },
];

/** Rótulo do serviço: "Guincho para carro" ou "Transporte de veículos" */
export function labelServico(v: TipoVeiculo): string {
  return v.slug === "transporte-de-veiculos"
    ? "Transporte de veículos"
    : `Guincho para ${v.nome}`;
}

export function getTipoVeiculo(slug: string): TipoVeiculo | undefined {
  return SJC_VEICULOS.find((v) => v.slug === slug);
}
