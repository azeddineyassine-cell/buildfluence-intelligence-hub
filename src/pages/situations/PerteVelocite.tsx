import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const PerteVelocite = () => (
  <DetailPageLayout
    title="Perdre en vélocité face aux concurrents"
    chapeau="Naviguer sans radar pendant que d'autres tracent leur route grâce aux signaux du marché"
    ctas={[
      { label: "Lire le cas complet", action: "#", formType: "f1" },
      { label: "Évaluer ma situation — GRATUIT", action: "#", formType: "f2" },
    ]}
  >
    <DetailBlock title="Votre réalité">
      <p className="mt-2">
        Vous analysez des rapports volumineux ou obsolètes pendant que vos concurrents captent les données d'opportunités émergentes.
      </p>
    </DetailBlock>

    <DetailBlock title="Vous risquez">
      <DetailList items={[
        "Manquer systématiquement les tendances porteuses",
        "Arriver trop tard sur les marchés en croissance",
        "Érosion progressive de votre chiffre d'affaires",
      ]} />
    </DetailBlock>

    <DetailBlock title="Les chiffres des bons élèves">
      <DetailList items={[
        "Les entreprises performantes prennent des décisions plus rapidement et les exécutent plus rapidement que leurs concurrents moins performants (Bain & Company, étude 10 ans, 1000+ entreprises)",
        "78% disent que les données et insights en temps réel créent un avantage concurrentiel (KX Research, 2021)",
      ]} />
    </DetailBlock>

    <DetailBlock title="Solution Buildfluence">
      <p className="mt-2 font-semibold text-primary">Competitive Velocity Engine</p>
    </DetailBlock>

    <DetailBlock title="Ce que nous faisons">
      <DetailList items={[
        "Un système d'intelligence concurrentielle en temps réel",
        "Une veille sur les signaux faibles d'innovation (brevets, startups, recherches, financements)",
        "Veille prédictive sur les mouvements stratégiques de la concurrence",
        "Une culture de décision rapide : data + analyse + exécution",
        "Cartographie des levées de fonds et des nouveaux entrants disruptifs",
        "Analyse des signaux d'innovation avant qu'ils ne deviennent des produits",
        "Dashboard d'alerte avec scoring Go/No-Go automatisé",
      ]} />
    </DetailBlock>

    <CaseStudy
      title="Cas client : OCP Group"
      context="Cartographie de l'écosystème concurrentiel sur 10 ans (2004–2014) face à des campagnes de boycott orchestrées par divers acteurs."
      intervention={[
        "Analyse par échiquiers : Géopolitique, Concurrentiel, Sociétal",
        "Cartographie et Matrice dynamique des parties prenantes",
        "Tableau de bord décisionnel au cabinet du Président",
      ]}
      result="Protection des milliards de dollars de CA et renforcement de la position de leader mondial."
    />
  </DetailPageLayout>
);

export default PerteVelocite;
