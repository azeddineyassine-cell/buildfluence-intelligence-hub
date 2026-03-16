import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const CTAFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-gradient-navy py-28" ref={ref}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Infrastructure décisionnelle souveraine
            </span>
            <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl md:text-5xl">
              {t(
                "Votre prochaine décision stratégique mérite une infrastructure à la hauteur.",
                "Your next strategic decision deserves infrastructure to match."
              )}
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/70">
              {t(
                "Échangeons en toute confidentialité sur votre situation.",
                "Let's discuss your situation in complete confidentiality."
              )}
            </p>
            <div className="mt-10">
              <button
                onClick={() => navigate("/contact")}
                className="rounded bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:shadow-gold"
              >
                {t("Réserver mon échange stratégique", "Book my strategic discussion")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <span className="font-serif text-lg font-bold">
                Build<span className="text-gradient-gold">fluence</span>
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                Infrastructure décisionnelle souveraine
              </p>
            </div>
            <div className="flex gap-8 text-xs text-muted-foreground">
              <a href="#situations-critiques" className="transition-colors hover:text-primary">
                {t("Situations critiques", "Critical Situations")}
              </a>
              <a href="#nos-solutions" className="transition-colors hover:text-primary">
                {t("Solutions", "Solutions")}
              </a>
              <a href="#success-stories" className="transition-colors hover:text-primary">
                Success Stories
              </a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} className="transition-colors hover:text-primary">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 h-px w-full bg-border" />
          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Buildfluence. {t("Tous droits réservés.", "All rights reserved.")}
          </p>
        </div>
      </footer>
    </>
  );
};

export default CTAFooter;
