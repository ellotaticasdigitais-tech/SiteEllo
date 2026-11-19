import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";

import { Reveal } from "@/components/animations/motion";
import { ContactForm } from "@/components/forms/forms";
import { PageHero, SiteShell } from "@/components/layout/SiteShell";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { plans } from "@/data/plans";
import { fullAddress, site } from "@/data/site";
import { track } from "@/lib/analytics";
import { breadcrumbLd, pageHead, professionalServiceLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contato")({
  validateSearch: z.object({ plano: z.enum(["performance", "expansao", "conexao"]).optional() }),
  head: () =>
    pageHead({
      title: "Contato — fale com a Ello Táticas Digitais",
      description: `Fale com a Ello pelo WhatsApp ${site.phoneDisplay}, e-mail ou formulário. Agência de marketing digital em Louveira-SP, atendendo todo o Brasil.`,
      path: "/contato",
      jsonLd: [professionalServiceLd, breadcrumbLd([{ name: "Início", path: "/" }, { name: "Contato", path: "/contato" }])],
    }),
  component: ContactPage,
});

function ContactPage() {
  const { plano } = Route.useSearch();
  const plan = plans.find((p) => p.id === plano);
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Início", to: "/" }, { label: "Contato" }]}
        eyebrow="Contato"
        title={
          <>
            Vamos conversar sobre o seu <span className="text-sun">crescimento</span>?
          </>
        }
        lead={plan ? `Você escolheu o ${plan.name}. Conte um pouco sobre sua empresa e retornamos com o investimento e os próximos passos.` : "Escolha o canal que preferir: formulário, WhatsApp ou e-mail."}
        aside={<img src="/luma/luma-animada.webp" alt="" aria-hidden="true" width={643} height={900} className="mx-auto hidden w-48 drop-shadow-2xl lg:block" />}
      />
      <section className="section-y bg-paper">
        <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-10">
            <h2 className="display-md">Formulário comercial</h2>
            <p className="mt-2 text-muted-foreground">Quatro campos, menos de um minuto.</p>
            <div className="mt-8">
              <ContactForm origin={plan ? `contato_plano_${plan.id}` : "contato"} />
            </div>
          </Reveal>
          <div className="space-y-4">
            <Reveal variant="right" className="rounded-[2rem] bg-ink-pattern p-8 shadow-lift">
              <h2 className="font-display text-2xl font-bold">Prefere o WhatsApp?</h2>
              <p className="mt-2 text-ink-foreground/80">Mensagem pronta, é só enviar.</p>
              <Button asChild variant="whatsapp" size="lg" className="mt-6 w-full">
                <a href={whatsappLink(plan ? "planos" : "geral")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "contato" })}>
                  <WhatsAppIcon className="size-5" /> {site.phoneDisplay}
                </a>
              </Button>
            </Reveal>
            <Reveal variant="right" delay={100} className="space-y-5 rounded-[2rem] border border-border bg-card p-8 shadow-soft">
              <ContactRow icon={Mail} label="E-mail">
                <a href={`mailto:${site.email}`} className="break-all font-semibold hover:text-plum">{site.email}</a>
              </ContactRow>
              <ContactRow icon={Phone} label="Telefone">
                <a href={`tel:${site.phoneE164}`} className="font-semibold hover:text-plum">{site.phoneDisplay}</a>
              </ContactRow>
              <ContactRow icon={MapPin} label="Endereço">
                <address className="not-italic">{fullAddress}</address>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-semibold text-plum underline underline-offset-4">
                  Abrir no mapa
                </a>
              </ContactRow>
              <ContactRow icon={Clock} label="Atendimento">
                <p>100% digital em todo o Brasil · reuniões presenciais em Louveira e região</p>
              </ContactRow>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function ContactRow({ icon: Icon, label, children }: { icon: typeof Mail; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cream text-plum">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 text-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
