export type ConsentLevel = "all" | "essential" | null;

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const STORAGE_KEY = "yesbe-cookie-consent";
export const PREFS_KEY = "yesbe-cookie-preferences";

export function getStoredConsent(): ConsentLevel {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "all" || value === "essential" ? value : null;
  } catch {
    return null;
  }
}

export function getStoredPreferences(): CookiePreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
      return {
        essential: true,
        analytics: parsed.analytics === true,
        marketing: parsed.marketing === true,
      };
    }
  } catch { /* ignore */ }
  return { essential: true, analytics: false, marketing: false };
}

/**
 * Analytics may only run when the visitor has explicitly granted it.
 *
 * A stored "all" level is honoured only if the granular preferences still say
 * analytics is enabled, so an older/partial record cannot silently opt a
 * visitor back in.
 */
export function hasAnalyticsConsent(): boolean {
  const level = getStoredConsent();
  if (level === null) return false;
  if (level === "essential") return false;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return true;
    return getStoredPreferences().analytics === true;
  } catch {
    return true;
  }
}
