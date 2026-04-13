import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import buildfluenceLogo from "@/assets/Logo_Buildfluence_dark.png";
import buildfluenceLogoFondBleu from "@/assets/reseau_fond_bleu.png";
import logoFondBlancSP from "@/assets/logo-buildfluence-fond-blanc-sp.png";
import amdieLogo from "@/assets/clients/amdie.png";
import miceppLogo from "@/assets/clients/micepp.png";
import growthLabLogo from "@/assets/clients/growthlab2.png";
import statistaLogo from "@/assets/clients/statista.png";
import itcLogo from "@/assets/clients/itc.png";
import worldBankLogo from "@/assets/clients/worldbank.png";
import afdLogo from "@/assets/clients/afd.png";
import badLogo from "@/assets/clients/bad2.png";
import berdLogo from "@/assets/clients/berd.png";
import moroccoNowLogo from "@/assets/clients/morocco-now2.png";
import beiLogo from "@/assets/clients/bei.png";
import gizLogo from "@/assets/clients/giz.png";
import isdbLogo from "@/assets/clients/isdb.png";
import jicaLogo from "@/assets/clients/jica.png";
import pnudLogo from "@/assets/clients/pnud.png";
import harvardLogo from "@/assets/clients/harvard.png";
import euSanctionsLogo from "@/assets/clients/eu-sanctions.png";
import pitchbookLogo from "@/assets/clients/pitchbook.png";
import icijLogo from "@/assets/clients/icij.png";
import cbondsLogo from "@/assets/clients/cbonds.png";
import lawSocietyLogo from "@/assets/clients/law-society.png";
import usDojLogo from "@/assets/clients/us-doj.png";
import gafiLogo from "@/assets/clients/gafi.png";
import dunBradstreetLogo from "@/assets/clients/dun-bradstreet.png";
import ofacLogo from "@/assets/clients/ofac.png";
import fdiLogo from "@/assets/clients/fdi.png";
import harvard2Logo from "@/assets/clients/harvard2.png";
import pnud2Logo from "@/assets/clients/pnud2.png";
import cgemLogo from "@/assets/clients/cgem.png";
import asmexLogo from "@/assets/clients/asmex.png";
import amicaLogo from "@/assets/clients/amica.png";
import amipLogo from "@/assets/clients/amip.png";
import amithLogo from "@/assets/clients/amith.png";
import cntLogo from "@/assets/clients/cnt.png";
import fenagriLogo from "@/assets/clients/fenagri.png";
import investHKLogo from "@/assets/clients/investhk.png";
import edbSingaporeLogo from "@/assets/clients/edb-singapore.png";
import carteCompetitivite from "@/assets/carte-competitivite.png";
import apexbrasilLogo from "@/assets/clients/apexbrasil.png";
import investLithuaniaLogo from "@/assets/clients/invest-lithuania.png";
import investMexicoLogo from "@/assets/clients/invest-mexico.png";
import investVietnamLogo from "@/assets/clients/invest-vietnam.png";
import investChileLogo from "@/assets/clients/investchile.png";
import investSALogo from "@/assets/clients/investsa.png";
import czechInvestLogo from "@/assets/clients/czech-invest.png";

type BlockId = "veille" | "duediligence" | "bi" | "humint" | "core" | "amdie" | "gouv" | "federations" | "api" | "pays" | "pays_concurrent" | "cooperation" | "medias" | null;
type CountryId = string | null;

interface DetailData {
  title: string;
  columns: { heading: string; items: { text: string; color?: string }[] }[];
  image?: string;
}

// ── Country data for Pays Clés ──
interface CountryData {
  flag: string;
  name: string;
  nameFr: string;
  category: string;
  sectors: string;
  description: string;
  opportunities: string[];
}

