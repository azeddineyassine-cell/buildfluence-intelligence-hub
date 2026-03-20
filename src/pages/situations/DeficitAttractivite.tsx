import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const DeficitAttractivite = () => (
  <DetailPageLayout
    title="Perdre la bataille de l'attractivité"
    chapeau="Avoir des atouts sans rayonnement, c'est laisser les autres capter la valeur à votre place."
    ctas={[
      { label: "Évaluer ma situation — GRATUIT", action: "#", formType: "f2" },
    ]}
  >
    <DetailBlock title="Votre réalité">
      <p className="mt-2">
        Votre territoire dispose d'atouts structurels. Infrastructures, stabilité relative, projets structurants. Mais dans l'arbitrage international, la perception précède la réalité. Les capitaux ne vont pas vers les territoires « objectivement solides ». Ils vont vers ceux qui maîtrisent leur narratif stratégique.
      </p>
    </DetailBlock>

    <DetailBlock title="Vous risquez">
      <DetailList items={[
        "Décrochage face à des territoires plus visibles",
        "Détournement des flux d'IDE vers des territoires mieux positionnés",
        "Difficulté à attirer talents et investisseurs",
        "Affaiblissement progressif de la compétitivité territoriale",
      ]} />
    </DetailBlock>

    <DetailBlock title="Les angles morts">
      <DetailList items={[
        "Absence de cartographie des territoires concurrents",
        "Sous-estimation des narratifs géoéconomiques adverses",
        "Votre attractivité est traitée comme un sujet de communication et non comme un actif stratégique",
      ]} />
    </DetailBlock>

    <DetailBlock title="Solution Buildfluence">
      <p className="mt-2 font-semibold text-primary">Territorial Influence Lab</p>
    </DetailBlock>

    <CaseStudy
      title="Cas client : Territoire confidentiel (mandat sous NDA strict)"
      context="Territoire en concurrence directe avec plusieurs hubs régionaux pour attirer des investissements stratégiques internationaux. Malgré des atouts solides, perception internationale affaiblie."
      intervention={[
        "Benchmark géoéconomique des territoires concurrents / Best Practices",
        "Identification des secteurs stratégiques à fort potentiel d'attractivité",
        "Cartographie des flux d'investissements sectoriels & des relais d'influence",
        "Identification des facteurs de perception défavorables",
        "Repositionnement stratégique du discours institutionnel",
      ]}
      result="Clarification du positionnement différenciant. Renforcement de l'attractivité économique. Réalignement des messages vers les investisseurs cibles."
    />
  </DetailPageLayout>
);

export default DeficitAttractivite;
