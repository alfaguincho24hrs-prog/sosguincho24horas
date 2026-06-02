import { Phone, MessageCircle } from "lucide-react";

type Props = {
  whatsappMsg?: string;
};

export function MobileStickyCTA({ whatsappMsg = "Olá! Preciso de guincho 24h agora." }: Props) {
  const tel = SITE.phone.replace(/\D/g, "");
  const wpp = "https://w.app/guincho24horas";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border/60 bg-background/95 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] backdrop-blur md:hidden">
      <a
        href={wpp}
        aria-label="Ligar agora"
        className="flex items-center justify-center gap-2 bg-[image:var(--gradient-cta)] py-3.5 text-sm font-semibold text-primary"
      >
        <Phone className="h-5 w-5" /> Ligar agora
      </a>
      <a
        href={wpp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white"
      >
        <MessageCircle className="h-5 w-5" fill="currentColor" /> WhatsApp
      </a>
    </div>
  );
}
