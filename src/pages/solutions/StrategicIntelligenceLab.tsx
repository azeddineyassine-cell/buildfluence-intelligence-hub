import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import DetailPageLayout, { CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

import ConstructionInfluence from "@/components/ConstructionInfluence";

/* ─────── Palette tokens (locales à la page) ─────── */
const C = {
  navy: "#0D1B2A",
  navyMid: "#1a2d44",
  gold: "#C9A84C",
  goldSoft: "#d4b866",
  goldHover: "#e0c88a",
  goldDim: "#8a7537",
  paper: "#FAF6ED",
  ivory: "#F5F1E8",
  rule: "#D9CFBC",
  alert: "#E06D4F",
};

const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_ITALIC = "'Cormorant Garamond', serif";
const FONT_MONO = "'JetBrains Mono', monospace";

/* ═══════════════════════════════════════════════════════
   SECTION 01 — STRATEGIC FORESIGHT (4 cartes cliquables)
   ═══════════════════════════════════════════════════════ */

type ForesightCard = {
  index: string;
  title: string;
  role: string;
  preview: string;
  lead: string;
  bullets: string[];
};

const FORESIGHT: ForesightCard[] = [
  {
    index: "S/01",
    title: "Market & Competitive Intelligence",
    role: "Veille · Mapping · Benchmarks",
    preview:
      "Voir les marchés avant leurs acteurs, lire les concurrents mieux qu'ils ne se lisent eux-mêmes.",
    lead:
      "Voir les marchés avant leurs acteurs, lire les concurrents mieux qu'ils ne se lisent eux-mêmes.",
    bullets: [
      "Veille multicanale : marchés, concurrents, brevets, réglementaire",
      "Mapping concurrentiel dynamique",
      "Détection des tendances sectorielles",
      "Identification des marchés à fort potentiel",
      "Études prospectives, benchmarks internationaux",
      "Cartographie des acteurs clés : Alliés / Réfractaires / Idiots utiles",
    ],
  },
  {
    index: "S/02",
    title: "Attractivité Territoriale",
    role: "Compétitivité · Narratifs · Influence",
    preview:
      "Pilotage de l'attractivité économique dans la guerre de l'investissement.",
    lead:
      "Pilotage de l'attractivité économique dans la guerre mondiale de l'investissement.",
    bullets: [
      "Guerre économique de l'investissement",
      "Benchmark pays/régions concurrentes",
      "Politiques publiques comparées",
      "Narratifs d'attractivité et crédibilité internationale",
    ],
  },
  {
    index: "S/03",
    title: "Innovation Mapping",
    role: "Deeptech · Brevets · M&A",
    preview:
      "Cartographier les technologies qui redessineront votre secteur à 3-5 ans.",
    lead:
      "Cartographier les technologies qui redessineront votre secteur à 3-5 ans.",
    bullets: [
      "Cartographie des technologies émergentes et startups",
      "Écosystèmes d'innovation (Deeptech, AI, biotech)",
      "Tendances VC/CVC",
      "Opportunités d'Open Innovation et M&A stratégiques",
      "Veille brevets (WIPO, EPO, USPTO)",
    ],
  },
  {
    index: "S/04",
    title: "Stakeholder Intelligence",
    role: "Coalitions · Influences · Réseaux",
    preview:
      "Identifier les acteurs qui pèsent vraiment sur vos décisions stratégiques.",
    lead:
      "Identifier les acteurs qui pèsent vraiment sur vos décisions stratégiques.",
    bullets: [
      "Mapping des stratégies adverses et des réseaux d'influence cachés",
      "Cartographie des leaders d'opinion, investisseurs, think tanks, ONG",
      "Analyse des alliances, antagonismes et dynamiques de coalition",
      "Identification des acteurs clés susceptibles de peser sur vos décisions",
      "Modélisation des scénarios de pression et de contre-influence",
    ],
  },
];

const ForesightSection = () => {
  const [active, setActive] = useState<number>(0);
  const card = FORESIGHT[active];

  return (
    <div
      className="rounded-xl px-6 md:px-10 py-10"
      style={{ background: C.paper, border: `1px solid ${C.rule}` }}
    >
      {/* Header */}
      <div className="mb-8">
        <div
          className="text-[11px] uppercase mb-3"
          style={{ fontFamily: FONT_MONO, color: C.gold, letterSpacing: "0.25em" }}
        >
          01 · Strategic Foresight
        </div>
        <h3
          id="strategic-foresight"
          className="text-3xl md:text-4xl scroll-mt-24"
          style={{ fontFamily: FONT_DISPLAY, color: C.navy, lineHeight: 1.15 }}
        >
          Cartographier le champ de bataille{" "}
          <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>avant</em>{" "}
          d'y entrer
        </h3>
        <p
          className="mt-3 text-lg italic"
          style={{ fontFamily: FONT_ITALIC, color: C.navyMid }}
        >
          Quatre capacités pour lire les marchés, les territoires, l'innovation
          et les jeux d'acteurs — en profondeur.
        </p>
      </div>

      {/* Grille 4 cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {FORESIGHT.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.index}
              onClick={() => setActive(i)}
              className="text-left transition-all duration-300"
              style={{
                background: isActive ? C.navyMid : C.navy,
                color: C.ivory,
                border: `1px solid rgba(201,168,76,${isActive ? 0.5 : 0.25})`,
                padding: "32px 28px",
                minHeight: 220,
                boxShadow: isActive ? `inset 0 -3px 0 ${C.gold}` : "none",
                position: "relative",
              }}
            >
              <div
                className="mb-3"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  color: C.gold,
                  letterSpacing: "0.25em",
                }}
              >
                {c.index}
              </div>
              <div
                className="mb-2"
                style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}
              >
                {c.title}
              </div>
              <div
                className="mb-3 italic"
                style={{ fontFamily: FONT_ITALIC, fontSize: 16, color: C.goldHover }}
              >
                {c.role}
              </div>
              <p className="text-sm" style={{ color: "rgba(245,241,232,0.78)", lineHeight: 1.5 }}>
                {c.preview}
              </p>
              <div
                className="absolute"
                style={{
                  bottom: 14,
                  right: 18,
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: isActive ? C.gold : "rgba(201,168,76,0.6)",
                }}
              >
                EXPLORER →
              </div>
            </button>
          );
        })}
      </div>

      {/* Panneau détail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ overflow: "hidden", maxHeight: 900 }}
        >
          <div
            className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 rounded-lg"
            style={{ background: "#FFFFFF", border: `1px solid ${C.rule}` }}
          >
            {/* Gauche */}
            <div>
              <div
                className="mb-3"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  color: C.gold,
                  letterSpacing: "0.2em",
                }}
              >
                › {card.index} · DÉTAIL
              </div>
              <h4
                className="mb-4"
                style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: C.navy, lineHeight: 1.2 }}
              >
                {card.title}
              </h4>
              <p
                className="italic pl-4 mb-6"
                style={{
                  fontFamily: FONT_ITALIC,
                  fontSize: 18,
                  color: C.navyMid,
                  borderLeft: `2px solid ${C.gold}`,
                  lineHeight: 1.5,
                }}
              >
                {card.lead}
              </p>
              <ul className="space-y-3">
                {card.bullets.map((b, k) => (
                  <li key={k} className="flex gap-3 text-sm" style={{ color: C.navy, lineHeight: 1.55 }}>
                    <span style={{ color: C.gold, fontWeight: 700 }}>→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Droite — mini-viz par carte */}
            <ForesightViz indexKey={card.index} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ─────── Mini-viz pour les 4 cartes Foresight ─────── */

const VizFrame = ({
  kicker,
  title,
  footer,
  children,
}: {
  kicker: string;
  title: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    className="flex flex-col"
    style={{
      background: "linear-gradient(135deg, #f9f5ea 0%, #fefdf8 100%)",
      border: `1px solid ${C.rule}`,
      borderRadius: 2,
      padding: "20px 18px",
      minHeight: 340,
    }}
  >
    <div
      className="text-center uppercase mb-2"
      style={{ fontFamily: FONT_MONO, fontSize: 9, color: C.goldDim, letterSpacing: "0.28em" }}
    >
      {kicker}
    </div>
    <div
      className="text-center mb-4"
      style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: C.navy, fontWeight: 700 }}
    >
      {title}
    </div>
    <div className="flex-1 flex flex-col justify-center">{children}</div>
    {footer && (
      <div
        className="text-center italic mt-4"
        style={{ fontFamily: FONT_ITALIC, fontSize: 12, color: C.navyMid, opacity: 0.75 }}
      >
        {footer}
      </div>
    )}
  </div>
);

const PodiumViz = () => {
  const bars = [
    { rank: 2, country: "Vietnam", score: "9 225", h: "78%" },
    { rank: 1, country: "Afrique du Sud", score: "9 968", h: "95%" },
    { rank: 3, country: "Mexique", score: "4 761", h: "55%" },
  ];
  return (
    <VizFrame
      kicker="· Baromètre · Juillet–Août 2025 ·"
      title="Indice mondial de compétitivité"
      footer={
        <>
          <a
            href="#"
            className="inline-block uppercase mb-2"
            style={{
              fontFamily: FONT_MONO,
              fontSize: 10,
              color: C.navy,
              background: C.gold,
              padding: "7px 14px",
              letterSpacing: "0.18em",
              textDecoration: "none",
            }}
          >
            Voir le baromètre →
          </a>
          <div>Extrait du baromètre d'investissement</div>
        </>
      }
    >
      <style>{`
        @keyframes podium-rise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
      `}</style>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, height: 140 }}>
        {bars.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              maxWidth: 78,
              height: b.h,
              background: `linear-gradient(180deg, ${C.navyMid}, ${C.navy})`,
              borderTop: `3px solid ${C.gold}`,
              borderRadius: "2px 2px 0 0",
              transformOrigin: "bottom",
              animation: `podium-rise .8s cubic-bezier(.22,.9,.35,1) ${i * 0.15}s both`,
              padding: "10px 4px 8px",
              textAlign: "center",
              color: C.ivory,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 22, fontWeight: 900, color: C.gold }}>
              {b.rank}
            </div>
            <div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 9.5, fontWeight: 600, textTransform: "uppercase" }}>
                {b.country}
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: C.goldSoft, marginTop: 2 }}>
                {b.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </VizFrame>
  );
};

