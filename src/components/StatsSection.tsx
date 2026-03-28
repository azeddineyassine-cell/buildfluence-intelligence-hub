import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  const stats = [
    { num: "25", suffix: "+", label: t("Années d'intelligence décisionnelle au plus haut niveau", "Years of decision intelligence at the highest level") },
    { num: "57", suffix: "+", label: t("Pays couverts par nos solutions d'analyse", "Countries covered by our analysis solutions") },
    { num: "19M", suffix: "$", label: t("Généré dans politiques publiques suite à notre étude", "Generated in public policies following our study") },
    { num: "400M", suffix: "$", label: t("Investissements sécurisés pour un fond capital-risque", "Investments secured for a venture capital fund") },
    { num: "97", suffix: "%", label: t("De nos mandats stratégiques renouvelés chaque année", "Of our strategic mandates renewed each year") },
  ];

  return (
    <div ref={ref} style={{ borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))' }}>
      <div className="mx-auto max-w-[1600px] px-12 py-8 grid grid-cols-2 md:grid-cols-5 gap-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.num}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="pr-7 mr-7"
            style={{
              borderRight: i < stats.length - 1 ? '1px solid hsl(var(--border))' : 'none',
              marginRight: i < stats.length - 1 ? undefined : 0,
            }}
          >
            <div className="font-serif text-[44px] font-black leading-none mb-[10px]" style={{ color: 'hsl(var(--navy))' }}>
              {stat.num}<span style={{ color: 'hsl(var(--gold))' }}>{stat.suffix}</span>
            </div>
            <div className="text-[12.5px] leading-[1.5]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
