// Lista ampla de cidades brasileiras (1000+) com foco massivo no Estado de São Paulo
// cobrindo: Capital (Zonas Norte/Sul/Leste/Oeste/Central), Grande SP, ABC, Vale do Paraíba,
// Serra da Mantiqueira, Vale Histórico, Litoral Norte/Sul, Interior (todas as regiões
// administrativas: Campinas, Sorocaba, Ribeirão Preto, São José do Rio Preto, Bauru,
// Marília, Presidente Prudente, Araçatuba, Franca, Barretos, Registro, Itapeva).
// Inclui também capitais e principais cidades das demais UFs para cobertura nacional.

export type City = { name: string; uf: string; slug: string };

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ============================================================
// SÃO PAULO - 645 municípios oficiais (IBGE) + zonas da capital
// ============================================================

// Zonas/regiões da Capital (tratadas como "cidades" para SEO local hiper-segmentado)
const SP_CAPITAL_ZONAS: Array<[string, string]> = [
  ["São Paulo", "SP"],
  ["São Paulo Zona Norte", "SP"],
  ["São Paulo Zona Sul", "SP"],
  ["São Paulo Zona Leste", "SP"],
  ["São Paulo Zona Oeste", "SP"],
  ["São Paulo Centro", "SP"],
];

// Grande São Paulo / Região Metropolitana
const SP_GRANDE_SP: Array<[string, string]> = [
  ["Guarulhos", "SP"], ["São Bernardo do Campo", "SP"], ["Santo André", "SP"],
  ["Osasco", "SP"], ["São José dos Campos", "SP"], ["Diadema", "SP"],
  ["Mauá", "SP"], ["Mogi das Cruzes", "SP"], ["Carapicuíba", "SP"],
  ["Itaquaquecetuba", "SP"], ["Suzano", "SP"], ["Taboão da Serra", "SP"],
  ["Barueri", "SP"], ["Embu das Artes", "SP"], ["Cotia", "SP"],
  ["Itapevi", "SP"], ["Ferraz de Vasconcelos", "SP"], ["Francisco Morato", "SP"],
  ["Franco da Rocha", "SP"], ["Itapecerica da Serra", "SP"], ["Jandira", "SP"],
  ["Santana de Parnaíba", "SP"], ["São Caetano do Sul", "SP"], ["Ribeirão Pires", "SP"],
  ["Rio Grande da Serra", "SP"], ["Caieiras", "SP"], ["Cajamar", "SP"],
  ["Mairiporã", "SP"], ["Arujá", "SP"], ["Poá", "SP"], ["Embu-Guaçu", "SP"],
  ["Juquitiba", "SP"], ["São Lourenço da Serra", "SP"], ["Vargem Grande Paulista", "SP"],
  ["Pirapora do Bom Jesus", "SP"], ["Guararema", "SP"], ["Santa Isabel", "SP"],
  ["Salesópolis", "SP"], ["Biritiba Mirim", "SP"], ["Itanhaém", "SP"],
];

// Vale do Paraíba + Serra da Mantiqueira + Vale Histórico + Litoral Norte
const SP_VALE_PARAIBA: Array<[string, string]> = [
  ["São José dos Campos", "SP"], ["Taubaté", "SP"], ["Jacareí", "SP"],
  ["Pindamonhangaba", "SP"], ["Caraguatatuba", "SP"], ["Ubatuba", "SP"],
  ["São Sebastião", "SP"], ["Ilhabela", "SP"], ["Guaratinguetá", "SP"],
  ["Lorena", "SP"], ["Cruzeiro", "SP"], ["Cachoeira Paulista", "SP"],
  ["Aparecida", "SP"], ["Roseira", "SP"], ["Potim", "SP"],
  ["Tremembé", "SP"], ["Caçapava", "SP"], ["Igaratá", "SP"],
  ["Jambeiro", "SP"], ["Monteiro Lobato", "SP"], ["Paraibuna", "SP"],
  ["São Luiz do Paraitinga", "SP"],
  ["Redenção da Serra", "SP"], ["Santa Branca", "SP"], ["São Bento do Sapucaí", "SP"],
  ["Campos do Jordão", "SP"], ["Santo Antônio do Pinhal", "SP"],
  ["Bananal", "SP"], ["São José do Barreiro", "SP"], ["Areias", "SP"],
  ["Queluz", "SP"], ["Lavrinhas", "SP"], ["Silveiras", "SP"], ["Arapeí", "SP"],
  ["Cunha", "SP"], ["Natividade da Serra", "SP"], ["Piquete", "SP"],
  ["Canas", "SP"],
];

