import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoBuildfluence from "@/assets/Logo_Buildfluence.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

type DashboardCard = {
  eyebrow: string;
  title: string;
  desc: string;
  ctaLabel: string;
  href: string;
};

const AccesPremiumDashboard = () => {
  const { t, lang } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/acces-premium", { replace: true });
  };

  const benchmarkSrc = `/benchmark-api-interactif.html?lang=${lang}`;

  const cards: DashboardCard[] = [
    {
      eyebrow: t(
        "BENCHMARK API : 6 AGENCES MONDIALES : MAI 2026",
        "API BENCHMARK : 6 GLOBAL AGENCIES : MAY 2026"
      ),
      title: t("Benchmark API Mondial", "Global API Benchmark"),
      desc: t(
        "Analyse comparative complète des six agences de référence à l'international.",
        "Comprehensive comparative analysis of the six leading international agencies."
      ),
      ctaLabel: t("OUVRIR EN PLEIN ÉCRAN", "OPEN FULLSCREEN"),
      href: benchmarkSrc,
    },
    {
      eyebrow: t(
        "BAROMÈTRE : 18 PAYS : 24 500 DONNÉES : 9 SECTEURS",
        "BAROMETER : 18 COUNTRIES : 24,500 DATA POINTS : 9 SECTORS"
      ),
      title: t("Baromètre d'Investissement", "Investment Barometer"),
      desc: t(
        "Lecture stratégique des flux d'investissement par pays et secteur.",
        "Strategic reading of investment flows by country and sector."
      ),
      ctaLabel: t("TÉLÉCHARGER EN PDF", "DOWNLOAD PDF"),
      href: "https://cdnc.heyzine.com/files/uploaded/d864915be05bc87e9a8565a09a28b2c62b9c23d0.pdf",
    },
    {
      eyebrow: t(
        "OBSERVATOIRE : SIGNAUX FAIBLES : FLUX CAPITAUX",
        "OBSERVATORY : WEAK SIGNALS : CAPITAL FLOWS"
      ),
      title: t("Observatoire d'Investissement", "Investment Observatory"),
      desc: t(
        "Suivi des flux d'investissement et détection des signaux faibles.",
        "Investment flow tracking and weak signal detection."
      ),
      ctaLabel: t("OUVRIR EN PLEIN ÉCRAN", "OPEN FULLSCREEN"),
      href: "https://heyzine.com/flip-book/d864915be0.html",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0D1B2A" }}>
      <header
        className="flex items-center justify-between px-8 py-6 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
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
          {t("Accès Premium : Espace Réservé Clients", "Premium Access : Reserved Client Area")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                background: "#0D1B2A",
                border: "1px solid rgba(201,168,76,0.3)",
                borderTop: "3px solid #C9A84C",
                borderRadius: "4px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "#C9A84C",
                  marginBottom: "16px",
                }}
              >
                {c.eyebrow}
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "18px",
                  color: "#FAF6ED",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}
              >
                {c.title}
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                  flexGrow: 1,
                }}
              >
                {c.desc}
              </p>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  alignSelf: "flex-start",
                  display: "inline-block",
                  border: "1px solid #C9A84C",
                  color: "#C9A84C",
                  background: "transparent",
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: "2px",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textDecoration: "none",
                }}
              >
                {c.ctaLabel}
              </a>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AccesPremiumDashboard;
