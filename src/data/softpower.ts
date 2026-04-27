/* ═══════════════════════════════════════════════════════════════════════════
 * SOFTPOWER DATA — Pilier II Soft Power & Influence
 * Source : softpower-data.js (client) — reprise EXACTE des contenus éditoriaux.
 * ═══════════════════════════════════════════════════════════════════════════ */

export type DetailCol = { h: string; items: string[] };

export type SourceDetail = {
  eyebrow: string;
  title: string;
  tagline: string;
  cols: DetailCol[];
  sources?: string;
  bfApport: string;
};

export type DestDetail = {
  eyebrow: string;
  title: string;
  tagline: string;
  meta?: { l: string; v: string }[];
  cols: DetailCol[];
  bfApport: string;
};

export type Country = {
  flag: string;
  name: string;
  category: string;
  isKey: boolean;
  sectors: string;
  description: string;
  score?: number;
  opportunities?: string[];
  bfApport?: string;
};

export type Federation = { full: string; role: string; apport: string };
export type Api = { full: string; country: string; apport: string };
export type Coop = { full: string; country: string; apport: string };
export type Logo = { name: string; full: string; apport: string };

/* ─── 1. SOURCES BACK-OFFICE + Buildfluence Core ─── */
export const sourcesData: Record<string, SourceDetail> = {
  veille: {
    eyebrow: "Pilier i — Captation",
    title: "Veille & Intelligence Stratégique",
    tagline:
      "Captation en temps réel des signaux faibles sectoriels, économiques et géopolitiques. Croisement multi-sources pour anticiper les ruptures et détecter les dynamiques invisibles.",
    cols: [
      { h: "6 dimensions captées", items: ["Web, médias, réseaux sociaux", "Bases sectorielles & brevets", "Dark web & deep web", "Organisations & personnes clés", "Concepts macroéconomiques", "Événements & produits"] },
      { h: "Traitement", items: ["NLP & analyse sémantique", "Scoring de criticité", "Détection de signaux faibles", "Formation, accompagnement, change management", "Transfert de compétences"] },
      { h: "Livrables", items: ["Rapports de veille structurés", "Alertes temps réel ciblées", "Dashboards interactifs", "Benchmark & Études", "Livre blanc", "Playbook, etc."] },
    ],
    bfApport:
      "Buildfluence ne livre pas de la donnée brute. Buildfluence livre une lecture stratégique du présent qui anticipe le futur.",
  },
  ddd: {
    eyebrow: "Pilier ii — Captation",
    title: "Deep Due Diligence",
    tagline:
      "Sécuriser la décision dans des environnements incertains. Analyse approfondie des acteurs, réseaux d'influence et risques réputationnels — avant toute prise de position stratégique.",
    cols: [
      { h: "Integrity Check", items: ["Vérification identitaire", "Screening sanctions internationales", "Analyse de réputation initiale"] },
      { h: "Strategic Risk Profiling", items: ["Cartographie de la structure capitalistique", "Litiges & contentieux historiques", "Réseau d'influence & affiliations"] },
      { h: "Regulatory Compliance", items: ["Investigation terrain ciblée", "Mobilisation de sources humaines", "Rapport confidentiel actionnable"] },
    ],
    sources:
      "OFAC · EU Sanctions Map · ICIJ · Cbonds · The Law Society · US DoJ · GAFI · Dun & Bradstreet · PitchBook",
    bfApport:
      "Buildfluence identifie les zones de fragilité et les leviers cachés que les approches classiques de DD ne voient jamais.",
  },
  bi: {
    eyebrow: "Pilier iii — Captation",
    title: "Business Intelligence",
    tagline:
      "Lire la compétition avant qu'elle ne s'impose. Décrypter les stratégies pays, secteurs et concurrents pour identifier les axes de différenciation à fort levier d'attractivité.",
    cols: [
      { h: "Analyse économique", items: ["Flux d'investissement mondiaux", "Dynamiques sectorielles fines", "Benchmark concurrentiel structuré"] },
      { h: "Plateformes Premium", items: ["Growth Lab (Harvard)", "Statista, fDi Intelligence", "Factiva — agrégateur de presse", "World Bank, Harvard Kennedy School", "Croisement multi-sources"] },
      { h: "Livrables", items: ["Études sectorielles approfondies", "Cartographies de marché", "Rapports d'attractivité comparés"] },
    ],
    bfApport:
      "Buildfluence convertit la donnée macro en avantage compétitif micro. Là où les autres décrivent, Buildfluence prescrit.",
  },
  humint: {
    eyebrow: "Pilier iv — Captation",
    title: "HumInt — Intelligence Humaine",
    tagline:
      "Activer des réseaux qualifiés pour comprendre les intentions réelles des décideurs. Apporter du contexte, lire finement les rapports de force, valider les analyses sur le terrain.",
    cols: [
      { h: "Réseau d'experts", items: ["Analystes terrain dédiés", "Réseau de journalistes spécialistes", "Sources primaires qualifiées"] },
      { h: "Valeur ajoutée", items: ["Contexte non-digitalisé", "Vérification de terrain", "Détection de signaux invisibles"] },
      { h: "Intégration", items: ["Croisement avec OSINT", "Validation des hypothèses", "Enrichissement de la décision"] },
    ],
    bfApport:
      "L'OSINT donne le quoi. L'HumInt donne le pourquoi. Buildfluence orchestre les deux pour révéler les intentions cachées.",
  },
  "bf-core": {
    eyebrow: "Infrastructure Décisionnelle",
    title: "Buildfluence — L'Opérateur Central",
    tagline:
      "Une architecture conçue pour transformer l'information en pouvoir décisionnel efficace. Buildfluence ne délivre pas des rapports volumineux, mais une capacité d'anticipation et d'influence.",
    cols: [
      { h: "Captation", items: ["Croisement OSINT + HumInt + BI", "IA augmentée en continu", "Surveillance multi-sources 24/7"] },
      { h: "Transformation", items: ["Scoring Go / Vigilance / No-Go", "Dashboards & DataViz actionnables", "Doing Business Platform"] },
      { h: "Diffusion", items: ["Publications stratégiques ciblées", "Rayonnement & influence orchestrés", "Actionnement de l'écosystème"] },
    ],
    bfApport:
      "Voir ce que les autres ne voient pas. Décider avec un temps d'avance. Neutraliser les risques invisibles. Identifier les vrais leviers d'attractivité. Transformer la visibilité en influence réelle.",
  },
};

