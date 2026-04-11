import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";
import { ArrowRight, Send, X } from "lucide-react";

const CompetitiveVelocityEngine = () => {
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const data: Record<string, { sub: string; title: string; list: string[] }> = {
    geo: {
      sub: "Captation & Analyse",
      title: "Conflits géopolitiques",
      list: [
        "Surveillance des tensions régionales",
        "Analyse d'impact marchés stratégiques",
        "Cartographie influence diplomatique",
      ],
    },
    eco: {
      sub: "Flux & Compétitivité",
      title: "Market intelligence",
      list: [
        "Suivi des flux d'IDE et capitaux",
        "Analyse positions concurrentielles",
        "Benchmarking attractivité international",
      ],
    },
    tech: {
      sub: "Innovation & Disruption",
      title: "Signaux technologiques",
      list: ["Veille brevets et publications", "Détection disruptions émergentes", "Cartographie acteurs innovation"],
    },
    sce: {
      sub: "Projection & Anticipation",
      title: "Scénarios anticipés",
      list: [
        "Modélisation 3, 6 et 12 mois",
        "Projection mouvements concurrentiels",
        "Simulation ruptures géopolitiques",
      ],
    },
    sys: {
      sub: "Cartographie & Rapports",
      title: "Écosystème modélisé",
      list: [
        "Mapping évolutif des acteurs",
        "Visualisation flux et rapports force",
        "Cartographie alliances et oppositions",
      ],
    },
    dec: {
      sub: "Output & Action",
      title: "Décision accélérée",
      list: [
        "Hiérarchisation Go/No-Go/Timing",
        "Réduction incertitude décisionnelle",
        "Briefings C-Level en temps réel",
      ],
    },
  };

  return (
    <DetailPageLayout>
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-4 pb-20 font-['Inter',sans-serif]">
        {/* HEADER */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B3E6A] mb-6 tracking-tight">
            Competitive <span className="text-[#C9A84C]">velocity</span> engine
          </h1>
          <p className="text-md md:text-lg text-slate-600 max-w-2xl mx-auto font-medium mb-8">
            Une nouvelle génération d'analyse stratégique pour accélérer la prise de décision.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Benchmark", "Analyse", "Anticipation", "Décision"].map((tag) => (
              <span
                key={tag}
                className="px-6 py-2 bg-[#C9A84C] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* MAIN INTERACTIVE AREA */}
        <div className="relative grid lg:grid-cols-2 gap-10 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl items-center mb-16 border border-slate-50 overflow-hidden">
          {/* CERCLE INTERACTIF */}
          <div
            className={`relative flex justify-center transition-all duration-500 ${isFormOpen ? "opacity-20 scale-90 blur-sm" : "opacity-100"}`}
          >
            <svg viewBox="0 0 500 500" className="w-full max-w-[420px] drop-shadow-2xl">
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

              {/* LOGO BUILDFLUENCE AU CENTRE */}
              <circle cx="250" cy="250" r="75" fill="white" stroke="#F1F5F9" strokeWidth="1" />
              <image href="/logo.png" x="190" y="220" height="60" width="120" />
            </svg>
          </div>

          {/* PANNEAU D'INFORMATION OU FORMULAIRE */}
          <div className="relative min-h-[450px] flex flex-col justify-center">
            {isFormOpen ? (
              <div className="bg-white p-6 rounded-3xl animate-in slide-in-from-right duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#1B3E6A]">Demande d'activation</h3>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom complet"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#C9A84C] outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email professionnel"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#C9A84C] outline-none transition-all"
                  />
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#C9A84C] outline-none transition-all bg-white">
                    <option>Secteur d'intérêt : {activeSector ? data[activeSector].title : "Général"}</option>
                    <option>Géopolitique</option>
                    <option>Market Intelligence</option>
                  </select>
                  <textarea
                    placeholder="Votre besoin stratégique..."
                    className="w-full p-3 rounded-xl border border-slate-200 h-24 outline-none focus:border-[#C9A84C]"
                  ></textarea>
                  <button className="w-full bg-[#1B3E6A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#C9A84C] transition-all shadow-lg">
                    Envoyer la demande <Send size={18} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-[#F8FAFC] p-10 rounded-[30px] border-l-[8px] border-[#C9A84C] h-full flex flex-col justify-center">
                {activeSector ? (
                  <div className="animate-in fade-in duration-300">
                    <span className="text-[#C9A84C] font-bold text-xs tracking-widest mb-3 block uppercase">
                      {data[activeSector].sub}
                    </span>
                    <h2 className="text-3xl font-bold text-[#1B3E6A] mb-6 leading-tight">{data[activeSector].title}</h2>
                    <ul className="space-y-4 mb-8">
                      {data[activeSector].list.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-700 font-medium text-sm leading-relaxed"
                        >
                          <span className="text-[#C9A84C] font-black">→</span> {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="text-[#1B3E6A] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-[#C9A84C] transition-colors"
                    >
                      Approfondir ce module <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#1B3E6A] mb-4">Prêt pour l'accélération ?</h2>
                    <p className="text-slate-500 font-medium italic text-sm">
                      Cliquez sur un secteur pour voir comment nous transformons l'information en avantage tactique.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CTA FINAL */}
        {!isFormOpen && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setIsFormOpen(true)}
              className="group bg-[#1B3E6A] hover:bg-[#C9A84C] text-white px-10 py-5 rounded-full flex items-center gap-4 transition-all duration-300 shadow-xl"
            >
              <span className="font-black uppercase tracking-[0.15em] text-sm">
                Activez votre Competitive Velocity Engine
              </span>
              <div className="bg-white/20 p-2 rounded-full">
                <ArrowRight size={20} className="text-white" />
              </div>
            </button>
          </div>
        )}
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
