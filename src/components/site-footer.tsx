import { Link } from "@tanstack/react-router";
import { Truck, Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "./site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-primary text-primary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold">
            <Truck className="h-5 w-5 text-accent" />
            <span>{SITE.name}</span>
          </div>
          <p className="text-sm text-primary-foreground/70">
            Plataforma nacional que conecta motoristas a empresas de guincho e reboque qualificadas, 24 horas por dia, 7 dias por semana.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Serviços</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/guincho-leve" className="hover:text-accent">Guincho Leve</Link></li>
            <li><Link to="/guincho-pesado" className="hover:text-accent">Guincho Pesado</Link></li>
            <li><Link to="/guincho-de-motos" className="hover:text-accent">Guincho de Motos</Link></li>
            <li><Link to="/auto-socorro" className="hover:text-accent">Auto Socorro</Link></li>
            <li><Link to="/pane-seca" className="hover:text-accent">Pane Seca</Link></li>
            <li><Link to="/remocao-veicular" className="hover:text-accent">Remoção Veicular</Link></li>
            <li><Link to="/servicos" className="font-medium hover:text-accent">Ver todos →</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Portal</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/cobertura" className="hover:text-accent">Cobertura nacional</Link></li>
            <li><Link to="/anuncie" className="hover:text-accent">Anuncie sua empresa</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link to="/contato" className="hover:text-accent">Fale conosco</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Contato</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors" aria-label={`Ligar para ${SITE.phone}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-accent transition-colors" aria-label={`Enviar e-mail para ${SITE.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />Atendimento em todo o Brasil</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        <div className="mb-2">
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
        </div>
        <div className="space-y-1 opacity-80">
          <p>CNPJ: 43.141.256/0001-40 | {SITE.name}</p>
          <p>{SITE.address.street}, {SITE.address.neighborhood} - {SITE.address.city}/{SITE.address.region}</p>
          <p>Telefone: {SITE.phone} | Atendimento 24 Horas</p>
        </div>
      </div>
    </footer>
  );
}
