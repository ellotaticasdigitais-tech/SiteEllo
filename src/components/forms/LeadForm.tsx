import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { submitLead } from "@/lib/leads.functions";
import { formSchemas, type FormType } from "@/lib/leads.schema";
import { getAttribution } from "@/lib/utm";
import { whatsappLink, type WhatsAppTopic } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  autoComplete?: string;
  optional?: boolean;
};

type Props = {
  formType: FormType;
  fields: FieldDef[];
  submitLabel: string;
  origin: string;
  purpose: string;
  serviceSlug?: string;
  whatsappTopic?: WhatsAppTopic;
  tone?: "light" | "dark";
  successTitle?: string;
  successText?: string;
  className?: string;
};

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

export function LeadForm({
  formType,
  fields,
  submitLabel,
  origin,
  purpose,
  serviceSlug,
  whatsappTopic = "geral",
  tone = "light",
  successTitle = "Recebemos seus dados!",
  successText = "Nossa equipe vai entrar em contato em breve com os próximos passos.",
  className,
}: Props) {
  const uid = useId();
  const submit = useServerFn(submitLead);
  const mountedAt = useRef(0);
  const started = useRef(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const schema = formSchemas[formType];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema as never),
    mode: "onTouched",
  });

  const onFocusCapture = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: formType, origin });
  };

  const onSubmit = handleSubmit(async (values) => {
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });
    const attribution = getAttribution();
    const website = (document.getElementById(`${uid}-website`) as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await submit({
        data: {
          form_type: formType,
          fields: values,
          meta: {
            source_page: window.location.pathname,
            conversion_origin: origin,
            service_slug: serviceSlug,
            utm_source: attribution.utm_source,
            utm_medium: attribution.utm_medium,
            utm_campaign: attribution.utm_campaign,
            utm_term: attribution.utm_term,
            utm_content: attribution.utm_content,
            referrer: attribution.referrer,
            website,
            elapsed_ms: Math.min(Date.now() - mountedAt.current, 86_400_000),
          },
        },
      });
      if (res.ok) {
        setStatus({ kind: "success" });
        reset();
        track("form_submit_success", { form: formType, origin });
        // Lead completo para o Google Tag Manager (de lá vai para o RD Station).
        const v = (k: string) => (typeof values[k as keyof typeof values] === "string" ? (values[k as keyof typeof values] as string) : undefined);
        track("ello_lead", {
          form: formType,
          origin,
          conversion_identifier: `site-ello-${formType}`,
          lead_name: v("name"),
          lead_email: v("email"),
          lead_phone: v("whatsapp"),
          lead_company: v("company"),
          lead_objective: v("objective"),
          lead_service: v("service_interest") ?? serviceSlug,
          lead_revenue: v("revenue_range"),
          lead_message: v("message"),
        });
        if (formType === "ello_lab") track("ello_lab_signup", { origin });
        else track("commercial_conversion", { form: formType, origin });
      } else {
        setStatus({ kind: "error", message: res.message });
        track("form_submit_error", { form: formType, origin, reason: res.error });
      }
    } catch {
      setStatus({ kind: "error", message: "Não foi possível enviar agora. Verifique sua conexão ou fale com a gente pelo WhatsApp." });
      track("form_submit_error", { form: formType, origin, reason: "network" });
    }
  });

  const dark = tone === "dark";
  const inputCls = cn(
    "w-full rounded-2xl border-2 px-4 py-3.5 text-base outline-none transition-[border-color,box-shadow,background-color] duration-200",
    "focus:border-sun focus:ring-4 focus:ring-sun/25",
    dark
      ? "border-ink-foreground/15 bg-ink-foreground/5 text-ink-foreground placeholder:text-ink-foreground/40"
      : "border-border bg-card text-foreground placeholder:text-muted-foreground/60",
  );

  if (status.kind === "success") {
    return (
      <div role="status" aria-live="polite" className={cn("animate-in fade-in zoom-in-95 rounded-3xl p-8 text-center", dark ? "bg-ink-foreground/10" : "bg-secondary", className)}>
        <CheckCircle2 className="mx-auto size-12 text-success" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-bold">{successTitle}</h3>
        <p className={cn("mt-2", dark ? "text-ink-foreground/80" : "text-muted-foreground")}>{successText}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="whatsapp">
            <a href={whatsappLink(whatsappTopic)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: `${origin}_success` })}>
              Adiantar pelo WhatsApp
            </a>
          </Button>
          <Button variant={dark ? "outline-light" : "outline-ink"} onClick={() => setStatus({ kind: "idle" })}>
            Enviar outro
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onFocusCapture={onFocusCapture} className={cn("space-y-4", className)} aria-describedby={`${uid}-purpose`}>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Não preencha este campo</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name]?.message as string | undefined;
        const common = {
          id,
          "aria-invalid": !!err,
          "aria-describedby": err ? `${id}-err` : undefined,
          className: inputCls,
          ...register(f.name),
        };
        return (
          <div key={f.name} className="space-y-1.5">
            <label htmlFor={id} className="block text-sm font-semibold">
              {f.label}
              {f.optional && <span className="font-normal opacity-60"> (opcional)</span>}
            </label>
            {f.type === "select" ? (
              <select {...common} defaultValue="" className={cn(inputCls, "appearance-none bg-[length:1rem] pr-10")}>
                <option value="" disabled>
                  Selecione
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o} className="text-ink">
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...common} rows={4} placeholder={f.placeholder} />
            ) : (
              <input {...common} type={f.type} inputMode={f.type === "tel" ? "tel" : undefined} placeholder={f.placeholder} autoComplete={f.autoComplete} />
            )}
            {err && (
              <p id={`${id}-err`} className="flex items-center gap-1.5 text-sm font-medium text-destructive" role="alert">
                <AlertCircle className="size-4" aria-hidden="true" /> {err}
              </p>
            )}
          </div>
        );
      })}

      <div className="space-y-1.5">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
          <input type="checkbox" {...register("consent")} className="mt-1 size-5 shrink-0 accent-[var(--violet)]" aria-invalid={!!errors["consent"]} />
          <span id={`${uid}-purpose`} className={dark ? "text-ink-foreground/80" : "text-muted-foreground"}>
            {purpose} Li e concordo com a{" "}
            <Link to="/politica-de-privacidade" className={cn("font-semibold underline underline-offset-4", dark ? "text-sun" : "text-plum")} target="_blank">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {errors["consent"] && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-destructive" role="alert">
            <AlertCircle className="size-4" aria-hidden="true" /> {String(errors["consent"]?.message)}
          </p>
        )}
      </div>

      {status.kind === "error" && (
        <div role="alert" className="flex gap-3 rounded-2xl border-2 border-destructive/40 bg-destructive/10 p-4 text-sm">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          <div>
            <p className="font-semibold">{status.message}</p>
            <a href={whatsappLink(whatsappTopic)} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      )}

      <Button type="submit" variant="sun" size="xl" className="group w-full" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? (
          <>
            <Loader2 className="animate-spin" /> Enviando…
          </>
        ) : (
          <>
            {submitLabel} <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}
