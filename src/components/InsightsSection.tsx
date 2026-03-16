import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FileText, BookOpen, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const InsightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      summary: t(
        "Résumé de l'analyse — contenu détaillé à définir selon les spécifications du projet.",
        "Analysis summary — detailed content to be defined per project specifications."
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
      summary: t(
        "Résumé de la note — contenu détaillé à définir selon les spécifications du projet.",
        "Paper summary — detailed content to be defined per project specifications."
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
      summary: t(
        "Résumé de la conférence — contenu détaillé à définir selon les spécifications du projet.",
        "Conference summary — detailed content to be defined per project specifications."
      ),
    },
  ];

  return (
    <section id="insights" className="relative bg-background py-28" ref={ref}>
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
            <motion.button
              key={item.title}
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group flex cursor-pointer flex-col rounded border border-border bg-background p-8 text-left transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <div className="mb-4 flex items-center gap-3">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent-foreground">
                  {item.type}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold leading-snug">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-6">
                <span className="text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  {t("Lire & télécharger →", "Read & download →")}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={openIndex !== null} onOpenChange={() => setOpenIndex(null)}>
        {openIndex !== null && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">{insights[openIndex].title}</DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-relaxed">
                {insights[openIndex].summary}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                {t(
                  "Remplissez le formulaire pour recevoir l'étude complète.",
                  "Fill in the form to receive the full study."
                )}
              </p>
              <input
                type="email"
                placeholder={t("Email professionnel", "Professional email")}
                className="w-full rounded border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
              <button className="w-full rounded bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-navy">
                {t("Télécharger l'étude", "Download study")}
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default InsightsSection;
