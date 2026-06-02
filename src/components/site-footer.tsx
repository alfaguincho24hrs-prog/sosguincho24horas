import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { SITE, SERVICES, CITIES } from "./site-data";
import { memo } from "react";

const SiteFooter = memo(() => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-border/60">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-black tracking-tighter text-accent">
                {SITE.name}
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Rede nacional de guinchos e reboques 24 horas. Conectamos você ao socorro mais próximo com rapidez, segurança e o melhor preço do mercado.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Serviços 24h</h4>
            <ul className="space-y-3">
              <li><Link to="/guincho-leve" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors flex items-center gap-2">Guincho Leve</Link></li>
              <li><Link to="/guincho-pesado" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors flex items-center gap-2">Guincho Pesado</Link></li>
              <li><Link to="/guincho-de-motos" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors flex items-center gap-2">Guincho de Motos</Link></li>
              <li><Link to="/auto-socorro" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors flex items-center gap-2">Auto Socorro</Link></li>
              <li><Link to="/pane-seca" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors flex items-center gap-2">Pane Seca</Link></li>
              <li><Link to="/remocao-veicular" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors flex items-center gap-2">Remoção Veicular</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Cidades em Destaque</h4>
            <ul className="space-y-3">
              {CITIES.slice(0, 6).map((c) => (
                <li key={c}>
                  <Link 
                    to="/guincho-em-{$slug}" 
                    params={{ slug: c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") + "-sp" }}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <MapPin className="h-3 w-3 opacity-50" />
                    Guincho em {c}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/servicos-de-guincho-e-reboque" className="text-sm text-accent hover:underline font-medium">
                  Ver todas as cidades
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Central de Emergência</h4>
            <div className="space-y-4">
              <a href="https://w.app/guincho24horas" className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/50 transition-colors group">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-accent text-primary group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50 uppercase font-bold tracking-wider">Telefone 24h</p>
                  <p className="text-lg font-bold text-accent">{SITE.phone}</p>
                </div>
              </a>
              <a href="https://w.app/guincho24horas" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-colors group">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-500 text-white group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-green-500/70 uppercase font-bold tracking-wider">WhatsApp 24h</p>
                  <p className="text-lg font-bold text-green-500">Chamar agora</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-sm text-primary-foreground/50">
              © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
            </div>
            <div className="text-[10px] text-primary-foreground/30 uppercase tracking-widest">
              CNPJ: 43.141.256/0001-40 | {SITE.address.street}, {SITE.address.city}/{SITE.address.region}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-primary-foreground/40 uppercase tracking-widest font-bold">
            <Link to="/contato" className="hover:text-accent transition-colors">Contato</Link>
            <a href="#" className="hover:text-accent transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-accent transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
});

SiteFooter.displayName = "SiteFooter";

export { SiteFooter };
