import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  MousePointerClick,
  Globe,
  PhoneCall,
  MapPin,
  BarChart3,
  Check,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { SeoBlock } from "@/components/seo-block";
import { SITE } from "@/components/site-data";
import { TEL_E164 } from "@/lib/local-business-schema";

const URL = "https://sosguincho24horas.com.br/marketing-para-guinchos";
const TITLE = "Agência de Marketing e SEO para Guinchos e Reboques";
const DESC =
  "Agência de marketing digital especializada em guinchos e reboques: SEO local, Google Ads, criação de site e geração de leads para sua empresa aparecer na primeira página do Google.";

export const Route = createFileRoute("/marketing-para-guinchos")({
  head: () => ({
    meta: [
      { title: `${TITLE} | SEO Local que Gera Chamados` },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: MarketingGuinchosPage,
});

const SERVICES = [
  {
    icon: Search,
    title: "SEO local para guinchos",
    text: "Otimização de páginas por cidade, bairro e rodovia para capturar buscas como “guincho 24h perto de mim” e “reboque em [cidade]”.",
  },
  {
    icon: MousePointerClick,
    title: "Google Ads e Performance Max",
    text: "Campanhas de emergência com extensões de chamada, segmentação por raio de atendimento e otimização por custo por ligação.",
  },
  {
    icon: Globe,
    title: "Criação de site que converte",
    text: "Site rápido, responsivo e com botão de telefone e WhatsApp sempre visível — feito para quem está na beira da estrada.",
  },
  {
    icon: MapPin,
    title: "Perfil da Empresa no Google",
    text: "Estruturação e gestão do Google Meu Negócio, fotos, categorias, postagens e resposta a avaliações para dominar o mapa local.",
  },
  {
    icon: PhoneCall,
    title: "Geração e gestão de leads",
    text: "Rastreamento de ligações e conversas de WhatsApp para você saber exatamente de onde vem cada chamado.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e acompanhamento",
    text: "Painel mensal com posições no Google, cliques, ligações e custo por lead. Sem métricas de vaidade.",
  },
];

const STEPS = [
  { n: "01", title: "Diagnóstico gratuito", text: "Analisamos seu site, seu perfil no Google e as palavras-chave da sua região." },
  { n: "02", title: "Plano de palavras-chave", text: "Definimos cidades, bairros e rodovias prioritárias conforme seu raio de atendimento." },
  { n: "03", title: "Implantação técnica", text: "Site, páginas locais, schema, velocidade, sitemap e campanhas no ar." },
  { n: "04", title: "Escala e otimização", text: "Novas páginas, conteúdo e ajustes de lance mês a mês para aumentar o volume de chamados." },
];

const RESULTS = [
  "Páginas locais indexadas por cidade, bairro e rodovia",
  "Dados estruturados (LocalBusiness, Service e FAQ) validados",
  "Site com Core Web Vitals otimizados (LCP e CLS)",
  "Rastreamento de ligações e cliques no WhatsApp",
  "Google Meu Negócio otimizado para o mapa local",
  "Relatório mensal com posições e custo por lead",
];

const FAQS = [
  {
    q: "Em quanto tempo minha empresa de guincho aparece na primeira página do Google?",
    a: "Campanhas de Google Ads geram ligações nos primeiros dias. No SEO local, os primeiros ganhos de posição costumam aparecer entre 45 e 90 dias, com evolução contínua conforme novas páginas de cidade e bairro são publicadas.",
  },
  {
    q: "Vocês atendem empresas de guincho de qualquer cidade do Brasil?",
    a: "Sim. Trabalhamos com empresas de guincho, reboque, auto socorro e remoção veicular em todo o Brasil, incluindo operações focadas em rodovias como Dutra, Tamoios, Carvalho Pinto, Bandeirantes e Imigrantes.",
  },
  {
    q: "Qual a diferença entre anunciar no portal e contratar o marketing?",
    a: "No anúncio no portal você usa a nossa audiência para receber chamados. No serviço de marketing construímos a presença digital da sua própria marca: seu site, seu SEO, suas campanhas e seus leads exclusivos.",
  },
  {
    q: "Existe contrato de fidelidade?",
    a: "Não trabalhamos com multa de fidelidade. Sugerimos um ciclo mínimo de 3 meses apenas porque é o tempo necessário para maturar SEO local e otimizar as campanhas.",
  },
  {
    q: "Vocês trabalham com concorrentes da minha cidade?",
    a: "Não. Mantemos exclusividade por cidade e nicho de serviço para não competirmos com o nosso próprio cliente nas mesmas palavras-chave.",
  },
];

const WHATS = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Olá! Quero uma proposta de marketing e SEO para minha empresa de guincho.",
)}`;

function MarketingGuinchosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${URL}#service`,
        name: TITLE,
        serviceType: "Marketing digital e SEO para empresas de guincho e reboque",
        description: DESC,
        areaServed: { "@type": "Country", name: "Brasil" },
        provider: {
          "@type": "ProfessionalService",
          name: `${SITE.name} — Marketing para Guinchos`,
          telephone: TEL_E164,
          email: SITE.email,
          url: URL,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de marketing para guinchos",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.text },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: "/" },
          { name: "Marketing para Guinchos", url: "/marketing-para-guinchos" },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-[image:var(--gradient-hero)] py-20 text-primary-foreground">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-3 border-accent/40 bg-accent/15 text-accent">Serviço B2B para empresas de guincho</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-accent md:text-5xl">
            Agência de marketing e SEO para guinchos e reboques
          </h1>
          <p className="mt-5 text-lg text-primary-foreground/85">
            Colocamos sua empresa de guincho na primeira página do Google nas cidades e rodovias que você atende — com
            SEO local, Google Ads e um site feito para gerar ligações.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href={WHATS} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Diagnóstico gratuito no WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <a href={`tel:${TEL_E164}`}>
                <PhoneCall className="mr-2 h-5 w-5" /> {SITE.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-center text-3xl font-bold text-accent">O que fazemos pela sua empresa de guincho</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Um pacote completo de aquisição de clientes para socorro veicular, do SEO local à gestão dos leads.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="border-border/60">
              <CardContent className="space-y-3 p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-cta)] text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/30 py-20 defer-paint">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-accent">Como trabalhamos</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="space-y-2">
                <span className="text-3xl font-black text-accent/40">{s.n}</span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-20 md:grid-cols-2 defer-paint">
        <div>
          <h2 className="text-3xl font-bold text-accent">O que está incluso no plano</h2>
          <ul className="mt-6 space-y-3">
            {RESULTS.map((r) => (
              <li key={r} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-border/60 shadow-[var(--shadow-elegant)]">
          <CardContent className="space-y-4 p-6">
            <h3 className="text-xl font-semibold text-accent">Peça uma proposta</h3>
            <p className="text-sm text-muted-foreground">
              Fale direto com nossa equipe pelo WhatsApp e receba um diagnóstico com as palavras-chave da sua cidade,
              volume de buscas estimado e uma proposta de investimento.
            </p>
            <Button asChild className="w-full bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href={WHATS} target="_blank" rel="noreferrer">
                Falar com um especialista <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="rounded-xl border border-border/60 p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Prefere só anunciar?</p>
              <p className="mt-1">
                Se você quer apenas receber chamados usando a audiência do nosso portal, veja a{" "}
                <Link to="/anuncie" className="font-semibold text-accent hover:underline">
                  página de anúncios para empresas
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <SeoBlock
        badge="Marketing digital especializado no setor de socorro veicular"
        title="Por que uma agência especializada em guinchos e reboques?"
        paragraphs={[
          "O comportamento de quem procura <strong>guincho 24 horas</strong> é diferente de qualquer outro mercado: a busca acontece no celular, na beira da estrada, com pressa e sem paciência para navegar. Por isso, <strong>marketing para empresas de guincho</strong> exige páginas ultrarrápidas, botão de ligação sempre visível e presença nas buscas locais por cidade, bairro e rodovia.",
          "Como operamos o maior portal nacional de socorro veicular, sabemos exatamente quais termos convertem: <strong>guincho perto de mim</strong>, <strong>reboque 24h</strong>, <strong>auto socorro na rodovia</strong>, <strong>guincho para moto</strong>, <strong>remoção veicular</strong>. Aplicamos esse mesmo método de <strong>SEO local</strong> e <strong>anúncios no Google</strong> no site da sua própria empresa.",
          "O trabalho combina <strong>busca orgânica</strong> (posicionamento no Google sem pagar por clique) com <strong>mídia paga</strong> para volume imediato, além de <strong>Perfil da Empresa no Google</strong> para dominar o mapa local. Tudo medido por ligações e conversas de WhatsApp, não por impressões.",
        ]}
        bullets={[
          "<strong>SEO local hiper-segmentado</strong>: uma página para cada cidade, bairro e rodovia atendida.",
          "<strong>Google Ads com foco em ligação</strong>: lances otimizados por custo por chamado, não por clique.",
          "<strong>Criação de site profissional</strong> com desempenho e dados estruturados validados.",
          "<strong>Exclusividade por cidade</strong>: não atendemos dois concorrentes na mesma praça.",
          "<strong>Relatórios claros</strong> de posições, cliques, ligações e custo por lead.",
        ]}
        faqs={FAQS}
      />
    </div>
  );
}
