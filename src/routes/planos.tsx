import { createFileRoute } from "@tanstack/react-router";
import { Check, HelpCircle } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { FaqSection, FinalCta } from "@/components/home/FaqCta";
import { PlansCards } from "@/components/home/OfferSections";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { homeFaq } from "@/data/faq";
import { planAddon, planMatrix, plans } from "@/data/plans";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/planos")({
  head: () =>
    pageHead({
      title: "Planos Ello Performance, Expansão e Conexão — Ello",
      description:
        "Compare os planos da Ello: Performance (tráfego, CRM, dashboard e Ello Lab), Expansão (+ redes, captação e concorrência) e Conexão (inbound e automação).",
      path: "/planos",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Planos", path: "/planos" }])],
    }),
  component: PlansPage,
});

function PlansPage() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Planos" }]}
        eyebrow="Como contratar"
        title={
          <>
            Três planos, pensados para cada <span className="text-sun">fase</span> do seu negócio
          </>
        }
        lead="O investimento é apresentado após o diagnóstico, de acordo com o escopo e o momento da sua empresa."
      />

      <section className="section-y bg-paper">
        <div className="container-site">
          <PlansCards />
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading eyebrow="Comparativo" title="O que compõe cada plano" />
          <Reveal className="mt-12 overflow-x-auto rounded-[2rem] border border-border bg-card shadow-soft">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Comparativo dos planos Ello</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="p-5 font-semibold text-muted-foreground">Composição</th>
                  {plans.map((p) => (
                    <th scope="col" key={p.id} className="p-5 font-display text-lg font-bold">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planMatrix.map((row) => (
                  <tr key={row.feature} className="border-b border-border/70 last:border-0 transition-colors hover:bg-cream/50">
                    <th scope="row" className="p-5 font-semibold">
                      {row.feature}
                    </th>
                    {plans.map((p) => (
                      <td key={p.id} className="p-5">
                        {row.values[p.id] === "yes" ? (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-success">
                            <Check className="size-5" aria-hidden="true" /> Incluso
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <HelpCircle className="size-4" aria-hidden="true" /> Sob consulta
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-ink text-ink-foreground">
                  <th scope="row" className="p-5 font-semibold">Investimento</th>
                  {plans.map((p) => (
                    <td key={p.id} className="p-5 font-display font-bold text-sun">
                      Consultar investimento
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Reveal>
          <p className="mt-6 text-center text-sm font-semibold">{planAddon}</p>
        </div>
      </section>

      <FaqSection items={homeFaq.filter((f) => f.q.includes("planos") || f.q.includes("custa"))} title="Sobre os planos" />
      <FinalCta topic="planos" title="Vamos descobrir o plano ideal para você?" />
    </SiteShell>
  );
}
