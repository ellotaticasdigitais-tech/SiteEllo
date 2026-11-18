/**
 * Plans as defined in the wireframe. Prices are intentionally absent —
 * "Consultar investimento" until values are approved by Ello.
 */
export type Plan = {
  id: "performance" | "expansao" | "conexao";
  name: string;
  summary: string;
  items: string[];
  featured?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    id: "performance",
    name: "Ello Performance",
    summary: "Tráfego pago, CRM, dashboard em tempo real e Ello Lab de bônus.",
    items: ["Tráfego pago", "CRM", "Dashboard em tempo real", "Ello Lab de bônus"],
  },
  {
    id: "expansao",
    name: "Ello Expansão",
    summary: "Tudo do Performance + redes sociais, captação mensal e análise de concorrência.",
    items: [
      "Tudo do Ello Performance",
      "Gestão de redes sociais",
      "Captação mensal",
      "Análise de concorrência",
    ],
    featured: true,
    badge: "Mais escolhido",
  },
  {
    id: "conexao",
    name: "Ello Conexão",
    summary: "Inbound completo, automação e jornada do cliente ponta a ponta.",
    items: ["Inbound marketing completo", "Automação", "Jornada do cliente ponta a ponta"],
  },
];

type Cell = "yes" | "ask";

/** Comparison matrix. "ask" = not specified in the approved material (sob consulta). */
export const planMatrix: { feature: string; values: Record<Plan["id"], Cell | "no"> }[] = [
  { feature: "Tráfego pago", values: { performance: "yes", expansao: "yes", conexao: "ask" } },
  { feature: "CRM", values: { performance: "yes", expansao: "yes", conexao: "ask" } },
  { feature: "Dashboard em tempo real", values: { performance: "yes", expansao: "yes", conexao: "ask" } },
  { feature: "Ello Lab de bônus", values: { performance: "yes", expansao: "yes", conexao: "ask" } },
  { feature: "Gestão de redes sociais", values: { performance: "ask", expansao: "yes", conexao: "ask" } },
  { feature: "Captação mensal", values: { performance: "ask", expansao: "yes", conexao: "ask" } },
  { feature: "Análise de concorrência", values: { performance: "ask", expansao: "yes", conexao: "ask" } },
  { feature: "Inbound marketing completo", values: { performance: "ask", expansao: "ask", conexao: "yes" } },
  { feature: "Automação", values: { performance: "ask", expansao: "ask", conexao: "yes" } },
  { feature: "Jornada do cliente ponta a ponta", values: { performance: "ask", expansao: "ask", conexao: "yes" } },
];

export const planAddon = "Ello IA disponível como camada adicional a qualquer plano.";
