import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DetailPageLayout from "@/components/DetailPageLayout";

const CompetitiveVelocityEngine = () => {
  const { t } = useLanguage();
  const [activeSector, setActiveSector] = useState<number | null>(null);

  const sectors = [
    {
      id: 1,
      title: "Décision accélérée",
      icon: "⚡",
      desc: "Hiérarchisation Go/No-Go, réduction de l'incertitude et logique d'action immédiate.",
    },
    {
      id: 2,
      title: "Conflits géopolitiques",
      icon: "🌍",
      desc: "Analyse des risques souverains et des impacts des tensions internationales sur vos actifs.",
    },
    {
      id: 3,
      title: "Market Intelligence",
      icon: "📊",
      desc: "Veille concurrentielle profonde et lecture des stratégies implicites du marché.",
    },
    {
      id: 4,
      title: "Signaux technologiques",
      icon: "💡",
      desc: "Identification des ruptures technologiques et anticipation des nouveaux standards.",
    },
    {
      id: 5,
      title: "Scénarios anticipés",
      icon: "🔮",
      desc: "Modélisation prospective pour ne jamais être pris au dépourvu par le futur.",
    },
    {
      id: 6,
      title: "Écosystème modélisé",
      icon: "🗺️",
      desc: "Mapping complet des acteurs, influenceurs et réseaux de pouvoir de votre secteur.",
    },
  ];

  return (
    <DetailPageLayout
      title="Competitive Velocity Engine"
      subtitle="Une nouvelle génération d'analyse stratégique pour accélérer la prise de décision."
      category="Strategic Innovation"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center bg-white rounded-[50px] shadow-2xl p-8 md:p-16 border border-slate-50 mb-20">
          {/* SVG DE LA ROUE (Ton Code exact) */}
          <div className="lg:col-span-7 flex justify-center lg:scale-110">
            <svg viewBox="0 0 500 500" className="w-full max-w-[480px] drop-shadow-2xl">
              <path
                onClick={() => setActiveSector(1)}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L77,150 A200,200 0 0,1 250,50 Z"
                fill={activeSector === 1 ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <text x="175" y="115" className="fill-white text-[20px] pointer-events-none">
                {" "}
                ⚡{" "}
              </text>
              <text
                x="175"
                y="140"
                className="fill-white font-bold text-[8px] uppercase pointer-events-none"
                textAnchor="middle"
              >
                Décision accélérée
              </text>

              <path
                onClick={() => setActiveSector(2)}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L250,50 A200,200 0 0,1 423,150 Z"
                fill={activeSector === 2 ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <text x="325" y="115" className="fill-white text-[20px] pointer-events-none">
                {" "}
                🌍{" "}
              </text>
              <text
                x="325"
                y="140"
                className="fill-white font-bold text-[8px] uppercase pointer-events-none"
                textAnchor="middle"
              >
                Géopolitique
              </text>

              <path
                onClick={() => setActiveSector(3)}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L423,150 A200,200 0 0,1 423,350 Z"
                fill={activeSector === 3 ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <text x="390" y="240" className="fill-white text-[20px] pointer-events-none">
                {" "}
                📊{" "}
              </text>
              <text
                x="390"
                y="265"
                className="fill-white font-bold text-[8px] uppercase pointer-events-none"
                textAnchor="middle"
              >
                Market Intel
              </text>

              <path
                onClick={() => setActiveSector(4)}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L423,350 A200,200 0 0,1 250,450 Z"
                fill={activeSector === 4 ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <text x="325" y="365" className="fill-white text-[20px] pointer-events-none">
                {" "}
                💡{" "}
              </text>
              <text
                x="325"
                y="390"
                className="fill-white font-bold text-[8px] uppercase pointer-events-none"
                textAnchor="middle"
              >
                Technologie
              </text>

              <path
                onClick={() => setActiveSector(5)}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L250,450 A200,200 0 0,1 77,350 Z"
                fill={activeSector === 5 ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <text x="175" y="365" className="fill-white text-[20px] pointer-events-none">
                {" "}
                🔮{" "}
              </text>
              <text
                x="175"
                y="390"
                className="fill-white font-bold text-[8px] uppercase pointer-events-none"
                textAnchor="middle"
              >
                Scénarios
              </text>

              <path
                onClick={() => setActiveSector(6)}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L77,350 A200,200 0 0,1 77,150 Z"
                fill={activeSector === 6 ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <text x="110" y="240" className="fill-white text-[20px] pointer-events-none">
                {" "}
                🗺️{" "}
              </text>
              <text
                x="110"
                y="265"
                className="fill-white font-bold text-[8px] uppercase pointer-events-none"
                textAnchor="middle"
              >
                Écosystème
              </text>

              <circle cx="250" cy="250" r="60" fill="white" stroke="#1B3E6A" strokeWidth="2" />
              <text
                x="250"
                y="255"
                fill="#1B3E6A"
                fontSize="8"
                fontWeight="900"
                textAnchor="middle"
                className="uppercase"
              >
                Buildfluence
              </text>
            </svg>
          </div>

          {/* PANNEAU D'INFORMATION */}
          <div className="lg:col-span-5 bg-[#F8FAFC] rounded-[35px] p-10 border-l-[10px] border-[#C9A84C] min-h-[450px] flex flex-col justify-center">
            {activeSector ? (
              <div>
                <div className="text-[#C9A84C] font-black uppercase tracking-widest text-[10px] mb-4">
                  Focus Stratégique
                </div>
                <h2 className="text-3xl font-black text-[#1B3E6A] mb-6 uppercase leading-tight">
                  {sectors[activeSector - 1].title}
                </h2>
                <p className="text-slate-600 font-medium text-lg leading-relaxed">{sectors[activeSector - 1].desc}</p>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-black text-[#1B3E6A] mb-4 uppercase">Activez le Moteur</h2>
                <p className="text-slate-500 italic">
                  Cliquez sur un secteur pour explorer les données de votre avantage compétitif.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CARTES DU BAS (Tes données exactes) */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#1B3E6A] p-10 rounded-[40px] text-center text-white border border-slate-700 shadow-xl">
            <div className="text-4xl mb-6">🔬</div>
            <h4 className="font-black uppercase mb-4 tracking-tight">C'est plus qu'une étude</h4>
            <p className="text-slate-300 text-sm italic font-medium">
              Des écosystèmes de décision construits sur mesure, pas des rapports statiques livrés et oubliés.
            </p>
          </div>
          <div className="bg-[#1B3E6A] p-10 rounded-[40px] text-center text-white border border-slate-700 shadow-xl">
            <div className="text-4xl mb-6">📈</div>
            <h4 className="font-black uppercase mb-4 tracking-tight">C'est plus qu'un benchmark</h4>
            <p className="text-slate-300 text-sm italic font-medium">
              Une lecture des stratégies implicites que les données seules ne révèlent jamais.
            </p>
          </div>
          <div className="bg-[#334155] p-10 rounded-[40px] text-center text-white border border-slate-700 shadow-xl">
            <div className="text-4xl mb-6">⚙️</div>
            <h4 className="font-black uppercase mb-4 tracking-tight">C'est un moteur décisionnel</h4>
            <p className="text-slate-300 text-sm italic font-medium mb-6">
              Conçu pour inverser les rapports de force en votre faveur, avant que vos concurrents ne s'en aperçoivent.
            </p>
            <button className="bg-[#C9A84C] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              Activer l'Engine
            </button>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
