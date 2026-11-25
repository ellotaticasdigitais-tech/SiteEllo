import { BadgeCheck, MessageSquareQuote } from "lucide-react";

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
                A maioria das agências vende “postar bonito”. <span className="text-gradient-brand">A Ello vende sistema.</span>
              </span>
            }
            lead="Presença digital profissional + relacionamento estratégico + tráfego qualificado + tecnologia de automação — tudo integrado, nunca ações soltas."
          />
          <Reveal delay={200}>
            <p className="mt-8 font-display text-2xl font-bold text-plum">Tática que conecta ideias a resultado.</p>
          </Reveal>
        </div>
        <Reveal variant="right">
          <div className="overflow-hidden rounded-[2rem] bg-ink-pattern shadow-lift">
            <table className="w-full text-left text-sm sm:text-base">
              <caption className="sr-only">Comparação entre agência tradicional e Ello Táticas Digitais</caption>
              <thead>
                <tr className="border-b border-ink-foreground/15">
                  <th scope="col" className="p-5 font-semibold text-ink-muted">Agência tradicional</th>
                  <th scope="col" className="p-5 font-display text-lg font-bold text-sun">Ello Táticas Digitais</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.ello} className="group border-b border-ink-foreground/10 last:border-0 transition-colors hover:bg-ink-foreground/5">
                    <td className="p-5 text-ink-muted line-through decoration-ink-muted/40">{row.traditional}</td>
                    <td className="p-5 font-semibold text-ink-foreground transition-transform group-hover:translate-x-1">{row.ello}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Estamos reunindo os depoimentos autorizados dos nossos clientes — avaliações do Google, mensagens e vídeos reais.
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
