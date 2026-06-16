import { Phone, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE } from "@/components/site-data";

export type FAQItem = { q: string; a: string };

type Props = {
  badge: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  faqs?: FAQItem[];
  whatsappMessage?: string;
};

export function SeoBlock({ badge, title, paragraphs, bullets, faqs, whatsappMessage }: Props) {
  const wppText = encodeURIComponent(whatsappMessage ?? "Olá! Preciso de um guincho 24h, podem me ajudar?");
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-4xl space-y-6">
        <Badge variant="secondary">{badge}</Badge>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-accent">{title}</h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
        ))}
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            {bullets.map((b, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: `✅ ${b}` }} />
            ))}
          </ul>
        )}

        {faqs && faqs.length > 0 && (
          <>
            <h3 className="text-2xl font-bold pt-4 text-accent">Perguntas frequentes</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              }}
            />
          </>
        )}

        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-primary shadow-[var(--shadow-glow)] hover:opacity-95">
            <a href={`tel:${SITE.phone}`}>
              <Phone className="h-5 w-5" /> Ligar agora — {SITE.phone}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`https://wa.me/${SITE.whatsapp}?text=${wppText}`} target="_blank" rel="noreferrer">
              <MessageCircle className="h-5 w-5" /> WhatsApp 24h
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
