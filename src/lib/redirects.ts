import { site } from "@/data/site";

/**
 * Endereços do site antigo (WordPress) que o Google ainda tem guardados.
 * Cada um responde com redirecionamento permanente (301) para a página nova
 * equivalente, para não perder a relevância que o domínio já tinha.
 */
const categoryMap: Record<string, string> = {
  sites: "/servicos/sites-e-landing-pages",
  "sites-e-landing-pages": "/servicos/sites-e-landing-pages",
  consultorias: "/servicos/consultoria-estrategica",
  consultoria: "/servicos/consultoria-estrategica",
  "trafego-pago": "/servicos/trafego-pago",
  trafego: "/servicos/trafego-pago",
  "redes-sociais": "/servicos/gestao-de-redes-sociais",
  "social-media": "/servicos/gestao-de-redes-sociais",
  branding: "/servicos/identidade-visual-e-branding",
  "identidade-visual": "/servicos/identidade-visual-e-branding",
  video: "/servicos/captacao-e-edicao-de-video",
  videos: "/servicos/captacao-e-edicao-de-video",
  "inbound-marketing": "/servicos/inbound-marketing",
  marketing: "/servicos",
};

export function legacyTarget(kind: "obrigado" | "category" | "author" | "tag" | "feed", slug = ""): string {
  const first = slug.split("/").filter(Boolean)[0]?.toLowerCase() ?? "";
  switch (kind) {
    case "obrigado":
      return "/contato";
    case "category":
      return categoryMap[first] ?? "/servicos";
    case "author":
      return "/sobre";
    case "tag":
    case "feed":
      return "/";
  }
}

export function permanentRedirect(path: string) {
  return new Response(null, {
    status: 301,
    headers: { location: `${site.url}${path === "/" ? "" : path}`, "cache-control": "public, max-age=86400" },
  });
}
