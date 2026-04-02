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
  };

  const sourceBlocks = [
    { id: "veille" as BlockId, icon: "🔭", color: "#103E8C", label: t("Veille & Intelligence Stratégique", "Strategic Watch & Intelligence"), desc: t("Le moteur d'intelligence opère dans 6 espaces et extrait les interactions informationnelles.", "The intelligence engine operates in 6 spaces and extracts informational interactions."), tags: [t("Organisations", "Organizations"), t("Lieux", "Places"), t("Personnes clés", "Key people"), t("Concepts macro", "Macro concepts"), t("Produits", "Products"), t("Événements", "Events")] },
    { id: "duediligence" as BlockId, icon: "🔍", color: "#1a5580", label: t("Due Diligence Advanced", "Advanced Due Diligence"), desc: t("Analyse approfondie des parties prenantes et des risques cachés : 3 niveaux d'investigation.", "In-depth analysis of stakeholders and hidden risks: 3 levels of investigation."), tags: ["EU Sanctions Map", "PitchBook", "ICIJ", "OpenCorporates"] },
    { id: "bi" as BlockId, icon: "📊", color: "#1a6b5a", label: t("Business Intelligence", "Business Intelligence"), desc: t("Sources de référence internationale pour l'analyse économique et sectorielle.", "International reference sources for economic and sector analysis."), tags: ["Growth Lab", "Statista", "fDi Intelligence", "Factiva", "World Bank"] },
    { id: "humint" as BlockId, icon: "🧠", color: "#c0392b", label: t("HumInt : Intelligence Humaine", "HumInt: Human Intelligence"), desc: t("Le renseignement humain que les outils ne peuvent pas remplacer.", "Human intelligence that tools cannot replace."), tags: [t("Analystes terrain", "Field analysts"), t("Réseau diplomatique", "Diplomatic network"), t("Sources primaires", "Primary sources")], isHumint: true },
  ];

  const destBlocks = [
    { id: "amdie" as BlockId, icon: "🏛", title: "AMDIE / MICEPP", sub: t("Agence de l'investissement & Ministère", "Investment Agency & Ministry"), desc: t("Site statique institutionnel. Aucune Newsletter externe pour des acteurs clés.", "Static institutional site. No external newsletter for key actors.") },
    { id: "gouv" as BlockId, icon: "🇲🇦", title: t("Gouvernement Marocain", "Moroccan Government"), sub: t("Agences d'État & Instances publiques", "State Agencies & Public Bodies"), desc: t("Pilotage des politiques publiques avec une longueur d'avance stratégique.", "Steering public policies with a strategic head start.") },
    { id: "federations" as BlockId, icon: "🤝", title: t("Fédérations Sectorielles", "Sector Federations"), sub: t("Partenaires & Entreprises stratégiques", "Partners & Strategic Companies"), desc: "CGEM, ASMEX, FENAGRI, AMIT, UNICOP, AMICA" },
    { id: "api" as BlockId, icon: "🌐", title: t("Agence de Promotion des Investissements", "Investment Promotion Agency"), sub: t("IDE & Attractivité internationale", "FDI & International Attractiveness"), desc: t("Création d'un Observatoire de l'investissement.", "Creation of an investment observatory.") },
    { id: "pays" as BlockId, icon: "🗺", title: t("Pays Clés", "Key Countries"), sub: t("Partenariats solides & innovants", "Solid & innovative partnerships"), desc: "", flags: ["🇫🇷","🇯🇵","🇺🇸","🇬🇧","🇩🇪","🇨🇳","🇧🇪","🇳🇱","🇪🇸","🇰🇷"] },
    { id: "cooperation" as BlockId, icon: "🌍", title: t("Coopération Internationale", "International Cooperation"), sub: t("Financeurs de projets & missions", "Project funders & missions"), desc: "", tags: ["GIZ","AFD","JICA","USAID","BEI","PNUD","Banque Mondiale","BERD","IsDB"] },
    { id: "medias" as BlockId, icon: "📡", title: t("Médias & Prescripteurs", "Media & Prescribers"), sub: t("Leaders d'Opinion · Diaspora · Journalistes", "Opinion Leaders · Diaspora · Journalists"), desc: t("Positionnement comme source d'autorité.", "Positioning as an authority source.") },
  ];

  const outputItems = [
    t("Croisement OSINT + HumInt + Business Intelligence", "OSINT + HumInt + Business Intelligence cross-referencing"),
    t("Veille / IA augmentée en continu", "Continuously augmented AI watch"),
    t("Scoring Go / Vigilance / No-Go", "Go / Caution / No-Go scoring"),
    t("Dashboards & DataViz actionnables", "Actionable dashboards & DataViz"),
  ];

  const activeDetail = active && details[active] ? details[active] : null;

  return (
    <section className="py-8">
      {/* Hero */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t("Mécanisme de ", "Mechanism of ")}<span className="text-[#C9A84C]">{t("Rayonnement", "Outreach")}</span>{t(" & d'Attractivité", " & Attractiveness")}
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
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 max-w-[1360px] mx-auto px-4 md:px-8 mb-4">
        {/* LEFT — Back-Office */}
        <div className="flex flex-col">
          <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border">Back-Office</p>
          {sourceBlocks.map(b => (
            <div
              key={b.id}
              onClick={() => toggle(b.id)}
              className={`bg-card border rounded-xl p-4 cursor-pointer transition-all mb-2.5 ${active === b.id ? "border-[#C9A84C]/50 shadow-md" : b.isHumint ? "border-red-200 hover:border-red-400/40" : "border-border hover:border-[#C9A84C]/50"}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: `${b.color}15` }}>{b.icon}</span>
                <h3 className={`text-xs font-bold ${b.isHumint ? "text-red-600" : "text-foreground"}`}>{b.label}</h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-1.5">{b.desc}</p>
              <div className="flex flex-wrap gap-1">
                {b.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border w-full">{t("Infrastructure Décisionnelle", "Decision Infrastructure")}</p>

          <div
            onClick={() => toggle("core")}
            className={`border-2 rounded-full w-[170px] h-[170px] flex flex-col items-center justify-center cursor-pointer transition-all flex-shrink-0 ${active === "core" ? "border-[#C9A84C] bg-[rgba(201,168,76,0.1)]" : "border-[#C9A84C]/35 bg-[rgba(201,168,76,0.04)] hover:border-[#C9A84C]"}`}
          >
            <span className="text-[28px] mb-1">🇲🇦</span>
            <span className="text-[17px] font-bold tracking-tight text-foreground">Build<span className="text-[#C9A84C]">fluence</span></span>
            <span className="text-[8px] text-muted-foreground tracking-[1.5px] uppercase mt-1 text-center leading-snug">Sovereign Decision<br/>Infrastructure</span>
          </div>

          <p className="text-[10px] text-[#C9A84C] tracking-[2px] uppercase opacity-70">↓ Transformation ↓</p>

          {/* Output Box */}
          <div className="w-full bg-card border border-border rounded-xl p-5 min-h-[160px]">
            <p className="text-[13px] font-bold text-[#C9A84C] mb-2">{t("Infrastructure de décision souveraine intégrée", "Integrated sovereign decision infrastructure")}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t("Buildfluence est une infrastructure décisionnelle permanente qui transforme la donnée brute en lucidité décisionnelle opérationnelle.", "Buildfluence is a permanent decision infrastructure that transforms raw data into operational decision-making clarity.")}</p>
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
        <div className="flex flex-col">
          <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-muted-foreground text-center mb-3 pb-2 border-b border-border">Ecosystem</p>
          {destBlocks.map(b => (
            <div
              key={b.id}
              onClick={() => toggle(b.id)}
              className={`bg-card border rounded-xl p-3 cursor-pointer transition-all mb-2.5 ${active === b.id ? "border-[#1a6b5a]/40 bg-[#1a6b5a]/[0.03]" : "border-border hover:border-[#1a6b5a]/40"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-base bg-muted">{b.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{b.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{b.sub}</p>
                </div>
              </div>
              {b.desc && <p className="text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>}
              {b.flags && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {b.flags.map((f, i) => <span key={i} className="text-lg leading-none p-0.5">{f}</span>)}
                </div>
              )}
              {b.tags && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {b.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/50 font-semibold">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {activeDetail && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="max-w-[1360px] mx-auto px-4 md:px-8 mb-6"
          >
            <div className="bg-card border border-[#C9A84C]/25 rounded-xl p-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 max-w-[1360px] mx-auto px-4 md:px-8">
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Strategic Workflow : Veille & Intelligence", "Strategic Workflow: Watch & Intelligence")}</p>
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Infrastructure Décisionnelle Souveraine", "Sovereign Decision Infrastructure")}</p>
        <p className="text-[10px] tracking-[2px] uppercase text-muted-foreground/60 text-center pt-2 border-t border-border/50">{t("Diffusion : Inter & Intra — National & International", "Distribution: Inter & Intra — National & International")}</p>
      </div>
    </section>
  );
};

export default RayonnementMechanism;
