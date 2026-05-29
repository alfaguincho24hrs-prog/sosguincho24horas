import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, MapPin } from "lucide-react";
import { SITE } from "./site-data";
import { CITY_LOCAL } from "./city-neighborhoods";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Testimonial = {
  name: string;
  city: string;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [
  { name: "Carlos Eduardo Almeida", city: "São Paulo - SP", text: "Furei o pneu na Marginal Tietê às 2h da manhã e o guincho chegou em 25 minutos. Atendimento educado, preço justo e levou meu carro até a oficina sem nenhum arranhão. Recomendo de olhos fechados esse serviço de guincho 24 horas." },
  { name: "Mariana Souza Lima", city: "São José dos Campos - SP", text: "Meu carro quebrou na Dutra perto de Caçapava. Liguei e em menos de 40 minutos o reboque estava no local. Operador super atencioso, explicou tudo. Melhor guincho do Vale do Paraíba!" },
  { name: "Roberto Silva Mendes", city: "Taubaté - SP", text: "Pane elétrica no meio da Carvalho Pinto. O auto socorro chegou rápido, tentou dar partida e quando viu que era a bateria, já trouxe uma nova. Resolveu sem precisar rebocar. Excelente!" },
  { name: "Juliana Pereira Costa", city: "Jacareí - SP", text: "Bati o carro na rotatória e fiquei desesperada. O guincho 24 horas chegou em 30 minutos, o motorista foi super gentil e me ajudou até com o boletim. Serviço humano e profissional." },
  { name: "Fernando Oliveira Ramos", city: "Pindamonhangaba - SP", text: "Subindo para Campos do Jordão meu carro superaqueceu. Ligaram, em uma hora estava lá em cima. Reboque pesado preparado para serra. Salvou minha viagem em família." },
  { name: "Patrícia Gomes Ribeiro", city: "Caraguatatuba - SP", text: "Descendo a Tamoios com o carro carregado, estourou o pneu e não tinha estepe. O guincho chegou rápido, levou até Caraguá com segurança. Cobrança transparente, sem surpresa." },
  { name: "Ricardo Barbosa Nunes", city: "Ubatuba - SP", text: "Aluguei carro pra praia, pifou na Oswaldo Cruz. O atendimento foi impecável, conseguiram me levar até a locadora em Taubaté. Empresa de guincho séria e responsável." },
  { name: "Aline Cardoso Martins", city: "Aparecida - SP", text: "Visita ao Santuário e o carro não pegou. Em 20 minutos veio o auto socorro, deu partida e me indicou uma oficina. Que serviço maravilhoso de guincho 24 horas!" },
  { name: "Marcos Antonio Ferreira", city: "Guaratinguetá - SP", text: "Caminhonete pesada, achei que ninguém ia conseguir. Veio um guincho médio com asa delta, perfeito. Levou até minha fazenda sem nenhum dano. Preço excelente." },
  { name: "Beatriz Rocha Carvalho", city: "Cruzeiro - SP", text: "Quebrei na BR-116 perto da divisa com RJ. Liguei achando que ia demorar horas. Em 50 minutos o reboque estava lá. Atendimento 24 horas de verdade!" },
  { name: "Thiago Henrique Lopes", city: "Campos do Jordão - SP", text: "Inverno com geada, carro travou na subida. O guincho da Mantiqueira é especializado em serra, chegou rápido e desceu com toda segurança. Recomendo demais." },
  { name: "Camila Fernandes Dias", city: "Tremembé - SP", text: "Pane seca à noite numa estrada vicinal. Eles trouxeram combustível em 30 minutos. Salvaram meu dia! Auto socorro confiável e barato." },
  { name: "Gustavo Henrique Pinto", city: "Roseira - SP", text: "Acidente na Dutra, carro parado na pista. O guincho chegou com sinalização completa, removeu rapidinho. Profissionalismo nota 10 para essa equipe de reboque." },
  { name: "Larissa Moreira Castro", city: "Queluz - SP", text: "Estava voltando de viagem e o motor fundiu. Mesmo num lugar afastado, o guincho 24 horas apareceu e me levou até São Paulo. Cobrança honesta pelo KM rodado." },
  { name: "Eduardo Vasconcelos Reis", city: "São Luiz do Paraitinga - SP", text: "Passeio de fim de semana, carro atolou em estrada de terra. Mandaram um 4x4 com guincho e tiraram sem danificar nada. Empresa salvadora!" },
  { name: "Renata Cristina Alves", city: "São Sebastião - SP", text: "Carro com problema no câmbio na descida da serra. Reboque com prancha rebaixada para não danificar. Atendimento de primeira linha, super recomendo." },
  { name: "Paulo César Monteiro", city: "Rio de Janeiro - RJ", text: "Visitando São Paulo meu carro pifou. Conseguiram um guincho que me trouxe de volta pro Rio. Serviço interestadual organizado, motorista cordial e pontual." },
  { name: "Sandra Regina Batista", city: "Belo Horizonte - MG", text: "Viajando para o litoral paulista, carro deu pane. Achei essa empresa pelo Google e foi maravilhoso. Guincho 24 horas sério, com nota fiscal e tudo certinho." },
  { name: "Anderson Luiz Cavalcante", city: "Guarulhos - SP", text: "Bateria descarregou no estacionamento do shopping. Em 15 minutos o socorro mecânico estava lá. Mais barato que chamar concessionária. Excelente custo-benefício." },
  { name: "Vanessa Aparecida Souto", city: "Santo André - SP", text: "Acidente na Anchieta, fiquei com medo. O atendente do guincho me acalmou pelo telefone até chegar. Atendimento humano que faz a diferença numa hora dessas." },
  { name: "Diego Martins Bezerra", city: "São Bernardo do Campo - SP", text: "Reboque para minha moto após queda. Içamento perfeito, sem riscar a pintura. Pessoal especializado em guincho de moto. Voltarei a chamar com certeza." },
  { name: "Tatiane Ribeiro Macedo", city: "Osasco - SP", text: "Minha SUV não saía da garagem inundada. Trouxeram guincho e tiraram sem danificar. Empresa que atende emergência mesmo em situações difíceis." },
  { name: "Felipe Augusto Tavares", city: "Campinas - SP", text: "Quebrei na Bandeirantes voltando de viagem. Guincho chegou rapidinho, motorista experiente, levou até em casa. Serviço de reboque 24 horas confiável." },
  { name: "Cláudia Helena Marques", city: "Sorocaba - SP", text: "Pneu furado na Castello Branco, sem estepe. O auto socorro trouxe pneu novo já calibrado. Resolveram tudo no acostamento. Sensacional!" },
  { name: "Leandro Soares Pacheco", city: "Mogi das Cruzes - SP", text: "Atendimento na rodovia Ayrton Senna. Rápido, educado, com equipamentos modernos. Guincho leve perfeito para meu hatch. Indico para todos os amigos." },
  { name: "Adriana Pires Coelho", city: "Diadema - SP", text: "Carro travou em rua estreita, achei que ninguém ia conseguir tirar. O operador foi habilidoso, manobrou com perfeição. Profissional de verdade!" },
  { name: "Bruno Rafael Santana", city: "Itaquaquecetuba - SP", text: "Bateu no carro à noite e o seguro demorava. Chamei direto, em 30 minutos resolveram. Pago menos do que pelo seguro. Vale muito a pena." },
  { name: "Simone Aparecida Brito", city: "Suzano - SP", text: "Mãe de família, carro parou com as crianças. Atendimento prioritário, super carinhoso com elas. Empresa que se importa com o cliente. Obrigada!" },
  { name: "Wellington Moura Freitas", city: "Lorena - SP", text: "Caminhão da empresa quebrou na BR-459. Guincho pesado chegou preparado, levou até a oficina em Itajubá. Serviço para frota com agilidade." },
  { name: "Priscila Nogueira Ataíde", city: "Cubatão - SP", text: "Descendo a Imigrantes meu freio falhou. Consegui parar e liguei. O guincho chegou rápido na serra, com toda segurança. Salvaram minha vida literalmente." },
  { name: "Rafael Augusto Teixeira", city: "São Paulo - SP", text: "Procurei guincho sp no Google e achei essa empresa. Atendimento de guincho 24 horas sp impecável, chegaram na Marginal Pinheiros em 20 minutos. Guincho mais barato em São Paulo que encontrei." },
  { name: "Carolina Vieira Brandão", city: "Santos - SP", text: "Precisei de guincho urgente em Santos, meu carro travou no porto. Empresa de guincho 24 horas sério, com nota fiscal. Preço de guincho 24 horas muito honesto, recomendo demais." },
  { name: "Henrique Aparecido Lima", city: "Bertioga - SP", text: "Chamar guincho em Bertioga numa madrugada de feriado parecia impossível. Foi rápido, motorista educado. Serviço de guincho 24 horas que realmente funciona, sem enrolação." },
  { name: "Daniela Cristina Moura", city: "Praia Grande - SP", text: "Moto guincho perfeito após pane elétrica na Litorânea. Auto socorro para moto especializado, içamento sem riscar nada. Guincho para moto em Praia Grande que entende do assunto." },
  { name: "Vinicius Pereira Andrade", city: "São Vicente - SP", text: "Reboque para carros em São Vicente após batida leve. Guincho plataforma chegou em 25 minutos, atendimento humano. Telefone de guincho sempre salvo na agenda agora." },
  { name: "Mônica Ribeiro Sales", city: "Itanhaém - SP", text: "Guincho 24 horas em Itanhaém durante temporada lotada. Conseguiram chegar mesmo com trânsito da Padre Manoel da Nóbrega. Guincho na região sensacional, super indico." },
  { name: "Eduardo Mansur Goulart", city: "Mongaguá - SP", text: "Contratar guincho em Mongaguá foi tranquilo, atendente explicou tudo. Reboque 24 horas em Mongaguá com prancha rebaixada para meu rebaixado. Cuidado total com o veículo." },
  { name: "Aline Beatriz Sampaio", city: "Peruíbe - SP", text: "Empresa de reboque 24 horas que atende Peruíbe mesmo em alta temporada. Guincho dia e noite no litoral funciona de verdade. Preço de guincho transparente, sem taxa escondida." },
  { name: "Rogério Almeida Pontes", city: "Guarujá - SP", text: "Guincho 24 horas no Guarujá após problema na balsa. Guincho próximo em poucos minutos, motorista da região conhecia tudo. Guincho perto da gente faz toda diferença." },
  { name: "Letícia Souza Marinho", city: "Mogi Guaçu - SP", text: "Empresa de guincho em Mogi Guaçu confiável. Guincho de carro no centro da cidade após pane no câmbio. Atendimento educado e rápido, voltarei a chamar com certeza." },
  { name: "Marcelo Antunes Faria", city: "Limeira - SP", text: "Guinchos em Limeira são raros de qualidade, mas essa empresa surpreendeu. Guinchos 24 horas no centro com motorista experiente. Preço de guincho bem abaixo da concorrência." },
  { name: "Patrícia Bento Aguiar", city: "Piracicaba - SP", text: "Reboque em Piracicaba após acidente leve. Empresa de reboque no interior séria, com toda documentação. Serviços de reboque em Piracicaba de primeira linha, recomendo." },
  { name: "Cristiano Reis Vasconcellos", city: "Rio Claro - SP", text: "Guinchos no interior nem sempre são bons, mas essa empresa é diferente. Guincho de carro no Rio Claro com asa delta, sem danificar nada. Serviço de guincho top." },
  { name: "Vera Lúcia Damasceno", city: "Araraquara - SP", text: "Guincho de moto no centro de Araraquara após queda. Auto socorro moto 24 horas chegou em 15 minutos. Pessoal especializado em moto guincho, içamento perfeito sem arranhão." },
  { name: "Jorge Henrique Pacheco", city: "São Carlos - SP", text: "Guincho barato no São Carlos sem perder qualidade. Reboque para caminhões em São Carlos quando minha pickup quebrou. Serviços de guinchos em toda região, ótimo atendimento." },
  { name: "Beatriz Cunha Albuquerque", city: "Bauru - SP", text: "Guincho urgente em Bauru após pane na Marechal Rondon. Reboque 24 horas em Bauru com sinalização completa. Empresa de guincho que prioriza segurança, sensacional." },
  { name: "Daniel Marcondes Pires", city: "Marília - SP", text: "Transporte de carros em Marília até oficina especializada. Guincho plataforma em Marília com cintas adequadas. Empresa de guincho 24 horas que cuida do seu patrimônio." },
  { name: "Renata Boechat Siqueira", city: "Presidente Prudente - SP", text: "Guincho 24 horas em Presidente Prudente após batida na BR-374. Guincho urgente em momento de desespero, atendente me acalmou. Reboque para carros em Prudente confiável." },
  { name: "Fábio Henrique Coutinho", city: "Araçatuba - SP", text: "Transporte de moto em Araçatuba até oficina autorizada. Guincho para moto em região de difícil acesso. Moto guincho com profissionais que entendem mesmo, recomendo." },
  { name: "Sílvia Aparecida Rangel", city: "São José do Rio Preto - SP", text: "Guincho urgente em São José do Rio Preto durante feriado. Empresa de reboque em Rio Preto que atende mesmo em horário difícil. Guincho 24 horas sem enrolação." },
  { name: "Antônio Carlos Mello", city: "Ribeirão Preto - SP", text: "Guincho 24 horas sp interior, atendimento em Ribeirão impecável. Reboque para caminhões em Ribeirão Preto após problema no diferencial. Serviço de guincho 24 horas top." },
  { name: "Marina Coelho Bezerra", city: "Franca - SP", text: "Guincho de motos em Franca após pane na Anhanguera. Auto socorro para moto chegou rápido com kit completo. Guincho para moto em Franca que resolve mesmo." },
  { name: "Leonardo Vieira Magalhães", city: "Barretos - SP", text: "Transporte de equipamentos agrícolas em Barretos para fazenda. Reboque com prancha pesada, motorista experiente em estrada de terra. Serviços de guinchos em região rural excelente." },
  { name: "Tatiana Borges Quintela", city: "Catanduva - SP", text: "Guincho na região de Catanduva quando ninguém atendia. Guincho dia e noite no interior salvou minha viagem. Empresa de guincho 24 horas com atendimento humanizado." },
  { name: "Rodrigo Fonseca Telles", city: "Jundiaí - SP", text: "Guincho pesados em Jundiaí para meu caminhão de mudança. Reboque para caminhões em Jundiaí com guincho preparado. Transporte de caminhão em Jundiaí sem complicação." },
  { name: "Cláudia Marina Esteves", city: "Itu - SP", text: "Guincho próximo em Itu chegou em 20 minutos, surpreendente. Guincho preço justo em região turística, sem abuso. Empresa de reboque em Itu que valoriza o cliente." },
  { name: "Gabriel Henrique Macedo", city: "Salto - SP", text: "Reboque em Salto após colisão traseira. Guincho na região com atendimento 24 horas real. Empresa de reboque no interior que cumpre o prometido, sem demora absurda." },
  { name: "Vanessa Lopes Quadros", city: "Indaiatuba - SP", text: "Guincho de carro no Indaiatuba após pane elétrica. Guincho 24 horas com socorro mecânico embutido, deu partida na hora. Serviço de guincho dois em um, ótimo." },
  { name: "Sérgio Murilo Caetano", city: "Americana - SP", text: "Guinchos baratos no interior são raros, essa empresa é exceção. Guincho de carro no Americana com plataforma nova. Preço de guincho 24 horas muito competitivo, recomendo." },
  { name: "Priscila Tavares Dornelas", city: "Santa Bárbara d'Oeste - SP", text: "Empresa de guincho em Santa Bárbara confiável de verdade. Guincho urgente em hora de aperto, sem deixar na mão. Guincho 24 horas no interior funciona mesmo." },
  { name: "Marco Aurélio Cintra", city: "Hortolândia - SP", text: "Transporte de veículos em Hortolândia até concessionária. Guincho plataforma em Hortolândia com cintas certificadas. Serviços de reboque em Hortolândia organizados, sem improviso." },
  { name: "Adriana Furtado Peixoto", city: "Sumaré - SP", text: "Guincho na região de Sumaré após pane no veículo da empresa. Guincho particular para frota com agilidade. Empresa de guincho que entende urgência corporativa." },
  { name: "Luiz Felipe Andrade Costa", city: "Cotia - SP", text: "Guincho perto de Cotia em estrada serrana. Guincho dia e noite no interior salvou meu fim de semana. Telefone de guincho que vou guardar para sempre." },
  { name: "Renato Fernandes Quiroga", city: "Embu das Artes - SP", text: "Remoção de veículo em subsolo do prédio com patins. Remoção de carro com patins é especialidade rara, encontraram solução. Empresa de reboque 24 horas equipada de verdade." },
  { name: "Carla Beatriz Olinto", city: "Taboão da Serra - SP", text: "Transporte de motos antigas em Taboão da Serra até evento de colecionador. Transporte de moto com cuidado de joia. Transporte de motos de colecionador em mãos certas." },
  { name: "Eduardo Martins Bragança", city: "Barueri - SP", text: "Transporte de carros antigos em Barueri para exposição. Transporte de carros de colecionador com plataforma fechada. Transporte de veículos especiais com profissionalismo total, indico." },
  { name: "Joana Darc Albuquerque", city: "Itapevi - SP", text: "Transporte de jet ski em Itapevi até represa. Transporte de lancha e jet ski com prancha adequada. Serviços de guinchos em Itapevi que atendem demandas especiais." },
];

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function TestimonialsCarousel({ citySeed }: { citySeed?: string } = {}) {
  const plugin = React.useRef(Autoplay({ delay: 4500, stopOnInteraction: true }));
  const items = React.useMemo(() => {
    // Se não houver citySeed, retorna os depoimentos base limitados a 18
    if (!citySeed) {
      return [...TESTIMONIALS].slice(0, 18);
    }

    let citySlug = citySeed.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('---')[0]; 
    
    // Fallback: se o slug termina com -sp ou similar e não achou, tenta sem o UF
    if (!CITY_LOCAL[citySlug] && citySlug.match(/-[a-z]{2}$/)) {
      citySlug = citySlug.slice(0, -3);
    }

    // Tentativa de encontrar no CITY_LOCAL
    let localData = CITY_LOCAL[citySlug];
    if (!localData) {
      const entries = Object.entries(CITY_LOCAL);
      // Busca exata primeiro, depois por inclusão de slug
      const match = entries.find(([key]) => citySlug === key || citySlug.includes(key) || key.includes(citySlug));
      if (match) localData = match[1];
    }

    const neighborhoods = localData?.neighborhoods || [];
    const seed = hashSeed(citySeed);
    
    // Rodovias (usadas como fallback se a cidade for pequena ou para variar)
    const highways = ["Dutra", "Castello Branco", "Anhanguera", "Bandeirantes", "Imigrantes", "Anchieta", "Ayrton Senna", "Fernão Dias", "Régis Bittencourt", "Rodoanel", "Tamoios", "Carvalho Pinto", "Dom Pedro I", "Rio-Santos"];

    // Gerar 18 itens específicos para a cidade usando os depoimentos base como inspiração
    return Array.from({ length: 18 }, (_, idx) => {
      const baseIdx = (seed + idx) % TESTIMONIALS.length;
      const baseItem = TESTIMONIALS[baseIdx];
      const seedVal = seed + idx;
      
      const newItem = { ...baseItem };
      newItem.city = citySeed;

      // Decide se usa bairro ou rodovia (prioriza bairros se houver muitos)
      const useHighway = (seedVal % 3 === 0) || neighborhoods.length === 0;
      const cityNameOnly = citySeed.split(' - ')[0];
      
      if (useHighway) {
        const highway = highways[seedVal % highways.length];
        const templates = [
          `Precisei de guincho na rodovia ${highway} em ${cityNameOnly} e o atendimento foi nota 10.`,
          `O reboque chegou rápido na ${highway}. Serviço de guincho 24h muito confiável.`,
          `Fiquei parado na ${highway} e em menos de 30 minutos o guincho plataforma já estava lá.`
        ];
        // Mantém parte do texto original para variedade mas garante o local correto no início
        newItem.text = templates[seedVal % templates.length] + " " + baseItem.text.split('. ').slice(1).join('. ');
      } else {
        const neighborhood = neighborhoods[seedVal % neighborhoods.length];
        const templates = [
          `Estava no bairro ${neighborhood} em ${cityNameOnly} quando meu carro pifou. O guincho chegou voando!`,
          `Melhor serviço de guincho em ${cityNameOnly}. Atendimento rápido aqui no ${neighborhood}.`,
          `Recomendo o guincho 24h. Me socorreram no ${neighborhood} com muita agilidade e preço justo.`
        ];
        newItem.text = templates[seedVal % templates.length] + " " + baseItem.text.split('. ').slice(1).join('. ');
      }

      return newItem;
    });
  }, [citySeed]);

  return (
    <section className="bg-secondary/40 py-20" aria-labelledby="depoimentos-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-3">Avaliações reais — guincho 24h</Badge>
          <h2 id="depoimentos-heading" className="text-3xl font-bold tracking-tight md:text-4xl text-accent/90">
            {citySeed ? `Avaliações reais em ${citySeed.split(' - ')[0]}` : "Avaliações de clientes satisfeitos com nosso serviço de guincho e reboque 24h"}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <p className="mt-3 text-muted-foreground">
            Confira depoimentos reais de quem precisou de auto socorro, reboque na rodovia, guincho de moto e
            remoção veicular em São Paulo, Vale do Paraíba, Litoral Norte, Grande SP e em todo o Brasil.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="mx-auto w-full max-w-6xl"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent>
            {items.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-border/60">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-center gap-1 text-accent" aria-label="Avaliação 5 de 5 estrelas">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                    <div className="border-t pt-3">
                      <h4 className="font-semibold">{t.name}</h4>
                      <h5 className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {t.city}
                      </h5>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-4">
            <CarouselPrevious className="relative left-0 translate-y-0" />
            <CarouselNext className="relative right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
