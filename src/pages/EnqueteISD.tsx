import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

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

// --- Ancrages échelle 0-4 par question (FR) ---
type QDef = {
  key: string;
  pillar: 1 | 3 | 4;
  numero: string;
  dim: { fr: string; en: string };
  question: { fr: string; en: string };
  anchors: { fr: string[]; en: string[] };
  tool?: {
    label: { fr: string; en: string };
    multi: boolean;
    options: { fr: string[]; en: string[] };
    field: "outil_donnee" | "outil_carto" | "outil_crise" | "outil_signaux" | "dd_realisation";
  };
};

const QUESTIONS: QDef[] = [
  {
    key: "q1", pillar: 1, numero: "Q1",
    dim: { fr: "Anticipation", en: "Anticipation" },
    question: {
      fr: "Comment vos décisions stratégiques intègrent-elles l'anticipation des ruptures ?",
      en: "How do your strategic decisions integrate anticipation of disruptions?",
    },
    anchors: {
      fr: [
        "Nous décidons à l'instant, sans regard prospectif.",
        "Nous réagissons aux ruptures une fois qu'elles surviennent.",
        "Quelques exercices de scénarios, ponctuels et non reliés aux décisions.",
        "Démarche prospective formalisée, alimentant nos décisions clés.",
        "Anticipation systématique des ruptures, intégrée et créatrice d'avantage.",
      ],
      en: [
        "We decide in the moment, with no forward view.",
        "We react to disruptions once they occur.",
        "Some occasional scenario exercises, not linked to decisions.",
        "Formalized foresight approach feeding our key decisions.",
        "Systematic anticipation of disruptions, embedded and value-creating.",
      ],
    },
  },
  {
    key: "q2", pillar: 1, numero: "Q2",
    dim: { fr: "Donnée dans la décision", en: "Data in decision-making" },
    question: {
      fr: "Dans quelle mesure vos décisions majeures s'appuient-elles sur des données structurées ?",
      en: "To what extent do your major decisions rely on structured data?",
    },
    anchors: {
      fr: [
        "Décisions à l'intuition, sans donnée mobilisée.",
        "Données regardées après coup, pour justifier une décision déjà prise.",
        "Données disponibles mais dispersées, mobilisées de façon inégale.",
        "Données structurées intégrées au processus de décision.",
        "Décision pilotée par la donnée, en temps quasi réel, sur indicateurs maîtrisés.",
      ],
      en: [
        "Decisions made on intuition, no data mobilized.",
        "Data reviewed after the fact to justify a decision already made.",
        "Data available but scattered, mobilized unevenly.",
        "Structured data embedded in the decision process.",
        "Data-driven decision-making, near real-time, on mastered indicators.",
      ],
    },
    tool: {
      label: { fr: "Comment vos données de décision sont-elles structurées et exploitées ?", en: "How is your decision data structured and used?" },
      multi: true, field: "outil_donnee",
      options: {
        fr: ["Saisie manuelle / Excel", "Base de données ou ERP", "Entrepôt de données (data warehouse)", "Outil de BI ou dashboards", "Aucune structuration formelle"],
        en: ["Manual entry / Excel", "Database or ERP", "Data warehouse", "BI tool or dashboards", "No formal structuring"],
      },
    },
  },
  {
    key: "q3", pillar: 1, numero: "Q3",
    dim: { fr: "Gouvernance de l'information", en: "Information governance" },
    question: {
      fr: "Comment l'information stratégique est-elle collectée, qualifiée, protégée et diffusée en interne ?",
      en: "How is strategic information collected, qualified, protected and shared internally?",
    },
    anchors: {
      fr: [
        "Aucune gouvernance, circulation informelle.",
        "Circulation au gré des personnes, sans règle ni protection.",
        "Premières règles, appliquées partiellement, sans responsable clair.",
        "Gouvernance formalisée, responsabilités et protection définies.",
        "Information pilotée comme un actif, sécurisée et valorisée.",
      ],
      en: [
        "No governance, informal circulation.",
        "Circulation driven by individuals, no rules or protection.",
        "Initial rules, partially applied, no clear owner.",
        "Formal governance, responsibilities and protection defined.",
        "Information managed as an asset, secured and valued.",
      ],
    },
  },
  {
    key: "q4", pillar: 3, numero: "Q4",
    dim: { fr: "Process IE", en: "Business Intelligence process" },
    question: {
      fr: "Disposez-vous d'un processus formalisé d'intelligence économique (besoins, collecte, analyse, diffusion) ?",
      en: "Do you have a formal business intelligence process (needs, collection, analysis, dissemination)?",
    },
    anchors: {
      fr: [
        "Aucun processus.",
        "Démarches isolées, ponctuelles.",
        "Premières briques, non systématisées.",
        "Cycle IE formalisé, du besoin à la diffusion.",
        "IE intégrée au pilotage, boucle continue.",
      ],
      en: [
        "No process.",
        "Isolated, occasional actions.",
        "Initial building blocks, not systematized.",
        "Formal BI cycle, from need to dissemination.",
        "BI embedded in steering, continuous loop.",
      ],
    },
  },
  {
    key: "q5", pillar: 3, numero: "Q5",
    dim: { fr: "Cartographie des risques", en: "Risk mapping" },
    question: {
      fr: "Disposez-vous d'une cartographie actualisée et reliée à vos décisions stratégiques ?",
      en: "Do you have an up-to-date risk map connected to your strategic decisions?",
    },
    anchors: {
      fr: [
        "Aucune cartographie.",
        "Risques identifiés après incident.",
        "Cartographie non actualisée ni reliée aux décisions.",
        "Cartographie formalisée, actualisée, revue périodiquement.",
        "Cartographie dynamique, intégrée au pilotage et aux scénarios.",
      ],
      en: [
        "No mapping.",
        "Risks identified after incidents.",
        "Mapping not updated nor linked to decisions.",
        "Formal, regularly reviewed and updated mapping.",
        "Dynamic mapping, embedded in steering and scenarios.",
      ],
    },
    tool: {
      label: { fr: "Avec quel outil ?", en: "With which tool?" },
      multi: true, field: "outil_carto",
      options: {
        fr: ["Excel / tableur", "Solution GRC dédiée", "Module ERP", "Outil interne maison", "Aucun outil"],
        en: ["Excel / spreadsheet", "Dedicated GRC solution", "ERP module", "In-house tool", "No tool"],
      },
    },
  },
  {
    key: "q6", pillar: 3, numero: "Q6",
    dim: { fr: "Gestion des crises", en: "Crisis management" },
    question: {
      fr: "Comment êtes-vous préparés à gérer une crise (cellule, protocoles, simulations) ?",
      en: "How prepared are you to handle a crisis (unit, protocols, simulations)?",
    },
    anchors: {
      fr: [
        "Aucune préparation.",
        "Réaction au cas par cas.",
        "Procédures non testées.",
        "Cellule et protocoles activables.",
        "Dispositif éprouvé, simulé régulièrement.",
      ],
      en: [
        "No preparation.",
        "Case-by-case reaction.",
        "Untested procedures.",
        "Activatable unit and protocols.",
        "Proven setup, regularly simulated.",
      ],
    },
    tool: {
      label: { fr: "Comment est-il préparé ?", en: "How is it prepared?" },
      multi: true, field: "outil_crise",
      options: {
        fr: ["Aucun", "Procédures écrites non testées", "Cellule désignée", "Simulations régulières", "Prestataire spécialisé"],
        en: ["None", "Written untested procedures", "Designated unit", "Regular simulations", "Specialized provider"],
      },
    },
  },
  {
    key: "q7", pillar: 3, numero: "Q7",
    dim: { fr: "Détection des signaux faibles", en: "Weak signal detection" },
    question: {
      fr: "Comment captez-vous et traitez-vous les signaux faibles avant qu'ils ne deviennent des menaces ?",
      en: "How do you capture and process weak signals before they become threats?",
    },
    anchors: {
      fr: [
        "Aucun mécanisme.",
        "Vus une fois devenus des problèmes.",
        "Détection dépendante de quelques personnes.",
        "Mécanisme structuré de captation et remontée.",
        "Détection anticipative outillée, reliée à la décision.",
      ],
      en: [
        "No mechanism.",
        "Seen only once they become problems.",
        "Detection reliant on a few individuals.",
        "Structured capture and escalation mechanism.",
        "Anticipative, tool-supported detection linked to decisions.",
      ],
    },
    tool: {
      label: { fr: "Quel dispositif ?", en: "Which setup?" },
      multi: true, field: "outil_signaux",
      options: {
        fr: ["Aucun", "Remontées informelles", "Cellule de veille dédiée", "Outil de détection ou scoring", "Prestataire spécialisé"],
        en: ["None", "Informal reporting", "Dedicated monitoring unit", "Detection or scoring tool", "Specialized provider"],
      },
    },
  },
  {
    key: "q8", pillar: 3, numero: "Q8",
    dim: { fr: "Dispositifs de résilience", en: "Resilience arrangements" },
    question: {
      fr: "Quels dispositifs garantissent la continuité de votre activité face à un choc majeur ?",
      en: "What arrangements ensure business continuity in the face of a major shock?",
    },
    anchors: {
      fr: [
        "Aucun dispositif.",
        "Réponse improvisée.",
        "Plans partiels ou obsolètes.",
        "Plan de continuité formalisé et maintenu.",
        "Résilience éprouvée, testée, intégrée à la gouvernance.",
      ],
      en: [
        "No arrangements.",
        "Improvised response.",
        "Partial or outdated plans.",
        "Formal, maintained continuity plan.",
        "Tested resilience, embedded in governance.",
      ],
    },
  },
  {
    key: "q9", pillar: 4, numero: "Q9",
    dim: { fr: "Évaluation des investisseurs", en: "Investor evaluation" },
    question: {
      fr: "Comment évaluez-vous la fiabilité et les intentions réelles d'un investisseur ou partenaire financier ?",
      en: "How do you assess the reliability and true intentions of an investor or financial partner?",
    },
    anchors: {
      fr: [
        "Aucune évaluation.",
        "Vérifications sommaires.",
        "Contrôles partiels.",
        "Processus formalisé avant engagement.",
        "Due diligence approfondie sur intentions et arrière-plan.",
      ],
      en: [
        "No evaluation.",
        "Basic checks.",
        "Partial controls.",
        "Formal process before commitment.",
        "In-depth due diligence on intentions and background.",
      ],
    },
    tool: {
      label: { fr: "Vos due diligences sont réalisées :", en: "Your due diligence is carried out:" },
      multi: false, field: "dd_realisation",
      options: {
        fr: ["En interne", "Par un cabinet externe", "En mixte", "Au cas par cas", "Jamais formellement"],
        en: ["In-house", "By an external firm", "Mixed", "Case-by-case", "Never formally"],
      },
    },
  },
  {
    key: "q10", pillar: 4, numero: "Q10",
    dim: { fr: "Vérification des partenaires", en: "Partner verification" },
    question: {
      fr: "Comment vérifiez-vous l'intégrité et la solidité de vos partenaires avant un engagement ?",
      en: "How do you verify the integrity and soundness of partners before commitment?",
    },
    anchors: {
      fr: [
        "Aucune vérification.",
        "Informelle, bouche-à-oreille.",
        "Contrôles ponctuels.",
        "Processus formalisé et documenté.",
        "Vérification approfondie, réputation et réseau inclus.",
      ],
      en: [
        "No verification.",
        "Informal, word-of-mouth.",
        "Occasional controls.",
        "Formal, documented process.",
        "In-depth verification including reputation and network.",
      ],
    },
  },
  {
    key: "q11", pillar: 4, numero: "Q11",
    dim: { fr: "Influence et rayonnement", en: "Influence and outreach" },
    question: {
      fr: "Comment pilotez-vous votre influence, votre attractivité et votre rayonnement dans votre écosystème ?",
      en: "How do you steer your influence, attractiveness and outreach within your ecosystem?",
    },
    anchors: {
      fr: [
        "Rayonnement subi, aucune stratégie.",
        "Actions ponctuelles, réactives.",
        "Présence entretenue, sans stratégie structurée.",
        "Stratégie d'influence formalisée, relations clés pilotées.",
        "Influence active et mesurée, créatrice d'ascendant.",
      ],
      en: [
        "Passive outreach, no strategy.",
        "Occasional, reactive actions.",
        "Maintained presence, no structured strategy.",
        "Formal influence strategy, key relationships managed.",
        "Active, measured influence, creating ascendancy.",
      ],
    },
  },
  {
    key: "q12", pillar: 4, numero: "Q12",
    dim: { fr: "Compliance et risques tiers", en: "Compliance and third-party risks" },
    question: {
      fr: "Comment maîtrisez-vous les risques de conformité liés à vos tiers (fournisseurs, intermédiaires) ?",
      en: "How do you master compliance risks related to third parties (suppliers, intermediaries)?",
    },
    anchors: {
      fr: [
        "Aucune maîtrise.",
        "Réactif, après incident.",
        "Conformité partielle, non étendue aux tiers.",
        "Dispositif de conformité tiers formalisé.",
        "Maîtrise continue, outillée et auditée.",
      ],
      en: [
        "No control.",
        "Reactive, after incident.",
        "Partial compliance, not extended to third parties.",
        "Formal third-party compliance setup.",
        "Continuous, tool-supported and audited control.",
      ],
    },
  },
];

