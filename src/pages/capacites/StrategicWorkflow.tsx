import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";
import { Send, X, ArrowRight, ChevronDown } from "lucide-react";

const StrategicWorkflow = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Correction : Force la fermeture des autres quand on en ouvre un
  const toggleStep = (i: number) => {
    setOpenStep(openStep === i ? null : i);
  };

  const steps = [
    {
      num: 1,
      color: "#4a9a6a",
      icon: "🔍",
      title: "Évaluation des besoins",
      tag: "Semaines 1–5",
      items: [
        "Audit et identification des besoins",
        "Analyse des exigences stratégiques",
        "Construction de l'écosystème informationnel",
        "Définition des objectifs et KPIs",
      ],
    },
    {
      num: 2,
      color: "#1a7a5a",
      icon: "🏗️",
      title: "Préparation de l'infrastructure",
      tag: "Semaines 6–10",
      items: [
        "Ateliers & Validation",
        "Setup : Requêtes, profils, livrables",
        "Paramétrage de la solution IA",
        "Sources décentralisées & bases de données",
      ],
    },
    {
      num: 3,
      color: "#1a5580",
      icon: "💡",
      title: "Brainstorming & Structuration",
      tag: "Semaines 11–15",
      items: [
        "Rédaction des exigences",
        "Validation des axes stratégiques",
        "Catégorisation thématique",
        "Élaboration du cahier des charges",
      ],
    },
    {
      num: 4,
      color: "#2a6a9a",
      icon: "🚀",
      title: "Déploiement & Implémentation IA",
      tag: "Semaines 16–20",
      items: [
        "Intégration solution IA",
        "Tests en conditions réelles",
        "Installation Intelligence Unit",
        "Dashboards & KPIs temps réel",
      ],
    },
    {
      num: 5,
      color: "#C9A84C",
      icon: "🎓",
      title: "Formation Empowerment",
      tag: "Semaines 21–25",
      items: ["Formation sur-mesure", "Méthodologie IES, OSINT", "Sovereign Data 2.0", "Transfert de compétences"],
    },
    {
      num: 6,
      color: "#7a3060",
      icon: "🔄",
      title: "Gestion du changement",
      tag: "Semaines 26–30",
      items: [
        "Communication interne",
        "Conduite du changement",
        "Interviews dirigeants",
        "Ateliers Leadership Digital",
      ],
    },
    {
      num: 7,
      color: "#0F365F",
      icon: "🏅",
      title: "Accompagnement & Autonomie",
      tag: "Semaines 31–36+",
      items: [
        "Support & suivi site",
        "Amélioration continue",
        "Optimisation des solutions",
        "Influence Builder & e-Lobbying",
      ],
      full: true,
    },
  ];

  return (
    <DetailPageLayout title="Strategic Workflow" chapeau="Optimisez vos processus stratégiques avec des workflows intelligents.">
      <div className="w-full bg-[#F8FAFC] min-h-screen font-['Inter'] pb-20">
        {/* MODAL FORMULAIRE */}
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl animate-in zoom-in duration-300 relative">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-red-500"
              >
                <X size={28} />
              </button>
              <h3 className="text-3xl font-black text-[#0D1B2A] mb-2 text-center italic">
                Ready to <span className="text-[#C9A84C]">scale</span>?
              </h3>
              <p className="text-center text-slate-500 mb-8 text-sm font-medium uppercase tracking-widest">
                Échange Stratégique • Buildfluence
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Nom complet"
                  className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-[#C9A84C] outline-none"
                />
                <input
                  type="email"
                  placeholder="Email professionnel"
                  className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-[#C9A84C] outline-none"
                />
                <textarea
                  placeholder="Votre besoin..."
                  className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 h-32 outline-none focus:ring-2 focus:ring-[#C9A84C]"
                ></textarea>
                <button className="w-full bg-[#0D1B2A] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#C9A84C] transition-all shadow-xl">
                  Lancer la connexion <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* HERO */}
        <div className="text-center py-20 px-4">
          <span className="bg-[#C9A84C] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
            Workflow Opérationnel
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#0D1B2A] mb-6 leading-tight">
            Buildfluence <span className="italic text-[#C9A84C]">Strategic</span> Workflow
          </h1>
          <p className="text-slate-500 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Un déploiement structuré pour transformer votre organisation en une puissance décisionnelle.
          </p>
        </div>

        {/* WORKFLOW GRID - Correction Marges & Lignes */}
        <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div key={i} className={`group transition-all duration-500 ${s.full ? "md:col-span-2" : ""}`}>
              <div
                onClick={() => toggleStep(i)}
                className={`cursor-pointer bg-white rounded-[32px] p-8 border-2 transition-all ${openStep === i ? "border-[#C9A84C] shadow-2xl bg-white" : "border-transparent hover:border-slate-200 shadow-sm"}`}
              >
                <div className="flex items-center gap-6">
                  <div
                    style={{ background: s.color }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg group-hover:rotate-6 transition-transform"
                  >
                    {s.num}
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black text-[#C9A84C] uppercase tracking-widest">{s.tag}</span>
                    <h3 className="text-xl font-bold text-[#0D1B2A] group-hover:translate-x-1 transition-transform">
                      {s.title}
                    </h3>
                  </div>
                  <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{s.icon}</div>
                  <ChevronDown
                    className={`text-slate-300 transition-transform duration-300 ${openStep === i ? "rotate-180 text-[#C9A84C]" : ""}`}
                  />
                </div>

                {openStep === i && (
                  <div className="mt-8 pt-8 border-t border-slate-50 animate-in slide-in-from-top duration-300">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {s.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-slate-600 font-medium italic">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA FINAL RÉPARÉ */}
        <div className="flex justify-center mt-24 px-6">
          <button
            onClick={() => setIsFormOpen(true)}
            className="group relative bg-[#0D1B2A] text-white px-12 py-6 rounded-full overflow-hidden shadow-2xl transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-[#C9A84C] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative flex items-center gap-4">
              <span className="text-sm font-black uppercase tracking-[0.2em]">Échange Stratégique</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default StrategicWorkflow;
