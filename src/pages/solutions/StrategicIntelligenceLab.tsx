import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import DetailPageLayout from "@/components/DetailPageLayout";
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

const getForesight = (lang: "fr" | "en"): ForesightCard[] => lang === "en" ? [
  {
    index: "S/01",
    title: "Market & Competitive Intelligence",
    role: "Monitoring · Mapping · Benchmarks",
    preview: "See markets before their players, read competitors better than they read themselves.",
    lead: "See markets before their players, read competitors better than they read themselves.",
    bullets: [
      "Multi-channel intelligence: markets, competitors, patents, regulatory",
      "Dynamic competitive mapping",
      "Sectoral trend detection",
      "Identification of high-potential markets",
      "Foresight studies, international benchmarks",
      "Mapping of key actors: Allies / Resisters / Useful idiots",
    ],
  },
  {
    index: "S/02",
    title: "Territorial Attractiveness",
    role: "Competitiveness · Narratives · Influence",
    preview: "Steering economic attractiveness in the war for investment.",
    lead: "Get a cross-analysis of investment signals, public strategies and international influence games. It allows you to understand:",
    bullets: [
      "Where is global competition really being fought? Identify the territories that concentrate investment flows and understand sectoral dominance dynamics.",
      "Which countries are gaining attractiveness and why? Analyse differentiating factors: speed of execution, stability, influence strategy, ecosystem structuring.",
      "How are direct competitors positioning themselves? Dynamic benchmark of rival countries, their sectoral strengths and expansion strategies.",
      "Which narratives shape investor perception? Decode the dominant narratives that influence decisions beyond economic fundamentals.",
    ],
  },
  {
    index: "S/03",
    title: "Innovation Mapping",
    role: "Deeptech · Patents · M&A",
    preview: "Map the technologies that will reshape your sector in 3-5 years.",
    lead: "Map the technologies that will reshape your sector in 3-5 years.",
    bullets: [
      "Mapping of emerging technologies and startups",
      "Innovation ecosystems (Deeptech, AI, biotech)",
      "VC/CVC trends",
      "Open Innovation opportunities and strategic M&A",
      "Patent intelligence (WIPO, EPO, USPTO)",
    ],
  },
  {
    index: "S/04",
    title: "Stakeholder Intelligence",
    role: "Coalitions · Influences · Networks",
    preview: "Identify the actors that truly weigh on your strategic decisions.",
    lead: "Identify the actors that truly weigh on your strategic decisions.",
    bullets: [
      "Mapping of adversarial strategies and hidden influence networks",
      "Mapping of opinion leaders, investors, think tanks, NGOs",
      "Analysis of alliances, antagonisms and coalition dynamics",
      "Identification of key actors likely to weigh on your decisions",
      "Modelling of pressure and counter-influence scenarios",
    ],
  },
] : [
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
      "Disposez d'une analyse croisée des signaux d'investissement, des stratégies publiques et des jeux d'influence internationaux. Elle permet de comprendre :",
    bullets: [
      "Où se joue réellement la compétition mondiale ? Identifier les territoires qui concentrent les flux d'investissement et comprendre les logiques de domination sectorielle.",
      "Quels pays gagnent en attractivité et pourquoi ? Analyser les facteurs différenciants : rapidité d'exécution, stabilité, stratégie d'influence, structuration des écosystèmes.",
      "Comment se positionnent les concurrents directs ? Benchmark dynamique des pays rivaux, de leurs forces sectorielles et de leurs stratégies d'expansion.",
      "Quels récits façonnent la perception des investisseurs ? Décrypter les narratifs dominants qui influencent les décisions au-delà des fondamentaux économiques.",
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
  const { lang } = useLanguage();
  const FORESIGHT = getForesight(lang);
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
          {lang === "en" ? <>Map the battlefield <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>before</em> entering it</> : <>Cartographier le champ de bataille{" "}<em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>avant</em>{" "}d'y entrer</>}
        </h3>
        <p
          className="mt-3 text-lg italic"
          style={{ fontFamily: FONT_ITALIC, color: C.navyMid }}
        >
          {lang === "en"
            ? "Four capabilities to read markets, territories, innovation and stakeholder games, in depth."
            : "Quatre capacités pour lire les marchés, les territoires, l'innovation et les jeux d'acteurs, en profondeur."}
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
                {lang === "en" ? "EXPLORE →" : "EXPLORER →"}
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
                › {card.index} · {lang === "en" ? "DETAIL" : "DÉTAIL"}
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
              {card.index === "S/01" && (
                <a
                  href="/barometre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-6 hover:underline"
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    color: C.gold,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  {lang === "en" ? "View the barometer →" : "Voir le baromètre →"}
                </a>
              )}
              <ul className="space-y-5">
                {card.bullets.map((b, k) => {
                  const qMark = b.indexOf("?");
                  const hasQuestion = qMark !== -1;
                  const question = hasQuestion ? b.slice(0, qMark + 1).trim() : b;
                  const answer = hasQuestion ? b.slice(qMark + 1).trim() : "";
                  return (
                    <li key={k} className="flex gap-3 text-sm" style={{ color: C.navy, lineHeight: 1.55 }}>
                      <span style={{ color: C.gold, fontWeight: 700 }}>→</span>
                      <div>
                        <div style={{ fontWeight: 700 }}>{question}</div>
                        {answer && <div style={{ fontWeight: 400, marginTop: 4 }}>{answer}</div>}
                      </div>
                    </li>
                  );
                })}
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
  const { lang } = useLanguage();
  const bars = [
    { rank: 2, country: "Vietnam", score: "9 225", h: "78%" },
    { rank: 1, country: lang === "en" ? "South Africa" : "Afrique du Sud", score: "9 968", h: "95%" },
    { rank: 3, country: lang === "en" ? "Mexico" : "Mexique", score: "4 761", h: "55%" },
  ];
  return (
    <VizFrame
      kicker={lang === "en" ? "· Barometer · July–August 2025 ·" : "· Baromètre · Juillet–Août 2025 ·"}
      title={lang === "en" ? "Global Competitiveness Index" : "Indice mondial de compétitivité"}
      footer={
        <>
          <a
            href="/barometre"
            target="_blank"
            rel="noopener noreferrer"
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
            {lang === "en" ? "View the barometer →" : "Voir le baromètre →"}
          </a>
          <div>{lang === "en" ? "Excerpt from the investment barometer" : "Extrait du baromètre d'investissement"}</div>
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

const FlourishViz = () => {
  const { lang } = useLanguage();
  return (
  <VizFrame
    kicker={lang === "en" ? "· Territorial mapping ·" : "· Cartographie territoriale ·"}
    title={lang === "en" ? "Interactive territorial hierarchy" : "Hiérarchie territoriale interactive"}
    footer={lang === "en" ? "Interact directly with the visualisation" : "Interagissez directement avec la visualisation"}
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
};

const PatentsViz = () => {
  const { lang } = useLanguage();
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
      kicker={lang === "en" ? "· Innovation graph · Patents & ecosystems ·" : "· Innovation graph · Brevets & écosystèmes ·"}
      title={lang === "en" ? "Constellation of emerging technologies" : "Constellation des technologies émergentes"}
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
          { n: "847", l: lang === "en" ? "Patents tracked" : "Brevets suivis" },
          { n: "12", l: lang === "en" ? "Ecosystems" : "Écosystèmes" },
          { n: "4", l: lang === "en" ? "Deeptech hubs" : "Hubs deeptech" },
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
  const { lang } = useLanguage();
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
      kicker={lang === "en" ? "· Stakeholder map · Buildfluence method ·" : "· Stakeholder map · Méthode Buildfluence ·"}
      title={lang === "en" ? "Influence matrix: who really weighs in" : "Matrice d'influence : qui pèse vraiment"}
      footer={lang === "en" ? "Method applied to OCP case file ↓" : "Méthode appliquée sur le case file OCP ↓"}
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
          { x: 90, y: 40, t: lang === "en" ? "Resisters" : "Réfractaires" },
          { x: 230, y: 40, t: lang === "en" ? "Allies" : "Alliés" },
          { x: 90, y: 170, t: lang === "en" ? "Useful idiots" : "Idiots utiles" },
          { x: 230, y: 170, t: lang === "en" ? "Neutral" : "Neutres" },
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
          {lang === "en" ? "ALLY →" : "ALLIÉ →"}
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

type ThreatContent = Record<
  ThreatMode,
  {
    num: string;
    title: string;
    tag: string;
    tagColor: string;
    lead: string;
    bullets: string[];
  }
>;

const getThreatContent = (lang: "fr" | "en"): ThreatContent => lang === "en" ? {
  veille: {
    num: "01",
    title: "OSINT & Fact-Checking",
    tag: "● ACTIVE 24/7",
    tagColor: C.gold,
    lead:
      "In an environment saturated with competing narratives, knowing who is speaking, from where, and through which relays has become a decisive advantage.",
    bullets: [
      "AI-augmented multi-channel monitoring (press, social media, dark web)",
      "Identification and mapping of hostile sources",
      "Narrative polarization analysis",
      "Real-time fact-checking with full traceability",
      "Tracking of influencers and amplification relays",
      "Detection of weak signals preceding a crisis",
    ],
  },
  warroom: {
    num: "02",
    title: "Crisis Management",
    tag: "◈ WAR ROOM ACTIVE",
    tagColor: C.alert,
    lead:
      "A poorly managed crisis can destroy in 48 hours what took 20 years to build. We intervene to neutralize, regain the narrative, and protect institutional capital.",
    bullets: [
      "War Room activation in under 2 hours",
      "Real-time monitoring of media and social flows",
      "Targeted Digital Investigation & OSINT",
      "Continuous fact-checking and counter-narrative production",
      "Crisis communication strategy and spokesperson briefings",
      "Post-crisis reputational recovery",
    ],
  },
} : {
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
    num: "02",
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

const RadarFeedViz = ({ lang }: { lang: "fr" | "en" }) => {
  const isEn = lang === "en";
  const blips = [
    { cx: 135, cy: 55, d: "0.4s" },
    { cx: 60, cy: 130, d: "1.6s" },
    { cx: 155, cy: 125, d: "2.4s" },
    { cx: 75, cy: 65, d: "3.2s" },
  ];
  const signals = [
    { t: "14:32", s: isEn ? "Narrative spike on Dutch networks" : "Pic narratif sur réseaux NL", lvl: isEn ? "Low" : "Faible", bg: "rgba(201,168,76,.2)", c: C.gold, d: "0.3s" },
    { t: "11:08", s: isEn ? "Coordination detected across 3 sites" : "Coordination détectée 3 sites", lvl: isEn ? "Medium" : "Moyen", bg: "rgba(217,119,6,.2)", c: "#f59e0b", d: "0.7s" },
    { t: "09:14", s: isEn ? "Competing FR/EPO patent signal" : "Brevet concurrent FR/EPO", lvl: isEn ? "Low" : "Faible", bg: "rgba(201,168,76,.2)", c: C.gold, d: "1.1s" },
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
            {isEn ? "· Weak signals · Last 7 days" : "· Signaux faibles · 7 derniers jours"}
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

const CrisisCurveViz = ({ lang }: { lang: "fr" | "en" }) => {
  const isEn = lang === "en";
  const metrics = [
    { v: "<2h", l: "Activation" },
    { v: "24/7", l: "Monitoring" },
    { v: "48h", l: isEn ? "First response" : "Premier plan" },
    { v: isEn ? "2 wks" : "2 sem.", l: isEn ? "Crisis exit" : "Sortie crise" },
  ];
  return (
    <div>
      <div
        className="grid grid-cols-2 gap-3"
        style={{ border: `1px solid rgba(201,168,76,0.2)`, padding: 14, marginBottom: 18 }}
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
          <span>{isEn ? "· Disinformation vs counter-narrative curve" : "· Courbe désinformation vs contre-narratif"}</span>
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
            {isEn ? "D+3 PEAK" : "PIC J+3"}
          </text>
          <circle className="cc-marker" cx={270} cy={40} r={4} fill={C.gold} style={{ opacity: 0, animation: "fade-curve-el .45s ease-out 3.6s forwards" }} />
          <text className="cc-marker-label" x={220} y={32} style={{ fontFamily: FONT_MONO, fontSize: 8, fill: C.gold, letterSpacing: ".1em", opacity: 0, animation: "fade-curve-el .45s ease-out 3.8s forwards" }}>
            {isEn ? "NARRATIVE REGAINED" : "RÉCIT REPRIS"}
          </text>
        </svg>
        <div className="flex justify-center gap-[18px] uppercase" style={{ marginTop: 8, fontFamily: FONT_MONO, fontSize: 8.5, color: "rgba(245,241,232,.6)" }}>
          <span><span style={{ color: C.alert }}>—</span> {isEn ? "Disinformation" : "Désinformation"}</span>
          <span><span style={{ color: C.gold }}>—</span> {isEn ? "Counter-narrative" : "Contre-narratif"}</span>
        </div>
      </div>
    </div>
  );
};

const ThreatViz = ({ mode, lang }: { mode: ThreatMode; lang: "fr" | "en" }) => {
  const data = getThreatContent(lang)[mode];
  return (
    <>
      <ThreatPaneHeader
        num={data.num}
        title={data.title}
        tag={data.tag}
        tagColor={data.tagColor}
        lead={data.lead}
      />
      {mode === "veille" ? <RadarFeedViz lang={lang} /> : <CrisisCurveViz lang={lang} />}
    </>
  );
};

const ThreatSection = () => {
  const { lang } = useLanguage();
  const [mode, setMode] = useState<ThreatMode>("veille");
  const data = getThreatContent(lang)[mode];
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
      className="py-10"
      style={{ background: "#F0F4FB", border: "1px solid #D0DCF0" }}
    >
      <div className="px-6 md:px-10">
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
            {lang === "en" ? <>From continuous monitoring <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>to</em> crisis mode</> : <>De la veille continue{" "}<em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>au</em> mode crise</>}
          </h3>
          <p
            className="mt-3 text-lg italic"
            style={{ fontFamily: FONT_ITALIC, color: C.navyMid }}
          >
            {lang === "en"
              ? "A dual-mode cockpit: detect weak signals in real time, trigger the War Room when a crisis strikes."
              : "Un cockpit double mode : détecter les signaux faibles en temps réel, déclencher la War Room quand la crise frappe."}
          </p>
        </div>
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
            <ToggleBtn value="veille" label={lang === "en" ? "● MONITORING" : "● VEILLE"} />
            <ToggleBtn value="warroom" label="◈ WAR ROOM" />
          </div>
          <div
            className="italic text-sm hidden md:block"
            style={{ fontFamily: FONT_ITALIC, color: "rgba(245,241,232,0.7)" }}
          >
            {lang === "en" ? "Switch between continuous monitoring and crisis mode" : "Basculez entre mode continu et mode crise"}
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
              style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, minHeight: 360 }}
            >
              <ThreatViz mode={mode} lang={lang} />
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

const getLevels = (lang: "fr" | "en") => lang === "en" ? [
  {
    num: "01",
    label: "POC EXPRESS",
    title: "Rapid proof",
    tag: "Delivered in 1 week",
    bullets: [
      "Integration of your strategic stakes",
      "Decision-making maturity audit (initial diagnostic)",
      "1 use case modelled on real data",
      "Live operational demonstration",
    ],
    deliverable: "Feasibility report + functional demo",
  },
  {
    num: "02",
    label: "PILOT",
    title: "Actionable model",
    tag: "Delivered in 3-4 weeks",
    bullets: [
      "Predictive analytics models on client data",
      "Weak-signal detection platforms (live POC)",
      "Real-time image and reputation barometers",
      "Interactive decision-making dashboards",
      "Strategic Business Review with recommendations",
    ],
    deliverable: "Functional cockpit + industrialisation roadmap",
  },
  {
    num: "03",
    label: "INFRASTRUCTURE",
    title: "Full deployment",
    tag: "6-12 weeks",
    bullets: [
      "Permanent decision-making infrastructure",
      "Integration into your existing systems",
      "Training and skills transfer",
      "Monitoring, maintenance and evolution",
      "Long-term strategic support",
    ],
    deliverable: "Operational system + dedicated team",
  },
] : [
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
  const { lang } = useLanguage();
  const LEVELS = getLevels(lang);
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
          {lang === "en" ? "03 · Modeling & POCs" : "03 · Modélisations & POCs"}
        </div>
        <h3
          id="modelisations-pocs"
          className="text-3xl md:text-4xl scroll-mt-24"
          style={{ fontFamily: FONT_DISPLAY, color: C.navy, lineHeight: 1.15 }}
        >
          {lang === "en" ? <>Three levels.{" "}<em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>One single logic:</em>{" "}prove value before deploying.</> : <>Trois niveaux.{" "}<em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>Une seule logique :</em>{" "}prouver la valeur avant de déployer.</>}
        </h3>
        <p
          className="mt-3 text-lg italic"
          style={{ fontFamily: FONT_ITALIC, color: C.navyMid }}
        >
          {lang === "en"
            ? "From rapid POC to a complete decision-making infrastructure, each level produces a measurable deliverable."
            : "Du POC express à l'infrastructure décisionnelle complète, chaque niveau rend un livrable mesurable."}
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
                {lang === "en" ? "Deliverable" : "Livrable"}
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
          {lang === "en" ? "« A Buildfluence POC is proof through action. Zero theory, one hundred percent operational. »" : "« Un POC Buildfluence, c'est la preuve par l'action. Zéro théorie, cent pour cent opérationnel. »"}
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
          {lang === "en" ? "— Buildfluence Method" : "— Méthode Buildfluence"}
        </div>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════
   CASE FILES CLIENTS — refonte FR
   ═══════════════════════════════════════════════════════ */

const NAVY2 = "#103E8C";
const NAVY3 = "#1a2d4a";
const TERRACOTTA = "#b85a3a";
const TERRACOTTA_STROKE = "#8a3f25";
const OLIVE = "#7a8a3d";
const OLIVE_STROKE = "#5d6b2a";
const FOREST = "#5d7838";
const MUTED = "#6f6a60";

const CaseFileSection = ({ children }: { children: React.ReactNode }) => (
  <section
    style={{
      background: `linear-gradient(180deg, ${C.paper} 0%, #fdf9ef 100%)`,
      padding: "80px 0",
      borderBottom: `1px solid ${C.rule}`,
    }}
  >
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px" }}>{children}</div>
  </section>
);

const CaseFileHeader = ({ number, title, emphasis }: { number: string; title: string; emphasis: string }) => {
  const parts = title.split(emphasis);
  return (
    <header className="flex flex-wrap items-baseline gap-8 mb-12">
      <div
        className="uppercase"
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          color: C.goldDim,
          letterSpacing: ".25em",
          border: `1px solid ${C.gold}`,
          padding: "6px 12px",
        }}
      >
        {number}
      </div>
      <h2
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 700,
          color: C.navy,
          lineHeight: 1.1,
          letterSpacing: 0,
          margin: 0,
        }}
      >
        {parts[0]}
        <em style={{ color: C.gold, fontWeight: 400 }}>{emphasis}</em>
        {parts[1]}
      </h2>
    </header>
  );
};

const CaseIntro = ({
  kicker,
  title,
  emphasis,
  body,
  quote,
  meta,
}: {
  kicker: string;
  title: string;
  emphasis: string;
  body: React.ReactNode;
  quote: string;
  meta: string;
}) => {
  const titleParts = title.split(emphasis);
  return (
    <div className="case-intro-grid">
      <div className="case-plate">
        <div
          style={{
            position: "absolute",
            bottom: 12,
            right: 18,
            fontFamily: FONT_MONO,
            fontSize: 9,
            color: C.gold,
            opacity: 0.7,
            letterSpacing: ".3em",
          }}
        >
          CONFIDENTIAL FILE
        </div>
        <div
          className="uppercase"
          style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.gold, letterSpacing: ".3em", marginBottom: 16 }}
        >
          {kicker}
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
          {titleParts[0]}
          <em style={{ color: C.gold, fontWeight: 400 }}>{emphasis}</em>
          {titleParts[1]}
        </h3>
        <p
          className="italic"
          style={{ fontFamily: FONT_ITALIC, fontSize: 17, lineHeight: 1.6, color: "rgba(245,241,232,.85)", margin: 0 }}
        >
          {body}
        </p>
      </div>
      <div className="case-quote-wrap">
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 52, color: C.gold, lineHeight: 0, position: "relative", top: 28 }}>
          “
        </div>
        <blockquote
          className="italic"
          style={{
            fontFamily: FONT_ITALIC,
            fontSize: 22,
            lineHeight: 1.45,
            color: C.navy,
            borderLeft: `2px solid ${C.gold}`,
            padding: "10px 0 10px 26px",
            margin: "0 0 24px",
          }}
        >
          {quote}
        </blockquote>
        <div
          className="uppercase"
          style={{ fontFamily: FONT_MONO, fontSize: 11, color: MUTED, letterSpacing: ".2em" }}
        >
          {meta}
        </div>
      </div>
    </div>
  );
};

const CaseStats = ({ stats }: { stats: { value: React.ReactNode; label: string }[] }) => (
  <div className="case-stats-grid">
    {stats.map((stat, index) => (
      <div key={stat.label} className="case-stat" style={{ borderRight: index < stats.length - 1 ? `1px solid ${C.rule}` : "none" }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 40, color: C.navy, lineHeight: 1, letterSpacing: "-.02em" }}>
          {stat.value}
        </div>
        <div
          className="uppercase"
          style={{ fontFamily: FONT_MONO, fontSize: 10, color: MUTED, letterSpacing: ".2em", marginTop: 8 }}
        >
          {stat.label}
        </div>
      </div>
    ))}
  </div>
);

const Unit = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 20, color: C.gold, verticalAlign: "super", marginLeft: 3 }}>{children}</span>
);

