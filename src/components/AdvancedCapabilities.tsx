import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Radar, Workflow, BookOpen, Gauge } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AdvancedCapabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const navigate = useNavigate();
  const { t } = useLanguage();

  const capabilities = [
    { icon: Radar, title: "AI Powered Monitor", description: t("Veille stratégique multicanale augmentée par l'IA. Surveillance continue du web profond, des signaux faibles et des ruptures technologiques avant qu'ils ne deviennent publiques.", "AI-augmented multi-channel strategic monitoring. Continuous surveillance of the deep web, weak signals and technological disruptions before they become public."), route: "/capacites/ai-powered-monitor" },
    { icon: Workflow, title: "Strategic Workflow", description: t("Structuration et professionnalisation d'une unité de veille & d'intelligence stratégique. Installer une culture de décision augmentée.", "Structuring and professionalizing a strategic intelligence unit. Installing an augmented decision-making culture."), route: "/capacites/strategic-workflow" },
    { icon: BookOpen, title: t("Capitalisation des Connaissances", "Knowledge Capitalization"), description: t("Structuration de l'intelligence collective de votre organisation pour éliminer les silos informationnels et accélérer l'exécution stratégique.", "Structuring your organization's collective intelligence to eliminate information silos and accelerate strategic execution."), route: "/capacites/knowledge-capitalization" },
    { icon: Gauge, title: "Competitive Velocity Engine", description: t("Mapping dynamique de votre écosystème : Concurrents, R&D, Opportunités de marché et Alliances Offshore.", "Dynamic mapping of your ecosystem: Competitors, R&D, Market opportunities and Offshore alliances."), route: "/capacites/competitive-velocity-engine" },
  ];

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="strategic-innovation" className="relative py-28" ref={ref} style={{ background: '#0D1B2A' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Strategic Innovation</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl" style={{ color: '#F0EDE6' }}>
            {t("De la donnée à la suprématie décisionnelle.", "From data to decision-making supremacy.")}
          </h2>
          <p className="mt-4 text-lg" style={{ color: '#8A8F9E' }}>
            {t("Prenez de l'avance sur vos concurrents", "Stay ahead of your competitors")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              onClick={() => goTo(cap.route)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card-dark group flex cursor-pointer gap-5 p-7 transition-all hover:shadow-gold-hover"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-sm" style={{ background: 'hsl(43 50% 54% / 0.1)' }}>
                <cap.icon className="h-6 w-6" style={{ color: 'hsl(43 50% 54%)' }} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold" style={{ color: '#F0EDE6' }}>{cap.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#8A8F9E' }}>{cap.description}</p>
                <span className="mt-3 inline-block text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'hsl(43 50% 54%)' }}>
                  {t("Voir le détail →", "View details →")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedCapabilities;
