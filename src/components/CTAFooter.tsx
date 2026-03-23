import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormStrategicExchange } from "./FormModals";

const CTAFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formOpen, setFormOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      {/* CTA */}
      <section
        ref={ref}
        className="py-[88px] px-12 text-center"
        style={{ background: 'hsl(30 20% 97%)', borderTop: '1px solid hsl(var(--border))' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-4 inline-block" style={{ color: 'hsl(var(--gold))' }}>
            {t("Passer à l'action", "Take action")}
          </p>
          <h2 className="font-serif text-[40px] font-black mb-[18px]" style={{ color: 'hsl(var(--navy))', letterSpacing: '-0.5px' }}>
            {t("Votre situation critique", "Your critical situation")}
            <br />
            {t("mérite une réponse souveraine", "deserves a sovereign response")}
          </h2>
          <p className="text-[16px] mx-auto mb-10 leading-[1.7]" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '500px' }}>
            {t(
              "Nos engagements sont strictement confidentiels. Chaque mandat commence par un échange stratégique sans engagement pour qualifier la situation et définir le périmètre d'intervention.",
              "Our engagements are strictly confidential. Each mandate begins with a no-commitment strategic exchange to qualify the situation and define the scope of intervention."
            )}
          </p>
          <button
            onClick={() => setFormOpen(true)}
            className="inline-block px-10 py-4 text-[14px] font-bold tracking-[0.04em] transition-colors"
            style={{ background: 'hsl(var(--navy))', color: '#fff' }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'hsl(218 50% 13%)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'hsl(var(--navy))')}
          >
            {t("Demander un échange confidentiel", "Request a confidential exchange")}
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="flex items-center justify-between flex-wrap gap-6 px-12 py-12"
        style={{ background: 'hsl(218 60% 9%)' }}
      >
        <a href="/" className="text-[18px] font-bold text-white no-underline">
          Build<span style={{ color: 'hsl(var(--gold))' }}>fluence</span>
        </a>
        <ul className="flex flex-wrap gap-7 list-none">
          {[
            { label: t("Vos Situations critiques", "Your Critical Situations"), href: "#situations-critiques" },
            { label: t("Nos Solutions", "Our Solutions"), href: "#nos-solutions" },
            { label: "Strategic Innovation", href: "#strategic-innovation" },
            { label: "Success Stories", href: "#success-stories" },
            { label: "Insights & Resources", href: "#insights" },
            { label: t("Pourquoi Buildfluence", "Why Buildfluence"), href: "#pourquoi-buildfluence" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
          {t("© 2026 Buildfluence. Tous droits réservés.", "© 2026 Buildfluence. All rights reserved.")}
        </span>
      </footer>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default CTAFooter;
