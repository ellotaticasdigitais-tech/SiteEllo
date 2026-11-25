import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Instagram, Pause, Play, Sparkles } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { SectionHeading } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { cases, featuredCase, niches, type Creative, type NicheId, type SuccessCase } from "@/data/cases";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const instagramUrl = (handle: string) => `https://www.instagram.com/${handle}/`;
const nicheLabel = (id: NicheId) => niches.find((n) => n.id === id)?.label ?? "";

/* ------------------------------------------------------------------ */
/* Logo do cliente                                                     */
/* ------------------------------------------------------------------ */
export function CaseLogo({ c, className }: { c: SuccessCase; className?: string }) {
  return (
    <span
      className={cn("flex h-14 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl px-3", c.logoBg ? "" : "border border-border bg-card", className)}
      style={c.logoBg ? { backgroundColor: c.logoBg } : undefined}
    >
      {c.logo ? (
        <img src={c.logo} alt={`Logo ${c.client}`} loading="lazy" className="max-h-[80%] max-w-full object-contain" />
      ) : (
        <span className="text-center font-display text-sm font-extrabold leading-tight" style={{ color: c.accent }}>
          {c.client}
        </span>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Carrossel de criativos                                              */
/* ------------------------------------------------------------------ */
export function CreativeCarousel({ items, label, size = "md", dark = false }: { items: Creative[]; label: string; size?: "sm" | "md" | "lg"; dark?: boolean }) {
  const ref = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 1);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const width = size === "sm" ? "w-36 sm:w-40" : size === "lg" ? "w-60 sm:w-72" : "w-44 sm:w-52";

  return (
    <div className="relative" role="region" aria-roledescription="carrossel" aria-label={label}>
      <ul ref={ref} onScroll={update} className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it) => (
          <li key={it.src} className={cn("shrink-0 snap-start", width)}>
            <figure className={cn("overflow-hidden rounded-2xl shadow-soft", dark ? "bg-ink-foreground/10" : "bg-cream")}>
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                onLoad={update}
                className={cn(
                  "aspect-[4/5] w-full",
                  it.fit === "contain" ? "bg-[radial-gradient(120%_90%_at_80%_10%,var(--sun)_0%,var(--amber)_35%,var(--plum)_80%)] object-contain p-3" : "object-cover",
                )}
              />
            </figure>
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Peças anteriores"
            className="absolute -left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card text-ink shadow-lift transition-opacity disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Próximas peças"
            className="absolute -right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card text-ink shadow-lift transition-opacity disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Botão do Instagram                                                  */
/* ------------------------------------------------------------------ */
export function InstagramButton({ c, variant = "outline-ink" }: { c: SuccessCase; variant?: "outline-ink" | "outline-light" | "sun" }) {
  if (!c.instagram) return null;
  return (
    <Button asChild variant={variant}>
      <a href={instagramUrl(c.instagram)} target="_blank" rel="noopener noreferrer" onClick={() => track("cta_click", { cta: "case_instagram", case: c.slug })}>
        <Instagram /> @{c.instagram}
      </a>
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* Case em destaque: a própria Ello                                    */
/* ------------------------------------------------------------------ */
export function FeaturedCase({ c = featuredCase }: { c?: SuccessCase }) {
  return (
    <section aria-labelledby="case-destaque" className="relative isolate overflow-hidden bg-ink-pattern py-20 text-ink-foreground sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-sun px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
              <Sparkles className="size-4" aria-hidden="true" /> Case principal
            </p>
            <h2 id="case-destaque" className="display-lg mt-5">
              {c.headline}
            </h2>
            <p className="lead mt-5 text-ink-foreground/80">{c.summary}</p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.delivered.map((d, i) => (
                <li key={d} className="flex gap-3 rounded-2xl bg-ink-foreground/[0.06] p-4 text-sm leading-snug">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sun font-display text-xs font-extrabold text-ink">{i + 1}</span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="sun" size="lg">
              <Link to="/cases/$slug" params={{ slug: c.slug }}>
                Ver o case completo <ArrowRight />
              </Link>
            </Button>
            <InstagramButton c={c} variant="outline-light" />
          </Reveal>
        </div>

        <Reveal variant="right" className="relative min-w-0">
          <div className="rounded-[2.25rem] bg-ink-foreground/[0.06] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <img src="/brand/ello-logo-light.webp" alt="Ello Táticas Digitais" className="h-10 w-auto" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-foreground/60">Peças do case</span>
            </div>
            <CreativeCarousel items={c.creatives} label={`Peças do case ${c.client}`} size="lg" dark />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cartão de case                                                      */
/* ------------------------------------------------------------------ */
export function CaseCard({ c }: { c: SuccessCase }) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${c.accent}1A`, color: c.accent }}>
            {nicheLabel(c.niche)}
          </span>
          <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight">{c.client}</h3>
        </div>
        <CaseLogo c={c} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>

      <div className="mt-5 flex-1">
        {c.creatives.length > 0 ? (
          <CreativeCarousel items={c.creatives} label={`Peças do case ${c.client}`} size="sm" />
        ) : (
          <ul className="flex flex-wrap gap-2">
            {c.delivered.map((d) => (
              <li key={d} className="rounded-full bg-cream px-3 py-1.5 text-xs font-semibold">
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="ink">
          <Link to="/cases/$slug" params={{ slug: c.slug }}>
            Ver case <ArrowUpRight />
          </Link>
        </Button>
        <InstagramButton c={c} />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Lista com filtro por nicho                                          */
/* ------------------------------------------------------------------ */
export function CasesExplorer() {
  const [filter, setFilter] = useState<NicheId | "todos">("todos");
  const others = cases.filter((c) => !c.featured);
  const used = niches.filter((n) => others.some((c) => c.niche === n.id));

  return (
    <div>
      <div role="group" aria-label="Filtrar cases por nicho" className="flex flex-wrap justify-center gap-2">
        {[{ id: "todos" as const, label: "Todos" }, ...used].map((n) => {
          const count = n.id === "todos" ? others.length : others.filter((c) => c.niche === n.id).length;
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={filter === n.id}
              onClick={() => setFilter(n.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                filter === n.id ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card hover:border-ink/40",
              )}
            >
              {n.label}
              <span className={cn("rounded-full px-2 text-xs", filter === n.id ? "bg-sun text-ink" : "bg-cream")}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {others
          .filter((c) => filter === "todos" || c.niche === filter)
          .sort((x, y) => used.findIndex((n) => n.id === x.niche) - used.findIndex((n) => n.id === y.niche))
          .map((c, i) => (
            <Reveal as="li" key={c.slug} delay={(i % 2) * 80} className="min-w-0">
              <CaseCard c={c} />
            </Reveal>
          ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* "Efeito computador" da home                                         */
/* ------------------------------------------------------------------ */
export function CaseLaptop() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const c = cases[i] ?? cases[0]!;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);
  useEffect(() => {
    if (!playing || hover) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % cases.length), 4200);
    return () => window.clearInterval(t);
  }, [playing, hover]);

  const go = (d: number) => setI((v) => (v + d + cases.length) % cases.length);

  return (
    <div
      className="mx-auto w-full max-w-4xl"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className="relative" role="region" aria-roledescription="carrossel" aria-label="Cases de sucesso">
        <div className="relative mx-auto w-[88%] rounded-t-[1.6rem] border-[10px] border-b-[14px] border-ink-deep bg-ink-deep shadow-lift">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink">
            {cases.map((k, idx) => (
              <CaseScreen key={k.slug} c={k} active={idx === i} />
            ))}
          </div>
          <span className="absolute left-1/2 top-[-6px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink-muted/40" aria-hidden="true" />
        </div>
        <div className="relative mx-auto h-4 w-full rounded-b-[1.2rem] bg-gradient-to-b from-ink-muted to-ink-muted/60 shadow-soft" aria-hidden="true">
          <span className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-lg bg-ink/20" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline-ink" size="icon" onClick={() => go(-1)} aria-label="Case anterior">
          <ChevronLeft />
        </Button>
        <div className="flex gap-2" role="tablist" aria-label="Escolher case">
          {cases.map((k, idx) => (
            <button
              key={k.slug}
              role="tab"
              aria-selected={idx === i}
              aria-label={k.client}
              onClick={() => setI(idx)}
              className={cn("h-2.5 rounded-full transition-all duration-300", idx === i ? "w-10 bg-violet" : "w-2.5 bg-border hover:bg-ink-muted")}
            />
          ))}
        </div>
        <Button variant="outline-ink" size="icon" onClick={() => go(1)} aria-label="Próximo case">
          <ChevronRight />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pausar troca automática" : "Retomar troca automática"}>
          {playing ? <Pause /> : <Play />}
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {c.client}, {c.segment}
      </p>
    </div>
  );
}

function CaseScreen({ c, active }: { c: SuccessCase; active: boolean }) {
  const shots = c.creatives.slice(0, 3);
  return (
    <div
      aria-hidden={!active}
      className={cn(
        "absolute inset-0 grid grid-cols-1 gap-4 bg-ink-pattern p-4 transition-all duration-700 sm:grid-cols-[1.1fr_1fr] sm:p-9",
        active ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-8 opacity-0",
      )}
    >
      <div className="flex min-w-0 flex-col justify-between">
        <div className="flex items-center gap-2">
          <span className="truncate rounded-full bg-ink-foreground/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-ink-muted sm:text-xs">{c.segment}</span>
          {c.featured && <span className="rounded-full bg-sun px-2 py-0.5 text-[0.6rem] font-bold uppercase text-ink sm:text-xs">Destaque</span>}
        </div>
        <div>
          <p className="font-display text-xl font-extrabold leading-none sm:text-4xl">{c.client}</p>
          <p className="mt-2 line-clamp-3 text-xs text-sun sm:mt-3 sm:text-base">{c.headline}</p>
        </div>
        <Link
          to="/cases/$slug"
          params={{ slug: c.slug }}
          tabIndex={active ? 0 : -1}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sun px-3 py-1.5 text-[0.7rem] font-bold text-ink transition-transform hover:-translate-y-0.5 sm:px-4 sm:py-2 sm:text-sm"
        >
          Ver case <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="relative hidden sm:block">
        {shots.length > 0 ? (
          shots.map((s, k) => (
            <img
              key={s.src}
              src={s.src}
              alt=""
              loading="lazy"
              className={cn("absolute top-1/2 aspect-[4/5] w-[58%] rounded-xl shadow-lift", s.fit === "contain" ? "bg-[radial-gradient(120%_90%_at_80%_10%,var(--sun)_0%,var(--amber)_35%,var(--plum)_80%)] object-contain p-2" : "object-cover")}
              style={{ left: `${k * 21}%`, transform: `translateY(-50%) rotate(${(k - 1) * 6}deg)`, zIndex: k === 1 ? 3 : 2 - k }}
            />
          ))
        ) : (
          <div className="grid h-full place-items-center">
            <CaseLogo c={c} className="h-24 w-44" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Cartões resumidos para a home e outras páginas. */
export function CaseCards({ limit = 3 }: { limit?: number }) {
  const list = [featuredCase, ...cases.filter((c) => !c.featured && c.creatives.length > 0)].slice(0, limit);
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {list.map((c, i) => (
        <Reveal as="li" key={c.slug} delay={i * 90}>
          <Link
            to="/cases/$slug"
            params={{ slug: c.slug }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="flex h-44 items-end gap-2 overflow-hidden bg-cream px-5 pt-5">
              {c.creatives.slice(0, 3).map((s) => (
                <img key={s.src} src={s.src} alt="" loading="lazy" className={cn("aspect-[4/5] w-1/3 rounded-t-xl shadow-soft transition-transform duration-500 group-hover:-translate-y-1", s.fit === "contain" ? "bg-plum object-contain p-1" : "object-cover")} />
              ))}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="eyebrow">{c.featured ? "Case principal" : nicheLabel(c.niche)}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{c.client}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.headline}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
                Ver case completo <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

export function CasesSection() {
  return (
    <section id="cases" aria-labelledby="cases-titulo" className="section-y bg-cream">
      <div className="container-site">
        <SectionHeading eyebrow="Prova real" title={<span id="cases-titulo">Cases de sucesso</span>} align="center" />
        <Reveal variant="scale" className="mt-14">
          <CaseLaptop />
        </Reveal>
        <div className="mt-16">
          <CaseCards />
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="link">
            <Link to="/cases">Ver todos os cases →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