const FlourishViz = () => (
  <VizFrame
    kicker="· Cartographie territoriale ·"
    title="Hiérarchie territoriale interactive"
    footer="Interagissez directement avec la visualisation"
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 380,
        border: `1px solid ${C.rule}`,
        background: "#fff",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <div
        className="uppercase"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: C.navy,
          color: C.gold,
          padding: "3px 7px",
          fontFamily: FONT_MONO,
          fontSize: 8,
          letterSpacing: "0.18em",
          zIndex: 2,
        }}
      >
        LIVE
      </div>
      <iframe
        src="https://public.flourish.studio/visualisation/24977460/embed"
        title="Hierarchy visualization"
        frameBorder={0}
        scrolling="no"
        sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        style={{ width: "100%", height: "100%", border: 0 }}
      />
    </div>
  </VizFrame>
);

const PatentsViz = () => {
  const sats = [
    { cx: 60, cy: 40, r: 6, fill: "#103E8C", stroke: "#0a2862", d: "0s" },
    { cx: 100, cy: 120, r: 5, fill: "#5d7838", stroke: "#5d7838", d: ".3s" },
    { cx: 240, cy: 50, r: 6, fill: "#103E8C", stroke: "#0a2862", d: ".6s" },
    { cx: 270, cy: 115, r: 5, fill: "#b85a3a", stroke: "#b85a3a", d: ".9s" },
    { cx: 80, cy: 100, r: 4, fill: "#5d7838", stroke: "#5d7838", d: "1.2s" },
    { cx: 200, cy: 115, r: 4, fill: "#b85a3a", stroke: "#b85a3a", d: "1.5s" },
  ];
  return (
    <VizFrame
      kicker="· Innovation graph · Brevets & écosystèmes ·"
      title="Constellation des technologies émergentes"
    >
      <style>{`
        @keyframes pulse-node { 0%,100% { opacity:.45 } 50% { opacity:1 } }
      `}</style>
      <svg viewBox="0 0 320 160" width="100%" height={160}>
        {sats.map((s, i) => (
          <line
            key={`l-${i}`}
            x1={160}
            y1={80}
            x2={s.cx}
            y2={s.cy}
            stroke={C.gold}
            strokeWidth={0.6}
            opacity={0.4}
          />
        ))}
        <circle cx={160} cy={80} r={10} fill={C.gold} stroke={C.goldDim} strokeWidth={1.5} />
        <text
          x={160}
          y={83}
          textAnchor="middle"
          style={{ fontFamily: FONT_DISPLAY, fontSize: 9, fontWeight: 700, fill: C.navy }}
        >
          B
        </text>
        {sats.map((s, i) => (
          <circle
            key={`s-${i}`}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={s.fill}
            stroke={s.stroke}
            strokeWidth={1}
            style={{ animation: `pulse-node 2.4s infinite`, animationDelay: s.d }}
          />
        ))}
      </svg>
      <div
        className="flex justify-around"
        style={{ paddingTop: 10, borderTop: `1px solid ${C.rule}`, marginTop: 6 }}
      >
        {[
          { n: "847", l: "Brevets suivis" },
          { n: "12", l: "Écosystèmes" },
          { n: "4", l: "Hubs deeptech" },
        ].map((c, i) => (
          <div key={i} className="text-center">
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 20, color: C.navy }}>{c.n}</div>
            <div
              className="uppercase"
              style={{ fontFamily: FONT_MONO, fontSize: 8.5, color: C.navyMid, letterSpacing: "0.15em" }}
            >
              {c.l}
            </div>
          </div>
        ))}
      </div>
    </VizFrame>
  );
};

