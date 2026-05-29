import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Pencil } from "lucide-react";
import { getAllPosts, type BlogPost } from "@/components/blog-data";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Dicas de Guincho, Reboque e Auto Socorro | SOS Guincho 24 horas" },
      { name: "description", content: "Artigos e guias sobre guincho 24h, reboque, auto socorro, segurança nas rodovias e cuidados com seu veículo em emergências." },
      { property: "og:title", content: "Blog — SOS Guincho 24 horas" },
      { property: "og:description", content: "Dicas, guias e novidades sobre guincho, reboque e auto socorro em todo o Brasil." },
      { property: "og:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
      { property: "og:url", content: "https://sosguincho24horas.com.br/blog" },
      { name: "twitter:image", content: "https://sosguincho24horas.com.br/og-image.webp" },
    ],
    links: [{ rel: "canonical", href: "https://sosguincho24horas.com.br/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  return (
    <div className="bg-background">
      <BreadcrumbJsonLd items={[{ name: "Início", url: "/" }, { name: "Blog", url: "/blog" }]} />
      <section className="border-b border-border/60 bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-accent">Blog SOS Guincho 24 horas</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Dicas, guias e novidades sobre guincho, reboque, auto socorro e segurança nas rodovias.
          </p>
          <div className="mt-5">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin" search={{ city: "" }}><Pencil className="h-4 w-4" /> Gerenciar blog</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col transition-shadow hover:shadow-lg">
              <CardHeader>
                {post.coverUrl && (
                  <img src={post.coverUrl} alt={post.title} className="mb-3 h-40 w-full rounded-md object-cover" width={640} height={160} loading="lazy" decoding="async" />
                )}
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded bg-accent/10 px-2 py-0.5 font-medium text-accent">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                </div>
                <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                <CardDescription className="mt-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="ghost" size="sm" className="px-0 text-accent hover:bg-transparent hover:text-accent/80">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    Ler artigo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          {posts.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">Nenhum artigo publicado ainda.</p>
          )}
        </div>

        <div className="mt-14 rounded-xl border border-border/60 bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold">Precisa de guincho agora?</h2>
          <p className="mt-2 text-muted-foreground">Atendimento 24 horas em todo o Brasil.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild><Link to="/cobertura">Ver cobertura</Link></Button>
            <Button asChild variant="outline"><Link to="/contato">Falar conosco</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
