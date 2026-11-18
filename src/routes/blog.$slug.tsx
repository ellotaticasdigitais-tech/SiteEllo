import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { FinalCta } from "@/components/home/FaqCta";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { blogPosts } from "@/data/content";
import { site } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return pageHead({ title: "Artigo não encontrado — Ello", description: "Página indisponível.", path: `/blog/${params.slug}`, noindex: true });
    const { post } = loaderData;
    return pageHead({
      title: `${post.title} — Blog da Ello`,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      type: "article",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: site.name },
        },
        breadcrumbLd([{ name: "Início", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]),
      ],
    });
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]}
        eyebrow={post.category}
        title={post.title}
        lead={
          <>
            Por {post.author} · <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("pt-BR")}</time>
            {post.updatedAt && <> · atualizado em <time dateTime={post.updatedAt}>{new Date(post.updatedAt).toLocaleDateString("pt-BR")}</time></>}
          </>
        }
      />
      <article className="section-y bg-paper">
        <div className="container-site max-w-3xl space-y-5 text-lg leading-relaxed">
          {post.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </article>
      {related.length > 0 && (
        <aside className="bg-cream py-14">
          <div className="container-site">
            <h2 className="display-md">Leia também</h2>
            <ul className="mt-6 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to="/blog/$slug" params={{ slug: r.slug }} className="font-semibold text-plum underline underline-offset-4">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
      <FinalCta />
    </SiteShell>
  );
}
