import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { BlurBlobs, Reveal, RevealLine } from "@/components/animations/motion";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cn } from "@/lib/utils";

export function SiteShell({ children, headerTone = "dark" }: { children: ReactNode; headerTone?: "dark" | "light" }) {
  return (
    <>
      <SiteHeader tone={headerTone} />
      <main id="conteudo" className="page-transition overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-xs font-semibold", tone === "light" ? "text-ink-muted" : "text-muted-foreground")}>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 opacity-60" aria-hidden="true" />}
            {c.to ? (
              <Link to={c.to} params={c.params as never} className="hover:text-sun">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={tone === "light" ? "text-ink-foreground" : "text-foreground"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Dark patterned hero used by inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-pattern pb-20 pt-32 sm:pb-24 sm:pt-40">
      <BlurBlobs />
      <div className="container-site grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-6">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow eyebrow-on-ink">{eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-lg max-w-4xl">{title}</h1>
          </Reveal>
          {lead && (
            <Reveal delay={160}>
              <p className="lead max-w-2xl text-ink-foreground/80">{lead}</p>
            </Reveal>
          )}
          {children && <Reveal delay={220}>{children}</Reveal>}
        </div>
        {aside && <Reveal variant="right" delay={200}>{aside}</Reveal>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <Reveal>
        <p className={cn("eyebrow", tone === "light" && "eyebrow-on-ink")}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display-lg">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={140}>
          <p className={cn("lead max-w-2xl", align === "center" && "mx-auto", tone === "light" ? "text-ink-foreground/80" : "text-muted-foreground")}>{lead}</p>
        </Reveal>
      )}
      <RevealLine className={cn("h-1 w-24 rounded-full bg-sun-gradient", align === "center" && "mx-auto")} />
    </div>
  );
}
