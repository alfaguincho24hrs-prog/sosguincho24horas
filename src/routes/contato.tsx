import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SITE } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | SOS Guincho 24 horas - Atendimento 24 Horas" },
      { name: "description", content: "Entre em contato com a central do SOS Guincho 24 horas. Oferecemos atendimento humanizado via telefone, WhatsApp e e-mail, 24 horas por dia, para socorro veicular imediato em todo o Brasil." },
      { property: "og:title", content: "Contato | SOS Guincho 24 horas" },
      { property: "og:description", content: "Fale com nossa central 24h via telefone, WhatsApp e e-mail para serviços de guincho e reboque em todo o Brasil." },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { property: "og:url", content: "https://sosguincho24horas.com.br/contato" },
      { name: "twitter:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/contato" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Início", url: "/" }, { name: "Contato", url: "/contato" }]} />
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-3">Contato</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-accent">Fale com nossa central</h1>
          <p className="mt-4 text-muted-foreground">Estamos disponíveis 24 horas para emergências, dúvidas e parcerias.</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            { icon: Phone, title: "Telefone", text: SITE.phone, href: `tel:${SITE.phone}` },
            { icon: Mail, title: "E-mail", text: SITE.email, href: `mailto:${SITE.email}` },
            { icon: MapPin, title: "Cobertura", text: "Todo o Brasil" },
            { icon: Clock, title: "Horário", text: "24h · 7 dias" },
          ].map(({ icon: Icon, title, text, href }) => (
            <Card key={title} className="border-border/60 text-center">
              <CardContent className="space-y-2 p-6">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-cta)] text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                {href ? <a href={href} className="text-sm text-muted-foreground hover:text-accent">{text}</a> : <p className="text-sm text-muted-foreground">{text}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mx-auto mt-14 max-w-2xl border-border/60 shadow-[var(--shadow-elegant)]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold">Envie sua mensagem</h2>
            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Mensagem enviada! Retornaremos em breve.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label htmlFor="nome">Nome</Label><Input id="nome" required /></div>
                <div className="space-y-1.5"><Label htmlFor="tel">Telefone</Label><Input id="tel" type="tel" required /></div>
              </div>
              <div className="space-y-1.5"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" required /></div>
              <div className="space-y-1.5"><Label htmlFor="msg">Mensagem</Label><Textarea id="msg" rows={5} required /></div>
              <Button type="submit" className="w-full bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">Enviar mensagem</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <SeoBlock
        badge="Central de atendimento 24 horas"
        title="Fale agora com a central do SOS Guincho 24 horas — atendimento humano e imediato"
        paragraphs={[
          "Nossa <strong>central de emergências</strong> opera 24 horas por dia, 7 dias por semana, com operadores treinados para acionar o <strong>guincho mais próximo</strong> da sua localização em poucos minutos. Sem URA, sem robô, sem espera longa: você fala direto com um atendente que registra a ocorrência, calcula a rota e despacha imediatamente uma <strong>plataforma de reboque</strong> ou <strong>auto socorro mecânico</strong> compatível com o seu veículo.",
          "Atendemos chamadas de <strong>emergência veicular</strong> em qualquer cidade do Brasil, com prioridade absoluta para casos em <strong>rodovia</strong>, <strong>vias expressas</strong>, <strong>descidas de serra</strong> e <strong>locais de risco</strong>. Também recebemos solicitações de <strong>remoção programada</strong>, transporte interestadual, leilão, sinistro com seguradora, mudança de veículos e fretes especiais com prancha rebaixada.",
          "Para empresas e gestores de frota, oferecemos contratos corporativos com SLA de chegada, faturamento mensal e cobertura nacional. Entre em contato pelos canais acima e nossa equipe comercial monta uma proposta sob medida.",
        ]}
        bullets={[
          "<strong>Telefone fixo, celular e WhatsApp</strong> com resposta em segundos.",
          "<strong>E-mail comercial</strong> para empresas, frotistas e seguradoras.",
          "<strong>Atendimento bilíngue</strong> (PT/EN) para turistas e estrangeiros.",
          "<strong>Suporte técnico</strong> para acionamentos via aplicativo de assistência.",
        ]}
        faqs={[
          { q: "Qual o canal mais rápido para emergências?", a: "Ligação telefônica direta. Em paralelo, envie sua localização pelo WhatsApp para agilizar o despacho." },
          { q: "Vocês atendem fora do horário comercial?", a: "Sim. Operamos 24h, inclusive madrugada, finais de semana e feriados nacionais." },
          { q: "Posso solicitar reboque programado para outro dia?", a: "Sim. Agendamos transporte programado com data, horário e endereço de coleta e entrega." },
          { q: "Aceitam contrato corporativo para frotas?", a: "Sim. Oferecemos contratos mensais com SLA, faturamento centralizado e relatórios de uso." },
        ]}
      />

      <LazyTestimonialsCarousel />
    </div>
  );
}
