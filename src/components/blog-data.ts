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

  // SILO 5 – Diagnóstico de sintomas (2026)
  {
    slug: "fumaca-branca-saindo-do-escapamento-o-que-fazer",
    title: "Fumaça branca no escapamento: causas, riscos e o que fazer",
    excerpt: "Vapor inofensivo ou junta de cabeçote queimada? Aprenda a diferenciar a fumaça branca e saiba quando parar o carro na hora.",
    date: "28 de agosto de 2026",
    category: "Mecânica",
    content: "Nem toda fumaça branca é sinal de problema grave, mas ignorar o sintoma errado pode custar um motor inteiro.\n\n**Fumaça branca fina que some rápido**: normalmente é apenas condensação de água no escapamento, comum em manhãs frias e nos primeiros minutos após a partida. Se desaparece quando o motor esquenta, não há motivo para preocupação.\n\n**Fumaça branca densa e constante**: indica que líquido de arrefecimento está entrando na câmara de combustão. As causas mais comuns são junta do cabeçote queimada, cabeçote empenado por superaquecimento ou trinca no bloco. Costuma vir acompanhada de cheiro adocicado, perda de água no reservatório, óleo com aspecto de café com leite e temperatura subindo no painel.\n\n**Fumaça azulada**: é óleo queimando (anéis ou retentores de válvula). **Fumaça preta**: mistura rica, problema de injeção ou filtro de ar entupido.\n\nO que fazer agora:\n\n1. Desligue o motor assim que puder parar em local seguro — rodar com junta queimada destrói o motor em poucos quilômetros.\n2. Não abra o reservatório de água com o motor quente.\n3. Confira o nível do líquido de arrefecimento apenas depois de esfriar.\n4. Não tente completar com água e seguir viagem: se há fumaça densa, o líquido continuará indo para dentro do motor.\n5. Chame o guincho e leve o veículo até a oficina.\n\nRebocar é sempre mais barato do que retificar um motor. Nosso [auto socorro](/auto-socorro) atende 24 horas e faz a remoção com plataforma, sem forçar o motor.",
    faq: [
      { q: "Posso dirigir com fumaça branca saindo do escapamento?", a: "Se a fumaça é fina e some após o motor aquecer, sim. Se é densa, constante e há perda de água ou aumento de temperatura, não dirija: desligue o motor e chame guincho." },
      { q: "Fumaça branca sempre é junta de cabeçote?", a: "Não. Pode ser apenas condensação, radiador de óleo com falha ou trinca no cabeçote. O diagnóstico exige teste de compressão ou teste de gases no reservatório." },
      { q: "Quanto custa reboque nesse caso?", a: "O valor depende da distância e do tipo de veículo. Informamos o preço fechado por telefone antes de enviar a plataforma." }
    ]
  },
  {
    slug: "carro-trepidando-tremendo-causas-o-que-fazer",
    title: "Carro trepidando ou tremendo? Causas e o que fazer",
    excerpt: "Trepidação na marcha lenta, ao acelerar ou ao frear tem causas diferentes. Veja como identificar e quando é perigoso continuar dirigindo.",
    date: "27 de agosto de 2026",
    category: "Mecânica",
    content: "Trepidação quase nunca aparece do nada: é um aviso. O segredo do diagnóstico é observar **em que momento** o carro treme.\n\n**Treme parado, em marcha lenta**: velas ou cabos de vela gastos, bobina falhando, bicos injetores sujos, coxim do motor rompido ou sonda lambda com defeito. Costuma vir com a luz de injeção acesa.\n\n**Treme ao acelerar**: falha de ignição em um dos cilindros, filtro de combustível entupido, bomba de combustível fraca ou combustível adulterado.\n\n**Treme em alta velocidade (acima de 80 km/h)**: quase sempre balanceamento ou geometria das rodas, pneu deformado ou roda empenada.\n\n**Treme ao frear**: disco de freio empenado ou pastilhas desgastadas irregularmente.\n\n**Treme e o volante vibra forte com estalos**: suspeite de homocinética, rolamento de roda ou semieixo — este caso é o mais perigoso.\n\nO que fazer agora:\n\n1. Reduza a velocidade e evite rodovias até identificar a origem.\n2. Verifique se a luz de injeção está acesa no painel.\n3. Olhe os pneus: bolhas, deformações ou desgaste irregular explicam boa parte dos casos.\n4. Se a trepidação vier com barulho metálico, cheiro de queimado ou perda de potência, pare e chame socorro.\n\nTrepidação intensa com ruído estrutural não deve ser levada até a oficina rodando. Nesses casos, a [remoção veicular](/remocao-veicular) por plataforma evita um dano maior — e um acidente.",
    faq: [
      { q: "Trepidação só na marcha lenta é grave?", a: "Geralmente é falha de ignição ou injeção, algo reparável. Mas se persistir, aumenta o consumo e pode danificar o catalisador." },
      { q: "Posso rodar com o carro tremendo em alta velocidade?", a: "Reduza a velocidade e verifique pneus e rodas o quanto antes. Vibração em alta velocidade compromete a estabilidade e o controle em frenagens." }
    ]
  },
  {
    slug: "sinais-de-bateria-fraca-no-carro",
    title: "Sinais de bateria fraca: como identificar antes de ficar na mão",
    excerpt: "Partida lenta, luzes fracas e vidros elétricos preguiçosos são avisos. Veja os sinais de bateria no fim e o que fazer.",
    date: "26 de agosto de 2026",
    category: "Mecânica",
    content: "A bateria raramente morre sem avisar. Ela dá sinais por dias ou semanas antes de deixar você parado.\n\n**Sinais clássicos de bateria fraca**:\n\n- Motor de arranque gira devagar, com som arrastado ao dar partida.\n- Faróis e luzes do painel enfraquecem quando você liga o carro.\n- Vidros elétricos e trava central ficam lentos.\n- Painel multimídia reinicia sozinho.\n- Luz da bateria acesa no painel (pode ser bateria ou alternador).\n- Bateria com mais de 3 anos de uso, ou visor de carga escuro.\n\n**Bateria ou alternador?** Se o carro pega com chupeta e morre logo depois, o problema tende a ser o alternador, que não está recarregando. Se pega e continua funcionando normalmente, a bateria é a suspeita principal.\n\nO que fazer agora:\n\n1. Desligue ar-condicionado, som e faróis antes de tentar a partida.\n2. Verifique se os terminais estão limpos e apertados — sulfatação branca ou esverdeada atrapalha o contato.\n3. Não insista em partidas seguidas: você pode queimar o motor de arranque.\n4. Se der partida com chupeta, rode pelo menos 30 minutos em velocidade constante para recarregar.\n5. Bateria com mais de 4 anos: troque, não tente recuperar.\n\nSe o carro não pegar de jeito nenhum, nosso [auto socorro](/auto-socorro) leva equipamento com proteção eletrônica para dar carga sem risco aos módulos do veículo, ou faz a remoção quando necessário.",
    faq: [
      { q: "Quanto tempo dura a bateria do carro?", a: "Em média de 2 a 4 anos, dependendo do uso. Trajetos curtos e o carro parado por muitos dias reduzem bastante essa vida útil." },
      { q: "Chupeta pode danificar o carro?", a: "Sim, se feita com cabos ruins ou polaridade invertida pode queimar módulos eletrônicos. O ideal é usar equipamento profissional com proteção contra surtos." }
    ]
  },
  {
    slug: "cheiro-de-gasolina-no-carro-o-que-fazer",
    title: "Cheiro de gasolina no carro: risco de incêndio e o que fazer",
    excerpt: "Sentiu cheiro forte de combustível dentro ou perto do carro? Saiba as causas, o risco real e por que não se deve dar partida.",
    date: "25 de agosto de 2026",
    category: "Emergência",
    content: "Cheiro de gasolina é um dos poucos sintomas que exigem parada imediata. Vapor de combustível é inflamável e, em ambiente fechado, também é tóxico.\n\n**Causas mais comuns**:\n\n- Tampa do tanque mal fechada ou com borracha ressecada.\n- Mangueira ou linha de combustível ressecada e vazando.\n- Bico injetor com vazamento ou anel de vedação danificado.\n- Filtro de combustível mal instalado.\n- Canister (sistema de vapores) saturado.\n- Excesso de combustível após várias tentativas de partida — o famoso motor \"afogado\".\n\nO que fazer agora:\n\n1. **Não dê partida** e não fique tentando ligar o motor.\n2. Nada de cigarro, isqueiro ou fagulha por perto.\n3. Abra as janelas e saia do veículo com os ocupantes.\n4. Se estiver em garagem fechada, empurre o carro para área ventilada.\n5. Olhe embaixo do carro: poça ou gotejamento confirma vazamento.\n6. Verifique primeiro a tampa do tanque — é a causa mais boba e mais frequente.\n7. Se houver vazamento visível ou cheiro forte persistente, chame guincho. Não dirija.\n\nRemoção com plataforma é o método correto nesses casos: o motor fica desligado durante todo o transporte. Acione nosso [guincho 24 horas](/contato) e informe que há suspeita de vazamento de combustível para que a equipe vá preparada.",
    faq: [
      { q: "É perigoso dirigir com cheiro de gasolina?", a: "Sim. Há risco de incêndio pelo contato do combustível com partes quentes do motor e escapamento, além de intoxicação pelos vapores na cabine." },
      { q: "Cheiro de gasolina só ao abastecer é normal?", a: "Um cheiro leve logo após abastecer é comum. Se persistir por horas ou dias, verifique a tampa do tanque e o sistema de vapores." }
    ]
  },
  {
    slug: "problemas-na-ignicao-do-carro-sintomas-solucoes",
    title: "Problemas na ignição: sintomas, causas e soluções",
    excerpt: "Chave que não gira, botão start sem resposta ou motor que gira e não pega. Entenda a diferença e resolva.",
    date: "24 de agosto de 2026",
    category: "Mecânica",
    content: "\"Problema na ignição\" pode significar coisas bem diferentes. Identificar o comportamento exato acelera o conserto.\n\n**A chave não gira no cilindro**: trava da direção acionada. Gire o volante levemente para os dois lados enquanto tenta girar a chave. Também pode ser chave desgastada ou cilindro travado.\n\n**Gira a chave e nada acontece, nenhum som**: bateria totalmente descarregada, fusível, relé, comutador de ignição ou sistema imobilizador não reconhecendo a chave.\n\n**Clique seco e o motor não gira**: motor de arranque ou bateria sem corrente suficiente.\n\n**O motor gira mas não pega**: falta faísca ou combustível. Suspeite de velas, bobina, sensor de rotação, bomba de combustível ou pane seca.\n\n**Botão start não responde**: bateria da chave presencial fraca. Muitos modelos permitem encostar a chave no botão ou em um ponto específico do volante para leitura de emergência — confira no manual.\n\nO que fazer agora:\n\n1. Confira se o câmbio está em P ou N (automáticos) ou com o pedal de embreagem pisado (manuais).\n2. Teste a chave reserva: descarta imobilizador e chave com falha.\n3. Troque a bateria da chave presencial se o painel mostrar \"chave não detectada\".\n4. Não insista em mais de 3 ou 4 tentativas seguidas de partida.\n\nSe nada resolver, é caso de socorro no local ou remoção. Veja também nosso guia sobre [o que fazer quando o carro não liga](/blog/carro-nao-liga-principais-causas).",
    faq: [
      { q: "Por que a chave não gira na ignição?", a: "Na maioria das vezes é a trava da direção. Movimente o volante para os lados enquanto gira a chave suavemente." },
      { q: "O motor gira mas não pega, o que pode ser?", a: "Falta faísca ou combustível: velas, bobina, sensor de rotação, bomba de combustível ou simplesmente tanque vazio." }
    ]
  },
  {
    slug: "carro-parou-no-meio-da-rua-passo-a-passo",
    title: "Carro parou no meio da rua? Veja o passo a passo do que fazer agora",
    excerpt: "Parou no trânsito e não sai do lugar? Siga esta sequência para se proteger, sinalizar corretamente e liberar a via com segurança.",
    date: "23 de agosto de 2026",
    category: "Emergência",
    content: "Carro parado no meio da via urbana é risco de colisão traseira. A sequência abaixo prioriza a sua segurança, nesta ordem.\n\n**Passo 1 — Pisca-alerta imediatamente.** Antes de qualquer outra coisa, ligue o pisca-alerta.\n\n**Passo 2 — Aproveite a inércia.** Se o carro ainda estiver em movimento, use o embalo para chegar ao acostamento, a uma vaga ou à direita da via. Sem o motor, a direção fica pesada e o freio perde assistência: use mais força.\n\n**Passo 3 — Freio de mão e câmbio.** Puxe o freio de estacionamento; deixe em primeira marcha (manual) ou em P (automático).\n\n**Passo 4 — Triângulo.** Posicione a pelo menos 30 metros atrás do veículo em via urbana, e mais longe se houver curva ou lombada escondendo a visão.\n\n**Passo 5 — Só empurre se for seguro.** Nunca empurre sozinho em via movimentada, ladeira ou à noite sem colete refletivo. Peça ajuda ou aguarde o socorro.\n\n**Passo 6 — Onde esperar.** Em rua tranquila, permaneça no carro com cinto e portas travadas. Em avenida de tráfego rápido, saia pelo lado da calçada e aguarde afastado da pista.\n\n**Passo 7 — Chame o guincho com as informações certas.** Tenha em mãos: rua e número ou referência, sentido do tráfego, modelo do carro, se as rodas giram livres e se há vazamento.\n\n**Passo 8 — Diagnóstico rápido enquanto espera.** Painel apagou de vez? Provável bateria. Motor gira e não pega? Combustível ou ignição. Temperatura no vermelho? Não tente religar.\n\nNosso [guincho 24 horas](/contato) atende ocorrências urbanas com plataforma e patins para carros com rodas travadas, inclusive em garagens e vagas apertadas.",
    faq: [
      { q: "Posso deixar o carro parado na rua até o dia seguinte?", a: "Evite. Em vias com restrição, o veículo pode ser removido pela fiscalização e gerar multa mais pátio. O ideal é remover no mesmo dia." },
      { q: "A que distância devo colocar o triângulo?", a: "No mínimo 30 metros em via urbana. Em rodovias ou antes de curvas, aumente a distância para garantir visibilidade." }
    ]
  },
  {
    slug: "farois-fracos-no-carro-o-que-fazer",
    title: "O que fazer quando você percebe faróis fracos no carro?",
    excerpt: "Faróis amarelados ou que oscilam podem indicar alternador, bateria ou massa ruim. Veja como diagnosticar e o risco de rodar assim.",
    date: "22 de agosto de 2026",
    category: "Mecânica",
    content: "Farol fraco não é só desconforto: é infração e é risco. E, na maioria das vezes, é sintoma de um problema elétrico maior.\n\n**Causas mais comuns**:\n\n- **Alternador falhando**: os faróis enfraquecem em marcha lenta e melhoram ao acelerar. É o sinal mais confiável.\n- **Bateria no fim**: luzes fracas somadas a partida lenta.\n- **Mau contato de terra (massa)**: oscilação, principalmente em um lado só.\n- **Lâmpadas envelhecidas**: halógenas perdem até 30% de luminosidade com o tempo — troque sempre aos pares.\n- **Farol oxidado ou amarelado**: o policarbonato opaco bloqueia a luz; o polimento resolve.\n- **Regulagem baixa**: o facho aponta para o chão e parece fraco.\n\nComo diagnosticar em 1 minuto: com o carro ligado e parado, acele até cerca de 2.000 rpm. Se os faróis clarearem bastante, o problema é de geração de energia (alternador ou correia). Se não mudarem, suspeite de lâmpadas, farol opaco ou massa.\n\nO que fazer agora:\n\n1. Se a luz da bateria estiver acesa no painel, desligue consumos não essenciais (ar-condicionado, som, desembaçador) e vá direto à oficina mais próxima.\n2. À noite, com alternador falhando, o carro pode desligar a qualquer momento — não pegue rodovia.\n3. Se os faróis apagarem enquanto você dirige, ligue o pisca-alerta e pare em local seguro.\n\nCom bateria e alternador em falha, o veículo apagará em minutos. Chamar a [remoção veicular](/remocao-veicular) é mais seguro do que tentar chegar até a oficina no escuro.",
    faq: [
      { q: "Faróis fracos só em marcha lenta, o que é?", a: "Quase sempre alternador com baixa geração ou correia patinando. Se as luzes clareiam ao acelerar, esse é o diagnóstico mais provável." },
      { q: "Posso rodar à noite com farol fraco?", a: "Não é recomendado. Além de reduzir muito a visibilidade, farol com intensidade inadequada é infração de trânsito." }
    ]
  },
  {
    slug: "painel-do-carro-apaga-e-acende-o-que-fazer",
    title: "O que fazer quando o painel apaga e acende?",
    excerpt: "Painel piscando, luzes que somem e voltam ou reinício do multimídia indicam falha elétrica. Entenda as causas e o risco.",
    date: "21 de agosto de 2026",
    category: "Mecânica",
    content: "Painel que apaga e acende sozinho é sinal de instabilidade na alimentação elétrica. Ignorar leva a parada total do veículo, muitas vezes em movimento.\n\n**Causas mais comuns**:\n\n- **Terminal da bateria frouxo ou oxidado**: a causa número um. Basta uma trepidação para o contato falhar.\n- **Cabo de massa (terra) solto ou enferrujado** entre bateria, motor e carroceria.\n- **Alternador com diodo queimado**: gera tensão irregular, e o painel oscila conforme a rotação.\n- **Bateria interna em curto**: apaga ao acionar consumos como vidro ou seta.\n- **Chave de ignição / comutador desgastado**: apaga ao passar em buraco ou mexer na chave.\n- **Fusível ou relé com mau contato**.\n- **Módulo do painel com solda fria** (quando só o painel oscila e o resto funciona).\n\nTeste simples: com o motor desligado, tente girar os terminais da bateria com a mão. Se qualquer um se mexer, está frouxo — aperte e refaça o teste.\n\nO que fazer agora:\n\n1. Se acontecer em movimento, reduza, ligue o pisca-alerta e saia da via. Direção elétrica e freio assistido podem falhar junto.\n2. Não force o veículo com o painel piscando: sensores e módulos podem receber tensão irregular.\n3. Verifique terminais e cabo de massa antes de qualquer coisa.\n4. Se voltar a apagar depois do aperto, é caso de teste de alternador e bateria com multímetro.\n\nOscilação elétrica pode desligar o motor em plena via. Se acontecer, acione nosso [auto socorro 24h](/auto-socorro) em vez de tentar seguir viagem.",
    faq: [
      { q: "Painel piscando pode desligar o carro andando?", a: "Sim. Se a alimentação falhar por completo, o motor apaga e você perde assistência de direção e freio, o que é bastante perigoso." },
      { q: "É bateria ou alternador?", a: "Se oscila conforme a rotação do motor, suspeite do alternador. Se oscila com o carro parado ou ao acionar consumos, suspeite da bateria e dos terminais." }
    ]
  },
  {
    slug: "o-que-fazer-quando-o-carro-nao-liga-guia-completo",
    title: "O que fazer quando o carro não liga: guia completo em 7 passos",
    excerpt: "Roteiro prático para diagnosticar por que o carro não pega, com testes que você mesmo faz antes de chamar socorro.",
    date: "20 de agosto de 2026",
    category: "Mecânica",
    content: "Antes de chamar socorro, este roteiro de 7 passos resolve boa parte dos casos — e, quando não resolve, dá ao mecânico a informação certa.\n\n**Passo 1 — Ouça o que acontece ao girar a chave.** Silêncio total, um clique seco ou o motor girando sem pegar apontam para causas diferentes.\n\n**Passo 2 — Olhe o painel.** Luzes fortes indicam bateria com carga. Luzes fracas ou painel apagado indicam bateria ou terminal solto.\n\n**Passo 3 — Silêncio absoluto?** Verifique câmbio em P ou N, pedal de embreagem pisado, alarme travando a partida e bateria da chave presencial. Teste a chave reserva.\n\n**Passo 4 — Clique seco e motor não gira?** Bateria fraca ou motor de arranque. Aperte os terminais e tente novamente.\n\n**Passo 5 — Motor gira mas não pega?** Há energia; falta faísca ou combustível. Confira o nível de combustível (o marcador pode falhar), ouça o zumbido da bomba ao ligar a chave e considere velas ou sensor de rotação.\n\n**Passo 6 — Pegou e morreu logo?** Suspeite de sensor de rotação, imobilizador ou bomba de combustível fraca.\n\n**Passo 7 — Cheiro de combustível?** Motor afogado. Não insista: pise fundo no acelerador e dê partida por alguns segundos, ou aguarde 15 minutos antes de tentar de novo. Se o cheiro for forte, [pare e leia isto](/blog/cheiro-de-gasolina-no-carro-o-que-fazer).\n\nRegra de ouro: nunca dê mais de 4 tentativas seguidas de partida. Você descarrega a bateria e pode superaquecer o motor de arranque.\n\nSe nada funcionar, nosso [auto socorro](/auto-socorro) tenta o reparo no local; quando não é possível, a remoção com plataforma acontece na mesma visita.",
    faq: [
      { q: "O carro não liga mas a bateria está boa. O que pode ser?", a: "Motor de arranque, sensor de rotação, bomba de combustível, imobilizador ou falta de combustível. O comportamento ao girar a chave é a melhor pista." },
      { q: "Quantas vezes posso tentar dar partida?", a: "No máximo 3 ou 4 tentativas de poucos segundos, com intervalos. Insistir descarrega a bateria e danifica o motor de arranque." }
    ]
  },
  {
    slug: "cheiro-de-queimado-no-motor-o-que-fazer",
    title: "O que fazer quando o carro apresenta cheiro de queimado no motor?",
    excerpt: "Cheiro de borracha, óleo ou plástico queimado tem significados diferentes. Saiba identificar e quando parar imediatamente.",
    date: "19 de agosto de 2026",
    category: "Emergência",
    content: "O tipo de cheiro é a melhor pista para descobrir o que está queimando — e para decidir se dá para seguir ou se é hora de parar.\n\n**Cheiro de borracha queimada**: correia patinando, mangueira encostada no escapamento ou embreagem sendo forçada em subidas e no trânsito.\n\n**Cheiro de óleo queimado**: vazamento de óleo caindo no coletor ou no escapamento quente. Costuma vir com fumaça azulada saindo do capô.\n\n**Cheiro de plástico ou fio queimado**: curto-circuito. É o mais perigoso — pode evoluir para incêndio em minutos.\n\n**Cheiro adocicado com vapor branco**: vazamento de líquido de arrefecimento, geralmente com superaquecimento junto.\n\n**Cheiro forte de enxofre / ovo podre**: catalisador saturado ou bateria em sobrecarga.\n\n**Cheiro de queimado ao frear**: pastilhas de freio superaquecidas ou freio de mão parcialmente puxado.\n\nO que fazer agora:\n\n1. Pare em local seguro e desligue o motor. Cheiro de fio queimado ou fumaça exige parada imediata.\n2. **Não abra o capô de imediato** se houver fumaça densa: a entrada de ar pode alimentar as chamas. Aguarde e afaste-se.\n3. Não abra o reservatório de arrefecimento com o motor quente.\n4. Havendo faíscas, fumaça saindo do painel ou cheiro elétrico forte, tire todos do veículo e desligue a chave.\n5. Não tente seguir até a oficina. Chame o guincho.\n\nCheiro de queimado é o estágio anterior a um princípio de incêndio. A remoção com o motor desligado é o único jeito seguro de tirar o carro dali: acione nosso [guincho 24 horas](/contato) e informe o tipo de cheiro percebido.",
    faq: [
      { q: "Cheiro de queimado no motor pode causar incêndio?", a: "Sim, principalmente quando é cheiro de fio ou plástico queimado, que indica curto-circuito, ou quando há óleo pingando no escapamento quente." },
      { q: "Posso dirigir até a oficina com cheiro de queimado?", a: "Não é recomendado. Com o motor ligado o problema piora rapidamente. O correto é remover o veículo com plataforma." }
    ]
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
