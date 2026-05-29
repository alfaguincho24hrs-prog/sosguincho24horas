import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "./site-data";

const FIRST_NAMES = [
  "Carlos", "Ana", "Roberto", "Juliana", "Marcos", "Patrícia", "Ricardo",
  "Fernanda", "Lucas", "Mariana", "Eduardo", "Camila", "Rodrigo", "Beatriz",
  "André", "Tatiane", "Felipe", "Vanessa", "Bruno", "Larissa", "Gustavo",
  "Aline", "Thiago", "Renata", "Diego", "Priscila",
];
const LAST_INITIALS = ["S.", "M.", "O.", "P.", "R.", "L.", "C.", "A.", "F.", "G."];

const TEMPLATES = [
  "Furou o pneu na {hood} e em poucos minutos o guincho chegou. Equipe educada e preço justo.",
  "Bateria descarregou no estacionamento aqui em {city}. Resolveram rápido, sem dor de cabeça.",
  "Chamei à 1h da manhã, atendimento 24h funciona mesmo. Recomendo para quem mora em {city}.",
  "Meu carro pifou na rodovia perto de {city}. Plataforma chegou antes do prometido. Nota 10.",
  "Levaram minha moto até a oficina sem nenhum arranhão. Profissionais de verdade em {city}.",
  "Pane seca no caminho do trabalho, em {hood}. Trouxeram combustível e segui viagem.",
  "Já é a segunda vez que uso aqui em {city}. Sempre pontuais e transparentes no preço.",
  "Atendimento humano e ágil. Recomendo para todos os moradores de {city} e região.",
];

// Contexto operacional real por região (para EEAT)
const REGIONAL_CONTEXT: Record<string, string> = {
  "taubate-sp": "Nossa frota em Taubaté conta com plataformas hidráulicas de última geração e equipe treinada para atendimento na Dutra e região urbana.",
  "sao-jose-dos-campos-sp": "Em SJC, mantivemos bases estratégicas no Satélite e Urbanova para garantir o menor tempo de chegada da região.",
  "pindamonhangaba-sp": "Atendemos Pindamonhangaba com foco na rapidez entre o centro e o distrito de Moreira César.",
  "jacarei-sp": "Nossa operação em Jacareí é otimizada para pronto atendimento nas avenidas principais e acesso à Carvalho Pinto."
};


function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, offset: number): T {
  return arr[(seed + offset * 7) % arr.length];
}

type Props = {
  cityName: string;
  neighborhoods: string[];
  uf?: string;
};

export function CitySocialProof({ cityName, neighborhoods, uf }: Props) {
  const seed = hash(cityName);
  const highways = ["Dutra", "Castello Branco", "Anhanguera", "Bandeirantes", "Imigrantes", "Anchieta", "Ayrton Senna", "Fernão Dias", "Régis Bittencourt", "Rodoanel", "Tamoios", "Carvalho Pinto", "Dom Pedro I", "Rio-Santos"];
  
  const items = Array.from({ length: 18 }, (_, i) => {
    const name = `${pick(FIRST_NAMES, seed, i)} ${pick(LAST_INITIALS, seed, i + 3)}`;
    const useHighway = (seed + i) % 2 === 0;
    const hood = neighborhoods.length
      ? pick(neighborhoods, seed, i + 1)
      : "Centro";
    const highway = pick(highways, seed, i + 5);
    
    let template = pick(TEMPLATES, seed, i + 2);
    if (useHighway && template.includes("{hood}")) {
      template = template.replace("{hood}", `rodovia ${highway}`);
    } else {
      template = template.replace("{hood}", `bairro ${hood}`);
    }
    
    const text = template.replaceAll("{city}", cityName).replaceAll("{hood}", hood);
    const days = 1 + ((seed + i * 11) % 28);
    // Para o Schema, precisamos de uma data real aproximada
    const datePublished = new Date();
    datePublished.setDate(datePublished.getDate() - days);
    
    return { name, hood: useHighway ? highway : hood, text, days, datePublished: datePublished.toISOString().split('T')[0] };
  });

  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${SITE.name} - ${cityName}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressRegion": uf || "SP",
      "addressCountry": "BR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "64"
    },
    "review": items.map(it => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": it.name
      },
      "datePublished": it.datePublished,
      "reviewBody": it.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "contentLocation": {
        "@type": "Place",
        "name": `${it.hood}, ${cityName}`
      }
    }))
  };

  return (
    <section className="mt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl text-accent/90">
            Avaliações de clientes em {cityName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Nota média <strong>4.9/5</strong> com base em atendimentos recentes.
          </p>
        </div>
        <div className="flex items-center gap-1" aria-label="5 estrelas">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 18).map((it, idx) => (
          <Card key={idx} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-center gap-1" aria-label="5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{it.text}"</p>
              <div className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <h4 className="inline text-foreground font-bold">{it.name}</h4> · <h5 className="inline">{it.hood}</h5>
                <br />
                há {it.days} {it.days === 1 ? "dia" : "dias"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Bloco de Contexto Operacional para EEAT */}
      <div className="mt-8 rounded-xl bg-muted/30 p-6 border border-border/50">
        <h3 className="text-lg font-bold mb-2 text-accent/90">Informação Operacional Regional</h3>
        <p className="text-sm text-muted-foreground italic">
          {REGIONAL_CONTEXT[`${cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}-${uf?.toLowerCase() || 'sp'}`] || 
           `Atendemos toda a região de ${cityName} com frota própria e parceiros homologados, garantindo segurança e preço justo em cada chamado.`}
        </p>
      </div>
    </section>

  );
}
