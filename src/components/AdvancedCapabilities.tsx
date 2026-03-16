import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Radar, Workflow, BookOpen, Gauge } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const AdvancedCapabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const capabilities = [
    {
      icon: Radar,
      title: "AI Powered Monitor",
      description: t(
        "Système de veille stratégique multicanale alimenté par l'intelligence artificielle. Surveillance continue du web profond, des signaux faibles et des ruptures technologiques avant qu'ils ne deviennent publics.",
        "Multichannel strategic monitoring system powered by artificial intelligence. Continuous surveillance of the deep web, weak signals and technological disruptions before they become public."
      ),
      detail: t(
        "Détail complet de la capacité AI Powered Monitor — contenu à définir selon les spécifications du projet.",
        "Full detail of AI Powered Monitor capability — content to be defined per project specifications."
      ),
    },
    {
      icon: Workflow,
      title: "Strategic Workflow",
      description: t(
        "Orchestration des processus décisionnels stratégiques. De la collecte d'information à la recommandation tactique, chaque étape est tracée et optimisée.",
        "Orchestration of strategic decision-making processes. From information collection to tactical recommendation, every step is traced and optimized."
      ),
      detail: t(
        "Détail complet de la capacité Strategic Workflow — contenu à définir selon les spécifications du projet.",
        "Full detail of Strategic Workflow capability — content to be defined per project specifications."
      ),
    },
    {
      icon: BookOpen,
      title: "Knowledge Capitalization",
      description: t(
        "Structuration de l'intelligence collective de votre organisation pour éliminer les silos informationnels et accélérer l'exécution stratégique.",
        "Structuring your organization's collective intelligence to eliminate information silos and accelerate strategic execution."
      ),
      detail: t(
        "Détail complet de la capacité Knowledge Capitalization — contenu à définir selon les spécifications du projet.",
        "Full detail of Knowledge Capitalization capability — content to be defined per project specifications."
      ),
    },
    {
      icon: Gauge,
      title: "Competitive Velocity Engine",
      description: t(
        "Cartographie dynamique de votre écosystème concurrentiel : concurrents, R&D, opportunités de marché et alliances non documentées.",
        "Dynamic mapping of your competitive ecosystem: competitors, R&D, market opportunities and undocumented alliances."
      ),
      detail: t(
        "Détail complet de la capacité Competitive Velocity Engine — contenu à définir selon les spécifications du projet.",
        "Full detail of Competitive Velocity Engine capability — content to be defined per project specifications."
      ),
    },
  ];

  return (
    <section id="advanced-capabilities" className="relative bg-background py-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("Capacités avancées", "Advanced Capabilities")}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t(
              "De la donnée à la suprématie décisionnelle",
              "From data to decision-making supremacy"
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              "Les infrastructures technologiques et méthodologiques qui transforment l'information en avantage stratégique.",
              "The technological and methodological infrastructures that transform information into strategic advantage."
            )}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {capabilities.map((cap, i) => (
            <motion.button
              key={cap.title}
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group flex cursor-pointer gap-5 rounded border border-border bg-background p-8 text-left transition-all hover:border-primary/30 hover:shadow-navy"
            >
              {/* Placeholder illustration area */}
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-muted">
                <cap.icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>
                <span className="mt-3 inline-block text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {t("Voir le détail →", "See detail →")}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={openIndex !== null} onOpenChange={() => setOpenIndex(null)}>
        {openIndex !== null && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">{capabilities[openIndex].title}</DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-relaxed">
                {capabilities[openIndex].detail}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default AdvancedCapabilities;
