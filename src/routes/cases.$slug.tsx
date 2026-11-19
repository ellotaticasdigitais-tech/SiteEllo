import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { CaseCard, CaseLogo, CreativeCarousel, InstagramButton } from "@/components/home/CasesSection";
import { FinalCta } from "@/components/home/FaqCta";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { VideoReel } from "@/components/media/VideoReel";
import { captacoes } from "@/data/videos";
import { Button } from "@/components/ui/button";
import { cases, getCase, niches } from "@/data/cases";
import { getService } from "@/data/services";
import { track } from "@/lib/analytics";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/cases/$slug")({
  loader: ({ params }) => {
    const c = getCase(params.slug);
    if (!c) throw notFound();
    return { c };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return pageHead({ title: "Case indisponível — Ello", description: "Página indisponível.", path: `/cases/${params.slug}`, noindex: true });
    const { c } = loaderData;
    return pageHead({
      title: `Case ${c.client} — Ello Táticas Digitais`,
      description: `${c.headline}. ${c.summary}`.slice(0, 158),
      path: `/cases/${c.slug}`,
      type: "article",
      noindex: c.status !== "published",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Cases", path: "/cases" }, { name: c.client, path: `/cases/${c.slug}` }])],
    });
  },
  component: CasePage,
});

function CasePage() {
  const { c } = Route.useLoaderData();
  useEffect(() => {
    track("case_view", { case: c.slug });
  }, [c.slug]);
  const niche = niches.find((n) => n.id === c.niche)?.label ?? c.segment;
  const videos = captacoes.filter((v) => v.caseSlug === c.slug);
  const related = cases.filter((x) => x.slug !== c.slug && (x.niche === c.niche || x.featured)).slice(0, 2);

  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Cases", to: "/cases" }, { label: c.client }]}
        eyebrow={`${c.featured ? "Case principal" : "Case"} · ${niche}`}
        title={c.headline}
        lead={c.summary}
        aside={<CaseLogo c={c} className="mx-auto hidden h-36 w-64 rounded-[2rem] shadow-lift lg:flex" />}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="sun" size="lg">
            <a href={whatsappLink("cases")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "case_hero", case: c.slug })}>
              Quero um resultado assim
            </a>
          </Button>
          <InstagramButton c={c} variant="outline-light" />
        </div>
      </PageHero>

      {c.creatives.length > 0 && (
        <section aria-labelledby="pecas" className="section-y bg-paper">
          <div className="container-site">
            <SectionHeading eyebrow="Trabalhos" title={<span id="pecas">Peças criadas para a {c.client}</span>} />
            <Reveal className="mt-10">
              <CreativeCarousel items={c.creatives} label={`Peças do case ${c.client}`} size="lg" />
            </Reveal>
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section aria-labelledby="videos-case" className="section-y bg-ink-pattern text-ink-foreground">
          <div className="container-site">
            <SectionHeading tone="light" eyebrow="Captação e edição" title={<span id="videos-case">Vídeos deste case</span>} />
            <div className="mt-10">
              <VideoReel items={videos} dark label={`Vídeos do case ${c.client}`} />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="entregas" className="section-y bg-cream">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="O que a Ello fez" title={<span id="entregas">Entregas deste case</span>} />
            <ul className="mt-8 space-y-3">
              {c.delivered.map((d) => (
                <li key={d} className="flex gap-3 rounded-2xl bg-card p-4 shadow-soft">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" style={{ color: c.accent }} aria-hidden="true" />
                  <span className="font-semibold">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          {c.services && c.services.length > 0 && (
            <div>
              <SectionHeading eyebrow="Serviços" title="Serviços aplicados" />
              <ul className="mt-8 flex flex-wrap gap-3">
                {c.services.map((slug) => {
                  const s = getService(slug);
                  return s ? (
                    <li key={slug}>
                      <Link to="/servicos/$slug" params={{ slug }} className="inline-flex items-center gap-1.5 rounded-full bg-card px-5 py-3 font-semibold shadow-soft hover:bg-sun">
                        {s.name} <ArrowUpRight className="size-4" />
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      {c.results && c.results.length > 0 && (
        <section className="section-y bg-paper">
          <div className="container-site">
            <SectionHeading eyebrow="Resultados" title="Números, com fonte" />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {c.results.map((r) => (
                <li key={r.metric} className="rounded-3xl bg-ink-pattern p-7 shadow-lift">
                  <p className="font-display text-5xl font-extrabold text-sun">{r.value}</p>
                  <p className="mt-2 font-semibold">{r.metric}</p>
                  <p className="mt-1 text-xs text-ink-foreground/70">
                    Fonte: {r.source}, {r.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="outros-cases" className="section-y bg-paper">
          <div className="container-site">
            <SectionHeading eyebrow="Continue vendo" title={<span id="outros-cases">Outros cases</span>} />
            <ul className="mt-10 grid gap-6 lg:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug} className="min-w-0">
                  <CaseCard c={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta topic="cases" title={`Quer um resultado parecido com o da ${c.client}?`} />
    </SiteShell>
  );
}
