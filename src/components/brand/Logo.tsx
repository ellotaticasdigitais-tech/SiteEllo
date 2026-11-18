import { cn } from "@/lib/utils";

/**
 * Logo oficial da Ello (rebranding). Arquivos em public/brand:
 * - ello-logo.webp / ello-logo-light.webp → logo completa (fundo claro / fundo escuro)
 * - ello-simbolo.webp / ello-simbolo-light.webp → só o símbolo "e"
 */
type Tone = "dark" | "light";

export function EllomMark({
  className,
  spin = false,
  tone = "dark",
}: {
  className?: string;
  spin?: boolean;
  tone?: Tone;
}) {
  return (
    <img
      src={tone === "light" ? "/brand/ello-simbolo-light.webp" : "/brand/ello-simbolo.webp"}
      alt=""
      aria-hidden="true"
      width={357}
      height={320}
      decoding="async"
      className={cn("shrink-0 object-contain", spin && "animate-spin-slow", className)}
    />
  );
}

export function Logo({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  return (
    <img
      src={tone === "light" ? "/brand/ello-logo-light.webp" : "/brand/ello-logo.webp"}
      alt="Ello Táticas Digitais"
      width={515}
      height={240}
      decoding="async"
      className={cn("block h-12 w-auto sm:h-14", className)}
    />
  );
}
