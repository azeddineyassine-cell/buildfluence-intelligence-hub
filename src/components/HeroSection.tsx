import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormStrategicExchange } from "./FormModals";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <section className="pt-16" style={{ background: '#fff' }}>
        <div className="mx-auto max-w-[1600px] px-12 pb-10 pt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-7"
            style={{ color: 'hsl(var(--navy))' }}
          >
            Sovereign Decision Infrastructure
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="font-serif font-black leading-[1.08] mb-8"
            style={{
              fontSize: 'clamp(42px, 5.2vw, 68px)',
              color: 'hsl(var(--navy))',
              maxWidth: '860px',
              letterSpacing: '-1px',
            }}
          >
            {t(
              "Construire l'architecture qui sécurise vos ",
              "Building the architecture that secures your "
            )}
            <em className="not-italic" style={{ color: 'hsl(var(--gold))' }}>
              {t("décisions stratégiques", "strategic decisions")}
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="text-[17px] leading-[1.75] mb-12"
            style={{ color: 'hsl(var(--navy))', maxWidth: '700px', opacity: 0.88 }}
          >
            {t(
              "Nous bâtissons des écosystèmes géo-décisionnels souverains permettant d'anticiper les ruptures, neutraliser les menaces et prendre ",
              "We build sovereign geo-decisional ecosystems enabling anticipation of disruptions, neutralization of threats and gaining "
            )}
            <strong className="font-bold italic">
              {t("l'ascendant stratégique", "the strategic edge")}
            </strong>
            {t(
              ", même dans des espaces instables, hostiles ou hyper-concurrentiels.",
              ", even in unstable, hostile or hyper-competitive environments."
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="flex items-center gap-10 pb-10 mb-10"
            style={{ borderBottom: '1px solid hsl(var(--border))' }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Clients
            </span>
            <div className="flex flex-wrap gap-7">
              {[
                t("Gouvernements", "Governments"),
                t("Institutions Internationales", "International Institutions"),
                t("Multinationales", "Multinationals"),
                t("Fonds d'Investissement", "Investment Funds"),
              ].map((c) => (
                <span key={c} className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'hsl(var(--muted-foreground))', opacity: 0.65 }}>
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="flex items-center gap-8"
          >
            <button
              onClick={() => setFormOpen(true)}
              className="inline-block px-[34px] py-[15px] text-[14px] font-semibold tracking-[0.03em] transition-colors"
              style={{ background: 'hsl(var(--navy))', color: '#fff' }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'hsl(218 50% 13%)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'hsl(var(--navy))')}
            >
              {t("Demander un échange stratégique", "Request a strategic exchange")}
            </button>
            <a
              href="#nos-solutions"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#nos-solutions')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[14px] font-semibold tracking-[0.03em] pb-[2px] transition-colors"
              style={{ color: 'hsl(var(--navy))', borderBottom: '1.5px solid hsl(var(--gold))' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'hsl(var(--gold))')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'hsl(var(--navy))')}
            >
              {t("Découvrir nos solutions →", "Discover our solutions →")}
            </a>
          </motion.div>
        </div>
      </section>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default HeroSection;
