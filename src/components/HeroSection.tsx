import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    { value: "25+", label: t("Années d'expertise", "Years of expertise") },
    { value: "15+", label: t("Mandats stratégiques", "Strategic mandates") },
    { value: "59", label: t("Pays couverts", "Countries covered") },
  ];

  return (
    <section className="relative flex min-h-screen items-center bg-background">
      <div className="container relative z-10 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Sovereign Decision Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t(
              "Révéler l'architecture dissimulée du pouvoir décisionnel",
              "Revealing the hidden architecture of decision-making power"
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <blockquote className="border-l-2 border-accent pl-5 text-lg italic leading-relaxed text-muted-foreground">
              {t(
                "Les crises ne naissent pas du chaos, mais de l'illusion du contrôle.",
                "Crises are not born from chaos, but from the illusion of control."
              )}
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => navigate("/contact")}
              className="rounded bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-navy"
            >
              {t("Réserver un échange stratégique", "Book a strategic discussion")}
            </button>
            <a
              href="#nos-solutions"
              className="rounded border border-primary/30 px-10 py-4 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary/5"
            >
              {t("Découvrir nos solutions", "Discover our solutions")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mx-auto mt-24 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded border border-border bg-border"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background px-6 py-5 text-center">
                <div className="font-serif text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
