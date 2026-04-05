import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import buildfluenceLogo from "@/assets/Logo_Buildfluence.png";
import amdieLogo from "@/assets/clients/amdie.png";
import miceppLogo from "@/assets/clients/micepp.png";
import growthLabLogo from "@/assets/clients/growthlab.png";
import statistaLogo from "@/assets/clients/statista.png";
import itcLogo from "@/assets/clients/itc.png";
import worldBankLogo from "@/assets/clients/worldbank.png";
import afdLogo from "@/assets/clients/afd.png";
import badLogo from "@/assets/clients/bad.png";
import berdLogo from "@/assets/clients/berd.png";
import moroccoNowLogo from "@/assets/clients/morocco-now.png";

type BlockId = "veille" | "duediligence" | "bi" | "humint" | "core" | "amdie" | "gouv" | "federations" | "api" | "pays" | "cooperation" | "medias" | null;

interface DetailData {
  title: string;
  columns: { heading: string; items: { text: string; color?: string }[] }[];
}

const RayonnementMechanism = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<BlockId>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const toggle = (id: BlockId) => setActive(prev => prev === id ? null : id);

  // Auto-scroll to detail panel when it appears
  useEffect(() => {
    if (active && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [active]);

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
        { heading: t("Constat actuel", "Current observation"), items: [
          { text: t("✗ Morocco Now : Site statique institutionnel", "✗ Morocco Now: Static institutional site"), color: "red" },
          { text: t("✗ Manque de plateforme digitale interactive vs Investisseurs", "✗ Lack of interactive digital platform vs Investors"), color: "red" },
          { text: t("✗ Aucune Newsletter externe par cible : Institutionnels, Diaspora, Investisseurs & Prescripteurs internationaux", "✗ No external newsletter by target: Institutional, Diaspora, Investors & International Prescribers"), color: "red" },
          { text: t("✗ Aucune publication d'intelligence sectorielle", "✗ No sector intelligence publication"), color: "red" },
          { text: t("✗ Dernière news : 2023", "✗ Last news: 2023"), color: "red" },
          { text: t("✗ Source d'info : Factiva agrégateur de presse", "✗ Info source: Factiva press aggregator"), color: "green" },
          { text: t("✗ Pas d'outils de veille professionnel", "✗ No professional monitoring tools"), color: "red" },
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
    pays: {
      title: t("Pays Clés", "Key Countries"),
      columns: [
        { heading: t("Partenaires majeurs", "Major partners"), items: [
          { text: "🇫🇷 France" }, { text: "🇯🇵 Japon" }, { text: "🇺🇸 États-Unis" }, { text: "🇬🇧 Royaume-Uni" },
        ]},
        { heading: t("Europe & Asie", "Europe & Asia"), items: [
          { text: "🇩🇪 Allemagne" }, { text: "🇧🇪 Belgique" }, { text: "🇳🇱 Pays-Bas" }, { text: "🇰🇷 Corée du Sud" },
        ]},
        { heading: t("Stratégie", "Strategy"), items: [
          { text: t("Partenariats bilatéraux", "Bilateral partnerships") },
          { text: t("Co-investissement", "Co-investment") },
          { text: t("Transfert technologique", "Technology transfer") },
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

  const sourceBlocks = [
    {
      id: "veille" as BlockId, icon: "🔭", color: "#103E8C",
      label: t("Veille & Intelligence Stratégique", "Strategic Watch & Intelligence"),
      desc: t("Le moteur d'intelligence opère dans 6 espaces et extrait les interactions informationnelles : Organisations, lieux, personnes clés, concepts macroéconomiques, produits et événements.", "The intelligence engine operates in 6 spaces and extracts informational interactions: Organizations, places, key people, macroeconomic concepts, products and events."),
      tags: [t("Organisations", "Organizations"), t("Lieux", "Places"), t("Personnes clés", "Key people"), t("Concepts macro", "Macro concepts"), t("Produits", "Products"), t("Événements", "Events")],
    },
    {
      id: "duediligence" as BlockId, icon: "🔍", color: "#1a5580",
      label: "Deep Due Diligence",
      desc: t("Analyse approfondie des parties prenantes et des risques cachés : 3 niveaux d'investigation.", "In-depth analysis of stakeholders and hidden risks: 3 levels of investigation."),
      tags: ["EU Sanctions Map", "PitchBook", "ICIJ", "Cbonds", "OpenCorporates", "The Law Society", "US Dept. of Justice"],
    },
    {
      id: "bi" as BlockId, icon: "📊", color: "#1a6b5a",
      label: t("Business Intelligence", "Business Intelligence"),
      desc: t("Sources de référence internationale pour l'analyse économique et sectorielle.", "International reference sources for economic and sector analysis."),
      tags: [],
      logos: [
        { src: growthLabLogo, alt: "Growth Lab" },
        { src: statistaLogo, alt: "Statista" },
        { src: itcLogo, alt: "ITC" },
        { src: worldBankLogo, alt: "World Bank" },
      ],
    },
    {
      id: "humint" as BlockId, icon: "🧠", color: "#c0392b",
      label: t("HumInt : Intelligence Humaine", "HumInt: Human Intelligence"),
      desc: t("Le renseignement humain que les outils ne peuvent pas remplacer : réseau, terrain, sources qualifiées.", "Human intelligence that tools cannot replace: network, field, qualified sources."),
      tags: [t("Analystes terrain", "Field analysts"), t("Réseau diplomatique", "Diplomatic network"), t("Sources primaires", "Primary sources")],
      isHumint: true,
    },
  ];

  const destBlocks = [
    {
      id: "amdie" as BlockId, title: "AMDIE / MICEPP",
      sub: t("Agence de l'investissement & Ministère de tutelle", "Investment Agency & Supervisory Ministry"),
      desc: t("Mission : Développement des investissements et des exportations des produits et services au Maroc.", "Mission: Development of investments and exports of products and services in Morocco."),
      descDetails: [
        t("Charte de l'investissement : édition en 2023", "Investment charter: 2023 edition"),
        t("Objectifs Stratégiques 2026 :", "Strategic Objectives 2026:"),
        t("   550 MMDH d'investissements", "   550 BMDH in investments"),
        t("   500 000 création d'emploi", "   500,000 job creation"),
        t("Morocco Now : Site d'Attractivité & Nation Branding", "Morocco Now: Attractiveness Site & Nation Branding"),
      ],
      logos: [amdieLogo, miceppLogo],
    },
    {
      id: "gouv" as BlockId, icon: "🇲🇦", title: t("Gouvernement Marocain", "Moroccan Government"),
      sub: t("Agences d'État & Instances publiques & CRI", "State Agencies & Public Bodies & CRI"),
      desc: t("Pilotage des politiques publiques avec une longueur d'avance stratégique. Centres Régionaux de l'Investissement.", "Steering public policies with a strategic head start. Regional Investment Centers."),
    },
    {
      id: "federations" as BlockId, icon: "🤝", title: t("Fédérations Sectorielles", "Sector Federations"),
      sub: t("Partenaires & Entreprises stratégiques", "Partners & Strategic Companies"),
      desc: "CGEM, ASMEX, FENAGRI, AMIT, UNICOP, AMICA",
    },
    {
      id: "api" as BlockId, icon: "🌐", title: t("Agences de Promotion des Investissements", "Investment Promotion Agencies"),
      sub: t("IDE & Attractivité internationale", "FDI & International Attractiveness"),
      desc: t("Création d'un Observatoire de l'investissement. Accélération de l'attractivité des IDE.", "Creation of an investment observatory. Acceleration of FDI attractiveness."),
    },
    {
      id: "pays" as BlockId, icon: "🗺", title: t("Pays Clés", "Key Countries"),
      sub: t("Partenariats solides & innovants", "Solid & innovative partnerships"),
      desc: "", flags: ["🇫🇷","🇯🇵","🇺🇸","🇬🇧","🇩🇪","🇨🇳","🇧🇪","🇳🇱","🇪🇸","🇰🇷"],
    },
    {
      id: "cooperation" as BlockId, icon: "🌍", title: t("Coopération Internationale", "International Cooperation"),
      sub: t("Financeurs de projets & missions", "Project funders & missions"),
      desc: "",
      cooperationLogos: [
        { src: afdLogo, alt: "AFD" },
        { src: badLogo, alt: "BAD" },
        { src: worldBankLogo, alt: "Banque Mondiale" },
        { src: berdLogo, alt: "BERD" },
      ],
      tags: ["GIZ","JICA","USAID","BEI","PNUD","IsDB"],
    },
    {
      id: "medias" as BlockId, icon: "📡", title: t("Médias & Prescripteurs", "Media & Prescribers"),
      sub: t("Leaders d'Opinion · Diaspora · Journalistes", "Opinion Leaders · Diaspora · Journalists"),
      desc: t("Positionnement comme source d'autorité dans les espaces informationnels clés.", "Positioning as an authority source in key information spaces."),
    },
  ];

  const outputItems = [
    t("Croisement OSINT + HumInt + Business Intelligence", "OSINT + HumInt + Business Intelligence cross-referencing"),
    t("Veille / IA augmentée en continu", "Continuously augmented AI watch"),
    t("Scoring Go / Vigilance / No-Go", "Go / Caution / No-Go scoring"),
    t("Dashboards & DataViz actionnables", "Actionable dashboards & DataViz"),
    "Doing Business Platform",
  ];

  const activeDetail = active && details[active] ? details[active] : null;

  return (
    <section className="py-8" style={{ background: '#F8FAFC', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
      {/* Hero */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground mb-2">
          {t("Mécanisme de ", "Mechanism of ")}<span className="text-[#C9A84C]">{t("Rayonnement & d'Attractivité", "Outreach & Attractiveness")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-1">{t("De la captation de la donnée à l'influence", "From data capture to influence")}</p>
        <p className="text-sm font-semibold text-[#C9A84C] mb-6">{t("Buildfluence opère une chaîne complète de transformation de l'information en pouvoir décisionnel.", "Buildfluence operates a complete chain transforming information into decision-making power.")}</p>
        <div className="max-w-3xl mx-auto border-l-[3px] border-[#C9A84C] bg-[rgba(201,168,76,0.06)] rounded-r-lg p-4 text-left text-sm italic text-foreground/70 leading-relaxed">
          {t(
            "Maîtrisez le cycle total de l'intelligence : Capter, Transformer, Influencer. Notre Workflow propriétaire convertit l'information en pouvoir souverain, transformant vos environnements complexes en écosystèmes de décision maîtrisés et en vecteurs de rayonnement international.",
            "Master the complete intelligence cycle: Capture, Transform, Influence. Our proprietary workflow converts information into sovereign power, transforming your complex environments into mastered decision ecosystems and vectors of international outreach."
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground tracking-widest mb-4">▸ {t("Cliquez sur un bloc pour explorer le mécanisme", "Click a block to explore the mechanism")}</p>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-5 max-w-[1600px] mx-auto px-4 md:px-8 mb-4">
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
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{b.desc}</p>
              {/* Logos for BI block */}
              {b.logos && (
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  {b.logos.map((logo, i) => (
                    <img key={i} src={logo.src} alt={logo.alt} className="h-5 object-contain" />
                  ))}
                </div>
              )}
              {b.tags && b.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {b.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-medium cursor-pointer hover:bg-blue-100 transition-colors dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800">{tag}</span>
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
            className={`border-2 rounded-full w-[180px] h-[180px] flex flex-col items-center justify-center cursor-pointer transition-all flex-shrink-0 select-none
              ${active === "core"
                ? "border-[#C9A84C] shadow-lg shadow-[#C9A84C]/15"
                : "border-[#C9A84C]/35 hover:border-[#C9A84C] hover:shadow-md"
              }`}
            style={{ background: '#0F365F' }}
          >
            <img src={buildfluenceLogo} alt="Buildfluence" className="w-20 h-auto mb-1" />
            <span className="text-[8px] text-white/70 tracking-[1.5px] uppercase mt-1 text-center leading-snug">Sovereign Decision<br/>Infrastructure</span>
          </div>

          <p className="text-[10px] text-[#C9A84C] tracking-[2px] uppercase opacity-70">↓ Transformation ↓</p>

          {/* Output Box */}
          <div className="w-full bg-card border border-border rounded-xl p-5 min-h-[160px]">
            <p className="text-[13px] font-sans font-bold text-[#C9A84C] mb-2">{t("Infrastructure de décision souveraine intégrée", "Integrated sovereign decision infrastructure")}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t("Buildfluence est une infrastructure décisionnelle permanente qui transforme la donnée brute en lucidité décisionnelle opérationnelle, de la collecte à l'influence.", "Buildfluence is a permanent decision infrastructure that transforms raw data into operational decision-making clarity, from collection to influence.")}</p>
            <div className="flex flex-col gap-1.5">
              {outputItems.map((item, i) => (
                <div key={i} className="text-[11px] text-foreground/80 py-1.5 px-2.5 bg-muted rounded border-l-2 border-[#C9A84C]">{item}</div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-[#C9A84C] tracking-[2px] uppercase opacity-70">↓ {t("Diffusion", "Distribution")} ↓</p>
          <p className="text-[10px] text-muted-foreground tracking-wider uppercase">{t("VISIBILITÉ - RAYONNEMENT - INFLUENCE", "VISIBILITY - OUTREACH - INFLUENCE")}</p>
        </div>

        {/* RIGHT — Ecosystem */}
        <div className="flex flex-col relative z-10">
          <p className="text-[11px] font-sans font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border">Ecosystem</p>
          {destBlocks.map(b => (
            <div
              key={b.id}
              role="button"
              tabIndex={0}
              onClick={() => toggle(b.id)}
              onKeyDown={(e) => e.key === 'Enter' && toggle(b.id)}
              className={`border rounded-xl p-3.5 cursor-pointer transition-all mb-2.5 select-none relative z-10
                ${active === b.id
                  ? "border-[#1a6b5a]/50 shadow-lg shadow-[#1a6b5a]/10 ring-1 ring-[#1a6b5a]/20"
                  : "border-border hover:border-[#1a6b5a]/40 hover:shadow-md"
                }`}
              style={{ background: active === b.id ? '#F0F7FF' : 'white' }}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                {b.logos ? (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {b.logos.map((logo, i) => (
                      <img key={i} src={logo} alt="" className="h-7 object-contain" />
                    ))}
                  </div>
                ) : (
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg bg-muted flex-shrink-0">{b.icon}</span>
                )}
                <div>
                  <h4 className="text-[12px] font-sans font-bold text-foreground leading-tight">{b.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{b.sub}</p>
                </div>
              </div>
              {b.desc && <p className="text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>}
              {b.descDetails && (
                <ul className="mt-1.5 space-y-0.5">
                  {b.descDetails.map((d, i) => (
                    <li key={i} className="text-[10px] text-muted-foreground leading-relaxed">{d}</li>
                  ))}
                </ul>
              )}
              {b.cooperationLogos && (
                <div className="flex flex-wrap items-center gap-2.5 mt-2">
                  {b.cooperationLogos.map((logo, i) => (
                    <img key={i} src={logo.src} alt={logo.alt} className="h-6 object-contain" />
                  ))}
                </div>
              )}
              {b.flags && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {b.flags.map((f, i) => <span key={i} className="text-lg leading-none p-0.5">{f}</span>)}
                </div>
              )}
              {b.tags && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {b.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-semibold dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {activeDetail && (
          <motion.div
            ref={detailRef}
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-[1600px] mx-auto px-4 md:px-8 mb-6"
          >
            <div className="bg-card border border-[#C9A84C]/30 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-sans font-bold text-[#3B82F6] mb-4">{activeDetail.title}</h3>
              <div className={`grid grid-cols-1 gap-5 mb-4 ${activeDetail.columns.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {activeDetail.columns.map((col, i) => (
                  <div key={i}>
                    <h4 className="text-[13px] font-sans font-bold text-[#C9A84C] mb-2.5">{col.heading}</h4>
                    <ul className="space-y-1">
                      {col.items.map((item, j) => {
                        // For constat actuel: keep ✗ color but text in normal color
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Labels */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-5 max-w-[1600px] mx-auto px-4 md:px-8">
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Strategic Workflow : Veille & Intelligence", "Strategic Workflow: Watch & Intelligence")}</p>
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Infrastructure Décisionnelle Souveraine", "Sovereign Decision Infrastructure")}</p>
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Diffusion : Inter & Intra — National & International", "Distribution: Inter & Intra — National & International")}</p>
      </div>
    </section>
  );
};

export default RayonnementMechanism;
