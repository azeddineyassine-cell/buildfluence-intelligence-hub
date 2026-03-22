import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormStrategicExchange } from "./FormModals";

const CTAFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const { t } = useLanguage();

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <>
      <section className="relative py-28" ref={ref} style={{ background: '#050D1A' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl rounded-sm p-12 text-center"
            style={{ border: '1px solid hsl(43 50% 54% / 0.2)' }}
          >
            <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#F0EDE6' }}>
              {t("Votre prochaine grande décision mérite mieux qu'un pari.", "Your next big decision deserves better than a gamble.")}
            </h2>
            <p className="mt-4 text-base" style={{ color: '#8A8F9E' }}>
              {t("Vous êtes exposés à quelle situation ?", "What situation are you exposed to?")}
            </p>
            <button onClick={() => setFormOpen(true)} className="btn-gold mt-8">
              {t("Réserver mon échange stratégique", "Book my strategic exchange")}
            </button>
          </motion.div>
        </div>
      </section>

      <footer className="py-16" style={{ background: '#050D1A', borderTop: '1px solid hsl(220 20% 16%)' }}>
        <div className="container">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(43 50% 54%)' }}>Buildfluence</h4>
              <nav className="mt-4 flex flex-col gap-2">
                <a href="#pourquoi-buildfluence" className="text-[13px] transition-colors" style={{ color: '#8A8F9E' }}>{t("Pourquoi Buildfluence", "Why Buildfluence")}</a>
                <a href="#pourquoi-buildfluence" className="text-[13px] transition-colors" style={{ color: '#8A8F9E' }}>{t("Approche HumTech", "HumTech Approach")}</a>
                <a href="#pourquoi-buildfluence" className="text-[13px] transition-colors" style={{ color: '#8A8F9E' }}>Track Record</a>
                <a href="#pourquoi-buildfluence" className="text-[13px] transition-colors" style={{ color: '#8A8F9E' }}>{t("Confidentialité", "Confidentiality")}</a>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(43 50% 54%)' }}>{t("Nos Solutions", "Our Solutions")}</h4>
              <nav className="mt-4 flex flex-col gap-2">
                <button onClick={() => goTo("/solutions/strategic-intelligence-lab")} className="text-left text-[13px]" style={{ color: '#8A8F9E' }}>Strategic Intelligence Lab</button>
                <button onClick={() => goTo("/solutions/deep-due-diligence")} className="text-left text-[13px]" style={{ color: '#8A8F9E' }}>Deep Due Diligence</button>
                <button onClick={() => goTo("/solutions/soft-power-influence")} className="text-left text-[13px]" style={{ color: '#8A8F9E' }}>Soft Power & Influence</button>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(43 50% 54%)' }}>{t("Capacités", "Capabilities")}</h4>
              <nav className="mt-4 flex flex-col gap-2">
                <button onClick={() => goTo("/capacites/ai-powered-monitor")} className="text-left text-[13px]" style={{ color: '#8A8F9E' }}>AI Powered Monitor</button>
                <button onClick={() => goTo("/capacites/strategic-workflow")} className="text-left text-[13px]" style={{ color: '#8A8F9E' }}>Strategic Workflow</button>
                <button onClick={() => goTo("/capacites/competitive-velocity-engine")} className="text-left text-[13px]" style={{ color: '#8A8F9E' }}>Competitive Velocity Engine</button>
                <button onClick={() => goTo("/capacites/knowledge-capitalization")} className="text-left text-[13px]" style={{ color: '#8A8F9E' }}>Knowledge Capitalization</button>
              </nav>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(43 50% 54%)' }}>Contact</h4>
              <nav className="mt-4 flex flex-col gap-2">
                <a href="mailto:info@buildfluence.ai" className="text-[13px]" style={{ color: '#8A8F9E' }}>info@buildfluence.ai</a>
                <button onClick={() => setFormOpen(true)} className="text-left text-[13px]" style={{ color: '#8A8F9E' }}>{t("Réserver un échange", "Book an exchange")}</button>
              </nav>
            </div>
          </div>

          <div className="mt-12 h-px w-full" style={{ background: 'hsl(220 20% 16%)' }} />

          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-center text-xs" style={{ color: '#6B7280' }}>
              {t(
                "© 2025 Buildfluence · Tous droits réservés · Politique de confidentialité · Mentions légales",
                "© 2025 Buildfluence · All rights reserved · Privacy policy · Legal notice"
              )}
            </p>
            <p className="font-serif text-sm italic" style={{ color: 'hsl(43 50% 54% / 0.7)' }}>
              {t(
                "\"L'intelligence au service du pouvoir décisionnel.\"",
                "\"Intelligence at the service of decision-making power.\""
              )}
            </p>
          </div>
        </div>
      </footer>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default CTAFooter;
