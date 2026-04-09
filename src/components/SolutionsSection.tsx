import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const pillars = [
    {
      icon: "🔬",
      label: t("Pilier I", "Pillar I"),
      title: "Strategic Intelligence Lab",
      route: "/solutions/strategic-intelligence-lab",
      tagline: t(
        "Anticiper les ruptures, neutraliser les menaces, saisir les opportunités avant qu'elles ne deviennent visibles.",
        "Anticipate disruptions, neutralize threats, seize opportunities before they become visible."
      ),
      items: [
        t("Veille stratégique multicanale augmentée par l'IA", "AI-augmented multi-channel strategic monitoring"),
        t("Détection de signaux faibles et ruptures technologiques", "Weak signal detection and technological disruptions"),
        t("Cartographie dynamique des écosystèmes concurrentiels", "Dynamic mapping of competitive ecosystems"),
        t("Recommandations tactiques actionnables", "Actionable tactical recommendations"),
      ],
      tags: ["Strategic Foresight", "Threat Intelligence", "Competitive Mapping"],
    },
    {
      icon: "🌐",
      label: t("Pilier II", "Pillar II"),
      title: "Soft Power & Influence",
      route: "/solutions/soft-power-influence",
      tagline: t(
        "Ceux qui n'écrivent pas leur propre récit sont condamnés à subir celui des autres.",
        "Those who don't write their own narrative are condemned to endure that of others."
      ),
      items: [
        t("Construction et protection du narratif stratégique", "Strategic narrative construction and protection"),
        t("Intelligence politique et cartographie des cercles décisionnels", "Political intelligence and decision-making circles mapping"),
        t("Stratégies d'attractivité territoriale et de marque pays", "Territorial attractiveness and nation branding strategies"),
        t("Positionnement dans les cercles de pouvoir", "Positioning within power circles"),
      ],
      tags: [
        t("Intelligence d'influence", "Influence Intelligence"),
        "Political Intelligence",
        t("Attractivité Territoriale", "Territorial Attractiveness"),
      ],
    },
    {
      icon: "🔍",
      label: t("Pilier III", "Pillar III"),
      title: "Deep Due Diligence",
      route: "/solutions/deep-due-diligence",
      tagline: t(
        "Le risque n'est jamais visible. Il se loge dans l'angle mort de ceux qui ne vérifient pas assez profondément.",
        "Risk is never visible. It hides in the blind spot of those who don't verify deeply enough."
      ),
      items: [
        t("Vérification d'intégrité des contreparties", "Counterparty integrity verification"),
        t("Analyse des structures offshore et montages complexes", "Offshore structures and complex schemes analysis"),
        t("Profilage de risque stratégique", "Strategic risk profiling"),
        t("Conformité réglementaire et sanctions", "Regulatory compliance and sanctions"),
      ],
      tags: ["Integrity Check", "Risk Profiling", "Regulatory Compliance"],
    },
  ];

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="nos-solutions" ref={ref} className="py-10">
      <div className="mx-auto max-w-[1600px] px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-[18px]" style={{ color: 'hsl(var(--gold))' }}>
            {t("Nos solutions", "Our solutions")}
          </p>
          <h2 className="detail-subtitle text-[40px] font-black leading-[1.12] mb-[14px]" style={{ color: 'hsl(var(--navy))', letterSpacing: '-0.5px' }}>
            {t("Trois piliers au service de votre", "Three pillars serving your")}
            <br />
            {t("compétitivité et votre attractivité", "competitiveness and attractiveness")}
          </h2>
          <p className="text-[16px] mx-auto" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '560px' }}>
            {t(
              "Nous bâtissons des écosystèmes décisionnels au service de la compétitivité, de l'attractivité et de la souveraineté.",
              "We build decision-making ecosystems serving competitiveness, attractiveness and sovereignty."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]" style={{ background: 'hsl(var(--border))' }}>
          {pillars.map((p, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => goTo(p.route)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer flex flex-col"
                style={{
                  background: isHovered ? '#0f1f3d' : '#ffffff',
                  transition: 'background 0.2s ease',
                }}
              >
                <div className="flex items-center gap-[14px] p-[28px] pb-5" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
                  <span className="text-[32px] flex-shrink-0">{p.icon}</span>
                  <div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1"
                      style={{ color: isHovered ? 'hsl(38,76%,60%)' : 'hsl(var(--gold))', transition: 'color 0.2s ease' }}
                    >
                      {p.label}
                    </div>
                    <div
                      className="text-[16px] font-bold leading-[1.25]"
                      style={{ color: isHovered ? '#ffffff' : 'hsl(var(--navy))', transition: 'color 0.2s ease' }}
                    >
                      {p.title}
                    </div>
                  </div>
                </div>

                <div className="p-[28px] pt-5 flex-1 flex flex-col">
                  <p
                    className="text-[13px] italic leading-[1.5] mb-4"
                    style={{ color: isHovered ? 'rgba(255,255,255,0.85)' : 'hsl(var(--muted-foreground))', transition: 'color 0.2s ease' }}
                  >
                    {p.tagline}
                  </p>
                  <ul className="mb-5 space-y-[3px]">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="text-[13px] leading-[1.5] pl-[14px] relative"
                        style={{ color: isHovered ? 'rgba(255,255,255,0.9)' : '#374151', transition: 'color 0.2s ease' }}
                      >
                        <span className="absolute left-0 font-bold" style={{ color: 'hsl(var(--gold))' }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-[6px] mt-auto">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-[10px] py-1 rounded-[2px]"
                        style={{
                          color: isHovered ? '#ffffff' : 'hsl(var(--navy))',
                          border: isHovered ? '1px solid rgba(255,255,255,0.3)' : '1px solid hsl(var(--border))',
                          background: isHovered ? 'rgba(255,255,255,0.12)' : 'transparent',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
