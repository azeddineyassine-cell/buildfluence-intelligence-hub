import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { FormStrategicExchange } from "@/components/FormModals";
import CompetitiveLandscape from "@/components/CompetitiveLandscape";
import { useLanguage } from "@/contexts/LanguageContext";
import logoBuildfluence from "@/assets/Logo_Buildfluence-Fond_Blanc_1.png";
import logoMedz from "@/assets/clients/medz.png";
import logoCri from "@/assets/clients/cri.png";

// Actor logos (Back-Office sources + Ecosystem)
import logoOfac from "@/assets/clients/ofac.png";
import logoEuSanctions from "@/assets/clients/eu-sanctions.png";
import logoIcij from "@/assets/clients/icij.png";
import logoGafi from "@/assets/clients/gafi.png";
import logoPitchbook from "@/assets/clients/pitchbook.png";
import logoDnb from "@/assets/clients/dun-bradstreet.png";
import logoGrowthlab from "@/assets/clients/growthlab.png";
import logoStatista from "@/assets/clients/statista.png";
import logoFdi from "@/assets/clients/fdi.png";
import logoItc from "@/assets/itc-logo.png";
import logoWorldbank from "@/assets/clients/worldbank.png";
import logoHarvard from "@/assets/clients/harvard.png";
import logoAmdie from "@/assets/clients/amdie.png";
import logoMicepp from "@/assets/clients/micepp.png";
import logoMcinet from "@/assets/clients/mcinet.png";
import logoMoroccoNow from "@/assets/clients/morocco-now.png";
import logoCgem from "@/assets/clients/cgem.png";
import logoAsmex from "@/assets/clients/asmex.png";
import logoAmica from "@/assets/clients/amica.png";
import logoAmip from "@/assets/clients/amip.png";
import logoAmith from "@/assets/clients/amith.png";
import logoCnt from "@/assets/clients/cnt.png";
import logoFenagri from "@/assets/clients/fenagri.png";
import logoInvesthk from "@/assets/clients/investhk.png";
import logoEdbsg from "@/assets/clients/edb-singapore.png";
import logoApexbrasil from "@/assets/clients/apexbrasil.png";
import logoInvestlt from "@/assets/clients/invest-lithuania.png";
import logoInvestmx from "@/assets/clients/invest-mexico.png";
import logoInvestvn from "@/assets/clients/invest-vietnam.png";
import logoInvestcl from "@/assets/clients/investchile.png";
import logoInvestsa from "@/assets/clients/investsa.png";
import logoCzechinvest from "@/assets/clients/czech-invest.png";
import logoGiz from "@/assets/clients/giz.png";
import logoAfd from "@/assets/clients/afd.png";
import logoJica from "@/assets/clients/jica.png";
import logoBei from "@/assets/clients/bei.png";
import logoPnud from "@/assets/clients/pnud.png";
import logoBm from "@/assets/clients/worldbank.png";
import logoBerd from "@/assets/clients/berd.png";
import logoIsdb from "@/assets/clients/isdb.png";
import logoBad from "@/assets/clients/bad.png";

const FED_LOGOS: Record<string, string> = { cgem: logoCgem, asmex: logoAsmex, amica: logoAmica, amip: logoAmip, amith: logoAmith, cnt: logoCnt, fenagri: logoFenagri };
const API_LOGOS: Record<string, string> = { investhk: logoInvesthk, edbsg: logoEdbsg, apexbrasil: logoApexbrasil, investlt: logoInvestlt, investmx: logoInvestmx, investvn: logoInvestvn, investcl: logoInvestcl, investsa: logoInvestsa, czechinvest: logoCzechinvest };
const COOP_LOGOS: Record<string, string> = { giz: logoGiz, afd: logoAfd, jica: logoJica, bei: logoBei, pnud: logoPnud, bm: logoBm, berd: logoBerd, isdb: logoIsdb, bad: logoBad };
const AMDIE_LOGOS: Record<string, string> = { amdie: logoAmdie, micepp: logoMicepp, mcinet: logoMcinet, moroccoNow: logoMoroccoNow, medz: logoMedz, cri: logoCri };
const SOURCE_LOGOS: Record<string, string> = {
  OFAC: logoOfac, "EU Sanctions": logoEuSanctions, ICIJ: logoIcij, GAFI: logoGafi, PitchBook: logoPitchbook, "D&B": logoDnb,
  "Growth Lab": logoGrowthlab, Statista: logoStatista, fDi: logoFdi, "World Bank": logoWorldbank, Harvard: logoHarvard,
  ITC: logoItc,
};

import {
  sourcesData, destData, countries, fedData, apiData, coopData, logoData,
  getCompetitorBfApport, competitorOpportunities,
  type SourceDetail, type DestDetail, type Country, type Federation, type Api, type Coop, type Logo,
} from "@/data/softpower";
import {
  sourcesDataEn, destDataEn, countriesEn, fedDataEn, apiDataEn, coopDataEn, logoDataEn,
  getCompetitorBfApportEn, competitorOpportunitiesEn,
} from "@/data/softpower.en";

/* ═══════════════ Palette tokens ═══════════════ */
const C = {
  paper: "#F4F1EA",
  paperDeep: "#EDE8DD",
  navy: "#0A1628",
  navySoft: "#142340",
  navyLine: "#1F3050",
  gold: "#C9A84C",
  goldSoft: "#D9BC6E",
  ink: "#1A1A1A",
  inkSoft: "#4A4A4A",
  inkMute: "#7A7A7A",
  line: "rgba(10, 22, 40, 0.12)",
  lineSoft: "rgba(10, 22, 40, 0.06)",
  red: "#B0392E",
  redSoft: "rgba(176, 57, 46, 0.08)",
};
const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_ITALIC = "'Cormorant Garamond', serif";
const FONT_MONO = "'JetBrains Mono', monospace";
const FONT_BODY = "'DM Sans', sans-serif";

/* ═══════════════ USE CASE DATA ═══════════════ */
type UseCaseDetail = {
  eyebrow: string;
  title: string;
  tagline: string;
  meta?: { l: string; v: string }[];
  cols: { h: string; items: string[] }[];
  timeline?: { year: string; text: string }[];
  observation?: { title: string; colA: { h: string; items: string[] }; colB: { h: string; items: string[] } };
  bottomLogos?: { label: string; src: string }[];
  bfApport: string;
};

