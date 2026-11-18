import { createFileRoute } from "@tanstack/react-router";
import { Award, CalendarDays, GraduationCap, Users } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { FaqSection } from "@/components/home/FaqCta";
import { LabSignup, LabStack } from "@/components/home/PeopleSections";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, pageHead } from "@/lib/seo";

const pillarsLab = [
  { icon: GraduationCap, title: "Cursos com certificado", text: "Curso de vendas com certificado para você e sua equipe." },
  { icon: Users, title: "Mentorias em grupo", text: "Encontros com a equipe Ello para aplicar o conteúdo no seu negócio." },
  { icon: CalendarDays, title: "Eventos exclusivos", text: "Eventos e descontos exclusivos para a comunidade Ello Lab." },
  { icon: Award, title: "Bônus do Ello Performance", text: "Clientes do plano Ello Performance têm o Ello Lab incluso." },
];

export const Route = createFileRoute("/ello-lab")({
  head: () =>
    pageHead({
      title: "Ello Lab — cursos, mentorias e eventos para empresários",
      description:
        "Ello Lab: plataforma de conhecimento da Ello com curso de vendas com certificado, mentorias em grupo e eventos exclusivos. Cadastre-se.",
      path: "/ello-lab",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Ello Lab", path: "/ello-lab" }])],
    }),
  component: LabPage,
});

function LabPage() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Ello Lab" }]}
        eyebrow="Plataforma de conhecimento"
        title={
          <>
            Ello Lab — o clube de quem quer <span className="text-sun">crescer de verdade</span>
          </>
        }
        lead="Cursos com certificado, mentorias e eventos exclusivos para empresários que buscam alta performance em vendas e marketing."
        aside={<LabStack />}
      >
        <Button asChild variant="sun" size="xl">
          <a href="#cadastro-lab">Quero fazer parte do Ello Lab</a>
        </Button>
      </PageHero>

      <section className="section-y bg-paper">
        <div className="container-site">
          <SectionHeading eyebrow="O que você encontra" title="Conhecimento aplicado ao seu negócio" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillarsLab.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <p.icon className="size-8 text-violet" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <LabSignup origin="pagina_ello_lab" />

      <FaqSection
        title="Sobre o Ello Lab"
        items={[
          {
            q: "O que é o Ello Lab?",
            a: "O Ello Lab é a plataforma de conhecimento da Ello, com curso de vendas com certificado, mentorias em grupo com a equipe e eventos exclusivos para empresários que buscam alta performance em vendas e marketing.",
          },
          {
            q: "Quem tem acesso ao Ello Lab?",
            a: "O Ello Lab está incluso como bônus no plano Ello Performance. Empresários interessados também podem se cadastrar para receber os próximos passos da nossa equipe.",
          },
        ]}
      />
    </SiteShell>
  );
}