const keyCountries: CountryData[] = [
  { flag: "🇫🇷", name: "France", nameFr: "France", category: "Pays Clé", sectors: "Automobile, Aéronautique, Énergie, Agro", description: "Premier partenaire commercial et investisseur historique du Maroc. Relation stratégique consolidée par des accords bilatéraux structurants.", opportunities: ["Cartographie des décideurs français influençant les flux d'IDE vers le Maroc","Veille des narratifs médiatiques sur l'attractivité du Maroc en France","Intelligence sur les fédérations patronales (MEDEF, AFEP) et leurs positions","Suivi des décisions politiques impactant les accords commerciaux Maroc-France","Identification des opportunités d'influence dans les médias économiques français"] },
  { flag: "🇩🇪", name: "Germany", nameFr: "Allemagne", category: "Pays Clé", sectors: "Industrie automobile, Chimie, Énergie verte", description: "Deuxième partenaire européen du Maroc. Forte présence industrielle et intérêt croissant pour les énergies renouvelables marocaines.", opportunities: ["Veille sur les flux IDE allemands vers l'Afrique du Nord et position du Maroc","Cartographie des grands groupes industriels (BMW, Siemens, BASF) présents ou ciblés","Suivi des positions de la Chambre de commerce germano-marocaine","Intelligence sur les programmes GIZ actifs au Maroc","Identification des influenceurs économiques allemands sur le dossier Maroc"] },
  { flag: "🇺🇸", name: "USA", nameFr: "États-Unis", category: "Pays Clé", sectors: "Tech, Finance, Défense, Agro-industrie", description: "Allié stratégique du Maroc avec un accord de libre-échange unique en Afrique. Partenariat de défense et coopération technologique croissante.", opportunities: ["Veille sur l'Accord de Libre-Échange Maroc-USA et son évolution","Cartographie des think tanks et lobbies influençant la politique US au Maghreb","Suivi des positions des grandes agences (USAID, MCC, DFC) sur le Maroc","Intelligence sur les décideurs du Congrès US sur les dossiers Maroc-Sahara","Identification des opportunités d'influence dans les médias économiques américains"] },
  { flag: "🇬🇧", name: "United Kingdom", nameFr: "Royaume-Uni", category: "Pays Clé", sectors: "Finance, Services, Énergie, Agroalimentaire", description: "Partenaire historique avec un accord commercial post-Brexit. Le Maroc se positionne comme hub d'entrée vers l'Afrique pour les entreprises britanniques.", opportunities: ["Veille post-Brexit sur les opportunités commerciales Maroc-UK","Cartographie des fonds d'investissement britanniques actifs en Afrique","Suivi des accords de partenariat UK-Maroc en cours de négociation","Intelligence sur les décideurs du FCDO influençant la politique UK-Maroc","Identification des opportunités médiatiques dans la presse économique britannique"] },
  { flag: "🇯🇵", name: "Japan", nameFr: "Japon", category: "Pays Clé", sectors: "Automobile, Robotique, Énergie, Chimie", description: "Partenaire technologique de premier plan. La coopération JICA finance des projets d'infrastructure majeurs. Intérêt croissant pour les phosphates et l'énergie verte.", opportunities: ["Veille sur les stratégies d'investissement JICA et JETRO au Maroc","Cartographie des groupes industriels japonais (Toyota, Sumitomo) présents au Maroc","Intelligence sur les positions japonaises sur l'accès aux matières premières africaines","Suivi des opportunités dans le cadre de la diplomatie économique japonaise en Afrique","Identification des influenceurs japonais sur le positionnement Maroc comme hub africain"] },
  { flag: "🇨🇳", name: "China", nameFr: "Chine", category: "Pays Clé", sectors: "Infrastructure, Digital, Énergie, Industrie", description: "Investisseur massif en infrastructure africaine. La Chine développe une présence industrielle et diplomatique croissante au Maroc dans le cadre de la Route de la Soie.", opportunities: ["Veille sur les investissements chinois (Belt & Road) au Maroc et en Afrique du Nord","Due Diligence des partenaires et entreprises chinoises actives au Maroc","Cartographie des acteurs de l'influence chinoise (médias, think tanks, ambassade)","Intelligence sur les narratifs géopolitiques chinois sur la question du Sahara","Suivi des flux IDE chinois et identification des opportunités et risques pour le Maroc"] },
  { flag: "🇧🇪", name: "Belgium", nameFr: "Belgique", category: "Pays Clé", sectors: "Logistique, Pharmaceutique, Finance, Agroalimentaire", description: "Porte d'entrée vers les institutions européennes. Forte diaspora marocaine. Hub logistique et financier européen clé pour les exportateurs marocains.", opportunities: ["Veille sur les décisions européennes (UE, Parlement) impactant le Maroc via Bruxelles","Cartographie des institutions européennes influençant les relations Maroc-UE","Intelligence sur les lobbies et ONG actifs à Bruxelles sur les dossiers marocains","Identification des décideurs belgo-européens favorables au partenariat Maroc-UE","Suivi des narratifs médiatiques belges sur l'attractivité du Maroc"] },
  { flag: "🇳🇱", name: "Netherlands", nameFr: "Pays-Bas", category: "Pays Clé", sectors: "Logistique, Agro-industrie, Technologie, Finance", description: "Hub logistique européen via Rotterdam. Forte tradition d'investissement à l'international. Intérêt pour les exportations agricoles et la logistique marocaine.", opportunities: ["Veille sur les flux commerciaux et logistiques via le port de Rotterdam","Cartographie des fonds d'investissement néerlandais actifs en Afrique","Intelligence sur les entreprises néerlandaises (Shell, Philips, ASML) ciblées pour le Maroc","Suivi des décisions de la Chambre de commerce NL-Maroc","Identification des opportunités d'influence dans les médias économiques néerlandais"] },
  { flag: "🇪🇸", name: "Spain", nameFr: "Espagne", category: "Pays Clé", sectors: "Tourisme, Énergie, Agroalimentaire, BTP", description: "Voisin géographique et premier partenaire commercial de proximité. Relations complexes mais complémentaires. Porte d'entrée naturelle vers l'Europe pour les exportations marocaines.", opportunities: ["Veille sur les tensions et opportunités de la relation bilatérale Maroc-Espagne","Cartographie des groupes espagnols (Inditex, Iberdrola, Telefónica) présents au Maroc","Intelligence sur les positions espagnoles sur le Sahara Marocain","Suivi des narratifs médiatiques espagnols sur le Maroc et les flux migratoires","Identification des influenceurs économiques et politiques espagnols pro-Maroc"] },
  { flag: "🇰🇷", name: "South Korea", nameFr: "Corée du Sud", category: "Pays Clé", sectors: "Automobile, Électronique, Énergie, Chimie", description: "Puissance industrielle et technologique en forte croissance internationale. Intérêt stratégique pour les matières premières marocaines (phosphates, cobalt) et les zones industrielles.", opportunities: ["Veille sur les stratégies d'investissement coréennes en Afrique du Nord","Cartographie des Chaebols (Samsung, Hyundai, LG, POSCO) ciblés pour le Maroc","Intelligence sur les accords de coopération Corée-Maroc","Suivi des opportunités dans le cadre de la stratégie coréenne \"K-Africa\"","Identification des décideurs coréens influençant les investissements au Maroc"] },
];

// ── Country data for Pays Concurrents ──
interface CompetitorData {
  flag: string;
  name: string;
  nameFr: string;
  sectors: string;
  description: string;
  score: number;
}

const competitorCountries: CompetitorData[] = [
  { flag: "🇧🇬", name: "Bulgaria", nameFr: "Bulgarie", sectors: "Automobile, Textile, IT", description: "Membre UE à bas coûts, attractif pour les délocalisations européennes.", score: 4 },
  { flag: "🇪🇬", name: "Egypt", nameFr: "Égypte", sectors: "Textile, Agroalimentaire, Énergie", description: "Grand marché intérieur et position stratégique sur le canal de Suez.", score: 6 },
  { flag: "🇨🇱", name: "Chile", nameFr: "Chili", sectors: "Mines, Énergie verte, Agroalimentaire", description: "Leader sud-américain en stabilité économique et accords de libre-échange.", score: 5 },
  { flag: "🇭🇺", name: "Hungary", nameFr: "Hongrie", sectors: "Automobile, Électronique, Pharma", description: "Hub manufacturier européen avec forte présence d'IDE asiatiques.", score: 5 },
  { flag: "🇰🇪", name: "Kenya", nameFr: "Kenya", sectors: "Tech, Agro, Services financiers", description: "Hub technologique et financier de l'Afrique de l'Est.", score: 4 },
  { flag: "🇱🇹", name: "Lithuania", nameFr: "Lituanie", sectors: "Fintech, IT, Logistique", description: "Centre fintech émergent de l'UE avec une main-d'œuvre qualifiée.", score: 4 },
  { flag: "🇲🇽", name: "Mexico", nameFr: "Mexique", sectors: "Automobile, Aéro, Agroalimentaire", description: "Accès privilégié au marché nord-américain via l'USMCA.", score: 7 },
  { flag: "🇵🇱", name: "Poland", nameFr: "Pologne", sectors: "Automobile, IT, BPO", description: "Plus grande économie d'Europe centrale, forte croissance des IDE.", score: 6 },
  { flag: "🇷🇼", name: "Rwanda", nameFr: "Rwanda", sectors: "Tech, Tourisme, Services", description: "Modèle de gouvernance africain, attractif pour les startups.", score: 3 },
  { flag: "🇨🇿", name: "Czech Republic", nameFr: "République Tchèque", sectors: "Automobile, Industrie, R&D", description: "Base industrielle mature au cœur de l'Europe.", score: 6 },
  { flag: "🇸🇳", name: "Senegal", nameFr: "Sénégal", sectors: "Agro, Pêche, Énergie", description: "Porte d'entrée de l'Afrique de l'Ouest francophone.", score: 4 },
  { flag: "🇸🇰", name: "Slovakia", nameFr: "Slovaquie", sectors: "Automobile, Électronique", description: "Premier producteur mondial de voitures par habitant.", score: 5 },
  { flag: "🇹🇭", name: "Thailand", nameFr: "Thaïlande", sectors: "Automobile, Électronique, Tourisme", description: "Hub manufacturier de l'ASEAN avec infrastructure développée.", score: 6 },
  { flag: "🇹🇳", name: "Tunisia", nameFr: "Tunisie", sectors: "Textile, Aéro, IT, Automobile", description: "Concurrent direct du Maroc sur les marchés européens.", score: 7 },
  { flag: "🇹🇷", name: "Turkey", nameFr: "Turquie", sectors: "Automobile, Textile, BTP, Défense", description: "Puissance industrielle régionale avec accès aux marchés UE et Moyen-Orient.", score: 8 },
  { flag: "🇻🇳", name: "Vietnam", nameFr: "Vietnam", sectors: "Textile, Électronique, Agro", description: "Destination privilégiée des délocalisations depuis la Chine.", score: 7 },
  { flag: "🇿🇦", name: "South Africa", nameFr: "Afrique du Sud", sectors: "Mines, Finance, Automobile", description: "Première économie industrialisée d'Afrique.", score: 6 },
  { flag: "🇮🇳", name: "India", nameFr: "Inde", sectors: "IT, Pharma, Automobile, Textile", description: "Géant démographique et technologique en forte croissance.", score: 8 },
];

