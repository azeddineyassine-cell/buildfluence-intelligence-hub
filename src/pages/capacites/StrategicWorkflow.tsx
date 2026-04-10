import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DetailPageLayout from "@/components/DetailPageLayout";
import { Search, Target, Cpu, TrendingUp, BarChart3, Users } from "lucide-react";

const StrategicWorkflow = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Cadrage",
      desc: "Définition des objectifs stratégiques et mapping des angles morts.",
    },
    { id: 2, icon: Users, title: "Ateliers", desc: "Co-construction du framework décisionnel avec vos équipes." },
    { id: 3, icon: Cpu, title: "IA", desc: "Déploiement des outils de veille augmentée et configuration IA." },
    {
      id: 4,
      icon: TrendingUp,
      title: "Tendances",
      desc: "Extraction des signaux faibles et analyse des tendances lourdes.",
    },
    { id: 5, icon: BarChart3, title: "DataViz", desc: "Mise en place de dashboards interactifs et visualisation." },
    { id: 6, icon: Target, title: "Empowerment", desc: "Accompagnement continu et autonomisation de vos unités." },
  ];

  return (
    <DetailPageLayout
      title="Strategic Intelligence Lab."
      subtitle="Structuration et professionnalisation d'une unité de veille & d'intelligence stratégique."
      category="Nos Solutions"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-[#040606] font-black text-4xl md:text-5xl uppercase tracking-tighter mb-12 text-center">
          Anticiper – Décider – Influencer
        </h1>

        <div className="grid lg:grid-cols-2 gap-16 items-center bg-white rounded-[40px] p-12 shadow-sm border border-slate-100">
          {/* ROUE INTERACTIVE */}
          <div className="relative aspect-square flex items-center justify-center">
            <div className="absolute inset-0 border-[1px] border-dashed border-slate-200 rounded-full"></div>
            {steps.map((step, index) => {
              const angle = index * 60 * (Math.PI / 180);
              const x = Math.cos(angle) * 40;
              const y = Math.sin(angle) * 40;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`absolute flex flex-col items-center gap-2 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${activeStep === step.id ? "scale-110" : "opacity-70 hover:opacity-100"}`}
                  style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
                >
                  <div
                    className={`p-4 rounded-2xl shadow-lg ${activeStep === step.id ? "bg-[#C9A84C] text-white" : "bg-white text-[#1B3E6A] border border-slate-100"}`}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3E6A] bg-white px-2 py-1 rounded-md shadow-sm">
                    {step.title}
                  </span>
                </button>
              );
            })}
            <div className="z-10 bg-[#1B3E6A] text-white p-8 rounded-full shadow-2xl text-center w-32 h-32 flex flex-col items-center justify-center border-4 border-white">
              <span className="text-[10px] font-bold opacity-50 uppercase">Lab.</span>
              <span className="font-black text-xs uppercase">Process</span>
            </div>
          </div>

          {/* PANNEAU DESCRIPTION */}
          <div className="bg-slate-50 rounded-3xl p-10 border-l-8 border-[#C9A84C] min-h-[300px] flex flex-col justify-center">
            {activeStep ? (
              <div>
                <span className="text-[#C9A84C] font-black text-xs uppercase tracking-[0.2em]">Étape {activeStep}</span>
                <h3 className="text-2xl font-black text-[#1B3E6A] mt-2 mb-4 uppercase">
                  {steps[activeStep - 1].title}
                </h3>
                <p className="text-slate-600 font-medium text-lg leading-relaxed">{steps[activeStep - 1].desc}</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[#1B3E6A] font-bold text-lg italic">
                  "Cliquez sur une étape de la roue pour explorer notre processus."
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default StrategicWorkflow;
