import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, RefreshCw } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { FaqSection, FinalCta } from "@/components/home/FaqCta";
import { DiagnosticSection, PillarArc } from "@/components/home/MethodSection";
import { ProcessTimeline } from "@/components/home/PeopleSections";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { getService } from "@/data/services";
import { pillars } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

const routine = [
  { title: "Planejar", text: "Objetivos do mês, prioridades por pilar e calendário de conteúdo e campanhas." },
  { title: "Criar", text: "Conteúdos, criativos, páginas e ajustes de marca produzidos com função na jornada." },
  { title: "Conectar", text: "Tráfego, relacionamento e Ello IA levando as pessoas certas até a conversa." },
  { title: "Converter", text: "Leitura estratégica dos números, ajustes de rota e foco nas oportunidades reais." },
];

export const Route = createFileRoute("/metodo-acelera")({
  head: () =>
    pageHead({
      title: "Método ACELERA | os 4 pilares de crescimento da Ello",
      description:
        "Presença digital estruturada, conteúdo e relacionamento, tráfego e crescimento, vendas e atendimento com IA: conheça o método da Ello.",
      path: "/metodo-acelera",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Método ACELERA", path: "/metodo-acelera" }])],
    }),
  component: MethodPage,
});

function MethodPage() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Método ACELERA" }]}
        eyebrow="Como trabalhamos"
        title={
          <>
            Método <span className="text-sun">ACELERA</span>: 4 pilares, uma só estratégia
          </>
        }
        lead="Ações soltas geram resultados soltos. O Método ACELERA organiza o digital da sua empresa em quatro pilares que se conectam e viram uma rotina mensal de crescimento."
        aside={
          <div className="grid grid-cols-2 gap-3">
            {pillars.map((p, i) => (
              <div key={p.title} className="rounded-3xl border border-ink-foreground/10 bg-ink-foreground/5 p-4 backdrop-blur">
                <PillarArc step={i + 1} active className="text-ink-foreground" />
                <p className="mt-3 text-sm font-semibold leading-tight">{p.title}</p>
              </div>
            ))}
          </div>
        }
      />

      <section className="section-y bg-paper">
        <div className="container-site space-y-6">
          {pillars.map((p, i) => (
            <Reveal key={p.title} variant={i % 2 ? "right" : "left"}>
              <article className="grid gap-8 rounded-[2rem] border border-border bg-card p-8 shadow-soft md:grid-cols-[auto_1fr_1fr] md:items-start sm:p-10">
                <PillarArc step={i + 1} active className="h-20 w-20 text-ink" />
                <div>
                  <p className="eyebrow">Pilar {i + 1}{p.isNew ? " · novo" : ""}</p>
                  <h2 className="display-md mt-2">{p.title}</h2>
                  <p className="mt-4 text-muted-foreground">{p.detail}</p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-plum">Serviços deste pilar</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.services.map((slug) => {
                      const s = getService(slug);
                      if (!s) return null;
                      return (
                        <li key={slug}>
                          <Link
                            to="/servicos/$slug"
                            params={{ slug }}
                            className="inline-flex items-center gap-1 rounded-full bg-cream px-4 py-2 text-sm font-semibold transition-colors hover:bg-sun"
                          >
                            {s.name} <ArrowUpRight className="size-3.5" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-ink-pattern">
        <div className="container-site">
          <SectionHeading
            tone="light"
            eyebrow="Como isso vira rotina"
            title={
              <>
                Planejar, criar, conectar e <span className="text-sun">converter</span>, todo mês
              </>
            }
            lead="Depois do onboarding, o método vira um ciclo contínuo. Cada mês começa com prioridades claras e termina com leitura de negócio, não com relatório de vaidade."
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-4">
            {routine.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 100} className="relative rounded-3xl border border-ink-foreground/10 bg-ink-foreground/5 p-6">
                <RefreshCw className="size-6 text-sun" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-ink-foreground/75">{r.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="container-site">
          <SectionHeading eyebrow="Do contrato à performance" title="Os primeiros 20 dias" />
          <div className="mt-14">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <DiagnosticSection />
      <FaqSection
        title="Sobre o Método ACELERA"
        items={[
          {
            q: "O que é o Método ACELERA?",
            a: "É o método de trabalho da Ello, organizado em quatro pilares integrados: Presença Digital Estruturada, Conteúdo e Relacionamento, Tráfego e Crescimento, e Vendas e Atendimento com IA. Eles funcionam como uma estratégia única, em vez de ações isoladas.",
          },
          {
            q: "Preciso contratar os quatro pilares de uma vez?",
            a: "Não necessariamente. O diagnóstico identifica qual pilar está travando o crescimento da sua empresa e indica por onde começar. Os planos Ello Performance, Expansão e Conexão combinam os pilares de formas diferentes.",
          },
        ]}
      />
      <FinalCta />
    </SiteShell>
  );
}
