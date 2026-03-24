import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import centraleDanoneLogo from "@/assets/clients/centrale-danone.jpg";

const AttaquesInformationnelles = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Subir des attaques informationnelles", "Suffering information attacks")}
      chapeau={t("Vulnérabilité aux manipulations et désinformations qui altèrent la perception de la réalité et sabotent les décisions stratégiques", "Vulnerability to manipulations and disinformation that alter the perception of reality and sabotage strategic decisions")}
      ctas={[
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "#", formType: "f2" },
      ]}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <DetailList items={[
          t("Une vidéo malveillante déstabilise votre attractivité", "A malicious video destabilizes your attractiveness"),
          t("Un tweet compromet votre levée de fonds", "A tweet compromises your fundraising"),
          t("Une ONG coordonne une campagne de boycott contre votre marque", "An NGO coordinates a boycott campaign against your brand"),
          t("Un concurrent diffuse des « doutes » sur votre intégrité", "A competitor spreads \"doubts\" about your integrity"),
          t("Votre PDG est attaqué personnellement sur les réseaux", "Your CEO is personally attacked on social media"),
          t("Vous découvrez l'attaque quand elle est déjà virale. Trop tard, le coup est parti.", "You discover the attack when it's already viral. Too late."),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("Effondrement de confiance (investisseurs, clients, partenaires)", "Collapse of trust (investors, clients, partners)"),
          t("Ralentissement de croissance ou perte de valeur boursière", "Growth slowdown or stock value loss"),
          t("Communication sans impact", "Communication without impact"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Les chiffres qui font peur", "The frightening numbers")}>
        <DetailList items={[
          t("70–80% de la valeur de marché provient d'actifs intangibles liés à la réputation (Cleartail Marketing, 2025)", "70-80% of market value comes from intangible assets linked to reputation (Cleartail Marketing, 2025)"),
          t("Un seul article négatif en ligne met 22% des clients potentiels à risque. Ce chiffre monte à 70% avec 4 articles négatifs ou plus (SurveySparrow, 2025)", "A single negative online article puts 22% of potential clients at risk. This rises to 70% with 4 or more negative articles (SurveySparrow, 2025)"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <Link to="/solutions/strategic-intelligence-lab" className="mt-2 inline-block font-semibold text-primary hover:underline">Threat Intelligence</Link>
      </DetailBlock>
      <CaseStudy
        logo={centraleDanoneLogo}
        title={t("Cas client : Centrale Danone", "Client case: Centrale Danone")}
        context={t("2015, décès de 2 enfants après consommation du yaourt Raïbi Jamila. Campagne de dénigrement pendant 2 ans. Conséquence : perte de 120M MAD (11,2M€).", "2015, death of 2 children after consuming Raïbi Jamila yogurt. Smear campaign for 2 years. Consequence: loss of 120M MAD (€11.2M).")}
        intervention={[
          t("Digital investigation approfondie", "In-depth digital investigation"),
          t("Analyse forensique des documents médicaux", "Forensic analysis of medical documents"),
          t("Stratégie de contre-influence", "Counter-influence strategy"),
        ]}
        result={t("Marque innocentée à 100%. Gain de +14% de parts de marché après la crise. Confiance restaurée.", "Brand 100% exonerated. +14% market share gain after crisis. Trust restored.")}
      />
    </DetailPageLayout>
  );
};

export default AttaquesInformationnelles;
