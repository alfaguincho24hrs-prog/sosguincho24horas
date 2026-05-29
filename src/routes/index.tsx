import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Clock, ShieldCheck, MapPin, Star, ArrowRight, Truck, Wrench, Zap, MessageCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE, SERVICES, PARTNERS, CITIES } from "@/components/site-data";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import heroImg from "@/assets/reboque.webp";

const PartnersCarousel = lazy(() => import("@/components/partners-carousel"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guincho 24 Horas em Todo o Brasil | Reboque e Auto Socorro" },
      { name: "description", content: "Seu carro parou? SOS Guincho 24h na sua cidade para motos, leves e pesados. Resgate rápido em SP e Vale do Paraíba!" },
      { property: "og:title", content: "Guincho 24 Horas no Brasil | Reboque e Auto Socorro" },
      { property: "og:description", content: "Seu carro parou? SOS Guincho 24h na sua cidade para motos, leves e pesados. Resgate rápido em SP e Vale do Paraíba!" },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { property: "og:url", content: "https://sosguincho24horas.com.br/" },
      { name: "twitter:title", content: "Guincho 24 Horas no Brasil | Reboque e Auto Socorro" },
      { name: "twitter:description", content: "Seu carro parou? SOS Guincho 24h na sua cidade para motos, leves e pesados. Resgate rápido em SP e Vale do Paraíba!" },
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
            { "@type": "City", "name": "São Paulo" },
            { "@type": "City", "name": "São José dos Campos" },
            { "@type": "City", "name": "Taubaté" },
            { "@type": "City", "name": "Jacareí" },
            { "@type": "City", "name": "Caçapava" },
            { "@type": "City", "name": "Pindamonhangaba" },
            { "@type": "City", "name": "Guaratinguetá" }
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
    ],
    links: [
      { rel: "canonical", href: "https://sosguincho24horas.com.br" }
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Serviço de guincho 24 horas e reboque plataforma para carros e motos em rodovias"
            className="h-full w-full object-cover"
            width={1920}
            height={1280}
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
                <a href={`tel:${SITE.phone}`}><Phone className="h-5 w-5" /> Solicitar guincho agora</a>
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
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent/90">Soluções completas em reboque e auto socorro</h2>
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
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">
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
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent/90">Parceiros qualificados próximos a você</h2>
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

      {/* COVERAGE */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 border-accent/40 bg-accent/15 text-accent">Cobertura nacional</Badge>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl text-accent-foreground">
            Atendemos as principais capitais e regiões metropolitanas do Brasil
          </h2>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
            {CITIES.map((c) => (
              <span key={c} className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-1.5 text-sm">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEO TEXT — AUTORIDADE */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-6">
          <Badge variant="secondary">Guincho 24 horas perto de você</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent/90">
            A maior rede de guincho e reboque 24h do Brasil — atendimento rápido em rodovias e cidades
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Quando o seu carro pifa no meio da rodovia, na garagem de casa ou no estacionamento do trabalho, cada
            minuto conta. O <strong>{SITE.name}</strong> nasceu para conectar motoristas a empresas de guincho,
            reboque e auto socorro mecânico de forma rápida, transparente e segura, com cobertura nas principais
            cidades do país e em todas as rodovias federais e estaduais. Solicite um <strong>guincho 24 horas</strong>{" "}
            agora mesmo pelo telefone <a className="underline font-semibold" href={`tel:${SITE.phone}`}>{SITE.phone}</a>{" "}
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
          <h3 className="text-2xl font-bold pt-4 text-accent/90">Por que escolher o {SITE.name}?</h3>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            <li>✅ <strong>Atendimento 24 horas, 7 dias por semana</strong>, inclusive feriados, madrugada e finais de semana.</li>
            <li>✅ <strong>Tempo médio de chegada inferior a 40 minutos</strong> em áreas urbanas e até 60 minutos em rodovias.</li>
            <li>✅ <strong>Empresas parceiras verificadas</strong>, com CNPJ ativo, ANTT regularizada e seguro de responsabilidade civil.</li>
            <li>✅ <strong>Orçamento transparente</strong> informado antes do início do serviço — sem taxas ocultas.</li>
            <li>✅ <strong>Pagamento facilitado</strong>: dinheiro, PIX, débito, crédito e principais aplicativos de assistência.</li>
            <li>✅ <strong>Cobertura em mais de 1.000 cidades</strong> de todos os estados, com foco em São Paulo, Vale do Paraíba, Litoral Norte, Serra da Mantiqueira, Grande SP e ABC.</li>
          </ul>
          <h3 className="text-2xl font-bold pt-4 text-accent/90">Quando acionar um guincho 24 horas?</h3>
          <p className="text-muted-foreground leading-relaxed">
            Acidentes de trânsito, colisões traseiras, capotamentos, panes elétricas, problemas no câmbio,
            superaquecimento de motor, pneus furados sem estepe, falta de combustível, bateria descarregada,
            chaves trancadas dentro do carro, embreagem queimada, vazamento de óleo, perda de freio em descida de
            serra, atolamentos em terrenos irregulares e transporte de veículos batidos para oficinas e seguradoras —
            todas essas são situações em que você deve acionar imediatamente um guincho profissional. Tentar
            empurrar ou rebocar um veículo de forma improvisada pode causar acidentes graves, multas de trânsito e
            danos ainda maiores ao automóvel.
          </p>
          <h3 className="text-2xl font-bold pt-4 text-accent/90">Cobertura em rodovias estratégicas</h3>
          <p className="text-muted-foreground leading-relaxed">
            Atendemos com prioridade as principais rodovias do estado de São Paulo:{" "}
            <strong>Rodovia Presidente Dutra (BR-116)</strong>,{" "}
            <strong>Rodovia Ayrton Senna / Carvalho Pinto (SP-070)</strong>,{" "}
            <strong>Rodovia dos Tamoios (SP-099)</strong>, <strong>Rodovia Oswaldo Cruz (SP-125)</strong>,{" "}
            <strong>Floriano Rodrigues Pinheiro (SP-123)</strong>, <strong>Anhanguera (SP-330)</strong>,{" "}
            <strong>Bandeirantes (SP-348)</strong>, <strong>Castello Branco (SP-280)</strong>,{" "}
            <strong>Raposo Tavares (SP-270)</strong>, <strong>Régis Bittencourt (BR-116 Sul)</strong>,{" "}
            <strong>Anchieta (SP-150)</strong> e <strong>Imigrantes (SP-160)</strong>. Conheça também a página
            dedicada às <Link to="/rodovias-vale-do-paraiba" className="underline font-semibold">rodovias do Vale do Paraíba</Link>.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href={`tel:${SITE.phone}`}><Phone className="h-5 w-5" /> Ligar agora — {SITE.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp 24h</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/servicos-de-guincho-e-reboque">Ver todas as cidades</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ SEO */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto max-w-4xl px-4 space-y-6">
          <Badge variant="secondary">Perguntas frequentes</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent/90">Dúvidas comuns sobre guincho 24h</h2>
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
              <a href={`tel:${SITE.phone}`}><Phone className="h-5 w-5" /> Solicitar guincho — {SITE.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      <LazyTestimonialsCarousel />

      {/* CTA ANUNCIE */}
      <section className="container mx-auto px-4 py-20">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-10 text-primary-foreground shadow-[var(--shadow-elegant)] md:p-16">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div className="space-y-4">
              <Badge className="border-accent/40 bg-accent/15 text-accent">Para empresas de guincho</Badge>
              <h2 className="text-3xl font-bold md:text-4xl text-accent/90">Anuncie sua empresa e receba mais chamados</h2>
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
