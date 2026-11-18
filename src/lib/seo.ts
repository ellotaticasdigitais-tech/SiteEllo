import { fullAddress, site } from "@/data/site";

type HeadInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
};

/** Builds a route head() payload with unique title/description, OG, Twitter and canonical. */
export function pageHead({ title, description, path, type = "website", noindex, jsonLd = [] }: HeadInput) {
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex, follow" });
  return {
    meta,
    links: [{ rel: "canonical", href: path }],
    scripts: jsonLd.map((data) => ({ type: "application/ld+json", children: JSON.stringify(data) })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.path })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  email: site.email,
  telephone: site.phoneE164,
  description: site.description,
};

export const professionalServiceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  telephone: site.phoneE164,
  email: site.email,
  areaServed: [{ "@type": "City", name: "Louveira" }, { "@type": "Country", name: "Brasil" }],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  knowsAbout: ["Marketing digital", "Tráfego pago", "Branding", "Inbound marketing", "Automação com IA"],
  slogan: site.tagline,
  hasMap: site.mapsUrl,
  disambiguatingDescription: fullAddress,
};

export function serviceLd(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    provider: { "@type": "ProfessionalService", name: site.name, telephone: site.phoneE164 },
    areaServed: { "@type": "Country", name: "Brasil" },
  };
}