const MatrixViz = () => {
  const nodes = [
    { cx: 65, cy: 55, r: 7, fill: "#b85a3a", stroke: "#8a3f25" },
    { cx: 100, cy: 75, r: 6, fill: "#103E8C", stroke: "#0a2862" },
    { cx: 135, cy: 125, r: 5, fill: "#5d7838", stroke: "#5d7838" },
    { cx: 220, cy: 65, r: 8, fill: C.gold, stroke: C.goldDim },
    { cx: 255, cy: 90, r: 6, fill: "#103E8C", stroke: "#0a2862" },
    { cx: 245, cy: 135, r: 5, fill: "#5d7838", stroke: "#5d7838" },
  ];
  return (
    <VizFrame
      kicker="· Stakeholder map · Méthode Buildfluence ·"
      title="Matrice d'influence : qui pèse vraiment"
      footer="Méthode appliquée sur le case file OCP ↓"
    >
      <style>{`
        @keyframes fadein-mat { from { opacity:0; transform:scale(.7); } to { opacity:1; transform:scale(1); } }
      `}</style>
      <svg viewBox="0 0 320 200" width="100%" height={200}>
        {/* grille pointillée */}
        <line x1={90} y1={20} x2={90} y2={180} stroke={C.rule} strokeDasharray="2 2" />
        <line x1={230} y1={20} x2={230} y2={180} stroke={C.rule} strokeDasharray="2 2" />
        <line x1={20} y1={60} x2={300} y2={60} stroke={C.rule} strokeDasharray="2 2" />
        <line x1={20} y1={140} x2={300} y2={140} stroke={C.rule} strokeDasharray="2 2" />
        {/* axes */}
        <line x1={160} y1={20} x2={160} y2={180} stroke={C.navyMid} strokeWidth={0.8} opacity={0.4} />
        <line x1={20} y1={100} x2={300} y2={100} stroke={C.navyMid} strokeWidth={0.8} opacity={0.4} />
        {/* labels quadrants */}
        {[
          { x: 90, y: 40, t: "Réfractaires" },
          { x: 230, y: 40, t: "Alliés" },
          { x: 90, y: 170, t: "Idiots utiles" },
          { x: 230, y: 170, t: "Neutres" },
        ].map((q, i) => (
          <text
            key={i}
            x={q.x}
            y={q.y}
            textAnchor="middle"
            style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 9, fill: C.navyMid, opacity: 0.55 }}
          >
            {q.t}
          </text>
        ))}
        {/* axes labels */}
        <text x={160} y={14} textAnchor="middle" style={{ fontFamily: FONT_MONO, fontSize: 7.5, fill: C.goldDim }}>
          ↑ INFLUENCE
        </text>
        <text x={22} y={103} style={{ fontFamily: FONT_MONO, fontSize: 7.5, fill: C.goldDim }}>
          ← HOSTILE
        </text>
        <text x={298} y={103} textAnchor="end" style={{ fontFamily: FONT_MONO, fontSize: 7.5, fill: C.goldDim }}>
          ALLIÉ →
        </text>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={n.fill}
            stroke={n.stroke}
            strokeWidth={1.2}
            style={{
              transformOrigin: `${n.cx}px ${n.cy}px`,
              animation: `fadein-mat .5s ease-out ${0.1 + i * 0.1}s both`,
            }}
          />
        ))}
      </svg>
    </VizFrame>
  );
};

