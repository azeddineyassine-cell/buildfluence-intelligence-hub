import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DetailPageLayout from "@/components/DetailPageLayout";

const CompetitiveVelocityEngine = () => {
  const { t } = useLanguage();
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const pillars: any = {
    geo: {
      title: "Conflits Géopolitiques",
      sub: "CAPTATION & ANALYSE",
      items: [
        "Surveillance des tensions régionales et alliances émergentes",
        "Détection des ruptures géopolitiques avant médiatisation",
        "Analyse de l'impact sur vos marchés et partenaires stratégiques",
        "Cartographie des acteurs d'influence politique et diplomatique",
        "Anticipation des décisions réglementaires et politiques"
      ]
    },
    eco: {
      title: "Market Intelligence",
      sub: "FLUX & COMPÉTITIVITÉ",
      items: [
        "Suivi des flux d'IDE et des mouvements de capitaux",
        "Analyse des positions concurrentielles par secteur et géographie",
        "Détection des opportunités de marché à fort levier",
        "Benchmarking international des stratégies d'attractivité",
        "Scoring de compétitivité : Go / Vigilance / No-Go"
      ]
    },
    tech: {
      title: "Signaux Technologiques",
      sub: "INNOVATION & DISRUPTION",
      items: [
        "Veille brevets et publications scientifiques sectorielles",
        "Détection des disruptions technologiques avant adoption massive",
        "Cartographie des acteurs de l'innovation dans votre écosystème",
        "Analyse de l'impact technologique sur les rapports de force",
        "Identification des partenariats technologiques stratégiques"
      ]
    },
    sce: {
      title: "Scénarios Anticipés",
      sub: "PROJECTION & ANTICIPATION",
      items: [
        "Modélisation des scénarios probables à 3, 6 et 12 mois",
        "Projection des mouvements concurrentiels avant matérialisation",
        "Simulation d'impact des ruptures géopolitiques sur votre activité",
        "Identification des fenêtres d'opportunité et timing optimal",
        "Plans de contingence pour les scénarios à risque élevé"
      ]
    },
    sys: {
      title: "Écosystème Modélisé",
      sub: "MAPPING & RAPPORTS DE FORCE",
      items: [
        "Mapping évolutif et interactif des acteurs clés",
        "Visualisation des flux et rapports de force dynamiques",
        "Cartographie des alliances, oppositions et neutralités",
        "Identification des nœuds d'amplification et points de levier",
        "Mise à jour en continu selon les signaux captés"
      ]
    },
    dec: {
      title: "Décision Accélérée",
      sub: "OUTPUT & ACTION STRATÉGIQUE",
      items: [
        "Hiérarchisation claire : Go / No-Go / Timing optimal",
        "Réduction drastique de l'incertitude décisionnelle",
        "Passage de l'analyse descriptive à la logique d'action",
        "Livrables actionnables : fiches de synthèse, dashboards, alertes",
        "Briefings C-Level confidentiels en temps réel"
      ]
    }
  };

  return (
    <DetailPageLayout
      title="Competitive Velocity Engine"
      subtitle="Une nouvelle génération d'analyse stratégique pour accélérer la prise de décision."
      category="Strategic Innovation"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center bg-white rounded-[40px] shadow-xl p-8 md:p-12 border border-slate-50">
          
          {/* SVG INTERACTIF */}
          <div className="lg:col-span-7 flex justify-center scale-110">
            <svg viewBox="0 0 500 500" className="w-full max-w-[450px]">
              <g className="cursor-pointer" onClick={() => setActiveSector('geo')}>
                <path d="M250,250 L250,50 A200,200 0 0,1 423,150 Z" fill={activeSector === 'geo' ? '#C9A84C' : '#1B3E6A'} stroke="white" strokeWidth="4" />
                <text x="330" y="115" className="fill-white text-[20px]">🌍</text>
              </g>
              <g className="cursor-pointer" onClick={() => setActiveSector('eco')}>
                <path d="M250,250 L423,150 A200,200 0 0,1 423,350 Z" fill={activeSector === 'eco' ? '#C9A84C' : '#1B3E6A'} stroke="white" strokeWidth="4" />
                <text x="390" y="240" className="fill-white text-[20px]">📊</text>
              </g>
              <g className="cursor-pointer" onClick={() => setActiveSector('tech')}>
                <path d="M250,250 L423,350 A200,200 0 0,1 250,450 Z" fill={activeSector === 'tech' ? '#C9A84C' : '#1B3E6A'} stroke="white" strokeWidth="4" />
                <text x="330" y="365" className="fill-white text-[20px]">💡</text>
              </g>
              <g className="cursor-pointer" onClick={() => setActiveSector('sce')}>
                <path d="M250,250 L250,450 A200,200 0 0,1 77,350 Z" fill={activeSector === 'sce' ? '#C9A84C' : '#1B3E6A'} stroke="white" strokeWidth="4" />
                <text x="170" y="365" className="fill-white text-[20px]">🔮</text>
              </g>
              <g className="cursor-pointer" onClick={() => setActiveSector('sys')}>
                <path d="M250,250 L77,350 A200,200 0 0,1 77,150 Z" fill={activeSector === 'sys' ? '#C9A84C' : '#1B3E6A'} stroke="white" strokeWidth="4" />
                <text x="110" y="240" className="fill-white text-[20px]">🗺️</text>
              </g>
              <g className="cursor-pointer" onClick={() => setActiveSector('dec')}>
                <path d="M250,250 L77,150 A200,200 0 0,1 250,50 Z" fill={activeSector === 'dec' ? '#C9A84C' : '#1B3E6A'} stroke="white" strokeWidth="4" />
                <text x="170" y="115" className="fill-white text-[20px]">⚡</text>
              </g>
              <circle cx="250" cy="250" r="70" fill="white" onClick={() => setActiveSector(null)} className="cursor-pointer" />
              <text x="250" y="255" fill="#1B3E6A" fontSize="8" fontWeight="bold" textAnchor="middle" className="cursor-pointer">BUILDFLUENCE</text>
            </svg>
          </div>

          {/* PANNEAU INFOS */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-8 border-l-8 border-[#C9A84C] min-h-[450px] flex flex-col justify-center">
            {!activeSector ? (
              <div>
                <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest">Dispositif Stratégique</span>
                <h2 className="text-2xl font-black text-[#1B3E6A] mt-2 mb-4 uppercase">Activez le Moteur</h2>
                <p className="text-slate-600 font-medium">Cliquez sur les secteurs pour explorer notre méthodologie.</p>
                <p className="text-[#1B3E6A] font-bold mt-6 italic">"Chaque point est une brique de votre avantage compétitif."</p>
              </div>
            ) : (
              <div>
                <span className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest">{pillars[activeSector].sub}</span>
                <h2 className="text-2xl font-black text-[#1B3E6A] mt-2 mb-6 uppercase">{pillars[activeSector].title}</h2>
                <ul className="space-y-4">
                  {pillars[activeSector].items.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                      <span className="text-[#C9A84C] font-bold">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
