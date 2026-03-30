import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Phase {
  id: string;
  label: string[];
  startAngle: number;
  color: string;
  borderColor: string;
  activeColor: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

function getPhases(t: (fr: string, en: string) => string): Phase[] {
  return [
    {
      id: "collecter",
      label: [t("Collecter", "Collect"), t("Surveiller", "Monitor")],
      startAngle: -90,
      color: "#dbeafe",
      borderColor: "#93c5fd",
      activeColor: "#bfdbfe",
      title: t("Collecter & Surveiller", "Collect & Monitor"),
      sub: t("Levier 1 — Captation continue", "Lever 1 — Continuous capture"),
      desc: t(
        "Surveillance en continu de l'écosystème : Signaux géopolitiques, économiques, technologiques, concurrentiels, jeux d'influence et dynamiques narratives. La donnée brute est captée avant qu'elle ne devienne publique.",
        "Continuous ecosystem monitoring: Geopolitical, economic, technological, competitive signals, influence games and narrative dynamics. Raw data is captured before it becomes public."
      ),
      tags: [t("Marché", "Market"), t("Investisseurs", "Investors"), t("Signaux faibles", "Weak signals"), t("Temps réel", "Real-time")],
    },
    {
      id: "analyser",
      label: [t("Analyser", "Analyze")],
      startAngle: -30,
      color: "#e0f2fe",
      borderColor: "#7dd3fc",
      activeColor: "#bae6fd",
      title: t("Analyser", "Analyze"),
      sub: t("Levier 2 — Segmentation stratégique", "Lever 2 — Strategic segmentation"),
      desc: t(
        "Analyse et catégorisation des Stakeholders et des enjeux stratégiques. Thématisation et segmentation précise des parties prenantes, cartographie de leurs intérêts, motivations et niveaux d'influence.",
        "Analysis and categorization of Stakeholders and strategic issues. Precise thematic segmentation of stakeholders, mapping their interests, motivations and influence levels."
      ),
      tags: ["Stakeholders", t("Enjeux", "Issues"), "Segmentation", "Innovation"],
    },
    {
      id: "cartographier",
      label: [t("Cartographier", "Map")],
      startAngle: 30,
      color: "#cffafe",
      borderColor: "#67e8f9",
      activeColor: "#a5f3fc",
      title: t("Cartographier", "Map"),
      sub: t("Levier 3 — Risques & Narratifs", "Lever 3 — Risks & Narratives"),
      desc: t(
        "Cartographie des risques inhérents, des angles morts et de la dynamique des narratifs. Identification des zones de vulnérabilité et des récits dominants susceptibles d'affecter votre positionnement.",
        "Mapping of inherent risks, blind spots and narrative dynamics. Identification of vulnerability zones and dominant narratives likely to affect your positioning."
      ),
      tags: [t("Risques", "Risks"), t("Angles morts", "Blind spots"), t("Narratifs", "Narratives"), t("Concurrence", "Competition")],
    },
    {
      id: "identifier",
      label: [t("Identifier", "Identify")],
      startAngle: 90,
      color: "#cae8f8",
      borderColor: "#60acd4",
      activeColor: "#a8d5ee",
      title: t("Identifier", "Identify"),
      sub: t("Levier 4 — Acteurs clés", "Lever 4 — Key actors"),
      desc: t(
        "Identification précoce des dynamiques susceptibles d'activer l'attractivité et la crédibilité : leaders d'opinion, concurrents, investisseurs, partenaires. Anticiper qui influencera demain.",
        "Early identification of dynamics likely to activate attractiveness and credibility: opinion leaders, competitors, investors, partners. Anticipate who will influence tomorrow."
      ),
      tags: [t("Leaders d'opinion", "Opinion leaders"), t("Concurrents", "Competitors"), t("Partenaires", "Partners"), t("Écosystème", "Ecosystem")],
    },
    {
      id: "detecter",
      label: [t("Détecter", "Detect")],
      startAngle: 150,
      color: "#dde9f7",
      borderColor: "#7ba8cc",
      activeColor: "#c0d8ee",
      title: t("Détecter", "Detect"),
      sub: t("Levier 5 — Opportunités dissimulées", "Lever 5 — Hidden opportunities"),
      desc: t(
        "Détection des marchés émergents, tendances de fond et opportunités dissimulées dans la complexité des données. Transformer le bruit informationnel en avantage concurrentiel tangible.",
        "Detection of emerging markets, underlying trends and hidden opportunities in data complexity. Transform informational noise into tangible competitive advantage."
      ),
      tags: [t("Marchés", "Markets"), t("Tendances", "Trends"), t("Opportunités", "Opportunities"), t("Produits", "Products")],
    },
    {
      id: "influencer",
      label: [t("Influencer", "Influence")],
      startAngle: 210,
      color: "#f0e6d3",
      borderColor: "#d4a96a",
      activeColor: "#e8d4b0",
      title: t("Influencer", "Influence"),
      sub: t("Levier 6 — Action & Décision", "Lever 6 — Action & Decision"),
      desc: t(
        "Actions d'influence visant l'adhésion de l'opinion publique et des décideurs. Traduction de l'intelligence stratégique en narratifs actionnables, leviers de persuasion et positions de force.",
        "Influence actions aimed at gaining public opinion and decision-makers' support. Translation of strategic intelligence into actionable narratives, persuasion levers and positions of strength."
      ),
      tags: [t("Opinion publique", "Public opinion"), t("Décideurs", "Decision-makers"), t("Narratifs", "Narratives"), t("Investisseurs", "Investors")],
    },
  ];
}

// ─── SVG Helpers ──────────────────────────────────────────────────────────────

const CX = 170, CY = 170, INNER = 80, OUTER = 147;
const STEP = 360 / 6;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function segPath(startDeg: number, endDeg: number) {
  const s1 = polar(startDeg, OUTER), s2 = polar(startDeg, INNER);
  const e1 = polar(endDeg, OUTER), e2 = polar(endDeg, INNER);
  const laf = endDeg - startDeg > 180 ? 1 : 0;
  return `M${s1.x},${s1.y} A${OUTER},${OUTER} 0 ${laf} 1 ${e1.x},${e1.y} L${e2.x},${e2.y} A${INNER},${INNER} 0 ${laf} 0 ${s2.x},${s2.y} Z`;
}

// ─── Orbit Diagram ────────────────────────────────────────────────────────────

function OrbitDiagram({
  phases,
  activeId,
  hoveredId,
  onClickPhase,
  onHoverPhase,
}: {
  phases: Phase[];
  activeId: string | null;
  hoveredId: string | null;
  onClickPhase: (id: string) => void;
  onHoverPhase: (id: string | null) => void;
}) {
  return (
    <svg viewBox="0 0 340 340" width="100%" className="block">
      <circle cx={CX} cy={CY} r={OUTER} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

      {phases.map((p) => {
        const startDeg = p.startAngle - STEP / 2 + 1.5;
        const endDeg = p.startAngle + STEP / 2 - 1.5;
        const midAngle = (p.startAngle * Math.PI) / 180;
        const labelR = (INNER + OUTER) / 2;
        const lx = CX + labelR * Math.cos(midAngle);
        const ly = CY + labelR * Math.sin(midAngle);

        const isActive = activeId === p.id;
        const isHovered = hoveredId === p.id;
        const fill = isActive || isHovered ? p.activeColor : p.color;

        return (
          <g key={p.id}>
            <path
              d={segPath(startDeg, endDeg)}
              fill={fill}
              stroke="#fff"
              strokeWidth="2"
              style={{ cursor: "pointer", transition: "fill .2s" }}
              onClick={() => onClickPhase(p.id)}
              onMouseEnter={() => onHoverPhase(p.id)}
              onMouseLeave={() => onHoverPhase(null)}
            />
            {p.label.map((line, li) => (
              <text
                key={li}
                x={lx}
                y={ly + (li - (p.label.length - 1) / 2) * 13}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                fontWeight="500"
                fill="#1e3a5f"
                style={{ pointerEvents: "none" }}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Center circle — Action 5: Build=#023982, fluence=#fac541 */}
      <circle cx={CX} cy={CY} r={INNER - 2} fill="white" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
      <text x={CX} y={CY - 10} textAnchor="middle" fontSize="15" fontWeight="500">
        <tspan fill="#023982">Build</tspan>
        <tspan fill="#fac541">fluence</tspan>
      </text>
      <text x={CX} y={CY + 7} textAnchor="middle" fontSize="7.5" fill="#64748b" letterSpacing="0.5">
        Sovereign Decision
      </text>
      <text x={CX} y={CY + 18} textAnchor="middle" fontSize="7.5" fill="#64748b" letterSpacing="0.5">
        Infrastructure
      </text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ConstructionInfluence() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const phases = getPhases(t);
  const activePhase = phases.find((p) => p.id === activeId) ?? null;

  const handleClick = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="w-full py-6 px-4 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Interactive panel (left) + Orbit diagram (right) side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6 items-center">

          {/* LEFT — Detail panel */}
          <div
            className="rounded-xl p-5 transition-all duration-300 min-h-[180px]"
            style={{
              border: activePhase
                ? `1.5px solid ${activePhase.borderColor}`
                : "0.5px solid rgba(0,0,0,0.08)",
              background: activePhase ? activePhase.color : "rgba(0,0,0,0.02)",
            }}
          >
            {activePhase ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                  {activePhase.sub}
                </p>
                <p className="text-sm font-semibold text-slate-800 mb-2">{activePhase.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{activePhase.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {activePhase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-0.5 rounded-full bg-white text-slate-500"
                      style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[13px] italic font-medium text-slate-600 leading-relaxed py-4">
                {t(
                  "Disposez de la capacité à anticiper les ruptures, avant qu'elles ne deviennent des crises — c'est devenu le premier avantage compétitif des organisations souveraines.",
                  "Have the ability to anticipate disruptions, before they become crises — this has become the primary competitive advantage of sovereign organizations."
                )}
              </p>
            )}
          </div>

          {/* RIGHT — Orbit diagram (enlarged ~+15-20%) */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-full max-w-md">
              <OrbitDiagram
                phases={phases}
                activeId={activeId}
                hoveredId={hoveredId}
                onClickPhase={handleClick}
                onHoverPhase={setHoveredId}
              />
            </div>
            <p className="text-xs text-slate-400">
              {t("Cliquez sur chaque phase pour explorer", "Click on each phase to explore")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
