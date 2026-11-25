import { BadgeCheck, Check, MessageSquareQuote, Sparkles, X } from "lucide-react";

import { Marquee, Reveal, RotatingWord } from "@/components/animations/motion";
import { SectionHeading } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { clientLogos, testimonials } from "@/data/content";
import { comparison, partners } from "@/data/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

export function PartnersStrip() {
  return (
    <section aria-labelledby="parceiros" className="border-b border-border bg-paper py-10">
      <div className="container-site flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <h2 id="parceiros" className="eyebrow shrink-0 font-sans">Parceiros e ferramentas</h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {partners.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 70}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-ink shadow-soft transition-transform hover:-translate-y-0.5">
                {p.logo ? (
                  <img src={p.logo} alt="" aria-hidden="true" className="h-5 w-auto max-w-8 object-contain" />
                ) : (
                  <BadgeCheck className="size-4 text-violet" aria-hidden="true" />
                )}{" "}
                {p.name}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BrandsMarquee() {
  return (
    <section aria-labelledby="marcas" className="bg-paper py-16">
      <div className="container-site mb-8 text-center">
        <p className="eyebrow">Prova real</p>
        <h2 id="marcas" className="display-md mt-2">
          <span className="sr-only">Marcas que crescem e cresceram com a Ello</span>
          <span aria-hidden="true">
            Marcas que <RotatingWord words={["crescem", "cresceram", "crescem", "cresceram"]} interval={2200} className="justify-items-center text-violet" /> com a Ello
          </span>
        </h2>
      </div>
      <Marquee duration={60}>
        {clientLogos.map((c, i) => (
          <span
            key={`${c.name}-${i}`}
            className={cn(
              "mx-4 flex h-20 w-56 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-soft",
              c.bg ? "" : "border border-border bg-card px-8",
              c.bg && !c.fill && "px-6 py-2",
            )}
            style={c.bg ? { backgroundColor: c.bg } : undefined}
          >
            {c.src ? (
              <img
                src={c.src}
                alt={c.name}
                loading="lazy"
                className={cn(
                  c.fill ? "h-full w-full object-cover" : "w-auto object-contain",
                  !c.fill && (c.bg ? "h-full" : "max-h-12 max-w-full"),
                  c.fade && "[mask-image:radial-gradient(closest-side,black_70%,transparent)]",
                )}
              />
            ) : (
              <span className="font-display text-xl font-bold tracking-tight text-ink/80">{c.name}</span>
            )}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export function Positioning() {
  return (
    <section aria-labelledby="posicionamento" className="section-y relative bg-cream grain">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Posicionamento"
            title={
              <span id="posicionamento">
                A maioria das agências vende “postar bonito”. <span className="text-gradient-brand">A Ello vende estratégia.</span>
              </span>
            }
            lead="Presença digital profissional + relacionamento estratégico + tráfego qualificado + tecnologia de automação: tudo integrado, nunca ações soltas."
          />
          <Reveal delay={200}>
            <p className="mt-8 font-display text-2xl font-bold text-plum">Tática que conecta ideias a resultado.</p>
          </Reveal>
        </div>
        <Reveal variant="right">
          <div className="grid grid-cols-[0.92fr_1.08fr] items-center gap-3 sm:gap-4">
            {/* Agência tradicional: lilás, apagado de propósito */}
            <div className="rounded-[1.75rem] bg-[color-mix(in_oklab,var(--violet)_12%,white)] p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-violet/80 sm:text-base">Agência tradicional</h3>
              <ul className="mt-4 space-y-3 sm:space-y-4">
                {comparison.map((row) => (
                  <li key={row.traditional} className="flex items-start gap-2 text-sm text-violet/70 sm:text-base">
                    <X className="mt-0.5 size-4 shrink-0 text-violet/50" aria-hidden="true" />
                    <span className="line-through decoration-violet/30">{row.traditional}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ello: roxo com amarelo e brilho suave */}
            <div className="ello-shine overflow-hidden rounded-[1.75rem] bg-ink-pattern p-4 sm:p-7 lg:-my-6">
              <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-sun sm:text-xl">
                <Sparkles className="size-4 shrink-0 sm:size-5" aria-hidden="true" /> Ello Táticas Digitais
              </h3>
              <ul className="mt-4 space-y-3 sm:space-y-4">
                {comparison.map((row) => (
                  <li key={row.ello} className="flex items-start gap-2 font-display text-sm font-bold text-sun sm:gap-3 sm:text-lg">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sun text-ink sm:size-6">
                      <Check className="size-3 sm:size-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {row.ello}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos" className="section-y bg-paper">
      <div className="container-site">
        <SectionHeading eyebrow="O que dizem sobre a gente" title={<span id="depoimentos">Depoimentos e avaliações</span>} align="center" />
        {testimonials.length > 0 ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={t.author} delay={i * 90} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <MessageSquareQuote className="size-8 text-violet" aria-hidden="true" />
                <blockquote className="mt-4 text-lg leading-relaxed">“{t.text}”</blockquote>
                <p className="mt-5 font-semibold">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.detail} · via {t.source}</p>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mx-auto mt-12 max-w-2xl rounded-3xl border-2 border-dashed border-border bg-card p-8 text-center">
            <MessageSquareQuote className="mx-auto size-10 text-violet" aria-hidden="true" />
            <p className="mt-4 text-lg">
              Estamos reunindo os depoimentos autorizados dos nossos clientes: avaliações do Google, mensagens e vídeos reais.
            </p>
            <p className="mt-2 text-muted-foreground">Quer falar com quem já trabalha com a Ello? Peça referências ao nosso time.</p>
            <Button asChild variant="ink" className="mt-6">
              <a href={whatsappLink("cases")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "testimonials" })}>
                Pedir referências
              </a>
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
