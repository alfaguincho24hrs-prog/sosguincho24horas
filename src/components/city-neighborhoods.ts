// Bairros principais e faixas de CEP por cidade — usado para SEO local hiper-segmentado
// nas páginas /guincho-em-{cidade}-{uf}. Cobertura ampliada para SP (capital por zonas,
// Grande SP, ABC, Vale do Paraíba, Campinas, Sorocaba, Baixada Santista, interior).

export type CityLocalData = {
  neighborhoods: string[];
  cepRange?: string;
};

export const CITY_LOCAL: Record<string, CityLocalData> = {
  // ===== CAPITAL SP - por zonas =====
  "sao-paulo-sp": {
    neighborhoods: [
      "Centro", "Sé", "República", "Bela Vista", "Liberdade", "Consolação",
      "Higienópolis", "Santa Cecília", "Bom Retiro", "Pari", "Brás", "Cambuci",
      "Vila Mariana", "Moema", "Saúde", "Jabaquara", "Vila Clementino",
      "Pinheiros", "Vila Madalena", "Itaim Bibi", "Jardim Paulista", "Jardim América",
      "Jardim Europa", "Jardins", "Brooklin", "Campo Belo", "Vila Olímpia",
      "Morumbi", "Vila Andrade", "Tatuapé", "Mooca", "Belém", "Vila Prudente",
      "Santana", "Tucuruvi", "Casa Verde", "Lapa", "Perdizes", "Pompeia",
      "Barra Funda", "Butantã", "Vila Sônia", "Santo Amaro", "Ipiranga",
      "Vila Carrão", "Penha", "Itaquera", "Guaianases", "Cidade Tiradentes",
      "Aclimação", "Paraíso",
    ],
    cepRange: "01000-000 a 05999-999 e 08000-000 a 08499-999",
  },
  "sao-paulo-zona-norte-sp": {
    neighborhoods: [
      "Santana", "Tucuruvi", "Casa Verde", "Limão", "Vila Maria", "Vila Guilherme",
      "Tremembé", "Jaçanã", "Mandaqui", "Vila Nova Cachoeirinha", "Brasilândia",
      "Freguesia do Ó", "Pirituba", "Perus", "Anhanguera", "Vila Medeiros",
      "Imirim", "Parada Inglesa", "Vila Sabrina", "Jardim São Paulo", "Jardim Tremembé",
      "Vila Hermínia", "Cachoeirinha", "Lauzane Paulista", "Jaraguá", "São Domingos",
      "Vila Amália", "Parque Edu Chaves", "Jardim Brasil", "Vila Constança",
      "Vila Galvão", "Casa Verde Alta", "Vila Albertina", "Jardim Peri",
    ],
    cepRange: "02000-000 a 02999-999 e 05100-000 a 05299-999",
  },
  "sao-paulo-zona-sul-sp": {
    neighborhoods: [
      "Vila Mariana", "Moema", "Saúde", "Jabaquara", "Santo Amaro", "Brooklin",
      "Campo Belo", "Vila Andrade", "Morumbi", "Capão Redondo", "Campo Limpo",
      "M'Boi Mirim", "Cidade Ademar", "Pedreira", "Grajaú", "Parelheiros",
      "Cidade Dutra", "Socorro", "Interlagos", "Vila Sônia", "Vila Clementino",
      "Chácara Santo Antônio", "Granja Julieta", "Cursino", "Bosque da Saúde",
      "Mirandópolis", "Planalto Paulista", "Jardim da Saúde", "Jardim Marajoara",
      "Vila Olímpia", "Cidade Monções", "Jardim Aeroporto", "Vila Cordeiro",
      "Vila Mascote", "Vila Santa Catarina", "Americanópolis", "Jardim Miriam",
    ],
    cepRange: "04000-000 a 04999-999 e 05700-000 a 05899-999",
  },
  "sao-paulo-zona-leste-sp": {
    neighborhoods: [
      "Tatuapé", "Mooca", "Penha", "Itaquera", "Guaianases", "São Mateus",
      "Cidade Tiradentes", "Sapopemba", "Vila Prudente", "Aricanduva",
      "Carrão", "Vila Formosa", "Belém", "Brás", "Artur Alvim", "Ermelino Matarazzo",
      "São Miguel Paulista", "Itaim Paulista", "Cangaíba", "Vila Matilde",
      "Jardim Anália Franco", "Água Rasa", "Parque São Lucas", "São Lucas",
      "Vila Califórnia", "Vila Esperança", "Vila Re", "Vila Granada",
      "Cidade Líder", "Parque do Carmo", "Iguatemi", "Jardim Helena",
      "Vila Curuçá", "Lajeado", "José Bonifácio", "Vila Jacuí",
    ],
    cepRange: "03000-000 a 03999-999 e 08000-000 a 08499-999",
  },
  "sao-paulo-zona-oeste-sp": {
    neighborhoods: [
      "Pinheiros", "Vila Madalena", "Lapa", "Perdizes", "Butantã", "Vila Leopoldina",
      "Alto de Pinheiros", "Jaguaré", "Rio Pequeno", "Raposo Tavares", "Morumbi",
      "Vila Sônia", "Jardim Paulista", "Sumaré", "Pompeia", "Barra Funda",
      "Água Branca", "Vila Romana", "Vila Anastácio", "City Lapa", "Bela Aliança",
      "Vila Hamburguesa", "Vila Ipojuca", "Sumarezinho", "Pacaembu", "Cerqueira César",
      "Jardim Europa", "Jardim América", "Vila Beatriz", "Caxingui", "Jardim Bonfiglioli",
      "Vila Indiana", "Vila Pirajussara", "Real Parque", "Panamby",
    ],
    cepRange: "05000-000 a 05699-999",
  },
  "sao-paulo-centro-sp": {
    neighborhoods: [
      "Sé", "República", "Centro Histórico", "Bela Vista", "Bom Retiro",
      "Brás", "Cambuci", "Consolação", "Liberdade", "Pari", "Santa Cecília",
      "Higienópolis", "Vila Buarque", "Anhangabaú", "Praça da República",
      "Praça da Sé", "Largo São Bento", "Largo do Arouche", "25 de Março",
      "Glicério", "Aclimação", "Paraíso", "Bixiga", "Triângulo", "Mercado Municipal",
      "Luz", "Campos Elíseos", "Santa Ifigênia", "Vila Buarque", "Morro dos Ingleses",
      "Itália", "Avenida Paulista", "Rua Augusta", "Praça da República", "Sumaré",
    ],
    cepRange: "01000-000 a 01599-999",
  },

  // ===== GRANDE SP / ABC =====
  "guarulhos-sp": {
    neighborhoods: [
      "Centro", "Vila Galvão", "Macedo", "Picanço", "Jardim Maia",
      "Jardim Bom Clima", "Pimentas", "Bonsucesso", "Cumbica", "Taboão",
      "Vila Augusta", "Gopouva",
    ],
    cepRange: "07000-000 a 07399-999",
  },
  "sao-bernardo-do-campo-sp": {
    neighborhoods: [
      "Centro", "Rudge Ramos", "Baeta Neves", "Santa Terezinha", "Anchieta",
      "Demarchi", "Assunção", "Ferrazópolis", "Nova Petrópolis", "Riacho Grande",
    ],
    cepRange: "09600-000 a 09899-999",
  },
  "santo-andre-sp": {
    neighborhoods: [
      "Centro", "Vila Assunção", "Jardim", "Campestre", "Bangu", "Vila Bastos",
      "Paraíso", "Utinga", "Santa Maria", "Parque das Nações",
    ],
    cepRange: "09000-000 a 09299-999",
  },
  "sao-caetano-do-sul-sp": {
    neighborhoods: [
      "Centro", "Santa Paula", "Santa Maria", "Cerâmica", "Olímpico",
      "Boa Vista", "Barcelona", "Mauá", "Nova Gerty",
    ],
    cepRange: "09500-000 a 09581-999",
  },
  "diadema-sp": {
    neighborhoods: [
      "Centro", "Eldorado", "Piraporinha", "Casa Grande", "Conceição",
      "Serraria", "Taboão", "Vila Nogueira",
    ],
    cepRange: "09900-000 a 09999-999",
  },
  "maua-sp": {
    neighborhoods: ["Centro", "Vila Bocaina", "Jardim Zaíra", "Sônia Maria", "Itapark", "Falchi Gianini"],
    cepRange: "09300-000 a 09399-999",
  },
  "osasco-sp": {
    neighborhoods: [
      "Centro", "Vila Yara", "Bela Vista", "Presidente Altino", "City Bussocaba",
      "Bonfim", "Helena Maria", "Quitaúna", "Jaguaribe",
    ],
    cepRange: "06000-000 a 06299-999",
  },
  "barueri-sp": {
    neighborhoods: ["Centro", "Alphaville", "Tamboré", "Vila São Jorge", "Engenho Novo"],
    cepRange: "06400-000 a 06499-999",
  },

  // ===== VALE DO PARAÍBA / SERRA / LITORAL NORTE =====
  "sao-jose-dos-campos-sp": {
    neighborhoods: [
      "Centro", "Jardim Aquarius", "Jardim Esplanada", "Vila Adyana", "Urbanova",
      "Jardim Satélite", "Bosque dos Eucaliptos", "Eugênio de Melo", "Putim",
      "Parque Industrial", "Vista Verde", "Jardim das Indústrias", "Jardim Oswaldo Cruz",
      "Jardim São Dimas", "Vila Ema", "Vila Industrial", "Vila Tatetuba", "Monte Castelo",
      "Jardim Augusta", "Jardim Paulista", "Jardim Morumbi", "Jardim Diamante",
      "Jardim Telespark", "Cidade Vista Verde", "Vila São Bento", "Parque Aquarius",
      "Galo Branco", "Floradas de São José", "Campo dos Alemães", "Santana",
      "Jardim Colonial", "Vila Tesouro", "Jardim Imperial", "Jardim Uirá",
      "Cajuru", "Bosque dos Ipês", "Jardim das Flores", "Pernambucana", "Esplanada Independência",
    ],
    cepRange: "12200-000 a 12249-999",
  },
  "taubate-sp": {
    neighborhoods: [
      "Centro", "Independência", "Jardim Eulália", "Esplanada Santa Terezinha", "Quiririm",
      "Jardim das Nações", "Jardim Mourisco", "Vila São José", "Vila São Geraldo",
      "Vila Edmundo", "Estiva", "Jardim Russi", "Jardim Maria Augusta", "Jardim Ana Emília",
      "Belém", "Vila São Carlos", "Jardim Continental", "Parque São Luís",
      "Cidade Jardim", "Chácara do Visconde", "Bairro do Barreiro", "Vila São Pedro",
      "Vila Costa", "Bonfim", "Jardim Hugo Marques", "Jardim Paulista", "Vila Albina",
      "Granjas Rurais Reunidas", "Marlene Miranda", "Jaraguá", "Tupinambá",
      "Parque Aeroporto", "Jardim do Sol", "Cataguá", "Cecap", "Vila Marli",
      "Barranco", "Sítio Santo Antônio", "Santa Fé", "Esplanada Independência",
    ],
    cepRange: "12000-000 a 12099-999",
  },
  "tremembe-sp": {
    neighborhoods: [
      "Centro", "Vila Nossa Senhora do Bom Conselho", "Jardim Maracaibo", "Padre Eterno Ribeiro",
      "Jardim Califórnia", "Vila São Geraldo", "Jardim Santana", "Bairro dos Guedes",
      "Bairro do Flamengo", "Cidade Jardim", "Bairro Alberto Ronconi",
      "Jardim Imperial", "Bairro do Pinhão", "Vila Aparecida", "Jardim Bela Vista",
      "Jardim Continental", "Jardim Renata", "Bairro Lagoinha", "Vale do Sol",
      "Jardim Santa Cecília", "Bairro do Goiabal", "Bairro Itapecerica",
      "Bairro Bom Retiro", "Parque das Fontes", "Bairro do Limoeiro", "Bairro Primavera",
    ],
    cepRange: "12120-000 a 12129-999",
  },
  "pindamonhangaba-sp": {
    neighborhoods: [
      "Centro", "Moreira César", "Crispim", "Mombaça", "Santana", "Boa Vista",
      "Cidade Nova", "Vila São Benedito", "Bosque", "Maria Áurea", "Jardim Imperial",
      "Vila Rica", "Jardim Resende", "Alto do Cardoso", "Jardim Cristina", "Araretama",
      "Cícero Prado", "Goiabal", "Campo Alegre", "Cidade Jardim", "Vila Bourghese",
      "Liberdade", "Bem Viver", "Andrade", "Feital", "Jardim Regina", "Mantiqueira",
      "Terra dos Ipês", "Conjunto Habitacional Azeredo Soares", "Loteamento Real Ville",
    ],
    cepRange: "12400-000 a 12449-999",
  },
  "jacarei-sp": {
    neighborhoods: [
      "Centro", "Jardim Califórnia", "Cidade Salvador", "Jardim Paraíba", "Avareí",
      "Jardim Esperança", "Jardim Santa Marina", "Vila Branca", "Jardim Maria Amélia",
      "Parque Meia Lua", "Jardim Bela Vista", "Centro Industrial", "Jardim Pitoresco",
      "Vila Garcia", "Jardim Coleginho", "Jardim Liberdade", "Vila Formosa", "Vila Zezé",
      "Jardim Conquista", "Cidade Jardim", "Jardim Marcondes", "São João", "Jardim Didinha",
      "Loteamento Villa Branca", "Parque Santo Antônio", "Jardim Santa Maria",
      "Jardim Mesquita", "Jardim Flórida", "Vila Pinheiro", "Jardim das Indústrias",
      "Igarapés", "Jardim Sapucaia", "Jardim do Vale",
    ],
    cepRange: "12300-000 a 12349-999",
  },
  "sao-luiz-do-paraitinga-sp": {
    neighborhoods: [
      "Centro Histórico", "Praça Dr. Oswaldo Cruz", "Bairro do Chapéu",
      "Bairro do Pulador", "Bairro dos Mottas", "Bairro do Cinto", "Bairro do Toldi",
      "Bairro do Bofete", "Catuçaba", "Alto da Bela Vista", "Boa Vista", "Capelinha",
      "Bairro Cardoso", "Bairro do Frade", "Lavrinhas", "Bairro do Quilombo",
      "Sertão do Cantagalo", "Vargem Grande", "Vila Aparecida", "Mato Dentro",
    ],
    cepRange: "12140-000 a 12149-999",
  },
  "aparecida-sp": {
    neighborhoods: [
      "Centro", "Santuário Nacional", "Ponte Alta", "Itaguaçu", "Jardim Senhor Bom Jesus",
      "Vila Mariana", "Jardim Santa Rita de Cássia", "Vila Antônio Augusto Luiz",
      "Jardim Adalgisa", "Vila Cristina", "Jardim Tarumã", "Jardim Eldorado",
      "Vila Bertioga", "Vila Santa Rita", "Vila São Geraldo", "Vila Nair",
      "Jardim das Nações", "Vila Jardim Brasil", "Pirapitingui", "Vila Independência",
      "Jardim Marta", "Jardim Santo Afonso", "Vila Mendes", "Sítio das Acácias",
      "Bairro do Belém", "Vila Ponte Alta", "Bairro Borba", "Jardim Brasil",
    ],
    cepRange: "12570-000 a 12579-999",
  },
  "queluz-sp": {
    neighborhoods: [
      "Centro", "Vila Esperança", "Vila Pinto", "Bairro do Belém", "Engenheiro Passos",
      "Bairro Areias", "Bairro do Cruzeiro", "Boa Vista", "Vila Antônio Carlos",
      "Bocaininha", "Vila Nova", "Bairro do Sapé", "Cachoeira", "Vila São José",
      "Bairro Limoeiro", "Bairro Furquim",
    ],
    cepRange: "12800-000 a 12809-999",
  },
  "roseira-sp": {
    neighborhoods: [
      "Centro", "Vila São José", "Roseira Velha", "Vila Reis", "Jardim Bela Vista",
      "Vila Brasil", "Bairro Pinhão", "Bairro Itaguaçu", "Vila Industrial",
      "Vila Brasília", "Loteamento Resende", "Mato Dentro", "Bairro do Quati", "Vila Paulino",
    ],
    cepRange: "12580-000 a 12589-999",
  },
  "cruzeiro-sp": {
    neighborhoods: [
      "Centro", "Vila Paulista", "Capela", "Itagaçaba", "Vila Princesa Isabel",
      "Jardim Europa", "Vila Bandeirantes", "Vila Albina", "Cohab I", "Cohab II",
      "Jardim América", "Jardim Santa Lúcia", "Vila Rica", "Vila Romana",
      "Vila Brasília", "Vila Mariana", "Vila Industrial", "Vila Falconi",
      "Vila Santa Maria", "Bairro Aparecida", "Vila Vasconcelos", "Vila Velha",
      "Vila Lúcia", "Vila São Cristóvão", "Bairro Pinheirinho", "Vila Garcia",
      "Jardim Esperança", "Jardim Primavera", "Loteamento Maravilha",
    ],
    cepRange: "12700-000 a 12714-999",
  },
  "campos-do-jordao-sp": {
    neighborhoods: [
      "Capivari", "Abernéssia", "Jaguaribe", "Vila Capivari", "Vila Albertina",
      "Vila Britânia", "Vila Inglesa", "Vila Santista", "Descansópolis", "Vila Matilde",
      "Vila Paulista", "Alto da Boa Vista", "Vila Rica", "Morro do Elefante",
      "Vila Natal", "Vila Suíça", "Bairro do Pico", "Vila Esmeralda", "Vila Bela",
      "Recanto Feliz", "Vila Dom Bosco", "Lagoa Seca", "Bairro do Imbiri",
      "Loteamento Vila Nova", "Quinta da Serra", "Recreio dos Bandeirantes",
      "Bairro do Homem Morto", "Vista Alegre", "Bairro do Umuarama", "Vila Edmundo",
    ],
    cepRange: "12460-000 a 12469-999",
  },
  "caraguatatuba-sp": {
    neighborhoods: ["Centro", "Martim de Sá", "Indaiá", "Massaguaçu", "Tabatinga", "Porto Novo"],
    cepRange: "11660-000 a 11669-999",
  },
  "ubatuba-sp": {
    neighborhoods: ["Centro", "Itaguá", "Praia Grande", "Maranduba", "Perequê-Açu", "Tenório"],
    cepRange: "11680-000 a 11689-999",
  },
  "sao-sebastiao-sp": {
    neighborhoods: ["Centro", "Boiçucanga", "Maresias", "Juquehy", "Barra do Sahy", "Camburi"],
    cepRange: "11600-000 a 11609-999",
  },

  // ===== REGIÃO DE CAMPINAS =====
  "campinas-sp": {
    neighborhoods: [
      "Centro", "Cambuí", "Taquaral", "Barão Geraldo", "Mansões Santo Antônio",
      "Jardim Chapadão", "Nova Campinas", "Bonfim", "Castelo", "Sousas",
      "Jardim Guanabara", "Vila Industrial", "Ouro Verde",
    ],
    cepRange: "13000-000 a 13139-999",
  },
  "americana-sp": {
    neighborhoods: [
      "Centro", "Jardim São Paulo", "Vila Santa Catarina", "Cidade Jardim",
      "Parque Universitário", "Jardim Brasil", "Vila Frezzarin",
      "Jardim Werner Plaas", "Praia Azul", "São Manoel", "Antônio Zanaga",
      "Jardim Boer", "Vila Bertini", "Cariobinha",
    ],
    cepRange: "13465-000 a 13479-999",
  },
  "indaiatuba-sp": {
    neighborhoods: ["Centro", "Cidade Nova", "Vila Furlan", "Jardim Morada do Sol", "Itaici", "Pau Preto"],
    cepRange: "13330-000 a 13349-999",
  },
  "piracicaba-sp": {
    neighborhoods: ["Centro", "Higienópolis", "Paulicéia", "Castelinho", "Santa Terezinha", "Vila Rezende"],
    cepRange: "13400-000 a 13439-999",
  },
  "limeira-sp": {
    neighborhoods: ["Centro", "Vila Cláudia", "Jardim Nova Europa", "Pista de Manobras", "Boa Vista"],
    cepRange: "13480-000 a 13489-999",
  },
  "rio-claro-sp": {
    neighborhoods: ["Centro", "Cidade Nova", "Jardim São Paulo", "Vila Aparecida", "Bairro do Estádio"],
    cepRange: "13500-000 a 13509-999",
  },
  "jundiai-sp": {
    neighborhoods: ["Centro", "Anhangabaú", "Jardim Ana Maria", "Vila Arens", "Vianelo", "Vila Hortolândia"],
    cepRange: "13201-000 a 13219-999",
  },
  "atibaia-sp": {
    neighborhoods: ["Centro", "Alvinópolis", "Jardim Paulista", "Caetetuba", "Itapetinga"],
    cepRange: "12940-000 a 12954-999",
  },
  "braganca-paulista-sp": {
    neighborhoods: ["Centro", "Lavapés", "Jardim Itália", "Vila Aparecida", "Penha", "Jardim Europa"],
    cepRange: "12900-000 a 12929-999",
  },

  // ===== REGIÃO DE SOROCABA =====
  "sorocaba-sp": {
    neighborhoods: ["Centro", "Vila Hortência", "Jardim Vergueiro", "Campolim", "Trujillo", "Éden", "Vila Carvalho"],
    cepRange: "18000-000 a 18109-999",
  },
  "votorantim-sp": {
    neighborhoods: ["Centro", "Vossoroca", "Jardim Icatu", "Parque Bela Vista", "Rio Acima"],
    cepRange: "18110-000 a 18119-999",
  },
  "itu-sp": {
    neighborhoods: ["Centro", "Brasil", "Vila Nova", "Cidade Nova", "Pirapitingui"],
    cepRange: "13300-000 a 13319-999",
  },
  "salto-sp": {
    neighborhoods: ["Centro", "Jardim Brasil", "Vila Teixeira", "São José", "Cidade Nova"],
    cepRange: "13320-000 a 13329-999",
  },

  // ===== BAIXADA SANTISTA =====
  "santos-sp": {
    neighborhoods: ["Centro", "Gonzaga", "Boqueirão", "Pompéia", "Aparecida", "José Menino", "Embaré", "Ponta da Praia"],
    cepRange: "11000-000 a 11099-999",
  },
  "sao-vicente-sp": {
    neighborhoods: ["Centro", "Itararé", "Catiapoã", "Vila Cascatinha", "Parque Bitaru", "Humaitá"],
    cepRange: "11300-000 a 11399-999",
  },
  "praia-grande-sp": {
    neighborhoods: ["Boqueirão", "Ocian", "Tupi", "Guilhermina", "Aviação", "Mirim", "Solemar", "Vila Caiçara"],
    cepRange: "11700-000 a 11729-999",
  },
  "guaruja-sp": {
    neighborhoods: ["Pitangueiras", "Astúrias", "Enseada", "Praia da Enseada", "Vicente de Carvalho", "Perequê"],
    cepRange: "11400-000 a 11449-999",
  },
  "cubatao-sp": {
    neighborhoods: ["Centro", "Vila Nova", "Vila Couto", "Ilha Caraguatá", "Jardim Casqueiro"],
    cepRange: "11500-000 a 11549-999",
  },

  // ===== INTERIOR =====
  "ribeirao-preto-sp": {
    neighborhoods: ["Centro", "Jardim Sumaré", "Ribeirânia", "Jardim Califórnia", "Alto da Boa Vista", "Vila Tibério", "Iguatemi"],
    cepRange: "14000-000 a 14114-999",
  },
  "sao-jose-do-rio-preto-sp": {
    neighborhoods: ["Centro", "Boa Vista", "Vila Imperial", "Higienópolis", "Jardim Yolanda", "Redentora"],
    cepRange: "15000-000 a 15109-999",
  },
  "araraquara-sp": {
    neighborhoods: ["Centro", "Vila Xavier", "Jardim Brasil", "Vila Harmonia", "Jardim Pinheiros"],
    cepRange: "14800-000 a 14811-999",
  },
  "sao-carlos-sp": {
    neighborhoods: ["Centro", "Vila Prado", "Jardim Lutfalla", "Cidade Aracy", "Santa Felícia"],
    cepRange: "13560-000 a 13579-999",
  },
  "bauru-sp": {
    neighborhoods: ["Centro", "Vila Cardia", "Vila Falcão", "Higienópolis", "Jardim Estoril", "Parque Vista Alegre"],
    cepRange: "17000-000 a 17109-999",
  },
  "marilia-sp": {
    neighborhoods: ["Centro", "Cascata", "Marília", "Jardim Maria Izabel", "Núcleo Habitacional Nova Marília"],
    cepRange: "17500-000 a 17529-999",
  },
  "presidente-prudente-sp": {
    neighborhoods: ["Centro", "Vila Marcondes", "Jardim Bongiovani", "Parque Higienópolis", "Vila Furquim"],
    cepRange: "19000-000 a 19069-999",
  },
  "aracatuba-sp": {
    neighborhoods: ["Centro", "Higienópolis", "Vila Mendonça", "Vila Maria", "Aviação", "Bandeirantes"],
    cepRange: "16000-000 a 16059-999",
  },
  "franca-sp": {
    neighborhoods: ["Centro", "Cidade Nova", "Vila Aparecida", "Jardim Aeroporto", "Esplanada Primo Meneghetti"],
    cepRange: "14400-000 a 14414-999",
  },

  // ===== OUTRAS CAPITAIS =====
  "rio-de-janeiro-rj": {
    neighborhoods: [
      "Centro", "Copacabana", "Ipanema", "Leblon", "Botafogo", "Flamengo",
      "Tijuca", "Barra da Tijuca", "Recreio", "Jacarepaguá", "Méier",
      "Madureira", "Campo Grande", "Bangu", "Santa Cruz", "Ilha do Governador",
    ],
    cepRange: "20000-000 a 23799-999",
  },
  "belo-horizonte-mg": {
    neighborhoods: ["Centro", "Savassi", "Funcionários", "Lourdes", "Buritis", "Pampulha", "Belvedere", "Anchieta", "Cidade Nova", "Barreiro", "Venda Nova"],
    cepRange: "30000-000 a 31999-999",
  },
  "curitiba-pr": {
    neighborhoods: ["Centro", "Batel", "Água Verde", "Bigorrilho", "Cabral", "Juvevê", "Mercês", "Champagnat", "Portão", "Boqueirão", "CIC", "Santa Felicidade"],
    cepRange: "80000-000 a 82999-999",
  },
  "porto-alegre-rs": {
    neighborhoods: ["Centro Histórico", "Moinhos de Vento", "Bela Vista", "Mont Serrat", "Petrópolis", "Menino Deus", "Cidade Baixa", "Bom Fim", "Tristeza", "Ipanema"],
    cepRange: "90000-000 a 91999-999",
  },
  "salvador-ba": {
    neighborhoods: ["Centro", "Pelourinho", "Barra", "Ondina", "Rio Vermelho", "Pituba", "Itaigara", "Caminho das Árvores", "Imbuí", "Stiep", "Itapuã"],
    cepRange: "40000-000 a 42599-999",
  },
  "brasilia-df": {
    neighborhoods: ["Asa Norte", "Asa Sul", "Lago Sul", "Lago Norte", "Sudoeste", "Noroeste", "Águas Claras", "Taguatinga", "Ceilândia", "Guará"],
    cepRange: "70000-000 a 72799-999",
  },
  "fortaleza-ce": {
    neighborhoods: ["Centro", "Aldeota", "Meireles", "Praia de Iracema", "Mucuripe", "Cocó", "Papicu", "Varjota", "Messejana", "Parangaba"],
    cepRange: "60000-000 a 61699-999",
  },
};

