import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { FormCustom } from "@/components/FormCustom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import logoFondBlanc from "@/assets/logo-buildfluence-fond-blanc.png";

const SEG_COLORS = ["#1B3E6A", "#1e4878", "#1B3E6A", "#1e4878", "#1B3E6A", "#1e4878"];
const BRIGHT_COLORS = ["#2a5a9a", "#2d6aaa", "#2a5a9a", "#2d6aaa", "#2a5a9a", "#2d6aaa"];

// Segment angles in degrees (standard math: 0=right, CCW)
// Each segment spans 60°, starting from -90° (top)
const SEG_ANGLES = [
  { start: -90, end: -30 },   // seg0: top-right
  { start: -30, end: 30 },    // seg1: right
  { start: 30, end: 90 },     // seg2: bottom-right
  { start: 90, end: 150 },    // seg3: bottom-left
  { start: 150, end: 210 },   // seg4: left
  { start: 210, end: 270 },   // seg5: top-left
];

function segmentPath(i: number, cx: number, cy: number, rInner: number, rOuter: number) {
  const { start, end } = SEG_ANGLES[i];
  const s = (start * Math.PI) / 180;
  const e = (end * Math.PI) / 180;
  const x1o = cx + rOuter * Math.cos(s);
  const y1o = cy + rOuter * Math.sin(s);
  const x2o = cx + rOuter * Math.cos(e);
  const y2o = cy + rOuter * Math.sin(e);
  const x1i = cx + rInner * Math.cos(e);
  const y1i = cy + rInner * Math.sin(e);
  const x2i = cx + rInner * Math.cos(s);
  const y2i = cy + rInner * Math.sin(s);
  return `M ${x1o},${y1o} A ${rOuter},${rOuter} 0 0,1 ${x2o},${y2o} L ${x1i},${y1i} A ${rInner},${rInner} 0 0,0 ${x2i},${y2i} Z`;
}

function segmentCenter(i: number, cx: number, cy: number, rInner: number, rOuter: number) {
  const { start, end } = SEG_ANGLES[i];
  const mid = ((start + end) / 2) * Math.PI / 180;
  const rMid = (rInner + rOuter) / 2;
  return { x: cx + rMid * Math.cos(mid), y: cy + rMid * Math.sin(mid) };
}

