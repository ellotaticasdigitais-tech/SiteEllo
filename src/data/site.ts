/**
 * Institutional data for Ello Táticas Digitais.
 * Values marked `toValidate` came from the wireframe and must be confirmed
 * by the Ello team before publication (see docs/PENDENCIAS.md).
 */
export const site = {
  name: "Ello Táticas Digitais",
  shortName: "Ello",
  tagline: "Planejar, criar, conectar e converter.",
  description:
    "Agência de crescimento digital em Louveira-SP que integra estratégia, branding, conteúdo, tráfego pago, tecnologia, automação com IA e vendas para empresas de todo o Brasil.",
  phoneDisplay: "(19) 99865-0372",
  phoneE164: "+5519998650372",
  whatsappNumber: "5519998650372",
  email: "comercial@ellotaticasdigitais.com.br",
  address: {
    street: "R. Dr. José Romeiro Pereira, 300 — Sala 03",
    district: "Vila Nova Louveira",
    city: "Louveira",
    state: "SP",
    postalCode: "13290-266",
    country: "BR",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=R.+Dr.+Jos%C3%A9+Romeiro+Pereira%2C+300%2C+Louveira+-+SP%2C+13290-266",
  /** CNPJ not provided in the materials yet. Leave null until validated. */
  cnpj: null as string | null,
  /** Official social profiles not provided yet. Add URLs when confirmed. */
  social: [] as { label: string; href: string }[],
  areaServed: "Louveira, Jundiaí, Vinhedo, Valinhos, Campinas e todo o Brasil",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city}-${site.address.state}, CEP ${site.address.postalCode}`;

/** Credibility indicators from the wireframe — to validate before publishing. */
export const stats = [
  { value: "4 anos", label: "de Ello Táticas Digitais" },
  { value: "+13 anos", label: "de mercado combinados entre os fundadores" },
  { value: "+R$500 mil", label: "geridos em anúncios (Meta + Google)" },
];

/** Partners/certifications listed in the wireframe — to validate before publishing. */
export const partners = ["RD Station Partner", "Kommo Partner", "Google Ads", "Meta Business Partner"];

export const rotatingWords = ["RESULTADOS.", "CONEXÕES.", "VENDAS.", "CRESCIMENTO.", "VALOR."];

export const mainNav = [
  { to: "/servicos", label: "Serviços" },
  { to: "/metodo-acelera", label: "Método ACELERA" },
  { to: "/cases", label: "Cases" },
  { to: "/sobre", label: "Sobre" },
  { to: "/blog", label: "Blog" },
] as const;

export const comparison = [
  { traditional: "Vende entregáveis", ello: "Vende direção" },
  { traditional: "Relatório de vaidade", ello: "Leitura de negócio" },
  { traditional: "Criativo primeiro", ello: "Objetivo primeiro" },
  { traditional: "Fala por e-mail", ello: "Senta junto" },
  { traditional: "Tendência", ello: "Tática" },
];

export const onboarding = [
  { day: "Dia 1", title: "Kick-off" },
  { day: "Dia 2", title: "Briefing" },
  { day: "Dias 3–5", title: "Setup de estrutura" },
  { day: "Dias 5–8", title: "Alinhamento" },
  { day: "Dias 8–12", title: "Captação e criativos" },
  { day: "Dias 12–18", title: "Configurações finais" },
  { day: "Dia 20", title: "Start de performance" },
];

export const pillars = [
  {
    letter: "1",
    title: "Presença Digital Estruturada",
    short: "Perfil, site e comunicação profissionais antes de qualquer esforço de mídia.",
    detail:
      "Antes de investir em anúncios, sua empresa precisa ser encontrada e transmitir confiança. Organizamos perfis, site, Google Meu Negócio e a comunicação da marca para que cada visita tenha onde chegar.",
    services: ["dna-da-marca", "identidade-visual-e-branding", "sites-e-landing-pages"],
  },
  {
    letter: "2",
    title: "Conteúdo e Relacionamento",
    short: "Conteúdo com função na jornada — topo, meio e fundo de funil.",
    detail:
      "Conteúdo não é volume de posts: é cada peça cumprindo uma função na jornada do cliente. Planejamos redes sociais, vídeo e inbound para atrair, educar e preparar a decisão de compra.",
    services: ["gestao-de-redes-sociais", "captacao-e-edicao-de-video", "inbound-marketing"],
  },
  {
    letter: "3",
    title: "Tráfego e Crescimento",
    short: "Mídia paga para ampliar alcance e gerar oportunidades reais.",
    detail:
      "Com a base pronta, a mídia paga acelera. Campanhas no Google, Meta, LinkedIn e TikTok com objetivo de negócio definido, rastreamento configurado e leitura estratégica dos números.",
    services: ["trafego-pago", "consultoria-estrategica"],
  },
  {
    letter: "4",
    title: "Vendas e Atendimento com IA",
    short: "Ello IA qualifica, conduz e vende 24/7 — humano assume quando precisa.",
    detail:
      "O lead gerado precisa ser atendido rápido. A Ello IA responde no WhatsApp 24 horas por dia, qualifica e conduz a conversa, e a equipe humana assume quando o momento pede.",
    services: ["ello-ia"],
    isNew: true,
  },
];
