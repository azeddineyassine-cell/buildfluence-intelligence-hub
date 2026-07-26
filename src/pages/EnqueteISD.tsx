import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Radar as RadarIcon, Map, Target, Gauge, ListOrdered, Route, ShieldAlert } from "lucide-react";
import logoBuildfluence from "@/assets/Logo_Buildfluence.png";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Libellés spécifiques par (question, ancrage) pour les champs de précision.
// Si absent, un libellé générique « Précisez / Please specify » est utilisé.
const PRECISION_LABELS: Record<string, Record<number, { fr: string; en: string }>> = {
  q1: { 3: { fr: "Quel dispositif ?", en: "Which setup?" }, 4: { fr: "Lesquels ?", en: "Which ones?" } },
  q2: { 2: { fr: "Par quel moyen ?", en: "By what means?" }, 3: { fr: "Précisez", en: "Please specify" }, 4: { fr: "Précisez", en: "Please specify" } },
  q3: { 3: { fr: "Quel statut ?", en: "What status?" } },
  q5: { 3: { fr: "Par quel moyen ?", en: "By what means?" }, 4: { fr: "Quelle solution ?", en: "Which solution?" } },
  q6: { 4: { fr: "Précisez", en: "Please specify" } },
  q7: { 3: { fr: "Quelle solution ?", en: "Which solution?" }, 4: { fr: "Quels outils ?", en: "Which tools?" } },
  q8: { 4: { fr: "Précisez", en: "Please specify" } },
  q9: { 4: { fr: "Lesquels ?", en: "Which ones?" } },
  q10: { 4: { fr: "Précisez", en: "Please specify" } },
  q11: { 3: { fr: "Quelles solutions ? Service ou personnels dédiés ?", en: "Which solutions? Dedicated team or staff?" }, 4: { fr: "Précisez", en: "Please specify" } },
  q12: { 4: { fr: "Quel outil ?", en: "Which tool?" } },
};

// Retire les parenthèses de repérage des intitulés d'options avant affichage.
const stripParens = (s: string) => s.replace(/\s*\([^)]*\)/g, "").replace(/\s+\./g, ".").trim();

// =========================================================================
// Enquête ISD — parcours linéaire, un instrument, deux finalités.
// Aucun score, niveau ou comparatif n'est calculé ou affiché côté client.
// Toute la logique de scoring vit exclusivement dans l'Edge function.
// =========================================================================

const CREAM = "#FAF6ED";
const GOLD = "#C9A84C";
const NAVY = "#1F3A5F";

type Scale = 0 | 1 | 2 | 3 | 4 | null;

const t2 = (fr: string, en: string, lang: "fr" | "en") => (lang === "fr" ? fr : en);

// --- Options des menus (Écran 1) ---
const SECTEURS = {
  fr: ["Automobile", "Aéronautique", "Textile", "Agroalimentaire", "Industrie pharmaceutique", "Outsourcing", "Digital & Tech", "Industrie navale", "Énergies renouvelables", "Autre"],
  en: ["Automotive", "Aerospace", "Textile", "Agri-food", "Pharmaceutical industry", "Outsourcing", "Digital & Tech", "Naval industry", "Renewable energies", "Other"],
};
const TYPES_ORG = {
  fr: ["Grande entreprise", "Établissement public", "Ministère", "Fonds d'investissement", "Banque", "Cabinet de conseil", "Fédération professionnelle", "Autre"],
  en: ["Large enterprise", "Public institution", "Ministry", "Investment fund", "Bank", "Consulting firm", "Professional federation", "Other"],
};
const FONCTIONS = {
  fr: ["Direction générale", "Direction stratégie", "Risk Manager", "Responsable communication", "Autre"],
  en: ["Executive Management", "Strategy Direction", "Risk Manager", "Communications Lead", "Other"],
};

// --- Ancrages échelle 0-4 par question (FR/EN, logique de maturité) ---
// Certains ancrages contiennent une mention entre parenthèses de type
// « (Précisez) » ou « (Lesquels) » : lorsqu'ils sont sélectionnés, un champ
// texte libre s'affiche. Ces précisions taguent la réponse mais ne notent pas.
type QDef = {
  key: string;
  pillar: 1 | 3 | 4;
  numero: string;
  dim: { fr: string; en: string };
  question: { fr: string; en: string };
  anchors: { fr: string[]; en: string[] };
  // Indices d'ancrages qui déclenchent un champ « précisez » (texte libre).
  precisionAt?: number[];
};

const QUESTIONS: QDef[] = [
  {
    key: "q1", pillar: 1, numero: "Q1",
    dim: { fr: "Anticipation", en: "Anticipation" },
    question: {
      fr: "Comment anticipez-vous les ruptures et évolutions de votre environnement ?",
      en: "How do you anticipate disruptions and shifts in your environment?",
    },
    anchors: {
      fr: [
        "Aucune anticipation.",
        "Anticipation informelle, au coup par coup.",
        "Démarches ponctuelles (études, consultants).",
        "Dispositif interne régulier de prospective. (Précisez)",
        "Veille prospective continue, outils dédiés et alertes automatisées. (Lesquels)",
      ],
      en: [
        "No anticipation.",
        "Informal anticipation, case by case.",
        "Occasional initiatives (studies, consultants).",
        "Regular in-house foresight setup. (Please specify)",
        "Continuous foresight, dedicated tools and automated alerts. (Which ones)",
      ],
    },
    precisionAt: [3, 4],
  },
  {
    key: "q2", pillar: 1, numero: "Q2",
    dim: { fr: "Donnée dans la décision", en: "Data in decision-making" },
    question: {
      fr: "Quelle place la donnée occupe-t-elle dans vos décisions ?",
      en: "What place does data hold in your decisions?",
    },
    anchors: {
      fr: [
        "Décisions fondées principalement sur l'intuition.",
        "Données utilisées occasionnellement, après coup.",
        "Données consultées régulièrement. (Par quel moyen)",
        "Données structurant la majorité des décisions. (Précisez)",
        "Décisions pilotées par tableaux de bord et analyses avancées. (Plus de précisions)",
      ],
      en: [
        "Decisions mainly based on intuition.",
        "Data used occasionally, after the fact.",
        "Data consulted regularly. (By what means)",
        "Data structuring most decisions. (Please specify)",
        "Decisions steered by dashboards and advanced analytics. (More detail)",
      ],
    },
    precisionAt: [2, 3, 4],
  },
  {
    key: "q3", pillar: 1, numero: "Q3",
    dim: { fr: "Gouvernance de l'information", en: "Information governance" },
    question: {
      fr: "Comment la responsabilité de l'information stratégique est-elle portée ?",
      en: "How is responsibility for strategic information carried?",
    },
    anchors: {
      fr: [
        "Aucun responsable identifié.",
        "Responsabilités dispersées.",
        "Référent identifié.",
        "Fonction dédiée. (Statut)",
        "Gouvernance pilotée au niveau Direction / COMEX.",
      ],
      en: [
        "No identified owner.",
        "Scattered responsibilities.",
        "Identified referent.",
        "Dedicated function. (Status)",
        "Governance steered at Executive / ExCom level.",
      ],
    },
    precisionAt: [3],
  },
  {
    key: "q4", pillar: 3, numero: "Q4",
    dim: { fr: "Process d'intelligence économique", en: "Business intelligence process" },
    question: {
      fr: "Quel est le degré de formalisation de votre processus d'IE ?",
      en: "How formal is your business-intelligence process?",
    },
    anchors: {
      fr: [
        "Aucun processus.",
        "Quelques pratiques isolées.",
        "Processus documentés.",
        "Processus intégrés dans plusieurs directions.",
        "Processus industrialisés avec indicateurs de performance.",
      ],
      en: [
        "No process.",
        "A few isolated practices.",
        "Documented processes.",
        "Processes integrated across several departments.",
        "Industrialized processes with performance indicators.",
      ],
    },
  },
  {
    key: "q5", pillar: 3, numero: "Q5",
    dim: { fr: "Cartographie des risques", en: "Risk mapping" },
    question: {
      fr: "Comment votre cartographie des risques est-elle tenue ?",
      en: "How is your risk map maintained?",
    },
    anchors: {
      fr: [
        "Aucune cartographie.",
        "Réalisée après incident.",
        "Mise à jour occasionnelle.",
        "Révision régulière. (Par quel moyen)",
        "Cartographie dynamique à suivi permanent, pilotée par un logiciel GRC (Gouvernance, Risques, Conformité) ou équivalent. (Précisez la solution)",
      ],
      en: [
        "No map.",
        "Produced after an incident.",
        "Occasional updates.",
        "Regular reviews. (By what means)",
        "Dynamic, continuously monitored map, steered by GRC software or equivalent. (Please specify the solution)",
      ],
    },
    precisionAt: [3, 4],
  },
  {
    key: "q6", pillar: 3, numero: "Q6",
    dim: { fr: "Gestion des crises", en: "Crisis management" },
    question: {
      fr: "Quelle est votre préparation à la gestion de crise ?",
      en: "How prepared are you for crisis management?",
    },
    anchors: {
      fr: [
        "Aucun dispositif.",
        "Réaction improvisée.",
        "Procédure documentée.",
        "Cellule de crise organisée.",
        "Dispositif testé régulièrement avec exercices. (Précisez)",
      ],
      en: [
        "No setup.",
        "Improvised response.",
        "Documented procedure.",
        "Organized crisis unit.",
        "Regularly tested setup with exercises. (Please specify)",
      ],
    },
    precisionAt: [4],
  },
  {
    key: "q7", pillar: 3, numero: "Q7",
    dim: { fr: "Détection des signaux faibles", en: "Weak signal detection" },
    question: {
      fr: "Comment captez-vous les signaux faibles ?",
      en: "How do you capture weak signals?",
    },
    anchors: {
      fr: [
        "Aucun suivi.",
        "Détection au hasard.",
        "Signalement manuel.",
        "Veille organisée. (Quelle solution)",
        "Détection assistée par IA ou automatisation. (Quels outils)",
      ],
      en: [
        "No tracking.",
        "Random detection.",
        "Manual reporting.",
        "Organized monitoring. (Which solution)",
        "AI-assisted or automated detection. (Which tools)",
      ],
    },
    precisionAt: [3, 4],
  },
  {
    key: "q8", pillar: 3, numero: "Q8",
    dim: { fr: "Dispositifs de résilience", en: "Resilience arrangements" },
    question: {
      fr: "Quel est votre niveau de résilience face à un choc majeur ?",
      en: "What is your resilience level in the face of a major shock?",
    },
    anchors: {
      fr: [
        "Aucun plan.",
        "Quelques mesures.",
        "Plans documentés.",
        "Plans testés régulièrement.",
        "Résilience intégrée avec amélioration continue. (Précisez)",
      ],
      en: [
        "No plan.",
        "A few measures.",
        "Documented plans.",
        "Regularly tested plans.",
        "Integrated resilience with continuous improvement. (Please specify)",
      ],
    },
    precisionAt: [4],
  },
  {
    key: "q9", pillar: 4, numero: "Q9",
    dim: { fr: "Évaluation des investisseurs", en: "Investor evaluation" },
    question: {
      fr: "Comment évaluez-vous la fiabilité d'un investisseur ou partenaire financier ?",
      en: "How do you assess the reliability of an investor or financial partner?",
    },
    anchors: {
      fr: [
        "Aucune évaluation.",
        "Vérifications ponctuelles.",
        "Évaluation selon quelques critères.",
        "Due diligence structurée.",
        "Évaluation multicritère continue avec outils spécialisés. (Lesquels)",
      ],
      en: [
        "No evaluation.",
        "Occasional checks.",
        "Evaluation on a few criteria.",
        "Structured due diligence.",
        "Continuous multi-criteria evaluation with specialized tools. (Which ones)",
      ],
    },
    precisionAt: [4],
    // Note: l'ancrage 3 déclenche un sous-choix Interne/Externe + Marocain/Étranger
    // géré spécifiquement dans QuestionScreen.
  },
  {
    key: "q10", pillar: 4, numero: "Q10",
    dim: { fr: "Vérification des partenaires", en: "Partner verification" },
    question: {
      fr: "Comment vérifiez-vous vos partenaires avant engagement ?",
      en: "How do you verify partners before commitment?",
    },
    anchors: {
      fr: [
        "Aucune vérification.",
        "Recherche internet.",
        "Vérifications documentaires.",
        "Due diligence systématique.",
        "Surveillance continue des partenaires. (Précisez)",
      ],
      en: [
        "No verification.",
        "Internet search.",
        "Documentary checks.",
        "Systematic due diligence.",
        "Continuous partner monitoring. (Please specify)",
      ],
    },
    precisionAt: [4],
  },
  // Ordre d'affichage : Compliance (numéro Q11) AVANT Influence (numéro Q12)
  // Colonnes DB conservées : q12 = Compliance, q11 = Influence.
  {
    key: "q12", pillar: 4, numero: "Q11",
    dim: { fr: "Compliance et risques tiers", en: "Compliance and third-party risks" },
    question: {
      fr: "Comment maîtrisez-vous les risques de conformité liés à vos tiers ?",
      en: "How do you master compliance risks related to your third parties?",
    },
    anchors: {
      fr: [
        "Aucune maîtrise des risques tiers.",
        "Traitement réactif, après incident ou contrôle.",
        "Démarche de conformité documentée, non étendue aux tiers.",
        "Dispositif de conformité tiers formalisé et piloté.",
        "Maîtrise continue, outillée et auditée. (Précisez l'outil)",
      ],
      en: [
        "No control over third-party risks.",
        "Reactive handling, after incident or audit.",
        "Documented compliance approach, not extended to third parties.",
        "Formalized and steered third-party compliance setup.",
        "Continuous, tool-supported and audited control. (Please specify the tool)",
      ],
    },
    precisionAt: [4],
  },
  {
    key: "q11", pillar: 4, numero: "Q12",
    dim: { fr: "Influence et rayonnement", en: "Influence and outreach" },
    question: {
      fr: "Comment pilotez-vous votre influence et votre rayonnement ?",
      en: "How do you steer your influence and outreach?",
    },
    anchors: {
      fr: [
        "Aucune stratégie.",
        "Communication réactive.",
        "Actions ponctuelles d'influence.",
        "Stratégie structurée. (Quelles solutions ? Service ou personnels dédiés ?)",
        "Influence pilotée avec indicateurs et veille réputationnelle. (Plus de précisions)",
      ],
      en: [
        "No strategy.",
        "Reactive communication.",
        "Occasional influence actions.",
        "Structured strategy. (Which solutions? Dedicated team or staff?)",
        "Influence steered with indicators and reputation monitoring. (More detail)",
      ],
    },
    precisionAt: [3, 4],
  },
];

