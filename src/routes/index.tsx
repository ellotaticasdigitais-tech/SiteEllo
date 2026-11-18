import { createFileRoute } from "@tanstack/react-router";

import { CasesSection } from "@/components/home/CasesSection";
import { FaqSection, FinalCta } from "@/components/home/FaqCta";
import { Hero } from "@/components/home/Hero";
import { DiagnosticSection, MethodSection } from "@/components/home/MethodSection";
import { PlansSection, ServicesSection, TechSection } from "@/components/home/OfferSections";
import { Founders, LabSection, LabSignup, ProcessSection } from "@/components/home/PeopleSections";
import { BrandsMarquee, PartnersStrip, Positioning, Testimonials } from "@/components/home/ProofSections";
import { SiteShell } from "@/components/layout/SiteShell";
import { homeFaq } from "@/data/faq";
import { breadcrumbLd, organizationLd, pageHead, professionalServiceLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Ello Táticas Digitais — Agência de marketing digital em Louveira-SP",
      description:
        "Estratégia, branding, conteúdo, tráfego pago e automação com IA como um sistema só. Agência de crescimento digital em Louveira-SP que atende todo o Brasil.",
      path: "/",
      jsonLd: [organizationLd, professionalServiceLd, breadcrumbLd([{ name: "Início", path: "/" }])],
    }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <Hero />
      <PartnersStrip />
      <BrandsMarquee />
      <Positioning />
      <MethodSection />
      <ServicesSection />
      <DiagnosticSection />
      <TechSection />
      <PlansSection />
      <CasesSection />
      <Testimonials />
      <Founders />
      <ProcessSection />
      <LabSection />
      <LabSignup />
      <FaqSection items={homeFaq} />
      <FinalCta />
    </SiteShell>
  );
}
