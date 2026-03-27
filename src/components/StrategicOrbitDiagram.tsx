import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Data (bilingual) ────────────────────────────────────────────────────────

function getCycleSteps(t: (fr: string, en: string) => string) {
  return [
    {
      id: "step-01", num: "01", label: "Collection", angle: 45, icon: "🌐",
      title: t("Collection & Analyse", "Collection & Analysis"),
      type: t("Capture continue", "Continuous Capture"),
      desc: t(
        "Première étape du cycle : sources captées en continu, données fraîches extraites et analysées. Le moteur couvre l'ensemble de l'écosystème informationnel en temps réel.",
        "First step of the cycle: sources captured continuously, fresh data extracted and analyzed. The engine covers the entire information ecosystem in real time."
      ),
      tags: t("Collection,Extraction,Analyse,Multi-sources,Temps réel", "Collection,Extraction,Analysis,Multi-source,Real-time").split(","),
    },
    {
      id: "step-02", num: "02", label: t("Indexation", "Indexing"), angle: 315, icon: "🔍",
      title: t("Indexation & Classement Sémantique", "Indexing & Semantic Classification"),
      type: t("Traitement automatisé", "Automated Processing"),
      desc: t(
        "La donnée brute est ingérée, débruitée et classée via des modèles sémantiques avancés. Chaque signal pertinent est identifié, balisé et préparé pour l'enrichissement contextuel.",
        "Raw data is ingested, denoised and classified using advanced semantic models. Each relevant signal is identified, tagged and prepared for contextual enrichment."
      ),
      tags: t("Indexation,Filtrage,Classement sémantique,NLP,Extraction", "Indexing,Filtering,Semantic classification,NLP,Extraction").split(","),
    },
    {
      id: "step-03", num: "03", label: t("Cartographie", "Mapping"), angle: 225, icon: "🗂️",
      title: t("Cartographie & Vérification", "Mapping & Verification"),
      type: t("Enrichissement contextuel", "Contextual Enrichment"),
      desc: t(
        "Les données sont mises en contexte, croisées et vérifiées. La cartographie relationnelle révèle les connexions cachées entre acteurs, tendances et signaux faibles.",
        "Data is contextualized, cross-referenced and verified. Relational mapping reveals hidden connections between actors, trends and weak signals."
      ),
      tags: t("Cartographie,Intégration,Vérification,Catégorisation", "Mapping,Integration,Verification,Categorization").split(","),
    },
    {
      id: "step-04", num: "04", label: "Reporting", angle: 135, icon: "📊",
      title: t("Reporting & Data Visualisation", "Reporting & Data Visualization"),
      type: t("Intelligence actionnable", "Actionable Intelligence"),
      desc: t(
        "L'intelligence devient visible. Dashboards dynamiques, rapports exécutifs et visualisations transforment la complexité en clarté décisionnelle pour chaque niveau de l'organisation.",
        "Intelligence becomes visible. Dynamic dashboards, executive reports and visualizations transform complexity into decision-making clarity at every level of the organization."
      ),
      tags: t("Reporting,Dashboards,Data Visualisation,KPIs,Alertes", "Reporting,Dashboards,Data Visualization,KPIs,Alerts").split(","),
    },
  ];
}

