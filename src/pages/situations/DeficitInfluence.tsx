import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const DeficitInfluence = () => (
  <DetailPageLayout
    title="Déficit d'influence institutionnel"
    chapeau="Quand certains écrivent l'histoire, d'autres la subissent."
    ctas={[
      { label: "Lire le cas complet", action: "#", formType: "f1" },
      { label: "Évaluer ma situation — GRATUIT", action: "#", formType: "f2" },
    ]}
  >
    <DetailBlock title="Votre réalité">
      <p className="mt-2">
        Votre institution dispose d'un mandat stratégique mais peine à imposer son rôle dans l'écosystème.
      </p>
      <DetailList items={[
        "Votre parole est présente, mais n'oriente aucune décision.",
        "Votre légitimité est silencieuse, donc inefficace.",
        "Votre capacité à structurer les dynamiques sectorielles s'érode progressivement.",
      ]} />
    </DetailBlock>

    <DetailBlock title="Vous risquez">
      <DetailList items={[
        "Une marginalisation progressive dans votre propre écosystème",
        "Une perte d'influence dans les arbitrages stratégiques",
        "Une captation de votre rôle par d'autres acteurs publics ou privés",
        "Une perte de crédibilité auprès des partenaires et investisseurs",
      ]} />
    </DetailBlock>

    <DetailBlock title="Les angles morts">
      <DetailList items={[
        "Une empreinte digitale institutionnelle faible ou mal structurée",
        "Un positionnement stratégique mal perçu dans l'écosystème",
        "Une absence d'architecture d'intelligence pour piloter l'influence",
        "Une communication institutionnelle déconnectée des dynamiques d'influence",
      ]} />
    </DetailBlock>

    <DetailBlock title="Solution Buildfluence">
      <p className="mt-2 font-semibold text-primary">Political Intelligence</p>
    </DetailBlock>

    <CaseStudy
      title="Cas client 1 : CIDC — Organisation de la Coopération Islamique"
      context="Après plusieurs décennies d'existence, le CIDC souffrait d'un déficit de visibilité et d'influence économique au sein de l'écosystème des 57 pays membres."
      intervention={[
        "Diagnostic stratégique et positionnement du CIDC",
        "Benchmark des plateformes d'organisations internationales (WB & WEF)",
        "Déploiement de la « Doing Business Platform »",
        "Structuration & Digitalisation d'un écosystème d'opportunités intra-OCI",
      ]}
      result="Repositionnement du CIDC comme hub d'opportunités économiques intra-OCI. Passage d'un rôle institutionnel passif à une plateforme d'orchestration économique insight-driven."
    />

    <CaseStudy
      title="Cas client 2 : ADD — Agence de Développement du Digital"
      context="Malgré un mandat stratégique dans la transformation digitale nationale, l'agence souffrait d'un impact institutionnel limité et d'une faible empreinte dans l'écosystème digital marocain."
      intervention={[
        "Cartographie de l'écosystème digital national",
        "Audit organisationnel et analyse des verbatims internes",
        "Benchmark des meilleures pratiques internationales",
        "Élaboration d'une roadmap stratégique d'influence",
      ]}
      result="Déploiement d'une solution de veille stratégique basée sur l'IA. Recommandation stratégique retenue : activation autour de GITEX Africa Morocco. Renforcement de la visibilité internationale de l'écosystème digital marocain."
    />
  </DetailPageLayout>
);

export default DeficitInfluence;
