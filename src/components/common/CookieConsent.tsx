import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, X, Check, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStoredConsent, getStoredPreferences, type ConsentLevel, type CookiePreferences } from "./consentStore";

export { getStoredConsent, getStoredPreferences };
export type { ConsentLevel, CookiePreferences };

const STORAGE_KEY = "yesbe-cookie-consent";
const PREFS_KEY = "yesbe-cookie-preferences";

function Toggle({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      onClick={onToggle}
      className={
        "flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors duration-200 " +
        (checked ? "bg-primary" : "bg-border")
      }
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <div
        className={
          "h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 " +
          (checked ? "translate-x-5" : "translate-x-0")
        }
      />
    </button>
  );
}

function CookieConsentComponent() {
  const [consent, setConsent] = useState<ConsentLevel>(getStoredConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(getStoredPreferences);
  const navigate = useNavigate();

  useEffect(() => {
    if (consent === null) {
      const t = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(t);
    }
  }, [consent]);

  const saveConsent = useCallback((level: ConsentLevel, preferences?: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, level || "");
      if (preferences) {
        localStorage.setItem(PREFS_KEY, JSON.stringify(preferences));
      }
    } catch { /* ignore */ }
    setConsent(level);
    setShowBanner(false);
    setShowCustomize(false);

    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", {
        detail: { level, preferences: preferences || getStoredPreferences() },
      })
    );
  }, []);

  const handleAcceptAll = () => {
    const allPrefs = { essential: true, analytics: true, marketing: true };
    setPrefs(allPrefs);
    saveConsent("all", allPrefs);
  };

  const handleEssentialOnly = () => {
    const essentialPrefs = { essential: true, analytics: false, marketing: false };
    setPrefs(essentialPrefs);
    saveConsent("essential", essentialPrefs);
  };

  const handleSavePreferences = () => {
    const finalPrefs = { ...prefs, essential: true };
    setPrefs(finalPrefs);
    saveConsent(prefs.analytics || prefs.marketing ? "all" : "essential", finalPrefs);
  };

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === "essential") return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (consent !== null) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/20 backdrop-blur-sm xl:hidden"
            onClick={handleEssentialOnly}
          />

          {/* Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[151] p-3 sm:p-4 lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-lg"
          >
            <div className="rounded-2xl border border-white/60 bg-white/95 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-2xl sm:p-6">
              {/* Header */}
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08]">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-foreground">
                    We value your privacy
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                  </p>
                </div>
                <button
                  onClick={handleEssentialOnly}
                  className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Dismiss cookie banner"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Customize Panel */}
              <AnimatePresence>
                {showCustomize && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-4 space-y-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Essential Cookies</p>
                          <p className="text-xs text-muted-foreground">Required for basic site functionality</p>
                        </div>
                        <div className="flex h-6 w-11 shrink-0 items-center rounded-full bg-primary px-0.5">
                          <div className="h-5 w-5 rounded-full bg-white shadow-sm translate-x-5" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Analytics Cookies</p>
                          <p className="text-xs text-muted-foreground">Help us understand site usage</p>
                        </div>
                        <Toggle
                          checked={prefs.analytics}
                          onToggle={() => handleToggle("analytics")}
                          label="Toggle analytics cookies"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Marketing Cookies</p>
                          <p className="text-xs text-muted-foreground">Used for personalized advertisements</p>
                        </div>
                        <Toggle
                          checked={prefs.marketing}
                          onToggle={() => handleToggle("marketing")}
                          label="Toggle marketing cookies"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Settings className="h-3.5 w-3.5" />
                  {showCustomize ? "Hide preferences" : "Customize"}
                  <ChevronDown
                    className={
                      "h-3.5 w-3.5 transition-transform duration-200 " +
                      (showCustomize ? "rotate-180" : "")
                    }
                  />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleEssentialOnly}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-[13px] font-semibold text-foreground shadow-sm transition-all duration-200 hover:bg-muted"
                  >
                    Essential Only
                  </button>
                  {showCustomize && (
                    <button
                      onClick={handleSavePreferences}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/[0.06] px-4 py-3 text-[13px] font-semibold text-primary shadow-sm transition-all duration-200 hover:bg-primary/10"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Save
                    </button>
                  )}
                  <button
                    onClick={handleAcceptAll}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_1px_4px_rgba(37,99,235,0.2)] transition-all duration-200 hover:shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
                  >
                    Accept All
                  </button>
                </div>
              </div>

              {/* Policy Links */}
              <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                <button
                  onClick={() => { navigate("/privacy-policy"); setShowBanner(false); }}
                  className="hover:text-primary transition-colors underline underline-offset-2"
                >
                  Privacy Policy
                </button>
                <span className="text-border">|</span>
                <button
                  onClick={() => { navigate("/cookie-policy"); setShowBanner(false); }}
                  className="hover:text-primary transition-colors underline underline-offset-2"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export const CookieConsent = memo(CookieConsentComponent);
