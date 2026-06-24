import { useEffect } from "react";

// Public, server-side Google Analytics 4 Measurement ID (safe to expose).
// Leave empty to disable GA4 tracking.
const GA_MEASUREMENT_ID = "";

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

function sendClick(label: string) {
  try {
    const payload = JSON.stringify({
      source_path: window.location.pathname + window.location.search,
      button_label: label,
      referrer: document.referrer || undefined,
    });
    const url = "/api/public/track-whatsapp";
    let sent = false;
    if (navigator.sendBeacon) {
      try {
        const blob = new Blob([payload], { type: "application/json" });
        sent = navigator.sendBeacon(url, blob);
      } catch {
        sent = false;
      }
    }
    if (!sent) {
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // swallow — tracking must never block navigation
  }

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: label,
        page_path: window.location.pathname,
      });
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

    // Load GA4 once if configured
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
      window.gtag("config", GA_MEASUREMENT_ID);
    }

    const handler = (e: MouseEvent) => {
      // Only track main-button clicks
      if (e.defaultPrevented) return;
      if (e.button !== 0 && e.button !== 1) return;
      const a = findWhatsAppAnchor(e.target);
      if (!a) return;
      sendClick(deriveLabel(a));
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
