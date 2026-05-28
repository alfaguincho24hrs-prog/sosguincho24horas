import { createFileRoute } from "@tanstack/react-router";
import { Truck, ShieldCheck, MapPin, Wrench } from "lucide-react";
import { SITE } from "@/components/site-data";
import { SeoBlock } from "@/components/seo-block";

export const Route = createFileRoute("/frota-guincho")({
  head: () => ({
    meta: [
      { title: "Nossa Frota de Guinchos 24h | SOS Guincho 24 horas" },
      { name: "description", content: "Conheça nossa frota de guinchos plataformas, pesados e auto socorro. Equipamentos modernos para transporte seguro de veículos em todo o Brasil." },
    ],
  }),
  component: FrotaPage,
});

function FrotaPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Nossa Frota de Guincho 24 Horas</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Dispomos de equipamentos modernos para garantir a segurança e integridade do seu veículo, do pequeno carro de passeio ao pesado caminhão.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-xl bg-muted/20">
          <Truck className="h-10 w-10 text-accent mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Guincho Plataforma Leve</h2>
          <p className="text-muted-foreground">Ideal para carros de passeio, SUVs e picapes. Plataforma hidráulica que garante embarque suave e transporte seguro.</p>
        </div>
        <div className="p-6 border rounded-xl bg-muted/20">
          <Truck className="h-10 w-10 text-accent mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Guincho Pesado e Munk</h2>
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
      />
    </div>
  );
}
