import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import StrategicOrbitDiagram from "@/components/StrategicOrbitDiagram";
import TimelineEmbed from "@/components/TimelineEmbed";
import { FormCustom } from "@/components/FormCustom";
import { motion } from "framer-motion";

const FlipCard = ({ front, back }: { front: React.ReactNode; back: React.ReactNode }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1200px", minHeight: "280px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%", minHeight: "280px" }}
      >
        <div
          style={{ backfaceVisibility: "hidden", position: flipped ? "absolute" : "relative", inset: 0 }}
          className="rounded-xl p-8 flex flex-col items-center justify-center text-center h-full"
        >
          {front}
        </div>
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

const AIPoweredMonitor = () => {
  const { t } = useLanguage();
  const [formOpen, setFormOpen] = useState(false);

  const cards = [
    {
      icon: "📡",
      title: t("Captation & Intelligence IA", "Capture & AI Intelligence"),
      subtitle: t("L'IA qui transforme le bruit en signal décisionnel", "AI that transforms noise into decision signals"),
      bg: "#215983",
      items: [
        t("Veille multicanale augmentée par l'IA : Web, brevets, publications scientifiques, BDD, Agrégateurs de presse, etc.", "AI-augmented multi-channel monitoring: Web, patents, scientific publications, databases, press aggregators, etc."),
        t("NLP & analyse sémantique avancée", "NLP & advanced semantic analysis"),
        t("Détection automatique des signaux faibles", "Automatic weak signal detection"),
        t("Filtrage intelligent du bruit informationnel", "Intelligent information noise filtering"),
        t("Extraction des insights actionnables en temps réel", "Extraction of actionable insights in real time"),
      ],
    },
    {
      icon: "⚡",
      title: t("Alerting & Décision", "Alerting & Decision"),
      subtitle: t("Décider avant que la menace ne s'impose", "Decide before the threat takes hold"),
      bg: "#215983",
      items: [
        t("Alertes configurables par enjeu et criticité", "Configurable alerts by issue and criticality"),
        t("Scoring automatique de criticité Go / Vigilance / No-Go", "Automatic Go / Caution / No-Go criticality scoring"),
        t("Cockpits décisionnels personnalisés par métier", "Custom decision cockpits by business function"),
        t("DataViz dynamiques & KPIs temps réel", "Dynamic DataViz & real-time KPIs"),
        t("Accessibilité 24/7 - Infrastructure souveraine", "24/7 accessibility - Sovereign infrastructure"),
      ],
    },
    {
      icon: "📢",
      title: t("Production, Capitalisation & Diffusion", "Production, Capitalization & Distribution"),
      subtitle: t("Transformer chaque signal en levier d'action", "Transform every signal into an action lever"),
      bg: "#215983",
      items: [
        t("Production de contenu intelligent", "Intelligent content production"),
        t("Magazines sectoriels personnalisés par destinataire (Flipbook)", "Custom sector magazines by recipient (Flipbook)"),
        t("Newsletters, Baromètres & Business Reviews ciblées", "Newsletters, Barometers & targeted Business Reviews"),
        t("Diffusion sécurisée par niveau de confidentialité", "Secure distribution by confidentiality level"),
        t("Traçabilité des lectures et mesure d'impact", "Reading traceability and impact measurement"),
      ],
    },
  ];

  return (
    <DetailPageLayout
      title={t("Des plateformes de pouvoir décisionnel", "Decision-making power platforms")}
      titleClassName="text-center"
      chapeau={t("Surveillez vos marchés en temps réel, anticipez les signaux faibles et gardez toujours une longueur d'avance sur vos concurrents.", "Monitor your markets in real time, anticipate weak signals and always stay one step ahead of your competitors.")}
      chapeauClassName="text-center mb-2"
    >
      <StrategicOrbitDiagram />
      <TimelineEmbed />

      {/* 3 Flip Cards */}
      <div className="rounded-xl px-6 py-8 my-10" style={{ background: '#F5F3E9' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <FlipCard
              key={idx}
              front={
                <div className="w-full h-full flex flex-col items-center justify-center rounded-xl shadow-xl" style={{ background: card.bg, minHeight: "280px" }}>
                  <span className="text-5xl mb-5">{card.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{card.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed max-w-[240px] mb-6 text-center">{card.subtitle}</p>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider">{t("Cliquer pour découvrir →", "Click to discover →")}</p>
                </div>
              }
              back={
                <div className="w-full h-full flex flex-col rounded-xl shadow-xl" style={{ background: card.bg, minHeight: "280px" }}>
                  <h3 className="text-lg font-bold text-white mb-4 text-center">{card.title}</h3>
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
      </div>

      {/* Custom CTA */}
      <div className="text-center my-10 rounded-xl py-8" style={{ background: '#F5F3E9' }}>
        <button
          onClick={() => setFormOpen(true)}
          className="hover:opacity-90 transition-opacity"
          style={{
            background: "#C9A84C",
            color: "#0D1B2A",
            fontWeight: 700,
            padding: "14px 32px",
            borderRadius: 6,
            border: "none",
            fontSize: 14,
            letterSpacing: 0.5,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          {t("Activer votre Portail de Veille", "Activate your Monitoring Portal")} →
        </button>
      </div>

      <FormCustom
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={t("Activer votre Portail de Veille", "Activate your Monitoring Portal")}
        submitLabel={t("Démarrer la Veille", "Start Monitoring")}
        formType="ai_powered_monitor"
        fields={[
          { name: "name", placeholder: t("Nom & Prénom", "Full name"), required: true, maxLength: 100 },
          { name: "organization", placeholder: t("Organisation", "Organization"), required: true, maxLength: 100 },
          { name: "sector", placeholder: t("Secteur à surveiller", "Sector to monitor"), required: true, maxLength: 150 },
          { name: "keywords", placeholder: t("Mots-clés prioritaires", "Priority keywords"), required: true, type: "textarea", rows: 4 },
          { name: "email", placeholder: t("Email professionnel", "Professional email"), required: true, type: "email", maxLength: 255 },
        ]}
      />
    </DetailPageLayout>
  );
};

export default AIPoweredMonitor;
