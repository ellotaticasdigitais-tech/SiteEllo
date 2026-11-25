import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Magnetic } from "@/components/animations/motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav, site } from "@/data/site";
import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function SiteHeader({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const onDark = tone === "dark" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500",
        scrolled ? "bg-background/85 py-2 shadow-soft backdrop-blur-xl" : "bg-transparent py-4",
      )}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <div className="container-site grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
        <Link to="/" aria-label="Ello Táticas Digitais, página inicial" className="min-w-0">
          <Logo tone={onDark ? "light" : "dark"} />
        </Link>

        <nav aria-label="Principal" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    "after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-sun after:transition-transform after:duration-300 hover:after:scale-x-100",
                    onDark ? "text-ink-foreground/85 hover:text-ink-foreground" : "text-ink/80 hover:text-ink",
                  )}
                  activeProps={{ className: "after:scale-x-100" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-block">
            <Button asChild variant="sun" size="default">
              <Link to="/contato" onClick={() => track("cta_click", { cta: "header_falar_com_a_ello" })}>
                Falar com a Ello <ArrowUpRight />
              </Link>
            </Button>
          </Magnetic>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("lg:hidden", onDark ? "text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground" : "text-ink")}
                aria-label="Abrir menu"
              >
                <Menu className="!size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[88vw] max-w-sm flex-col border-0 bg-ink-pattern p-0 [&>button]:hidden">
              <div className="flex items-center justify-between p-5">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo tone="light" />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground" aria-label="Fechar menu">
                    <X className="!size-6" />
                  </Button>
                </SheetClose>
              </div>
              <nav aria-label="Menu móvel" className="flex-1 px-5">
                <ul className="space-y-1">
                  {[{ to: "/", label: "Início" }, ...mainNav, { to: "/planos", label: "Planos" }, { to: "/contato", label: "Contato" }].map(
                    (item, i) => (
                      <li key={item.to} className="animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}>
                        <SheetClose asChild>
                          <Link
                            to={item.to}
                            className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-bold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
                            activeOptions={{ exact: item.to === "/" }}
                            activeProps={{ className: "text-sun" }}
                          >
                            {item.label}
                            <ArrowUpRight className="size-5 opacity-60" />
                          </Link>
                        </SheetClose>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
              <div className="space-y-3 p-5">
                <Button asChild variant="whatsapp" size="lg" className="w-full">
                  <a href={whatsappLink("geral")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "mobile_menu" })}>
                    Chamar no WhatsApp
                  </a>
                </Button>
                <p className="text-center text-xs text-ink-muted">{site.phoneDisplay} · {site.email}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
