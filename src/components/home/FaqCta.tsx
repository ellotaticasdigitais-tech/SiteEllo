import { Link } from "@tanstack/react-router";

import { BlurBlobs, Magnetic, Reveal } from "@/components/animations/motion";
import { SectionHeading } from "@/components/layout/SiteShell";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { fullAddress, site } from "@/data/site";
import { track } from "@/lib/analytics";
import { faqLd } from "@/lib/seo";
import { whatsappLink, type WhatsAppTopic } from "@/lib/whatsapp";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(items)) }} />
    <Accordion type="single" collapsible className="space-y-3">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 60}>
          <AccordionItem value={`item-${i}`} className="rounded-3xl border border-border bg-card px-6 shadow-soft transition-shadow data-[state=open]:shadow-lift">
            <AccordionTrigger className="py-5 text-left font-display text-lg font-bold hover:no-underline">{f.q}</AccordionTrigger>
            {/* forceMount: a resposta fica no HTML (Google e IAs leem), mas só aparece quando aberta */}
            <AccordionContent forceMount className="pb-5 text-base leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
    </>
  );
}

export function FaqSection({ items, title = "Dúvidas comuns sobre contratar a Ello" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section aria-labelledby="faq" className="section-y bg-paper">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Perguntas frequentes" title={<span id="faq">{title}</span>} />
        <FaqList items={items} />
      </div>
    </section>
  );
}

export function FinalCta({
  title = "Pronto para o seu digital virar estratégia?",
  text = "Fale com a Ello e receba um diagnóstico sem compromisso.",
  topic = "diagnostico",
  formHref = "/contato",
}: {
  title?: string;
  text?: string;
  topic?: WhatsAppTopic;
  formHref?: "/contato";
}) {
  return (
    <section aria-labelledby="cta-final" className="relative isolate overflow-hidden bg-ink-pattern py-24 sm:py-32">
      <BlurBlobs />
      <div className="container-site text-center">
        <Reveal>
          <h2 id="cta-final" className="display-xl mx-auto max-w-4xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="lead mx-auto mt-6 max-w-xl text-ink-foreground/80">{text}</p>
        </Reveal>
        <Reveal delay={180} className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Button asChild variant="whatsapp" size="xl">
              <a href={whatsappLink(topic)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "final_cta", topic })}>
                <WhatsAppIcon className="size-5" /> Chamar no WhatsApp
              </a>
            </Button>
          </Magnetic>
          <Button asChild variant="outline-light" size="xl">
            <Link to={formHref} onClick={() => track("cta_click", { cta: "final_cta_form" })}>
              Preencher formulário
            </Link>
          </Button>
        </Reveal>
        <Reveal delay={240}>
          <address className="mx-auto mt-12 max-w-2xl text-sm not-italic text-ink-foreground/70">
            {fullAddress} · <a href={`tel:${site.phoneE164}`} className="hover:text-sun">{site.phoneDisplay}</a> ·{" "}
            <a href={`mailto:${site.email}`} className="hover:text-sun">{site.email}</a>
          </address>
        </Reveal>
      </div>
    </section>
  );
}
