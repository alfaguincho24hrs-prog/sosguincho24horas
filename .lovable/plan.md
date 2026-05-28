# Plano de Ação: Fase 2 - EEAT e Estrutura Regional

## 1. Implementação de Páginas Estratégicas
*   **Criar `/frota-guincho`:** Página dedicada à frota com detalhes técnicos, tipos de caminhões e fotos representativas.
*   **Criar `/areas-atendidas`:** Página de autoridade geográfica com visualização de mapas regionais, listagem de cidades, rodovias (como Dutra) e bairros.
*   **Refinar `/sobre`:** Atualizar a página de "Sobre" com história da empresa, anos de experiência, missão e diferenciais competitivos (atendimento humano, frota própria/parceira, capilaridade).

## 2. Estrutura de Blog Semântico
*   **Configuração de Silos:** Implementar os 4 Silos solicitados (`Rodovias`, `Problemas Automotivos`, `Emergências`, `Conteúdo Local`) no `blog-data.ts`.
*   **Templates de Artigos:** Garantir que o `blog.$slug.tsx` suporte a estrutura obrigatória (Introdução, Problema, Solução, Segurança, CTA, FAQ, Links internos).

## 3. Melhorias de Confiança e SEO Semântico
*   **Rodapé Avançado:** Atualizar `site-footer.tsx` para incluir CNPJ, endereço completo, horário, áreas atendidas e blocos de prova social.
*   **Schema.org:** Expandir o `SITE_JSONLD` em `__root.tsx` para incluir `FAQPage`, `BreadcrumbList`, e `Review` aggregate.
*   **Interlinking:** Criar rotas automáticas ou blocos de "Artigos Relacionados" nos posts para conectar o Silo de rodovias com cidades atendidas e serviços específicos.

## 4. Otimização Técnica e UX
*   **Responsividade:** Ajustar blocos de CTA em dispositivos de 375px (mobile-first).
*   **Performance:** Manter as otimizações atuais (lazy loading de componentes e imagens).
*   **Validação:** Executar o script `check-seo` após as alterações para garantir que a semântica de schema e sitemap continue impecável.

## 5. Detalhes técnicos
*   Todas as alterações seguirão o padrão atual de `TanStack Router`.
*   As novas páginas locais serão baseadas nos componentes de `SeoBlock` e `CitySocialProof` para manter a unicidade semântica.
*   Nenhuma alteração de URL existente será realizada.
*   O build e SSR permanecerão inalterados.