const CompetitiveVelocityEngine = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<number>(-1);
  const [showCenter, setShowCenter] = useState(true);
  const [f1Open, setF1Open] = useState(false);

  const SEGMENTS_DATA = [
    { label: t("DÉCISION", "DECISION"), twoLines: false },
    { label: t("GÉOPOLITIQUE", "GEOPOLITICS"), twoLines: false },
    { label: t("MARKET\nINTELLIGENCE", "MARKET\nINTELLIGENCE"), twoLines: true },
    { label: t("TECHNOLOGIE", "TECHNOLOGY"), twoLines: false },
    { label: t("SCÉNARIOS", "SCENARIOS"), twoLines: false },
    { label: t("ÉCOSYSTÈME", "ECOSYSTEM"), twoLines: false },
  ];

  const DETAILS = [
    { title: t("Décision", "Decision"), tag: t("Output & Action stratégique", "Output & Strategic Action"), items: [t("Hiérarchisation : Go / No-Go / Timing optimal", "Prioritization: Go / No-Go / Optimal Timing"), t("Réduction de l'incertitude décisionnelle", "Reduction of decision uncertainty"), t("Livrables actionnables & synthèses", "Actionable deliverables & summaries"), t("Briefings C-Level confidentiels", "Confidential C-Level briefings"), t("Dashboards temps réel", "Real-time dashboards")] },
    { title: t("Géopolitique", "Geopolitics"), tag: t("Captation & Analyse", "Capture & Analysis"), items: [t("Surveillance tensions & alliances émergentes", "Monitoring tensions & emerging alliances"), t("Détection ruptures avant médiatisation", "Detecting disruptions before media coverage"), t("Impact sur marchés & partenaires", "Impact on markets & partners"), t("Cartographie acteurs diplomatiques", "Diplomatic actors mapping"), t("Anticipation décisions réglementaires", "Anticipating regulatory decisions")] },
    { title: "Market Intelligence", tag: t("Flux & Compétitivité", "Flow & Competitiveness"), items: [t("Suivi flux d'IDE & mouvements de capitaux", "Tracking FDI flows & capital movements"), t("Positions concurrentielles par secteur", "Competitive positions by sector"), t("Détection opportunités à fort levier", "Detecting high-leverage opportunities"), t("Benchmarking international", "International benchmarking"), t("Scoring compétitivité : Go / Vigilance / No-Go", "Competitiveness scoring: Go / Caution / No-Go")] },
    { title: t("Technologie", "Technology"), tag: t("Innovation & Disruption", "Innovation & Disruption"), items: [t("Veille brevets & publications scientifiques", "Patent & scientific publication monitoring"), t("Détection disruptions avant adoption massive", "Detecting disruptions before mass adoption"), t("Cartographie acteurs de l'innovation", "Innovation actors mapping"), t("Impact technologique sur rapports de force", "Technological impact on power dynamics"), t("Partenariats technologiques stratégiques", "Strategic technology partnerships")] },
    { title: t("Scénarios", "Scenarios"), tag: t("Projection & Anticipation", "Projection & Anticipation"), items: [t("Modélisation scénarios à 3, 6, 12 mois", "Scenario modeling at 3, 6, 12 months"), t("Projection mouvements concurrentiels", "Competitive movement projection"), t("Simulation d'impact des ruptures", "Disruption impact simulation"), t("Fenêtres d'opportunité & timing optimal", "Opportunity windows & optimal timing"), t("Plans de contingence à risque élevé", "High-risk contingency plans")] },
    { title: t("Écosystème", "Ecosystem"), tag: t("Cartographie & Rapports de force", "Mapping & Power Dynamics"), items: [t("Modélisation évolutive des acteurs clés", "Evolutionary modeling of key actors"), t("Flux & rapports de force dynamiques", "Dynamic flows & power dynamics"), t("Alliances, oppositions & neutralités", "Alliances, oppositions & neutralities"), t("Nœuds d'amplification & leviers", "Amplification nodes & levers"), t("Mise à jour continue selon signaux captés", "Continuous updates based on captured signals")] },
  ];

  const CENTER_DETAIL = {
    tag: t("DISPOSITIF STRATÉGIQUE", "STRATEGIC FRAMEWORK"),
    title: t("ACTIVER LE MOTEUR DE VÉLOCITÉ", "ACTIVATE THE VELOCITY ENGINE"),
    paragraphs: [
      t(
        "Oubliez les rapports d'études volumineux faits pour le placard & optez pour des analyses factuelles, dynamiques et actionnables.",
        "Forget bulky study reports made for the shelf & opt for factual, dynamic and actionable analyses."
      ),
      t(
        "Cliquez sur les secteurs du cercle pour explorer notre méthodologie d'Étude, d'Analyse et de Benchmark.",
        "Click on the circle sectors to explore our Study, Analysis and Benchmark methodology."
      ),
    ],
    italic: t(
      "Notre Track Record est multi sectoriel avec des résultats conformes aux attentes clients",
      "Our Track Record is multi-sector with results in line with client expectations"
    ),
  };

  const pick = useCallback((i: number) => {
    setShowCenter(false);
    setSelected(prev => prev === i ? -1 : i);
  }, []);

  const handleLogoClick = useCallback(() => {
    setSelected(-1);
    setShowCenter(true);
  }, []);

  const detail = selected >= 0 ? DETAILS[selected] : null;

  const CX = 250, CY = 250, R_INNER = 85, R_OUTER = 220;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F0F7FF", color: "#0D1B2A", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        style={{ textAlign: "center", padding: "52px 40px 20px" }}
      >
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: 12 }}>
          Strategic Innovation
        </div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 10, letterSpacing: -1 }}>
          Competitive <span style={{ color: "#C9A84C" }}>Velocity</span> Engine
        </h1>
        <div style={{ fontSize: 14, color: "#6b7c93", maxWidth: 600, margin: "0 auto 16px", lineHeight: 1.7 }}>
          {t(
            "Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des environnements concurrentiels et hyper-complexes.",
            "A new generation of strategic analysis, designed to accelerate decision-making in competitive and hyper-complex environments."
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {[
            { fr: "Benchmark", en: "Benchmark" },
            { fr: "Analyse", en: "Analysis" },
            { fr: "Anticipation", en: "Anticipation" },
            { fr: "Décision", en: "Decision" },
          ].map(tag => (
            <span
              key={tag.fr}
              className="cursor-default transition-all duration-200"
              style={{ fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, border: "1.5px solid #C9A84C", color: "#C9A84C", letterSpacing: 0.5 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C9A84C";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#C9A84C";
              }}
            >
              {t(tag.fr, tag.en)}
            </span>
          ))}
        </div>
      </motion.div>

      {/* MAIN: WHEEL + PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, maxWidth: 1100, margin: "0 auto 48px", padding: "0 32px", flexWrap: "wrap" }}
      >
        {/* WHEEL */}
        <div className="w-[500px] h-[500px] max-md:w-[320px] max-md:h-[320px]" style={{ position: "relative", flexShrink: 0 }}>
          <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            {SEGMENTS_DATA.map((seg, i) => {
              const path = segmentPath(i, CX, CY, R_INNER, R_OUTER);
              const center = segmentCenter(i, CX, CY, R_INNER, R_OUTER);
              // Rotation for readability: make text horizontal or follow segment angle
              const { start, end } = SEG_ANGLES[i];
              const midAngleDeg = (start + end) / 2;
              // Keep text horizontal for all segments
              return (
                <g key={i}>
                  <path
                    d={path}
                    fill={selected === i ? BRIGHT_COLORS[i] : SEG_COLORS[i]}
                    opacity={selected >= 0 && selected !== i ? 0.55 : 1}
                    stroke="#F0F7FF"
                    strokeWidth={3}
                    style={{ cursor: "pointer", transition: "filter 0.2s, opacity 0.2s" }}
                    onClick={() => pick(i)}
                  />
                  {seg.twoLines ? (
                    <>
                      <text x={center.x} y={center.y - 7} textAnchor="middle" dominantBaseline="central" fontFamily="Inter, sans-serif" fontSize={9} fontWeight={700} fill="#ffffff" letterSpacing={0.5} style={{ pointerEvents: "none" }}>MARKET</text>
                      <text x={center.x} y={center.y + 7} textAnchor="middle" dominantBaseline="central" fontFamily="Inter, sans-serif" fontSize={9} fontWeight={700} fill="#ffffff" letterSpacing={0.5} style={{ pointerEvents: "none" }}>INTELLIGENCE</text>
                    </>
                  ) : (
                    <text x={center.x} y={center.y} textAnchor="middle" dominantBaseline="central" fontFamily="Inter, sans-serif" fontSize={9.5} fontWeight={700} fill="#ffffff" letterSpacing={0.8} style={{ pointerEvents: "none" }}>
                      {seg.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Central circle — WHITE background with logo */}
            <circle cx={CX} cy={CY} r={83} fill="#FFFFFF" stroke="#ddd" strokeWidth={2} style={{ cursor: "pointer" }} onClick={handleLogoClick} />
            <foreignObject x={CX - 70} y={CY - 50} width={140} height={100} style={{ pointerEvents: "none" }}>
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoFondBlanc} alt="Buildfluence" style={{ width: "90%", objectFit: "contain", cursor: "pointer", pointerEvents: "auto" }} onClick={handleLogoClick} />
              </div>
            </foreignObject>
          </svg>
        </div>

        {/* DETAIL PANEL */}
        <div style={{ flex: 1, minWidth: 280, maxWidth: 420, background: "#fff", border: "0.5px solid rgba(13,27,42,0.08)", borderRadius: 16, padding: 32, minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {showCenter ? (
            <motion.div
              key="center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ fontSize: 10, color: "#C9A84C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{CENTER_DETAIL.tag}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0D1B2A", marginBottom: 16 }}>{CENTER_DETAIL.title}</div>
              {CENTER_DETAIL.paragraphs.map((p, idx) => (
                <p key={idx} style={{ fontSize: 12.5, color: "#4a5568", lineHeight: 1.7, marginBottom: 10 }}>{p}</p>
              ))}
              <p style={{ fontSize: 12.5, color: "#8899aa", fontStyle: "italic", lineHeight: 1.7, marginTop: 8 }}>{CENTER_DETAIL.italic}</p>
            </motion.div>
          ) : !detail ? (
            <div style={{ textAlign: "center", color: "#aabbcc", fontSize: 13, fontStyle: "italic" }}>
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>🎯</div>
              {t("Sélectionnez un secteur pour explorer ses dimensions stratégiques", "Select a sector to explore its strategic dimensions")}
            </div>
          ) : (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ fontSize: 10, color: "#C9A84C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{detail.tag}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0D1B2A", marginBottom: 16 }}>{detail.title}</div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {detail.items.map((item, idx) => (
                  <li key={idx} style={{ fontSize: 12.5, color: "#4a5568", padding: "8px 0 8px 16px", position: "relative", borderBottom: idx < detail.items.length - 1 ? "0.5px solid rgba(13,27,42,0.05)" : "none", lineHeight: 1.5 }}>
                    <span style={{ position: "absolute", left: 0, color: "#C9A84C", fontSize: 11, top: 9 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* VERDICT */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4 }}
        style={{ maxWidth: 1100, margin: "0 auto 44px", padding: "0 32px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.3fr]" style={{ background: "#1B3E6A", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: 24, textAlign: "center", borderRight: "0.5px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7 }} className="max-md:border-r-0 max-md:border-b max-md:border-b-white/10">
            <div style={{ fontSize: 12, color: "#C9A84C", fontWeight: 700, letterSpacing: 0.5 }}>®</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t("C'est plus qu'une étude", "It's more than a study")}</div>
            <div style={{ fontSize: 11, color: "#8eafd4", lineHeight: 1.5 }}>{t("Des écosystèmes de décision construits sur mesure, pas des rapports statiques livrés et oubliés", "Custom-built decision ecosystems, not static reports delivered and forgotten")}</div>
          </div>
          <div style={{ padding: 24, textAlign: "center", borderRight: "0.5px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7 }} className="max-md:border-r-0 max-md:border-b max-md:border-b-white/10">
            <div style={{ fontSize: 12, color: "#C9A84C", fontWeight: 700, letterSpacing: 0.5 }}>®</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t("C'est plus qu'un benchmark", "It's more than a benchmark")}</div>
            <div style={{ fontSize: 11, color: "#8eafd4", lineHeight: 1.5 }}>{t("Une lecture des stratégies implicites que les données seules ne révèlent jamais", "A reading of implicit strategies that data alone never reveals")}</div>
          </div>
          <div style={{ padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7, background: "rgba(201,168,76,0.12)" }}>
            <div style={{ fontSize: 12, color: "#C9A84C", fontWeight: 700, letterSpacing: 0.5 }}>®</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{t("C'est un moteur décisionnel", "It's a decision engine")}</div>
            <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.5 }}>{t("Conçu pour inverser les rapports de force en votre faveur, avant que vos concurrents ne s'en aperçoivent", "Designed to reverse power dynamics in your favor, before your competitors notice")}</div>
            <span style={{ fontSize: 10, padding: "4px 12px", borderRadius: 20, background: "#C9A84C", color: "#0D1B2A", fontWeight: 700, letterSpacing: 0.5 }}>COMPETITIVE VELOCITY ENGINE</span>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.55 }}
        style={{ textAlign: "center", padding: "0 32px 52px" }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "#fff", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 12, padding: "16px 28px" }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{t("Activez votre", "Activate your")} <span style={{ color: "#C9A84C" }}>Competitive Velocity Engine</span></div>
            <div style={{ fontSize: 11, color: "#8899aa", marginTop: 2 }}>{t("Réservez un échange stratégique confidentiel", "Book a confidential strategic exchange")}</div>
          </div>
          <button
            onClick={() => setF1Open(true)}
            className="hover:bg-[#dbb85c] transition-colors duration-200"
            style={{ fontSize: 11, padding: "7px 16px", borderRadius: 20, background: "#C9A84C", color: "#0D1B2A", fontWeight: 700, cursor: "pointer", border: "none" }}
          >
            {t("ÉCHANGE STRATÉGIQUE →", "STRATEGIC EXCHANGE →")}
          </button>
        </div>
      </motion.div>

      <CTAFooter />
      <FormCustom
        open={f1Open}
        onClose={() => setF1Open(false)}
        title={t("Lancer votre Etude & Analyse Stratégique", "Launch your Strategic Study & Analysis")}
        submitLabel={t("Activer le CVE", "Activate CVE")}
        formType="competitive_velocity_engine"
        fields={[
          { name: "name", placeholder: t("Nom & Prénom", "Full name"), required: true, maxLength: 100 },
          { name: "organization", placeholder: t("Organisation", "Organization"), required: true, maxLength: 100 },
          { name: "sector", placeholder: t("Secteur", "Sector"), required: true, maxLength: 150 },
          { name: "competitors", placeholder: t("Principaux concurrents à analyser", "Main competitors to analyze"), required: true, type: "textarea", rows: 4 },
          { name: "email", placeholder: t("Email professionnel", "Professional email"), required: true, type: "email", maxLength: 255 },
          { name: "phone", placeholder: t("Téléphone *", "Phone *"), required: true, type: "tel", maxLength: 40 },
        ]}
      />
    </div>
  );
};

export default CompetitiveVelocityEngine;
