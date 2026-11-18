import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { EllomMark } from "@/components/brand/Logo";
import { Reveal } from "@/components/animations/motion";
import { SectionHeading } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { cases, type SuccessCase } from "@/data/cases";
import { cn } from "@/lib/utils";

/** "Efeito computador": laptop mockup cycling through client cases. */
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
        {/* Screen */}
        <div className="relative mx-auto w-[88%] rounded-t-[1.6rem] border-[10px] border-b-[14px] border-ink-deep bg-ink-deep shadow-lift">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink">
            {cases.map((k, idx) => (
              <CaseScreen key={k.slug} c={k} active={idx === i} />
            ))}
          </div>
          <span className="absolute left-1/2 top-[-6px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink-muted/40" aria-hidden="true" />
        </div>
        {/* Base */}
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
  return (
    <div
      aria-hidden={!active}
      className={cn(
        "absolute inset-0 flex flex-col justify-between bg-ink-pattern p-6 transition-all duration-700 sm:p-10",
        active ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-8 opacity-0",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-ink-foreground/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-ink-muted sm:text-xs">{c.segment}</span>
        <EllomMark tone="light" className="h-8 w-8" />
      </div>
      <div>
        <p className="font-display text-3xl font-extrabold leading-none sm:text-6xl">{c.client}</p>
        <p className="mt-3 text-sm text-sun sm:text-lg">
          {c.status === "published" && c.headline ? c.headline : "Case em preparação — resultados em validação com o cliente"}
        </p>
      </div>
      <Link
        to="/cases/$slug"
        params={{ slug: c.slug }}
        tabIndex={active ? 0 : -1}
        className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sun px-4 py-2 text-xs font-bold text-ink transition-transform hover:-translate-y-0.5 sm:text-sm"
      >
        Ver case <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}

export function CaseCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {cases.map((c, i) => (
        <Reveal as="li" key={c.slug} delay={i * 90}>
          <Link
            to="/cases/$slug"
            params={{ slug: c.slug }}
            className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="eyebrow">{c.segment}</span>
            <h3 className="mt-2 font-display text-2xl font-bold">{c.client}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              {c.status === "published" && c.headline ? c.headline : "Resultados em validação com o cliente antes da publicação."}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
              Ver case completo <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      ))}
      <Reveal as="li" delay={300} className="md:col-span-3">
        <div className="flex flex-col items-center justify-between gap-3 rounded-3xl border-2 border-dashed border-border p-6 text-center sm:flex-row sm:text-left">
          <p className="font-semibold">+ novo case — espaço reservado para o próximo resultado.</p>
          <Link to="/contato" className="text-sm font-semibold text-plum underline underline-offset-4">
            Quero ser o próximo case
          </Link>
        </div>
      </Reveal>
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
      </div>
    </section>
  );
}
