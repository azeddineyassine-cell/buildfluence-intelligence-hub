import DetailPageLayout, { DetailBlock } from "@/components/DetailPageLayout";

const KnowledgeCapitalization = () => (
  <DetailPageLayout
    title="Capitalisation des Connaissances"
    chapeau="Structuration de l'intelligence collective de votre organisation pour éliminer les silos informationnels et accélérer l'exécution stratégique."
    ctas={[
      { label: "Réserver mon échange stratégique", action: "#", formType: "f1" },
    ]}
  >
    <DetailBlock title="Notre approche">
      <p className="mt-2">
        Contenu détaillé à définir selon les spécifications du projet. Cette capacité vise à transformer le capital informationnel dispersé de votre organisation en un avantage stratégique structuré et exploitable.
      </p>
    </DetailBlock>
  </DetailPageLayout>
);

export default KnowledgeCapitalization;
