import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowDown, ArrowRight, BadgeCheck, Check } from "lucide-react";

import { BlurBlobs, Magnetic, Reveal, Tilt } from "@/components/animations/motion";
import { ServiceForm } from "@/components/forms/forms";
import { FaqList } from "@/components/home/FaqCta";
import { serviceIcons } from "@/components/home/OfferSections";
import { LandingFooter, LandingHeader } from "@/components/layout/LandingChrome";
import { SectionHeading } from "@/components/layout/SiteShell";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { cases } from "@/data/cases";
import { getService } from "@/data/services";
import { partners, site } from "@/data/site";
import { track } from "@/lib/analytics";
import { breadcrumbLd, pageHead, serviceLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/servicos/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return pageHead({ title: "Serviço não encontrado — Ello", description: "Página indisponível.", path: `/servicos/${params.slug}`, noindex: true });
    const s = loaderData.service;
    return pageHead({
      title: s.seoTitle,
      description: s.seoDescription,
      path: `/servicos/${s.slug}`,
      jsonLd: [
        serviceLd(s.name, s.seoDescription),
        breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: s.name, path: `/servicos/${s.slug}` },
        ]),
      ],
    });
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const Icon = serviceIcons[s.slug] ?? BadgeCheck;
  const highlights = s.highlights ?? [
    { value: "4 anos", label: "de Ello" },
    { value: "Método", label: "ACELERA integrado" },
    { value: "100%", label: "digital, em todo o Brasil" },
  ];

  return (
    <>
      <LandingHeader crumbs={[{ label: "Home", to: "/" }, { label: "Serviços", to: "/servicos" }, { label: s.name }]} />
      <main id="conteudo" className="page-transition overflow-x-clip">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-ink-pattern pb-20 pt-32 sm:pt-40">
          <BlurBlobs />
          <div className="container-site grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div className="min-w-0">
              <Reveal>
                <p className="eyebrow eyebrow-on-ink inline-flex items-center gap-2">
                  <Icon className="size-4" aria-hidden="true" /> {s.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display-xl mt-5 !text-[clamp(2.4rem,5.6vw,4.6rem)]">{s.title}</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="lead mt-6 max-w-xl text-ink-foreground/80">{s.subtitle}</p>
              </Reveal>
              <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild variant="sun" size="xl">
                    <a href="#formulario" onClick={() => track("cta_click", { cta: "lp_hero", service: s.slug })}>
                      Quero um diagnóstico gratuito <ArrowRight />
                    </a>
                  </Button>
                </Magnetic>
                <Button asChild variant="outline-light" size="xl">
                  <a href="#prova">
                    Ver resultados <ArrowDown />
                  </a>
                </Button>
              </Reveal>
            </div>
            <Reveal variant="scale" delay={200}>
              <dl className="grid gap-3">
                {highlights.map((h) => (
                  <div key={h.label} className="flex items-baseline gap-4 rounded-3xl border border-ink-foreground/10 bg-ink-foreground/5 p-5 backdrop-blur">
                    <dt className="sr-only">{h.label}</dt>
                    <dd className="font-display text-3xl font-extrabold text-sun">{h.value}</dd>
                    <dd className="text-sm text-ink-foreground/75">{h.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section aria-label="Parceiros" className="border-b border-border bg-paper py-8">
          <ul className="container-site flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <li key={p.name} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">
                {p.logo ? (
                <img src={p.logo} alt="" aria-hidden="true" className="h-5 w-auto max-w-8 object-contain" />
              ) : (
                <BadgeCheck className="size-4 text-violet" aria-hidden="true" />
              )}{" "}
              {p.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Includes */}
        <section className="section-y bg-paper">
          <div className="container-site">
            <SectionHeading eyebrow="O que está incluso" title="Gestão completa, sem letra miúda" />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {s.includes.map((it, i) => (
                <Reveal as="li" key={it.title} delay={i * 80}>
                  <Tilt className="h-full">
                    <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                      <Check className="size-6 text-violet" aria-hidden="true" />
                      <h3 className="mt-4 font-display text-xl font-bold">{it.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{it.text}</p>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-sun-pattern py-20">
          <div className="container-site grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <Reveal variant="scale">
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-ink text-sun">
                <AlertTriangle className="size-9" aria-hidden="true" />
              </span>
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow text-ink">Custo escondido</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display-md mt-2">{s.problem.title}</h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="lead mt-3 max-w-3xl text-ink/80">{s.problem.text}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Differentials */}
        <section className="section-y bg-cream">
          <div className="container-site">
            <SectionHeading eyebrow="Diferenciais" title="Por que a Ello" />
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {s.differentials.map((d, i) => (
                <Reveal as="li" key={d.title} delay={i * 90} className="rounded-3xl bg-ink-pattern p-7 shadow-lift">
                  <span className="font-display text-5xl font-extrabold text-sun">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-bold">{d.title}</h3>
                  <p className="mt-2 text-sm text-ink-foreground/75">{d.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Proof */}
        <section id="prova" className="section-y scroll-mt-20 bg-paper">
          <div className="container-site">
            <SectionHeading eyebrow="Prova" title="Resultado de quem já roda com a gente" />
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {(cases.filter((c) => c.services?.includes(s.slug)).length ? cases.filter((c) => c.services?.includes(s.slug)) : cases).slice(0, 3).map((c, i) => (
                <Reveal as="li" key={c.slug} delay={i * 80}>
                  <Link to="/cases/$slug" params={{ slug: c.slug }} className="group block h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                    <p className="eyebrow">{c.segment}</p>
                    <p className="mt-2 font-display text-2xl font-bold">{c.client}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{c.headline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-plum">
                      Ver case <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Steps */}
        <section className="section-y bg-cream">
          <div className="container-site">
            <SectionHeading eyebrow="Depois do clique" title="Como funciona" />
            <ol className="mt-12 grid gap-5 md:grid-cols-3">
              {s.steps.map((st, i) => (
                <Reveal as="li" key={st.title} delay={i * 100} className="relative rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <h3 className="font-display text-xl font-bold">{st.title}</h3>
                  <p className="mt-2 text-muted-foreground">{st.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-y bg-paper">
          <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow="Perguntas frequentes" title={`Sobre ${s.name.toLowerCase()} com a Ello`} />
            <FaqList items={s.faqs} />
          </div>
        </section>

        {/* Conversion */}
        <section id="formulario" className="relative isolate scroll-mt-10 overflow-hidden bg-ink-pattern section-y">
          <BlurBlobs />
          <div className="container-site grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <h2 className="display-lg">{s.ctaTitle}</h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="lead mt-5 text-ink-foreground/80">
                  Deixe seu contato e um especialista da Ello chama você para um diagnóstico sem compromisso. Se preferir, fale agora pelo WhatsApp.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <Button asChild variant="whatsapp" size="lg" className="mt-8">
                  <a href={whatsappLink(s.whatsappTopic)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "lp_final", service: s.slug })}>
                    <WhatsAppIcon className="size-5" /> Falar com a Ello agora
                  </a>
                </Button>
                <p className="mt-6 text-sm text-ink-foreground/60">
                  {site.phoneDisplay} · {site.email} · Louveira-SP
                </p>
              </Reveal>
            </div>
            <Reveal variant="scale" className="rounded-[2rem] bg-paper p-6 text-ink shadow-lift sm:p-8">
              <ServiceForm slug={s.slug} serviceName={s.name} topic={s.whatsappTopic} />
            </Reveal>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
