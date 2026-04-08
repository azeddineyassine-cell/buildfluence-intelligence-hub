import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import StrategicOrbitDiagram from "@/components/StrategicOrbitDiagram";
import TimelineEmbed from "@/components/TimelineEmbed";
import presidenceSenegalLogo from "@/assets/clients/presidence-senegal.jpg";
import imgSenegal1 from "@/assets/sections/ai-monitor-senegal-1.jpg";
import imgSenegal2 from "@/assets/sections/ai-monitor-senegal-2.png";

const AIPoweredMonitor = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Des plateformes de pouvoir décisionnel", "Decision-making power platforms")}
      titleClassName="text-center"
      chapeau={t("Surveillez vos marchés en temps réel, anticipez les signaux faibles et gardez toujours une longueur d'avance sur vos concurrents.", "Monitor your markets in real time, anticipate weak signals and always stay one step ahead of your competitors.")}
      chapeauClassName="text-center"
      ctas={[
        { label: t("Lire le cas complet", "Read the full case"), action: "#", formType: "f1" },
        { label: t("Demander une démo", "Request a demo"), action: "#", formType: "f1" },
      ]}
    >
      <StrategicOrbitDiagram />
      <TimelineEmbed />
      <DetailBlock title={t("Veille Multicanale", "Multi-channel Monitoring")}>
        <DetailList items={[
          t("Web, médias, réseaux sociaux, bases sectorielles", "Web, media, social networks, sector databases"),
          t("Dark web, deep web, brevets, publications scientifiques", "Dark web, deep web, patents, scientific publications"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Moteur NLP", "NLP Engine")}>
        <DetailList items={[
          t("Analyse sémantique avancée", "Advanced semantic analysis"),
          t("Détection automatique des signaux faibles", "Automatic weak signal detection"),
          t("Filtrage du bruit informationnel", "Information noise filtering"),
          t("Extraction des insights actionnables", "Actionable insights extraction"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Alerting Intelligent", "Intelligent Alerting")}>
        <DetailList items={[
          t("Alertes configurables par enjeu", "Configurable alerts by issue"),
          t("Scoring de criticité automatique", "Automatic criticality scoring"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Dashboards Décisionnels", "Decision-making Dashboards")}>
        <DetailList items={[
          t("Cockpits personnalisés par métier", "Custom cockpits by business function"),
          t("DataViz dynamiques, KPIs temps réel", "Dynamic DataViz, real-time KPIs"),
          t("Accessibilité 24/7", "24/7 accessibility"),
        ]} />
      </DetailBlock>
      <DetailBlock title="Newsletters & Business Reviews">
        <DetailList items={[
          t("Production automatisée de synthèses", "Automated synthesis production"),
          t("Magazines sectoriels personnalisés", "Customized sector magazines"),
        ]} />
      </DetailBlock>
      <CaseStudy
        logo={presidenceSenegalLogo}
        title={t("Cas client : Présidence du Sénégal", "Client case: Presidency of Senegal")}
        context={t("Plateforme de veille dédiée pour surveiller l'image de l'État en temps réel. Solution Fact-Checking. Alertes pour le cabinet présidentiel.", "Dedicated monitoring platform to track the State's image in real time. Fact-checking solution. Alerts for the presidential cabinet.")}
        intervention={[
          t("Déploiement de la plateforme de veille IA", "AI monitoring platform deployment"),
          t("Configuration des alertes présidentielles", "Presidential alerts configuration"),
          t("Solution de Fact-Checking en temps réel", "Real-time fact-checking solution"),
        ]}
        result={t("Monitoring continu de l'image de l'État. Capacité de réaction accélérée du cabinet.", "Continuous monitoring of the State's image. Accelerated cabinet reaction capability.")}
        image={imgSenegal1}
        image2={imgSenegal2}
      />
    </DetailPageLayout>
  );
};

export default AIPoweredMonitor;
