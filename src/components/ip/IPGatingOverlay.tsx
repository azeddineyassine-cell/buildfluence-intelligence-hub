import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import IPAuthModal from "./IPAuthModal";

const NAVY = "#0D1B2A";
const GOLD = "#C9A84C";

type PanelSlug = "classements" | "cartographie" | "acteurs";

interface Props {
  panel: PanelSlug;
}

const COPY: Record<PanelSlug, { fr: { t: string; d: string }; en: { t: string; d: string }; requires: "registered" | "premium" }> = {
  classements: {
    fr: { t: "Classement complet réservé aux inscrits", d: "Créez un accès gratuit pour consulter le classement IBDN® intégral des partis et personnalités." },
    en: { t: "Full ranking reserved for registered users", d: "Create a free account to view the complete IBDN® ranking of parties and figures." },
    requires: "registered",
  },
  cartographie: {
    fr: { t: "Cartographie complète sur invitation", d: "Deux régions sont visibles librement. L'accès aux douze régions est réservé aux utilisateurs Premium." },
    en: { t: "Full mapping by invitation", d: "Two regions are openly visible. Access to all twelve regions is reserved for Premium users." },
    requires: "premium",
  },
  acteurs: {
    fr: { t: "Analyse des acteurs sur invitation", d: "Le premier candidat est en accès libre. Les autres analyses sont réservées aux utilisateurs Premium." },
    en: { t: "Actor analysis by invitation", d: "The first candidate is openly visible. Other analyses are reserved for Premium users." },
    requires: "premium",
  },
};

const IPGatingOverlay = ({ panel }: Props) => {
  const { session, role, loading } = useAuth();
  const { t, lang } = useLanguage();
  const [authOpen, setAuthOpen] = useState(false);
  const [reqSent, setReqSent] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const [reqError, setReqError] = useState<string | null>(null);

  if (loading) return null;

  const cfg = COPY[panel];
  const authorized = cfg.requires === "registered"
    ? role === "registered" || role === "premium"
    : role === "premium";

  if (authorized) return null;

  const copy = lang === "en" ? cfg.en : cfg.fr;

  const requestInvitation = async () => {
    if (!session?.user) { setAuthOpen(true); return; }
    setReqLoading(true); setReqError(null);
    try {
      // Types not yet regenerated for new tables — cast client.
      const { error } = await (supabase as unknown as {
        from: (t: string) => { insert: (row: Record<string, unknown>) => Promise<{ error: unknown }> };
      }).from("invitation_requests").insert({ user_id: session.user.id, status: "pending" });
      if (error) throw error;
      setReqSent(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setReqError(msg);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <>
      <div
        className="absolute left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
        style={{
          bottom: "6vh",
          width: "min(92vw, 520px)",
          background: "rgba(13,27,42,0.96)",
          border: `1px solid ${GOLD}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          color: "#F5F0E5",
          padding: "22px 26px",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            border: `1px solid ${GOLD}`, display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
            color: GOLD,
          }}>
            <Lock className="h-4 w-4" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>
              {cfg.requires === "registered" ? t("Accès inscrit", "Registered access") : t("Accès Premium", "Premium access")}
            </div>
            <div className="font-serif" style={{ fontSize: 17, lineHeight: 1.35, fontWeight: 600, marginBottom: 8 }}>
              {copy.t}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(245,240,229,0.72)", margin: 0 }}>
              {copy.d}
            </p>

            {reqSent ? (
              <div className="mt-4 py-2 px-3 text-[12px]" style={{ background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD}`, color: "#F5F0E5" }}>
                {t("Demande envoyée, notre équipe vous recontacte.", "Request sent, our team will get back to you.")}
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {cfg.requires === "registered" ? (
                  <>
                    {!session && (
                      <button onClick={() => setAuthOpen(true)}
                        className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em]"
                        style={{ background: GOLD, color: NAVY }}>
                        {t("Créer un accès gratuit", "Create a free access")}
                      </button>
                    )}
                    {!session && (
                      <button onClick={() => setAuthOpen(true)}
                        className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em]"
                        style={{ background: "transparent", color: "#F5F0E5", border: "1px solid rgba(245,240,229,0.35)" }}>
                        {t("Se connecter", "Sign in")}
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button onClick={requestInvitation} disabled={reqLoading}
                      className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-50 flex items-center gap-2"
                      style={{ background: GOLD, color: NAVY }}>
                      <Mail className="h-3.5 w-3.5" />
                      {reqLoading ? "..." : t("Demander une invitation", "Request an invitation")}
                    </button>
                    {!session && (
                      <button onClick={() => setAuthOpen(true)}
                        className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em]"
                        style={{ background: "transparent", color: "#F5F0E5", border: "1px solid rgba(245,240,229,0.35)" }}>
                        {t("Se connecter", "Sign in")}
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {reqError && (
              <div className="mt-3 py-2 px-3 text-[12px]" style={{ color: "#fecaca", background: "rgba(185,28,28,0.15)", border: "1px solid rgba(185,28,28,0.4)" }}>
                {reqError}
              </div>
            )}
          </div>
        </div>
      </div>

      <IPAuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default IPGatingOverlay;
