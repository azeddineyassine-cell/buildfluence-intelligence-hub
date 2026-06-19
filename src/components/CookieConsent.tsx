import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * RGPD cookie consent banner with granular opt-in.
 * Categories: necessary (always on), analytics, marketing.
 * Stores choice in localStorage with timestamp + version.
 * Exposes hasConsent(category) and dispatches `cookie-consent-change`
 * events so analytics/marketing scripts can be lazy-loaded after opt-in.
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

interface ConsentRecord {
  version: number;
  timestamp: string;
  categories: Record<ConsentCategory, boolean>;
}

const STORAGE_KEY = "bf_cookie_consent";
const CONSENT_VERSION = 1;
const OPEN_EVENT = "cookie-consent-open";
const CHANGE_EVENT = "cookie-consent-change";

const readConsent = (): ConsentRecord | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeConsent = (categories: Record<ConsentCategory, boolean>) => {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: { ...categories, necessary: true },
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* noop */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: record }));
  }
  return record;
};

export const hasConsent = (category: ConsentCategory): boolean => {
  if (category === "necessary") return true;
  const c = readConsent();
  return !!c?.categories?.[category];
};

export const openCookiePreferences = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
};

const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setAnalytics(!!existing.categories.analytics);
      setMarketing(!!existing.categories.marketing);
    }
    const openHandler = () => {
      const c = readConsent();
      if (c) {
        setAnalytics(!!c.categories.analytics);
        setMarketing(!!c.categories.marketing);
      }
      setShowPanel(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_EVENT, openHandler);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setShowPanel(false);
  }, []);

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, marketing: true });
    close();
  };
  const rejectAll = () => {
    writeConsent({ necessary: true, analytics: false, marketing: false });
    close();
  };
  const savePrefs = () => {
    writeConsent({ necessary: true, analytics, marketing });
    close();
  };

  if (!visible) return null;

  const navy = "hsl(var(--navy))";
  const gold = "hsl(var(--gold))";
  const cream = "hsl(30 20% 97%)";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("Préférences cookies", "Cookie preferences")}
      className="fixed inset-x-0 bottom-0 z-[9999] p-3 sm:p-5 flex justify-center pointer-events-none"
    >
      <div
        className="pointer-events-auto w-full max-w-[920px] rounded-2xl border"
        style={{
          background: cream,
          borderColor: "rgba(20,33,61,0.12)",
          boxShadow: "0 18px 50px -12px rgba(20,33,61,0.25)",
        }}
      >
        {!showPanel ? (
          <div className="p-5 sm:p-6">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{ color: gold }}
            >
              {t("Cookies", "Cookies")}
            </p>
            <h2
              className="font-serif text-[20px] sm:text-[22px] font-black mb-2"
              style={{ color: navy, letterSpacing: "-0.3px" }}
            >
              {t("Votre confidentialité", "Your privacy")}
            </h2>
            <p
              className="text-[13px] sm:text-[14px] leading-[1.6] mb-5"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {t(
                "Ce site utilise des cookies nécessaires à son fonctionnement et, avec votre accord, des cookies de mesure d'audience pour améliorer votre expérience. Vous pouvez accepter, refuser les non essentiels ou personnaliser vos choix à tout moment.",
                "This site uses necessary cookies and, with your agreement, audience measurement cookies to improve your experience. You can accept, reject non-essential cookies, or customize your choices at any time."
              )}{" "}
              <Link
                to="/politique-de-confidentialite"
                className="underline underline-offset-2"
                style={{ color: navy }}
              >
                {t("Politique de confidentialité", "Privacy policy")}
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.05em] rounded-md transition-opacity"
                style={{ background: navy, color: "#fff" }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {t("Tout accepter", "Accept all")}
              </button>
              <button
                onClick={rejectAll}
                className="px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.05em] rounded-md border transition-colors"
                style={{
                  background: "transparent",
                  color: navy,
                  borderColor: "rgba(20,33,61,0.25)",
                }}
              >
                {t("Refuser les non essentiels", "Reject non-essential")}
              </button>
              <button
                onClick={() => setShowPanel(true)}
                className="px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.05em] rounded-md transition-colors"
                style={{ background: "transparent", color: gold }}
              >
                {t("Personnaliser", "Customize")}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1"
                  style={{ color: gold }}
                >
                  {t("Préférences", "Preferences")}
                </p>
                <h2
                  className="font-serif text-[20px] font-black"
                  style={{ color: navy, letterSpacing: "-0.3px" }}
                >
                  {t("Personnaliser les cookies", "Customize cookies")}
                </h2>
              </div>
              <button
                onClick={close}
                aria-label={t("Fermer", "Close")}
                className="text-[20px] leading-none px-2"
                style={{ color: navy, background: "none", border: "none", cursor: "pointer" }}
              >
                ×
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <CategoryRow
                title={t("Nécessaires", "Necessary")}
                description={t(
                  "Indispensables au fonctionnement du site. Toujours actifs.",
                  "Essential to the operation of the site. Always active."
                )}
                checked
                disabled
              />
              <CategoryRow
                title={t("Mesure d'audience", "Audience measurement")}
                description={t(
                  "Statistiques anonymes pour comprendre l'usage du site.",
                  "Anonymous statistics to understand site usage."
                )}
                checked={analytics}
                onChange={setAnalytics}
              />
              <CategoryRow
                title={t("Marketing", "Marketing")}
                description={t(
                  "Personnalisation et mesure de campagnes de communication.",
                  "Personalization and measurement of communication campaigns."
                )}
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
              <button
                onClick={rejectAll}
                className="px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.05em] rounded-md border"
                style={{
                  background: "transparent",
                  color: navy,
                  borderColor: "rgba(20,33,61,0.25)",
                }}
              >
                {t("Tout refuser", "Reject all")}
              </button>
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.05em] rounded-md border"
                style={{
                  background: "transparent",
                  color: navy,
                  borderColor: "rgba(20,33,61,0.25)",
                }}
              >
                {t("Tout accepter", "Accept all")}
              </button>
              <button
                onClick={savePrefs}
                className="px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.05em] rounded-md transition-opacity"
                style={{ background: navy, color: "#fff" }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {t("Enregistrer mes choix", "Save my choices")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface CategoryRowProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}

const CategoryRow = ({ title, description, checked, disabled, onChange }: CategoryRowProps) => {
  const navy = "hsl(var(--navy))";
  const gold = "hsl(var(--gold))";
  return (
    <div
      className="flex items-start justify-between gap-4 p-3 rounded-lg border"
      style={{ borderColor: "rgba(20,33,61,0.1)", background: "#fff" }}
    >
      <div className="flex-1">
        <p className="text-[13px] font-bold mb-0.5" style={{ color: navy }}>
          {title}
        </p>
        <p className="text-[12px] leading-[1.5]" style={{ color: "hsl(var(--muted-foreground))" }}>
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className="relative shrink-0 mt-1 inline-flex h-6 w-11 items-center rounded-full transition-colors"
        style={{
          background: checked ? gold : "rgba(20,33,61,0.18)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <span
          className="inline-block h-5 w-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  );
};

export default CookieConsent;
