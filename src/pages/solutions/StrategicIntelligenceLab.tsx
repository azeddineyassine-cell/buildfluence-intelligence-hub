import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import DetailPageLayout, { CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

import ConstructionInfluence from "@/components/ConstructionInfluence";
import ocpLogo from "@/assets/clients/ocp.png";
import ministereSanteLogo from "@/assets/clients/ministere-sante.jpg";
import imgOcpCase from "@/assets/sections/cas-client-ocp.png";
import imgMinistereSante from "@/assets/sections/cas-client-ministere-sante.png";
import imgH1n1 from "@/assets/sections/h1n1-vaccines.jpg";
import imgOcpProtesters from "@/assets/sections/ocp-protesters.jpg";

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
          style={{ overflow: "hidden" }}
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

            {/* Droite — placeholder visuel */}
            <div
              className="rounded-md flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #f9f5ea, #fefdf8)",
                border: `1px solid ${C.rule}`,
                minHeight: 340,
              }}
            >
              <div className="text-center px-6">
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: "italic",
                    fontSize: 56,
                    color: C.gold,
                    lineHeight: 1,
                  }}
                >
                  {card.index.split("/")[1]}
                </div>
                <div
                  className="mt-2 uppercase"
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    color: C.goldDim,
                    letterSpacing: "0.25em",
                  }}
                >
                  Visualisation à venir
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
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

const ThreatSection = () => {
  const [mode, setMode] = useState<ThreatMode>("veille");
  const data = THREAT_CONTENT[mode];

  const ToggleBtn = ({ value, label }: { value: ThreatMode; label: string }) => {
    const active = mode === value;
    return (
      <button
        onClick={() => setMode(value)}
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
              className="p-8 md:p-10 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`,
                minHeight: 360,
              }}
            >
              <div className="text-center">
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: "italic",
                    fontSize: 80,
                    color: C.gold,
                    lineHeight: 1,
                  }}
                >
                  02
                </div>
                <div
                  className="mt-3"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 22,
                    color: C.ivory,
                  }}
                >
                  {mode === "veille" ? "Mode Veille" : "Mode War Room"}
                </div>
                <div
                  className="mt-2 uppercase"
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    color: "rgba(201,168,76,0.7)",
                    letterSpacing: "0.25em",
                  }}
                >
                  Visualisation à venir
                </div>
              </div>
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
        logo={ocpLogo}
        title="Cas client : OCP Group"
        context="Cartographie de l'écosystème concurrentiel. Tableau de bord décisionnel au cabinet du Président."
        intervention={[
          "Analyse par échiquiers : Géopolitique, Concurrentiel, Sociétal",
          "Cartographie et Matrice dynamique des parties prenantes",
          "Tableau de bord décisionnel",
        ]}
        result="Actions de sensibilisation et de contre-influence auprès des clients et partenaires. Maîtrise des menaces sociétales."
        image={imgOcpProtesters}
        imageCaption="Agitation des idiots utiles manipulés par les ONG de l'Europe du Nord"
        image2={imgOcpCase}
      />

      {/* SECTION 02 */}
      <ThreatSection />

      {/* Cas client Ministère rattaché à Threat */}
      <CaseStudy
        logo={ministereSanteLogo}
        title="Cas client : Ministère de la Santé"
        context="Crise H1N1, 40 décès, désinformation massive."
        intervention={[
          "Digital Investigation et Fact-checking en temps réel",
          "Identification des sources de désinformation",
          "War room de crise",
        ]}
        result="Crise maîtrisée en 2 semaines. Renforcement de l'image digitale du Ministre. Accompagnement de l'équipe de communication et du Cabinet Ministériel."
        image={imgH1n1}
        image2={imgMinistereSante}
      />

      {/* SECTION 03 */}
      <ModelisationsSection />
    </DetailPageLayout>
  );
};

export default StrategicIntelligenceLab;
