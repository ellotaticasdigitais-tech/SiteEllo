import { describe, expect, it } from "vitest";

import { cases } from "@/data/cases";
import { blogPosts } from "@/data/content";
import { periodSavings, plans } from "@/data/plans";
import { coreServices } from "@/data/services";
import { contatoSchema, diagnosticoSchema, labSchema, MIN_FILL_MS } from "@/lib/leads.schema";
import { topicForPath, whatsappLink } from "@/lib/whatsapp";

describe("WhatsApp", () => {
  it("uses the Luma SDR WhatsApp (19) 93629-5679", () => {
    expect(whatsappLink("geral")).toMatch(/^https:\/\/wa\.me\/5519936295679\?text=/);
  });

  it("pre-fills a traffic-specific message on the paid traffic page", () => {
    expect(topicForPath("/servicos/trafego-pago")).toBe("trafego");
    expect(decodeURIComponent(whatsappLink("trafego"))).toContain("tráfego pago");
  });
});

describe("Formulário diagnóstico", () => {
  const valid = { name: "Ana", company: "Loja X", email: "ana@lojax.com.br", whatsapp: "(19) 99865-0372", objective: "Gerar mais leads e vendas", consent: true };

  it("accepts nome, empresa, e-mail, WhatsApp e objetivo", () => {
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
  it("requires an e-mail (needed by RD Station) and accepts an optional WhatsApp", () => {
    const base = { name: "Ana", service_interest: "Tráfego Pago", message: "Quero crescer", consent: true };
    expect(contatoSchema.safeParse({ ...base, email: "ana@empresa.com.br" }).success).toBe(true);
    expect(contatoSchema.safeParse({ ...base, email: "ana@empresa.com.br", whatsapp: "(19) 99865-0372" }).success).toBe(true);
    expect(contatoSchema.safeParse({ ...base, email: "abc" }).success).toBe(false);
    expect(contatoSchema.safeParse({ ...base, email: "ana@empresa.com.br", whatsapp: "123" }).success).toBe(false);
  });
});

describe("Regras de conteúdo", () => {
  it("rejects bot submissions faster than 2.5s", () => {
    expect(MIN_FILL_MS).toBe(2500);
  });

  it("has the three approved plans with consistent prices", () => {
    expect(plans.map((p) => p.name)).toEqual(["Ello Performance", "Ello Expansão", "Ello Conexão"]);
    const [performance, expansao, conexao] = plans;
    expect(performance?.prices?.mensal.monthly).toBe(2600);
    expect(expansao?.prices?.mensal.monthly).toBe(4950);
    expect(conexao?.prices).toBeUndefined();
    // anual: setup gratuito e economia de 20%
    expect(periodSavings(performance!, "anual")).toBe(6240);
    expect(periodSavings(expansao!, "anual")).toBe(11880);
    expect(performance?.prices?.anual.setup).toBe(0);
  });

  it("lists the eight services from the wireframe", () => {
    expect(coreServices).toHaveLength(8);
  });

  it("highlights the Ello case, only shows sourced numbers and has no fictional blog posts", () => {
    expect(cases.filter((c) => c.featured).map((c) => c.slug)).toEqual(["ello-taticas-digitais"]);
    // números só com fonte e período
    for (const c of cases) for (const r of c.results ?? []) expect(r.period).toBeTruthy();
    expect(blogPosts).toHaveLength(0);
  });
});
