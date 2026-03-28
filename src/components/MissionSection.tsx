import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const MissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="mx-auto max-w-[1600px] px-12 py-10">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-[18px]" style={{ color: 'hsl(var(--gold))' }}>
            {t("Notre mission", "Our mission")}
          </p>
          <h2
            className="font-serif text-[36px] font-bold leading-[1.15]"
            style={{ color: 'hsl(var(--navy))', maxWidth: '520px', letterSpacing: '-0.5px' }}
          >
            {t(
              "Une infrastructure de décision construite pour des enjeux souverains",
              "A decision infrastructure built for sovereign challenges"
            )}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-[16px] leading-[1.75] mb-7" style={{ color: '#374151', maxWidth: '580px' }}>
            {t(
              "Fondé sur une conviction : dans un monde où l'information est arme et l'ambiguïté est stratégie, les organisations qui dominent sont celles qui voient ce que les autres ne voient pas encore.",
              "Founded on a conviction: in a world where information is a weapon and ambiguity is strategy, the organizations that dominate are those that see what others don't yet see."
            )}
          </p>
          <p className="text-[16px] leading-[1.75] mb-7" style={{ color: '#374151', maxWidth: '580px' }}>
            {t(
              "Notre équipe combine intelligence opérationnelle, analyse géostratégique et ingénierie décisionnelle pour construire des avantages durables — là où la compétition est la plus intense.",
              "Our team combines operational intelligence, geostrategic analysis and decision engineering to build lasting advantages — where competition is most intense."
            )}
          </p>
          <a
            href="#nos-solutions"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#nos-solutions')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[14px] font-semibold tracking-[0.03em] pb-[2px] transition-colors"
            style={{ color: 'hsl(var(--navy))', borderBottom: '1.5px solid hsl(var(--gold))' }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'hsl(var(--gold))')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'hsl(var(--navy))')}
          >
            {t("Nos solutions →", "Our solutions →")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
