import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Client logos
import presidenceSenegalLogo from "@/assets/clients/presidence-senegal.jpg";
import centraleDanoneLogo from "@/assets/clients/centrale-danone.jpg";
import ministereSanteLogo from "@/assets/clients/ministere-sante.jpg";
import ocpLogo from "@/assets/clients/ocp.png";
import rajaLogo from "@/assets/clients/raja-club-athletic.jpg";
import addLogo from "@/assets/clients/add.png";
import cidcLogo from "@/assets/clients/cidc.jpg";
// import um6ssLogo from "@/assets/clients/um6ss.jpg";
import gingerLogo from "@/assets/clients/ginger-international.jpg";
import hopitalLogo from "@/assets/clients/hopital-mohammed-vi.png";

const clientLogos: Record<string, string> = {
  "Présidence Sénégalaise": presidenceSenegalLogo,
  "Senegalese Presidency": presidenceSenegalLogo,
  "Centrale Danone": centraleDanoneLogo,
  "Ministère de la Santé": ministereSanteLogo,
  "Ministry of Health": ministereSanteLogo,
  "OCP Group": ocpLogo,
  "Raja Club Athletic": rajaLogo,
  "ADD": addLogo,
  "CIDC": cidcLogo,
  "Fond Capital-Risque": undefined as unknown as string,
  "Venture Capital Fund": undefined as unknown as string,
  "GINGER INTERNATIONAL": gingerLogo,
  "Hôpital Universitaire International Mohammed VI": hopitalLogo,
  "Mohammed VI International University Hospital": hopitalLogo,
};

