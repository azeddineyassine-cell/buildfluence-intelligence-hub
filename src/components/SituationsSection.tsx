import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Eye, Target, Flame, Zap, Globe, Search } from "lucide-react";

const situations = [
  {
    icon: Eye,
    title: "Décider sans visibilité",
    stat: "20%",
    statLabel: "des dirigeants estiment exceller en prise de décision",
    source: "McKinsey",
    risk: "Décisions tardives, perte d'avance stratégique",
  },
  {
    icon: Shield,
    title: "Subir des attaques informationnelles",
    stat: "90%",
    statLabel: "boycottent les entreprises à réputation négative",
    source: "SurveySparrow",
    risk: "Écroulement de la valeur de marque",
  },
  {
    icon: Target,
    title: "Perdre la bataille de l'attractivité",
    stat: "—",
    statLabel: "Incapacité à attirer capitaux et talents",
    source: "",
    risk: "Décrochage territorial, fuite des capitaux",
  },
  {
    icon: Flame,
    title: "Sombrer dans une crise non maîtrisée",
    stat: "60%",
    statLabel: "ne se remettent jamais d'une crise majeure",
    source: "Cleartail Marketing",
    risk: "Effondrement de la confiance, faillite structurelle",
  },
  {
    icon: Zap,
    title: "Perdre de la vitesse face aux concurrents",
    stat: "2.5×",
    statLabel: "croissance des entreprises agiles vs lentes",
    source: "Bain & Company",
    risk: "Obsolescence stratégique",
  },
  {
    icon: Globe,
    title: "Déficit d'influence",
    stat: "85%",
    statLabel: "des normes dictées par ceux qui occupent le terrain",
    source: "",
    risk: "Exclusion des cercles de pouvoir",
  },
  {
    icon: Search,
    title: "Investir sous risque invisible",
    stat: "70-90%",
    statLabel: "des M&A échouent par manque de due diligence",
    source: "CFA Institute",
    risk: "Exposition aux sanctions, pertes colossales",
  },
];

const SituationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="situations-critiques" className="relative py-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Diagnostic
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Dans quelle situation critique êtes-vous{" "}
            <span className="text-gradient-gold">vraiment</span> ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Les crises ne se déclenchent pas du chaos, mais de l'illusion du
            contrôle.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {situations.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-gradient-card p-6 transition-all hover:border-glow-gold hover:shadow-gold"
            >
              <s.icon className="mb-4 h-8 w-8 text-accent opacity-70" />
              <h3 className="font-serif text-lg font-bold leading-snug">
                {s.title}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-accent">
                  {s.stat}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {s.statLabel}
              </p>
              {s.source && (
                <p className="mt-1 text-[10px] uppercase tracking-wider text-steel">
                  Source : {s.source}
                </p>
              )}
              <div className="mt-4 h-px w-full line-gold opacity-30" />
              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-semibold text-destructive">Risque :</span>{" "}
                {s.risk}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="rounded-sm bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-accent-foreground transition-all hover:brightness-110"
          >
            Évaluer ma situation
          </a>
        </div>
      </div>
    </section>
  );
};

export default SituationsSection;