const ForesightViz = ({ indexKey }: { indexKey: string }) => {
  switch (indexKey) {
    case "S/01":
      return <PodiumViz />;
    case "S/02":
      return <FlourishViz />;
    case "S/03":
      return <PatentsViz />;
    case "S/04":
      return <MatrixViz />;
    default:
      return null;
  }
};

/* ═══════════════════════════════════════════════════════
   SECTION 02 — THREAT INTELLIGENCE (cockpit dual mode)
   ═══════════════════════════════════════════════════════ */

type ThreatMode = "veille" | "warroom";

const THREAT_CONTENT: Record<
  ThreatMode,
  {
    num: string;
    title: string;
    tag: string;
    tagColor: string;
    lead: string;
    bullets: string[];
  }
> = {
  veille: {
    num: "01",
    title: "OSINT & Fact-Checking",
    tag: "● ACTIF 24/7",
    tagColor: C.gold,
    lead:
      "Dans un environnement saturé de narratifs concurrents, savoir qui parle, depuis où, avec quels relais, est devenu un avantage décisif.",
    bullets: [
      "Veille multicanale augmentée par l'IA (presse, social, dark web)",
      "Identification et cartographie des sources hostiles",
      "Analyse de polarisation narrative",
      "Fact-checking en temps réel avec traçabilité",
      "Tracking des influenceurs et relais d'amplification",
      "Détection des signaux faibles précurseurs de crise",
    ],
  },
  warroom: {
    num: "01",
    title: "Gestion de Crise",
    tag: "◈ WAR ROOM ACTIVE",
    tagColor: C.alert,
    lead:
      "Une crise mal gérée peut détruire en 48h ce qui a été construit en 20 ans. Nous intervenons pour neutraliser, reprendre le récit, protéger.",
    bullets: [
      "Activation War Room en moins de 2h",
      "Monitoring temps réel des flux médiatiques et sociaux",
      "Digital Investigation & OSINT ciblés",
      "Fact-checking continu et production de contre-narratifs",
      "Stratégie de communication de crise et porte-paroles",
      "Reconquête réputationnelle post-crise",
    ],
  },
};

/* ─────── Mini-viz Threat Intelligence (radar veille / courbe war room) ─────── */

const ThreatPaneHeader = ({
  num,
  title,
  tag,
  tagColor,
  lead,
}: {
  num: string;
  title: string;
  tag: string;
  tagColor: string;
  lead: string;
}) => (
  <div className="mb-6">
    <div
      style={{
        fontFamily: FONT_DISPLAY,
        fontStyle: "italic",
        fontSize: 64,
        color: C.gold,
        lineHeight: 1,
      }}
    >
      {num}
    </div>
    <h4 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: C.ivory, lineHeight: 1.2 }}>
      {title}
    </h4>
    <div
      className="inline-block mt-3 uppercase"
      style={{
        fontFamily: FONT_MONO,
        fontSize: 10,
        color: tagColor,
        border: `1px solid ${tagColor}`,
        padding: "4px 10px",
        letterSpacing: "0.22em",
      }}
    >
      {tag}
    </div>
    <p
      className="italic mt-4 pl-4"
      style={{
        fontFamily: FONT_ITALIC,
        fontSize: 16,
        color: "rgba(245,241,232,0.85)",
        borderLeft: `2px solid ${C.gold}`,
        lineHeight: 1.5,
      }}
    >
      {lead}
    </p>
  </div>
);

