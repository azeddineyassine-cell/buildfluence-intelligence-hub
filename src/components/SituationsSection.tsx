import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Eye, Target, Flame, Zap, Globe, Search, Tv } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SituationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const navigate = useNavigate();

  const situations = [
    {
      icon: Eye,
      title: "Décider sans visibilité",
      description: "L'absence d'intelligence stratégique conduit à des arbitrages tardifs et à l'érosion de l'avantage concurrentiel.",
      stat: "20%",
      statLabel: "des dirigeants estiment exceller en prise de décision",
      source: "McKinsey",
      route: "/situations/decider-sans-visibilite",
    },
    {
      icon: Shield,
      title: "Subir des attaques informationnelles",
      description: "Les campagnes de déstabilisation réputationnelle peuvent détruire en quelques heures ce qui a été construit en décennies.",
      stat: "90%",
      statLabel: "des parties prenantes sanctionnent les entités à réputation dégradée",
      source: "SurveySparrow",
      route: "/situations/attaques-informationnelles",
    },
    {
      icon: Target,
      title: "Perdre la bataille de l'attractivité",
      description: "L'incapacité à projeter une image de puissance et de fiabilité entraîne un décrochage territorial et la fuite des capitaux.",
      stat: "",
      statLabel: "",
      source: "",
      route: "/situations/deficit-attractivite",
    },
    {
      icon: Flame,
      title: "Sombrer dans une crise non maîtrisée",
      description: "60% des organisations ne se remettent jamais d'une crise majeure. L'anticipation est la seule protection structurelle.",
      stat: "60%",
      statLabel: "ne survivent pas à une crise majeure",
      source: "Cleartail Marketing",
      route: "/situations/crises-non-maitrisees",
    },
    {
      icon: Zap,
      title: "Perdre en vélocité face aux concurrents",
      description: "Les organisations agiles surpassent les autres de 2,5× en croissance. La lenteur décisionnelle est une menace existentielle.",
      stat: "2.5×",
      statLabel: "croissance des organisations agiles",
      source: "Bain & Company",
      route: "/situations/perte-velocite",
    },
    {
      icon: Globe,
      title: "Déficit d'influence institutionnel",
      description: "85% des normes sont dictées par ceux qui occupent le terrain. L'absence d'influence conduit à l'exclusion des cercles de pouvoir.",
      stat: "85%",
      statLabel: "des normes dictées par les acteurs présents",
      source: "",
      route: "/situations/deficit-influence",
    },
    {
      icon: Search,
      title: "Investir sous risque invisible",
      description: "70 à 90% des opérations de M&A échouent par manque de due diligence approfondie. Le risque réside dans l'angle mort.",
      stat: "70-90%",
      statLabel: "des M&A échouent",
      source: "CFA Institute",
      route: "/situations/investir-sous-risque",
    },
    {
      icon: Tv,
      title: "Gouverner sous pression médiatique et émotionnelle",
      description: "Décider avec lucidité lorsque l'espace médiatique impose l'urgence et l'émotion.",
      stat: "",
      statLabel: "La pression médiatique transforme la décision publique en réaction émotionnelle.",
      source: "",
      route: "/situations/gouverner-sous-pression",
    },
  ];

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="situations-critiques" className="relative bg-section-alt py-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Vos Situations Critiques</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Les menaces que vous ne voyez pas sont les plus destructrices
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Identifier la nature de votre exposition aux risques est déjà le premier acte de souveraineté décisionnelle.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {situations.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => goTo(s.route)}
              className="card-glass group cursor-pointer p-6 transition-all hover:shadow-gold-hover"
            >
              <s.icon className="mb-4 h-6 w-6 text-primary opacity-70" />
              <h3 className="font-serif text-base font-bold leading-snug">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.description}</p>
              {(s.stat || s.statLabel) && (
                <div className="mt-4 border-t border-border pt-3">
                  {s.stat && <span className="font-serif text-xl font-bold text-primary">{s.stat}</span>}
                  {s.statLabel && <p className="mt-1 text-[11px] text-muted-foreground">{s.statLabel}</p>}
                  {s.source && <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Source : {s.source}</p>}
                </div>
              )}
              <div className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                En savoir plus →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SituationsSection;