const CommandTree = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isEn = lang === "en";
  const nodes = [
    { id: "f1", level: "facade", x: 95, y: 50, w: 130, h: 50, name: "CNSSO", sub: isEn ? "Norwegian committee" : "Comité norvégien", fill: OLIVE, stroke: OLIVE_STROKE, d: 0 },
    { id: "f2", level: "facade", x: 270, y: 50, w: 130, h: 50, name: "WSRW", sub: "Resource Watch", fill: OLIVE, stroke: OLIVE_STROKE, d: 120 },
    { id: "f3", level: "facade", x: 445, y: 50, w: 130, h: 50, name: "SWS", sub: "Solidarity W. Sahara", fill: OLIVE, stroke: OLIVE_STROKE, d: 240 },
    { id: "f4", level: "facade", x: 615, y: 50, w: 130, h: 50, name: "AWSA", sub: "Australia W.S. Assoc.", fill: OLIVE, stroke: OLIVE_STROKE, d: 360 },
    { id: "s1", level: "sponsor", x: 95, y: 170, w: 130, h: 50, name: isEn ? "Norwegian MFA" : "MFA Norvégien", sub: isEn ? "State sponsor" : "Sponsor étatique", fill: NAVY2, stroke: "#0a2862", d: 700 },
    { id: "s2", level: "sponsor", x: 200, y: 170, w: 130, h: 50, name: "Industri Energi", sub: isEn ? "Sector union" : "Syndicat sectoriel", fill: NAVY2, stroke: "#0a2862", d: 800 },
    { id: "s3", level: "sponsor", x: 340, y: 170, w: 130, h: 50, name: "SAIH", sub: isEn ? "Student fund" : "Fonds étudiant", fill: NAVY2, stroke: "#0a2862", d: 900 },
    { id: "s4", level: "sponsor", x: 470, y: 170, w: 130, h: 50, name: "Sahara Update", sub: isEn ? "Information hub" : "Centre information", fill: NAVY2, stroke: "#0a2862", d: 1000 },
    { id: "s5", level: "sponsor", x: 615, y: 170, w: 130, h: 50, name: isEn ? "AU Trade Unions" : "Union Syndicats AU", sub: isEn ? "Relay coalition" : "Coalition relais", fill: NAVY2, stroke: "#0a2862", d: 1100 },
    { id: "i1", level: "person", x: 150, y: 290, w: 130, h: 50, name: "Erik Hagen", sub: isEn ? "Coordinator" : "Coordinateur", fill: TERRACOTTA, stroke: TERRACOTTA_STROKE, d: 1300 },
    { id: "i2", level: "person", x: 270, y: 290, w: 130, h: 50, name: "Sara Eykmans", sub: isEn ? "WSRW President" : "Présidente WSRW", fill: TERRACOTTA, stroke: TERRACOTTA_STROKE, d: 1400 },
    { id: "i3", level: "person", x: 410, y: 290, w: 130, h: 50, name: "Cate Lewis", sub: isEn ? "SWS leadership" : "Direction SWS", fill: TERRACOTTA, stroke: TERRACOTTA_STROKE, d: 1500 },
    { id: "i4", level: "person", x: 560, y: 290, w: 130, h: 50, name: "Lyn Allison", sub: isEn ? "AWSA President" : "Présidente AWSA", fill: TERRACOTTA, stroke: TERRACOTTA_STROKE, d: 1600 },
  ];
  const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const links = [
    ["f1", "s1"], ["f2", "s2"], ["f2", "s3"], ["f3", "s3"], ["f3", "s4"], ["f4", "s5"],
    ["f1", "i1"], ["s4", "i1"], ["f2", "i2"], ["f3", "i3"], ["f4", "i4"],
  ];

  const collectChain = (id: string) => {
    const chain = new Set([id]);
    let changed = true;
    while (changed) {
      changed = false;
      links.forEach(([from, to]) => {
        if (chain.has(from) && !chain.has(to)) {
          chain.add(to);
          changed = true;
        }
        if (chain.has(to) && !chain.has(from)) {
          chain.add(from);
          changed = true;
        }
      });
    }
    return chain;
  };

  const chain = hovered ? collectChain(hovered) : null;
  const path = (from: string, to: string) => {
    const a = nodeMap[from];
    const b = nodeMap[to];
    const x1 = a.x + a.w / 2;
    const y1 = a.y + a.h;
    const x2 = b.x + b.w / 2;
    const y2 = b.y;
    const mid = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
  };

  return (
    <div className="case-block command-tree" ref={ref}>
      <style>{`
        .command-tree .tree-node,.command-tree .tree-link{opacity:0;transition:opacity .5s ease,stroke .2s ease,stroke-width .2s ease}.command-tree.in-view .tree-node{opacity:1}.command-tree.in-view .tree-link{opacity:.5}.command-tree.in-view .tree-link{transition-delay:600ms}.command-tree .tree-node.highlight rect{stroke:${C.gold};stroke-width:2px}.command-tree .tree-node.dim{opacity:.18!important}.command-tree .tree-link.highlight{stroke:${C.gold};stroke-width:2px;opacity:1!important}.command-tree .tree-link.dim{opacity:.12!important}@media(max-width:640px){.tree-scroll{overflow-x:auto}}
      `}</style>
      <BlockHeader kicker={lang === "en" ? "A · DECODING" : "A · DÉCRYPTAGE"} title={lang === "en" ? <>The sponsor tree.<br />Front NGOs, funders and relays.</> : <>L'arbre des commanditaires.<br />ONG façades, financeurs et relais.</>} hint={lang === "en" ? "Hover over a front organization to reveal its chain" : "Survolez une façade pour révéler sa chaîne"} />
      <div className="tree-scroll">
        <svg className="command-tree" viewBox="0 0 760 380" width="100%" height="380" style={{ minWidth: 760 }}>
          {links.map(([from, to], index) => {
            const active = chain?.has(from) && chain?.has(to);
            const dim = chain && !active;
            return <path key={`${from}-${to}`} className={`tree-link ${active ? "highlight" : ""} ${dim ? "dim" : ""}`} d={path(from, to)} stroke={C.rule} strokeWidth={1.5} fill="none" />;
          })}
          {nodes.map((node) => {
            const active = chain?.has(node.id);
            const dim = chain && !active;
            return (
              <g
                key={node.id}
                className={`tree-node ${active ? "highlight" : ""} ${dim ? "dim" : ""}`}
                style={{ transitionDelay: `${node.d}ms` }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={2} fill={node.fill} stroke={node.stroke} />
                <text x={node.x + node.w / 2} y={node.y + 22} textAnchor="middle" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11.5, fontWeight: 500, fill: "#fff" }}>{node.name}</text>
                <text x={node.x + node.w / 2} y={node.y + 37} textAnchor="middle" style={{ fontFamily: FONT_MONO, fontSize: 8.5, fill: "rgba(255,255,255,.65)", letterSpacing: ".12em" }}>{node.sub}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="case-legend">
        <LegendItem color={OLIVE} label={lang === "en" ? "Visible front NGO" : "ONG façade visible"} />
        <LegendItem color={NAVY2} label={lang === "en" ? "Sponsor / funder" : "Sponsor / financeur"} />
        <LegendItem color={TERRACOTTA} label={lang === "en" ? "Identified individual relay" : "Relais individuel identifié"} />
      </div>
    </div>
  );
};

const BlockHeader = ({ kicker, title, hint }: { kicker: string; title: React.ReactNode; hint?: string }) => (
  <div style={{ marginBottom: 22 }}>
    <div className="uppercase" style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.gold, letterSpacing: ".3em", marginBottom: 8 }}>
      {kicker}
    </div>
    <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 700, color: C.navy, lineHeight: 1.2, margin: 0 }}>{title}</h3>
    {hint && <p className="italic" style={{ fontFamily: FONT_ITALIC, fontSize: 14, color: MUTED, marginTop: 8 }}>{hint}</p>}
  </div>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <span style={{ width: 14, height: 14, background: color, display: "inline-block" }} />
    <span>{label}</span>
  </div>
);

