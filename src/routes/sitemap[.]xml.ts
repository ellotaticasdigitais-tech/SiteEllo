import { createFileRoute } from "@tanstack/react-router";

import { cases } from "@/data/cases";
import { blogPosts } from "@/data/content";
import { services } from "@/data/services";

/** Dynamic sitemap built from the request host, so it stays valid on any domain. */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "/",
          "/servicos",
          ...services.map((s) => `/servicos/${s.slug}`),
          "/metodo-acelera",
          "/planos",
          "/tecnologia",
          "/cases",
          ...cases.filter((c) => c.status === "published").map((c) => `/cases/${c.slug}`),
          "/sobre",
          "/ello-lab",
          ...(blogPosts.length ? ["/blog", ...blogPosts.map((p) => `/blog/${p.slug}`)] : []),
          "/contato",
          "/politica-de-privacidade",
          "/politica-de-cookies",
          "/termos-de-uso",
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${origin}${p}</loc></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" },
        });
      },
    },
  },
});
