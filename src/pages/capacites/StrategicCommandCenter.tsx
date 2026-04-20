import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormCustom } from "@/components/FormCustom";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Flip Card (copié à l'identique d'AIPoweredMonitor pour cohérence) ---------- */
const FlipCard = ({ front, back }: { front: React.ReactNode; back: React.ReactNode }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1200px", minHeight: "280px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%", minHeight: "280px" }}
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

/* ---------- Cockpit Interactif (la pièce maîtresse — signature Command Center) ---------- */
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
    temperature: "calm" | "tension" | "alert";
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
      temperature: "tension",
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
      temperature: "tension",
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

  const tempColor = (level: "calm" | "tension" | "alert") => {
    if (level === "alert") return "#E06D4F";
    if (level === "tension") return "#C9A84C";
    return "#6DB58C";
  };

  const tempLabel = (level: "calm" | "tension" | "alert") => {
    if (level === "alert") return t("Alerte", "Alert");
    if (level === "tension") return t("Tension", "Tension");
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
      {/* Header du cockpit */}
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

        {/* Time Slider REAL ⇄ WAR ROOM */}
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

      {/* Grille 4 quadrants */}
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
                padding: "24px 20px",
                borderRadius: 3,
                cursor: "pointer",
                position: "relative",
                minHeight: 200,
              }}
            >
              {/* Pulsation de température */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
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

              {/* Icône + label */}
              <div style={{ fontSize: 32, marginBottom: 12, filter: "brightness(1.4)" }}>{topic.icon}</div>
              <h4
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 16,
                  color: "#F5F1E8",
                }}
              >
                {topic.label}
              </h4>

              {/* Contenu conditionnel REAL vs WAR */}
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
                          fontSize: 14,
                          fontStyle: "italic",
                          color: "#d4b866",
                          lineHeight: 1.5,
                          marginBottom: 8,
                          paddingLeft: 14,
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "#C9A84C" }}>›</span>
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
                          padding: "8px 0",
                          borderBottom: i < topic.warScenarios.length - 1 ? "1px dashed #25405f" : "none",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                          <span
                            style={{
                              fontFamily: "DM Sans, sans-serif",
                              fontSize: 12.5,
                              color: "#F5F1E8",
                              fontWeight: 500,
                            }}
                          >
                            {sc.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: 11,
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
                            fontSize: 9,
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

      {/* Decision Brief — panneau inférieur */}
      <div
        style={{
          marginTop: 32,
          background: "#FAF6ED",
          color: "#0D1B2A",
          padding: "24px 28px",
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
            marginBottom: 10,
          }}
        >
          · {t("Decision Brief COMEX", "Executive Decision Brief")} ·
        </p>
        <p
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 18,
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "#0D1B2A",
          }}
        >
          {mode === "real"
            ? t(
                "Synthèse du jour : 1 alerte critique sur les Risques · 2 opportunités à arbitrer sous 30 jours · concurrence en tension · narratif sous contrôle.",
                "Today's brief: 1 critical Risk alert · 2 opportunities to arbitrate within 30 days · competition in tension · narrative under control."
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

/* ---------- Page principale ---------- */
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
    <DetailPageLayout
      title={t("Strategic Command Center", "Strategic Command Center")}
      titleClassName="text-center"
      chapeau={
        <span className="italic" style={{ color: "#6B7280" }}>
          {t(
            "Le cockpit qui voit le présent et simule le futur. Pilotez vos 4 enjeux stratégiques — Risques, Opportunités, Concurrence, Narratif — et stress-testez vos arbitrages avant que le marché ne le fasse pour vous.",
            "The cockpit that sees the present and simulates the future. Steer your 4 strategic issues — Risks, Opportunities, Competition, Narrative — and stress-test your arbitrations before the market does it for you."
          )}
        </span>
      }
      chapeauClassName="text-center mb-2"
    >
      {/* Cockpit interactif — la pièce maîtresse */}
      <CockpitInteractive />

      {/* 3 Flip Cards — cohérence avec les autres pages capacités */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        {cards.map((card, idx) => (
          <FlipCard
            key={idx}
            front={
              <div
                className="w-full h-full flex flex-col items-center justify-center rounded-xl shadow-xl"
                style={{ background: card.bg, minHeight: "280px", border: "1px solid #1a2d44" }}
              >
                <span className="text-5xl mb-5" style={{ filter: "brightness(1.4)" }}>
                  {card.icon}
                </span>
                <h3
                  className="mb-3 text-center"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 20,
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
                    fontSize: 15,
                    fontStyle: "italic",
                    color: "#d4b866",
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
                style={{ background: card.bg, minHeight: "280px", border: "1px solid #C9A84C" }}
              >
                <h3
                  className="mb-4 text-center"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#F5F1E8",
                  }}
                >
                  {card.title}
                </h3>
                <ul className="space-y-2.5 flex-1">
                  {card.items.map((item, i) => (
                    <li
                      key={i}
                      className="leading-relaxed pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-sm"
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: 13,
                        color: "rgba(245,241,232,0.85)",
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

      {/* CTA doré — même pattern qu'AIPoweredMonitor */}
      <div className="text-center my-10">
        <button
          onClick={() => setFormOpen(true)}
          className="hover:opacity-90 transition-opacity"
          style={{
            background: "#C9A84C",
            color: "#0D1B2A",
            fontWeight: 700,
            padding: "14px 32px",
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
  );
};

export default StrategicCommandCenter;
