import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, AlertTriangle, Fuel, ChevronRight, Waves } from "lucide-react";
import { SITE } from "@/components/site-data";

const URL = "https://sosguincho24horas.com.br/guincho-postos-dutra-sao-jose-dos-campos";
const TEL = "https://wa.me/5511996451510";

const FAQS = [
  {
    q: "Vocês atendem dentro dos postos da Dutra em São José dos Campos?",
    a: "Sim. Fazemos o resgate diretamente no pátio dos postos e áreas de descanso da BR-116 em São José dos Campos, nos dois sentidos (Rio e São Paulo), 24 horas por dia.",
  },
  {
    q: "Quanto tempo leva o guincho para chegar a um posto da Dutra em SJC?",
    a: "O tempo médio é de 20 a 40 minutos, com bases próximas ao trevo Dutra/Tamoios, Jardim Satélite e Eugênio de Melo.",
  },
  {
    q: "Levam o veículo do posto para onde?",
    a: "Para a oficina, concessionária, residência ou pátio indicado em São José dos Campos, Jacareí, Caçapava, Taubaté ou no Litoral Norte pela Rodovia dos Tamoios.",
  },
  {
    q: "Atendem caminhão parado no posto?",
    a: "Sim. Temos guincho pesado e prancha rebaixada para caminhões, ônibus, carretas e máquinas paradas em postos e acostamentos da Dutra.",
  },
];

