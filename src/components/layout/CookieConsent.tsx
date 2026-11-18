import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { loadGtm } from "@/lib/analytics";
import { getConsent, saveConsent, useConsent } from "@/lib/consent";

/** LGPD consent: nothing non-essential loads before the visitor decides. */
export function CookieConsent() {
  const consent = useConsent();
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      const c = getConsent();
      setAnalytics(!!c?.analytics);
      setMarketing(!!c?.marketing);
      setOpen(true);
    };
    window.addEventListener("ello:open-cookie-preferences", onOpen);
    return () => window.removeEventListener("ello:open-cookie-preferences", onOpen);
  }, []);

  useEffect(() => {
    if (consent?.analytics) loadGtm();
  }, [consent]);

  const decide = (a: boolean, m: boolean) => {
    saveConsent({ analytics: a, marketing: m });
    setOpen(false);
  };

  return (
    <>
      {consent === null && (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-6 rounded-3xl border border-border bg-card p-5 shadow-lift sm:inset-x-6 sm:bottom-6 sm:pr-24"
        >
          <div className="flex gap-4">
            <Cookie className="mt-1 size-6 shrink-0 text-plum" aria-hidden="true" />
            <div className="min-w-0 space-y-3">
              <p className="text-sm leading-relaxed text-foreground">
                Usamos cookies essenciais para o site funcionar. Com sua permissão, também usamos cookies de medição e
                marketing para entender a navegação e melhorar nossas campanhas.{" "}
                <Link to="/politica-de-cookies" className="font-semibold text-plum underline underline-offset-4">
                  Saiba mais
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="ink" size="sm" onClick={() => decide(true, true)}>
                  Aceitar todos
                </Button>
                <Button variant="outline-ink" size="sm" onClick={() => decide(false, false)}>
                  Recusar não essenciais
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAnalytics(false);
                    setMarketing(false);
                    setOpen(true);
                  }}
                >
                  Personalizar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Preferências de cookies</DialogTitle>
            <DialogDescription>Escolha quais categorias podem ser usadas. Você pode mudar isso quando quiser no rodapé.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <PrefRow title="Essenciais" text="Necessários para o funcionamento do site e para lembrar sua escolha." checked disabled />
            <PrefRow title="Medição" text="Google Analytics / Tag Manager para entender como o site é usado." checked={analytics} onChange={setAnalytics} />
            <PrefRow title="Marketing" text="Pixels de anúncios (Meta, Google Ads), quando ativados pela Ello." checked={marketing} onChange={setMarketing} />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline-ink" onClick={() => decide(false, false)}>
              Recusar não essenciais
            </Button>
            <Button variant="ink" onClick={() => decide(analytics, marketing)}>
              Salvar preferências
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PrefRow({ title, text, checked, disabled, onChange }: { title: string; text: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  const id = `pref-${title}`;
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-secondary p-4">
      <div className="min-w-0">
        <label htmlFor={id} className="font-semibold">
          {title}
        </label>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      <Switch id={id} checked={checked} disabled={!!disabled} onCheckedChange={(v) => onChange?.(v)} aria-label={title} />
    </div>
  );
}