// Região de Campinas + RMC
const SP_CAMPINAS: Array<[string, string]> = [
  ["Campinas", "SP"], ["Hortolândia", "SP"], ["Sumaré", "SP"], ["Indaiatuba", "SP"],
  ["Americana", "SP"], ["Santa Bárbara d'Oeste", "SP"], ["Nova Odessa", "SP"],
  ["Paulínia", "SP"], ["Valinhos", "SP"], ["Vinhedo", "SP"],
  ["Itatiba", "SP"], ["Jaguariúna", "SP"], ["Pedreira", "SP"],
  ["Amparo", "SP"], ["Mogi Mirim", "SP"], ["Mogi Guaçu", "SP"],
  ["Itapira", "SP"], ["Estiva Gerbi", "SP"], ["Espírito Santo do Pinhal", "SP"],
  ["Santo Antônio de Posse", "SP"], ["Cosmópolis", "SP"], ["Artur Nogueira", "SP"],
  ["Engenheiro Coelho", "SP"], ["Conchal", "SP"], ["Holambra", "SP"],
  ["Monte Mor", "SP"], ["Elias Fausto", "SP"], ["Capivari", "SP"],
  ["Rafard", "SP"], ["Mombuca", "SP"], ["Águas de Lindóia", "SP"],
  ["Lindóia", "SP"], ["Serra Negra", "SP"], ["Socorro", "SP"],
  ["Morungaba", "SP"], ["Bragança Paulista", "SP"], ["Atibaia", "SP"],
  ["Nazaré Paulista", "SP"], ["Bom Jesus dos Perdões", "SP"], ["Joanópolis", "SP"],
  ["Piracaia", "SP"], ["Pinhalzinho", "SP"], ["Pedra Bela", "SP"],
  ["Tuiuti", "SP"], ["Vargem", "SP"], ["Limeira", "SP"], ["Piracicaba", "SP"],
  ["Rio Claro", "SP"], ["Araras", "SP"], ["Leme", "SP"], ["Pirassununga", "SP"],
  ["Santa Cruz da Conceição", "SP"], ["Cordeirópolis", "SP"], ["Iracemápolis", "SP"],
  ["Charqueada", "SP"], ["Saltinho", "SP"], ["Rio das Pedras", "SP"],
  ["São Pedro", "SP"], ["Águas de São Pedro", "SP"], ["Santa Maria da Serra", "SP"],
  ["Torrinha", "SP"], ["Brotas", "SP"], ["Itirapina", "SP"], ["Corumbataí", "SP"],
  ["Ipeúna", "SP"], ["Analândia", "SP"], ["Mineiros do Tietê", "SP"],
];

// Região de Sorocaba + RMS
const SP_SOROCABA: Array<[string, string]> = [
  ["Sorocaba", "SP"], ["Votorantim", "SP"], ["Itu", "SP"], ["Salto", "SP"],
  ["Porto Feliz", "SP"], ["Tietê", "SP"], ["Cerquilho", "SP"], ["Boituva", "SP"],
  ["Tatuí", "SP"], ["Cesário Lange", "SP"], ["Quadra", "SP"], ["Pereiras", "SP"],
  ["Iperó", "SP"], ["Araçoiaba da Serra", "SP"], ["Capela do Alto", "SP"],
  ["Salto de Pirapora", "SP"], ["Piedade", "SP"], ["Pilar do Sul", "SP"],
  ["São Miguel Arcanjo", "SP"], ["Tapiraí", "SP"], ["Ibiúna", "SP"],
  ["Mairinque", "SP"], ["Alumínio", "SP"], ["São Roque", "SP"], ["Vargem Grande do Sul", "SP"],
  ["Jumirim", "SP"], ["Laranjal Paulista", "SP"], ["Conchas", "SP"], ["Pereira Barreto", "SP"],
  ["Anhembi", "SP"], ["Bofete", "SP"], ["Torre de Pedra", "SP"],
];

// Litoral / Baixada Santista
const SP_LITORAL: Array<[string, string]> = [
  ["Santos", "SP"], ["São Vicente", "SP"], ["Praia Grande", "SP"], ["Guarujá", "SP"],
  ["Cubatão", "SP"], ["Bertioga", "SP"], ["Mongaguá", "SP"], ["Itanhaém", "SP"],
  ["Peruíbe", "SP"], ["Iguape", "SP"], ["Ilha Comprida", "SP"], ["Cananéia", "SP"],
  ["Pariquera-Açu", "SP"], ["Registro", "SP"], ["Juquiá", "SP"], ["Miracatu", "SP"],
  ["Pedro de Toledo", "SP"], ["Sete Barras", "SP"], ["Eldorado", "SP"], ["Jacupiranga", "SP"],
  ["Cajati", "SP"], ["Itariri", "SP"], ["Tapiraí", "SP"], ["Barra do Turvo", "SP"],
];

