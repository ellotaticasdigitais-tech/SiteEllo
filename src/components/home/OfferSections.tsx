import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, Bot, Check, Clapperboard, Gift, MessageCircle, Rocket, Sparkles, TrendingUp, Compass, Fingerprint, Megaphone, MonitorSmartphone, Palette, Share2, Workflow, Wrench } from "lucide-react";

import { Reveal, Tilt } from "@/components/animations/motion";
import { SectionHeading } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { billingPeriods, formatBRL, periodSavings, planAddon, plans, type BillingPeriod, type PlanId } from "@/data/plans";
import { coreServices } from "@/data/services";
import { track } from "@/lib/analytics";
import { whatsappLinkText } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const serviceIcons: Record<string, typeof Compass> = {
  "dna-da-marca": Fingerprint,
  "identidade-visual-e-branding": Palette,
  "sites-e-landing-pages": MonitorSmartphone,
  "gestao-de-redes-sociais": Share2,
  "captacao-e-edicao-de-video": Clapperboard,
  "trafego-pago": Megaphone,
  "inbound-marketing": Workflow,
  "consultoria-estrategica": Compass,
  "ello-ia": Bot,
};

export function ServicesGrid({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <div>
      {withHeading && (
        <SectionHeading
          eyebrow="O que fazemos"
          title="Assessoria 360° no digital"
          lead="Cada serviço tem sua própria página, focada em uma única ação, para você ir direto ao que precisa."
        />
      )}
      <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-4", withHeading && "mt-14")}>
        {coreServices.map((s, i) => {
          const Icon = serviceIcons[s.slug] ?? Wrench;
          return (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 80} className="h-full">
              <Tilt className="h-full">
                <Link
                  to="/servicos/$slug"
                  params={{ slug: s.slug }}
                  onClick={() => track("service_click", { service: s.slug })}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-violet/40 hover:shadow-lift"
                >
                  <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sun/0 blur-2xl transition-colors duration-500 group-hover:bg-sun/40" aria-hidden="true" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-sun transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
                    Ver página do serviço <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Tilt>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="servicos" aria-label="Serviços" className="section-y bg-paper">
      <div className="container-site">
        <ServicesGrid />
      </div>
    </section>
  );
}

export function TechSection() {
  return (
    <section aria-labelledby="tecnologia" className="section-y relative overflow-hidden bg-cream">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading eyebrow="Diferencial: não é só agência" title={<span id="tecnologia">Tecnologia própria da Ello</span>} />
          <Reveal variant="right" className="hidden lg:block">
            <img src="/luma/luma-pensando.webp" alt="" aria-hidden="true" width={643} height={900} loading="lazy" className="w-36 drop-shadow-xl" />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Tilt className="h-full">
              <article className="relative h-full overflow-hidden rounded-[2rem] bg-ink-pattern p-8 shadow-lift sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" /> já disponível
                </span>
                <h3 className="display-md mt-5">Ello IA</h3>
                <p className="lead mt-3 text-ink-foreground/80">
                  CRM com atendimento por IA 24/7 no WhatsApp: qualifica, conduz e vende, com humano assumindo quando precisar.
                </p>
                <ChatMock />
                <Button asChild variant="sun" size="lg" className="mt-8">
                  <Link to="/servicos/$slug" params={{ slug: "ello-ia" }} onClick={() => track("cta_click", { cta: "tech_ello_ia" })}>
                    Conhecer a Ello IA <ArrowRight />
                  </Link>
                </Button>
              </article>
            </Tilt>
          </Reveal>
          <Reveal delay={120}>
            <Tilt className="h-full">
              <article className="relative h-full overflow-hidden rounded-[2rem] border-2 border-dashed border-plum/30 bg-paper p-8 sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wider text-plum">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-amber" aria-hidden="true" /> em desenvolvimento
                </span>
                <h3 className="display-md mt-5">Ello CRM</h3>
                <p className="lead mt-3 text-muted-foreground">
                  CRM próprio da Ello, com integração a WhatsApp Web, kanban de atendimento e funil comercial, ainda em construção, sem data de
                  lançamento confirmada.
                </p>
                <KanbanMock />
                <Button asChild variant="outline-ink" size="lg" className="mt-8">
                  <Link to="/tecnologia" hash="crm" onClick={() => track("cta_click", { cta: "tech_crm_aviso" })}>
                    Quero ser avisado no lançamento <ArrowRight />
                  </Link>
                </Button>
              </article>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Illustrative UI (not a product screenshot). */
function ChatMock() {
  return (
    <div aria-hidden="true" className="mt-8 space-y-2.5 rounded-3xl bg-ink-deep/60 p-4 text-sm">
      <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-ink-foreground/10 px-4 py-2.5">Oi! Vi o anúncio, vocês atendem minha cidade?</p>
      <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-whatsapp px-4 py-2.5 text-whatsapp-foreground">
        Atendemos sim! Me conta: qual o principal objetivo da sua empresa hoje?
      </p>
      <p className="flex items-center gap-2 pl-1 text-xs text-ink-muted">
        <Bot className="size-3.5" /> Ello IA · ilustração
      </p>
    </div>
  );
}

function KanbanMock() {
  const cols = ["Novo lead", "Em atendimento", "Proposta"];
  return (
    <div aria-hidden="true" className="mt-8 grid grid-cols-3 gap-2 opacity-70">
      {cols.map((c, i) => (
        <div key={c} className="rounded-2xl bg-cream p-2.5">
          <p className="mb-2 truncate text-[0.65rem] font-bold uppercase tracking-wider text-plum">{c}</p>
          {Array.from({ length: 3 - i }).map((_, j) => (
            <div key={j} className="mb-1.5 h-7 rounded-lg bg-card shadow-soft" />
          ))}
        </div>
      ))}
    </div>
  );
}

const planIcons: Record<PlanId, typeof Compass> = {
  performance: TrendingUp,
  expansao: Rocket,
  conexao: Sparkles,
};

export function PlansCards({ compact = false }: { compact?: boolean }) {
  const [period, setPeriod] = useState<BillingPeriod>("mensal");
  const periodInfo = billingPeriods.find((b) => b.id === period)!;

  return (
    <div>
      <div className="flex justify-center">
        <div role="group" aria-label="Forma de pagamento" className="inline-flex max-w-full rounded-full border border-border bg-card p-1 shadow-soft sm:p-1.5">
          {billingPeriods.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={period === b.id}
              onClick={() => {
                setPeriod(b.id);
                track("cta_click", { cta: `planos_periodo_${b.id}` });
              }}
              className={cn(
                "relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:gap-2 sm:px-6 sm:text-sm",
                period === b.id ? "bg-ink text-ink-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {b.label}
              {b.hint && (
                <span className={cn("rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold sm:px-2 sm:text-[0.7rem]", period === b.id ? "bg-sun text-ink" : "bg-success/15 text-success")}>{b.hint}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p, i) => {
          const Icon = planIcons[p.id];
          const price = p.prices?.[period];
          const savings = periodSavings(p, period);
          const items = compact ? p.items.slice(0, 4) : p.items;
          const hidden = p.items.length - items.length;
          const dark = Boolean(p.featured);
          return (
            <Reveal as="li" key={p.id} delay={i * 100} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1.5 sm:p-8",
                  dark ? "bg-ink-pattern text-ink-foreground shadow-lift ring-2 ring-sun/70 lg:-translate-y-4 lg:hover:-translate-y-6" : "border border-border bg-card shadow-soft",
                )}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-8 rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink shadow-sun">{p.badge}</span>
                )}

                <div className="flex items-center gap-3">
                  <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", dark ? "bg-sun text-ink" : "bg-violet/10 text-violet")}>
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-extrabold leading-tight">{p.name}</h3>
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed", dark ? "text-ink-foreground/80" : "text-muted-foreground")}>{p.tagline}</p>

                {/* Preço */}
                <div className={cn("mt-6 rounded-2xl p-5", dark ? "bg-ink-foreground/10" : "bg-cream")}>
                  {price ? (
                    <>
                      <p className="flex flex-wrap items-baseline gap-x-1">
                        <span className={cn("font-display text-4xl font-extrabold tracking-tight", dark ? "text-sun" : "text-plum")}>{formatBRL(price.monthly)}</span>
                        <span className={cn("text-sm font-semibold", dark ? "text-ink-foreground/70" : "text-muted-foreground")}>/mês</span>
                      </p>
                      <p className={cn("mt-1 text-xs", dark ? "text-ink-foreground/70" : "text-muted-foreground")}>
                        {periodInfo.id === "mensal" ? "Plano mensal" : `No plano ${periodInfo.label.toLowerCase()}`}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {price.setup === 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
                            <Gift className="size-3.5" aria-hidden="true" /> Setup inicial gratuito
                          </span>
                        ) : (
                          <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", dark ? "bg-ink-foreground/10" : "bg-card")}>
                            + setup inicial de {formatBRL(price.setup)}
                          </span>
                        )}
                        {savings > 0 && (
                          <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink">
                            Economia de {formatBRL(savings)} no {period === "anual" ? "ano" : "semestre"}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className={cn("font-display text-3xl font-extrabold", dark ? "text-sun" : "text-plum")}>A consultar</p>
                      <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-ink-foreground/75" : "text-muted-foreground")}>{p.customNote}</p>
                    </>
                  )}
                </div>

                {/* O que vem no plano */}
                {p.includes && (
                  <p className={cn("mt-6 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider", dark ? "bg-sun/15 text-sun" : "bg-violet/10 text-violet")}>
                    <BadgeCheck className="size-4" aria-hidden="true" /> {p.includes}
                  </p>
                )}
                <ul className={cn("space-y-3.5 text-sm", p.includes ? "mt-4" : "mt-6")}>
                  {items.map((it) => (
                    <li key={it.title} className="flex gap-3">
                      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-xl", dark ? "bg-ink-foreground/10 text-sun" : "bg-sun/20 text-plum")}>
                        <it.icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="leading-snug">
                        <strong className="block font-semibold">{it.title}</strong>
                        {it.detail && <span className={dark ? "text-ink-foreground/70" : "text-muted-foreground"}>{it.detail}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                {hidden > 0 && (
                  <Link to="/planos" className={cn("mt-3 text-sm font-semibold underline-offset-4 hover:underline", dark ? "text-sun" : "text-violet")}>
                    + {hidden} {hidden === 1 ? "item" : "itens"} no plano
                  </Link>
                )}

                {/* Botões */}
                <div className="mt-auto space-y-2 pt-8">
                  <Button asChild variant={dark ? "sun" : "ink"} className="w-full" size="lg">
                    <Link to="/contato" search={{ plano: p.id, ...(p.prices ? { periodo: period } : {}) }} onClick={() => track("plan_click", { plan: p.id, period })}>
                      {p.prices ? `Contratar o ${p.name}` : "Solicitar proposta"} <ArrowRight />
                    </Link>
                  </Button>
                  <a
                    href={whatsappLinkText(
                      p.prices
                        ? `Olá, Ello! Tenho interesse no ${p.name} (${periodInfo.label.toLowerCase()}). Podem me explicar como funciona?`
                        : `Olá, Ello! Quero uma proposta personalizada do ${p.name}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { location: "plano", plan: p.id })}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors",
                      dark ? "text-ink-foreground/85 hover:bg-ink-foreground/10" : "text-foreground/75 hover:bg-cream",
                    )}
                  >
                    <MessageCircle className="size-4" aria-hidden="true" /> Tirar dúvidas no WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
      <Reveal>
        <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm font-semibold">
          <Bot className="size-4 text-violet" aria-hidden="true" /> {planAddon}
        </p>
      </Reveal>
    </div>
  );
}

export function PlansSection() {
  return (
    <section id="planos" aria-labelledby="planos-titulo" className="section-y bg-paper">
      <div className="container-site">
        <SectionHeading eyebrow="Como contratar" title={<span id="planos-titulo">Três planos, pensados para cada fase do seu negócio</span>} align="center" />
        <div className="mt-16">
          <PlansCards compact />
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="link">
            <Link to="/planos">Comparar os planos em detalhe →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
