import { LeadForm } from "@/components/forms/LeadForm";
import { diagnosticObjectives, revenueRanges } from "@/data/content";
import { coreServices } from "@/data/services";

export function DiagnosticForm({ origin = "home_diagnostico", tone = "light" as "light" | "dark" }) {
  return (
    <LeadForm
      formType="diagnostico"
      origin={origin}
      tone={tone}
      whatsappTopic="diagnostico"
      submitLabel="Quero um diagnóstico estratégico"
      purpose="Usaremos estes dados apenas para entrar em contato sobre o diagnóstico solicitado."
      successTitle="Diagnóstico solicitado!"
      successText="Um especialista da Ello vai chamar você no WhatsApp para agendar a conversa."
      fields={[
        { name: "name", label: "Nome", type: "text", autoComplete: "name", placeholder: "Seu nome" },
        { name: "company", label: "Empresa", type: "text", autoComplete: "organization", placeholder: "Nome da empresa" },
        { name: "email", label: "E-mail", type: "email", autoComplete: "email", placeholder: "voce@empresa.com.br" },
        { name: "whatsapp", label: "WhatsApp", type: "tel", autoComplete: "tel", placeholder: "(19) 99999-9999" },
        { name: "objective", label: "Principal objetivo", type: "select", options: diagnosticObjectives },
      ]}
    />
  );
}

export function LabForm({ origin = "home_ello_lab", tone = "light" as "light" | "dark" }) {
  return (
    <LeadForm
      formType="ello_lab"
      origin={origin}
      tone={tone}
      whatsappTopic="lab"
      submitLabel="Quero fazer parte do Ello Lab"
      purpose="Usaremos estes dados para enviar informações e próximos passos do Ello Lab."
      successTitle="Cadastro recebido!"
      successText="Nossa equipe vai entrar em contato com os próximos passos do Ello Lab."
      fields={[
        { name: "name", label: "Nome", type: "text", autoComplete: "name" },
        { name: "company", label: "Nome da empresa", type: "text", autoComplete: "organization" },
        { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
        { name: "whatsapp", label: "WhatsApp", type: "tel", autoComplete: "tel", placeholder: "(19) 99999-9999" },
        { name: "revenue_range", label: "Faturamento mensal (faixa)", type: "select", options: revenueRanges },
      ]}
    />
  );
}

export function ContactForm({ origin = "contato" }: { origin?: string }) {
  return (
    <LeadForm
      formType="contato"
      origin={origin}
      submitLabel="Falar com a Ello"
      purpose="Usaremos estes dados apenas para responder ao seu contato comercial."
      successTitle="Mensagem enviada!"
      successText="Recebemos sua mensagem e vamos responder pelo canal informado."
      fields={[
        { name: "name", label: "Nome", type: "text", autoComplete: "name" },
        { name: "email", label: "E-mail", type: "email", autoComplete: "email", placeholder: "voce@empresa.com.br" },
        { name: "whatsapp", label: "WhatsApp", type: "tel", autoComplete: "tel", placeholder: "(19) 99999-9999", optional: true },
        { name: "service_interest", label: "Serviço de interesse", type: "select", options: [...coreServices.map((s) => s.name), "Ello IA", "Ello Lab", "Planos", "Ainda não sei"] },
        { name: "message", label: "Mensagem", type: "textarea", placeholder: "Conte um pouco sobre sua empresa e seu objetivo" },
      ]}
    />
  );
}

export function CrmInterestForm() {
  return (
    <LeadForm
      formType="crm_interesse"
      origin="tecnologia_crm_lancamento"
      tone="dark"
      whatsappTopic="ia"
      submitLabel="Quero ser avisado no lançamento"
      purpose="Usaremos seu e-mail apenas para avisar sobre o lançamento do Ello CRM."
      successTitle="Pronto, você está na lista!"
      successText="Avisaremos por e-mail quando houver novidades sobre o Ello CRM."
      fields={[
        { name: "name", label: "Nome", type: "text", autoComplete: "name" },
        { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
        { name: "company", label: "Empresa", type: "text", autoComplete: "organization", optional: true },
      ]}
    />
  );
}

export function ServiceForm({ slug, serviceName, topic }: { slug: string; serviceName: string; topic: import("@/lib/whatsapp").WhatsAppTopic }) {
  return (
    <LeadForm
      formType="servico"
      origin={`lp_${slug}`}
      serviceSlug={slug}
      whatsappTopic={topic}
      submitLabel="Quero um diagnóstico gratuito"
      purpose={`Usaremos estes dados apenas para o contato sobre ${serviceName}.`}
      successTitle="Pedido recebido!"
      successText="Um especialista da Ello vai chamar você no WhatsApp."
      fields={[
        { name: "name", label: "Nome", type: "text", autoComplete: "name" },
        { name: "email", label: "E-mail", type: "email", autoComplete: "email", placeholder: "voce@empresa.com.br" },
        { name: "whatsapp", label: "WhatsApp", type: "tel", autoComplete: "tel", placeholder: "(19) 99999-9999" },
        { name: "company", label: "Empresa", type: "text", autoComplete: "organization", optional: true },
      ]}
    />
  );
}
