import { site } from "@/data/site";

import { getConsent } from "./consent";

/**
 * Event names documented in docs/ANALYTICS.md.
 * Events are only pushed to the GTM dataLayer after analytics consent.
 */
export type AnalyticsEvent =
  | "whatsapp_click"
  | "cta_click"
  | "form_start"
  | "form_submit_success"
  | "form_submit_error"
  | "service_click"
  | "plan_click"
  | "case_view"
  | "ello_lab_signup"
  | "commercial_conversion"
  | "ello_lead";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const consent = getConsent();
  if (!consent?.analytics) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}

let gtmLoaded = false;

/** Loads Google Tag Manager once, only after consent and only when an ID is configured. */
export function loadGtm() {
  const id = (import.meta.env["VITE_GTM_ID"] as string | undefined) || site.gtmId;
  if (gtmLoaded || !id || typeof document === "undefined") return;
  if (!getConsent()?.analytics) return;
  gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}
