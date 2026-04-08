import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import RayonnementMechanism from "@/components/RayonnementMechanism";
import { motion } from "framer-motion";

const FlipCard = ({ front, back }: { front: React.ReactNode; back: React.ReactNode }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1200px", minHeight: "420px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%", minHeight: "420px" }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden", position: flipped ? "absolute" : "relative", inset: 0 }}
          className="rounded-xl p-8 flex flex-col items-center justify-center text-center h-full"
        >
          {front}
        </div>
        {/* Back */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: flipped ? "relative" : "absolute", inset: 0 }}
          className="rounded-xl p-8 flex flex-col h-full"
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

const SoftPowerInfluence = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: "📣",
      title: t("Intelligence d'Influence", "Influence Intelligence"),
      subtitle: t("Orientez les perceptions avant qu'elles ne deviennent des décisions", "Shape perceptions before they become decisions"),
      bg: "linear-gradient(135deg, #0D1B2A 0%, #1a3a5c 100%)",
      items: [
        t("Mapping des leaders d'opinion, investisseurs, relais médiatiques", "Mapping of opinion leaders, investors, media relays"),
        t("Identification des nœuds d'amplification narrative", "Identification of narrative amplification nodes"),
        t("Cartographie des alliances et rivalités narratives", "Mapping of alliances and narrative rivalries"),
        t("Choix des circuits d'amplification légitimes", "Choice of legitimate amplification circuits"),
        t("Synchronisation messages / relais / timing", "Message / relay / timing synchronization"),
      ],
    },
    {
      icon: "🏛",
      title: "Political Intelligence",
      subtitle: t("Prenez un temps d'avance sur votre écosystème décisionnel", "Stay one step ahead of your decision-making ecosystem"),
      bg: "linear-gradient(135deg, #1a3a5c 0%, #0D1B2A 100%)",
      items: [
        t("Cartographie des décideurs publics clés", "Mapping of key public decision-makers"),
        t("Lecture des chaînes de décision formelles et informelles", "Reading formal and informal decision chains"),
        t("Identification des points de blocage et leviers d'action", "Identification of blocking points and action levers"),
        t("Monitoring des sentiments politiques structurants", "Monitoring of structuring political sentiments"),
        t("Analyse de la capacité de nuisance des opposants", "Analysis of opponents' harmful capacity"),
        t("Design d'un narratif d'utilité publique", "Design of a public utility narrative"),
        t("Production d'un Baromètre politique actionnable", "Production of an actionable political Barometer"),
      ],
    },
    {
      icon: "🗺",
      title: "Territorial Influence Lab",
      subtitle: t("Pilotez votre territoire vers l'attractivité et l'influence", "Steer your territory towards attractiveness and influence"),
      bg: "linear-gradient(135deg, #0D1B2A 0%, #1e2d4a 100%)",
      items: [
        t("Captation de l'intérêt des investisseurs", "Capturing investor interest"),
        t("Cartographie de votre écosystème territorial", "Mapping of your territorial ecosystem"),
        t("Benchmark pays/régions concurrentes", "Competing countries/regions benchmark"),
        t("Stratégie de présence dans les forums internationaux", "Strategy for presence in international forums"),
        t("Construction de narratifs territoriaux crédibles et différenciants", "Construction of credible and differentiating territorial narratives"),
        t("Activation de think tanks et leaders d'opinion", "Activation of think tanks and opinion leaders"),
      ],
    },
  ];

  return (
    <DetailPageLayout
      title="Soft Power & Influence"
      chapeau={t("Ne laissez pas les autres écrire votre histoire. Façonnez votre perception. Imposez votre narratif.", "Don't let others write your story. Shape your perception. Impose your narrative.")}
      ctas={[{ label: t("Parler de mon projet", "Discuss my project"), action: "#", formType: "f1" }]}
      situationContext="Soft Power & Influence"
    >
      <RayonnementMechanism />

      {/* 3 Flip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        {cards.map((card, idx) => (
          <FlipCard
            key={idx}
            front={
              <div className="w-full h-full flex flex-col items-center justify-center rounded-xl shadow-xl" style={{ background: card.bg, minHeight: "420px" }}>
                <span className="text-5xl mb-5">{card.icon}</span>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed max-w-[240px] mb-6">{card.subtitle}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider">{t("Cliquer pour découvrir →", "Click to discover →")}</p>
              </div>
            }
            back={
              <div className="w-full h-full flex flex-col rounded-xl shadow-xl" style={{ background: card.bg, minHeight: "420px" }}>
                <h3 className="text-lg font-bold text-white mb-4">{card.title}</h3>
                <ul className="space-y-2.5 flex-1">
                  {card.items.map((item, i) => (
                    <li key={i} className="text-sm text-white/80 leading-relaxed pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-[#C9A84C] before:text-sm">{item}</li>
                  ))}
                </ul>
                <p className="text-[11px] text-white/40 uppercase tracking-wider mt-4 text-center">{t("Cliquer pour retourner", "Click to flip back")}</p>
              </div>
            }
          />
        ))}
      </div>
    </DetailPageLayout>
  );
};
export default SoftPowerInfluence;
