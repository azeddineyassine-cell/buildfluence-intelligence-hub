import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

type BlockId = "veille" | "duediligence" | "bi" | "humint" | "core" | "amdie" | "gouv" | "federations" | "api" | "pays" | "cooperation" | "medias" | null;

interface DetailData {
  title: string;
  columns: { heading: string; items: string[] }[];
}

const RayonnementMechanism = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<BlockId>(null);

  const toggle = (id: BlockId) => setActive(prev => prev === id ? null : id);

  const details: Record<string, DetailData> = {
    veille: {
      title: t("Veille & Intelligence Stratégique", "Strategic Watch & Intelligence"),
      columns: [
        { heading: t("Sources", "Sources"), items: [t("Web, médias, réseaux sociaux", "Web, media, social networks"), t("Bases sectorielles & brevets", "Sector databases & patents"), t("Dark web & deep web", "Dark web & deep web")] },
        { heading: t("Extraction", "Extraction"), items: [t("Organisations & personnes clés", "Organizations & key people"), t("Concepts macroéconomiques", "Macroeconomic concepts"), t("Événements & produits", "Events & products")] },
        { heading: t("Traitement", "Processing"), items: [t("NLP & analyse sémantique", "NLP & semantic analysis"), t("Scoring de criticité", "Criticality scoring"), t("Signaux faibles détectés", "Weak signals detected")] },
      ],
    },
    duediligence: {
      title: t("Due Diligence Advanced", "Advanced Due Diligence"),
      columns: [
        { heading: t("Niveau 1", "Level 1"), items: [t("Vérification identitaire", "Identity verification"), t("Screening sanctions", "Sanctions screening"), t("Réputation initiale", "Initial reputation")] },
        { heading: t("Niveau 2", "Level 2"), items: [t("Structure capitalistique", "Capital structure"), t("Litiges & contentieux", "Litigation & disputes"), t("Réseau d'influence", "Influence network")] },
        { heading: t("Niveau 3", "Level 3"), items: [t("Investigation terrain", "Field investigation"), t("Sources humaines", "Human sources"), t("Rapport confidentiel", "Confidential report")] },
      ],
    },
    bi: {
      title: t("Business Intelligence", "Business Intelligence"),
      columns: [
        { heading: t("Analyse économique", "Economic Analysis"), items: [t("Flux d'investissement", "Investment flows"), t("Dynamiques sectorielles", "Sector dynamics"), t("Benchmark concurrentiel", "Competitive benchmark")] },
        { heading: t("Sources", "Sources"), items: ["Growth Lab, Statista", "fDi Intelligence, Factiva", "World Bank, Harvard Kennedy"] },
        { heading: t("Livrables", "Deliverables"), items: [t("Études sectorielles", "Sector studies"), t("Cartographies de marché", "Market mappings"), t("Rapports d'attractivité", "Attractiveness reports")] },
      ],
    },
    humint: {
      title: t("HumInt : Intelligence Humaine", "HumInt: Human Intelligence"),
      columns: [
        { heading: t("Réseau", "Network"), items: [t("Analystes terrain", "Field analysts"), t("Réseau diplomatique", "Diplomatic network"), t("Sources primaires qualifiées", "Qualified primary sources")] },
        { heading: t("Valeur ajoutée", "Added Value"), items: [t("Contexte non-digitalisé", "Non-digitized context"), t("Vérification de terrain", "Field verification"), t("Signaux invisibles", "Invisible signals")] },
        { heading: t("Intégration", "Integration"), items: [t("Croisement avec OSINT", "Cross-referencing with OSINT"), t("Validation des hypothèses", "Hypothesis validation"), t("Enrichissement décisionnel", "Decision enrichment")] },
      ],
    },
    core: {
      title: t("Infrastructure Décisionnelle Buildfluence", "Buildfluence Decision Infrastructure"),
      columns: [
        { heading: t("Captation", "Capture"), items: [t("Croisement OSINT + HumInt + BI", "OSINT + HumInt + BI cross-referencing"), t("IA augmentée en continu", "Continuously augmented AI")] },
        { heading: t("Transformation", "Transformation"), items: [t("Scoring Go / Vigilance / No-Go", "Go / Caution / No-Go scoring"), t("Dashboards & DataViz actionnables", "Actionable dashboards & DataViz")] },
        { heading: t("Diffusion", "Distribution"), items: [t("Publications stratégiques", "Strategic publications"), t("Rayonnement & influence", "Outreach & influence")] },
      ],
    },
    amdie: {
      title: "AMDIE / MICEPP",
      columns: [
        { heading: t("Constat", "Observation"), items: [t("Site statique institutionnel", "Static institutional site"), t("Aucune Newsletter externe", "No external newsletter"), t("6 secteurs affichés vs 8 dans la charte", "6 sectors displayed vs 8 in the charter")] },
        { heading: t("Cibles manquées", "Missed targets"), items: [t("Diaspora marocaine", "Moroccan diaspora"), t("Partenaires / investisseurs", "Partners / investors"), t("Institutionnels clés", "Key institutions")] },
        { heading: t("Opportunité", "Opportunity"), items: [t("Newsletter stratégique dédiée", "Dedicated strategic newsletter"), t("Observatoire de l'investissement", "Investment observatory"), t("Rayonnement sectoriel complet", "Complete sector outreach")] },
      ],
    },
    gouv: {
      title: t("Gouvernement Marocain", "Moroccan Government"),
      columns: [
        { heading: t("Périmètre", "Scope"), items: [t("Agences d'État", "State agencies"), t("Instances publiques", "Public bodies"), t("CRI — Centres Régionaux", "CRI — Regional Centers")] },
        { heading: t("Valeur ajoutée", "Added value"), items: [t("Pilotage avec longueur d'avance", "Steering with strategic head start"), t("Anticipation réglementaire", "Regulatory anticipation"), t("Intelligence territoriale", "Territorial intelligence")] },
        { heading: t("Impact", "Impact"), items: [t("Politiques publiques éclairées", "Informed public policies"), t("Compétitivité régionale", "Regional competitiveness"), t("Attractivité accrue", "Increased attractiveness")] },
      ],
    },
    federations: {
      title: t("Fédérations Sectorielles", "Sector Federations"),
      columns: [
        { heading: t("Membres", "Members"), items: ["CGEM", "ASMEX", "FENAGRI, AMIT", "UNICOP, AMICA"] },
        { heading: t("Rôle", "Role"), items: [t("Partenaires stratégiques", "Strategic partners"), t("Entreprises membres", "Member companies"), t("Fédérations professionnelles", "Professional federations")] },
        { heading: t("Synergie", "Synergy"), items: [t("Intelligence sectorielle partagée", "Shared sector intelligence"), t("Benchmark concurrentiel", "Competitive benchmark"), t("Co-production de rapports", "Report co-production")] },
      ],
    },
    api: {
      title: t("Agence de Promotion des Investissements", "Investment Promotion Agency"),
      columns: [
        { heading: t("Mission", "Mission"), items: [t("Attractivité des IDE", "FDI attractiveness"), t("Observatoire de l'investissement", "Investment observatory"), t("Promotion internationale", "International promotion")] },
        { heading: t("Outils", "Tools"), items: [t("Baromètre d'attractivité", "Attractiveness barometer"), t("Études pays cibles", "Target country studies"), t("Cartographie des flux", "Flow mapping")] },
        { heading: t("Résultat", "Result"), items: [t("Accélération IDE", "FDI acceleration"), t("Positionnement concurrentiel", "Competitive positioning"), t("Visibilité internationale", "International visibility")] },
      ],
    },
    pays: {
      title: t("Pays Clés", "Key Countries"),
      columns: [
        { heading: t("Partenaires majeurs", "Major partners"), items: ["🇫🇷 France", "🇯🇵 Japon", "🇺🇸 États-Unis", "🇬🇧 Royaume-Uni"] },
        { heading: t("Europe & Asie", "Europe & Asia"), items: ["🇩🇪 Allemagne", "🇧🇪 Belgique", "🇳🇱 Pays-Bas", "🇰🇷 Corée du Sud"] },
        { heading: t("Stratégie", "Strategy"), items: [t("Partenariats bilatéraux", "Bilateral partnerships"), t("Co-investissement", "Co-investment"), t("Transfert technologique", "Technology transfer")] },
      ],
    },
    cooperation: {
      title: t("Coopération Internationale", "International Cooperation"),
      columns: [
        { heading: t("Financeurs bilatéraux", "Bilateral funders"), items: ["GIZ", "AFD", "JICA", "USAID"] },
        { heading: t("Institutions multilatérales", "Multilateral institutions"), items: ["BEI", "PNUD", "Banque Mondiale", "BERD"] },
        { heading: t("Islamique & autres", "Islamic & others"), items: ["IsDB", t("Fonds souverains", "Sovereign funds"), t("Programmes régionaux", "Regional programs")] },
      ],
    },
    medias: {
      title: t("Médias & Prescripteurs", "Media & Prescribers"),
      columns: [
        { heading: t("Cibles", "Targets"), items: [t("Leaders d'opinion", "Opinion leaders"), t("Diaspora qualifiée", "Qualified diaspora"), t("Journalistes spécialisés", "Specialized journalists")] },
        { heading: t("Stratégie", "Strategy"), items: [t("Source d'autorité", "Authority source"), t("Contenus exclusifs", "Exclusive content"), t("Prises de parole ciblées", "Targeted speeches")] },
        { heading: t("Impact", "Impact"), items: [t("Maîtrise du narratif", "Narrative control"), t("Crédibilité renforcée", "Enhanced credibility"), t("Présence médiatique constante", "Constant media presence")] },
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
      label: t("Due Diligence Advanced", "Advanced Due Diligence"),
      desc: t("Analyse approfondie des parties prenantes et des risques cachés : 3 niveaux d'investigation.", "In-depth analysis of stakeholders and hidden risks: 3 levels of investigation."),
      tags: ["EU Sanctions Map", "PitchBook", "ICIJ", "Cbonds", "OpenCorporates", "The Law Society", "US Dept. of Justice"],
    },
    {
      id: "bi" as BlockId, icon: "📊", color: "#1a6b5a",
      label: t("Business Intelligence", "Business Intelligence"),
      desc: t("Sources de référence internationale pour l'analyse économique et sectorielle.", "International reference sources for economic and sector analysis."),
      tags: ["Growth Lab", "Statista", "fDi Intelligence", "Factiva", "World Bank", "Harvard Kennedy", "ITC"],
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
    { id: "amdie" as BlockId, icon: "🏛", title: "AMDIE / MICEPP", sub: t("Agence de l'investissement & Ministère de tutelle", "Investment Agency & Supervisory Ministry"), desc: t("Site statique : Institutionnel. Aucune Newsletter externe pour des acteurs clés : Diaspora, Partenaires / investisseurs, Institutionnels. 6 secteurs affichés dans le site vs 8 dans la charte.", "Static site: Institutional. No external newsletter for key actors: Diaspora, Partners/investors, Institutional. 6 sectors displayed vs 8 in the charter.") },
    { id: "gouv" as BlockId, icon: "🇲🇦", title: t("Gouvernement Marocain", "Moroccan Government"), sub: t("Agences d'État & Instances publiques & CRI", "State Agencies & Public Bodies & CRI"), desc: t("Pilotage des politiques publiques avec une longueur d'avance stratégique. Centres Régionaux de l'Investissement.", "Steering public policies with a strategic head start. Regional Investment Centers.") },
    { id: "federations" as BlockId, icon: "🤝", title: t("Fédérations Sectorielles", "Sector Federations"), sub: t("Partenaires & Entreprises stratégiques", "Partners & Strategic Companies"), desc: "CGEM, ASMEX, FENAGRI, AMIT, UNICOP, AMICA" },
    { id: "api" as BlockId, icon: "🌐", title: t("Agence de Promotion des Investissements", "Investment Promotion Agency"), sub: t("IDE & Attractivité internationale", "FDI & International Attractiveness"), desc: t("Création d'un Observatoire de l'investissement. Accélération de l'attractivité des IDE.", "Creation of an investment observatory. Acceleration of FDI attractiveness.") },
    { id: "pays" as BlockId, icon: "🗺", title: t("Pays Clés", "Key Countries"), sub: t("Partenariats solides & innovants", "Solid & innovative partnerships"), desc: "", flags: ["🇫🇷","🇯🇵","🇺🇸","🇬🇧","🇩🇪","🇨🇳","🇧🇪","🇳🇱","🇪🇸","🇰🇷"] },
    { id: "cooperation" as BlockId, icon: "🌍", title: t("Coopération Internationale", "International Cooperation"), sub: t("Financeurs de projets & missions", "Project funders & missions"), desc: "", tags: ["GIZ","AFD","JICA","USAID","BEI","PNUD","Banque Mondiale","BERD","IsDB"] },
    { id: "medias" as BlockId, icon: "📡", title: t("Médias & Prescripteurs", "Media & Prescribers"), sub: t("Leaders d'Opinion · Diaspora · Journalistes", "Opinion Leaders · Diaspora · Journalists"), desc: t("Positionnement comme source d'autorité dans les espaces informationnels clés.", "Positioning as an authority source in key information spaces.") },
  ];

  const outputItems = [
    t("Croisement OSINT + HumInt + Business Intelligence", "OSINT + HumInt + Business Intelligence cross-referencing"),
    t("Veille / IA augmentée en continu", "Continuously augmented AI watch"),
    t("Scoring Go / Vigilance / No-Go", "Go / Caution / No-Go scoring"),
    t("Dashboards & DataViz actionnables", "Actionable dashboards & DataViz"),
  ];

  const activeDetail = active && details[active] ? details[active] : null;

  return (
    <section className="py-8 -mx-6 lg:-mx-12">
      {/* Hero */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
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

      {/* 3-Column Grid — full width breakout */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-5 max-w-[1600px] mx-auto px-4 md:px-8 mb-4">
        {/* LEFT — Back-Office */}
        <div className="flex flex-col relative z-10">
          <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border">Back-Office</p>
          {sourceBlocks.map(b => (
            <div
              key={b.id}
              role="button"
              tabIndex={0}
              onClick={() => toggle(b.id)}
              onKeyDown={(e) => e.key === 'Enter' && toggle(b.id)}
              className={`bg-card border rounded-xl p-4 cursor-pointer transition-all mb-2.5 select-none relative z-10
                ${active === b.id
                  ? "border-[#C9A84C]/60 shadow-lg shadow-[#C9A84C]/10 ring-1 ring-[#C9A84C]/20"
                  : b.isHumint
                    ? "border-red-200 hover:border-red-400/50 hover:shadow-md"
                    : "border-border hover:border-[#C9A84C]/50 hover:shadow-md"
                }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${b.color}18` }}>{b.icon}</span>
                <h3 className={`text-[13px] font-bold leading-tight ${b.isHumint ? "text-red-600" : "text-[#3B82F6]"}`}>{b.label}</h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{b.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {b.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-medium cursor-pointer hover:bg-blue-100 transition-colors dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border w-full">{t("Infrastructure Décisionnelle", "Decision Infrastructure")}</p>

          <div
            role="button"
            tabIndex={0}
            onClick={() => toggle("core")}
            onKeyDown={(e) => e.key === 'Enter' && toggle("core")}
            className={`border-2 rounded-full w-[180px] h-[180px] flex flex-col items-center justify-center cursor-pointer transition-all flex-shrink-0 select-none
              ${active === "core"
                ? "border-[#C9A84C] bg-[rgba(201,168,76,0.12)] shadow-lg shadow-[#C9A84C]/15"
                : "border-[#C9A84C]/35 bg-[rgba(201,168,76,0.04)] hover:border-[#C9A84C] hover:shadow-md"
              }`}
          >
            <span className="text-[30px] mb-1">🇲🇦</span>
            <span className="text-[18px] font-bold tracking-tight text-foreground">Build<span className="text-[#C9A84C]">fluence</span></span>
            <span className="text-[8px] text-muted-foreground tracking-[1.5px] uppercase mt-1 text-center leading-snug">Sovereign Decision<br/>Infrastructure</span>
          </div>

          <p className="text-[10px] text-[#C9A84C] tracking-[2px] uppercase opacity-70">↓ Transformation ↓</p>

          {/* Output Box */}
          <div className="w-full bg-card border border-border rounded-xl p-5 min-h-[160px]">
            <p className="text-[13px] font-bold text-[#C9A84C] mb-2">{t("Infrastructure de décision souveraine intégrée", "Integrated sovereign decision infrastructure")}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t("Buildfluence est une infrastructure décisionnelle permanente qui transforme la donnée brute en lucidité décisionnelle opérationnelle, de la collecte à l'influence.", "Buildfluence is a permanent decision infrastructure that transforms raw data into operational decision-making clarity, from collection to influence.")}</p>
            <div className="flex flex-col gap-1.5">
              {outputItems.map((item, i) => (
                <div key={i} className="text-[11px] text-foreground/80 py-1.5 px-2.5 bg-muted rounded border-l-2 border-[#C9A84C]">{item}</div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-[#C9A84C] tracking-[2px] uppercase opacity-70">↓ {t("Diffusion", "Distribution")} ↓</p>
          <p className="text-[10px] text-muted-foreground tracking-wider">{t("Visibilité · Rayonnement · Influence", "Visibility · Outreach · Influence")}</p>
        </div>

        {/* RIGHT — Ecosystem */}
        <div className="flex flex-col relative z-10">
          <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border">Ecosystem</p>
          {destBlocks.map(b => (
            <div
              key={b.id}
              role="button"
              tabIndex={0}
              onClick={() => toggle(b.id)}
              onKeyDown={(e) => e.key === 'Enter' && toggle(b.id)}
              className={`bg-card border rounded-xl p-3.5 cursor-pointer transition-all mb-2.5 select-none relative z-10
                ${active === b.id
                  ? "border-[#1a6b5a]/50 bg-[#1a6b5a]/[0.04] shadow-lg shadow-[#1a6b5a]/10 ring-1 ring-[#1a6b5a]/20"
                  : "border-border hover:border-[#1a6b5a]/40 hover:shadow-md"
                }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg bg-muted flex-shrink-0">{b.icon}</span>
                <div>
                  <h4 className="text-[12px] font-bold text-foreground leading-tight">{b.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{b.sub}</p>
                </div>
              </div>
              {b.desc && <p className="text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>}
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
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-[1600px] mx-auto px-4 md:px-8 mb-6"
          >
            <div className="bg-card border border-[#C9A84C]/30 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#3B82F6] mb-4">{activeDetail.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                {activeDetail.columns.map((col, i) => (
                  <div key={i}>
                    <h4 className="text-[13px] font-bold text-[#C9A84C] mb-2.5">{col.heading}</h4>
                    <ul className="space-y-1">
                      {col.items.map((item, j) => (
                        <li key={j} className="text-xs text-foreground/70 pl-4 relative py-1 border-b border-border/30 leading-relaxed before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-[10px] before:top-1">{item}</li>
                      ))}
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
