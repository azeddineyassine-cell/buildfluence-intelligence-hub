import DetailPageLayout, { DetailBlock } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const KnowledgeCapitalization = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Capitalisation des Connaissances", "Knowledge Capitalization")}
      chapeau={t("Structuration de l'intelligence collective de votre organisation pour éliminer les silos informationnels et accélérer l'exécution stratégique.", "Structuring your organization's collective intelligence to eliminate information silos and accelerate strategic execution.")}
      ctas={[{ label: t("Réserver mon échange stratégique", "Book my strategic exchange"), action: "#", formType: "f1" }]}
    >
      <DetailBlock title={t("Notre approche", "Our approach")}>
        <p className="mt-2">{t("Contenu détaillé à définir selon les spécifications du projet. Cette capacité vise à transformer le capital informationnel dispersé de votre organisation en un avantage stratégique structuré et exploitable.", "Detailed content to be defined per project specifications. This capability aims to transform your organization's dispersed informational capital into a structured and actionable strategic advantage.")}</p>
      </DetailBlock>
    </DetailPageLayout>
  );
};

export default KnowledgeCapitalization;
