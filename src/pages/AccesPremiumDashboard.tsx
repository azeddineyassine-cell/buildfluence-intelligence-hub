import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoBuildfluence from "@/assets/Logo_Buildfluence.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

const AccesPremiumDashboard = () => {
  const { t, lang } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/acces-premium", { replace: true });
  };

  const benchmarkFile = lang === "en" ? "/benchmark-api-en.html" : "/benchmark-api-fr.html";
  const benchmarkSrc = `${benchmarkFile}?lang=${lang}`;

  const sideCards = [
    { title: t("Baromètre Sectoriel", "Sector Barometer"), icon: "📊", desc: t("Indicateurs sectoriels stratégiques mis à jour en continu.", "Strategic sector indicators continuously updated.") },
    { title: t("Observatoire d'Investissement", "Investment Observatory"), icon: "🔭", desc: t("Suivi des flux d'investissement et signaux faibles.", "Investment flow tracking and weak-signal monitoring.") },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0D1B2A" }}>
      <header className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <a href="/" className="flex items-center gap-3">
          <img src={logoBuildfluence} alt="Buildfluence" className="h-9 w-auto" />
          <span className="font-serif text-lg tracking-tight">
            <span className="font-bold" style={{ color: "#FFFFFF" }}>Build</span>
            <span className="font-bold" style={{ color: "#FFDE59" }}>fluence</span>
          </span>
        </a>
        <button
          onClick={handleSignOut}
          className="px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] transition-all"
          style={{ border: "1px solid #C9A84C", color: "#C9A84C", background: "transparent" }}
        >
          {t("Déconnexion", "Sign out")}
        </button>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 py-16">
        <h1 className="font-serif text-[40px] font-bold mb-12" style={{ color: "#FFFFFF" }}>
          {t("Accès Premium — Espace Réservé Clients", "Premium Access — Reserved Client Area")}
        </h1>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 p-8"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.25)" }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-[28px] font-bold mb-2" style={{ color: "#FFFFFF" }}>
                {t("Benchmark API Mondial", "Global API Benchmark")}
              </h2>
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                {t("6 agences mondiales · Analyse complète · Mai 2026", "6 global agencies · Full analysis · May 2026")}
              </p>
            </div>
            <button
              onClick={() => window.open(benchmarkSrc, "_blank")}
              className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] transition-all"
              style={{ background: "#C9A84C", color: "#0D1B2A", border: "1px solid #C9A84C" }}
            >
              {t("Ouvrir en plein écran →", "Open fullscreen →")}
            </button>
          </div>
          <iframe
            key={benchmarkSrc}
            src={benchmarkSrc}
            title={t("Benchmark API Mondial", "Global API Benchmark")}
            style={{
              width: "100%",
              height: "900px",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
              background: "#FAF6ED",
            }}
          />
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-serif text-[20px] font-bold mb-3" style={{ color: "#FFFFFF" }}>{c.title}</h3>
              <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>{c.desc}</p>
              <span
                className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.4)" }}
              >
                {t("Disponible", "Available")}
              </span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AccesPremiumDashboard;