const LEVEL_LABELS = { fr: ["0 Embryonnaire", "1 Réactif", "2 Émergent", "3 Structuré", "4 Souverain"], en: ["0 Embryonic", "1 Reactive", "2 Emerging", "3 Structured", "4 Sovereign"] };

const VEILLE_THEMES = {
  fr: ["Concurrentielle", "Sectorielle", "Géopolitique / réglementaire", "Technologique", "Image / réputation", "Appels d'offres", "Brevets / propriété intellectuelle", "Aucune"],
  en: ["Competitive", "Sectoral", "Geopolitical / regulatory", "Technological", "Image / reputation", "Tenders", "Patents / IP", "None"],
};
const VEILLE_OUTIL = {
  fr: ["Aucun", "Alertes manuelles", "Plateforme de veille dédiée", "Prestataire externe", "Cellule interne outillée"],
  en: ["None", "Manual alerts", "Dedicated monitoring platform", "External provider", "In-house equipped unit"],
};
const VEILLE_ORG = {
  fr: ["Aucune", "Chacun fait sa veille", "Référent informel", "Cellule interne dédiée", "Externalisée", "Mixte"],
  en: ["None", "Everyone monitors on their own", "Informal referent", "Dedicated in-house unit", "Outsourced", "Mixed"],
};
const VEILLE_CAPI = {
  fr: ["Aucune", "Notes internes ponctuelles", "Base de connaissance partagée", "Newsletter ou magazine interne", "Diffusion externe (rayonnement)"],
  en: ["None", "Occasional internal notes", "Shared knowledge base", "Internal newsletter or magazine", "External publication (outreach)"],
};


const APPRO_FREQ = {
  fr: ["Jamais", "Ponctuellement", "Annuellement", "Trimestriellement", "En continu"],
  en: ["Never", "Occasionally", "Annually", "Quarterly", "Continuously"],
};
const APPRO_RESP = {
  fr: ["Personne", "Diffuse, sans responsable", "Un référent informel", "Une fonction dédiée", "Une direction rattachée au COMEX"],
  en: ["Nobody", "Diffuse, no owner", "An informal referent", "A dedicated function", "A department reporting to the ExCom"],
};

// Approfondissement mapping : sous-dimension -> type
const APPRO_ITEMS: { key: string; label: { fr: string; en: string }; type: "freq" | "resp" }[] = [
  { key: "q1", label: { fr: "Anticipation", en: "Anticipation" }, type: "freq" },
  { key: "q2", label: { fr: "Donnée dans la décision", en: "Data in decision" }, type: "resp" },
  { key: "q3", label: { fr: "Gouvernance de l'information", en: "Information governance" }, type: "resp" },
  { key: "veille", label: { fr: "Veille stratégique", en: "Strategic monitoring" }, type: "freq" },
  { key: "q4", label: { fr: "Process IE", en: "BI process" }, type: "freq" },
  { key: "q5", label: { fr: "Cartographie des risques", en: "Risk mapping" }, type: "freq" },
  { key: "q6", label: { fr: "Gestion des crises", en: "Crisis management" }, type: "freq" },
  { key: "q7", label: { fr: "Signaux faibles", en: "Weak signals" }, type: "freq" },
  { key: "q8", label: { fr: "Résilience", en: "Resilience" }, type: "freq" },
  { key: "q9", label: { fr: "Évaluation investisseurs", en: "Investor evaluation" }, type: "resp" },
  { key: "q10", label: { fr: "Vérification partenaires", en: "Partner verification" }, type: "resp" },
  { key: "q11", label: { fr: "Influence & rayonnement", en: "Influence & outreach" }, type: "resp" },
  { key: "q12", label: { fr: "Compliance tiers", en: "Third-party compliance" }, type: "freq" },
];

// =========================================================================
// Composants d'UI internes
// =========================================================================
const Overline = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ComponentType<any> }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD }}>
    {Icon ? <Icon size={14} strokeWidth={1.5} color={GOLD} style={{ flexShrink: 0 }} /> : null}
    <span>{children}</span>
  </div>
);

const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, fontWeight: 600, margin: "12px 0 16px" }}>{children}</h1>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.2, fontWeight: 600, margin: "8px 0 12px" }}>{children}</h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, fontSize: 15, lineHeight: 1.6, margin: "0 0 16px" }}>{children}</p>
);

const GoldButton = ({ children, onClick, disabled, type = "button" }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; type?: "button" | "submit" }) => (
  <button type={type} onClick={onClick} disabled={disabled} style={{
    background: GOLD, color: NAVY, border: "none", padding: "14px 28px",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
    letterSpacing: "0.03em", cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1, borderRadius: 2, transition: "all 0.2s",
  }}>{children}</button>
);

const GhostButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button type="button" onClick={onClick} style={{
    background: "transparent", color: NAVY, border: `1px solid ${NAVY}`, padding: "12px 24px",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer", borderRadius: 2,
  }}>{children}</button>
);

// =========================================================================
// Page principale
// =========================================================================
type State = {
  step: number;
  secteur: string; type_organisation: string; fonction: string;
  answers: Record<string, Scale>;
  precisions: Record<string, string>;
  // Q9 anchor 3 : mode Interne/Externe et, si externe, origine Marocain/Étranger.
  q9_dd_mode: "interne" | "externe" | null;
  dd_cabinet_origine: "marocain" | "etranger" | null;
  veille_thematiques: string[];
  veille_outil: string | null;
  veille_outil_precision: string;
  veille_prestataire_origine: "marocain" | "etranger" | null;
  veille_organisation: string | null;
  veille_externalisation_origine: "marocain" | "etranger" | null;
  veille_capitalisation: string[];
  approfondissement: boolean | null;
  appro: Record<string, string>;
  commentaire_ouvert: string;
  contact_nom: string; contact_fonction: string; contact_organisation: string; contact_email: string; contact_telephone: string;
};

const initialState: State = {
  step: 0, secteur: "", type_organisation: "", fonction: "",
  answers: {}, precisions: {},
  q9_dd_mode: null, dd_cabinet_origine: null,
  veille_thematiques: [], veille_outil: null, veille_outil_precision: "",
  veille_prestataire_origine: null,
  veille_organisation: null, veille_externalisation_origine: null,
  veille_capitalisation: [],
  approfondissement: null, appro: {},
  commentaire_ouvert: "",
  contact_nom: "", contact_fonction: "", contact_organisation: "", contact_email: "", contact_telephone: "",
};

type IsdResult = {
  score_global: number; niveau: string;
  score_p1: number; score_p2: number; score_p3: number; score_p4: number;
  q11: number | null;
  foreign_dependency?: boolean;
};




