import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Target, Layers, Lock, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const differentiators = [
    {
      icon: Cpu,
      title: t("Approche HumTech", "HumTech Approach"),
      description: t(
        "Alliance systématique des technologies avancées (OSINT, NLP, IA) et de l'expertise humaine pour une vision stratégique sans angle mort.",
        "Systematic alliance of advanced technologies (OSINT, NLP, AI) and human expertise for a strategic vision without blind spots."
      ),
    },
    {
      icon: Target,
      title: t("Orientation résultat", "Result-Oriented"),
      description: t(
        "Pas de rapports volumineux. Des tableaux de bord factuels, des signaux faibles qualifiés et des recommandations tactiques immédiatement actionnables.",
        "No voluminous reports. Factual dashboards, qualified weak signals and immediately actionable tactical recommendations."
      ),
    },
    {
      icon: Layers,
      title: t("Vision transversale", "Cross-Functional Vision"),
      description: t(
        "Croisement systématique des données financières, concurrentielles et réputationnelles avec le risque géopolitique et les dynamiques d'influence.",
        "Systematic cross-referencing of financial, competitive and reputational data with geopolitical risk and influence dynamics."
      ),
    },
    {
      icon: Lock,
      title: t("Souveraineté & Confidentialité", "Sovereignty & Confidentiality"),
      description: t(
        "Données traitées sur infrastructures sécurisées sous protection étatique. Confidentialité garantie par NDA systématique.",
        "Data processed on secure infrastructure under state protection. Confidentiality guaranteed by systematic NDA."
      ),
    },
    {
      icon: Award,
      title: t("Références institutionnelles", "Institutional References"),
      description: t(
        "Expertise validée par des cabinets présidentiels, gouvernements, multinationales et fonds souverains à l'échelle internationale.",
        "Expertise validated by presidential offices, governments, multinationals and sovereign funds at the international level."
      ),
    },
  ];

  return (
    <section id="pourquoi-buildfluence" className="relative py-28" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-border" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("Pourquoi Buildfluence", "Why Buildfluence")}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t(
              "Ce qui nous distingue",
              "What sets us apart"
            )}
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <d.icon className="mb-4 h-7 w-7 text-primary opacity-70" />
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
