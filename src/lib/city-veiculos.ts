/**
 * Tipos de veículo atendidos, em versão genérica (templates por cidade).
 * Usado pela rota /guincho-{tipo}-em-{cidade}-{uf} para gerar páginas de
 * serviço com recorte local em qualquer cidade da base.
 *
 * As páginas de São José dos Campos continuam usando `sjc-veiculos.ts`,
 * que traz conteúdo escrito manualmente para SJC.
 */

const TEL_TXT = "(11) 99645-1510";

export interface TipoVeiculoBase {
  slug: string;
  /** Nome curto usado em frases: "carro", "moto"… */
  nome: string;
  /** Rótulo completo: "Guincho para carro" / "Transporte de veículos" */
  rotulo: string;
  /** Palavra-chave principal sem cidade */
  kw: string;
  equipamento: string;
  servicos: string[];
  diferenciais: string[];
  /** Situações típicas — {cidade} é substituído */
  situacoes: string[];
  faqs: (cidade: string) => { q: string; a: string }[];
  eta: string;
}

export const TIPOS_VEICULO: TipoVeiculoBase[] = [
  {
    slug: "carro",
    nome: "carro",
    rotulo: "Guincho para carro",
    kw: "guincho para carro",
    equipamento:
      "Caminhão-plataforma (asa delta) com rampa e guincho elétrico, para carros de até 3.500 kg — inclusive rebaixados, automáticos e elétricos.",
    servicos: [
      "Remoção por pane mecânica ou elétrica",
      "Transporte após colisão, com içamento por cinta",
      "Câmbio automático travado (roda livre / carrinho auxiliar)",
      "Retirada de garagem e subsolo com pé-direito baixo",
      "Veículo sinistrado, apreendido ou parado há muito tempo",
      "Chaveiro automotivo, pane seca e bateria no local",
    ],
    diferenciais: [
      "Piso emborrachado na plataforma, sem risco de arranhar a pintura",
      "Amarração por cinta nos pneus, nunca no chassi",
      "Motorista habilitado para automáticos e elétricos",
      "Atendimento particular ou via seguradora",
    ],
    situacoes: [
      "Carro sem partida em casa ou no trabalho, em {cidade}",
      "Pane elétrica no meio do trânsito em {cidade}",
      "Colisão em avenida movimentada de {cidade}",
      "Veículo atolado ou alagado depois de chuva forte",
      "Carro quebrado na rodovia de acesso a {cidade}",
    ],
    faqs: (c) => [
      {
        q: `Quanto custa um guincho para carro em ${c}?`,
        a: `O valor depende da distância, do horário e do tipo de remoção. O orçamento é fechado antes do envio da plataforma, sem cobrança surpresa. Ligue para ${TEL_TXT} informando o bairro de ${c} e o destino do veículo.`,
      },
      {
        q: `Vocês rebocam carro com câmbio automático em ${c}?`,
        a: "Sim. Carro automático precisa viajar com as quatro rodas fora do solo, e é exatamente isso que a plataforma faz. Quando o veículo não engata neutro, usamos carrinhos auxiliares para embarcar sem danificar a transmissão.",
      },
      {
        q: `O guincho atende garagem de prédio em ${c}?`,
        a: "Atendemos garagens e subsolos com pé-direito baixo. Nesses casos o carro é retirado com guincho de arraste manual até a rua e só então embarcado na plataforma.",
      },
      {
        q: `Qual o tempo de chegada do guincho para carro em ${c}?`,
        a: `Em média de 25 a 45 minutos dentro de ${c}, variando conforme a região e o trânsito. Nas rodovias o tempo depende do trecho e do sentido.`,
      },
    ],
    eta: "25 a 45 minutos",
  },
  {
    slug: "moto",
    nome: "moto",
    rotulo: "Guincho para moto",
    kw: "guincho para moto",
    equipamento:
      "Plataforma com rampa de embarque, calço de roda dianteira e cintas específicas para motos — a moto viaja em pé, sem apoiar carenagem ou escapamento.",
    servicos: [
      "Moto com pane elétrica, correia ou motor travado",
      "Remoção após queda ou colisão",
      "Transporte de scooter, big trail e moto esportiva",
      "Retirada de moto sem chave ou com direção travada",
      "Pane seca e bateria no local",
      "Transporte de moto de leilão ou parada há meses",
    ],
    diferenciais: [
      "Calço de roda que impede o tombamento durante o trajeto",
      "Cintas com protetor, sem marcar guidão nem carenagem",
      "Embarque com rampa, sem levantar a moto no braço",
      "Possibilidade de levar moto + piloto na mesma viagem",
    ],
    situacoes: [
      "Moto que não dá partida em bairro residencial de {cidade}",
      "Queda em via molhada dentro de {cidade}",
      "Moto apreendida ou sem documentação em {cidade}",
      "Pane seca voltando para casa à noite",
      "Transporte de moto recém-comprada em outra cidade",
    ],
    faqs: (c) => [
      {
        q: `Como a moto é transportada no guincho em ${c}?`,
        a: "Em pé, sobre a plataforma, presa por calço de roda dianteira e cintas com protetor. A moto não é deitada nem arrastada em nenhum momento.",
      },
      {
        q: `Vocês transportam moto grande e esportiva em ${c}?`,
        a: "Sim. Atendemos scooters, motos de baixa cilindrada, big trails e esportivas. Para carenagens baixas usamos rampa longa, evitando raspar na subida.",
      },
      {
        q: `Quanto custa o guincho de moto em ${c}?`,
        a: `Depende da distância e do horário. Informe o bairro de ${c} e o destino no telefone ${TEL_TXT} e o valor é fechado antes de sair.`,
      },
      {
        q: `O piloto pode ir junto com a moto em ${c}?`,
        a: "Pode. Há lugar na cabine para acompanhar a moto até a oficina, residência ou concessionária, dentro das regras de segurança.",
      },
    ],
    eta: "25 a 45 minutos",
  },
  {
    slug: "caminhao",
    nome: "caminhão",
    rotulo: "Guincho para caminhão",
    kw: "guincho para caminhão",
    equipamento:
      "Guincho pesado com lança hidráulica e munck, para caminhões, ônibus, vans e utilitários — remoção por eixo suspenso ou içamento completo.",
    servicos: [
      "Remoção de caminhão com pane mecânica ou elétrica",
      "Socorro em rodovia com sinalização do local",
      "Desatolamento e recuperação de veículo tombado",
      "Transporte de ônibus, van e utilitário",
      "Remoção de máquina e equipamento sobre prancha",
      "Troca de pneu e socorro elétrico no local",
    ],
    diferenciais: [
      "Equipe treinada em içamento e recuperação de carga",
      "Sinalização e cones para operar com segurança na pista",
      "Atendimento a frotas e transportadoras com nota fiscal",
      "Disponibilidade 24 horas, inclusive feriados",
    ],
    situacoes: [
      "Caminhão quebrado na rodovia próxima a {cidade}",
      "Ônibus com pane em avenida de {cidade}",
      "Veículo pesado atolado em obra ou terreno mole",
      "Carreta tombada exigindo içamento",
      "Van de entrega parada no centro de {cidade}",
    ],
    faqs: (c) => [
      {
        q: `Vocês fazem guincho pesado em ${c}?`,
        a: `Sim. Atendemos caminhões, ônibus, vans e utilitários em ${c} e nas rodovias da região, com guincho de lança hidráulica e munck.`,
      },
      {
        q: `Qual o peso máximo atendido em ${c}?`,
        a: "Trabalhamos com equipamentos de diferentes capacidades. Informe o modelo, a carga e o local — assim enviamos o guincho adequado já na primeira viagem.",
      },
      {
        q: `Fazem desatolamento de caminhão em ${c}?`,
        a: "Fazemos. Recuperação de veículos atolados, tombados ou fora da pista, com cabo de aço, roldanas e apoio de equipe no solo.",
      },
      {
        q: `Emitem nota fiscal para empresa em ${c}?`,
        a: `Sim, emitimos nota fiscal para frotas, transportadoras e seguradoras. Solicite pelo telefone ${TEL_TXT}.`,
      },
    ],
    eta: "40 a 90 minutos",
  },
  {
    slug: "transporte-de-veiculos",
    nome: "transporte de veículos",
    rotulo: "Transporte de veículos",
    kw: "transporte de veículos",
    equipamento:
      "Plataforma para transporte agendado entre cidades e estados, com amarração dupla e possibilidade de mais de um veículo por viagem.",
    servicos: [
      "Transporte de veículo comprado em outra cidade",
      "Mudança de veículo entre estados",
      "Entrega de carro de leilão ou de concessionária",
      "Transporte de veículo de coleção e antigo",
      "Remoção de carro parado há muito tempo, sem documentação",
      "Transporte agendado com data e horário combinados",
    ],
    diferenciais: [
      "Rota e prazo definidos antes do embarque",
      "Amarração dupla por cinta, sem tocar no chassi",
      "Registro fotográfico do veículo na saída e na chegada",
      "Orçamento fechado, sem cobrança por quilômetro extra",
    ],
    situacoes: [
      "Carro comprado on-line para entrega em {cidade}",
      "Mudança de cidade com dois veículos",
      "Veículo de coleção indo para exposição",
      "Carro de leilão retirado do pátio para {cidade}",
      "Veículo sem condição de rodar sendo levado à oficina em outra cidade",
    ],
    faqs: (c) => [
      {
        q: `Vocês fazem transporte de veículos para fora de ${c}?`,
        a: `Sim. Fazemos transporte de ${c} para outras cidades e estados, com data agendada e valor fechado antes do embarque.`,
      },
      {
        q: `O veículo precisa estar funcionando em ${c}?`,
        a: "Não. Transportamos veículos que não ligam, com rodas travadas ou sem documentação em dia — nesse caso o embarque é feito com guincho elétrico.",
      },
      {
        q: `Como é calculado o valor do transporte saindo de ${c}?`,
        a: `Pela distância, pelo tipo de veículo e pela data. Informe origem em ${c}, destino e modelo no telefone ${TEL_TXT} para receber o orçamento fechado.`,
      },
      {
        q: `Dá para transportar mais de um veículo de ${c} na mesma viagem?`,
        a: "Dá, dependendo do porte dos veículos. Duas motos ou um carro e uma moto normalmente cabem na mesma plataforma, reduzindo o custo por veículo.",
      },
    ],
    eta: "agendamento em até 24h",
  },
];

export function findTipo(slug: string): TipoVeiculoBase | undefined {
  return TIPOS_VEICULO.find((t) => t.slug === slug.toLowerCase().trim());
}

/** "Guincho para carro" → "Guincho para Carro" (uso em <title>) */
export function tituloRotulo(rotulo: string): string {
  return rotulo.replace(/ (\p{Ll})(\p{L}*)$/u, (_m, a: string, b: string) => ` ${a.toUpperCase()}${b}`);
}
