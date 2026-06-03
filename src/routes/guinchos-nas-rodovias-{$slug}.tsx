import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  Truck, 
  AlertTriangle,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

const SITE_URL = "https://sosguincho24horas.com.br";

type HighwayInfo = {
  name: string;
  slug: string;
  sigla?: string;
  region: string;
  description: string;
  features: string[];
  faq: { q: string; a: string }[];
  cities: string[];
  connections?: string[]; // Novos links para rodovias conectadas
};

const HIGHWAYS_DATA: Record<string, HighwayInfo> = {
  "marginal-tiete": {
    name: "Marginal Tietê",
    slug: "marginal-tiete",
    sigla: "SP-015",
    region: "São Paulo, SP",
    description: "Principal via expressa de São Paulo, conectando as rodovias Castello Branco, Anhanguera, Bandeirantes, Dutra e Fernão Dias. Atendemos todos os trechos (Norte, Leste, Oeste) com prontidão 24h.",
    features: ["Atendimento em até 20 minutos", "Equipes em pontos estratégicos", "Guincho leve e pesado"],
    faq: [
      { q: "Qual o tempo de chegada na Marginal Tietê?", a: "Pela nossa presença estratégica, o tempo médio de chegada é de 15 a 25 minutos em qualquer trecho da Marginal." },
      { q: "Atendem veículos pesados na Marginal?", a: "Sim, possuímos guinchos de grande porte para caminhões e ônibus, respeitando os horários de restrição da via." }
    ],
    cities: ["sao-paulo-sp", "guarulhos-sp", "osasco-sp"]
  },
  "rodovia-castelo-branco": {
    name: "Rodovia Castelo Branco",
    slug: "rodovia-castelo-branco",
    sigla: "SP-280",
    region: "São Paulo e Interior",
    description: "Principal ligação entre a capital e o oeste paulista. Cobertura completa desde o início na Marginal Pinheiros até Sorocaba e região.",
    features: ["Atendimento 24h em rodovia", "Socorro mecânico no local", "Transporte seguro para longas distâncias"],
    faq: [
      { q: "Atendem próximo ao pedágio de Barueri?", a: "Sim, temos bases próximas a Alphaville e Barueri para atendimento imediato na Castello Branco." },
      { q: "Fazem transporte interestadual a partir da Castello?", a: "Sim, realizamos remoções para qualquer lugar do Brasil com agendamento ou emergência." }
    ],
    cities: ["sao-paulo-sp", "barueri-sp", "osasco-sp", "itapevi-sp", "sorocaba-sp"],
    connections: ["marginal-tiete", "marginal-pinheiros", "rodovia-raposo-tavares", "rodoanel-mario-covas"]
  },
  "rodovia-fernao-dias": {
    name: "Rodovia Fernão Dias",
    slug: "rodovia-fernao-dias",
    sigla: "BR-381",
    region: "SP / MG",
    description: "Conexão vital entre São Paulo e Belo Horizonte. Atendimento especializado em trechos de serra e áreas urbanas de Guarulhos e Mairiporã.",
    features: ["Especialistas em trechos de serra", "Guincho pesado para cargas", "Atendimento em Guarulhos e Mairiporã"],
    faq: [
      { q: "Atendem na Serra da Cantareira / Fernão Dias?", a: "Sim, nossa equipe conhece bem os trechos sinuosos da Fernão Dias e opera com segurança máxima." },
      { q: "O guincho atende até Atibaia?", a: "Sim, cobrimos toda a extensão da Fernão Dias de São Paulo até a divisa com Minas Gerais." }
    ],
    cities: ["sao-paulo-sp", "guarulhos-sp", "mairipora-sp", "atibaia-sp", "braganca-paulista-sp"]
  },
  "rodovia-presidente-dutra": {
    name: "Rodovia Presidente Dutra",
    slug: "rodovia-presidente-dutra",
    sigla: "BR-116",
    region: "SP / RJ",
    description: "A rodovia mais importante do Brasil, ligando São Paulo ao Rio de Janeiro. Cobertura total no Vale do Paraíba e Região Metropolitana.",
    features: ["Bases em todo o Vale do Paraíba", "Atendimento rápido em Guarulhos", "Suporte para panes em alta velocidade"],
    faq: [
      { q: "Qual a cobertura na Dutra?", a: "Atendemos de São Paulo a Aparecida, passando por todas as cidades do Vale do Paraíba." },
      { q: "Atendem pane seca na Dutra?", a: "Sim, levamos combustível ou rebocamos até o posto mais próximo com rapidez." }
    ],
    cities: ["sao-paulo-sp", "guarulhos-sp", "aruja-sp", "sao-jose-dos-campos-sp", "taubate-sp"]
  },
  "rodovia-carvalho-pinto": {
    name: "Rodovia Carvalho Pinto",
    slug: "rodovia-carvalho-pinto",
    sigla: "SP-070",
    region: "Vale do Paraíba",
    description: "Alternativa moderna e rápida para o Vale do Paraíba e Litoral Norte. Atendimento em toda a extensão duplicada.",
    features: ["Resgate ágil em pista dupla", "Conexão com a Tamoios", "Segurança em alta velocidade"],
    faq: [
      { q: "Atendem no entroncamento com a Tamoios?", a: "Sim, temos unidades posicionadas estrategicamente próximas às saídas para o litoral." },
      { q: "O guincho chega rápido em Jacareí?", a: "Sim, Jacareí é um dos nossos pontos focais na Carvalho Pinto." }
    ],
    cities: ["sao-jose-dos-campos-sp", "jacarei-sp", "taubate-sp", "cacapava-sp"]
  },
  "rodovia-dos-imigrantes": {
    name: "Rodovia dos Imigrantes",
    slug: "rodovia-dos-imigrantes",
    sigla: "SP-160",
    region: "Capital / Litoral",
    description: "Principal via de acesso à Baixada Santista. Especialistas em remoção no trecho de serra e túneis.",
    features: ["Experiência em trechos de serra", "Atendimento em túneis", "Guincho para carros e motos"],
    faq: [
      { q: "Atendem guincho na descida da Imigrantes?", a: "Sim, operamos em todo o Sistema Anchieta-Imigrantes com equipamentos de alta performance." },
      { q: "Fazem transporte de Santos para SP?", a: "Sim, realizamos o trajeto inverso com segurança para veículos avariados." }
    ],
    cities: ["sao-paulo-sp", "sao-bernardo-do-campo-sp", "santos-sp", "sao-vicente-sp"]
  },
  "rodovia-anchieta": {
    name: "Rodovia Anchieta",
    slug: "rodovia-anchieta",
    sigla: "SP-150",
    region: "Capital / Litoral",
    description: "Via histórica e vital para o transporte de cargas para o Porto de Santos. Guincho pesado e leve 24h.",
    features: ["Especialistas em guincho pesado", "Atendimento no ABC Paulista", "Segurança em curvas acentuadas"],
    faq: [
      { q: "Atendem caminhões na Anchieta?", a: "Sim, somos referência em reboque de veículos pesados no trecho de serra da Anchieta." },
      { q: "Qual o tempo de chegada em São Bernardo?", a: "Em média 20 a 30 minutos na região da Anchieta no ABC." }
    ],
    cities: ["sao-paulo-sp", "sao-bernardo-do-campo-sp", "diadema-sp", "santos-sp"]
  },
  "rodovia-anhanguera": {
    name: "Rodovia Anhanguera",
    slug: "rodovia-anhanguera",
    sigla: "SP-330",
    region: "São Paulo / Interior",
    description: "Um dos principais eixos econômicos de SP. Atendimento da Capital até Campinas e região.",
    features: ["Cobertura total na região de Jundiaí", "Socorro em Campinas e RMC", "Bases em trechos estratégicos"],
    faq: [
      { q: "Atendem na Anhanguera em Campinas?", a: "Sim, cobrimos todo o trecho urbano de Campinas e as saídas para o interior." },
      { q: "O guincho é 24h mesmo?", a: "Sim, operamos ininterruptamente na Anhanguera, inclusive feriados." }
    ],
    cities: ["sao-paulo-sp", "osasco-sp", "jundiai-sp", "campinas-sp", "limeira-sp"]
  },
  "rodoanel-mario-covas": {
    name: "Rodoanel Mario Covas",
    slug: "rodoanel-mario-covas",
    sigla: "SP-021",
    region: "Grande São Paulo",
    description: "Anel viário que circunda a capital. Atendemos todos os trechos: Sul, Leste, Oeste e Norte.",
    features: ["Rapidez em trechos expressos", "Atendimento em todas as alças", "Interconexão entre rodovias"],
    faq: [
      { q: "Atendem no Rodoanel Sul?", a: "Sim, cobrimos toda a extensão Sul conectando o ABC à região da Imigrantes." },
      { q: "O guincho chega rápido nas alças de acesso?", a: "Nossas equipes conhecem todos os acessos do Rodoanel para chegada rápida." }
    ],
    cities: ["sao-paulo-sp", "guarulhos-sp", "sao-bernardo-do-campo-sp", "barueri-sp", "maua-sp"],
    connections: ["rodovia-presidente-dutra", "rodovia-fernao-dias", "rodovia-castelo-branco", "rodovia-raposo-tavares", "rodovia-dos-imigrantes", "rodovia-anchieta", "rodovia-dos-bandeirantes", "rodovia-anhanguera"]
  },
  "rodovia-ayrton-senna": {
    name: "Rodovia Ayrton Senna",
    slug: "rodovia-ayrton-senna",
    sigla: "SP-070",
    region: "São Paulo / Vale",
    description: "Porta de entrada para o Vale do Paraíba e Aeroporto de Guarulhos. Atendimento ágil e seguro.",
    features: ["Próximo ao Aeroporto de Guarulhos", "Conexão Marginal Tietê", "Atendimento 24h"],
    faq: [
      { q: "Atendem guincho perto do Aeroporto?", a: "Sim, temos unidades fixas na região para socorro imediato na Ayrton Senna." },
      { q: "Fazem reboque até o Vale do Paraíba?", a: "Sim, realizamos o transporte completo pela Ayrton Senna e Carvalho Pinto." }
    ],
    cities: ["sao-paulo-sp", "guarulhos-sp", "itaco-sp", "jacarei-sp"]
  },
  "rodovia-raposo-tavares": {
    name: "Rodovia Raposo Tavares",
    slug: "rodovia-raposo-tavares",
    sigla: "SP-270",
    region: "São Paulo / Interior",
    description: "Ligação importante da zona oeste da capital com Cotia e Sorocaba. Atendimento especializado em trechos urbanos e rodoviários.",
    features: ["Suporte na região de Cotia", "Atendimento na Zona Oeste de SP", "Guincho para qualquer distância"],
    faq: [
      { q: "Atendem na Raposo em Cotia?", a: "Sim, nossa base na região atende rapidamente todo o trecho de Cotia e Vargem Grande." },
      { q: "O guincho pode levar até Sorocaba?", a: "Sim, fazemos o transporte completo pela Raposo Tavares com segurança." }
    ],
    cities: ["sao-paulo-sp", "cotia-sp", "vargem-grande-paulista-sp", "sorocaba-sp"]
  },
  "rodovia-dos-bandeirantes": {
    name: "Rodovia dos Bandeirantes",
    slug: "rodovia-dos-bandeirantes",
    sigla: "SP-348",
    region: "São Paulo / Interior",
    description: "Considerada uma das melhores rodovias do país. Atendimento de alta performance para veículos modernos e importados.",
    features: ["Transporte para veículos importados", "Plataformas hidráulicas novas", "Agilidade em pista expressa"],
    faq: [
      { q: "Atendem veículos baixos / esportivos?", a: "Sim, temos guinchos com plataforma baixa para veículos esportivos e rebaixados." },
      { q: "Qual o tempo para Campinas via Bandeirantes?", a: "Nosso tempo de resposta na Bandeirantes é um dos mais rápidos do estado." }
    ],
    cities: ["sao-paulo-sp", "jundiai-sp", "campinas-sp", "hortolandia-sp"]
  },
  "marginal-pinheiros": {
    name: "Marginal Pinheiros",
    slug: "marginal-pinheiros",
    region: "São Paulo, SP",
    description: "Eixo vital da Zona Sul e Oeste de São Paulo. Atendemos os trechos Sul e Oeste com máxima agilidade para não travar o trânsito.",
    features: ["Atendimento prioritário na Zona Sul", "Suporte em áreas de alto fluxo", "Guincho 24h para motos e carros"],
    faq: [
      { q: "Atendem próximo à Ponte Estaiada?", a: "Sim, temos equipes baseadas na região do Brooklin e Itaim para socorro rápido." },
      { q: "Qual o tempo de chegada no horário de pico?", a: "Mesmo com trânsito, utilizamos rotas alternativas para chegar em até 30 minutos." }
    ],
    cities: ["sao-paulo-sp", "santo-amaro-sp", "itaim-bibi-sp", "morumbi-sp"],
    connections: ["marginal-tiete", "rodovia-castelo-branco", "rodovia-dos-imigrantes", "rodovia-anchieta", "rodovia-raposo-tavares"]
  }
};

