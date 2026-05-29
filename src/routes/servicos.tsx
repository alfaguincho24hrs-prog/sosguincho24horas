import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES, SITE } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";
import { LazyTestimonialsCarousel } from "@/components/lazy-testimonials";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços de Guincho e Reboque 24h | SOS Guincho 24 horas" },
      { name: "description", content: "Conheça todos os serviços de guincho 24 horas: reboque leve, pesado, motos, auto socorro mecânico, pane seca e remoção veicular em todo o Brasil." },
      { property: "og:title", content: "Serviços de Guincho e Reboque 24h" },
      { property: "og:description", content: "Reboque leve, pesado, motos, auto socorro, pane seca e remoção." },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { property: "og:url", content: "https://sosguincho24horas.com.br/servicos" },
      { name: "twitter:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/servicos" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Início", url: "/" }, { name: "Serviços", url: "/servicos" }]} />
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-3">Serviços</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-accent">Serviços de guincho 24 horas para qualquer emergência</h1>
          <p className="mt-4 text-muted-foreground">
            Oferecemos uma estrutura completa para resgatar seu veículo, seja na cidade, na estrada ou em locais de difícil acesso. Atendimento rápido, ético e seguro.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.slug} className="border-border/60 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <CardContent className="space-y-3 p-6">
                <div className="text-4xl">{s.icon}</div>
                <h2 className="text-xl font-semibold text-accent/90">{s.title}</h2>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <Button
                  asChild
                  className="w-full animate-button-pulse bg-[image:var(--gradient-cta)] font-bold text-primary shadow-lg shadow-accent/40 hover:animate-none hover:opacity-90 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all duration-300"
                >
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" /> CHAMAR GUINCHO
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 rounded-2xl bg-secondary/50 p-10 text-center">
          <h2 className="text-2xl font-bold text-accent/90">Não encontrou o serviço que precisa?</h2>
          <p className="mt-2 text-muted-foreground">Fale com nossa central e encontraremos a melhor solução para o seu caso.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-[image:var(--gradient-cta)] text-primary"><a href={`tel:${SITE.phone}`}><Phone className="h-4 w-4" /> {SITE.phone}</a></Button>
            <Button asChild variant="outline"><Link to="/contato">Enviar mensagem</Link></Button>
          </div>
        </div>
      </div>

      <SeoBlock
        badge="Autoridade em guincho 24h"
        title="Especialistas em reboque, auto socorro e remoção veicular em todo o Brasil"
        paragraphs={[
          "Há mais de uma década o <strong>SOS Guincho 24 horas</strong> conecta motoristas a empresas qualificadas de <strong>guincho 24 horas</strong>, <strong>reboque rápido</strong> e <strong>auto socorro mecânico</strong> em todas as capitais e principais cidades do país. Nossa missão é simples: garantir que ninguém fique parado na rodovia, na garagem ou no estacionamento sem socorro profissional, com preço transparente e tempo de chegada reduzido.",
          "Atendemos <strong>guincho leve</strong> (carros de passeio, SUVs, picapes, utilitários até 3,5 t), <strong>guincho médio com asa delta</strong> (vans, furgões, micro-ônibus), <strong>guincho pesado</strong> (caminhões, ônibus, máquinas agrícolas e veículos acima de 8 t), <strong>guincho de motos</strong> com içamento adequado, <strong>prancha rebaixada</strong> para esportivos, blindados e clássicos, além de serviços complementares como <strong>chaveiro automotivo</strong>, <strong>pane seca</strong> com entrega de combustível, partida de bateria, troca de pneu e <strong>remoção veicular</strong> programada para sinistros, leilões, mudanças interestaduais e transporte de carros novos para concessionárias.",
          "Toda a frota dos parceiros é vistoriada periodicamente, equipada com <strong>plataformas hidráulicas modernas</strong>, sinalização rodoviária completa e operadores treinados para atender em <strong>rodovias federais e estaduais</strong>, descidas de serra, áreas urbanas congestionadas e estradas vicinais.",
        ]}
        bullets={[
          "<strong>Atendimento ininterrupto 24h</strong>, todos os dias do ano, com central humana sem URA robotizada.",
          "<strong>Cobertura em mais de 1.000 municípios</strong> e 100% das rodovias do Estado de São Paulo.",
          "<strong>Empresas verificadas</strong> com CNPJ ativo, ANTT regularizada e seguro de responsabilidade civil.",
          "<strong>Pagamento facilitado</strong>: PIX, dinheiro, débito, crédito e principais aplicativos de assistência.",
          "<strong>Orçamento prévio sem compromisso</strong> antes de iniciar o serviço — você só paga o combinado.",
        ]}
        faqs={[
          { q: "Qual a diferença entre guincho leve, médio e pesado?", a: "Guincho leve atende carros de passeio até 3,5 toneladas. Guincho médio com asa delta atende vans, furgões e micro-ônibus. Guincho pesado é específico para caminhões, ônibus e máquinas acima de 8 toneladas." },
          { q: "Vocês fazem reboque interestadual?", a: "Sim. Realizamos transporte programado entre estados com prancha rebaixada ou cegonha, com seguro de carga incluso." },
          { q: "Atendem motos esportivas e clássicas?", a: "Sim. Usamos rampas e cintas específicas para içamento sem dano à pintura ou estrutura, ideais para motos esportivas, customizadas e clássicas." },
          { q: "Posso pedir guincho para entregar em outra cidade?", a: "Sim. Cobramos por KM rodado e o veículo é entregue no endereço escolhido, com nota fiscal." },
        ]}
      />

      <LazyTestimonialsCarousel />
    </div>
  );
}
