
# Arquitetura de "ilhas": HTML estável + ilhas dinâmicas

Hoje o HTML das rotas de cidade/rodovia contém trechos que mudam a cada renderização (datas relativas, ETA "ao vivo", tracker do WhatsApp). Isso força o edge/cliente a tratar a página inteira como potencialmente instável e polui o HTML servido com valores voláteis.

O objetivo é separar claramente:
- **Casca estável** (SSR/SSG) — cacheável agressivamente pelo CDN, sem valores que variem por request
- **Ilhas dinâmicas** — componentes client-only, hidratados no navegador, sem impacto no HTML servido

## Mudanças

### 1. `EtaBadge` → ilha client-only
Hoje `useState(base)` roda no SSR e imprime um número no HTML. Envolver em `<ClientOnly>` com placeholder estático (ex.: "Guincho mais próximo — em instantes"). O ETA "ao vivo" só aparece após hidratação — o HTML servido fica idêntico entre requests.

### 2. `CitySocialProof` → datas determinísticas
`new Date()` dentro do componente faz o `datePublished` do JSON-LD e o "há N dias" mudarem a cada build/SSR, invalidando cache. Trocar por data-base determinística (seed do nome da cidade + offset fixo) — o HTML fica byte-idêntico entre revalidações.

### 3. `WhatsAppTracker` → já é client-only
Confirmar que não emite nada no HTML SSR (checar `useEffect`-only). Se necessário, envolver em `<ClientOnly>`.

### 4. `MobileStickyCTA` / `WhatsAppFloat` → SSR estável
Verificar se dependem de `useMobile`/`window`. Se sim, renderizar sempre (CSS media queries decide visibilidade) — sem branch por JS no SSR.

### 5. Helper `<ClientOnly>` + `useHydrated`
Criar `src/components/client-only.tsx` com `useSyncExternalStore` (ou `useEffect + useState`) para renderizar `fallback` no servidor e o filho após hidratação — padrão para novas ilhas.

## Resultado

- HTML das 885 rotas de cidade + rodovias fica **determinístico**: mesmo deploy = mesmos bytes, cache do CDN raramente invalida
- CDN pode manter `s-maxage` alto sem risco de servir "há 3 dias" quando o correto seria "há 4 dias"
- Ilhas (ETA ao vivo, tracker) continuam funcionando, só que 100% no cliente

## Detalhes técnicos

- `ClientOnly` usa `const hydrated = useSyncExternalStore(() => () => {}, () => true, () => false)` — sem warning de hidratação
- `CitySocialProof`: `const daysAgo = 1 + ((seed + i * 11) % 28)`; `datePublished` calculado a partir de uma **época fixa** (ex.: `EPOCH = new Date("2026-01-01")`) + `daysAgo`, não `new Date()`
- Nenhuma mudança em roteamento, loaders ou `_headers`