/* ─── 2. DESTINATIONS ECOSYSTEM ─── */
export const destData: Record<string, DestDetail> = {
  amdie: {
    eyebrow: "Ecosystem · Pilier i",
    title: "AMDIE / MICEPP",
    tagline:
      "Mission : Développement des investissements et des exportations des produits et services au Maroc. Pilier de l'attractivité économique du Royaume.",
    meta: [
      { l: "Charte d'investissement", v: "Édition 2023" },
      { l: "Objectif IDE 2026", v: "550 MMDH" },
      { l: "Création d'emploi 2026", v: "500 000" },
    ],
    cols: [
      { h: "Périmètre AMDIE", items: ["Pilotage de l'attractivité nationale", "Plateforme Morocco Now — Nation Branding", "Coordination des missions internationales", "Suivi des grands projets d'investissement"] },
      { h: "Valeur Buildfluence dédiée", items: ["Newsletter stratégique sur-mesure", "Observatoire d'Investissement permanent", "Veille des dynamiques narratives concernant les entreprises étrangères au Maroc", "Information fraîche pour les exportateurs marocains", "Rayonnement sectoriel complet"] },
    ],
    bfApport:
      "Transformer Morocco Now de campagne de communication en infrastructure d'influence souveraine, alimentée en continu par le mécanisme Buildfluence.",
  },
  gouv: {
    eyebrow: "Ecosystem · Pilier ii",
    title: "Gouvernement Marocain",
    tagline:
      "Agences d'État, instances publiques, Centres Régionaux de l'Investissement. Le tissu institutionnel qui pilote les politiques publiques du Royaume.",
    cols: [
      { h: "Périmètre", items: ["Ministères sectoriels & agences", "Instances publiques de pilotage", "12 CRI — Centres Régionaux", "Conseils & instances consultatives"] },
      { h: "Valeur Buildfluence", items: ["Pilotage avec longueur d'avance stratégique", "Anticipation réglementaire continue", "Intelligence territoriale dédiée", "Veille compétitivité régionale", "Suivi du Doing Business pour le Maroc"] },
    ],
    bfApport:
      "Dans des environnements sous contrainte, la qualité de la décision devient un levier de souveraineté. Buildfluence structure les capacités d'anticipation, d'arbitrage et d'influence au cœur de l'action publique.",
  },
  medias: {
    eyebrow: "Ecosystem · Pilier viii",
    title: "Médias & Prescripteurs",
    tagline:
      "Leaders d'opinion, diaspora qualifiée, journalistes spécialisés. La couche d'amplification narrative qui rend les décisions visibles et désirables.",
    cols: [
      { h: "Cibles d'influence", items: ["Leaders d'opinion sectoriels", "Diaspora marocaine qualifiée à l'international", "Journalistes économiques spécialisés", "Think tanks & cercles d'experts"] },
      { h: "Stratégie d'activation", items: ["Positionnement comme source d'autorité", "Production de contenus exclusifs", "Prises de parole ciblées et orchestrées", "Maîtrise du narratif sur le long terme"] },
    ],
    bfApport:
      "La crédibilité ne s'improvise pas. Buildfluence construit pour vous une présence médiatique constante qui transforme la visibilité en influence durable.",
  },
};

