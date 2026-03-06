import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, BookOpen, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const InsightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const insights = [
    {
      icon: FileText,
      type: t("Analyse stratégique", "Strategic Analysis"),
      title: t(
        "Guerre informationnelle : les nouvelles armes de déstabilisation",
        "Information Warfare: The New Weapons of Destabilization"
      ),
      description: t(
        "Décryptage des mécanismes de désinformation utilisés contre les institutions souveraines et les grands groupes industriels.",
        "Decoding the disinformation mechanisms used against sovereign institutions and large industrial groups."
      ),
    },
    {
      icon: BookOpen,
      type: t("Note de position", "Position Paper"),
      title: t(
        "Due diligence approfondie : au-delà de la conformité",
        "Deep Due Diligence: Beyond Compliance"
      ),
      description: t(
        "Pourquoi les méthodologies classiques de due diligence laissent 70% des risques dans l'angle mort des décideurs.",
        "Why classic due diligence methodologies leave 70% of risks in the decision-makers' blind spot."
      ),
    },
    {
      icon: Mic,
      type: t("Conférence", "Conference"),
      title: t(
        "Souveraineté décisionnelle à l'ère de l'IA",
        "Decision Sovereignty in the Age of AI"
      ),
      description: t(
        "Intervention sur les enjeux de souveraineté informationnelle et la transformation des infrastructures décisionnelles.",
        "Keynote on information sovereignty challenges and the transformation of decision-making infrastructure."
      ),
    },
  ];

  return (
    <section id="insights" className="relative py-28" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-border" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Insights & Resources
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t("Éclairages stratégiques", "Strategic Insights")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              "Analyses, notes de position et interventions au service de la compréhension des enjeux contemporains.",
              "Analyses, position papers and interventions serving the understanding of contemporary challenges."
            )}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {insights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group flex flex-col rounded border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <div className="mb-4 flex items-center gap-3">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
                  {item.type}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold leading-snug">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-6">
                <span className="text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  {t("Lire →", "Read →")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
