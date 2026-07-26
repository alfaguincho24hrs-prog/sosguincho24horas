import { createFileRoute } from "@tanstack/react-router";
import { Truck, ShieldCheck, MapPin, Wrench } from "lucide-react";
import { SITE } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { buildLocalBusiness } from "@/lib/local-business-schema";

const URL = "https://sosguincho24horas.com.br/frota-guincho";

const FROTA_FAQS = [
  {
    q: "Quais tipos de guincho vocês têm na frota?",
    a: "Trabalhamos com guincho plataforma leve para carros e SUVs, asa delta para remoções rápidas, plataforma pesada e munk para caminhões, ônibus e máquinas, além de equipamento específico para motocicletas.",
  },
  {
    q: "A frota atende veículos rebaixados e esportivos?",
    a: "Sim. Usamos plataformas com rampa estendida e rampas auxiliares que evitam contato do para-choque com o solo, transportando veículos rebaixados e de colecionador sem avarias.",
  },
  {
    q: "Os guinchos têm rastreamento e seguro?",
    a: "Todas as unidades possuem GPS, licenciamento em dia, cintas de amarração profissionais e cobertura para o veículo transportado durante todo o trajeto.",
  },
];

export const Route = createFileRoute("/frota-guincho")({
  head: () => ({
    meta: [
      { title: "Nossa Frota de Guinchos 24h | SOS Guincho 24 horas" },
      { name: "description", content: "Conheça nossa frota completa de guinchos plataforma, reboques pesados e auto socorro 24h. Dispomos de equipamentos modernos e seguros para o transporte de veículos em todo o território nacional." },
      { property: "og:title", content: "Nossa Frota de Guinchos 24h" },
      { property: "og:description", content: "Guincho plataforma, asa delta, pesado e munk: frota moderna para transporte seguro de qualquer veículo, 24 horas por dia." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            buildLocalBusiness({
              url: URL,
              areaLabel: "Frota nacional",
              areaServed: { "@type": "Country", name: "Brasil" },
            }),
            {
              "@type": "Service",
              name: `Frota de guincho e reboque — ${SITE.name}`,
              serviceType: "Guincho plataforma, asa delta, pesado e munk",
              provider: { "@id": `${URL}#business` },
              areaServed: { "@type": "Country", name: "Brasil" },
              availableChannel: {
                "@type": "ServiceChannel",
                servicePhone: SITE.phone,
                serviceUrl: URL,
              },
            },
          ],
        })
      }
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: FrotaPage,
});

function FrotaPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <BreadcrumbJsonLd items={[{ name: "Início", url: "/" }, { name: "Frota de guincho", url: "/frota-guincho" }]} />
      <h1 className="text-4xl font-bold mb-6 text-accent">Nossa Frota de Guincho 24 Horas</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Dispomos de equipamentos modernos para garantir a segurança e integridade do seu veículo, do pequeno carro de passeio ao pesado caminhão.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-xl bg-muted/20">
          <Truck className="h-10 w-10 text-accent mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-accent">Guincho Plataforma Leve</h2>
          <p className="text-muted-foreground">Ideal para carros de passeio, SUVs e picapes. Plataforma hidráulica que garante embarque suave e transporte seguro.</p>
        </div>
        <div className="p-6 border rounded-xl bg-muted/20">
          <Truck className="h-10 w-10 text-accent mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-accent">Guincho Pesado e Munk</h2>
          <p className="text-muted-foreground">Equipamentos robustos para remoção de ônibus, caminhões e maquinários agrícolas. Alta capacidade de carga.</p>
        </div>
      </div>

      <SeoBlock
        badge="Frota verificada"
        title="Equipamentos de alta tecnologia para socorro veicular"
        paragraphs={[
          "Nossa frota é composta por veículos novos, com manutenção preventiva rigorosa e licenciamento em dia. Cada unidade é equipada com GPS, cintas de amarração profissionais e luzes de sinalização conforme as normas de trânsito.",
          "Contamos com guincho plataforma para veículos baixos e esportivos, asa delta para transporte rápido e equipamentos de içamento para motos, garantindo um serviço sem avarias."
        ]}
        faqs={FROTA_FAQS}
      />
    </div>
  );
}
