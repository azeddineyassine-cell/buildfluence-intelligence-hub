import DetailPageLayout, { DetailBlock, DetailList } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import cidcLogo from "@/assets/clients/cidc.jpg";

const DeficitInfluence = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Déficit d'influence institutionnel", "Institutional influence deficit")}
      chapeau={t("Quand certains écrivent l'histoire, d'autres la subissent.", "When some write history, others endure it.")}
      prevSituation={{ label: "Perte de vélocité", path: "/situations/perte-velocite" }}
      nextSituation={{ label: "Investir sous risque", path: "/situations/investir-sous-risque" }}
      ctas={[
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "#", formType: "f2" },
      ]}
      stickyCase={{
        logo: cidcLogo,
        title: t("CIDC — Organisation de la Coopération Islamique", "ICDT — Organisation of Islamic Cooperation"),
        sector: t("Organisation internationale", "International organization"),
        context: [
          t("Déficit de visibilité et d'influence économique au sein de l'écosystème des 57 pays membres", "Deficit of visibility and economic influence within the 57-member country ecosystem"),
        ],
        intervention: [
          t("Diagnostic stratégique et positionnement du CIDC", "Strategic diagnosis and ICDT positioning"),
          t("Benchmark des plateformes d'organisations internationales (WB & WEF)", "Benchmark of international organization platforms (WB & WEF)"),
          t("Déploiement de la « Doing Business Platform »", "Deployment of the \"Doing Business Platform\""),
        ],
        impact: [
          t("Repositionnement comme hub d'opportunités économiques intra-OCI", "Repositioning as an intra-OIC economic opportunities hub"),
          t("Passage d'un rôle institutionnel passif à une plateforme d'orchestration insight-driven", "Transition from passive institutional role to insight-driven orchestration platform"),
        ],
      }}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <p className="mt-2">{t("Votre institution dispose d'un mandat stratégique mais peine à imposer son rôle dans l'écosystème.", "Your institution has a strategic mandate but struggles to assert its role in the ecosystem.")}</p>
        <DetailList items={[
          t("Votre parole est présente, mais n'oriente aucune décision.", "Your voice is present, but guides no decisions."),
          t("Votre légitimité est silencieuse, donc inefficace.", "Your legitimacy is silent, therefore ineffective."),
          t("Votre capacité à structurer les dynamiques sectorielles s'érode progressivement.", "Your ability to structure sectoral dynamics is progressively eroding."),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("Une marginalisation progressive dans votre propre écosystème", "Progressive marginalization in your own ecosystem"),
          t("Une perte d'influence dans les arbitrages stratégiques", "Loss of influence in strategic arbitrations"),
          t("Une captation de votre rôle par d'autres acteurs publics ou privés", "Capture of your role by other public or private actors"),
          t("Une perte de crédibilité auprès des partenaires et investisseurs", "Loss of credibility with partners and investors"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Les angles morts", "Blind spots")}>
        <DetailList items={[
          t("Une empreinte digitale institutionnelle faible ou mal structurée", "A weak or poorly structured institutional digital footprint"),
          t("Un positionnement stratégique mal perçu dans l'écosystème", "A poorly perceived strategic positioning in the ecosystem"),
          t("Une absence d'architecture d'intelligence pour piloter l'influence", "Lack of intelligence architecture to steer influence"),
          t("Une communication institutionnelle déconnectée des dynamiques d'influence", "Institutional communication disconnected from influence dynamics"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <Link to="/solutions/soft-power-influence" className="mt-2 inline-block font-semibold text-primary hover:underline">Political Intelligence</Link>
      </DetailBlock>
    </DetailPageLayout>
  );
};

export default DeficitInfluence;
