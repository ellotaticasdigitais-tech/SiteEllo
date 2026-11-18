import { describe, expect, it } from "vitest";

import { cases } from "@/data/cases";
import { blogPosts } from "@/data/content";
import { plans } from "@/data/plans";
import { coreServices } from "@/data/services";
import { contatoSchema, diagnosticoSchema, labSchema, MIN_FILL_MS } from "@/lib/leads.schema";
import { topicForPath, whatsappLink } from "@/lib/whatsapp";

describe("WhatsApp", () => {
  it("uses the official number (19) 99865-0372", () => {
    expect(whatsappLink("geral")).toMatch(/^https:\/\/wa\.me\/5519998650372\?text=/);
  });

  it("pre-fills a traffic-specific message on the paid traffic page", () => {
    expect(topicForPath("/servicos/trafego-pago")).toBe("trafego");
    expect(decodeURIComponent(whatsappLink("trafego"))).toContain("tráfego pago");
  });
});

describe("Formulário diagnóstico", () => {
  const valid = { name: "Ana", company: "Loja X", whatsapp: "(19) 99865-0372", objective: "Gerar mais leads e vendas", consent: true };

  it("accepts nome, empresa, WhatsApp e objetivo", () => {
    const r = diagnosticoSchema.safeParse(valid);
    expect(r.success).toBe(true);
    expect(r.success && r.data.whatsapp).toBe("19998650372");
  });

  it("rejects a WhatsApp without DDD", () => {
    expect(diagnosticoSchema.safeParse({ ...valid, whatsapp: "99865-0372" }).success).toBe(false);
  });

  it("requires privacy consent", () => {
    expect(diagnosticoSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });
});

describe("Cadastro Ello Lab", () => {
  it("requires the monthly revenue range", () => {
    const r = labSchema.safeParse({ name: "Ana", company: "Loja X", email: "ana@x.com", whatsapp: "19998650372", revenue_range: "", consent: true });
    expect(r.success).toBe(false);
  });
});

describe("Contato comercial", () => {
  it("accepts either an e-mail or a WhatsApp in the same field", () => {
    const base = { name: "Ana", service_interest: "Tráfego Pago", message: "Quero crescer", consent: true };
    expect(contatoSchema.safeParse({ ...base, contact: "ana@empresa.com.br" }).success).toBe(true);
    expect(contatoSchema.safeParse({ ...base, contact: "(19) 99865-0372" }).success).toBe(true);
    expect(contatoSchema.safeParse({ ...base, contact: "abc" }).success).toBe(false);
  });
});

describe("Regras de conteúdo", () => {
  it("rejects bot submissions faster than 2.5s", () => {
    expect(MIN_FILL_MS).toBe(2500);
  });

  it("has the three approved plans and no prices", () => {
    expect(plans.map((p) => p.name)).toEqual(["Ello Performance", "Ello Expansão", "Ello Conexão"]);
    for (const p of plans) expect(JSON.stringify(p)).not.toMatch(/R\$\s?\d/);
  });

  it("lists the eight services from the wireframe", () => {
    expect(coreServices).toHaveLength(8);
  });

  it("keeps cases without authorization as drafts and has no fictional blog posts", () => {
    expect(cases.every((c) => c.status === "draft" || (c.results?.length ?? 0) > 0)).toBe(true);
    expect(blogPosts).toHaveLength(0);
  });
});
