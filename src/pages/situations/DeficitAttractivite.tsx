import DetailPageLayout, { DetailBlock, DetailList } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const DeficitAttractivite = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Perdre la bataille de l'attractivité", "Losing the battle for attractiveness")}
      chapeau={t("Avoir des atouts sans rayonnement, c'est laisser les autres capter la valeur à votre place.", "Having assets without influence means letting others capture value in your place.")}
      prevSituation={{ label: "Attaques informationnelles", path: "/situations/attaques-informationnelles" }}
      nextSituation={{ label: "Crises non maîtrisées", path: "/situations/crises-non-maitrisees" }}
      ctas={[{ label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "#", formType: "f2" }]}
      stickyCase={{
        title: t("Territoire confidentiel (NDA strict)", "Confidential territory (strict NDA)"),
        sector: t("Gouvernement / Attractivité territoriale", "Government / Territorial attractiveness"),
        context: [
          t("Territoire en concurrence directe avec plusieurs hubs régionaux", "Territory in direct competition with several regional hubs"),
          t("Atouts solides mais perception internationale affaiblie", "Solid assets but weakened international perception"),
        ],
        intervention: [
          t("Benchmark géoéconomique des territoires concurrents", "Geo-economic benchmark of competing territories"),
          t("Identification des secteurs stratégiques à fort potentiel", "Identification of strategic high-potential sectors"),
          t("Cartographie des flux d'investissements sectoriels", "Mapping of sectoral investment flows"),
          t("Repositionnement stratégique du discours institutionnel", "Strategic repositioning of institutional discourse"),
        ],
        impact: [
          t("Clarification du positionnement différenciant", "Clarification of differentiating positioning"),
          t("Renforcement de l'attractivité économique", "Strengthening of economic attractiveness"),
          t("Réalignement des messages vers les investisseurs cibles", "Realignment of messages towards target investors"),
        ],
      }}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <p className="mt-2">{t("Votre territoire dispose d'atouts structurels. Infrastructures, stabilité relative, projets structurants. Mais dans l'arbitrage international, la perception précède la réalité. Les capitaux ne vont pas vers les territoires « objectivement solides ». Ils vont vers ceux qui maîtrisent leur narratif stratégique.", "Your territory has structural assets. Infrastructure, relative stability, structuring projects. But in international arbitration, perception precedes reality. Capital doesn't flow to \"objectively solid\" territories. It flows to those who master their strategic narrative.")}</p>
      </DetailBlock>
      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("Décrochage face à des territoires plus visibles", "Falling behind more visible territories"),
          t("Détournement des flux d'IDE vers des territoires mieux positionnés", "FDI flows diverted to better-positioned territories"),
          t("Difficulté à attirer talents et investisseurs", "Difficulty attracting talent and investors"),
          t("Affaiblissement progressif de la compétitivité territoriale", "Progressive weakening of territorial competitiveness"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Les angles morts", "Blind spots")}>
        <DetailList items={[
          t("Absence de cartographie des territoires concurrents", "Lack of competing territories mapping"),
          t("Sous-estimation des narratifs géoéconomiques adverses", "Underestimation of adverse geo-economic narratives"),
          t("Votre attractivité est traitée comme un sujet de communication et non comme un actif stratégique", "Your attractiveness is treated as a communication topic rather than a strategic asset"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <Link to="/solutions/soft-power-influence" className="mt-2 inline-block font-semibold text-primary hover:underline">Territorial Influence Lab</Link>
      </DetailBlock>
    </DetailPageLayout>
  );
};

export default DeficitAttractivite;
