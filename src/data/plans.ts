import {
  BarChart3,
  Camera,
  Clapperboard,
  Database,
  FileImage,
  Filter,
  FlaskConical,
  Gauge,
  Handshake,
  Images,
  Instagram,
  Magnet,
  Megaphone,
  Radar,
  Route,
  Share2,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Planos e valores aprovados pela Ello (tabela de planos 2026).
 * Os valores ficam só aqui: cartões, comparativo e FAQ leem deste arquivo.
 */
export type PlanId = "performance" | "expansao" | "conexao";
export type BillingPeriod = "mensal" | "semestral" | "anual";

export type PlanItem = { icon: LucideIcon; title: string; detail?: string };

export type PlanPrice = {
  /** Valor por mês, em reais. */
  monthly: number;
  /** Setup inicial, em reais (0 = gratuito). */
  setup: number;
};

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** "Tudo do plano X +" quando o plano soma ao anterior. */
  includes?: string;
  items: PlanItem[];
  /** Sem preços = "A consultar" (plano personalizado). */
  prices?: Record<BillingPeriod, PlanPrice>;
  customNote?: string;
  featured?: boolean;
  badge?: string;
};

export const billingPeriods: { id: BillingPeriod; label: string; months: number; hint?: string }[] = [
  { id: "mensal", label: "Mensal", months: 1 },
  { id: "semestral", label: "Semestral", months: 6, hint: "-15%" },
  { id: "anual", label: "Anual", months: 12, hint: "-20%" },
];

export const plans: Plan[] = [
  {
    id: "performance",
    name: "Ello Performance",
    tagline: "Comece a gerar oportunidades com presença e consistência.",
    items: [
      { icon: Megaphone, title: "Gestão de tráfego pago", detail: "Google Ads e Meta Ads" },
      { icon: Clapperboard, title: "Captação audiovisual para anúncios", detail: "1 visita a cada 2 meses para criativos" },
      { icon: Images, title: "Criativos para anúncio", detail: "Artes estáticas e carrosséis para campanhas" },
      { icon: Handshake, title: "Integração de vendas e marketing", detail: "Com a sua equipe comercial, 1x ao mês" },
      { icon: Gauge, title: "Dashboard de dados em tempo real" },
      { icon: Database, title: "CRM RD Station incluso", detail: "Funil de vendas, integração com WhatsApp e até 4 usuários" },
      { icon: FlaskConical, title: "Bônus: acesso ao Ello Lab", detail: "Laboratório de marketing, engajamento, vendas e conversão" },
    ],
    prices: {
      mensal: { monthly: 2600, setup: 960 },
      semestral: { monthly: 2210, setup: 450 },
      anual: { monthly: 2080, setup: 0 },
    },
  },
  {
    id: "expansao",
    name: "Ello Expansão",
    tagline: "Presença digital consistente, com posicionamento estratégico e profissional.",
    includes: "Tudo do Ello Performance +",
    items: [
      { icon: Instagram, title: "Gestão de redes sociais", detail: "Instagram com no mínimo 3 postagens por semana" },
      { icon: Camera, title: "Captação para redes sociais", detail: "1 visita por mês dedicada às redes" },
      { icon: FileImage, title: "Materiais offline sob demanda", detail: "Artes avulsas sob solicitação" },
      { icon: Radar, title: "Análise de concorrência em tempo real", detail: "Até 4 concorrentes" },
      { icon: Share2, title: "Até 8 redes sociais", detail: "Atualizadas em tempo integral" },
    ],
    prices: {
      mensal: { monthly: 4950, setup: 960 },
      semestral: { monthly: 4207, setup: 450 },
      anual: { monthly: 3960, setup: 0 },
    },
    featured: true,
    badge: "Mais escolhido",
  },
  {
    id: "conexao",
    name: "Ello Conexão",
    tagline: "Construa relacionamentos que fidelizam, escalam e geram vendas recorrentes.",
    includes: "Tudo do Ello Expansão +",
    items: [
      { icon: Magnet, title: "Inbound marketing completo", detail: "Da descoberta à conversão" },
      { icon: Route, title: "Mapeamento da jornada do cliente", detail: "E identificação de oportunidades de crescimento" },
      { icon: Workflow, title: "Automação estratégica", detail: "E-mail, chatbot, landing pages e fluxos" },
      { icon: Filter, title: "Funis de nutrição e conversão", detail: "Engajamento do primeiro contato à venda" },
      { icon: BarChart3, title: "Análises estratégicas sob demanda", detail: "Otimização contínua de resultados" },
      { icon: Users, title: "Parceria RD Station", detail: "Mais performance e escala" },
    ],
    customNote: "Criamos um plano personalizado para sua empresa crescer com estratégia e previsibilidade.",
  },
];

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const formatBRL = (value: number) => brl.format(value).replace(/\u00a0/g, " ");

/** Quanto o cliente economiza no período, comparado ao plano mensal. */
export function periodSavings(plan: Plan, period: BillingPeriod) {
  if (!plan.prices) return 0;
  const months = billingPeriods.find((b) => b.id === period)?.months ?? 1;
  return (plan.prices.mensal.monthly - plan.prices[period].monthly) * months;
}

/** Comparativo: cada plano inclui tudo do anterior. */
export const planMatrix: { feature: string; from: PlanId }[] = plans.flatMap((p) => p.items.map((it) => ({ feature: it.title, from: p.id })));

const order: PlanId[] = ["performance", "expansao", "conexao"];
export const planIncludes = (plan: PlanId, from: PlanId) => order.indexOf(plan) >= order.indexOf(from);

export const planAddon = "Ello IA disponível como camada adicional a qualquer plano.";
