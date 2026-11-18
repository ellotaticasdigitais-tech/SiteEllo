import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Play } from "lucide-react";

import sparkles from "@/assets/sparkles.webp.asset.json";
import { BlurBlobs, Magnetic, Reveal, RotatingWord } from "@/components/animations/motion";
import { EllomMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { rotatingWords, site, stats } from "@/data/site";
import { track } from "@/lib/analytics";

/** Real team video. Set src/poster when the Ello team delivers the file (public/videos). */
const heroVideo: { src?: string; poster?: string } = {};

/** Vídeo de apresentação publicado no Instagram. */
const heroVideoUrl = "https://www.instagram.com/reel/DcbCGgsx-l3/";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-pattern pb-16 pt-28 sm:pt-36 lg:pb-24">
      <BlurBlobs />
      <img
        src={sparkles.url}
        alt=""
        aria-hidden="true"
        width={187}
        height={333}
        className="pointer-events-none absolute right-[4%] top-24 hidden w-20 animate-float-slow opacity-90 lg:block"
      />
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.25fr_0.9fr]">
        <div className="min-w-0">
          <Reveal>
            <p className="eyebrow eyebrow-on-ink inline-flex items-center gap-2 rounded-full border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sun" aria-hidden="true" />
              Agência de crescimento digital · Louveira-SP e todo o Brasil
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display-xl mt-6">
              <span className="sr-only">Táticas que geram resultados, conexões, vendas, crescimento e valor.</span>
              <span aria-hidden="true" className="block">Táticas que</span>
              <span aria-hidden="true" className="block">
                geram <RotatingWord words={rotatingWords} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 font-display text-xl font-semibold text-sun sm:text-2xl">{site.tagline}</p>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl" aria-label="Experiência, vendas, dados.">
              <span aria-hidden="true">
                Experiênc<span className="glow-letter">IA</span>. Venda<span className="glow-letter" style={{ ["--glow-delay" as string]: "1.2s" }}>S</span>. Dado
                <span className="glow-letter" style={{ ["--glow-delay" as string]: "2.4s" }}>S</span>.
              </span>
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="lead mt-5 max-w-xl text-ink-foreground/80">
              Estratégia, conteúdo, tráfego pago e automação com IA funcionando como um sistema só — não como posts soltos. A Ello
              profissionaliza o digital da sua empresa do planejamento à venda.
            </p>
          </Reveal>

          <Reveal delay={340} className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild variant="sun" size="xl" className="group">
                <a href="#diagnostico" onClick={() => track("cta_click", { cta: "hero_quero_crescer" })}>
                  Quero crescer com a Ello <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </Magnetic>
            <Button asChild variant="outline-light" size="xl">
              <Link to="/metodo-acelera" onClick={() => track("cta_click", { cta: "hero_metodo" })}>
                Ver o Método ACELERA <ArrowDown />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={200} className="relative mx-auto w-full max-w-md">
          <HeroVideo />
        </Reveal>
      </div>

      <div className="container-site mt-16">
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="bg-ink/70 p-6 backdrop-blur">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-extrabold text-sun">{s.value}</span>
                <span className="mt-1 block text-sm text-ink-foreground/75">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function HeroVideo() {
  if (heroVideo.src) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift">
        <video className="h-full w-full object-cover" src={heroVideo.src} poster={heroVideo.poster} controls playsInline preload="none" muted>
          Seu navegador não reproduz vídeos.
        </video>
      </div>
    );
  }
  return (
    <figure className="relative mt-8 lg:mt-0">
      <EllomMark className="absolute -left-10 -top-10 z-0 h-28 w-28 opacity-90" spin />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[radial-gradient(120%_90%_at_80%_10%,var(--sun)_0%,var(--amber)_38%,var(--plum)_78%,var(--violet)_100%)] shadow-lift">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_42%,rgb(255_255_255/0.35),transparent_70%)]" />
      </div>
      {/* Luma sai pelo topo do cartão, mas fica cortada no fundo arredondado */}
      <div className="pointer-events-none absolute inset-x-0 -top-[10%] bottom-0 z-10 overflow-hidden rounded-b-[2.5rem]">
        <img
          src="/brand/luma.webp"
          alt="Luma, a personagem da Ello, de braços cruzados e olhando para cima"
          width={464}
          height={1100}
          fetchPriority="high"
          className="absolute bottom-0 left-1/2 h-[98%] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_24px_40px_rgb(20_8_40/0.45)]"
        />
      </div>
      <a
        href={heroVideoUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("cta_click", { cta: "hero_video_instagram" })}
        className="group absolute inset-x-4 bottom-4 z-20 flex items-center gap-4 rounded-3xl bg-ink/90 p-4 text-ink-foreground backdrop-blur transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink transition-transform group-hover:scale-110">
          <Play className="size-5 fill-current" aria-hidden="true" />
        </span>
        <span className="min-w-0 text-sm leading-snug">
          <strong className="block font-display text-base">Melina e Lucas apresentam a Ello</strong>
          <span className="text-ink-foreground/70">Assista no Instagram</span>
        </span>
      </a>
    </figure>
  );
}
