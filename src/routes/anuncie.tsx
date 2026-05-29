import { createFileRoute } from "@tanstack/react-router";
import { Check, TrendingUp, Users, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SeoBlock } from "@/components/seo-block";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export const Route = createFileRoute("/anuncie")({
  head: () => ({
    meta: [
      { title: "Anuncie sua Empresa de Guincho | Receba Mais Chamados" },
      { name: "description", content: "Cadastre sua empresa de guincho e reboque no maior portal nacional de socorro veicular. Aumente sua visibilidade, apareça nos primeiros resultados e conquiste mais clientes na sua região hoje mesmo!" },
      { property: "og:title", content: "Anuncie sua Empresa de Guincho" },
      { property: "og:description", content: "Mais visibilidade, mais clientes e mais chamados para sua empresa de reboque no maior portal de guinchos do Brasil." },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { property: "og:url", content: "https://sosguincho24horas.com.br/anuncie" },
      { name: "twitter:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/anuncie" }],
  }),
  component: AnunciePage,
});

const benefits = [
  { icon: Search, title: "Mais visibilidade local", text: "Apareça nas buscas por guincho na sua cidade com SEO otimizado." },
  { icon: Users, title: "Clientes qualificados", text: "Receba contatos de motoristas em emergência prontos para fechar." },
  { icon: TrendingUp, title: "Crescimento contínuo", text: "Plataforma com tráfego crescente e investimento permanente em mídia." },
];

function AnunciePage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Início", url: "/" }, { name: "Anuncie", url: "/anuncie" }]} />
      <section className="bg-[image:var(--gradient-hero)] py-20 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <Badge className="mb-3 border-accent/40 bg-accent/15 text-accent">Para empresas</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-accent">Anuncie e receba mais chamados de guincho</h1>
          <p className="mt-4 text-primary-foreground/85">
            Posicione sua empresa em destaque no maior portal de guinchos do Brasil e alcance motoristas no momento exato em que eles precisam de socorro.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-20 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, text }) => (
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
      </section>

      <section className="container mx-auto grid gap-10 px-4 pb-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-accent/90">O que está incluso</h2>
          <ul className="mt-6 space-y-3">
            {[
              "Página exclusiva da sua empresa com fotos e contato",
              "Destaque nas buscas por cidade e tipo de serviço",
              "Botão direto de chamada e WhatsApp",
              "Relatório mensal de visualizações e contatos",
              "Selo de empresa verificada após análise documental",
              "Suporte dedicado para otimização do seu anúncio",
            ].map((b) => (
              <li key={b} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> <span>{b}</span></li>
            ))}
          </ul>
        </div>

        <Card className="border-border/60 shadow-[var(--shadow-elegant)]">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-accent/90">Solicite seu cadastro</h3>
            <p className="mt-1 text-sm text-muted-foreground">Preencha os dados e nossa equipe entrará em contato em até 24 horas.</p>
            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Cadastro enviado! Entraremos em contato em breve.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="space-y-1.5"><Label htmlFor="empresa">Nome da empresa</Label><Input id="empresa" required /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label htmlFor="cidade">Cidade / UF</Label><Input id="cidade" required /></div>
                <div className="space-y-1.5"><Label htmlFor="telefone">Telefone</Label><Input id="telefone" type="tel" required /></div>
              </div>
              <div className="space-y-1.5"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" required /></div>
              <div className="space-y-1.5"><Label htmlFor="msg">Conte sobre sua frota e serviços</Label><Textarea id="msg" rows={4} /></div>
              <Button type="submit" className="w-full bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">Enviar cadastro</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <SeoBlock
        badge="Cresça com o maior portal de guinchos do Brasil"
        title="Por que anunciar sua empresa de guincho e reboque com a gente?"
        paragraphs={[
          "Quem pesquisa <strong>guincho 24h perto de mim</strong>, <strong>reboque rápido</strong> ou <strong>auto socorro mecânico</strong> está vivendo uma emergência e tem altíssima intenção de contratação imediata. O <strong>SOS Guincho 24 horas</strong> é o maior portal nacional especializado em conectar esses motoristas a empresas locais qualificadas, com tráfego orgânico crescente nos buscadores e investimento contínuo em mídia paga.",
          "Ao anunciar sua empresa de <strong>guincho e reboque</strong> em nossa plataforma, você ganha presença nas páginas de cidade (<strong>SEO local hiper-segmentado</strong>), aparece em listas de rodovias importantes (Dutra, Tamoios, Carvalho Pinto, Anchieta, Imigrantes, Bandeirantes, Castello Branco) e recebe chamadas direto pelo botão de telefone e WhatsApp — <strong>sem intermediários e sem comissão por atendimento</strong>.",
          "Nosso modelo prioriza <strong>empresas verificadas</strong>: motorista habilitado, frota vistoriada, ANTT regularizada e seguro de responsabilidade civil. Isso aumenta a confiança do cliente e melhora sua taxa de conversão.",
        ]}
        bullets={[
          "<strong>Mais visualizações</strong>: páginas otimizadas para palavras-chave de alta intenção comercial.",
          "<strong>Mais ligações</strong>: botão de telefone e WhatsApp em destaque em todas as páginas.",
          "<strong>Mais autoridade</strong>: selo de verificação e avaliações públicas dos clientes.",
          "<strong>Relatório mensal</strong> de impressões, cliques e contatos gerados.",
          "<strong>Sem fidelidade</strong>: cancele quando quiser, sem multa.",
        ]}
        faqs={[
          { q: "Quanto custa anunciar minha empresa?", a: "Trabalhamos com planos mensais a partir de R$ 197/mês com destaque em até 3 cidades. Solicite uma proposta personalizada pelo formulário acima." },
          { q: "Recebo os contatos direto ou vocês intermediam?", a: "Os contatos chegam direto para sua empresa pelo telefone e WhatsApp. Não cobramos comissão por atendimento fechado." },
          { q: "Em quanto tempo meu anúncio fica no ar?", a: "Após análise documental e aprovação, seu anúncio entra no ar em até 48 horas úteis." },
          { q: "Posso anunciar em mais de uma cidade?", a: "Sim. Os planos permitem destaque em múltiplas cidades e regiões metropolitanas." },
        ]}
      />

      <LazyTestimonialsCarousel />
    </div>
  );
}
