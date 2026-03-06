import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Institutional architecture"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

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
            {t("Voir plus tôt.", "See earlier.")}
            <br />
            {t("Comprendre plus profondément.", "Understand deeper.")}
            <br />
            <span className="text-gradient-gold">{t("Décider plus vite.", "Decide faster.")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {t(
              "Intelligence stratégique, due diligence approfondie et influence au service des décideurs souverains, des gouvernements et des institutions internationales.",
              "Strategic intelligence, deep due diligence and influence serving sovereign decision-makers, governments and international institutions."
            )}
          </motion.p>

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
            className="mx-auto mt-24 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded border border-border bg-border md:grid-cols-4"
          >
            {[
              { value: "15+", label: t("Années d'expertise", "Years of expertise") },
              { value: "9", label: t("Mandats stratégiques", "Strategic mandates") },
              { value: "57", label: t("Pays couverts", "Countries covered") },
              { value: "400M$", label: t("Investissements sécurisés", "Investments secured") },
            ].map((stat) => (
              <div key={stat.label} className="bg-card px-6 py-5 text-center">
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
