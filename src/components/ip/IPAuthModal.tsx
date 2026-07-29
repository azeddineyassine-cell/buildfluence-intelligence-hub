import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const NAVY = "#0D1B2A";
const GOLD = "#C9A84C";

interface Props {
  open: boolean;
  onClose: () => void;
}

const IPAuthModal = ({ open, onClose }: Props) => {
  const { t } = useLanguage();
  const { refreshRole } = useAuth();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setEmail(""); setPassword(""); setError(null); setInfo(null); setLoading(false);
      }, 200);
      return;
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setInfo(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t("Email invalide.", "Invalid email.")); return;
    }
    if (password.length < 8) {
      setError(t("Mot de passe : 8 caractères minimum.", "Password: 8 characters minimum.")); return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/insights-resources/intelligence-politique/classements` },
        });
        if (err) throw err;
        await refreshRole();
        setInfo(t(
          "Compte créé. Si la confirmation email est activée, cliquez sur le lien reçu ; sinon votre accès est déjà actif.",
          "Account created. If email confirmation is enabled, click the link you received; otherwise your access is already active."
        ));
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (err) throw err;
        await refreshRole();
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = { background: "#F9FAFB", border: "1px solid #E5E7EB", color: NAVY };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(13,27,42,0.72)", backdropFilter: "blur(4px)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[460px] max-h-[92vh] overflow-y-auto"
        style={{ background: "#FFFFFF", border: `1px solid ${GOLD}`, boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
        <button type="button" onClick={onClose} aria-label={t("Fermer","Close")}
          className="absolute top-3 right-3 p-2 transition-opacity hover:opacity-70" style={{ color: NAVY }}>
          <X className="h-5 w-5" />
        </button>

        <div style={{ borderBottom: `2px solid ${GOLD}`, padding: "28px 32px 20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
            Buildfluence · Intelligence Politique
          </div>
          <h2 className="font-serif" style={{ color: NAVY, fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
            {mode === "signup" ? t("Créer un accès gratuit", "Create a free access") : t("Se connecter", "Sign in")}
          </h2>
          <p style={{ color: "#4A5568", fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>
            {t(
              "Accès gratuit aux classements. Aucune carte bancaire, seul votre email est demandé.",
              "Free access to rankings. No credit card, only your email is required."
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3" style={{ padding: "24px 32px 28px" }}>
          <input type="email" required placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-[14px] focus:outline-none focus:ring-1" style={inputStyle} />
          <input type="password" required placeholder={t("Mot de passe (8+ caractères)", "Password (8+ characters)")}
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-[14px] focus:outline-none focus:ring-1" style={inputStyle} />

          {error && (
            <div className="text-[12px] py-2 px-3" style={{ color: "#b91c1c", background: "rgba(185,28,28,0.06)", border: "1px solid rgba(185,28,28,0.25)" }}>{error}</div>
          )}
          {info && (
            <div className="text-[12px] py-2 px-3" style={{ color: NAVY, background: "rgba(201,168,76,0.08)", border: `1px solid ${GOLD}` }}>{info}</div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 text-[12px] font-bold uppercase tracking-[0.22em] transition-all disabled:opacity-50"
            style={{ background: GOLD, color: NAVY }}>
            {loading ? "..." : mode === "signup" ? t("Créer mon accès", "Create my access") : t("Se connecter", "Sign in")}
          </button>

          <button type="button" onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(null); setInfo(null); }}
            className="block mx-auto text-[12px] underline transition-colors pt-2" style={{ color: "#4A5568" }}>
            {mode === "signup" ? t("J'ai déjà un accès", "I already have an account") : t("Créer un accès gratuit", "Create a free access")}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default IPAuthModal;
