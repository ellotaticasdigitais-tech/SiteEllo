import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { FaqSection, FinalCta } from "@/components/home/FaqCta";
import { PlansCards } from "@/components/home/OfferSections";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { homeFaq } from "@/data/faq";
import { formatBRL, planAddon, planIncludes, planMatrix, plans } from "@/data/plans";
import { absUrl, breadcrumbLd, pageHead } from "@/lib/seo";
import { site } from "@/data/site";

export const Route = createFileRoute("/planos")({
  head: () =>
    pageHead({
      title: "Planos Ello Performance, Expansão e Conexão | Ello",
      description:
        "Planos de marketing digital a partir de R$ 2.080/mês: Ello Performance, Expansão e Conexão. Tráfego pago, redes sociais, CRM RD Station e automação.",
      path: "/planos",
      jsonLd: [
        breadcrumbLd([{ name: "Início", path: "/" }, { name: "Planos", path: "/planos" }]),
        {
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Planos de marketing digital da Ello",
          url: absUrl("/planos"),
          itemListElement: plans.map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: `${p.tagline} Inclui: ${p.items.map((i) => i.title).join(", ")}.`,
            url: absUrl(`/contato?plano=${p.id}`),
            seller: { "@type": "Organization", name: site.name, url: site.url },
            ...(p.prices
              ? {
                  priceCurrency: "BRL",
                  price: p.prices.mensal.monthly,
                  priceSpecification: [
                    { "@type": "UnitPriceSpecification", price: p.prices.mensal.monthly, priceCurrency: "BRL", unitText: "mês", name: "Mensal" },
                    { "@type": "UnitPriceSpecification", price: p.prices.semestral.monthly, priceCurrency: "BRL", unitText: "mês", name: "Semestral" },
                    { "@type": "UnitPriceSpecification", price: p.prices.anual.monthly, priceCurrency: "BRL", unitText: "mês", name: "Anual" },
                  ],
                }
              : {}),
          })),
        },
      ],
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
        lead="Valores claros, sem letra miúda. Escolha entre mensal, semestral ou anual. No anual, o setup inicial é gratuito e você economiza 20%."
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
                        {planIncludes(p.id, row.from) ? (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-success">
                            <Check className="size-5" aria-hidden="true" /> Incluso
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <Minus className="size-4" aria-hidden="true" /> Não incluso
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-ink text-ink-foreground">
                  <th scope="row" className="p-5 font-semibold">Investimento</th>
                  {plans.map((p) => (
                    <td key={p.id} className="p-5">
                      {p.prices ? (
                        <>
                          <span className="block font-display text-lg font-bold text-sun">a partir de {formatBRL(p.prices.anual.monthly)}/mês</span>
                          <span className="text-xs text-ink-foreground/70">ou {formatBRL(p.prices.mensal.monthly)}/mês no mensal</span>
                        </>
                      ) : (
                        <span className="font-display text-lg font-bold text-sun">A consultar</span>
                      )}
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
