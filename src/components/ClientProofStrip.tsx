import { useLanguage } from "@/contexts/LanguageContext";

const ClientProofStrip = () => {
  const { t } = useLanguage();

  const items = [
    t("Intelligence Stratégique", "Strategic Intelligence"),
    t("Architecture Décisionnelle", "Decision Architecture"),
    t("Avantage Compétitif", "Competitive Advantage"),
    t("Neutralisation des Menaces", "Threat Neutralization"),
    t("Souveraineté Opérationnelle", "Operational Sovereignty"),
  ];

  return (
    <div
      className="flex flex-wrap justify-center gap-14 px-12 py-[18px]"
      style={{ background: 'hsl(var(--navy))' }}
    >
      {items.map((item) => (
        <span
          key={item}
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default ClientProofStrip;