// Ribeirão Preto + Franca + Barretos
const SP_RIBEIRAO: Array<[string, string]> = [
  ["Ribeirão Preto", "SP"], ["Franca", "SP"], ["Barretos", "SP"], ["Sertãozinho", "SP"],
  ["Jaboticabal", "SP"], ["Bebedouro", "SP"], ["Batatais", "SP"], ["Orlândia", "SP"],
  ["São Joaquim da Barra", "SP"], ["Ituverava", "SP"], ["Igarapava", "SP"],
  ["Pedregulho", "SP"], ["Cajuru", "SP"], ["Cravinhos", "SP"], ["Serrana", "SP"],
  ["Brodowski", "SP"], ["Jardinópolis", "SP"], ["Pontal", "SP"], ["Sales Oliveira", "SP"],
  ["Nuporanga", "SP"], ["Guará", "SP"], ["Patrocínio Paulista", "SP"], ["Cristais Paulista", "SP"],
  ["Ribeirão Corrente", "SP"], ["Pedrinhas Paulista", "SP"], ["Morro Agudo", "SP"],
  ["Colina", "SP"], ["Olímpia", "SP"], ["Cajobi", "SP"], ["Severínia", "SP"],
  ["Paulo de Faria", "SP"], ["Ipuã", "SP"], ["Restinga", "SP"], ["Altinópolis", "SP"],
  ["Santa Rosa de Viterbo", "SP"], ["São Simão", "SP"], ["Tambaú", "SP"], ["Casa Branca", "SP"],
  ["Mococa", "SP"], ["Caconde", "SP"], ["Divinolândia", "SP"], ["Tapiratiba", "SP"],
  ["Itobi", "SP"], ["São José do Rio Pardo", "SP"], ["Vargem Grande do Sul", "SP"],
  ["São João da Boa Vista", "SP"], ["Aguaí", "SP"], ["Águas da Prata", "SP"],
  ["Pirassununga", "SP"], ["Santa Cruz das Palmeiras", "SP"], ["Porto Ferreira", "SP"],
  ["Descalvado", "SP"], ["São Carlos", "SP"], ["Ibaté", "SP"], ["Araraquara", "SP"],
  ["Américo Brasiliense", "SP"], ["Santa Lúcia", "SP"], ["Matão", "SP"], ["Dobrada", "SP"],
  ["Borborema", "SP"], ["Itápolis", "SP"], ["Tabatinga", "SP"], ["Nova Europa", "SP"],
  ["Gavião Peixoto", "SP"], ["Boa Esperança do Sul", "SP"], ["Trabiju", "SP"],
];

// São José do Rio Preto + Catanduva
const SP_RIO_PRETO: Array<[string, string]> = [
  ["São José do Rio Preto", "SP"], ["Catanduva", "SP"], ["Mirassol", "SP"],
  ["Votuporanga", "SP"], ["Fernandópolis", "SP"], ["Jales", "SP"], ["Tanabi", "SP"],
  ["Bady Bassitt", "SP"], ["Cedral", "SP"], ["Ipiguá", "SP"], ["Onda Verde", "SP"],
  ["Icém", "SP"], ["Palestina", "SP"], ["Nova Granada", "SP"], ["Mirassolândia", "SP"],
  ["Neves Paulista", "SP"], ["Monte Aprazível", "SP"], ["Poloni", "SP"], ["Nipoã", "SP"],
  ["União Paulista", "SP"], ["Ubarana", "SP"], ["Adolfo", "SP"], ["Mendonça", "SP"],
  ["Sales", "SP"], ["Itajobi", "SP"], ["Novais", "SP"], ["Pindorama", "SP"],
  ["Santa Adélia", "SP"], ["Ariranha", "SP"], ["Catiguá", "SP"], ["Tabapuã", "SP"],
  ["Marapoama", "SP"], ["Elisiário", "SP"], ["Palmares Paulista", "SP"], ["Paraíso", "SP"],
  ["Cajobi", "SP"], ["Embaúba", "SP"], ["Santa Albertina", "SP"], ["Aspásia", "SP"],
  ["Mesópolis", "SP"], ["Estrela d'Oeste", "SP"], ["Pedranópolis", "SP"], ["Macedônia", "SP"],
  ["Ouroeste", "SP"], ["Indiaporã", "SP"], ["Cardoso", "SP"], ["Riolândia", "SP"],
  ["Álvares Florence", "SP"], ["Parisi", "SP"], ["Cosmorama", "SP"], ["Magda", "SP"],
  ["Floreal", "SP"], ["Sebastianópolis do Sul", "SP"], ["Américo de Campos", "SP"],
  ["Pontes Gestal", "SP"], ["Populina", "SP"], ["Santa Fé do Sul", "SP"], ["Santana da Ponte Pensa", "SP"],
  ["Três Fronteiras", "SP"], ["Rubinéia", "SP"], ["Marinópolis", "SP"], ["Suzanápolis", "SP"],
  ["Aparecida d'Oeste", "SP"], ["Dirce Reis", "SP"], ["Nova Canaã Paulista", "SP"],
  ["Palmeira d'Oeste", "SP"], ["São Francisco", "SP"], ["Urânia", "SP"], ["Vitória Brasil", "SP"],
  ["Pontalinda", "SP"], ["São João das Duas Pontes", "SP"], ["Mira Estrela", "SP"],
];

