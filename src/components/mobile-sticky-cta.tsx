import { Phone, MessageCircle } from "lucide-react";
import { memo } from "react";

type Props = {
  whatsappMsg?: string;
};

const WHATSAPP_URL = "https://w.app/guincho24horas";

export const MobileStickyCTA = memo(({ whatsappMsg = "Olá! Preciso de guincho 24h agora." }: Props) => {
  return (
    <div 
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border/60 bg-background/95 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] backdrop-blur md:hidden will-change-transform"
      style={{ height: '56px' }} // Height fixa para evitar saltos visuais se houver delay no render
    >
      <a
        href={WHATSAPP_URL}
        aria-label="Ligar agora"
        className="flex items-center justify-center gap-2 bg-[image:var(--gradient-cta)] py-3.5 text-sm font-semibold text-primary active:opacity-80 transition-opacity"
      >
        <Phone className="h-5 w-5" /> Ligar agora
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white active:opacity-80 transition-opacity"
      >
        <MessageCircle className="h-5 w-5" fill="currentColor" /> WhatsApp
      </a>
    </div>
  );
});

MobileStickyCTA.displayName = "MobileStickyCTA";
