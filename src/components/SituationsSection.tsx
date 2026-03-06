import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Eye, Target, Flame, Zap, Globe, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SituationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const situations = [
    {
      icon: Eye,
      title: t("Décider sans visibilité", "Deciding without visibility"),
      description: t(
        "L'absence d'intelligence stratégique conduit à des arbitrages tardifs et à l'érosion de l'avantage concurrentiel.",
        "Lack of strategic intelligence leads to delayed arbitrations and erosion of competitive advantage."
      ),
      stat: "20%",
      statLabel: t("des dirigeants estiment exceller en prise de décision", "of leaders believe they excel at decision-making"),
      source: "McKinsey",
    },
    {
      icon: Shield,
      title: t("Attaques informationnelles", "Information warfare"),
      description: t(
        "Les campagnes de déstabilisation réputationnelle peuvent détruire en quelques heures ce qui a été construit en décennies.",
        "Reputational destabilization campaigns can destroy in hours what was built over decades."
      ),
      stat: "90%",
      statLabel: t("des parties prenantes sanctionnent les entités à réputation dégradée", "of stakeholders sanction entities with degraded reputation"),
      source: "SurveySparrow",
    },
    {
      icon: Target,
      title: t("Déficit d'attractivité", "Attractiveness deficit"),
      description: t(
        "L'incapacité à projeter une image de puissance et de fiabilité entraîne un décrochage territorial et la fuite des capitaux.",
        "Inability to project an image of power and reliability causes territorial decline and capital flight."
      ),
      stat: "",
      statLabel: "",
      source: "",
    },
    {
      icon: Flame,
      title: t("Crises non maîtrisées", "Uncontrolled crises"),
      description: t(
        "60% des organisations ne se remettent jamais d'une crise majeure. L'anticipation est la seule protection structurelle.",
        "60% of organizations never recover from a major crisis. Anticipation is the only structural protection."
      ),
      stat: "60%",
      statLabel: t("ne survivent pas à une crise majeure", "do not survive a major crisis"),
      source: "Cleartail Marketing",
    },
    {
      icon: Zap,
      title: t("Retard stratégique", "Strategic delay"),
      description: t(
        "Les organisations agiles surpassent les autres de 2,5× en croissance. La lenteur décisionnelle est une menace existentielle.",
        "Agile organizations outperform others by 2.5× in growth. Decision-making slowness is an existential threat."
      ),
      stat: "2.5×",
      statLabel: t("croissance des organisations agiles", "growth of agile organizations"),
      source: "Bain & Company",
    },
    {
      icon: Globe,
      title: t("Déficit d'influence", "Influence deficit"),
      description: t(
        "85% des normes sont dictées par ceux qui occupent le terrain. L'absence d'influence conduit à l'exclusion des cercles de pouvoir.",
        "85% of standards are dictated by those who occupy the field. Lack of influence leads to exclusion from power circles."
      ),
      stat: "85%",
      statLabel: t("des normes dictées par les acteurs présents", "of standards set by present actors"),
      source: "",
    },
    {
      icon: Search,
      title: t("Investissements sous risque invisible", "Investments under invisible risk"),
      description: t(
        "70 à 90% des opérations de M&A échouent par manque de due diligence approfondie. Le risque réside dans l'angle mort.",
        "70 to 90% of M&A operations fail due to lack of deep due diligence. Risk lies in the blind spot."
      ),
      stat: "70-90%",
      statLabel: t("des M&A échouent", "of M&A operations fail"),
      source: "CFA Institute",
    },
  ];

  return (
    <section id="situations-critiques" className="relative py-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("Situations critiques", "Critical Situations")}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t(
              "Les menaces que vous ne voyez pas sont celles qui vous détruisent",
              "The threats you don't see are the ones that destroy you"
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              "Identifier la nature exacte de votre exposition stratégique est le premier acte de souveraineté décisionnelle.",
              "Identifying the exact nature of your strategic exposure is the first act of decision-making sovereignty."
            )}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {situations.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <s.icon className="mb-4 h-7 w-7 text-primary opacity-70" />
              <h3 className="font-serif text-lg font-bold leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              {s.stat && (
                <div className="mt-4 border-t border-border pt-3">
                  <span className="font-serif text-2xl font-bold text-primary">{s.stat}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{s.statLabel}</p>
                  {s.source && (
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-steel">
                      Source : {s.source}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SituationsSection;
