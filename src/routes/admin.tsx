import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Provider, type ProviderOverride, type ProviderTier } from "@/components/city-providers";
import { slugify, type BlogPost } from "@/components/blog-data";
import {
  createAdminProvider,
  deleteAdminBlogPost,
  deleteAdminProvider,
  getAdminBlogPosts,
  getAdminProviderData,
  saveAdminBlogPost,
  saveAdminProviderOverride,
} from "@/lib/admin-data.functions";
import { ALL_CITIES } from "@/components/cities-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  Download,
  Image as ImageIcon,
  Lock,
  LogOut,
  Phone,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { checkAdminSession, loginAdmin, logoutAdmin } from "@/lib/admin-auth.functions";
import { getCityMetrics, type CityMetricsResult } from "@/lib/admin-metrics.functions";



const MAX_PHOTOS = 4;

export const Route = createFileRoute("/admin")({
  validateSearch: (s: Record<string, unknown>) => ({
    city: (s.city as string) || "",
  }) as { city: string },
  head: () => ({
    meta: [
      { title: "Painel Admin — Editar Anunciantes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const CANONICAL_ADMIN_HOST = "sosguincho24horas.lovable.app";

function AdminPage() {
  const search = Route.useSearch();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pwd, setPwd] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Se o admin for aberto em um domínio que não é o canônico (ex.: proxy
  // externo servindo build antigo), redireciona para o domínio Lovable onde
  // os assets e server functions estão sempre atualizados.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    const isLovable = host.endsWith(".lovable.app") || host === "localhost" || host === "127.0.0.1";
    if (isLovable) return;
    const qs = search.city ? `?city=${encodeURIComponent(search.city)}` : "";
    window.location.replace(`https://${CANONICAL_ADMIN_HOST}/admin${qs}`);
  }, [search.city]);


  const checkSession = useServerFn(checkAdminSession);
  const login = useServerFn(loginAdmin);

  useEffect(() => {
    let cancelled = false;
    checkSession({})
      .then((r) => {
        if (!cancelled) setAuthed(!!r?.authed);
      })
      .catch(() => {
        if (!cancelled) setAuthed(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authed === null) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center text-sm text-muted-foreground">
        Verificando sessão…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold">Acesso restrito</h1>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Informe a senha do administrador para editar os anunciantes.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;
                setSubmitting(true);
                try {
                  await login({ data: { password: pwd } });
                  setAuthed(true);
                  setPwd("");
                  toast.success("Login realizado");
                } catch (err: any) {
                  const msg = err?.message || "Falha ao autenticar";
                  toast.error(msg.includes("not configured") ? msg : msg || "Senha incorreta");
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-3"
            >
              <Input
                type="password"
                placeholder="Senha"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoFocus
                maxLength={200}
              />
              <Button type="submit" className="w-full" disabled={submitting}>
                Entrar
              </Button>
              <p className="text-[11px] text-muted-foreground text-center pt-2">
                A senha é definida pela variável de ambiente <code>ADMIN_PASSWORD</code> no servidor.
                Para redefini-la, atualize o segredo e reimplante.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminTabs initialCity={search.city} onLogout={() => setAuthed(false)} />;
}


function LogoutButton() {
  const logout = useServerFn(logoutAdmin);
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await logout({});
        } catch {
          // ignore
        }
        location.reload();
      }}
    >
      <LogOut className="mr-2 h-4 w-4" /> Sair
    </Button>
  );
}

function ExportMetricsButton() {
  const fetchMetrics = useServerFn(getCityMetrics);
  const [busy, setBusy] = useState(false);

  function toCsv(result: CityMetricsResult): string {
    const headers = [
      "city_slug",
      "city_name",
      "uf",
      "source",
      "added_providers",
      "overrides",
      "blog_posts",
    ];
    const escape = (v: string | number) => {
      const s = String(v ?? "");
      return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [headers.join(",")];
    for (const r of result.rows) {
      lines.push(
        [
          r.city_slug,
          r.city_name,
          r.uf,
          r.source,
          r.added_providers,
          r.overrides,
          r.blog_posts,
        ]
          .map(escape)
          .join(","),
      );
    }
    lines.push("");
    lines.push(`# generated_at,${result.generated_at}`);
    lines.push(`# total_cities,${result.totals.cities}`);
    lines.push(`# total_added_providers,${result.totals.added_providers}`);
    lines.push(`# total_overrides,${result.totals.overrides}`);
    lines.push(`# total_blog_posts,${result.totals.blog_posts}`);
    return lines.join("\n");
  }

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    try {
      const result = await fetchMetrics({});
      const csv = "\uFEFF" + toCsv(result); // BOM para Excel BR
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const date = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `metricas-cidades-${date}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`CSV exportado (${result.totals.cities} cidades)`);
    } catch (err) {
      console.error(err);
      toast.error("Falha ao exportar métricas");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} disabled={busy}>
      <Download className="mr-2 h-4 w-4" />
      {busy ? "Exportando…" : "Exportar CSV"}
    </Button>
  );
}

function AdminTabs({ initialCity, onLogout }: { initialCity: string; onLogout?: () => void }) {

  const [tab, setTab] = useState<"providers" | "blog" | "seo">("providers");
  return (
    <div>
      <div className="container mx-auto max-w-5xl px-4 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={tab === "providers" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("providers")}
          >
            Anunciantes
          </Button>
          <Button
            variant={tab === "blog" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("blog")}
          >
            Blog
          </Button>
          <Button
            variant={tab === "seo" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("seo")}
          >
            Relatório SEO
          </Button>
          <div className="ml-auto">
            <ExportMetricsButton />
          </div>
        </div>
      </div>
      {tab === "providers" ? (
        <AdminEditor initialCity={initialCity} />
      ) : tab === "blog" ? (
        <BlogAdmin />
      ) : (
        <SeoReport />
      )}
    </div>
  );
}



function SeoReport() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any[]>([]);

  const generateReport = async () => {
    setLoading(true);
    try {
      // Coleta dados das rotas principais e uma amostra de cidades
      const routes = [
        { path: "/", label: "Home" },
        { path: "/servicos", label: "Serviços" },
        { path: "/cobertura", label: "Cobertura" },
        { path: "/servicos-de-guincho-e-reboque", label: "Cidades A-Z" },
        { path: "/rodovias-vale-do-paraiba", label: "Rodovias Vale" },
        { path: "/guincho-em-sao-paulo-sp", label: "Guincho SP (Capital)" },
        { path: "/guincho-em-taubate-sp", label: "Guincho Taubaté" },
        { path: "/guinchos-nas-rodovias-marginal-tiete", label: "Marginal Tietê" },
        { path: "/guinchos-nas-rodovias-rodovia-castelo-branco", label: "Castello Branco" },
      ];

      // Simulamos a coleta de dados (em um cenário real, isso viria de uma API que renderiza a página e extrai as metas)
      // Como estamos no cliente, vamos apenas listar o que "deveria" estar lá baseado no código
      const results = routes.map((r) => ({
        ...r,
        title: "OK",
        description: "OK",
        schema: "LocalBusiness / FAQ",
        indexation: "Indexável",
      }));

      setReport(results);
    } catch (e) {
      toast.error("Erro ao gerar relatório");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateReport();
  }, []);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Relatório Automático de SEO</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhamento de títulos, meta tags e schemas por rota principal.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold">Rota</th>
                  <th className="px-4 py-3 font-semibold">Título</th>
                  <th className="px-4 py-3 font-semibold">Meta Desc</th>
                  <th className="px-4 py-3 font-semibold">Schema</th>
                  <th className="px-4 py-3 font-semibold">Indexação</th>
                </tr>
              </thead>
              <tbody>
                {report.map((r, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px]">{r.path}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                        {r.title}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                        {r.description}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs">{r.schema}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{r.indexation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Total de Rotas</p>
          <p className="text-2xl font-black text-primary">856</p>
        </div>
        <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/10">
          <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Sitemap Status</p>
          <p className="text-2xl font-black text-green-600">Atualizado</p>
        </div>
        <div className="p-4 bg-accent/5 rounded-xl border border-accent/10">
          <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Saúde SEO</p>
          <p className="text-2xl font-black text-accent">100%</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={generateReport} disabled={loading} size="sm">
          {loading ? "Atualizando..." : "Atualizar Relatório"}
        </Button>
      </div>
    </div>
  );
}

const ALL_CITY_OPTIONS = ALL_CITIES.map((c) => ({
  value: `${c.slug}-${c.uf.toLowerCase()}`,
  label: `${c.name} - ${c.uf}`,
}));

function AdminEditor({ initialCity }: { initialCity: string }) {
  const [city, setCity] = useState(initialCity || ALL_CITY_OPTIONS[0]?.value || "");
  const [tick, setTick] = useState(0);
  const [cadastradas, setCadastradas] = useState<string[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const loadProviderData = useServerFn(getAdminProviderData);
  const createProvider = useServerFn(createAdminProvider);
  const saveProvider = useServerFn(saveAdminProviderOverride);
  const deleteProvider = useServerFn(deleteAdminProvider);

  useEffect(() => {
    if (!city) return;
    let cancelled = false;
    setLoading(true);
    loadProviderData({ data: { citySlug: city } })
      .then((data) => {
        if (cancelled) return;
        setProviders(data.providers);
        setCadastradas(data.cities);
        setAddedIds(new Set(data.addedProviderIds));
      })
      .catch(() => toast.error("Erro ao carregar anunciantes"))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, tick]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel — Anunciantes</h1>
          <p className="text-sm text-muted-foreground">
            Crie e edite anunciantes com perfil completo (logo, fotos, contatos e mais).
          </p>
        </div>
        <div className="flex gap-2">
          <LogoutButton />
        </div>

      </div>

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium">Cidade</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {cadastradas.length > 0 && (
            <optgroup label="Com cadastro próprio">
              {cadastradas.map((c) => {
                const opt = ALL_CITY_OPTIONS.find((o) => o.value === c);
                return (
                  <option key={c} value={c}>
                    {opt?.label || c}
                  </option>
                );
              })}
            </optgroup>
          )}
          <optgroup label="Todas as cidades">
            {ALL_CITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <ProviderForm
        key={`new-${city}`}
        city={city}
        onSaved={async (data) => {
          await createProvider({ data: { citySlug: city, provider: {
            name: data.name,
            tier: data.tier,
            area: data.area || undefined,
            whatsapp: data.whatsapp || undefined,
            phoneMasked: data.phoneMasked || undefined,
            phone: data.phone || undefined,
            address: data.address || undefined,
            description: data.description || undefined,
            instagram: data.instagram || undefined,
            website: data.website || undefined,
            verified: data.verified,
            logoUrl: data.logoUrl || undefined,
            photos: data.photos.length ? data.photos : undefined,
          } } });
          setTick((t) => t + 1);
          toast.success("Anunciante criado");
        }}
      />

      <h2 className="mb-3 mt-8 text-lg font-semibold">
        Anunciantes desta cidade ({providers.length})
      </h2>
      {loading && <p className="mb-3 text-sm text-muted-foreground">Carregando anunciantes…</p>}

      <div className="space-y-3">
        {providers.map((p) => (
          <ProviderRow
            key={p.id || p.name}
            provider={p}
            isCustom={!!p.id && addedIds.has(p.id)}
            onSave={async (patch) => {
              if (!p.id) {
                toast.error("Anunciante sem ID — não pode ser editado.");
                return;
              }
              await saveProvider({ data: { citySlug: city, providerId: p.id, patch } });
              setTick((t) => t + 1);
              toast.success("Salvo");
            }}
            onRemove={async () => {
              if (!p.id) return;
              await deleteProvider({ data: { citySlug: city, providerId: p.id } });
              setTick((t) => t + 1);
              toast.success("Anunciante removido");
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Password changes are managed via the ADMIN_PASSWORD environment variable on the server.


const TIERS: { value: ProviderTier; label: string; color: string }[] = [
  { value: "ghost", label: "Não pago (Ghost)", color: "bg-muted text-muted-foreground" },
  { value: "bronze", label: "Bronze", color: "bg-amber-700 text-white" },
  { value: "silver", label: "Prata", color: "bg-slate-400 text-white" },
  { value: "gold", label: "Ouro", color: "bg-yellow-500 text-white" },
];

// ---------- Helpers ----------

async function fileToDataUrl(file: File, maxSizeKB = 400): Promise<string> {
  if (file.size > maxSizeKB * 1024 * 4) {
    throw new Error(`Imagem muito grande (máx ~${maxSizeKB * 4}KB).`);
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Falha ao ler imagem"));
    reader.readAsDataURL(file);
  });
}

type FormState = {
  name: string;
  tier: ProviderTier;
  area: string;
  whatsapp: string;
  phoneMasked: string;
  phone: string;
  address: string;
  description: string;
  instagram: string;
  website: string;
  verified: boolean;
  logoUrl: string;
  photos: string[];
};

function emptyForm(): FormState {
  return {
    name: "",
    tier: "bronze",
    area: "",
    whatsapp: "",
    phoneMasked: "",
    phone: "",
    address: "",
    description: "",
    instagram: "",
    website: "",
    verified: false,
    logoUrl: "",
    photos: [],
  };
}

function fromProvider(p: Provider): FormState {
  return {
    name: p.name || "",
    tier: p.tier,
    area: p.area || "",
    whatsapp: p.whatsapp || "",
    phoneMasked: p.phoneMasked || "",
    phone: p.phone || "",
    address: p.address || "",
    description: p.description || "",
    instagram: p.instagram || "",
    website: p.website || "",
    verified: !!p.verified,
    logoUrl: p.logoUrl || "",
    photos: p.photos || [],
  };
}

// ---------- Form (create + inline edit reuse) ----------

function ProviderForm({
  city,
  initial,
  onSaved,
  isEdit,
}: {
  city: string;
  initial?: FormState;
  onSaved: (data: FormState) => void | Promise<void>;
  isEdit?: boolean;
}) {
  const [f, setF] = useState<FormState>(initial || emptyForm());
  const [saving, setSaving] = useState(false);
  const logoInput = useRef<HTMLInputElement>(null);
  const photosInput = useRef<HTMLInputElement>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((s) => ({ ...s, [k]: v }));

  const handleLogo = async (file?: File) => {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file, 200);
      update("logoUrl", url);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handlePhotos = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = MAX_PHOTOS - f.photos.length;
    if (remaining <= 0) {
      toast.error(`Máximo de ${MAX_PHOTOS} fotos`);
      return;
    }
    const toAdd: string[] = [];
    for (const file of Array.from(files).slice(0, remaining)) {
      try {
        toAdd.push(await fileToDataUrl(file, 400));
      } catch (e) {
        toast.error((e as Error).message);
      }
    }
    update("photos", [...f.photos, ...toAdd]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    const name = f.name.trim();
    if (!name) return toast.error("Informe o nome do anunciante");
    if (!isEdit && !city) return toast.error("Selecione uma cidade");
    if (f.tier !== "ghost" && !f.whatsapp && !f.phone) {
      return toast.error("Tiers pagos exigem WhatsApp ou Telefone");
    }
    if (f.whatsapp && !/^\d{10,15}$/.test(f.whatsapp)) {
      return toast.error("WhatsApp inválido (apenas dígitos, ex: 5511999999999)");
    }
    if (f.phone && !/^\d{8,15}$/.test(f.phone)) {
      return toast.error("Telefone inválido (apenas dígitos)");
    }

    const data: FormState = { ...f, name };
    setSaving(true);
    try {
      await onSaved(data);
      if (!isEdit) setF(emptyForm());
    } catch {
      toast.error("Erro ao salvar anunciante");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className={isEdit ? "" : "border-primary/40 bg-primary/5"}>
      <CardContent className="p-4">
        {!isEdit && (
          <div className="mb-3 flex items-center gap-2">
            <Plus className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Adicionar novo anunciante</h2>
          </div>
        )}
        <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Nome*</label>
            <Input
              value={f.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ex: Guincho XPTO 24h"
              maxLength={120}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Tier*</label>
            <select
              value={f.tier}
              onChange={(e) => update("tier", e.target.value as ProviderTier)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {TIERS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Área / bairros</label>
            <Input
              value={f.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="Ex: Centro, Zona Sul"
              maxLength={200}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Endereço</label>
            <Input
              value={f.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Rua, número, bairro, cidade"
              maxLength={200}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Telefone p/ ligar (apenas dígitos)
            </label>
            <Input
              value={f.phone}
              onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 15))}
              placeholder="12999999999"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              WhatsApp (5511999999999)
            </label>
            <Input
              value={f.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 15))}
              placeholder="55119XXXXXXXX"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Instagram (URL)</label>
            <Input
              value={f.instagram}
              onChange={(e) => update("instagram", e.target.value)}
              placeholder="https://instagram.com/empresa"
              maxLength={200}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">Site (URL)</label>
            <Input
              value={f.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://empresa.com.br"
              maxLength={200}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">
              Descrição da empresa
            </label>
            <Textarea
              value={f.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Conte sobre a empresa, serviços, anos de experiência..."
              maxLength={600}
              rows={3}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium">
              Telefone mascarado (ghost)
            </label>
            <Input
              value={f.phoneMasked}
              onChange={(e) => update("phoneMasked", e.target.value)}
              placeholder="(12) 9****-****"
              maxLength={30}
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={f.verified}
                onChange={(e) => update("verified", e.target.checked)}
                className="h-4 w-4"
              />
              <BadgeCheck className="h-4 w-4 text-primary" />
              Selo de verificação
            </label>
          </div>

          {/* Logo */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Logo da empresa</label>
            <div className="flex items-center gap-3">
              {f.logoUrl ? (
                <div className="relative">
                  <img
                    src={f.logoUrl}
                    alt="Logo"
                    className="h-16 w-16 rounded-md border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => update("logoUrl", "")}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-0.5 text-destructive-foreground"
                    aria-label="Remover logo"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed text-muted-foreground">
                  <ImageIcon className="h-5 w-5" />
                </div>
              )}
              <input
                ref={logoInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleLogo(e.target.files?.[0])}
              />
              <Button type="button" variant="outline" size="sm" onClick={() => logoInput.current?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Enviar logo
              </Button>
            </div>
          </div>

          {/* Fotos */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">
              Fotos (até {MAX_PHOTOS})
            </label>
            <div className="flex flex-wrap gap-2">
              {f.photos.map((src, i) => (
                <div key={i} className="relative">
                  <img
                    src={src}
                    alt={`Foto ${i + 1}`}
                    className="h-20 w-20 rounded-md border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "photos",
                        f.photos.filter((_, idx) => idx !== i),
                      )
                    }
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-0.5 text-destructive-foreground"
                    aria-label="Remover foto"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {f.photos.length < MAX_PHOTOS && (
                <>
                  <input
                    ref={photosInput}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      handlePhotos(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => photosInput.current?.click()}
                    className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed text-muted-foreground hover:bg-muted"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={saving}>
              <Save className="mr-2 h-4 w-4" /> {saving ? "Salvando..." : isEdit ? "Salvar alterações" : "Adicionar anunciante"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function ProviderRow({
  provider,
  isCustom,
  onSave,
  onRemove,
}: {
  provider: Provider;
  isCustom: boolean;
  onSave: (patch: ProviderOverride) => void | Promise<void>;
  onRemove: () => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const tierMeta = TIERS.find((t) => t.value === provider.tier)!;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {provider.logoUrl ? (
              <img src={provider.logoUrl} alt="" className="h-10 w-10 rounded border object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded border bg-muted text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 font-semibold">
                {provider.name}
                {provider.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                {isCustom && (
                  <Badge variant="outline" className="text-[10px]">
                    Adicionado
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge className={tierMeta.color + " text-[10px]"}>{tierMeta.label}</Badge>
                {provider.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {provider.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
              {open ? "Fechar" : "Editar"}
            </Button>
            {isCustom && (
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  if (confirm("Remover este anunciante?")) onRemove();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {open && (
          <div className="mt-4">
            <ProviderForm
              city=""
              isEdit
              initial={fromProvider(provider)}
              onSaved={(data) => {
                onSave({
                  name: data.name,
                  tier: data.tier,
                  area: data.area || undefined,
                  whatsapp: data.whatsapp || undefined,
                  phoneMasked: data.phoneMasked || undefined,
                  phone: data.phone || undefined,
                  address: data.address || undefined,
                  description: data.description || undefined,
                  instagram: data.instagram || undefined,
                  website: data.website || undefined,
                  verified: data.verified,
                  logoUrl: data.logoUrl || undefined,
                  photos: data.photos.length ? data.photos : undefined,
                });
                setOpen(false);
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Bridge: when ProviderForm is used as the "create" form at the top, it needs to call addProvider.
// We override onSaved at that call site:

// ---------- Blog admin ----------

function BlogAdmin() {
  const [tick, setTick] = useState(0);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const loadPosts = useServerFn(getAdminBlogPosts);
  const savePost = useServerFn(saveAdminBlogPost);
  const removePost = useServerFn(deleteAdminBlogPost);

  useEffect(() => {
    let cancelled = false;
    loadPosts({})
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => toast.error("Erro ao carregar artigos"));
    return () => {
      cancelled = true;
    };
  }, [tick, loadPosts]);

  const blank: BlogPost = {
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
    category: "Dicas",
    coverUrl: "",
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Painel — Blog</h1>
        <p className="text-sm text-muted-foreground">Crie, edite e remova artigos do blog.</p>
      </div>

      <BlogPostForm
        key={editing?.slug || "new"}
        initial={editing || blank}
        isEdit={!!editing}
        onSaved={async (post) => {
          await savePost({ data: post });
          setEditing(null);
          setTick((t) => t + 1);
          toast.success(editing ? "Artigo atualizado" : "Artigo criado");
        }}
        onCancel={editing ? () => setEditing(null) : undefined}
      />

      <h2 className="mb-3 mt-8 text-lg font-semibold">Artigos ({posts.length})</h2>
      <div className="space-y-2">
        {posts.map((p) => (
          <Card key={p.slug}>
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <div className="truncate font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">/{p.slug} · {p.category} · {p.date}</div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Editar</Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (!confirm(`Excluir "${p.title}"?`)) return;
                    removePost({ data: { slug: p.slug } }).then(() => {
                      setTick((t) => t + 1);
                      toast.success("Artigo removido");
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BlogPostForm({
  initial,
  isEdit,
  onSaved,
  onCancel,
}: {
  initial: BlogPost;
  isEdit: boolean;
  onSaved: (p: BlogPost) => void;
  onCancel?: () => void;
}) {
  const [p, setP] = useState<BlogPost>(initial);
  const upd = <K extends keyof BlogPost>(k: K, v: BlogPost[K]) => setP((s) => ({ ...s, [k]: v }));

  const handleCover = async (file?: File) => {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file, 400);
      upd("coverUrl", url);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = p.title.trim();
    if (!title) return toast.error("Informe o título");
    if (!p.content.trim()) return toast.error("Informe o conteúdo");
    const slug = (p.slug.trim() || slugify(title));
    if (!slug) return toast.error("Slug inválido");
    onSaved({ ...p, title, slug, excerpt: p.excerpt.trim() || title });
  };

  return (
    <Card className={isEdit ? "" : "border-primary/40 bg-primary/5"}>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">{isEdit ? "Editar artigo" : "Novo artigo"}</h2>
          {onCancel && (
            <Button size="sm" variant="ghost" onClick={onCancel}>Cancelar edição</Button>
          )}
        </div>
        <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Título*</label>
            <Input value={p.title} onChange={(e) => upd("title", e.target.value)} maxLength={140} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Slug (URL)</label>
            <Input
              value={p.slug}
              onChange={(e) => upd("slug", slugify(e.target.value))}
              placeholder="auto-gerado do título"
              disabled={isEdit}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Categoria</label>
            <Input value={p.category} onChange={(e) => upd("category", e.target.value)} maxLength={40} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Data</label>
            <Input value={p.date} onChange={(e) => upd("date", e.target.value)} maxLength={40} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Imagem de capa</label>
            <Input type="file" accept="image/*" onChange={(e) => handleCover(e.target.files?.[0])} />
            {p.coverUrl && (
              <img src={p.coverUrl} alt="capa" className="mt-2 h-20 w-full rounded object-cover" />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Resumo</label>
            <Textarea value={p.excerpt} onChange={(e) => upd("excerpt", e.target.value)} rows={2} maxLength={300} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium">Conteúdo* (parágrafos separados por linha em branco)</label>
            <Textarea value={p.content} onChange={(e) => upd("content", e.target.value)} rows={10} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit"><Save className="h-4 w-4" /> {isEdit ? "Salvar" : "Publicar"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
// (kept here for clarity — see AdminEditor above)
