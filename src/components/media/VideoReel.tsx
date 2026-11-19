import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { type Captacao, videoPoster, videoSrc } from "@/data/videos";

const PLAY_EVENT = "ello:video-play";

/** Vídeo vertical: mostra a capa e só carrega o vídeo quando a pessoa clica. Só um toca por vez. */
export function VideoCard({ v, dark = false }: { v: Captacao; dark?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== v.id) ref.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOther);
    return () => window.removeEventListener(PLAY_EVENT, onOther);
  }, [v.id]);

  const start = () => {
    setPlaying(true);
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: v.id }));
    track("cta_click", { cta: "video_captacao_play", video: v.id });
  };

  return (
    <figure className="w-full">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-ink shadow-lift">
        {playing ? (
          <video
            ref={ref}
            src={videoSrc(v.id)}
            poster={videoPoster(v.id)}
            controls
            autoPlay
            playsInline
            onPlay={() => window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: v.id }))}
            className="h-full w-full object-cover"
          />
        ) : (
          <button type="button" onClick={start} className="group absolute inset-0 text-left" aria-label={`Assistir: ${v.title} — ${v.client}`}>
            <img src={videoPoster(v.id)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" aria-hidden="true" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun text-ink shadow-sun transition-transform group-hover:scale-110">
              <Play className="size-6 fill-current" aria-hidden="true" />
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-bold text-ink-foreground backdrop-blur">{v.duration}</span>
            <span className="absolute inset-x-4 bottom-4 text-ink-foreground">
              <span className="block text-xs font-semibold uppercase tracking-wider text-sun">{v.client}</span>
              <span className="mt-1 block font-display text-lg font-extrabold leading-tight">{v.title}</span>
            </span>
          </button>
        )}
      </div>
      {v.caseSlug && (
        <figcaption className="mt-3 text-center">
          <Link to="/cases/$slug" params={{ slug: v.caseSlug }} className={cn("inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline", dark ? "text-sun" : "text-plum")}>
            Ver o case <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </figcaption>
      )}
    </figure>
  );
}

/** Fileira de vídeos com rolagem lateral. */
export function VideoReel({ items, dark = false, label = "Captações da Ello" }: { items: Captacao[]; dark?: boolean; label?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="relative" role="region" aria-roledescription="carrossel" aria-label={label}>
      <ul ref={ref} onScroll={update} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((v) => (
          <li key={v.id} className="w-60 shrink-0 snap-start sm:w-64">
            <VideoCard v={v} dark={dark} />
          </li>
        ))}
      </ul>
      {[
        { d: -1, can: canPrev, Icon: ChevronLeft, label: "Vídeos anteriores", pos: "-left-4" },
        { d: 1, can: canNext, Icon: ChevronRight, label: "Próximos vídeos", pos: "-right-4" },
      ].map(({ d, can, Icon, label: l, pos }) => (
        <button
          key={d}
          type="button"
          onClick={() => scroll(d)}
          disabled={!can}
          aria-label={l}
          className={cn("absolute top-[42%] hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card text-ink shadow-lift transition-opacity disabled:pointer-events-none disabled:opacity-0 sm:grid", pos)}
        >
          <Icon className="size-5" />
        </button>
      ))}
    </div>
  );
}
