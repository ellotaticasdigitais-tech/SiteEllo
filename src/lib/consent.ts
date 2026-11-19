import { useSyncExternalStore } from "react"; // React 18+ hook for subscribing to external stores

export type ConsentState = {
  necessary: true;// always true, since necessary cookies are required for the site to function
  analytics: boolean;
  marketing: boolean; // whether the user has consented to marketing cookies
  decidedAt: string; 
};

const KEY = "ello-consent-v1";
const listeners = new Set<() => void>();
let cached: ConsentState | null | undefined; // undefined = not yet read, null = undecided, ConsentState = decided

function read(): ConsentState | null {
  if (typeof window === "undefined") return null; // SSR: no localStorage, so return null (undecided)
  if (cached !== undefined) return cached; // return cached value if already read
  try {
    const raw = window.localStorage.getItem(KEY); 
    cached = raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    cached = null; // storage unavailable — keep in memory
  }
  return cached;
}

export function getConsent() { // returns undefined during SSR/first render, null when undecided
  return read(); // returns undefined during SSR/first render, null when undecided
}

export function saveConsent(next: { analytics: boolean; marketing: boolean }) {
  const value: ConsentState = { necessary: true, ...next, decidedAt: new Date().toISOString() };
  cached = value; //  cache in memory for immediate access
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep in memory */
  }
  listeners.forEach((l) => l()); // notify subscribers of the change
  window.dispatchEvent(new CustomEvent("ello:consent", { detail: value }));
}

function subscribe(cb: () => void) {
  listeners.add(cb); // add the callback to the set of listeners
  return () => listeners.delete(cb);
}

/** Returns undefined during SSR/first render, null when undecided. */
export function useConsent() { // React hook for subscribing to consent state changes
  return useSyncExternalStore(
    subscribe, // subscribe
    () => read(), // getSnapshot
    () => undefined,
  );
}

export function openCookiePreferences() { // function to open the cookie preferences modal
  window.dispatchEvent(new CustomEvent("ello:open-cookie-preferences")); // used by the cookie banner to open the preferences modal
}