/* ─── 3. COUNTRIES (28) ─── */
export const countries: Record<string, Country> = {
  FR: { flag: "🇫🇷", name: "France", category: "Pays Clé", isKey: true,
    sectors: "Automobile · Aéronautique · Énergie · Agro",
    description: "Premier partenaire commercial et investisseur historique du Maroc. Relation stratégique consolidée par des accords bilatéraux structurants.",
    opportunities: ["Cartographie des décideurs français influençant les flux d'IDE vers le Maroc","Veille des narratifs médiatiques sur l'attractivité du Maroc en France","Intelligence sur les fédérations patronales (MEDEF, AFEP)","Suivi des décisions politiques impactant les accords commerciaux","Identification d'opportunités d'influence dans les médias économiques français"],
    bfApport: "Convertir la relation historique en avantage compétitif renouvelé. Buildfluence détecte les décideurs émergents que les diplomates classiques ne voient pas." },
  DE: { flag: "🇩🇪", name: "Allemagne", category: "Pays Clé", isKey: true,
    sectors: "Industrie automobile · Chimie · Énergie verte",
    description: "Deuxième partenaire européen du Maroc. Forte présence industrielle et intérêt croissant pour les énergies renouvelables marocaines.",
    opportunities: ["Veille sur les flux IDE allemands vers l'Afrique du Nord","Cartographie des grands groupes industriels (BMW, Siemens, BASF)","Suivi des positions de la Chambre de commerce germano-marocaine","Intelligence sur les programmes GIZ actifs au Maroc","Identification des influenceurs économiques allemands"],
    bfApport: "L'industrie allemande cherche son hub Méditerranée. Buildfluence positionne le Maroc dans les radars stratégiques des Mittelstand et des conglomérats." },
  US: { flag: "🇺🇸", name: "États-Unis", category: "Pays Clé", isKey: true,
    sectors: "Tech · Finance · Défense · Agro-industrie",
    description: "Allié stratégique du Maroc avec un accord de libre-échange unique en Afrique. Partenariat de défense et coopération technologique croissante.",
    opportunities: ["Veille sur l'Accord de Libre-Échange Maroc-USA","Cartographie des think tanks et lobbies influençant la politique US au Maghreb","Suivi des positions des grandes agences (USAID, MCC, DFC)","Intelligence sur les décideurs du Congrès US sur les dossiers Maroc-Sahara","Opportunités d'influence dans les médias économiques américains"],
    bfApport: "Le Maroc bénéficie d'une position unique en Afrique vis-à-vis des USA. Buildfluence transforme cet avantage diplomatique en flux d'investissement concrets." },
  GB: { flag: "🇬🇧", name: "Royaume-Uni", category: "Pays Clé", isKey: true,
    sectors: "Finance · Services · Énergie · Agroalimentaire",
    description: "Partenaire historique avec un accord commercial post-Brexit. Le Maroc se positionne comme hub d'entrée vers l'Afrique pour les entreprises britanniques.",
    opportunities: ["Veille post-Brexit sur les opportunités commerciales Maroc-UK","Cartographie des fonds d'investissement britanniques actifs en Afrique","Suivi des accords de partenariat UK-Maroc","Intelligence sur les décideurs du FCDO","Opportunités médiatiques dans la presse économique britannique"],
    bfApport: "Le Brexit a redistribué les cartes. Buildfluence aide le Maroc à devenir le partenaire africain préféré du nouveau Royaume-Uni." },
  JP: { flag: "🇯🇵", name: "Japon", category: "Pays Clé", isKey: true,
    sectors: "Automobile · Robotique · Énergie · Chimie",
    description: "Partenaire technologique de premier plan. La coopération JICA finance des projets d'infrastructure majeurs. Intérêt croissant pour les phosphates et l'énergie verte.",
    opportunities: ["Veille sur les stratégies d'investissement JICA et JETRO","Cartographie des groupes industriels japonais (Toyota, Sumitomo)","Intelligence sur l'accès aux matières premières africaines","Suivi des opportunités diplomatiques japonaises en Afrique","Identification des influenceurs japonais sur le Maroc"],
    bfApport: "Le Japon décide lentement mais investit massivement. Buildfluence calibre les approches au tempo nippon pour transformer l'intérêt en engagement." },
  CN: { flag: "🇨🇳", name: "Chine", category: "Pays Clé", isKey: true,
    sectors: "Infrastructure · Digital · Énergie · Industrie",
    description: "Investisseur massif en infrastructure africaine. La Chine développe une présence industrielle et diplomatique croissante au Maroc dans le cadre de la Route de la Soie.",
    opportunities: ["Veille sur les investissements chinois (Belt & Road) au Maroc","Due Diligence des partenaires et entreprises chinoises actives","Cartographie des acteurs de l'influence chinoise (médias, think tanks, ambassade)","Intelligence sur les narratifs géopolitiques chinois sur la question du Sahara","Suivi des flux IDE chinois — opportunités et risques"],
    bfApport: "L'investissement chinois apporte du capital et du risque. Buildfluence sépare les opportunités structurantes des partenariats fragilisants." },
  BE: { flag: "🇧🇪", name: "Belgique", category: "Pays Clé", isKey: true,
    sectors: "Logistique · Pharmaceutique · Finance · Agroalimentaire",
    description: "Porte d'entrée vers les institutions européennes. Forte diaspora marocaine. Hub logistique et financier européen clé pour les exportateurs marocains.",
    opportunities: ["Veille sur les décisions européennes via Bruxelles","Cartographie des institutions européennes influençant les relations Maroc-UE","Intelligence sur les lobbies et ONG actifs à Bruxelles","Identification des décideurs belgo-européens favorables au partenariat Maroc-UE","Suivi des narratifs médiatiques belges"],
    bfApport: "Bruxelles est l'épicentre de la régulation européenne. Buildfluence transforme la diaspora marocaine en réseau d'influence opérationnel." },
  NL: { flag: "🇳🇱", name: "Pays-Bas", category: "Pays Clé", isKey: true,
    sectors: "Logistique · Agro-industrie · Technologie · Finance",
    description: "Hub logistique européen via Rotterdam. Forte tradition d'investissement à l'international. Intérêt pour les exportations agricoles et la logistique marocaine.",
    opportunities: ["Veille sur les flux commerciaux et logistiques via Rotterdam","Cartographie des fonds d'investissement néerlandais en Afrique","Intelligence sur les entreprises néerlandaises (Shell, Philips, ASML)","Suivi des décisions de la Chambre de commerce NL-Maroc","Opportunités d'influence dans les médias économiques néerlandais"],
    bfApport: "Les Pays-Bas pensent l'Afrique comme un marché. Buildfluence positionne le Maroc comme la tête de pont logistique privilégiée." },
  ES: { flag: "🇪🇸", name: "Espagne", category: "Pays Clé", isKey: true,
    sectors: "Tourisme · Énergie · Agroalimentaire · BTP",
    description: "Voisin géographique et premier partenaire commercial de proximité. Relations complexes mais complémentaires. Porte d'entrée naturelle vers l'Europe pour les exportations marocaines.",
    opportunities: ["Veille sur les tensions et opportunités de la relation bilatérale","Cartographie des groupes espagnols (Inditex, Iberdrola, Telefónica)","Intelligence sur les positions espagnoles sur le Sahara Marocain","Suivi des narratifs médiatiques espagnols sur le Maroc","Identification des influenceurs économiques espagnols pro-Maroc"],
    bfApport: "La proximité géographique masque la complexité politique. Buildfluence lit les sous-textes Madrid–Rabat que la diplomatie classique tait." },
  KR: { flag: "🇰🇷", name: "Corée du Sud", category: "Pays Clé", isKey: true,
    sectors: "Automobile · Électronique · Énergie · Chimie",
    description: "Puissance industrielle et technologique en forte croissance internationale. Intérêt stratégique pour les matières premières marocaines (phosphates, cobalt) et les zones industrielles.",
    opportunities: ["Veille sur les stratégies d'investissement coréennes en Afrique du Nord","Cartographie des Chaebols (Samsung, Hyundai, LG, POSCO)","Intelligence sur les accords de coopération Corée-Maroc","Suivi des opportunités dans la stratégie K-Africa","Identification des décideurs coréens influençant les investissements"],
    bfApport: "Les Chaebols décident en circuits fermés. Buildfluence cartographie ces circuits et y injecte le Maroc comme option prioritaire." },

  // ═══ 18 CONCURRENTS ═══
  BG: { flag: "🇧🇬", name: "Bulgarie", category: "Concurrent", isKey: false, score: 4, sectors: "Automobile · Textile · IT", description: "Membre UE à bas coûts, attractif pour les délocalisations européennes." },
  EG: { flag: "🇪🇬", name: "Égypte", category: "Concurrent", isKey: false, score: 6, sectors: "Textile · Agroalimentaire · Énergie", description: "Grand marché intérieur et position stratégique sur le canal de Suez." },
  CL: { flag: "🇨🇱", name: "Chili", category: "Concurrent", isKey: false, score: 5, sectors: "Mines · Énergie verte · Agroalimentaire", description: "Leader sud-américain en stabilité économique et accords de libre-échange." },
  HU: { flag: "🇭🇺", name: "Hongrie", category: "Concurrent", isKey: false, score: 5, sectors: "Automobile · Électronique · Pharma", description: "Hub manufacturier européen avec forte présence d'IDE asiatiques." },
  KE: { flag: "🇰🇪", name: "Kenya", category: "Concurrent", isKey: false, score: 4, sectors: "Tech · Agro · Services financiers", description: "Hub technologique et financier de l'Afrique de l'Est." },
  LT: { flag: "🇱🇹", name: "Lituanie", category: "Concurrent", isKey: false, score: 4, sectors: "Fintech · IT · Logistique", description: "Centre fintech émergent de l'UE avec une main-d'œuvre qualifiée." },
  MX: { flag: "🇲🇽", name: "Mexique", category: "Concurrent", isKey: false, score: 7, sectors: "Automobile · Aéro · Agroalimentaire", description: "Accès privilégié au marché nord-américain via l'USMCA." },
  PL: { flag: "🇵🇱", name: "Pologne", category: "Concurrent", isKey: false, score: 6, sectors: "Automobile · IT · BPO", description: "Plus grande économie d'Europe centrale, forte croissance des IDE." },
  RW: { flag: "🇷🇼", name: "Rwanda", category: "Concurrent", isKey: false, score: 3, sectors: "Tech · Tourisme · Services", description: "Modèle de gouvernance africain, attractif pour les startups." },
  CZ: { flag: "🇨🇿", name: "République Tchèque", category: "Concurrent", isKey: false, score: 6, sectors: "Automobile · Industrie · R&D", description: "Base industrielle mature au cœur de l'Europe." },
  SN: { flag: "🇸🇳", name: "Sénégal", category: "Concurrent", isKey: false, score: 4, sectors: "Agro · Pêche · Énergie", description: "Porte d'entrée de l'Afrique de l'Ouest francophone." },
  SK: { flag: "🇸🇰", name: "Slovaquie", category: "Concurrent", isKey: false, score: 5, sectors: "Automobile · Électronique", description: "Premier producteur mondial de voitures par habitant." },
  TH: { flag: "🇹🇭", name: "Thaïlande", category: "Concurrent", isKey: false, score: 6, sectors: "Automobile · Électronique · Tourisme", description: "Hub manufacturier de l'ASEAN avec infrastructure développée." },
  TN: { flag: "🇹🇳", name: "Tunisie", category: "Concurrent", isKey: false, score: 7, sectors: "Textile · Aéro · IT · Automobile", description: "Concurrent direct du Maroc sur les marchés européens." },
  TR: { flag: "🇹🇷", name: "Turquie", category: "Concurrent", isKey: false, score: 8, sectors: "Automobile · Textile · BTP · Défense", description: "Puissance industrielle régionale avec accès aux marchés UE et Moyen-Orient." },
  VN: { flag: "🇻🇳", name: "Vietnam", category: "Concurrent", isKey: false, score: 7, sectors: "Textile · Électronique · Agro", description: "Destination privilégiée des délocalisations depuis la Chine." },
  ZA: { flag: "🇿🇦", name: "Afrique du Sud", category: "Concurrent", isKey: false, score: 6, sectors: "Mines · Finance · Automobile", description: "Première économie industrialisée d'Afrique." },
  IN: { flag: "🇮🇳", name: "Inde", category: "Concurrent", isKey: false, score: 8, sectors: "IT · Pharma · Automobile · Textile", description: "Géant démographique et technologique en forte croissance." },
};

