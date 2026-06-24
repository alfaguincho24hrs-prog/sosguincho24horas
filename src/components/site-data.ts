export const SITE = {
  name: "SOS Guincho 24 horas",
  tagline: "Guincho e Reboque 24 Horas em Todo o Brasil",
  phone: "(11) 99645-1510",
  whatsapp: "5511996451510",
  email: "sosguincho24hrs@gmail.com",
  address: {
    street: "Praça Dom Epaminondas, 1-4 sala 104",
    neighborhood: "Centro",
    city: "Taubaté",
    region: "SP",
    postalCode: "12010-090",
    country: "BR",
  },
  geo: { latitude: -23.026389, longitude: -45.555556 },
};

export const SERVICES = [
  {
    slug: "guincho-leve",
    title: "Guincho Leve",
    desc: "Reboque rápido para carros de passeio, SUVs e utilitários até 3,5 toneladas com plataforma hidráulica.",
    icon: "🚗",
  },
  {
    slug: "guincho-pesado",
    title: "Guincho Pesado",
    desc: "Resgate de caminhões, ônibus, máquinas e veículos acima de 8 toneladas com equipamento robusto.",
    icon: "🚛",
  },
  {
    slug: "guincho-moto",
    title: "Guincho de Motos",
    desc: "Transporte seguro para motocicletas com içamento adequado, sem riscos para a pintura ou estrutura.",
    icon: "🏍️",
  },
  {
    slug: "auto-socorro",
    title: "Auto Socorro Mecânico",
    desc: "Pane elétrica, troca de pneu, bateria descarregada e pequenos reparos no local da ocorrência.",
    icon: "🔧",
  },
  {
    slug: "remocao-veicular",
    title: "Remoção Veicular",
    desc: "Retirada de veículos sinistrados, leilões, mudanças interestaduais e transporte programado.",
    icon: "🚚",
  },
  {
    slug: "pane-seca",
    title: "Pane Seca",
    desc: "Entrega emergencial de combustível na rodovia ou na cidade, evitando longas esperas.",
    icon: "⛽",
  },
];

export const PARTNERS = [
  { name: "Guincho Aliança SP", city: "São Paulo - SP", phone: "(11) 4002-1010", rating: 4.9 },
  { name: "Reboque Rápido Rio", city: "Rio de Janeiro - RJ", phone: "(21) 4002-2020", rating: 4.8 },
  { name: "BH Guincho 24h", city: "Belo Horizonte - MG", phone: "(31) 4002-3030", rating: 4.9 },
  { name: "Curitiba Tow Service", city: "Curitiba - PR", phone: "(41) 4002-4040", rating: 4.7 },
  { name: "Porto Alegre Reboques", city: "Porto Alegre - RS", phone: "(51) 4002-5050", rating: 4.8 },
  { name: "Salvador Auto Resgate", city: "Salvador - BA", phone: "(71) 4002-6060", rating: 4.9 },
  { name: "Recife Guinchos Express", city: "Recife - PE", phone: "(81) 4002-7070", rating: 4.7 },
  { name: "Fortaleza 24h Reboque", city: "Fortaleza - CE", phone: "(85) 4002-8080", rating: 4.8 },
  { name: "Brasília Guincho Capital", city: "Brasília - DF", phone: "(61) 4002-9090", rating: 4.9 },
  { name: "Goiânia Guincho Center", city: "Goiânia - GO", phone: "(62) 4002-1212", rating: 4.7 },
  { name: "Manaus Reboque Norte", city: "Manaus - AM", phone: "(92) 4002-1313", rating: 4.6 },
  { name: "Florianópolis Tow", city: "Florianópolis - SC", phone: "(48) 4002-1414", rating: 4.9 },
];

// Foco da home: principais capitais do Brasil + principais cidades do Estado de SP
export const CAPITAIS = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Curitiba",
  "Porto Alegre", "Florianópolis", "Salvador", "Recife", "Fortaleza",
  "Goiânia", "Vitória",
];

export const CIDADES_SP = [
  "Campinas", "São José dos Campos", "Taubaté", "Jacareí", "Pindamonhangaba",
  "Guarulhos", "Santo André", "São Bernardo do Campo", "Osasco", "Sorocaba",
  "Ribeirão Preto", "Santos", "São José do Rio Preto", "Bauru", "Piracicaba",
  "Jundiaí", "Mogi das Cruzes", "Barueri", "Limeira", "Americana",
  "Caraguatatuba", "Ubatuba", "São Sebastião", "Campos do Jordão", "Atibaia",
];

export const CITIES = [...CAPITAIS, ...CIDADES_SP];