const ChessboardsBlock = () => {
  const { lang } = useLanguage();
  const cards = [
    {
      key: "geo",
      color: NAVY2,
      num: "01 · ÉCHIQUIER GÉOPOLITIQUE",
      title: "Les jeux d'États",
      tag: "Souverainetés, alliances, dépendances",
      bullets: ["Fonds souverains anonymisés sponsors discrets", "Ministères des Affaires Étrangères de pays tiers", "Agences internationales (énergétiques, sanitaires)", "Organisations supranationales"],
      reading: "Qui parle au nom de qui ? Quels intérêts d'État se cachent derrière le narratif officiel ?",
    },
    {
      key: "eco",
      color: "#9a4f2c",
      num: "02 · ÉCHIQUIER ÉCONOMIQUE",
      title: "Les rivalités industrielles",
      tag: "Concurrents, fédérations, lobbies",
      bullets: ["Concurrents directs sur les marchés clés", "Fédérations professionnelles tierces", "Groupes industriels aux intérêts contraires", "Syndicats sectoriels d'autres pays"],
      reading: "Qui finance le bruit ? Quel concurrent profite directement de la déstabilisation ?",
    },
    {
      key: "soc",
      color: FOREST,
      num: "03 · ÉCHIQUIER SOCIÉTAL",
      title: "Les relais d'opinion",
      tag: "ONG, militants, instituts, médias",
      bullets: ["ONG façades à vocation militante", "Centres d'études partisans", "Personnalités relais (chercheurs, journalistes)", "Coalitions associatives transnationales"],
      reading: "Qui amplifie ? Quels visages 'indépendants' portent en réalité un agenda commandé ?",
    },
  ];
  return (
    <div style={{ marginTop: 48 }}>
      <BlockHeader kicker={lang === "en" ? "B · METHODOLOGY" : "B · MÉTHODE"} title={<>L'analyse par échiquiers.<br />Trois lectures qui se croisent.</>} />
      <div style={{ background: "rgba(16,62,140,0.04)", borderLeft: `4px solid ${NAVY2}`, padding: "22px 28px", borderRadius: 2, marginBottom: 28, maxWidth: 980 }}>
        <p className="italic" style={{ fontFamily: FONT_ITALIC, fontSize: 17, lineHeight: 1.55, color: NAVY3, margin: 0 }}>
          Là où la plupart des cabinets traitent une dimension à la fois, <strong style={{ color: C.navy, fontFamily: "DM Sans, sans-serif", fontStyle: "normal", fontWeight: 600 }}>Buildfluence croise systématiquement les trois échiquiers</strong> — géopolitique, économique et sociétal — pour révéler la mécanique réelle d'une attaque informationnelle. C'est ce mix tridimensionnel qui distingue notre méthode.
        </p>
      </div>
      <div className="chess-grid">
        {cards.map((card) => (
          <article key={card.key} className="chess-card" style={{ borderTop: `4px solid ${card.color}` }}>
            <div className="flex items-center gap-2 uppercase" style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.goldDim, letterSpacing: ".25em" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: card.color, display: "inline-block", flex: "0 0 auto" }} />
              {card.num}
            </div>
            <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, color: C.navy, margin: "16px 0 2px" }}>{card.title}</h4>
            <div className="italic" style={{ fontFamily: FONT_ITALIC, fontSize: 14, color: C.goldDim, marginBottom: 14 }}>{card.tag}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {card.bullets.map((bullet, index) => (
                <li key={bullet} style={{ fontSize: 13, lineHeight: 1.5, color: NAVY3, padding: "7px 0 7px 16px", borderBottom: index < card.bullets.length - 1 ? `1px dashed ${C.rule}` : "none", position: "relative" }}>
                  <span style={{ color: C.gold, position: "absolute", left: 0 }}>›</span>{bullet}
                </li>
              ))}
            </ul>
            <div style={{ borderTop: `1px solid ${C.rule}`, marginTop: 18, paddingTop: 14 }}>
              <div className="uppercase" style={{ fontFamily: FONT_MONO, fontSize: 10, color: MUTED, letterSpacing: ".15em", marginBottom: 5 }}>LECTURE</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 500, color: C.navy, lineHeight: 1.4 }}>{card.reading}</div>
            </div>
          </article>
        ))}
      </div>
      <div style={{ marginTop: 28, background: C.navy, color: C.ivory, padding: "24px 30px", borderLeft: `4px solid ${C.gold}`, textAlign: "center" }}>
        <p className="italic" style={{ fontFamily: FONT_ITALIC, fontSize: 18, lineHeight: 1.55, color: C.goldHover, margin: 0 }}>
          La force Buildfluence : <strong style={{ color: C.ivory, fontFamily: "DM Sans, sans-serif", fontStyle: "normal", fontWeight: 500 }}>ne pas regarder un échiquier après l'autre, mais les trois en simultané.</strong> C'est dans les zones de chevauchement que la mécanique hostile devient lisible.
        </p>
      </div>
    </div>
  );
};

