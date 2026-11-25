import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { openCookiePreferences } from "@/lib/consent";
import { track } from "@/lib/analytics";

/** Landing-page header: logo, breadcrumb and a single CTA (attention ratio 1:1). */
export function LandingHeader({ crumbs, ctaLabel = "Solicitar orçamento", ctaHref = "#formulario" }: { crumbs: { label: string; to?: string; params?: Record<string, string> }[]; ctaLabel?: string; ctaHref?: string }) {
  return (
    <header className="absolute inset-x-0 top-0 z-40 py-4">
      <div className="container-site grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link to="/" aria-label="Ello Táticas Digitais, página inicial" className="shrink-0">
            <Logo tone="light" />
          </Link>
          <nav aria-label="Você está em" className="hidden min-w-0 md:block">
            <ol className="flex min-w-0 items-center gap-2 text-xs font-semibold text-ink-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex min-w-0 items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.to ? (
                    <Link to={c.to} params={c.params as never} className="hover:text-sun">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="truncate text-ink-foreground">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <Button asChild variant="sun" size="default">
          <a href={ctaHref} onClick={() => track("cta_click", { cta: "landing_header" })}>
            {ctaLabel}
          </a>
        </Button>
      </div>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="bg-ink-deep py-8 text-xs text-ink-muted">
      <div className="container-site flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p>
          {site.phoneDisplay} · {site.email} · Louveira-SP
        </p>
        <p className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span>{site.name}{site.cnpj ? ` · CNPJ ${site.cnpj}` : ""}</span>
          <Link to="/politica-de-privacidade" className="hover:text-sun">Política de privacidade</Link>
          <Link to="/termos-de-uso" className="hover:text-sun">Termos</Link>
          <button type="button" onClick={openCookiePreferences} className="hover:text-sun">Cookies</button>
        </p>
      </div>
    </footer>
  );
}
