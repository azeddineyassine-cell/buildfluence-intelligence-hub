import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DetailPageLayout from "@/components/DetailPageLayout";

interface SectorData {
  id: string;
  label: string;
  icon: string;
  color: string;
  title: string;
  desc: string;
  tags: string[];
}

const CompetitiveVelocityEngine = () => {
  const { t } = useLanguage();
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const sectors: SectorData[] = [
    {
      id: "decision", label: t("Décision accélérée", "Accelerated decision"), icon: "⚡",
      color: "#1B3E6A",
      title: t("Décision accélérée", "Accelerated Decision"),
      desc: t("Raccourcir le cycle décisionnel grâce à une intelligence concurrentielle consolidée et hiérarchisée. Chaque signal est traduit en recommandation Go / Vigilance / No-Go.", "Shorten the decision cycle with consolidated and prioritized competitive intelligence. Every signal is translated into Go / Caution / No-Go recommendation."),
      tags: [t("Scoring", "Scoring"), t("Temps réel", "Real-time"), "Go/No-Go"],
    },
    {
      id: "geopolitique", label: t("Conflits géopolitiques", "Geopolitical conflicts"), icon: "🌍",
      color: "#2d5a3d",
      title: t("Conflits géopolitiques", "Geopolitical Conflicts"),
      desc: t("Cartographie des tensions géopolitiques impactant votre secteur. Anticipation des embargos, sanctions et repositionnements stratégiques des puissances.", "Mapping of geopolitical tensions impacting your sector. Anticipation of embargoes, sanctions and strategic repositioning of powers."),
      tags: [t("Géopolitique", "Geopolitics"), t("Sanctions", "Sanctions"), t("Risques pays", "Country risks")],
    },
    {
      id: "market", label: "Market Intelligence", icon: "📊",
      color: "#1a5580",
      title: "Market Intelligence",
      desc: t("Analyse des dynamiques de marché, des flux d'investissement et des stratégies concurrentielles. Identification des axes de différenciation et des opportunités de positionnement.", "Market dynamics analysis, investment flows and competitive strategies. Identification of differentiation axes and positioning opportunities."),
      tags: [t("Marché", "Market"), t("Flux IDE", "FDI flows"), "Benchmark"],
    },
    {
      id: "techno", label: t("Signaux technologiques", "Technology signals"), icon: "💡",
      color: "#7a3060",
      title: t("Signaux technologiques", "Technology Signals"),
      desc: t("Détection des innovations de rupture, brevets émergents et startups disruptives. Veille sur les technologies susceptibles de transformer votre secteur.", "Detection of breakthrough innovations, emerging patents and disruptive startups. Monitoring technologies that could transform your sector."),
      tags: [t("Brevets", "Patents"), t("Startups", "Startups"), t("Innovation", "Innovation")],
    },
    {
      id: "scenarios", label: t("Scénarios anticipés", "Anticipated scenarios"), icon: "🔮",
      color: "#4a3580",
      title: t("Scénarios anticipés", "Anticipated Scenarios"),
      desc: t("Modélisation de scénarios prospectifs pour chaque secteur prioritaire. Simulation des impacts concurrentiels et identification des fenêtres d'opportunité.", "Prospective scenario modeling for each priority sector. Simulation of competitive impacts and identification of opportunity windows."),
      tags: [t("Prospective", "Foresight"), t("Simulation", "Simulation"), t("Scénarios", "Scenarios")],
    },
    {
      id: "ecosysteme", label: t("Écosystème modélisé", "Modeled ecosystem"), icon: "🌐",
      color: "#334155",
      title: t("Écosystème modélisé", "Modeled Ecosystem"),
      desc: t("Cartographie complète de votre écosystème concurrentiel : acteurs, alliances, rivalités et dynamiques de pouvoir. Vision 360° de votre environnement stratégique.", "Complete mapping of your competitive ecosystem: actors, alliances, rivalries and power dynamics. 360° view of your strategic environment."),
      tags: [t("Cartographie", "Mapping"), t("Acteurs", "Actors"), t("Alliances", "Alliances")],
    },
  ];

  const active = sectors.find(s => s.id === activeSector) || null;

  const defaultPanel = {
    title: t("Activez le Moteur", "Activate the Engine"),
    desc: t("Cliquez sur les secteurs du cercle pour explorer notre méthodologie d'Étude, d'Analyse et Benchmark.", "Click on the circle sectors to explore our Study, Analysis and Benchmark methodology."),
    quote: t("\"Chaque point est une brique de votre avantage compétitif.\"", "\"Each point is a building block of your competitive advantage.\""),
    footer: t("Notre Track Record est multi sectoriel avec des résultats conformes aux attentes clients.", "Our Track Record is multi-sectoral with results meeting client expectations."),
  };

  return (
    <DetailPageLayout
      title={<>COMPETITIVE <span className="text-[#C9A84C]">VELOCITY</span> ENGINE</>}
      titleClassName="text-center"
      chapeau={t(
        "Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des environnements concurrentiels et hyper-complexes.",
        "A new generation of strategic analysis, designed to accelerate decision-making in competitive and hyper-complex environments."
      )}
      chapeauClassName="text-center"
      ctas={[{ label: t("Échange Stratégique →", "Strategic Exchange →"), action: "#", formType: "f1" }]}
    >
      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {["Benchmark", t("Analyse", "Analysis"), t("Anticipation", "Anticipation"), t("Décision", "Decision")].map(tag => (
          <span key={tag} className="bg-[#C9A84C] text-white px-8 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20">{tag}</span>
        ))}
      </div>

      {/* Interactive Wheel + Panel */}
      <div className="grid lg:grid-cols-12 gap-10 items-center bg-white rounded-[50px] shadow-2xl shadow-slate-200/50 p-8 md:p-16 border border-slate-50 mb-20">
        {/* SVG Wheel */}
        <div className="lg:col-span-7 flex justify-center lg:scale-110">
          <svg viewBox="0 0 500 500" className="w-full max-w-[480px] drop-shadow-2xl">
            {sectors.map((sector, i) => {
              const angle = (i * 60) - 90;
              const endAngle = angle + 60;
              const startRad = (angle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const cx = 250, cy = 250, r = 200;
              const x1 = cx + r * Math.cos(startRad);
              const y1 = cy + r * Math.sin(startRad);
              const x2 = cx + r * Math.cos(endRad);
              const y2 = cy + r * Math.sin(endRad);

              const midAngle = ((angle + 30) * Math.PI) / 180;
              const labelR = 130;
              const lx = cx + labelR * Math.cos(midAngle);
              const ly = cy + labelR * Math.sin(midAngle);

              const isActive = activeSector === sector.id;

              return (
                <g key={sector.id}
                  className="cursor-pointer transition-all duration-200"
                  style={{ filter: isActive ? "brightness(1.2)" : "none" }}
                  onClick={() => setActiveSector(prev => prev === sector.id ? null : sector.id)}
                >
                  <path
                    d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
                    fill={sector.color}
                    stroke="white"
                    strokeWidth="3"
                    className="hover:brightness-110 transition-all"
                  />
                  <text x={lx} y={ly - 10} textAnchor="middle" dominantBaseline="central" className="fill-white" style={{ fontSize: "20px" }}>{sector.icon}</text>
                  <text x={lx} y={ly + 12} textAnchor="middle" dominantBaseline="central" className="fill-white font-bold" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "-0.02em" }}>{sector.label}</text>
                </g>
              );
            })}
            {/* Center */}
            <circle cx="250" cy="250" r="55" fill="#F8FAFC" stroke="#C9A84C" strokeWidth="3" />
            <text x="250" y="242" textAnchor="middle" dominantBaseline="central" className="fill-[#1B3E6A] font-black" style={{ fontSize: "11px" }}>Buildfluence</text>
            <text x="250" y="260" textAnchor="middle" dominantBaseline="central" className="fill-[#C9A84C] font-bold" style={{ fontSize: "7px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Velocity Engine</text>
          </svg>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-5 bg-[#F8FAFC] rounded-[35px] p-10 border-l-[10px] border-[#C9A84C] min-h-[520px] flex flex-col justify-center">
          {active ? (
            <div>
              <div className="text-[#C9A84C] font-black uppercase tracking-widest text-[10px] mb-4">{t("Analyse Stratégique", "Strategic Analysis")}</div>
              <h2 className="text-2xl font-black text-[#1B3E6A] mb-4 leading-tight uppercase">{active.icon} {active.title}</h2>
              <p className="text-slate-600 mb-6 font-medium leading-relaxed">{active.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {active.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white text-slate-600 border border-slate-200">{tag}</span>
                ))}
              </div>
              <button onClick={() => setActiveSector(null)} className="text-[11px] text-slate-400 border border-slate-200 px-4 py-1.5 rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">{t("Retour", "Back")} ✕</button>
            </div>
          ) : (
            <div>
              <div className="text-[#C9A84C] font-black uppercase tracking-widest text-[10px] mb-4">{t("Dispositif Stratégique", "Strategic Framework")}</div>
              <h2 className="text-3xl font-black text-[#1B3E6A] mb-6 leading-tight uppercase">{defaultPanel.title}</h2>
              <p className="text-slate-600 mb-6 font-medium leading-relaxed">{defaultPanel.desc}</p>
              <p className="text-[#1B3E6A] font-bold text-lg mb-6 italic">{defaultPanel.quote}</p>
              <div className="text-slate-400 text-sm border-t border-slate-200 pt-6 font-medium italic">{defaultPanel.footer}</div>
            </div>
          )}
        </div>
      </div>

      {/* 3 Bottom Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-[#1B3E6A] p-12 rounded-[40px] text-center border border-slate-100 shadow-xl">
          <div className="text-4xl mb-8">🔬</div>
          <h4 className="text-lg font-black text-white uppercase mb-5 tracking-tight">{t("C'est plus qu'une étude", "It's more than a study")}</h4>
          <p className="text-slate-300 font-medium italic leading-relaxed">{t("Des écosystèmes de décision construits sur mesure, pas des rapports statiques livrés et oubliés.", "Custom-built decision ecosystems, not static reports delivered and forgotten.")}</p>
        </div>
        <div className="bg-[#1B3E6A] p-12 rounded-[40px] text-center border border-slate-100 shadow-xl">
          <div className="text-4xl mb-8">📈</div>
          <h4 className="text-lg font-black text-white uppercase mb-5 tracking-tight">{t("C'est plus qu'un benchmark", "It's more than a benchmark")}</h4>
          <p className="text-slate-300 font-medium italic leading-relaxed">{t("Une lecture des stratégies implicites que les données seules ne révèlent jamais.", "A reading of implicit strategies that data alone never reveals.")}</p>
        </div>
        <div className="bg-[#334155] p-12 rounded-[40px] text-center border border-slate-100 shadow-xl">
          <div className="text-4xl mb-8">⚙️</div>
          <h4 className="text-lg font-black text-white uppercase mb-5 tracking-tight">{t("C'est un moteur décisionnel", "It's a decision engine")}</h4>
          <p className="text-slate-300 font-medium italic leading-relaxed mb-8">{t("Conçu pour inverser les rapports de force en votre faveur, avant que vos concurrents ne s'en aperçoivent.", "Designed to reverse power dynamics in your favor, before your competitors even notice.")}</p>
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