const StakeholderMatrix = () => {
  const { lang } = useLanguage();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState("all");
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; node: MatrixNode | null }>({ visible: false, x: 0, y: 0, node: null });
  const PAD = 60;
  const W = 800;
  const H = 520;
  const nodes: MatrixNode[] = [
    { name: "WSRW", cat: "ngo", type: "ONG façade", role: "Coordinateur central des campagnes hostiles", x: -0.55, y: 0.78 },
    { name: "CNSSO", cat: "ngo", type: "ONG façade", role: "Comité norvégien, relais institutionnel", x: -0.85, y: 0.55 },
    { name: "SWS", cat: "ngo", type: "ONG façade", role: "Lobbying d'influence en Europe", x: -0.35, y: 0.55 },
    { name: "AWSA", cat: "ngo", type: "ONG façade", role: "Antenne australienne militante", x: -0.7, y: 0.32 },
    { name: "MFA Norvège*", cat: "state", type: "Ministère des Affaires Étrangères", role: "Financement indirect des ONG via fonds étudiants", x: -0.35, y: 0.18 },
    { name: "Algérie", cat: "state", type: "Soutien financier", role: "Soutien financier structurant aux ONG hostiles", x: -0.55, y: 0.05 },
    { name: "Maroc", cat: "state", type: "État allié", role: "Soutien institutionnel direct à OCP", x: 0.85, y: 0.5 },
    { name: "ONHYM", cat: "state", type: "Agence souveraine", role: "Partenaire industriel marocain", x: 0.7, y: 0.2 },
    { name: "Industri Energi", cat: "corp", type: "Syndicat industriel", role: "Sponsor sectoriel des campagnes", x: -0.18, y: 0.42 },
    { name: "BASF Belgique", cat: "corp", type: "Concurrent indirect", role: "Présence ambivalente, observateur", x: -0.25, y: -0.2 },
    { name: "Yara", cat: "corp", type: "Acteur fertilisants", role: "Concurrent neutralisé sur certains marchés", x: -0.15, y: -0.1 },
    { name: "Erik Hagen", cat: "leader", type: "Activiste norvégien", role: "Visage public des campagnes anti-OCP", x: -0.92, y: 0.88 },
    { name: "Sara Eykmans", cat: "leader", type: "Présidente WSRW", role: "Coordination des actions médiatiques", x: -0.2, y: 0.88 },
    { name: "Jeremy Grantham", cat: "leader", type: "Investisseur", role: "Relais financier, position critique", x: -0.05, y: 0.6 },
    { name: "Steven Van Kauwenberg", cat: "leader", type: "Analyste IFDC", role: "Position experte, discours équilibré", x: 0.2, y: -0.3 },
  ];
  const catStyles: Record<string, { fill: string; stroke: string; text: string }> = {
    ngo: { fill: TERRACOTTA, stroke: TERRACOTTA_STROKE, text: "#fff" },
    state: { fill: NAVY2, stroke: "#0a2862", text: "#fff" },
    corp: { fill: FOREST, stroke: FOREST, text: "#fff" },
    leader: { fill: C.gold, stroke: C.goldDim, text: C.navy },
  };
  const filters = [
    { cat: "all", label: "Toutes" },
    { cat: "ngo", label: "ONG", color: TERRACOTTA },
    { cat: "state", label: "États", color: NAVY2 },
    { cat: "corp", label: "Entreprises", color: FOREST },
    { cat: "leader", label: "Leaders d'opinion", color: C.gold },
  ];
  const sx = (x: number) => PAD + ((x + 1) / 2) * (W - PAD * 2);
  const sy = (y: number) => PAD + ((1 - y) / 2) * (H - PAD * 2);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        wrap.querySelectorAll<SVGGElement>(".mn").forEach((element, index) => {
          setTimeout(() => {
            element.style.opacity = "";
          }, index * 60);
        });
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  const showTooltip = (event: React.MouseEvent<SVGGElement>, node: MatrixNode) => {
    const box = event.currentTarget.getBoundingClientRect();
    const wrapBox = (event.currentTarget.ownerSVGElement?.parentElement as HTMLElement | null)?.getBoundingClientRect();
    if (!wrapBox) return;

    const TOOLTIP_W = 280;
    const TOOLTIP_H = 118;
    const OFFSET = 14;

    // Horizontal: next to node (right by default, flip left if overflow)
    let x = box.right - wrapBox.left + OFFSET;
    if (x + TOOLTIP_W > wrapBox.width - 10) {
      x = box.left - wrapBox.left - TOOLTIP_W - OFFSET;
    }
    if (x < 10) x = 10;
    if (x + TOOLTIP_W > wrapBox.width - 10) x = wrapBox.width - TOOLTIP_W - 10;

    // Vertical: centered on node, but stay near node if it would overflow
    const nodeTop = box.top - wrapBox.top;
    const nodeBottom = box.bottom - wrapBox.top;
    let y = nodeTop + (box.height / 2) - (TOOLTIP_H / 2);

    if (y + TOOLTIP_H > wrapBox.height - 10) {
      // Place tooltip above the node
      y = nodeTop - TOOLTIP_H - OFFSET;
    }
    if (y < 10) {
      // Place tooltip below the node
      y = nodeBottom + OFFSET;
    }
    if (y + TOOLTIP_H > wrapBox.height - 10) y = wrapBox.height - TOOLTIP_H - 10;
    if (y < 10) y = 10;

    setTooltip({ visible: true, x, y, node });
  };

  return (
    <div className="case-block matrix-block" ref={wrapRef}>
      <style>{`
        .mn{opacity:1;transition:opacity .35s ease,filter .15s ease}.mn.dim{opacity:.12!important}.mn:hover{filter:drop-shadow(0 8px 12px rgba(13,27,42,.25))}.matrix-tooltip{opacity:0;transform:translateY(4px);transition:.15s;pointer-events:none}.matrix-tooltip.visible{opacity:1;transform:translateY(0)}
      `}</style>
      <BlockHeader kicker={lang === "en" ? "C · MAPPING" : "C · CARTOGRAPHIE"} title={<>La matrice dynamique des parties prenantes.<br />Qui pèse, qui amplifie, qui s'efface.</>} />
      <div className="matrix-toolbar">
        <div className="flex flex-wrap gap-[6px]">
          {filters.map((item) => (
            <button key={item.cat} className={`matrix-filter ${filter === item.cat ? "active" : ""}`} onClick={() => setFilter(item.cat)}>
              {item.color && <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, display: "inline-block", marginRight: 7 }} />}
              {item.label}
            </button>
          ))}
        </div>
        <div className="italic" style={{ fontFamily: FONT_ITALIC, fontSize: 13, color: MUTED }}>Cliquez sur un nœud pour le détail</div>
      </div>
      <div className="matrix-canvas">
        <svg width="100%" height="520" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet">
          {[-0.5, 0.5].map((v) => (
            <g key={v}>
              <line x1={sx(v)} y1={PAD} x2={sx(v)} y2={H - PAD} stroke={C.rule} strokeDasharray="3 3" opacity={0.5} />
              <line x1={PAD} y1={sy(v)} x2={W - PAD} y2={sy(v)} stroke={C.rule} strokeDasharray="3 3" opacity={0.5} />
            </g>
          ))}
          <line x1={sx(0)} y1={PAD} x2={sx(0)} y2={H - PAD} stroke={MUTED} opacity={0.5} />
          <line x1={PAD} y1={sy(0)} x2={W - PAD} y2={sy(0)} stroke={MUTED} opacity={0.5} />
          <text x={W / 2} y={30} textAnchor="middle" style={{ fontFamily: FONT_MONO, fontSize: 10, fill: C.goldDim, letterSpacing: ".2em" }}>↑ ACTIVISME</text>
          <text x={W / 2} y={500} textAnchor="middle" style={{ fontFamily: FONT_MONO, fontSize: 10, fill: C.goldDim, letterSpacing: ".2em" }}>PASSIVITÉ ↓</text>
          <text x={20} y={H / 2 + 4} style={{ fontFamily: FONT_MONO, fontSize: 10, fill: C.goldDim, letterSpacing: ".2em" }}>← HOSTILE</text>
          <text x={780} y={H / 2 + 4} textAnchor="end" style={{ fontFamily: FONT_MONO, fontSize: 10, fill: C.goldDim, letterSpacing: ".2em" }}>SOUTIEN OCP →</text>
          {[
            { x: 220, y: 50, t: "Réfractaires" }, { x: 580, y: 50, t: "Alliés" }, { x: 220, y: 400, t: "Idiots utiles" }, { x: 580, y: 400, t: "Neutres" },
          ].map((q) => <text key={q.t} x={q.x} y={q.y} textAnchor="middle" style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 14, fill: MUTED, opacity: 0.5 }}>{q.t}</text>)}
          {nodes.map((node) => {
            const style = catStyles[node.cat];
            const width = Math.max(46, node.name.length * 6.4 + 18);
            const dim = filter !== "all" && filter !== node.cat;
            return (
              <g key={node.name} className={`mn ${dim ? "dim" : ""}`} style={{ opacity: 0, cursor: "pointer" }} transform={`translate(${sx(node.x)} ${sy(node.y)})`} onMouseEnter={(event) => showTooltip(event, node)} onMouseLeave={() => setTooltip((current) => ({ ...current, visible: false }))}>
                <rect x={-width / 2} y={-13} width={width} height={26} rx={2} fill={style.fill} stroke={style.stroke} />
                <text y={4} textAnchor="middle" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10.5, fontWeight: 500, fill: style.text }}>{node.name}</text>
              </g>
            );
          })}
        </svg>
        <div className={`matrix-tooltip ${tooltip.visible ? "visible" : ""}`} style={{ position: "absolute", zIndex: 50, left: tooltip.x, top: tooltip.y, background: C.navy, color: C.ivory, padding: "14px 16px", minWidth: 220, maxWidth: 280, borderLeft: `3px solid ${C.gold}`, boxShadow: "0 18px 38px -10px rgba(13,27,42,.4)" }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: C.gold, marginBottom: 3 }}>{tooltip.node?.name}</div>
          <div className="uppercase" style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: ".2em", color: "rgba(245,241,232,.6)", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid rgba(245,241,232,.12)" }}>{tooltip.node?.type}</div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, lineHeight: 1.4, color: "rgba(245,241,232,.85)" }}>{tooltip.node?.role}</div>
        </div>
      </div>
      <div className="italic" style={{ marginTop: 16, fontFamily: FONT_ITALIC, fontSize: 9, color: MUTED, letterSpacing: ".05em", textAlign: "center" }}>
        * MFA = Ministry of Foreign Affairs (Ministère des Affaires Étrangères)
      </div>
    </div>
  );
};

