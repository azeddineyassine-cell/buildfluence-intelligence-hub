import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Target, Layers, Lock, Award } from "lucide-react";

const differentiators = [
  {
    icon: Cpu,
    title: "Approche HumTech unique",
    description:
      "L'alliance des technologies de pointe (OSINT, NLP, IA) et de l'expertise humaine pour une vision stratégique sans angle mort.",
  },
  {
    icon: Target,
    title: "Obsession du résultat",
    description:
      "Pas de rapports de 100 pages. Des dashboards factuels, des signaux faibles, des KPIs et des recommandations tactiques actionnables.",
  },
  {
    icon: Layers,
    title: "Vision transversale",
    description:
      "Nous croisons données financières, concurrentielles, réputationnelles avec le risque géopolitique et les dynamiques d'influence.",
  },
  {
    icon: Lock,
    title: "Souveraineté & Confidentialité",
    description:
      "Données traitées sur serveurs sécurisés avec protection étatique. Confidentialité absolue garantie par NDA systématique.",
  },
  {
    icon: Award,
    title: "Track record d'État",
    description:
      "Expertise déjà validée par des cabinets Présidentiels, gouvernements, multinationales et fonds souverains.",
  },
];

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pourquoi-buildfluence" className="relative py-28" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px line-gold opacity-20" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Nos différences
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Nous révélons ce que les autres{" "}
            <span className="text-gradient-gold">ne voient pas</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-lg border border-border bg-gradient-card p-6 transition-all hover:border-glow-gold hover:shadow-gold ${
                i >= 3 ? "sm:col-span-1 lg:col-span-1" : ""
              }`}
            >
              <d.icon className="mb-4 h-8 w-8 text-accent opacity-70" />
              <h3 className="font-serif text-lg font-bold">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {d.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
