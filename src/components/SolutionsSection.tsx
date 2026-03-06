import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, SearchCheck, Radio } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const pillars = [
    {
      icon: FlaskConical,
      label: t("Pilier I", "Pillar I"),
      title: "Strategic Intelligence Lab",
      punchline: t(
        "Anticiper les ruptures, neutraliser les menaces, saisir les opportunités avant qu'elles ne deviennent visibles.",
        "Anticipate disruptions, neutralize threats, seize opportunities before they become visible."
      ),
      services: ["Strategic Foresight", "Threat Intelligence", "Competitive Mapping"],
      capabilities: [
        t("Veille stratégique multicanale augmentée par l'IA", "AI-augmented multichannel strategic monitoring"),
        t("Détection de signaux faibles et ruptures technologiques", "Weak signal detection and technological disruptions"),
        t("Cartographie dynamique des écosystèmes concurrentiels", "Dynamic mapping of competitive ecosystems"),
        t("Recommandations tactiques actionnables", "Actionable tactical recommendations"),
      ],
    },
    {
      icon: SearchCheck,
      label: t("Pilier II", "Pillar II"),
      title: "Deep Due Diligence",
      punchline: t(
        "Le risque n'est jamais visible. Il se loge dans l'angle mort de ceux qui ne vérifient pas assez profondément.",
        "Risk is never visible. It lies in the blind spot of those who don't verify deeply enough."
      ),
      services: ["Integrity Check", "Risk Profiling", "Regulatory Compliance"],
      capabilities: [
        t("Vérification d'intégrité des contreparties", "Counterparty integrity verification"),
        t("Analyse des structures offshore et montages complexes", "Analysis of offshore structures and complex arrangements"),
        t("Profilage de risque stratégique", "Strategic risk profiling"),
        t("Conformité réglementaire et sanctions", "Regulatory compliance and sanctions"),
      ],
    },
    {
      icon: Radio,
      label: t("Pilier III", "Pillar III"),
      title: "Soft Power & Influence",
      punchline: t(
        "Ceux qui n'écrivent pas leur propre récit sont condamnés à subir celui des autres.",
        "Those who don't write their own narrative are condemned to suffer that of others."
      ),
      services: ["Intelligence d'Influence", "Political Intelligence", t("Attractivité Territoriale", "Territorial Attractiveness")],
      capabilities: [
        t("Construction et protection du narratif stratégique", "Strategic narrative construction and protection"),
        t("Intelligence politique et cartographie des cercles décisionnels", "Political intelligence and decision circle mapping"),
        t("Stratégies d'attractivité territoriale et de marque pays", "Territorial attractiveness and nation branding strategies"),
        t("Positionnement dans les cercles de pouvoir", "Positioning within power circles"),
      ],
    },
  ];

  return (
    <section id="nos-solutions" className="relative py-28" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-border" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("Nos Solutions", "Our Solutions")}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t(
              "Trois piliers au service de la souveraineté décisionnelle",
              "Three pillars serving decision-making sovereignty"
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              "Une infrastructure stratégique complète pour les organisations qui refusent de subir.",
              "A complete strategic infrastructure for organizations that refuse to be subjected."
            )}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group flex flex-col rounded border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {p.label}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold">{p.title}</h3>
              <p className="mt-3 text-sm italic text-muted-foreground">
                {p.punchline}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {p.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-px w-full bg-border" />

              <div className="mt-4 space-y-1">
                {p.services.map((s) => (
                  <span
                    key={s}
                    className="mr-2 inline-block rounded border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
