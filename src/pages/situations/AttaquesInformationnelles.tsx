import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const AttaquesInformationnelles = () => (
  <DetailPageLayout
    title="Subir des attaques informationnelles"
    chapeau="Vulnérabilité aux manipulations et désinformations qui altèrent la perception de la réalité et sabotent les décisions stratégiques"
    ctas={[
      { label: "Lire le cas complet", action: "#", formType: "f1" },
      { label: "Évaluer ma situation — GRATUIT", action: "#", formType: "f2" },
    ]}
  >
    <DetailBlock title="Votre réalité">
      <DetailList items={[
        "Une vidéo malveillante déstabilise votre attractivité",
        "Un tweet compromet votre levée de fonds",
        "Une ONG coordonne une campagne de boycott contre votre marque",
        "Un concurrent diffuse des « doutes » sur votre intégrité",
        "Votre PDG est attaqué personnellement sur les réseaux",
        "Vous découvrez l'attaque quand elle est déjà virale. Trop tard, le coup est parti.",
      ]} />
    </DetailBlock>

    <DetailBlock title="Vous risquez">
      <DetailList items={[
        "Effondrement de confiance (investisseurs, clients, partenaires)",
        "Ralentissement de croissance ou perte de valeur boursière",
        "Communication sans impact",
      ]} />
    </DetailBlock>

    <DetailBlock title="Les chiffres qui font peur">
      <DetailList items={[
        "70–80% de la valeur de marché provient d'actifs intangibles liés à la réputation (Cleartail Marketing, 2025)",
        "Un seul article négatif en ligne met 22% des clients potentiels à risque. Ce chiffre monte à 70% avec 4 articles négatifs ou plus (SurveySparrow, 2025)",
      ]} />
    </DetailBlock>

    <DetailBlock title="Solution Buildfluence">
      <p className="mt-2 font-semibold text-primary">Threat Intelligence</p>
    </DetailBlock>

    <CaseStudy
      title="Cas client : Centrale Danone"
      context="2015, décès de 2 enfants après consommation du yaourt Raïbi Jamila. Campagne de dénigrement pendant 2 ans. Conséquence : perte de 120M MAD (11,2M€)."
      intervention={[
        "Digital investigation approfondie",
        "Analyse forensique des documents médicaux",
        "Stratégie de contre-influence",
      ]}
      result="Marque innocentée à 100%. Gain de +14% de parts de marché après la crise. Confiance restaurée."
    />
  </DetailPageLayout>
);

export default AttaquesInformationnelles;
