import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cpu, Target, Layers, Lock, Award, ShieldCheck, Gauge } from "lucide-react";

const differentiators = [
  { icon: Cpu, num: "①", title: "APPROCHE HUMTECH UNIQUE", content: "Buildfluence agit là où se joue la vraie guerre d'information : l'architecture du pouvoir décisionnel. Nous combinons intelligence stratégique, influence et technologies avancées pour fournir une capacité de décision maîtrisée et anticipative.", detail: "Technologies IA : OSINT premium · NLP · Études prédictives propriétaires · Plateformes IA sur-mesure\nExpertise humaine : Analystes géopolitiques · Stratèges d'influence · Fact-checkers · Experts sectoriels\nRésultat : Une lucidité décisionnelle que ni la tech seule, ni les humains seuls, ne peuvent produire." },
  { icon: Target, num: "②", title: "ORIENTATION DÉCISION, PAS INFORMATION", content: "Nous ne vendons pas de la veille classique. Nous vendons de la lucidité décisionnelle.", detail: "❌ Les autres : Rapports indigestes · Tableaux Excel incompréhensibles · PowerPoints sans recommandations\n✅ Nous : Synthèses actionnables · Scoring Go/No-Go · Dashboards interactifs · Recommandations concrètes\nChaque analyse produit des décisions, pas des rapports." },
  { icon: Layers, num: "③", title: "NOUS CROISONS CE QUE D'AUTRES SÉPARENT", content: "Vision 360° : Données économiques + Contexte géopolitique + Risques réputationnels + Dynamiques narratives + Jeux d'influence = Lucidité totale", detail: "" },
  { icon: Award, num: "④", title: "TRACK RECORD PROUVÉ", content: "Gouvernements, multinationales, organisations internationales sur 5 continents.", detail: "KPIs : 400M$ sécurisés en Due Diligence · 180M MAD générés via influence publique · +14% PDM après crise · Crise sanitaire nationale atténuée en 2 semaines" },
  { icon: Lock, num: "⑤", title: "CONFIDENTIALITÉ ABSOLUE", content: "NDA systématique · Serveurs sécurisés (niveau Souveraineté d'État) · Équipes formées au secret professionnel · Clauses d'exclusivité sectorielle possibles", detail: "Nous ne travaillons jamais simultanément avec deux concurrents directs.\n« Nous n'acceptons pas tous les mandats. Nous choisissons les organisations qui méritent cette infrastructure. »" },
  { icon: Gauge, num: "⑥", title: "NOUS MESURONS NOTRE IMPACT", content: "Strategic Intelligence : Mois d'avance vs concurrents · Threat Intelligence : Temps de détection, impact évité · Due Diligence : Deals protégés, risques détectés · Influence : Capital réputationnel, couverture médiatique", detail: "" },
  { icon: ShieldCheck, num: "⑦", title: "INFRASTRUCTURE DÉCISIONNELLE EXTERNE", content: "Buildfluence ne fournit pas des recommandations ponctuelles, mais une architecture permettant de structurer durablement la décision.", detail: "• Intégration Intelligence — Influence — Due Diligence dans une même architecture\n• Lecture systémique : géopolitique, économique, médiatique et institutionnel\n• Neutralité stratégique absolue\n• Transfert de supériorité décisionnelle au client\n• Conçu pour les environnements sensibles" },
];

const levels = [
  { num: "1", title: "Diagnostic stratégique", time: "48h à 72h" },
  { num: "2", title: "Projet ponctuel", time: "" },
  { num: "3", title: "Accompagnement récurrent", time: "" },
  { num: "4", title: "Transformation stratégique", time: "" },
];

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="pourquoi-buildfluence" className="relative py-28" ref={ref} style={{ background: '#F4F4F4' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Pourquoi Buildfluence</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl" style={{ color: '#0D1B2A' }}>
            Ce qui nous distingue
          </h2>
          <p className="mt-3 text-base italic" style={{ color: '#5A6170' }}>
            Infrastructure décisionnelle externe
          </p>
          <p className="mt-6 text-lg" style={{ color: '#5A6170' }}>
            Parce que la décision n'a de valeur que si elle réussit.
          </p>
        </motion.div>

        <div className="mt-16 space-y-3">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-center font-serif text-xl font-bold" style={{ color: '#0D1B2A' }}>Accompagnement sur-mesure</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {levels.map((l) => (
              <div key={l.num} className="rounded-sm border p-5 text-center" style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}>
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-sm font-serif text-sm font-bold" style={{ background: 'hsl(43 50% 54% / 0.1)', color: 'hsl(43 50% 54%)' }}>
                  {l.num}
                </div>
                <p className="text-sm font-semibold" style={{ color: '#0D1B2A' }}>{l.title}</p>
                {l.time && <p className="mt-1 text-[11px]" style={{ color: '#8A8F9E' }}>{l.time}</p>}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-16 max-w-2xl rounded-sm p-8 text-center"
          style={{ background: 'hsl(43 50% 54% / 0.06)', border: '1px solid hsl(43 50% 54% / 0.15)' }}
        >
          <p className="font-serif text-lg italic" style={{ color: '#0D1B2A' }}>
            "Nous sécurisons vos décisions avec un niveau de lucidité rarement atteint dans le monde des affaires."
          </p>
          <ul className="mt-4 space-y-1 text-[13px]" style={{ color: '#5A6170' }}>
            <li>• Nous détectons ce que vous ne voyez pas</li>
            <li>• Nous décryptons ce que vous ne comprenez pas</li>
            <li>• Nous anticipons ce que vous ne prévoyez pas</li>
            <li>• Nous neutralisons ce qui vous menace</li>
            <li>• Nous amplifions ce qui vous renforce</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;