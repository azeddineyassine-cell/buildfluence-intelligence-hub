import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";
import { ArrowRight, ChevronDown, Target, Zap, Shield, BarChart3 } from "lucide-react";

const StrategicWorkflow = () => {
  const [openStep, setOpenStep] = useState<number | null>(0); // La première étape est ouverte par défaut

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
        "Diagnostic de maturité décisionnelle",
        "Cartographie des angles morts",
      ],
    },
    {
      num: 2,
      color: "#1a7a5a",
      icon: "🏗️",
      title: "Préparation de l'infrastructure",
      tag: "Semaines 6–10",
      items: [
        "Ateliers, Brainstorming & Validation",
        "Setup : Requêtes, profils, livrables",
        "Arborescence des dossiers & sous-dossiers",
        "Paramétrage de la solution IA",
        "Démarche IES / Structuration de la recherche",
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
        "Rédaction & formalisation des exigences",
        "Validation des axes stratégiques",
        "Workshops collaboratifs de co-construction",
        "Catégorisation des thématiques de veille",
        "Définition des livrables & formats",
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
        "Intégration de la solution IA de veille",
        "Tests et ajustements en conditions réelles",
        "Optimisation et mise en production",
        "Installation Market & Competitive Intelligence Unit",
        "Détection automatique des signaux faibles",
        "Dashboards & KPIs temps réel",
      ],
    },
    {
      num: 5,
      color: "#C9A84C",
      icon: "🎓",
      title: "Formation Strategic Empowerment",
      tag: "Semaines 21–25",
      items: [
        "Formation sur-mesure Next-Level",
        "Programme de montée en compétences",
        "Méthodologie IES, OSINT, e-Lobbying",
        "Sovereign Data & Competitive Intelligence 2.0",
        "Groupe de 10 personnes / 10 jours",
        "Transfert de compétences opérationnelles",
      ],
    },
    {
      num: 6,
      color: "#7a3060",
      icon: "🔄",
      title: "Gestion du changement",
      tag: "Semaines 26–30",
      items: [
        "Direction de Communication interne",
        "Actions internes de conduite du changement",
        "One&One interviews dirigeants",
        "Culture de la résilience informationnelle",
        "Accompagnement transverse communauté/user",
        "Ateliers immersifs Leadership Digital",
      ],
    },
    {
      num: 7,
      color: "#0F365F",
      icon: "🏅",
      title: "Accompagnement & Autonomisation",
      tag: "Semaines 31–36+",
      items: [
        "Support, suivi et visites sur site",
        "Retour d'expérience & amélioration continue",
        "Stratégies d'optimisation des solutions",
        "Construction des Orientations & Plans d'action",
        "Boucle d'amélioration continue",
        "Influence Builder : narratifs & e-Lobbying",
      ],
    },
  ];

  return (
    <DetailPageLayout>
      <div className="w-full bg-[#F8FAFC] min-h-screen font-['Inter'] text-[#0F172A]">
        {/* TOP BADGE */}
        <div className="flex justify-center pt-20">
          <span className="bg-[#C9A84C]/10 text-[#C9A84C] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[3px] border border-[#C9A84C]/20">
            Méthodologie Exclusive
          </span>
        </div>

        {/* HERO SECTION - Style Institutionnel */}
        <div className="text-center py-12 px-6">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-[#0F172A] leading-tight">
            Competitive <span className="text-[#C9A84C] italic">velocity</span> engine
          </h1>
          <p className="text-slate-500 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed italic">
            "Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des
            environnements concurrentiels et hyper-complexes."
          </p>
        </div>

        {/* PILL LABELS (Comme sur ton image) */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {["Benchmark", "Analyse", "Anticipation", "Décision"].map((label) => (
            <span
              key={label}
              className="px-8 py-2 border-2 border-[#C9A84C] text-[#C9A84C] rounded-full text-sm font-bold tracking-wide"
            >
              {label}
            </span>
          ))}
        </div>

        {/* TIMELINE SECTION */}
        <div className="max-w-5xl mx-auto px-6 pb-32">
          <div className="grid gap-6">
            {steps.map((s, i) => (
              <div key={i} className="group">
                <button
                  onClick={() => setOpenStep(openStep === i ? null : i)}
                  className={`w-full flex items-center gap-6 p-8 rounded-3xl transition-all duration-300 bg-white border ${openStep === i ? "border-[#C9A84C] shadow-xl" : "border-slate-100 hover:border-slate-200 shadow-sm"}`}
                >
                  <div
                    style={{ background: s.color }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                  >
                    {s.num}
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {s.tag}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#0F172A]">{s.title}</h3>
                  </div>
                  <ChevronDown
                    className={`text-slate-300 transition-transform duration-300 ${openStep === i ? "rotate-180 text-[#C9A84C]" : ""}`}
                  />
                </button>

                {openStep === i && (
                  <div className="mt-2 p-10 bg-white rounded-3xl border border-slate-100 shadow-inner animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                      {s.items.map((item, j) => (
                        <div key={j} className="text-[15px] text-slate-600 flex items-center gap-3 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA FINAL - Clean & Bold */}
        <div className="fixed bottom-10 left-0 right-0 flex justify-center px-6 z-50">
          <button className="bg-[#0F365F] text-white px-12 py-5 rounded-full font-bold uppercase text-xs tracking-[2px] flex items-center gap-4 hover:bg-[#C9A84C] transition-all shadow-2xl">
            Activez votre Competitive Velocity Engine <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default StrategicWorkflow;
