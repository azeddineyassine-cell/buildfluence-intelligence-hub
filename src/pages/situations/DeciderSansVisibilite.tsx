import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const DeciderSansVisibilite = () => (
  <DetailPageLayout
    title="Décider sans visibilité"
    chapeau="Manque d'information fiable transformant chaque décision stratégique en pari hasardeux"
    ctas={[
      { label: "Lire le cas complet", action: "#", formType: "f1" },
      { label: "Évaluer ma situation — GRATUIT", action: "#", formType: "f2" },
    ]}
  >
    <DetailBlock title="Votre réalité">
      <DetailList items={[
        "Vous évoluez dans un environnement politique et économique instable.",
        "Les réseaux sociaux accélèrent les dynamiques d'opinion.",
        "Les narratifs hostiles émergent avant les données officielles.",
      ]} />
    </DetailBlock>

    <DetailBlock title="Vous risquez">
      <DetailList items={[
        "Décisions prises sur des indicateurs partiels",
        "Sous-estimation de signaux faibles critiques",
        "Amplification d'une crise avant sa détection",
        "Perte de confiance des investisseurs",
        "Débordement géopolitique : médiatisation internationale et pression diplomatique accrue",
        "Fuite des investisseurs : gel de projets et ralentissement des flux de capitaux",
        "Baisse de notoriété territoriale : érosion de l'attractivité économique et institutionnelle",
      ]} />
    </DetailBlock>

    <DetailBlock title="Les angles morts">
      <DetailList items={[
        "Absence de cartographie dynamique des acteurs",
        "Incapacité à visualiser les réseaux d'influence",
        "Manque de suivi en temps réel des tendances émergentes",
        "Confusion entre volume d'information et visibilité stratégique",
      ]} />
    </DetailBlock>

    <DetailBlock title="Solution Buildfluence">
      <p className="mt-2 font-semibold text-primary">Strategic Foresight Lab</p>
    </DetailBlock>

    <CaseStudy
      title="Cas client : Présidence de la République du Sénégal"
      context="Annonce de la 3e candidature présidentielle dans un climat tendu. Montée des appels à la rébellion, désinformation et polarisation numérique."
      intervention={[
        "Déploiement d'une plateforme de veille stratégique / IA en temps réel",
        "Analyse dynamique de l'évolution des mots-clés sensibles",
        "Cartographie des acteurs, alliances et oppositions",
        "Détection précoce des narratifs à risque",
        "Scénarios d'anticipation pour la communication présidentielle",
      ]}
      result="Décision éclairée même sous forte pression. Réduction des angles morts. Meilleure anticipation des risques narratifs. Restauration progressive de la lisibilité stratégique."
    />
  </DetailPageLayout>
);

export default DeciderSansVisibilite;
