import type { ReactNode } from "react";
import { FileWarning } from "lucide-react";

import { PageHero, SiteShell } from "@/components/layout/SiteShell";

export function LegalPage({ title, crumb, updated, children }: { title: string; crumb: string; updated: string; children: ReactNode }) {
  return (
    <SiteShell>
      <PageHero crumbs={[{ label: "Início", to: "/" }, { label: crumb }]} eyebrow="Legal" title={title} lead={`Última atualização: ${updated}`} />
      <section className="section-y bg-paper">
        <div className="container-site max-w-3xl">
          <p className="mb-10 flex gap-3 rounded-2xl border border-amber/50 bg-sun/15 p-4 text-sm">
            <FileWarning className="size-5 shrink-0 text-plum" aria-hidden="true" />
            Versão preliminar, sujeita a revisão jurídica e aprovação da Ello Táticas Digitais antes da publicação definitiva.
          </p>
          <div className="space-y-8 text-base leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground [&_ul]:space-y-1.5">
            {children}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
