import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const CrisesNonMaitrisees = () => (
  <DetailPageLayout
    title="Sombrer dans une crise non maîtrisée"
    chapeau="Ignorer les étincelles mène à l'incendie"
    ctas={[
      { label: "Lire le cas complet", action: "#", formType: "f1" },
      { label: "Évaluer ma situation — GRATUIT", action: "#", formType: "f2" },
    ]}
  >
    <DetailBlock title="Votre réalité">
      <p className="mt-2">
        48 heures pour tout perdre. Effondrement progressif où chaque décision tardive ou inadéquate amplifie les dégâts et accélère la chute.
      </p>
    </DetailBlock>

    <DetailBlock title="Vous risquez">
      <DetailList items={[
        "Contagion sur réseaux sociaux puis amplification médiatique (TV, radio, presse)",
        "L'embrasement puis perte de contrôle face à l'enchaînement des événements",
        "L'effondrement : boycott, sanctions, démissions, chute des ventes/CA",
      ]} />
    </DetailBlock>

    <DetailBlock title="Les chiffres qui font peur">
      <DetailList items={[
        "60% des entreprises touchées par des crises majeures ne s'en remettent jamais complètement (Cleartail Marketing, 2025)",
        "30% des board members ayant vécu une crise ont vu leur réputation récupérer en moins d'un an, tandis que 16% ont mis 4 ans ou plus (Deloitte Survey)",
      ]} />
    </DetailBlock>

    <DetailBlock title="Solution Buildfluence">
      <p className="mt-2 font-semibold text-primary">Crisis Management</p>
    </DetailBlock>

    <CaseStudy
      title="Cas client : Ministère de la Santé"
      context="2018, virus H1N1, 40 décès au Maroc. Psychose nationale, désinformation massive, silence du Ministère."
      intervention={[
        "Digital Investigation et Fact-checking en temps réel",
        "Identification des sources de désinformation",
        "War room de crise",
      ]}
      result="Crise atténuée en 2 semaines. Dispositif de veille structuré. Le Ministère a depuis géré le COVID-19 avec bien plus d'efficacité."
    />
  </DetailPageLayout>
);

export default CrisesNonMaitrisees;