const buildUseCaseData = (lang: "fr" | "en"): Record<string, UseCaseDetail> => {
  const fr = lang === "fr";
  return {
    amdie: {
      eyebrow: fr ? "Use Case · Acteur Institutionnel" : "Use Case · Institutional Actor",
      title: "AMDIE",
      tagline: fr
        ? "Agence Marocaine de Développement des Investissements et des Exportations. Bras opérationnel de l'attractivité économique du Royaume."
        : "Moroccan Agency for the Development of Investments and Exports. Operational arm of the Kingdom's economic attractiveness.",
      meta: [
        { l: fr ? "Charte d'investissement" : "Investment Charter", v: fr ? "Édition 2023" : "2023 Edition" },
        { l: fr ? "Objectif IDE 2026" : "FDI target 2026", v: fr ? "550 MMDH" : "MAD 550 Bn" },
        { l: fr ? "Création d'emploi 2026" : "Job creation 2026", v: fr ? "500 000" : "500,000" },
      ],
      cols: [
        { h: fr ? "Périmètre AMDIE" : "AMDIE perimeter", items: fr ? [
          "Pilotage de l'attractivité nationale",
          "Morocco Now : Site vitrine de l'activité AMDIE",
          "Coordination des missions internationales",
          "Suivi des grands projets d'investissement",
          "Promotion des exportations marocaines",
        ] : [
          "Steering of national attractiveness",
          "Morocco Now: showcase site of AMDIE activity",
          "Coordination of international missions",
          "Monitoring of major investment projects",
          "Promotion of Moroccan exports",
        ] },
        { h: fr ? "Valeur Buildfluence dédiée" : "Dedicated Buildfluence value", items: fr ? [
          "Observatoire d'Investissement permanent",
          "Note stratégique & Lettre d'information sur-mesure",
          "Veille des dynamiques narratives concernant les entreprises étrangères au Maroc",
          "Information fraîche pour les exportateurs marocains",
          "Rayonnement sectoriel complet",
        ] : [
          "Permanent Investment Observatory",
          "Tailor-made strategic note & newsletter",
          "Watch on narrative dynamics around foreign companies in Morocco",
          "Fresh intelligence for Moroccan exporters",
          "Full sectoral reach",
        ] },
      ],
      bottomLogos: [
        { label: "AMDIE", src: logoAmdie },
        { label: "Morocco Now", src: logoMoroccoNow },
      ],
      bfApport: fr
        ? "Transformer Morocco Now de campagne de communication en infrastructure d'influence souveraine, alimentée en continu par le mécanisme Doing Business Platform Buildfluence."
        : "Turning Morocco Now from a communication campaign into a sovereign influence infrastructure, continuously fed by the Buildfluence Doing Business Platform mechanism.",
    },
    micepp: {
      eyebrow: fr ? "Use Case · Ministère de tutelle" : "Use Case · Supervising Ministry",
      title: "MICEPP",
      tagline: fr
        ? "Ministère de l'Investissement, de la Convergence et de l'Évaluation des Politiques Publiques. Architecte de la stratégie nationale d'investissement."
        : "Ministry of Investment, Convergence and Public Policy Evaluation. Architect of the national investment strategy.",
      meta: [
        { l: fr ? "Tutelle directe" : "Direct supervision", v: fr ? "AMDIE et CRI" : "AMDIE and CRI" },
        { l: fr ? "Chantier emblématique" : "Flagship project", v: fr ? "Observatoire d'Investissement" : "Investment Observatory" },
      ],
      cols: [
        { h: fr ? "Mandat stratégique" : "Strategic mandate", items: fr ? [
          "Définition de la politique nationale d'investissement",
          "Convergence des dispositifs publics d'attractivité",
          "Évaluation de l'impact des politiques publiques",
          "Pilotage des grandes réformes économiques",
          "Tutelle de l'AMDIE",
        ] : [
          "Definition of national investment policy",
          "Convergence of public attractiveness instruments",
          "Evaluation of public policy impact",
          "Steering of major economic reforms",
          "Supervision of AMDIE",
        ] },
        { h: fr ? "Valeur Buildfluence dédiée" : "Dedicated Buildfluence value", items: fr ? [
          "Veille stratégique en continu sur les politiques d'investissement comparées",
          "Décryptage des stratégies d'attractivité concurrentes (Vietnam, Afrique du Sud, Turquie…)",
          "Anticipation des signaux faibles réglementaires et géoéconomiques",
          "Production d'un Baromètre d'Investissement actionnable",
          "Capacité immédiate de déploiement opérationnel",
        ] : [
          "Continuous strategic watch on comparative investment policies",
          "Decoding of competing attractiveness strategies (Vietnam, South Africa, Turkey…)",
          "Anticipation of weak regulatory and geo-economic signals",
          "Production of an actionable Investment Barometer",
          "Immediate operational deployment capacity",
        ] },
      ],
      timeline: [
        { year: "2017", text: fr ? "Conception de l'Observatoire d'Investissement par Buildfluence" : "Design of the Investment Observatory by Buildfluence" },
        { year: "2024", text: fr ? "Annonce officielle du chantier par le MICEPP" : "Official announcement of the project by MICEPP" },
        { year: "2026", text: fr ? "Étude toujours en cours" : "Study still in progress" },
      ],
      bfApport: fr
        ? "L'expertise existe. La méthodologie est éprouvée. L'infrastructure peut être déployée immédiatement. Buildfluence porte ce projet depuis huit ans, prêt à transformer une vision officielle en outil opérationnel."
        : "The expertise exists. The methodology is proven. The infrastructure can be deployed immediately. Buildfluence has carried this project for eight years, ready to turn an official vision into an operational tool.",
    },
    medz: {
      eyebrow: fr ? "Use Case · Aménageur stratégique" : "Use Case · Strategic Developer",
      title: "MedZ",
      tagline: fr
        ? "Filiale du Groupe CDG dédiée à l'aménagement et au développement des zones d'activités économiques au Maroc. Vingt ans d'excellence opérationnelle... en attente d'une voix stratégique à la hauteur."
        : "CDG Group subsidiary dedicated to the planning and development of economic activity zones in Morocco. Twenty years of operational excellence… awaiting a strategic voice to match.",
      meta: [
        { l: fr ? "Groupe" : "Group", v: fr ? "CDG (Caisse de Dépôt et de Gestion)" : "CDG (Deposit and Management Fund)" },
        { l: fr ? "Type d'activité" : "Type of activity", v: fr ? "Aménageur-Développeur" : "Developer-Planner" },
        { l: fr ? "Périmètre" : "Perimeter", v: fr ? "Zones industrielles · Offshoring · Tourisme" : "Industrial zones · Offshoring · Tourism" },
      ],
      cols: [
        { h: fr ? "Portefeuille MedZ" : "MedZ portfolio", items: fr ? [
          "Plateformes Industrielles Intégrées (P2I)",
          "Atlantic Free Zone : Kénitra",
          "Midparc : Casablanca (aéronautique)",
          "Technopolis : Rabat (offshoring)",
          "Casanearshore & Rabat Technopolis (services)",
        ] : [
          "Integrated Industrial Platforms (P2I)",
          "Atlantic Free Zone: Kenitra",
          "Midparc: Casablanca (aerospace)",
          "Technopolis: Rabat (offshoring)",
          "Casanearshore & Rabat Technopolis (services)",
        ] },
        { h: fr ? "Valeur Buildfluence dédiée" : "Dedicated Buildfluence value", items: fr ? [
          "Production éditoriale stratégique structurante (rapports trimestriels, études sectorielles, Dashboard public dynamique)",
          "Veille concurrentielle continue (zones franches mondiales et africaines)",
          "Intelligence sur les investisseurs ciblés (équipementiers automobiles, énergies renouvelables, donneurs d'ordre aéronautiques)",
          "Cartographie des décideurs industriels européens en phase de relocalisation",
          "Livre Blanc annuel sur l'attractivité industrielle continentale",
        ] : [
          "Structuring strategic editorial output (quarterly reports, sectoral studies, dynamic public dashboard)",
          "Continuous competitive watch (global and African free zones)",
          "Intelligence on targeted investors (automotive suppliers, renewables, aerospace principals)",
          "Mapping of European industrial decision-makers in relocation",
          "Annual White Paper on continental industrial attractiveness",
        ] },
      ],
      observation: {
        title: fr ? "Observation stratégique" : "Strategic observation",
        colA: { h: fr ? "Ce que les leaders mondiaux font" : "What global leaders do", items: fr ? [
          "Plateforme data publique et rapports trimestriels",
          "Nation Branding multilingue et présence éditoriale continue",
          "AI Platforms et trackers de réformes en temps réel",
          "Études sectorielles régulières et benchmarks publiés",
        ] : [
          "Public data platform and quarterly reports",
          "Multilingual Nation Branding and continuous editorial presence",
          "AI Platforms and real-time reform trackers",
          "Regular sectoral studies and published benchmarks",
        ] },
        colB: { h: fr ? "Ce qu'on peut faire ensemble" : "What we can build together", items: fr ? [
          "Reporting trimestriel structuré et accessible publiquement",
          "Newsletter stratégique continue en plusieurs langues",
          "Dashboard d'attractivité industrielle interactif",
          "Livre Blanc annuel sur l'attractivité africaine",
        ] : [
          "Structured quarterly reporting accessible to the public",
          "Continuous multilingual strategic newsletter",
          "Interactive industrial attractiveness dashboard",
          "Annual White Paper on African attractiveness",
        ] },
      },
      bfApport: fr
        ? "Vingt ans de réussite terrain. Zéro étude stratégique publique depuis 2016. Le décalage entre l'excellence opérationnelle et la visibilité institutionnelle se paie en parts de marché continentales. Buildfluence transforme ce décalage en avantage compétitif."
        : "Twenty years of field success. Zero public strategic study since 2016. The gap between operational excellence and institutional visibility is paid in continental market share. Buildfluence turns this gap into a competitive advantage.",
    },
    cri: {
      eyebrow: fr ? "Use Case · Échelon territorial" : "Use Case · Territorial Tier",
      title: fr ? "CRI : Centres Régionaux d'Investissement" : "CRI: Regional Investment Centres",
      tagline: fr
        ? "Guichet unique territorial pour les investisseurs. Bras armé de la régionalisation avancée du Royaume en matière d'investissement."
        : "Territorial one-stop shop for investors. Operational arm of the Kingdom's advanced regionalisation in investment matters.",
      meta: [
        { l: fr ? "Nombre de CRI" : "Number of CRIs", v: fr ? "12 (un par région)" : "12 (one per region)" },
        { l: fr ? "Création" : "Created", v: fr ? "2002 · Refonte 2019" : "2002 · Reformed 2019" },
        { l: "Mission", v: fr ? "Accompagnement & accélération" : "Support & acceleration" },
      ],
      cols: [
        { h: fr ? "Mandat des CRI" : "CRI mandate", items: fr ? [
          "Guichet unique pour la création d'entreprise",
          "Accompagnement des projets d'investissement régionaux",
          "Promotion territoriale et identification des opportunités locales",
          "Médiation avec les administrations",
          "Suivi post-création des entreprises",
        ] : [
          "One-stop shop for business creation",
          "Support for regional investment projects",
          "Territorial promotion and identification of local opportunities",
          "Mediation with administrations",
          "Post-creation business follow-up",
        ] },
        { h: fr ? "Valeur Buildfluence dédiée" : "Dedicated Buildfluence value", items: fr ? [
          "Intelligence territoriale dédiée par région",
          "Benchmark de compétitivité régionale (vs autres territoires marocains et internationaux)",
          "Veille sur les investisseurs ciblant des localisations spécifiques",
          "Production de fiches d'attractivité régionale sur-mesure",
          "Décryptage des stratégies concurrentes infrarégionales",
        ] : [
          "Dedicated territorial intelligence per region",
          "Regional competitiveness benchmark (vs other Moroccan and international territories)",
          "Watch on investors targeting specific locations",
          "Production of tailor-made regional attractiveness briefs",
          "Decoding of intra-regional competing strategies",
        ] },
      ],
      bfApport: fr
        ? "Chaque région a ses atouts, ses concurrents et ses fenêtres d'opportunité. Buildfluence dote chaque CRI d'une intelligence territoriale équivalente à celle d'un État."
        : "Each region has its strengths, competitors and windows of opportunity. Buildfluence equips each CRI with territorial intelligence on a par with that of a State.",
    },
    mcinet: {
      eyebrow: fr ? "Use Case · Ministère de tutelle industrielle" : "Use Case · Industrial Supervisory Ministry",
      title: "MCINET",
      tagline: fr
        ? "Ministère de l'Industrie et du Commerce. Architecte de la politique industrielle nationale et garant du cadre normatif du commerce intérieur et extérieur du Royaume."
        : "Ministry of Industry and Trade. Architect of national industrial policy and guarantor of the regulatory framework for domestic and foreign trade.",
      meta: [
        { l: fr ? "Programme phare" : "Flagship programme", v: fr ? "Plan d'Accélération Industrielle (PAI)" : "Industrial Acceleration Plan (IAP)" },
        { l: fr ? "Objectif export PAI" : "IAP export target", v: fr ? "100 Mds MAD" : "MAD 100 Bn" },
        { l: fr ? "Emplois ciblés" : "Jobs targeted", v: fr ? "500 000" : "500,000" },
      ],
      cols: [
        { h: fr ? "Périmètre MCINET" : "MCINET perimeter", items: fr ? [
          "Définition et pilotage de la politique industrielle nationale",
          "Régulation du commerce intérieur et protection du consommateur",
          "Développement des zones industrielles et des écosystèmes sectoriels",
          "Promotion des exportations et intégration aux chaînes de valeur mondiales",
          "Normalisation, métrologie et accréditation (IMANOR)",
        ] : [
          "Definition and steering of national industrial policy",
          "Regulation of domestic trade and consumer protection",
          "Development of industrial zones and sectoral ecosystems",
          "Export promotion and integration into global value chains",
          "Standardisation, metrology and accreditation (IMANOR)",
        ] },
        { h: fr ? "Valeur Buildfluence dédiée" : "Dedicated Buildfluence value", items: fr ? [
          "Veille concurrentielle continue sur les politiques industrielles comparées (Turquie, Vietnam, Égypte, Pologne)",
          "Benchmark des zones franches mondiales et africaines pour éclairer la stratégie MCINET",
          "Intelligence sur les décideurs industriels européens en phase de relocalisation",
          "Cartographie des donneurs d'ordre aéronautiques, automobiles et énergétiques ciblant le Maroc",
          "Production d'un Baromètre d'Attractivité Industrielle actionnable",
        ] : [
          "Continuous competitive watch on comparative industrial policies (Turkey, Vietnam, Egypt, Poland)",
          "Benchmark of global and African free zones to inform MCINET strategy",
          "Intelligence on European industrial decision-makers in relocation phase",
          "Mapping of aerospace, automotive and energy principals targeting Morocco",
          "Production of an actionable Industrial Attractiveness Barometer",
        ] },
      ],
      bottomLogos: [
        { label: "MCINET", src: logoMcinet },
      ],
      bfApport: fr
        ? "Le Maroc dispose d'écosystèmes industriels structurés : automobile, aéronautique, textile : mais la bataille de l'attractivité se joue désormais sur l'intelligence et la réactivité. Buildfluence dote le MCINET d'une capacité de veille et d'anticipation équivalente à celle des agences industrielles les plus compétitives au monde."
        : "Morocco has structured industrial ecosystems: automotive, aerospace, textile: but the battle for attractiveness is now fought on intelligence and responsiveness. Buildfluence equips MCINET with a monitoring and anticipation capacity on a par with the world's most competitive industrial agencies.",
    },
  };
};

/* ═══════════════ DETAIL MODAL ═══════════════ */
type DetailKind =
  | { kind: "source"; data: SourceDetail }
  | { kind: "dest"; data: DestDetail }
  | { kind: "country"; data: Country }
  | { kind: "fed"; key: string; data: Federation }
  | { kind: "api"; data: Api }
  | { kind: "coop"; data: Coop }
  | { kind: "logo"; data: Logo }
  | { kind: "useCase"; data: UseCaseDetail }
  | { kind: "moroccoNow" };

const DetailModal = ({ detail, onClose }: { detail: DetailKind | null; onClose: () => void }) => {
  const { t } = useLanguage();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    if (detail) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, detail]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {detail && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(10, 22, 40, 0.7)", backdropFilter: "blur(4px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "min(900px, 100%)",
              maxHeight: "calc(100vh - 80px)",
              overflowY: "auto",
              background: C.paper,
              border: `1px solid ${C.gold}`,
              boxShadow: "0 30px 80px rgba(10,22,40,0.4), 0 0 0 1px rgba(201,168,76,0.2)",
              padding: "48px",
            }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center transition-all"
              style={{ border: `1px solid ${C.line}`, background: "transparent", color: C.inkSoft, fontFamily: FONT_MONO, fontSize: 14 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.paper; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.inkSoft; }}
              aria-label={t("Fermer", "Close")}
            >✕</button>
            <DetailContent detail={detail} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 12, fontWeight: 500 }}>
    {children}
  </div>
);

const DetailTitle = ({ children, flag }: { children: React.ReactNode; flag?: string }) => (
  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 600, color: C.navy, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.015em", display: "flex", alignItems: "center", gap: 16 }}>
    {flag && <span style={{ fontSize: 40, lineHeight: 1 }}>{flag}</span>}
    <span>{children}</span>
  </h3>
);

