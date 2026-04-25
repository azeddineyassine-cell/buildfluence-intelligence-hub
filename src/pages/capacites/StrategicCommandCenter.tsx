import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import DetailPageLayout from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormCustom } from "@/components/FormCustom";
import { motion, AnimatePresence } from "framer-motion";

/* ====================================================================
   CARTOGRAPHIE INTERACTIVE — Le schéma narratif de Buildfluence
   Flux : Donnée → Information → Connaissance → Insight-Driven
   5 capacités alimentent le Command Center (Hémisphère REAL + WAR)
   V3 : Tooltip élégant au survol avec Force + Objectif + lien interne
==================================================================== */
interface CapacityData {
  icon: string;
  full: string;
  role: string;
  force: string;
  objective: string;
  route: string;
}

const CapacityCard = ({
  cap,
  idx,
  isHovered,
  onEnter,
  onLeave,
  t,
}: {
  cap: CapacityData;
  idx: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  t: (fr: string, en: string) => string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [adjust, setAdjust] = useState<{ shiftX: number; arrowX: number }>({
    shiftX: 0,
    arrowX: 50,
  });

  useLayoutEffect(() => {
    if (!isHovered) {
      setAdjust({ shiftX: 0, arrowX: 50 });
      return;
    }
    const tip = tooltipRef.current;
    const card = cardRef.current;
    if (!tip || !card) return;
    const tipRect = tip.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const margin = 12;
    const vw = window.innerWidth;
    let shiftX = 0;
    if (tipRect.right > vw - margin) {
      shiftX = vw - margin - tipRect.right;
    } else if (tipRect.left < margin) {
      shiftX = margin - tipRect.left;
    }
    // arrow should point to center of card, expressed in % of tooltip width
    const cardCenter = cardRect.left + cardRect.width / 2;
    const tipLeft = tipRect.left + shiftX;
    const arrowPx = cardCenter - tipLeft;
    const arrowPct = Math.max(8, Math.min(92, (arrowPx / tipRect.width) * 100));
    setAdjust({ shiftX, arrowX: arrowPct });
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ position: "relative" }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 12px)",
              left: "50%",
              transform: `translateX(calc(-50% + ${adjust.shiftX}px))`,
              width: 280,
              maxWidth: "calc(100vw - 40px)",
              background: "#0D1B2A",
              color: "#F5F1E8",
              border: "1px solid #C9A84C",
              padding: "18px 18px 14px",
              borderRadius: 2,
              boxShadow: "0 14px 40px rgba(13,27,42,0.25)",
              zIndex: 50,
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -7,
                left: `${adjust.arrowX}%`,
                transform: "translateX(-50%) rotate(45deg)",
                width: 12,
                height: 12,
                background: "#0D1B2A",
                borderRight: "1px solid #C9A84C",
                borderBottom: "1px solid #C9A84C",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                paddingBottom: 10,
                borderBottom: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <span style={{ fontSize: 22, filter: "brightness(1.4)" }}>{cap.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#F5F1E8",
                    lineHeight: 1.2,
                  }}
                >
                  {cap.full}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 8.5,
                  letterSpacing: "0.3em",
                  color: "#C9A84C",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                › {t("Force", "Strength")}
              </div>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 15,
                  fontStyle: "italic",
                  color: "#e0c88a",
                  lineHeight: 1.45,
                }}
              >
                {cap.force}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 8.5,
                  letterSpacing: "0.3em",
                  color: "#C9A84C",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                › {t("Objectif", "Objective")}
              </div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 13,
                  color: "rgba(245,241,232,0.92)",
                  lineHeight: 1.5,
                }}
              >
                {cap.objective}
              </div>
            </div>
            <Link
              to={cap.route}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
                textDecoration: "none",
                borderBottom: "1px solid rgba(201,168,76,0.4)",
                paddingBottom: 3,
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = "#C9A84C";
                e.currentTarget.style.color = "#e0c88a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = "rgba(201,168,76,0.4)";
                e.currentTarget.style.color = "#C9A84C";
              }}
            >
              {t("Explorer la page", "Explore the page")} →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ y: -4 }}
        style={{
          background: isHovered ? "#0D1B2A" : "#fff",
          color: isHovered ? "#F5F1E8" : "#0D1B2A",
          border: `1px solid ${isHovered ? "#C9A84C" : "#D9CFBC"}`,
          padding: "20px 14px",
          textAlign: "center",
          borderRadius: 2,
          cursor: "pointer",
          position: "relative",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 10 }}>{cap.icon}</div>
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 13.5,
            fontWeight: 700,
            marginBottom: 6,
            lineHeight: 1.25,
            whiteSpace: "nowrap",
          }}
        >
          {cap.full}
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: isHovered ? "#C9A84C" : "#8a7a4a",
          }}
        >
          › {cap.role}
        </div>
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: idx * 0.2 }}
          style={{
            position: "absolute",
            bottom: -14,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#C9A84C",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  );
};

const StrategicCartography = () => {
  const { t } = useLanguage();
  const [hoveredCapacity, setHoveredCapacity] = useState<number | null>(null);
  const [hoveredFlow, setHoveredFlow] = useState<number | null>(null);

  const flowSteps = [
    { label: t("Donnée brute", "Raw data"), desc: t("Signaux dispersés, non traités", "Dispersed, untreated signals") },
    { label: t("Information", "Information"), desc: t("Données contextualisées et filtrées", "Contextualized and filtered data") },
    { label: t("Connaissance", "Knowledge"), desc: t("Information structurée et mise en relation", "Structured and linked information") },
    { label: t("Insight-Driven", "Insight-Driven"), desc: t("Décision stratégique actionnable", "Actionable strategic decision") },
  ];

  const capacities = [
    {
      icon: "📡",
      full: "AI Powered Monitor",
      role: t("Capte", "Captures"),
      force: t(
        "La Veille qui transforme le bruit en signal décisionnel.",
        "The watch that turns noise into decision-grade signals."
      ),
      objective: t(
        "Détecter les signaux faibles avant vos concurrents.",
        "Detect weak signals before your competitors."
      ),
      route: "/capacites/ai-powered-monitor",
    },
    {
      icon: "⚡",
      full: "Competitive Velocity Engine",
      role: t("Compare", "Compares"),
      force: t(
        "Le benchmark vivant qui mesure la vitesse de vos concurrents.",
        "The living benchmark that measures your competitors' velocity."
      ),
      objective: t(
        "Identifier leurs mouvements et anticiper leurs offensives.",
        "Identify their moves and anticipate their offensives."
      ),
      route: "/capacites/competitive-velocity-engine",
    },
    {
      icon: "🔄",
      full: "Strategic Workflow",
      role: t("Structure", "Structures"),
      force: t(
        "La cellule d'intelligence qui orchestre vos analyses.",
        "The intelligence cell that orchestrates your analyses."
      ),
      objective: t(
        "Structurer la production de vos insights stratégiques.",
        "Structure the production of your strategic insights."
      ),
      route: "/capacites/strategic-workflow",
    },
    {
      icon: "🔍",
      full: "Deep Due Diligence",
      role: t("Investigue", "Investigates"),
      force: t(
        "L'investigation stratégique qui sécurise vos engagements.",
        "The strategic investigation that secures your commitments."
      ),
      objective: t(
        "Révéler les angles morts avant investissement ou partenariat.",
        "Reveal blind spots before investment or partnership."
      ),
      route: "/solutions/deep-due-diligence",
    },
    {
      icon: "📣",
      full: "Soft Power & Influence",
      role: t("Influence", "Influences"),
      force: t(
        "L'art de piloter perceptions et dynamiques d'influence.",
        "The art of steering perceptions and influence dynamics."
      ),
      objective: t(
        "Transformer votre position en avantage compétitif durable.",
        "Turn your position into a lasting competitive advantage."
      ),
      route: "/solutions/soft-power-influence",
    },
  ];

  const topics = [
    { icon: "🛡", label: t("Risques", "Risks") },
    { icon: "💎", label: t("Opportunités", "Opportunities") },
    { icon: "⚔", label: t("Concurrence", "Competition") },
    { icon: "📣", label: t("Narratif", "Narrative") },
  ];

  return (
    <div style={{ margin: "32px 0 56px" }}>
      {/* Titre du schéma */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <p
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          · {t("Cartographie interactive", "Interactive cartography")} ·
        </p>
        <h3
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(24px, 3.2vw, 32px)",
            fontWeight: 700,
            color: "#0D1B2A",
            marginBottom: 12,
            lineHeight: 1.22,
          }}
        >
          {t(
            "De la donnée brute à la décision stratégique",
            "From raw data to strategic decision"
          )}
        </h3>
        <p
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 19,
            fontStyle: "italic",
            color: "#5c6470",
            maxWidth: 740,
            margin: "0 auto",
            lineHeight: 1.55,
          }}
        >
          {t(
            "Comment les 5 capacités de Buildfluence alimentent en continu votre Strategic Command Center.",
            "How Buildfluence's 5 capabilities continuously feed your Strategic Command Center."
          )}
        </p>
      </div>

      {/* ÉTAGE 1 (FLUX DE TRANSFORMATION) — supprimé */}

      {/* ÉTAGE 2 : LES 5 CAPACITÉS — avec tooltip élégant au survol */}
      <div style={{ marginBottom: 28 }}>
        <p
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.3em",
            color: "#8a7a4a",
            textTransform: "uppercase",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "#C9A84C",
              opacity: 0.75,
            }}
          >
            {t("Survolez pour découvrir · Cliquez pour explorer", "Hover to discover · Click to explore")}
          </span>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 10,
          }}
        >
          {capacities.map((cap, idx) => (
            <CapacityCard
              key={idx}
              cap={cap}
              idx={idx}
              isHovered={hoveredCapacity === idx}
              onEnter={() => setHoveredCapacity(idx)}
              onLeave={() => setHoveredCapacity(null)}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* ÉTAGE 3 : LE STRATEGIC COMMAND CENTER */}
      <div
        style={{
          background: "#0D1B2A",
          color: "#F5F1E8",
          padding: "44px 32px",
          borderRadius: 2,
          border: "1px solid #C9A84C",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <p
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              letterSpacing: "0.35em",
              color: "#C9A84C",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ◈ {t("Point de convergence", "Convergence point")} ◈
          </p>
          <h4
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 800,
              color: "#F5F1E8",
              lineHeight: 1.15,
              letterSpacing: "0.02em",
            }}
          >
            STRATEGIC COMMAND CENTER
          </h4>
        </div>

        {/* Les 2 Hémisphères */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.35)",
              padding: "24px 22px",
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                letterSpacing: "0.28em",
                color: "#C9A84C",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              ● {t("Hémisphère 1", "Hemisphere 1")}
            </p>
            <h5
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#F5F1E8",
                marginBottom: 10,
              }}
            >
              REAL
            </h5>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 17,
                fontStyle: "italic",
                color: "#e0c88a",
                lineHeight: 1.5,
              }}
            >
              {t("Présent — écosystème sous contrôle", "Present — ecosystem under control")}
            </p>
          </div>

          <div
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.35)",
              padding: "24px 22px",
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                letterSpacing: "0.28em",
                color: "#C9A84C",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              ◈ {t("Hémisphère 2", "Hemisphere 2")}
            </p>
            <h5
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#F5F1E8",
                marginBottom: 10,
              }}
            >
              WAR ROOM
            </h5>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 17,
                fontStyle: "italic",
                color: "#e0c88a",
                lineHeight: 1.5,
              }}
            >
              {t("Prédictif simulé — futurs testés", "Simulated predictive — tested futures")}
            </p>
          </div>
        </div>

        {/* Les 4 Topics Insight-Driven */}
        <div>
          <p
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.28em",
              color: "#C9A84C",
              textTransform: "uppercase",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {t("4 Topics Insight-Driven", "4 Insight-Driven Topics")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 12,
            }}
          >
            {topics.map((topic, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04 }}
                style={{
                  background: "rgba(245,241,232,0.05)",
                  border: "1px solid rgba(245,241,232,0.15)",
                  padding: "18px 12px",
                  textAlign: "center",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8, filter: "brightness(1.4)" }}>{topic.icon}</div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#F5F1E8",
                  }}
                >
                  {topic.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ====================================================================
   Flip Card — structure identique à AIPoweredMonitor
==================================================================== */
const FlipCard = ({ front, back }: { front: React.ReactNode; back: React.ReactNode }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1200px", minHeight: "320px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%", minHeight: "320px" }}
      >
        <div
          style={{ backfaceVisibility: "hidden", position: flipped ? "absolute" : "relative", inset: 0 }}
          className="rounded-xl p-8 flex flex-col items-center justify-center text-center h-full"
        >
          {front}
        </div>
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: flipped ? "relative" : "absolute", inset: 0 }}
          className="rounded-xl p-8 flex flex-col h-full"
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

