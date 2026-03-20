import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormStrategicExchange } from "./FormModals";

const CTAFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <>
      {/* CTA section */}
      <section className="relative bg-section-alt py-28" ref={ref}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl rounded-sm border border-primary/20 p-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Votre prochaine grande décision mérite mieux qu'un pari.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Vous êtes exposés à quelle situation ?
            </p>
            <button onClick={() => setFormOpen(true)} className="btn-gold mt-8">
              Réserver mon échange stratégique
            </button>
            <p className="mt-4 text-xs text-muted-foreground">info@buildfluence.ai</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-16">
        <div className="container">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Buildfluence</h4>
              <nav className="mt-4 flex flex-col gap-2">
                <a href="#pourquoi-buildfluence" className="text-[13px] text-muted-foreground hover:text-foreground">Pourquoi Buildfluence</a>
                <a href="#pourquoi-buildfluence" className="text-[13px] text-muted-foreground hover:text-foreground">Approche HumTech</a>
                <a href="#pourquoi-buildfluence" className="text-[13px] text-muted-foreground hover:text-foreground">Track Record</a>
                <a href="#pourquoi-buildfluence" className="text-[13px] text-muted-foreground hover:text-foreground">Confidentialité</a>
              </nav>
            </div>
            {/* Col 2 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Nos Solutions</h4>
              <nav className="mt-4 flex flex-col gap-2">
                <button onClick={() => goTo("/solutions/strategic-intelligence-lab")} className="text-left text-[13px] text-muted-foreground hover:text-foreground">Strategic Intelligence Lab</button>
                <button onClick={() => goTo("/solutions/deep-due-diligence")} className="text-left text-[13px] text-muted-foreground hover:text-foreground">Deep Due Diligence</button>
                <button onClick={() => goTo("/solutions/soft-power-influence")} className="text-left text-[13px] text-muted-foreground hover:text-foreground">Soft Power & Influence</button>
              </nav>
            </div>
            {/* Col 3 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Capacités</h4>
              <nav className="mt-4 flex flex-col gap-2">
                <button onClick={() => goTo("/capacites/ai-powered-monitor")} className="text-left text-[13px] text-muted-foreground hover:text-foreground">AI Powered Monitor</button>
                <button onClick={() => goTo("/capacites/strategic-workflow")} className="text-left text-[13px] text-muted-foreground hover:text-foreground">Strategic Workflow</button>
                <button onClick={() => goTo("/capacites/competitive-velocity-engine")} className="text-left text-[13px] text-muted-foreground hover:text-foreground">Competitive Velocity Engine</button>
                <button onClick={() => goTo("/capacites/knowledge-capitalization")} className="text-left text-[13px] text-muted-foreground hover:text-foreground">Knowledge Capitalization</button>
              </nav>
            </div>
            {/* Col 4 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Contact</h4>
              <nav className="mt-4 flex flex-col gap-2">
                <a href="mailto:info@buildfluence.ai" className="text-[13px] text-muted-foreground hover:text-foreground">info@buildfluence.ai</a>
                <button onClick={() => setFormOpen(true)} className="text-left text-[13px] text-muted-foreground hover:text-foreground">Réserver un échange</button>
              </nav>
            </div>
          </div>

          <div className="mt-12 h-px w-full bg-border" />

          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-center text-xs text-muted-foreground">
              © 2025 Buildfluence · Tous droits réservés · Politique de confidentialité · Mentions légales
            </p>
            <p className="font-serif text-sm italic text-primary/70">
              "L'intelligence au service du pouvoir décisionnel."
            </p>
          </div>
        </div>
      </footer>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default CTAFooter;
