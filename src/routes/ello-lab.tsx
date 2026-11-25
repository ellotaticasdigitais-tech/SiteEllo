import { createFileRoute } from "@tanstack/react-router";
import { Award, CalendarDays, Check, GraduationCap, Rocket, Users } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { FaqSection } from "@/components/home/FaqCta";
import { CommunityButton, CommunityCta, LabStatus, LabTeaser } from "@/components/lab/Community";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const pillarsLab = [
  { icon: GraduationCap, title: "Cursos com certificado", text: "Curso de vendas com certificado para você e sua equipe." },
  { icon: Users, title: "Mentorias em grupo", text: "Encontros com a equipe Ello para aplicar o conteúdo no seu negócio." },
  { icon: CalendarDays, title: "Eventos exclusivos", text: "Encontros e eventos fechados para os membros da comunidade." },
  { icon: Award, title: "Bônus do Ello Performance", text: "Clientes do plano Ello Performance terão o Ello Lab incluso." },
];

const steps = [
  { title: "Comunidade aberta", text: "O grupo no WhatsApp já está no ar. É lá que tudo acontece primeiro.", state: "agora" },
  { title: "Bastidores e conteúdos", text: "Prévias das aulas, materiais e conversas com a equipe Ello dentro do grupo.", state: "em breve" },
  { title: "Lançamento da plataforma", text: "Abertura do Ello Lab, com desconto de fundador para quem estiver no grupo.", state: "em breve" },
] as const;

export const Route = createFileRoute("/ello-lab")({
  head: () =>
    pageHead({
      title: "Ello Lab | comunidade e plataforma de conhecimento da Ello",
      description:
        "Ello Lab: cursos com certificado, mentorias e eventos para empresários. Em desenvolvimento: entre na comunidade e garanta desconto de fundador.",
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
        eyebrow="Ello Lab · comunidade"
        title={
          <>
            O laboratório da Ello está <span className="text-sun">quase pronto</span>
          </>
        }
        lead="Estamos construindo o Ello Lab: cursos com certificado, mentorias e eventos para empresários que querem alta performance em vendas e marketing. Enquanto isso, tudo acontece na comunidade, e quem chega primeiro ganha desconto de fundador."
        aside={<LabTeaser className="hidden lg:block" />}
      >
        <div className="flex flex-col gap-4">
          <LabStatus light className="w-fit" />
          <CommunityButton location="pagina_lab_hero" size="xl" className="w-fit" />
        </div>
      </PageHero>

      {/* Vídeo no celular (no computador ele fica ao lado do título) */}
      <section className="bg-paper pt-14 lg:hidden">
        <LabTeaser />
      </section>

      <section aria-labelledby="como-funciona" className="section-y bg-paper">
        <div className="container-site">
          <SectionHeading eyebrow="Em desenvolvimento" title={<span id="como-funciona">Como o Ello Lab vai chegar até você</span>} />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className={cn("relative rounded-3xl p-7 shadow-soft", s.state === "agora" ? "bg-ink-pattern text-ink-foreground" : "border border-border bg-card")}>
                <div className="flex items-center justify-between">
                  <span className={cn("grid h-11 w-11 place-items-center rounded-2xl font-display text-lg font-extrabold", s.state === "agora" ? "bg-sun text-ink" : "bg-cream text-plum")}>
                    {s.state === "agora" ? <Check className="size-5" aria-hidden="true" /> : i + 1}
                  </span>
                  <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider", s.state === "agora" ? "bg-success text-ink-foreground" : "bg-cream text-muted-foreground")}>
                    {s.state}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className={cn("mt-2 text-sm", s.state === "agora" ? "text-ink-foreground/80" : "text-muted-foreground")}>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="o-que-vem" className="section-y bg-cream">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionHeading eyebrow="O que vem por aí" title={<span id="o-que-vem">Conhecimento aplicado ao seu negócio</span>} />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {pillarsLab.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 80} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <p.icon className="size-8 text-violet" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal variant="right" className="hidden lg:block">
            <img src="/luma/luma-pensando.webp" alt="" aria-hidden="true" width={643} height={900} loading="lazy" className="w-60 drop-shadow-2xl" />
          </Reveal>
        </div>
      </section>

      <CommunityCta location="pagina_lab_cta" />

      <FaqSection
        title="Sobre o Ello Lab"
        items={[
          {
            q: "O que é o Ello Lab?",
            a: "O Ello Lab é a plataforma de conhecimento da Ello, com curso de vendas com certificado, mentorias em grupo com a equipe e eventos exclusivos para empresários que buscam alta performance em vendas e marketing. Ele está em desenvolvimento e será lançado primeiro para a comunidade.",
          },
          {
            q: "Como entro na comunidade?",
            a: "É só clicar em “Entrar na comunidade Ello Lab”. O link abre o grupo no WhatsApp. A entrada é gratuita.",
          },
          {
            q: "Como funciona o desconto de membro fundador?",
            a: "Os primeiros membros que entrarem no grupo e permanecerem nele até o lançamento ganham um desconto exclusivo no Ello Lab. As condições serão divulgadas primeiro dentro da comunidade.",
          },
          {
            q: "Quem é cliente Ello também tem acesso?",
            a: "Sim. O Ello Lab será incluso como bônus no plano Ello Performance.",
          },
        ]}
      />
    </SiteShell>
  );
}
