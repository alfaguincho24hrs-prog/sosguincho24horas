import { memo } from "react";

/**
 * Bloco "Outras Páginas" — lista de termos exibida acima do rodapé.
 * Texto puro (sem links) para não gerar URLs inexistentes.
 */
const TERMS: string[] = [
  "Agência de Marketing de SEO para Guinchos e Reboques",
  "Agência de Publicidade para Guinchos e Reboques",
  "Agência de Publicidade para Guinchos e Reboques em São Paulo",
  "Agência de Publicidade no Google para Guinchos e Reboques",
  "Agência de SEO para Guinchos e Reboques",
  "Agência Digital Anúncios na Internet para Guinchos e Reboques",
  "Anúncios no Google",
  "Aparecer em Primeiro no Google",
  "Aparecer na Busca do Google",
  "Aumentar as Vendas Pelo Google",
  "Aumentar Vendas da Minha Empresa",
  "Busca Orgânica",
  "Busca Orgânica no Google",
  "Posicionamento Orgânico no Google",
  "Busca Orgânica para Fábricas",
  "Busca Orgânica para Indústrias",
  "Como Aparecer no Google para Guinchos e Reboques",
  "Como Aumentar Minhas Vendas para Guinchos e Reboques",
  "Como Colocar Meu Site na Primeira Página do Google para Guinchos e Reboques",
  "Como Divulgar Meu Site de Guinchos e Reboques",
  "Como Divulgar no Google Guinchos e Reboques",
  "Como Melhorar as Vendas para Guinchos e Reboques",
  "Como Melhorar o Ranking do Meu Site no Google para Guinchos e Reboques",
  "Como Vender Mais e Melhor",
  "Como Vender pela Internet",
  "Consultoria de SEO para Guinchos e Reboques",
  "Consultoria SEO",
  "Criação de Sites Profissionais para Guinchos e Reboques",
  "Criar Um Site para Minha Empresa para Guinchos e Reboques",
  "Divulgar Meu Site no Google para Guinchos e Reboques",
  "Empresa de Busca Orgânica para Guinchos e Reboques",
  "Empresa de Criação de Site para Guinchos e Reboques",
  "Empresa de Publicidade",
  "Empresa de Publicidade Digital",
  "Empresa de Sites Google Orgânico",
  "Google SEO Inbound",
  "Marketing Inbound",
  "Marketing e Outbound Marketing",
  "Marketing de Busca",
  "Sem Marketing no Google",
  "Marketing para Indústrias",
  "Marketing SEO",
  "Melhorar Posicionamento do Site no Google",
  "Melhores Empresas de Desenvolvimento de Sites",
  "Meu Site no Google",
  "O Que é Busca Orgânica?",
  "O Que é SEO",
  "Otimização de Site para o Google",
  "Otimização de Sites",
  "Otimização de Sites nos Parâmetros do Google",
  "Otimização SEO",
  "Otimizar Site nos Padrões do Google",
  "Posicionamento de Site no Google",
  "Propaganda na Internet",
  "Publicidade no Google",
  "Publicidade Online",
  "Quero Divulgar Minha Empresa no Google",
  "Quero Fazer Um Site para Minha Empresa",
  "SEO para Sites",
  "Serviço de SEO",
  "Site para Minha Empresa",
  "Site Profissional",
  "Técnicas de SEO",
  "Tecnologia de Posicionamento para o Google",
  "Web Marketing",
  "Busca Orgânica com Garantia de Contrato",
  "Colocar Site na Primeira Página do Google",
  "Como Aparecer na Primeira Página do Google",
  "Como Fazer SEO Como o Google Ajuda Meu Negócio",
  "Criação de Site Responsivo",
  "Melhor Empresa de SEO do Brasil",
  "Otimização SEO On-page",
  "Primeira Página do Google Sem Pagar por Clique",
  "Quais Técnicas de SEO o Google Cobra para Aparecer na Primeira Página",
  "Empresa de Prospecção de Clientes",
  "Prospecção B2B",
  "Empresa de Prospecção B2B",
  "Marketing Industrial",
  "Marketing Digital para Empresas",
  "Serviços de Marketing Digital",
  "Marketing Digital para Indústrias",
  "Site de Divulgação",
  "Marketing Orgânico",
  "Divulgação Online",
  "Atração de Clientes",
  "Estratégias de Marketing B2B",
  "Estratégias de Marketing para Empresas B2B",
  "Inbound Marketing para Indústrias",
  "Vendas Industriais",
  "Prospecção de Clientes B2B",
  "Marketing Digital para Negócios Locais",
  "Vendas B2B",
  "Como Ter Resultados Digitais",
  "Como Aumentar as Vendas na Loja Física",
  "Como Aumentar as Vendas da Minha Empresa",
  "Marketing de Conteúdo",
  "Mkt Industrial",
  "Geração de Leads B2B",
  "Geração de Clientes B2B",
  "Marketing para Negócios Locais",
  "Venda Online",
  "Anunciar na Internet",
  "Captar Clientes",
  "Criação de Site para Indústria",
  "Marketing de Busca Industrial",
  "Marketing Industrial B2B",
  "Marketing para Empresas",
  "Como Fazer Indústria Vender Mais",
  "Como Distribuir Mais Produtos",
  "Marketing Growth",
  "Marketing Growth Industrial",
  "Marketing de Crescimento Industrial",
  "Marketing Digital para Vendas",
];

const OtherPages = memo(() => {
  return (
    <section
      aria-labelledby="outras-paginas-title"
      className="defer-paint border-t border-border/60 bg-secondary/30 py-10"
    >
      <div className="container mx-auto px-4">
        <h2
          id="outras-paginas-title"
          className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
        >
          Outras Páginas
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
          {TERMS.map((t, i) => (
            <li
              key={t}
              className="text-xs leading-relaxed text-muted-foreground/80"
            >
              {t}
              {i < TERMS.length - 1 && (
                <span aria-hidden="true" className="ml-2 opacity-40">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

OtherPages.displayName = "OtherPages";

export { OtherPages };
