import { createFileRoute, Link } from "@tanstack/react-router";

import { FinalCta } from "@/components/home/FaqCta";
import { DiagnosticSection } from "@/components/home/MethodSection";
import { PlansCards, ServicesGrid, TechSection } from "@/components/home/OfferSections";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
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
        lead="Oito frentes integradas em uma só estratégia: da definição da marca ao atendimento com IA. Escolha por onde começar — ou deixe o diagnóstico indicar."
      />
      <section className="section-y bg-paper">
        <div className="container-site">
          <ServicesGrid withHeading={false} />
        </div>
      </section>
      <TechSection />
      <DiagnosticSection />
      <section aria-labelledby="planos-servicos" className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading
            eyebrow="Planos"
            title={<span id="planos-servicos">Prefere tudo integrado? Escolha um plano</span>}
            lead="Os serviços se combinam em três planos, com valores abertos e economia no semestral e no anual."
            align="center"
          />
          <div className="mt-12">
            <PlansCards compact />
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="link">
              <Link to="/planos">Comparar os planos em detalhe →</Link>
            </Button>
          </div>
        </div>
      </section>

      <FinalCta />
    </SiteShell>
  );
}