/* ====================================================================
   Cockpit interactif — 4 quadrants + Time Slider REAL / WAR ROOM
==================================================================== */
type Mode = "real" | "war";
type TopicKey = "risk" | "opportunity" | "competition" | "narrative";

const CockpitInteractive = () => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>("real");
  const [selected, setSelected] = useState<TopicKey | null>(null);

  const topics: Array<{
    key: TopicKey;
    icon: string;
    label: string;
    temperature: "calm" | "pressure" | "alert";
    realSignals: string[];
    warScenarios: Array<{ label: string; proba: string; impact: string }>;
  }> = [
    {
      key: "risk",
      icon: "🛡",
      label: t("Risques", "Risks"),
      temperature: "alert",
      realSignals: [
        t("3 signaux faibles détectés cette semaine", "3 weak signals detected this week"),
        t("Vulnérabilité régulatoire émergente", "Emerging regulatory vulnerability"),
        t("Zone d'exposition concurrentielle", "Competitive exposure zone"),
      ],
      warScenarios: [
        { label: t("Choc régulatoire H1", "Regulatory shock H1"), proba: "32%", impact: t("Élevé", "High") },
        { label: t("Entrée acteur disruptif", "Disruptive player entry"), proba: "48%", impact: t("Modéré", "Moderate") },
        { label: t("Crise réputationnelle", "Reputational crisis"), proba: "15%", impact: t("Critique", "Critical") },
      ],
    },
    {
      key: "opportunity",
      icon: "💎",
      label: t("Opportunités", "Opportunities"),
      temperature: "pressure",
      realSignals: [
        t("Fenêtre de marché ouverte (6-9 mois)", "Open market window (6-9 months)"),
        t("Angle mort concurrent identifié", "Competitor blind spot identified"),
        t("Asymétrie exploitable détectée", "Exploitable asymmetry detected"),
      ],
      warScenarios: [
        { label: t("Acquisition ciblée", "Targeted acquisition"), proba: "62%", impact: t("Élevé", "High") },
        { label: t("Pivot vertical", "Vertical pivot"), proba: "41%", impact: t("Transformant", "Transformational") },
        { label: t("Partenariat stratégique", "Strategic partnership"), proba: "73%", impact: t("Modéré", "Moderate") },
      ],
    },
    {
      key: "competition",
      icon: "⚔",
      label: t("Concurrence", "Competition"),
      temperature: "pressure",
      realSignals: [
        t("Velocity score concurrent : +18%", "Competitor velocity score: +18%"),
        t("2 mouvements stratégiques en cours", "2 strategic moves in progress"),
        t("Benchmark vivant actualisé", "Live benchmark updated"),
      ],
      warScenarios: [
        { label: t("Red Team : attaque prix", "Red Team: price attack"), proba: "55%", impact: t("Élevé", "High") },
        { label: t("Contre-offensive produit", "Product counter-offensive"), proba: "38%", impact: t("Modéré", "Moderate") },
        { label: t("Consolidation sectorielle", "Sector consolidation"), proba: "27%", impact: t("Transformant", "Transformational") },
      ],
    },
    {
      key: "narrative",
      icon: "📣",
      label: t("Narratif", "Narrative"),
      temperature: "calm",
      realSignals: [
        t("Récit dominant stable", "Dominant narrative stable"),
        t("Shift d'opinion à surveiller", "Opinion shift to monitor"),
        t("Fenêtre de légitimité ouverte", "Legitimacy window open"),
      ],
      warScenarios: [
        { label: t("Campagne de repositionnement", "Repositioning campaign"), proba: "68%", impact: t("Modéré", "Moderate") },
        { label: t("Contre-narratif adverse", "Adverse counter-narrative"), proba: "22%", impact: t("Élevé", "High") },
        { label: t("Alliance de récit", "Narrative alliance"), proba: "51%", impact: t("Transformant", "Transformational") },
      ],
    },
  ];

  const tempColor = (level: "calm" | "pressure" | "alert") => {
    if (level === "alert") return "#E06D4F";
    if (level === "pressure") return "#C9A84C";
    return "#6DB58C";
  };

  const tempLabel = (level: "calm" | "pressure" | "alert") => {
    if (level === "alert") return t("Alerte", "Alert");
    if (level === "pressure") return t("Pression", "Pressure");
    return t("Calme", "Calm");
  };

  return (
    <div
      style={{
        background: "#0D1B2A",
        color: "#F5F1E8",
        padding: "48px 32px",
        borderRadius: 4,
        border: "1px solid #1a2d44",
        marginBottom: 48,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "#C9A84C",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            · {t("Cockpit décisionnel", "Decision cockpit")} ·
          </p>
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {t("4 Strategic Topics · Vue en temps réel", "4 Strategic Topics · Real-time view")}
          </h3>
        </div>

        {/* Time Slider */}
        <div
          style={{
            display: "flex",
            background: "#1a2d44",
            borderRadius: 2,
            padding: 4,
            border: "1px solid #C9A84C",
          }}
        >
          <button
            onClick={() => setMode("real")}
            style={{
              background: mode === "real" ? "#C9A84C" : "transparent",
              color: mode === "real" ? "#0D1B2A" : "#F5F1E8",
              border: "none",
              padding: "10px 20px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontWeight: 600,
              borderRadius: 2,
              transition: "all 0.3s ease",
            }}
          >
            ● {t("Réel", "Real")}
          </button>
          <button
            onClick={() => setMode("war")}
            style={{
              background: mode === "war" ? "#C9A84C" : "transparent",
              color: mode === "war" ? "#0D1B2A" : "#F5F1E8",
              border: "none",
              padding: "10px 20px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontWeight: 600,
              borderRadius: 2,
              transition: "all 0.3s ease",
            }}
          >
            ◈ {t("War Room", "War Room")}
          </button>
        </div>
      </div>

      {/* 4 quadrants */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {topics.map((topic) => {
          const isOpen = selected === topic.key;
          return (
            <motion.div
              key={topic.key}
              layout
              onClick={() => setSelected(isOpen ? null : topic.key)}
              whileHover={{ y: -2 }}
              style={{
                background: isOpen ? "#1a2d44" : "#142235",
                border: `1px solid ${isOpen ? "#C9A84C" : "#25405f"}`,
                padding: "26px 22px",
                borderRadius: 3,
                cursor: "pointer",
                position: "relative",
                minHeight: 240,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: tempColor(topic.temperature),
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: tempColor(topic.temperature),
                  }}
                >
                  {tempLabel(topic.temperature)}
                </span>
              </div>

              <div style={{ fontSize: 36, marginBottom: 14, filter: "brightness(1.4)" }}>{topic.icon}</div>
              <h4
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: 23,
                  fontWeight: 700,
                  marginBottom: 20,
                  color: "#F5F1E8",
                }}
              >
                {topic.label}
              </h4>

              <AnimatePresence mode="wait">
                {mode === "real" ? (
                  <motion.ul
                    key="real"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ listStyle: "none", padding: 0, margin: 0 }}
                  >
                    {topic.realSignals.map((s, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: 17,
                          fontStyle: "italic",
                          color: "#e0c88a",
                          lineHeight: 1.5,
                          marginBottom: 11,
                          paddingLeft: 18,
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "#C9A84C", fontWeight: 700 }}>›</span>
                        {s}
                      </li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.div
                    key="war"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {topic.warScenarios.map((sc, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "12px 0",
                          borderBottom: i < topic.warScenarios.length - 1 ? "1px dashed #25405f" : "none",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                          <span
                            style={{
                              fontFamily: "DM Sans, sans-serif",
                              fontSize: 14.5,
                              color: "#F5F1E8",
                              fontWeight: 500,
                            }}
                          >
                            {sc.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: 12,
                              color: "#C9A84C",
                              fontWeight: 600,
                            }}
                          >
                            {sc.proba}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 10,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#8a9bb0",
                          }}
                        >
                          {t("Impact", "Impact")} · {sc.impact}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Decision Brief */}
      <div
        style={{
          marginTop: 32,
          background: "#FAF6ED",
          color: "#0D1B2A",
          padding: "28px 32px",
          borderLeft: "3px solid #C9A84C",
          borderRadius: 2,
        }}
      >
        <p
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          · {t("Decision Brief COMEX", "Executive Decision Brief")} ·
        </p>
        <p
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 20,
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "#0D1B2A",
          }}
        >
          {mode === "real"
            ? t(
                "Synthèse du jour : 1 alerte critique sur les Risques · 2 opportunités à arbitrer sous 30 jours · concurrence en pression · narratif sous contrôle.",
                "Today's brief: 1 critical Risk alert · 2 opportunities to arbitrate within 30 days · competition under pressure · narrative under control."
              )
            : t(
                "Projection 12 mois : 3 scénarios majeurs identifiés, dont 1 à probabilité supérieure à 60%. Arbitrage stratégique recommandé avant fin de trimestre.",
                "12-month projection: 3 major scenarios identified, 1 with probability above 60%. Strategic arbitration recommended before end of quarter."
              )}
        </p>
      </div>
    </div>
  );
};

/* ====================================================================
   PAGE PRINCIPALE — fond crème #FAF6ED full-width
==================================================================== */
const StrategicCommandCenter = () => {
  const { t } = useLanguage();
  const [formOpen, setFormOpen] = useState(false);

  const cards = [
    {
      icon: "🎯",
      title: t("Cockpit 4 Topics", "4 Topics Cockpit"),
      subtitle: t("Le réel cartographié en un écran", "The present mapped on a single screen"),
      bg: "#0D1B2A",
      items: [
        t("Carto interactive : Risques · Opportunités · Concurrence · Narratif", "Interactive map: Risks · Opportunities · Competition · Narrative"),
        t("Indicateurs de température en temps réel", "Real-time temperature indicators"),
        t("Signaux faibles consolidés issus du Monitor", "Consolidated weak signals from the Monitor"),
        t("Velocity score concurrent issu du CVE", "Competitor velocity score from CVE"),
        t("Vue COMEX : 3 lignes de brief quotidien", "Executive view: 3-line daily brief"),
      ],
    },
    {
      icon: "🔮",
      title: t("War Room & Scénarios", "War Room & Scenarios"),
      subtitle: t("Stress-testez vos décisions avant le marché", "Stress-test your decisions before the market does"),
      bg: "#0D1B2A",
      items: [
        t("Arbres de scénarios à 6 / 12 / 24 mois", "Scenario trees at 6 / 12 / 24 months"),
        t("Red Team vs Blue Team : simulation adversariale", "Red Team vs Blue Team: adversarial simulation"),
        t("Shock testing : crises régulatoires, disruptions, ruptures géopolitiques", "Shock testing: regulatory crises, disruptions, geopolitical ruptures"),
        t("Arbitrage Impact × Risque × Fenêtre temporelle", "Arbitration Impact × Risk × Time Window"),
        t("Probabilités et impacts scorés par les analystes seniors", "Probabilities and impacts scored by senior analysts"),
      ],
    },
    {
      icon: "⚡",
      title: t("Orchestration & Décision", "Orchestration & Decision"),
      subtitle: t("Un cockpit qui agrège vos 3 autres capacités", "A cockpit that aggregates your 3 other capabilities"),
      bg: "#0D1B2A",
      items: [
        t("Agrégation native : Monitor + Workflow + CVE", "Native aggregation: Monitor + Workflow + CVE"),
        t("Time Slider : bascule instantanée Réel ⇄ War Room", "Time Slider: instant switch Real ⇄ War Room"),
        t("Decision Briefs programmés pour le Board", "Scheduled Decision Briefs for the Board"),
        t("Traçabilité des arbitrages et des décisions", "Traceability of arbitrations and decisions"),
        t("Infrastructure souveraine & accès 24/7", "Sovereign infrastructure & 24/7 access"),
      ],
    },
  ];

  return (
    <div className="[&>div]:!bg-[#F5F3E9]" style={{ background: "#F5F3E9", width: "100%", minHeight: "100vh" }}>
      <DetailPageLayout
        title={t("Strategic Command Center", "Strategic Command Center")}
        titleClassName="text-center"
        chapeau={
          <span
            className="italic"
            style={{
              color: "#5c6470",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 20,
            }}
          >
            {t(
              "Le cockpit qui voit le présent et simule le futur. Pilotez vos 4 enjeux stratégiques — Risques, Opportunités, Concurrence, Narratif — et stress-testez vos arbitrages avant que le marché ne le fasse pour vous.",
              "The cockpit that sees the present and simulates the future. Steer your 4 strategic issues — Risks, Opportunities, Competition, Narrative — and stress-test your arbitrations before the market does it for you."
            )}
          </span>
        }
        chapeauClassName="text-center mb-2"
      >
        {/* CARTOGRAPHIE INTERACTIVE */}
        <StrategicCartography />

        {/* COCKPIT INTERACTIF */}
        <CockpitInteractive />

        {/* 3 FLIP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          {cards.map((card, idx) => (
            <FlipCard
              key={idx}
              front={
                <div
                  className="w-full h-full flex flex-col items-center justify-center rounded-xl shadow-xl"
                  style={{ background: card.bg, minHeight: "320px", border: "1px solid #1a2d44" }}
                >
                  <span className="text-5xl mb-5" style={{ filter: "brightness(1.4)" }}>
                    {card.icon}
                  </span>
                  <h3
                    className="mb-3 text-center"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: 23,
                      fontWeight: 700,
                      color: "#F5F1E8",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="leading-relaxed max-w-[240px] mb-6 text-center"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 18,
                      fontStyle: "italic",
                      color: "#e0c88a",
                    }}
                  >
                    {card.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(245,241,232,0.4)",
                    }}
                  >
                    {t("Cliquer pour découvrir →", "Click to discover →")}
                  </p>
                </div>
              }
              back={
                <div
                  className="w-full h-full flex flex-col rounded-xl shadow-xl"
                  style={{ background: card.bg, minHeight: "320px", border: "1px solid #C9A84C" }}
                >
                  <h3
                    className="mb-4 text-center"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#F5F1E8",
                    }}
                  >
                    {card.title}
                  </h3>
                  <ul className="space-y-3 flex-1">
                    {card.items.map((item, i) => (
                      <li
                        key={i}
                        className="leading-relaxed pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C]"
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: 15,
                          color: "rgba(245,241,232,0.92)",
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p
                    className="mt-4 text-center"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(245,241,232,0.4)",
                    }}
                  >
                    {t("Cliquer pour retourner", "Click to flip back")}
                  </p>
                </div>
              }
            />
          ))}
        </div>

        {/* CTA doré */}
        <div className="text-center my-10">
          <button
            onClick={() => setFormOpen(true)}
            className="hover:opacity-90 transition-opacity"
            style={{
              background: "#C9A84C",
              color: "#0D1B2A",
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: 2,
              border: "none",
              fontSize: 13,
              letterSpacing: "0.22em",
              cursor: "pointer",
              textTransform: "uppercase",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {t("Activer votre Command Center", "Activate your Command Center")} →
          </button>
        </div>

        <FormCustom
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title={t("Activer votre Strategic Command Center", "Activate your Strategic Command Center")}
          submitLabel={t("Déployer le Cockpit", "Deploy the Cockpit")}
          formType="strategic_command_center"
          fields={[
            { name: "name", placeholder: t("Nom & Prénom", "Full name"), required: true, maxLength: 100 },
            { name: "organization", placeholder: t("Organisation", "Organization"), required: true, maxLength: 100 },
            { name: "role", placeholder: t("Fonction / Niveau de décision", "Role / Decision level"), required: true, maxLength: 150 },
            { name: "topics", placeholder: t("Enjeux stratégiques prioritaires à piloter", "Priority strategic issues to steer"), required: true, type: "textarea", rows: 4 },
            { name: "email", placeholder: t("Email professionnel", "Professional email"), required: true, type: "email", maxLength: 255 },
          ]}
        />
      </DetailPageLayout>
    </div>
  );
};

export default StrategicCommandCenter;
