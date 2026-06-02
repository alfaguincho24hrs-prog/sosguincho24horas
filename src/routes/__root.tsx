import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LegalNotice } from "@/components/legal-notice";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/components/site-data";

import appCss from "../styles.css?url";

const SITE_URL = "https://sosguincho24horas.com.br";

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": SITE.name,
      "url": `${SITE_URL}/`,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/icon-512.png`,
        "width": "512",
        "height": "512"
      },
      "email": SITE.email,
      "telephone": SITE.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE.address.street,
        "addressLocality": SITE.address.city,
        "addressRegion": SITE.address.region,
        "postalCode": SITE.address.postalCode,
        "addressCountry": "BR"
      },
      "sameAs": [
        "https://www.facebook.com/sosguincho24horas",
        "https://www.instagram.com/sosguincho24horas"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": `${SITE_URL}/`,
      "name": SITE.name,
      "inLanguage": "pt-BR",
      "publisher": { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      "name": SITE.name,
      "description": "Rede nacional de guincho, reboque e auto socorro 24h em todo o Brasil.",
      "url": `${SITE_URL}/`,
      "telephone": SITE.phone,
      "email": SITE.email,
      "priceRange": "$$",
      "image": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/og-image.webp`,
        "width": "1200",
        "height": "630"
      },
      "areaServed": { "@type": "Country", "name": "Brasil" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE.address.street,
        "addressLocality": SITE.address.city,
        "addressRegion": SITE.address.region,
        "postalCode": SITE.address.postalCode,
        "addressCountry": "BR",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": SITE.geo.latitude, "longitude": SITE.geo.longitude },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "00:00",
        "closes": "23:59",
      }],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1250"
      }
    }
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SOS Guincho 24 horas |  Guincho em Todo o Brasil" },
      { name: "description", content: "Seu carro parou? SOS Guincho 24h na sua cidade para motos, leves e pesados. Resgate rápido em SP e Vale do Paraíba!" },
      { name: "theme-color", content: "#ef2b2b" },
      { name: "author", content: "SOS Guincho 24 horas" },
      { name: "keywords", content: "guincho 24 horas, reboque, auto socorro, guincho perto de mim, guincho rodovia, guincho leve, guincho pesado, reboque de moto" },
      { name: "google-site-verification", content: "bBfjL-B8hzlB_4mru_KuIMVtB4XitQ9WMsUNgvLQVBk" },
      { property: "og:title", content: "SOS Guincho 24 horas |  Guincho em Todo o Brasil" },
      { property: "og:description", content: "Seu carro parou? SOS Guincho 24h na sua cidade para motos, leves e pesados. Resgate rápido em SP e Vale do Paraíba!" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SOS Guincho 24 horas |  Guincho em Todo o Brasil" },
      { name: "twitter:description", content: "Seu carro parou? SOS Guincho 24h na sua cidade para motos, leves e pesados. Resgate rápido em SP e Vale do Paraíba!" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/48d258fa-b427-456a-a7f0-e19a83c1b0eb/id-preview-c90c82a8--1cb195f7-066f-4873-bc78-670d3b8929fb.lovable.app-1777081509409.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/48d258fa-b427-456a-a7f0-e19a83c1b0eb/id-preview-c90c82a8--1cb195f7-066f-4873-bc78-670d3b8929fb.lovable.app-1777081509409.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "alternate icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "alternate", hrefLang: "pt-BR", href: "https://sosguincho24horas.com.br/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://sosguincho24horas.com.br/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(SITE_JSONLD),
      },
      {
        children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wdqmhm3onz");`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <LegalNotice />
      <SiteFooter />
      <WhatsAppFloat />
      <MobileStickyCTA />
      <Toaster />
    </div>
  );
}