const LEVEL_LABELS = { fr: ["0 Embryonnaire", "1 Réactif", "2 Émergent", "3 Structuré", "4 Souverain"], en: ["0 Embryonic", "1 Reactive", "2 Emerging", "3 Structured", "4 Sovereign"] };

const VEILLE_THEMES = {
  fr: ["Concurrentielle", "Sectorielle", "Géopolitique / réglementaire", "Technologique", "Image / réputation", "Appels d'offres", "Brevets / propriété intellectuelle", "Aucune"],
  en: ["Competitive", "Sectoral", "Geopolitical / regulatory", "Technological", "Image / reputation", "Tenders", "Patents / IP", "None"],
};
const VEILLE_OUTIL = {
  fr: ["Alertes manuelles (type Google Alerts)", "Plateforme de veille dédiée", "Prestataire externe", "Cellule interne outillée", "Aucun"],
  en: ["Manual alerts (Google Alerts type)", "Dedicated monitoring platform", "External provider", "In-house equipped unit", "None"],
};
const VEILLE_ORG = {
  fr: ["Aucune", "Chacun fait sa veille", "Référent informel", "Cellule interne dédiée", "Externalisée", "Mixte"],
  en: ["None", "Everyone monitors on their own", "Informal referent", "Dedicated in-house unit", "Outsourced", "Mixed"],
};
const VEILLE_CAPI = {
  fr: ["Aucune", "Notes internes ponctuelles", "Base de connaissance partagée", "Newsletter ou magazine interne régulier", "Diffusion externe (rayonnement)"],
  en: ["None", "Occasional internal notes", "Shared knowledge base", "Regular internal newsletter or magazine", "External publication (outreach)"],
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
const Overline = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD }}>{children}</div>
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
  step: number; // 0 accueil, 1 taggage, 2..13 questions P1/Veille/P3/P4, 14 opt-in, 15 appro, 16 commentaire, 17 contact
  secteur: string; type_organisation: string; fonction: string;
  answers: Record<string, Scale>;
  tools: Record<string, string[] | string | null>;
  veille_thematiques: string[]; veille_outil: string | null; veille_organisation: string | null; veille_capitalisation: string | null;
  approfondissement: boolean | null;
  appro: Record<string, string>;
  commentaire_ouvert: string;
  contact_nom: string; contact_fonction: string; contact_organisation: string; contact_email: string;
};

