import DetailPageLayout, { DetailBlock, DetailList } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const CompetitiveVelocityEngine = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title="Competitive Velocity Engine"
      chapeau={t("Mapping dynamique de votre écosystème concurrentiel : concurrents, R&D, opportunités de marché et alliances offshore.", "Dynamic mapping of your competitive ecosystem: competitors, R&D, market opportunities and offshore alliances.")}
      ctas={[{ label: t("Réserver mon échange stratégique", "Book my strategic exchange"), action: "#", formType: "f1" }]}
    >
      <DetailBlock title={t("Ce que nous faisons", "What we do")}>
        <DetailList items={[
          t("Intelligence concurrentielle en temps réel", "Real-time competitive intelligence"),
          t("Veille sur signaux faibles d'innovation (brevets, startups, financements)", "Monitoring weak innovation signals (patents, startups, funding)"),
          t("Benchmark et étude prédictive sur les mouvements stratégiques de la concurrence", "Benchmark and predictive study on competitive strategic movements"),
          t("Cartographie des levées de fonds et des nouveaux entrants disruptifs", "Mapping fundraising rounds and disruptive new entrants"),
          t("Dashboard d'alerte avec scoring Go/No-Go automatisé", "Alert dashboard with automated Go/No-Go scoring"),
        ]} />
      </DetailBlock>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
