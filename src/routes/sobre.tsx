import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Eye, Handshake, LineChart, Target } from "lucide-react";

import { Reveal, Tilt } from "@/components/animations/motion";
import { FinalCta } from "@/components/home/FaqCta";
import { Founders, ProcessTimeline } from "@/components/home/PeopleSections";
import { PageHero, SectionHeading, SiteShell } from "@/components/layout/SiteShell";
import { AutoVideo } from "@/components/media/AutoVideo";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/site";
import { breadcrumbLd, organizationLd, pageHead } from "@/lib/seo";

const principles = [
  { icon: Compass, title: "Direção, não entregável", text: "Vendemos o caminho para o objetivo; os entregáveis são consequência." },
  { icon: LineChart, title: "Leitura de negócio", text: "Relatório que explica o porquê do número, nunca métrica de vaidade." },
  { icon: Target, title: "Objetivo primeiro", text: "O criativo nasce do objetivo, e não o contrário." },
  { icon: Handshake, title: "Senta junto", text: "Proximidade real com o cliente, não só troca de e-mails." },
  { icon: Eye, title: "Tática, não tendência", text: "Escolhas com critério, mesmo quando a moda aponta outro caminho." },
];

export const Route = createFileRoute("/sobre")({
  head: () =>
    pageHead({
      title: "Sobre a Ello | Melina, Lucas e uma agência que pensa negócio",
      description:
        "Conheça a história da Ello Táticas Digitais, fundada por Melina e Lucas em Louveira-SP: visão 360° de branding, conteúdo, performance e automação.",
      path: "/sobre",
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre" }]), { "@context": "https://schema.org", "@type": "AboutPage", name: "Sobre a Ello Táticas Digitais", about: organizationLd }],
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
            Uma agência que entende de <span className="text-sun">negócio</span> e domina o digital
          </>
        }
        lead="A Ello nasceu em Louveira-SP para profissionalizar o digital de empresas de todo o Brasil, do planejamento à venda. A Ello não vende apenas posts: conecta marketing, relacionamento, tecnologia e vendas."
        aside={<img src="/luma/luma-apresentando.webp" alt="Luma, a personagem da Ello, apresentando a agência" width={600} height={900} className="mx-auto hidden w-60 drop-shadow-2xl lg:block" />}
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

      <NossoEspaco />

      <FinalCta />
    </SiteShell>
  );
}

type GalleryItem =
  | { kind: "foto"; src: string; alt: string; w: number; h: number; caption?: string }
  | { kind: "video"; src: string; poster: string; alt: string; caption?: string };

const espaco: GalleryItem[] = [
  { kind: "foto", src: "/espaco/escritorio-equipe.webp", alt: "Equipe da Ello trabalhando no escritório", w: 960, h: 1280, caption: "Nosso time no dia a dia" },
  { kind: "foto", src: "/espaco/fachada.webp", alt: "Fachada da Ello Táticas Digitais em Louveira-SP", w: 1280, h: 960, caption: "Nossa sede em Louveira-SP" },
  { kind: "video", src: "/videos/bastidores-1.mp4", poster: "/videos/bastidores-1.jpg", alt: "Bastidores: planejamento de conteúdo no workflow da Ello", caption: "Bastidores do planejamento" },
  { kind: "foto", src: "/espaco/vitrine.webp", alt: "Vitrine da Ello com o lema planejar, criar, conectar e converter", w: 1280, h: 960 },
  { kind: "foto", src: "/espaco/porta.webp", alt: "Porta de entrada da Ello com a logo e contatos", w: 960, h: 1280, caption: "Sala 3: pode vir tomar um café" },
  { kind: "video", src: "/videos/bastidores-2.mp4", poster: "/videos/bastidores-2.jpg", alt: "Bastidores: revisão de publicação no Instagram", caption: "Conteúdo revisado post a post" },
  { kind: "foto", src: "/espaco/escritorio-mesas.webp", alt: "Estações de trabalho do escritório da Ello", w: 960, h: 1280 },
  { kind: "foto", src: "/espaco/fachada-rua.webp", alt: "Vista da rua do prédio onde fica a Ello", w: 1280, h: 960 },
];

function NossoEspaco() {
  return (
    <section aria-labelledby="nosso-espaco" className="section-y bg-cream">
      <div className="container-site">
        <SectionHeading
          eyebrow="Nosso espaço"
          title={<span id="nosso-espaco">Uma agência de verdade, com porta aberta</span>}
          lead="Aqui é onde as táticas saem do papel: planejamento, criação, reuniões e atendimento acontecem no nosso escritório em Louveira-SP."
        />
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {espaco.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 80} className="break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-[1.75rem] bg-ink shadow-soft">
                {item.kind === "foto" ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="aspect-[9/16]">
                    <AutoVideo src={item.src} poster={item.poster} label={item.alt} />
                  </div>
                )}
                {item.caption && (
                  <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 rounded-2xl bg-ink/80 px-4 py-2 text-sm font-semibold text-ink-foreground backdrop-blur">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
