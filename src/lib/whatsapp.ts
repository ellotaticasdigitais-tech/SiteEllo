import { site } from "@/data/site";

export type WhatsAppTopic =
  | "diagnostico"
  | "trafego"
  | "branding"
  | "sites"
  | "ia"
  | "lab"
  | "planos"
  | "cases"
  | "geral";

export const whatsappMessages: Record<WhatsAppTopic, string> = {
  diagnostico: "Olá, Ello! Quero um diagnóstico estratégico para a minha empresa.",
  trafego: "Olá, Ello! Quero conversar sobre gestão de tráfego pago (Google Ads / Meta Ads).",
  branding: "Olá, Ello! Quero conversar sobre DNA da marca e identidade visual.",
  sites: "Olá, Ello! Quero um site ou landing page para a minha empresa.",
  ia: "Olá, Ello! Quero conhecer a Ello IA para atendimento no WhatsApp.",
  lab: "Olá, Ello! Quero saber mais sobre o Ello Lab.",
  planos: "Olá, Ello! Quero entender qual plano é ideal para a minha empresa.",
  cases: "Olá, Ello! Vi os cases de vocês e quero um resultado parecido.",
  geral: "Olá, Ello! Vim pelo site e quero falar com um especialista.",
};

export function whatsappLink(topic: WhatsAppTopic = "geral", number: string = site.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessages[topic])}`;
}

/** Picks the most relevant pre-filled message for a pathname. */
export function topicForPath(pathname: string): WhatsAppTopic {
  if (pathname.startsWith("/servicos/trafego-pago")) return "trafego";
  if (pathname.startsWith("/servicos/dna-da-marca") || pathname.startsWith("/servicos/identidade-visual"))
    return "branding";
  if (pathname.startsWith("/servicos/sites")) return "sites";
  if (pathname.startsWith("/servicos/ello-ia") || pathname.startsWith("/tecnologia")) return "ia";
  if (pathname.startsWith("/ello-lab")) return "lab";
  if (pathname.startsWith("/planos")) return "planos";
  if (pathname.startsWith("/cases")) return "cases";
  if (pathname.startsWith("/metodo-acelera")) return "diagnostico";
  return "geral";
}
