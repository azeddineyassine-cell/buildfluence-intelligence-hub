import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Building2, Cog, Leaf, ShieldCheck, Landmark, Target as TargetIcon, Globe2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const sectorIcons: Record<string, React.ElementType> = {
  "GOUVERNEMENT": Landmark, "GOVERNMENT": Landmark, "INDUSTRIE": Cog, "INDUSTRY": Cog,
  "AGRO-INDUSTRIE": Leaf, "AGRO-INDUSTRY": Leaf,
  "FINANCE SOUVERAINE": ShieldCheck, "SOVEREIGN FINANCE": ShieldCheck,
  "INSTITUTION PUBLIQUE": Building2, "PUBLIC INSTITUTION": Building2,
  "INDUSTRIE STRATÉGIQUE": TargetIcon, "STRATEGIC INDUSTRY": TargetIcon,
  "ORGANISATION INTERNATIONALE": Globe2, "INTERNATIONAL ORGANIZATION": Globe2,
  "SPORT PROFESSIONNEL": TargetIcon, "PROFESSIONAL SPORTS": TargetIcon,
};

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: t("Tous", "All"), value: "all" },
    { label: t("🔥 Gestion de crise", "🔥 Crisis management"), value: "crise" },
    { label: t("⚔ Attaques & Désinformation", "⚔ Attacks & Disinformation"), value: "attaque" },
    { label: t("💰 Due Diligence & Investissement", "💰 Due Diligence & Investment"), value: "dd" },
    { label: t("☞ Attractivité & Rayonnement", "☞ Attractiveness & Influence"), value: "attractivite" },
    { label: t("📡 Influence & Soft Power", "📡 Influence & Soft Power"), value: "influence" },
    { label: t("🌍 Écosystème Concurrentiel", "🌍 Competitive Ecosystem"), value: "concurrence" },
  ];

  const stories = [
    { client: t("Présidence du Sénégal", "Presidency of Senegal"), sector: t("GOUVERNEMENT", "GOVERNMENT"), tags: ["crise", "influence"], context: t("Crise majeure • Baromètre politique • Réputation", "Major crisis • Political barometer • Reputation"), result: t("Stabilisation institutionnelle en période de haute tension", "Institutional stabilization during high tension"), route: "/situations/decider-sans-visibilite" },
    { client: "Centrale Danone", sector: t("AGRO-INDUSTRIE", "AGRO-INDUSTRY"), tags: ["attaque", "crise"], context: t("Crise réputationnelle • 120M MAD de pertes", "Reputational crisis • 120M MAD in losses"), result: t("+14% de parts de marché après reconquête", "+14% market share after recovery"), route: "/situations/attaques-informationnelles" },
    { client: t("Fonds d'Investissement (confidentiel)", "Investment Fund (confidential)"), sector: t("FINANCE SOUVERAINE", "SOVEREIGN FINANCE"), tags: ["dd"], context: t("Capital-risque • 400M$ en jeu", "Venture capital • $400M at stake"), result: t("Investissement sécurisé, partenariat verrouillé", "Investment secured, partnership locked"), route: "/situations/investir-sous-risque" },
    { client: t("Ministère de la Santé", "Ministry of Health"), sector: t("INSTITUTION PUBLIQUE", "PUBLIC INSTITUTION"), tags: ["crise", "attaque"], context: t("Crise H1N1 • Désinformation massive", "H1N1 crisis • Massive disinformation"), result: t("Crise résolue en 2 semaines", "Crisis resolved in 2 weeks"), route: "/situations/crises-non-maitrisees" },
    { client: "OCP Group", sector: t("INDUSTRIE STRATÉGIQUE", "STRATEGIC INDUSTRY"), tags: ["concurrence"], context: t("10 ans de guerre informationnelle", "10 years of information warfare"), result: t("Réputation restaurée, parts de marché protégées", "Reputation restored, market share protected"), route: "/situations/perte-velocite" },
    { client: "CIDC (OCI)", sector: t("ORGANISATION INTERNATIONALE", "INTERNATIONAL ORGANIZATION"), tags: ["influence", "attractivite"], context: t("Déficit de notoriété • 57 pays", "Visibility deficit • 57 countries"), result: t("Doing Business Platform déployée", "Doing Business Platform deployed"), route: "/situations/deficit-influence" },
    { client: "ADD", sector: t("INSTITUTION PUBLIQUE", "PUBLIC INSTITUTION"), tags: ["influence"], context: t("Impact institutionnel limité", "Limited institutional impact"), result: t("Veille IA déployée • GITEX Africa", "AI monitoring deployed • GITEX Africa"), route: "/situations/deficit-influence" },
    { client: "UM6SS", sector: t("INSTITUTION PUBLIQUE", "PUBLIC INSTITUTION"), tags: ["attractivite", "influence"], context: t("Positionnement institutionnel", "Institutional positioning"), result: t("Visibilité renforcée", "Visibility strengthened"), route: "/situations/deficit-influence" },
    { client: "Raja Club Athletic", sector: t("SPORT PROFESSIONNEL", "PROFESSIONAL SPORTS"), tags: ["crise", "influence"], context: t("Pression médiatique et émotionnelle constante", "Constant media and emotional pressure"), result: t("Culture d'intelligence stratégique installée", "Strategic intelligence culture installed"), route: "/situations/gouverner-sous-pression" },
  ];

  const filtered = activeFilter === "all" ? stories : stories.filter(s => s.tags.includes(activeFilter));
  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="success-stories" className="relative py-28" ref={ref} style={{ background: '#0D1B2A' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Success Stories</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl" style={{ color: '#F0EDE6' }}>
            {t("Des mandats à la mesure des enjeux stratégiques", "Mandates matching the scale of strategic challenges")}
          </h2>
          <p className="mt-4 text-base" style={{ color: '#8A8F9E' }}>
            {t("Gouvernements, multinationales, institutions internationales : quand les enjeux sont critiques, ils nous font confiance.", "Governments, multinationals, international institutions: when the stakes are critical, they trust us.")}
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="rounded-sm px-3 py-1.5 text-[11px] font-medium transition-all"
              style={{
                background: activeFilter === f.value ? 'hsl(43 50% 54%)' : 'transparent',
                color: activeFilter === f.value ? '#0D1B2A' : '#8A8F9E',
                border: activeFilter === f.value ? '1px solid hsl(43 50% 54%)' : '1px solid hsl(220 20% 20%)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => {
            const SectorIcon = sectorIcons[s.sector] || Building2;
            return (
              <motion.div
                key={s.client}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => goTo(s.route)}
                className="card-dark group cursor-pointer p-6 transition-all hover:shadow-gold-hover"
              >
                <div className="flex items-center gap-2">
                  <SectorIcon className="h-3.5 w-3.5" style={{ color: 'hsl(43 50% 54%)' }} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'hsl(43 50% 54%)' }}>{s.sector}</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold leading-snug" style={{ color: '#F0EDE6' }}>{s.client}</h3>
                <p className="mt-2 text-[13px]" style={{ color: '#8A8F9E' }}>{s.context}</p>
                <div className="mt-4 h-px w-full" style={{ background: 'hsl(220 20% 20%)' }} />
                <p className="mt-3 text-[13px] font-semibold" style={{ color: 'hsl(43 50% 54%)' }}>→ {s.result}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'hsl(43 50% 54%)' }}>
                  {t("Lire l'étude de cas", "Read the case study")} <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