const DetailTagline = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 18, color: C.inkSoft, lineHeight: 1.45, marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid ${C.line}` }}>
    {children}
  </p>
);

const ColsBlock = ({ cols }: { cols: { h: React.ReactNode; items: string[] }[] }) => (
  <div className="grid gap-9" style={{ gridTemplateColumns: cols.length === 3 ? "repeat(3, 1fr)" : "1fr 1fr" }}>
    {cols.map((c, idx) => (
      <div key={idx}>
        <h4 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 18, paddingBottom: 12, borderBottom: `1px solid ${C.gold}`, fontWeight: 600 }}>{c.h}</h4>
        <ul className="list-none">
          {c.items.map((it, i) => (
            <li key={i} style={{ fontSize: 13.5, color: C.inkSoft, padding: "8px 0 8px 22px", borderBottom: i === c.items.length - 1 ? "none" : `1px solid ${C.lineSoft}`, position: "relative", lineHeight: 1.55 }}>
              <span style={{ position: "absolute", left: 0, top: 8, color: C.gold, fontSize: 14 }}>→</span>
              {it}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const BfApport = ({ text, label }: { text: string; label?: string }) => {
  const { t } = useLanguage();
  return (
    <div style={{ background: C.navy, color: C.paper, padding: 24, marginTop: 28, position: "relative" }}>
      <span style={{ position: "absolute", top: 0, left: 0, width: 40, height: 1, background: C.gold }} />
      <h5 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 600 }}>{label || t("L'apport Buildfluence", "Buildfluence value")}</h5>
      <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 17, color: C.paper, lineHeight: 1.5, fontWeight: 400 }}>{text}</p>
    </div>
  );
};

const MetaStrip = ({ items }: { items: { l: string; v: string; isScore?: boolean }[] }) => (
  <div className="flex flex-wrap gap-6" style={{ marginBottom: 32, padding: "16px 20px", background: C.paperDeep, borderLeft: `3px solid ${C.gold}` }}>
    {items.map((m, i) => (
      <div key={i} className="flex flex-col gap-1">
        <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute }}>{m.l}</div>
        <div style={m.isScore
          ? { fontFamily: FONT_DISPLAY, fontSize: 22, color: C.gold, fontWeight: 600 }
          : { fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: C.navy }
        }>{m.v}</div>
      </div>
    ))}
  </div>
);

const DetailContent = ({ detail }: { detail: DetailKind }) => {
  const { t } = useLanguage();
  const VALUE = t("Valeur Buildfluence", "Buildfluence value");
  if (detail.kind === "source") {
    const d = detail.data;
    return (
      <>
        <Eyebrow>{d.eyebrow}</Eyebrow>
        <DetailTitle>{d.title}</DetailTitle>
        <DetailTagline>{d.tagline}</DetailTagline>
        <ColsBlock cols={d.cols} />
        {d.sources && (
          <div style={{ marginTop: 24, padding: "16px 20px", background: C.paperDeep, borderLeft: `3px solid ${C.gold}`, fontFamily: FONT_MONO, fontSize: 11, color: C.inkSoft }}>
            <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, marginBottom: 8 }}>{t("Sources premium", "Premium sources")}</div>
            {d.sources}
          </div>
        )}
        <BfApport text={d.bfApport} label={VALUE} />
      </>
    );
  }
  if (detail.kind === "dest") {
    const d = detail.data;
    return (
      <>
        <Eyebrow>{d.eyebrow}</Eyebrow>
        <DetailTitle>{d.title}</DetailTitle>
        <DetailTagline>{d.tagline}</DetailTagline>
        {d.meta && <MetaStrip items={d.meta} />}
        <ColsBlock cols={d.cols} />
        <BfApport text={d.bfApport} label={VALUE} />
      </>
    );
  }
  if (detail.kind === "country") {
    const c = detail.data;
    const compOpps = t("competitorOpportunities", "competitorOpportunitiesEn") === "competitorOpportunities" ? competitorOpportunities : competitorOpportunitiesEn;
    const compApport = t("fr", "en") === "fr" ? getCompetitorBfApport(c.score || 0) : getCompetitorBfApportEn(c.score || 0);
    return (
      <>
        <Eyebrow>{c.isKey ? t("Pays Clé · Partenaire stratégique", "Key Country · Strategic partner") : t("Pays Concurrent – Veille Concurrentielle", "Competitor Country – Competitive Watch")}</Eyebrow>
        <DetailTitle flag={c.flag}>{c.name}</DetailTitle>
        <DetailTagline>{c.description}</DetailTagline>
        <MetaStrip items={[
          { l: t("Catégorie", "Category"), v: c.category },
          { l: c.isKey ? t("Secteurs clés", "Key sectors") : t("Secteurs compétitifs", "Competitive sectors"), v: c.sectors },
          ...(!c.isKey && c.score !== undefined ? [{ l: t("Score compétitivité", "Competitiveness score"), v: `${c.score}/10`, isScore: true }] : []),
        ]} />
        {c.isKey ? (
          <>
            <ColsBlock cols={[
              { h: t("Opportunités d'influence", "Influence opportunities"), items: c.opportunities || [] },
              { h: t("Levier stratégique", "Strategic lever"), items: t("fr", "en") === "fr" ? [
                `Le ${c.name} représente une relation stratégique à entretenir et renforcer.`,
                "Buildfluence cartographie en continu les décideurs émergents, les narratifs hostiles et les fenêtres d'opportunité que les approches diplomatiques classiques ne détectent pas.",
              ] : [
                `${c.name} represents a strategic relationship to nurture and strengthen.`,
                "Buildfluence continuously maps emerging decision-makers, hostile narratives and windows of opportunity that classical diplomatic approaches do not detect.",
              ] },
            ]} />
            <BfApport text={c.bfApport || ""} label={VALUE} />
          </>
        ) : (
          <>
            <ColsBlock cols={[
              { h: t("Profil compétitif", "Competitive profile"), items: t("fr", "en") === "fr" ? [
                `Note globale : ${c.score}/10`,
                c.description,
                `Secteurs en compétition vs Maroc : ${c.sectors}`,
              ] : [
                `Overall score: ${c.score}/10`,
                c.description,
                `Sectors competing vs Morocco: ${c.sectors}`,
              ] },
              { h: t("Opportunités Buildfluence", "Buildfluence opportunities"), items: compOpps.map(o => o.replace(t("ce concurrent", "this competitor"), c.name)) },
            ]} />
            <BfApport text={compApport} label={VALUE} />
          </>
        )}
      </>
    );
  }
  if (detail.kind === "fed") {
    const f = detail.data;
    const fr = t("fr", "en") === "fr";
    const fedSynergieIntro: Record<string, string> = fr ? {
      cgem: "Pour la CGEM, Buildfluence déploierait un dispositif sur-mesure couvrant l'ensemble des filières représentées",
      amica: "Pour l'AMICA, Buildfluence structurerait un dispositif d'intelligence dédié à la filière automobile",
      amip: "Pour l'AMIP, Buildfluence déploierait un dispositif d'intelligence adapté aux enjeux de souveraineté sanitaire",
      asmex: "Pour l'ASMEX, Buildfluence outillerait les exportateurs avec une intelligence de marchés cibles",
      amith: "Pour l'AMITH, Buildfluence structurerait une intelligence dédiée aux dynamiques concurrentielles textiles",
      cnt: "Pour le CNT, Buildfluence déploierait un dispositif d'intelligence touristique sur-mesure",
      fenagri: "Pour la FENAGRI, Buildfluence outillerait le secteur agroalimentaire avec une intelligence dédiée aux chaînes de valeur",
    } : {
      cgem: "For CGEM, Buildfluence would deploy a tailor-made setup covering all represented sectors",
      amica: "For AMICA, Buildfluence would structure an intelligence setup dedicated to the automotive industry",
      amip: "For AMIP, Buildfluence would deploy an intelligence setup tailored to health sovereignty stakes",
      asmex: "For ASMEX, Buildfluence would equip exporters with target-market intelligence",
      amith: "For AMITH, Buildfluence would structure dedicated intelligence on textile competitive dynamics",
      cnt: "For the CNT, Buildfluence would deploy a tailor-made tourism intelligence setup",
      fenagri: "For FENAGRI, Buildfluence would equip the agri-food sector with dedicated value-chain intelligence",
    };
    const fedApportProjection: Record<string, string> = fr ? {
      cgem: "Alimenter le patronat en intelligence sectorielle pour peser dans les arbitrages publics",
      amica: "Veille sur les stratégies des constructeurs européens et asiatiques, anticipation des relocalisations, mapping des décideurs achats",
      amip: "Intelligence sur les flux pharmaceutiques mondiaux, veille réglementaire AFCRMP, suivi des appels d'offres internationaux",
      asmex: "Information fraîche sur les marchés cibles, veille sur les barrières tarifaires émergentes, identification d'opportunités sectorielles",
      amith: "Benchmark concurrentiel Tunisie/Vietnam/Turquie en continu, veille sur les politiques d'achats responsables des donneurs d'ordre européens",
      cnt: "Veille sur les tendances tourisme mondial, analyse des stratégies concurrentes (Égypte, Tunisie, Turquie), monitoring de la perception du Maroc à l'international",
      fenagri: "Intelligence sur les chaînes de valeur agricoles mondiales, veille sur les opportunités à l'export en Afrique, suivi des barrières sanitaires UE",
    } : {
      cgem: "Feed employer organisations with sectoral intelligence to weigh on public arbitrations",
      amica: "Watch on European and Asian carmaker strategies, anticipation of relocations, mapping of purchasing decision-makers",
      amip: "Intelligence on global pharmaceutical flows, AFCRMP regulatory watch, monitoring of international tenders",
      asmex: "Fresh intelligence on target markets, watch on emerging tariff barriers, identification of sectoral opportunities",
      amith: "Continuous Tunisia/Vietnam/Turkey competitive benchmark, watch on responsible-purchasing policies of European principals",
      cnt: "Watch on global tourism trends, analysis of competing strategies (Egypt, Tunisia, Turkey), monitoring of Morocco's international perception",
      fenagri: "Intelligence on global agricultural value chains, watch on export opportunities in Africa, monitoring of EU sanitary barriers",
    };
    const synergieIntro = fedSynergieIntro[detail.key] || (fr
      ? `Pour ${detail.key.toUpperCase()}, Buildfluence déploierait un dispositif sur-mesure adapté à la filière`
      : `For ${detail.key.toUpperCase()}, Buildfluence would deploy a tailor-made setup adapted to the sector`);
    const apportProjection = fedApportProjection[detail.key] || f.apport;
    return (
      <>
        <div style={{ background: C.paperDeep, borderLeft: `3px solid ${C.gold}`, padding: "18px 22px", marginBottom: 36 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 8, fontWeight: 600 }}>
            {t("Note de lecture", "Reader's note")}
          </div>
          <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 15, color: C.ink, lineHeight: 1.55, margin: 0 }}>
            {t(
              "Les fédérations sectorielles présentées ci-dessous constituent l'écosystème naturel de diffusion d'un dispositif Buildfluence. Les cas d'usage exposés sont projectifs et illustrent la valeur que notre intelligence sur-mesure pourrait apporter à chaque organisation. Aucun partenariat formel n'est ici revendiqué.",
              "The sectoral federations presented below constitute the natural diffusion ecosystem of a Buildfluence setup. The use cases shown are prospective and illustrate the value our tailor-made intelligence could bring to each organisation. No formal partnership is claimed here."
            )}
          </p>
        </div>
        <Eyebrow>{t("Fédération Sectorielle · Écosystème de diffusion", "Sectoral Federation · Diffusion ecosystem")}</Eyebrow>
        <DetailTitle>{detail.key.toUpperCase()}</DetailTitle>
        <DetailTagline>{f.full}</DetailTagline>
        <MetaStrip items={[{ l: t("Rôle", "Role"), v: f.role }]} />
        <ColsBlock cols={[
          { h: <>{t("Synergie Buildfluence", "Buildfluence synergy")} <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.inkMute, textTransform: "none", letterSpacing: 0, fontSize: 12, fontWeight: 400 }}>{t("(Cas d'usage type)", "(Typical use case)")}</em></>, items: [
            synergieIntro,
            t("Intelligence sectorielle partagée", "Shared sectoral intelligence"),
            t("Benchmark concurrentiel continu", "Continuous competitive benchmark"),
            t("Co-production de rapports stratégiques", "Co-production of strategic reports"),
            t("Veille narrative dédiée", "Dedicated narrative watch"),
          ] },
          { h: <>{t("Apport sectoriel ciblé", "Targeted sectoral contribution")} <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.inkMute, textTransform: "none", letterSpacing: 0, fontSize: 12, fontWeight: 400 }}>{t("(Projection)", "(Projection)")}</em></>, items: [apportProjection] },
        ]} />
        <BfApport text={t(
          "Une fédération seule reçoit la donnée. Une fédération avec Buildfluence aurait une longueur d'avance.",
          "A federation alone receives the data. A federation with Buildfluence would have a head start."
        )} label={VALUE} />
      </>
    );
  }
  if (detail.kind === "api") {
    const a = detail.data;
    return (
      <>
        <Eyebrow>{t("Agence de Promotion d'Investissements · Benchmark international", "Investment Promotion Agency · International benchmark")}</Eyebrow>
        <DetailTitle>{a.full}</DetailTitle>
        <DetailTagline>{a.country} · {t("Référentiel d'attractivité internationale", "International attractiveness benchmark")}</DetailTagline>
        <ColsBlock cols={[
          { h: t("Pourquoi cette agence ?", "Why this agency?"), items: t("fr", "en") === "fr" ? [
            `${a.full} fait partie des agences de référence mondiale pour la promotion des investissements directs étrangers.`,
            "Buildfluence analyse en continu les méthodes, outils et succès de ces agences pour en transposer les meilleures pratiques au contexte marocain (AMDIE notamment).",
          ] : [
            `${a.full} is one of the world-leading agencies for the promotion of foreign direct investment.`,
            "Buildfluence continuously analyses these agencies' methods, tools and successes to transpose the best practices to the Moroccan context (AMDIE in particular).",
          ] },
          { h: t("Valeur Buildfluence dédiée", "Dedicated Buildfluence value"), items: [a.apport] },
        ]} />
        <BfApport text={t(
          "L'AMDIE n'a pas besoin de réinventer ce qui marche. Buildfluence livre les playbooks éprouvés des meilleures agences mondiales.",
          "AMDIE does not need to reinvent what works. Buildfluence delivers the proven playbooks of the world's best agencies."
        )} label={VALUE} />
      </>
    );
  }
  if (detail.kind === "coop") {
    const c = detail.data;
    return (
      <>
        <Eyebrow>{t("Coopération Internationale · Bailleur de fonds", "International Cooperation · Donor")}</Eyebrow>
        <DetailTitle>{c.full}</DetailTitle>
        <DetailTagline>{c.country} · {t("Financeur de projets stratégiques au Maroc", "Funder of strategic projects in Morocco")}</DetailTagline>
        <ColsBlock cols={[
          { h: t("Profil bailleur", "Donor profile"), items: t("fr", "en") === "fr" ? [
            `${c.full} est un bailleur clé du développement économique au Maroc.`,
            "Comprendre ses priorités, instruments et fenêtres de financement permet d'aligner les projets nationaux et privés sur ses cycles.",
          ] : [
            `${c.full} is a key donor of economic development in Morocco.`,
            "Understanding its priorities, instruments and financing windows makes it possible to align national and private projects with its cycles.",
          ] },
          { h: t("Valeur Buildfluence dédiée", "Dedicated Buildfluence value"), items: [c.apport] },
        ]} />
        <BfApport text={t(
          "Les bailleurs ne financent que les projets bien construits, bien narrés, bien timés. Buildfluence orchestre les trois.",
          "Donors only finance projects that are well-built, well-narrated and well-timed. Buildfluence orchestrates all three."
        )} label={VALUE} />
      </>
    );
  }
  if (detail.kind === "useCase") {
    const u = detail.data;
    return (
      <>
        <Eyebrow>{u.eyebrow}</Eyebrow>
        <DetailTitle>{u.title}</DetailTitle>
        <DetailTagline>{u.tagline}</DetailTagline>
        {u.meta && <MetaStrip items={u.meta} />}
        <ColsBlock cols={u.cols} />

        {u.timeline && (
          <div style={{ margin: "28px 0 0 0", padding: "20px 0 20px 28px", borderLeft: `2px solid ${C.gold}` }}>
            <h5 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 16, fontWeight: 600 }}>{t("Timeline stratégique", "Strategic timeline")}</h5>
            {u.timeline.map((tl, i) => (
              <div key={i} style={{ display: "flex", gap: 18, alignItems: "baseline", padding: "8px 0", borderBottom: i === u.timeline!.length - 1 ? "none" : `1px solid ${C.lineSoft}` }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.inkSoft, fontWeight: 600, minWidth: 56 }}>─ {tl.year}</span>
                <span style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 16, color: C.inkSoft, lineHeight: 1.45 }}>{tl.text}</span>
              </div>
            ))}
          </div>
        )}

        {u.observation && (
          <div style={{ margin: "28px 0", padding: 24, background: "rgba(201,168,76,0.04)", borderLeft: `3px solid ${C.gold}` }}>
            <h5 style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 18, fontWeight: 600 }}>{u.observation.title}</h5>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[u.observation.colA, u.observation.colB].map((col, ci) => (
                <div key={ci}>
                  <h6 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${C.gold}`, fontWeight: 600 }}>{col.h}</h6>
                  <ul className="list-none">
                    {col.items.map((it, i) => (
                      <li key={i} style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 14, color: C.ink, padding: "8px 0 8px 22px", borderBottom: i === col.items.length - 1 ? "none" : `1px solid ${C.lineSoft}`, position: "relative", lineHeight: 1.5 }}>
                        <span style={{ position: "absolute", left: 0, top: 8, color: C.gold, fontSize: 14 }}>→</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {u.bottomLogos && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", margin: "24px 0 0 0", paddingTop: 20, borderTop: `1px solid ${C.line}` }}>
            {u.bottomLogos.map((lg) => (
              <span key={lg.label} title={lg.label} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 110, height: 50, background: "#FFFFFF", border: `1px solid ${C.line}`, borderRadius: 2, padding: "6px 10px" }}>
                <img src={lg.src} alt={lg.label} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
              </span>
            ))}
          </div>
        )}

        <BfApport text={u.bfApport} label={VALUE} />
      </>
    );
  }
  if (detail.kind === "moroccoNow") {
    const fr = t("fr", "en") === "fr";
    const benchmarkRows = [
      { plat: "Invest Korea Plaza", url: "https://www.investkorea.org/ik-en/index.do?clickArea=enmain00002*", flag: "🇰🇷", country: fr ? "Corée du Sud" : "South Korea", tools: fr ? "Simulateur fiscal · Matchmaking · Suivi de dossier en temps réel" : "Tax simulator · Matchmaking · Real-time case tracking" },
      { plat: "Singapore EDB", url: "https://www.edb.gov.sg/", flag: "🇸🇬", country: fr ? "Singapour" : "Singapore", tools: "Sector dashboards · Partner finder · Tax & incentive calculator" },
      { plat: "Invest Egypt", url: "https://www.investinegypt.gov.eg/English/Pages/default.aspx", flag: "🇪🇬", country: fr ? "Égypte" : "Egypt", tools: "Project finder · Sector intelligence dashboards · Direct contact tools" },
    ];
    const pillars = fr ? [
      { num: "i.", h: "Intelligence dynamique", body: "Dashboards sectoriels en temps réel · Cartographie des opportunités · Veille réglementaire automatisée" },
      { num: "ii.", h: "Outils décisionnels", body: "Simulateur fiscal et social · Calculateur d'incitations · Comparateur multi-zones d'implantation" },
      { num: "iii.", h: "Matchmaking actif", body: "Mise en relation investisseur-écosystème · Identification des partenaires locaux · Routage automatisé vers les CRI compétents" },
      { num: "iv.", h: "Personnalisation profonde", body: "Parcours différenciés par profil investisseur · Recommandations sur-mesure · Suivi de dossier en temps réel" },
    ] : [
      { num: "i.", h: "Dynamic intelligence", body: "Real-time sectoral dashboards · Opportunity mapping · Automated regulatory watch" },
      { num: "ii.", h: "Decision tools", body: "Tax and social simulator · Incentive calculator · Multi-zone location comparator" },
      { num: "iii.", h: "Active matchmaking", body: "Investor-ecosystem matching · Local partner identification · Automated routing to relevant CRIs" },
      { num: "iv.", h: "Deep personalisation", body: "Differentiated journeys by investor profile · Tailor-made recommendations · Real-time case tracking" },
    ];
    const constats = fr ? [
      "Architecture essentiellement éditoriale : pages de présentation sectorielle, contenus institutionnels, sans interactivité dynamique disponible à ce jour",
      "Absence d'outils décisionnels : pas de simulateur fiscal, pas de matchmaking investisseur-écosystème, pas de dashboard sectoriel en temps réel",
      "Personnalisation limitée, l'expérience est uniforme, sans différenciation par profil investisseur (taille de ticket, secteur cible, géographie d'origine)",
    ] : [
      "Essentially editorial architecture: sectoral presentation pages, institutional content, with no dynamic interactivity available to date",
      "No decision tools: no tax simulator, no investor-ecosystem matchmaking, no real-time sectoral dashboard",
      "Limited personalisation: the experience is uniform, with no differentiation by investor profile (ticket size, target sector, geographic origin)",
    ];
    const constatsNum = ["i.", "ii.", "iii."];
    return (
      <>
        <Eyebrow>{t("— Écosystème institutionnel · Plateforme d'attractivité", "— Institutional ecosystem · Attractiveness platform")}</Eyebrow>
        <DetailTitle>Morocco Now</DetailTitle>
        <DetailTagline>{t("Plateforme officielle de promotion des Investissements Directs Étrangers opérée par l'AMDIE", "Official platform for the promotion of Foreign Direct Investment, operated by AMDIE")}</DetailTagline>
        <div style={{ marginBottom: 32, padding: "18px 22px", background: C.paperDeep, borderLeft: `3px solid ${C.gold}`, display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: 28, rowGap: 12 }}>
          {(fr ? [
            { l: "STATUT", v: "Vitrine internationale du Maroc auprès des investisseurs étrangers" },
            { l: "PÉRIMÈTRE", v: "Promotion sectorielle · Image-pays · Présentation de l'offre Maroc" },
            { l: "LANCEMENT", v: "2022 — Initiative gouvernementale de positionnement international" },
            { l: "AMBITION AFFICHÉE", v: "100 Mds$ d'IDE captés à horizon stratégique" },
          ] : [
            { l: "STATUS", v: "International showcase of Morocco for foreign investors" },
            { l: "PERIMETER", v: "Sectoral promotion · Country image · Presentation of the Morocco offer" },
            { l: "LAUNCH", v: "2022 — Governmental international positioning initiative" },
            { l: "STATED AMBITION", v: "USD 100 Bn of FDI captured by strategic horizon" },
          ]).map((m, i) => (
            <React.Fragment key={i}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, paddingTop: 3 }}>{m.l}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.navy, lineHeight: 1.5 }}>{m.v}</div>
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: 36 }}>
          <h4 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 600 }}>{t("— Lecture Buildfluence · État des lieux observable", "— Buildfluence reading · Observable status")}</h4>
          <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 17, color: C.inkSoft, lineHeight: 1.5, marginBottom: 20 }}>
            {t(
              "Une plateforme d'attractivité ne se juge pas à son ambition affichée mais aux outils qu'elle met à disposition de l'investisseur étranger qui la consulte.",
              "An attractiveness platform is judged not by its stated ambition but by the tools it makes available to the foreign investor who consults it."
            )}
          </p>
          <ul className="list-none">
            {constats.map((c, i) => (
              <li key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i === constats.length - 1 ? "none" : `1px solid ${C.lineSoft}` }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: C.gold, fontWeight: 600, minWidth: 24 }}>{constatsNum[i]}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.ink, lineHeight: 1.55 }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 40 }}>
          <h4 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 600 }}>{t("— Benchmark · Le standard des plateformes d'attractivité mondiales", "— Benchmark · The global standard of attractiveness platforms")}</h4>
          <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 17, color: C.inkSoft, lineHeight: 1.5, marginBottom: 18 }}>
            {t(
              "Quatre agences nationales d'attractivité ont posé le standard de marché. Voici ce qu'elles offrent à l'investisseur dès la première visite.",
              "Several national attractiveness agencies have set the market standard. Here is what they offer the investor from the very first visit."
            )}
          </p>
          <div style={{ overflowX: "auto", border: `1px solid ${C.paperDeep}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT_BODY, fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.paperDeep }}>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.navy, fontWeight: 600, borderBottom: `1px solid ${C.line}` }}>{t("Plateforme", "Platform")}</th>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.navy, fontWeight: 600, borderBottom: `1px solid ${C.line}` }}>{t("Pays", "Country")}</th>
                  <th style={{ textAlign: "left", padding: "12px 14px", fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.navy, fontWeight: 600, borderBottom: `1px solid ${C.line}` }}>{t("Outils interactifs disponibles", "Interactive tools available")}</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkRows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: i === benchmarkRows.length - 1 ? "none" : `1px solid ${C.paperDeep}` }}>
                    <td style={{ padding: "14px", color: C.navy, fontWeight: 600, verticalAlign: "top" }}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: C.navy, textDecoration: "underline", textDecorationColor: C.gold, textUnderlineOffset: 3 }}>{r.plat}</a>
                    </td>
                    <td style={{ padding: "14px", color: C.inkSoft, verticalAlign: "top", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: 18, marginRight: 8 }}>{r.flag}</span>{r.country}
                    </td>
                    <td style={{ padding: "14px", color: C.inkSoft, lineHeight: 1.5, verticalAlign: "top" }}>{r.tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 14, color: C.gold, marginTop: 14, lineHeight: 1.5 }}>
            {t(
              "Quatre plateformes publiques. Quatre niveaux de service que l'investisseur étranger considère désormais comme acquis.",
              "Public platforms. Service levels that the foreign investor now takes for granted."
            )}
          </p>
        </div>

        <div style={{ marginTop: 40 }}>
          <h4 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 600 }}>{t("— Cas d'usage type · Plateforme d'attractivité de nouvelle génération", "— Typical use case · Next-generation attractiveness platform")}</h4>
          <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 17, color: C.inkSoft, lineHeight: 1.5, marginBottom: 20 }}>
            {t(
              "Ce qu'une plateforme d'attractivité IDE de nouvelle génération devrait offrir, conçue selon les standards Buildfluence et les meilleures pratiques internationales :",
              "What a next-generation FDI attractiveness platform should offer, designed according to Buildfluence standards and international best practices:"
            )}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {pillars.map((p, i) => (
              <div key={i} style={{ background: C.paperDeep, border: `1px solid ${C.gold}`, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: C.gold, fontWeight: 600 }}>{p.num}</span>
                  <h5 style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: C.navy, fontWeight: 600, lineHeight: 1.2 }}>{p.h}</h5>
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.inkSoft, lineHeight: 1.55 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.navy, color: C.paper, padding: "26px 28px", marginTop: 36, position: "relative" }}>
          <span style={{ position: "absolute", top: 0, left: 0, width: 40, height: 1, background: C.gold }} />
          <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 17, color: "#ffffff", lineHeight: 1.55 }}>
            {fr ? (
              <>On ne capte pas un investisseur de 200 millions d'euros avec une plaquette numérique.<br />On le capte avec une plateforme interactive conçue pour décider vite : données précises, parcours personnalisés, réponses en temps réel.</>
            ) : (
              <>You don't capture a EUR 200 million investor with a digital brochure.<br />You capture them with an interactive platform built to decide fast: precise data, personalised journeys, real-time answers.</>
            )}
          </p>
        </div>
      </>
    );
  }
  if (detail.kind !== "logo") return null;
  const l = detail.data as Logo;
  return (
    <>
      <Eyebrow>AMDIE · MICEPP · Morocco Now</Eyebrow>
      <DetailTitle>{l.name}</DetailTitle>
      <DetailTagline>{l.full}</DetailTagline>
      <BfApport text={l.apport} label={VALUE} />
    </>
  );
};

/* ═══════════════ HERO SIGNALÉTIQUE ═══════════════ */
const Signaletique = () => {
  const { t } = useLanguage();
  const SECTORS = t("fr", "en") === "fr"
    ? ["Automobile", "Aéronautique", "Textile", "Agroalimentaire", "Pharma", "Outsourcing", "Digital & Tech", "Industrie navale", "EnR"]
    : ["Automotive", "Aerospace", "Textile", "Agri-food", "Pharma", "Outsourcing", "Digital & Tech", "Naval industry", "Renewables"];
  return (
    <aside style={{ background: C.paperDeep, border: `1px solid ${C.line}`, padding: "32px 28px", position: "relative" }}>
      <span style={{ position: "absolute", top: 0, left: 0, width: 50, height: 1, background: C.gold }} />
      <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 600 }}>{t("Fiche Signalétique", "Identification card")}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 18, fontWeight: 600, color: C.navy, marginBottom: 22, lineHeight: 1.2, paddingBottom: 14, borderBottom: `1px solid ${C.line}` }}>{t("Pilier II — Soft Power & Influence", "Pillar II — Soft Power & Influence")}</div>

      {[
        { l: t("Trilogie", "Trilogy"), v: <><em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>{t("Capter", "Capture")}</em> · <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>{t("Transformer", "Transform")}</em> · <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>{t("Influencer", "Influence")}</em></> },
        { l: t("Périmètre géographique", "Geographic perimeter"), v: t("Maroc + 28 territoires (10 partenaires · 18 concurrents)", "Morocco + 28 territories (10 partners · 18 competitors)") },
        { l: t("Écosystème activé", "Activated ecosystem"), v: t("8 sphères de diffusion · Gouv · Fédérations · Bailleurs · Médias", "8 diffusion spheres · Gov · Federations · Donors · Media") },
      ].map((r) => (
        <div key={r.l as string} style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${C.lineSoft}` }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, fontWeight: 500 }}>{r.l}</span>
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.navy, lineHeight: 1.4, fontWeight: 500 }}>{r.v}</span>
        </div>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, fontWeight: 500 }}>{t("9 Secteurs Stratégiques", "9 Strategic Sectors")}</span>
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          {SECTORS.map((s, i) => (
            <div key={s} style={{ background: C.paper, border: `1px solid ${C.line}`, padding: "8px 6px", textAlign: "center", minHeight: 52, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 8, letterSpacing: "0.15em", color: C.gold, fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.navy, lineHeight: 1.15, fontWeight: 500 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

/* ═══════════════ SECTION HEADER ═══════════════ */
const SectionHeader = ({ num, eyebrow, children, intro }: { num: string; eyebrow: string; children: React.ReactNode; intro: React.ReactNode }) => (
  <div className="sp-section-header mb-12">
    <div className="sp-section-num" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(48px,6vw,72px)", color: C.gold, fontWeight: 400, lineHeight: 0.9, fontStyle: "italic" }}>{num}</div>
    <div className="min-w-0">
      <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 500 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 600, color: C.navy, lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.015em" }}>{children}</h2>
      <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: "clamp(15px,1.6vw,20px)", color: C.inkSoft, maxWidth: 720, lineHeight: 1.5 }}>{intro}</p>
    </div>
  </div>
);

/* ═══════════════ SECTION 01 — MÉCANISME ═══════════════ */
type OpenDetail = (d: DetailKind) => void;

const SourceCard = ({ k, glyph, title, tagline, tags, mini, hum, open, srcMap }: {
  k: string; glyph: string; title: string; tagline: string;
  tags?: string[]; mini?: string[]; hum?: boolean; open: OpenDetail; srcMap: Record<string, SourceDetail>;
}) => {
  const { t } = useLanguage();
  return (
    <button
      onClick={() => open({ kind: "source", data: srcMap[k] })}
      className="w-full text-left transition-all"
      style={{
        background: C.navySoft, border: `1px solid ${hum ? "rgba(176,57,46,0.3)" : C.navyLine}`,
        padding: "22px 20px", marginBottom: 14, cursor: "pointer", display: "block",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(20,35,64,0.95)"; e.currentTarget.style.borderColor = hum ? "rgba(176,57,46,0.6)" : "rgba(201,168,76,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = C.navySoft; e.currentTarget.style.borderColor = hum ? "rgba(176,57,46,0.3)" : C.navyLine; }}
    >
      <div className="flex items-center gap-3.5 mb-2.5">
        <div style={{ width: 36, height: 36, border: `1px solid ${hum ? C.red : C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_DISPLAY, fontSize: 16, fontStyle: "italic", color: hum ? C.red : C.gold, flexShrink: 0, fontWeight: 500 }}>{glyph}</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 600, color: hum ? "#E8A89F" : C.paper, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</div>
      </div>
      <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 13, color: "rgba(244,241,234,0.6)", marginBottom: 12, lineHeight: 1.4 }}>{tagline}</p>
      {tags && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {tags.map((tg) => (
            <span key={tg} style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.08em", color: "rgba(244,241,234,0.6)", padding: "3px 8px", border: `1px solid ${hum ? "rgba(176,57,46,0.3)" : "rgba(244,241,234,0.15)"}`, textTransform: "uppercase" }}>{tg}</span>
          ))}
        </div>
      )}
      {mini && (
        <div className="flex flex-wrap items-center gap-2 pt-2.5" style={{ borderTop: "1px solid rgba(244,241,234,0.08)" }}>
          {mini.map((m) => {
            const src = SOURCE_LOGOS[m];
            return src ? (
              <span key={m} title={m} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 28, background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, padding: "3px 6px" }}>
                <img src={src} alt={m} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
              </span>
            ) : (
              <span key={m} style={{ fontFamily: FONT_MONO, fontSize: 9, color: "rgba(244,241,234,0.7)" }}>{m}</span>
            );
          })}
        </div>
      )}
      <div style={{ marginTop: 12, fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: hum ? "#E8A89F" : C.gold, opacity: 0.6 }}>{t("→ Explorer le pilier", "→ Explore pillar")}</div>
    </button>
  );
};

const DestCard = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={onClick ? "transition-all cursor-pointer" : "transition-all"}
    style={{ background: C.navySoft, border: `1px solid ${C.navyLine}`, padding: "22px 20px", marginBottom: 14 }}
    onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.background = "rgba(20,35,64,0.95)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; } }}
    onMouseLeave={(e) => { e.currentTarget.style.background = C.navySoft; e.currentTarget.style.borderColor = C.navyLine; }}
  >
    {children}
  </div>
);

const DestHeader = ({ glyph, title, sub }: { glyph: string; title: string; sub: string }) => (
  <>
    <div className="flex items-center gap-3.5 mb-2.5">
      <div style={{ width: 36, height: 36, border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_DISPLAY, fontSize: 14, fontStyle: "italic", color: C.gold, flexShrink: 0, fontWeight: 500 }}>{glyph}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 600, color: C.paper, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</div>
    </div>
    <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 12, color: "rgba(244,241,234,0.55)", lineHeight: 1.4, marginBottom: 12 }}>{sub}</p>
  </>
);

const LogoChip = ({ label, src, onClick }: { label: string; src?: string; onClick: () => void }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="transition-all"
    title={label}
    style={{ padding: src ? "6px 10px" : "4px 8px", cursor: "pointer", borderRadius: 2, background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: src ? 44 : 24, border: "1px solid rgba(10,22,40,0.08)" }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.92)"; e.currentTarget.style.borderColor = "rgba(10,22,40,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    {src ? (
      <img src={src} alt={label} style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block" }} />
    ) : (
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 600, color: C.navy, letterSpacing: "0.02em" }}>{label}</span>
    )}
  </button>
);

const FlagChip = ({ code, flag, label, onClick }: { code: string; flag: string; label: string; onClick: () => void }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="relative group transition-all"
    style={{ fontSize: 18, lineHeight: 1, cursor: "pointer", padding: 4, borderRadius: 2, background: "transparent", border: "none" }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.transform = "scale(1.3)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
    title={label}
    data-country={code}
  >
    {flag}
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100"
      style={{ padding: "4px 8px", background: C.navy, border: `1px solid ${C.gold}`, color: C.paper, fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.1em", zIndex: 10 }}>
      {label}
    </span>
  </button>
);

const colLabel: React.CSSProperties = {
  fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
  color: C.inkSoft, textAlign: "center", marginBottom: 8, paddingBottom: 16,
  borderBottom: "1px solid rgba(10,22,40,0.10)", position: "relative",
};

const ColHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={colLabel}>{children}</div>
  </div>
);

const MechanismSection = ({ open }: { open: OpenDetail }) => {
  const { t, lang } = useLanguage();
  const fr = lang === "fr";
  const srcMap = fr ? sourcesData : sourcesDataEn;
  const dstMap = fr ? destData : destDataEn;
  const cnMap = fr ? countries : countriesEn;
  const fdMap = fr ? fedData : fedDataEn;
  const apMap = fr ? apiData : apiDataEn;
  const cpMap = fr ? coopData : coopDataEn;
  const useCases = buildUseCaseData(lang);
  const keyCountries = ["FR","DE","US","GB","JP","CN","BE","NL","ES","KR"];
  const competitors = ["TR","IN","MX","VN","TN","EG","PL","CZ","TH","ZA","HU","SK","CL","BG","KE","LT","SN","RW"];
  return (
    <div style={{ background: "#EFEBE0", color: C.navy, padding: "clamp(48px,6vw,80px) 0", position: "relative", marginTop: 40 }}>
      <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)", opacity: 0.4 }} />
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
      <div className="sp-miniflow grid items-center gap-0 mx-auto mb-12 pb-12" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr", maxWidth: 920, borderBottom: "1px solid rgba(10,22,40,0.10)" }}>
        {[
          { num: t("Phase 01", "Phase 01"), label: t("Capter", "Capture"), desc: t("Veille, DDD, BI, HumInt", "Watch, DDD, BI, HumInt") },
          { num: t("Phase 02", "Phase 02"), label: t("Transformer", "Transform"), desc: t("Infrastructure décisionnelle", "Decision-making infrastructure") },
          { num: t("Phase 03", "Phase 03"), label: t("Influencer", "Influence"), desc: t("Diffusion & rayonnement", "Diffusion & reach") },
        ].map((s, i, arr) => (
          <React.Fragment key={s.label}>
            <div className="text-center px-4">
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", color: C.gold, marginBottom: 8 }}>{s.num}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 600, color: C.navy, marginBottom: 6, letterSpacing: "-0.01em" }}>{s.label}</div>
              <div style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 14, color: C.inkSoft, lineHeight: 1.4 }}>{s.desc}</div>
            </div>
            {i < arr.length - 1 && <div className="sp-miniflow-arrow" style={{ color: C.gold, fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 300, opacity: 0.6 }}>→</div>}
          </React.Fragment>
        ))}
      </div>

      <div className="text-center mb-12">
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>{t("Workflow propriétaire", "Proprietary workflow")}</div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 600, color: C.navy, marginBottom: 14, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
          {t("Mécanisme de", "Mechanism of")} <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>{t("Rayonnement & d'Attractivité", "Reach & Attractiveness")}</em>
        </h3>
        <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 18, color: C.inkSoft, maxWidth: 640, margin: "0 auto", lineHeight: 1.5 }}>
          {t(
            "Captation premium · Infrastructure décisionnelle Buildfluence · Diffusion vers un écosystème mondial.",
            "Premium capture · Buildfluence decision-making infrastructure · Diffusion to a global ecosystem."
          )}
        </p>
        <div style={{ marginTop: 20, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, opacity: 0.85 }}>{t("▸ Cliquez sur un bloc pour explorer", "▸ Click a block to explore")}</div>
      </div>

      <div className="sp-mech-grid" style={{ display: "grid", gridTemplateColumns: "320px 1fr 320px", gap: 32, alignItems: "start", marginBottom: 32 }}>
        <div className="sp-mech-col-left">
          <ColHeader>{t("Back-Office · Captation", "Back-Office · Capture")}</ColHeader>
          <SourceCard k="veille" glyph="i" srcMap={srcMap} title={t("Veille & Intelligence", "Watch & Intelligence")} tagline={t("Voir avant les autres. Détecter les signaux invisibles.", "See before others. Detect invisible signals.")} tags={[t("6 dimensions", "6 dimensions"), "NLP", t("Temps réel", "Real time")]} open={open} />
          <SourceCard k="ddd" glyph="ii" srcMap={srcMap} title="Deep Due Diligence" tagline={t("Sécuriser la décision dans des environnements incertains.", "Secure decisions in uncertain environments.")} mini={["OFAC","EU Sanctions","ICIJ","GAFI","PitchBook","D&B"]} open={open} />
          <SourceCard k="bi" glyph="iii" srcMap={srcMap} title="Business Intelligence" tagline={t("Lire la compétition avant qu'elle ne s'impose.", "Read the competition before it imposes itself.")} mini={["Growth Lab","Statista","fDi","World Bank","Harvard","ITC"]} open={open} />
          <SourceCard k="humint" glyph="iv" srcMap={srcMap} title={t("HumInt — Intelligence Humaine", "HumInt — Human Intelligence")} tagline={t("Activer le réseau qualifié. Comprendre les intentions réelles.", "Activate the qualified network. Understand real intentions.")} tags={[t("Analystes terrain", "Field analysts"), t("Sources primaires", "Primary sources")]} hum open={open} />
        </div>

        <div className="sp-mech-col-center flex flex-col items-center gap-6">
          <div className="w-full"><ColHeader>{t("Infrastructure Décisionnelle", "Decision-Making Infrastructure")}</ColHeader></div>
          <button
            onClick={() => open({ kind: "source", data: srcMap["bf-core"] })}
            className="bf-core-circle relative flex flex-col items-center justify-center transition-all"
            style={{
              width: 240, height: 240, borderRadius: "50%", background: "#FFFFFF",
              border: `2px solid rgba(201,168,76,0.4)`, cursor: "pointer",
              boxShadow: "0 0 0 8px rgba(201,168,76,0.05), 0 0 0 16px rgba(201,168,76,0.025)",
              animation: "bfPulse 3s ease-in-out infinite",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = "0 0 0 8px rgba(201,168,76,0.12), 0 0 0 16px rgba(201,168,76,0.06), 0 0 40px rgba(201,168,76,0.25)"; e.currentTarget.style.animation = "none"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 8px rgba(201,168,76,0.05), 0 0 0 16px rgba(201,168,76,0.025)"; e.currentTarget.style.animation = "bfPulse 3s ease-in-out infinite"; }}
            aria-label={t("Buildfluence — Infrastructure décisionnelle", "Buildfluence — Decision-making infrastructure")}
          >
            <img src={logoBuildfluence} alt="Buildfluence" style={{ width: 170, height: "auto", maxHeight: 170, objectFit: "contain", display: "block" }} />
          </button>

          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: C.gold, opacity: 0.6, lineHeight: 1 }}>↓</div>

          <div className="w-full text-center" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(10,22,40,0.10)", padding: "28px 24px" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 17, color: C.gold, lineHeight: 1.35, marginBottom: 14, fontWeight: 500 }}>{t(
              "Conception d'architecture pour transformer l'information en pouvoir décisionnel efficace. Buildfluence ne délivre pas des rapports volumineux, mais une capacité d'anticipation et d'influence.",
              "Architecture designed to turn information into effective decision-making power. Buildfluence does not deliver bulky reports, but a capacity for anticipation and influence."
            )}</p>
            <ul className="list-none text-left">
              {(fr ? [
                "Voir ce que les autres ne voient pas",
                "Décider avec un temps d'avance",
                "Neutraliser les risques invisibles",
                "Identifier les vrais leviers d'attractivité",
                "Transformer la visibilité en influence réelle",
              ] : [
                "See what others do not see",
                "Decide ahead of time",
                "Neutralise invisible risks",
                "Identify the real attractiveness levers",
                "Turn visibility into real influence",
              ]).map((it, i, arr) => (
                <li key={it} style={{ fontSize: 12, color: C.navy, padding: "8px 0 8px 18px", borderBottom: i === arr.length - 1 ? "none" : "1px solid rgba(10,22,40,0.08)", position: "relative", lineHeight: 1.4 }}>
                  <span style={{ position: "absolute", left: 0, color: C.gold }}>—</span>{it}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: C.gold, opacity: 0.6, lineHeight: 1 }}>↓</div>
          <div style={{ textAlign: "center", fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, opacity: 0.85 }}>{t("Visibilité — Rayonnement — Influence", "Visibility — Reach — Influence")}</div>
        </div>

        <div style={{ gridColumn: "3 / 4", gridRow: "1 / span 2" }}>
          <ColHeader>{t("Ecosystem · Diffusion", "Ecosystem · Diffusion")}</ColHeader>

          <DestCard>
            <DestHeader glyph="i" title={t("Use Case : Investissement au Maroc", "Use Case: Investment in Morocco")} sub={t("Écosystème institutionnel marocain · cliquez un acteur", "Moroccan institutional ecosystem · click an actor")} />
            <div className="sp-logo-grid pt-2.5" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, borderTop: "1px solid rgba(244,241,234,0.08)" }}>
              <LogoChip label="AMDIE" src={AMDIE_LOGOS.amdie} onClick={() => open({ kind: "useCase", data: useCases.amdie })} />
              <LogoChip label="MICEPP" src={AMDIE_LOGOS.micepp} onClick={() => open({ kind: "useCase", data: useCases.micepp })} />
              <LogoChip label="MCINET" src={AMDIE_LOGOS.mcinet} onClick={() => open({ kind: "useCase", data: useCases.mcinet })} />
              <LogoChip label="MedZ" src={AMDIE_LOGOS.medz} onClick={() => open({ kind: "useCase", data: useCases.medz })} />
              <LogoChip label="CRI" src={AMDIE_LOGOS.cri} onClick={() => open({ kind: "useCase", data: useCases.cri })} />
              <LogoChip label="Morocco Now" src={AMDIE_LOGOS.moroccoNow} onClick={() => open({ kind: "moroccoNow" })} />
            </div>
          </DestCard>

          <DestCard onClick={() => open({ kind: "dest", data: dstMap.gouv })}>
            <DestHeader glyph="ii" title={t("Gouvernement Marocain", "Moroccan Government")} sub={t("Agences d'État · Instances publiques · CRI", "State agencies · Public bodies · CRI")} />
          </DestCard>

          <DestCard>
            <DestHeader glyph="iii" title={t("Pays Clés", "Key Countries")} sub={t("10 partenaires stratégiques — cliquez un drapeau", "10 strategic partners — click a flag")} />
            <div className="flex flex-wrap gap-1 mt-2">
              {keyCountries.map((c) => (
                <FlagChip key={c} code={c} flag={cnMap[c].flag} label={cnMap[c].name} onClick={() => open({ kind: "country", data: cnMap[c] })} />
              ))}
            </div>
          </DestCard>

          <DestCard>
            <DestHeader glyph="iv" title={t("Pays Concurrents", "Competitor Countries")} sub={t("18 territoires scorés — cliquez un drapeau", "18 scored territories — click a flag")} />
            <div className="flex flex-wrap gap-1 mt-2">
              {competitors.map((c) => (
                <FlagChip key={c} code={c} flag={cnMap[c].flag} label={`${cnMap[c].name} · ${cnMap[c].score}/10`} onClick={() => open({ kind: "country", data: cnMap[c] })} />
              ))}
            </div>
          </DestCard>

          <DestCard>
            <DestHeader glyph="v" title={t("Fédérations Sectorielles", "Sectoral Federations")} sub={t("Partenaires & entreprises stratégiques — cliquez un acteur", "Strategic partners & companies — click an actor")} />
            <div className="sp-logo-grid pt-2.5" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, borderTop: "1px solid rgba(244,241,234,0.08)" }}>
              {Object.keys(fdMap).map((k) => (
                <LogoChip key={k} label={k.toUpperCase()} src={FED_LOGOS[k]} onClick={() => open({ kind: "fed", key: k, data: fdMap[k] })} />
              ))}
            </div>
          </DestCard>

          <DestCard>
            <DestHeader glyph="vi" title={t("Agences de Promotion d'Investissements", "Investment Promotion Agencies")} sub={t("Benchmark international — cliquez une agence", "International benchmark — click an agency")} />
            <div className="sp-logo-grid pt-2.5" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, borderTop: "1px solid rgba(244,241,234,0.08)" }}>
              {Object.entries(apMap).map(([k, v]) => (
                <LogoChip key={k} label={v.full} src={API_LOGOS[k]} onClick={() => open({ kind: "api", data: v })} />
              ))}
            </div>
          </DestCard>

          <DestCard>
            <DestHeader glyph="vii" title={t("Coopération Internationale", "International Cooperation")} sub={t("Bailleurs & financeurs — cliquez une institution", "Donors & funders — click an institution")} />
            <div className="sp-logo-grid pt-2.5" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, borderTop: "1px solid rgba(244,241,234,0.08)" }}>
              {Object.entries(cpMap).map(([k, v]) => (
                <LogoChip key={k} label={v.full} src={COOP_LOGOS[k]} onClick={() => open({ kind: "coop", data: v })} />
              ))}
            </div>
          </DestCard>

          <DestCard onClick={() => open({ kind: "dest", data: dstMap.medias })}>
            <DestHeader glyph="viii" title={t("Médias & Prescripteurs", "Media & Prescribers")} sub={t("Leaders d'opinion · Diaspora · Journalistes", "Opinion leaders · Diaspora · Journalists")} />
          </DestCard>
        </div>

        <div style={{ gridColumn: "1 / 3", gridRow: "2 / 3", marginTop: 8 }}>
          <CompetitiveLandscape variant="map" />
        </div>
      </div>

      <CompetitiveLandscape variant="sectors" />

      <div className="sp-mech-foot mt-8 pt-6" style={{ display: "grid", gridTemplateColumns: "320px 1fr 320px", gap: 32, borderTop: "1px solid rgba(10,22,40,0.10)" }}>
        {[
          t("Strategic Workflow · Veille & Intelligence", "Strategic Workflow · Watch & Intelligence"),
          t("Infrastructure Décisionnelle Souveraine", "Sovereign Decision-Making Infrastructure"),
          t("Diffusion · Inter & Intra · National & International", "Diffusion · Inter & Intra · National & International"),
        ].map((l) => (
          <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: C.inkSoft, textAlign: "center" }}>{l}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes bfPulse {
          0%, 100% { box-shadow: 0 0 0 8px rgba(201,168,76,0.05), 0 0 0 16px rgba(201,168,76,0.025); }
          50% { box-shadow: 0 0 0 12px rgba(201,168,76,0.08), 0 0 0 24px rgba(201,168,76,0.04); }
        }
        @media (max-width: 1100px) {
          .sp-mech-grid, .sp-mech-foot { grid-template-columns: 1fr !important; }
          .sp-mech-col-center { order: -1 !important; }
        }
        @media (max-width: 720px) {
          .sp-miniflow { grid-template-columns: 1fr !important; gap: 18px !important; }
          .sp-miniflow-arrow { transform: rotate(90deg); }
        }
      `}</style>
      </div>
    </div>
  );
};

/* ═══════════════ SECTION 02 — 3 AXES ═══════════════ */
const AxisCard = ({ eyebrow, roman, title, tagline, viz, items }: {
  eyebrow: string; roman: string; title: string; tagline: string; viz: React.ReactNode; items: string[];
}) => (
  <article className="relative flex flex-col transition-all hover:-translate-y-1.5" style={{ background: C.navy, color: C.paper, padding: "44px 32px", border: `1px solid ${C.navyLine}`, minHeight: 520 }}>
    <span className="absolute top-0 left-0 transition-all" style={{ width: 40, height: 1, background: C.gold }} />
    <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 28 }}>{eyebrow}</div>
    <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 36, color: C.gold, lineHeight: 1, marginBottom: 20, fontWeight: 400 }}>{roman}</div>
    <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 600, color: C.paper, lineHeight: 1.1, marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h3>
    <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 17, color: "rgba(244,241,234,0.65)", marginBottom: 30, lineHeight: 1.45 }}>{tagline}</p>
    <div className="flex items-center justify-center" style={{ height: 130, marginBottom: 26, border: "1px solid rgba(244,241,234,0.08)", background: "rgba(244,241,234,0.02)", padding: 18 }}>{viz}</div>
    <ul className="list-none mt-auto pt-5" style={{ borderTop: "1px solid rgba(244,241,234,0.1)" }}>
      {items.map((it) => (
        <li key={it} style={{ fontSize: 13, color: "rgba(244,241,234,0.78)", padding: "6px 0 6px 16px", lineHeight: 1.5, position: "relative" }}>
          <span style={{ position: "absolute", left: 0, color: C.gold }}>—</span>{it}
        </li>
      ))}
    </ul>
  </article>
);

