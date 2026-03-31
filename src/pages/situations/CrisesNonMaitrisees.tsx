import DetailPageLayout, { DetailBlock, DetailList } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import ministereSanteLogo from "@/assets/clients/ministere-sante.jpg";

const CrisesNonMaitrisees = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Sombrer dans une crise non maîtrisée", "Sinking into an uncontrolled crisis")}
      chapeau={t("Ignorer les étincelles mène à l'incendie", "Ignoring sparks leads to fire")}
      prevSituation={{ label: "Déficit d'attractivité", path: "/situations/deficit-attractivite" }}
      nextSituation={{ label: "Perte de vélocité", path: "/situations/perte-velocite" }}
      ctas={[
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "#", formType: "f2" },
      ]}
      stickyCase={{
        logo: ministereSanteLogo,
        title: t("Ministère de la Santé", "Ministry of Health"),
        sector: t("Gouvernement / Santé publique", "Government / Public Health"),
        context: [
          t("2018, virus H1N1, 40 décès au Maroc", "2018, H1N1 virus, 40 deaths in Morocco"),
          t("Psychose nationale, désinformation massive", "National psychosis, massive disinformation"),
          t("Silence du Ministère", "Ministry silence"),
        ],
        intervention: [
          t("Digital Investigation et Fact-checking en temps réel", "Digital investigation and real-time fact-checking"),
          t("Identification des sources de désinformation", "Identification of disinformation sources"),
          t("War room de crise", "Crisis war room"),
        ],
        impact: [
          t("Crise atténuée en 2 semaines", "Crisis mitigated in 2 weeks"),
          t("Dispositif de veille structuré", "Structured monitoring system"),
          t("Le Ministère a depuis géré le COVID-19 avec plus d'efficacité", "The Ministry has since managed COVID-19 with greater efficiency"),
        ],
      }}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <p className="mt-2">{t("48 heures pour tout perdre. Effondrement progressif où chaque décision tardive ou inadéquate amplifie les dégâts et accélère la chute.", "48 hours to lose everything. Progressive collapse where every late or inadequate decision amplifies the damage and accelerates the fall.")}</p>
      </DetailBlock>
      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("Contagion sur réseaux sociaux puis amplification médiatique (TV, radio, presse)", "Social media contagion then media amplification (TV, radio, press)"),
          t("L'embrasement puis perte de contrôle face à l'enchaînement des événements", "Flare-up then loss of control in the face of cascading events"),
          t("L'effondrement : boycott, sanctions, démissions, chute des ventes/CA", "Collapse: boycott, sanctions, resignations, sales/revenue drop"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Les chiffres qui font peur", "The frightening numbers")}>
        <DetailList items={[
          t("60% des entreprises touchées par des crises majeures ne s'en remettent jamais complètement (Cleartail Marketing, 2025)", "60% of companies hit by major crises never fully recover (Cleartail Marketing, 2025)"),
          t("30% des board members ayant vécu une crise ont vu leur réputation récupérer en moins d'un an, tandis que 16% ont mis 4 ans ou plus (Deloitte Survey)", "30% of board members who experienced a crisis saw their reputation recover in less than a year, while 16% took 4 years or more (Deloitte Survey)"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <Link to="/solutions/strategic-intelligence-lab" className="mt-2 inline-block font-semibold text-primary hover:underline">Crisis Management</Link>
      </DetailBlock>
    </DetailPageLayout>
  );
};

export default CrisesNonMaitrisees;
