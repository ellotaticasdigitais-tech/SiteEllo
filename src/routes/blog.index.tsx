import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, PenLine } from "lucide-react";

import { Reveal } from "@/components/animations/motion";
import { FinalCta } from "@/components/home/FaqCta";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { blogCategories, blogPosts } from "@/data/content";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Blog da Ello | marketing, tráfego, branding e IA",
      description: "Artigos da Ello sobre tráfego pago, branding, conteúdo, inteligência artificial e vendas para empresas que querem crescer no digital.",
      path: "/blog",
      // Keep out of the index until the first real articles are published.
      noindex: blogPosts.length === 0,
      jsonLd: [breadcrumbLd([{ name: "Início", path: "/" }, { name: "Blog", path: "/blog" }])],
    }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Blog" }]}
        eyebrow="Blog / Conteúdo"
        title={
          <>
            Táticas para quem quer <span className="text-sun">crescer</span> no digital
          </>
        }
        lead="Conteúdo direto ao ponto sobre marketing, vendas e tecnologia, escrito por quem executa todos os dias."
      />
      <section className="section-y bg-paper">
        <div className="container-site">
          <ul className="flex flex-wrap gap-2" aria-label="Categorias">
            {blogCategories.map((c) => (
              <li key={c} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">
                {c}
              </li>
            ))}
          </ul>

          {blogPosts.length > 0 ? (
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 80}>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                    <p className="eyebrow">{p.category}</p>
                    <h2 className="mt-3 font-display text-2xl font-bold">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {p.author} · <time dateTime={p.publishedAt}>{new Date(p.publishedAt).toLocaleDateString("pt-BR")}</time>
                    </p>
                    <ArrowUpRight className="mt-4 size-5 text-plum" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal className="mx-auto mt-14 max-w-2xl rounded-[2rem] border-2 border-dashed border-border bg-card p-10 text-center">
              <PenLine className="mx-auto size-10 text-violet" aria-hidden="true" />
              <h2 className="display-md mt-4">Os primeiros artigos estão sendo escritos</h2>
              <p className="mt-3 text-muted-foreground">
                Em breve, conteúdos sobre tráfego pago, branding, IA e vendas. Enquanto isso, conheça o método que usamos com nossos clientes.
              </p>
              <Button asChild variant="ink" className="mt-6">
                <Link to="/metodo-acelera">Conhecer o Método ACELERA</Link>
              </Button>
            </Reveal>
          )}
        </div>
      </section>
      <FinalCta />
    </SiteShell>
  );
}
