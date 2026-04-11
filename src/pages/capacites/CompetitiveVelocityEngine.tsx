import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const StrategicWorkflow = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

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
      full: true,
    },
  ];

  return (
    <div className="w-full bg-[#F0F7FF] min-h-screen text-[#0D1B2A] font-sans">
      {/* Header & Hero */}
      <div className="text-center py-16 px-4">
        <span className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-[3px] mb-4 block">
          Méthodologie Exclusive
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        >
          Buildfluence <span className="text-[#C9A84C]">Strategic Workflow</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed mb-10">
          Installer une culture d'intelligence stratégique et un système de décision augmentée au sein de votre entité.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["Benchmark", "Analyse", "Anticipation", "Décision"].map((b) => (
            <span
              key={b}
              className="px-6 py-2 border border-[#C9A84C]/50 text-[#C9A84C] rounded-full text-xs font-bold uppercase tracking-wider bg-white/50"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Process Grid - 2 colonnes */}
      <div className="max-w-6xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`${s.full ? "md:col-span-2" : ""} bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 ${openStep === i ? "shadow-lg border-[#C9A84C]/40" : "hover:border-slate-300"}`}
            >
              <button
                onClick={() => setOpenStep(openStep === i ? null : i)}
                className="w-full flex items-center p-5 gap-4 text-left"
              >
                <div
                  style={{ background: s.color }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                >
                  {s.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-bold" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
                    {s.title}
                  </h3>
                  <span className="text-[10px] text-[#C9A84C] italic font-medium">{s.tag}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${openStep === i ? "rotate-180" : ""}`}
                />
              </button>

              {openStep === i && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-50 animate-in fade-in slide-in-from-top-1">
                  <ul className="grid grid-cols-1 gap-2">
                    {s.items.map((item, j) => (
                      <li key={j} className="text-[12px] text-slate-600 flex items-start gap-2">
                        <span className="text-[#C9A84C] mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4 z-50">
        <div className="bg-white border border-[#C9A84C]/30 shadow-2xl rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 max-w-3xl w-full">
          <div className="hidden md:flex w-12 h-12 bg-[#F0F7FF] items-center justify-center rounded-xl text-2xl">
            🚀
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-[14px] font-bold text-[#0D1B2A]">
              Installez votre <span className="text-[#C9A84C]">cellule d'intelligence stratégique</span>
            </h4>
            <p className="text-[11px] text-slate-400">Accompagnement sur 36 semaines, de l'audit à l'autonomie</p>
          </div>
          <button className="bg-[#C9A84C] text-[#0D1B2A] px-6 py-3 rounded-full font-bold text-[11px] hover:scale-105 transition-transform whitespace-nowrap">
            ÉCHANGE STRATÉGIQUE →
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategicWorkflow;