const RadarFeedViz = () => {
  const blips = [
    { cx: 135, cy: 55, d: "0.4s" },
    { cx: 60, cy: 130, d: "1.6s" },
    { cx: 155, cy: 125, d: "2.4s" },
    { cx: 75, cy: 65, d: "3.2s" },
  ];
  const signals = [
    { t: "14:32", s: "Pic narratif sur réseaux NL", lvl: "Faible", bg: "rgba(201,168,76,.2)", c: C.gold, d: "0.3s" },
    { t: "11:08", s: "Coordination détectée 3 sites", lvl: "Moyen", bg: "rgba(217,119,6,.2)", c: "#f59e0b", d: "0.7s" },
    { t: "09:14", s: "Brevet concurrent FR/EPO", lvl: "Faible", bg: "rgba(201,168,76,.2)", c: C.gold, d: "1.1s" },
  ];
  return (
    <div>
      <style>{`
        @keyframes radar-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes blip-flash {
          0%, 70%, 100% { opacity: 0; r: 2; }
          5%, 30% { opacity: 1; r: 5; }
        }
        @keyframes signal-in { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
        @keyframes pulse-dot { 0%,100% { opacity:.4 } 50% { opacity:1 } }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: 280,
          height: 200,
          margin: "0 auto",
          background: "radial-gradient(circle at center, rgba(201,168,76,0.10), transparent 70%)",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <defs>
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={C.gold} stopOpacity={0.6} />
              <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
            </radialGradient>
          </defs>
          {[30, 60, 90].map((r) => (
            <circle key={r} cx={100} cy={100} r={r} fill="none" stroke={C.gold} opacity={0.3} />
          ))}
          <line x1={100} y1={10} x2={100} y2={190} stroke={C.gold} opacity={0.25} strokeDasharray="2 3" />
          <line x1={10} y1={100} x2={190} y2={100} stroke={C.gold} opacity={0.25} strokeDasharray="2 3" />
          <path
            className="radar-sweep"
            d="M 100 100 L 100 10 A 90 90 0 0 1 173.5 56 Z"
            fill="url(#radarSweep)"
            style={{ transformOrigin: "50% 50%", animation: "radar-rotate 4s linear infinite" }}
          />
          {blips.map((b, i) => (
            <circle
              key={i}
              className="radar-blip"
              cx={b.cx}
              cy={b.cy}
              r={3}
              fill={C.gold}
              style={{ animation: `blip-flash 4s linear infinite`, animationDelay: b.d }}
            />
          ))}
          <circle cx={100} cy={100} r={3} fill={C.gold} />
        </svg>
      </div>

      <div
        style={{
          background: "rgba(13,27,42,0.4)",
          border: "1px solid rgba(201,168,76,0.15)",
          padding: "14px 16px",
          borderRadius: 2,
          marginTop: 18,
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <div
            className="uppercase"
            style={{ fontFamily: FONT_MONO, fontSize: 9, color: C.gold, letterSpacing: "0.25em" }}
          >
            · Signaux faibles · 7 derniers jours
          </div>
          <div
            style={{
              background: C.gold,
              color: C.navy,
              padding: "2px 7px",
              fontFamily: FONT_MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.15em",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: C.navy,
                animation: "pulse-dot 1.4s infinite",
                display: "inline-block",
              }}
            />
            LIVE
          </div>
        </div>
        {signals.map((sig, i) => (
          <div
            key={i}
            className="signal-row"
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr auto",
              gap: 10,
              padding: "6px 0",
              borderBottom: i < signals.length - 1 ? "1px dashed rgba(201,168,76,0.15)" : "none",
              alignItems: "center",
              animation: `signal-in .5s ease-out ${sig.d} both`,
            }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.goldSoft }}>{sig.t}</span>
            <span style={{ fontSize: 12, color: "rgba(245,241,232,0.9)" }}>{sig.s}</span>
            <span
              className="uppercase"
              style={{
                fontFamily: FONT_MONO,
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.18em",
                padding: "2px 6px",
                background: sig.bg,
                color: sig.c,
              }}
            >
              {sig.lvl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CrisisCurveViz = () => {
  const metrics = [
    { v: "<2h", l: "Activation" },
    { v: "24/7", l: "Monitoring" },
    { v: "48h", l: "Premier plan" },
    { v: "2 sem.", l: "Sortie crise" },
  ];
  return (
    <div>
      <div
        className="grid grid-cols-2 gap-3 mb-6"
        style={{ border: `1px solid rgba(201,168,76,0.2)`, padding: 14 }}
      >
        {metrics.map((m, i) => (
          <div key={i} className="text-center" style={{ padding: "8px 4px", background: "rgba(13,27,42,0.4)" }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 900, color: C.gold, lineHeight: 1 }}>
              {m.v}
            </div>
            <div
              className="mt-1 uppercase"
              style={{ fontFamily: FONT_MONO, fontSize: 9, color: "rgba(245,241,232,0.65)", letterSpacing: "0.18em" }}
            >
              {m.l}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          width: "100%",
          height: 180,
          marginTop: 18,
          background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`,
          border: `1px solid rgba(224,109,79,.25)`,
          padding: 14,
          position: "relative",
          borderRadius: 2,
        }}
      >
        <style>{`
          @keyframes draw-disinfo { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
          @keyframes fade-curve-el { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
        <div className="flex justify-between items-center uppercase" style={{ fontFamily: FONT_MONO, fontSize: 9, color: C.alert, letterSpacing: "0.12em" }}>
          <span>· Courbe désinformation vs contre-narratif</span>
          <span style={{ color: C.gold }}>CASE H1N1</span>
        </div>
        <svg viewBox="0 0 300 130" width="100%" height={130}>
          <defs>
            <linearGradient id="disinfoGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={C.alert} stopOpacity={0.4} />
              <stop offset="100%" stopColor={C.alert} stopOpacity={0} />
            </linearGradient>
          </defs>
          {[30, 65, 100].map((y) => (
            <line key={y} x1={0} y1={y} x2={300} y2={y} stroke="rgba(245,241,232,.08)" />
          ))}
          {[
            { x: 5, t: "H+0" },
            { x: 105, t: "J+3" },
            { x: 195, t: "J+7" },
            { x: 270, t: "J+14" },
          ].map((l) => (
            <text key={l.t} x={l.x} y={125} style={{ fontFamily: FONT_MONO, fontSize: 8, fill: "rgba(245,241,232,.4)" }}>
              {l.t}
            </text>
          ))}
          <path
            className="cc-area-disinfo"
            d="M 0 110 Q 50 100, 100 35 T 200 50 T 300 105 L 300 130 L 0 130 Z"
            fill="url(#disinfoGradient)"
            style={{ opacity: 0, animation: "fade-curve-el 1s ease-out 2.5s forwards" }}
          />
          <path
            className="cc-line-disinfo"
            d="M 0 110 Q 50 100, 100 35 T 200 50 T 300 105"
            fill="none"
            stroke={C.alert}
            strokeWidth={2}
            strokeDasharray={1000}
            strokeDashoffset={1000}
            style={{ animation: "draw-disinfo 3s ease-out forwards" }}
          />
          <path
            className="cc-line-counter"
            d="M 100 115 Q 150 90, 200 55 T 300 30"
            fill="none"
            stroke={C.gold}
            strokeWidth={2}
            strokeDasharray={1000}
            strokeDashoffset={1000}
            style={{ animation: "draw-disinfo 3s ease-out 1.2s forwards" }}
          />
          <circle className="cc-marker" cx={100} cy={35} r={4} fill={C.gold} style={{ opacity: 0, animation: "fade-curve-el .45s ease-out 3.2s forwards" }} />
          <text className="cc-marker-label" x={105} y={25} style={{ fontFamily: FONT_MONO, fontSize: 8, fill: C.gold, letterSpacing: ".1em", opacity: 0, animation: "fade-curve-el .45s ease-out 3.4s forwards" }}>
            PIC J+3
          </text>
          <circle className="cc-marker" cx={270} cy={40} r={4} fill={C.gold} style={{ opacity: 0, animation: "fade-curve-el .45s ease-out 3.6s forwards" }} />
          <text className="cc-marker-label" x={220} y={32} style={{ fontFamily: FONT_MONO, fontSize: 8, fill: C.gold, letterSpacing: ".1em", opacity: 0, animation: "fade-curve-el .45s ease-out 3.8s forwards" }}>
            RÉCIT REPRIS
          </text>
        </svg>
        <div className="flex justify-center gap-[18px] uppercase" style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 8.5, color: "rgba(245,241,232,.6)" }}>
          <span><span style={{ color: C.alert }}>—</span> Désinformation</span>
          <span><span style={{ color: C.gold }}>—</span> Contre-narratif</span>
        </div>
      </div>
    </div>
  );
};

const ThreatViz = ({ mode }: { mode: ThreatMode }) => {
  if (mode === "veille") {
    return (
      <>
        <ThreatPaneHeader
          num="02"
          title="Radar opérationnel"
          tag="● Surveillance live 24/7"
          tagColor={C.gold}
          lead="Détection en continu des signaux faibles. Chaque blip est un événement à qualifier avant qu'il ne devienne une crise."
        />
        <RadarFeedViz />
      </>
    );
  }
  return (
    <>
      <ThreatPaneHeader
        num="02"
        title="Pilotage de crise"
        tag="◈ War Room active"
        tagColor={C.alert}
        lead="Tableau de bord temps réel. La désinformation contre-attaquée par le contre-narratif jusqu'à reprise du récit."
      />
      <CrisisCurveViz />
    </>
  );
};

const ThreatSection = () => {
  const [mode, setMode] = useState<ThreatMode>("veille");
  const data = THREAT_CONTENT[mode];
  const restartThreatAnimations = () => {
    requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>(
          ".signal-row, .cc-line-disinfo, .cc-line-counter, .cc-area-disinfo, .cc-marker, .cc-marker-label, .radar-blip, .radar-sweep"
        )
        .forEach((element) => {
          element.style.animation = "none";
          void element.offsetWidth;
          element.style.animation = "";
        });
    });
  };

  const ToggleBtn = ({ value, label }: { value: ThreatMode; label: string }) => {
    const active = mode === value;
    return (
      <button
        onClick={() => {
          setMode(value);
          restartThreatAnimations();
        }}
        className="transition-colors"
        style={{
          background: active ? C.gold : "transparent",
          color: active ? C.navy : C.ivory,
          fontFamily: FONT_MONO,
          fontSize: 11,
          letterSpacing: "0.2em",
          padding: "8px 16px",
          border: "none",
          fontWeight: 600,
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="rounded-xl px-6 md:px-10 py-10"
      style={{ background: "#F0F4FB", border: "1px solid #D0DCF0" }}
    >
      <div className="mb-8">
        <div
          className="text-[11px] uppercase mb-3"
          style={{ fontFamily: FONT_MONO, color: C.gold, letterSpacing: "0.25em" }}
        >
          02 · Threat Intelligence
        </div>
        <h3
          id="threat-intelligence"
          className="text-3xl md:text-4xl scroll-mt-24"
          style={{ fontFamily: FONT_DISPLAY, color: C.navy, lineHeight: 1.15 }}
        >
          De la veille continue{" "}
          <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>au</em> mode crise
        </h3>
        <p
          className="mt-3 text-lg italic"
          style={{ fontFamily: FONT_ITALIC, color: C.navyMid }}
        >
          Un cockpit double mode : détecter les signaux faibles en temps réel,
          déclencher la War Room quand la crise frappe.
        </p>
      </div>

      {/* Cockpit */}
      <div style={{ border: `1px solid ${C.gold}` }}>
        {/* Cockpit header */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{
            background: C.navy,
            color: C.ivory,
            padding: "20px 24px",
            borderBottom: `2px solid ${C.gold}`,
          }}
        >
          <div
            className="uppercase"
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: C.gold,
              letterSpacing: "0.22em",
            }}
          >
            · COCKPIT THREAT INTELLIGENCE ·
          </div>
          <div
            className="flex items-center"
            style={{
              background: C.navyMid,
              border: `1px solid ${C.gold}`,
              padding: 4,
            }}
          >
            <ToggleBtn value="veille" label="● VEILLE" />
            <ToggleBtn value="warroom" label="◈ WAR ROOM" />
          </div>
          <div
            className="italic text-sm hidden md:block"
            style={{ fontFamily: FONT_ITALIC, color: "rgba(245,241,232,0.7)" }}
          >
            Basculez entre mode continu et mode crise
          </div>
        </div>

        {/* Cockpit body */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]"
          style={{ background: C.navy, color: C.ivory }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`pane-l-${mode}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.35 }}
              className="p-8 md:p-10"
              style={{ borderRight: `1px solid rgba(201,168,76,0.2)` }}
            >
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontStyle: "italic",
                  fontSize: 64,
                  color: C.gold,
                  lineHeight: 1,
                }}
              >
                {data.num}
              </div>
              <h4
                className="mt-3"
                style={{ fontFamily: FONT_DISPLAY, fontSize: 26, lineHeight: 1.2 }}
              >
                {data.title}
              </h4>
              <div
                className="inline-block mt-4 uppercase"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  color: data.tagColor,
                  border: `1px solid ${data.tagColor}`,
                  padding: "4px 10px",
                  letterSpacing: "0.22em",
                }}
              >
                {data.tag}
              </div>
              <p
                className="italic mt-6 pl-4"
                style={{
                  fontFamily: FONT_ITALIC,
                  fontSize: 18,
                  color: "rgba(245,241,232,0.85)",
                  borderLeft: `2px solid ${C.gold}`,
                  lineHeight: 1.5,
                }}
              >
                {data.lead}
              </p>
              <ul className="mt-6 space-y-3">
                {data.bullets.map((b, k) => (
                  <li
                    key={k}
                    className="flex gap-3 text-sm"
                    style={{ color: "rgba(245,241,232,0.9)", lineHeight: 1.55 }}
                  >
                    <span style={{ color: C.gold, fontWeight: 700 }}>›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`pane-r-${mode}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.35 }}
              className="p-8 md:p-10"
              style={{
                background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`,
                minHeight: 360,
              }}
            >
              <ThreatViz mode={mode} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   SECTION 03 — MODÉLISATIONS & POCs (3 cartes levels)
   ═══════════════════════════════════════════════════════ */

const LEVELS = [
  {
    num: "01",
    label: "POC EXPRESS",
    title: "Preuve rapide",
    tag: "Livrable en 1 semaine",
    bullets: [
      "Intégration de vos enjeux stratégiques",
      "Audit de maturité décisionnelle (diagnostic initial)",
      "1 cas d'usage modélisé sur données réelles",
      "Démonstration opérationnelle live",
    ],
    deliverable: "Rapport de faisabilité + démo fonctionnelle",
  },
  {
    num: "02",
    label: "PILOT",
    title: "Modèle actionnable",
    tag: "Livrable en 3-4 semaines",
    bullets: [
      "Modèles d'analyse prédictive sur données client",
      "Plateformes de détection de signaux faibles (POC live)",
      "Baromètres d'image et de réputation en temps réel",
      "Tableaux de bord décisionnels interactifs",
      "Strategic Business Review avec recommandations",
    ],
    deliverable: "Cockpit fonctionnel + feuille de route industrialisation",
  },
  {
    num: "03",
    label: "INFRASTRUCTURE",
    title: "Déploiement complet",
    tag: "6-12 semaines",
    bullets: [
      "Infrastructure décisionnelle permanente",
      "Intégration dans vos systèmes existants",
      "Formation et transfert de compétences",
      "Monitoring, maintenance et évolution",
      "Accompagnement stratégique long terme",
    ],
    deliverable: "Dispositif opérationnel + équipe dédiée",
  },
];

const ModelisationsSection = () => {
  return (
    <div
      className="rounded-xl px-6 md:px-10 py-10"
      style={{ background: C.paper, border: `1px solid ${C.rule}` }}
    >
      <div className="mb-8">
        <div
          className="text-[11px] uppercase mb-3"
          style={{ fontFamily: FONT_MONO, color: C.gold, letterSpacing: "0.25em" }}
        >
          03 · Modélisations & POCs
        </div>
        <h3
          id="modelisations-pocs"
          className="text-3xl md:text-4xl scroll-mt-24"
          style={{ fontFamily: FONT_DISPLAY, color: C.navy, lineHeight: 1.15 }}
        >
          Trois niveaux.{" "}
          <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>
            Une seule logique :
          </em>{" "}
          prouver la valeur avant de déployer.
        </h3>
        <p
          className="mt-3 text-lg italic"
          style={{ fontFamily: FONT_ITALIC, color: C.navyMid }}
        >
          Du POC express à l'infrastructure décisionnelle complète — chaque
          niveau rend un livrable mesurable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEVELS.map((lv) => (
          <div
            key={lv.num}
            className="group transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "#FFFFFF",
              border: `1px solid ${C.rule}`,
              borderTop: `3px solid ${C.gold}`,
              padding: "36px 32px 32px",
              boxShadow: "0 1px 0 rgba(13,27,42,0.04)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 30px 60px -30px rgba(13,27,42,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 1px 0 rgba(13,27,42,0.04)")
            }
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontSize: 64,
                  color: C.gold,
                  lineHeight: 1,
                }}
              >
                {lv.num}
              </span>
              <span
                className="uppercase"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 13,
                  color: C.goldDim,
                  letterSpacing: "0.2em",
                }}
              >
                {lv.label}
              </span>
            </div>
            <h4
              className="mt-3 mb-1"
              style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: C.navy }}
            >
              {lv.title}
            </h4>
            <div
              className="italic mb-5"
              style={{ fontFamily: FONT_ITALIC, fontSize: 15, color: C.goldDim }}
            >
              {lv.tag}
            </div>
            <ul className="space-y-2.5">
              {lv.bullets.map((b, k) => (
                <li
                  key={k}
                  className="flex gap-2.5 text-sm"
                  style={{ color: C.navy, lineHeight: 1.55 }}
                >
                  <span style={{ color: C.gold, fontWeight: 700 }}>→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div
              className="mt-6 pt-5"
              style={{ borderTop: `1px solid ${C.rule}` }}
            >
              <div
                className="uppercase mb-1"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  color: C.goldDim,
                  letterSpacing: "0.22em",
                }}
              >
                Livrable
              </div>
              <div className="text-sm" style={{ color: C.navy, fontWeight: 500 }}>
                {lv.deliverable}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote encadré navy */}
      <div
        className="mt-10 text-center"
        style={{
          background: C.navy,
          color: C.ivory,
          padding: "36px 44px",
          borderLeft: `4px solid ${C.gold}`,
        }}
      >
        <p
          className="italic"
          style={{
            fontFamily: FONT_ITALIC,
            fontSize: 22,
            color: C.goldHover,
            lineHeight: 1.4,
          }}
        >
          « Un POC Buildfluence, c'est la preuve par l'action. Zéro théorie,
          cent pour cent opérationnel. »
        </p>
        <div
          className="mt-3 uppercase"
          style={{
            fontFamily: FONT_MONO,
            fontSize: 10,
            color: C.gold,
            letterSpacing: "0.25em",
          }}
        >
          — Méthode Buildfluence
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

