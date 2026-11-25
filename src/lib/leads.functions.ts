import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

import { site } from "@/data/site";

import { MIN_FILL_MS, formSchemas, leadPayloadSchema } from "./leads.schema";

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: "validation" | "spam" | "rate_limited" | "unavailable"; message: string };

const FORM_LABELS: Record<string, string> = {
  diagnostico: "Diagnóstico estratégico",
  ello_lab: "Ello Lab",
  contato: "Contato",
  crm_interesse: "Interesse no Ello CRM",
  servico: "Página de serviço",
};

/** Envia uma cópia do lead por e-mail (FormSubmit). Nunca derruba o envio se falhar. */
async function emailLead(row: Record<string, unknown>): Promise<boolean> {
  const to = site.leadsEmail;
  if (!to) return false;
  const label = FORM_LABELS[String(row["form_type"])] ?? String(row["form_type"]);
  const pick = (k: string) => (row[k] ? String(row[k]) : "");
  const body = {
    _subject: `Novo lead no site: ${label} (${pick("name")})`,
    _template: "table",
    _captcha: "false",
    Formulário: label,
    Nome: pick("name"),
    "E-mail": pick("email"),
    WhatsApp: pick("whatsapp"),
    Empresa: pick("company"),
    Objetivo: pick("objective"),
    "Faturamento mensal": pick("revenue_range"),
    "Serviço de interesse": pick("service_interest"),
    Mensagem: pick("message"),
    "Página de envio": pick("source_page"),
    "Origem da conversão": pick("conversion_origin"),
    "UTM source / medium / campaign": [pick("utm_source"), pick("utm_medium"), pick("utm_campaign")].filter(Boolean).join(" / "),
    "Enviado em": new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
  };
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json", origin: site.url, referer: `${site.url}/` },
      body: JSON.stringify(Object.fromEntries(Object.entries(body).filter(([, v]) => v !== ""))),
    });
    if (!res.ok) console.error("[leads] e-mail failed", res.status);
    return res.ok;
  } catch (e) {
    console.error("[leads] e-mail failed", e instanceof Error ? e.message : e);
    return false;
  }
}

const RATE_WINDOW_MIN = 10;
const RATE_MAX = 5;

async function sha256(input: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Public endpoint that receives every site form. Validates on the server,
 * blocks bots (honeypot + fill time), rate-limits by hashed IP and only
 * reports success after the row is stored in the database.
 */
export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadPayloadSchema.parse(data))
  .handler(async ({ data }): Promise<SubmitLeadResult> => {
    const { form_type, meta } = data;

    if (meta.website || meta.elapsed_ms < MIN_FILL_MS) {
      return { ok: false, error: "spam", message: "Não foi possível enviar. Tente novamente em alguns segundos." };
    }

    const parsed = formSchemas[form_type].safeParse(data.fields);
    if (!parsed.success) {
      return { ok: false, error: "validation", message: "Revise os campos destacados e tente novamente." };
    }
    const f = parsed.data as Partial<Record<"name" | "company" | "email" | "whatsapp" | "objective" | "revenue_range" | "service_interest" | "message" | "contact", string>>;

    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      getRequestIP() ||
      "unknown";
    const ipHash = await sha256(`ello:${ip}`);
    const userAgent = (getRequestHeader("user-agent") || "").slice(0, 300);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since = new Date(Date.now() - RATE_WINDOW_MIN * 60_000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);
    if (countError) {
      // Sem o banco não dá para limitar envios, mas o lead ainda segue por e-mail.
      console.error("[leads] rate check failed", countError.message);
    }
    if ((count ?? 0) >= RATE_MAX) {
      return { ok: false, error: "rate_limited", message: "Recebemos vários envios seguidos. Aguarde alguns minutos ou chame no WhatsApp." };
    }

    const contact = f.contact;
    const contactIsEmail = !!contact && contact.includes("@");

    const row = {
      form_type,
      name: f.name ?? "",
      company: f.company || null,
      email: f.email || (contactIsEmail ? contact : null) || null,
      whatsapp: f.whatsapp || (!contactIsEmail && contact ? contact : null) || null,
      objective: f.objective || null,
      revenue_range: f.revenue_range || null,
      service_interest: f.service_interest || meta.service_slug || null,
      message: f.message || null,
      source_page: meta.source_page || null,
      conversion_origin: meta.conversion_origin || null,
      utm_source: meta.utm_source || null,
      utm_medium: meta.utm_medium || null,
      utm_campaign: meta.utm_campaign || null,
      utm_term: meta.utm_term || null,
      utm_content: meta.utm_content || null,
      referrer: meta.referrer || null,
      consent_privacy: true,
      ip_hash: ipHash,
      user_agent: userAgent,
    };

    const { error } = await supabaseAdmin.from("leads").insert(row);
    // Cópia por e-mail para a equipe. Se o banco falhar mas o e-mail sair, o lead não se perde.
    const emailed = await emailLead(row);
    if (error) {
      console.error("[leads] insert failed", error.message);
      if (!emailed) {
        return { ok: false, error: "unavailable", message: "Não conseguimos registrar seu envio. Tente de novo ou chame no WhatsApp." };
      }
    }

    // Optional forwarding to an external CRM/automation endpoint.
    const webhook = process.env["LEADS_WEBHOOK_URL"];
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...row, ip_hash: undefined, user_agent: undefined, created_at: new Date().toISOString() }),
        });
      } catch (e) {
        console.error("[leads] webhook forward failed", e instanceof Error ? e.message : e);
      }
    }

    return { ok: true };
  });
