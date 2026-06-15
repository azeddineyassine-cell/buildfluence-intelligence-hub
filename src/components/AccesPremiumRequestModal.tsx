import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const NAVY = "#0D1B2A";
const GOLD = "#C9A84C";

const AccesPremiumRequestModal = ({ open, onClose, onLoginClick }: Props) => {
  const { t, lang } = useLanguage();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      // reset on close
      setTimeout(() => {
        setForm({ name: "", email: "", phone: "", organization: "", message: "" });
        setSuccess(false);
        setError(null);
        setSubmitting(false);
      }, 200);
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    if (!form.name.trim()) return t("Veuillez indiquer votre nom.", "Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return t("Email invalide.", "Invalid email.");
    if (!form.phone.trim()) return t("Veuillez indiquer un téléphone.", "Please enter a phone number.");
    if (!form.organization.trim()) return t("Veuillez indiquer votre société.", "Please enter your organization.");
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) { setError(v); return; }
    setSubmitting(true);
    try {
      const { error: err } = await supabase.functions.invoke("send-access-request", {
        body: { ...form, langue: lang },
      });
      if (err) throw err;
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(t("Une erreur est survenue. Réessayez ou écrivez-nous à info@buildfluence.ai.", "Something went wrong. Please retry or email info@buildfluence.ai."));
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    color: NAVY,
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="acces-premium-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(13, 27, 42, 0.72)", backdropFilter: "blur(4px)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-[520px] max-h-[92vh] overflow-y-auto"
        style={{ background: "#FFFFFF", border: `1px solid ${GOLD}`, boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label={t("Fermer", "Close")}
          className="absolute top-3 right-3 p-2 transition-opacity hover:opacity-70"
          style={{ color: NAVY }}
        >
          <X className="h-5 w-5" />
        </button>

        <div style={{ borderBottom: `2px solid ${GOLD}`, padding: "28px 32px 20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
            Buildfluence · {t("Accès Premium", "Premium Access")}
          </div>
          <h2 id="acces-premium-modal-title" className="font-serif" style={{ color: NAVY, fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
            {t("Espace réservé sur invitation", "Invitation-only area")}
          </h2>
          <p style={{ color: "#4A5568", fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>
            {t(
              "L'Accès Premium est réservé à nos clients et partenaires. Pour en faire la demande, complétez ce court formulaire — nous reviendrons vers vous personnellement.",
              "Premium Access is reserved for our clients and partners. To request access, fill in this short form — we will personally get back to you."
            )}
          </p>
        </div>

        {success ? (
          <div style={{ padding: "32px" }}>
            <div style={{ padding: "20px", background: "rgba(201,168,76,0.08)", border: `1px solid ${GOLD}`, color: NAVY, fontSize: 14, lineHeight: 1.6 }}>
              {t(
                "Votre demande a bien été envoyée, nous vous recontacterons.",
                "Your request has been sent. We will get back to you shortly."
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-[12px] font-bold uppercase tracking-[0.22em] transition-all mt-6"
              style={{ background: NAVY, color: GOLD }}
            >
              {t("Fermer", "Close")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3" style={{ padding: "24px 32px 28px" }}>
            <input
              ref={firstFieldRef}
              type="text"
              required
              placeholder={t("Nom complet", "Full name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 text-[14px] focus:outline-none focus:ring-1"
              style={{ ...inputStyle, boxShadow: "none" }}
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 text-[14px] focus:outline-none focus:ring-1"
              style={inputStyle}
            />
            <input
              type="tel"
              required
              placeholder={t("Téléphone", "Phone")}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 text-[14px] focus:outline-none focus:ring-1"
              style={inputStyle}
            />
            <input
              type="text"
              required
              placeholder={t("Société / Organisation", "Company / Organization")}
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              className="w-full px-4 py-3 text-[14px] focus:outline-none focus:ring-1"
              style={inputStyle}
            />
            <textarea
              placeholder={t("Message (optionnel)", "Message (optional)")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 text-[14px] focus:outline-none focus:ring-1 resize-none"
              style={inputStyle}
            />

            {error && (
              <div className="text-[12px] py-2 px-3" style={{ color: "#b91c1c", background: "rgba(185,28,28,0.06)", border: "1px solid rgba(185,28,28,0.25)" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 text-[12px] font-bold uppercase tracking-[0.22em] transition-all disabled:opacity-50"
              style={{ background: GOLD, color: NAVY }}
            >
              {submitting ? "..." : t("Envoyer la demande", "Send request")}
            </button>

            <button
              type="button"
              onClick={() => { onClose(); onLoginClick(); }}
              className="block mx-auto text-[12px] underline transition-colors pt-2"
              style={{ color: "#4A5568" }}
            >
              {t("J'ai déjà un accès", "I already have access")}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default AccesPremiumRequestModal;
