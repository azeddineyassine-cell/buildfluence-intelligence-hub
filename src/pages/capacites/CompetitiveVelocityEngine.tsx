import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { FormStrategicExchange } from "@/components/FormModals";
import { motion } from "framer-motion";

const SEGMENTS = [
  {
    id: "seg0",
    d: "M 253.8,30.0 A 220,220 0 0,1 438.6,136.7 L 322.9,206.2 A 85,85 0 0,0 251.5,165.0 Z",
    fill: "#1B3E6A",
    icon: "⚡",
    iconX: 332.5, iconY: 113.1,
    label: "DÉCISION",
    labelX: 346, labelY: 87.7,
    fontSize: 10.5,
  },
  {
    id: "seg1",
    d: "M 442.4,143.3 A 220,220 0 0,1 442.4,356.7 L 324.3,291.2 A 85,85 0 0,0 324.3,208.8 Z",
    fill: "#1e4878",
    icon: "🌍",
    iconX: 415, iconY: 256,
    label: "GÉOPOLITIQUE",
    labelX: 442, labelY: 254,
    fontSize: 10.5,
  },
  {
    id: "seg2",
    d: "M 438.6,363.3 A 220,220 0 0,1 253.8,470.0 L 251.5,335.0 A 85,85 0 0,0 322.9,293.8 Z",
    fill: "#1B3E6A",
    icon: "📊",
    iconX: 332.5, iconY: 398.9,
    label: "MARKET\nINTELLIGENCE",
    labelX: 346, labelY: 413.3,
    fontSize: 10,
    twoLines: true,
  },
  {
    id: "seg3",
    d: "M 246.2,470.0 A 220,220 0 0,1 61.4,363.3 L 177.1,293.8 A 85,85 0 0,0 248.5,335.0 Z",
    fill: "#1e4878",
    icon: "💡",
    iconX: 167.5, iconY: 398.9,
    label: "TECHNOLOGIE",
    labelX: 154, labelY: 420.3,
    fontSize: 10.5,
  },
  {
    id: "seg4",
    d: "M 57.6,356.7 A 220,220 0 0,1 57.6,143.3 L 175.7,208.8 A 85,85 0 0,0 175.7,291.2 Z",
    fill: "#1B3E6A",
    icon: "🔮",
    iconX: 85, iconY: 256,
    label: "SCÉNARIOS",
    labelX: 58, labelY: 254,
    fontSize: 10.5,
  },
  {
    id: "seg5",
    d: "M 61.4,136.7 A 220,220 0 0,1 246.2,30.0 L 248.5,165.0 A 85,85 0 0,0 177.1,206.2 Z",
    fill: "#1e4878",
    icon: "🗺",
    iconX: 167.5, iconY: 113.1,
    label: "ÉCOSYSTÈME",
    labelX: 154, labelY: 87.7,
    fontSize: 10.5,
  },
];

const DETAILS = [
  { title: "Décision", tag: "Output & Action stratégique", items: ["Hiérarchisation : Go / No-Go / Timing optimal", "Réduction de l'incertitude décisionnelle", "Livrables actionnables & synthèses", "Briefings C-Level confidentiels", "Dashboards temps réel"] },
  { title: "Géopolitique", tag: "Captation & Analyse", items: ["Surveillance tensions & alliances émergentes", "Détection ruptures avant médiatisation", "Impact sur marchés & partenaires", "Cartographie acteurs diplomatiques", "Anticipation décisions réglementaires"] },
  { title: "Market Intelligence", tag: "Flux & Compétitivité", items: ["Suivi flux d'IDE & mouvements de capitaux", "Positions concurrentielles par secteur", "Détection opportunités à fort levier", "Benchmarking international", "Scoring compétitivité : Go / Vigilance / No-Go"] },
  { title: "Technologie", tag: "Innovation & Disruption", items: ["Veille brevets & publications scientifiques", "Détection disruptions avant adoption massive", "Cartographie acteurs de l'innovation", "Impact technologique sur rapports de force", "Partenariats technologiques stratégiques"] },
  { title: "Scénarios", tag: "Projection & Anticipation", items: ["Modélisation scénarios à 3, 6, 12 mois", "Projection mouvements concurrentiels", "Simulation d'impact des ruptures", "Fenêtres d'opportunité & timing optimal", "Plans de contingence à risque élevé"] },
  { title: "Écosystème", tag: "Cartographie & Rapports de force", items: ["Modélisation évolutive des acteurs clés", "Flux & rapports de force dynamiques", "Alliances, oppositions & neutralités", "Nœuds d'amplification & leviers", "Mise à jour continue selon signaux captés"] },
];

const SEG_COLORS = ["#1B3E6A", "#1e4878", "#1B3E6A", "#1e4878", "#1B3E6A", "#1e4878"];
const BRIGHT_COLORS = ["#2a5a9a", "#2d6aaa", "#2a5a9a", "#2d6aaa", "#2a5a9a", "#2d6aaa"];