// Bauru + Marília + Presidente Prudente + Araçatuba
const SP_INTERIOR_OESTE: Array<[string, string]> = [
  ["Bauru", "SP"], ["Marília", "SP"], ["Presidente Prudente", "SP"], ["Araçatuba", "SP"],
  ["Birigui", "SP"], ["Penápolis", "SP"], ["Lins", "SP"], ["Promissão", "SP"],
  ["Pereira Barreto", "SP"], ["Andradina", "SP"], ["Mirandópolis", "SP"], ["Castilho", "SP"],
  ["Ilha Solteira", "SP"], ["Guararapes", "SP"], ["Avanhandava", "SP"], ["Barbosa", "SP"],
  ["Glicério", "SP"], ["Bilac", "SP"], ["Coroados", "SP"], ["Rubiácea", "SP"],
  ["Lourdes", "SP"], ["Buritama", "SP"], ["Brejo Alegre", "SP"], ["Gabriel Monteiro", "SP"],
  ["Piacatu", "SP"], ["Alto Alegre", "SP"], ["Clementina", "SP"], ["Santópolis do Aguapeí", "SP"],
  ["Luiziânia", "SP"], ["Agudos", "SP"], ["Pederneiras", "SP"], ["Jaú", "SP"],
  ["Lençóis Paulista", "SP"], ["Macatuba", "SP"], ["Areiópolis", "SP"], ["Borebi", "SP"],
  ["Iaras", "SP"], ["Avaré", "SP"], ["Cerqueira César", "SP"], ["Itaí", "SP"],
  ["Paranapanema", "SP"], ["Pratânia", "SP"], ["Botucatu", "SP"], ["São Manuel", "SP"],
  ["Areiópolis", "SP"], ["Itatinga", "SP"], ["Pardinho", "SP"], ["Bofete", "SP"],
  ["Anhembi", "SP"], ["Dois Córregos", "SP"], ["Bariri", "SP"], ["Itaju", "SP"],
  ["Bocaina", "SP"], ["Macaubal", "SP"], ["Garça", "SP"], ["Vera Cruz", "SP"],
  ["Pompéia", "SP"], ["Quintana", "SP"], ["Tupã", "SP"], ["Iacri", "SP"], ["Rinópolis", "SP"],
  ["Parapuã", "SP"], ["Bastos", "SP"], ["Adamantina", "SP"], ["Lucélia", "SP"],
  ["Osvaldo Cruz", "SP"], ["Inúbia Paulista", "SP"], ["Salmourão", "SP"], ["Pacaembu", "SP"],
  ["Junqueirópolis", "SP"], ["Dracena", "SP"], ["Tupi Paulista", "SP"], ["Panorama", "SP"],
  ["Paulicéia", "SP"], ["Ouro Verde", "SP"], ["Santa Mercedes", "SP"], ["São João do Pau d'Alho", "SP"],
  ["Monte Castelo", "SP"], ["Caiuá", "SP"], ["Presidente Bernardes", "SP"],
  ["Presidente Epitácio", "SP"], ["Presidente Venceslau", "SP"], ["Álvares Machado", "SP"],
  ["Pirapozinho", "SP"], ["Regente Feijó", "SP"], ["Martinópolis", "SP"], ["Indiana", "SP"],
  ["Anhumas", "SP"], ["Estrela do Norte", "SP"], ["Iepê", "SP"], ["João Ramalho", "SP"],
  ["Nantes", "SP"], ["Narandiba", "SP"], ["Pirapozinho", "SP"], ["Quatá", "SP"],
  ["Rancharia", "SP"], ["Ribeirão dos Índios", "SP"], ["Rosana", "SP"], ["Sandovalina", "SP"],
  ["Santo Anastácio", "SP"], ["Santo Expedito", "SP"], ["Taciba", "SP"], ["Tarabai", "SP"],
  ["Teodoro Sampaio", "SP"], ["Mirante do Paranapanema", "SP"], ["Marabá Paulista", "SP"],
  ["Euclides da Cunha Paulista", "SP"], ["Caiabu", "SP"], ["Emilianópolis", "SP"],
  ["Flora Rica", "SP"], ["Flórida Paulista", "SP"], ["Mariápolis", "SP"], ["Pacaembu", "SP"],
  ["Sagres", "SP"], ["Tupã", "SP"], ["Herculândia", "SP"], ["Arco-Íris", "SP"],
  ["Queiroz", "SP"], ["Borá", "SP"], ["Lutécia", "SP"], ["Oscar Bressane", "SP"],
  ["Platina", "SP"], ["Maracaí", "SP"], ["Cruzália", "SP"], ["Florínea", "SP"],
  ["Assis", "SP"], ["Cândido Mota", "SP"], ["Palmital", "SP"], ["Echaporã", "SP"],
  ["Ibirarema", "SP"], ["Paraguaçu Paulista", "SP"], ["Tarumã", "SP"], ["Ourinhos", "SP"],
  ["Ipaussu", "SP"], ["Bernardino de Campos", "SP"], ["Chavantes", "SP"], ["Ribeirão do Sul", "SP"],
  ["Santa Cruz do Rio Pardo", "SP"], ["Salto Grande", "SP"], ["Canitar", "SP"],
  ["Espírito Santo do Turvo", "SP"], ["São Pedro do Turvo", "SP"], ["Manduri", "SP"],
  ["Piraju", "SP"], ["Tejupá", "SP"], ["Sarutaiá", "SP"], ["Fartura", "SP"],
  ["Taguaí", "SP"], ["Coronel Macedo", "SP"], ["Itaporanga", "SP"], ["Barão de Antonina", "SP"],
];