const EnqueteISD = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [s, setS] = useState<State>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<IsdResult | null>(null);

  // Remonter automatiquement en haut de page à chaque changement d'écran.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [result ? "result" : s.step]);

  // 4 étapes fonctionnelles pour la barre (Piliers I·II·III·IV)
  const totalPillars = 4;
  const pillarActive = useMemo(() => {
    if (s.step <= 2) return 0;
    if (s.step >= 3 && s.step <= 5) return 1; // P1 (Q1-Q3)
    if (s.step === 6) return 2; // Veille
    if (s.step >= 7 && s.step <= 11) return 3; // P3 (Q4-Q8)
    if (s.step >= 12 && s.step <= 15) return 4; // P4 (Q9-Q12)
    return 4;
  }, [s.step]);

  const setAnswer = (key: string, val: Scale) => setS((p) => ({ ...p, answers: { ...p.answers, [key]: val } }));
  const setPrecision = (key: string, val: string) => setS((p) => ({ ...p, precisions: { ...p.precisions, [key]: val } }));

  const goNext = () => setS((p) => ({ ...p, step: p.step + 1 }));
  const goPrev = () => setS((p) => ({ ...p, step: Math.max(0, p.step - 1) }));

  const submit = async () => {
    setSubmitting(true);
    try {
      // Précisions consolidées + Q9 mode (interne/externe) stocké dans precisions
      const precisions: Record<string, any> = { ...s.precisions };
      if (s.q9_dd_mode) precisions.q9_mode = s.q9_dd_mode;

      const payload = {
        secteur: s.secteur, type_organisation: s.type_organisation, fonction: s.fonction,
        q1: s.answers.q1, q2: s.answers.q2, q3: s.answers.q3,
        q4: s.answers.q4, q5: s.answers.q5, q6: s.answers.q6, q7: s.answers.q7, q8: s.answers.q8,
        q9: s.answers.q9, q10: s.answers.q10, q11: s.answers.q11, q12: s.answers.q12,
        veille_thematiques: s.veille_thematiques,
        veille_outil: s.veille_outil,
        veille_outil_precision: s.veille_outil_precision || null,
        veille_prestataire_origine: s.veille_prestataire_origine,
        veille_organisation: s.veille_organisation,
        veille_externalisation_origine: s.veille_externalisation_origine,
        veille_capitalisation: s.veille_capitalisation,
        dd_cabinet_origine: s.dd_cabinet_origine,
        precisions,
        approfondissement: !!s.approfondissement,
        appro: s.appro,
        commentaire_ouvert: s.commentaire_ouvert || null,
        contact_nom: s.contact_nom, contact_fonction: s.contact_fonction,
        contact_organisation: s.contact_organisation, contact_email: s.contact_email,
        contact_telephone: s.contact_telephone || null,
      };
      const { data, error } = await supabase.functions.invoke("score-isd", { body: payload });
      const d: any = data;
      if (error || !(d?.success || d?.ok)) {
        throw new Error(error?.message || "submission_failed");
      }
      setResult({
        score_global: Number(d.score_global ?? 0),
        niveau: String(d.niveau ?? ""),
        score_p1: Number(d.score_p1 ?? 0),
        score_p2: Number(d.score_p2 ?? 0),
        score_p3: Number(d.score_p3 ?? 0),
        score_p4: Number(d.score_p4 ?? 0),
        q11: d.q11 == null ? null : Number(d.q11),
        foreign_dependency: !!d.foreign_dependency,
      });

      window.scrollTo(0, 0);
    } catch (e) {
      toast({
        title: t("Envoi impossible", "Submission failed"),
        description: t("Merci de réessayer dans un instant.", "Please try again in a moment."),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 100, paddingBottom: 64 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
          {/* Fil d'ariane */}
          <nav aria-label="Breadcrumb" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, opacity: 0.7, marginBottom: 20 }}>
            <a href="/" style={{ color: NAVY, textDecoration: "none" }}>{t("Accueil", "Home")}</a>
            <span style={{ margin: "0 8px", color: GOLD }}>·</span>
            <a href="/insights-resources" style={{ color: NAVY, textDecoration: "none" }}>Insights &amp; Resources</a>
            <span style={{ margin: "0 8px", color: GOLD }}>·</span>
            <span>{t("Enquête ISD", "ISD Survey")}</span>
          </nav>

          {result ? (
            <ResultScreen
              lang={lang}
              result={result}
              origins={{
                dd_cabinet_origine: s.dd_cabinet_origine,
                veille_prestataire_origine: s.veille_prestataire_origine,
                veille_externalisation_origine: s.veille_externalisation_origine,
              }}
              onExchange={() => window.dispatchEvent(new Event("open-strategic-exchange"))}
            />
          ) : (
            <>
              {s.step > 2 && (
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    {Array.from({ length: totalPillars }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: 4, background: i < pillarActive ? GOLD : "rgba(31,58,95,0.15)", borderRadius: 2 }} />
                    ))}
                  </div>
                  <Overline>
                    {t(`Pilier ${Math.max(1, pillarActive)} / ${totalPillars}`, `Pillar ${Math.max(1, pillarActive)} / ${totalPillars}`)}
                  </Overline>
                </div>
              )}

              {s.step === 0 && <IntroScreen lang={lang} onNext={goNext} />}
              {s.step === 1 && <ScreenHome lang={lang} onStart={goNext} onPrev={goPrev} />}

              {s.step === 2 && (
                <ScreenTagging
                  lang={lang} state={s} setState={setS}
                  onNext={goNext} onPrev={goPrev}
                />
              )}

              {s.step >= 3 && s.step <= 5 && (
                <QuestionScreen lang={lang} qdef={QUESTIONS[s.step - 3]}
                  value={s.answers[QUESTIONS[s.step - 3].key] ?? null}
                  onValue={(v) => setAnswer(QUESTIONS[s.step - 3].key, v)}
                  state={s} setState={setS} setPrecision={setPrecision}
                  onNext={goNext} onPrev={goPrev}
                />
              )}

              {s.step === 6 && (
                <VeilleScreen lang={lang} state={s} setState={setS} onNext={goNext} onPrev={goPrev} />
              )}

              {s.step >= 7 && s.step <= 11 && (
                <QuestionScreen lang={lang} qdef={QUESTIONS[s.step - 4]}
                  value={s.answers[QUESTIONS[s.step - 4].key] ?? null}
                  onValue={(v) => setAnswer(QUESTIONS[s.step - 4].key, v)}
                  state={s} setState={setS} setPrecision={setPrecision}
                  onNext={goNext} onPrev={goPrev}
                />
              )}

              {s.step >= 12 && s.step <= 15 && (
                <QuestionScreen lang={lang} qdef={QUESTIONS[s.step - 4]}
                  value={s.answers[QUESTIONS[s.step - 4].key] ?? null}
                  onValue={(v) => setAnswer(QUESTIONS[s.step - 4].key, v)}
                  state={s} setState={setS} setPrecision={setPrecision}
                  onNext={goNext} onPrev={goPrev}
                />
              )}

              {/* Approfondissement retiré : après Q12 -> question ouverte -> contact. */}
              {s.step === 16 && (
                <OpenScreen lang={lang} state={s} setState={setS} onNext={goNext} onPrev={goPrev} />
              )}

              {s.step === 17 && (
                <ContactScreen lang={lang} state={s} setState={setS} onSubmit={submit} onPrev={goPrev} submitting={submitting} />
              )}
            </>
          )}
        </div>
      </main>
      <CTAFooter />
    </div>
  );
};


