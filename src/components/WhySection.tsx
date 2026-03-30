import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cpu, Target, BarChart3, Layers, Award, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
      detail: t(
        "Technologies IA : OSINT premium · NLP · Études prédictives propriétaires · Plateformes IA sur-mesure\nExpertise humaine : Analystes géopolitiques · Stratèges d'influence · Fact-checkers · Experts sectoriels\nRésultat : Une lucidité décisionnelle que ni la tech seule, ni les humains seuls, ne peuvent produire.",
        "AI Technologies: Premium OSINT · NLP · Proprietary predictive studies · Custom AI platforms\nHuman Expertise: Geopolitical analysts · Influence strategists · Fact-checkers · Sector experts\nResult: A decision-making clarity that neither technology alone, nor humans alone, can produce."
      ),
    },
    {
      icon: Target,
      title: t("Orientation Décision", "Decision-Oriented"),
      content: t(
        "Nous ne vendons pas de la veille. Nous vendons de la lucidité décisionnelle actionnable.",
        "We don't sell monitoring. We sell actionable decision-making clarity."
      ),
      detail: t(
        "Synthèses actionnables · Scoring Go/No-Go · Dashboards interactifs · Recommandations concrètes. Chaque analyse produit des décisions, pas des rapports.",
        "Actionable summaries · Go/No-Go scoring · Interactive dashboards · Concrete recommendations. Every analysis produces decisions, not reports."
      ),
    },
    {
      icon: BarChart3,
      title: t("Impact rapidement mesurable", "Rapidly Measurable Impact"),
      content: t(
        "Mois d'avance vs concurrents · Deals protégés · Risques détectés · Capital réputationnel renforcé.",
        "Months ahead vs competitors · Deals protected · Risks detected · Reputational capital strengthened."
      ),
      detail: t(
        "400M$ sécurisés en Due Diligence · 180M MAD générés via influence publique · +14% PDM après crise · Crise sanitaire nationale atténuée en 2 semaines.",
        "$400M secured in Due Diligence · 180M MAD generated via public influence · +14% market share after crisis · National health crisis mitigated in 2 weeks."
      ),
    },
    {
      icon: Layers,
      title: t("Croisement des données", "Data Cross-Referencing"),
      content: t(
        "Données économiques + Contexte géopolitique + Risques réputationnels + Dynamiques narratives = Lucidité totale.",
        "Economic data + Geopolitical context + Reputational risks + Narrative dynamics = Total clarity."
      ),
      detail: t(
        "Intégration Intelligence — Influence — Due Diligence dans une même architecture. Lecture systémique : géopolitique, économique, médiatique et institutionnel.",
        "Integration of Intelligence — Influence — Due Diligence in a single architecture. Systemic reading: geopolitical, economic, media and institutional."
      ),
    },
    {
      icon: Award,
      title: t("Track Record prouvé", "Proven Track Record"),
      content: t(
        "Gouvernements, multinationales, organisations internationales sur 5 continents.",
        "Governments, multinationals, international organizations across 5 continents."
      ),
      detail: t(
        "25+ ans d'expérience · 59 pays couverts · Neutralité stratégique absolue · Transfert de supériorité décisionnelle.",
        "25+ years of experience · 59 countries covered · Absolute strategic neutrality · Transfer of decision-making superiority."
      ),
    },
    {
      icon: Lock,
      title: t("Confidentialité absolue", "Absolute Confidentiality"),
      content: t(
        "NDA systématique · Serveurs sécurisés · Équipes formées au secret professionnel.",
        "Systematic NDA · Secured servers · Teams trained in professional secrecy."
      ),
      detail: t(
        "Nous ne travaillons jamais simultanément avec deux concurrents directs. Clauses d'exclusivité sectorielle possibles.",
        "We never work simultaneously with two direct competitors. Sector exclusivity clauses available."
      ),
    },
  ];

  return (
    <section id="pourquoi-buildfluence" className="relative py-14" ref={ref} style={{ background: '#F7F8FA' }}>
      <div className="mx-auto" style={{ maxWidth: '760px', padding: '0 24px' }}>
        {/* Hero header */}
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

          {/* Badge de confiance */}
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

        {/* Grille 3x2 */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="group flex h-full w-full cursor-pointer flex-col rounded-sm border p-5 text-left transition-all hover:shadow-md"
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
                {openIndex === i && p.detail && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 whitespace-pre-line border-t pt-3 text-[12px]"
                    style={{ borderColor: '#E5E7EB', color: '#4A5568' }}
                  >
                    {p.detail}
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
