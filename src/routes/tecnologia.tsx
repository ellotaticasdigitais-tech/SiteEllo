import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Clock, KanbanSquare, MessageCircle, UserRound } from "lucide-react";

import { BlurBlobs, Reveal } from "@/components/animations/motion";
import { CrmInterestForm } from "@/components/forms/forms";
import { FinalCta } from "@/components/home/FaqCta";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { breadcrumbLd, pageHead } from "@/lib/seo";

const iaFeatures = [
  { icon: Clock, title: "Atendimento 24/7", text: "Respostas no WhatsApp a qualquer hora." },
  { icon: Bot, title: "Qualifica e conduz", text: "Entende o interesse e leva a conversa ao próximo passo." },
  { icon: MessageCircle, title: "Vende no WhatsApp", text: "Atendimento comercial no canal preferido do cliente." },
  { icon: UserRound, title: "Humano assume", text: "Sua equipe entra na conversa quando precisa." },
];

export const Route = createFileRoute("/tecnologia")({
  head: () =>
    pageHead({
      title: "Ello IA e Ello CRM | tecnologia própria da Ello",
      description:
        "Ello IA: atendimento por inteligência artificial 24/7 no WhatsApp, já disponível. Ello CRM: CRM próprio em desenvolvimento: cadastre-se para ser avisado.",
      path: "/tecnologia",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Tecnologia", path: "/tecnologia" }])],
    }),
  component: TechPage,
});

function TechPage() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Tecnologia própria" }]}
        eyebrow="Diferencial: não é só agência"
        title={
          <>
            Tecnologia <span className="text-sun">própria</span> para vender mais e atender melhor
          </>
        }
        lead="A Ello desenvolve suas próprias ferramentas para conectar marketing, atendimento e vendas."
        aside={<img src="/luma/luma-perfil.webp" alt="" aria-hidden="true" width={643} height={900} className="mx-auto hidden w-52 drop-shadow-2xl lg:block" />}
      />

      <section className="section-y bg-paper">
        <div className="container-site">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" /> já disponível
            </span>
          </div>
          <SectionHeading className="mt-4" eyebrow="Ello IA" title="CRM com atendimento por IA 24/7 no WhatsApp" lead="Qualifica, conduz e vende, com humano assumindo quando precisar. Disponível como camada adicional a qualquer plano." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {iaFeatures.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 80} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <f.icon className="size-7 text-violet" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </Reveal>
            ))}
          </ul>
          <Button asChild variant="ink" size="lg" className="mt-10">
            <Link to="/servicos/$slug" params={{ slug: "ello-ia" }}>
              Quero a Ello IA na minha empresa <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <section id="crm" className="section-y relative isolate scroll-mt-20 overflow-hidden bg-ink-pattern">
        <BlurBlobs />
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-foreground/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sun">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber" aria-hidden="true" /> em desenvolvimento
            </span>
            <SectionHeading
              className="mt-4"
              tone="light"
              eyebrow="Ello CRM"
              title="O CRM próprio da Ello está em construção"
              lead="Com integração a WhatsApp Web, kanban de atendimento e funil comercial. Ainda não há data de lançamento confirmada. Deixe seu contato e avisaremos quando houver novidades."
            />
            <Reveal delay={160} className="mt-8 flex items-center gap-3 text-sm text-ink-foreground/70">
              <KanbanSquare className="size-5 text-sun" aria-hidden="true" /> Funcionalidades sujeitas a alteração até o lançamento.
            </Reveal>
          </div>
          <Reveal variant="scale" className="rounded-[2rem] border border-ink-foreground/10 bg-ink-foreground/5 p-6 backdrop-blur sm:p-8">
            <CrmInterestForm />
          </Reveal>
        </div>
      </section>

      <FinalCta topic="ia" />
    </SiteShell>
  );
}
