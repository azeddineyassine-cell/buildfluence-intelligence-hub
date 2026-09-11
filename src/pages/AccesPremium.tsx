import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoBuildfluence from "@/assets/Logo_Buildfluence.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AccesPremiumRequestModal from "@/components/AccesPremiumRequestModal";
import SEO from "@/components/SEO";

const AccesPremium = () => {
  const { t } = useLanguage();
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate("/acces-premium/dashboard", { replace: true });
  }, [loading, session, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("invite") === "1") setModalOpen(true);
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/acces-premium` } });
    setSent(true);
  };

  return (
    <>
      <SEO
        titleFr="Accès Premium · Espace client institutionnel"
        titleEn="Premium Access · Institutional Client Area"
        descriptionFr={"Espace client institutionnel Buildfluence. Accès aux livrables, tableaux de bord et ressources réservés aux clients sous mandat."}
        descriptionEn="Buildfluence institutional client area. Access to deliverables, dashboards and resources reserved for clients under mandate."
        path="/acces-premium"
      />
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: "#FFFFFF" }}>
      <a href="/" aria-label="Retour à l’accueil Buildfluence" className="mb-10 flex items-center gap-3 no-underline">
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

        {sent ? (
          <p className="text-[13px] text-center" style={{ color: "#4A5568" }}>
            {t("Vérifiez votre boîte mail.", "Check your inbox.")}
          </p>
        ) : (
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

            <button
              type="submit"
              className="w-full py-3 text-[12px] font-bold uppercase tracking-[0.22em] transition-all"
              style={{ background: "#C9A84C", color: "#0D1B2A" }}
            >
              {t("Recevoir mon lien de connexion", "Receive my access link")}
            </button>
          </form>
        )}
      </motion.div>
      <AccesPremiumRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLoginClick={() => setModalOpen(false)}
      />
    </div>
    </>
  );
};

export default AccesPremium;
