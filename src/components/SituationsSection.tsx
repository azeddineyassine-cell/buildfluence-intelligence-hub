import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Eye, Target, Flame, Zap, Globe, Search, Tv } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const SituationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const navigate = useNavigate();

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
      route: "/situations/decider-sans-visibilite",
    },
    {
      icon: Shield,
      title: t("Subir des attaques informationnelles", "Suffering information warfare"),
      description: t(
        "Les campagnes de déstabilisation réputationnelle peuvent détruire en quelques heures ce qui a été construit en décennies.",
        "Reputational destabilization campaigns can destroy in hours what was built over decades."
      ),
      stat: "90%",
      statLabel: t("des parties prenantes sanctionnent les entités à réputation dégradée", "of stakeholders sanction entities with degraded reputation"),
      source: "SurveySparrow",
      route: "/situations/attaques-informationnelles",
    },
    {
      icon: Target,
      title: t("Perdre la bataille de l'attractivité", "Losing the battle for attractiveness"),
      description: t(
        "L'incapacité à projeter une image de puissance et de fiabilité entraîne un décrochage territorial et la fuite des capitaux.",
        "Inability to project an image of power and reliability causes territorial decline and capital flight."
      ),
      stat: "",
      statLabel: "",
      source: "",
      route: "/situations/deficit-attractivite",
    },
    {
      icon: Flame,
      title: t("Sombrer dans une crise non maîtrisée", "Sinking into an uncontrolled crisis"),
      description: t(
        "60% des organisations ne se remettent jamais d'une crise majeure. L'anticipation est la seule protection structurelle.",
        "60% of organizations never recover from a major crisis. Anticipation is the only structural protection."
      ),
      stat: "60%",
      statLabel: t("ne survivent pas à une crise majeure", "do not survive a major crisis"),
      source: "Cleartail Marketing",
      route: "/situations/crises-non-maitrisees",
    },
    {
      icon: Zap,
      title: t("Perdre en vélocité face aux concurrents", "Losing velocity against competitors"),
      description: t(
        "Les organisations agiles surpassent les autres de 2,5× en croissance. La lenteur décisionnelle est une menace existentielle.",
        "Agile organizations outperform others by 2.5× in growth. Decision-making slowness is an existential threat."
      ),
      stat: "2.5×",
      statLabel: t("croissance des organisations agiles", "growth of agile organizations"),
      source: "Bain & Company",
      route: "/situations/perte-velocite",
    },
    {
      icon: Globe,
      title: t("Déficit d'influence institutionnel", "Institutional influence deficit"),
      description: t(
        "85% des normes sont dictées par ceux qui occupent le terrain. L'absence d'influence conduit à l'exclusion des cercles de pouvoir.",
        "85% of standards are dictated by those who occupy the field. Lack of influence leads to exclusion from power circles."
      ),
      stat: "85%",
      statLabel: t("des normes dictées par les acteurs présents", "of standards set by present actors"),
      source: "",
      route: "/situations/deficit-influence",
    },
    {
      icon: Search,
      title: t("Investir sous risque invisible", "Investing under invisible risk"),
      description: t(
        "70 à 90% des opérations de M&A échouent par manque de due diligence approfondie. Le risque réside dans l'angle mort.",
        "70 to 90% of M&A operations fail due to lack of deep due diligence. Risk lies in the blind spot."
      ),
      stat: "70-90%",
      statLabel: t("des M&A échouent", "of M&A operations fail"),
      source: "CFA Institute",
      route: "/situations/investir-sous-risque",
    },
    {
      icon: Tv,
      title: t("Gouverner sous pression médiatique et émotionnelle", "Governing under media and emotional pressure"),
      description: t(
        "Décider avec lucidité lorsque l'espace médiatique impose l'urgence et l'émotion.",
        "Deciding with clarity when the media space imposes urgency and emotion."
      ),
      stat: "",
      statLabel: t("La pression médiatique transforme la décision publique en réaction émotionnelle.", "Media pressure transforms public decision-making into emotional reaction."),
      source: "",
      route: "/situations/gouverner-sous-pression",
    },
  ];

  return (
    <section id="situations-critiques" className="relative bg-secondary py-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("Vos Situations critiques", "Your Critical Situations")}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t(
              "Les menaces que vous ne voyez pas sont les plus destructrices",
              "The threats you don't see are the most destructive"
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              "Identifier la nature de votre exposition aux risques est le premier acte de souveraineté décisionnelle",
              "Identifying the nature of your risk exposure is the first act of decision-making sovereignty"
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
              onClick={() => navigate(s.route)}
              className="group block cursor-pointer rounded border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <s.icon className="mb-4 h-7 w-7 text-primary opacity-70" />
              <h3 className="font-serif text-lg font-bold leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              {(s.stat || s.statLabel) && (
                <div className="mt-4 border-t border-border pt-3">
                  {s.stat && <span className="font-serif text-2xl font-bold text-primary">{s.stat}</span>}
                  {s.statLabel && <p className="mt-1 text-xs text-muted-foreground">{s.statLabel}</p>}
                  {s.source && (
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      Source : {s.source}
                    </p>
                  )}
                </div>
              )}
              <div className="mt-4 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                {t("En savoir plus →", "Learn more →")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SituationsSection;
