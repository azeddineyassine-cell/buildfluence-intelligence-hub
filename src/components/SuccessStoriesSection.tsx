import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();
  const [activeTopic, setActiveTopic] = useState("tous");

  const topics = [
    { label: t("Tous", "All"), value: "tous" },
    { label: t("🔥 Gestion de crise", "🔥 Crisis management"), value: "crise" },
    { label: t("✕ Attaques & Désinformation", "✕ Attacks & Disinformation"), value: "desinformation" },
    { label: t("🔒 Due Diligence & Investissement", "🔒 Due Diligence & Investment"), value: "diligence" },
    { label: t("⇌ Attractivité & Rayonnement", "⇌ Attractiveness & Influence"), value: "attractivite" },
    { label: t("🏛 Influence & Soft Power", "🏛 Influence & Soft Power"), value: "influence" },
    { label: t("🌐 Écosystème Concurrentiel", "🌐 Competitive Ecosystem"), value: "ecosysteme" },
    { label: t("📊 Audit & Benchmark", "📊 Audit & Benchmark"), value: "audit" },
    { label: t("📣 Stratégie de communication", "📣 Communication strategy"), value: "communication" },
  ];

  const stories = [
    { topic: "audit", tag: "Audit & Benchmark", client: "ADD", desc: t("Audit stratégique et benchmark des pratiques de l'Agence de Développement du Digital.", "Strategic audit and benchmark of the Digital Development Agency's practices.") },
    { topic: "audit", tag: "Audit & Benchmark", client: "CIDC", desc: t("Benchmark institutionnel et évaluation de la performance décisionnelle.", "Institutional benchmark and decision performance evaluation.") },
    { topic: "audit", tag: "Audit & Benchmark", client: "UM6SS", desc: t("Audit de positionnement et analyse comparative internationale.", "Positioning audit and international comparative analysis.") },
    { topic: "audit", tag: "Audit & Benchmark", client: "Raja Club Athletic", desc: t("Benchmark stratégique et analyse de l'écosystème concurrentiel sportif.", "Strategic benchmark and sports competitive ecosystem analysis.") },
    { topic: "communication", tag: t("Stratégie de communication", "Communication strategy"), client: "OCP Group", desc: t("Stratégie de communication institutionnelle et positionnement narratif international.", "Institutional communication strategy and international narrative positioning.") },
    { topic: "communication", tag: t("Stratégie de communication", "Communication strategy"), client: t("Ministère de la Santé", "Ministry of Health"), desc: t("Pilotage de la communication de crise et gestion du narratif institutionnel.", "Crisis communication management and institutional narrative steering.") },
    { topic: "communication", tag: t("Stratégie de communication", "Communication strategy"), client: "ADD", desc: t("Stratégie de communication digitale et renforcement de la visibilité institutionnelle.", "Digital communication strategy and institutional visibility strengthening.") },
  ];

  const filtered = activeTopic === "tous" ? stories : stories.filter(s => s.topic === activeTopic);

  return (
    <section id="success-stories" ref={ref} className="py-[88px]" style={{ background: 'hsl(var(--navy))' }}>
      <div className="mx-auto max-w-[1100px] px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-11"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-[18px]" style={{ color: 'hsl(var(--gold-light))' }}>
            Success Stories
          </p>
          <h2 className="font-serif text-[36px] font-black text-white">
            {t("Résultats prouvés, mandats renouvelés", "Proven results, renewed mandates")}
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {topics.map((tp) => (
            <button
              key={tp.value}
              onClick={() => setActiveTopic(tp.value)}
              className="flex items-center gap-2 px-4 py-[9px] text-[13px] font-medium rounded-[2px] transition-all"
              style={{
                border: activeTopic === tp.value ? '1px solid hsl(var(--gold))' : '1px solid rgba(255,255,255,0.2)',
                background: activeTopic === tp.value ? 'hsl(var(--gold))' : 'transparent',
                color: activeTopic === tp.value ? '#fff' : 'rgba(255,255,255,0.65)',
              }}
            >
              {tp.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]" style={{ background: 'rgba(255,255,255,0.08)' }}>
          {filtered.map((s, i) => (
            <motion.div
              key={`${s.client}-${s.topic}-${i}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-[28px] transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: 'hsl(var(--gold-light))' }}>
                {s.tag}
              </div>
              <div className="text-[16px] font-bold text-white mb-2">{s.client}</div>
              <div className="text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
