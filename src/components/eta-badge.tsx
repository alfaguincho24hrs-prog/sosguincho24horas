import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { ClientOnly } from "./client-only";

// ETA dinâmico determinístico por cidade (entre 8 e 22 minutos)
function hashCity(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function Shell({ cityName, children }: { cityName: string; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <Clock className="h-4 w-4" />
      {children}
      <MapPin className="h-4 w-4 opacity-70" />
      <span className="opacity-80">{cityName}</span>
    </div>
  );
}

function EtaLive({ cityName }: { cityName: string }) {
  const base = 8 + (hashCity(cityName) % 15); // 8..22
  const [eta, setEta] = useState(base);

  useEffect(() => {
    const id = setInterval(() => {
      setEta((prev) => {
        const drift = Math.floor(Math.random() * 3) - 1;
        const next = prev + drift;
        if (next < 6 || next > 24) return base;
        return next;
      });
    }, 12000);
    return () => clearInterval(id);
  }, [base]);

  return (
    <Shell cityName={cityName}>
      <span>
        Guincho mais próximo a <strong>~{eta} min</strong>
      </span>
    </Shell>
  );
}

export function EtaBadge({ cityName }: { cityName: string }) {
  // SSR: HTML estável e determinístico (sem número que muda entre revalidações).
  // Client: substitui pela versão "ao vivo" após a hidratação.
  return (
    <ClientOnly
      fallback={
        <Shell cityName={cityName}>
          <span>
            Guincho mais próximo — <strong>chega em minutos</strong>
          </span>
        </Shell>
      }
    >
      <EtaLive cityName={cityName} />
    </ClientOnly>
  );
}
