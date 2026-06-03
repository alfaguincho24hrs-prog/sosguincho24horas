import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, AlertTriangle, Truck } from "lucide-react";
import { SITE } from "@/components/site-data";

export const Route = createFileRoute("/rodovias-vale-do-paraiba")({
  head: () => {
    const title = "Guincho 24h nas Rodovias do Vale do Paraíba — Dutra, Carvalho Pinto, Tamoios";
    const description = "Atendimento de guincho e reboque 24 horas nas principais rodovias do Vale do Paraíba: Dutra (BR-116), Carvalho Pinto (SP-070), Tamoios (SP-099), Oswaldo Cruz (SP-125) e Floriano Rodrigues Pinheiro (SP-123).";
    const url = "https://sosguincho24horas.com.br/rodovias-vale-do-paraiba";
    
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: "guincho dutra, guincho carvalho pinto, guincho tamoios, guincho oswaldo cruz, reboque vale do paraíba, br-116, sp-070, sp-099" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `${SITE.name} - Rodovias`,
            "telephone": SITE.phone,
            "url": url,
            "description": description,
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Como solicitar guincho na Rodovia Presidente Dutra?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Você pode solicitar guincho na Dutra 24 horas ligando para nossa central ou via WhatsApp. Atendemos toda a extensão do Vale do Paraíba."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qual o tempo de chegada do guincho na Rodovia dos Tamoios?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "O tempo médio de chegada na Rodovia dos Tamoios é de 30 a 50 minutos, com bases de prontidão em São José dos Campos e Paraibuna."
                  }
                }
              ]
            }
          })
        }
      ],
      links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/rodovias-vale-do-paraiba" }],
    };
  },
  component: RodoviasVPPage,
});

const RODOVIAS = [
  {
    sigla: "BR-116",
    nome: "Rodovia Presidente Dutra",
    extensao: "402 km no trecho SP",
    descricao:
      "Principal eixo rodoviário do país, liga São Paulo ao Rio de Janeiro cortando todo o Vale do Paraíba. Cidades atendidas: Guarulhos, Arujá, Jacareí, São José dos Campos, Caçapava, Taubaté, Pindamonhangaba, Aparecida, Guaratinguetá, Lorena, Cruzeiro e divisa com RJ.",
    pontos: ["Pedágio Moreira César", "Trevo de Caçapava", "Saída Dutra/Tamoios em São José", "Praça Aparecida"],
    riscos: "Trechos de serra com neblina entre Roseira e Cachoeira Paulista; pista molhada e congestionamento aos finais de semana.",
  },
  {
    sigla: "SP-070",
    nome: "Rodovia Ayrton Senna / Carvalho Pinto",
    extensao: "139 km",
    descricao:
      "Liga São Paulo a Taubaté passando por Guararema, Jacareí e São José dos Campos. Alternativa rápida à Dutra com pista duplicada e pedágios eletrônicos.",
    pontos: ["Praça do Pinhão (Jacareí)", "Saída Urbanova/Aquarius", "Entroncamento Carvalho Pinto/Dutra em Taubaté"],
    riscos: "Velocidade alta e pouca acostamento em alguns trechos; presença de fauna no entardecer.",
  },
  {
    sigla: "SP-099",
    nome: "Rodovia dos Tamoios",
    extensao: "82 km",
    descricao:
      "Conecta São José dos Campos ao Litoral Norte (Caraguatatuba, Ubatuba, São Sebastião, Ilhabela). Trecho de serra duplicado, mas com curvas acentuadas e neblina constante.",
    pontos: ["Início em SJC (entroncamento Dutra)", "Paraibuna", "Trecho de Serra Nova", "Descida para Caraguatatuba"],
    riscos: "Serra com neblina densa, chuvas fortes no verão e risco de panes em descidas longas. Reboque pesado disponível 24h.",
  },
  {
    sigla: "SP-125",
    nome: "Rodovia Oswaldo Cruz",
    extensao: "97 km",
    descricao:
      "Cruza a Serra do Mar ligando Taubaté a Ubatuba, passando por Redenção da Serra e São Luiz do Paraitinga. Pista simples e curvilínea.",
    pontos: ["Saída Taubaté", "São Luiz do Paraitinga", "Subida da Serra para Ubatuba"],
    riscos: "Curvas fechadas, pista molhada, queda de barreiras no período chuvoso.",
  },
  {
    sigla: "SP-123",
    nome: "Rodovia Floriano Rodrigues Pinheiro",
    extensao: "47 km",
    descricao:
      "Acesso turístico à Serra da Mantiqueira, ligando Taubaté a Campos do Jordão via Pindamonhangaba. Bastante usada no inverno.",
    pontos: ["Pindamonhangaba", "Subida da Serra", "Acesso Capivari/Campos do Jordão"],
    riscos: "Geada, neblina e aclives longos que provocam superaquecimento de motor e câmbio.",
  },
  {
    sigla: "BR-459",
    nome: "Rodovia Lorena–Itajubá",
    extensao: "98 km no trecho SP/MG",
    descricao:
      "Liga Lorena (SP) a Itajubá (MG) cortando a Serra da Mantiqueira pela região de Piquete e Delfim Moreira. Importante corredor industrial.",
    pontos: ["Lorena", "Piquete", "Subida da Serra para MG"],
    riscos: "Pista simples sinuosa, neblina noturna e trechos sem acostamento.",
  },
];