const initialState: State = {
  step: 0, secteur: "", type_organisation: "", fonction: "",
  answers: {}, tools: {},
  veille_thematiques: [], veille_outil: null, veille_organisation: null, veille_capitalisation: null,
  approfondissement: null, appro: {},
  commentaire_ouvert: "",
  contact_nom: "", contact_fonction: "", contact_organisation: "", contact_email: "",
};

const EnqueteISD = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [s, setS] = useState<State>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // 4 étapes fonctionnelles pour la barre (Piliers I·II·III·IV)
  const totalPillars = 4;
  const pillarActive = useMemo(() => {
    if (s.step <= 1) return 0;
    if (s.step >= 2 && s.step <= 4) return 1; // P1 (Q1-Q3)
    if (s.step === 5) return 2; // Veille
    if (s.step >= 6 && s.step <= 10) return 3; // P3 (Q4-Q8)
    if (s.step >= 11 && s.step <= 14) return 4; // P4 (Q9-Q12)
    return 4;
  }, [s.step]);

  const setAnswer = (key: string, val: Scale) => setS((p) => ({ ...p, answers: { ...p.answers, [key]: val } }));
  const setTool = (field: string, val: string[] | string | null) => setS((p) => ({ ...p, tools: { ...p.tools, [field]: val } }));

  const goNext = () => setS((p) => ({ ...p, step: p.step + 1 }));
  const goPrev = () => setS((p) => ({ ...p, step: Math.max(0, p.step - 1) }));

  const submit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        secteur: s.secteur, type_organisation: s.type_organisation, fonction: s.fonction,
        q1: s.answers.q1, q2: s.answers.q2, q3: s.answers.q3,
        q4: s.answers.q4, q5: s.answers.q5, q6: s.answers.q6, q7: s.answers.q7, q8: s.answers.q8,
        q9: s.answers.q9, q10: s.answers.q10, q11: s.answers.q11, q12: s.answers.q12,
        veille_thematiques: s.veille_thematiques,
        veille_outil: s.veille_outil,
        veille_organisation: s.veille_organisation,
        veille_capitalisation: s.veille_capitalisation,
        outil_donnee: (s.tools.outil_donnee as string[]) || [],
        outil_carto: (s.tools.outil_carto as string[]) || [],
        outil_crise: (s.tools.outil_crise as string[]) || [],
        outil_signaux: (s.tools.outil_signaux as string[]) || [],
        dd_realisation: (s.tools.dd_realisation as string) || null,
        approfondissement: !!s.approfondissement,
        appro: s.appro,
        commentaire_ouvert: s.commentaire_ouvert || null,
        contact_nom: s.contact_nom, contact_fonction: s.contact_fonction,
        contact_organisation: s.contact_organisation, contact_email: s.contact_email,
      };
      const { data, error } = await supabase.functions.invoke("score-isd", { body: payload });
      if (error || !(data as any)?.success) {
        throw new Error(error?.message || "submission_failed");
      }
      setDone(true);
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

          {done ? (
            <FinalDoneScreen lang={lang} onExchange={() => window.dispatchEvent(new Event("open-strategic-exchange"))} />
          ) : (
            <>
              {/* Barre de progression par piliers */}
              {s.step > 0 && (
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

              {s.step === 0 && <ScreenHome lang={lang} onStart={goNext} />}

              {s.step === 1 && (
                <ScreenTagging
                  lang={lang} state={s} setState={setS}
                  onNext={goNext} onPrev={() => navigate(-1)}
                />
              )}

              {/* Questions notées : mappe step -> question index */}
              {s.step >= 2 && s.step <= 4 && (
                <QuestionScreen lang={lang} qdef={QUESTIONS[s.step - 2]}
                  value={s.answers[QUESTIONS[s.step - 2].key] ?? null}
                  onValue={(v) => setAnswer(QUESTIONS[s.step - 2].key, v)}
                  toolValue={QUESTIONS[s.step - 2].tool ? s.tools[QUESTIONS[s.step - 2].tool!.field] as any : null}
                  onToolValue={(v) => QUESTIONS[s.step - 2].tool && setTool(QUESTIONS[s.step - 2].tool!.field, v)}
                  onNext={goNext} onPrev={goPrev}
                />
              )}

              {s.step === 5 && (
                <VeilleScreen lang={lang} state={s} setState={setS} onNext={goNext} onPrev={goPrev} />
              )}

              {s.step >= 6 && s.step <= 10 && (
                <QuestionScreen lang={lang} qdef={QUESTIONS[s.step - 6 + 3]}
                  value={s.answers[QUESTIONS[s.step - 6 + 3].key] ?? null}
                  onValue={(v) => setAnswer(QUESTIONS[s.step - 6 + 3].key, v)}
                  toolValue={QUESTIONS[s.step - 6 + 3].tool ? s.tools[QUESTIONS[s.step - 6 + 3].tool!.field] as any : null}
                  onToolValue={(v) => QUESTIONS[s.step - 6 + 3].tool && setTool(QUESTIONS[s.step - 6 + 3].tool!.field, v)}
                  onNext={goNext} onPrev={goPrev}
                />
              )}

              {s.step >= 11 && s.step <= 14 && (
                <QuestionScreen lang={lang} qdef={QUESTIONS[s.step - 11 + 8]}
                  value={s.answers[QUESTIONS[s.step - 11 + 8].key] ?? null}
                  onValue={(v) => setAnswer(QUESTIONS[s.step - 11 + 8].key, v)}
                  toolValue={QUESTIONS[s.step - 11 + 8].tool ? s.tools[QUESTIONS[s.step - 11 + 8].tool!.field] as any : null}
                  onToolValue={(v) => QUESTIONS[s.step - 11 + 8].tool && setTool(QUESTIONS[s.step - 11 + 8].tool!.field, v)}
                  onNext={goNext} onPrev={goPrev}
                />
              )}

              {s.step === 15 && (
                <OptInScreen lang={lang}
                  onYes={() => setS((p) => ({ ...p, approfondissement: true, step: 16 }))}
                  onNo={() => setS((p) => ({ ...p, approfondissement: false, step: 17 }))}
                  onPrev={goPrev}
                />
              )}

              {s.step === 16 && (
                <ApproScreen lang={lang} state={s} setState={setS} onNext={() => setS((p) => ({ ...p, step: 17 }))} onPrev={goPrev} />
              )}

              {s.step === 17 && (
                <OpenScreen lang={lang} state={s} setState={setS} onNext={goNext} onPrev={goPrev} />
              )}

              {s.step === 18 && (
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
const ScreenHome = ({ lang, onStart }: { lang: "fr" | "en"; onStart: () => void }) => {
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, margin: "24px 0 32px" }}>
        {pillars.map((p) => (
          <div key={p.num} style={{ background: "#fff", borderTop: `3px solid ${GOLD}`, padding: 20 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{p.num}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 16, fontWeight: 600, lineHeight: 1.25, marginBottom: 8 }}>{p.title[lang]}</div>
            <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, color: NAVY, opacity: 0.7, lineHeight: 1.5 }}>{p.dims[lang]}</div>
          </div>
        ))}
      </div>

      <GoldButton onClick={onStart}>{t2("Commencer le diagnostic", "Start the diagnosis", lang)}</GoldButton>
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

const QuestionScreen = ({ lang, qdef, value, onValue, toolValue, onToolValue, onNext, onPrev }: {
  lang: "fr" | "en"; qdef: QDef; value: Scale; onValue: (v: Scale) => void;
  toolValue: string[] | string | null; onToolValue: (v: string[] | string | null) => void;
  onNext: () => void; onPrev: () => void;
}) => {
  const canGo = value !== null;
  return (
    <div>
      <Overline>{`${qdef.numero} · ${qdef.dim[lang]}`}</Overline>
      <H2>{qdef.question[lang]}</H2>

      <div style={{ marginTop: 20, marginBottom: 24 }}>
        {qdef.anchors[lang].map((anchor, i) => {
          const active = value === i;
          return (
            <button key={i} type="button" onClick={() => onValue(i as Scale)} style={{
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
              {anchor}
            </button>
          );
        })}
      </div>

      {qdef.tool && (
        <ToolBlock lang={lang} label={qdef.tool.label[lang]} multi={qdef.tool.multi} options={qdef.tool.options[lang]}
          value={toolValue} onChange={onToolValue}
        />
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onNext} disabled={!canGo}>{t2("Continuer", "Continue", lang)}</GoldButton>
      </div>
    </div>
  );
};

const ToolBlock = ({ lang, label, multi, options, value, onChange }: {
  lang: "fr" | "en"; label: string; multi: boolean; options: string[];
  value: string[] | string | null; onChange: (v: string[] | string | null) => void;
}) => {
  const toggle = (opt: string) => {
    if (multi) {
      const cur = (Array.isArray(value) ? value : []) as string[];
      onChange(cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]);
    } else {
      onChange(value === opt ? null : opt);
    }
  };
  const selected = (opt: string) => multi ? (Array.isArray(value) && value.includes(opt)) : value === opt;
  return (
    <div style={{ borderTop: `1px solid rgba(31,58,95,0.15)`, paddingTop: 20, marginTop: 8 }}>
      <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>
        {t2("OUTILLAGE", "TOOLING", lang)} · {t2("ne note pas", "not scored", lang)}
      </div>
      <Body>{label}</Body>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => toggle(opt)} style={{
            background: selected(opt) ? NAVY : "#fff",
            color: selected(opt) ? "#fff" : NAVY,
            border: `1px solid ${selected(opt) ? NAVY : "rgba(31,58,95,0.25)"}`,
            padding: "8px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            cursor: "pointer", borderRadius: 2,
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );
};

const VeilleScreen = ({ lang, state, setState, onNext, onPrev }: any) => {
  const toggleTheme = (opt: string) => {
    const cur: string[] = state.veille_thematiques;
    setState({ ...state, veille_thematiques: cur.includes(opt) ? cur.filter((x: string) => x !== opt) : [...cur, opt] });
  };
  const canGo = state.veille_thematiques.length > 0 && state.veille_outil && state.veille_organisation && state.veille_capitalisation;

  const themesFr = VEILLE_THEMES.fr;
  const themesLang = VEILLE_THEMES[lang];

  const SingleChoice = ({ label, options, value, onChange }: { label: string; options: string[]; value: string | null; onChange: (v: string) => void }) => (
    <div style={{ marginBottom: 20 }}>
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

  // Mapping displayed (lang) -> canonical (fr) for storage
  const setOutil = (v: string) => {
    const idx = VEILLE_OUTIL[lang].indexOf(v);
    setState({ ...state, veille_outil: VEILLE_OUTIL.fr[idx] });
  };
  const setOrg = (v: string) => {
    const idx = VEILLE_ORG[lang].indexOf(v);
    setState({ ...state, veille_organisation: VEILLE_ORG.fr[idx] });
  };
  const setCapi = (v: string) => {
    const idx = VEILLE_CAPI[lang].indexOf(v);
    setState({ ...state, veille_capitalisation: VEILLE_CAPI.fr[idx] });
  };
  const currentOutil = state.veille_outil ? VEILLE_OUTIL[lang][VEILLE_OUTIL.fr.indexOf(state.veille_outil)] : null;
  const currentOrg = state.veille_organisation ? VEILLE_ORG[lang][VEILLE_ORG.fr.indexOf(state.veille_organisation)] : null;
  const currentCapi = state.veille_capitalisation ? VEILLE_CAPI[lang][VEILLE_CAPI.fr.indexOf(state.veille_capitalisation)] : null;

  return (
    <div>
      <Overline>{t2("PILIER II · VEILLE STRATÉGIQUE", "PILLAR II · STRATEGIC MONITORING", lang)}</Overline>
      <H2>{t2("Quatre axes factuels de votre veille", "Four factual axes of your monitoring", lang)}</H2>
      <Body>{t2("Ce bloc ne s'auto-note pas : il décrit votre réalité.", "This block is not self-scored: it describes your reality.", lang)}</Body>

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

      <SingleChoice label={`V2 · ${t2("Outil (choix unique, le plus avancé atteint)", "Tool (single choice, most advanced reached)", lang)}`} options={VEILLE_OUTIL[lang]} value={currentOutil} onChange={setOutil} />
      <SingleChoice label={`V3 · ${t2("Organisation du service (choix unique)", "Service organization (single choice)", lang)}`} options={VEILLE_ORG[lang]} value={currentOrg} onChange={setOrg} />
      <SingleChoice label={`V4 · ${t2("Capitalisation et production de contenu (choix unique)", "Capitalization and content production (single choice)", lang)}`} options={VEILLE_CAPI[lang]} value={currentCapi} onChange={setCapi} />

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onNext} disabled={!canGo}>{t2("Continuer", "Continue", lang)}</GoldButton>
      </div>
    </div>
  );
};

const OptInScreen = ({ lang, onYes, onNo, onPrev }: { lang: "fr" | "en"; onYes: () => void; onNo: () => void; onPrev: () => void }) => (
  <div>
    <Overline>{t2("APPROFONDISSEMENT", "DEEP-DIVE", lang)}</Overline>
    <H2>{t2("Souhaitez-vous votre diagnostic affiné ?", "Would you like a refined diagnosis?", lang)}</H2>
    <Body>{t2("Un item additionnel par sous-dimension, deux minutes de plus.", "One additional item per sub-dimension, two more minutes.", lang)}</Body>
    <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
      <GoldButton onClick={onYes}>{t2("Oui, affiner", "Yes, refine", lang)}</GoldButton>
      <GhostButton onClick={onNo}>{t2("Non, passer", "No, skip", lang)}</GhostButton>
    </div>
    <div style={{ marginTop: 24 }}>
      <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
    </div>
  </div>
);

const ApproScreen = ({ lang, state, setState, onNext, onPrev }: any) => {
  const set = (key: string, val: string) => setState({ ...state, appro: { ...state.appro, [key]: val } });
  const allDone = APPRO_ITEMS.every((it) => state.appro[it.key]);
  return (
    <div>
      <Overline>{t2("APPROFONDISSEMENT", "DEEP-DIVE", lang)}</Overline>
      <H2>{t2("Précisions par sous-dimension", "Sub-dimension details", lang)}</H2>
      <Body>{t2("Choisissez l'énoncé qui décrit votre réalité pour chaque sous-dimension.", "Pick the statement that describes your reality for each sub-dimension.", lang)}</Body>

      {APPRO_ITEMS.map((it) => {
        const opts = it.type === "freq" ? APPRO_FREQ[lang] : APPRO_RESP[lang];
        const optsFr = it.type === "freq" ? APPRO_FREQ.fr : APPRO_RESP.fr;
        const current = state.appro[it.key];
        return (
          <div key={it.key} style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(31,58,95,0.1)" }}>
            <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: NAVY, marginBottom: 6 }}>
              {it.label[lang]} · {it.type === "freq" ? t2("Fréquence", "Frequency", lang) : t2("Responsabilité", "Ownership", lang)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {opts.map((opt, i) => {
                const canonical = optsFr[i];
                const active = current === canonical;
                return (
                  <button key={opt} type="button" onClick={() => set(it.key, canonical)} style={{
                    background: active ? NAVY : "#fff",
                    color: active ? "#fff" : NAVY,
                    border: `1px solid ${active ? NAVY : "rgba(31,58,95,0.25)"}`,
                    padding: "6px 12px", fontSize: 12, cursor: "pointer", borderRadius: 2, fontFamily: "'DM Sans', sans-serif",
                  }}>{opt}</button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onNext} disabled={!allDone}>{t2("Continuer", "Continue", lang)}</GoldButton>
      </div>
    </div>
  );
};

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
      <Overline>{t2("REMISE DIFFÉRÉE", "DEFERRED DELIVERY", lang)}</Overline>
      <H2>{t2("Vos réponses sont sur le point d'être enregistrées.", "Your answers are about to be recorded.", lang)}</H2>
      <Body>
        {t2(
          "Votre diagnostic personnalisé vous sera remis à l'issue de l'étude État de la maturité 2026.",
          "Your personalized diagnosis will be delivered after the 2026 Maturity Report study.",
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
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <GhostButton onClick={onPrev}>{t2("Retour", "Back", lang)}</GhostButton>
        <GoldButton onClick={onSubmit} disabled={!canGo || submitting}>
          {submitting ? t2("Envoi…", "Sending…", lang) : t2("Enregistrer mes réponses", "Save my answers", lang)}
        </GoldButton>
      </div>
    </div>
  );
};

const FinalDoneScreen = ({ lang, onExchange }: { lang: "fr" | "en"; onExchange: () => void }) => (
  <div style={{ paddingTop: 40 }}>
    <Overline>{t2("ENREGISTRÉ", "RECORDED", lang)}</Overline>
    <H1>{t2("Vos réponses sont enregistrées.", "Your answers have been recorded.", lang)}</H1>
    <Body>
      {t2(
        "Votre diagnostic personnalisé vous sera remis à l'issue de l'étude État de la maturité 2026.",
        "Your personalized diagnosis will be delivered after the 2026 Maturity Report study.",
        lang,
      )}
    </Body>
    <div style={{ marginTop: 24 }}>
      <GoldButton onClick={onExchange}>{t2("Demander un échange stratégique", "Request a strategic exchange", lang)}</GoldButton>
    </div>
  </div>
);

export default EnqueteISD;
