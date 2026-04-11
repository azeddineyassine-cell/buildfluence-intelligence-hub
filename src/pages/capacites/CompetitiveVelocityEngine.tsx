import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";

const CompetitiveVelocityEngine = () => {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const data: Record<string, { sub: string; title: string; list: string[] }> = {
    geo: {
      sub: "Captation & Analyse",
      title: "Conflits Géopolitiques",
      list: [
        "Surveillance des tensions régionales",
        "Détection des ruptures avant médiatisation",
        "Analyse d'impact marchés stratégiques",
        "Cartographie influence diplomatique",
        "Anticipation décisions réglementaires",
      ],
    },
    eco: {
      sub: "Flux & Compétitivité",
      title: "Market Intelligence",
      list: [
        "Suivi des flux d'IDE et capitaux",
        "Analyse positions concurrentielles",
        "Détection opportunités haut levier",
        "Benchmarking attractivité international",
        "Scoring de compétitivité dynamique",
      ],
    },
    tech: {
      sub: "Innovation & Disruption",
      title: "Signaux Technologiques",
      list: [
        "Veille brevets et publications",
        "Détection disruptions émergentes",
        "Cartographie acteurs innovation",
        "Analyse impact rapports de force",
        "Partenariats technologiques clés",
      ],
    },
    sce: {
      sub: "Projection & Anticipation",
      title: "Scénarios Anticipés",
      list: [
        "Modélisation 3, 6 et 12 mois",
        "Projection mouvements concurrentiels",
        "Simulation ruptures géopolitiques",
        "Identification fenêtres opportunité",
        "Plans de contingence stratégiques",
      ],
    },
    sys: {
      sub: "Cartographie & Rapports",
      title: "Écosystème Modélisé",
      list: [
        "Mapping évolutif des acteurs",
        "Visualisation flux et rapports force",
        "Cartographie alliances et oppositions",
        "Identification nœuds d'amplification",
        "Mise à jour selon signaux captés",
      ],
    },
    dec: {
      sub: "Output & Action",
      title: "Décision Accélérée",
      list: [
        "Hiérarchisation Go/No-Go/Timing",
        "Réduction incertitude décisionnelle",
        "Logique d'action vs Description",
        "Livrables : Fiches, Dashboards",
        "Briefings C-Level en temps réel",
      ],
    },
  };

  return (
    <DetailPageLayout>
      <div className="w-full max-w-[1200px] mx-auto px-6 py-12">
        {/* NOUVELLE ENTÊTE (STYLE IMAGE 06541d) */}
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] text-[#C9A84C] bg-white border border-slate-100 rounded-full shadow-sm uppercase">
            Strategic Innovation
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1B3E6A] mb-6 tracking-tight">
            COMPETITIVE <span className="text-[#C9A84C]">VELOCITY</span> ENGINE
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des
            environnements concurrentiels et hyper-complexes.
          </p>
        </header>

        {/* SECTION ENGINE */}
        <div className="grid lg:grid-cols-2 gap-10 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl items-center mb-16 border border-slate-50">
          <div className="relative flex justify-center">
            <svg viewBox="0 0 500 500" className="w-full max-w-[450px] drop-shadow-2xl">
              <g onClick={() => setActiveSector("geo")} className="cursor-pointer">
                <path
                  d="M250,250 L250,50 A200,200 0 0,1 423,150 Z"
                  fill={activeSector === "geo" ? "#C9A84C" : "#1B3E6A"}
                  stroke="#FFF"
                  strokeWidth="3"
                />
                <text x="330" y="115" fill="white" fontSize="24" textAnchor="middle">
                  🌍
                </text>
                <text x="330" y="140" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                  GÉOPOLITIQUE
                </text>
              </g>
              <g onClick={() => setActiveSector("eco")} className="cursor-pointer">
                <path
                  d="M250,250 L423,150 A200,200 0 0,1 423,350 Z"
                  fill={activeSector === "eco" ? "#C9A84C" : "#1B3E6A"}
                  stroke="#FFF"
                  strokeWidth="3"
                />
                <text x="400" y="240" fill="white" fontSize="24" textAnchor="middle">
                  📊
                </text>
                <text x="400" y="265" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                  MARKET INTEL
                </text>
              </g>
              <g onClick={() => setActiveSector("tech")} className="cursor-pointer">
                <path
                  d="M250,250 L423,350 A200,200 0 0,1 250,450 Z"
                  fill={activeSector === "tech" ? "#C9A84C" : "#1B3E6A"}
                  stroke="#FFF"
                  strokeWidth="3"
                />
                <text x="330" y="375" fill="white" fontSize="24" textAnchor="middle">
                  💡
                </text>
                <text x="330" y="400" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                  TECHNOLOGIE
                </text>
              </g>
              <g onClick={() => setActiveSector("sce")} className="cursor-pointer">
                <path
                  d="M250,250 L250,450 A200,200 0 0,1 77,350 Z"
                  fill={activeSector === "sce" ? "#C9A84C" : "#1B3E6A"}
                  stroke="#FFF"
                  strokeWidth="3"
                />
                <text x="170" y="375" fill="white" fontSize="24" textAnchor="middle">
                  🔮
                </text>
                <text x="170" y="400" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                  SCÉNARIOS
                </text>
              </g>
              <g onClick={() => setActiveSector("sys")} className="cursor-pointer">
                <path
                  d="M250,250 L77,350 A200,200 0 0,1 77,150 Z"
                  fill={activeSector === "sys" ? "#C9A84C" : "#1B3E6A"}
                  stroke="#FFF"
                  strokeWidth="3"
                />
                <text x="110" y="240" fill="white" fontSize="24" textAnchor="middle">
                  🗺️
                </text>
                <text x="110" y="265" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                  ÉCOSYSTÈME
                </text>
              </g>
              <g onClick={() => setActiveSector("dec")} className="cursor-pointer">
                <path
                  d="M250,250 L77,150 A200,200 0 0,1 250,50 Z"
                  fill={activeSector === "dec" ? "#C9A84C" : "#1B3E6A"}
                  stroke="#FFF"
                  strokeWidth="3"
                />
                <text x="170" y="115" fill="white" fontSize="24" textAnchor="middle">
                  ⚡
                </text>
                <text x="170" y="140" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                  DÉCISION
                </text>
              </g>
              <circle
                cx="250"
                cy="250"
                r="72"
                fill="white"
                stroke="#1B3E6A"
                strokeWidth="1"
                onClick={() => setActiveSector(null)}
              />
              <text
                x="250"
                y="255"
                fill="#1B3E6A"
                fontSize="8"
                fontWeight="900"
                textAnchor="middle"
                className="pointer-events-none uppercase"
              >
                Buildfluence
              </text>
            </svg>
          </div>

          <div className="bg-[#F8FAFC] p-10 rounded-[30px] border-l-[8px] border-[#C9A84C] min-h-[450px] flex flex-col justify-center shadow-inner">
            {activeSector ? (
              <div className="animate-in fade-in duration-300">
                <span className="text-[#C9A84C] font-bold uppercase text-xs tracking-widest mb-4 block">
                  {data[activeSector].sub}
                </span>
                <h2 className="text-3xl font-black text-[#1B3E6A] uppercase mb-6 leading-tight">
                  {data[activeSector].title}
                </h2>
                <ul className="space-y-4">
                  {data[activeSector].list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                      <span className="text-[#C9A84C] font-black">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center animate-in fade-in">
                <h2 className="text-3xl font-black text-[#1B3E6A] uppercase mb-4 tracking-tighter">
                  Activez le Moteur
                </h2>
                <p className="text-slate-500 font-medium italic mb-6">
                  Cliquez sur un secteur du cercle pour explorer notre méthodologie.
                </p>
                <div className="pt-6 border-t border-slate-200 italic text-slate-400 text-sm">
                  Résultats conformes aux attentes clients multi-sectoriels.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CARTES DU BAS #1c75ba */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🔬",
              title: "C'est plus qu'une étude",
              text: "Des écosystèmes de décision construits sur mesure.",
            },
            {
              icon: "📈",
              title: "C'est plus qu'un benchmark",
              text: "Une lecture des stratégies implicites invisibles.",
            },
            {
              icon: "⚙️",
              title: "C'est un moteur décisionnel",
              text: "Inverser les rapports de force en votre faveur.",
            },
          ].map((card, i) => (
            <div key={i} className="bg-[#1c75ba] p-10 rounded-[40px] text-center text-white shadow-xl">
              <div className="text-4xl mb-6">{card.icon}</div>
              <h4 className="font-black uppercase mb-4 tracking-tight">{card.title}</h4>
              <p className="text-slate-100 text-sm italic leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
