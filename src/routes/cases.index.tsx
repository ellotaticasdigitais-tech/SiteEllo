import { createFileRoute } from "@tanstack/react-router";

import { CasesExplorer, FeaturedCase } from "@/components/home/CasesSection";
import { FinalCta } from "@/components/home/FaqCta";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { VideoReel } from "@/components/media/VideoReel";
import { captacoes } from "@/data/videos";
import { cases } from "@/data/cases";
import { absUrl, breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cases/")({
  head: () =>
    pageHead({
      title: "Cases e portfólio | Ello Táticas Digitais",
      description:
        "Portfólio da Ello por nicho: varejo e alimentício, alimentício, indústria e construção civil. Veja as peças criadas para cada cliente e o case da própria Ello.",
      path: "/cases",
      jsonLd: [
        breadcrumbLd([{ name: "Início", path: "/" }, { name: "Cases", path: "/cases" }]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cases e portfólio da Ello Táticas Digitais",
          itemListElement: cases.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.client}: ${c.headline}`, url: absUrl(`/cases/${c.slug}`) })),
        },
      ],
    }),
  component: CasesHub,
});

function CasesHub() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Cases" }]}
        eyebrow="Portfólio"
        title={
          <>
            Marcas que já <span className="text-sun">cresceram</span> com a Ello
          </>
        }
        lead={`${cases.length} cases em ${new Set(cases.map((c) => c.niche)).size} nichos. Começando pelo mais exigente de todos: a própria Ello.`}
      />

      <FeaturedCase />

      <section aria-labelledby="captacoes" className="section-y bg-paper">
        <div className="container-site">
          <SectionHeading
            eyebrow="Captação e edição"
            title={<span id="captacoes">Vídeos que a Ello captou e editou</span>}
            lead="Roteiro, gravação e edição feitos pelo nosso time. Dê o play, com som."
          />
          <div className="mt-12">
            <VideoReel items={captacoes} />
          </div>
        </div>
      </section>

      <section aria-labelledby="todos-cases" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading
            eyebrow="Por nicho"
            title={<span id="todos-cases">Cases organizados por área de atuação</span>}
            lead="Filtre pelo seu segmento, passe as peças de cada cliente e visite o Instagram para ver o trabalho no ar."
            align="center"
          />
          <div className="mt-12">
            <CasesExplorer />
          </div>
        </div>
      </section>

      <FinalCta topic="cases" title="Quer ser o próximo case da Ello?" />
    </SiteShell>
  );
}