type MatrixNode = { name: string; cat: "ngo" | "state" | "corp" | "leader"; type: string; role: string; x: number; y: number };

type TimelineBadge = { label: string; tone?: "default" | "success" | "alert" };
type TimelineNode = { date: string; title: string; tooltipTitle: string; bullets: string[]; badges: TimelineBadge[] };

const MissionTimeline = ({ title, items }: { title: string; items: TimelineNode[] }) => {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const badgeStyle = (tone: TimelineBadge["tone"]) => {
    if (tone === "success") return { background: C.gold, color: "#fff" };
    if (tone === "alert") return { background: "#E06D4F", color: "#fff" };
    return { background: C.navy, color: "#fff" };
  };

  return (
    <div className="mt-timeline-wrap" ref={wrapRef} style={{ marginTop: 48, padding: "28px 0 0" }}>
      <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: C.navy, letterSpacing: "-.01em", marginBottom: 40 }}>{title}</h3>
      <div className="mt-timeline" style={{ position: "relative" }}>
        <div className="mt-line" style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: C.gold }} />
        <div className="mt-nodes" style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 120 }}>
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <div key={i} className="mt-node-col" style={{ position: "relative", flex: "1 1 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="mt-above" style={{ position: "absolute", bottom: "calc(50% + 18px)", textAlign: "center", fontFamily: FONT_MONO, fontSize: 11, color: C.gold, letterSpacing: ".18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{item.date}</div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setActive(isActive ? null : i); }}
                  aria-expanded={isActive}
                  className="mt-node"
                  style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: isActive ? C.gold : C.navy,
                    border: `2px solid ${C.gold}`,
                    cursor: "pointer", padding: 0, position: "relative", zIndex: 2,
                    transition: "all .2s ease",
                  }}
                />
                <div className="mt-below" style={{ position: "absolute", top: "calc(50% + 18px)", textAlign: "center", fontFamily: FONT_DISPLAY, fontSize: 15, color: C.navy, lineHeight: 1.3, padding: "0 6px" }}>{item.title}</div>

                {isActive && (
                  <div
                    className="mt-tooltip"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      bottom: "calc(50% + 60px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 320,
                      maxWidth: "90vw",
                      background: "#fff",
                      border: `1px solid ${C.rule}`,
                      borderRadius: 2,
                      padding: 20,
                      boxShadow: "0 18px 40px -18px rgba(13,27,42,.25)",
                      zIndex: 10,
                      textAlign: "left",
                    }}
                  >
                    <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 10px" }}>{item.tooltipTitle}</h4>
                    <ul style={{ margin: "0 0 12px", paddingLeft: 18, listStyle: "disc" }}>
                      {item.bullets.map((b, k) => (
                        <li key={k} style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, lineHeight: 1.55, color: "#1a1410", marginBottom: 4 }}>{b}</li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {item.badges.map((b, k) => (
                        <span key={k} style={{ ...badgeStyle(b.tone), fontFamily: FONT_MONO, fontSize: 9, letterSpacing: ".15em", textTransform: "uppercase", padding: "4px 8px", borderRadius: 2 }}>{b.label}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media(max-width:760px){
          .mt-timeline .mt-line{display:none}
          .mt-timeline .mt-nodes{flex-direction:column;align-items:flex-start;gap:48px}
          .mt-timeline .mt-node-col{flex-direction:row;align-items:flex-start;gap:14px;width:100%}
          .mt-timeline .mt-above{position:static;text-align:left;margin-bottom:6px;display:block}
          .mt-timeline .mt-below{position:static;text-align:left;padding:0;margin-top:4px}
          .mt-timeline .mt-node-col > div:first-child{order:0}
          .mt-timeline .mt-node{margin-top:6px;flex-shrink:0}
          .mt-timeline .mt-tooltip{position:static;transform:none;width:100%;margin-top:10px}
        }
      `}</style>
    </div>
  );
};

const OcpCaseFile = () => {
  const { lang } = useLanguage();
  return (
  <CaseFileSection>
    <CaseFileStyles />
    <CaseFileHeader number="CASE FILE · 01" title={lang === "en" ? "OCP Group Mission: countering hostile campaigns." : "Mission OCP Group : contrer les campagnes hostiles."} emphasis={lang === "en" ? "countering" : "contrer"} />
    <CaseIntro
      kicker={lang === "en" ? "Mission · Adversarial mapping" : "Mission · Cartographie adverse"}
      title={lang === "en" ? "Strategic industrial group, targeted by international nuisance campaigns." : "Groupe industriel stratégique, ciblé par des campagnes de nuisance internationales."}
      emphasis={lang === "en" ? "nuisance campaigns" : "campagnes de nuisance"}
      body={lang === "en" ? <>Media and social agitation orchestrated by Northern European NGOs. The client needs to understand the <strong>amplification chains & useful idiots</strong>, and to neutralise the adversarial narrative before it reaches its key markets.</> : <>Agitation médiatique et sociale orchestrée par des ONG d'Europe du Nord. Le client a besoin de comprendre les <strong>chaînes d'amplification & idiots utiles</strong>, et de neutraliser le récit adverse avant qu'il n'atteigne ses marchés clés.</>}
      quote={lang === "en" ? "The attack was invisible to traditional intelligence. It was in the mapping of relays that we saw the mechanics." : "L'attaque était invisible pour les veilles classiques. C'est dans la cartographie des relais qu'on a vu la mécanique."}
      meta={lang === "en" ? "Analyst note · OCP mission" : "Analyst note · OCP mission"}
    />
    <CaseStats stats={[{ value: "3", label: lang === "en" ? "Analytical chessboards" : "Échiquiers d'analyse" }, { value: "47", label: lang === "en" ? "Stakeholders mapped" : "Parties prenantes mappées" }, { value: "12", label: lang === "en" ? "Source NGOs identified" : "ONG sources identifiées" }, { value: "1", label: lang === "en" ? "President's dashboard" : "Tableau de bord Président" }]} />
    <CommandTree />
    <ChessboardsBlock />
    <StakeholderMatrix />
    <MissionTimeline
      title={lang === "en" ? "Mission Roadmap" : "Déroulé de la mission"}
      items={lang === "en" ? [
        { date: "WEEK 1", title: "Chessboard analysis", tooltipTitle: "Chessboard analysis", bullets: ["Decoding the 3 levels: geopolitical, competitive and societal", "Identification of actors and their cross-cutting interests"], badges: [{ label: "Mapping phase" }] },
        { date: "WEEKS 2-3", title: "Dynamic stakeholder matrix", tooltipTitle: "Dynamic stakeholder matrix", bullets: ["Identification of 12 Northern European NGOs as primary sources", "Identification of their useful idiots in francophone media", "Delivery to the President's office"], badges: [{ label: "Pressure" }, { label: "Hostile", tone: "alert" }, { label: "Dealer" }] },
        { date: "WEEK 4", title: "Decision-making dashboard", tooltipTitle: "Decision-making dashboard", bullets: ["Awareness actions with clients and partners", "Counter-influence activated"], badges: [{ label: "Mission accomplished", tone: "success" }] },
      ] : [
        { date: "SEMAINE 1", title: "Analyse par échiquier", tooltipTitle: "Analyse par échiquier", bullets: ["Décodage des 3 niveaux : géopolitique, concurrentiel et sociétal", "Identification des acteurs et de leurs intérêts croisés"], badges: [{ label: "Cartographie phase" }] },
        { date: "SEMAINE 2-3", title: "Matrice dynamique des Stakeholders", tooltipTitle: "Matrice dynamique des parties prenantes", bullets: ["Identification de 12 ONG d'Europe du Nord comme sources primaires", "Identification de leurs idiots utiles dans les médias francophones", "Livraison au cabinet du Président"], badges: [{ label: "Pression" }, { label: "Hostile", tone: "alert" }, { label: "Dealer" }] },
        { date: "SEMAINE 4", title: "Tableau de bord décisionnel", tooltipTitle: "Tableau de bord décisionnel", bullets: ["Actions de sensibilisation auprès des clients et partenaires", "Contre-influence activée"], badges: [{ label: "Mission accomplie", tone: "success" }] },
      ]}
    />
  </CaseFileSection>
  );
};

const HealthCaseFile = () => {
  const { lang } = useLanguage();
  return (
  <CaseFileSection>
    <CaseFileStyles />
    <CaseFileHeader number="CASE FILE · 02" title={lang === "en" ? "Ministry of Health: H1N1 health crisis." : "Ministère de la Santé : crise sanitaire H1N1."} emphasis={lang === "en" ? "H1N1 health crisis" : "crise sanitaire"} />
    <CaseIntro
      kicker={lang === "en" ? "War Room · Public health" : "War Room · Santé publique"}
      title={lang === "en" ? "40 deaths. Massive disinformation. A ministry under unprecedented media pressure." : "40 décès. Désinformation massive. Un ministère sous pression médiatique inédite."}
      emphasis={lang === "en" ? "Massive disinformation." : "Désinformation massive."}
      body={lang === "en" ? "The H1N1 crisis triggered a spiral of disinformation across media and social networks. The Ministry of Health needed to identify hostile sources, produce credible counter-narratives, and protect the Minister's image during the media storm." : "La crise H1N1 a enclenché une spirale de désinformation dans les médias et sur les réseaux sociaux. Le Ministère de la Santé avait besoin d'identifier les sources hostiles, de produire des contre-narratifs crédibles, et de protéger l'image du Ministre pendant la tempête médiatique."}
      quote={lang === "en" ? "In 2 weeks, the official narrative regained dominance. The War Room had done its job." : "En 2 semaines, le récit officiel est redevenu dominant. La War Room avait fait son travail."}
      meta={lang === "en" ? "Post-mission debrief · Ministry of Health" : "Debrief post-mission · Ministère de la Santé"}
    />
    <CaseStats stats={[{ value: <><span>&lt;2</span><Unit>h</Unit></>, label: lang === "en" ? "War Room activation" : "Activation War Room" }, { value: <><span>14</span><Unit>{lang === "en" ? "d" : "j"}</Unit></>, label: lang === "en" ? "Crisis contained" : "Crise maîtrisée" }, { value: <><span>+38</span><Unit>%</Unit></>, label: lang === "en" ? "Minister digital image" : "Image digitale Ministre" }, { value: "1", label: lang === "en" ? "Cabinet supported" : "Cabinet accompagné" }]} />
    <MissionTimeline
      title={lang === "en" ? "War Room Workflow" : "Déroulé de la War Room"}
      items={lang === "en" ? [
        { date: "H+0", title: "Activation and diagnostic", tooltipTitle: "Activation and diagnostic", bullets: ["Setting up the crisis cell", "24/7 monitoring of media, social and digital flows", "Immediate identification of hostile relays"], badges: [{ label: "Detection trial", tone: "alert" }] },
        { date: "D+3", title: "Digital Investigation", tooltipTitle: "Digital Investigation", bullets: ["Targeted OSINT: identification of disinformation sources", "Identification of their amplification chains", "Continuous fact-checking on false information"], badges: [{ label: "Mechanics mapping" }] },
        { date: "D+7", title: "Counter-narratives & media strategy", tooltipTitle: "Counter-narratives & media strategy", bullets: ["Production of credible, polished counter-narratives", "Talking points for spokespersons", "Speaking calendar", "Personal coaching of the Minister"], badges: [{ label: "Narrative reclaimed" }] },
        { date: "D+56", title: "Crisis exit", tooltipTitle: "Crisis exit", bullets: ["Crisis contained", "Strengthening of the Minister's digital image", "Transfer of the system to the communications team", "Transfer to the Ministerial Cabinet"], badges: [{ label: "Mission accomplished", tone: "success" }] },
      ] : [
        { date: "H+0", title: "Activation et diagnostic", tooltipTitle: "Activation et diagnostic", bullets: ["Mise en place de la cellule de crise", "Monitoring 24/7 des flux médiatiques, sociaux et numériques", "Identification immédiate des relais hostiles"], badges: [{ label: "Essai pour détecte", tone: "alert" }] },
        { date: "J+3", title: "Digital Investigation", tooltipTitle: "Digital Investigation", bullets: ["OSINT cible : identification des sources de désinformation", "Identification de leurs chaînes d'amplification", "Fact-checking continu sur les fausses informations"], badges: [{ label: "Mécanique cartographie" }] },
        { date: "J+7", title: "Contre-narratifs & stratégie média", tooltipTitle: "Contre-narratifs & stratégie média", bullets: ["Production de contre-narratifs crédibles et massagés", "Clés pour les porte-paroles", "Calendrier des prises de parole", "Accompagnement personnel du Ministre"], badges: [{ label: "Reprise du récit" }] },
        { date: "J+56", title: "Sortie de crise", tooltipTitle: "Sortie de crise", bullets: ["Crise maîtrisée", "Renforcement de l'image digitale du Ministre", "Transmission du dispositif à l'équipe de communication", "Transmission au Cabinet Ministériel"], badges: [{ label: "Mission accomplie", tone: "success" }] },
      ]}
    />
  </CaseFileSection>
  );
};

const CaseFileStyles = () => (
  <style>{`
    .case-intro-grid{display:grid;grid-template-columns:5fr 7fr;gap:40px;align-items:stretch}.case-plate{background:${C.navy};color:${C.ivory};padding:44px 40px;position:relative;border-top:3px solid ${C.gold}}.case-quote-wrap{padding:8px 0 0}.case-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);margin:40px 0;border:1px solid ${C.rule};background:#fff}.case-stat{padding:22px 26px}.case-block{background:#fff;border:1px solid ${C.rule};border-top:3px solid ${C.gold};padding:36px 32px 40px;border-radius:2px;margin-top:48px;box-shadow:0 30px 60px -40px rgba(13,27,42,.15)}.case-legend{display:flex;gap:22px;flex-wrap:wrap;padding:14px 18px;background:${C.paper};border:1px solid ${C.rule};font-family:${FONT_MONO};font-size:10px;color:${C.navy};text-transform:uppercase;letter-spacing:.1em}.chess-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.chess-card{background:#fff;border:1px solid ${C.rule};padding:28px 26px;border-radius:2px;position:relative;overflow:hidden;transition:transform .25s ease,box-shadow .25s ease}.chess-card:hover{transform:translateY(-3px);box-shadow:0 20px 40px -20px rgba(13,27,42,.18)}.matrix-toolbar{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:18px;padding:12px 18px;background:${C.paper};border:1px solid ${C.rule}}.matrix-filter{font-family:${FONT_MONO};font-size:10px;color:${C.navy};text-transform:uppercase;letter-spacing:.15em;padding:7px 12px;background:transparent;border:1px solid ${C.rule};cursor:pointer;display:inline-flex;align-items:center;transition:.2s}.matrix-filter:hover{border-color:${C.gold};color:${C.goldDim}}.matrix-filter.active{background:${C.navy};color:${C.gold};border-color:${C.navy}}.matrix-canvas{position:relative;background:linear-gradient(180deg,#fefdf8 0%,#fafafa 100%);border:1px solid ${C.rule};overflow:hidden}.mission-timeline{display:grid;grid-template-columns:150px 1fr;gap:0 32px}.timeline-row{display:contents}.timeline-date{font-family:${FONT_MONO};font-size:12px;color:${C.goldDim};letter-spacing:.15em;padding-top:12px;position:relative;text-transform:uppercase}.timeline-dot{position:absolute;right:-37px;top:18px;width:10px;height:10px;background:${C.gold};border-radius:50%;z-index:2}.timeline-body{padding:10px 0 24px 32px;border-left:1px solid ${C.rule}}.timeline-tag{display:inline-block;padding:3px 8px;font-family:${FONT_MONO};font-size:10px;text-transform:uppercase;letter-spacing:.18em;margin-top:7px}@media(max-width:1060px){.case-intro-grid{grid-template-columns:1fr}.case-stats-grid{grid-template-columns:repeat(2,1fr)}.case-stat:nth-child(2){border-right:none!important}.chess-grid{grid-template-columns:1fr}.mission-timeline{grid-template-columns:1fr}.timeline-date{padding-top:0}.timeline-body{padding-left:0;border-left:none}.timeline-dot{display:none}}@media(max-width:640px){section .case-stats-grid{grid-template-columns:1fr}.case-stat{border-right:none!important;border-bottom:1px solid ${C.rule}}.case-stat:last-child{border-bottom:none}.case-block{padding:28px 20px}.case-plate{padding:34px 26px}.matrix-canvas{overflow-x:auto}.matrix-canvas svg{min-width:760px}.case-intro-grid{gap:28px}}
  `}</style>
);

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
      topBand={
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-5"
          style={{
            borderBottom: "1px solid rgba(10,22,40,0.12)",
            fontFamily: FONT_MONO,
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: C.gold,
            fontWeight: 500,
          }}
        >
          <span>Buildfluence Intelligence Hub</span>
          <span>— Pilier I / Strategic Intelligence Lab</span>
          <span style={{ marginLeft: "auto" }}>2026</span>
          <div
            className="basis-full mt-2"
          >
            <span
              className="inline-block"
              style={{
                padding: "10px 18px",
                border: `1px solid ${C.gold}`,
                fontSize: 11,
                letterSpacing: "0.28em",
                color: C.gold,
                width: "auto",
              }}
            >
              Pilier I — Strategic Intelligence Lab
            </span>
          </div>
        </div>
      }
      chapeau={t(
        "Le pouvoir appartient à ceux qui voient les ruptures avant qu'elles ne soient évidentes. Le Strategic Intelligence Lab transforme l'incertain en actionnable.",
        "Power belongs to those who see disruptions before they become obvious. The Strategic Intelligence Lab transforms uncertainty into actionable."
      )}
      ctas={[{ label: t("Parler de mon projet", "Discuss my project"), action: "#", formType: "f1" }]}
      situationContext="Strategic Intelligence Lab"
    >
      {/* Intro paragraphes — style DDD (border-left gold) */}
      <div
        className="rounded-lg border-l-4 px-6 py-5 space-y-4"
        style={{ borderColor: C.gold, background: "rgba(201,168,76,0.06)" }}
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

      {/* Case File OCP refondu */}
      <OcpCaseFile />

      {/* SECTION 02 */}
      <ThreatSection />

      {/* Case File Ministère de la Santé refondu */}
      <HealthCaseFile />


      {/* SECTION 03 */}
      <ModelisationsSection />
    </DetailPageLayout>
  );
};

export default StrategicIntelligenceLab;
