import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";

import { BlurBlobs, Reveal, RevealLine, Tilt } from "@/components/animations/motion";
import { EllomMark } from "@/components/brand/Logo";
import { LabForm } from "@/components/forms/forms";
import { CommunityButton, LabStatus, LabTeaser } from "@/components/lab/Community";
import { SectionHeading } from "@/components/layout/SiteShell";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { labBenefits, labLessons } from "@/data/content";
import { onboarding } from "@/data/site";
import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";

export function Founders() {
  return (
    <section aria-labelledby="quem-somos" className="section-y relative overflow-hidden bg-paper">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <Reveal variant="left" className="relative">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-ink shadow-lift sm:aspect-[5/6]">
            <img
              src="/espaco/melina-lucas.webp"
              alt="Retrato de Melina e Lucas, fundadores da Ello Táticas Digitais"
              width={972}
              height={1476}
              loading="lazy"
              className="h-full w-full object-cover object-[50%_20%]"
            />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-ink/85 px-4 py-3 text-ink-foreground backdrop-blur">
              <EllomMark tone="light" className="h-9 w-9" />
              <span className="text-sm leading-snug">
                <strong className="block font-display text-base">Melina & Lucas</strong>
                Fundadores da Ello Táticas Digitais
              </span>
            </figcaption>
          </figure>
          <img
            src="/luma/luma-acenando.webp"
            alt=""
            aria-hidden="true"
            width={643}
            height={900}
            loading="lazy"
            className="pointer-events-none absolute -bottom-6 -right-6 hidden w-28 drop-shadow-xl sm:block lg:-right-10 lg:w-32"
          />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Quem somos"
            title={<span id="quem-somos">Lucas e Melina — casados, sócios, pais do Enrico e do Miguel</span>}
          />
          <Reveal delay={120}>
            <div className="lead mt-6 space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Melina</strong> é o coração estratégico: conteúdo, design e automação.{" "}
                <strong className="text-foreground">Lucas</strong> é o raciocínio de performance: tráfego pago, logística e gestão.
              </p>
              <p>Juntos, uma visão 360° de branding, conteúdo, performance e automação.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <Button asChild variant="ink" size="lg" className="mt-8">
              <Link to="/sobre">
                Conhecer a história completa <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className="relative">
      <RevealLine className="absolute left-0 right-0 top-7 !hidden h-0.5 bg-sun-gradient lg:!block" />
      <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
      {onboarding.map((s, i) => (
        <Reveal as="li" key={s.day} delay={i * 80} className="relative">
          <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-ink font-display text-sm font-extrabold text-sun ring-4 ring-cream">
            {i + 1}
          </span>
          <p className={tone === "light" ? "mt-4 text-xs font-bold uppercase tracking-wider text-plum" : "mt-4 text-xs font-bold uppercase tracking-wider text-sun"}>{s.day}</p>
          <p className="mt-1 font-display text-lg font-bold leading-tight">{s.title}</p>
        </Reveal>
      ))}
      </ol>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section aria-labelledby="processo" className="section-y bg-cream">
      <div className="container-site">
        <SectionHeading eyebrow="Do contrato à performance" title={<span id="processo">Como funciona depois do “sim”</span>} />
        <div className="mt-14">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}

export function LabStack() {
  return (
    <div className="relative mx-auto h-[22rem] w-full max-w-sm" aria-hidden="true">
      {labLessons.map((l, i) => (
        <Reveal
          key={l.tag}
          delay={i * 160}
          variant="scale"
          className="absolute w-[85%]"
          style={{ top: `${i * 78}px`, left: `${i * 7.5}%`, zIndex: 10 - i }}
        >
          <Tilt max={10}>
            <div className="rounded-3xl border border-ink-foreground/15 bg-paper p-6 text-ink shadow-lift" style={{ rotate: `${(i - 1) * 3}deg` }}>
              <p className="eyebrow">{l.tag}</p>
              <p className="mt-2 font-display text-2xl font-bold">{l.title}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-cream">
                <div className="h-full rounded-full bg-sun-gradient" style={{ width: `${90 - i * 25}%` }} />
              </div>
            </div>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}

export function LabSection() {
  return (
    <section id="ello-lab" aria-labelledby="lab-titulo" className="section-y relative isolate overflow-hidden bg-ink-pattern">
      <BlurBlobs />
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <LabStatus light className="mb-5" />
          <SectionHeading
            tone="light"
            eyebrow="Ello Lab"
            title={
              <span id="lab-titulo">
                O laboratório da Ello está <span className="text-sun">quase pronto</span>
              </span>
            }
            lead="Cursos com certificado, mentorias e eventos para empresários que querem alta performance em vendas e marketing. Enquanto a plataforma é finalizada, tudo acontece na comunidade."
          />
          <ul className="mt-8 space-y-3">
            {labBenefits.map((b, i) => (
              <Reveal as="li" key={b} delay={i * 80} className="flex items-center gap-3 font-semibold">
                <ArrowRight className="size-5 shrink-0 text-sun" aria-hidden="true" /> {b}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={260} className="mt-8 flex flex-wrap gap-3">
            <CommunityButton location="home_lab" />
            <Button asChild variant="outline-light" size="lg">
              <Link to="/ello-lab">Conhecer o Ello Lab</Link>
            </Button>
          </Reveal>
        </div>
        <Reveal variant="right">
          <LabTeaser />
        </Reveal>
      </div>
    </section>
  );
}

export function LabSignup({ origin = "home_ello_lab" }: { origin?: string }) {
  return (
    <section id="cadastro-lab" aria-labelledby="cadastro-lab-titulo" className="section-y bg-paper">
      <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-10">
          <p className="eyebrow">Garanta sua vaga</p>
          <h2 id="cadastro-lab-titulo" className="display-md mt-3">Cadastre-se no Ello Lab</h2>
          <p className="mt-3 text-muted-foreground">Preencha os dados abaixo e nossa equipe entra em contato com os próximos passos.</p>
          <div className="mt-8">
            <LabForm origin={origin} />
          </div>
        </Reveal>
        <Reveal variant="right" delay={120} className="flex flex-col justify-center rounded-[2rem] bg-sun-pattern p-8 text-center sm:p-10">
          <div className="mx-auto flex -space-x-3" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="grid h-14 w-14 place-items-center rounded-full border-4 border-sun bg-ink text-sun">
                <Users className="size-5" />
              </span>
            ))}
          </div>
          <h2 className="display-md mt-6">Prefere falar direto com alguém?</h2>
          <p className="mt-3 text-ink/80">Clique e fale agora com um dos nossos especialistas.</p>
          <Button asChild variant="ink" size="lg" className="mx-auto mt-6">
            <a href={whatsappLink("lab")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "lab_specialist" })}>
              <WhatsAppIcon className="size-5" /> Falar com um especialista Ello
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