const AxesSection = () => {
  const { t } = useLanguage();
  return (
  <section className="mt-32">
    <SectionHeader num="ii" eyebrow={t("Trois axes pour peser sur votre écosystème", "Three axes to weigh on your ecosystem")} intro={t("Chaque axe activable seul ou en combinaison. La somme structure votre soft power. La séquence le rend opérationnel.", "Each axis can be activated alone or in combination. The sum structures your soft power. The sequence makes it operational.")}>
      {t("Activer les", "Activate the")} <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>{t("leviers", "levers")}</em> {t("qui déplacent les décisions.", "that shift decisions.")}
    </SectionHeader>
    <div className="sp-tri-grid grid gap-6" style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
      <AxisCard
        eyebrow="S/I — Influence Intelligence" roman="I" title={t("Intelligence d'Influence", "Influence Intelligence")}
        tagline={t("Orienter les perceptions avant qu'elles ne deviennent des décisions.", "Steer perceptions before they become decisions.")}
        viz={
          <svg viewBox="0 0 240 110" width="100%" height="100%">
            <line x1="120" y1="55" x2="40" y2="25" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="40" y2="85" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="200" y2="25" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="200" y2="85" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="80" y2="55" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="160" y2="55" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <circle cx="40" cy="25" r="4" fill="#C9A84C" opacity="0.7" />
            <circle cx="40" cy="85" r="4" fill="#C9A84C" opacity="0.7" />
            <circle cx="200" cy="25" r="4" fill="#C9A84C" opacity="0.7" />
            <circle cx="200" cy="85" r="4" fill="#C9A84C" opacity="0.7" />
            <circle cx="80" cy="55" r="3" fill="#F4F1EA" opacity="0.6" />
            <circle cx="160" cy="55" r="3" fill="#F4F1EA" opacity="0.6" />
            <circle cx="120" cy="55" r="11" fill="none" stroke="#C9A84C" strokeWidth="1" />
            <circle cx="120" cy="55" r="5" fill="#C9A84C" />
            <text x="120" y="102" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#F4F1EA" opacity="0.5" letterSpacing="1">NARRATIVE NODES</text>
          </svg>
        }
        items={t("fr", "en") === "fr" ? [
          "Mapping des leaders d'opinion & relais médiatiques",
          "Identification des nœuds d'amplification narrative",
          "Cartographie alliances & rivalités narratives",
          "Synchronisation messages / relais / timing",
        ] : [
          "Mapping of opinion leaders & media relays",
          "Identification of narrative amplification nodes",
          "Mapping of narrative alliances & rivalries",
          "Synchronisation of messages / relays / timing",
        ]}
      />
      <AxisCard
        eyebrow="S/II — Political Intelligence" roman="II" title="Political Intelligence"
        tagline={t("Prendre un temps d'avance sur votre écosystème décisionnel.", "Stay one step ahead of your decision-making ecosystem.")}
        viz={
          <svg viewBox="0 0 240 110" width="100%" height="100%">
            <line x1="120" y1="15" x2="120" y2="100" stroke="#F4F1EA" strokeWidth="0.3" opacity="0.3" strokeDasharray="2,2" />
            <line x1="20" y1="55" x2="220" y2="55" stroke="#F4F1EA" strokeWidth="0.3" opacity="0.3" strokeDasharray="2,2" />
            <text x="20" y="18" fontFamily="JetBrains Mono" fontSize="6" fill="#F4F1EA" opacity="0.4" letterSpacing="0.5">{t("+ POUVOIR", "+ POWER")}</text>
            <text x="220" y="108" textAnchor="end" fontFamily="JetBrains Mono" fontSize="6" fill="#F4F1EA" opacity="0.4" letterSpacing="0.5">{t("+ INTÉRÊT", "+ INTEREST")}</text>
            <circle cx="180" cy="28" r="6" fill="#C9A84C" />
            <circle cx="160" cy="38" r="5" fill="#C9A84C" opacity="0.7" />
            <circle cx="140" cy="44" r="4" fill="#C9A84C" opacity="0.5" />
            <circle cx="195" cy="46" r="4" fill="#C9A84C" opacity="0.6" />
            <circle cx="80" cy="32" r="4" fill="#F4F1EA" opacity="0.5" />
            <circle cx="60" cy="70" r="3" fill="#F4F1EA" opacity="0.4" />
            <circle cx="170" cy="78" r="3" fill="#F4F1EA" opacity="0.4" />
            <circle cx="100" cy="82" r="2" fill="#F4F1EA" opacity="0.3" />
            <rect x="130" y="18" width="80" height="38" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,3" />
            <text x="170" y="14" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="#C9A84C" opacity="0.7" letterSpacing="1">{t("ZONE CRITIQUE", "CRITICAL ZONE")}</text>
          </svg>
        }
        items={t("fr", "en") === "fr" ? [
          "Cartographie des décideurs publics clés",
          "Lecture chaînes de décision formelles & informelles",
          "Identification points de blocage & leviers",
          "Production d'un Baromètre politique actionnable",
        ] : [
          "Mapping of key public decision-makers",
          "Reading of formal & informal decision chains",
          "Identification of blocking points & levers",
          "Production of an actionable Political Barometer",
        ]}
      />
      <AxisCard
        eyebrow="S/III — Territorial Lab" roman="III" title="Territorial Influence Lab"
        tagline={t("Piloter votre territoire vers l'attractivité et l'influence.", "Steer your territory towards attractiveness and influence.")}
        viz={
          <svg viewBox="0 0 240 110" width="100%" height="100%">
            <path d="M 20 35 Q 40 25, 60 35 L 70 55 Q 50 65, 30 60 Z" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="0.5" />
            <path d="M 90 30 Q 130 25, 160 35 L 170 60 Q 130 70, 90 55 Z" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="0.5" />
            <path d="M 180 40 Q 210 30, 225 45 L 220 70 Q 195 75, 180 65 Z" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="0.5" />
            <circle cx="50" cy="47" r="3" fill="#C9A84C" />
            <circle cx="125" cy="45" r="4" fill="#C9A84C" />
            <circle cx="200" cy="55" r="3" fill="#C9A84C" />
            <path d="M 50 47 Q 90 30, 125 45" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.6" />
            <path d="M 125 45 Q 165 30, 200 55" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.6" />
            <text x="120" y="95" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="#F4F1EA" opacity="0.4" letterSpacing="1">TERRITORIAL FOOTPRINT</text>
          </svg>
        }
        items={t("fr", "en") === "fr" ? [
          "Captation de l'intérêt des investisseurs",
          "Benchmark pays / régions concurrentes",
          "Stratégie de présence dans les forums internationaux",
          "Activation de think tanks & leaders d'opinion",
        ] : [
          "Capture of investor interest",
          "Benchmark of competing countries / regions",
          "Presence strategy in international forums",
          "Activation of think tanks & opinion leaders",
        ]}
      />
    </div>
  </section>
  );
};