const StrategicIntelligenceLab = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.hash]);

  return (
    <DetailPageLayout
      title="Strategic Intelligence Lab"
      chapeau={t(
        "Le pouvoir appartient à ceux qui voient les ruptures avant qu'elles ne soient évidentes. Le Strategic Intelligence Lab transforme l'incertain en actionnable.",
        "Power belongs to those who see disruptions before they become obvious. The Strategic Intelligence Lab transforms uncertainty into actionable."
      )}
      ctas={[{ label: t("Parler de mon projet", "Discuss my project"), action: "#", formType: "f1" }]}
      situationContext="Strategic Intelligence Lab"
    >
      {/* Intro paragraphes */}
      <div
        className="rounded-lg border-l-4 px-6 py-5 space-y-4"
        style={{ borderColor: "#103E8C", background: "rgba(16,62,140,0.04)" }}
      >
        <p className="text-sm leading-relaxed text-foreground/85">
          {lang === "fr" ? (
            <>
              Le Strategic Intelligence Lab est le dispositif que Buildfluence a
              conçu pour transformer cette capacité en{" "}
              <strong>infrastructure décisionnelle permanente</strong>.
            </>
          ) : (
            <>
              The Strategic Intelligence Lab is the system Buildfluence has
              designed to transform this capacity into a{" "}
              <strong>permanent decision-making infrastructure</strong>.
            </>
          )}
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          {lang === "fr" ? (
            <>
              Nous ne produisons pas de rapports volumineux;{" "}
              <strong>nous construisons des écosystèmes de décision</strong> :
              Des dispositifs factuels, alimentés en temps réel, capables de
              capter les signaux faibles, de cartographier les menaces invisibles
              et de{" "}
              <strong>
                traduire l'intelligence brute en leviers d'action stratégique
              </strong>
              .
            </>
          ) : (
            <>
              We don't produce bulky reports;{" "}
              <strong>we build decision ecosystems</strong>: Factual systems,
              fed in real time, capable of capturing weak signals, mapping
              invisible threats and{" "}
              <strong>
                translating raw intelligence into strategic action levers
              </strong>
              .
            </>
          )}
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          {lang === "fr" ? (
            <>
              Aujourd'hui, <strong>les outils de veille sont accessibles à tous</strong>.
              En revanche, produire une lecture intégrée, un décryptage
              approfondi et une cartographie multidimensionnelle capables de{" "}
              <strong>
                renforcer la souveraineté, le positionnement et la capacité
                d'influence
              </strong>
              , demeure rare.
            </>
          ) : (
            <>
              Today,{" "}
              <strong>monitoring tools are accessible to everyone</strong>.
              However, producing an integrated reading, in-depth analysis and
              multidimensional mapping capable of{" "}
              <strong>
                strengthening sovereignty, positioning and influence capacity
              </strong>
              , remains rare.
            </>
          )}
        </p>
      </div>

      {/* Diagramme orbital — INTACT */}
      <ConstructionInfluence />

      {/* SECTION 01 */}
      <ForesightSection />

      {/* Cas client OCP rattaché à Foresight */}
      <CaseStudy
        title="Cas client : OCP Group"
        context="Cartographie de l'écosystème concurrentiel. Tableau de bord décisionnel au cabinet du Président."
        intervention={[
          "Analyse par échiquiers : Géopolitique, Concurrentiel, Sociétal",
          "Cartographie et Matrice dynamique des parties prenantes",
          "Tableau de bord décisionnel",
        ]}
        result="Actions de sensibilisation et de contre-influence auprès des clients et partenaires. Maîtrise des menaces sociétales."
      />

      {/* SECTION 02 */}
      <ThreatSection />

      {/* Cas client Ministère rattaché à Threat */}
      <CaseStudy
        title="Cas client : Ministère de la Santé"
        context="Crise H1N1, 40 décès, désinformation massive."
        intervention={[
          "Digital Investigation et Fact-checking en temps réel",
          "Identification des sources de désinformation",
          "War room de crise",
        ]}
        result="Crise maîtrisée en 2 semaines. Renforcement de l'image digitale du Ministre. Accompagnement de l'équipe de communication et du Cabinet Ministériel."
      />


      {/* SECTION 03 */}
      <ModelisationsSection />
    </DetailPageLayout>
  );
};

export default StrategicIntelligenceLab;
