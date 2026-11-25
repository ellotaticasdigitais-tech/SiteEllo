import { z } from "zod";

const name = z.string().trim().min(2, "Informe seu nome").max(100, "Use até 100 caracteres");
const company = z.string().trim().min(2, "Informe o nome da empresa").max(120, "Use até 120 caracteres");
const email = z.string().trim().email("Informe um e-mail válido").max(255);
/** Brazilian phone: 10–11 digits (DDD + número), optional +55. */
export const whatsapp = z
  .string()
  .trim()
  .transform((v) => v.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, ""))
  .refine((v) => /^\d{10,11}$/.test(v), "Informe um WhatsApp com DDD");
const consent = z.literal(true, { errorMap: () => ({ message: "É preciso concordar com a Política de Privacidade" }) });

/** WhatsApp opcional: vazio é aceito; se preenchido, precisa ter DDD. */
const optionalWhatsapp = z
  .string()
  .trim()
  .transform((v) => v.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, ""))
  .refine((v) => v === "" || /^\d{10,11}$/.test(v), "Informe um WhatsApp com DDD")
  .optional();

export const diagnosticoSchema = z.object({
  name,
  company,
  email,
  whatsapp,
  objective: z.string().trim().min(2, "Escolha o principal objetivo").max(120),
  consent,
});

export const labSchema = z.object({
  name,
  company,
  email,
  whatsapp,
  revenue_range: z.string().trim().min(2, "Escolha a faixa de faturamento").max(80),
  consent,
});

export const contatoSchema = z.object({
  name,
  email,
  whatsapp: optionalWhatsapp,
  service_interest: z.string().trim().min(2, "Escolha um serviço").max(120),
  message: z.string().trim().min(5, "Escreva uma mensagem curta").max(1500, "Use até 1500 caracteres"),
  consent,
});

export const crmSchema = z.object({
  name,
  email,
  company: z.string().trim().max(120).optional().or(z.literal("")),
  consent,
});

export const servicoSchema = z.object({
  name,
  email,
  whatsapp,
  company: z.string().trim().max(120).optional().or(z.literal("")),
  consent,
});

export const formSchemas = {
  diagnostico: diagnosticoSchema,
  ello_lab: labSchema,
  contato: contatoSchema,
  crm_interesse: crmSchema,
  servico: servicoSchema,
} as const;

export type FormType = keyof typeof formSchemas;

export const metaSchema = z.object({
  source_page: z.string().max(300).optional(),
  conversion_origin: z.string().max(120).optional(),
  service_slug: z.string().max(120).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** ms since the form was rendered. Bots submit instantly. */
  elapsed_ms: z.number().int().min(0).max(86_400_000),
});

export const leadPayloadSchema = z.object({
  form_type: z.enum(["diagnostico", "ello_lab", "contato", "crm_interesse", "servico"]),
  fields: z.record(z.unknown()),
  meta: metaSchema,
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

/** Minimum time a human needs to fill the form (anti-spam). */
export const MIN_FILL_MS = 2500;
