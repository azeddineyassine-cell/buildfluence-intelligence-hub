import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cpu, Target, Layers, Lock, Award, ShieldCheck, Gauge } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const differentiators = [
    { icon: Cpu, num: "①", title: t("APPROCHE HUMTECH UNIQUE", "UNIQUE HUMTECH APPROACH"), content: t("Buildfluence agit là où se joue la vraie guerre d'information : l'architecture du pouvoir décisionnel. Nous combinons intelligence stratégique, influence et technologies avancées pour fournir une capacité de décision maîtrisée et anticipative.", "Buildfluence operates where the real information war is fought: the architecture of decision-making power. We combine strategic intelligence, influence and advanced technologies to deliver a controlled and anticipatory decision-making capability."), detail: t("Technologies IA : OSINT premium · NLP · Études prédictives propriétaires · Plateformes IA sur-mesure\nExpertise humaine : Analystes géopolitiques · Stratèges d'influence · Fact-checkers · Experts sectoriels\nRésultat : Une lucidité décisionnelle que ni la tech seule, ni les humains seuls, ne peuvent produire.", "AI Technologies: Premium OSINT · NLP · Proprietary predictive studies · Custom AI platforms\nHuman Expertise: Geopolitical analysts · Influence strategists · Fact-checkers · Sector experts\nResult: A decision-making clarity that neither technology alone, nor humans alone, can produce.") },
    { icon: Target, num: "②", title: t("ORIENTATION DÉCISION, PAS INFORMATION", "DECISION-ORIENTED, NOT INFORMATION"), content: t("Nous ne vendons pas de la veille classique. Nous vendons de la lucidité décisionnelle.", "We don't sell traditional monitoring. We sell decision-making clarity."), detail: t("❌ Les autres : Rapports indigestes · Tableaux Excel incompréhensibles · PowerPoints sans recommandations\n✅ Nous : Synthèses actionnables · Scoring Go/No-Go · Dashboards interactifs · Recommandations concrètes\nChaque analyse produit des décisions, pas des rapports.", "❌ Others: Indigestible reports · Incomprehensible Excel spreadsheets · PowerPoints without recommendations\n✅ Us: Actionable summaries · Go/No-Go scoring · Interactive dashboards · Concrete recommendations\nEvery analysis produces decisions, not reports.") },
    { icon: Layers, num: "③", title: t("NOUS CROISONS CE QUE D'AUTRES SÉPARENT", "WE CROSS WHAT OTHERS SEPARATE"), content: t("Vision 360° : Données économiques + Contexte géopolitique + Risques réputationnels + Dynamiques narratives + Jeux d'influence = Lucidité totale", "360° Vision: Economic data + Geopolitical context + Reputational risks + Narrative dynamics + Influence games = Total clarity"), detail: "" },
    { icon: Award, num: "④", title: t("TRACK RECORD PROUVÉ", "PROVEN TRACK RECORD"), content: t("Gouvernements, multinationales, organisations internationales sur 5 continents.", "Governments, multinationals, international organizations across 5 continents."), detail: t("KPIs : 400M$ sécurisés en Due Diligence · 180M MAD générés via influence publique · +14% PDM après crise · Crise sanitaire nationale atténuée en 2 semaines", "KPIs: $400M secured in Due Diligence · 180M MAD generated via public influence · +14% market share after crisis · National health crisis mitigated in 2 weeks") },
    { icon: Lock, num: "⑤", title: t("CONFIDENTIALITÉ ABSOLUE", "ABSOLUTE CONFIDENTIALITY"), content: t("NDA systématique · Serveurs sécurisés (niveau Souveraineté d'État) · Équipes formées au secret professionnel · Clauses d'exclusivité sectorielle possibles", "Systematic NDA · Secured servers (State Sovereignty level) · Teams trained in professional secrecy · Sector exclusivity clauses available"), detail: t("Nous ne travaillons jamais simultanément avec deux concurrents directs.\n« Nous n'acceptons pas tous les mandats. Nous choisissons les organisations qui méritent cette infrastructure. »", "We never work simultaneously with two direct competitors.\n\"We don't accept all mandates. We choose the organizations that deserve this infrastructure.\"") },
    { icon: Gauge, num: "⑥", title: t("NOUS MESURONS NOTRE IMPACT", "WE MEASURE OUR IMPACT"), content: t("Strategic Intelligence : Mois d'avance vs concurrents · Threat Intelligence : Temps de détection, impact évité · Due Diligence : Deals protégés, risques détectés · Influence : Capital réputationnel, couverture médiatique", "Strategic Intelligence: Months ahead vs competitors · Threat Intelligence: Detection time, impact avoided · Due Diligence: Deals protected, risks detected · Influence: Reputational capital, media coverage"), detail: "" },
    { icon: ShieldCheck, num: "⑦", title: t("INFRASTRUCTURE DÉCISIONNELLE EXTERNE", "EXTERNAL DECISION-MAKING INFRASTRUCTURE"), content: t("Buildfluence ne fournit pas des recommandations ponctuelles, mais une architecture permettant de structurer durablement la décision.", "Buildfluence doesn't provide one-off recommendations, but an architecture to sustainably structure decision-making."), detail: t("• Intégration Intelligence — Influence — Due Diligence dans une même architecture\n• Lecture systémique : géopolitique, économique, médiatique et institutionnel\n• Neutralité stratégique absolue\n• Transfert de supériorité décisionnelle au client\n• Conçu pour les environnements sensibles", "• Integration of Intelligence — Influence — Due Diligence in a single architecture\n• Systemic reading: geopolitical, economic, media and institutional\n• Absolute strategic neutrality\n• Transfer of decision-making superiority to the client\n• Designed for sensitive environments") },
  ];


  return (
    <section id="pourquoi-buildfluence" className="relative py-28" ref={ref} style={{ background: '#F4F4F4' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">{t("Pourquoi Buildfluence", "Why Buildfluence")}</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl" style={{ color: '#0D1B2A' }}>
            {t("Ce qui nous distingue", "What sets us apart")}
          </h2>
          <p className="mt-3 text-base italic" style={{ color: '#5A6170' }}>
            {t("Infrastructure décisionnelle externe", "External decision-making infrastructure")}
          </p>
          <p className="mt-6 text-lg" style={{ color: '#5A6170' }}>
            {t("Parce que la décision n'a de valeur que si elle réussit.", "Because a decision has value only if it succeeds.")}
          </p>
        </motion.div>

        <div className="mt-16 space-y-3">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.num}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full cursor-pointer rounded-sm border p-6 text-left transition-all hover:shadow-md"
                style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
              >
                <div className="flex items-start gap-4">
                  <d.icon className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: 'hsl(43 50% 54%)' }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span style={{ color: 'hsl(43 50% 54%)' }}>{d.num}</span>
                      <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#0D1B2A' }}>{d.title}</h3>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#6B7280' }}>{d.content}</p>
                    {openIndex === i && d.detail && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 whitespace-pre-line border-t pt-3 text-[13px]"
                        style={{ borderColor: '#E5E7EB', color: '#4A5568' }}
                      >
                        {d.detail}
                      </motion.div>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-16 max-w-2xl rounded-sm p-8 text-center"
          style={{ background: 'hsl(43 50% 54% / 0.06)', border: '1px solid hsl(43 50% 54% / 0.15)' }}
        >
          <p className="font-serif text-lg italic" style={{ color: '#0D1B2A' }}>
            {t(
              "Nous sécurisons vos décisions avec un niveau de lucidité rarement atteint dans le monde des affaires.",
              "We secure your decisions with a level of clarity rarely achieved in the business world."
            )}
          </p>
          <ul className="mt-6 space-y-2 text-[15px] font-medium text-left" style={{ color: '#0D1B2A' }}>
            <li>{t("Nous détectons ce que vous ne voyez pas", "We detect what you don't see")}</li>
            <li>{t("Nous décryptons ce que vous ne comprenez pas", "We decipher what you don't understand")}</li>
            <li>{t("Nous anticipons ce que vous ne prévoyez pas", "We anticipate what you don't foresee")}</li>
            <li>{t("Nous neutralisons ce qui vous menace", "We neutralize what threatens you")}</li>
            <li>{t("Nous amplifions ce qui vous renforce", "We amplify what strengthens you")}</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