function RodoviasVPPage() {
  const telHref = "https://w.app/guincho24horas";
  const wppHref = "https://w.app/guincho24horas";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 border-b">
        <div className="container max-w-5xl">
          <Badge className="mb-4">Vale do Paraíba — SP</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-accent">
            Guincho 24h nas Rodovias do Vale do Paraíba
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
            Reboque rápido e seguro em qualquer ponto da Dutra (BR-116), Carvalho Pinto (SP-070),
            Tamoios (SP-099), Oswaldo Cruz (SP-125), Floriano Rodrigues Pinheiro (SP-123) e BR-459.
            Cobertura completa entre São Paulo, Litoral Norte e Sul de Minas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href={telHref}><Phone className="mr-2 h-4 w-4" />Ligar agora — {SITE.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={wppHref} target="_blank" rel="noreferrer">WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Lista de rodovias */}
      <section className="py-12">
        <div className="container max-w-5xl space-y-6">
          {RODOVIAS.map((r) => {
            const highwaySlugMap: Record<string, string> = {
              "BR-116": "rodovia-presidente-dutra",
              "SP-070": "rodovia-carvalho-pinto",
            };
            const targetSlug = highwaySlugMap[r.sigla];

            return (
              <Card key={r.sigla}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <Badge variant="secondary" className="mb-2">{r.sigla}</Badge>
                      <CardTitle className="text-2xl">
                        {targetSlug ? (
                          <Link to="/guinchos-nas-rodovias-{$slug}" params={{ slug: targetSlug }} className="hover:text-primary transition-colors">
                            {r.nome}
                          </Link>
                        ) : r.nome}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Extensão: {r.extensao}</p>
                    </div>
                    <div className="flex gap-2">
                      {targetSlug && (
                        <Button asChild variant="outline" size="sm">
                          <Link to="/guinchos-nas-rodovias-{$slug}" params={{ slug: targetSlug }}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      )}
                      <Button asChild size="sm" className="bg-[image:var(--gradient-cta)] text-primary hover:opacity-95">
                        <a href={telHref}><Phone className="mr-2 h-4 w-4" />Acionar guincho</a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{r.descricao}</p>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" /> Pontos de referência atendidos
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {r.pontos.map((p) => <li key={p}>• {p}</li>)}
                    </ul>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                    <AlertTriangle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm"><strong>Atenção:</strong> {r.riscos}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Cidades do Vale */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Truck className="h-7 w-7 text-primary" />
            Cidades e Rodovias no Vale do Paraíba
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              ["sao-jose-dos-campos-sp", "São José dos Campos"],
              ["taubate-sp", "Taubaté"],
              ["jacarei-sp", "Jacareí"],
              ["pindamonhangaba-sp", "Pindamonhangaba"],
              ["tremembe-sp", "Tremembé"],
              ["aparecida-sp", "Aparecida"],
              ["roseira-sp", "Roseira"],
              ["cruzeiro-sp", "Cruzeiro"],
              ["queluz-sp", "Queluz"],
              ["campos-do-jordao-sp", "Campos do Jordão"],
              ["sao-luiz-do-paraitinga-sp", "São Luiz do Paraitinga"],
              ["caraguatatuba-sp", "Caraguatatuba"],
              ["ubatuba-sp", "Ubatuba"],
              ["sao-sebastiao-sp", "São Sebastião"],
            ].map(([slug, name]) => (
              <Link
                key={slug}
                to="/guincho-em-{$slug}"
                params={{ slug }}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-background border text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {name}
              </Link>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4">Acesso Rápido a Rodovias</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { name: "Presidente Dutra", slug: "rodovia-presidente-dutra" },
               { name: "Carvalho Pinto", slug: "rodovia-carvalho-pinto" },
               { name: "Marginal Tietê", slug: "marginal-tiete" },
               { name: "Castello Branco", slug: "rodovia-castelo-branco" },
               { name: "Imigrantes", slug: "rodovia-dos-imigrantes" },
               { name: "Anchieta", slug: "rodovia-anchieta" },
               { name: "Anhanguera", slug: "rodovia-anhanguera" },
               { name: "Bandeirantes", slug: "rodovia-dos-bandeirantes" }
             ].map(r => (
               <Link 
                 key={r.slug} 
                 to="/guinchos-nas-rodovias-{$slug}" 
                 params={{ slug: r.slug }}
                 className="p-3 bg-background border rounded-lg hover:border-primary transition-all text-sm font-semibold flex items-center justify-between group"
               >
                 {r.name}
                 <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-16">
        <div className="container max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold">Guincho 24h no Vale do Paraíba: por que escolher nossa rede?</h2>
          <p className="text-muted-foreground leading-relaxed">
            O Vale do Paraíba é uma das regiões mais movimentadas do Brasil, cruzada diariamente por milhares de
            caminhões, carros de passeio, motos e veículos de carga que se deslocam entre São Paulo, Rio de Janeiro,
            o Litoral Norte paulista e o Sul de Minas. Esse fluxo intenso, somado a serras com neblina, chuvas
            torrenciais no verão e descidas longas como a da <strong>Rodovia dos Tamoios</strong> e a da{" "}
            <strong>Oswaldo Cruz</strong>, faz com que panes mecânicas, superaquecimentos e acidentes sejam
            ocorrências frequentes. Por isso mantemos bases operacionais em <strong>São José dos Campos</strong>,{" "}
            <strong>Taubaté</strong>, <strong>Jacareí</strong>, <strong>Pindamonhangaba</strong>,{" "}
            <strong>Aparecida</strong>, <strong>Guaratinguetá</strong>, <strong>Cruzeiro</strong> e{" "}
            <strong>Caraguatatuba</strong>, garantindo tempo de resposta médio inferior a 45 minutos em qualquer
            ponto da Dutra (BR-116) e da Carvalho Pinto (SP-070).
          </p>
          <h3 className="text-2xl font-bold pt-4">Serviços disponíveis 24 horas em toda a região</h3>
          <p className="text-muted-foreground leading-relaxed">
            Nossa frota inclui <strong>guincho leve com plataforma hidráulica</strong> para carros de passeio,{" "}
            <strong>guincho médio com asa delta</strong> para vans e utilitários, <strong>guincho pesado</strong>{" "}
            para caminhões, ônibus e máquinas, além de <strong>prancha rebaixada</strong> para veículos esportivos,
            blindados e importados. Também oferecemos <strong>auto socorro mecânico</strong>, troca de pneu,
            partida de bateria, chaveiro automotivo emergencial e <strong>pane seca</strong> com entrega de
            combustível em qualquer trecho do Vale.
          </p>
          <h3 className="text-2xl font-bold pt-4">Atendimento em emergências de serra</h3>
          <p className="text-muted-foreground leading-relaxed">
            Trechos como a subida para <strong>Campos do Jordão</strong> pela SP-123, a descida da{" "}
            <strong>Tamoios</strong> rumo a Caraguatatuba e a serra da <strong>Oswaldo Cruz</strong> em direção a
            Ubatuba exigem reboque com freio motor reforçado, cintas certificadas e operadores experientes em
            condução em aclives e declives acentuados. Nossa equipe é treinada para atuar com segurança em neblina
            densa, pista molhada e em situações de geada — comuns no inverno da Serra da Mantiqueira.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href={telHref}><Phone className="h-5 w-5" /> Ligar agora — {SITE.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={wppHref} target="_blank" rel="noreferrer">WhatsApp emergencial</a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Parou na estrada? Aja rápido.</h2>
          <p className="text-muted-foreground mb-6">
            Equipes de guincho leve, médio e pesado prontas para atender qualquer trecho do Vale do Paraíba 24 horas.
          </p>
          <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
            <a href={telHref}><Phone className="mr-2 h-4 w-4" />{SITE.phone}</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
