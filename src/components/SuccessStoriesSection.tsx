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
    { label: t("📣 Ingénierie de communication", "📣 Communication engineering"), value: "communication" },
  ];

  const stories = [
    // Gestion de crise
    { topic: "crise", tag: t("Gestion de crise", "Crisis management"), client: t("Présidence Sénégalaise", "Senegalese Presidency"), desc: t("Gestion d'une crise institutionnelle majeure avec protocole de communication en temps réel et coordination des parties prenantes.", "Management of a major institutional crisis with real-time communication protocol and stakeholder coordination.") },
    { topic: "crise", tag: t("Gestion de crise", "Crisis management"), client: "Centrale Danone", desc: t("Accompagnement dans la gestion d'une crise de confiance consommateurs avec stratégie de réponse multicanale.", "Support in managing a consumer confidence crisis with multichannel response strategy.") },
    { topic: "crise", tag: t("Gestion de crise", "Crisis management"), client: t("Ministère de la Santé", "Ministry of Health"), desc: t("Gestion de crise sanitaire et communication institutionnelle à destination du grand public et des médias.", "Health crisis management and institutional communication for the public and media.") },
    // Attaques & Désinformation
    { topic: "desinformation", tag: t("Attaques & Désinformation", "Attacks & Disinformation"), client: "Centrale Danone", desc: t("Neutralisation d'une campagne de désinformation coordonnée sur les réseaux sociaux.", "Neutralization of a coordinated disinformation campaign on social media.") },
    { topic: "desinformation", tag: t("Attaques & Désinformation", "Attacks & Disinformation"), client: "OCP Group", desc: t("Détection et neutralisation d'attaques informationnelles ciblant la crédibilité institutionnelle.", "Detection and neutralization of information attacks targeting institutional credibility.") },
    { topic: "desinformation", tag: t("Attaques & Désinformation", "Attacks & Disinformation"), client: "Raja Club Athletic", desc: t("Protection de l'image du club face à des campagnes de manipulation médiatique.", "Protection of the club's image against media manipulation campaigns.") },
    // Due Diligence & Investissement
    { topic: "diligence", tag: t("Due Diligence & Investissement", "Due Diligence & Investment"), client: t("Fond Capital-Risque", "Venture Capital Fund"), desc: t("Due diligence approfondie sur des cibles d'investissement en Afrique subsaharienne avec analyse des risques géopolitiques.", "In-depth due diligence on investment targets in sub-Saharan Africa with geopolitical risk analysis.") },
    // Attractivité & Rayonnement
    { topic: "attractivite", tag: t("Attractivité & Rayonnement", "Attractiveness & Influence"), client: "ADD", desc: t("Stratégie globale d'attractivité des investissements directs étrangers et de rayonnement de la destination.", "Global strategy for foreign direct investment attractiveness and destination influence.") },
    { topic: "attractivite", tag: t("Attractivité & Rayonnement", "Attractiveness & Influence"), client: "CIDC", desc: t("Positionnement de la marque territoriale et développement de la compétitivité régionale.", "Territorial brand positioning and regional competitiveness development.") },
    // Influence & Soft Power
    { topic: "influence", tag: t("Influence & Soft Power", "Influence & Soft Power"), client: "UM6SS", desc: t("Construction d'une stratégie de soft power académique et positionnement dans les réseaux d'influence internationaux.", "Building an academic soft power strategy and positioning within international influence networks.") },
    { topic: "influence", tag: t("Influence & Soft Power", "Influence & Soft Power"), client: "ADD", desc: t("Développement de l'influence institutionnelle et cartographie des décideurs clés.", "Institutional influence development and key decision-maker mapping.") },
    // Écosystème Concurrentiel
    { topic: "ecosysteme", tag: t("Écosystème Concurrentiel", "Competitive Ecosystem"), client: "OCP Group", desc: t("Cartographie stratégique des acteurs mondiaux du secteur phosphatier et veille concurrentielle dynamique.", "Strategic mapping of global phosphate sector players and dynamic competitive intelligence.") },
    { topic: "ecosysteme", tag: t("Écosystème Concurrentiel", "Competitive Ecosystem"), client: "Centrale Danone", desc: t("Analyse de l'écosystème concurrentiel agroalimentaire et identification des opportunités de différenciation.", "Agri-food competitive ecosystem analysis and differentiation opportunity identification.") },
    // Audit & Benchmark
    { topic: "audit", tag: "Audit & Benchmark", client: "ADD", desc: t("Audit stratégique complet et benchmark des meilleures pratiques internationales.", "Complete strategic audit and benchmark of international best practices.") },
    { topic: "audit", tag: "Audit & Benchmark", client: "CIDC", desc: t("Benchmark des dispositifs de compétitivité territoriale et recommandations d'optimisation.", "Benchmark of territorial competitiveness systems and optimization recommendations.") },
    { topic: "audit", tag: "Audit & Benchmark", client: "UM6SS", desc: t("Audit de gouvernance académique et benchmarking des standards d'excellence universitaire.", "Academic governance audit and benchmarking of university excellence standards.") },
    { topic: "audit", tag: "Audit & Benchmark", client: "Raja Club Athletic", desc: t("Audit des pratiques de gouvernance sportive et benchmark des clubs leaders africains.", "Sports governance practices audit and benchmark of leading African clubs.") },
    // Stratégie de communication
    { topic: "communication", tag: t("Ingénierie de communication", "Communication engineering"), client: "OCP Group", desc: t("Stratégie de communication Corporate, Veille et Renforcement d'image institutionnelle", "Corporate communication strategy, Monitoring and Institutional image strengthening") },
    { topic: "communication", tag: t("Ingénierie de communication", "Communication engineering"), client: t("Ministère de la Santé", "Ministry of Health"), desc: t("Participation à l'élaboration de la stratégie de communication publique autour des politiques de santé nationale", "Participation in developing the public communication strategy around national health policies") },
    { topic: "communication", tag: t("Ingénierie de communication", "Communication engineering"), client: "ADD", desc: t("Appui à la communication d'attractivité pour le renforcement institutionnel de l'agence", "Attractiveness communication support for the institutional strengthening of the agency") },
    { topic: "communication", tag: t("Ingénierie de communication", "Communication engineering"), client: "GINGER INTERNATIONAL", desc: t("Ingénierie de communication d'image et de processus d'attractivité auprès des clients institutionnels", "Image communication engineering and attractiveness processes for institutional clients") },
    { topic: "communication", tag: t("Ingénierie de communication", "Communication engineering"), client: t("Hôpital Universitaire International Mohammed VI", "Mohammed VI International University Hospital"), desc: t("Feuille de route pour la communication d'attractivité et le raffermissement réputationnel", "Roadmap for attractiveness communication and reputational strengthening") },
  ];

  const filtered = activeTopic === "tous" ? stories : stories.filter(s => s.topic === activeTopic);

  return (
    <section id="success-stories" ref={ref} className="py-[88px]" style={{ background: '#103e8c' }}>
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
              className="flex items-center gap-2 py-[9px] font-medium rounded-[2px] transition-all"
              style={{
                fontSize: '13px',
                padding: '9px 16px',
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
