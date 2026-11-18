import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Hourglass } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { FinalCta } from "@/components/home/FaqCta";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { getCase } from "@/data/cases";
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
      description: c.headline ?? `Case da Ello com ${c.client}, segmento ${c.segment.toLowerCase()}.`,
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
  const published = c.status === "published";

  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Cases", to: "/cases" }, { label: c.client }]}
        eyebrow={`Case de sucesso · ${c.segment}`}
        title={published && c.headline ? c.headline : c.client}
        lead={published ? undefined : "Este case está em preparação. Os números, o período de referência e as peças serão publicados após a validação e autorização do cliente."}
      >
        <Button asChild variant="sun" size="lg">
          <a href={whatsappLink("cases")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "case_hero", case: c.slug })}>
            Quero um resultado assim
          </a>
        </Button>
      </PageHero>

      {!published && (
        <section className="section-y bg-paper">
          <div className="container-site">
            <Reveal className="mx-auto max-w-2xl rounded-[2rem] border-2 border-dashed border-border bg-card p-10 text-center">
              <Hourglass className="mx-auto size-10 text-violet" aria-hidden="true" />
              <h2 className="display-md mt-4">Resultados em validação</h2>
              <p className="mt-3 text-muted-foreground">
                Na Ello, nenhum número é publicado sem fonte marcada e autorização de uso. Enquanto isso, conheça outros caminhos.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild variant="ink"><Link to="/cases">Ver todos os cases</Link></Button>
                <Button asChild variant="outline-ink"><Link to="/servicos">Conhecer os serviços</Link></Button>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {published && c.challenge && (
        <section className="section-y bg-paper">
          <div className="container-site max-w-3xl">
            <SectionHeading eyebrow="O desafio" title="Onde o cliente estava antes da Ello" />
            <div className="lead mt-6 space-y-4 text-muted-foreground">{c.challenge.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
        </section>
      )}

      {published && c.services && (
        <section className="section-y bg-cream">
          <div className="container-site">
            <SectionHeading eyebrow="O que a Ello fez" title="Serviços aplicados neste case" />
            <ul className="mt-10 flex flex-wrap gap-3">
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
        </section>
      )}

      {published && c.results && (
        <section className="section-y bg-paper">
          <div className="container-site">
            <SectionHeading eyebrow="Resultados" title="Números, com fonte" />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {c.results.map((r) => (
                <li key={r.metric} className="rounded-3xl bg-ink-pattern p-7 shadow-lift">
                  <p className="font-display text-5xl font-extrabold text-sun">{r.value}</p>
                  <p className="mt-2 font-semibold">{r.metric}</p>
                  <p className="mt-1 text-xs text-ink-foreground/70">Fonte: {r.source}, {r.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {published && c.testimonial && (
        <section className="section-y bg-cream">
          <div className="container-site max-w-3xl text-center">
            <p className="eyebrow">Na voz do cliente</p>
            <blockquote className="display-md mt-4">“{c.testimonial.text}”</blockquote>
            <p className="mt-4 font-semibold">{c.testimonial.author}, {c.testimonial.role} — {c.client}, {c.testimonial.city}</p>
          </div>
        </section>
      )}

      <FinalCta topic="cases" title={`Quer um resultado parecido com o da ${c.client}?`} />
    </SiteShell>
  );
}
