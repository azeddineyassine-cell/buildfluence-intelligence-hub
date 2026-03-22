import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const StrategicWorkflow = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Installer une culture d'intelligence stratégique et un système de décision augmentée au sein de votre entité", "Installing a strategic intelligence culture and augmented decision-making system within your entity")}
      chapeau={t("Structuration et professionnalisation d'une unité de veille & d'intelligence stratégique.", "Structuring and professionalizing a strategic intelligence & monitoring unit.")}
      ctas={[{ label: t("Réserver mon échange stratégique", "Book my strategic exchange"), action: "#", formType: "f1" }]}
    >
      <DetailBlock title={t("Le Process en 6 Étapes", "The 6-Step Process")}>
        <div className="mt-4 space-y-4">
          {[
            { num: "1", title: t("Cadrage & Définition des Objectifs", "Framing & Objectives Definition"), desc: t("Ateliers stratégiques. Mapping des angles morts.", "Strategic workshops. Blind spot mapping.") },
            { num: "2", title: t("Ateliers Collaboratifs", "Collaborative Workshops"), desc: t("Co-construction du Framework décisionnel.", "Co-construction of the decision-making framework.") },
            { num: "3", title: t("Implémentation AI", "AI Implementation"), desc: t("Déploiement des outils de veille augmentée. Configuration IA.", "Deployment of augmented monitoring tools. AI configuration.") },
            { num: "4", title: t("Extraction des Tendances", "Trend Extraction"), desc: t("Analyse continue. Détection automatique des patterns.", "Continuous analysis. Automatic pattern detection.") },
            { num: "5", title: "DataViz & Dashboards", desc: t("Tableaux de bord sur-mesure. Visualisations interactives.", "Custom dashboards. Interactive visualizations.") },
            { num: "6", title: "Strategic Intelligence Empowerment", desc: t("Accompagnement continu. Autonomisation progressive.", "Continuous support. Progressive empowerment.") },
          ].map((step) => (
            <div key={step.num} className="card-glass flex items-start gap-4 p-5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-primary/10 font-serif text-sm font-bold text-primary">
                {step.num}
              </div>
              <div>
                <h4 className="text-sm font-bold">{step.title}</h4>
                <p className="mt-1 text-[13px] text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DetailBlock>
      <CaseStudy
        title={t("Cas client : Raja Club Athletic", "Client case: Raja Club Athletic")}
        context={t("Architecture et structuration de la cellule de veille. Segmentation des thématiques. Gouvernance. Formation et accompagnement.", "Architecture and structuring of the monitoring unit. Topic segmentation. Governance. Training and support.")}
        intervention={[
          t("Architecture de la cellule de veille", "Monitoring unit architecture"),
          t("Segmentation des thématiques stratégiques", "Strategic topic segmentation"),
          t("Gouvernance et formation", "Governance and training"),
        ]}
        result={t("Cycles de décision réduits. Silos éliminés. Culture d'intelligence installée.", "Decision cycles reduced. Silos eliminated. Intelligence culture installed.")}
      />
    </DetailPageLayout>
  );
};

export default StrategicWorkflow;