const CompetitiveVelocityEngine = () => {
  const [selected, setSelected] = useState<number>(-1);
  const [f1Open, setF1Open] = useState(false);

  const pick = useCallback((i: number) => {
    setSelected(prev => prev === i ? -1 : i);
  }, []);

  const detail = selected >= 0 ? DETAILS[selected] : null;

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
          Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des environnements concurrentiels et hyper-complexes.
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {["Benchmark", "Analyse", "Anticipation", "Décision"].map(tag => (
            <span key={tag} className="hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-all duration-200" style={{ fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, border: "1.5px solid #C9A84C", color: "#C9A84C", letterSpacing: 0.5 }}>
              {tag}
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
            {SEGMENTS.map((seg, i) => (
              <g key={seg.id}>
                <path
                  id={seg.id}
                  d={seg.d}
                  fill={selected === i ? BRIGHT_COLORS[i] : SEG_COLORS[i]}
                  opacity={selected >= 0 && selected !== i ? 0.55 : 1}
                  stroke="#F0F7FF"
                  strokeWidth={3}
                  style={{ cursor: "pointer", transition: "filter 0.2s, opacity 0.2s" }}
                  onClick={() => pick(i)}
                />
                <text x={seg.iconX} y={seg.iconY} textAnchor="middle" fontSize={22} style={{ cursor: "pointer", pointerEvents: "none" }}>
                  {seg.icon}
                </text>
                {seg.twoLines ? (
                  <>
                    <text x={seg.labelX} y={seg.labelY} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={seg.fontSize} fontWeight={700} fill="#ffffff" letterSpacing={0.5} style={{ pointerEvents: "none" }}>MARKET</text>
                    <text x={seg.labelX} y={seg.labelY + 13} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={seg.fontSize} fontWeight={700} fill="#ffffff" letterSpacing={0.5} style={{ pointerEvents: "none" }}>INTELLIGENCE</text>
                  </>
                ) : (
                  <text x={seg.labelX} y={seg.labelY} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={seg.fontSize} fontWeight={700} fill="#ffffff" letterSpacing={0.8} style={{ cursor: "pointer", pointerEvents: "none" }} onClick={() => pick(i)}>
                    {seg.label}
                  </text>
                )}
              </g>
            ))}
            {/* Central circle */}
            <circle cx={250} cy={250} r={83} fill="#1B3E6A" stroke="#fff" strokeWidth={4} />
            <text x={250} y={240} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={14} fontWeight={700} fill="#ffffff">Competitive</text>
            <text x={250} y={258} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={14} fontWeight={700} fill="#C9A84C">Velocity</text>
            <text x={250} y={276} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize={11} fontWeight={400} fill="rgba(255,255,255,0.6)">ENGINE</text>
          </svg>
        </div>

        {/* DETAIL PANEL */}
        <div style={{ flex: 1, minWidth: 280, maxWidth: 420, background: "#fff", border: "0.5px solid rgba(13,27,42,0.08)", borderRadius: 16, padding: 32, minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {!detail ? (
            <div style={{ textAlign: "center", color: "#aabbcc", fontSize: 13, fontStyle: "italic" }}>
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>🎯</div>
              Sélectionnez un secteur pour explorer ses dimensions stratégiques
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
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>C'est plus qu'une étude</div>
            <div style={{ fontSize: 11, color: "#8eafd4", lineHeight: 1.5 }}>Des écosystèmes de décision construits sur mesure, pas des rapports statiques livrés et oubliés</div>
          </div>
          <div style={{ padding: 24, textAlign: "center", borderRight: "0.5px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7 }} className="max-md:border-r-0 max-md:border-b max-md:border-b-white/10">
            <div style={{ fontSize: 12, color: "#C9A84C", fontWeight: 700, letterSpacing: 0.5 }}>®</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>C'est plus qu'un benchmark</div>
            <div style={{ fontSize: 11, color: "#8eafd4", lineHeight: 1.5 }}>Une lecture des stratégies implicites que les données seules ne révèlent jamais</div>
          </div>
          <div style={{ padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7, background: "rgba(201,168,76,0.12)" }}>
            <div style={{ fontSize: 12, color: "#C9A84C", fontWeight: 700, letterSpacing: 0.5 }}>®</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>C'est un moteur décisionnel</div>
            <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.5 }}>Conçu pour inverser les rapports de force en votre faveur, avant que vos concurrents ne s'en aperçoivent</div>
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
            <div style={{ fontSize: 14, fontWeight: 700 }}>Activez votre <span style={{ color: "#C9A84C" }}>Competitive Velocity Engine</span></div>
            <div style={{ fontSize: 11, color: "#8899aa", marginTop: 2 }}>Réservez un échange stratégique confidentiel</div>
          </div>
          <button
            onClick={() => setF1Open(true)}
            className="hover:bg-[#dbb85c] transition-colors duration-200"
            style={{ fontSize: 11, padding: "7px 16px", borderRadius: 20, background: "#C9A84C", color: "#0D1B2A", fontWeight: 700, cursor: "pointer", border: "none" }}
          >
            ÉCHANGE STRATÉGIQUE →
          </button>
        </div>
      </motion.div>

      <CTAFooter />
      <FormStrategicExchange open={f1Open} onOpenChange={setF1Open} />
    </div>
  );
};

export default CompetitiveVelocityEngine;
