import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://w.app/guincho24horas";

export function WhatsAppFloat() {
  const href = WHATSAPP_LINK;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 ring-4 ring-[#25D366]/20 transition-transform hover:scale-110 md:bottom-5 md:h-16 md:w-16"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" />
      <span className="sr-only">WhatsApp</span>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
