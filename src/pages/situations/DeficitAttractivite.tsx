import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const DeficitAttractivite = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Perdre la bataille de l'attractivité", "Losing the battle for attractiveness")}
      chapeau={t(
        "Avoir des atouts sans rayonnement, c'est laisser les autres capter la valeur à votre place.",
        "Having assets without visibility means letting others capture value in your place."
      )}
      ctas={[
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "/contact" },
      ]}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <p className="mt-2">
          {t(
            "Votre territoire dispose d'atouts structurels. Infrastructures, stabilité relative, projets structurants. Mais dans l'arbitrage international, la perception précède la réalité. Les capitaux ne vont pas vers les territoires « objectivement solides ». Ils vont vers ceux qui maîtrisent leur narratif stratégique.",
            "Your territory has structural assets. Infrastructure, relative stability, structuring projects. But in international arbitration, perception precedes reality. Capital doesn't go to 'objectively solid' territories. It goes to those who master their strategic narrative."
          )}
        </p>
      </DetailBlock>

      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("Décrochage face à des territoires plus visibles", "Falling behind more visible territories"),
          t("Détournement des flux d'IDE vers des territoires mieux positionnés", "Diversion of FDI flows to better-positioned territories"),
          t("Difficulté à attirer talents et investisseurs", "Difficulty attracting talent and investors"),
          t("Affaiblissement progressif de la compétitivité territoriale", "Progressive weakening of territorial competitiveness"),
        ]} />
      </DetailBlock>

      <DetailBlock title={t("Les angles morts", "Blind spots")}>
        <DetailList items={[
          t("Absence de cartographie des territoires concurrents", "Absence of mapping of competing territories"),
          t("Sous-estimation des narratifs géoéconomiques adverses", "Underestimation of adverse geoeconomic narratives"),
          t("Manque de lecture stratégique des signaux investisseurs", "Lack of strategic reading of investor signals"),
          t("Votre attractivité est traitée comme un sujet de communication et non comme un actif stratégique", "Your attractiveness is treated as a communication topic, not as a strategic asset"),
        ]} />
      </DetailBlock>

      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <p className="mt-2 font-semibold text-primary">Territorial Influence Lab</p>
      </DetailBlock>

      <CaseStudy
        title={t("Cas client : Territoire confidentiel (mandat sous NDA strict)", "Case study: Confidential territory (strict NDA)")}
        context={t(
          "Territoire en concurrence directe avec plusieurs hubs régionaux pour attirer des investissements stratégiques internationaux. Malgré des atouts solides, perception internationale affaiblie.",
          "Territory in direct competition with several regional hubs to attract international strategic investments. Despite solid assets, weakened international perception."
        )}
        intervention={[
          t("Benchmark géoéconomique des territoires concurrents / Best Practices", "Geoeconomic benchmark of competing territories / Best Practices"),
          t("Identification et analyse continue des secteurs stratégiques à fort potentiel d'attractivité", "Identification and continuous analysis of strategic sectors with high attractiveness potential"),
          t("Cartographie des flux d'investissements sectoriels & des relais d'influence", "Mapping of sectoral investment flows & influence relays"),
          t("Identification des facteurs de perception défavorables", "Identification of unfavorable perception factors"),
          t("Détection des niches d'innovations différenciantes", "Detection of differentiating innovation niches"),
          t("Repositionnement stratégique du discours institutionnel", "Strategic repositioning of institutional discourse"),
        ]}
        result={t(
          "Clarification du positionnement différenciant. Renforcement de l'attractivité économique. Réalignement des messages vers les investisseurs cibles. Amélioration de la lisibilité stratégique internationale.",
          "Clarification of differentiating positioning. Strengthening economic attractiveness. Realignment of messages towards target investors. Improvement of international strategic readability."
        )}
      />
    </DetailPageLayout>
  );
};

export default DeficitAttractivite;