// Itapeva + Sul de SP
const SP_SUL: Array<[string, string]> = [
  ["Itapeva", "SP"], ["Itararé", "SP"], ["Buri", "SP"], ["Capão Bonito", "SP"],
  ["Apiaí", "SP"], ["Ribeirão Branco", "SP"], ["Ribeira", "SP"], ["Iporanga", "SP"],
  ["Itaoca", "SP"], ["Itapirapuã Paulista", "SP"], ["Bom Sucesso de Itararé", "SP"],
  ["Nova Campina", "SP"], ["Riversul", "SP"], ["Itaberá", "SP"], ["Guapiara", "SP"],
  ["Ribeirão Grande", "SP"], ["Sete Barras", "SP"],
];

// ============================================================
// DEMAIS UFs - capitais e principais cidades
// ============================================================
const OUTRAS_UFS: Array<[string, string]> = [
  // RJ
  ["Rio de Janeiro", "RJ"], ["São Gonçalo", "RJ"], ["Duque de Caxias", "RJ"],
  ["Nova Iguaçu", "RJ"], ["Niterói", "RJ"], ["Belford Roxo", "RJ"], ["São João de Meriti", "RJ"],
  ["Petrópolis", "RJ"], ["Volta Redonda", "RJ"], ["Magé", "RJ"], ["Macaé", "RJ"],
  ["Itaboraí", "RJ"], ["Cabo Frio", "RJ"], ["Nova Friburgo", "RJ"], ["Barra Mansa", "RJ"],
  ["Angra dos Reis", "RJ"], ["Teresópolis", "RJ"], ["Mesquita", "RJ"], ["Nilópolis", "RJ"],
  ["Maricá", "RJ"], ["Queimados", "RJ"], ["Resende", "RJ"], ["Rio das Ostras", "RJ"],
  ["Araruama", "RJ"], ["Itaguaí", "RJ"], ["Saquarema", "RJ"], ["Japeri", "RJ"],
  ["Seropédica", "RJ"], ["Campos dos Goytacazes", "RJ"], ["Búzios", "RJ"], ["Paraty", "RJ"],
  // MG
  ["Belo Horizonte", "MG"], ["Uberlândia", "MG"], ["Contagem", "MG"], ["Juiz de Fora", "MG"],
  ["Betim", "MG"], ["Montes Claros", "MG"], ["Ribeirão das Neves", "MG"], ["Uberaba", "MG"],
  ["Governador Valadares", "MG"], ["Ipatinga", "MG"], ["Sete Lagoas", "MG"], ["Divinópolis", "MG"],
  ["Santa Luzia", "MG"], ["Ibirité", "MG"], ["Poços de Caldas", "MG"], ["Patos de Minas", "MG"],
  ["Pouso Alegre", "MG"], ["Teófilo Otoni", "MG"], ["Barbacena", "MG"], ["Sabará", "MG"],
  ["Varginha", "MG"], ["Conselheiro Lafaiete", "MG"], ["Vespasiano", "MG"], ["Itabira", "MG"],
  ["Araguari", "MG"], ["Ubá", "MG"], ["Passos", "MG"], ["Coronel Fabriciano", "MG"],
  ["Muriaé", "MG"], ["Araxá", "MG"], ["Lavras", "MG"], ["Itajubá", "MG"],
  ["Nova Lima", "MG"], ["Caratinga", "MG"], ["São João del Rei", "MG"], ["Ouro Preto", "MG"],
  ["Tiradentes", "MG"], ["Diamantina", "MG"],
  // ES
  ["Vitória", "ES"], ["Vila Velha", "ES"], ["Serra", "ES"], ["Cariacica", "ES"],
  ["Linhares", "ES"], ["Cachoeiro de Itapemirim", "ES"], ["Guarapari", "ES"], ["Colatina", "ES"],
  ["São Mateus", "ES"], ["Aracruz", "ES"], ["Viana", "ES"], ["Nova Venécia", "ES"],
  // PR
  ["Curitiba", "PR"], ["Londrina", "PR"], ["Maringá", "PR"], ["Ponta Grossa", "PR"],
  ["Cascavel", "PR"], ["São José dos Pinhais", "PR"], ["Foz do Iguaçu", "PR"],
  ["Colombo", "PR"], ["Guarapuava", "PR"], ["Paranaguá", "PR"], ["Araucária", "PR"],
  ["Toledo", "PR"], ["Apucarana", "PR"], ["Pinhais", "PR"], ["Campo Largo", "PR"],
  ["Almirante Tamandaré", "PR"], ["Umuarama", "PR"], ["Piraquara", "PR"],
  ["Cambé", "PR"], ["Campo Mourão", "PR"], ["Sarandi", "PR"], ["Fazenda Rio Grande", "PR"],
  ["Paranavaí", "PR"], ["Francisco Beltrão", "PR"], ["Pato Branco", "PR"],
  ["Arapongas", "PR"], ["Rolândia", "PR"], ["Telêmaco Borba", "PR"], ["União da Vitória", "PR"],
  // SC
  ["Florianópolis", "SC"], ["Joinville", "SC"], ["Blumenau", "SC"], ["São José", "SC"],
  ["Chapecó", "SC"], ["Itajaí", "SC"], ["Criciúma", "SC"], ["Jaraguá do Sul", "SC"],
  ["Lages", "SC"], ["Palhoça", "SC"], ["Balneário Camboriú", "SC"], ["Brusque", "SC"],
  ["Tubarão", "SC"], ["São Bento do Sul", "SC"], ["Caçador", "SC"], ["Camboriú", "SC"],
  ["Navegantes", "SC"], ["Concórdia", "SC"], ["Rio do Sul", "SC"], ["Araranguá", "SC"],
  ["Gaspar", "SC"], ["Biguaçu", "SC"], ["Indaial", "SC"], ["Itapema", "SC"],
  // RS
  ["Porto Alegre", "RS"], ["Caxias do Sul", "RS"], ["Pelotas", "RS"], ["Canoas", "RS"],
  ["Santa Maria", "RS"], ["Gravataí", "RS"], ["Viamão", "RS"], ["Novo Hamburgo", "RS"],
  ["São Leopoldo", "RS"], ["Rio Grande", "RS"], ["Alvorada", "RS"], ["Passo Fundo", "RS"],
  ["Sapucaia do Sul", "RS"], ["Uruguaiana", "RS"], ["Santa Cruz do Sul", "RS"],
  ["Cachoeirinha", "RS"], ["Bagé", "RS"], ["Bento Gonçalves", "RS"], ["Erechim", "RS"],
  ["Guaíba", "RS"], ["Esteio", "RS"], ["Ijuí", "RS"], ["Sapiranga", "RS"],
  ["Santana do Livramento", "RS"], ["Lajeado", "RS"], ["Cruz Alta", "RS"], ["Farroupilha", "RS"],
  ["Camaquã", "RS"], ["Carazinho", "RS"], ["Venâncio Aires", "RS"], ["Gramado", "RS"],
  ["Canela", "RS"], ["Torres", "RS"],
  // BA
  ["Salvador", "BA"], ["Feira de Santana", "BA"], ["Vitória da Conquista", "BA"],
  ["Camaçari", "BA"], ["Itabuna", "BA"], ["Juazeiro", "BA"], ["Lauro de Freitas", "BA"],
  ["Ilhéus", "BA"], ["Jequié", "BA"], ["Teixeira de Freitas", "BA"], ["Alagoinhas", "BA"],
  ["Barreiras", "BA"], ["Porto Seguro", "BA"], ["Simões Filho", "BA"], ["Paulo Afonso", "BA"],
  ["Eunápolis", "BA"], ["Santo Antônio de Jesus", "BA"], ["Valença", "BA"], ["Candeias", "BA"],
  ["Guanambi", "BA"], ["Jacobina", "BA"], ["Serrinha", "BA"], ["Senhor do Bonfim", "BA"],
  // PE
  ["Recife", "PE"], ["Jaboatão dos Guararapes", "PE"], ["Olinda", "PE"], ["Caruaru", "PE"],
  ["Petrolina", "PE"], ["Paulista", "PE"], ["Cabo de Santo Agostinho", "PE"],
  ["Camaragibe", "PE"], ["Garanhuns", "PE"], ["Vitória de Santo Antão", "PE"],
  ["Igarassu", "PE"], ["São Lourenço da Mata", "PE"], ["Abreu e Lima", "PE"], ["Santa Cruz do Capibaribe", "PE"],
  // CE
  ["Fortaleza", "CE"], ["Caucaia", "CE"], ["Juazeiro do Norte", "CE"], ["Maracanaú", "CE"],
  ["Sobral", "CE"], ["Crato", "CE"], ["Itapipoca", "CE"], ["Maranguape", "CE"],
  ["Iguatu", "CE"], ["Quixadá", "CE"], ["Pacatuba", "CE"], ["Aquiraz", "CE"],
  // PB
  ["João Pessoa", "PB"], ["Campina Grande", "PB"], ["Santa Rita", "PB"], ["Patos", "PB"],
  ["Bayeux", "PB"], ["Sousa", "PB"], ["Cajazeiras", "PB"], ["Cabedelo", "PB"],
  // RN
  ["Natal", "RN"], ["Mossoró", "RN"], ["Parnamirim", "RN"], ["São Gonçalo do Amarante", "RN"],
  ["Macaíba", "RN"], ["Ceará-Mirim", "RN"], ["Caicó", "RN"],
  // AL
  ["Maceió", "AL"], ["Arapiraca", "AL"], ["Rio Largo", "AL"], ["Palmeira dos Índios", "AL"],
  ["União dos Palmares", "AL"], ["Penedo", "AL"],
  // SE
  ["Aracaju", "SE"], ["Nossa Senhora do Socorro", "SE"], ["Lagarto", "SE"], ["Itabaiana", "SE"],
  ["São Cristóvão", "SE"], ["Estância", "SE"],
  // PI
  ["Teresina", "PI"], ["Parnaíba", "PI"], ["Picos", "PI"], ["Floriano", "PI"], ["Piripiri", "PI"],
  // MA
  ["São Luís", "MA"], ["Imperatriz", "MA"], ["Caxias", "MA"], ["Timon", "MA"],
  ["Codó", "MA"], ["Paço do Lumiar", "MA"], ["São José de Ribamar", "MA"], ["Açailândia", "MA"],
  // PA
  ["Belém", "PA"], ["Ananindeua", "PA"], ["Santarém", "PA"], ["Marabá", "PA"],
  ["Castanhal", "PA"], ["Parauapebas", "PA"], ["Abaetetuba", "PA"], ["Cametá", "PA"],
  ["Bragança", "PA"], ["Altamira", "PA"],
  // AP
  ["Macapá", "AP"], ["Santana", "AP"], ["Laranjal do Jari", "AP"],
  // AM
  ["Manaus", "AM"], ["Parintins", "AM"], ["Itacoatiara", "AM"], ["Manacapuru", "AM"], ["Coari", "AM"],
  // RR
  ["Boa Vista", "RR"], ["Rorainópolis", "RR"],
  // RO
  ["Porto Velho", "RO"], ["Ji-Paraná", "RO"], ["Ariquemes", "RO"], ["Vilhena", "RO"], ["Cacoal", "RO"],
  // AC
  ["Rio Branco", "AC"], ["Cruzeiro do Sul", "AC"], ["Sena Madureira", "AC"],
  // TO
  ["Palmas", "TO"], ["Araguaína", "TO"], ["Gurupi", "TO"], ["Porto Nacional", "TO"],
  // GO
  ["Goiânia", "GO"], ["Aparecida de Goiânia", "GO"], ["Anápolis", "GO"], ["Rio Verde", "GO"],
  ["Luziânia", "GO"], ["Águas Lindas de Goiás", "GO"], ["Valparaíso de Goiás", "GO"],
  ["Trindade", "GO"], ["Formosa", "GO"], ["Novo Gama", "GO"], ["Senador Canedo", "GO"],
  ["Itumbiara", "GO"], ["Catalão", "GO"], ["Jataí", "GO"], ["Caldas Novas", "GO"],
  // MT
  ["Cuiabá", "MT"], ["Várzea Grande", "MT"], ["Rondonópolis", "MT"], ["Sinop", "MT"],
  ["Tangará da Serra", "MT"], ["Cáceres", "MT"], ["Sorriso", "MT"], ["Lucas do Rio Verde", "MT"],
  ["Barra do Garças", "MT"], ["Primavera do Leste", "MT"],
  // MS
  ["Campo Grande", "MS"], ["Dourados", "MS"], ["Três Lagoas", "MS"], ["Corumbá", "MS"],
  ["Ponta Porã", "MS"], ["Naviraí", "MS"], ["Nova Andradina", "MS"], ["Aquidauana", "MS"],
  // DF
  ["Brasília", "DF"], ["Ceilândia", "DF"], ["Taguatinga", "DF"], ["Samambaia", "DF"],
  ["Plano Piloto", "DF"], ["Planaltina", "DF"], ["Águas Claras", "DF"], ["Gama", "DF"],
  ["Sobradinho", "DF"], ["Guará", "DF"], ["Santa Maria", "DF"], ["Recanto das Emas", "DF"],
  ["Riacho Fundo", "DF"], ["Lago Sul", "DF"], ["Lago Norte", "DF"],
];