/* ═══════════════ SECTION 03 — CASE FILE ═══════════════ */
const CaseFileSection = () => {
  const { t } = useLanguage();
  return (
  <section className="mt-32">
    <SectionHeader num="iii" eyebrow={t("Cas concret · Réalisation Buildfluence", "Concrete case · Buildfluence delivery")} intro={t(
      "Un dispositif d'intelligence permanent au service de l'attractivité économique nationale. Une démonstration concrète de ce que le mécanisme produit quand il s'incarne dans un projet structurant.",
      "A permanent intelligence setup at the service of national economic attractiveness. A concrete demonstration of what the mechanism produces when embodied in a structuring project."
    )}>
      {t("L'Observatoire", "The")} <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>{t("d'Investissement", "Investment Observatory")}</em>.
    </SectionHeader>

    <div className="relative" style={{ background: C.navy, color: C.paper, padding: "80px clamp(24px,4vw,64px)", border: `1px solid ${C.navyLine}` }}>
      <span className="absolute" style={{ top: 0, left: 0, width: 80, height: 1, background: C.gold }} />
      <span className="absolute" style={{ bottom: 0, right: 0, width: 80, height: 1, background: C.gold }} />

      <div className="sp-case-grid grid items-start gap-14" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 16 }}>{t("Pièce au dossier", "Case file entry")}</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 80, color: C.gold, lineHeight: 1, marginBottom: 28, fontWeight: 400 }}>III</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 600, color: C.paper, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.015em" }}>{t("Observer pour", "Observe to")} <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>{t("devancer", "outpace")}</em>.</h3>
          <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 19, color: "rgba(244,241,234,0.85)", lineHeight: 1.5 }}>
            {t(
              "Une infrastructure de veille permanente sur les flux d'investissement, les pays concurrents et les dynamiques narratives, pour transformer la promotion économique nationale en arme de précision.",
              "A permanent intelligence infrastructure on investment flows, competitor countries and narrative dynamics, to turn national economic promotion into a precision weapon."
            )}
          </p>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(244,241,234,0.5)", marginTop: 24 }}>{t("— Méthodologie Buildfluence · Architecture propriétaire", "— Buildfluence methodology · Proprietary architecture")}</div>
        </div>

        <div>
          {(t("fr", "en") === "fr" ? [
            { h: "Les piliers du projet", p: <>Radar stratégique continu sur 18 pays, mapping des décideurs économiques dans 10 pays partenaires, monitoring narratif et anticipation des dynamiques d'opinion, production d'un <a href="/barometre?lang=fr" target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper, textDecoration: "underline" }}>Baromètre d'Investissement actionnable</a> par les opérateurs publics et privés.</> },
            { h: "La maîtrise Buildfluence", p: <>Une <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>infrastructure technologique souveraine</em> couplée à une équipe d'analystes spécialisés. Croisement OSINT + HumInt + BI + IA augmentée. Capacité à délivrer en continu une <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>longueur d'avance stratégique</em> sur l'ensemble du périmètre couvert.</> },
            { h: "L'impact opérationnel", p: <>Les missions d'attractivité deviennent des <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>opérations chirurgicales</em>, briefées par de la donnée fraîche. La promotion économique passe de campagne ponctuelle à <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>infrastructure d'influence permanente</em>. Chaque décideur public dispose d'un cockpit dédié.</> },
          ] : [
            { h: "Project pillars", p: <>Continuous strategic radar on 18 countries, mapping of economic decision-makers in 10 partner countries, narrative monitoring and anticipation of opinion dynamics, production of an <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>actionable Investment Barometer</em> for public and private operators.</> },
            { h: "Buildfluence mastery", p: <>A <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>sovereign technological infrastructure</em> coupled with a team of specialised analysts. Cross-analysis of OSINT + HumInt + BI + augmented AI. Capacity to continuously deliver a <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>strategic head start</em> across the full perimeter covered.</> },
            { h: "Operational impact", p: <>Attractiveness missions become <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>surgical operations</em>, briefed by fresh data. Economic promotion shifts from one-off campaigns to <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>permanent influence infrastructure</em>. Each public decision-maker has a dedicated cockpit.</> },
          ]).map((b) => (
            <div key={b.h} className="mb-7">
              <h4 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>{b.h}</h4>
              <p style={{ fontSize: 15, color: "rgba(244,241,234,0.85)", lineHeight: 1.65 }}>{b.p}</p>
            </div>
          ))}

          <div className="grid grid-cols-3 gap-5 pt-8 mt-8" style={{ borderTop: "1px solid rgba(244,241,234,0.1)" }}>
            {(t("fr", "en") === "fr" ? [
              { num: "10", label: "Pays partenaires\ncartographiés" },
              { num: "18", label: "Concurrents\nscorés en continu" },
              { num: "∞", label: "Veille narrative\npermanente" },
            ] : [
              { num: "10", label: "Partner countries\nmapped" },
              { num: "18", label: "Competitors\ncontinuously scored" },
              { num: "∞", label: "Permanent\nnarrative watch" },
            ]).map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 600, color: C.gold, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,234,0.6)", lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-6" style={{ padding: "20px 24px", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 6 }}>{t("Accès Premium", "Premium Access")}</div>
              <div style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 16, color: C.paper, lineHeight: 1.4 }}>{t("Un espace dédié détaillera l'ensemble du dispositif, sa méthodologie et ses livrables.", "A dedicated area will detail the full setup, its methodology and its deliverables.")}</div>
            </div>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-acces-premium"))}
              style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, padding: "10px 16px", border: `1px solid ${C.gold}`, whiteSpace: "nowrap", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.navy; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; }}
            >{t("→ Accès réservé", "→ Restricted access")}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

