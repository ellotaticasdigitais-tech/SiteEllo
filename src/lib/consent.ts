import { useSyncExternalStore } from "react";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

const KEY = "ello-consent-v1";
const listeners = new Set<() => void>();
let cached: ConsentState | null | undefined;

function read(): ConsentState | null {
  if (typeof window === "undefined") return null;
  if (cached !== undefined) return cached;
  try {
    const raw = window.localStorage.getItem(KEY);
    cached = raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    cached = null;
  }
  return cached;
}

export function getConsent() {
  return read();
}

export function saveConsent(next: { analytics: boolean; marketing: boolean }) {
  const value: ConsentState = { necessary: true, ...next, decidedAt: new Date().toISOString() };
  cached = value;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep in memory */
  }
  listeners.forEach((l) => l());
  window.dispatchEvent(new CustomEvent("ello:consent", { detail: value }));
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Returns undefined during SSR/first render, null when undecided. */
export function useConsent() {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => undefined,
  );
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent("ello:open-cookie-preferences"));
}