const RayonnementMechanism = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<BlockId>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryId>(null);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [showCompetitivityMap, setShowCompetitivityMap] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const competitorSectionRef = useRef<HTMLDivElement>(null);
  const hasAutoShownMap = useRef(false);

  // Auto-display competitivity map on scroll into view
  useEffect(() => {
    const el = competitorSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoShownMap.current) {
          hasAutoShownMap.current = true;
          setActive(null);
          setSelectedCountry(null);
          setSelectedCompetitor(null);
          setShowCompetitivityMap(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = (id: BlockId) => {
    setSelectedCountry(null);
    setSelectedCompetitor(null);
    setShowCompetitivityMap(false);
    setActive(prev => prev === id ? null : id);
  };

  useEffect(() => {
    if ((active || selectedCountry || selectedCompetitor || showCompetitivityMap) && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [active, selectedCountry, selectedCompetitor, showCompetitivityMap]);

  const details: Record<string, DetailData> = {
    veille: {
      title: t("Veille & Intelligence Stratégique", "Strategic Watch & Intelligence"),
      columns: [
        { heading: t("6 Dimensions", "6 Dimensions"), items: [
          { text: t("Web, médias, réseaux sociaux", "Web, media, social networks") },
          { text: t("Bases sectorielles & brevets", "Sector databases & patents") },
          { text: t("Dark web & deep web", "Dark web & deep web") },
          { text: t("Organisations & personnes clés", "Organizations & key people") },
          { text: t("Concepts macroéconomiques", "Macroeconomic concepts") },
          { text: t("Événements & produits", "Events & products") },
        ]},
        { heading: t("Traitement", "Processing"), items: [
          { text: t("NLP & analyse sémantique", "NLP & semantic analysis") },
          { text: t("Scoring de criticité", "Criticality scoring") },
          { text: t("Signaux faibles détectés", "Weak signals detected") },
          { text: t("Formation, Accompagnement & Change Management", "Training, Support & Change Management") },
        ]},
        { heading: t("Livrables", "Deliverables"), items: [
          { text: t("Rapports de veille", "Watch reports") },
          { text: t("Alertes temps réel", "Real-time alerts") },
          { text: t("Dashboards interactifs", "Interactive dashboards") },
        ]},
      ],
    },
    duediligence: {
      title: "Deep Due Diligence",
      columns: [
        { heading: "Integrity Check", items: [
          { text: t("Vérification identitaire", "Identity verification") },
          { text: t("Screening sanctions", "Sanctions screening") },
          { text: t("Réputation initiale", "Initial reputation") },
        ]},
        { heading: "Strategic Risk Profiling", items: [
          { text: t("Structure capitalistique", "Capital structure") },
          { text: t("Litiges & contentieux", "Litigation & disputes") },
          { text: t("Réseau d'influence", "Influence network") },
        ]},
        { heading: "Regulatory Compliance", items: [
          { text: t("Investigation terrain", "Field investigation") },
          { text: t("Sources humaines", "Human sources") },
          { text: t("Rapport confidentiel", "Confidential report") },
        ]},
      ],
    },
    bi: {
      title: t("Business Intelligence", "Business Intelligence"),
      columns: [
        { heading: t("Analyse économique", "Economic Analysis"), items: [
          { text: t("Flux d'investissement", "Investment flows") },
          { text: t("Dynamiques sectorielles", "Sector dynamics") },
          { text: t("Benchmark concurrentiel", "Competitive benchmark") },
        ]},
        { heading: t("Plateformes Premium", "Premium Platforms"), items: [
          { text: "Growth Lab, Statista" },
          { text: "fDi Intelligence" },
          { text: t("Factiva : Agrégateur de presse", "Factiva: Press aggregator") },
          { text: "World Bank, Harvard Kennedy" },
          { text: t("Croisement de sources", "Source cross-referencing") },
          { text: t("Positionnement & compétitivité Maroc", "Morocco positioning & competitiveness") },
        ]},
        { heading: t("Livrables", "Deliverables"), items: [
          { text: t("Études sectorielles", "Sector studies") },
          { text: t("Cartographies de marché", "Market mappings") },
          { text: t("Rapports d'attractivité", "Attractiveness reports") },
        ]},
      ],
    },
    humint: {
      title: t("HumInt : Intelligence Humaine", "HumInt: Human Intelligence"),
      columns: [
        { heading: t("Réseau d'Experts", "Expert Network"), items: [
          { text: t("Analystes terrain", "Field analysts") },
          { text: t("Réseau de journalistes spécialistes", "Network of specialist journalists") },
          { text: t("Sources primaires qualifiées", "Qualified primary sources") },
        ]},
        { heading: t("Valeur ajoutée", "Added Value"), items: [
          { text: t("Contexte non-digitalisé", "Non-digitized context") },
          { text: t("Vérification de terrain", "Field verification") },
          { text: t("Signaux invisibles", "Invisible signals") },
        ]},
        { heading: t("Intégration", "Integration"), items: [
          { text: t("Croisement avec OSINT", "Cross-referencing with OSINT") },
          { text: t("Validation des hypothèses", "Hypothesis validation") },
          { text: t("Enrichissement décisionnel", "Decision enrichment") },
        ]},
      ],
    },
    core: {
      title: t("Infrastructure Décisionnelle Buildfluence", "Buildfluence Decision Infrastructure"),
      columns: [
        { heading: t("Captation", "Capture"), items: [
          { text: t("Croisement OSINT + HumInt + BI", "OSINT + HumInt + BI cross-referencing") },
          { text: t("IA augmentée en continu", "Continuously augmented AI") },
        ]},
        { heading: t("Transformation", "Transformation"), items: [
          { text: t("Scoring Go / Vigilance / No-Go", "Go / Caution / No-Go scoring") },
          { text: t("Dashboards & DataViz actionnables", "Actionable dashboards & DataViz") },
        ]},
        { heading: t("Diffusion", "Distribution"), items: [
          { text: t("Publications stratégiques", "Strategic publications") },
          { text: t("Rayonnement & influence", "Outreach & influence") },
          { text: "Doing Business Platform" },
        ]},
      ],
    },
    amdie: {
      title: "AMDIE / MICEPP",
      columns: [
        { heading: t("Mission & Objectifs", "Mission & Objectives"), items: [
          { text: t("Mission : Développement des investissements et des exportations des produits et services au Maroc", "Mission: Development of investments and exports of products and services in Morocco") },
          { text: t("Charte de l'investissement : édition 2023", "Investment Charter: 2023 edition") },
          { text: t("Objectifs stratégiques 2026 :", "Strategic objectives 2026:") },
          { text: t("   • 550 MMDH d'investissements", "   • 550 BMDH in investments") },
          { text: t("   • 500 000 créations d'emploi", "   • 500,000 job creation") },
          { text: t("Morocco Now : Site d'Attractivité & Nation Branding", "Morocco Now: Attractiveness Site & Nation Branding") },
        ]},
        { heading: t("Solutions Buildfluence", "Buildfluence Solutions"), items: [
          { text: t("Newsletter stratégique dédiée", "Dedicated strategic newsletter") },
          { text: t("Création d'un Observatoire d'Investissement (proposé le 13.08.2017)", "Creation of an Investment Observatory (proposed 13.08.2017)") },
          { text: t("Focus sur les ONG activistes qui déstabilisent les entreprises étrangères dans le Sahara Marocain", "Focus on activist NGOs destabilizing foreign companies in Moroccan Sahara") },
          { text: t("Informations fraiches pour les exportateurs Marocains", "Fresh information for Moroccan exporters") },
          { text: t("Rayonnement sectoriel complet", "Complete sector outreach") },
        ]},
      ],
    },
    gouv: {
      title: t("Gouvernement Marocain", "Moroccan Government"),
      columns: [
        { heading: t("Périmètre", "Scope"), items: [
          { text: t("Agences d'État", "State agencies") },
          { text: t("Instances publiques", "Public bodies") },
          { text: t("CRI — Centres Régionaux", "CRI — Regional Centers") },
        ]},
        { heading: t("Solutions Buildfluence", "Buildfluence Solutions"), items: [
          { text: t("Pilotage avec longueur d'avance", "Steering with strategic head start") },
          { text: t("Anticipation réglementaire", "Regulatory anticipation") },
          { text: t("Intelligence territoriale", "Territorial intelligence") },
          { text: t("Veille compétitivité régionale", "Regional competitiveness monitoring") },
        ]},
        { heading: t("Résultats prouvés", "Proven results"), items: [
          { text: "Doing Business Platform" },
          { text: t("Compétitivité régionale", "Regional competitiveness") },
          { text: t("Attractivité accrue", "Increased attractiveness") },
        ]},
      ],
    },
    federations: {
      title: t("Fédérations Sectorielles", "Sector Federations"),
      columns: [
        { heading: t("Membres", "Members"), items: [
          { text: "CGEM" }, { text: "ASMEX" }, { text: "FENAGRI, AMIT" }, { text: "UNICOP, AMICA" },
        ]},
        { heading: t("Rôle", "Role"), items: [
          { text: t("Partenaires stratégiques", "Strategic partners") },
          { text: t("Entreprises membres", "Member companies") },
          { text: t("Fédérations professionnelles", "Professional federations") },
        ]},
        { heading: t("Synergie", "Synergy"), items: [
          { text: t("Intelligence sectorielle partagée", "Shared sector intelligence") },
          { text: t("Benchmark concurrentiel", "Competitive benchmark") },
          { text: t("Co-production de rapports", "Report co-production") },
        ]},
      ],
    },
    api: {
      title: t("Agences de Promotion des Investissements", "Investment Promotion Agencies"),
      columns: [
        { heading: t("Mission", "Mission"), items: [
          { text: t("Attractivité des IDE", "FDI attractiveness") },
          { text: t("Observatoire de l'investissement", "Investment observatory") },
          { text: t("Promotion internationale", "International promotion") },
        ]},
        { heading: t("Outils", "Tools"), items: [
          { text: t("Baromètre d'attractivité", "Attractiveness barometer") },
          { text: t("Études pays cibles", "Target country studies") },
          { text: t("Cartographie des flux", "Flow mapping") },
        ]},
        { heading: t("Résultat", "Result"), items: [
          { text: t("Accélération IDE", "FDI acceleration") },
          { text: t("Positionnement concurrentiel", "Competitive positioning") },
          { text: t("Visibilité internationale", "International visibility") },
        ]},
      ],
    },
    cooperation: {
      title: t("Coopération Internationale", "International Cooperation"),
      columns: [
        { heading: t("Financeurs bilatéraux", "Bilateral funders"), items: [
          { text: "GIZ" }, { text: "AFD" }, { text: "JICA" }, { text: "USAID" },
        ]},
        { heading: t("Institutions multilatérales", "Multilateral institutions"), items: [
          { text: "BEI" }, { text: "PNUD" }, { text: "Banque Mondiale" }, { text: "BERD" },
        ]},
        { heading: t("Islamique & autres", "Islamic & others"), items: [
          { text: "IsDB" },
          { text: t("Fonds souverains", "Sovereign funds") },
          { text: t("Programmes régionaux", "Regional programs") },
        ]},
      ],
    },
    medias: {
      title: t("Médias & Prescripteurs", "Media & Prescribers"),
      columns: [
        { heading: t("Cibles", "Targets"), items: [
          { text: t("Leaders d'opinion", "Opinion leaders") },
          { text: t("Diaspora qualifiée", "Qualified diaspora") },
          { text: t("Journalistes spécialisés", "Specialized journalists") },
        ]},
        { heading: t("Stratégie", "Strategy"), items: [
          { text: t("Source d'autorité", "Authority source") },
          { text: t("Contenus exclusifs", "Exclusive content") },
          { text: t("Prises de parole ciblées", "Targeted speeches") },
        ]},
        { heading: t("Impact", "Impact"), items: [
          { text: t("Maîtrise du narratif", "Narrative control") },
          { text: t("Crédibilité renforcée", "Enhanced credibility") },
          { text: t("Présence médiatique constante", "Constant media presence") },
        ]},
      ],
    },
  };

  const ddLogos = [
    { src: euSanctionsLogo, alt: "EU Sanctions Map" },
    { src: pitchbookLogo, alt: "PitchBook" },
    { src: icijLogo, alt: "ICIJ" },
    { src: cbondsLogo, alt: "Cbonds" },
    { src: ofacLogo, alt: "OFAC" },
    { src: lawSocietyLogo, alt: "The Law Society" },
    { src: usDojLogo, alt: "US Dept. of Justice" },
    { src: gafiLogo, alt: "GAFI" },
    { src: dunBradstreetLogo, alt: "Dun & Bradstreet" },
  ];

  const sourceBlocks = [
    {
      id: "veille" as BlockId, icon: "🔭", color: "#103E8C",
      label: t("Veille & Intelligence Stratégique", "Strategic Watch & Intelligence"),
      desc: t("Captation en temps réel des signaux faibles sectoriels, économiques et géopolitiques. Croisement multi-sources pour anticiper les ruptures et détecter les dynamiques invisibles aux approches classiques.\n\nLe moteur d'intelligence opère dans 6 espaces et extrait les interactions informationnelles", "Real-time capture of sector, economic and geopolitical weak signals. Multi-source cross-referencing to anticipate disruptions and detect dynamics invisible to classical approaches.\n\nThe intelligence engine operates in 6 spaces and extracts informational interactions"),
      tags: [t("Organisations", "Organizations"), t("Lieux", "Places"), t("Personnes clés", "Key people"), t("Concepts macro", "Macro concepts"), t("Produits", "Products"), t("Événements", "Events")],
    },
    {
      id: "duediligence" as BlockId, icon: "🔍", color: "#1a5580",
      label: "Deep Due Diligence",
      desc: t("Sécuriser la décision dans des environnements incertains. Analyse approfondie des acteurs, réseaux d'influence et risques réputationnels. Identification des zones de fragilité et des leviers cachés avant toute prise de position stratégique.", "Securing decisions in uncertain environments. In-depth analysis of actors, influence networks and reputational risks. Identification of fragility zones and hidden levers before any strategic positioning."),
      tags: [],
      ddLogos: ddLogos,
    },
    {
      id: "bi" as BlockId, icon: "📊", color: "#1a6b5a",
      label: t("Business Intelligence", "Business Intelligence"),
      desc: t("Lire la compétition avant qu'elle ne s'impose. Décryptage des stratégies pays, secteurs et concurrents. Identification des axes de différenciation et des opportunités de positionnement à fort levier d'attractivité.", "Reading competition before it takes hold. Decryption of country, sector and competitor strategies. Identification of differentiation axes and positioning opportunities with high attractiveness leverage."),
      tags: [],
      logos: [
        { src: growthLabLogo, alt: "Growth Lab" },
        { src: statistaLogo, alt: "Statista" },
        { src: itcLogo, alt: "ITC" },
        { src: worldBankLogo, alt: "World Bank" },
        { src: fdiLogo, alt: "fDi Intelligence" },
        { src: harvard2Logo, alt: "Harvard Kennedy School" },
        { src: pnud2Logo, alt: "PNUD" },
      ],
    },
    {
      id: "humint" as BlockId, icon: "🧠", color: "#c0392b",
      label: t("HumInt : Intelligence Humaine", "HumInt: Human Intelligence"),
      desc: t("Activation de réseaux qualifiés pour comprendre les intentions réelles des décideurs. Apport de contexte, lecture fine des rapports de force et validation terrain des analyses.", "Activation of qualified networks to understand the real intentions of decision-makers. Context input, fine reading of power dynamics and field validation of analyses."),
      tags: [t("Analystes terrain", "Field analysts"), t("Réseau diplomatique", "Diplomatic network"), t("Sources primaires", "Primary sources")],
      isHumint: true,
    },
  ];

  const federationLogos = [
    { src: cgemLogo, alt: "CGEM" },
    { src: asmexLogo, alt: "ASMEX" },
    { src: amicaLogo, alt: "AMICA" },
    { src: amipLogo, alt: "AMIP" },
    { src: amithLogo, alt: "AMITH" },
    { src: cntLogo, alt: "CNT" },
    { src: fenagriLogo, alt: "FENAGRI" },
  ];

  const apiLogos = [
    { src: investHKLogo, alt: "InvestHK" },
    { src: edbSingaporeLogo, alt: "EDB Singapore" },
    { src: apexbrasilLogo, alt: "ApexBrasil" },
    { src: investLithuaniaLogo, alt: "Invest Lithuania" },
    { src: investMexicoLogo, alt: "Invest Mexico" },
    { src: investVietnamLogo, alt: "Invest Vietnam" },
    { src: investChileLogo, alt: "InvestChile" },
    { src: investSALogo, alt: "InvestSA" },
    { src: czechInvestLogo, alt: "CzechInvest" },
  ];

  const destBlocks = [
    {
      id: "amdie" as BlockId, title: "",
      sub: "",
      desc: t("Mission : Développement des investissements et des exportations des produits et services au Maroc.", "Mission: Development of investments and exports of products and services in Morocco."),
      descDetails: [
        t("Charte de l'investissement : édition en 2023", "Investment charter: 2023 edition"),
        t("Objectifs Stratégiques 2026 :", "Strategic Objectives 2026:"),
        t("   550 MMDH d'investissements", "   550 BMDH in investments"),
        t("   500 000 création d'emploi", "   500,000 job creation"),
      ],
      logos: [amdieLogo, miceppLogo],
      logoSubtitle: t("Agence de l'investissement & Ministère de tutelle", "Investment Agency & Supervisory Ministry"),
      moroccoNowLogo: moroccoNowLogo,
    },
    {
      id: "gouv" as BlockId, icon: "🇲🇦", title: t("Gouvernement Marocain", "Moroccan Government"),
      sub: t("Agences d'État & Instances publiques & CRI", "State Agencies & Public Bodies & CRI"),
      desc: t("Pilotage des politiques publiques avec une longueur d'avance stratégique. Centres Régionaux de l'Investissement.", "Steering public policies with a strategic head start. Regional Investment Centers."),
    },
    {
      id: "pays" as BlockId, icon: "🗺", title: t("Pays Clés", "Key Countries"),
      sub: t("Partenariats solides & innovants", "Solid & innovative partnerships"),
      desc: "", flags: keyCountries.map(c => ({ flag: c.flag, name: c.nameFr })),
    },
    {
      id: "pays_concurrent" as BlockId, icon: "⚡", title: t("Pays Concurrents", "Competitor Countries"),
      sub: t("18 pays en compétition avec le Maroc sur 9 secteurs prioritaires", "18 countries competing with Morocco on 9 priority sectors"),
      desc: "", competitorFlags: competitorCountries.map(c => ({ flag: c.flag, name: c.nameFr })),
    },
    {
      id: "federations" as BlockId, icon: "🤝", title: t("Fédérations Sectorielles", "Sector Federations"),
      sub: t("Partenaires & Entreprises stratégiques", "Partners & Strategic Companies"),
      desc: "",
      federationLogos: federationLogos,
    },
    {
      id: "api" as BlockId, icon: "🌐", title: t("Agences de Promotion des Investissements", "Investment Promotion Agencies"),
      sub: t("IDE & Attractivité internationale", "FDI & International Attractiveness"),
      desc: "",
      apiLogos: apiLogos,
    },
    {
      id: "cooperation" as BlockId, icon: "🌍", title: t("Coopération Internationale", "International Cooperation"),
      sub: t("Financeurs de projets & missions", "Project funders & missions"),
      desc: "",
      cooperationLogos: [
        { src: gizLogo, alt: "GIZ" },
        { src: afdLogo, alt: "AFD" },
        { src: jicaLogo, alt: "JICA" },
        { src: beiLogo, alt: "BEI" },
        { src: pnudLogo, alt: "PNUD" },
        { src: worldBankLogo, alt: "Banque Mondiale" },
        { src: berdLogo, alt: "BERD" },
        { src: isdbLogo, alt: "IsDB" },
        { src: badLogo, alt: "BAD" },
      ],
    },
    {
      id: "medias" as BlockId, icon: "📡", title: t("Médias & Prescripteurs", "Media & Prescribers"),
      sub: t("Leaders d'Opinion · Diaspora · Journalistes", "Opinion Leaders · Diaspora · Journalists"),
      desc: t("Positionnement comme source d'autorité dans les espaces informationnels clés.", "Positioning as an authority source in key information spaces."),
    },
  ];

  const outputItems = [
    t("Voir ce que les autres ne voient pas.", "See what others don't see."),
    t("Décider avec un temps d'avance.", "Decide with a head start."),
    t("Neutraliser les risques invisibles.", "Neutralize invisible risks."),
    t("Identifier les vrais leviers d'attractivité.", "Identify the real levers of attractiveness."),
    t("Transformer la visibilité en influence réelle.", "Transform visibility into real influence."),
  ];

  const activeDetail = active && details[active] ? details[active] : null;

  // Check if we should show a country detail or competitor detail instead
  const showCountryDetail = selectedCountry !== null;
  const countryData = showCountryDetail ? keyCountries.find(c => c.flag === selectedCountry) : null;
  const showCompetitorDetail = selectedCompetitor !== null;
  const competitorData = showCompetitorDetail ? competitorCountries.find(c => c.flag === selectedCompetitor) : null;

  const handleCountryClick = (flag: string) => {
    setActive(null);
    setSelectedCompetitor(null);
    setShowCompetitivityMap(false);
    setSelectedCountry(prev => prev === flag ? null : flag);
  };

  const handleCompetitorClick = (flag: string) => {
    setActive(null);
    setSelectedCountry(null);
    setShowCompetitivityMap(false);
    setSelectedCompetitor(prev => prev === flag ? null : flag);
  };

  const handleCompetitorTitleClick = () => {
    setActive(null);
    setSelectedCountry(null);
    setSelectedCompetitor(null);
    setShowCompetitivityMap(prev => !prev);
  };

  const hasActivePanel = activeDetail || showCountryDetail || showCompetitorDetail || showCompetitivityMap;

  return (
    <section className="py-8" style={{ background: '#F8FAFC', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
      {/* Hero */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-2">
          {t("Mécanisme de ", "Mechanism of ")}<span className="text-[#C9A84C]">{t("Rayonnement & d'Attractivité", "Outreach & Attractiveness")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-1">{t("De la captation de la donnée à l'influence", "From data capture to influence")}</p>
        {/* Gold subtitle removed per request */}
        <div className="max-w-3xl mx-auto border-l-[3px] border-[#C9A84C] bg-[rgba(201,168,76,0.06)] rounded-r-lg p-4 text-left text-sm italic text-foreground/70 leading-relaxed">
          {t(
            "Maîtrisez le cycle total de l'intelligence : Capter, Transformer, Influencer. Notre Workflow propriétaire convertit l'information en pouvoir souverain, transformant vos environnements complexes en écosystèmes de décision maîtrisés et en vecteurs de rayonnement international.",
            "Master the complete intelligence cycle: Capture, Transform, Influence. Our proprietary workflow converts information into sovereign power, transforming your complex environments into mastered decision ecosystems and vectors of international outreach."
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground tracking-widest mb-4">▸ {t("Cliquez sur un bloc pour explorer le mécanisme", "Click a block to explore the mechanism")}</p>

      {/* 3-Column Grid — 75% width */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 mx-auto px-4 md:px-8 mb-4" style={{ maxWidth: '75%' }}>
        {/* LEFT — Back-Office */}
        <div className="flex flex-col relative z-10">
          <p className="text-[11px] font-sans font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border">Back-Office</p>
          {sourceBlocks.map(b => (
            <div
              key={b.id}
              role="button"
              tabIndex={0}
              onClick={() => toggle(b.id)}
              onKeyDown={(e) => e.key === 'Enter' && toggle(b.id)}
              className={`border rounded-xl p-4 cursor-pointer transition-all mb-2.5 select-none relative z-10
                ${active === b.id
                  ? "border-[#C9A84C]/60 shadow-lg shadow-[#C9A84C]/10 ring-1 ring-[#C9A84C]/20"
                  : b.isHumint
                    ? "border-red-200 hover:border-red-400/50 hover:shadow-md"
                    : "border-border hover:border-[#C9A84C]/50 hover:shadow-md"
                }`}
              style={{ background: active === b.id ? '#F0F7FF' : 'white' }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${b.color}18` }}>{b.icon}</span>
                <h3 className={`text-[13px] font-sans font-bold leading-tight ${b.isHumint ? "text-red-600" : "text-[#3B82F6]"}`}>{b.label}</h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2 whitespace-pre-line">{b.desc}</p>
              {b.logos && (
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  {b.logos.map((logo, i) => (
                    <img key={i} src={logo.src} alt={logo.alt} className="h-7 object-contain" />
                  ))}
                </div>
              )}
              {'ddLogos' in b && b.ddLogos && (
                <div className="flex flex-wrap items-center gap-2.5 mb-1">
                  {(b.ddLogos as {src:string;alt:string}[]).map((logo, i) => (
                    <img key={i} src={logo.src} alt={logo.alt} className="h-7 object-contain" />
                  ))}
                </div>
              )}
              {b.tags && b.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {b.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-medium cursor-pointer hover:bg-blue-100 transition-colors">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <p className="text-[11px] font-sans font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border w-full">{t("Infrastructure Décisionnelle", "Decision Infrastructure")}</p>

          <div
            role="button"
            tabIndex={0}
            onClick={() => toggle("core")}
            onKeyDown={(e) => e.key === 'Enter' && toggle("core")}
            className={`border-2 rounded-full w-[225px] h-[225px] flex flex-col items-center justify-center cursor-pointer transition-all flex-shrink-0 select-none
              ${active === "core"
                ? "border-[#C9A84C] shadow-lg shadow-[#C9A84C]/15"
                : "border-[#C9A84C]/35 hover:border-[#C9A84C] hover:shadow-md"
              }`}
            style={{ background: '#FFFFFF', overflow: 'hidden' }}
          >
            <img src={logoFondBlancSP} alt="Buildfluence" className="w-[140px] h-auto object-contain" />
          </div>

          <p className="text-[10px] text-[#C9A84C] tracking-[2px] uppercase opacity-70">↓ Transformation ↓</p>

          {/* Output Box */}
          <div className="w-full bg-card border border-border rounded-xl p-5 min-h-[160px]">
            <p className="text-[13px] font-sans font-bold text-[#C9A84C] mb-2">{t("Une architecture conçue pour transformer l'information en pouvoir décisionnel efficace", "An architecture designed to transform information into effective decision-making power")}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              {t(
                "Buildfluence ne délivre pas des rapports volumineux, mais une capacité à comprendre, anticiper et influencer les dynamiques complexes qui façonnent votre environnement stratégique.",
                "Buildfluence does not deliver bulky reports, but a capacity to understand, anticipate and influence the complex dynamics that shape your strategic environment."
              )}
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed mb-3 font-medium whitespace-pre-line">
              {t(
                "Pour illustrer concrètement cette approche, prenons un cas réel :\nInvestissement au Maroc : Décryptage d'une guerre économique silencieuse entre puissances intercontinentales",
                "To concretely illustrate this approach, let's take a real case:\nInvestment in Morocco: Decryption of a silent economic war between intercontinental powers"
              )}
            </p>
            <div className="flex flex-col gap-1.5">
              {outputItems.map((item, i) => (
                <div key={i} className="text-[11px] text-foreground/80 py-1.5 px-2.5 bg-muted rounded border-l-2 border-[#C9A84C]">{item}</div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-[#C9A84C] tracking-[2px] uppercase opacity-70">↓ {t("Diffusion & Impact", "Distribution & Impact")} ↓</p>
          <p className="text-[10px] text-muted-foreground tracking-wider uppercase">{t("VISIBILITÉ - RAYONNEMENT - INFLUENCE", "VISIBILITY - OUTREACH - INFLUENCE")}</p>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {hasActivePanel && (
              <motion.div
                ref={detailRef}
                key={active || selectedCountry || selectedCompetitor || 'map'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="border border-[#C9A84C]/30 rounded-xl p-6 shadow-sm" style={{ background: '#F0F7FF' }}>
                  {/* Competitivity Map */}
                  {showCompetitivityMap && (
                    <>
                      <h3 className="text-base font-sans font-bold text-[#3B82F6] mb-3">{t("Carte de Compétitivité Mondiale", "World Competitiveness Map")}</h3>
                      <img src={carteCompetitivite} alt="Carte de compétitivité" className="w-full rounded-lg mb-3" />
                      <div className="text-center pt-2">
                        <button onClick={() => setShowCompetitivityMap(false)} className="text-[11px] text-muted-foreground border border-border px-4 py-1.5 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">{t("Fermer", "Close")} ✕</button>
                      </div>
                    </>
                  )}

                  {/* Country Detail (Pays Clés) */}
                  {countryData && (
                    <>
                      <h3 className="text-base font-sans font-bold text-[#3B82F6] mb-4">{countryData.flag} {countryData.nameFr}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <h4 className="text-[13px] font-sans font-bold text-[#C9A84C] mb-2.5">{t("Partenariat Stratégique", "Strategic Partnership")}</h4>
                          <ul className="space-y-1.5 text-xs text-foreground/70">
                            <li className="py-1 border-b border-border/30"><strong>{t("Nom", "Name")} :</strong> {countryData.nameFr}</li>
                            <li className="py-1 border-b border-border/30"><strong>{t("Catégorie", "Category")} :</strong> {countryData.category}</li>
                            <li className="py-1 border-b border-border/30"><strong>{t("Secteurs", "Sectors")} :</strong> {countryData.sectors}</li>
                            <li className="py-1 leading-relaxed"><strong>Description :</strong> {countryData.description}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-sans font-bold text-[#C9A84C] mb-2.5">{t("Opportunité Buildfluence", "Buildfluence Opportunity")}</h4>
                          <ul className="space-y-1">
                            {countryData.opportunities.map((opp, i) => (
                              <li key={i} className="text-xs pl-4 relative py-1 border-b border-border/30 leading-relaxed before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[10px] before:top-1">
                                <span className="text-foreground/70">{opp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-center pt-2">
                        <button onClick={() => setSelectedCountry(null)} className="text-[11px] text-muted-foreground border border-border px-4 py-1.5 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">{t("Fermer", "Close")} ✕</button>
                      </div>
                    </>
                  )}

                  {/* Competitor Detail (Pays Concurrents) */}
                  {competitorData && (
                    <>
                      <h3 className="text-base font-sans font-bold text-[#3B82F6] mb-4">{competitorData.flag} {competitorData.nameFr}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <h4 className="text-[13px] font-sans font-bold text-[#C9A84C] mb-2.5">{t("Fiche Compétitivité", "Competitiveness Profile")}</h4>
                          <ul className="space-y-1.5 text-xs text-foreground/70">
                            <li className="py-1 border-b border-border/30"><strong>{t("Nom", "Name")} :</strong> {competitorData.nameFr}</li>
                            <li className="py-1 border-b border-border/30"><strong>{t("Catégorie", "Category")} :</strong> {t("Concurrent", "Competitor")}</li>
                            <li className="py-1 border-b border-border/30"><strong>{t("Secteurs en compétition vs Maroc", "Sectors competing vs Morocco")} :</strong> {competitorData.sectors}</li>
                            <li className="py-1 border-b border-border/30 leading-relaxed"><strong>Description :</strong> {competitorData.description}</li>
                            <li className="py-1"><strong>{t("Note de compétitivité", "Competitiveness score")} :</strong> <span className="font-bold text-[#C9A84C]">{competitorData.score}/10</span></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-sans font-bold text-[#C9A84C] mb-2.5">{t("Opportunité Buildfluence", "Buildfluence Opportunity")}</h4>
                          <ul className="space-y-1">
                            {[
                              t("Analyse comparative des atouts du Maroc vs ce pays concurrent", "Comparative analysis of Morocco's strengths vs this competitor"),
                              t("Identification des secteurs où le Maroc peut reprendre l'avantage", "Identification of sectors where Morocco can regain advantage"),
                              t("Veille des stratégies d'attractivité déployées par ce concurrent", "Monitoring of attractiveness strategies deployed by this competitor"),
                              t("Intelligence sur les investisseurs ciblés simultanément par le Maroc et ce pays", "Intelligence on investors simultaneously targeted by Morocco and this country"),
                              t("Recommandations pour renforcer le positionnement compétitif du Maroc", "Recommendations to strengthen Morocco's competitive positioning"),
                            ].map((opp, i) => (
                              <li key={i} className="text-xs pl-4 relative py-1 border-b border-border/30 leading-relaxed before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[10px] before:top-1">
                                <span className="text-foreground/70">{opp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-center pt-2">
                        <button onClick={() => setSelectedCompetitor(null)} className="text-[11px] text-muted-foreground border border-border px-4 py-1.5 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">{t("Fermer", "Close")} ✕</button>
                      </div>
                    </>
                  )}

                  {/* Standard Detail Panel */}
                  {activeDetail && (
                    <>
                      <h3 className="text-base font-sans font-bold text-[#3B82F6] mb-4">
                        {active && sourceBlocks.find(b => b.id === active)?.icon && <span className="mr-2">{sourceBlocks.find(b => b.id === active)?.icon}</span>}
                        {activeDetail.title}
                      </h3>
                      <div className={`grid grid-cols-1 gap-5 mb-4 ${activeDetail.columns.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                        {activeDetail.columns.map((col, i) => (
                          <div key={i}>
                            <h4 className="text-[13px] font-sans font-bold text-[#C9A84C] mb-2.5">{col.heading}</h4>
                            <ul className="space-y-1">
                              {col.items.map((item, j) => {
                                const isConstatItem = item.color && item.text.startsWith("✗");
                                return (
                                  <li key={j} className="text-xs pl-4 relative py-1 border-b border-border/30 leading-relaxed before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[10px] before:top-1">
                                    {isConstatItem ? (
                                      <span className="text-foreground/70">
                                        <span style={{ color: item.color === 'red' ? '#DC2626' : '#16A34A' }}>✗</span>
                                        {item.text.substring(1)}
                                      </span>
                                    ) : (
                                      <span className="text-foreground/70">{item.text}</span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="text-center pt-2">
                        <button onClick={() => setActive(null)} className="text-[11px] text-muted-foreground border border-border px-4 py-1.5 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">{t("Fermer", "Close")} ✕</button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — Ecosystem */}
        <div className="flex flex-col relative z-10">
          <p className="text-[11px] font-sans font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border">Ecosystem</p>
          {destBlocks.map(b => (
            <div
              key={b.id}
              ref={b.id === "pays_concurrent" ? competitorSectionRef : undefined}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (b.id !== "pays" && b.id !== "pays_concurrent") toggle(b.id);
              }}
              onKeyDown={(e) => e.key === 'Enter' && b.id !== "pays" && b.id !== "pays_concurrent" && toggle(b.id)}
              className={`border rounded-xl p-3.5 cursor-pointer transition-all mb-2.5 select-none relative z-10
                ${active === b.id
                  ? "border-[#1a6b5a]/50 shadow-lg shadow-[#1a6b5a]/10 ring-1 ring-[#1a6b5a]/20"
                  : "border-border hover:border-[#1a6b5a]/40 hover:shadow-md"
                }`}
              style={{ background: active === b.id ? '#F0F7FF' : 'white' }}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                {b.logos ? (
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {b.logos.map((logo, i) => (
                        <img key={i} src={logo} alt="" className="h-7 object-contain" />
                      ))}
                    </div>
                    {'logoSubtitle' in b && b.logoSubtitle && (
                      <p className="text-[10px] text-muted-foreground">{b.logoSubtitle as string}</p>
                    )}
                  </div>
                ) : (
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg bg-muted flex-shrink-0">{b.icon}</span>
                )}
                {!b.logos && (
                  <div
                    onClick={(e) => { if (b.id === "pays_concurrent") { e.stopPropagation(); handleCompetitorTitleClick(); } }}
                  >
                    {b.title && <h4 className="text-[12px] font-sans font-bold text-foreground leading-tight">{b.title}</h4>}
                    <p className="text-[10px] text-muted-foreground">{b.sub}</p>
                  </div>
                )}
              </div>
              {b.desc && <p className="text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>}
              {b.descDetails && (
                <ul className="mt-1.5 space-y-0.5">
                  {b.descDetails.map((d, i) => (
                    <li key={i} className="text-[10px] text-muted-foreground leading-relaxed">{d}</li>
                  ))}
                </ul>
              )}
              {'moroccoNowLogo' in b && b.moroccoNowLogo && (
                <div className="flex items-center gap-2 mt-2">
                  <img src={b.moroccoNowLogo as string} alt="Morocco Now" className="h-7 object-contain" />
                  <span className="text-[10px] text-muted-foreground">Site d'Attractivité & Nation Branding</span>
                </div>
              )}
              {b.cooperationLogos && (
                <div className="flex flex-wrap items-center gap-2.5 mt-2">
                  {b.cooperationLogos.map((logo, i) => (
                    <img key={i} src={logo.src} alt={logo.alt} className="h-7 object-contain" />
                  ))}
                </div>
              )}
              {/* Federation Logos */}
              {'federationLogos' in b && b.federationLogos && (
                <div className="flex flex-wrap items-center gap-2.5 mt-2">
                  {(b.federationLogos as {src:string;alt:string}[]).map((logo, i) => (
                    <img key={i} src={logo.src} alt={logo.alt} className="h-7 object-contain" />
                  ))}
                </div>
              )}
              {/* API Logos */}
              {'apiLogos' in b && b.apiLogos && (
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {(b.apiLogos as {src:string;alt:string}[]).map((logo, i) => (
                    <img key={i} src={logo.src} alt={logo.alt} className="h-7 object-contain" />
                  ))}
                </div>
              )}
              {/* Pays Clés flags with tooltips */}
              {b.flags && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(b.flags as {flag:string;name:string}[]).map((f, i) => (
                    <span
                      key={i}
                      className="text-lg leading-none p-0.5 cursor-pointer hover:scale-125 transition-transform relative group"
                      title={f.name}
                      onClick={(e) => { e.stopPropagation(); handleCountryClick(f.flag); }}
                    >
                      {f.flag}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 text-[9px] bg-gray-800 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        {f.name}
                      </span>
                    </span>
                  ))}
                </div>
              )}
              {/* Pays Concurrents flags with tooltips */}
              {'competitorFlags' in b && b.competitorFlags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {(b.competitorFlags as {flag:string;name:string}[]).map((f, i) => (
                    <span
                      key={i}
                      className="text-base leading-none p-0.5 cursor-pointer hover:scale-125 transition-transform relative group"
                      title={f.name}
                      onClick={(e) => { e.stopPropagation(); handleCompetitorClick(f.flag); }}
                    >
                      {f.flag}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 text-[9px] bg-gray-800 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        {f.name}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Labels */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 mx-auto px-4 md:px-8" style={{ maxWidth: '75%' }}>
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Strategic Workflow : Veille & Intelligence", "Strategic Workflow: Watch & Intelligence")}</p>
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Infrastructure Décisionnelle Souveraine", "Sovereign Decision Infrastructure")}</p>
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Diffusion : Inter & Intra — National & International", "Distribution: Inter & Intra — National & International")}</p>
      </div>
    </section>
  );
};

export default RayonnementMechanism;
