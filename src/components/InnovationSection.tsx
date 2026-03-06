import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Radar, BarChart3, BookOpen, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const InnovationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const platforms = [
    {
      icon: Radar,
      title: t("Veille Stratégique Augmentée", "Augmented Strategic Monitoring"),
      description: t(
        "Système de veille multicanale alimenté par l'intelligence artificielle. Surveillance continue du web profond, des signaux faibles et des ruptures technologiques avant qu'ils ne deviennent publics.",
        "Multichannel monitoring system powered by artificial intelligence. Continuous surveillance of the deep web, weak signals and technological disruptions before they become public."
      ),
    },
    {
      icon: BarChart3,
      title: t("Intelligence Concurrentielle", "Competitive Intelligence"),
      description: t(
        "Cartographie dynamique de votre écosystème : concurrents, recherche et développement, opportunités de marché et alliances non documentées.",
        "Dynamic mapping of your ecosystem: competitors, R&D, market opportunities and undocumented alliances."
      ),
    },
    {
      icon: BookOpen,
      title: t("Capitalisation des Connaissances", "Knowledge Capitalization"),
      description: t(
        "Structuration de l'intelligence collective de votre organisation pour éliminer les silos informationnels et accélérer l'exécution stratégique.",
        "Structuring your organization's collective intelligence to eliminate information silos and accelerate strategic execution."
      ),
    },
    {
      icon: Brain,
      title: t("Approche HumTech", "HumTech Approach"),
      description: t(
        "L'alliance systématique des technologies de pointe (OSINT, NLP, IA) et de l'expertise humaine pour une vision stratégique sans angle mort.",
        "The systematic alliance of cutting-edge technologies (OSINT, NLP, AI) and human expertise for a strategic vision without blind spots."
      ),
    },
  ];

  return (
    <section id="strategic-innovation" className="relative py-28" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-border" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Strategic Innovation
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
          {platforms.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex gap-5 rounded border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-primary/10">
                <p.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
