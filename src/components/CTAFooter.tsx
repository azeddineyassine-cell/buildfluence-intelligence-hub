import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail } from "lucide-react";

const CTAFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* CTA */}
      <section id="contact" className="relative py-28" ref={ref}>
        <div className="absolute inset-x-0 top-0 h-px line-gold opacity-20" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Votre prochaine grande décision mérite mieux qu'un{" "}
              <span className="text-gradient-gold">pari</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Dans quelle situation êtes-vous ? Parlons-en.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:info@buildfluence.ai"
                className="flex items-center gap-2 rounded-sm bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-accent-foreground transition-all hover:brightness-110 hover:shadow-gold"
              >
                <Mail className="h-4 w-4" />
                Rentrer en contact
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              📧 info@buildfluence.ai
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <span className="font-serif text-lg font-bold">
                Build<span className="text-accent">fluence</span>
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                Strategic Intelligence & Influence
              </p>
            </div>
            <div className="flex gap-8 text-xs text-muted-foreground">
              <a href="#situations-critiques" className="hover:text-accent transition-colors">
                Situations Critiques
              </a>
              <a href="#nos-solutions" className="hover:text-accent transition-colors">
                Nos Solutions
              </a>
              <a href="#success-stories" className="hover:text-accent transition-colors">
                Success Stories
              </a>
              <a href="#contact" className="hover:text-accent transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 h-px w-full bg-border" />
          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Buildfluence. Tous droits réservés.
          </p>
        </div>
      </footer>
    </>
  );
};

export default CTAFooter;