// =========================================================================
// Sous-écrans
// =========================================================================
const IntroScreen = ({ lang, onNext }: { lang: "fr" | "en"; onNext: () => void }) => {
  const cards = [
    {
      num: "01",
      icon: <ShieldCheck size={22} strokeWidth={1.6} />,
      title: t2("Autodiagnostic confidentiel", "Confidential self-diagnosis", lang),
      desc: t2("Votre maturité en intelligence stratégique, sans jugement, en 10 minutes.", "Your strategic intelligence maturity, without judgment, in 10 minutes.", lang),
    },
    {
      num: "02",
      icon: <RadarIcon size={22} strokeWidth={1.6} />,
      title: t2("Résultat immédiat", "Immediate result", lang),
      desc: t2("Votre Indice de Souveraineté Décisionnelle et votre radar par pilier, dès la fin du questionnaire.", "Your Decision Sovereignty Index and your pillar-level radar, as soon as you finish the questionnaire.", lang),
    },
    {
      num: "03",
      icon: <Map size={22} strokeWidth={1.6} />,
      title: t2("Positionnement national", "National positioning", lang),
      desc: t2("Votre situation face aux autres organisations, révélée à l'issue de l'étude.", "Your position relative to other organizations, revealed at the end of the study.", lang),
    },
    {
      num: "04",
      icon: <Target size={22} strokeWidth={1.6} />,
      title: t2("Recommandations prioritaires", "Priority recommendations", lang),
      desc: t2("Les leviers concrets pour renforcer votre souveraineté décisionnelle.", "Concrete levers to strengthen your decision sovereignty.", lang),
    },
  ];

  const objectives = [
    t2("évaluer le niveau de maturité des organisations marocaines en intelligence stratégique et en souveraineté décisionnelle", "assess the maturity level of Moroccan organizations in strategic intelligence and decision sovereignty", lang),
    t2("élaborer et diffuser le premier benchmark national de référence du domaine", "produce and share the first national reference benchmark for the field", lang),
    t2("produire un indice de maturité par organisation, par secteur et par catégorie d'acteurs", "produce a maturity index by organization, by sector and by actor category", lang),
  ];

  return (
    <div className="isd-intro">
      <style>{`
        .isd-intro { padding: 24px 0 40px; }
        .isd-intro-header { margin-bottom: 56px; }
        .isd-intro-title { font-family: 'Playfair Display', serif; color: #1F3A5F; font-size: clamp(36px, 5vw, 56px); line-height: 1.05; font-weight: 700; margin: 12px 0 0; letter-spacing: -0.02em; }
        .isd-intro-band { width: 100vw; margin-left: calc(-50vw + 50%); background: #1F3A5F; padding: 64px 0; }
        .isd-intro-band-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; }
        .isd-intro-band-label { font-family: 'Playfair Display', serif; color: #C9A84C; font-size: clamp(24px, 3vw, 32px); font-weight: 600; margin-bottom: 20px; }
        .isd-intro-band-text { font-family: 'DM Sans', sans-serif; color: #FAF6ED; font-size: clamp(18px, 2.2vw, 24px); line-height: 1.55; margin: 0; padding-left: 28px; border-left: 2px solid #C9A84C; max-width: 820px; }
        .isd-intro-section { margin-top: 72px; }
        .isd-intro-section-title { font-family: 'Playfair Display', serif; color: #1F3A5F; font-size: clamp(26px, 3vw, 34px); font-weight: 600; margin-bottom: 32px; }
        .isd-intro-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .isd-intro-card { background: #1F3A5F; border: 1px solid rgba(201,168,76,0.25); padding: 48px 28px 44px; text-align: center; position: relative; overflow: hidden; transition: transform .35s, border-color .35s, box-shadow .35s; }
        .isd-intro-card:hover { transform: translateY(-6px); border-color: #C9A84C; box-shadow: 0 12px 30px -10px rgba(31,58,95,0.25); }
        .isd-intro-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #C9A84C; transform: scaleX(0); transform-origin: left; transition: transform .35s ease; }
        .isd-intro-card:hover::before { transform: scaleX(1); }
        .isd-intro-card-icon { width: 58px; height: 58px; border-radius: 50%; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3); display: inline-flex; align-items: center; justify-content: center; color: #C9A84C; transition: background .3s, border-color .3s, color .3s; }
        .isd-intro-card:hover .isd-intro-card-icon { background: #C9A84C; border-color: #C9A84C; color: #1F3A5F; }
        .isd-intro-card-num { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; color: #C9A84C; letter-spacing: 0.25em; text-transform: uppercase; margin-top: 26px; }
        .isd-intro-card-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #FAF6ED; line-height: 1.25; margin-top: 14px; }
        .isd-intro-card-desc { font-family: 'DM Sans', sans-serif; font-size: 15px; color: rgba(250,246,237,0.78); line-height: 1.6; margin-top: 14px; }
        .isd-intro-panel { background: #152A45; border: 1px solid rgba(201,168,76,0.35); border-top: 3px solid #C9A84C; padding: 36px 40px; margin-top: 72px; }
        .isd-intro-panel-label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; color: #C9A84C; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 12px; }
        .isd-intro-panel-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 600; color: #FAF6ED; margin-bottom: 24px; }
        .isd-intro-panel-list { list-style: none; padding: 0; margin: 0; }
        .isd-intro-panel-list li { font-family: 'DM Sans', sans-serif; font-size: 15px; color: rgba(250,246,237,0.9); line-height: 1.6; padding: 10px 0 10px 22px; border-bottom: 1px dashed rgba(201,168,76,0.15); position: relative; }
        .isd-intro-panel-list li:last-child { border-bottom: none; }
        .isd-intro-panel-list li::before { content: '›'; color: #C9A84C; position: absolute; left: 0; font-weight: 600; font-size: 16px; }
        .isd-intro-cta { margin-top: 56px; }
        @media (max-width: 1024px) { .isd-intro-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .isd-intro-cards { grid-template-columns: 1fr; } .isd-intro-panel { padding: 28px 24px; } .isd-intro-band { padding: 48px 0; } }
      `}</style>

      <div className="isd-intro-header">
        <Overline>{t2("ÉTUDE NATIONALE 2026", "NATIONAL STUDY 2026", lang)}</Overline>
        <h1 className="isd-intro-title">{t2("État de la maturité en souveraineté décisionnelle au Maroc", "The state of decision sovereignty maturity in Morocco", lang)}</h1>
      </div>

      <div className="isd-intro-band">
        <div className="isd-intro-band-inner">
          <div className="isd-intro-band-label">{t2("Pourquoi cette étude ?", "Why this study?", lang)}</div>
          <p className="isd-intro-band-text">
            {t2(
              "Vous évoluez dans un environnement marqué par l'accélération des risques, une concurrence accrue et la multiplication des signaux faibles. La qualité de vos décisions est devenue un avantage concurrentiel déterminant. Pourtant, aucun référentiel ne mesurait jusqu'ici la maturité des organisations marocaines en la matière.",
              "You operate in an environment marked by accelerating risks, heightened competition and a proliferation of weak signals. The quality of your decisions has become a decisive competitive advantage. Yet no reference framework has, until now, measured the maturity of Moroccan organizations in this field.",
              lang,
            )}
          </p>
        </div>
      </div>

      <div className="isd-intro-section">
        <h2 className="isd-intro-section-title">{t2("Qu'est-ce que vous obtenez ?", "What do you get?", lang)}</h2>
        <div className="isd-intro-cards">
          {cards.map((c) => (
            <div key={c.num} className="isd-intro-card">
              <div className="isd-intro-card-icon">{c.icon}</div>
              <div className="isd-intro-card-num">{c.num}</div>
              <div className="isd-intro-card-title">{c.title}</div>
              <div className="isd-intro-card-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="isd-intro-panel">
        <div className="isd-intro-panel-label">{t2("OBJECTIFS", "OBJECTIVES", lang)}</div>
        <h2 className="isd-intro-panel-title">{t2("Objectif de l'étude ?", "Objective of the study?", lang)}</h2>
        <ul className="isd-intro-panel-list">
          {objectives.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </div>

      <div className="isd-intro-cta">
        <GoldButton onClick={onNext}>{t2("Découvrir les 4 piliers", "Discover the 4 pillars", lang)}</GoldButton>
      </div>
    </div>
  );
};

const ScreenHome = ({ lang, onStart, onPrev }: { lang: "fr" | "en"; onStart: () => void; onPrev: () => void }) => {
  const pillars = [
    { num: "I", title: { fr: "Souveraineté décisionnelle", en: "Decision sovereignty" }, dims: { fr: "Anticipation · donnée · gouvernance", en: "Anticipation · data · governance" } },
    { num: "II", title: { fr: "Veille stratégique", en: "Strategic monitoring" }, dims: { fr: "Concurrence · secteur · géopolitique · techno", en: "Competitive · sectoral · geopolitical · tech" } },
    { num: "III", title: { fr: "Risk Management", en: "Risk Management" }, dims: { fr: "Cartographie · crise · signaux · résilience", en: "Mapping · crisis · signals · resilience" } },
    { num: "IV", title: { fr: "Due Diligence & Intelligence d'affaires", en: "Due Diligence & Business Intelligence" }, dims: { fr: "Investisseurs · partenaires · influence · compliance", en: "Investors · partners · influence · compliance" } },
  ];
  return (
    <div>
      <Overline>{t2("DIAGNOSTIC", "DIAGNOSTIC", lang)}</Overline>
      <H1>{t2("Où se situe votre souveraineté décisionnelle ?", "Where does your decision sovereignty stand?", lang)}</H1>
      <Body>{t2("Quatre piliers, treize dimensions. Répondez à partir de votre réalité, sans vous noter. 10 minutes.", "Four pillars, thirteen dimensions. Answer from your reality, without rating yourself. 10 minutes.", lang)}</Body>

      <div
        className="isd-pillars-grid"
        style={{ display: "grid", gap: 18, margin: "24px 0 32px" }}
      >
        {pillars.map((p) => (
          <div key={p.num} className="isd-pillar-card">
            <div className="isd-pillar-card-num">{p.num}</div>
            <div className="isd-pillar-card-title">{p.title[lang]}</div>
            <div className="isd-pillar-card-dims">{p.dims[lang]}</div>
          </div>
        ))}
      </div>

      <style>{`
        .isd-pillars-grid { grid-template-columns: 1fr; }
        @media (min-width: 640px) { .isd-pillars-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .isd-pillars-grid { grid-template-columns: repeat(4, 1fr); } }
        .isd-pillar-card { background: #1F3A5F; border: 1px solid rgba(201,168,76,0.25); padding: 28px 22px; position: relative; overflow: hidden; transition: transform .35s, border-color .35s, box-shadow .35s; }
        .isd-pillar-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #C9A84C; transform: scaleX(0); transform-origin: left; transition: transform .35s ease; }
        .isd-pillar-card:hover { transform: translateY(-4px); border-color: #C9A84C; box-shadow: 0 12px 30px -10px rgba(31,58,95,0.35); }
        .isd-pillar-card:hover::before { transform: scaleX(1); }
        .isd-pillar-card-num { font-family: 'Playfair Display', serif; color: #C9A84C; font-size: 28px; font-weight: 700; line-height: 1; margin-bottom: 14px; }
        .isd-pillar-card-title { font-family: 'Playfair Display', serif; color: #FAF6ED; font-size: 18px; font-weight: 600; line-height: 1.3; margin-bottom: 12px; }
        .isd-pillar-card-dims { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; color: rgba(250,246,237,0.7); line-height: 1.6; letter-spacing: 0.02em; }
      `}</style>

      <div style={{ display: "flex", gap: 12 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onStart}>{t2("Commencer le diagnostic", "Start the diagnosis", lang)}</GoldButton>
      </div>
    </div>
  );
};


const Select = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ display: "block", fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: 8 }}>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{
      width: "100%", padding: "12px 14px", background: "#fff", border: `1px solid rgba(31,58,95,0.25)`,
      color: NAVY, fontFamily: "'DM Sans', sans-serif", fontSize: 15, borderRadius: 2, outline: "none",
    }}>
      <option value="">—</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const ScreenTagging = ({ lang, state, setState, onNext, onPrev }: any) => {
  const canGo = state.secteur && state.type_organisation && state.fonction;
  return (
    <div>
      <Overline>{t2("TAGGAGE", "TAGGING", lang)}</Overline>
      <H2>{t2("Votre contexte", "Your context", lang)}</H2>
      <Body>{t2("Trois précisions rapides pour situer vos réponses.", "Three quick details to situate your answers.", lang)}</Body>

      <Select label={t2("Secteur", "Sector", lang)} value={state.secteur} onChange={(v) => setState({ ...state, secteur: v })} options={SECTEURS[lang]} />
      <Select label={t2("Type d'organisation", "Organization type", lang)} value={state.type_organisation} onChange={(v) => setState({ ...state, type_organisation: v })} options={TYPES_ORG[lang]} />
      <Select label={t2("Fonction", "Function", lang)} value={state.fonction} onChange={(v) => setState({ ...state, fonction: v })} options={FONCTIONS[lang]} />

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onNext} disabled={!canGo}>{t2("Continuer", "Continue", lang)}</GoldButton>
      </div>
    </div>
  );
};

const OriginPicker = ({ lang, value, onChange }: { lang: "fr" | "en"; value: "marocain" | "etranger" | null; onChange: (v: "marocain" | "etranger") => void }) => (
  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
    {(["marocain", "etranger"] as const).map((k) => {
      const label = k === "marocain" ? t2("Marocain", "Moroccan", lang) : t2("Étranger", "Foreign", lang);
      const active = value === k;
      return (
        <button key={k} type="button" onClick={() => onChange(k)} style={{
          background: active ? NAVY : "#fff",
          color: active ? "#fff" : NAVY,
          border: `1px solid ${active ? NAVY : "rgba(31,58,95,0.25)"}`,
          padding: "6px 14px", fontSize: 12, cursor: "pointer", borderRadius: 2,
          fontFamily: "'DM Sans', sans-serif",
        }}>{label}</button>
      );
    })}
  </div>
);

const QuestionScreen = ({ lang, qdef, value, onValue, state, setState, setPrecision, onNext, onPrev }: {
  lang: "fr" | "en"; qdef: QDef; value: Scale; onValue: (v: Scale) => void;
  state: State; setState: React.Dispatch<React.SetStateAction<State>>;
  setPrecision: (key: string, val: string) => void;
  onNext: () => void; onPrev: () => void;
}) => {
  // Bloque le passage tant que le contexte Q9 (interne/externe + origine si externe) n'est pas résolu.
  const q9Blocked = qdef.key === "q9" && value === 3 && (
    !state.q9_dd_mode || (state.q9_dd_mode === "externe" && !state.dd_cabinet_origine)
  );
  const canGo = value !== null && !q9Blocked;

  const precisionActive = value !== null && qdef.precisionAt?.includes(value as number);

  return (
    <div>
      <Overline>{`${qdef.numero} · ${qdef.dim[lang]}`}</Overline>
      <H2>{qdef.question[lang]}</H2>

      <div style={{ marginTop: 20, marginBottom: 24 }}>
        {qdef.anchors[lang].map((anchor, i) => {
          const active = value === i;
          const showPrecision = active && qdef.precisionAt?.includes(i);
          const precisionLabelObj = PRECISION_LABELS[qdef.key]?.[i];
          const precisionLabel = precisionLabelObj
            ? t2(precisionLabelObj.fr, precisionLabelObj.en, lang)
            : t2("Précisez", "Please specify", lang);
          return (
            <div key={i}>
              <button type="button" onClick={() => onValue(i as Scale)} style={{
                display: "block", width: "100%", textAlign: "left",
                background: active ? NAVY : "#fff",
                color: active ? "#fff" : NAVY,
                border: `1px solid ${active ? NAVY : "rgba(31,58,95,0.2)"}`,
                borderLeft: `3px solid ${GOLD}`,
                padding: "14px 16px", marginBottom: 8, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.5, borderRadius: 2,
                transition: "all 0.15s",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: "0.18em", opacity: 0.7, marginBottom: 4 }}>
                  {LEVEL_LABELS[lang][i]}
                </div>
                {stripParens(anchor)}
              </button>

              {/* Champ de précision conditionnel, immédiatement sous l'option cochée */}
              {showPrecision && (
                <div style={{ margin: "0 0 12px 12px", padding: "10px 14px", borderLeft: `2px solid ${GOLD}`, background: "rgba(31,58,95,0.04)" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: 8 }}>
                    {precisionLabel}
                  </div>
                  <Input
                    value={state.precisions[qdef.key] ?? ""}
                    onChange={(e: any) => setPrecision(qdef.key, e.target.value)}
                    maxLength={500}
                    style={{ background: "#fff", borderColor: "rgba(31,58,95,0.25)", color: NAVY }}
                  />
                </div>
              )}

              {/* Q9 anchor 3 : Interne/Externe + Marocain/Étranger si externe */}
              {active && qdef.key === "q9" && i === 3 && (
                <div style={{ margin: "0 0 12px 12px", padding: "10px 14px", borderLeft: `2px solid ${GOLD}`, background: "rgba(31,58,95,0.04)" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: 6 }}>
                    {t2("Interne ou externe ?", "In-house or external?", lang)}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {(["interne", "externe"] as const).map((k) => {
                      const label = k === "interne" ? t2("Interne", "In-house", lang) : t2("Externe", "External", lang);
                      const on = state.q9_dd_mode === k;
                      return (
                        <button key={k} type="button" onClick={() => setState((p) => ({ ...p, q9_dd_mode: k, dd_cabinet_origine: k === "interne" ? null : p.dd_cabinet_origine }))} style={{
                          background: on ? NAVY : "#fff", color: on ? "#fff" : NAVY,
                          border: `1px solid ${on ? NAVY : "rgba(31,58,95,0.25)"}`,
                          padding: "6px 14px", fontSize: 12, cursor: "pointer", borderRadius: 2, fontFamily: "'DM Sans', sans-serif",
                        }}>{label}</button>
                      );
                    })}
                  </div>
                  {state.q9_dd_mode === "externe" && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY }}>
                        {t2("Cabinet Marocain ou Étranger ?", "Moroccan or Foreign firm?", lang)}
                      </div>
                      <OriginPicker lang={lang} value={state.dd_cabinet_origine} onChange={(v) => setState((p) => ({ ...p, dd_cabinet_origine: v }))} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>


      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onNext} disabled={!canGo}>{t2("Continuer", "Continue", lang)}</GoldButton>
      </div>
    </div>
  );
};



const VeilleScreen = ({ lang, state, setState, onNext, onPrev }: any) => {
  const toggleTheme = (opt: string) => {
    const cur: string[] = state.veille_thematiques;
    setState({ ...state, veille_thematiques: cur.includes(opt) ? cur.filter((x: string) => x !== opt) : [...cur, opt] });
  };
  const toggleCapi = (opt: string) => {
    const cur: string[] = state.veille_capitalisation || [];
    setState({ ...state, veille_capitalisation: cur.includes(opt) ? cur.filter((x: string) => x !== opt) : [...cur, opt] });
  };

  // Sous-choix bloquants : si Prestataire externe -> origine requise ; si Externalisée -> origine requise.
  const outilBlocked = state.veille_outil === "Prestataire externe" && !state.veille_prestataire_origine;
  const orgBlocked = state.veille_organisation === "Externalisée" && !state.veille_externalisation_origine;
  const canGo = state.veille_thematiques.length > 0 && state.veille_outil && state.veille_organisation && (state.veille_capitalisation?.length > 0) && !outilBlocked && !orgBlocked;

  const themesFr = VEILLE_THEMES.fr;
  const themesLang = VEILLE_THEMES[lang];

  const SingleChoice = ({ label, options, value, onChange }: { label: string; options: string[]; value: string | null; onChange: (v: string) => void }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(opt)} style={{
            background: value === opt ? NAVY : "#fff",
            color: value === opt ? "#fff" : NAVY,
            border: `1px solid ${value === opt ? NAVY : "rgba(31,58,95,0.25)"}`,
            padding: "8px 14px", fontSize: 13, cursor: "pointer", borderRadius: 2, fontFamily: "'DM Sans', sans-serif",
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );

  const MultiChoice = ({ label, canonical, display, values, onToggle }: { label: string; canonical: string[]; display: string[]; values: string[]; onToggle: (canonical: string) => void }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {display.map((opt, i) => {
          const c = canonical[i];
          const active = values.includes(c);
          return (
            <button key={opt} type="button" onClick={() => onToggle(c)} style={{
              background: active ? NAVY : "#fff",
              color: active ? "#fff" : NAVY,
              border: `1px solid ${active ? NAVY : "rgba(31,58,95,0.25)"}`,
              padding: "8px 14px", fontSize: 13, cursor: "pointer", borderRadius: 2, fontFamily: "'DM Sans', sans-serif",
            }}>{opt}</button>
          );
        })}
      </div>
    </div>
  );

  const setOutil = (v: string) => {
    const idx = VEILLE_OUTIL[lang].indexOf(v);
    const canon = VEILLE_OUTIL.fr[idx];
    setState({ ...state, veille_outil: canon, veille_prestataire_origine: canon === "Prestataire externe" ? state.veille_prestataire_origine : null });
  };
  const setOrg = (v: string) => {
    const idx = VEILLE_ORG[lang].indexOf(v);
    const canon = VEILLE_ORG.fr[idx];
    setState({ ...state, veille_organisation: canon, veille_externalisation_origine: canon === "Externalisée" ? state.veille_externalisation_origine : null });
  };
  const currentOutil = state.veille_outil ? VEILLE_OUTIL[lang][VEILLE_OUTIL.fr.indexOf(state.veille_outil)] : null;
  const currentOrg = state.veille_organisation ? VEILLE_ORG[lang][VEILLE_ORG.fr.indexOf(state.veille_organisation)] : null;

  return (
    <div>
      <Overline>{t2("PILIER II · VEILLE STRATÉGIQUE", "PILLAR II · STRATEGIC MONITORING", lang)}</Overline>
      <H2>{t2("Quatre axes factuels de votre veille", "Four factual axes of your monitoring", lang)}</H2>
      <Body>{t2("Décrivez votre réalité pour chacun des quatre axes.", "Describe your reality for each of the four axes.", lang)}</Body>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: 8 }}>
          V1 · {t2("Thématiques pratiquées (multi-choix)", "Practiced themes (multi-select)", lang)}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {themesLang.map((opt, i) => {
            const canonical = themesFr[i];
            const active = state.veille_thematiques.includes(canonical);
            return (
              <button key={opt} type="button" onClick={() => toggleTheme(canonical)} style={{
                background: active ? NAVY : "#fff",
                color: active ? "#fff" : NAVY,
                border: `1px solid ${active ? NAVY : "rgba(31,58,95,0.25)"}`,
                padding: "8px 14px", fontSize: 13, cursor: "pointer", borderRadius: 2, fontFamily: "'DM Sans', sans-serif",
              }}>{opt}</button>
            );
          })}
        </div>
      </div>

      <SingleChoice label={`V2 · ${t2("Outil (choix unique)", "Tool (single choice)", lang)}`} options={VEILLE_OUTIL[lang]} value={currentOutil} onChange={setOutil} />
      {state.veille_outil === "Plateforme de veille dédiée" && (
        <div style={{ marginBottom: 20, padding: "10px 14px", borderLeft: `2px solid ${GOLD}`, background: "rgba(31,58,95,0.04)" }}>
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: 8 }}>
            {t2("Laquelle", "Which one", lang)}
          </div>
          <Input
            value={state.veille_outil_precision}
            onChange={(e: any) => setState({ ...state, veille_outil_precision: e.target.value })}
            maxLength={500}
            style={{ background: "#fff", borderColor: "rgba(31,58,95,0.25)", color: NAVY }}
          />
        </div>
      )}
      {state.veille_outil === "Prestataire externe" && (
        <div style={{ marginBottom: 20, padding: "10px 14px", borderLeft: `2px solid ${GOLD}`, background: "rgba(31,58,95,0.04)" }}>
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY }}>
            {t2("Prestataire Marocain ou Étranger ?", "Moroccan or Foreign provider?", lang)}
          </div>
          <OriginPicker lang={lang} value={state.veille_prestataire_origine} onChange={(v) => setState({ ...state, veille_prestataire_origine: v })} />
        </div>
      )}

      <SingleChoice label={`V3 · ${t2("Organisation du service (choix unique)", "Service organization (single choice)", lang)}`} options={VEILLE_ORG[lang]} value={currentOrg} onChange={setOrg} />
      {state.veille_organisation === "Externalisée" && (
        <div style={{ marginBottom: 20, padding: "10px 14px", borderLeft: `2px solid ${GOLD}`, background: "rgba(31,58,95,0.04)" }}>
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY }}>
            {t2("Cabinet Marocain ou Étranger ?", "Moroccan or Foreign firm?", lang)}
          </div>
          <OriginPicker lang={lang} value={state.veille_externalisation_origine} onChange={(v) => setState({ ...state, veille_externalisation_origine: v })} />
        </div>
      )}

      <MultiChoice
        label={`V4 · ${t2("Capitalisation et production de contenu (multi-choix)", "Capitalization and content production (multi-select)", lang)}`}
        canonical={VEILLE_CAPI.fr} display={VEILLE_CAPI[lang]} values={state.veille_capitalisation || []} onToggle={toggleCapi}
      />

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onNext} disabled={!canGo}>{t2("Continuer", "Continue", lang)}</GoldButton>
      </div>
    </div>
  );
};



