import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const StrategicWorkflow = () => (
  <DetailPageLayout
    title="Installer une culture d'intelligence stratégique et un système de décision augmentée au sein de votre entité"
    chapeau="Structuration et professionnalisation d'une unité de veille & d'intelligence stratégique."
    ctas={[
      { label: "Réserver mon échange stratégique", action: "#", formType: "f1" },
    ]}
  >
    <DetailBlock title="Le Process en 6 Étapes">
      <div className="mt-4 space-y-4">
        {[
          { num: "1", title: "Cadrage & Définition des Objectifs", desc: "Ateliers stratégiques. Mapping des angles morts." },
          { num: "2", title: "Ateliers Collaboratifs", desc: "Co-construction du Framework décisionnel." },
          { num: "3", title: "Implémentation AI", desc: "Déploiement des outils de veille augmentée. Configuration IA." },
          { num: "4", title: "Extraction des Tendances", desc: "Analyse continue. Détection automatique des patterns." },
          { num: "5", title: "DataViz & Dashboards", desc: "Tableaux de bord sur-mesure. Visualisations interactives." },
          { num: "6", title: "Strategic Intelligence Empowerment", desc: "Accompagnement continu. Autonomisation progressive." },
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
      title="Cas client : Raja Club Athletic"
      context="Architecture et structuration de la cellule de veille. Segmentation des thématiques. Gouvernance. Formation et accompagnement."
      intervention={[
        "Architecture de la cellule de veille",
        "Segmentation des thématiques stratégiques",
        "Gouvernance et formation",
      ]}
      result="Cycles de décision réduits. Silos éliminés. Culture d'intelligence installée."
    />
  </DetailPageLayout>
);

export default StrategicWorkflow;