/* ═══════════════ SECTION 04 — POCS ═══════════════ */
const PocsSection = () => {
  const { t } = useLanguage();
  const POCS = t("fr", "en") === "fr" ? [
    { num: "i", eyebrow: "Express", title: "POC Express", duration: "— 2 à 4 semaines", desc: "Cartographie d'influence ciblée sur un sujet, un territoire ou un dossier. Livrable opérationnel rapide pour valider la pertinence de la démarche avant déploiement large." },
    { num: "ii", eyebrow: "Pilot", title: "Pilot Programme", duration: "— 2 à 4 mois", desc: "Déploiement structuré sur un périmètre élargi. Combinaison Veille + DDD + BI + HumInt avec dashboards mensuels et points stratégiques réguliers." },
    { num: "iii", eyebrow: "Infrastructure", title: "Infrastructure Souveraine", duration: "— Engagement annuel", desc: "Mise en place d'un dispositif d'intelligence permanent. Observatoire dédié, équipe d'analystes, infrastructure technologique sur-mesure intégrée à vos process décisionnels." },
  ] : [
    { num: "i", eyebrow: "Express", title: "Express POC", duration: "— 2 to 4 weeks", desc: "Targeted influence mapping on a topic, territory or file. Quick operational deliverable to validate the relevance of the approach before broad deployment." },
    { num: "ii", eyebrow: "Pilot", title: "Pilot Program", duration: "— 2 to 4 months", desc: "Structured deployment over an extended perimeter. Combination of Watch + DDD + BI + HumInt with monthly dashboards and regular strategic checkpoints." },
    { num: "iii", eyebrow: "Infrastructure", title: "Sovereign Infrastructure", duration: "— Annual engagement", desc: "Implementation of a permanent intelligence setup. Dedicated observatory, team of analysts, tailor-made technological infrastructure integrated into your decision processes." },
  ];
  return (
  <section className="mt-32">
    <SectionHeader num="iv" eyebrow={t("Modélisations & POCs", "Models & POCs")} intro={t("Choisissez le format adapté à votre maturité. Chacun est conçu pour produire un résultat fiable dès le premier mois.", "Choose the format suited to your maturity. Each is designed to produce a reliable result from the first month.")}>
      {t("Trois portes d'entrée pour", "Three entry points to")} <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>{t("activer", "activate")}</em>.
    </SectionHeader>
    <div className="sp-tri-grid grid gap-6" style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
      {POCS.map((p) => (
        <article key={p.num} className="relative overflow-hidden transition-all hover:-translate-y-1" style={{ background: C.paperDeep, border: `1px solid ${C.line}`, padding: "40px 32px" }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 64, color: C.gold, lineHeight: 0.9, marginBottom: 20, fontWeight: 400 }}>{p.num}</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, marginBottom: 8 }}>{p.eyebrow}</div>
          <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 600, color: C.navy, marginBottom: 14, lineHeight: 1.15, letterSpacing: "-0.01em" }}>{p.title}</h4>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.gold, marginBottom: 18, letterSpacing: "0.05em" }}>{p.duration}</div>
          <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.65 }}>{p.desc}</p>
        </article>
      ))}
    </div>
  </section>
  );
};

