import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cpu, Target, BarChart3, Layers, Award, Lock, Brain, Users, ClipboardCheck, FileCheck, CircleDot, LayoutDashboard, CheckCircle2, Globe, AlertTriangle, Radio, Theater } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Cpu,
      title: t("Approche HumTech", "HumTech Approach"),
      content: t(
        "Intelligence artificielle et expertise humaine fusionnées pour une lucidité décisionnelle inégalée.",
        "Artificial intelligence and human expertise fused for unmatched decision-making clarity."
      ),
    },
    {
      icon: Target,
      title: t("Orientation Décision", "Decision-Oriented"),
      content: t(
        "Nous ne vendons pas de la veille. Nous vendons de la lucidité décisionnelle actionnable.",
        "We don't sell monitoring. We sell actionable decision-making clarity."
      ),
    },
    {
      icon: BarChart3,
      title: t("Impact rapidement mesurable", "Rapidly Measurable Impact"),
      content: t(
        "Mois d'avance vs concurrents · Deals protégés · Risques détectés · Capital réputationnel renforcé.",
        "Months ahead vs competitors · Deals protected · Risks detected · Reputational capital strengthened."
      ),
    },
    {
      icon: Layers,
      title: t("Croisement des données", "Data Cross-Referencing"),
      content: t(
        "Données économiques + Contexte géopolitique + Risques réputationnels + Dynamiques narratives = Lucidité totale.",
        "Economic data + Geopolitical context + Reputational risks + Narrative dynamics = Total clarity."
      ),
    },
    {
      icon: Award,
      title: t("Track Record prouvé", "Proven Track Record"),
      content: t(
        "Gouvernements, multinationales, organisations internationales sur 5 continents.",
        "Governments, multinationals, international organizations across 5 continents."
      ),
    },
    {
      icon: Lock,
      title: t("Confidentialité absolue", "Absolute Confidentiality"),
      content: t(
        "NDA systématique · Serveurs sécurisés · Équipes formées au secret professionnel.",
        "Systematic NDA · Secured servers · Teams trained in professional secrecy."
      ),
    },
  ];

  const equationItems = [
    { icon: BarChart3, label: t("Données économiques", "Economic data"), color: "#103E8C" },
    { icon: Globe, label: t("Contexte géopolitique", "Geopolitical context"), color: "#0D1B2A" },
    { icon: AlertTriangle, label: t("Risques réputationnels", "Reputational risks"), color: "#B45309" },
    { icon: Radio, label: t("Dynamiques narratives", "Narrative dynamics"), color: "#6D28D9" },
    { icon: Theater, label: t("Jeux d'influence", "Influence games"), color: "#0F766E" },
  ];

  return (
    <section id="pourquoi-buildfluence" className="relative py-14" ref={ref} style={{ background: '#F7F8FA' }}>
      <div className="mx-auto" style={{ maxWidth: '760px', padding: '0 24px' }}>

        {/* ═══ HERO ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-black uppercase tracking-wide sm:text-4xl" style={{ color: '#0D1B2A', letterSpacing: '0.04em' }}>
            {t("Ce qui nous distingue", "What sets us apart")}
          </h2>
          <p className="mt-2 text-base italic" style={{ color: '#5A6170' }}>
            {t("Infrastructure décisionnelle externe", "External decision-making infrastructure")}
          </p>
          <p className="mt-5 text-lg font-medium leading-relaxed" style={{ color: '#0D1B2A' }}>
            {t(
              "Parce que la décision n'a de valeur que si elle inverse les rapports de force en votre faveur.",
              "Because a decision has value only if it shifts the balance of power in your favor."
            )}
          </p>
          <div
            className="mx-auto mt-6 inline-block rounded-sm px-5 py-2.5 text-[13px] font-semibold tracking-wide"
            style={{ background: '#0D1B2A', color: '#FFDE59' }}
          >
            {t(
              "Buildfluence s'engage sur le résultat — l'ensemble de nos missions a été mené avec succès",
              "Buildfluence is committed to results — all our missions have been successfully completed"
            )}
          </div>
        </motion.div>

        {/* ═══ Grille 3x2 des piliers ═══ */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <div
                className="flex h-full flex-col rounded-sm border p-5"
                style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <p.icon className="h-5 w-5 flex-shrink-0" style={{ color: 'hsl(43 50% 54%)' }} />
                  <h3 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: '#0D1B2A' }}>
                    {p.title}
                  </h3>
                </div>
                <p className="text-[12.5px] leading-relaxed" style={{ color: '#6B7280' }}>
                  {p.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — APPROCHE HUMTECH
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14"
        >
          <h3 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: '#0D1B2A' }}>
            {t(
              "L'intelligence au carrefour de l'humain et de la technologie",
              "Intelligence at the crossroads of human and technology"
            )}
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Col 1 — Technologies IA */}
            <div className="rounded-sm border p-5" style={{ background: '#fff', borderColor: '#E5E7EB' }}>
              <div className="mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4" style={{ color: '#103E8C' }} />
                <h4 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: '#0D1B2A' }}>
                  {t("Technologies IA de pointe", "Cutting-edge AI Technologies")}
                </h4>
              </div>
              <ul className="space-y-1.5 text-[12.5px] leading-relaxed" style={{ color: '#4A5568' }}>
                <li>• {t("Veille augmentée & OSINT premium", "Augmented monitoring & premium OSINT")}</li>
                <li>• {t("NLP & analyse sémantique avancée", "NLP & advanced semantic analysis")}</li>
                <li>• {t("Études prédictives factuelles", "Factual predictive studies")}</li>
                <li>• {t("Plateformes décisionnelles IA", "AI decision-making platforms")}</li>
              </ul>
            </div>

            {/* Col 2 — Expertise humaine */}
            <div className="rounded-sm border p-5" style={{ background: '#fff', borderColor: '#E5E7EB' }}>
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" style={{ color: '#103E8C' }} />
                <h4 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: '#0D1B2A' }}>
                  {t("Expertise humaine pointue", "Sharp Human Expertise")}
                </h4>
              </div>
              <ul className="space-y-1.5 text-[12.5px] leading-relaxed" style={{ color: '#4A5568' }}>
                <li>• {t("Analystes géopolitiques & géoéconomiques", "Geopolitical & geoeconomic analysts")}</li>
                <li>• {t("Stratèges d'influence", "Influence strategists")}</li>
                <li>• {t("Fact-checkers professionnels", "Professional fact-checkers")}</li>
                <li>• {t("Experts sectoriels multidisciplinaires", "Multidisciplinary sector experts")}</li>
              </ul>
            </div>

            {/* Col 3 — Méthodologie C-Level */}
            <div className="rounded-sm border p-5" style={{ background: '#fff', borderColor: '#E5E7EB' }}>
              <div className="mb-3 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" style={{ color: '#103E8C' }} />
                <h4 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: '#0D1B2A' }}>
                  {t("Méthodologie C-Level", "C-Level Methodology")}
                </h4>
              </div>
              <ul className="space-y-1.5 text-[12.5px] leading-relaxed" style={{ color: '#4A5568' }}>
                <li>• {t("Audit organisationnel + Veille augmentée + Croisement de données + Signaux faibles + Narratifs institutionnels", "Organizational audit + Augmented monitoring + Data cross-referencing + Weak signals + Institutional narratives")}</li>
                <li>• {t("Analyse multidimensionnelle, DataViz et infographies décisionnelles", "Multidimensional analysis, DataViz and decision-making infographics")}</li>
                <li>• {t("Orientation décision systématique", "Systematic decision orientation")}</li>
              </ul>
            </div>
          </div>

          {/* Résultat mis en valeur */}
          <div
            className="mt-5 rounded-sm px-6 py-4 text-center text-[15px] font-semibold"
            style={{ background: '#0D1B2A', color: '#FFDE59' }}
          >
            {t(
              "Résultat : Une lucidité décisionnelle opérationnelle.",
              "Result: Operational decision-making clarity."
            )}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — ORIENTATION ACTION
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14"
        >
          <h3 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: '#0D1B2A' }}>
            {t(
              "Nous ne vendons pas de la veille. Nous vendons de la lucidité décisionnelle actionnable.",
              "We don't sell monitoring. We sell actionable decision-making clarity."
            )}
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                emoji: "✅",
                text: t("Synthèses factuelles et actionnables", "Factual and actionable summaries"),
              },
              {
                emoji: "🟢🟡🔴",
                text: t("Scoring tricolore Go / Attention / No Go", "Tricolor scoring Go / Caution / No Go"),
              },
              {
                emoji: "📊",
                text: t("Dashboards interactifs et KPIs en temps réel", "Interactive dashboards and real-time KPIs"),
              },
              {
                emoji: "✔",
                text: t("Préconisations vérifiées et concrètes", "Verified and concrete recommendations"),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-sm border px-5 py-4"
                style={{ background: '#fff', borderColor: '#E5E7EB' }}
              >
                <span className="text-xl flex-shrink-0">{item.emoji}</span>
                <span className="text-[14px] font-medium" style={{ color: '#0D1B2A' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — VISION 360°
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 mb-2"
        >
          <h3 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: '#0D1B2A' }}>
            {t("Nous croisons ce que d'autres séparent", "We cross what others separate")}
          </h3>

          {/* Équation visuelle */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {equationItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 rounded-sm border px-4 py-3"
                  style={{ background: '#fff', borderColor: '#E5E7EB' }}
                >
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
                  <span className="text-[13px] font-semibold" style={{ color: '#0D1B2A' }}>{item.label}</span>
                </div>
                {i < equationItems.length - 1 && (
                  <span className="text-xl font-bold" style={{ color: '#BFBFBF' }}>+</span>
                )}
              </div>
            ))}
            <span className="text-2xl font-black" style={{ color: '#0D1B2A' }}>=</span>
            <div
              className="rounded-sm px-5 py-3 text-[14px] font-bold uppercase tracking-wider"
              style={{ background: '#0D1B2A', color: '#FFDE59' }}
            >
              {t("Lucidité totale", "Total Clarity")}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhySection;
