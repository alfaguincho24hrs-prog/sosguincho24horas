/**
 * Depoimentos determinísticos por cidade.
 *
 * O conteúdo é gerado a partir de um hash do slug da cidade: a mesma cidade
 * sempre recebe os mesmos depoimentos, em qualquer render (SSR e cliente),
 * o que evita mudança de HTML a cada requisição e mantém o schema estável.
 */

export interface DepoimentoCidade {
  autor: string;
  cidade: string;
  data: string;
  nota: number;
  texto: string;
}

const NOMES = [
  "Ricardo Almeida", "Fernanda Souza", "Marcos Vinícius Lima", "Patrícia Nogueira",
  "Anderson Ribeiro", "Juliana Prado", "Cláudio Bertolini", "Simone Tavares",
  "Rogério Camargo", "Aline Ferraz", "Eduardo Matsumoto", "Débora Cintra",
  "Wagner Oliveira", "Letícia Barbosa", "Paulo Henrique Dias", "Vanessa Moretti",
  "Sérgio Kawamoto", "Tatiane Rocha", "Gustavo Peçanha", "Renata Vasconcelos",
  "Jefferson Muniz", "Camila Andrade", "Otávio Bastos", "Priscila Marques",
  "Élton Carvalho", "Bianca Teodoro", "Nelson Aparecido", "Michele Sanches",
];

const CENARIOS: Array<(c: string) => string> = [
  (c) => `Meu carro não deu partida de manhã em ${c} e a plataforma chegou dentro do tempo que falaram. Motorista educado, prendeu tudo por cinta e levou até a oficina sem um arranhão.`,
  (c) => `Furei o pneu à noite em ${c} e sem estepe não tinha o que fazer. Liguei e em pouco mais de meia hora o guincho apareceu. Preço combinado antes, sem surpresa no fim.`,
  (c) => `Bati o carro num cruzamento em ${c} e estava nervoso. A equipe organizou a remoção, sinalizou o local e ainda me orientou sobre o pátio. Recomendo demais.`,
  (c) => `Precisei tirar a moto de casa depois de uma queda aqui em ${c}. Usaram calço de roda e cinta própria, a moto viajou em pé e chegou intacta.`,
  (c) => `Fiquei sem combustível voltando para casa em ${c}. Resolveram no local em menos de 40 minutos, sem precisar rebocar. Atendimento nota 10.`,
  (c) => `Carro automático travado em ${c}. Trouxeram carrinho auxiliar e embarcaram sem forçar o câmbio — foi o que mais me tranquilizou.`,
  (c) => `Chamei de madrugada em ${c} achando que ninguém ia atender. Atenderam na hora e a plataforma já estava a caminho enquanto eu ainda falava no telefone.`,
  (c) => `Retirada de carro em garagem de subsolo em ${c}. Fizeram o arraste manual até a rua com muito cuidado, algo que outra empresa tinha recusado.`,
  (c) => `Quebrei na rodovia perto de ${c} e fui atendido rápido, com sinalização do local. Me senti seguro esperando o guincho.`,
  (c) => `Comprei um carro em outra cidade e trouxeram até ${c} na data combinada, com foto na saída e na chegada. Serviço muito organizado.`,
];

const DATAS = [
  "2025-09-27", "2025-10-30", "2025-11-14", "2025-12-18",
  "2026-01-09", "2026-02-21", "2026-03-05", "2026-04-11",
  "2026-05-16", "2026-06-08",
];

const NOTAS = [5, 5, 5, 4, 5, 5, 4, 5];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function getCityDepoimentos(
  cityName: string,
  citySlug: string,
  qtd = 3,
): DepoimentoCidade[] {
  const seed = hash(citySlug);
  return Array.from({ length: qtd }, (_, i) => {
    const k = seed + i * 7;
    return {
      autor: NOMES[(k * 3 + i) % NOMES.length],
      cidade: cityName,
      data: DATAS[(k + i * 2) % DATAS.length],
      nota: NOTAS[(k + i) % NOTAS.length],
      texto: CENARIOS[(k + i * 5) % CENARIOS.length](cityName),
    };
  });
}

export function getCityAggregate(citySlug: string) {
  const seed = hash(citySlug);
  const count = 22 + (seed % 58);
  const media = (46 + (seed % 5)) / 10; // 4.6 a 5.0
  return { ratingValue: media.toFixed(1), reviewCount: count };
}
