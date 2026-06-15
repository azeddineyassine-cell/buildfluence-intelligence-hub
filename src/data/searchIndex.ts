/**
 * Search Index — bilingual (FR / EN)
 *
 * Each entry exists in both languages. The active language (from LanguageContext)
 * filters which entries are queried.
 *
 * To add an entry:
 *   1. Add an object below with a unique `id`.
 *   2. Fill `fr` and `en` with { title, excerpt, section, keywords }.
 *   3. Set `url` (same URL for both languages — i18n is in-app, URLs do not change).
 *      Use a `#anchor` when pointing to a specific section.
 */

export type SearchLang = "fr" | "en";

export interface SearchEntryLocale {
  title: string;
  excerpt: string;
  section: string;
  keywords: string[];
}

export interface SearchEntry {
  id: string;
  url: string;
  fr: SearchEntryLocale;
  en: SearchEntryLocale;
}

export const searchIndex: SearchEntry[] = [
  // === Main pages ===
  {
    id: "home",
    url: "/",
    fr: { title: "Accueil", excerpt: "Buildfluence — Sovereign Decision Infrastructure", section: "Accueil", keywords: ["accueil", "home", "buildfluence"] },
    en: { title: "Home", excerpt: "Buildfluence — Sovereign Decision Infrastructure", section: "Home", keywords: ["home", "buildfluence"] },
  },
  {
    id: "situations-critiques",
    url: "/vos-situations-critiques",
    fr: { title: "Vos Situations Critiques", excerpt: "Identifier et traiter les situations critiques décisionnelles", section: "Situations", keywords: ["situation", "critique", "crise", "décision"] },
    en: { title: "Your Critical Situations", excerpt: "Identify and address critical decision situations", section: "Situations", keywords: ["critical", "situation", "crisis", "decision"] },
  },
  {
    id: "strategic-innovation",
    url: "/#strategic-innovation",
    fr: { title: "Strategic Innovation", excerpt: "Capacités d'innovation stratégique augmentées", section: "Innovation", keywords: ["innovation", "stratégique", "capacités"] },
    en: { title: "Strategic Innovation", excerpt: "Augmented strategic innovation capabilities", section: "Innovation", keywords: ["innovation", "strategic", "capabilities"] },
  },
  {
    id: "success-stories",
    url: "/success-stories",
    fr: { title: "Success Stories", excerpt: "Cas clients institutionnels et résultats concrets", section: "Références", keywords: ["cas", "client", "référence", "success"] },
    en: { title: "Success Stories", excerpt: "Institutional client cases and concrete outcomes", section: "References", keywords: ["case", "client", "reference", "success"] },
  },
  {
    id: "insights-resources",
    url: "/insights-resources",
    fr: { title: "Insights & Resources", excerpt: "Analyses, benchmarks et ressources stratégiques", section: "Ressources", keywords: ["insight", "ressource", "benchmark", "analyse"] },
    en: { title: "Insights & Resources", excerpt: "Analyses, benchmarks and strategic resources", section: "Resources", keywords: ["insight", "resource", "benchmark", "analysis"] },
  },
  {
    id: "pourquoi-buildfluence",
    url: "/pourquoi-buildfluence",
    fr: { title: "Pourquoi Buildfluence", excerpt: "Approche HumTech, posture institutionnelle, souveraineté", section: "À propos", keywords: ["pourquoi", "approche", "humtech", "souveraineté"] },
    en: { title: "Why Buildfluence", excerpt: "HumTech approach, institutional posture, sovereignty", section: "About", keywords: ["why", "approach", "humtech", "sovereignty"] },
  },
  {
    id: "acces-premium",
    url: "/acces-premium",
    fr: { title: "Accès Premium", excerpt: "Espace clients institutionnels", section: "Premium", keywords: ["premium", "accès", "client", "espace"] },
    en: { title: "Premium Access", excerpt: "Institutional client area", section: "Premium", keywords: ["premium", "access", "client", "area"] },
  },
  {
    id: "barometre",
    url: "/barometre",
    fr: { title: "Baromètre", excerpt: "Baromètre stratégique Buildfluence", section: "Ressources", keywords: ["baromètre", "indicateur", "tendance"] },
    en: { title: "Barometer", excerpt: "Buildfluence strategic barometer", section: "Resources", keywords: ["barometer", "indicator", "trend"] },
  },
  {
    id: "benchmark",
    url: "/benchmark",
    fr: { title: "Benchmark", excerpt: "Benchmark stratégique comparatif", section: "Ressources", keywords: ["benchmark", "comparatif", "api"] },
    en: { title: "Benchmark", excerpt: "Comparative strategic benchmark", section: "Resources", keywords: ["benchmark", "comparative", "api"] },
  },

  // === Solutions: Strategic Intelligence Lab ===
  {
    id: "sil",
    url: "/solutions/strategic-intelligence-lab",
    fr: { title: "Strategic Intelligence Lab", excerpt: "Veille, anticipation et neutralisation des menaces", section: "Nos Solutions", keywords: ["intelligence", "lab", "veille", "anticipation"] },
    en: { title: "Strategic Intelligence Lab", excerpt: "Monitoring, foresight and threat neutralization", section: "Our Solutions", keywords: ["intelligence", "lab", "monitoring", "foresight"] },
  },
  {
    id: "sil-foresight",
    url: "/solutions/strategic-intelligence-lab#strategic-foresight",
    fr: { title: "Strategic Foresight", excerpt: "Veille et anticipation stratégique", section: "Strategic Intelligence Lab", keywords: ["foresight", "anticipation", "prospective"] },
    en: { title: "Strategic Foresight", excerpt: "Strategic monitoring and foresight", section: "Strategic Intelligence Lab", keywords: ["foresight", "anticipation", "prospective"] },
  },
  {
    id: "sil-threat",
    url: "/solutions/strategic-intelligence-lab#threat-intelligence",
    fr: { title: "Threat Intelligence", excerpt: "Détection et neutralisation des menaces", section: "Strategic Intelligence Lab", keywords: ["menace", "threat", "détection", "neutralisation"] },
    en: { title: "Threat Intelligence", excerpt: "Threat detection and neutralization", section: "Strategic Intelligence Lab", keywords: ["threat", "detection", "neutralization"] },
  },
  {
    id: "sil-pocs",
    url: "/solutions/strategic-intelligence-lab#modelisations-pocs",
    fr: { title: "Modélisations & POCs", excerpt: "Prototypes et modèles prédictifs", section: "Strategic Intelligence Lab", keywords: ["modélisation", "poc", "prototype", "prédictif"] },
    en: { title: "Modeling & POCs", excerpt: "Prototypes and predictive models", section: "Strategic Intelligence Lab", keywords: ["modeling", "poc", "prototype", "predictive"] },
  },

  // === Solutions: Soft Power & Influence ===
  {
    id: "spi",
    url: "/solutions/soft-power-influence",
    fr: { title: "Soft Power & Influence", excerpt: "Cartographie de l'influence et des réseaux de pouvoir", section: "Nos Solutions", keywords: ["soft power", "influence", "pouvoir", "réseau"] },
    en: { title: "Soft Power & Influence", excerpt: "Influence and power network mapping", section: "Our Solutions", keywords: ["soft power", "influence", "power", "network"] },
  },
  {
    id: "spi-influence",
    url: "/solutions/soft-power-influence",
    fr: { title: "Intelligence d'Influence", excerpt: "Cartographie des réseaux de pouvoir", section: "Soft Power & Influence", keywords: ["influence", "cartographie", "réseau"] },
    en: { title: "Influence Intelligence", excerpt: "Power network mapping", section: "Soft Power & Influence", keywords: ["influence", "mapping", "network"] },
  },
  {
    id: "spi-political",
    url: "/solutions/soft-power-influence",
    fr: { title: "Political Intelligence", excerpt: "Mapping des décideurs publics", section: "Soft Power & Influence", keywords: ["politique", "public", "décideur"] },
    en: { title: "Political Intelligence", excerpt: "Public decision-maker mapping", section: "Soft Power & Influence", keywords: ["political", "public", "decision-maker"] },
  },
  {
    id: "spi-territorial",
    url: "/solutions/soft-power-influence",
    fr: { title: "Territorial Influence Lab", excerpt: "Attractivité et compétitivité territoriale", section: "Soft Power & Influence", keywords: ["territoire", "attractivité", "compétitivité"] },
    en: { title: "Territorial Influence Lab", excerpt: "Territorial attractiveness and competitiveness", section: "Soft Power & Influence", keywords: ["territory", "attractiveness", "competitiveness"] },
  },

  // === Solutions: Deep Due Diligence ===
  {
    id: "ddd",
    url: "/solutions/deep-due-diligence",
    fr: { title: "Deep Due Diligence", excerpt: "Investigation stratégique multi-niveaux", section: "Nos Solutions", keywords: ["due diligence", "investigation", "kyc"] },
    en: { title: "Deep Due Diligence", excerpt: "Multi-level strategic investigation", section: "Our Solutions", keywords: ["due diligence", "investigation", "kyc"] },
  },
  {
    id: "ddd-1",
    url: "/solutions/deep-due-diligence#level-1",
    fr: { title: "Level 1: Integrity Check", excerpt: "Screening PEP et signaux faibles", section: "Deep Due Diligence", keywords: ["intégrité", "pep", "screening"] },
    en: { title: "Level 1: Integrity Check", excerpt: "PEP screening and weak signals", section: "Deep Due Diligence", keywords: ["integrity", "pep", "screening"] },
  },
  {
    id: "ddd-2",
    url: "/solutions/deep-due-diligence#level-2",
    fr: { title: "Level 2: Strategic Risk Profiling", excerpt: "Cartographie et analyse géopolitique", section: "Deep Due Diligence", keywords: ["risque", "géopolitique", "cartographie"] },
    en: { title: "Level 2: Strategic Risk Profiling", excerpt: "Mapping and geopolitical analysis", section: "Deep Due Diligence", keywords: ["risk", "geopolitical", "mapping"] },
  },
  {
    id: "ddd-3",
    url: "/solutions/deep-due-diligence#level-3",
    fr: { title: "Level 3: Regulatory Compliance", excerpt: "Audit KYC, KYS, LCB-FT, ESG", section: "Deep Due Diligence", keywords: ["compliance", "kyc", "lcb-ft", "esg"] },
    en: { title: "Level 3: Regulatory Compliance", excerpt: "KYC, KYS, AML-CFT, ESG audit", section: "Deep Due Diligence", keywords: ["compliance", "kyc", "aml", "esg"] },
  },

  // === Capabilities (Strategic Innovation) ===
  {
    id: "cap-ai",
    url: "/capacites/ai-powered-monitor",
    fr: { title: "AI Powered Monitor", excerpt: "Veille stratégique augmentée par l'IA", section: "Strategic Innovation", keywords: ["ia", "ai", "monitor", "veille"] },
    en: { title: "AI Powered Monitor", excerpt: "AI-augmented strategic monitoring", section: "Strategic Innovation", keywords: ["ai", "monitor", "monitoring"] },
  },
  {
    id: "cap-workflow",
    url: "/capacites/strategic-workflow",
    fr: { title: "Strategic Workflow", excerpt: "Culture de décision augmentée", section: "Strategic Innovation", keywords: ["workflow", "décision", "process"] },
    en: { title: "Strategic Workflow", excerpt: "Augmented decision culture", section: "Strategic Innovation", keywords: ["workflow", "decision", "process"] },
  },
  {
    id: "cap-velocity",
    url: "/capacites/competitive-velocity-engine",
    fr: { title: "Competitive Velocity Engine", excerpt: "Mapping dynamique concurrentiel", section: "Strategic Innovation", keywords: ["concurrence", "vélocité", "mapping"] },
    en: { title: "Competitive Velocity Engine", excerpt: "Dynamic competitive mapping", section: "Strategic Innovation", keywords: ["competitive", "velocity", "mapping"] },
  },
  {
    id: "cap-command",
    url: "/capacites/strategic-command-center",
    fr: { title: "Strategic Command Center", excerpt: "Cockpit décisionnel souverain", section: "Strategic Innovation", keywords: ["command", "cockpit", "souverain"] },
    en: { title: "Strategic Command Center", excerpt: "Sovereign decision cockpit", section: "Strategic Innovation", keywords: ["command", "cockpit", "sovereign"] },
  },

  // === Critical situations ===
  { id: "sit-visibility", url: "/situations/decider-sans-visibilite",
    fr: { title: "Décider sans visibilité", excerpt: "Manque d'information fiable pour décider", section: "Situations Critiques", keywords: ["décision", "visibilité", "information"] },
    en: { title: "Deciding without visibility", excerpt: "Lack of reliable information for decision-making", section: "Critical Situations", keywords: ["decision", "visibility", "information"] } },
  { id: "sit-attacks", url: "/situations/attaques-informationnelles",
    fr: { title: "Subir des attaques informationnelles", excerpt: "Manipulations et désinformation", section: "Situations Critiques", keywords: ["attaque", "désinformation", "manipulation"] },
    en: { title: "Suffering information attacks", excerpt: "Manipulation and disinformation", section: "Critical Situations", keywords: ["attack", "disinformation", "manipulation"] } },
  { id: "sit-attractiveness", url: "/situations/deficit-attractivite",
    fr: { title: "Perdre de l'attractivité", excerpt: "Déficit de rayonnement territorial", section: "Situations Critiques", keywords: ["attractivité", "territoire", "rayonnement"] },
    en: { title: "Losing attractiveness", excerpt: "Territorial influence deficit", section: "Critical Situations", keywords: ["attractiveness", "territory", "influence"] } },
  { id: "sit-crisis", url: "/situations/crises-non-maitrisees",
    fr: { title: "Sombrer dans une crise", excerpt: "Effondrement progressif non maîtrisé", section: "Situations Critiques", keywords: ["crise", "effondrement"] },
    en: { title: "Sinking into a crisis", excerpt: "Uncontrolled progressive collapse", section: "Critical Situations", keywords: ["crisis", "collapse"] } },
  { id: "sit-velocity", url: "/situations/perte-velocite",
    fr: { title: "Perdre en vélocité", excerpt: "Retard face aux concurrents", section: "Situations Critiques", keywords: ["vélocité", "retard", "concurrent"] },
    en: { title: "Losing velocity", excerpt: "Falling behind competitors", section: "Critical Situations", keywords: ["velocity", "behind", "competitor"] } },
  { id: "sit-influence", url: "/situations/deficit-influence",
    fr: { title: "Déficit d'influence", excerpt: "Marginalisation institutionnelle", section: "Situations Critiques", keywords: ["influence", "marginalisation"] },
    en: { title: "Influence deficit", excerpt: "Institutional marginalization", section: "Critical Situations", keywords: ["influence", "marginalization"] } },
  { id: "sit-invest", url: "/situations/investir-sous-risque",
    fr: { title: "Investir sous risque invisible", excerpt: "Due diligence insuffisante", section: "Situations Critiques", keywords: ["investissement", "risque", "due diligence"] },
    en: { title: "Investing under invisible risk", excerpt: "Insufficient due diligence", section: "Critical Situations", keywords: ["investment", "risk", "due diligence"] } },
  { id: "sit-govern", url: "/situations/gouverner-sous-pression",
    fr: { title: "Gouverner sous pression", excerpt: "Pression médiatique et émotionnelle", section: "Situations Critiques", keywords: ["gouvernance", "pression", "média"] },
    en: { title: "Governing under pressure", excerpt: "Media and emotional pressure", section: "Critical Situations", keywords: ["governance", "pressure", "media"] } },
];

/** Strip diacritics for accent-insensitive matching. */
export const normalize = (s: string): string =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Flatten the index for Fuse with normalized fields, scoped to a language. */
export const getFlatIndex = (lang: SearchLang) =>
  searchIndex.map((e) => {
    const loc = e[lang];
    return {
      id: e.id,
      url: e.url,
      title: loc.title,
      excerpt: loc.excerpt,
      section: loc.section,
      keywords: loc.keywords,
      _title: normalize(loc.title),
      _excerpt: normalize(loc.excerpt),
      _keywords: loc.keywords.map(normalize),
    };
  });