export function getCompetitorBfApport(score: number): string {
  if (score >= 8) return "Concurrent direct au sommet. Buildfluence livre une analyse fine de ses faiblesses cachées et des secteurs où le Maroc peut prendre l'ascendant.";
  if (score >= 7) return "Concurrent agressif sur les mêmes marchés que le Maroc. Buildfluence identifie les investisseurs ciblés simultanément et calibre les contre-offensives.";
  if (score >= 5) return "Concurrent solide mais pas insurmontable. Buildfluence cartographie ses points de fragilité pour repositionner le Maroc en alternative crédible.";
  return "Concurrent émergent à surveiller. Buildfluence anticipe sa montée en puissance pour préserver l'avance compétitive du Maroc.";
}

export const competitorOpportunities = [
  "Analyse comparative des atouts du Maroc vs ce concurrent",
  "Identification des secteurs où le Maroc peut reprendre l'avantage",
  "Veille des stratégies d'attractivité de ce concurrent",
  "Intelligence sur les investisseurs ciblés simultanément",
  "Recommandations pour renforcer le positionnement compétitif marocain",
];

/* ─── 4. FÉDÉRATIONS (7) ─── */
export const fedData: Record<string, Federation> = {
  cgem: { full: "Confédération Générale des Entreprises du Maroc", role: "Première organisation patronale du Maroc · Représentation transversale", apport: "Buildfluence alimente la CGEM en intelligence sectorielle partagée pour positionner le patronat marocain dans les arbitrages publics." },
  asmex: { full: "Association Marocaine des Exportateurs", role: "Représentation des exportateurs · Promotion à l'international", apport: "Information fraîche sur les marchés cibles, veille sur les barrières tarifaires émergentes, identification d'opportunités sectorielles." },
  amica: { full: "Association Marocaine pour l'Industrie & le Commerce de l'Automobile", role: "Filière automobile marocaine · 220+ équipementiers", apport: "Veille sur les stratégies des constructeurs européens et asiatiques, anticipation des relocalisations, mapping des décideurs achats." },
  amip: { full: "Association Marocaine de l'Industrie Pharmaceutique", role: "Industrie du médicament · Souveraineté sanitaire", apport: "Intelligence sur les flux pharmaceutiques mondiaux, veille réglementaire AFCRMP, suivi des appels d'offres internationaux." },
  amith: { full: "Association Marocaine des Industries du Textile et de l'Habillement", role: "Filière textile · Export Europe & Afrique", apport: "Benchmark concurrentiel Tunisie/Vietnam/Turquie en continu, veille sur les politiques d'achats responsables des donneurs d'ordre européens." },
  cnt: { full: "Conseil National du Tourisme", role: "Pilotage de la stratégie touristique nationale", apport: "Veille sur les tendances tourisme mondial, analyse des stratégies concurrentes (Égypte, Tunisie, Turquie), monitoring de la perception du Maroc à l'international." },
  fenagri: { full: "Fédération Nationale de l'Agroalimentaire", role: "Industrie agroalimentaire · Sécurité alimentaire", apport: "Intelligence sur les chaînes de valeur agricoles mondiales, veille sur les opportunités à l'export en Afrique, suivi des barrières sanitaires UE." },
};

