import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SituationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();
  const { t } = useLanguage();

  const situations = [
    { icon: "🎯", title: t("Décider sans visibilité", "Deciding without visibility"), desc: t("L'absence d'intelligence stratégique conduit à des arbitrages tardifs et à l'érosion de l'avantage concurrentiel.", "The absence of strategic intelligence leads to delayed decisions and erosion of competitive advantage."), pct: "20%", stat: t("des dirigeants estiment exceller en prise de décision", "of leaders believe they excel at decision-making"), source: "McKinsey", route: "/situations/decider-sans-visibilite" },
    { icon: "🛡️", title: t("Subir des attaques informationnelles", "Suffering information attacks"), desc: t("Les campagnes de déstabilisation réputationnelle peuvent détruire en quelques heures ce qui a été construit en décennies.", "Reputational destabilization campaigns can destroy in hours what took decades to build."), pct: "90%", stat: t("des parties prenantes sanctionnent les entités à réputation dégradée", "of stakeholders penalize entities with damaged reputation"), source: "SurveySparrow", route: "/situations/attaques-informationnelles" },
    { icon: "📉", title: t("Perdre la bataille de l'attractivité", "Losing the battle for attractiveness"), desc: t("L'incapacité à projeter une image de puissance et de fiabilité entraîne un décrochage territorial et la fuite des capitaux.", "The inability to project power and reliability leads to territorial decline and capital flight."), route: "/situations/deficit-attractivite" },
    { icon: "⚠️", title: t("Sombrer dans une crise non maîtrisée", "Sinking into an uncontrolled crisis"), desc: t("60% des organisations ne se remettent jamais d'une crise majeure. L'anticipation est la seule protection structurelle.", "60% of organizations never recover from a major crisis. Anticipation is the only structural protection."), pct: "60%", stat: t("ne survivent pas à une crise majeure", "do not survive a major crisis"), source: "Cleartal Marketing", route: "/situations/crises-non-maitrisees" },
    { icon: "⚡", title: t("Perdre en vélocité face aux concurrents", "Losing velocity against competitors"), desc: t("Les organisations agiles surpassent les autres de 2,5× en croissance. La lenteur décisionnelle est une menace existentielle.", "Agile organizations outperform others by 2.5× in growth. Decision-making slowness is an existential threat."), pct: "2.5×", stat: t("croissance des organisations agiles", "growth of agile organizations"), source: "Bain & Company", route: "/situations/perte-velocite" },
    { icon: "🌐", title: t("Déficit d'influence institutionnel", "Institutional influence deficit"), desc: t("85% des normes sont dictées par ceux qui occupent le terrain. L'absence d'influence conduit à l'exclusion des cercles de pouvoir.", "85% of standards are set by those who occupy the field. Lack of influence leads to exclusion from power circles."), pct: "85%", stat: t("des normes dictées par les acteurs présents", "of standards set by present actors"), route: "/situations/deficit-influence" },
    { icon: "💰", title: t("Investir sous risque invisible", "Investing under invisible risk"), desc: t("70 à 90% des opérations de M&A échouent par manque de due diligence approfondie. Le risque réside dans l'angle mort.", "70-90% of M&A operations fail due to insufficient due diligence. The risk lies in the blind spot."), pct: "70–90%", stat: t("des M&A échouent", "of M&A fail"), source: "CFA Institute", route: "/situations/investir-sous-risque" },
    { icon: "📡", title: t("Gouverner sous pression médiatique et émotionnelle", "Governing under media and emotional pressure"), desc: t("La pression médiatique transforme la décision publique en réaction émotionnelle. Décider avec lucidité quand l'espace impose l'urgence.", "Media pressure transforms public decisions into emotional reactions. Deciding with clarity when the space imposes urgency."), route: "/situations/gouverner-sous-pression" },
  ];

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="situations-critiques" ref={ref} className="py-[88px]" style={{ background: 'hsl(30 20% 97%)' }}>
      <div className="mx-auto max-w-[1100px] px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-[52px]"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-[18px]" style={{ color: 'hsl(var(--gold))' }}>
            {t("Vos situations critiques", "Your critical situations")}
          </p>
          <h2 className="font-serif text-[40px] font-black leading-[1.12] mb-[14px]" style={{ color: 'hsl(var(--navy))', letterSpacing: '-0.5px' }}>
            {t("Les menaces que vous ne voyez pas", "The threats you don't see")}
            <br />
            {t("sont les plus destructrices", "are the most destructive")}
          </h2>
          <p className="text-[16px] mx-auto" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '580px' }}>
            {t(
              "Identifier la nature de votre exposition aux risques est déjà le premier acte de souveraineté décisionnelle.",
              "Identifying the nature of your risk exposure is already the first act of decision-making sovereignty."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]" style={{ background: 'hsl(var(--border))' }}>
          {situations.map((s, i) => (
            <motion.div
              key={s.route}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => goTo(s.route)}
              className="group cursor-pointer p-[28px] transition-colors duration-200 bg-white hover:bg-[hsl(218,42%,18%)]"
            >
              <span className="text-[32px] mb-4 block transition-colors">{s.icon}</span>
              <div className="text-[15px] font-bold mb-[10px] leading-[1.3] transition-colors duration-200 group-hover:text-white" style={{ color: 'hsl(var(--navy))' }}>
                {s.title}
              </div>
              <p className="text-[13px] leading-[1.6] mb-4 transition-colors duration-200 group-hover:text-white/90" style={{ color: '#374151' }}>
                {s.desc}
              </p>
              {s.pct && (
                <>
                  <div className="font-serif text-[26px] font-black leading-none mb-1 transition-colors duration-200 group-hover:text-[hsl(38,76%,60%)]" style={{ color: 'hsl(var(--gold))' }}>
                    {s.pct}
                  </div>
                  <div className="text-[11.5px] transition-colors duration-200 group-hover:text-white/90" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {s.stat}
                  </div>
                  {s.source && (
                    <div className="text-[10px] font-bold uppercase tracking-[0.08em] mt-[2px] opacity-60 transition-colors duration-200 group-hover:text-white/90" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Source : {s.source}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SituationsSection;
