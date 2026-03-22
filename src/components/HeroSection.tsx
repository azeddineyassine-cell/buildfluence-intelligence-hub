import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormStrategicExchange } from "./FormModals";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { t } = useLanguage();

  const stats = [
    { value: "25+", label: t("Années d'expertise", "Years of expertise") },
    { value: "59", label: t("Pays couverts", "Countries covered") },
    { value: "19M$", label: t("Politiques publiques", "Public policies") },
    { value: "400M$", label: t("Investissements sécurisés", "Secured investments") },
  ];

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="container relative z-10 pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="label-accent mb-8 inline-block"
            >
              <span style={{ color: '#000000' }}>SOVEREIGN DECISION INFRASTRUCTURE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.08, color: '#0D1B2A', maxWidth: '800px', margin: '0 auto' }}
            >
              {t("Révéler l'architecture dissimulée du", "Revealing the hidden architecture of")}
              <br />
              <span style={{ color: '#FFDE59' }}>{t("pouvoir décisionnel", "decision-making power")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-10 max-w-xl text-lg italic"
              style={{ color: '#5A6170' }}
            >
              {t(
                "\"Les crises ne naissent pas du chaos, mais de l'illusion du contrôle.\"",
                "\"Crises do not arise from chaos, but from the illusion of control.\""
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <button onClick={() => setFormOpen(true)} className="btn-gold">
                {t("Réserver mon échange stratégique", "Book my strategic exchange")}
              </button>
              <a href="#nos-solutions" className="btn-ghost-gold" style={{ color: '#0D1B2A', borderColor: 'hsl(43 50% 54% / 0.5)' }}>
                {t("DÉCOUVRIR NOS SOLUTIONS", "DISCOVER OUR SOLUTIONS")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mt-16 max-w-2xl"
            >
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(43 50% 54% / 0.3), transparent)' }} />
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.15em]" style={{ color: '#8A8F9E' }}>
                {t(
                  "Gouvernements · Institutions Internationales · Multinationales · Fonds d'Investissement",
                  "Governments · International Institutions · Multinationals · Investment Funds"
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-12 flex max-w-3xl items-center justify-center"
              style={{ borderColor: '#E5E7EB' }}
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="px-6 py-3 text-center sm:px-8" style={{ borderLeft: i > 0 ? '1px solid #E5E7EB' : 'none' }}>
                  <div className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: 'hsl(43 50% 54%)' }}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px]" style={{ color: '#8A8F9E' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default HeroSection;
