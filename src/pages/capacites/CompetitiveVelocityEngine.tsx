import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";
import { ArrowRight } from "lucide-react"; // Import de l'icône pour le CTA

const CompetitiveVelocityEngine = () => {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const data: Record<string, { sub: string; title: string; list: string[] }> = {
    geo: {
      sub: "Captation & Analyse",
      title: "Conflits géopolitiques",
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
      title: "Market intelligence",
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
      title: "Signaux technologiques",
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
      title: "Scénarios anticipés",
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
      title: "Écosystème modélisé",
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
      title: "Décision accélérée",
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
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-4 pb-12 font-['Inter',sans-serif]">
        {/* HEADER */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B3E6A] mb-6 tracking-tight leading-tight">
            Competitive <span className="text-[#C9A84C]">velocity</span> engine
          </h1>
          <p className="text-md md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des
            environnements concurrentiels et hyper-complexes.
          </p>

          {/* LES 4 TAGS */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Benchmark", "Analyse", "Anticipation", "Décision"].map((tag) => (
              <span
                key={tag}
                className="px-6 py-2 bg-[#C9A84C] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* ENGINE SECTION */}
        <div className="grid lg:grid-cols-2 gap-10 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl items-center mb-16 border border-slate-50">
          <div className="relative flex justify-center">
            <svg viewBox="0 0 500 500" className="w-full max-w-[420px] drop-shadow-2xl">
              {/* SECTEURS AVEC TITRES EN MAJUSCULE */}
              <g onClick={() => setActiveSector("geo")} className="cursor-pointer">
                <path
                  d="M250,250 L250,50 A200,200 0 0,1 423,150 Z"
                  fill={activeSector === "geo" ? "#C9A84C" : "#1B3E6A"}
                  stroke="#FFF"
                  strokeWidth="3"
                />
                <text x="330" y="115" fill="white" fontSize="22" textAnchor="middle">
                  🌍
                </text>
                <text x="330" y="140" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
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
                <text x="400" y="240" fill="white" fontSize="22" textAnchor="middle">
                  📊
                </text>
                <text x="400" y="265" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
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
                <text x="330" y="375" fill="white" fontSize="22" textAnchor="middle">
                  💡
                </text>
                <text x="330" y="400" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
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
                <text x="170" y="375" fill="white" fontSize="22" textAnchor="middle">
                  🔮
                </text>
                <text x="170" y="400" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
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
                <text x="110" y="240" fill="white" fontSize="22" textAnchor="middle">
                  🗺️
                </text>
                <text x="110" y="265" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
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
                <text x="170" y="115" fill="white" fontSize="22" textAnchor="middle">
                  ⚡
                </text>
                <text x="170" y="140" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
                  DÉCISION
                </text>
              </g>
              <circle
                cx="250"
                cy="250"
                r="72"
                fill="white"
                stroke="#F1F5F9"
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
                className="uppercase tracking-tighter"
              >
                Buildfluence
              </text>
            </svg>
          </div>

          <div className="bg-[#F8FAFC] p-10 rounded-[30px] border-l-[8px] border-[#C9A84C] min-h-[420px] flex flex-col justify-center">
            {activeSector ? (
              <div className="animate-in fade-in duration-300">
                <span className="text-[#C9A84C] font-bold text-xs tracking-widest mb-3 block uppercase">
                  {data[activeSector].sub}
                </span>
                <h2 className="text-3xl font-bold text-[#1B3E6A] mb-6 leading-tight">{data[activeSector].title}</h2>
                <ul className="space-y-4">
                  {data[activeSector].list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm leading-relaxed">
                      <span className="text-[#C9A84C] font-black">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#1B3E6A] mb-4">Activez le moteur</h2>
                <p className="text-slate-500 font-medium italic text-sm">
                  Cliquez sur un secteur du cercle pour explorer notre méthodologie.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CARTES ET CTA FINAL */}
        <div className="space-y-16">
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
              <div
                key={i}
                className="bg-[#1c75ba] p-10 rounded-[40px] text-center text-white shadow-lg transition-transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-6">{card.icon}</div>
                <h4 className="font-bold mb-4 text-lg">{card.title}</h4>
                <p className="text-slate-100 text-sm italic leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          {/* BOUTON CTA STYLISÉ (Image 06d3d6) */}
          <div className="flex justify-center mt-12">
            <button className="group bg-[#1B3E6A] hover:bg-[#C9A84C] text-white px-10 py-5 rounded-full flex items-center gap-4 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95">
              <span className="font-black uppercase tracking-[0.15em] text-sm">
                Activez votre Competitive Velocity Engine
              </span>
              <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                <ArrowRight size={20} className="text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
