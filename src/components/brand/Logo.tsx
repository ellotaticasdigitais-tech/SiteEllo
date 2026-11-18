import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Provisional Ello logo built from the circular "arco" described in the wireframe,
 * using the approved purple → yellow gradient. Replace with the official SVG
 * (public/brand) once the identity files are delivered.
 */
export function EllomMark({ className, spin = false }: { className?: string; spin?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("shrink-0", spin && "animate-spin-slow", className)}>
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--violet)" />
          <stop offset="45%" stopColor="var(--plum)" />
          <stop offset="80%" stopColor="var(--amber)" />
          <stop offset="100%" stopColor="var(--sun)" />
        </linearGradient>
      </defs>
      <path
        d="M38.5 13.5 A18 18 0 1 0 42 26"
        fill="none"
        stroke={`url(#g-${id})`}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path d="M33.5 6.8 L44.8 9.6 L40.6 20.4 Z" fill="var(--sun)" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <EllomMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.65rem] font-extrabold tracking-[-0.05em]",
            tone === "light" ? "text-ink-foreground" : "text-ink",
          )}
        >
          ello
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.58rem] font-bold uppercase tracking-[0.22em]",
            tone === "light" ? "text-sun" : "text-plum",
          )}
        >
          táticas digitais
        </span>
      </span>
    </span>
  );
}
