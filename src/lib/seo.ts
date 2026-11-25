import { fullAddress, site } from "@/data/site";

type HeadInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
};

/** Transforma um caminho do site em URL completa (Google e redes sociais pedem URL absoluta). */
export const absUrl = (path: string) => (path.startsWith("http") ? path : `${site.url}${path === "/" ? "" : path}` || site.url);

const DEFAULT_OG_IMAGE = "/og/ello-og.jpg";

/** Builds a route head() payload with unique title/description, OG, Twitter and canonical. */
export function pageHead({ title, description, path, type = "website", noindex, jsonLd = [], image = DEFAULT_OG_IMAGE }: HeadInput & { image?: string }) {
  const url = absUrl(path);
  const img = absUrl(image);
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Ello Táticas Digitais — agência de crescimento digital" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
    { name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
  ];
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({ type: "application/ld+json", children: JSON.stringify(data) })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.state,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

const founders = [
  { "@type": "Person", name: "Melina", jobTitle: "Sócia-fundadora — estratégia, conteúdo, design e automação" },
  { "@type": "Person", name: "Lucas", jobTitle: "Sócio-fundador — performance, tráfego pago e gestão" },
];

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organizacao`,
  name: site.name,
  alternateName: ["Ello", "Ello Agência", "Ello Táticas"],
  url: site.url,
  logo: absUrl("/brand/ello-icon-512.png"),
  image: absUrl("/og/ello-og.jpg"),
  email: site.email,
  telephone: site.phoneE164,
  description: site.description,
  slogan: site.tagline,
  address: postalAddress,
  founder: founders,
  sameAs: site.social.map((s) => s.href),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phoneE164,
    email: site.email,
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#site`,
  url: site.url,
  name: site.name,
  inLanguage: "pt-BR",
  publisher: { "@id": `${site.url}/#organizacao` },
};

export const professionalServiceLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${site.url}/#empresa`,
  name: site.name,
  url: site.url,
  image: absUrl("/espaco/fachada.webp"),
  logo: absUrl("/brand/ello-icon-512.png"),
  description: site.description,
  telephone: site.phoneE164,
  email: site.email,
  priceRange: "R$ 2.080 – R$ 4.950/mês",
  areaServed: [
    ...["Louveira", "Jundiaí", "Vinhedo", "Valinhos", "Campinas", "Itatiba"].map((name) => ({ "@type": "City", name })),
    { "@type": "Country", name: "Brasil" },
  ],
  address: postalAddress,
  hasMap: site.mapsUrl,
  sameAs: site.social.map((s) => s.href),
  parentOrganization: { "@id": `${site.url}/#organizacao` },
  knowsAbout: [
    "Marketing digital",
    "Tráfego pago (Google Ads e Meta Ads)",
    "Gestão de redes sociais",
    "Branding e identidade visual",
    "Captação e edição de vídeo",
    "Inbound marketing",
    "CRM e RD Station",
    "Automação com inteligência artificial",
    "Sites e landing pages",
  ],
  slogan: site.tagline,
  disambiguatingDescription: fullAddress,
};

/** Perguntas frequentes no formato que o Google e as IAs entendem. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
}

export function serviceLd(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    provider: { "@id": `${site.url}/#empresa`, "@type": "ProfessionalService", name: site.name, telephone: site.phoneE164, url: site.url },
    areaServed: { "@type": "Country", name: "Brasil" },
  };
}
