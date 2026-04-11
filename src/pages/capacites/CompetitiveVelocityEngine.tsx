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
    <DetailPageLayout
      title="COMPETITIVE VELOCITY ENGINE"
      subtitle="Une nouvelle génération d'analyse stratégique pour accélérer la prise de décision."
      category="Strategic Innovation"
    >
      {/* Conteneur avec mise à l'échelle automatique pour éviter le zoom manuel */}
      <div className="w-full max-w-[1200px] mx-auto px-4 py-8 overflow-hidden">
        {/* ENGINE SECTION */}
        <div className="grid lg:grid-cols-2 gap-10 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl items-center mb-16 border border-slate-50">
          <div className="relative flex justify-center">
            <svg viewBox="0 0 500 500" className="w-full max-w-[450px] drop-shadow-xl transition-all">
              <path
                onClick={() => setActiveSector("geo")}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L250,50 A200,200 0 0,1 423,150 Z"
                fill={activeSector === "geo" ? "#C9A84C" : "#1B3E6A"}
                stroke="#FFF"
                strokeWidth="3"
              />
              <path
                onClick={() => setActiveSector("eco")}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L423,150 A200,200 0 0,1 423,350 Z"
                fill={activeSector === "eco" ? "#C9A84C" : "#1B3E6A"}
                stroke="#FFF"
                strokeWidth="3"
                opacity="0.95"
              />
              <path
                onClick={() => setActiveSector("tech")}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L423,350 A200,200 0 0,1 250,450 Z"
                fill={activeSector === "tech" ? "#C9A84C" : "#1B3E6A"}
                stroke="#FFF"
                strokeWidth="3"
              />
              <path
                onClick={() => setActiveSector("sce")}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L250,450 A200,200 0 0,1 77,350 Z"
                fill={activeSector === "sce" ? "#C9A84C" : "#1B3E6A"}
                stroke="#FFF"
                strokeWidth="3"
                opacity="0.95"
              />
              <path
                onClick={() => setActiveSector("sys")}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L77,350 A200,200 0 0,1 77,150 Z"
                fill={activeSector === "sys" ? "#C9A84C" : "#1B3E6A"}
                stroke="#FFF"
                strokeWidth="3"
              />
              <path
                onClick={() => setActiveSector("dec")}
                className="cursor-pointer hover:brightness-110 transition-all"
                d="M250,250 L77,150 A200,200 0 0,1 250,50 Z"
                fill={activeSector === "dec" ? "#C9A84C" : "#1B3E6A"}
                stroke="#FFF"
                strokeWidth="3"
                opacity="0.95"
              />

              <circle
                cx="250"
                cy="250"
                r="72"
                fill="white"
                className="shadow-lg"
                onClick={() => setActiveSector(null)}
              />
              <text
                x="250"
                y="255"
                fill="#1B3E6A"
                fontSize="8"
                fontWeight="900"
                textAnchor="middle"
                className="pointer-events-none"
              >
                BUILDFLUENCE
              </text>
            </svg>
          </div>

          <div className="bg-[#F8FAFC] p-10 rounded-[30px] border-l-[8px] border-[#C9A84C] min-h-[450px] flex flex-col justify-center shadow-inner">
            {activeSector ? (
              <div className="animate-in fade-in duration-300">
                <span className="text-[#C9A84C] font-bold uppercase text-xs tracking-[0.2em] mb-4 block">
                  {data[activeSector].sub}
                </span>
                <h2 className="text-3xl font-black text-[#1B3E6A] uppercase mb-6 leading-tight">
                  {data[activeSector].title}
                </h2>
                <ul className="space-y-4">
                  {data[activeSector].list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                      <span className="text-[#C9A84C] font-bold">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center animate-in fade-in">
                <span className="text-[#C9A84C] font-bold uppercase text-xs tracking-[0.2em] mb-4 block">
                  Dispositif Stratégique
                </span>
                <h2 className="text-3xl font-black text-[#1B3E6A] uppercase mb-4">Activez le Moteur</h2>
                <p className="text-slate-500 font-medium mb-6">
                  Cliquez sur les secteurs du cercle pour explorer notre méthodologie d’Etude, d’Analyse et Benchmark.
                </p>
                <div className="pt-6 border-t border-slate-200 italic text-slate-400 text-sm">
                  Notre Track Record est multi sectoriel avec des résultats conformes aux attentes clients.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 CARDS - Mise à jour avec ton bleu #1c75ba */}
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
              text: "Inverser les rapports de force en votre faveur avant vos concurrents.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#1c75ba] p-10 rounded-[40px] text-center text-white shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="text-4xl mb-6">{card.icon}</div>
              <h4 className="font-black uppercase mb-4 tracking-tight">{card.title}</h4>
              <p className="text-slate-100 text-sm italic font-medium leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
