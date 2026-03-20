import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, SearchCheck, Radio } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const navigate = useNavigate();

  const pillars = [
    {
      icon: FlaskConical,
      label: t("Pilier I", "Pillar I"),
      title: "Strategic Intelligence Lab",
      route: "/solutions/strategic-intelligence-lab",
      punchline: t(
        "Anticiper les ruptures, neutraliser les menaces, saisir les opportunités avant qu'elles ne deviennent visibles.",
        "Anticipate disruptions, neutralize threats, seize opportunities before they become visible."
      ),
      services: [
        { label: "Strategic Foresight", route: "/solutions/strategic-intelligence-lab" },
        { label: "Threat Intelligence", route: "/solutions/strategic-intelligence-lab" },
        { label: "Competitive Mapping", route: "/solutions/strategic-intelligence-lab" },
      ],
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
      route: "/solutions/deep-due-diligence",
      punchline: t(
        "Le risque n'est jamais visible. Il se loge dans l'angle mort de ceux qui ne vérifient pas assez profondément.",
        "Risk is never visible. It lies in the blind spot of those who don't verify deeply enough."
      ),
      services: [
        { label: "Integrity Check", route: "/solutions/deep-due-diligence" },
        { label: "Risk Profiling", route: "/solutions/deep-due-diligence" },
        { label: "Regulatory Compliance", route: "/solutions/deep-due-diligence" },
      ],
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
      route: "/solutions/soft-power-influence",
      punchline: t(
        "Ceux qui n'écrivent pas leur propre récit sont condamnés à subir celui des autres.",
        "Those who don't write their own narrative are condemned to suffer that of others."
      ),
      services: [
        { label: t("Intelligence d'Influence", "Influence Intelligence"), route: "/solutions/soft-power-influence" },
        { label: "Political Intelligence", route: "/solutions/soft-power-influence" },
        { label: t("Attractivité Territoriale", "Territorial Attractiveness"), route: "/solutions/soft-power-influence" },
      ],
      capabilities: [
        t("Construction et protection du narratif stratégique", "Strategic narrative construction and protection"),
        t("Intelligence politique et cartographie des cercles décisionnels", "Political intelligence and decision circle mapping"),
        t("Stratégies d'attractivité territoriale et de marque pays", "Territorial attractiveness and nation branding strategies"),
        t("Positionnement dans les cercles de pouvoir", "Positioning within power circles"),
      ],
    },
  ];

  return (
    <section id="nos-solutions" className="relative bg-secondary py-28" ref={ref}>
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
              "Trois piliers au service de votre compétitivité et votre attractivité",
              "Three pillars serving your competitiveness and attractiveness"
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
              onClick={() => navigate(p.route)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded border border-border bg-background transition-all hover:border-primary/30 hover:shadow-navy"
            >
              <div className="flex h-48 items-center justify-center bg-muted">
                <p.icon className="h-12 w-12 text-primary/30" />
              </div>

              <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                    <p.icon className="h-5 w-5 text-primary" />
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
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 h-px w-full bg-border" />

                <div className="mt-4 space-y-1">
                  {p.services.map((s) => (
                    <span
                      key={s.label}
                      onClick={(e) => { e.stopPropagation(); navigate(s.route); }}
                      className="mr-2 inline-block cursor-pointer rounded border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {s.label}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <span className="inline-block rounded bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent-foreground transition-all group-hover:shadow-gold">
                    {t("Explorer →", "Explore →")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
