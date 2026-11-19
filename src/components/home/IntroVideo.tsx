import { Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { EllomMark } from "@/components/brand/Logo";
import { track } from "@/lib/analytics";

/**
 * Vídeo de entrada da Luma: aparece por cima da home na primeira visita da sessão.
 * A pessoa clica para assistir (com som) e, quando o vídeo acaba, a home aparece.
 * Sempre dá para pular. Depois de visto ou pulado, não aparece de novo na mesma sessão.
 */
const SEEN_KEY = "ello:intro-visto";

function alreadySeen() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* armazenamento indisponível: segue sem lembrar */
  }
}

export function IntroVideo() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);

  // Só decide no navegador, para não atrapalhar o carregamento nem o Google.
  useEffect(() => {
    if (!alreadySeen()) setOpen(true);
  }, []);

  const close = useCallback((reason: "fim" | "pulou") => {
    markSeen();
    track("cta_click", { cta: reason === "fim" ? "intro_video_completo" : "intro_video_pulou" });
    videoRef.current?.pause();
    setLeaving(true);
    window.setTimeout(() => setOpen(false), 600);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    playBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close("pulou");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    track("cta_click", { cta: "intro_video_play" });
    v.play().catch(() => {
      // Se o navegador bloquear o som, toca sem som para não travar a entrada.
      v.muted = true;
      void v.play().catch(() => close("pulou"));
    });
  };

  if (!open) return null;

  // Portal no <body> para ficar por cima de tudo, inclusive do menu fixo.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Vídeo de boas-vindas da Ello"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-500 ${leaving ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <video
        ref={videoRef}
        src="/videos/intro-luma.mp4"
        poster="/videos/intro-luma.jpg"
        playsInline
        preload="auto"
        onEnded={() => close("fim")}
        className={`absolute inset-0 h-full w-full object-contain transition-[filter] duration-500 sm:object-cover ${playing ? "" : "brightness-[0.45]"}`}
      />

      {!playing && (
        <div className="relative z-10 flex flex-col items-center px-6 text-center text-ink-foreground">
          <EllomMark tone="light" className="h-16 w-16" spin />
          <p className="eyebrow eyebrow-on-ink mt-6">Boas-vindas</p>
          <h2 className="display-lg mt-3 max-w-xl">A Luma tem um recado para você</h2>
          <button
            ref={playBtnRef}
            type="button"
            onClick={start}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-sun py-3 pl-3 pr-7 font-display text-lg font-bold text-ink shadow-lift transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sun">
              <Play className="size-5 fill-current" aria-hidden="true" />
            </span>
            Assistir (15s)
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => close("pulou")}
        className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-ink-foreground/25 bg-ink/60 px-4 py-2 text-sm font-semibold text-ink-foreground backdrop-blur transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-sun sm:right-6 sm:top-6"
      >
        {playing ? "Pular" : "Entrar no site"} <X className="size-4" aria-hidden="true" />
      </button>
    </div>,
    document.body,
  );
}
