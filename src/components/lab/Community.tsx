import { FlaskConical, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/animations/motion";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Selo "em desenvolvimento" do Ello Lab. */
export function LabStatus({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
        light ? "bg-ink-foreground/10 text-sun" : "bg-sun/25 text-plum",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-sun" />
      </span>
      Em desenvolvimento
    </span>
  );
}

/** Botão que leva para o grupo da comunidade no WhatsApp. */
export function CommunityButton({
  location,
  label = "Entrar na comunidade Ello Lab",
  variant = "whatsapp",
  size = "lg",
  className,
}: {
  location: string;
  label?: string;
  variant?: "whatsapp" | "sun" | "ink";
  size?: "lg" | "xl";
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={site.communityUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("ello_lab_signup", { location, channel: "comunidade_whatsapp" })}>
        <WhatsAppIcon className="size-5" /> {label}
      </a>
    </Button>
  );
}

/** Vídeo da Luma no laboratório: toca sem som quando aparece e permite ligar o som. */
export function LabTeaser({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? void v.play().catch(() => undefined) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
    if (v.paused) void v.play().catch(() => undefined);
  };

  return (
    <div className={cn("relative mx-auto w-full max-w-[19rem]", className)}>
      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-ink-deep bg-ink shadow-lift">
        <video
          ref={ref}
          src="/videos/ello-lab-luma.mp4"
          poster="/videos/ello-lab-luma.jpg"
          muted
          loop
          playsInline
          preload="none"
          aria-label="A Luma, personagem da Ello, fazendo experimentos no laboratório do Ello Lab"
          className="aspect-[9/16] w-full object-cover"
        />
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!muted}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-2 text-xs font-semibold text-ink-foreground backdrop-blur transition-colors hover:bg-ink"
        >
          {muted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
          {muted ? "Ativar som" : "Som ligado"}
        </button>
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink">
          <FlaskConical className="size-3.5" aria-hidden="true" /> Ello Lab
        </span>
      </div>
    </div>
  );
}

/** Chamada principal para a comunidade, com o benefício de membro fundador. */
export function CommunityCta({ location }: { location: string }) {
  return (
    <section id="comunidade" aria-labelledby="comunidade-titulo" className="section-y bg-paper">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-sun-pattern px-6 py-12 sm:px-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <p className="eyebrow">Comunidade Ello Lab</p>
              <h2 id="comunidade-titulo" className="display-md mt-3">
                Entre agora e garanta o desconto de membro fundador
              </h2>
              <p className="lead mt-4 text-ink/80">
                O Ello Lab está sendo construído e tudo acontece primeiro no grupo da comunidade: bastidores, conteúdos e a data de lançamento. Quem entrar agora e permanecer
                no grupo até o lançamento ganha um desconto exclusivo de fundador.
              </p>
              <ul className="mt-6 grid gap-2 text-sm font-semibold sm:grid-cols-3">
                {["Gratuito para entrar", "Novidades em primeira mão", "Desconto de fundador"].map((t) => (
                  <li key={t} className="flex items-center gap-2 rounded-full bg-paper/70 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-ink" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <CommunityButton location={location} size="xl" className="mt-8" />
            </div>
            <img
              src="/luma/luma-animada.webp"
              alt="Luma, animada, convidando para a comunidade"
              width={643}
              height={900}
              loading="lazy"
              className="mx-auto hidden w-56 drop-shadow-2xl lg:block"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
