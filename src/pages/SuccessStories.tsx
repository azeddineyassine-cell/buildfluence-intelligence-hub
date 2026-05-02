import { useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

type Thematique =
  | "all"
  | "gestion-crise"
  | "desinformation"
  | "due-diligence"
  | "attractivite"
  | "influence"
  | "ecosysteme";

type Secteur =
  | "all"
  | "agroalimentaire"
  | "sante"
  | "industrie"
  | "gouvernement"
  | "public"
  | "finance"
  | "sport"
  | "international";

const THEMATIQUES: { value: Thematique; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "gestion-crise", label: "Gestion de crise" },
  { value: "desinformation", label: "Attaques & Désinformation" },
  { value: "due-diligence", label: "Due Diligence & Investissement" },
  { value: "attractivite", label: "Attractivité & Rayonnement" },
  { value: "influence", label: "Influence & Soft Power" },
  { value: "ecosysteme", label: "Écosystème Concurrentiel" },
];

const SECTEURS: { value: Secteur; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "agroalimentaire", label: "Agroalimentaire" },
  { value: "sante", label: "Santé" },
  { value: "industrie", label: "Industrie" },
  { value: "gouvernement", label: "Gouvernement" },
  { value: "public", label: "Établissement public" },
  { value: "finance", label: "Finance & Investissement" },
  { value: "sport", label: "Sport" },
  { value: "international", label: "Organisation internationale" },
];

type Logo = { label: string; italic?: boolean };
type Resource = { type: string; text: string };
type Testimony = { initials: string; text: string; authorBold: string; authorRest: string; date?: string };
type Story = {
  id: string;
  num: string;
  thematique: Exclude<Thematique, "all">;
  secteur: Exclude<Secteur, "all">;
  thematiqueLabel: string;
  miniTitle: string;
  miniPitch: string;
  miniSecteur: string;
  eyebrow: string;
  logos: Logo[];
  visualMain: React.ReactNode;
  resources?: Resource[];
  meta: { label: string; value: string }[];
  titleBefore: string;
  titleEm: string;
  titleAfter?: string;
  storytelling: string;
  mission: string;
  objectives: string[];
  methodo: string;
  kpis: { value: string; label: string }[];
  resultsExtra?: string;
  testimony?: Testimony;
  tags: string[];
};

