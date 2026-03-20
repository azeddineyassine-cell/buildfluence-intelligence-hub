import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const AIPoweredMonitor = () => (
  <DetailPageLayout
    title="Des plateformes de pouvoir décisionnel"
    chapeau="Surveillez vos marchés en temps réel, anticipez les signaux faibles et gardez toujours une longueur d'avance sur vos concurrents."
    ctas={[
      { label: "Lire le cas complet", action: "#", formType: "f1" },
      { label: "Demander une démo", action: "#", formType: "f1" },
    ]}
  >
    <DetailBlock title="Veille Multicanale">
      <DetailList items={[
        "Web, médias, réseaux sociaux, bases sectorielles",
        "Dark web, deep web, brevets, publications scientifiques",
      ]} />
    </DetailBlock>

    <DetailBlock title="Moteur NLP">
      <DetailList items={[
        "Analyse sémantique avancée",
        "Détection automatique des signaux faibles",
        "Filtrage du bruit informationnel",
        "Extraction des insights actionnables",
      ]} />
    </DetailBlock>

    <DetailBlock title="Alerting Intelligent">
      <DetailList items={[
        "Alertes configurables par enjeu",
        "Scoring de criticité automatique",
      ]} />
    </DetailBlock>

    <DetailBlock title="Dashboards Décisionnels">
      <DetailList items={[
        "Cockpits personnalisés par métier",
        "DataViz dynamiques, KPIs temps réel",
        "Accessibilité 24/7",
      ]} />
    </DetailBlock>

    <DetailBlock title="Newsletters & Business Reviews">
      <DetailList items={[
        "Production automatisée de synthèses",
        "Magazines sectoriels personnalisés",
      ]} />
    </DetailBlock>

    <CaseStudy
      title="Cas client : Présidence du Sénégal"
      context="Plateforme de veille dédiée pour surveiller l'image de l'État en temps réel. Solution Fact-Checking. Alertes pour le cabinet présidentiel."
      intervention={[
        "Déploiement de la plateforme de veille IA",
        "Configuration des alertes présidentielles",
        "Solution de Fact-Checking en temps réel",
      ]}
      result="Monitoring continu de l'image de l'État. Capacité de réaction accélérée du cabinet."
    />
  </DetailPageLayout>
);

export default AIPoweredMonitor;
