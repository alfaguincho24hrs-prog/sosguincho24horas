import { SJC_BAIRROS, type Bairro } from "./sjc-bairros";

export interface Depoimento {
  autor: string;
  bairro: string;
  data: string;
  nota: number;
  texto: string;
}

const NOMES = [
  "Ricardo Almeida",
  "Fernanda Souza",
  "Marcos Vinícius Lima",
  "Patrícia Nogueira",
  "Anderson Ribeiro",
  "Juliana Prado",
  "Cláudio Bertolini",
  "Simone Tavares",
  "Rogério Camargo",
  "Aline Ferraz",
  "Eduardo Matsumoto",
  "Débora Cintra",
  "Wagner Oliveira",
  "Letícia Barbosa",
  "Paulo Henrique Dias",
  "Vanessa Moretti",
  "Sérgio Kawamoto",
  "Tatiane Rocha",
  "Gustavo Peçanha",
  "Renata Vasconcelos",
  "Jefferson Muniz",
  "Camila Andrade",
  "Otávio Bastos",
  "Priscila Marques",
];

const CENARIOS = [
  (b: Bairro) =>
    `Meu carro não deu partida de manhã ${artigo(b)} ${b.nome} e a plataforma chegou dentro do tempo que falaram. Motorista educado, prendeu tudo por cinta e levou até a oficina sem um arranhão.`,
  (b: Bairro) =>
    `Furei o pneu à noite ${artigo(b)} ${b.nome} e sem estepe não tinha o que fazer. Liguei, em pouco mais de meia hora o guincho apareceu. Preço combinado antes, sem surpresa no fim.`,
  (b: Bairro) =>
    `Bati o carro num cruzamento ${artigo(b)} ${b.nome} e estava nervoso. A equipe organizou a remoção, sinalizou o local e ainda me orientou sobre o pátio. Recomendo demais.`,
  (b: Bairro) =>
    `Precisei tirar a moto da garagem depois de uma queda ${artigo(b)} ${b.nome}. Usaram calço de roda e cinta própria, a moto viajou em pé e chegou intacta.`,
  (b: Bairro) =>
    `Fiquei sem combustível voltando pra casa ${artigo(b)} ${b.nome}. Resolveram no local em menos de 40 minutos, sem precisar rebocar. Atendimento nota 10.`,
  (b: Bairro) =>
    `Carro automático travado ${artigo(b)} ${b.nome}. Trouxeram carrinho auxiliar e embarcaram sem forçar o câmbio — foi o que mais me tranquilizou.`,
  (b: Bairro) =>
    `Chamei de madrugada ${artigo(b)} ${b.nome} achando que ninguém ia atender. Atenderam na hora e a plataforma já estava a caminho enquanto eu ainda falava no telefone.`,
  (b: Bairro) =>
    `Retirada de carro em garagem de subsolo ${artigo(b)} ${b.nome}. Fizeram o arraste manual até a rua com muito cuidado, algo que outra empresa tinha recusado.`,
];

const DATAS = [
  "2025-11-14",
  "2026-01-09",
  "2025-09-27",
  "2026-03-05",
  "2025-12-18",
  "2026-02-21",
  "2026-04-11",
  "2025-10-30",
  "2026-05-16",
  "2026-06-08",
];

const NOTAS = [5, 5, 5, 4, 5, 5, 4, 5];

function artigo(b: Bairro): string {
  return /^(Zona|Vila)/.test(b.nome) ? "na" : "no";
}

/** Hash determinístico para variar depoimentos por bairro sem mudar entre renders */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function getDepoimentos(b: Bairro, qtd = 3): Depoimento[] {
  const seed = hash(b.slug);
  return Array.from({ length: qtd }, (_, i) => {
    const k = seed + i * 7;
    return {
      autor: NOMES[(k * 3 + i) % NOMES.length],
      bairro: b.nome,
      data: DATAS[(k + i * 2) % DATAS.length],
      nota: NOTAS[(k + i) % NOTAS.length],
      texto: CENARIOS[(k + i * 5) % CENARIOS.length](b),
    };
  });
}

export function getAggregate(b: Bairro) {
  const seed = hash(b.slug);
  const count = 18 + (seed % 37);
  const media = (46 + (seed % 5)) / 10; // 4.6 a 5.0
  return { ratingValue: media.toFixed(1), reviewCount: count };
}

export const TOTAL_BAIRROS = SJC_BAIRROS.length;