/* ─── 5. API (9) ─── */
export const apiData: Record<string, Api> = {
  investhk: { full: "InvestHK", country: "🇭🇰 Hong Kong", apport: "Hong Kong excelle dans la captation des sièges régionaux. Buildfluence décrypte sa méthode pour adapter le modèle au Maroc." },
  edbsg: { full: "Economic Development Board Singapore", country: "🇸🇬 Singapour", apport: "Singapour est la référence mondiale en attractivité IDE. Buildfluence livre les playbooks que Singapour ne partage pas publiquement." },
  apexbrasil: { full: "Apex-Brasil", country: "🇧🇷 Brésil", apport: "L'Apex-Brasil mobilise massivement la diaspora pour l'export. Buildfluence transpose la méthode à la diaspora marocaine." },
  investlt: { full: "Invest Lithuania", country: "🇱🇹 Lituanie", apport: "Lituanie attire la fintech avec des moyens limités. Étude de cas d'efficacité opérationnelle pour le Maroc." },
  investmx: { full: "Invest Mexico", country: "🇲🇽 Mexique", apport: "Mexique capitalise sur l'USMCA. Buildfluence analyse comment le Maroc peut activer le même levier avec l'AGOA et l'UE." },
  investvn: { full: "Invest Vietnam", country: "🇻🇳 Vietnam", apport: "Vietnam est devenu la chaîne de valeur alternative à la Chine. Buildfluence livre les leçons pour l'Afrique du Nord." },
  investcl: { full: "InvestChile", country: "🇨🇱 Chili", apport: "Chili a structuré sa promotion autour de la stabilité institutionnelle. Référentiel pour la communication d'attractivité Maroc." },
  investsa: { full: "Trade & Investment South Africa", country: "🇿🇦 Afrique du Sud", apport: "L'Afrique du Sud reste la porte d'entrée Afrique pour beaucoup. Buildfluence positionne le Maroc en alternative crédible." },
  czechinvest: { full: "CzechInvest", country: "🇨🇿 République Tchèque", apport: "CzechInvest a transformé un pays post-communiste en hub industriel UE. Modèle d'industrialisation accélérée." },
};