type FilterMode = "thematique" | "secteur";

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();
  const [filterMode, setFilterMode] = useState<FilterMode>("thematique");
  const [activeTopic, setActiveTopic] = useState("tous");
  const [activeSector, setActiveSector] = useState("tous");

  // Listen for filter events from Strategic Intelligence Lab links
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setFilterMode("thematique");
        setActiveTopic(detail);
      }
    };
    window.addEventListener("set-success-filter", handler);
    return () => window.removeEventListener("set-success-filter", handler);
  }, []);

  // Handle filter from sessionStorage (cross-page navigation)
  useEffect(() => {
    const storedFilter = sessionStorage.getItem("success-stories-filter");
    if (storedFilter) {
      setFilterMode("thematique");
      setActiveTopic(storedFilter);
      sessionStorage.removeItem("success-stories-filter");
      setTimeout(() => {
        const el = document.getElementById("success-stories");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  const thematicTopics = [
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

  const sectorTopics = [
    { label: t("Tous", "All"), value: "tous" },
    { label: t("Agro-industrie", "Agri-industry"), value: "agro" },
    { label: t("Digital & Innovation", "Digital & Innovation"), value: "digital" },
    { label: t("Santé publique", "Public Health"), value: "sante" },
    { label: t("Énergie", "Energy"), value: "energie" },
    { label: t("Finance", "Finance"), value: "finance" },
    { label: t("Institutions publiques", "Public Institutions"), value: "institutions" },
    { label: t("Sport professionnel", "Professional Sports"), value: "sport" },
    { label: t("Gouvernement", "Government"), value: "gouvernement" },
  ];

  // Stories with both topic AND sector
  const stories = [
    { topic: "crise", sector: "gouvernement", tag: t("Gestion de crise", "Crisis management"), client: t("Présidence Sénégalaise", "Senegalese Presidency"), desc: t("Gestion d'une crise institutionnelle majeure avec protocole de communication en temps réel et coordination des parties prenantes.", "Management of a major institutional crisis with real-time communication protocol and stakeholder coordination."), anchor: "story-08" },
    { topic: "crise", sector: "agro", tag: t("Gestion de crise", "Crisis management"), client: "Centrale Danone", desc: t("Accompagnement dans la gestion d'une crise de confiance consommateurs avec stratégie de réponse multicanale.", "Support in managing a consumer confidence crisis with multichannel response strategy."), anchor: "story-01" },
    { topic: "crise", sector: "sante", tag: t("Gestion de crise", "Crisis management"), client: t("Ministère de la Santé", "Ministry of Health"), desc: t("Gestion de crise sanitaire et communication institutionnelle à destination du grand public et des médias.", "Health crisis management and institutional communication for the public and media."), anchor: "story-04" },
    { topic: "desinformation", sector: "agro", tag: t("Attaques & Désinformation", "Attacks & Disinformation"), client: "Centrale Danone", desc: t("Neutralisation d'une campagne de désinformation coordonnée sur les réseaux sociaux.", "Neutralization of a coordinated disinformation campaign on social media."), anchor: "story-01" },
    { topic: "desinformation", sector: "energie", tag: t("Attaques & Désinformation", "Attacks & Disinformation"), client: "OCP Group", desc: t("Détection et neutralisation d'attaques informationnelles ciblant la crédibilité institutionnelle.", "Detection and neutralization of information attacks targeting institutional credibility."), anchor: "story-07" },
    { topic: "desinformation", sector: "sport", tag: t("Attaques & Désinformation", "Attacks & Disinformation"), client: "Raja Club Athletic", desc: t("Protection de l'image du club face à des campagnes de manipulation médiatique.", "Protection of the club's image against media manipulation campaigns."), anchor: "story-06" },
    { topic: "diligence", sector: "finance", tag: t("Due Diligence & Investissement", "Due Diligence & Investment"), client: t("Fond Capital-Risque", "Venture Capital Fund"), desc: t("Due diligence approfondie sur des cibles d'investissement en Afrique subsaharienne avec analyse des risques géopolitiques.", "In-depth due diligence on investment targets in sub-Saharan Africa with geopolitical risk analysis."), anchor: "story-11" },
    { topic: "attractivite", sector: "institutions", tag: t("Attractivité & Rayonnement", "Attractiveness & Influence"), client: "ADD", desc: t("Stratégie globale d'attractivité des investissements directs étrangers et de rayonnement de la destination.", "Global strategy for foreign direct investment attractiveness and destination influence."), anchor: "story-09" },
    { topic: "attractivite", sector: "institutions", tag: t("Attractivité & Rayonnement", "Attractiveness & Influence"), client: "CIDC", desc: t("Positionnement de la marque territoriale et développement de la compétitivité régionale.", "Territorial brand positioning and regional competitiveness development."), anchor: "story-03" },
    { topic: "desinformation", sector: "international", tag: t("Attaques & Désinformation", "Attacks & Disinformation"), client: t("Cabinet européen d'intelligence", "European Intelligence Cabinet"), desc: t("Cartographie d'une campagne de désinformation coordonnée et identification de la chaîne d'orchestration.", "Mapping of a coordinated disinformation campaign and identification of the orchestration chain."), anchor: "story-02" },
    { topic: "influence", sector: "institutions", tag: t("Influence & Soft Power", "Influence & Soft Power"), client: "ADD", desc: t("Développement de l'influence institutionnelle et cartographie des décideurs clés.", "Institutional influence development and key decision-maker mapping."), anchor: "story-09" },
    { topic: "ecosysteme", sector: "energie", tag: t("Écosystème Concurrentiel", "Competitive Ecosystem"), client: "OCP Group", desc: t("Cartographie stratégique des acteurs mondiaux du secteur phosphatier et veille concurrentielle dynamique.", "Strategic mapping of global phosphate sector players and dynamic competitive intelligence."), anchor: "story-07" },
    { topic: "ecosysteme", sector: "agro", tag: t("Écosystème Concurrentiel", "Competitive Ecosystem"), client: "Centrale Danone", desc: t("Analyse de l'écosystème concurrentiel agroalimentaire et identification des opportunités de différenciation.", "Agri-food competitive ecosystem analysis and differentiation opportunity identification."), anchor: "story-01" },
    { topic: "audit", sector: "institutions", tag: "Audit & Benchmark", client: "ADD", desc: t("Audit stratégique complet et benchmark des meilleures pratiques internationales.", "Complete strategic audit and benchmark of international best practices."), anchor: "story-09" },
    { topic: "audit", sector: "institutions", tag: "Audit & Benchmark", client: "CIDC", desc: t("Benchmark des dispositifs de compétitivité territoriale et recommandations d'optimisation.", "Benchmark of territorial competitiveness systems and optimization recommendations."), anchor: "story-03" },
    { topic: "audit", sector: "sport", tag: "Audit & Benchmark", client: "Raja Club Athletic", desc: t("Audit des pratiques de gouvernance sportive et benchmark des clubs leaders africains.", "Sports governance practices audit and benchmark of leading African clubs."), anchor: "story-06" },
    { topic: "communication", sector: "energie", tag: t("Ingénierie de communication", "Communication engineering"), client: "OCP Group", desc: t("Stratégie de communication Corporate, Veille et Renforcement d'image institutionnelle", "Corporate communication strategy, Monitoring and Institutional image strengthening"), anchor: "story-07" },
    { topic: "communication", sector: "sante", tag: t("Ingénierie de communication", "Communication engineering"), client: t("Ministère de la Santé", "Ministry of Health"), desc: t("Participation à l'élaboration de la stratégie de communication publique autour des politiques de santé nationale", "Participation in developing the public communication strategy around national health policies"), anchor: "story-04" },
    { topic: "communication", sector: "institutions", tag: t("Ingénierie de communication", "Communication engineering"), client: "ADD", desc: t("Appui à la communication d'attractivité pour le renforcement institutionnel de l'agence", "Attractiveness communication support for the institutional strengthening of the agency"), anchor: "story-09" },
    { topic: "communication", sector: "digital", tag: t("Ingénierie de communication", "Communication engineering"), client: "GINGER INTERNATIONAL", desc: t("Ingénierie de communication d'image et de processus d'attractivité auprès des clients institutionnels", "Image communication engineering and attractiveness processes for institutional clients"), anchor: "story-05" },
    { topic: "communication", sector: "sante", tag: t("Ingénierie de communication", "Communication engineering"), client: t("Hôpital Universitaire International Mohammed VI", "Mohammed VI International University Hospital"), desc: t("Feuille de route pour la communication d'attractivité et le raffermissement réputationnel", "Roadmap for attractiveness communication and reputational strengthening"), anchor: "story-10" },
  ];

  // Apply filter
  let filtered = stories;
  if (filterMode === "thematique" && activeTopic !== "tous") {
    filtered = stories.filter(s => s.topic === activeTopic);
  } else if (filterMode === "secteur" && activeSector !== "tous") {
    filtered = stories.filter(s => s.sector === activeSector);
  }

  // Deduplicate: each client appears only once
  const seen = new Set<string>();
  const deduped = filtered.filter(s => {
    if (seen.has(s.client)) return false;
    seen.add(s.client);
    return true;
  });

  const activeFilters = filterMode === "thematique" ? thematicTopics : sectorTopics;
  const activeValue = filterMode === "thematique" ? activeTopic : activeSector;
  const setActiveValue = filterMode === "thematique" ? setActiveTopic : setActiveSector;

  return (
    <section id="success-stories" ref={ref} className="py-10" style={{ background: '#0D1B2A' }}>
      <div className="mx-auto max-w-[1600px] px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-[18px]" style={{ color: 'hsl(var(--gold-light))' }}>
            Success Stories
          </p>
          <h2 className="font-serif text-[36px] font-black text-white">
            {t("Résultats prouvés, mandats renouvelés", "Proven results, renewed mandates")}
          </h2>
        </motion.div>

        {/* Filter Mode Toggle */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => { setFilterMode("secteur"); setActiveSector("tous"); }}
            className="py-2 px-5 text-[12px] font-semibold uppercase tracking-wider rounded-sm transition-all"
            style={{
              background: filterMode === "secteur" ? '#C9A84C' : 'transparent',
              color: filterMode === "secteur" ? '#fff' : 'rgba(255,255,255,0.5)',
              border: filterMode === "secteur" ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {t("Par Secteur d'activité", "By Industry Sector")}
          </button>
          <button
            onClick={() => { setFilterMode("thematique"); setActiveTopic("tous"); }}
            className="py-2 px-5 text-[12px] font-semibold uppercase tracking-wider rounded-sm transition-all"
            style={{
              background: filterMode === "thematique" ? '#C9A84C' : 'transparent',
              color: filterMode === "thematique" ? '#fff' : 'rgba(255,255,255,0.5)',
              border: filterMode === "thematique" ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {t("Par Thématique", "By Theme")}
          </button>
        </div>

        {/* Sub-filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((tp) => (
            <button
              key={tp.value}
              onClick={() => setActiveValue(tp.value)}
              className="flex items-center gap-2 py-[9px] font-medium rounded-[2px] transition-all"
              style={{
                fontSize: '13px',
                padding: '9px 16px',
                border: activeValue === tp.value ? '1px solid hsl(var(--gold))' : '1px solid rgba(255,255,255,0.2)',
                background: activeValue === tp.value ? 'hsl(var(--gold))' : 'transparent',
                color: activeValue === tp.value ? '#fff' : 'rgba(255,255,255,0.65)',
              }}
            >
              {tp.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px]">
          {deduped.map((s, i) => (
            <motion.div
              key={`${s.client}-${i}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-[28px] transition-colors rounded-sm"
              style={{ background: '#1A2E45' }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#243B56')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#1A2E45')}
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: 'hsl(var(--gold-light))' }}>
                {s.tag}
              </div>
              <div className="text-[16px] font-bold mb-2 text-white">{s.client}</div>
              <div className="text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