// Écran d'approfondissement retiré : redondant avec les 12 questions.


const OpenScreen = ({ lang, state, setState, onNext, onPrev }: any) => (
  <div>
    <Overline>{t2("OUVERT", "OPEN", lang)}</Overline>
    <H2>{t2("Un angle mort ou un sujet stratégique qui vous préoccupe aujourd'hui ?", "A blind spot or strategic topic on your mind today?", lang)}</H2>
    <Body>{t2("Champ facultatif.", "Optional field.", lang)}</Body>
    <Textarea value={state.commentaire_ouvert} onChange={(e) => setState({ ...state, commentaire_ouvert: e.target.value })} maxLength={4000}
      style={{ minHeight: 160, background: "#fff", borderColor: "rgba(31,58,95,0.25)", color: NAVY }}
      placeholder={t2("Votre note libre…", "Your free note…", lang)}
    />
    <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
      <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
      <GoldButton onClick={onNext}>{t2("Continuer", "Continue", lang)}</GoldButton>
    </div>
  </div>
);

const ContactScreen = ({ lang, state, setState, onSubmit, onPrev, submitting }: any) => {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contact_email);
  const canGo = state.contact_nom.trim() && state.contact_fonction.trim() && state.contact_organisation.trim() && emailOk;
  const inputStyle = { background: "#fff", borderColor: "rgba(31,58,95,0.25)", color: NAVY };
  return (
    <div>
      <Overline>{t2("REMISE IMMÉDIATE DU DIAGNOSTIC", "IMMEDIATE DIAGNOSIS DELIVERY", lang)}</Overline>
      <H2>{t2("Dernière étape avant votre diagnostic.", "One last step before your diagnosis.", lang)}</H2>
      <Body>
        {t2(
          "Votre Indice de Souveraineté Décisionnelle et votre radar par pilier vous seront affichés à l'écran dès l'enregistrement. Votre positionnement national sera révélé à l'issue de l'étude 2026.",
          "Your Decision Sovereignty Index and pillar-level radar will be displayed on screen as soon as your answers are recorded. Your national positioning will be revealed at the conclusion of the 2026 study.",
          lang,
        )}
      </Body>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <Label style={{ color: NAVY }}>{t2("Nom", "Name", lang)}</Label>
          <Input style={inputStyle} value={state.contact_nom} onChange={(e) => setState({ ...state, contact_nom: e.target.value })} maxLength={200} />
        </div>
        <div>
          <Label style={{ color: NAVY }}>{t2("Fonction", "Role", lang)}</Label>
          <Input style={inputStyle} value={state.contact_fonction} onChange={(e) => setState({ ...state, contact_fonction: e.target.value })} maxLength={200} />
        </div>
        <div>
          <Label style={{ color: NAVY }}>{t2("Organisation", "Organization", lang)}</Label>
          <Input style={inputStyle} value={state.contact_organisation} onChange={(e) => setState({ ...state, contact_organisation: e.target.value })} maxLength={200} />
        </div>
        <div>
          <Label style={{ color: NAVY }}>Email</Label>
          <Input style={inputStyle} type="email" value={state.contact_email} onChange={(e) => setState({ ...state, contact_email: e.target.value })} maxLength={254} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Label style={{ color: NAVY }}>
            {t2("Téléphone", "Phone", lang)}{" "}
            <span style={{ opacity: 0.6, fontWeight: 400 }}>({t2("facultatif", "optional", lang)})</span>
          </Label>
          <Input style={inputStyle} type="tel" value={state.contact_telephone} onChange={(e) => setState({ ...state, contact_telephone: e.target.value })} maxLength={40} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onSubmit} disabled={!canGo || submitting}>
          {submitting ? t2("Envoi…", "Sending…", lang) : t2("Obtenir mon diagnostic", "Get my diagnosis", lang)}
        </GoldButton>
      </div>
    </div>
  );
};

