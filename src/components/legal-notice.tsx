import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Phone, Unlock } from "lucide-react";

export function LegalNotice() {
  return (
    <aside className="border-t border-border/60 bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold">* Aviso legal:</span> Todos os anúncios publicados em nosso site atendem às exigências da{" "}
          <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong> e da{" "}
          <strong>Lei do Marco Civil da Internet (Lei nº 12.965/2014)</strong>. As informações exibidas nesta página são públicas e foram adquiridas legalmente através da internet e também em portais do Governo Federal, juntas comerciais, listas telefônicas públicas e diretórios empresariais abertos. É o responsável por uma das empresas listadas e deseja atualizar, complementar ou remover seus dados?
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild className="bg-[image:var(--gradient-cta)] text-primary hover:opacity-90 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            <Link to="/anuncie" aria-label="Acessar painel para liberar dados da empresa">
              <Unlock className="mr-2 h-4 w-4" aria-hidden="true" />
              Clique aqui para liberar
            </Link>
          </Button>
          <Button asChild className="bg-green-600 text-white hover:bg-green-700 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2">
            <Link to="/anuncie" aria-label="Acessar página para atualizar telefone da empresa">
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              Atualizar seu telefone
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
