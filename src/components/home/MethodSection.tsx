import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

import { BlurBlobs, Reveal } from "@/components/animations/motion";
import { DiagnosticForm } from "@/components/forms/forms";
import { SectionHeading } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { pillars } from "@/data/site";
import { cn } from "@/lib/utils";

/** Circular arc marker inspired by the Ello symbol; fills by step (n/4). */
export function PillarArc({ step, active, className }: { step: number; active?: boolean; className?: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <span className={cn("relative grid h-16 w-16 shrink-0 place-items-center", className)}>
      <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="28" cy="28" r={r} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="5" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="var(--sun)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={active ? c - (c * step) / 4 : c - (c * step) / 4 + c * 0.12}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="font-display text-xl font-extrabold">{step}</span>
    </span>
  );
}

export function MethodSection() {
  const [active, setActive] = useState(0);
  const p = pillars[active] ?? pillars[0]!;
  return (
    <section id="metodo" aria-labelledby="metodo-titulo" className="section-y relative isolate overflow-hidden bg-ink-pattern">
      <BlurBlobs />
      <div className="container-site">
        <SectionHeading
          tone="light"
          eyebrow="Como trabalhamos"
          title={
            <span id="metodo-titulo">
              Método <span className="text-sun">ACELERA</span> — 4 pilares, um sistema só
            </span>
          }
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div role="tablist" aria-label="Pilares do Método ACELERA" className="space-y-3">
            {pillars.map((pl, i) => (
              <Reveal key={pl.title} delay={i * 80}>
                <button
                  role="tab"
                  id={`pilar-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="pilar-painel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-5 rounded-3xl border p-4 text-left transition-all duration-300",
                    active === i
                      ? "border-sun/60 bg-ink-foreground/10 shadow-sun"
                      : "border-ink-foreground/10 bg-ink-foreground/[0.03] hover:border-ink-foreground/25",
                  )}
                >
                  <PillarArc step={i + 1} active={active === i} className="text-ink-foreground" />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2 font-display text-lg font-bold sm:text-xl">
                      {pl.title}
                      {pl.isNew && <span className="rounded-full bg-sun px-2.5 py-0.5 font-sans text-[0.65rem] font-bold uppercase tracking-wider text-ink">novo</span>}
                    </span>
                    <span className="mt-1 block text-sm text-ink-foreground/70">{pl.short}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal variant="right">
            <div id="pilar-painel" role="tabpanel" aria-labelledby={`pilar-tab-${active}`} className="relative h-full overflow-hidden rounded-[2rem] bg-paper p-8 text-ink shadow-lift sm:p-10">
              <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-10 font-display text-[11rem] font-extrabold leading-none text-cream">
                {active + 1}
              </span>
              <div key={active} className="relative animate-in fade-in slide-in-from-bottom-3 duration-500">
                <p className="eyebrow">Pilar {active + 1} de 4</p>
                <h3 className="display-md mt-3">{p.title}</h3>
                <p className="lead mt-4 text-muted-foreground">{p.detail}</p>
                <div className="mt-8 flex gap-2" aria-hidden="true">
                  {pillars.map((_, i) => (
                    <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500", i <= active ? "bg-sun-gradient" : "bg-cream")} />
                  ))}
                </div>
                <Button asChild variant="ink" size="lg" className="mt-8">
                  <Link to="/metodo-acelera">
                    Conhecer o Método ACELERA completo <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function DiagnosticSection() {
  return (
    <section id="diagnostico" aria-labelledby="diagnostico-titulo" className="section-y relative bg-sun-pattern">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2 text-ink">
              <Sparkles className="size-4" aria-hidden="true" /> Diagnóstico estratégico
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="diagnostico-titulo" className="display-lg mt-4">
              Descubra qual pilar está travando o seu crescimento.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead mt-5 max-w-lg text-ink/80">
              Em uma conversa objetiva, olhamos para sua presença digital, conteúdo, tráfego e atendimento — e mostramos onde está a maior
              oportunidade. Sem compromisso.
            </p>
          </Reveal>
        </div>
        <Reveal variant="scale" className="rounded-[2rem] bg-paper p-6 shadow-lift sm:p-8">
          <DiagnosticForm />
        </Reveal>
      </div>
    </section>
  );
}
