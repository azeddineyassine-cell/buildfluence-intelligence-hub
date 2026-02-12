import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Radar, BarChart3, BookOpen } from "lucide-react";

const platforms = [
  {
    icon: Radar,
    title: "AI-Powered Monitoring",
    description:
      "Veille stratégique multicanale alimentée par l'IA. Une sentinelle 24/7 qui scanne le web profond, les signaux faibles et les ruptures technologiques avant qu'elles ne deviennent publiques.",
  },
  {
    icon: BarChart3,
    title: "Competitive Intelligence",
    description:
      "Mapping dynamique de votre écosystème : concurrents, R&D, opportunités de marché et alliances cachées.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Management",
    description:
      "Capitalisation sur votre intelligence collective pour éliminer les silos et accélérer l'exécution.",
  },
];

const InnovationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="strategic-innovation" className="relative py-28" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px line-gold opacity-20" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Strategic Innovation
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            De la donnée à la suprématie{" "}
            <span className="text-gradient-gold">décisionnelle</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Transformez votre organisation en machine à décider plus vite que
            vos concurrents.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {platforms.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-lg border border-border bg-gradient-card p-8 transition-all hover:border-glow-gold hover:shadow-gold"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <p.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="rounded-sm border border-accent px-8 py-3.5 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Demander une démo
          </a>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
