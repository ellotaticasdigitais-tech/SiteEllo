import { createFileRoute } from "@tanstack/react-router";

import { FinalCta } from "@/components/home/FaqCta";
import { DiagnosticSection } from "@/components/home/MethodSection";
import { ServicesGrid, TechSection } from "@/components/home/OfferSections";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/servicos/")({
  head: () =>
    pageHead({
      title: "Serviços de marketing digital — Ello Táticas Digitais",
      description:
        "DNA da marca, identidade visual, sites, redes sociais, vídeo, tráfego pago, inbound e consultoria estratégica integrados pelo Método ACELERA.",
      path: "/servicos",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }])],
    }),
  component: ServicesHub,
});

function ServicesHub() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Serviços" }]}
        eyebrow="O que fazemos"
        title={
          <>
            Assessoria <span className="text-sun">360°</span> no digital
          </>
        }
        lead="Oito frentes que funcionam como um sistema: da definição da marca ao atendimento com IA. Escolha por onde começar — ou deixe o diagnóstico indicar."
      />
      <section className="section-y bg-paper">
        <div className="container-site">
          <ServicesGrid withHeading={false} />
        </div>
      </section>
      <TechSection />
      <DiagnosticSection />
      <FinalCta />
    </SiteShell>
  );
}
