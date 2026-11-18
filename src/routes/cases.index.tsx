import { createFileRoute } from "@tanstack/react-router";

import { CaseCards, CaseLaptop } from "@/components/home/CasesSection";
import { FinalCta } from "@/components/home/FaqCta";
import { Reveal } from "@/components/animations/motion";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cases/")({
  head: () =>
    pageHead({
      title: "Cases de sucesso — Ello Táticas Digitais",
      description: "Conheça empresas que cresceram com a Ello. Cada case traz contexto, estratégia, serviços aplicados e resultados com fonte.",
      path: "/cases",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Cases", path: "/cases" }])],
    }),
  component: CasesHub,
});

function CasesHub() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Cases" }]}
        eyebrow="Prova real"
        title={
          <>
            Cases de <span className="text-sun">sucesso</span>
          </>
        }
        lead="Nenhum número sem fonte. Cada case é publicado com período de medição, origem dos dados e autorização do cliente."
      />
      <section className="section-y bg-cream">
        <div className="container-site">
          <Reveal variant="scale">
            <CaseLaptop />
          </Reveal>
          <div className="mt-16">
            <CaseCards />
          </div>
        </div>
      </section>
      <FinalCta topic="cases" title="Quer ser o próximo case da Ello?" />
    </SiteShell>
  );
}
