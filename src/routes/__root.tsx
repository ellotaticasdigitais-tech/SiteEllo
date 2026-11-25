import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { EllomMark } from "@/components/brand/Logo";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { captureAttribution } from "@/lib/utm";
import { whatsappLink } from "@/lib/whatsapp";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-pattern px-4">
      <div className="max-w-lg text-center">
        <img src="/luma/luma-sentada.webp" alt="" aria-hidden="true" width={790} height={900} className="mx-auto w-44 drop-shadow-2xl sm:w-52" />
        <p className="eyebrow eyebrow-on-ink mt-8">Erro 404</p>
        <h1 className="display-lg mt-3">Essa página saiu da rota.</h1>
        <p className="lead mt-4 text-ink-foreground/80">
          O endereço que você tentou acessar não existe ou foi movido. Vamos te levar de volta para a tática certa.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="sun" size="lg">
            <Link to="/">Voltar ao início</Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <Link to="/contato">Falar com a Ello</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-pattern px-4">
      <div className="max-w-md text-center">
        <EllomMark tone="light" className="mx-auto h-16 w-16" />
        <h1 className="display-md mt-6">Esta página não carregou</h1>
        <p className="mt-3 text-ink-foreground/80">Algo deu errado do nosso lado. Tente novamente ou fale com a gente pelo WhatsApp.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            variant="sun"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Tentar de novo
          </Button>
          <Button asChild variant="outline-light">
            <a href={whatsappLink("geral")} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#2A0C53" },
      { title: "Ello Táticas Digitais | Agência de crescimento digital" },
      {
        name: "description",
        content: "Branding, conteúdo, tráfego pago e automação com IA integrados em uma só estratégia. Louveira-SP e todo o Brasil.",
      },
      { name: "author", content: "Ello Táticas Digitais" },
      { property: "og:site_name", content: "Ello Táticas Digitais" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=DM+Sans:opsz,wght@9..40,400..700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/brand/apple-touch-icon.png" },
    ],
    scripts: [{ children: "document.documentElement.classList.add('js')" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <WhatsAppFloat />
      <CookieConsent />
    </QueryClientProvider>
  );
}
