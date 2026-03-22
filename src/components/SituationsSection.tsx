import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Eye, Target, Flame, Zap, Globe, Search, Tv } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SituationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const navigate = useNavigate();
  const { t } = useLanguage();

  const situations = [
    { icon: Eye, title: t("Décider sans visibilité", "Deciding without visibility"), description: t("L'absence d'intelligence stratégique conduit à des arbitrages tardifs et à l'érosion de l'avantage concurrentiel.", "The absence of strategic intelligence leads to delayed decisions and the erosion of competitive advantage."), stat: "20%", statLabel: t("des dirigeants estiment exceller en prise de décision", "of leaders believe they excel at decision-making"), source: "McKinsey", route: "/situations/decider-sans-visibilite" },
    { icon: Shield, title: t("Subir des attaques informationnelles", "Suffering information attacks"), description: t("Les campagnes de déstabilisation réputationnelle peuvent détruire en quelques heures ce qui a été construit en décennies.", "Reputational destabilization campaigns can destroy in hours what took decades to build."), stat: "90%", statLabel: t("des parties prenantes sanctionnent les entités à réputation dégradée", "of stakeholders penalize entities with damaged reputation"), source: "SurveySparrow", route: "/situations/attaques-informationnelles" },
    { icon: Target, title: t("Perdre la bataille de l'attractivité", "Losing the battle for attractiveness"), description: t("L'incapacité à projeter une image de puissance et de fiabilité entraîne un décrochage territorial et la fuite des capitaux.", "The inability to project an image of power and reliability leads to territorial decline and capital flight."), stat: "", statLabel: "", source: "", route: "/situations/deficit-attractivite" },
    { icon: Flame, title: t("Sombrer dans une crise non maîtrisée", "Sinking into an uncontrolled crisis"), description: t("60% des organisations ne se remettent jamais d'une crise majeure. L'anticipation est la seule protection structurelle.", "60% of organizations never recover from a major crisis. Anticipation is the only structural protection."), stat: "60%", statLabel: t("ne survivent pas à une crise majeure", "do not survive a major crisis"), source: "Cleartail Marketing", route: "/situations/crises-non-maitrisees" },
    { icon: Zap, title: t("Perdre en vélocité face aux concurrents", "Losing velocity against competitors"), description: t("Les organisations agiles surpassent les autres de 2,5× en croissance. La lenteur décisionnelle est une menace existentielle.", "Agile organizations outperform others by 2.5× in growth. Decision-making slowness is an existential threat."), stat: "2.5×", statLabel: t("croissance des organisations agiles", "growth of agile organizations"), source: "Bain & Company", route: "/situations/perte-velocite" },
    { icon: Globe, title: t("Déficit d'influence institutionnel", "Institutional influence deficit"), description: t("85% des normes sont dictées par ceux qui occupent le terrain. L'absence d'influence conduit à l'exclusion des cercles de pouvoir.", "85% of standards are set by those who occupy the field. Lack of influence leads to exclusion from power circles."), stat: "85%", statLabel: t("des normes dictées par les acteurs présents", "of standards set by present actors"), source: "", route: "/situations/deficit-influence" },
    { icon: Search, title: t("Investir sous risque invisible", "Investing under invisible risk"), description: t("70 à 90% des opérations de M&A échouent par manque de due diligence approfondie. Le risque réside dans l'angle mort.", "70-90% of M&A operations fail due to insufficient due diligence. The risk lies in the blind spot."), stat: "70-90%", statLabel: t("des M&A échouent", "of M&A fail"), source: "CFA Institute", route: "/situations/investir-sous-risque" },
    { icon: Tv, title: t("Gouverner sous pression médiatique et émotionnelle", "Governing under media and emotional pressure"), description: t("Décider avec lucidité lorsque l'espace médiatique impose l'urgence et l'émotion.", "Deciding with clarity when the media space imposes urgency and emotion."), stat: "", statLabel: t("La pression médiatique transforme la décision publique en réaction émotionnelle.", "Media pressure transforms public decisions into emotional reactions."), source: "", route: "/situations/gouverner-sous-pression" },
  ];

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="situations-critiques" className="relative py-28" ref={ref} style={{ background: '#F4F4F4' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">{t("Vos Situations Critiques", "Your Critical Situations")}</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl" style={{ color: '#0D1B2A' }}>
            {t("Les menaces que vous ne voyez pas sont les plus destructrices", "The threats you don't see are the most destructive")}
          </h2>
          <p className="mt-4 text-lg" style={{ color: '#5A6170' }}>
            {t("Identifier la nature de votre exposition aux risques est déjà le premier acte de souveraineté décisionnelle.", "Identifying the nature of your risk exposure is already the first act of decision-making sovereignty.")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {situations.map((s, i) => (
            <motion.div
              key={s.route}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => goTo(s.route)}
              className="group cursor-pointer rounded-sm border p-6 transition-all hover:shadow-lg"
              style={{ background: '#FFFFFF', borderColor: '#E5E7EB', borderTop: '2px solid hsl(43 50% 54% / 0.3)' }}
              onMouseOver={(e) => { (e.currentTarget.style as any).borderTopColor = 'hsl(43 50% 54%)'; }}
              onMouseOut={(e) => { (e.currentTarget.style as any).borderTopColor = 'hsl(43 50% 54% / 0.3)'; }}
            >
              <s.icon className="mb-4 h-6 w-6 opacity-70" style={{ color: 'hsl(43 50% 54%)' }} />
              <h3 className="font-serif text-base font-bold leading-snug" style={{ color: '#0D1B2A' }}>{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#6B7280' }}>{s.description}</p>
              {(s.stat || s.statLabel) && (
                <div className="mt-4 border-t pt-3" style={{ borderColor: '#E5E7EB' }}>
                  {s.stat && <span className="font-serif text-xl font-bold" style={{ color: 'hsl(43 50% 54%)' }}>{s.stat}</span>}
                  {s.statLabel && <p className="mt-1 text-[11px]" style={{ color: '#8A8F9E' }}>{s.statLabel}</p>}
                  {s.source && <p className="mt-1 text-[10px] uppercase tracking-wider" style={{ color: '#A0A5B0' }}>Source : {s.source}</p>}
                </div>
              )}
              <div className="mt-4 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'hsl(43 50% 54%)' }}>
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
