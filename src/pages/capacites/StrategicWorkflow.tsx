import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DetailPageLayout from "@/components/DetailPageLayout";

const CompetitiveVelocityEngine = () => {
  const { t } = useLanguage();
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const data = {
    geo: {
      sub: "Analyse des Risques",
      title: "Conflits Géopolitiques",
      list: [
        "Analyse tensions internationales",
        "Risques souverains & actifs",
        "Impacts chaînes de valeur",
        "Prospective zones instables",
        "Cartographie des acteurs étatiques",
      ],
    },
    mkt: {
      sub: "Competitive Monitoring",
      title: "Market Intelligence",
      list: [
        "Veille concurrentielle profonde",
        "Analyse stratégies implicites",
        "Parts de marché & positionnement",
        "Benchmark offres & prix",
        "Signaux faibles sectoriels",
      ],
    },
    tec: {
      sub: "Innovation Watch",
      title: "Signaux Technologiques",
      list: [
        "Ruptures technologiques IA/Data",
        "Mapping brevets & R&D",
        "Standards émergents",
        "Analyse maturité solutions",
        "Veille deep-tech & hardware",
      ],
    },
    sce: {
      sub: "Strategic Vision",
      title: "Scénarios Anticipés",
      list: [
        "Modélisation prospective",
        "Analyse de sensibilité",
        "Scénarios noir/gris/rose",
        "Aide à la planification",
        "War Gaming & Simulations",
      ],
    },
    eco: {
      sub: "Network Mapping",
      title: "Écosystème Modélisé",
      list: [
        "Mapping influenceurs & réseaux",
        "Analyse alliances et oppositions",
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
    <DetailPageLayout
      title="Competitive Velocity Engine"
      subtitle="Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision."
      category="Strategic Innovation"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[50px] shadow-2xl p-8 md:p-16 border border-slate-50 grid lg:grid-cols-12 gap-12 items-center mb-20">
          {/* CERCLE INTERACTIF (SVG adapté de votre doc) */}
          <div className="lg:col-span-7 flex justify-center">
            <svg viewBox="0 0 500 500" className="w-full max-w-[450px] drop-shadow-xl">
              <path
                onClick={() => setActiveSector("dec")}
                className="cursor-pointer transition-all hover:brightness-110"
                d="M250,250 L77,150 A200,200 0 0,1 250,50 Z"
                fill={activeSector === "dec" ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <path
                onClick={() => setActiveSector("geo")}
                className="cursor-pointer transition-all hover:brightness-110"
                d="M250,250 L250,50 A200,200 0 0,1 423,150 Z"
                fill={activeSector === "geo" ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <path
                onClick={() => setActiveSector("mkt")}
                className="cursor-pointer transition-all hover:brightness-110"
                d="M250,250 L423,150 A200,200 0 0,1 423,350 Z"
                fill={activeSector === "mkt" ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <path
                onClick={() => setActiveSector("tec")}
                className="cursor-pointer transition-all hover:brightness-110"
                d="M250,250 L423,350 A200,200 0 0,1 250,450 Z"
                fill={activeSector === "tec" ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <path
                onClick={() => setActiveSector("sce")}
                className="cursor-pointer transition-all hover:brightness-110"
                d="M250,250 L250,450 A200,200 0 0,1 77,350 Z"
                fill={activeSector === "sce" ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />
              <path
                onClick={() => setActiveSector("eco")}
                className="cursor-pointer transition-all hover:brightness-110"
                d="M250,250 L77,350 A200,200 0 0,1 77,150 Z"
                fill={activeSector === "eco" ? "#C9A84C" : "#1B3E6A"}
                stroke="white"
                strokeWidth="3"
              />

              <circle cx="250" cy="250" r="65" fill="white" stroke="#1B3E6A" strokeWidth="2" />
              <text x="250" y="255" fill="#1B3E6A" fontSize="10" fontWeight="900" textAnchor="middle">
                BUILDFLUENCE
              </text>
            </svg>
          </div>

          {/* PANNEAU DYNAMIQUE (Logique de votre doc) */}
          <div className="lg:col-span-5 bg-[#F8FAFC] rounded-[40px] p-10 border-l-[12px] border-[#C9A84C] min-h-[480px] flex flex-col justify-center shadow-inner">
            {activeSector ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <span className="text-[#C9A84C] font-black uppercase tracking-widest text-[10px]">
                  {data[activeSector].sub}
                </span>
                <h2 className="text-3xl font-black text-[#1B3E6A] mt-2 mb-8 uppercase leading-tight">
                  {data[activeSector].title}
                </h2>
                <ul className="space-y-4">
                  {data[activeSector].list.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-600 font-semibold text-lg">
                      <span className="text-[#C9A84C]">→</span> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActiveSector(null)}
                  className="mt-10 text-[10px] font-bold text-slate-400 uppercase hover:text-[#1B3E6A] transition-colors"
                >
                  ← Retour au moteur
                </button>
              </div>
            ) : (
              <div className="text-center py-10">
                <span className="text-[#C9A84C] font-black uppercase tracking-[0.2em] text-[10px]">
                  Dispositif Stratégique
                </span>
                <h2 className="text-3xl font-black text-[#1B3E6A] mt-4 mb-6 uppercase">Activez le Moteur</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
                  Cliquez sur les secteurs du cercle pour explorer notre méthodologie d’Etude, d’Analyse et Benchmark.
                </p>
                <p className="text-[#1B3E6A] font-bold text-sm bg-white py-3 px-6 rounded-2xl shadow-sm inline-block border border-slate-100 italic">
                  Chaque point est une brique de votre avantage compétitif.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SECTION FOOTER (Cartes premium) */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🔬",
              title: "C'est plus qu'une étude",
              text: "Des écosystèmes de décision construits sur mesure, pas des rapports statiques.",
            },
            {
              icon: "📈",
              title: "C'est plus qu'un benchmark",
              text: "Une lecture des stratégies implicites que les données seules ne révèlent jamais.",
            },
            {
              icon: "⚙️",
              title: "C'est un moteur décisionnel",
              text: "Conçu pour inverser les rapports de force en votre faveur.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`p-10 rounded-[40px] text-center border shadow-xl transition-transform hover:-translate-y-2 ${i === 2 ? "bg-[#334155] text-white" : "bg-[#1B3E6A] text-white"}`}
            >
              <div className="text-4xl mb-6">{card.icon}</div>
              <h4 className="font-black uppercase mb-4 tracking-tight">{card.title}</h4>
              <p className="text-slate-300 text-sm italic font-medium">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
