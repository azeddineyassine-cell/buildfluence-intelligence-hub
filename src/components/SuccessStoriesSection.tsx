import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Building2, Cog, Leaf, ShieldCheck, Landmark, Target as TargetIcon, Globe2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const filters = [
  { label: "Tous", value: "all" },
  { label: "🔥 Gestion de crise", value: "crise" },
  { label: "⚔ Attaques & Désinformation", value: "attaque" },
  { label: "💰 Due Diligence & Investissement", value: "dd" },
  { label: "☞ Attractivité & Rayonnement", value: "attractivite" },
  { label: "📡 Influence & Soft Power", value: "influence" },
  { label: "🌍 Écosystème Concurrentiel", value: "concurrence" },
];

const sectorIcons: Record<string, React.ElementType> = {
  "GOUVERNEMENT": Landmark,
  "INDUSTRIE": Cog,
  "AGRO-INDUSTRIE": Leaf,
  "FINANCE SOUVERAINE": ShieldCheck,
  "INSTITUTION PUBLIQUE": Building2,
  "INDUSTRIE STRATÉGIQUE": TargetIcon,
  "ORGANISATION INTERNATIONALE": Globe2,
  "SPORT PROFESSIONNEL": TargetIcon,
};

const stories = [
  {
    client: "Présidence du Sénégal",
    sector: "GOUVERNEMENT",
    tags: ["crise", "influence"],
    context: "Crise majeure • Baromètre politique • Réputation",
    result: "Stabilisation institutionnelle en période de haute tension",
    route: "/situations/decider-sans-visibilite",
  },
  {
    client: "Centrale Danone",
    sector: "AGRO-INDUSTRIE",
    tags: ["attaque", "crise"],
    context: "Crise réputationnelle • 120M MAD de pertes",
    result: "+14% de parts de marché après reconquête",
    route: "/situations/attaques-informationnelles",
  },
  {
    client: "Fonds d'Investissement (confidentiel)",
    sector: "FINANCE SOUVERAINE",
    tags: ["dd"],
    context: "Capital-risque • 400M$ en jeu",
    result: "Investissement sécurisé, partenariat verrouillé",
    route: "/situations/investir-sous-risque",
  },
  {
    client: "Ministère de la Santé",
    sector: "INSTITUTION PUBLIQUE",
    tags: ["crise", "attaque"],
    context: "Crise H1N1 • Désinformation massive",
    result: "Crise résolue en 2 semaines",
    route: "/situations/crises-non-maitrisees",
  },
  {
    client: "OCP Group",
    sector: "INDUSTRIE STRATÉGIQUE",
    tags: ["concurrence"],
    context: "10 ans de guerre informationnelle",
    result: "Réputation restaurée, parts de marché protégées",
    route: "/situations/perte-velocite",
  },
  {
    client: "CIDC (OCI)",
    sector: "ORGANISATION INTERNATIONALE",
    tags: ["influence", "attractivite"],
    context: "Déficit de notoriété • 57 pays",
    result: "Doing Business Platform déployée",
    route: "/situations/deficit-influence",
  },
  {
    client: "ADD",
    sector: "INSTITUTION PUBLIQUE",
    tags: ["influence"],
    context: "Impact institutionnel limité",
    result: "Veille IA déployée • GITEX Africa",
    route: "/situations/deficit-influence",
  },
  {
    client: "UM6SS",
    sector: "INSTITUTION PUBLIQUE",
    tags: ["attractivite", "influence"],
    context: "Positionnement institutionnel",
    result: "Visibilité renforcée",
    route: "/situations/deficit-influence",
  },
  {
    client: "Raja Club Athletic",
    sector: "SPORT PROFESSIONNEL",
    tags: ["crise", "influence"],
    context: "Pression médiatique et émotionnelle constante",
    result: "Culture d'intelligence stratégique installée",
    route: "/situations/gouverner-sous-pression",
  },
];

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all" ? stories : stories.filter(s => s.tags.includes(activeFilter));
  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="success-stories" className="relative bg-background py-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Success Stories</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Des mandats à la mesure des enjeux stratégiques
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Gouvernements, multinationales, institutions internationales : quand les enjeux sont critiques, ils nous font confiance.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-sm px-3 py-1.5 text-[11px] font-medium transition-all ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
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
                className="card-glass group cursor-pointer p-6 transition-all hover:shadow-gold-hover"
              >
                <div className="flex items-center gap-2">
                  <SectorIcon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">{s.sector}</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold leading-snug">{s.client}</h3>
                <p className="mt-2 text-[13px] text-muted-foreground">{s.context}</p>
                <div className="mt-4 h-px w-full bg-border" />
                <p className="mt-3 text-[13px] font-semibold text-primary">→ {s.result}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Lire l'étude de cas <ArrowRight className="h-3 w-3" />
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