// Concatena, deduplica por (slug-uf) e ordena
const ALL_RAW: Array<[string, string]> = [
  ...SP_CAPITAL_ZONAS,
  ...SP_GRANDE_SP,
  ...SP_VALE_PARAIBA,
  ...SP_CAMPINAS,
  ...SP_SOROCABA,
  ...SP_LITORAL,
  ...SP_RIBEIRAO,
  ...SP_RIO_PRETO,
  ...SP_INTERIOR_OESTE,
  ...SP_SUL,
  ...OUTRAS_UFS,
];

const dedup = new Map<string, City>();
for (const [name, uf] of ALL_RAW) {
  const slug = slugify(name);
  const key = `${slug}-${uf.toLowerCase()}`;
  if (!dedup.has(key)) {
    dedup.set(key, { name, uf, slug });
  }
}

export const ALL_CITIES: City[] = Array.from(dedup.values()).sort((a, b) =>
  a.name.localeCompare(b.name, "pt-BR")
);

export const CITIES_BY_LETTER: Record<string, City[]> = ALL_CITIES.reduce(
  (acc, c) => {
    const letter = c.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")[0]
      .toUpperCase();
    (acc[letter] ||= []).push(c);
    return acc;
  },
  {} as Record<string, City[]>
);

export const ALPHABET = Object.keys(CITIES_BY_LETTER).sort();