function getDomains(t: (fr: string, en: string) => string) {
  return [
    { id: "rp", icon: "📡", short: t("RP & Comm.", "PR & Comm."), angle: 90, title: t("RP & Communication", "PR & Communication"), type: t("Réputation & Influence médiatique", "Reputation & Media Influence"), desc: t("Médias Intelligence, surveillance de la notoriété, gestion des crises et pilotage des campagnes médiatiques. Transformez chaque mention en levier stratégique.", "Media Intelligence, brand monitoring, crisis management and media campaign steering. Turn every mention into a strategic lever."), tags: t("Médias Intelligence,Notoriété,Crises,Campagnes,Newsletter", "Media Intelligence,Brand Awareness,Crises,Campaigns,Newsletter").split(",") },
    { id: "biz", icon: "📈", short: "Business Dev", angle: 45, title: "Business Development", type: t("Croissance & Opportunités", "Growth & Opportunities"), desc: t("Surveillance concurrentielle, identification d'opportunités et d'appels d'offres, veille sur les salons et développement international. Ne manquez plus aucune fenêtre d'entrée.", "Competitive monitoring, opportunity and tender identification, trade show intelligence and international development. Never miss a market entry window."), tags: t("Concurrents,Clients,Partenaires,Opportunités,International", "Competitors,Clients,Partners,Opportunities,International").split(",") },
    { id: "rd", icon: "🔬", short: "R&D", angle: 0, title: t("Recherche & Développement", "Research & Development"), type: t("Innovation & Brevets", "Innovation & Patents"), desc: t("Veille sur les dernières innovations, nouveaux brevets et technologies émergentes. Benchmarkez les meilleures pratiques mondiales pour garder une longueur d'avance décisive.", "Monitor latest innovations, new patents and emerging technologies. Benchmark global best practices to maintain a decisive edge."), tags: t("Innovations,Brevets,Nouvelles Technologies,Best Practices", "Innovations,Patents,Emerging Technologies,Best Practices").split(",") },
    { id: "achat", icon: "🛒", short: t("Achat", "Procurement"), angle: 315, title: t("Achat & Supply", "Procurement & Supply"), type: t("Fournisseurs & Marché", "Suppliers & Market"), desc: t("Intelligence sur les fournisseurs, clients stratégiques et nouveaux produits entrants. Anticipez les évolutions du marché et optimisez votre chaîne de valeur.", "Supplier intelligence, strategic clients and new market entrants. Anticipate market evolution and optimize your value chain."), tags: t("Fournisseurs,Clients,Nouveaux produits,Supply chain", "Suppliers,Clients,New products,Supply chain").split(",") },
    { id: "mkt", icon: "📣", short: "Marketing", angle: 270, title: "Marketing & Consumer Insights", type: t("Marché & Consommateurs", "Market & Consumers"), desc: t("Positionnement stratégique, attentes consommateurs, benchmark marché et mesure d'impact des actions marketing en temps réel. Décidez avec des données, pas des intuitions.", "Strategic positioning, consumer expectations, market benchmarking and real-time marketing impact measurement. Decide with data, not intuition."), tags: t("Positionnement,Attentes consommateurs,Benchmark,Impact Metrics", "Positioning,Consumer expectations,Benchmark,Impact Metrics").split(",") },
    { id: "jur", icon: "⚖️", short: t("Juridique", "Legal"), angle: 225, title: t("Juridique & RH", "Legal & HR"), type: t("Conformité & Compétences", "Compliance & Skills"), desc: t("Veille réglementaire et juridique, suivi des législations et anticipation des évolutions. Identification des nouvelles compétences nécessaires à la transformation.", "Regulatory and legal monitoring, legislation tracking and anticipation. Identification of new skills required for transformation."), tags: t("Réglementation,Veille juridique,Législations,New Skills", "Regulation,Legal monitoring,Legislation,New Skills").split(",") },
    { id: "lob", icon: "🏛️", short: "Lobbying", angle: 180, title: "Lobbying & Public Affairs", type: t("Influence & Diplomatie", "Influence & Diplomacy"), desc: t("Rivalités géopolitiques, political intelligence, cartographie des leaders d'influence et diplomatie économique. Positionnez-vous là où les décisions se prennent réellement.", "Geopolitical rivalries, political intelligence, influence leader mapping and economic diplomacy. Position yourself where decisions are truly made."), tags: t("Géopolitique,Political Intelligence,Diplomatie,Stakeholders", "Geopolitics,Political Intelligence,Diplomacy,Stakeholders").split(",") },
    { id: "cm", icon: "👥", short: "Community", angle: 135, title: "Community Management", type: t("Digital & e-Réputation", "Digital & e-Reputation"), desc: t("Empreinte digitale, e-Réputation, analyse des avis consommateurs et identification des leaders d'opinion. Maîtrisez votre image dans chaque conversation qui vous concerne.", "Digital footprint, e-Reputation, consumer review analysis and opinion leader identification. Master your image in every conversation that concerns you."), tags: t("Empreinte Digitale,e-Réputation,Avis Consommateurs,Activistes", "Digital Footprint,e-Reputation,Consumer Reviews,Activists").split(",") },
  ];
}