export const Route = createFileRoute("/guincho-postos-dutra-sao-jose-dos-campos")({
  head: () => {
    const title = "Guincho nos Postos da Dutra em São José dos Campos 24h";
    const description =
      "Guincho e reboque 24h nos postos de gasolina e áreas de descanso da Via Dutra (BR-116) em São José dos Campos. Socorro no km exato, nos dois sentidos.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "guincho posto dutra, guincho br-116 são josé dos campos, reboque posto de gasolina dutra, auto socorro dutra sjc, guincho km dutra",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: URL },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "robots", content: "index,follow" },
      ],
      links: [{ rel: "canonical", href: URL }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Guincho nos postos da Via Dutra em São José dos Campos",
                serviceType: "Guincho e reboque 24 horas",
                provider: {
                  "@type": "LocalBusiness",
                  name: SITE.name,
                  telephone: SITE.phone,
                  url: URL,
                },
                areaServed: [
                  { "@type": "City", name: "São José dos Campos" },
                  { "@type": "Place", name: "Rodovia Presidente Dutra (BR-116)" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQS.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: PostosDutraPage,
});

const TRECHOS = [
  {
    titulo: "Sentido Rio de Janeiro — km 145 ao km 165",
    referencias: [
      "Postos e conveniências na altura do Jardim Satélite",
      "Área de descanso próxima ao trevo Dutra/Tamoios",
      "Postos no trecho de Eugênio de Melo",
      "Acesso ao Parque Industrial e Dutra Business Park",
    ],
    risco:
      "Tráfego pesado de caminhões e filas nas alças de acesso — o resgate é feito com sinalização completa dentro do pátio.",
  },
  {
    titulo: "Sentido São Paulo — km 165 ao km 145",
    referencias: [
      "Postos na altura de Putim e Vista Verde",
      "Conveniência próxima ao acesso Urbanova/Aquarius",
      "Área de parada de caminhoneiros perto de Jacareí",
      "Postos na saída para a Carvalho Pinto (SP-070)",
    ],
    risco:
      "Congestionamento em horário de pico e retorno de fim de semana; despachamos a plataforma mais próxima da base de SJC.",
  },
  {
    titulo: "Entroncamento Dutra × Tamoios (SP-099)",
    referencias: [
      "Postos no início da Tamoios em São José dos Campos",
      "Última parada antes da subida/descida de serra",
      "Pátios de apoio para caminhão e carreta",
    ],
    risco:
      "Ponto crítico de superaquecimento e pane seca para quem sobe do Litoral Norte. Temos guincho pesado e pane seca 24h nesse trecho.",
  },
];

const LITORAL_NORTE: Array<[string, string]> = [
  ["caraguatatuba-sp", "Caraguatatuba"],
  ["ubatuba-sp", "Ubatuba"],
  ["sao-sebastiao-sp", "São Sebastião"],
  ["ilhabela-sp", "Ilhabela"],
];

const VIZINHAS: Array<[string, string]> = [
  ["jacarei-sp", "Jacareí"],
  ["cacapava-sp", "Caçapava"],
  ["taubate-sp", "Taubaté"],
  ["pindamonhangaba-sp", "Pindamonhangaba"],
  ["monteiro-lobato-sp", "Monteiro Lobato"],
  ["santa-branca-sp", "Santa Branca"],
];

const RODOVIAS: Array<[string, string]> = [
  ["rodovia-presidente-dutra", "Presidente Dutra (BR-116)"],
  ["rodovia-carvalho-pinto", "Carvalho Pinto (SP-070)"],
  ["rodovia-ayrton-senna", "Ayrton Senna"],
];

function PostosDutraPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background py-16">
        <div className="container max-w-5xl">
          <Badge className="mb-4">Via Dutra — São José dos Campos/SP</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-accent md:text-5xl">
            Guincho nos postos da Dutra em São José dos Campos
          </h1>
          <p className="mb-6 max-w-3xl text-lg text-muted-foreground">
            Parou num posto de gasolina, conveniência ou área de descanso da{" "}
            <strong>Rodovia Presidente Dutra (BR-116)</strong> em São José dos Campos? Nossa
            central despacha plataforma leve, asa-delta ou guincho pesado direto para o km em que
            você está — nos dois sentidos, 24 horas por dia, inclusive madrugada e feriado.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href={TEL}>
                <Phone className="mr-2 h-4 w-4" /> Ligar agora — {SITE.phone}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://wa.me/5511996451510?text=Ol%C3%A1!%20Estou%20parado%20em%20um%20posto%20da%20Dutra%20em%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos."
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp 24h
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-5xl space-y-6">
          <h2 className="text-3xl font-bold text-accent">Trechos e pontos de apoio atendidos</h2>
          <p className="max-w-3xl text-muted-foreground">
            Cobrimos toda a travessia da Dutra por São José dos Campos, do limite com Jacareí até a
            divisa com Caçapava, incluindo pátios de postos, paradas de caminhoneiro e alças de acesso.
          </p>
          {TRECHOS.map((t) => (
            <Card key={t.titulo}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Fuel className="h-5 w-5 text-primary" /> {t.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <MapPin className="h-4 w-4 text-primary" /> Pontos de referência
                  </h3>
                  <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    {t.referencias.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm">
                    <strong>Atenção:</strong> {t.risco}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30 py-12">
        <div className="container max-w-5xl space-y-8">
          <div>
            <h2 className="mb-2 flex items-center gap-2 text-3xl font-bold text-accent">
              <Waves className="h-7 w-7 text-primary" /> Guincho no Litoral Norte pela Tamoios
            </h2>
            <p className="mb-4 max-w-3xl text-muted-foreground">
              Quem sai dos postos da Dutra em São José dos Campos rumo ao litoral entra na Rodovia
              dos Tamoios (SP-099). Atendemos a serra e as cidades da costa com o mesmo recorte local:
            </p>
            <div className="flex flex-wrap gap-2">
              {LITORAL_NORTE.map(([slug, name]) => (
                <Link
                  key={slug}
                  to="/guincho-em-{$slug}"
                  params={{ slug }}
                  className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Guincho em {name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-3xl font-bold text-accent">Cidades vizinhas no corredor da Dutra</h2>
            <p className="mb-4 max-w-3xl text-muted-foreground">
              Mesma operação, mesma central: acione a página da cidade mais próxima do seu km.
            </p>
            <div className="flex flex-wrap gap-2">
              {VIZINHAS.map(([slug, name]) => (
                <Link
                  key={slug}
                  to="/guincho-em-{$slug}"
                  params={{ slug }}
                  className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Guincho em {name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Rodovias de acesso</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {RODOVIAS.map(([slug, name]) => (
                <Link
                  key={slug}
                  to="/guinchos-nas-rodovias-{$slug}"
                  params={{ slug }}
                  className="group flex items-center justify-between rounded-lg border bg-background p-3 text-sm font-semibold transition-all hover:border-primary"
                >
                  {name}
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/guincho-em-{$slug}" params={{ slug: "sao-jose-dos-campos-sp" }}>
                  Guincho em São José dos Campos
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/rodovias-vale-do-paraiba">Rodovias do Vale do Paraíba</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-accent">
            Por que tanta pane acontece nos postos da Dutra em SJC?
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            A travessia da BR-116 por São José dos Campos concentra o tráfego entre São Paulo e Rio
            de Janeiro somado a quem entra e sai da Rodovia dos Tamoios rumo ao Litoral Norte. É
            justamente ao parar no posto que o motorista percebe o problema: motor superaquecido
            depois de horas em fila, bateria que não gira mais depois de desligar, pneu com bolha
            após buraco no acostamento, embreagem queimada em rampa ou simplesmente combustível que
            não chegou até o próximo posto.
          </p>
          <h3 className="pt-4 text-2xl font-bold">O que resolvemos no próprio pátio</h3>
          <ul className="space-y-3 leading-relaxed text-muted-foreground">
            <li>✅ <strong>Pane seca:</strong> entrega emergencial de combustível no posto ou acostamento.</li>
            <li>✅ <strong>Bateria e partida:</strong> chupeta, teste de alternador e troca no local.</li>
            <li>✅ <strong>Troca de pneu</strong> com estepe ou remoção quando não há estepe utilizável.</li>
            <li>✅ <strong>Chaveiro automotivo</strong> para chave trancada dentro do carro no pátio do posto.</li>
            <li>✅ <strong>Guincho pesado</strong> para caminhão, ônibus e carreta parados na área de descanso.</li>
            <li>✅ <strong>Prancha rebaixada</strong> para carros blindados, esportivos e importados.</li>
          </ul>
          <h3 className="pt-4 text-2xl font-bold">Como informar sua posição na Dutra</h3>
          <p className="leading-relaxed text-muted-foreground">
            Envie a localização em tempo real pelo WhatsApp e, se possível, informe o{" "}
            <strong>número do km na placa</strong>, o <strong>sentido</strong> (Rio ou São Paulo) e o
            nome do posto ou da conveniência. Com esses três dados conseguimos entrar pela alça
            correta e evitar retorno de vários quilômetros — é o que reduz o tempo de chegada para a
            faixa de 20 a 40 minutos.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
              <a href={TEL}>
                <Phone className="h-5 w-5" /> Ligar agora — {SITE.phone}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/5511996451510" target="_blank" rel="noreferrer">
                WhatsApp emergencial
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t py-16">
        <div className="container max-w-4xl space-y-4">
          <h2 className="text-3xl font-bold text-accent">Perguntas frequentes</h2>
          {FAQS.map((f) => (
            <Card key={f.q}>
              <CardContent className="p-5">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
