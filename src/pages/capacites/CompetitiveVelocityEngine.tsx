import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout"; 
import { Send, X, ArrowRight, ChevronDown } from "lucide-react";

const StrategicWorkflow = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Correction : Une seule étape ouverte à la fois
  const toggleStep = (i: number) => {
    setOpenStep(openStep === i ? null : i);
  };

  const steps = [
    { num: 1, color: "#4a9a6a", icon: "🔍", title: "Évaluation des besoins", tag: "Semaines 1–5", items: ["Audit et identification des besoins", "Analyse des exigences stratégiques", "Construction de l'écosystème informationnel", "Définition des objectifs et KPIs", "Diagnostic de maturité décisionnelle", "Cartographie des angles morts"] },
    { num: 2, color: "#1a7a5a", icon: "🏗️", title: "Préparation de l'infrastructure", tag: "Semaines 6–10", items: ["Ateliers, Brainstorming & Validation", "Setup : Requêtes, profils, livrables", "Arborescence des dossiers & sous-dossiers", "Paramétrage de la solution IA", "Démarche IES / Structuration de la recherche", "Sources décentralisées & bases de données"] },
    { num: 3, color: "#1a5580", icon: "💡", title: "Brainstorming & Structuration", tag: "Semaines 11–15", items: ["Rédaction & formalisation des exigences", "Validation des axes stratégiques", "Workshops collaboratifs de co-construction", "Catégorisation des thématiques de veille", "Définition des livrables & formats", "Élaboration du cahier des charges"] },
    { num: 4, color: "#2a6a9a", icon: "🚀", title: "Déploiement & Implémentation IA", tag: "Semaines 16–20", items: ["Intégration de la solution IA de veille", "Tests et ajustements en conditions réelles", "Optimisation et mise en production", "Installation Intelligence Unit", "Détection automatique des signaux faibles", "Dashboards & KPIs temps réel"] },
    { num: 5, color: "#C9A84C", icon: "🎓", title: "Formation Strategic Empowerment", tag: "Semaines 21–25", items: ["Formation sur-mesure Next-Level", "Programme de montée en compétences", "Méthodologie IES, OSINT, e-Lobbying", "Sovereign Data & Competitive Intelligence 2.0", "Groupe de 10 personnes / 10 jours", "Transfert de compétences opérationnelles"] },
    { num: 6, color: "#7a3060", icon: "🔄", title: "Gestion du changement", tag: "Semaines 26–30", items: ["Direction de Communication interne", "Actions internes de conduite du changement", "One&One interviews dirigeants", "Culture de la résilience informationnelle", "Accompagnement transverse communauté/user", "Ateliers immersifs Leadership Digital"] },
    { num: 7, color: "#0F365F", icon: "🏅", title: "Accompagnement & Autonomisation", tag: "Semaines 31–36+", items: ["Support, suivi et visites sur site", "Retour d'expérience & amélioration continue", "Stratégies d'optimisation des solutions", "Construction des Orientations & Plans d'action", "Boucle d'amélioration continue", "Influence Builder : narratifs & e-Lobbying"] },
  ];

  return (
    <DetailPageLayout>
      <div className="w-full bg-[#0F172A] text-white min-h-screen font-['Inter'] pb-32 overflow-x-hidden">
        
        {/* MODAL FORMULAIRE - Style Premium */}
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white text-slate-900 w-full max-w-lg rounded-[40px] p-10 shadow-2xl relative">
              <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors"><X size={32}/></button>
              <h3 className="text-3xl font-black mb-2 italic">Ready to <span className="text-[#C9A84C]">scale</span>?</h3>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-8 italic">Stratégie & Influence</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Nom et Entreprise" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-[#C9A84C]" />
                <input type="email" placeholder="Email professionnel" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-[#C9A84C]" />
                <textarea placeholder="Décrivez votre besoin stratégique..." className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 h-32 outline-none focus:ring-2 focus:ring-[#C9A84C]"></textarea>
                <button className="w-full bg-[#0D1B2A] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#C9A84C] transition-all shadow-xl">
                  Lancer la connexion <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* HERO */}
        <div className="text-center py-24 px-6">
          <span className="text-[10px] tracking-[5px] uppercase text-[#C9A84C] font-black mb-6 block">Méthodologie Exclusive</span>
          <h1 className="text-4xl md:text-6xl font-black mb-8 italic uppercase leading-tight">Buildfluence <span className="text-[#C9A84C]">Strategic</span> Workflow</h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-medium italic leading-relaxed">
            Installer une culture d'intelligence stratégique et un système de décision augmentée au sein de votre entité.
          </p>
        </div>

        {/* TIMELINE - Structure Verticale Pure */}
        <div className="max-w-4xl mx-auto px-6 relative">
          {/* Ligne de connexion dynamique */}
          <div className="absolute left-[47px] md:left-[51px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#4a9a6a] via-[#C9A84C] to-[#0F365F] opacity-20 hidden md:block"></div>

          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="relative z-10">
                <button 
                  onClick={() => toggleStep(i)}
                  className={`w-full flex items-center gap-6 p-6 rounded-[24px] transition-all duration-500 border-2 ${openStep === i ? 'bg-white/10 border-[#C9A84C] shadow-[0_0_30px_rgba(201,168,76,0.2)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                >
                  <div style={{ background: s.color }} className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg italic">
                    {s.num}
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[10px] font-black text-[#C9A84C] uppercase tracking-[3px]">{s.tag}</span>
                    <h3 className="text-xl font-bold uppercase italic tracking-tight">{s.title}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl opacity-80">{s.icon}</span>
                    <ChevronDown className={`text-white/20 transition-transform duration-500 ${openStep === i ? 'rotate-180 text-[#C9A84C] opacity-100' : ''}`} />
                  </div>
                </button>

                {openStep === i && (
                  <div className="md:ml-24 mt-6 p-8 bg-white/5 rounded-[24px] border-l-4 animate-in slide-in-from-top-4 duration-500" style={{ borderColor: s.color }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {s.items.map((item, j) => (
                        <li key={j} className="text-sm text-slate-300 flex items-center gap-3 italic font-medium">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }}></span>
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

        {/* CTA FINAL - Réparé et lié à l'ouverture du formulaire */}
        <div className="flex justify-center mt-28 px-6">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="group relative bg-white text-[#0F172A] px-14 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] overflow-hidden transition-all hover:scale-105 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[#C9A84C] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <span className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors">
              Lancer l'audit initial <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
            </span>
          </button>
        </div>

      </div>
    </DetailPageLayout>
  );
};

export default StrategicWorkflow;