import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { coreServices } from "@/data/services";
import { fullAddress, site } from "@/data/site";
import { openCookiePreferences } from "@/lib/consent";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-deep text-ink-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo tone="light" />
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Empresa de crescimento empresarial — estratégia, conteúdo, tráfego e tecnologia. {site.tagline}
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sun" />
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-ink-foreground/85 hover:text-sun">
                {fullAddress}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-sun" />
              <a href={`tel:${site.phoneE164}`} className="text-ink-foreground/85 hover:text-sun">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-sun" />
              <a href={`mailto:${site.email}`} className="break-all text-ink-foreground/85 hover:text-sun">
                {site.email}
              </a>
            </li>
          </ul>
          {site.social.length > 0 && (
            <ul className="flex gap-3">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-sun">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FooterCol title="Serviços">
          {coreServices.map((s) => (
            <li key={s.slug}>
              <Link to="/servicos/$slug" params={{ slug: s.slug }} className="hover:text-sun">
                {s.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Institucional">
          <li><Link to="/sobre" className="hover:text-sun">Sobre a Ello</Link></li>
          <li><Link to="/metodo-acelera" className="hover:text-sun">Método ACELERA</Link></li>
          <li><Link to="/planos" className="hover:text-sun">Planos</Link></li>
          <li><Link to="/cases" className="hover:text-sun">Cases</Link></li>
          <li><Link to="/tecnologia" className="hover:text-sun">Ello IA e Ello CRM</Link></li>
          <li><Link to="/ello-lab" className="hover:text-sun">Ello Lab</Link></li>
          <li><a href={site.communityUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sun">Comunidade no WhatsApp</a></li>
          <li><Link to="/blog" className="hover:text-sun">Blog</Link></li>
          <li><Link to="/contato" className="hover:text-sun">Contato</Link></li>
        </FooterCol>

        <FooterCol title="Legal">
          <li><Link to="/politica-de-privacidade" className="hover:text-sun">Política de privacidade</Link></li>
          <li><Link to="/politica-de-cookies" className="hover:text-sun">Política de cookies</Link></li>
          <li><Link to="/termos-de-uso" className="hover:text-sun">Termos de uso</Link></li>
          <li>
            <button type="button" onClick={openCookiePreferences} className="text-left hover:text-sun">
              Preferências de cookies
            </button>
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
            {site.cnpj ? ` · CNPJ ${site.cnpj}` : ""} — feito pela própria Ello.
          </p>
          <p>Louveira-SP · atendimento em todo o Brasil</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow eyebrow-on-ink mb-4 font-sans">{title}</h2>
      <ul className="space-y-2.5 text-sm text-ink-foreground/85">{children}</ul>
    </div>
  );
}
