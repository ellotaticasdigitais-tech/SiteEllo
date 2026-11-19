/** Ello Lab content from the wireframe. */
export const labBenefits = [
  "Curso de vendas com certificado",
  "Mentorias em grupo com a equipe Ello",
  "Eventos exclusivos e descontos para a comunidade",
];

export const labLessons = [
  { tag: "Aula 01", title: "Fundamentos" },
  { tag: "Aula 02", title: "Vendas com dados" },
  { tag: "Aula 03", title: "IA aplicada a vendas" },
];

/**
 * Monthly revenue ranges for the Ello Lab form.
 * PENDING APPROVAL: the materials did not define the ranges — confirm with Ello.
 */
export const revenueRanges = [
  "Até R$ 50 mil",
  "De R$ 50 mil a R$ 200 mil",
  "De R$ 200 mil a R$ 500 mil",
  "De R$ 500 mil a R$ 1 milhão",
  "Acima de R$ 1 milhão",
  "Prefiro não informar",
];

export const diagnosticObjectives = [
  "Gerar mais leads e vendas",
  "Fortalecer a marca",
  "Estruturar presença digital",
  "Automatizar atendimento com IA",
  "Organizar marketing e vendas",
  "Outro objetivo",
];

/** Blog posts. Intentionally empty — no fictional articles. */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [];

export const blogCategories = ["Tráfego pago", "Branding", "Conteúdo e redes", "IA e automação", "Vendas"];

/** Testimonials — only real, authorized ones. Empty until provided. */
export const testimonials: { text: string; author: string; detail: string; source: "Google" | "WhatsApp" | "Vídeo" }[] = [];

/** Client logos authorized for the marquee. Names only until official logo files are provided. */
/**
 * Logos dos clientes (public/clientes).
 * - Sem `bg`: logo recortada, aparece no cartão branco.
 * - Com `bg`: o cartão ganha a cor de fundo da própria logo.
 * - `fill`: a imagem cobre o cartão inteiro.
 * - `fade`: suaviza as bordas da imagem (para fundos em degradê).
 */
export const clientLogos: { name: string; src?: string; bg?: string; fill?: boolean; fade?: boolean }[] = [
  { name: "Blueberry Alimentos", src: "/clientes/blueberry.webp" },
  { name: "Empo Soluções em Construção", src: "/clientes/empo.webp" },
  { name: "TL Mídia Indoor", src: "/clientes/tl-midia-indoor.webp", bg: "#EB630A" },
  { name: "KIE Equipamentos para Reciclagem", src: "/clientes/kie.webp" },
  { name: "BM Estrutural", src: "/clientes/bm.webp" },
  { name: "Exon", src: "/clientes/exon.webp", bg: "#1A0624", fill: true },
  { name: "MiiZMED", src: "/clientes/miizmed.webp" },
  { name: "Rede Mercadão Central", src: "/clientes/mercadao-central.webp", bg: "#008345" },
  { name: "Leva Fácil Entulho", src: "/clientes/levafacil.webp" },
  { name: "ERA", src: "/clientes/era.webp", bg: "#CFFF00" },
  { name: "SkyFit Academia", src: "/clientes/skyfit.webp" },
  { name: "Alvorada Supermercados", src: "/clientes/alvorada.webp", bg: "#7A1512", fade: true },
  { name: "MF Cortes e Furos em Concreto", src: "/clientes/mf-furos.webp", bg: "#141313" },
];