export const Route = createFileRoute("/guinchos-nas-rodovias-{$slug}")({
  loader: ({ params }) => {
    const data = HIGHWAYS_DATA[params.slug];
    if (!data) throw notFound();
    return { data };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { data } = loaderData;
    const title = `Guincho 24h na ${data.name}${data.sigla ? ` (${data.sigla})` : ""} | Reboque Rápido`;
    const description = `Precisa de guincho na ${data.name}? Atendimento 24 horas para carros, motos e pesados. Chegada rápida, preço justo e profissionais qualificados na ${data.region}.`;
    const url = `https://sosguincho24horas.com.br/guinchos-nas-rodovias-${data.slug}`;
    
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: `guincho ${data.name}, reboque ${data.name}, auto socorro ${data.name}, guincho 24h ${data.sigla || data.name}, guincho em ${data.region}` },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: HighwayPage,
});

function HighwayPage() {
  const { data } = Route.useLoaderData();
  const telHref = `tel:${SITE.phone.replace(/\D/g, "")}`;
  const whatsappUrl = `https://w.app/guincho24horas`;

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: "/" },
          { name: "Rodovias Atendidas", url: "/rodovias-vale-do-paraiba" },
          { name: data.name, url: `/guinchos-nas-rodovias-${data.slug}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "name": `Guincho 24h na ${data.name}`,
                "description": `Serviço de guincho e reboque 24 horas para carros, motos e veículos pesados na ${data.name}.`,
                "provider": {
                  "@type": "LocalBusiness",
                  "name": SITE.name,
                  "telephone": SITE.phone,
                  "url": SITE_URL,
                  "image": "https://sosguincho24horas.com.br/assets/imagem-do-guincho.webp",
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": data.region.split(',')[0],
                    "addressRegion": "SP",
                    "addressCountry": "BR"
                  }
                },
                "areaServed": data.cities.map((c: string) => ({
                  "@type": "City",
                  "name": c.split('-').slice(0, -1).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                })),
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Serviços de Guincho em Rodovia",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Guincho Plataforma",
                        "description": "Reboque para carros de passeio e utilitários."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Guincho Pesado",
                        "description": "Socorro para caminhões e ônibus."
                      }
                    }
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": data.faq.map((f: { q: string, a: string }) => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a
                  }
                }))
              }
            ]
          })
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/rodovias-vale-do-paraiba">Rodovias</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <section className="rounded-3xl bg-[image:var(--gradient-hero,linear-gradient(135deg,hsl(var(--secondary)),hsl(var(--background))))] p-8 md:p-16 mb-12 border border-border/40 shadow-xl overflow-hidden relative">
          <div className="relative z-10 max-w-3xl">
            <Badge className="mb-4 bg-accent text-primary border-none text-sm px-4 py-1">
              Atendimento 24 Horas
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-accent">
              Guincho na {data.name}
              {data.sigla && <span className="block text-2xl md:text-3xl opacity-80 mt-2">{data.sigla}</span>}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {data.description} Oferecemos suporte completo para panes, colisões e transporte veicular com o melhor tempo de resposta da região.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary font-bold shadow-lg hover:opacity-95 text-lg h-14 px-8">
                <a href={telHref}>
                  <Phone className="mr-2 h-5 w-5" /> Ligar Agora
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5 text-green-500" /> WhatsApp
                </a>
              </Button>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Chegada em ~30min
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Seguro para Carga
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> Nota 4.9/5
              </span>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" /> Diferenciais na {data.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {data.features.map((feature: string) => (
                  <Card key={feature} className="bg-muted/30 border-none">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-semibold text-sm">{feature}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Conexões e Trechos Próximos */}
            {data.connections && data.connections.length > 0 && (
              <section className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-primary" /> Conexões e Trechos Próximos
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {data.connections.map((connSlug: string) => {
                    const conn = HIGHWAYS_DATA[connSlug];
                    if (!conn) return null;
                    return (
                      <Link
                        key={connSlug}
                        to="/guinchos-nas-rodovias-{$slug}"
                        params={{ slug: connSlug }}
                        className="flex items-center justify-between p-3 bg-background rounded-xl border border-border/60 hover:border-primary transition-all group"
                      >
                        <span className="text-sm font-semibold">{conn.name}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Information Card */}
            <Card className="border-border/40 shadow-sm overflow-hidden">
              <CardHeader className="bg-muted/20">
                <CardTitle>Socorro Especializado 24h</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Sabemos que parar em uma rodovia movimentada como a <strong>{data.name}</strong> é uma situação de risco e estresse. Por isso, mantemos unidades de prontidão estrategicamente posicionadas para reduzir ao máximo o tempo de espera.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Seja uma pane seca, problema mecânico, pneu furado ou colisão, nossos guinchos plataforma estão equipados com o que há de mais moderno para garantir que seu veículo seja transportado sem danos adicionais.
                </p>
                <div className="flex items-start gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-yellow-900">Segurança em Primeiro Lugar</h4>
                    <p className="text-sm text-yellow-800">Se o seu veículo parou na pista, ligue o pisca-alerta, saia do veículo pelo lado do passageiro e aguarde em local seguro fora do acostamento até a chegada do guincho.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" /> Cobertura na {data.name}
              </h2>
              <div className="overflow-hidden rounded-2xl border border-border/60 shadow-lg bg-muted/20 relative group">
                <iframe
                  title={`Mapa de cobertura na ${data.name}`}
                  src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d200000!2d-46.6!3d-23.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sguincho+24h+${encodeURIComponent(data.name)}!5e0!3m2!1spt-BR!2sbr!4v1717430400000!5m2!1spt-BR!2sbr`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-background/95 backdrop-blur-sm text-foreground border shadow-sm px-3 py-1.5 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Unidades de prontidão nesta rota
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center italic">
                * Mapa ilustrativo. Nossas bases móveis circulam constantemente pela {data.name} para garantir o menor tempo de espera.
              </p>
            </section>

            {/* FAQ */}
            <section>
               <SeoBlock 
                badge="FAQ - Dúvidas Comuns"
                title={`Perguntas sobre guincho na ${data.name}`}
                paragraphs={[`Confira as principais dúvidas de quem precisa de reboque na ${data.name} e região.`]}
                faqs={data.faq}
              />
            </section>

            {/* Cidades Atendidas na Rota */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Cidades atendidas nesta rota</h2>
              <div className="flex flex-wrap gap-2">
                {data.cities.map((citySlug: string) => {
                  const name = citySlug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace(' Sp', ' (SP)');
                  return (
                    <Link
                      key={citySlug}
                      to="/guincho-em-{$slug}"
                      params={{ slug: citySlug }}
                      className="px-4 py-2 bg-secondary/50 rounded-full border hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 group"
                    >
                      <MapPin className="h-4 w-4 text-primary group-hover:text-white" />
                      <span className="text-sm font-medium">{name}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="sticky top-24 border-primary/20 shadow-lg">
              <CardContent className="p-6 space-y-6 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Plantão de Emergência</h3>
                  <p className="text-muted-foreground text-sm mb-4">Clique abaixo para falar direto com nossa central 24h</p>
                  <Button asChild className="w-full bg-[image:var(--gradient-cta)] text-primary font-bold h-12">
                    <a href={telHref}>{SITE.phone}</a>
                  </Button>
                </div>
                <div className="border-t pt-6">
                  <h4 className="font-bold mb-4">Principais Rodovias</h4>
                  <ul className="space-y-2 text-left">
                    {Object.values(HIGHWAYS_DATA).filter(h => h.slug !== data.slug).map((h: HighwayInfo) => (
                      <li key={h.slug}>
                        <Link to="/guinchos-nas-rodovias-{$slug}" params={{ slug: h.slug }} className="text-sm hover:text-primary flex items-center gap-1 group">
                          <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                          {h.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/rodovias-vale-do-paraiba" className="block text-primary text-sm font-bold mt-4 hover:underline">
                    Rodovias Vale do Paraíba →
                  </Link>
                  <Link to="/servicos-de-guincho-e-reboque" className="block text-primary text-sm font-bold mt-2 hover:underline">
                    Ver cidades atendidas →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 shadow-sm">
              <CardContent className="p-6">
                <h4 className="font-bold mb-4">Cidades Estratégicas</h4>
                <div className="flex flex-wrap gap-2">
                   {["sao-paulo-sp", "guarulhos-sp", "campinas-sp", "sao-jose-dos-campos-sp", "santos-sp"].map(city => (
                     <Link 
                       key={city} 
                       to="/guincho-em-{$slug}" 
                       params={{ slug: city }}
                       className="text-xs font-medium bg-muted hover:bg-primary hover:text-white px-2 py-1 rounded transition-colors"
                     >
                       Guincho em {city.split('-').slice(0, -1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                     </Link>
                   ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <LazyTestimonialsCarousel />
    </div>
  );
}
