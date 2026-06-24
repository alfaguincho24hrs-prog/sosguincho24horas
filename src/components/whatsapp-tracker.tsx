import { useEffect } from "react";

// Cole aqui o seu Google Analytics 4 Measurement ID (ex.: "G-XXXXXXXXXX").
// É um identificador público, pode ficar no código. Deixe vazio para desativar.
const GA_MEASUREMENT_ID = "G-CFYMPZ1QJT";

const WA_NUMBER = "5511996451510";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __waTrackerInstalled?: boolean;
  }
}

function findWhatsAppAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  let el = target as HTMLElement | null;
  while (el && el.nodeType === 1) {
    if (el.tagName === "A") {
      const href = (el as HTMLAnchorElement).getAttribute("href") || "";
      if (href.includes(`wa.me/${WA_NUMBER}`)) return el as HTMLAnchorElement;
    }
    el = el.parentElement;
  }
  return null;
}

function deriveLabel(a: HTMLAnchorElement): string {
  const aria = a.getAttribute("aria-label");
  if (aria) return aria.trim().slice(0, 120);
  const text = (a.innerText || a.textContent || "").trim().replace(/\s+/g, " ");
  if (text) return text.slice(0, 120);
  return "WhatsApp";
}

function trackClick(label: string) {
  if (typeof window === "undefined") return;
  // Google Analytics 4
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: label,
        page_path: window.location.pathname,
        page_location: window.location.href,
      });
    } catch {
      // ignore
    }
  }
  // Microsoft Clarity (já carregado no projeto)
  const w = window as unknown as { clarity?: (...args: unknown[]) => void };
  if (typeof w.clarity === "function") {
    try {
      w.clarity("event", "whatsapp_click");
      w.clarity("set", "whatsapp_button", label);
    } catch {
      // ignore
    }
  }
}

export function WhatsAppTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__waTrackerInstalled) return;
    window.__waTrackerInstalled = true;

    // Carrega o GA4 uma única vez quando configurado
    if (GA_MEASUREMENT_ID && !document.getElementById("ga4-loader")) {
      const s = document.createElement("script");
      s.id = "ga4-loader";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: unknown[]) {
        window.dataLayer!.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: true });
    }

    const handler = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 && e.button !== 1) return;
      const a = findWhatsAppAnchor(e.target);
      if (!a) return;
      trackClick(deriveLabel(a));
    };

    document.addEventListener("click", handler, true);
    document.addEventListener("auxclick", handler as EventListener, true);
    return () => {
      document.removeEventListener("click", handler, true);
      document.removeEventListener("auxclick", handler as EventListener, true);
    };
  }, []);

  return null;
}

export default WhatsAppTracker;