// =========================================================================
// Écran de résultat : Indice, échelle, radar, lecture, recommandations, CTA.
// Ne dépend d'aucune formule locale : lit uniquement les scores renvoyés
// par l'Edge function. Le mapping recommandations -> solution est du contenu
// éditorial, pas une formule de scoring.
// =========================================================================
type Origins = {
  dd_cabinet_origine: "marocain" | "etranger" | null;
  veille_prestataire_origine: "marocain" | "etranger" | null;
  veille_externalisation_origine: "marocain" | "etranger" | null;
};

const ResultScreen = ({ lang, result, origins, onExchange }: { lang: "fr" | "en"; result: IsdResult; origins: Origins; onExchange: () => void }) => {

  const NIVEAUX = [
    { key: "Embryonnaire", fr: { name: "Embryonnaire", desc: "aucun dispositif structuré, décisions à l'intuition et à la réaction." }, en: { name: "Embryonic", desc: "no structured setup, decisions driven by intuition and reaction." } },
    { key: "Réactif", fr: { name: "Réactif", desc: "actions ponctuelles, déclenchées après l'événement, sans outil ni processus." }, en: { name: "Reactive", desc: "occasional actions, triggered after the event, with no tool or process." } },
    { key: "Émergent", fr: { name: "Émergent", desc: "premières démarches structurées, partielles et non systématiques." }, en: { name: "Emerging", desc: "first structured initiatives, partial and not systematic." } },
    { key: "Structuré", fr: { name: "Structuré", desc: "processus formalisés, outillés et pilotés régulièrement." }, en: { name: "Structured", desc: "formal, tool-supported processes, steered regularly." } },
    { key: "Souverain", fr: { name: "Souverain", desc: "dispositif intégré, proactif et anticipatif, créateur d'avantage stratégique." }, en: { name: "Sovereign", desc: "integrated, proactive and anticipatory setup, creating strategic advantage." } },
  ];

  const pillars = [
    { key: "p1", name: t2("Souveraineté décisionnelle", "Decision sovereignty", lang), value: result.score_p1 },
    { key: "p2", name: t2("Veille stratégique", "Strategic monitoring", lang), value: result.score_p2 },
    { key: "p3", name: t2("Risk Management", "Risk Management", lang), value: result.score_p3 },
    { key: "p4", name: t2("Due Diligence & Intelligence d'affaires", "Due Diligence & Business Intelligence", lang), value: result.score_p4 },
  ];

  const strongest = pillars.reduce((a, b) => (b.value > a.value ? b : a), pillars[0]);
  const weakest = pillars.reduce((a, b) => (b.value < a.value ? b : a), pillars[0]);

  const SOLUTIONS = {
    sil: {
      name: t2("Strategic Intelligence Lab", "Strategic Intelligence Lab", lang),
      href: "/solutions/strategic-intelligence-lab",
    },
    ddd: {
      name: t2("Deep Due Diligence", "Deep Due Diligence", lang),
      href: "/solutions/deep-due-diligence",
    },
    spi: {
      name: t2("Soft Power and Influence", "Soft Power and Influence", lang),
      href: "/solutions/soft-power-influence",
    },
  };

  const prioritySolution = (weakest.key === "p4") ? SOLUTIONS.ddd : SOLUTIONS.sil;
  const q11Weak = result.q11 !== null && result.q11 <= 2;

  const recos: { text: string; solution: { name: string; href: string } }[] = [
    {
      text: t2(
        `Renforcer en priorité le pilier « ${weakest.name} », votre point d'appui le plus fragile aujourd'hui.`,
        `Prioritize strengthening the pillar "${weakest.name}", your most fragile foothold today.`,
        lang,
      ),
      solution: prioritySolution,
    },
    {
      text: t2(
        `Capitaliser sur votre point fort « ${strongest.name} » pour ancrer une gouvernance de décision plus intégrée.`,
        `Leverage your strength "${strongest.name}" to anchor a more integrated decision governance.`,
        lang,
      ),
      solution: SOLUTIONS.sil,
    },
  ];
  if (q11Weak) {
    recos.push({
      text: t2(
        "Structurer une trajectoire d'influence et de rayonnement pour convertir votre légitimité en ascendant stratégique.",
        "Structure an influence and outreach trajectory to convert your legitimacy into strategic ascendancy.",
        lang,
      ),
      solution: SOLUTIONS.spi,
    });
  }

  const nivKey = result.niveau;
  const ctaLabel = (nivKey === "Embryonnaire" || nivKey === "Réactif")
    ? t2("Activer un POC de diagnostic souverain", "Activate a sovereign diagnosis POC", lang)
    : (nivKey === "Souverain")
      ? t2("Recevoir le Livre Blanc 2026", "Receive the 2026 White Paper", lang)
      : t2("Demander un échange stratégique", "Request a strategic exchange", lang);

  const nivIndex = Math.max(0, NIVEAUX.findIndex((n) => n.key === nivKey));

  // Feuille de route : 3 priorités séquencées, du pilier le plus faible au moins faible
  const pillarLever: Record<string, { fr: string; en: string }> = {
    p1: {
      fr: "Structurer une gouvernance de décision fondée sur l'anticipation et la donnée.",
      en: "Structure a decision governance rooted in anticipation and data.",
    },
    p2: {
      fr: "Déployer un dispositif de veille multi-axes piloté en continu.",
      en: "Deploy a multi-axis intelligence setup steered continuously.",
    },
    p3: {
      fr: "Cartographier les risques et outiller la gestion de crise et des signaux.",
      en: "Map risks and equip crisis and signal management.",
    },
    p4: {
      fr: "Sécuriser investissements et partenariats par une due diligence approfondie.",
      en: "Secure investments and partnerships through in-depth due diligence.",
    },
  };
  const solutionForPillar = (pKey: string) => (pKey === "p4" ? SOLUTIONS.ddd : SOLUTIONS.sil);
  const sorted = [...pillars].sort((a, b) => a.value - b.value);
  const roadmap: { idx: number; pillarName: string; pillarValue: number; lever: string; solution: { name: string; href: string } }[] =
    sorted.slice(0, 3).map((p, idx) => ({
      idx: idx + 1,
      pillarName: p.name,
      pillarValue: p.value,
      lever: t2(pillarLever[p.key].fr, pillarLever[p.key].en, lang),
      solution: solutionForPillar(p.key),
    }));
  // Sous-dimension Influence & rayonnement (q11) : si point faible ciblé, priorité SPI additionnelle.
  if (q11Weak) {
    roadmap.push({
      idx: roadmap.length + 1,
      pillarName: t2("Influence et rayonnement", "Influence and outreach", lang),
      pillarValue: result.q11 ?? 0,
      lever: t2(
        "Structurer une trajectoire d'influence et de rayonnement pour convertir votre légitimité en ascendant stratégique.",
        "Structure an influence and outreach trajectory to convert your legitimacy into strategic ascendancy.",
        lang,
      ),
      solution: SOLUTIONS.spi,
    });
  }

  const waitingPhrase = t2(
    "Ce document est votre synthèse immédiate. Votre feuille de route complète, personnalisée et détaillée par pilier vous sera adressée à l'issue de l'étude nationale 2026, accompagnée de votre positionnement.",
    "This document is your immediate summary. Your complete roadmap, personalized and detailed by pillar, will be sent to you at the end of the 2026 national study, together with your positioning.",
    lang,
  );

  const [pdfBusy, setPdfBusy] = useState(false);
  const pdfRef = React.useRef<HTMLDivElement>(null);
  const radarRef = React.useRef<HTMLDivElement>(null);

  const loadImageAsDataURL = async (src: string): Promise<string> => {
    const res = await fetch(src);
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const loadImageWithSize = async (src: string): Promise<{ dataUrl: string; width: number; height: number }> => {
    const dataUrl = await loadImageAsDataURL(src);
    const dims = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
      img.src = dataUrl;
    });
    return { dataUrl, ...dims };
  };

  const handleDownloadPdf = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);
    try {
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 12;
      const headerH = 18;
      const footerH = 16;
      const contentW = pageW - margin * 2;
      const contentTop = headerH + 4;
      const contentBottom = pageH - footerH - 2;
      const contentH = contentBottom - contentTop;

      const title = t2(
        "État de la maturité en souveraineté décisionnelle au Maroc",
        "The state of decision sovereignty maturity in Morocco",
        lang,
      );
      const kicker = t2("ÉTUDE NATIONALE 2026", "NATIONAL STUDY 2026", lang);

      const drawFooter = () => {
        pdf.setDrawColor(201, 168, 76);
        pdf.setLineWidth(0.3);
        pdf.line(margin, pageH - footerH + 2, pageW - margin, pageH - footerH + 2);
        pdf.setTextColor(31, 58, 95);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.text("© Buildfluence · www.buildfluence.ai · info@buildfluence.ai", pageW / 2, pageH - 7, { align: "center" });
      };

      const drawContentChrome = () => {
        // Top header (repeated on every diagnostic page)
        pdf.setTextColor(201, 168, 76);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.text(kicker, pageW / 2, 9, { align: "center" });
        pdf.setTextColor(31, 58, 95);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text(title, pageW / 2, 14, { align: "center" });
        pdf.setDrawColor(201, 168, 76);
        pdf.setLineWidth(0.3);
        pdf.line(margin, headerH - 1, pageW - margin, headerH - 1);
        drawFooter();
      };

      // ============ COVER PAGE ============
      try {
        const logoInfo = await loadImageWithSize(logoBuildfluence);
        const targetW = 90; // mm — large centered logo (contains wordmark + baseline)
        const ratio = logoInfo.height / logoInfo.width;
        const targetH = targetW * ratio;
        pdf.addImage(logoInfo.dataUrl, "PNG", (pageW - targetW) / 2, 26, targetW, targetH);
      } catch { /* logo optional */ }

      pdf.setTextColor(201, 168, 76);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(t2("ÉTUDE NATIONALE 2026 · PAR BUILDFLUENCE", "NATIONAL STUDY 2026 · BY BUILDFLUENCE", lang), pageW / 2, 100, { align: "center" });

      pdf.setTextColor(31, 58, 95);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      const titleLines = pdf.splitTextToSize(title, pageW - 40);
      pdf.text(titleLines, pageW / 2, 116, { align: "center" });
      const titleH = titleLines.length * 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(
        t2(
          "Diagnostic personnalisé · Indice de Souveraineté Décisionnelle",
          "Personalized diagnosis · Decision Sovereignty Index",
          lang,
        ),
        pageW / 2, 120 + titleH, { align: "center" }
      );

      pdf.setDrawColor(201, 168, 76);
      pdf.setLineWidth(0.6);
      pdf.line(pageW / 2 - 22, 128 + titleH, pageW / 2 + 22, 128 + titleH);

      const now = new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const yyyy = now.getFullYear();
      const dateStr = lang === "fr" ? `Établi le ${dd}/${mm}/${yyyy}` : `Issued on ${dd}/${mm}/${yyyy}`;
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(11);
      pdf.text(dateStr, pageW / 2, 138 + titleH, { align: "center" });

      const paragraph = t2(
        "Buildfluence conduit la première étude nationale consacrée à la souveraineté décisionnelle des organisations marocaines. À travers un référentiel inédit de quatre piliers et treize dimensions, cette démarche vise à établir le premier état des lieux rigoureux de la maturité en intelligence stratégique au Maroc, et à en faire un bien commun au service des décideurs. Ce diagnostic personnalisé constitue votre première pierre à cet édifice national.",
        "Buildfluence is conducting the first national study dedicated to the decision sovereignty of Moroccan organizations. Through an unprecedented framework of four pillars and thirteen dimensions, this initiative aims to establish the first rigorous assessment of strategic intelligence maturity in Morocco, and to make it a common good serving decision-makers. This personalized diagnosis is your first contribution to this national edifice.",
        lang,
      );
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      const paraLines = pdf.splitTextToSize(paragraph, pageW - 44);
      pdf.text(paraLines, pageW / 2, 152 + titleH, { align: "center", maxWidth: pageW - 44 });

      // Cover footer
      drawFooter();

      // ============ CONTENT PAGES ============
      // Render each block into an offscreen HTML container, rasterize as one image,
      // then paginate so no block ever splits across pages.
      const BLOCK_PX_WIDTH = 900; // px width for offscreen render → scales to contentW
      const pxToMm = contentW / BLOCK_PX_WIDTH;

      const renderBlockToCanvas = async (html: string): Promise<HTMLCanvasElement> => {
        const holder = document.createElement("div");
        holder.style.cssText = `position:fixed;left:-20000px;top:0;width:${BLOCK_PX_WIDTH}px;background:#FAF6ED;padding:0;margin:0;`;
        holder.innerHTML = html;
        document.body.appendChild(holder);
        try {
          const c = await html2canvas(holder, {
            scale: 2,
            backgroundColor: "#FAF6ED",
            useCORS: true,
            logging: false,
          });
          return c;
        } finally {
          document.body.removeChild(holder);
        }
      };

      // Pre-rasterize the live radar (with its legend) as one non-breakable image
      let radarImgData = "";
      let radarRatio = 1;
      if (radarRef.current) {
        const rc = await html2canvas(radarRef.current, {
          scale: 2,
          backgroundColor: "#FFFFFF",
          useCORS: true,
          logging: false,
        });
        radarImgData = rc.toDataURL("image/png");
        radarRatio = rc.height / rc.width;
      }

      // Start first content page
      pdf.addPage();
      drawContentChrome();
      let cursorY = contentTop;

      const placeBlock = async (html: string) => {
        const c = await renderBlockToCanvas(html);
        const wMm = contentW;
        let hMm = (c.height / c.width) * wMm;
        // If a single block exceeds a full content page, cap width to fit height (rare)
        if (hMm > contentH) {
          const scale = contentH / hMm;
          hMm = contentH;
          const newW = wMm * scale;
          const offsetX = margin + (contentW - newW) / 2;
          pdf.addPage();
          drawContentChrome();
          pdf.addImage(c.toDataURL("image/jpeg", 0.92), "JPEG", offsetX, contentTop, newW, hMm);
          cursorY = contentTop + hMm + 6;
          return;
        }
        if (cursorY + hMm > contentBottom) {
          pdf.addPage();
          drawContentChrome();
          cursorY = contentTop;
        }
        pdf.addImage(c.toDataURL("image/jpeg", 0.92), "JPEG", margin, cursorY, wMm, hMm);
        cursorY += hMm + 6;
      };

      // ---- shared style tokens ----
      const CSS = `
        font-family:'DM Sans',sans-serif;color:#1F3A5F;
      `;
      const overline = (label: string) => `
        <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#C9A84C;margin-bottom:10px;">${label}</div>
      `;

      // Block 1 — Indice global + niveau
      await placeBlock(`
        <div style="${CSS}display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div style="background:#fff;border-top:3px solid #C9A84C;padding:22px;">
            <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;letter-spacing:0.2em;color:#1F3A5F;opacity:0.7;">${t2("INDICE GLOBAL","GLOBAL INDEX",lang)}</div>
            <div style="font-family:'Playfair Display',serif;color:#1F3A5F;font-size:52px;font-weight:700;line-height:1;margin-top:6px;">
              ${result.score_global.toFixed(2)}<span style="font-size:22px;opacity:0.5;"> / 4</span>
            </div>
          </div>
          <div style="background:#1F3A5F;color:#fff;padding:22px;">
            <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;letter-spacing:0.2em;color:#C9A84C;">${t2("NIVEAU ATTEINT","LEVEL REACHED",lang)}</div>
            <div style="font-family:'Playfair Display',serif;font-size:32px;font-weight:600;margin-top:6px;line-height:1.15;">${NIVEAUX[nivIndex][lang].name}</div>
            <div style="font-family:'DM Sans',sans-serif;font-size:14px;margin-top:8px;opacity:0.9;line-height:1.5;">${NIVEAUX[nivIndex][lang].desc}</div>
          </div>
        </div>
      `);

      // Block 2 — Échelle des 5 niveaux
      const scaleRows = NIVEAUX.map((n, i) => {
        const active = i === nivIndex;
        return `
          <div style="display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:flex-start;padding:12px 16px;margin-bottom:6px;background:${active ? "#fff" : "transparent"};border-left:3px solid ${active ? "#C9A84C" : "rgba(31,58,95,0.15)"};">
            <div style="font-family:'Playfair Display',serif;color:${active ? "#C9A84C" : "#1F3A5F"};font-size:24px;font-weight:700;opacity:${active ? 1 : 0.6};min-width:26px;">${i}</div>
            <div>
              <div style="font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:15px;font-weight:${active ? 700 : 600};">${n[lang].name}</div>
              <div style="font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:13px;opacity:0.75;line-height:1.5;">${n[lang].desc}</div>
            </div>
          </div>`;
      }).join("");
      await placeBlock(`
        <div style="${CSS}">
          ${overline(t2("ÉCHELLE DES 5 NIVEAUX","5-LEVEL SCALE",lang))}
          ${scaleRows}
        </div>
      `);

      // Block 3 — Radar (l'image rasterisée contient déjà titre + légende)
      if (radarImgData) {
        await placeBlock(`
          <div style="${CSS}background:#fff;border-top:3px solid #C9A84C;padding:14px 22px 18px;">
            <img src="${radarImgData}" style="display:block;width:100%;margin:0 auto;height:auto;aspect-ratio:${(1/radarRatio).toFixed(3)};" />
          </div>
        `);
      }

      // Block 4 — Feuille de route (intro + première priorité groupées pour éviter l'orphelin)
      const firstPriority = roadmap[0];
      const introHtml = `
        <div style="${CSS}">
          ${overline(t2("FEUILLE DE ROUTE","ROADMAP",lang))}
          <div style="font-family:'Playfair Display',serif;color:#1F3A5F;font-size:26px;font-weight:600;margin:4px 0 12px;">${t2("Feuille de route","Roadmap",lang)}</div>
          <div style="font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:15px;line-height:1.6;margin-bottom:14px;">
            ${t2(
              `Votre point fort : ${strongest.name} (${strongest.value.toFixed(2)}). Trois priorités séquencées, de la plus urgente à consolider à la plus stratégique à ancrer.`,
              `Your strength: ${strongest.name} (${strongest.value.toFixed(2)}). Three sequenced priorities, from the most urgent to consolidate to the most strategic to anchor.`,
              lang,
            )}
          </div>
          ${firstPriority ? `
            <div style="background:#fff;border:1px solid rgba(31,58,95,0.12);border-left:3px solid #C9A84C;padding:20px 22px;">
              <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9A84C;">
                ${t2(`PRIORITÉ ${firstPriority.idx}`,`PRIORITY ${firstPriority.idx}`,lang)} · ${t2("PILIER","PILLAR",lang)} : ${firstPriority.pillarName}
              </div>
              <div style="font-family:'Playfair Display',serif;color:#1F3A5F;font-size:20px;font-weight:700;margin-top:6px;line-height:1.25;">${firstPriority.pillarName}</div>
              <div style="font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:15px;line-height:1.55;margin-top:8px;">${firstPriority.lever}</div>
              <div style="margin-top:12px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#C9A84C;">
                ${t2("Solution Buildfluence","Buildfluence solution",lang)} : ${firstPriority.solution.name} →
              </div>
            </div>
          ` : ""}
        </div>
      `;
      await placeBlock(introHtml);

      // Priorités restantes — un bloc atomique par carte
      for (const r of roadmap.slice(1)) {
        await placeBlock(`
          <div style="${CSS}background:#fff;border:1px solid rgba(31,58,95,0.12);border-left:3px solid #C9A84C;padding:20px 22px;">
            <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9A84C;">
              ${t2(`PRIORITÉ ${r.idx}`,`PRIORITY ${r.idx}`,lang)} · ${t2("PILIER","PILLAR",lang)} : ${r.pillarName}
            </div>
            <div style="font-family:'Playfair Display',serif;color:#1F3A5F;font-size:20px;font-weight:700;margin-top:6px;line-height:1.25;">${r.pillarName}</div>
            <div style="font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:15px;line-height:1.55;margin-top:8px;">${r.lever}</div>
            <div style="margin-top:12px;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#C9A84C;">
              ${t2("Solution Buildfluence","Buildfluence solution",lang)} : ${r.solution.name} →
            </div>
          </div>
        `);
      }

      // Block 5 — phrase d'attente
      await placeBlock(`
        <div style="${CSS}padding:16px 20px;background:rgba(31,58,95,0.06);border-left:3px solid #C9A84C;font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:14px;line-height:1.65;font-style:italic;">
          ${waitingPhrase}
        </div>
      `);

      // Block 6 — point de vigilance souveraineté (conditionnel)
      if (result.foreign_dependency) {
        const volets: { label: string; nature: string }[] = [];
        if (origins.dd_cabinet_origine === "etranger") {
          volets.push({ label: t2("Due diligence (Q9)","Due diligence (Q9)",lang), nature: t2("cabinet externe étranger","foreign external firm",lang) });
        }
        if (origins.veille_prestataire_origine === "etranger") {
          volets.push({ label: t2("Veille — outil (V2)","Monitoring — tool (V2)",lang), nature: t2("prestataire externe étranger","foreign external provider",lang) });
        }
        if (origins.veille_externalisation_origine === "etranger") {
          volets.push({ label: t2("Veille — organisation (V3)","Monitoring — organization (V3)",lang), nature: t2("cabinet externe étranger","foreign external firm",lang) });
        }
        const voletsHtml = volets.length
          ? `<ul style="margin:10px 0 0;padding:0;list-style:none;font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:13px;line-height:1.7;">
              ${volets.map(v => `<li style="padding-left:14px;position:relative;"><span style="position:absolute;left:0;color:#C9A84C;">›</span><strong>${v.label} :</strong> ${v.nature}.</li>`).join("")}
             </ul>`
          : "";
        await placeBlock(`
          <div style="${CSS}background:#fff;border-top:3px solid #C9A84C;border-left:1px solid rgba(31,58,95,0.15);border-right:1px solid rgba(31,58,95,0.15);border-bottom:1px solid rgba(31,58,95,0.15);padding:18px 22px;">
            <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9A84C;margin-bottom:8px;">
              ${t2("POINT DE VIGILANCE SOUVERAINETÉ","SOVEREIGNTY WATCH POINT",lang)}
            </div>
            <div style="font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:14px;line-height:1.65;">
              ${t2(
                "Une partie de votre dispositif repose sur des prestataires étrangers. Une montée en autonomie sur ce volet renforcerait votre souveraineté décisionnelle.",
                "Part of your setup relies on foreign providers. Building greater autonomy on this front would strengthen your decision sovereignty.",
                lang,
              )}
            </div>
            ${voletsHtml}
          </div>
        `);
      }

      // Block 7 — positionnement national différé
      await placeBlock(`
        <div style="${CSS}padding:14px 18px;background:rgba(31,58,95,0.06);border-left:3px solid #1F3A5F;font-family:'DM Sans',sans-serif;color:#1F3A5F;font-size:13px;line-height:1.6;">
          ${t2(
            "Votre positionnement national vous sera révélé à l'issue de l'étude 2026.",
            "Your national positioning will be revealed at the conclusion of the 2026 study.",
            lang,
          )}
        </div>
      `);

      pdf.save("Diagnostic-ISD-Buildfluence.pdf");
    } catch (e) {
      toast({
        title: t2("Téléchargement impossible", "Download failed", lang),
        description: t2("Merci de réessayer.", "Please try again.", lang),
        variant: "destructive",
      });
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <div className="isd-print-area" ref={pdfRef}>
      <style>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          body { background: #FAF6ED !important; }
          body * { visibility: hidden !important; }
          .isd-print-area, .isd-print-area * { visibility: visible !important; }
          .isd-print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 0 !important; background: #FAF6ED !important; }
          .no-print { display: none !important; }
          .isd-print-header, .isd-print-footer { display: block !important; visibility: visible !important; }
          .isd-print-header { text-align: center; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid rgba(31,58,95,0.25); }
          .isd-print-footer { text-align: center; margin-top: 24px; padding-top: 12px; border-top: 1px solid rgba(31,58,95,0.25); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.2em; color: #1F3A5F; }
          .isd-print-area a { color: #1F3A5F !important; text-decoration: none !important; }
          .isd-roadmap-card { break-inside: avoid; }
        }
        .isd-print-header, .isd-print-footer { display: none; }
        .isd-roadmap-card { background: #fff; border: 1px solid rgba(31,58,95,0.12); border-left: 3px solid ${GOLD}; padding: 20px 22px; margin-bottom: 14px; transition: box-shadow .25s, transform .25s; }
        .isd-roadmap-card:hover { box-shadow: 0 8px 22px -12px rgba(31,58,95,0.25); transform: translateY(-2px); }
        .isd-roadmap-tag { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: ${GOLD}; }
        .isd-roadmap-pillar { font-family: 'Playfair Display', serif; color: ${NAVY}; font-size: 18px; font-weight: 700; margin-top: 6px; line-height: 1.25; }
        .isd-roadmap-lever { font-family: 'DM Sans', sans-serif; color: ${NAVY}; font-size: 14px; line-height: 1.55; margin-top: 8px; }
        .isd-roadmap-solution { display: inline-block; margin-top: 12px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: ${GOLD}; text-decoration: none; }
      `}</style>

      <div className="isd-print-header">
        <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: "0.25em", color: GOLD }}>
          {t2("ÉTUDE NATIONALE 2026", "NATIONAL STUDY 2026", lang)}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 18, fontWeight: 700, marginTop: 6 }}>
          {t2("État de la maturité en souveraineté décisionnelle au Maroc", "The state of decision sovereignty maturity in Morocco", lang)}
        </div>
      </div>

      <Overline icon={Gauge}>{t2("VOTRE DIAGNOSTIC ISD", "YOUR ISD DIAGNOSIS", lang)}</Overline>
      <H1>{t2("Indice de Souveraineté Décisionnelle", "Decision Sovereignty Index", lang)}</H1>

      {/* Score global + niveau */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "16px 0 28px" }}>
        <div style={{ background: "#fff", borderTop: `3px solid ${GOLD}`, padding: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.2em", color: NAVY, opacity: 0.7 }}>
            {t2("INDICE GLOBAL", "GLOBAL INDEX", lang)}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 44, fontWeight: 700, lineHeight: 1 }}>
            {result.score_global.toFixed(2)}
            <span style={{ fontSize: 20, color: NAVY, opacity: 0.5 }}> / 4</span>
          </div>
        </div>
        <div style={{ background: NAVY, color: "#fff", padding: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.2em", color: GOLD }}>
            {t2("NIVEAU ATTEINT", "LEVEL REACHED", lang)}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 600, marginTop: 4 }}>
            {NIVEAUX[nivIndex][lang].name}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginTop: 6, opacity: 0.85 }}>
            {NIVEAUX[nivIndex][lang].desc}
          </div>
        </div>
      </div>

      {/* Échelle 5 niveaux */}
      <div style={{ margin: "28px 0" }}>
        <Overline icon={ListOrdered}>{t2("ÉCHELLE DES 5 NIVEAUX", "5-LEVEL SCALE", lang)}</Overline>
        <div style={{ marginTop: 12 }}>
          {NIVEAUX.map((n, i) => {
            const active = i === nivIndex;
            return (
              <div key={n.key} style={{
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                padding: "12px 16px", marginBottom: 6,
                background: active ? "#fff" : "transparent",
                borderLeft: `3px solid ${active ? GOLD : "rgba(31,58,95,0.15)"}`,
                borderRadius: 2,
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", color: active ? GOLD : NAVY, fontSize: 22, fontWeight: 700, opacity: active ? 1 : 0.6, minWidth: 24 }}>{i}</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, fontSize: 14, fontWeight: active ? 700 : 600 }}>{n[lang].name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, fontSize: 13, opacity: 0.75, lineHeight: 1.5 }}>{n[lang].desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Radar */}
      <div ref={radarRef} style={{ margin: "28px 0", background: "#fff", padding: 20, borderTop: `3px solid ${GOLD}` }}>
        <Overline icon={RadarIcon}>{t2("RADAR DES 4 PILIERS", "4-PILLAR RADAR", lang)}</Overline>
        <div style={{ width: "100%", height: 360, marginTop: 12 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={pillars} outerRadius="72%">
              <PolarGrid stroke="rgba(31,58,95,0.25)" />
              <PolarAngleAxis dataKey="name" tick={{ fill: NAVY, fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} />
              <PolarRadiusAxis angle={90} domain={[0, 4]} tick={{ fill: NAVY, fontSize: 10 }} stroke="rgba(31,58,95,0.2)" />
              <Radar name="ISD" dataKey="value" stroke={GOLD} fill={GOLD} fillOpacity={0.35} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginTop: 8 }}>
          {pillars.map((p) => (
            <div key={p.key} style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, color: NAVY }}>
              <span style={{ color: GOLD }}>■</span> {p.name} : <strong>{p.value.toFixed(2)}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Feuille de route */}
      <div style={{ margin: "28px 0" }}>
        <Overline icon={Route}>{t2("FEUILLE DE ROUTE", "ROADMAP", lang)}</Overline>
        <H2>{t2("Feuille de route", "Roadmap", lang)}</H2>
        <Body>
          {t2(
            `Votre point fort : ${strongest.name} (${strongest.value.toFixed(2)}). Trois priorités séquencées, de la plus urgente à consolider à la plus stratégique à ancrer.`,
            `Your strength: ${strongest.name} (${strongest.value.toFixed(2)}). Three sequenced priorities, from the most urgent to consolidate to the most strategic to anchor.`,
            lang,
          )}
        </Body>
        <div style={{ marginTop: 8 }}>
          {roadmap.map((r) => (
            <div key={r.idx} className="isd-roadmap-card">
              <div className="isd-roadmap-tag">
                {t2(`PRIORITÉ ${r.idx}`, `PRIORITY ${r.idx}`, lang)} · {t2("PILIER", "PILLAR", lang)} : {r.pillarName}
              </div>
              <div className="isd-roadmap-pillar">{r.pillarName}</div>
              <div className="isd-roadmap-lever">{r.lever}</div>
              <a href={r.solution.href} className="isd-roadmap-solution">
                {t2("Solution Buildfluence", "Buildfluence solution", lang)} : {r.solution.name} →
              </a>
            </div>
          ))}
        </div>

        {/* Phrase d'attente */}
        <div style={{ marginTop: 18, padding: "14px 18px", background: "rgba(31,58,95,0.06)", borderLeft: `3px solid ${GOLD}`, fontFamily: "'DM Sans', sans-serif", color: NAVY, fontSize: 13, lineHeight: 1.65, fontStyle: "italic" }}>
          {waitingPhrase}
        </div>
      </div>

      {/* Point de vigilance souveraineté — s'affiche uniquement si dépendance étrangère détectée. Ne score pas. */}
      {result.foreign_dependency && (() => {
        const volets: { label: string; nature: string }[] = [];
        if (origins.dd_cabinet_origine === "etranger") {
          volets.push({
            label: t2("Due diligence (Q9)", "Due diligence (Q9)", lang),
            nature: t2("cabinet externe étranger", "foreign external firm", lang),
          });
        }
        if (origins.veille_prestataire_origine === "etranger") {
          volets.push({
            label: t2("Veille — outil (V2)", "Monitoring — tool (V2)", lang),
            nature: t2("prestataire externe étranger", "foreign external provider", lang),
          });
        }
        if (origins.veille_externalisation_origine === "etranger") {
          volets.push({
            label: t2("Veille — organisation (V3)", "Monitoring — organization (V3)", lang),
            nature: t2("cabinet externe étranger", "foreign external firm", lang),
          });
        }
        return (
          <div style={{ margin: "28px 0", padding: "16px 20px", background: "#fff", borderTop: `3px solid ${GOLD}`, borderLeft: `1px solid rgba(31,58,95,0.15)`, borderRight: `1px solid rgba(31,58,95,0.15)`, borderBottom: `1px solid rgba(31,58,95,0.15)` }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
              <ShieldAlert size={14} strokeWidth={1.5} color={GOLD} style={{ flexShrink: 0 }} />
              <span>{t2("POINT DE VIGILANCE SOUVERAINETÉ", "SOVEREIGNTY WATCH POINT", lang)}</span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, fontSize: 14, lineHeight: 1.65, marginBottom: volets.length ? 10 : 0 }}>
              {t2(
                "Une partie de votre dispositif repose sur des prestataires étrangers. Une montée en autonomie sur ce volet renforcerait votre souveraineté décisionnelle.",
                "Part of your setup relies on foreign providers. Building greater autonomy on this front would strengthen your decision sovereignty.",
                lang,
              )}
            </div>
            {volets.length > 0 && (
              <ul style={{ margin: 0, padding: 0, listStyle: "none", fontFamily: "'DM Sans', sans-serif", color: NAVY, fontSize: 13, lineHeight: 1.7 }}>
                {volets.map((v, i) => (
                  <li key={i} style={{ paddingLeft: 14, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: GOLD }}>›</span>
                    <strong>{v.label} :</strong> {v.nature}.
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })()}


      {/* Bloc positionnement national */}
      <div style={{ margin: "28px 0", padding: "14px 18px", background: "rgba(31,58,95,0.06)", borderLeft: `3px solid ${NAVY}`, fontFamily: "'DM Sans', sans-serif", color: NAVY, fontSize: 13, lineHeight: 1.6 }}>
        {t2(
          "Votre positionnement national vous sera révélé à l'issue de l'étude 2026.",
          "Your national positioning will be revealed at the conclusion of the 2026 study.",
          lang,
        )}
      </div>

      {/* CTA calibré par température + PDF */}
      <div className="no-print" style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <GoldButton onClick={onExchange}>{ctaLabel}</GoldButton>
        <GhostButton onClick={handleDownloadPdf}>
          {pdfBusy
            ? t2("Génération…", "Generating…", lang)
            : t2("Télécharger ma synthèse (PDF)", "Download my summary (PDF)", lang)}
        </GhostButton>
      </div>

      <div className="isd-print-footer">© Buildfluence · www.buildfluence.ai · info@buildfluence.ai</div>
    </div>
  );
};


export default EnqueteISD;
