import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  variant?: "up" | "fade" | "scale" | "left" | "right";
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
};

let sharedObserver: IntersectionObserver | null = null;
function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset["visible"] = "true";
            sharedObserver?.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
  }
  return sharedObserver;
}

/** Observes the element after it hydrates, so server HTML and client props match. */
function useRevealRef<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return ref;
}

/** Marks an element for scroll reveal. Content stays in the server HTML. */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, className, children, id, style }: RevealProps) {
  const ref = useRevealRef<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={variant === "up" ? "" : variant}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Divider line that grows when it enters the viewport. */
export function RevealLine({ className }: { className?: string }) {
  const ref = useRevealRef<HTMLSpanElement>();
  return <span ref={ref} data-line="" aria-hidden="true" className={cn("block", className)} />;
}

function finePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Discreet magnetic pull toward the cursor (desktop only). */
export function Magnetic({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className={cn("inline-block transition-transform duration-300 ease-out", className)}>
      {children}
    </span>
  );
}

/** Depth tilt + lift on hover (desktop), static on touch. */
export function Tilt({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${px * max}deg`);
      el.style.setProperty("--rx", `${-py * max}deg`);
      el.style.setProperty("--ty", "-6px");
    };
    const leave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ty", "0px");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return (
    <div ref={ref} className={cn("tilt", className)}>
      {children}
    </div>
  );
}

/** Slow organic purple/yellow blurred blobs with light scroll parallax. */
export function BlurBlobs({ tone = "ink", className }: { tone?: "ink" | "light"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--py", `${Math.round(r.top * -0.12)}px`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  const a = tone === "ink" ? "opacity-55" : "opacity-35";
  return (
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div style={{ transform: "translate3d(0, var(--py, 0), 0)" }} className="absolute inset-0">
        <div className={cn("blob left-[-8%] top-[8%] h-[38vmax] w-[38vmax] animate-float-slow bg-violet", a)} />
        <div className={cn("blob right-[-10%] top-[30%] h-[30vmax] w-[30vmax] animate-float-slower bg-sun", tone === "ink" ? "opacity-25" : "opacity-30")} />
        <div className={cn("blob bottom-[-12%] left-[30%] h-[26vmax] w-[26vmax] animate-float-slow bg-plum", a)} />
      </div>
    </div>
  );
}

/** Vertical roulette for the hero headline; screen readers get a static sentence. */
export function RotatingWord({ words, interval = 2400, className = "text-sun" }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => window.clearInterval(t);
  }, [interval, paused, words.length]);
  return (
    <span
      className={cn("roulette", className)}
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {words.map((w, idx) => {
        const prev = (i - 1 + words.length) % words.length;
        const state = idx === i ? "active" : idx === prev ? "past" : "next";
        return (
          <span key={`${w}-${idx}`} data-state={state}>
            {w}
          </span>
        );
      })}
    </span>
  );
}

/** Continuous marquee; pauses on hover/focus and can be toggled. */
export function Marquee({ children, className, duration = 38 }: { children: ReactNode; className?: string; duration?: number }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max animate-marquee"
        data-paused={paused}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground opacity-0 shadow-soft transition-opacity focus:opacity-100 group-hover:opacity-100"
        aria-label={paused ? "Retomar movimento dos logotipos" : "Pausar movimento dos logotipos"}
      >
        {paused ? "Retomar" : "Pausar"}
      </button>
    </div>
  );
}