const stories: Story[] = [
  {
    id: "story-01",
    num: "01",
    thematique: "gestion-crise",
    secteur: "agroalimentaire",
    thematiqueLabel: "Gestion de crise",
    miniTitle: "Centrale Danone",
    miniPitch: "Trois semaines pour défaire deux ans de crise.",
    miniSecteur: "Agroalimentaire · 🇲🇦",
    eyebrow: "Industrie agroalimentaire",
    logos: [{ label: "CENTRALE DANONE" }],
    visualMain: (
      <>
        [ Capture média le360<br />
        <span style={{ color: "var(--bf-gold)" }}>"Vidéo. Rumeurs et réseaux sociaux : quand Raïbi Jamila en paie le prix fort"</span> ]
      </>
    ),
    resources: [
      { type: "▶ Reportage exclusif", text: "RTM, 45 minutes, 2017" },
      { type: "📰 Article média", text: "le360.com, \"Quand Raïbi Jamila en paie le prix fort\"" },
    ],
    meta: [
      { label: "CLIENT", value: "Centrale Danone" },
      { label: "PÉRIODE", value: "2015 / 2017" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Trois semaines pour défaire ",
    titleEm: "deux ans",
    titleAfter: " de crise",
    storytelling:
      "Août 2015, région d'Agadir. Deux enfants meurent après avoir consommé Raïbi Jamila. Sur les réseaux sociaux, la sentence tombe en quelques heures : la marque est coupable. Pendant deux ans, une campagne de dénigrement va s'installer, vider les rayons et faire fondre 120 millions de dirhams de chiffre d'affaires. La contagion gagne les autres produits du groupe. Et personne ne sait qui orchestre l'attaque.",
    mission:
      "Identifier les origines réelles de la campagne de dénigrement, documenter l'innocence du produit, et reconstruire la confiance des consommateurs.",
    objectives: [
      "Récupérer et exploiter les pièces sanitaires officielles",
      "Cartographier les acteurs et profiler les comptes virulents",
      "Bâtir une contre-narrative documentée et activer un canal médiatique de masse",
    ],
    methodo:
      "Déploiement d'une cellule de veille et d'intelligence économique dédiée. Analyse et décryptage des attaques en réseaux sociaux. Mapping et profiling des auteurs virulents. Récupération des documents sanitaires et du rapport d'autopsie. Construction d'un dossier d'innocentement et orchestration d'un reportage exclusif sur la chaîne nationale.",
    kpis: [
      { value: "3 sem.", label: "pour juguler une crise de 2 ans" },
      { value: "100 %", label: "marque innocentée" },
      { value: "+14 %", label: "parts de marché regagnées" },
    ],
    resultsExtra: "+ Reportage exclusif de 45 minutes diffusé sur RTM",
    testimony: {
      initials: "SK",
      text: "\"Prestataire référencé chez nous depuis 2016, M. Azeddine Yassine (Buildfluence) a réalisé avec succès des missions pour Centrale Danone. Dès le début, M. Yassine a fait preuve d'un réel professionnalisme et d'une rigueur à toute épreuve. Nous le recommandons vivement.\"",
      authorBold: "Samia Kabbaj Douiri",
      authorRest: ", Secrétaire Générale, Centrale Danone",
      date: "(lettre du 2 février 2020)",
    },
    tags: ["AGROALIMENTAIRE", "GESTION DE CRISE", "RÉHABILITATION DE MARQUE", "DÉSINFORMATION", "🇲🇦 MAROC"],
  },
  {
    id: "story-02",
    num: "02",
    thematique: "desinformation",
    secteur: "international",
    thematiqueLabel: "Attaques & Désinformation",
    miniTitle: "Cabinet européen d'intelligence",
    miniPitch: "Quand un boycott n'est pas un mouvement spontané.",
    miniSecteur: "Intelligence stratégique · 🇲🇦",
    eyebrow: "Intelligence stratégique internationale",
    logos: [{ label: "CABINET EUROPÉEN\nD'INTELLIGENCE", italic: true }],
    visualMain: (
      <>
        [ Iconographie boycott 2018<br />
        <span style={{ color: "var(--bf-gold)" }}>#كلنا_مقاطعون</span> ]
      </>
    ),
    resources: [
      { type: "📄 Étude indépendante", text: "EPGE, \"Le boycott d'avril 2018 au Maroc\", septembre 2019" },
    ],
    meta: [
      { label: "CLIENT", value: "Cabinet européen d'intelligence" },
      { label: "PÉRIODE", value: "2018" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Quand un boycott n'est ",
    titleEm: "pas",
    titleAfter: " un mouvement spontané",
    storytelling:
      "Avril 2018. Une vague de boycott sans précédent frappe trois marques emblématiques au Maroc : Centrale Danone, Sidi Ali, Afriquia. En quelques jours, des millions d'interactions, des pertes business massives, une psychose nationale. L'opinion croit à un réflexe citoyen. La donnée raconte autre chose : pages anonymes coordonnées, plus de 800 bots créés un mois avant le déclenchement, sponsorisation détectée, éléments de langage répliqués. L'opération est orchestrée. Reste à le prouver.",
    mission:
      "Identifier, analyser et cartographier les instigateurs d'une campagne de désinformation visant les produits de première nécessité au Maroc, pour le compte d'un cabinet européen d'intelligence stratégique de premier plan.",
    objectives: [
      "Décoder les moyens techniques (pages anonymes, bots, astroturfing, sponsoring)",
      "Tracker les éléments de langage et reconstituer le réseau opérationnel",
      "Documenter l'orchestration et identifier la signature politique sous-jacente",
    ],
    methodo:
      "Veille multicanale et OSINT approfondi sur Facebook, Twitter, YouTube. Analyse de plus de 4 000 posts originaux et 500 000 commentaires. Cartographie des comptes clés et de leurs interconnexions. Détection des bots par profilage comportemental. Tracking des éléments de langage et identification des facteurs de vulnérabilité instrumentalisés.",
    kpis: [
      { value: "800+", label: "bots identifiés et profilés" },
      { value: "3 niveaux", label: "technique, narratif, opérationnel" },
      { value: "100 %", label: "chaîne d'orchestration documentée" },
    ],
    testimony: {
      initials: "DG",
      text: "\"Partenaire depuis 2017, nous sollicitons M. Azeddine Yassine pour réaliser des missions concernant des études socio-économiques ou géopolitiques nécessitant la collecte de données, l'analyse des tendances et des recommandations facilitant des prises de décision éclairées. À chaque fois, M. Yassine a su travailler efficacement et ponctuellement pour répondre à nos demandes. Personne rigoureuse, organisée, perfectionniste et discrète. Approche en matière de gestion de tous projets qui dépasse nos exigences.\"",
      authorBold: "Directeur Général",
      authorRest: ", cabinet européen d'intelligence stratégique",
      date: "(lettre du 2 mars 2020)",
    },
    tags: ["INTELLIGENCE STRATÉGIQUE", "DÉSINFORMATION", "CARTOGRAPHIE D'ACTEURS", "OSINT", "🇲🇦 MAROC"],
  },
  {
    id: "story-03",
    num: "03",
    thematique: "attractivite",
    secteur: "international",
    thematiqueLabel: "Attractivité & Rayonnement",
    miniTitle: "CIDC / OCI",
    miniPitch: "Faire renaître une organisation 38 ans après sa création.",
    miniSecteur: "Organisation internationale · 🇸🇦 OCI",
    eyebrow: "Organisation internationale",
    logos: [{ label: "CIDC · OCI" }],
    visualMain: (
      <>
        [ Doing Business Platform<br />
        <span style={{ color: "var(--bf-gold)" }}>+ Magazine TIJARIS bimensuel</span> ]
      </>
    ),
    resources: [
      { type: "🌐 Plateforme", text: "Doing Business Platform · CIDC OCI" },
      { type: "📖 Publication", text: "Magazine TIJARIS, bimensuel" },
    ],
    meta: [
      { label: "CLIENT", value: "CIDC (organe OCI)" },
      { label: "SIÈGE", value: "🇲🇦 Casablanca" },
      { label: "COUVERTURE", value: "57 États membres" },
      { label: "PÉRIODE", value: "2022 / 2023" },
    ],
    titleBefore: "Faire renaître une organisation ",
    titleEm: "38 ans",
    titleAfter: " après sa création",
    storytelling:
      "Trente-huit ans après sa création, le CIDC peine à exister auprès de ses 57 États membres. Faible visibilité, sollicitation marginale, organisation perçue comme dépassée par les enjeux du commerce intra-OCI. Une nouvelle Direction Générale arrive, ambitieuse : transformer le centre en plateforme d'attractivité moderne, capable de générer du business réel entre ses pays membres. Restait à concevoir l'outil.",
    mission:
      "Concevoir et développer l'architecture d'une plateforme digitale d'attractivité et d'influence pour relancer la notoriété et l'utilité opérationnelle du CIDC.",
    objectives: [
      "Diagnostiquer les missions et le positionnement du CIDC",
      "Concevoir l'architecture d'une \"Doing Business Platform\" multi-composantes",
      "Transformer le CIDC en organisation orientée intelligence économique et insight-driven",
    ],
    methodo:
      "Compréhension fine des missions du CIDC, diagnostic opérationnel et stratégique. Conception de l'architecture digitale autour de six composantes : Business Ecosystem, Carte sectorielle interactive, Country Profile, Matchmaking, Knowledge Center, Outils décisionnels. Partenariat avec une solution spécialisée Halal. Production éditoriale soutenue (Lettre de Veille et magazine TIJARIS bimensuel).",
    kpis: [
      { value: "57", label: "États membres OCI couverts" },
      { value: "6", label: "composantes digitales déployées" },
      { value: "Bimensuel", label: "magazine TIJARIS lancé" },
    ],
    resultsExtra: "+ Repositionnement du CIDC en organisation orientée Intelligence Économique et approche Insight-Driven",
    tags: ["ORGANISATION INTERNATIONALE", "PLATEFORME D'ATTRACTIVITÉ", "INTELLIGENCE ÉCONOMIQUE", "MATCHMAKING", "🇲🇦 🇸🇦 OCI"],
  },
  {
    id: "story-04",
    num: "04",
    thematique: "gestion-crise",
    secteur: "sante",
    thematiqueLabel: "Gestion de crise",
    miniTitle: "Ministère de la Santé",
    miniPitch: "Stopper une psychose nationale en deux semaines.",
    miniSecteur: "Santé publique · 🇲🇦",
    eyebrow: "Santé publique",
    logos: [{ label: "MINISTÈRE\nDE LA SANTÉ\nMAROC", italic: true }],
    visualMain: (
      <>
        [ Crisis Dashboard Grippe A H1N1<br />
        <span style={{ color: "var(--bf-gold)" }}>+ Weekly Dashboard DICom</span> ]
      </>
    ),
    meta: [
      { label: "CLIENT", value: "Ministère de la Santé" },
      { label: "TÉMOIGNAGE", value: "Dr Hanan Fadlallah" },
      { label: "PÉRIODE", value: "2018 / 2019" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Stopper une psychose nationale en ",
    titleEm: "deux semaines",
    storytelling:
      "2018. Le virus H1N1 frappe le Maroc. Une quarantaine de décès. Sur les réseaux sociaux, le silence du Ministère laisse un vide immédiatement comblé : rumeurs, fake news, désinformation organisée. La psychose s'installe, l'indignation citoyenne monte, l'autorité sanitaire perd la main. Pour reprendre le récit, il faut comprendre qui le fabrique. Et avec quelle intensité.",
    mission:
      "Piloter la communication de crise H1N1 et installer un dispositif de veille stratégique au sein de la Division de l'Information et de la Communication du Ministère.",
    objectives: [
      "Mesurer en temps réel la perception publique et identifier les vecteurs de désinformation",
      "Outiller la Division Communication avec un baromètre d'image et des dashboards opérationnels",
      "Former les cadres aux techniques d'intelligence économique appliquées à la santé publique",
    ],
    methodo:
      "Déploiement d'une solution de veille et d'analyse stratégique. Fact-checking des contenus diffusés sur Facebook et YouTube. Décryptage et mapping des auteurs de messages nuisibles. Production de tableaux de bord hebdomadaires (Positionnement, Gouvernement, Partis politiques, Trending Public Opinion). Campagne digitale activant cadres du Ministère et experts externes.",
    kpis: [
      { value: "2 sem.", label: "pour atténuer la crise nationale" },
      { value: "Permanente", label: "solution de veille installée" },
      { value: "Formation", label: "cadres et journalistes DICom" },
    ],
    testimony: {
      initials: "HF",
      text: "\"Doté d'une vision exceptionnelle, des capacités d'analyse fine et de synthèse, les conseils de M. Azeddine Yassine étaient un appui fort pour la stratégie de communication du Ministère de la Santé. Son intervention a laissé des marques de valeurs : installation d'une solution de veille stratégique et de Data Intelligence, formation des cadres et des journalistes de la DICom, compréhension et cartographie de l'écosystème du Ministère, méthodologie d'extraction des insights de risques et prévention de crise.\"",
      authorBold: "Dr Hanan Fadlallah",
      authorRest: ", Cheffe de la Division de l'Information et de la Communication, Ministère de la Santé",
      date: "(lettre du 2 janvier 2020)",
    },
    tags: ["SANTÉ PUBLIQUE", "COMMUNICATION DE CRISE", "DATA INTELLIGENCE", "FACT-CHECKING", "🇲🇦 MAROC"],
  },
  {
    id: "story-05",
    num: "05",
    thematique: "attractivite",
    secteur: "sante",
    thematiqueLabel: "Attractivité & Rayonnement",
    miniTitle: "Ginger International",
    miniPitch: "Quand l'intelligence stratégique sert l'attractivité hospitalière.",
    miniSecteur: "Santé · 🇲🇦 🇫🇷 🇩🇪",
    eyebrow: "Coopération internationale & santé",
    logos: [{ label: "GINGER INTERNATIONAL" }, { label: "KFW", italic: true }],
    visualMain: (
      <>
        [ Mission tripartite<br />
        <span style={{ color: "var(--bf-gold)" }}>🇲🇦 Maroc · 🇫🇷 France · 🇩🇪 Allemagne</span> ]
      </>
    ),
    meta: [
      { label: "CLIENT", value: "Ginger International (France)" },
      { label: "BÉNÉFICIAIRE", value: "Établissement hospitalier de référence" },
      { label: "BAILLEUR", value: "KFW (Banque Allemande)" },
      { label: "PÉRIODE", value: "2022 / 2023 · 🇲🇦 🇫🇷 🇩🇪" },
    ],
    titleBefore: "Quand l'intelligence stratégique sert ",
    titleEm: "l'attractivité hospitalière",
    storytelling:
      "2022. Un grand établissement hospitalier de référence à Casablanca fait face à un enjeu d'attractivité et de positionnement. Le bailleur allemand KFW finance une mission d'assistance technique stratégique, confiée au cabinet français Ginger International. Mission : moderniser la communication d'un acteur de santé majeur, en s'appuyant sur la Data, l'analyse et l'intelligence économique appliquées au secteur hospitalier.",
    mission:
      "Accompagner la transformation de la communication d'un grand établissement hospitalier marocain via une approche d'intelligence stratégique et de Data Influence, dans le cadre d'une mission financée par KFW.",
    objectives: [
      "Asseoir la notoriété et le positionnement de l'établissement",
      "Outiller les équipes communication avec des dispositifs d'aide à la décision basés sur l'IA",
      "Produire des audits, recommandations et feuille de route opérationnelle",
    ],
    methodo:
      "Benchmarks et analyses de situation approfondies. Déploiement d'une plateforme de données basée sur l'intelligence artificielle pour l'extraction et l'analyse de données stratégiques. Création de tableaux de bord et de rapports d'analyse pour le suivi de performance. Accompagnement opérationnel du département communication par enjeu et par cible.",
    kpis: [
      { value: "11 mois", label: "de mission menée à terme" },
      { value: "Plateforme IA", label: "déployée pour l'aide à la décision" },
      { value: "Stratégie", label: "de communication repositionnée" },
    ],
    resultsExtra: "+ Mission internationale tripartite : bailleur public allemand, cabinet français, expertise marocaine",
    testimony: {
      initials: "OL",
      text: "\"Mandaté pour un audit d'image, le cabinet Buildfluence a livré des solutions innovantes et créatives. La mission s'est distinguée par un professionnalisme exemplaire, une attention méticuleuse aux détails et un respect total des délais de livraison. Une vive recommandation pour tout projet alliant excellence opérationnelle et créativité.\"",
      authorBold: "Olivier Laboue",
      authorRest: ", Directeur de Développement International, Ginger International",
    },
    tags: ["COOPÉRATION INTERNATIONALE", "SANTÉ", "DATA INTELLIGENCE", "ATTRACTIVITÉ HOSPITALIÈRE", "🇲🇦 🇫🇷 🇩🇪"],
  },
  {
    id: "story-06",
    num: "06",
    thematique: "desinformation",
    secteur: "sport",
    thematiqueLabel: "Attaques & Désinformation",
    miniTitle: "Raja Club Athletic",
    miniPitch: "Quand un club légendaire devient cible informationnelle.",
    miniSecteur: "Sport professionnel · 🇲🇦",
    eyebrow: "Sport professionnel & gouvernance",
    logos: [{ label: "RAJA CLUB ATHLETIC" }, { label: "MARSA MAROC", italic: true }],
    visualMain: (
      <>
        [ Architecture de veille multi-dossiers<br />
        <span style={{ color: "var(--bf-gold)" }}>Sport, Gouvernance, Médias</span> ]
      </>
    ),
    resources: [
      { type: "📰 Couverture média", text: "Africa Intelligence, \"La contre-offensive numérique du Raja\"" },
    ],
    meta: [
      { label: "CLIENT", value: "Raja Club Athletic" },
      { label: "ACTIONNAIRE", value: "Marsa Maroc (60%)" },
      { label: "PÉRIODE", value: "Mission 2026 en cours" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Quand un club légendaire devient ",
    titleEm: "cible informationnelle",
    storytelling:
      "2026. Le Raja Club Athletic, club le plus populaire du Maroc, entre dans une nouvelle ère : reprise par Marsa Maroc, nouveau président, nouvelle directrice générale issue du privé. La modernisation s'enclenche, et avec elle, les premières attaques informationnelles ciblant la direction. Articles de presse, posts coordonnés, screenshots viralisés. Sous l'apparence du débat sportif, une autre lecture émerge : celle d'une déstabilisation orchestrée des dirigeants au moment où le club retrouve sa stabilité institutionnelle.",
    mission:
      "Mettre en place un dispositif de veille stratégique permanent et fournir une analyse de crise en temps réel face aux campagnes informationnelles ciblant la direction du club.",
    objectives: [
      "Structurer une plateforme de veille multi-dossiers (concurrentielle, réglementaire, sponsoring, technologique, sociétale)",
      "Détecter et analyser les attaques informationnelles ciblant les dirigeants",
      "Formuler des recommandations pro-actives de gestion de crise et de réponse stratégique",
    ],
    methodo:
      "Architecture de veille sur six dossiers structurés : Botola Pro et compétitions africaines, FRMF/CAF/FIFA, sponsoring et investisseurs, technologies de performance et infrastructure, supporters et médias, modèles économiques internationaux. Analyse en temps réel des publications négatives, identification des sources et des chaînes de propagation, qualification des intentions, recommandations stratégiques.",
    kpis: [
      { value: "6", label: "dossiers de veille structurée" },
      { value: "24/7", label: "monitoring permanent" },
      { value: "Réactif", label: "analyse en moins de 24h" },
    ],
    resultsExtra: "+ Mission d'intelligence stratégique au service d'un acteur emblématique du sport marocain",
    tags: ["SPORT PROFESSIONNEL", "INTELLIGENCE STRATÉGIQUE", "GESTION DE CRISE", "MONITORING NARRATIF", "🇲🇦 MAROC"],
  },
  {
    id: "story-07",
    num: "07",
    thematique: "ecosysteme",
    secteur: "industrie",
    thematiqueLabel: "Écosystème Concurrentiel",
    miniTitle: "OCP Group",
    miniPitch: "Briser l'encerclement informationnel d'un champion national.",
    miniSecteur: "Industrie stratégique · 🇲🇦",
    eyebrow: "Industrie stratégique nationale",
    logos: [{ label: "OCP GROUP" }],
    visualMain: (
      <>
        [ Cartographie d'écosystème<br />
        <span style={{ color: "var(--bf-gold)" }}>+ Matrice socio-dynamique</span> ]
      </>
    ),
    meta: [
      { label: "CLIENT", value: "OCP Group" },
      { label: "POSTE", value: "Strategic Communication Manager" },
      { label: "PÉRIODE", value: "2014" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Briser l'encerclement informationnel d'un ",
    titleEm: "champion national",
    storytelling:
      "De 2004 à 2014, OCP Group fait face à une série de campagnes de nuisance commerciale orchestrées sur trois échiquiers : géopolitique, concurrentiel, sociétal. La conséquence est mesurable : perte de notoriété, migration de clients vers la concurrence, brouillage du récit institutionnel d'un champion industriel marocain. Dans une industrie où la perception influence la valorisation, l'environnement informationnel devient un terrain stratégique à part entière.",
    mission:
      "Réaliser une analyse à 360° de l'environnement informationnel d'OCP, structurer un système de veille permanent et formuler les actions de contre-influence et de communication adaptées à chaque échiquier.",
    objectives: [
      "Mettre en place un système de veille spécifique (image, compétitivité, marché)",
      "Identifier et décrypter les nuisances sur les trois échiquiers (géopolitique, concurrentiel, sociétal)",
      "Outiller la Direction Générale avec un dispositif de reporting régulier permettant des prises de décision éclairées",
    ],
    methodo:
      "Choix de l'outil de veille, formation des équipes, mise en œuvre de la solution. Méthodologie de collecte et d'analyse des informations à valeur ajoutée. Études, benchmark et décryptage des thématiques sensibles. Matrice socio-dynamique pour positionner et anticiper l'évolution des parties prenantes. Cartographie d'écosystème, scénarisation d'actions, feuille de route et outils décisionnels.",
    kpis: [
      { value: "3 échiquiers", label: "analysés à 360°" },
      { value: "Permanent", label: "dispositif de veille déployé" },
      { value: "Souverain", label: "reporting décisionnel haut niveau" },
    ],
    testimony: {
      initials: "SA",
      text: "\"Dans le cadre de ses responsabilités de Strategic Communication Manager au sein de la Direction de Communication Corporate OCP Group, Azeddine Yassine assumait les missions qui lui ont été conférées avec dévouement et menait ses projets avec professionnalisme. Doté des capacités d'analyse et de synthèse, Azeddine Yassine est intervenu en parfait conseiller apportant une plus-value certaine pour l'information décisionnelle.\"",
      authorBold: "Sanaë Alami Afilal",
      authorRest: ", VP Chargée de mission, Direction Générale OCP Group",
      date: "(lettre du 3 mars 2020)",
    },
    tags: ["INDUSTRIE STRATÉGIQUE", "INTELLIGENCE COMPÉTITIVE", "CARTOGRAPHIE D'ÉCOSYSTÈME", "CONTRE-INFLUENCE", "🇲🇦 MAROC"],
  },
  {
    id: "story-08",
    num: "08",
    thematique: "influence",
    secteur: "gouvernement",
    thematiqueLabel: "Influence & Soft Power",
    miniTitle: "Présidence du Sénégal",
    miniPitch: "Surveiller la notoriété d'un État en temps réel.",
    miniSecteur: "Gouvernement · 🇸🇳",
    eyebrow: "Gouvernement & souveraineté",
    logos: [{ label: "PRÉSIDENCE\nDE LA RÉPUBLIQUE\nDU SÉNÉGAL", italic: true }],
    visualMain: (
      <>
        [ Cartographie stratégique<br />
        <span style={{ color: "var(--bf-gold)" }}>+ Tendances émergentes IA</span> ]
      </>
    ),
    meta: [
      { label: "CLIENT", value: "Présidence du Sénégal" },
      { label: "MISSION", value: "Veille à 360°" },
      { label: "GÉOGRAPHIE", value: "🇸🇳 Sénégal" },
    ],
    titleBefore: "Surveiller la ",
    titleEm: "notoriété d'un État",
    titleAfter: " en temps réel",
    storytelling:
      "Une présidence ouest-africaine fait face à un contexte de turbulence informationnelle aiguë. Sur les plateformes digitales, le récit se fragmente : tendances émergentes, signaux faibles, narratifs concurrents. Pour un cabinet présidentiel, la maîtrise de la perception devient une question de gouvernance. Il faut voir avant de réagir, comprendre avant de décider.",
    mission:
      "Mettre en place un dispositif de surveillance de la notoriété de l'État et du Chef de l'État, avec monitoring narratif en temps réel et alertes décisionnelles.",
    objectives: [
      "Surveiller en temps réel l'image de l'État sur les plateformes digitales",
      "Identifier et décrypter les tendances émergentes et discours nuisibles",
      "Fournir au cabinet présidentiel des outils d'aide à la décision pour adapter la stratégie de communication",
    ],
    methodo:
      "Cartographie stratégique des interactions et alliances. Surveillance permanente des thématiques émergentes et de leur impact sur l'opinion. Détection des signaux faibles et évaluation des scénarios. Plateforme de veille dédiée à la collecte et l'analyse des données. Investigation digitale et solution de fact-checking.",
    kpis: [
      { value: "24/7", label: "monitoring narratif" },
      { value: "Temps réel", label: "détection des signaux faibles" },
      { value: "Décisionnel", label: "rapports et alertes au cabinet" },
    ],
    resultsExtra: "+ Identification des dynamiques adverses et des vecteurs de désinformation, veille sur les secteurs stratégiques de l'État",
    tags: ["GOUVERNEMENT", "NOTORIÉTÉ D'ÉTAT", "MONITORING NARRATIF", "INTELLIGENCE SOUVERAINE", "🇸🇳 SÉNÉGAL"],
  },
  {
    id: "story-09",
    num: "09",
    thematique: "attractivite",
    secteur: "public",
    thematiqueLabel: "Attractivité & Rayonnement",
    miniTitle: "ADD",
    miniPitch: "Repositionner un acteur public dans son écosystème digital.",
    miniSecteur: "Établissement public · 🇲🇦",
    eyebrow: "Établissement public & transformation digitale",
    logos: [{ label: "#ADD" }, { label: "GITEX AFRICA", italic: true }],
    visualMain: (
      <>
        [ Architecture digitale ADD<br />
        <span style={{ color: "var(--bf-gold)" }}>+ Benchmark international</span> ]
      </>
    ),
    meta: [
      { label: "CLIENT", value: "Agence de Développement du Digital" },
      { label: "PARTENARIAT", value: "GITEX Africa Morocco" },
      { label: "PÉRIODE", value: "2022 / 2023" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Repositionner un acteur public dans son ",
    titleEm: "écosystème digital",
    storytelling:
      "Cinq ans après sa création, l'Agence de Développement du Digital cherche à consolider sa place dans l'écosystème digital national. Plusieurs initiatives ont été lancées, mais le positionnement mérite d'être clarifié pour faire de l'ADD un acteur incontournable de la transformation digitale marocaine. Une démarche d'audit, d'analyse et de feuille de route s'impose.",
    mission:
      "Diagnostiquer le positionnement de l'ADD, analyser son empreinte digitale, et proposer une feuille de route pour renforcer son rôle d'acteur central du développement digital national.",
    objectives: [
      "Analyser les attributions de l'ADD, son organisation interne et l'écosystème digital national",
      "Auditer l'empreinte digitale et benchmarker les meilleures pratiques internationales",
      "Proposer une feuille de route stratégique pour améliorer la perception et le rayonnement de l'ADD",
    ],
    methodo:
      "Diagnostic organisationnel via brainstorming, interviews des directeurs et analyse des verbatims. Analyse de l'empreinte digitale de l'agence. Benchmark des best practices internationales d'agences digitales nationales. Sondage et analyse de l'opinion publique. Solution de veille et d'analyse stratégique. Outils d'évaluation organisationnelle.",
    kpis: [
      { value: "Audit", label: "organisationnel et digital complet" },
      { value: "Cellule", label: "de veille mise en place" },
      { value: "GITEX Africa", label: "partenariat stratégique recommandé" },
    ],
    resultsExtra: "+ Diversification de la communication multicanale, formation des directeurs et chefs de département",
    tags: ["ÉTABLISSEMENT PUBLIC", "TRANSFORMATION DIGITALE", "BENCHMARK INTERNATIONAL", "FEUILLE DE ROUTE", "🇲🇦 MAROC"],
  },
  {
    id: "story-10",
    num: "10",
    thematique: "attractivite",
    secteur: "sante",
    thematiqueLabel: "Attractivité & Rayonnement",
    miniTitle: "Hôpital Universitaire Med VI",
    miniPitch: "Crédibiliser l'attractivité d'un hôpital universitaire de référence.",
    miniSecteur: "Santé · 🇲🇦",
    eyebrow: "Santé & attractivité hospitalière",
    logos: [{ label: "HUIM VI\nBOUSKOURA", italic: true }],
    visualMain: (
      <>
        [ Stakeholders Mapping<br />
        <span style={{ color: "var(--bf-gold)" }}>+ Audit digital hospitalier</span> ]
      </>
    ),
    meta: [
      { label: "CLIENT", value: "Hôpital Universitaire Med VI" },
      { label: "LOCALISATION", value: "Bouskoura" },
      { label: "PÉRIODE", value: "2022" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Crédibiliser l'attractivité d'un ",
    titleEm: "hôpital universitaire de référence",
    storytelling:
      "2022. L'Hôpital Universitaire International Mohammed VI, établissement de santé moderne situé à Bouskoura, souhaite renforcer son positionnement et son attractivité dans un écosystème hospitalier marocain compétitif. La direction générale et la direction de la communication mandatent une étude stratégique pour bâtir une feuille de route dédiée à la notoriété, à l'image institutionnelle et à l'engagement des acteurs clés (patients, médecins, partenaires).",
    mission:
      "Réaliser une étude stratégique sur l'image et la notoriété de l'établissement et activer les leviers d'attractivité ascendante via une approche d'intelligence et de communication ciblée.",
    objectives: [
      "Asseoir la réputation aux niveaux régional, national et international",
      "Sceller le positionnement au sein de l'écosystème médical et de la santé au Maroc",
      "Crédibiliser l'attractivité auprès des patients et valoriser les médecins",
    ],
    methodo:
      "Vingt jours d'immersion : meetings, entretiens individuels, séances de brainstorming, analyse des verbatims. Cartographie des parties prenantes (Stakeholders Mapping). Analyse de l'écosystème (emplacement géographique, environnement concurrentiel, acteurs clés). Audit digital approfondi (architecture, SEO, contenu, réseaux sociaux). Production d'une feuille de route stratégique en 18 recommandations opérationnelles.",
    kpis: [
      { value: "18 reco.", label: "stratégiques opérationnelles" },
      { value: "Feuille de route", label: "différenciée par cible et enjeu" },
      { value: "Stakeholders", label: "écosystème complet cartographié" },
    ],
    resultsExtra: "+ Stratégie de Content Intelligence par cible (DG, personnel, professionnels de santé, institutions)",
    tags: ["SANTÉ", "ATTRACTIVITÉ HOSPITALIÈRE", "STAKEHOLDERS MAPPING", "STRATÉGIE DE COMMUNICATION", "🇲🇦 MAROC"],
  },
  {
    id: "story-11",
    num: "11",
    thematique: "due-diligence",
    secteur: "finance",
    thematiqueLabel: "Due Diligence & Investissement",
    miniTitle: "Due Diligence Internationale",
    miniPitch: "Lever le voile sur un investisseur en zone de risque.",
    miniSecteur: "Finance & Conformité · 🇲🇦 🌍",
    eyebrow: "Deep Due Diligence & conformité",
    logos: [{ label: "CONFIDENTIEL\nNDA STRICT", italic: true }],
    visualMain: (
      <>
        [ Cartographie d'investisseurs internationaux<br />
        <span style={{ color: "var(--bf-gold)" }}>+ Code feu vert / orange / rouge</span> ]
      </>
    ),
    meta: [
      { label: "CLIENT", value: "Entreprise marocaine (NDA strict)" },
      { label: "CIBLE", value: "Capital-Risque sous sanctions" },
      { label: "SECTEUR", value: "IT / Tech" },
      { label: "PÉRIODE", value: "2024 · 🇲🇦 🌍" },
    ],
    titleBefore: "Lever le voile sur un investisseur en ",
    titleEm: "zone de risque",
    storytelling:
      "Novembre 2024, Marrakech. Une entreprise marocaine s'apprête à entrer en relation d'affaires avec un fonds d'investissement issu d'une juridiction soumise à un régime de sanctions internationales, lors d'un rassemblement de quarante investisseurs étrangers. Avant tout engagement, une question s'impose : qui sont vraiment les acteurs derrière la société cible ? Quels liens, quels actionnaires, quels risques de conformité ? Une investigation Deep Due Diligence devient indispensable.",
    mission:
      "Réaliser une radiologie d'honorabilité complète sur une société cible et ses investisseurs, dans un contexte de conformité internationale renforcée et de risque réputationnel.",
    objectives: [
      "Cibler une seule société dans le secteur Capital-Risque IT",
      "Mener une investigation informationnelle de conformité complète sur l'entreprise et ses investisseurs",
      "Identifier les dynamiques adverses et vecteurs de risque",
    ],
    methodo:
      "Plateforme de veille dédiée à la collecte et l'analyse des données. Solution de Fact-Checking et de cartographie des dirigeants. Screening PEP, vérifications sanctions ONU/OFAC/UE. Audit KYC, LCB-FT, ESG. Cartographie des interconnexions entre dirigeants et entreprises dans différents pays. Analyse sur les secteurs stratégiques et les concurrents.",
    kpis: [
      { value: "400 M$", label: "valorisation auditée" },
      { value: "Code 3 niv.", label: "vert / orange / rouge pour décision" },
      { value: "NDA strict", label: "confidentialité absolue" },
    ],
    resultsExtra: "+ Cartographie complète des interconnexions internationales et identification des risques de conformité",
    tags: ["DEEP DUE DILIGENCE", "CONFORMITÉ INTERNATIONALE", "KYC / LCB-FT", "CARTOGRAPHIE D'ACTEURS", "🇲🇦 🌍"],
  },
];

const SuccessStoriesCSS = `
  :root {
    --bf-paper: #F4F1EA;
    --bf-paper-deep: #EDE8DD;
    --bf-navy: #0A1628;
    --bf-navy-soft: #142340;
    --bf-navy-deeper: #060E1B;
    --bf-gold: #C9A84C;
    --bf-gold-soft: #D9BC6A;
    --bf-ink: #1A1A1A;
    --bf-ink-soft: #4A4A4A;
    --bf-ink-muted: #7A7A7A;
  }
  .ss-page { background: var(--bf-paper); color: var(--bf-ink); font-family: 'DM Sans', sans-serif; font-weight: 300; line-height: 1.55; }
  .ss-page * { box-sizing: border-box; }
  .ss-header { max-width: 1200px; margin: 0 auto; padding: 120px 40px 40px; }
  .ss-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 16px; }
  .ss-title { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 48px; color: var(--bf-navy); line-height: 1.1; margin: 0 0 18px; max-width: 800px; }
  .ss-title em { font-style: italic; color: var(--bf-gold); font-weight: 400; }
  .ss-chapeau { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 21px; color: var(--bf-ink-soft); max-width: 720px; line-height: 1.4; margin: 0; }

  .ss-filters { max-width: 1200px; margin: 0 auto; padding: 40px 40px 0; border-top: 1px solid var(--bf-paper-deep); }
  .ss-filter-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .ss-filter-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-ink-muted); margin-right: 12px; min-width: 90px; }
  .ss-filter-btn { background: transparent; border: 1px solid var(--bf-paper-deep); color: var(--bf-ink-soft); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; padding: 7px 14px; cursor: pointer; border-radius: 0; transition: all 0.15s ease; letter-spacing: 0.02em; }
  .ss-filter-btn:hover { border-color: var(--bf-gold); color: var(--bf-navy); }
  .ss-filter-btn.active-thema { background: var(--bf-navy); border-color: var(--bf-navy); color: var(--bf-gold); font-weight: 500; }
  .ss-filter-btn.active-secteur { background: var(--bf-paper-deep); border-color: var(--bf-gold); color: var(--bf-navy); font-weight: 500; }

  .ss-mini-section { max-width: 1200px; margin: 32px auto 0; padding: 0 40px; }
  .ss-mini-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: var(--bf-paper-deep); border: 1px solid var(--bf-paper-deep); }
  .ss-mini-card { background: #FAF8F2; padding: 18px 20px; cursor: pointer; transition: all 0.15s ease; text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 8px; min-height: 140px; }
  .ss-mini-card:hover { background: var(--bf-navy); color: var(--bf-paper); }
  .ss-mini-card:hover .ss-mini-thema, .ss-mini-card:hover .ss-mini-secteur-line { color: var(--bf-gold); }
  .ss-mini-card:hover .ss-mini-title { color: var(--bf-paper); }
  .ss-mini-card:hover .ss-mini-pitch { color: rgba(244, 241, 234, 0.75); }
  .ss-mini-num { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.2em; color: var(--bf-ink-muted); }
  .ss-mini-thema { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--bf-gold); margin-left: 8px; }
  .ss-mini-title { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 16px; color: var(--bf-navy); line-height: 1.25; transition: color 0.15s ease; }
  .ss-mini-pitch { font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--bf-ink-muted); line-height: 1.45; margin-top: auto; }
  .ss-mini-secteur-line { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--bf-ink-muted); margin-top: 4px; }

  .ss-hidden { display: none !important; }

  .ss-stories { max-width: 1200px; margin: 60px auto 0; padding: 0 40px 120px; }
  .ss-story { background: #FAF8F2; border: 1px solid var(--bf-paper-deep); margin-bottom: 60px; overflow: hidden; display: grid; grid-template-columns: 1fr 1.6fr; scroll-margin-top: 40px; }
  .ss-visual { background: var(--bf-navy); padding: 32px 28px; color: var(--bf-paper); display: flex; flex-direction: column; min-height: 100%; }
  .ss-story-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 22px; line-height: 1.5; }
  .ss-logos { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid var(--bf-navy-soft); flex-wrap: wrap; }
  .ss-logo { background: var(--bf-paper); color: var(--bf-navy); font-family: 'Playfair Display', serif; font-weight: 600; font-size: 13px; padding: 9px 13px; border-radius: 0; line-height: 1.1; letter-spacing: 0.02em; white-space: pre-line; }
  .ss-logo.italic { font-style: italic; font-size: 11px; }
  .ss-visual-main { background: linear-gradient(135deg, var(--bf-navy-deeper), var(--bf-navy-soft)); border: 1px solid var(--bf-navy-soft); padding: 28px 20px; margin-bottom: 18px; text-align: center; color: var(--bf-ink-muted); font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13px; min-height: 160px; display: flex; align-items: center; justify-content: center; line-height: 1.5; position: relative; }
  .ss-visual-main::before { content: ''; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 1px solid rgba(217, 188, 106, 0.15); pointer-events: none; }
  .ss-resources { margin-bottom: 22px; }
  .ss-res-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 12px; }
  .ss-res-link { display: block; padding: 9px 12px; margin-bottom: 6px; background: rgba(217, 188, 106, 0.05); border-left: 2px solid var(--bf-gold); color: rgba(244, 241, 234, 0.85); font-family: 'DM Sans', sans-serif; font-size: 12px; text-decoration: none; transition: all 0.15s ease; cursor: pointer; }
  .ss-res-link:hover { background: rgba(217, 188, 106, 0.12); color: var(--bf-gold); }
  .ss-res-type { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--bf-gold); display: block; margin-bottom: 2px; }
  .ss-meta { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; line-height: 1.7; border-top: 1px solid var(--bf-navy-soft); padding-top: 16px; margin-top: auto; }
  .ss-meta-line { color: rgba(244, 241, 234, 0.55); margin-bottom: 4px; }
  .ss-meta-line strong { color: var(--bf-gold); font-weight: 500; }

  .ss-content { padding: 40px 44px; }
  .ss-num { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 14px; }
  .ss-story-title { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 32px; color: var(--bf-navy); line-height: 1.15; margin: 0 0 28px; }
  .ss-story-title em { font-style: italic; color: var(--bf-gold); font-weight: 500; }
  .ss-section-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 12px; margin-top: 24px; }
  .ss-section-label.first { margin-top: 0; }
  .ss-storytelling { font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--bf-ink); line-height: 1.7; margin-bottom: 28px; }
  .ss-mission { background: var(--bf-paper-deep); border-left: 2px solid var(--bf-gold); padding: 18px 22px; margin: 8px 0 28px; font-family: 'Playfair Display', serif; font-style: italic; font-size: 16px; color: var(--bf-navy); line-height: 1.5; font-weight: 500; }
  .ss-objectives { list-style: none; counter-reset: roman; margin: 0 0 28px; padding-left: 0; }
  .ss-objectives li { position: relative; padding-left: 38px; margin-bottom: 10px; font-size: 14.5px; color: var(--bf-ink); line-height: 1.55; counter-increment: roman; }
  .ss-objectives li::before { content: counter(roman, lower-roman) "."; position: absolute; left: 0; top: 0; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--bf-gold); font-weight: 500; width: 28px; text-align: right; padding-top: 3px; }
  .ss-methodo { font-family: 'DM Sans', sans-serif; font-size: 14.5px; color: var(--bf-ink); line-height: 1.65; margin-bottom: 32px; }
  .ss-results { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; background: var(--bf-navy); margin: 8px 0 18px; }
  .ss-kpi { padding: 24px 16px; text-align: center; border-right: 1px solid var(--bf-navy-soft); }
  .ss-kpi:last-child { border-right: none; }
  .ss-kpi-value { font-family: 'Playfair Display', serif; font-weight: 600; font-size: 26px; color: var(--bf-gold); line-height: 1; margin-bottom: 8px; }
  .ss-kpi-label { font-family: 'DM Sans', sans-serif; font-size: 11.5px; color: rgba(244, 241, 234, 0.85); line-height: 1.4; font-weight: 300; }
  .ss-results-extra { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: var(--bf-ink-soft); text-align: center; margin-top: 4px; margin-bottom: 28px; padding: 0 10px; }
  .ss-testimony { background: #FAF8F2; border: 1px solid var(--bf-paper-deep); border-left: 3px solid var(--bf-gold); padding: 22px 26px; margin: 24px 0 0; display: flex; gap: 20px; align-items: flex-start; }
  .ss-test-photo { flex-shrink: 0; width: 72px; height: 72px; border-radius: 50%; background: var(--bf-paper-deep); border: 1px solid var(--bf-gold); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; color: var(--bf-navy); font-size: 16px; font-style: italic; overflow: hidden; }
  .ss-test-body { flex: 1; min-width: 0; }
  .ss-test-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 16px; color: var(--bf-ink-soft); line-height: 1.55; margin-bottom: 14px; }
  .ss-test-author { font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--bf-navy); font-weight: 500; }
  .ss-test-author strong { font-weight: 600; }
  .ss-test-author span { color: var(--bf-ink-muted); font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 13px; margin-left: 6px; }
  .ss-tags { margin-top: 28px; padding-top: 22px; border-top: 1px solid var(--bf-paper-deep); font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--bf-ink-muted); line-height: 1.8; }
  .ss-tags .sep { color: var(--bf-gold); margin: 0 6px; }

  @media (max-width: 980px) {
    .ss-story { grid-template-columns: 1fr; }
    .ss-visual { min-height: auto; }
    .ss-title { font-size: 36px; }
    .ss-story-title { font-size: 26px; }
    .ss-stories, .ss-filters, .ss-mini-section, .ss-header { padding-left: 20px; padding-right: 20px; }
    .ss-results { grid-template-columns: 1fr; }
    .ss-kpi { border-right: none; border-bottom: 1px solid var(--bf-navy-soft); }
    .ss-kpi:last-child { border-bottom: none; }
    .ss-testimony { flex-direction: column; gap: 14px; }
    .ss-filter-label { min-width: auto; width: 100%; margin-bottom: 4px; }
    .ss-content { padding: 28px 22px; }
  }
`;

const SuccessStoriesPage = () => {
  const [thematique, setThematique] = useState<Thematique>("all");
  const [secteur, setSecteur] = useState<Secteur>("all");

  const matches = (s: Story) =>
    (thematique === "all" || s.thematique === thematique) &&
    (secteur === "all" || s.secteur === secteur);

  return (
    <div className="ss-page" style={{ minHeight: "100vh" }}>
      <style>{SuccessStoriesCSS}</style>
      <Navbar />

      <header className="ss-header">
        <div className="ss-eyebrow">— Pilier III · Insight & Resources / Success Stories</div>
        <h1 className="ss-title">
          Là où l'<em>intelligence</em>
          <br />
          change l'issue.
        </h1>
        <p className="ss-chapeau">
          Des missions, des contextes critiques, une méthode constante. Comprendre avant d'agir, agir sans bruit, mesurer ce qui change vraiment.
        </p>
      </header>

      {/* FILTRES */}
      <section className="ss-filters">
        <div className="ss-filter-row">
          <span className="ss-filter-label">— Par thématique</span>
          {THEMATIQUES.map((t) => (
            <button
              key={t.value}
              className={`ss-filter-btn${thematique === t.value ? " active-thema" : ""}`}
              onClick={() => setThematique(t.value)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="ss-filter-row">
          <span className="ss-filter-label">— Par secteur</span>
          {SECTEURS.map((s) => (
            <button
              key={s.value}
              className={`ss-filter-btn${secteur === s.value ? " active-secteur" : ""}`}
              onClick={() => setSecteur(s.value)}
              type="button"
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* MINI-GRILLE */}
      <section className="ss-mini-section">
        <div className="ss-mini-grid">
          {stories.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`ss-mini-card${matches(s) ? "" : " ss-hidden"}`}
            >
              <div>
                <span className="ss-mini-num">{s.num}.</span>
                <span className="ss-mini-thema">{s.thematiqueLabel}</span>
              </div>
              <div className="ss-mini-title">{s.miniTitle}</div>
              <div className="ss-mini-pitch">{s.miniPitch}</div>
              <div className="ss-mini-secteur-line">{s.miniSecteur}</div>
            </a>
          ))}
        </div>
      </section>

      {/* STORIES DÉTAILLÉES */}
      <main className="ss-stories">
        {stories.map((s) => (
          <article
            key={s.id}
            id={s.id}
            className={`ss-story${matches(s) ? "" : " ss-hidden"}`}
          >
            {/* LEFT */}
            <div className="ss-visual">
              <div className="ss-story-eyebrow">
                — Success Story · {s.num}
                <br />
                {s.eyebrow}
              </div>
              <div className="ss-logos">
                {s.logos.map((l, i) => (
                  <div key={i} className={`ss-logo${l.italic ? " italic" : ""}`}>
                    {l.label}
                  </div>
                ))}
              </div>
              <div className="ss-visual-main">{s.visualMain}</div>
              {s.resources && s.resources.length > 0 && (
                <div className="ss-resources">
                  <div className="ss-res-label">— Ressources liées</div>
                  {s.resources.map((r, i) => (
                    <a key={i} href="#" className="ss-res-link" onClick={(e) => e.preventDefault()}>
                      <span className="ss-res-type">{r.type}</span>
                      {r.text}
                    </a>
                  ))}
                </div>
              )}
              <div className="ss-meta">
                {s.meta.map((m, i) => (
                  <div key={i} className="ss-meta-line">
                    <strong>{m.label}</strong> {m.value}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="ss-content">
              <div className="ss-num">SUCCESS STORY · {s.num} / 11</div>
              <h2 className="ss-story-title">
                {s.titleBefore}
                <em>{s.titleEm}</em>
                {s.titleAfter}
              </h2>

              <div className="ss-section-label first">— Storytelling</div>
              <p className="ss-storytelling">{s.storytelling}</p>

              <div className="ss-section-label">— Mission</div>
              <div className="ss-mission">{s.mission}</div>

              <div className="ss-section-label">— Objectifs</div>
              <ol className="ss-objectives">
                {s.objectives.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ol>

              <div className="ss-section-label">— Méthodologie</div>
              <p className="ss-methodo">{s.methodo}</p>

              <div className="ss-section-label">— Résultats</div>
              <div className="ss-results">
                {s.kpis.map((k, i) => (
                  <div key={i} className="ss-kpi">
                    <div className="ss-kpi-value">{k.value}</div>
                    <div className="ss-kpi-label">{k.label}</div>
                  </div>
                ))}
              </div>
              {s.resultsExtra && <p className="ss-results-extra">{s.resultsExtra}</p>}

              {s.testimony && (
                <div className="ss-testimony">
                  <div className="ss-test-photo">{s.testimony.initials}</div>
                  <div className="ss-test-body">
                    <p className="ss-test-text">{s.testimony.text}</p>
                    <div className="ss-test-author">
                      <strong>{s.testimony.authorBold}</strong>
                      {s.testimony.authorRest}
                      {s.testimony.date && <span>{s.testimony.date}</span>}
                    </div>
                  </div>
                </div>
              )}

              <div className="ss-tags">
                {s.tags.map((tag, i) => (
                  <span key={i}>
                    {tag}
                    {i < s.tags.length - 1 && <span className="sep">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </main>

      <CTAFooter />
    </div>
  );
};

export default SuccessStoriesPage;
