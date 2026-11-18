import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Eye, Handshake, LineChart, Target } from "lucide-react";

import bulb from "@/assets/bulb.webp.asset.json";
import { Reveal, Tilt } from "@/components/animations/motion";
import { FinalCta } from "@/components/home/FaqCta";
import { Founders, ProcessTimeline } from "@/components/home/PeopleSections";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

const principles = [
  { icon: Compass, title: "Direção, não entregável", text: "Vendemos o caminho para o objetivo — os entregáveis são consequência." },
  { icon: LineChart, title: "Leitura de negócio", text: "Relatório que explica o porquê do número, nunca métrica de vaidade." },
  { icon: Target, title: "Objetivo primeiro", text: "O criativo nasce do objetivo, e não o contrário." },
  { icon: Handshake, title: "Senta junto", text: "Proximidade real com o cliente, não só troca de e-mails." },
  { icon: Eye, title: "Tática, não tendência", text: "Escolhas com critério, mesmo quando a moda aponta outro caminho." },
];

export const Route = createFileRoute("/sobre")({
  head: () =>
    pageHead({
      title: "Sobre a Ello — Melina, Lucas e uma agência que pensa negócio",
      description:
        "Conheça a história da Ello Táticas Digitais, fundada por Melina e Lucas em Louveira-SP: visão 360° de branding, conteúdo, performance e automação.",
      path: "/sobre",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre" }])],
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Sobre" }]}
        eyebrow="Sobre a Ello"
        title={
          <>
            Uma agência que entende de <span className="text-sun">negócio</span> — e domina o digital
          </>
        }
        lead="A Ello nasceu em Louveira-SP para profissionalizar o digital de empresas de todo o Brasil, do planejamento à venda. A Ello não vende apenas posts: conecta marketing, relacionamento, tecnologia e vendas."
        aside={<img src={bulb.url} alt="" aria-hidden="true" width={736} height={736} className="mx-auto hidden w-72 animate-float-slow lg:block" />}
      />

      <section className="bg-paper py-14">
        <dl className="container-site grid gap-5 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold text-plum">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <Founders />

      <section className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading eyebrow="Como pensamos" title="Cinco princípios que guiam cada projeto" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="h-full">
                <Tilt className="h-full">
                  <div className="h-full rounded-3xl bg-card p-6 shadow-soft">
                    <p.icon className="size-7 text-violet" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-lg font-bold leading-tight">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-site">
          <SectionHeading eyebrow="Como trabalhamos" title="Do contrato à performance em 20 dias" lead="Um onboarding com etapas claras, para que você saiba exatamente o que acontece depois do “sim”." />
          <div className="mt-14">
            <ProcessTimeline />
          </div>
          <Button asChild variant="ink" size="lg" className="mt-12">
            <Link to="/metodo-acelera">
              Conhecer o Método ACELERA <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <FinalCta />
    </SiteShell>
  );
}