function getDefaultPanel(t: (fr: string, en: string) => string) {
  return {
    icon: "⚡",
    title: "Strategic Intelligence Lab",
    type: t("Vue d'ensemble", "Overview"),
    desc: t(
      "Un moteur d'intelligence stratégique en cycle continu : 4 phases de traitement alimentent 8 domaines métiers en simultané. Chaque signal capturé dans l'écosystème devient une décision éclairée en temps réel.",
      "A strategic intelligence engine in continuous cycle: 4 processing phases feed 8 business domains simultaneously. Every signal captured in the ecosystem becomes an informed decision in real time."
    ),
    tags: t("Big Data,Temps réel,8 domaines,4 phases,Intelligence continue", "Big Data,Real-time,8 domains,4 phases,Continuous Intelligence").split(","),
  };
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function polarToPercent(angleDeg: number, radiusPct: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: 50 + radiusPct * Math.cos(rad), y: 50 + radiusPct * Math.sin(rad) };
}

type PanelData = { icon: string; title: string; type: string; desc: string; tags: string[] };

// ─── Component ───────────────────────────────────────────────────────────────

export default function StrategicOrbitDiagram() {
  const { t } = useLanguage();
  const CYCLE_STEPS = getCycleSteps(t);
  const DOMAINS = getDomains(t);
  const DEFAULT_PANEL = getDefaultPanel(t);

  const [selected, setSelected] = useState<{ type: string; id: string } | null>(null);
  const [panel, setPanel] = useState<PanelData>(DEFAULT_PANEL);

  function handleSelect(type: string, data: PanelData, id: string) {
    setSelected({ type, id });
    setPanel(data);
  }

  function isActive(type: string, id: string) {
    return selected?.type === type && selected?.id === id;
  }

  // SVG connectors
  const connectors: React.ReactNode[] = [];
  CYCLE_STEPS.forEach((s) => {
    const p = polarToPercent(s.angle, 20);
    connectors.push(
      <line key={`cs-${s.id}`} x1="50" y1="50" x2={p.x} y2={p.y}
        stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.4" strokeDasharray="1.5 2" />
    );
  });

  DOMAINS.forEach((d, i) => {
    const pInner = polarToPercent(d.angle, 25);
    const pOuter = polarToPercent(d.angle, 40);
    const pMid = polarToPercent(d.angle, 32.5);
    connectors.push(
      <line key={`dl-${d.id}`} x1={pInner.x} y1={pInner.y} x2={pOuter.x} y2={pOuter.y}
        stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.3" />
    );
    connectors.push(
      <circle key={`dp-${d.id}`} cx={pMid.x} cy={pMid.y} r="1.5"
        fill="#0ea5c9" opacity="0.6"
        style={{ animationDelay: `${(i * 0.31).toFixed(2)}s` }}
        className="animate-pulse" />
    );
  });

  return (
    <section className="w-full py-20 px-4 bg-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
          {t("L'intelligence qui transforme la donnée brute en", "The intelligence that transforms raw data into")}{" "}
          <span style={{ color: "#D0A030" }}>{t("décision souveraine", "sovereign decision")}</span>
        </h2>
        <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
          {t("Un moteur de veille stratégique en cycle continu.", "A strategic monitoring engine in continuous cycle.")}<br />
          {t("Explorez les 4 phases et les 8 domaines métiers couverts", "Explore the 4 phases and 8 business domains covered")}
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Detail Panel — LEFT */}
        <div className="w-full md:w-[38%] order-2 md:order-1">
          <div className="rounded-2xl overflow-hidden"
            style={{ border: "0.5px solid rgba(0,0,0,0.08)", background: "#f8fafc" }}>
            <div className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}>
              <span className="text-2xl">{panel.icon}</span>
              <div>
                <p className="font-semibold text-slate-900 text-base">{panel.title}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">{panel.type}</p>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{panel.desc}</p>
              <div className="flex flex-wrap gap-2">
                {panel.tags.map((tag, i) => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full"
                    style={i < 2
                      ? { background: "rgba(14,165,201,0.1)", color: "#0369a1", border: "0.5px solid rgba(14,165,201,0.25)" }
                      : { background: "white", color: "#64748b", border: "0.5px solid rgba(0,0,0,0.1)" }
                    }>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">
            {t("Cliquez sur une phase ou un domaine pour explorer", "Click on a phase or domain to explore")}
          </p>
        </div>

        {/* Orbit — RIGHT */}
        <div className="w-full md:w-[62%] order-1 md:order-2">
          <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
            {/* Rings */}
            {[22, 46, 68, 90].map((size, i) => (
              <div key={i} className="absolute rounded-full" style={{
                width: `${size}%`, height: `${size}%`,
                top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                border: i === 2
                  ? "1px dashed rgba(14,165,201,0.15)"
                  : "0.5px solid rgba(0,0,0,0.06)",
              }} />
            ))}

            {/* SVG connectors */}
            <svg className="absolute inset-0 w-full h-full text-slate-800 pointer-events-none"
              viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {connectors}
            </svg>

            {/* Core */}
            <button
              onClick={() => handleSelect("core", DEFAULT_PANEL, "core")}
              className="absolute rounded-full flex flex-col items-center justify-center z-10 transition-transform duration-300 hover:scale-105"
              style={{
                width: "18%", height: "18%",
                top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                background: "linear-gradient(135deg, #0a2d5e 0%, #0ea5c9 100%)",
                boxShadow: isActive("core", "core")
                  ? "0 0 0 4px rgba(14,165,201,0.3)"
                  : "0 0 0 2px rgba(14,165,201,0.15)",
              }}
            >
              <span className="text-white font-bold text-center leading-tight"
                style={{ fontSize: "clamp(8px, 2.2vw, 14px)", letterSpacing: "0.08em" }}>
                BIG<br />DATA
              </span>
            </button>

            {/* Steps — inner orbit */}
            {CYCLE_STEPS.map((s) => {
              const pos = polarToPercent(s.angle, 20);
              const active = isActive("step", s.id);
              return (
                <button key={s.id}
                  onClick={() => handleSelect("step", { icon: s.icon, title: s.title, type: s.type, desc: s.desc, tags: s.tags }, s.id)}
                  className="absolute flex flex-col items-center justify-center rounded-full z-[8] transition-all duration-200 hover:scale-110"
                  style={{
                    width: "14%", height: "14%",
                    left: `${pos.x}%`, top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: active ? "white" : "#0a2d5e",
                    border: active ? "1.5px solid #0ea5c9" : "1.5px solid #0a2d5e",
                    boxShadow: active ? "0 0 0 3px rgba(14,165,201,0.25)" : "none",
                  }}
                >
                <span className={`font-semibold ${active ? "text-slate-400" : "text-cyan-300/70"}`}
                  style={{ fontSize: "clamp(7px, 1.6vw, 10px)" }}>
                  {s.num}
                </span>
                <span className={`font-semibold text-center leading-tight ${active ? "text-slate-700" : "text-white"}`}
                  style={{ fontSize: "clamp(7px, 1.7vw, 11px)" }}>
                  {s.label}
                </span>
                </button>
              );
            })}

            {/* Domains — outer orbit */}
            {DOMAINS.map((d) => {
              const pos = polarToPercent(d.angle, 41);
              const active = isActive("domain", d.id);
              return (
                <button key={d.id}
                  onClick={() => handleSelect("domain", { icon: d.icon, title: d.title, type: d.type, desc: d.desc, tags: d.tags }, d.id)}
                  className="absolute z-[9] transition-all duration-200 hover:scale-110"
                  style={{ width: "14%", height: "14%", left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center rounded-xl transition-all duration-200"
                    style={{
                      background: active ? "#f0f9ff" : "white",
                      border: active ? "1.5px solid #0ea5c9" : "0.5px solid rgba(0,0,0,0.1)",
                      boxShadow: active ? "0 4px 16px rgba(14,165,201,0.15)" : "0 1px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                  <span style={{ fontSize: "clamp(14px, 3vw, 22px)" }}>{d.icon}</span>
                  <span className="font-semibold text-slate-700 text-center leading-tight mt-0.5 px-1"
                    style={{ fontSize: "clamp(6px, 1.5vw, 10px)" }}>
                    {d.short}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
