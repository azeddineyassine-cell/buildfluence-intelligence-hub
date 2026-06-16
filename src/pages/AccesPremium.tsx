import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoBuildfluence from "@/assets/Logo_Buildfluence.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AccesPremiumRequestModal from "@/components/AccesPremiumRequestModal";

const AccesPremium = () => {
  const { t } = useLanguage();
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session) navigate("/acces-premium/dashboard", { replace: true });
  }, [loading, session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (err) {
      setError(t("Identifiants incorrects.", "Invalid credentials."));
      return;
    }
    navigate("/acces-premium/dashboard", { replace: true });
  };

  const handleReset = async () => {
    if (!email) {
      toast.error(t("Veuillez saisir votre email.", "Please enter your email."));
      return;
    }
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/acces-premium`,
    });
    if (err) toast.error(err.message);
    else toast.success(t("Email de réinitialisation envoyé.", "Reset email sent."));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: "#FFFFFF" }}>
      <a href="/" className="mb-10 flex items-center gap-3">
        <img src={logoBuildfluence} alt="Buildfluence" className="h-12 w-auto" />
        <span className="font-serif text-2xl tracking-tight">
          <span className="font-bold" style={{ color: "#0D1B2A" }}>Build</span>
          <span className="font-bold" style={{ color: "#FFDE59" }}>fluence</span>
        </span>
      </a>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[440px] p-10"
        style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        <h1 className="font-serif text-[28px] font-bold mb-2 text-center" style={{ color: "#0D1B2A" }}>
          {t("Accès Premium", "Premium Access")}
        </h1>
        <p className="text-[13px] text-center mb-8" style={{ color: "#4A5568" }}>
          {t("Espace exclusivement réservé aux clients Buildfluence", "Area exclusively reserved for Buildfluence clients")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-[14px] bg-[#F9FAFB] text-[#0D1B2A] placeholder:text-[#A0AEC0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
            style={{ border: "1px solid #E5E7EB" }}
          />
          <input
            type="password"
            required
            placeholder={t("Mot de passe", "Password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-[14px] bg-[#F9FAFB] text-[#0D1B2A] placeholder:text-[#A0AEC0] focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
            style={{ border: "1px solid #E5E7EB" }}
          />

          {error && (
            <div className="text-[12px] py-2 px-3" style={{ color: "#ff6b6b", background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.3)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 text-[12px] font-bold uppercase tracking-[0.22em] transition-all disabled:opacity-50"
            style={{ background: "#C9A84C", color: "#0D1B2A" }}
          >
            {submitting ? "..." : t("Accéder", "Access")}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="block mx-auto text-[12px] underline transition-colors"
            style={{ color: "#4A5568" }}
          >
            {t("Mot de passe oublié ?", "Forgot password?")}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AccesPremium;