/* ─── 6. COOP (9) ─── */
export const coopData: Record<string, Coop> = {
  giz: { full: "Deutsche Gesellschaft für Internationale Zusammenarbeit", country: "🇩🇪 Allemagne", apport: "GIZ finance massivement la transition énergétique au Maroc. Buildfluence cartographie les programmes alignés avec votre stratégie." },
  afd: { full: "Agence Française de Développement", country: "🇫🇷 France", apport: "L'AFD est le bailleur historique du Maroc. Buildfluence identifie les guichets actifs et les fenêtres de cofinancement." },
  jica: { full: "Japan International Cooperation Agency", country: "🇯🇵 Japon", apport: "JICA finance les infrastructures d'envergure (TGV, ports). Buildfluence anticipe les prochains grands projets éligibles." },
  bei: { full: "Banque Européenne d'Investissement", country: "🇪🇺 Union Européenne", apport: "La BEI cofinance les projets verts et industriels. Buildfluence connecte vos projets aux instruments BEI les plus pertinents." },
  pnud: { full: "Programme des Nations Unies pour le Développement", country: "🇺🇳 ONU", apport: "Le PNUD pilote l'agenda 2030 au Maroc. Buildfluence aligne vos initiatives sur les priorités ODD pour décrocher les cofinancements." },
  bm: { full: "Banque Mondiale", country: "🌍 International", apport: "La Banque Mondiale produit le Doing Business et finance les réformes. Buildfluence anticipe les prochains classements et thèmes prioritaires." },
  berd: { full: "Banque Européenne pour la Reconstruction et le Développement", country: "🇪🇺 Europe", apport: "La BERD finance le secteur privé. Buildfluence identifie les fenêtres de financement adaptées aux PME et ETI marocaines." },
  isdb: { full: "Banque Islamique de Développement", country: "🕌 OCI", apport: "L'IsDB finance les pays musulmans. Buildfluence active ce levier souvent sous-utilisé pour les projets stratégiques." },
  bad: { full: "Banque Africaine de Développement", country: "🌍 Afrique", apport: "La BAD est l'instrument de développement panafricain. Buildfluence positionne le Maroc comme hub privilégié des financements continentaux." },
};

/* ─── 7. LOGOS AMDIE ─── */
export const logoData: Record<string, Logo> = {
  amdie: { name: "AMDIE", full: "Agence Marocaine de Développement des Investissements et des Exportations", apport: "Buildfluence est positionné comme partenaire d'intelligence stratégique pour transformer l'AMDIE en opérateur d'attractivité mondialisé." },
  micepp: { name: "MICEPP", full: "Ministère de l'Industrie, du Commerce et des Petites et Moyennes Entreprises et de l'Économie", apport: "Buildfluence appuie le MICEPP avec une lecture continue des dynamiques industrielles mondiales pour calibrer la stratégie nationale." },
  moroccoNow: { name: "Morocco Now", full: "Plateforme de Nation Branding · Campagne d'attractivité internationale", apport: "Buildfluence transforme Morocco Now de campagne marketing en infrastructure d'influence souveraine, alimentée par le mécanisme complet." },
};
