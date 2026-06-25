## Objetivo

Gerar uma planilha agregada **por cidade** combinando:
- **Métricas internas** (já no banco): nº de prestadores, prestadores adicionados, overrides, posts de blog relacionados, slug, região, UF.
- **Métricas GA4** (do Google Analytics): `whatsapp_click`, `call_click`, `howto_step_click`, `howto_step_view_click`, sessões e usuários — todos agregados pela dimensão `city_slug` que já enviamos.

Destino:
1. **Download CSV sob demanda** no `/admin` (disponível imediatamente).
2. **Sync automático para Google Sheets** a cada 6 horas via cron (`pg_cron`).

## Pré-requisitos do usuário (uma única vez)

Para a parte GA4 + Google Sheets eu precisarei de **dois connectors** Lovable:

1. **Google Analytics Data API** — para ler os eventos por `city_slug`.
   - Property ID do GA4 (formato `properties/XXXXXXXXX`).
2. **Google Sheets** — para escrever a planilha.
   - URL ou ID da planilha de destino (eu crio uma se preferir).

Sem esses connectors, a parte interna (CSV download) já funciona sozinha.

## Entregáveis

### 1. Server function `exportCityMetrics`
Arquivo: `src/lib/admin-metrics.functions.ts`
- Protegida por `requireAdminSession` (só roda autenticada).
- Lê do banco: `added_providers`, `provider_overrides`, `blog_posts` + dataset estático `src/data/locations.ts` (885 cidades).
- Lê do GA4 via `runReport` na Data API (dimensão `city_slug` + métricas `eventCount` filtradas por `eventName`).
- Retorna array `{ city_slug, city_name, uf, region, providers_count, added_count, overrides_count, blog_posts_count, whatsapp_clicks, call_clicks, howto_clicks, sessions, users }`.

### 2. Botão "Exportar métricas (CSV)" no `/admin`
- Header do painel autenticado.
- Chama `exportCityMetrics`, converte para CSV (BOM UTF-8 para abrir bem no Excel BR), faz download como `metricas-cidades-YYYY-MM-DD.csv`.

### 3. Endpoint de cron `/api/public/jobs/sync-sheets`
Arquivo: `src/routes/api/public/jobs/sync-sheets.ts`
- Autenticado por `apikey` header (Supabase anon key).
- Roda `exportCityMetrics` e grava na planilha Google via connector Sheets (`values:update` no range `Métricas!A1`).
- Adiciona linha de timestamp na aba `Histórico` para auditoria.

### 4. Agendamento `pg_cron`
- Job `sync-city-metrics-sheets` a cada 6 horas, chamando o endpoint via `pg_net`.

## Detalhes técnicos

**Banco (sem mudanças de schema)** — apenas leitura agregada das tabelas existentes (`added_providers`, `provider_overrides`, `blog_posts`).

**Chamadas GA4 Data API** via connector gateway:
```
POST /v1beta/{propertyId}:runReport
body: { dimensions:[{name:"customEvent:city_slug"}],
        metrics:[{name:"eventCount"}],
        dimensionFilter:{ filter:{ fieldName:"eventName",
          inListFilter:{ values:["whatsapp_click","call_click","howto_step_click","howto_step_view_click"] } } },
        dateRanges:[{ startDate:"30daysAgo", endDate:"today" }] }
```
Pivot por `eventName` é feito no servidor (loop sobre rows).

**Failure isolada**: se GA4 falhar (token, quota), o CSV ainda é gerado com colunas GA zeradas + nota no rodapé — não quebra o export interno.

**Janela**: padrão últimos 30 dias; configurável depois via query param.

## Ordem de execução

1. Criar `admin-metrics.functions.ts` + `admin-metrics.server.ts`.
2. Adicionar botão "Exportar CSV" no `/admin` (funciona sem connectors).
3. Pedir os 2 connectors (GA4 + Sheets) + IDs.
4. Criar endpoint de cron e agendar via `pg_cron`.
5. Validar 1ª execução manual e conferir a planilha.

Os passos 1-2 entregam valor imediato. Os 3-5 dependem dos connectors do usuário.