/* ═══════════════ CHUTE FINALE ═══════════════ */
const ClosingSection = () => {
  const { t } = useLanguage();
  const CLOSINGS = t("fr", "en") === "fr" ? [
    { key: "a", label: "Compétitivité", title: <>Quand vos concurrents <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>réagissent</em>,<br />vous avez déjà pris une longueur d'avance.</> },
    { key: "b", label: "Attractivité", title: <>Capter, transformer, <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>influencer</em>.<br />Le triptyque d'une souveraineté décisionnelle.</> },
    { key: "c", label: "Rayonnement", title: <>Le rayonnement <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>ne se proclame pas</em>.<br />Il se construit, s'orchestre, se mesure.</> },
  ] : [
    { key: "a", label: "Competitiveness", title: <>By the time your competitors <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>react</em>,<br />you are already one step ahead.</> },
    { key: "b", label: "Attractiveness", title: <>Capture, transform, <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>influence</em>.<br />The triptych of decision-making sovereignty.</> },
    { key: "c", label: "Reach", title: <>Reach <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>is not proclaimed</em>.<br />It is built, orchestrated, measured.</> },
  ];
  const [opt, setOpt] = useState("a");
  const current = CLOSINGS.find((c) => c.key === opt)!;
  return (
    <section className="relative mt-32 text-center" style={{ background: C.navy, color: C.paper, padding: "120px clamp(24px,5vw,60px)" }}>
      <span className="absolute left-1/2 -translate-x-1/2" style={{ top: 60, width: 80, height: 1, background: C.gold }} />
      <span className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 60, width: 80, height: 1, background: C.gold }} />

      <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: 28 }}>{t("Pilier II — Soft Power & Influence / Synthèse", "Pillar II — Soft Power & Influence / Synthesis")}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-7 text-left"
          style={{ maxWidth: 920, padding: "24px 32px", border: "1px solid rgba(201,168,76,0.25)", background: "rgba(201,168,76,0.02)" }}
        >
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>{current.label}</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, color: C.paper, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{current.title}</h3>
        </motion.div>
      </AnimatePresence>

      <div className="inline-flex gap-2 mt-6 p-1.5" style={{ border: "1px solid rgba(244,241,234,0.15)", borderRadius: 2 }}>
        {CLOSINGS.map((c) => (
          <button
            key={c.key}
            onClick={() => setOpt(c.key)}
            className="transition-all"
            style={{
              padding: "8px 16px", background: opt === c.key ? C.gold : "transparent", border: "none", cursor: "pointer",
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
              color: opt === c.key ? C.navy : "rgba(244,241,234,0.5)", fontWeight: opt === c.key ? 600 : 400,
            }}
          >{c.label}</button>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════ MAIN PAGE ═══════════════ */
const SoftPowerInfluence = () => {
  const { t, lang } = useLanguage();
  const [detail, setDetail] = useState<DetailKind | null>(null);
  const [f1Open, setF1Open] = useState(false);
  const open: OpenDetail = (d) => setDetail(d);
  const close = () => setDetail(null);

  useEffect(() => {
    document.title = lang === "fr"
      ? "Soft Power & Influence — Buildfluence"
      : "Soft Power & Influence — Buildfluence";
    const meta = document.querySelector('meta[name="description"]');
    const desc = lang === "fr"
      ? "Pilier II — Capter, transformer, influencer. Mécanisme propriétaire de rayonnement et d'attractivité Buildfluence."
      : "Pillar II — Capture, transform, influence. Buildfluence's proprietary reach and attractiveness mechanism.";
    if (meta) meta.setAttribute("content", desc);
  }, [lang]);

  return (
    <div className="min-h-screen" style={{ background: "#FAF6ED" }}>
      <Navbar />
      <main className="pt-24">
        <section className="sp-section">
          <div className="sp-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 pb-5" style={{ borderBottom: `1px solid ${C.line}`, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.inkMute, fontWeight: 500 }}>
                <span style={{ color: C.gold }}>Buildfluence Intelligence Hub</span>
                <span style={{ color: C.gold }}>{t("— Pilier II / Soft Power & Influence", "— Pillar II / Soft Power & Influence")}</span>
                <span style={{ marginLeft: "auto", color: C.gold }}>2026</span>
              </div>

              <div className="sp-hero-grid">
                <div className="min-w-0">
                  <div className="mb-5 inline-flex items-center" style={{ padding: "10px 18px", border: `1px solid ${C.gold}`, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, fontWeight: 500 }}>
                    {t("Pilier II — Soft Power & Influence", "Pillar II — Soft Power & Influence")}
                  </div>
                  <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(40px, 5.4vw, 72px)", fontStyle: "italic", color: C.navy, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                    Soft Power & <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>Influence</em>
                  </h1>
                  <p style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: 18, marginTop: 24, color: C.inkSoft, fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 20, lineHeight: 1.5, maxWidth: 720 }}>
                    {t(
                      "Structurer et piloter les dynamiques d'influence pour transformer votre position en avantage compétitif durable.",
                      "Structure and steer influence dynamics to turn your position into a lasting competitive advantage."
                    )}
                  </p>
                  <div className="mt-8">
                    <button onClick={() => setF1Open(true)} className="btn-gold">{t("Parler de mon projet", "Talk about my project")}</button>
                  </div>
                </div>
                <div className="min-w-0">
                  <Signaletique />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="sp-section sp-section--tight">
          <div className="sp-container">
            <SectionHeader num="i" eyebrow={t("Mécanisme d'Attractivité & d'Influence", "Attractiveness & Influence Mechanism")} intro={t("fr", "en") === "fr" ? (
              <><em style={{ fontStyle: "italic" }}>L'influence ne se décrète pas, elle s'ingénie…</em><br />— Une infrastructure souveraine au cœur des Process<br />— Un back-office Expert qui capte et décrypte en temps réel,<br />— Un écosystème qui projette votre puissance décisionnelle au-delà des frontières.</>
            ) : (
              <><em style={{ fontStyle: "italic" }}>Influence is not decreed, it is engineered…</em><br />— A sovereign infrastructure at the core of Processes<br />— An expert back-office that captures and decodes in real time,<br />— An ecosystem that projects your decision-making power beyond borders.</>
            )}>
              {t("Capter, transformer,", "Capture, transform,")} <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>{t("influencer", "influence")}</em>.
            </SectionHeader>
          </div>
          <div className="sp-fullbleed">
            <MechanismSection open={open} />
          </div>
        </section>

        <div className="sp-container">
          <AxesSection />
          <CaseFileSection />
          <PocsSection />
        </div>

        <div className="sp-fullbleed sp-fullbleed--mt">
          <ClosingSection />
        </div>
      </main>

      <CTAFooter />

      <DetailModal detail={detail} onClose={close} />
      <FormStrategicExchange open={f1Open} onClose={() => setF1Open(false)} />

      <style>{`
        .sp-container { max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px); }
        .sp-section { padding: 0 0 40px; }
        .sp-section--tight { padding-bottom: 0; }
        .sp-fullbleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
        .sp-fullbleed--mt { margin-top: 80px; }
        .sp-hero-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .sp-section-header { display: grid; grid-template-columns: 100px 1fr; gap: 32px; align-items: start; }
        @media (max-width: 1100px) {
          .sp-hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .sp-tri-grid { grid-template-columns: 1fr !important; }
          .sp-case-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .sp-section-header { grid-template-columns: 1fr; gap: 12px; }
          .sp-section-num { font-size: 56px !important; }
          .sp-tri-grid { grid-template-columns: 1fr !important; }
          .sp-case-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
};

export default SoftPowerInfluence;
