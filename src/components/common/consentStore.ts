export type ConsentLevel = "all" | "essential" | null;

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "yesbe-cookie-consent";
const PREFS_KEY = "yesbe-cookie-preferences";

export function getStoredConsent(): ConsentLevel {
  try {
    return localStorage.getItem(STORAGE_KEY) as ConsentLevel;
  } catch {
    return null;
  }
}

export function getStoredPreferences(): CookiePreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { essential: true, analytics: false, marketing: false };
}
