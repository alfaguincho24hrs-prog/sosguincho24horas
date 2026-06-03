import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Pencil } from "lucide-react";
import { getPostBySlug, type BlogPost } from "@/components/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    const url = `https://sosguincho24horas.com.br/blog/${params.slug}`;
    const title = `${post?.title || params.slug} | Blog SOS Guincho 24 horas`;
    const description = post?.excerpt || "Leia dicas sobre guincho, reboque e auto socorro no blog SOS Guincho 24 horas.";
    const image = post?.coverUrl || "https://sosguincho24horas.com.br/og-image.webp";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "preconnect", href: "https://wa.me" }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post?.title,
              "description": post?.excerpt,
              "image": image,
              "datePublished": post?.date,
              "author": {
                "@type": "Organization",
                "name": "SOS Guincho 24 horas"
              },
              "publisher": {
                "@type": "Organization",
                "name": "SOS Guincho 24 horas",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://sosguincho24horas.com.br/icon-512.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": url
              }
            },
            post?.faq ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": post.faq.map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.a
                }
              }))
            } : null,
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Guincho 24h e Auto Socorro",
              "provider": {
                "@type": "LocalBusiness",
                "name": "SOS Guincho 24 horas",
                "telephone": "+5511999999999",
                "image": "https://sosguincho24horas.com.br/og-image.webp",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "São Paulo",
                  "addressRegion": "SP",
                  "addressCountry": "BR"
                }
              }
            }
          ].filter(Boolean))
        }
      ]
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
      <h2 className="text-3xl font-bold">Artigo não encontrado</h2>
      <p className="mt-3 text-muted-foreground">O artigo que você procura não existe ou foi removido.</p>
      <Button asChild className="mt-6"><Link to="/blog">Voltar ao blog</Link></Button>
    </div>
  ),
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    setPost(getPostBySlug(slug) ?? null);
  }, [slug]);

  if (post === undefined) {
    return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Carregando…</div>;
  }
  if (post === null) {
    throw notFound();
  }

  return (
    <article className="bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="px-0">
            <Link to="/blog"><ArrowLeft className="h-4 w-4" /> Voltar ao blog</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin" search={{ city: "" }}><Pencil className="h-4 w-4" /> Editar</Link>
          </Button>
        </div>

        {post.coverUrl && (
          <img 
            src={post.coverUrl} 
            srcSet={`${post.coverUrl} 800w, ${post.coverUrl} 400w`}
            sizes="(max-width: 768px) 100vw, 800px"
            alt={post.title} 
            className="mb-6 h-64 w-full rounded-lg object-cover" 
            width={800} 
            height={400} 
            loading="eager" 
            decoding="async" 
            fetchPriority="high"
          />
        )}

        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded bg-accent/10 px-2 py-0.5 font-medium text-accent">{post.category}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
        </div>

        <h1 className="text-3xl font-bold leading-tight md:text-4xl text-accent">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground article-content">
          {post.content.split(/\n\n+/).map((p, i) => {
            // Process basic markdown links [text](url)
            const parts = p.split(/(\[.*?\]\(.*?\))/g);
            return (
              <p key={i}>
                {parts.map((part, index) => {
                  const match = part.match(/\[(.*?)\]\((.*?)\)/);
                  if (match) {
                    const [, text, url] = match;
                    return (
                      <Link key={index} to={url as any} className="text-accent hover:underline font-medium">
                        {text}
                      </Link>
                    );
                  }
                  return part;
                })}
              </p>
            );
          })}
        </div>

        {/* FAQ Contextual */}
        {post.faq && post.faq.length > 0 && (
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-bold">Dúvidas frequentes</h3>
            {post.faq.map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-muted/20">
                <p className="font-semibold">{item.q}</p>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-xl border border-border/60 bg-muted/30 p-6 text-center">
          <h2 className="text-xl font-bold">Precisa de guincho agora?</h2>
          <p className="mt-1 text-sm text-muted-foreground">Atendimento 24h em todo o Brasil.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button asChild size="sm"><Link to="/cobertura">Ver cobertura</Link></Button>
            <Button asChild size="sm" variant="outline"><Link to="/contato">Falar conosco</Link></Button>
          </div>
        </div>
      </div>
    </article>
  );
}