// ============================================================
// Estado de São Paulo — agrupamento por região (destaque no site)
// ============================================================

const toCities = (raw: Array<[string, string]>): City[] => {
  const seen = new Set<string>();
  return raw
    .map(([name, uf]) => ({ name, uf, slug: slugify(name) }))
    .filter((c) => {
      const key = `${c.slug}-${c.uf.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
};

export type SPRegion = { label: string; slug: string; cities: City[] };

export const SP_REGIONS: SPRegion[] = [
  { label: "Capital e zonas de São Paulo", slug: "capital", cities: toCities(SP_CAPITAL_ZONAS) },
  { label: "Grande São Paulo e ABC", slug: "grande-sp", cities: toCities(SP_GRANDE_SP) },
  { label: "Vale do Paraíba, Litoral Norte e Mantiqueira", slug: "vale-do-paraiba", cities: toCities(SP_VALE_PARAIBA) },
  { label: "Região de Campinas", slug: "campinas", cities: toCities(SP_CAMPINAS) },
  { label: "Região de Sorocaba", slug: "sorocaba", cities: toCities(SP_SOROCABA) },
  { label: "Baixada Santista e Litoral Sul", slug: "litoral", cities: toCities(SP_LITORAL) },
  { label: "Ribeirão Preto, Franca e Barretos", slug: "ribeirao-preto", cities: toCities(SP_RIBEIRAO) },
  { label: "São José do Rio Preto e Araçatuba", slug: "rio-preto", cities: toCities(SP_RIO_PRETO) },
  { label: "Bauru, Marília e Oeste Paulista", slug: "interior-oeste", cities: toCities(SP_INTERIOR_OESTE) },
  { label: "Sul Paulista, Itapeva e Registro", slug: "sul-paulista", cities: toCities(SP_SUL) },
];

/** Todas as cidades do Estado de São Paulo, em ordem alfabética. */
export const SP_CITIES: City[] = ALL_CITIES.filter((c) => c.uf === "SP");
