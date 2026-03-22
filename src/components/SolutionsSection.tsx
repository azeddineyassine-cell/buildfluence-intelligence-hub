import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, SearchCheck, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const navigate = useNavigate();
  const { t } = useLanguage();

  const pillars = [
    {
      icon: FlaskConical,
      label: t("Pilier I", "Pillar I"),
      title: "Strategic Intelligence Lab",
      route: "/solutions/strategic-intelligence-lab",
      punchline: t("Anticiper les ruptures, neutraliser les menaces, saisir les opportunités avant qu'elles ne deviennent visibles.", "Anticipate disruptions, neutralize threats, seize opportunities before they become visible."),
      services: [
        { label: "Strategic Foresight", route: "/solutions/strategic-intelligence-lab" },
        { label: "Threat Intelligence", route: "/solutions/strategic-intelligence-lab" },
        { label: "Competitive Mapping", route: "/solutions/strategic-intelligence-lab" },
      ],
      capabilities: [
        t("Veille stratégique multicanale augmentée par l'IA", "AI-augmented multi-channel strategic monitoring"),
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
      punchline: t("Le risque n'est jamais visible. Il se loge dans l'angle mort de ceux qui ne vérifient pas assez profondément.", "Risk is never visible. It hides in the blind spot of those who don't verify deeply enough."),
      services: [
        { label: "Integrity Check", route: "/solutions/deep-due-diligence" },
        { label: "Risk Profiling", route: "/solutions/deep-due-diligence" },
        { label: "Regulatory Compliance", route: "/solutions/deep-due-diligence" },
      ],
      capabilities: [
        t("Vérification d'intégrité des contreparties", "Counterparty integrity verification"),
        t("Analyse des structures offshore et montages complexes", "Offshore structures and complex schemes analysis"),
        t("Profilage de risque stratégique", "Strategic risk profiling"),
        t("Conformité réglementaire et sanctions", "Regulatory compliance and sanctions"),
      ],
    },
    {
      icon: Radio,
      label: t("Pilier III", "Pillar III"),
      title: "Soft Power & Influence",
      route: "/solutions/soft-power-influence",
      punchline: t("Ceux qui n'écrivent pas leur propre récit sont condamnés à subir celui des autres.", "Those who don't write their own narrative are condemned to endure that of others."),
      services: [
        { label: t("Intelligence d'influence", "Influence Intelligence"), route: "/solutions/soft-power-influence" },
        { label: "Political Intelligence", route: "/solutions/soft-power-influence" },
        { label: t("Attractivité Territoriale", "Territorial Attractiveness"), route: "/solutions/soft-power-influence" },
      ],
      capabilities: [
        t("Construction et protection du narratif stratégique", "Strategic narrative construction and protection"),
        t("Intelligence politique et cartographie des cercles décisionnels", "Political intelligence and decision-making circles mapping"),
        t("Stratégies d'attractivité territoriale et de marque pays", "Territorial attractiveness and nation branding strategies"),
        t("Positionnement dans les cercles de pouvoir", "Positioning within power circles"),
      ],
    },
  ];

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="nos-solutions" className="relative py-28" ref={ref} style={{ background: '#FFFFFF' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">{t("Nos Solutions", "Our Solutions")}</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl" style={{ color: '#0D1B2A' }}>
            {t("Trois piliers au service de votre compétitivité et votre attractivité", "Three pillars serving your competitiveness and attractiveness")}
          </h2>
          <p className="mt-4 text-lg" style={{ color: '#5A6170' }}>
            {t("Nous bâtissons des écosystèmes décisionnels au service de la compétitivité, de l'attractivité et de la souveraineté.", "We build decision-making ecosystems serving competitiveness, attractiveness and sovereignty.")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => goTo(p.route)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-sm border transition-all hover:shadow-lg"
              style={{ background: '#FFFFFF', borderColor: '#E5E7EB', borderTop: '2px solid hsl(43 50% 54% / 0.3)' }}
              onMouseOver={(e) => { (e.currentTarget.style as any).borderTopColor = 'hsl(43 50% 54%)'; }}
              onMouseOut={(e) => { (e.currentTarget.style as any).borderTopColor = 'hsl(43 50% 54% / 0.3)'; }}
            >
              <div className="flex h-44 items-center justify-center" style={{ background: '#F8F8FA' }}>
                <p.icon className="h-12 w-12" style={{ color: 'hsl(43 50% 54% / 0.2)' }} />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm" style={{ background: 'hsl(43 50% 54% / 0.1)' }}>
                    <p.icon className="h-4 w-4" style={{ color: 'hsl(43 50% 54%)' }} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#8A8F9E' }}>{p.label}</span>
                </div>
                <h3 className="font-serif text-xl font-bold" style={{ color: '#0D1B2A' }}>{p.title}</h3>
                <p className="mt-2 text-[13px] italic" style={{ color: '#6B7280' }}>{p.punchline}</p>

                <ul className="mt-5 flex-1 space-y-2">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-[13px]" style={{ color: '#4A5568' }}>
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'hsl(43 50% 54%)' }} />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 h-px w-full" style={{ background: '#E5E7EB' }} />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.services.map((s) => (
                    <span
                      key={s.label}
                      onClick={(e) => { e.stopPropagation(); goTo(s.route); }}
                      className="cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold transition-all"
                      style={{ background: 'hsl(43 50% 54% / 0.12)', color: 'hsl(43 50% 44%)', border: '1px solid hsl(43 50% 54% / 0.25)' }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'hsl(43 50% 54% / 0.22)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'hsl(43 50% 54% / 0.12)'; }}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <span className="btn-gold inline-block px-5 py-2 text-[11px]">
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
