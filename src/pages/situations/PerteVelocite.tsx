import DetailPageLayout, { DetailBlock, DetailList } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import ocpLogo from "@/assets/clients/ocp.png";

const PerteVelocite = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Perdre en vélocité face aux concurrents", "Losing velocity against competitors")}
      chapeau={t("Naviguer sans radar pendant que d'autres tracent leur route grâce aux signaux du marché", "Navigating without radar while others chart their course using market signals")}
      prevSituation={{ label: "Crises non maîtrisées", path: "/situations/crises-non-maitrisees" }}
      nextSituation={{ label: "Déficit d'influence", path: "/situations/deficit-influence" }}
      ctas={[
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "#", formType: "f2" },
      ]}
      stickyCase={{
        logo: ocpLogo,
        title: t("OCP Group", "OCP Group"),
        sector: t("Industrie / Mines & Chimie", "Industry / Mining & Chemicals"),
        context: [
          t("Cartographie de l'écosystème concurrentiel sur 10 ans (2004–2014)", "Mapping of the competitive ecosystem over 10 years (2004-2014)"),
          t("Campagnes de boycott orchestrées par divers acteurs", "Boycott campaigns orchestrated by various actors"),
        ],
        intervention: [
          t("Analyse par échiquiers : Géopolitique, Concurrentiel, Sociétal", "Chessboard analysis: Geopolitical, Competitive, Societal"),
          t("Cartographie et Matrice dynamique des parties prenantes", "Dynamic stakeholder mapping and matrix"),
          t("Tableau de bord décisionnel au cabinet du Président", "Decision-making dashboard for the President's office"),
        ],
        impact: [
          t("Protection des milliards de dollars de CA", "Protection of billions of dollars in revenue"),
          t("Renforcement de la position de leader mondial", "Strengthening of global leadership position"),
        ],
      }}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <p className="mt-2">{t("Vous analysez des rapports volumineux ou obsolètes pendant que vos concurrents captent les données d'opportunités émergentes.", "You analyze bulky or obsolete reports while your competitors capture emerging opportunity data.")}</p>
      </DetailBlock>
      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("Manquer systématiquement les tendances porteuses", "Systematically missing growth trends"),
          t("Arriver trop tard sur les marchés en croissance", "Arriving too late in growing markets"),
          t("Érosion progressive de votre chiffre d'affaires", "Progressive erosion of your revenue"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Les chiffres des bons élèves", "The top performers' numbers")}>
        <DetailList items={[
          t("Les entreprises performantes prennent des décisions plus rapidement et les exécutent plus rapidement que leurs concurrents moins performants (Bain & Company, étude 10 ans, 1000+ entreprises)", "High-performing companies make decisions faster and execute them faster than their less performing competitors (Bain & Company, 10-year study, 1000+ companies)"),
          t("78% disent que les données et insights en temps réel créent un avantage concurrentiel (KX Research, 2021)", "78% say real-time data and insights create a competitive advantage (KX Research, 2021)"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <Link to="/capacites/competitive-velocity-engine" className="mt-2 inline-block font-semibold text-primary hover:underline">Competitive Velocity Engine</Link>
      </DetailBlock>
      <DetailBlock title={t("Ce que nous faisons", "What we do")}>
        <DetailList items={[
          t("Un système d'intelligence concurrentielle en temps réel", "A real-time competitive intelligence system"),
          t("Une veille sur les signaux faibles d'innovation (brevets, startups, recherches, financements)", "Monitoring weak innovation signals (patents, startups, research, funding)"),
          t("Veille prédictive sur les mouvements stratégiques de la concurrence", "Predictive monitoring of competitive strategic movements"),
          t("Une culture de décision rapide : data + analyse + exécution", "A fast decision culture: data + analysis + execution"),
          t("Cartographie des levées de fonds et des nouveaux entrants disruptifs", "Mapping fundraising rounds and disruptive new entrants"),
          t("Analyse des signaux d'innovation avant qu'ils ne deviennent des produits", "Analyzing innovation signals before they become products"),
          t("Dashboard d'alerte avec scoring Go/No-Go automatisé", "Alert dashboard with automated Go/No-Go scoring"),
        ]} />
      </DetailBlock>
    </DetailPageLayout>
  );
};

export default PerteVelocite;
