/**
 * Success cases. A case is only "published" when results, period, source and
 * client authorization are confirmed. Until then it renders as "em preparação"
 * (noindex) and never shows invented numbers.
 */
export type CaseResult = { value: string; metric: string; source: "OFICIAL" | "ESTUDO" | "CLIENTE"; period: string };

export type SuccessCase = {
  slug: string;
  client: string;
  segment: string;
  status: "published" | "draft";
  headline?: string;
  context?: string[];
  challenge?: string[];
  strategy?: string[];
  services?: string[];
  results?: CaseResult[];
  images?: { src: string; alt: string }[];
  testimonial?: { text: string; author: string; role: string; city: string };
};

export const cases: SuccessCase[] = [
  { slug: "blueberry-alimentos", client: "Blueberry Alimentos", segment: "Alimentício", status: "draft" },
  { slug: "ecopietra", client: "Ecopietra", segment: "Indústria", status: "draft" },
  { slug: "aghuia", client: "Aghuia", segment: "Varejo", status: "draft" },
];

/** Clients mentioned in the wireframe that still await authorization. Not rendered publicly. */
export const pendingAuthorization = ["BM Estrutural", "EXON", "Mercadão Central", "Rede Alvorada", "ERA"];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
