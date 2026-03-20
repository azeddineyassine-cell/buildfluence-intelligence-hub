import DetailPageLayout, { DetailBlock, DetailList } from "@/components/DetailPageLayout";

const CompetitiveVelocityEngine = () => (
  <DetailPageLayout
    title="Competitive Velocity Engine"
    chapeau="Mapping dynamique de votre écosystème concurrentiel : concurrents, R&D, opportunités de marché et alliances offshore."
    ctas={[
      { label: "Réserver mon échange stratégique", action: "#", formType: "f1" },
    ]}
  >
    <DetailBlock title="Ce que nous faisons">
      <DetailList items={[
        "Intelligence concurrentielle en temps réel",
        "Veille sur signaux faibles d'innovation (brevets, startups, financements)",
        "Benchmark et étude prédictive sur les mouvements stratégiques de la concurrence",
        "Cartographie des levées de fonds et des nouveaux entrants disruptifs",
        "Dashboard d'alerte avec scoring Go/No-Go automatisé",
      ]} />
    </DetailBlock>
  </DetailPageLayout>
);

export default CompetitiveVelocityEngine;
