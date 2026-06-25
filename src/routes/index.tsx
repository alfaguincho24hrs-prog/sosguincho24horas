import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Clock, ShieldCheck, MapPin, Star, ArrowRight, Truck, Wrench, Zap, MessageCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE, SERVICES, PARTNERS, CAPITAIS, CIDADES_SP } from "@/components/site-data";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { LocationsGrid } from "@/components/locations-grid";
import heroImg from "@/assets/reboque.webp";
import heroImgWebp from "@/assets/reboque.webp?url";


const PartnersCarousel = lazy(() => import("@/components/partners-carousel"));

// FAQ específico para São Paulo capital e principais cidades do Estado de SP
const FAQ_SP = [
  {
    q: "Vocês atendem guincho 24 horas em toda a cidade de São Paulo capital?",
    a: "Sim. Operamos 24h nas Zonas Norte, Sul, Leste, Oeste e Centro de São Paulo, incluindo Marginal Tietê, Marginal Pinheiros, Av. Paulista, 23 de Maio, Radial Leste, Av. Bandeirantes, Faria Lima e principais bairros como Moema, Pinheiros, Tatuapé, Mooca, Santana, Lapa, Morumbi e Jardins.",
  },
  {
    q: "Quanto tempo leva o guincho para chegar em São Paulo capital?",
    a: "O tempo médio de chegada em São Paulo capital é de 25 a 40 minutos, dependendo do trânsito e da zona. Em horários de pico ou regiões mais distantes das marginais, pode chegar a 45 minutos. Operamos com bases distribuídas em todas as zonas da cidade.",
  },
  {
    q: "Qual o valor de um guincho na cidade de São Paulo?",
    a: "Em São Paulo capital, o valor médio do guincho urbano fica entre R$ 180 e R$ 400, conforme distância (KM rodados), tipo de veículo (leve, moto ou pesado) e horário (diurno, noturno ou feriado). O orçamento é informado pelo WhatsApp antes do envio do guincho.",
  },
  {
    q: "Vocês atendem na Grande SP, ABC e Vale do Paraíba?",
    a: "Sim. Cobrimos toda a Grande São Paulo (Guarulhos, Osasco, Barueri, Mogi das Cruzes), ABC (Santo André, São Bernardo, São Caetano, Diadema, Mauá), Vale do Paraíba (São José dos Campos, Taubaté, Jacareí, Pindamonhangaba, Guaratinguetá) e Litoral Norte (Caraguatatuba, Ubatuba, São Sebastião, Ilhabela).",
  },
  {
    q: "Atendem em Campinas, Sorocaba, Santos, Ribeirão Preto e Bauru?",
    a: "Sim. Atendemos as principais cidades do interior e litoral paulista: Campinas, Jundiaí, Indaiatuba, Sorocaba, Itu, Santos, São Vicente, Praia Grande, Guarujá, Ribeirão Preto, Franca, São José do Rio Preto, Bauru, Marília, Piracicaba, Limeira, Araraquara e São Carlos.",
  },
  {
    q: "Quais rodovias do Estado de SP têm cobertura prioritária?",
    a: "Atendemos com prioridade Rodovia Presidente Dutra (BR-116), Ayrton Senna / Carvalho Pinto (SP-070), Tamoios (SP-099), Anhanguera (SP-330), Bandeirantes (SP-348), Castello Branco (SP-280), Raposo Tavares (SP-270), Anchieta (SP-150), Imigrantes (SP-160), Régis Bittencourt e Fernão Dias.",
  },
  {
    q: "Atendem Campos do Jordão e a Serra da Mantiqueira?",
    a: "Sim. Temos cobertura em Campos do Jordão, Santo Antônio do Pinhal, São Bento do Sapucaí e toda a região serrana, com equipamentos preparados para descidas íngremes e curvas fechadas da Floriano Rodrigues Pinheiro (SP-123) e da Oswaldo Cruz (SP-125).",
  },
  {
    q: "Como solicitar guincho em uma cidade específica de São Paulo?",
    a: "Basta clicar no botão WhatsApp informando o endereço exato (cidade, bairro, rua e referência) e o tipo de veículo. Você recebe o orçamento na hora e o guincho mais próximo da sua localização é despachado imediatamente.",
  },
];



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guincho 24h em São Paulo Capital e Interior | SOS Guincho 24 Horas" },
      { name: "description", content: "Guincho 24 horas em São Paulo capital, Campinas, Santos, Sorocaba, São José dos Campos, Ribeirão Preto e principais cidades de SP. Chegamos em até 40 min. Orçamento na hora pelo WhatsApp." },
      { name: "keywords", content: "guincho 24 horas São Paulo, guincho SP capital, reboque São Paulo, guincho Campinas, guincho Santos, guincho Sorocaba, guincho São José dos Campos, guincho Ribeirão Preto, guincho Vale do Paraíba, auto socorro SP" },
      { property: "og:title", content: "Guincho 24h em São Paulo Capital e Principais Cidades do Estado" },
      { property: "og:description", content: "Atendimento de guincho 24h na capital paulista e nas principais cidades do Estado de SP — Grande SP, ABC, Litoral, Vale do Paraíba e Interior. Chegada em até 40 minutos." },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { property: "og:url", content: "https://sosguincho24horas.com.br/" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:title", content: "Guincho 24h em São Paulo Capital e Principais Cidades de SP" },
      { name: "twitter:description", content: "SOS guincho 24h na capital paulista, Grande SP, ABC, Litoral, Vale do Paraíba e Interior. Atendimento em até 40 min via WhatsApp." },
      { name: "geo.region", content: "BR-SP" },
      { name: "geo.placename", content: "São Paulo" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `https://sosguincho24horas.com.br/index.html`,
          "url": `https://sosguincho24horas.com.br/`,
          "name": SITE.name,
          "image": "https://sosguincho24horas.com.br/assets/reboque.webp",
          "telephone": SITE.phone,
          "priceRange": "$$",
          "description": "Serviço de guincho 24 horas, reboque de carros e motos, auto socorro mecânico e remoção de veículos. Atendimento rápido em SP e Vale do Paraíba.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Praça Dom Epaminondas, 1-4 sala 104",
            "addressLocality": "Taubaté",
            "addressRegion": "SP",
            "postalCode": "12010-090",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -23.026389,
            "longitude": -45.555556
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          },
          "areaServed": [
            { "@type": "City", "name": "São Paulo", "@id": "https://www.wikidata.org/wiki/Q174" },
            { "@type": "City", "name": "Campinas" },
            { "@type": "City", "name": "Santos" },
            { "@type": "City", "name": "Sorocaba" },
            { "@type": "City", "name": "Ribeirão Preto" },
            { "@type": "City", "name": "São José do Rio Preto" },
            { "@type": "City", "name": "Bauru" },
            { "@type": "City", "name": "Piracicaba" },
            { "@type": "City", "name": "Jundiaí" },
            { "@type": "City", "name": "São José dos Campos" },
            { "@type": "City", "name": "Taubaté" },
            { "@type": "City", "name": "Jacareí" },
            { "@type": "City", "name": "Pindamonhangaba" },
            { "@type": "City", "name": "Guarulhos" },
            { "@type": "City", "name": "Osasco" },
            { "@type": "City", "name": "Barueri" },
            { "@type": "City", "name": "Santo André" },
            { "@type": "City", "name": "São Bernardo do Campo" },
            { "@type": "City", "name": "Mogi das Cruzes" },
            { "@type": "City", "name": "Caraguatatuba" },
            { "@type": "City", "name": "Ubatuba" },
            { "@type": "City", "name": "São Sebastião" },
            { "@type": "City", "name": "Campos do Jordão" },
            { "@type": "City", "name": "Atibaia" },
            { "@type": "AdministrativeArea", "name": "Estado de São Paulo" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços de Guincho",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Guincho para Carros" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Guincho para Motos" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Guincho Pesado" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auto Socorro Mecânico" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pane Seca" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Remoção Veicular" } }
            ]
          }
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_SP.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        }),
      },
    ],
    links: [
      { rel: "canonical", href: "https://sosguincho24horas.com.br" },
      { rel: "preload", as: "image", href: heroImgWebp, fetchPriority: "high", type: "image/webp" },
      { rel: "preconnect", href: "https://w.app" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Serviço de guincho 24 horas e reboque plataforma para carros e motos em rodovias"
            className="h-full w-full object-cover"
            width={1200}
            height={800}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-90" />
        </div>
        <div className="container relative mx-auto grid gap-10 px-4 py-24 md:grid-cols-2 md:py-36">
          <div className="space-y-6 text-primary-foreground">
            <Badge className="border-accent/40 bg-accent/15 text-accent hover:bg-accent/20">
              <Clock className="h-3 w-3" /> Atendimento 24h · 7 dias por semana
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              <span className="inline-block bg-[image:var(--gradient-cta)] bg-clip-text text-transparent mr-2">SOS</span>
              <span className="inline-block mr-2 text-accent">Guincho e Reboque</span>
              <span className="inline-block bg-[image:var(--gradient-cta)] bg-clip-text text-transparent">24 horas</span>
            </h1>
            <p className="max-w-xl text-lg text-primary-foreground/85">
              Conectamos motoristas a empresas de auto socorro qualificadas, com chegada rápida na rodovia ou na cidade. Resgate seu veículo com segurança e tranquilidade.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
                <a href="https://wa.me/5511996451510"><Phone className="h-5 w-5" /> Solicitar guincho agora</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/cobertura">Ver cidades atendidas <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Empresas verificadas</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Mais de 200 cidades</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-accent" /> Avaliação 4.8/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 max-w-2xl">
          <Badge variant="secondary" className="mb-3">Nossos serviços</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent">Soluções completas em reboque e auto socorro</h2>
          <p className="mt-3 text-muted-foreground">
            Da pane simples ao resgate de veículos pesados, encontre o serviço ideal para a sua emergência com profissionais experientes.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.slug} className="group relative overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <CardContent className="flex h-full flex-col space-y-3 p-6">
                <div className="text-3xl">{s.icon}</div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <Button
                  asChild
                  className="mt-auto w-full animate-button-pulse bg-[image:var(--gradient-cta)] font-bold text-primary shadow-lg shadow-accent/40 hover:animate-none hover:opacity-90 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all duration-300"
                >
                  <a href="https://wa.me/5511996451510" target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" /> CHAMAR GUINCHO
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-3">
          {[
            { icon: Clock, title: "Resposta rápida", text: "Tempo médio de chegada inferior a 40 minutos em áreas urbanas e rodovias." },
            { icon: ShieldCheck, title: "Segurança garantida", text: "Empresas parceiras verificadas, com seguro e equipamentos certificados." },
            { icon: Zap, title: "Preço transparente", text: "Orçamento informado antes do atendimento, sem taxas surpresa." },
            { icon: Truck, title: "Frota Completa", text: "Guinchos plataforma, pesados e munk para qualquer tipo de veículo." },
            { icon: Star, title: "Experiência Real", text: "Mais de 10 anos de atuação e milhares de atendimentos realizados com sucesso." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="space-y-3 p-4 border rounded-xl bg-background/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-3">Empresas em destaque</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent">Parceiros qualificados próximos a você</h2>
            <p className="mt-3 text-muted-foreground">
              Selecionamos empresas com tradição, frota completa e excelente reputação em cada região do país.
            </p>
          </div>
          <Button asChild variant="outline"><Link to="/cobertura">Ver todos <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <Suspense fallback={<div className="h-72" aria-hidden />}>
          <PartnersCarousel />
        </Suspense>
      </section>

      {/* COVERAGE — foco capitais + SP */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 border-accent/40 bg-accent/15 text-accent">Cobertura</Badge>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl text-accent-foreground">
            Atendimento nas principais capitais e em todo o Estado de São Paulo
          </h2>

          <div className="mx-auto mt-10 max-w-4xl">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Principais capitais
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {CAPITAIS.map((c) => (
                <span key={c} className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-1.5 text-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Principais cidades de São Paulo
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {CIDADES_SP.map((c) => (
                <span key={c} className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO — SP CAPITAL */}
      <section className="container mx-auto px-4 py-20" aria-labelledby="seo-sp-capital">
        <div className="mx-auto max-w-4xl space-y-6">
          <Badge variant="secondary">São Paulo — Capital</Badge>
          <h2 id="seo-sp-capital" className="text-3xl font-bold tracking-tight md:text-4xl text-accent">
            Guincho 24 horas em São Paulo capital — Zona Norte, Sul, Leste, Oeste e Centro
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Atendimento de <strong>guincho 24h em toda a cidade de São Paulo</strong>, com bases distribuídas pelas
            quatro zonas e Centro Expandido. Cobrimos as principais avenidas e marginais — <strong>Marginal Tietê</strong>,{" "}
            <strong>Marginal Pinheiros</strong>, <strong>Av. Paulista</strong>, <strong>Av. 23 de Maio</strong>,{" "}
            <strong>Radial Leste</strong>, <strong>Av. dos Bandeirantes</strong> e <strong>Av. Brigadeiro Faria Lima</strong> —
            além de bairros como Moema, Vila Mariana, Pinheiros, Tatuapé, Mooca, Santana, Lapa, Morumbi, Itaquera,
            Brás, Bela Vista e Jardins. Chegada média entre <strong>25 e 40 minutos</strong> na capital.
          </p>
          <h3 className="text-xl font-bold pt-2 text-accent">Serviços mais acionados na capital</h3>
          <ul className="grid gap-2 text-muted-foreground sm:grid-cols-2">
            <li>✅ Guincho leve para carros, SUVs e utilitários</li>
            <li>✅ Guincho de motos com içamento sem dano</li>
            <li>✅ Auto socorro mecânico no local</li>
            <li>✅ Pane seca (combustível emergencial)</li>
            <li>✅ Bateria descarregada e chave trancada</li>
            <li>✅ Remoção de veículos batidos e sinistros</li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href="https://wa.me/5511996451510"><Phone className="h-5 w-5" /> Guincho em SP capital — WhatsApp</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/guincho-em-{$slug}" params={{ slug: "sao-paulo-sp" }}>Ver página de São Paulo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO — PRINCIPAIS CIDADES DE SP */}
      <section className="bg-secondary/40 py-20" aria-labelledby="seo-sp-interior">
        <div className="container mx-auto max-w-5xl px-4 space-y-6">
          <Badge variant="secondary">Estado de São Paulo</Badge>
          <h2 id="seo-sp-interior" className="text-3xl font-bold tracking-tight md:text-4xl text-accent">
            Guincho 24 horas nas principais cidades de SP
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Operamos com cobertura prioritária nas regiões mais movimentadas do Estado de São Paulo:{" "}
            <strong>Grande São Paulo e ABC</strong> (Guarulhos, Osasco, Santo André, São Bernardo, São Caetano,
            Diadema, Mauá, Barueri, Mogi das Cruzes), <strong>Vale do Paraíba e Litoral Norte</strong>{" "}
            (São José dos Campos, Taubaté, Jacareí, Pindamonhangaba, Caraguatatuba, Ubatuba, São Sebastião,
            Ilhabela), <strong>Baixada Santista</strong> (Santos, São Vicente, Praia Grande, Guarujá, Cubatão),{" "}
            <strong>Região de Campinas</strong> (Campinas, Jundiaí, Indaiatuba, Hortolândia, Sumaré, Valinhos,
            Vinhedo, Itu, Atibaia, Bragança Paulista), <strong>Sorocaba</strong> e região,{" "}
            <strong>Ribeirão Preto, Franca e Barretos</strong>, <strong>São José do Rio Preto e Catanduva</strong>,{" "}
            <strong>Bauru, Marília, Araçatuba e Presidente Prudente</strong>, além de <strong>Campos do Jordão</strong>{" "}
            e toda a Serra da Mantiqueira.
          </p>

          <h3 className="text-xl font-bold pt-2 text-accent">Cidades atendidas em destaque</h3>
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 md:grid-cols-3 text-sm">
            {CIDADES_SP.map((c) => {
              const slug = c
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return (
                <Link
                  key={c}
                  to="/guincho-em-{$slug}"
                  params={{ slug: `${slug}-sp` }}
                  className="text-muted-foreground hover:text-primary hover:underline"
                >
                  Guincho 24h em {c}
                </Link>
              );
            })}
          </div>

          <h3 className="text-xl font-bold pt-4 text-accent">Por que somos referência no Estado de SP</h3>
          <ul className="space-y-2 text-muted-foreground leading-relaxed">
            <li>📍 Bases operacionais na capital, Grande SP, Vale do Paraíba, Baixada Santista, Campinas, Sorocaba, Ribeirão e Interior.</li>
            <li>🛣️ Cobertura total nas rodovias paulistas: Dutra, Ayrton Senna, Tamoios, Anchieta, Imigrantes, Anhanguera, Bandeirantes, Castello Branco, Raposo Tavares, Régis Bittencourt.</li>
            <li>⏱️ Chegada em até 40 min na capital e Grande SP; 40–60 min no Interior e rodovias.</li>
            <li>💬 Solicitação 100% pelo WhatsApp, com orçamento antes do envio.</li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href="https://wa.me/5511996451510"><MessageCircle className="h-5 w-5" /> Chamar guincho no Estado de SP</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/cobertura">Ver todas as cidades atendidas</Link>
            </Button>
          </div>
        </div>
      </section>



      {/* SEO TEXT — AUTORIDADE */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-6">
          <Badge variant="secondary">Guincho 24 horas perto de você</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent">
            A maior rede de guincho e reboque 24h do Brasil — atendimento rápido em rodovias e cidades
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Quando o seu carro pifa no meio da rodovia, na garagem de casa ou no estacionamento do trabalho, cada
            minuto conta. O <strong>{SITE.name}</strong> nasceu para conectar motoristas a empresas de guincho,
            reboque e auto socorro mecânico de forma rápida, transparente e segura, com cobertura nas principais
            cidades do país e em todas as rodovias federais e estaduais. Solicite um <strong>guincho 24 horas</strong>{" "}
            agora mesmo pelo telefone <a className="underline font-semibold" href="https://wa.me/5511996451510">{SITE.phone}</a>{" "}
            ou pelo WhatsApp e fale direto com um operador da nossa central de emergências, sem robôs e sem espera.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Trabalhamos com <strong>guincho leve</strong> (carros de passeio, SUVs, picapes e utilitários até 3,5
            toneladas), <strong>guincho pesado</strong> (caminhões, ônibus, máquinas agrícolas e veículos acima de 8
            toneladas), <strong>guincho de motos</strong> com içamento adequado, <strong>auto socorro mecânico</strong>{" "}
            para troca de pneu, partida de bateria e pequenos reparos no local, além de <strong>pane seca</strong>{" "}
            (entrega emergencial de combustível) e <strong>remoção veicular</strong> programada para sinistros,
            leilões e mudanças interestaduais. Toda a frota é equipada com plataformas hidráulicas modernas, asas
            deltas, munk e prancha rebaixada para transporte seguro de qualquer tipo de veículo.
          </p>
          <h3 className="text-2xl font-bold pt-4 text-accent">Por que escolher o {SITE.name}?</h3>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            <li>✅ <strong>Atendimento 24 horas, 7 dias por semana</strong>, inclusive feriados, madrugada e finais de semana.</li>
            <li>✅ <strong>Tempo médio de chegada inferior a 40 minutos</strong> em áreas urbanas e até 60 minutos em rodovias.</li>
            <li>✅ <strong>Empresas parceiras verificadas</strong>, com CNPJ ativo, ANTT regularizada e seguro de responsabilidade civil.</li>
            <li>✅ <strong>Orçamento transparente</strong> informado antes do início do serviço — sem taxas ocultas.</li>
            <li>✅ <strong>Pagamento facilitado</strong>: dinheiro, PIX, débito, crédito e principais aplicativos de assistência.</li>
            <li>✅ <strong>Cobertura em mais de 1.000 cidades</strong> de todos os estados, com foco em São Paulo, Vale do Paraíba, Litoral Norte, Serra da Mantiqueira, Grande SP e ABC.</li>
          </ul>
          <h3 className="text-2xl font-bold pt-4 text-accent">Quando acionar um guincho 24 horas?</h3>
          <p className="text-muted-foreground leading-relaxed">
            Acidentes de trânsito, colisões traseiras, capotamentos, panes elétricas, problemas no câmbio,
            superaquecimento de motor, pneus furados sem estepe, falta de combustível, bateria descarregada,
            chaves trancadas dentro do carro, embreagem queimada, vazamento de óleo, perda de freio em descida de
            serra, atolamentos em terrenos irregulares e transporte de veículos batidos para oficinas e seguradoras —
            todas essas são situações em que você deve acionar imediatamente um guincho profissional. Tentar
            empurrar ou rebocar um veículo de forma improvisada pode causar acidentes graves, multas de trânsito e
            danos ainda maiores ao automóvel.
          </p>
          <h3 className="text-2xl font-bold pt-4 text-accent">Cobertura em rodovias estratégicas</h3>
          <p className="text-muted-foreground leading-relaxed">
            Atendemos com prioridade as principais rodovias do estado de São Paulo:{" "}
            <strong>Rodovia Presidente Dutra (BR-116)</strong>,{" "}
            <strong>Rodovia Ayrton Senna / Carvalho Pinto (SP-070)</strong>,{" "}
            <strong>Rodovia dos Tamoios (SP-099)</strong>, <strong>Rodovia Oswaldo Cruz (SP-125)</strong>,{" "}
            <strong>Floriano Rodrigues Pinheiro (SP-123)</strong>, <strong>Anhanguera (SP-330)</strong>,{" "}
            <strong>Bandeirantes (SP-348)</strong>, <strong>Castello Branco (SP-280)</strong>,{" "}
            <strong>Raposo Tavares (SP-270)</strong>, <strong>Régis Bittencourt (BR-116 Sul)</strong>,{" "}
            <strong>Anchieta (SP-150)</strong> e <strong>Imigrantes (SP-160)</strong>. Conheça também nossas páginas dedicadas para {" "}
            <Link to="/guinchos-nas-rodovias-{$slug}" params={{ slug: "marginal-tiete" }} className="underline font-semibold">Marginal Tietê</Link>, {" "}
            <Link to="/guinchos-nas-rodovias-{$slug}" params={{ slug: "rodovia-castelo-branco" }} className="underline font-semibold">Castello Branco</Link> e outras {" "}
            <Link to="/rodovias-vale-do-paraiba" className="underline font-semibold">rodovias</Link>.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href="https://wa.me/5511996451510"><Phone className="h-5 w-5" /> Ligar agora — (11) 99645-1510</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/5511996451510" target="_blank" rel="noreferrer">WhatsApp 24h</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/servicos-de-guincho-e-reboque">Ver todas as cidades</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Módulo de links internos contextuais — cidades próximas por região */}
      <section className="container mx-auto px-4 pt-4">
        <NearbyCitiesModule />
      </section>

      {/* FAQ — SÃO PAULO CAPITAL E PRINCIPAIS CIDADES */}
      <section className="container mx-auto px-4 py-20" aria-labelledby="faq-sp-title">
        <div className="mx-auto max-w-4xl space-y-6">
          <Badge variant="secondary">FAQ — São Paulo</Badge>
          <h2 id="faq-sp-title" className="text-3xl font-bold tracking-tight md:text-4xl text-accent">
            Perguntas frequentes sobre guincho em SP capital e principais cidades
          </h2>
          <p className="text-muted-foreground">
            Dúvidas mais comuns de quem precisa de guincho 24h na cidade de São Paulo, Grande SP, ABC, Vale do Paraíba, Litoral, Campinas, Sorocaba, Santos, Ribeirão Preto e Interior.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_SP.map((f, i) => (
              <AccordionItem key={i} value={`faq-sp-${i}`}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href="https://wa.me/5511996451510"><Phone className="h-5 w-5" /> Falar com a central de SP</a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ SEO */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto max-w-4xl px-4 space-y-6">
          <Badge variant="secondary">Perguntas frequentes</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent">Dúvidas comuns sobre guincho 24h</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                Quanto custa um guincho 24 horas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                O valor varia conforme distância percorrida (KM rodado), tipo de veículo (leve, médio ou pesado),
                horário (diurno, noturno, feriados) e região. Em média, dentro da cidade o serviço fica entre R$ 150
                e R$ 350. Em rodovias o cálculo é por quilômetro a partir do ponto de saída. Sempre fornecemos
                orçamento exato antes de iniciar o atendimento.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                Em quanto tempo o guincho chega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Em áreas urbanas, o tempo médio é de 30 a 40 minutos. Em rodovias e regiões afastadas, entre 40 e 60
                minutos, dependendo do trânsito e da localização exata. Trabalhamos com bases distribuídas para
                garantir o menor tempo de resposta.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                Vocês atendem em rodovias e na serra?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Sim. Temos cobertura completa em rodovias federais e estaduais, incluindo trechos de serra como
                Tamoios, Oswaldo Cruz, Floriano Rodrigues Pinheiro, Régis Bittencourt e Anchieta/Imigrantes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                Posso pagar com cartão ou PIX?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Sim. Aceitamos PIX, cartão de débito, crédito (à vista e parcelado), dinheiro e principais
                aplicativos de assistência veicular conveniados.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                Atendem moto, caminhão e veículo blindado?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Sim. Possuímos plataformas para motos com içamento sem dano à pintura, guincho pesado para
                caminhões e ônibus, e prancha rebaixada para veículos blindados, esportivos rebaixados e clássicos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg">
              <a href="https://wa.me/5511996451510"><Phone className="h-5 w-5" /> Solicitar guincho — {SITE.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      <LazyTestimonialsCarousel />

      <LocationsGrid />

      {/* CTA ANUNCIE */}
      <section className="container mx-auto px-4 py-20">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-10 text-primary-foreground shadow-[var(--shadow-elegant)] md:p-16">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div className="space-y-4">
              <Badge className="border-accent/40 bg-accent/15 text-accent">Para empresas de guincho</Badge>
              <h2 className="text-3xl font-bold md:text-4xl text-accent">Anuncie sua empresa e receba mais chamados</h2>
              <p className="text-primary-foreground/85">
                Apareça na primeira página dos buscadores, conquiste novos clientes da sua região e amplie sua base de atendimentos com a maior plataforma de guinchos do país.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary hover:opacity-95">
                <Link to="/anuncie"><Wrench className="h-5 w-5" /> Quero anunciar</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contato">Falar com consultor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
