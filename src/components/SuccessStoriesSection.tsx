import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stories = [
    {
      client: t("Présidence du Sénégal", "Presidency of Senegal"),
      sector: t("Gouvernement", "Government"),
      context: t("Crise majeure • Baromètre politique • Réputation", "Major crisis • Political barometer • Reputation"),
      result: t("Stabilisation institutionnelle en période de haute tension", "Institutional stabilization during high-tension period"),
    },
    {
      client: "Centrale Danone",
      sector: t("Industrie", "Industry"),
      context: t("Crise réputationnelle • 120M MAD de pertes", "Reputational crisis • 120M MAD in losses"),
      result: t("+14% de parts de marché après reconquête", "+14% market share after reconquest"),
    },
    {
      client: t("Fonds d'Investissement International", "International Investment Fund"),
      sector: t("Finance souveraine", "Sovereign finance"),
      context: t("Capital-risque • 400M$ en jeu", "Venture capital • $400M at stake"),
      result: t("Investissement sécurisé, partenariat verrouillé", "Investment secured, partnership locked"),
    },
    {
      client: t("Ministère de la Santé", "Ministry of Health"),
      sector: t("Institution publique", "Public institution"),
      context: t("Crise H1N1 • Désinformation massive", "H1N1 crisis • Massive disinformation"),
      result: t("Crise résolue en 2 semaines", "Crisis resolved in 2 weeks"),
    },
    {
      client: "OCP Group",
      sector: t("Industrie stratégique", "Strategic industry"),
      context: t("10 ans de guerre informationnelle", "10 years of information warfare"),
      result: t("Réputation restaurée, parts de marché protégées", "Reputation restored, market share protected"),
    },
    {
      client: "CIDC (OCI)",
      sector: t("Organisation internationale • 57 pays", "International organization • 57 countries"),
      context: t("Déficit de notoriété et d'influence", "Notoriety and influence deficit"),
      result: t("Doing Business Platform déployée", "Doing Business Platform deployed"),
    },
  ];

  return (
    <section id="success-stories" className="relative py-28" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-border" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Success Stories
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t(
              "Des mandats à la mesure des enjeux",
              "Mandates commensurate with the stakes"
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              "Gouvernements, institutions internationales, multinationales : lorsque les enjeux sont critiques, ils font appel à Buildfluence.",
              "Governments, international institutions, multinationals: when the stakes are critical, they turn to Buildfluence."
            )}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <motion.div
              key={s.client}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">{s.sector}</span>
              <h3 className="mt-2 font-serif text-lg font-bold">{s.client}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.context}</p>
              <div className="mt-4 h-px w-full bg-border" />
              <p className="mt-3 text-sm font-medium text-primary">
                → {s.result}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
