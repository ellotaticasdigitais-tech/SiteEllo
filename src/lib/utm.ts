const KEY = "ello-attribution-v1";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** Captures first-touch UTMs for the session (sessionStorage, no cookies). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM_KEYS.some((k) => params.get(k));
    const existing = window.sessionStorage.getItem(KEY);
    if (existing && !hasUtm) return;
    const data: Attribution = { landing_page: window.location.pathname };
    if (document.referrer) data.referrer = document.referrer.slice(0, 500);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 200);
    }
    window.sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}
