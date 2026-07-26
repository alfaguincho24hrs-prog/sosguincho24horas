import { createFileRoute, Outlet, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getTipoVeiculo } from "@/lib/sjc-veiculos";

export const Route = createFileRoute("/guincho-{$tipo}-sjc")({
  loader: ({ params }) => {
    if (!getTipoVeiculo(params.tipo)) throw notFound();
    return {};
  },
  head: ({ loaderData }) =>
    loaderData
      ? {}
      : { meta: [{ title: "Página não encontrada" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: TipoNotFound,
  component: () => <Outlet />,
});

function TipoNotFound() {
  return (
    <div className="container flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-accent">Serviço não encontrado</h1>
      <p className="text-muted-foreground">
        Não localizamos esta página de serviço. Veja os tipos de guincho que atendemos em São José
        dos Campos.
      </p>
      <Button asChild>
        <Link to="/guincho-sjc">Ver guincho em SJC</Link>
      </Button>
    </div>
  );
}
