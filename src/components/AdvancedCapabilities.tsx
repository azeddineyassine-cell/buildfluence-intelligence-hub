import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Radar, Workflow, BookOpen, Gauge } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdvancedCapabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const navigate = useNavigate();

  const capabilities = [
    {
      icon: Radar,
      title: "AI Powered Monitor",
      description: "Veille stratégique multicanale augmentée par l'IA. Surveillance continue du web profond, des signaux faibles et des ruptures technologiques avant qu'ils ne deviennent publiques.",
      route: "/capacites/ai-powered-monitor",
    },
    {
      icon: Workflow,
      title: "Strategic Workflow",
      description: "Structuration et professionnalisation d'une unité de veille & d'intelligence stratégique. Installer une culture de décision augmentée.",
      route: "/capacites/strategic-workflow",
    },
    {
      icon: BookOpen,
      title: "Capitalisation des Connaissances",
      description: "Structuration de l'intelligence collective de votre organisation pour éliminer les silos informationnels et accélérer l'exécution stratégique.",
      route: "/capacites/knowledge-capitalization",
    },
    {
      icon: Gauge,
      title: "Competitive Velocity Engine",
      description: "Mapping dynamique de votre écosystème : Concurrents, R&D, Opportunités de marché et Alliances Offshore.",
      route: "/capacites/competitive-velocity-engine",
    },
  ];

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="strategic-innovation" className="relative bg-section-alt py-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Strategic Innovation</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            De la donnée à la suprématie décisionnelle.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Prenez de l'avance sur vos concurrents
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
              className="card-glass group flex cursor-pointer gap-5 p-7 transition-all hover:shadow-gold-hover"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-sm bg-primary/10">
                <cap.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">{cap.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{cap.description}</p>
                <span className="mt-3 inline-block text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Voir le détail →
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