const UF_CEP: Record<string, string> = {
  SP: "01000-000 a 19999-999",
  RJ: "20000-000 a 28999-999",
  MG: "30000-000 a 39999-999",
  ES: "29000-000 a 29999-999",
  BA: "40000-000 a 48999-999",
  SE: "49000-000 a 49999-999",
  PE: "50000-000 a 56999-999",
  AL: "57000-000 a 57999-999",
  PB: "58000-000 a 58999-999",
  RN: "59000-000 a 59999-999",
  CE: "60000-000 a 63999-999",
  PI: "64000-000 a 64999-999",
  MA: "65000-000 a 65999-999",
  PA: "66000-000 a 68899-999",
  AP: "68900-000 a 68999-999",
  AM: "69000-000 a 69299-999",
  RR: "69300-000 a 69399-999",
  AC: "69900-000 a 69999-999",
  DF: "70000-000 a 72799-999",
  GO: "72800-000 a 76799-999",
  TO: "77000-000 a 77999-999",
  MT: "78000-000 a 78899-999",
  RO: "78900-000 a 78999-999",
  MS: "79000-000 a 79999-999",
  PR: "80000-000 a 87999-999",
  SC: "88000-000 a 89999-999",
  RS: "90000-000 a 99999-999",
};

const GENERIC_NEIGHBORHOODS = [
  "Centro",
  "Jardim Brasil",
  "Vila Nova",
  "Jardim América",
  "Jardim Europa",
  "Vila São José",
  "Parque Industrial",
  "Cidade Alta",
  "Cidade Baixa",
  "Bairro Alto",
  "Vila Operária",
  "Jardim Santa Rosa",
];

export function getCityLocalData(slug: string, uf: string): CityLocalData {
  const key = slug.toLowerCase();
  if (CITY_LOCAL[key]) return CITY_LOCAL[key];
  // tenta sem o sufixo -uf
  const withoutUf = key.replace(new RegExp(`-${uf.toLowerCase()}$`), "");
  if (CITY_LOCAL[`${withoutUf}-${uf.toLowerCase()}`]) {
    return CITY_LOCAL[`${withoutUf}-${uf.toLowerCase()}`];
  }
  return {
    neighborhoods: GENERIC_NEIGHBORHOODS,
    cepRange: UF_CEP[uf.toUpperCase()],
  };
}
