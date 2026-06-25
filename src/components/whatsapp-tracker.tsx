import { useEffect } from "react";

// Cole aqui o seu Google Analytics 4 Measurement ID (ex.: "G-XXXXXXXXXX").
// É um identificador público, pode ficar no código. Deixe vazio para desativar.
const GA_MEASUREMENT_ID = "G-CFYMPZ1QJT";
const CLARITY_ID = "wdqmhm3onz";

const WA_NUMBER = "5511996451510";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __waTrackerInstalled?: boolean;
  }
}

function findAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  let el = target as HTMLElement | null;
  while (el && el.nodeType === 1) {
    if (el.tagName === "A") return el as HTMLAnchorElement;
    el = el.parentElement;
  }
  return null;
}

function deriveLabel(a: HTMLAnchorElement): string {
  const aria = a.getAttribute("aria-label");
  if (aria) return aria.trim().slice(0, 120);
  const text = (a.innerText || a.textContent || "").trim().replace(/\s+/g, " ");
  if (text) return text.slice(0, 120);
  return a.getAttribute("href") || "link";
}

function getCityContext(pathname: string): { city_slug: string; page_type: string } {
  const cityMatch = pathname.match(/^\/guincho-em-(.+)$/);
  if (cityMatch) return { city_slug: cityMatch[1], page_type: "city" };
  const hwyMatch = pathname.match(/^\/guinchos-nas-rodovias-(.+)$/);
  if (hwyMatch) return { city_slug: hwyMatch[1], page_type: "highway" };
  return { city_slug: "", page_type: pathname === "/" ? "home" : "other" };
}

function sendEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const ctx = getCityContext(window.location.pathname);
  const payload = {
    ...params,
    ...ctx,
    page_path: window.location.pathname,
    page_location: window.location.href,
  };
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", name, payload);
    } catch {
      // ignore
    }
  }
  const w = window as unknown as { clarity?: (...args: unknown[]) => void };
  if (typeof w.clarity === "function") {
    try {
      w.clarity("event", name);
      if (typeof params.event_label === "string") {
        w.clarity("set", name, params.event_label);
      }
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
      const a = findAnchor(e.target);
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const label = deriveLabel(a);

      // WhatsApp
      if (href.includes(`wa.me/${WA_NUMBER}`)) {
        sendEvent("whatsapp_click", { event_category: "engagement", event_label: label });
        return;
      }
      // Telefone
      if (href.startsWith("tel:")) {
        sendEvent("call_click", { event_category: "engagement", event_label: label, phone: href.replace("tel:", "") });
        return;
      }
      // Âncoras de passo (#passo-1 ... #passo-5) — clique direto OU clique num link com href="#passo-N"
      const stepMatch = href.match(/#passo-(\d+)/);
      if (stepMatch) {
        sendEvent("howto_step_click", {
          event_category: "engagement",
          event_label: `passo-${stepMatch[1]}`,
          step_number: Number(stepMatch[1]),
        });
        return;
      }
    };

    // Rastrear também cliques dentro dos cards de passo (li#passo-N) mesmo sem âncora
    const stepHandler = (e: MouseEvent) => {
      let el = e.target as HTMLElement | null;
      while (el && el.nodeType === 1) {
        if (el.id && /^passo-\d+$/.test(el.id)) {
          const n = Number(el.id.replace("passo-", ""));
          sendEvent("howto_step_view_click", {
            event_category: "engagement",
            event_label: el.id,
            step_number: n,
          });
          return;
        }
        el = el.parentElement;
      }
    };

    document.addEventListener("click", handler, true);
    document.addEventListener("auxclick", handler as EventListener, true);
    document.addEventListener("click", stepHandler);
    return () => {
      document.removeEventListener("click", handler, true);
      document.removeEventListener("auxclick", handler as EventListener, true);
      document.removeEventListener("click", stepHandler);
    };
  }, []);

  return null;
}

export default WhatsAppTracker;
