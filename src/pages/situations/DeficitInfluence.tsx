import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import cidcLogo from "@/assets/clients/cidc.jpg";
import addLogo from "@/assets/clients/add.png";

const DeficitInfluence = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Déficit d'influence institutionnel", "Institutional influence deficit")}
      chapeau={t("Quand certains écrivent l'histoire, d'autres la subissent.", "When some write history, others endure it.")}
      ctas={[
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "#", formType: "f2" },
      ]}
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
      <CaseStudy
        logo={cidcLogo}
        title={t("Cas client 1 : CIDC — Organisation de la Coopération Islamique", "Client case 1: ICDT — Organisation of Islamic Cooperation")}
        context={t("Après plusieurs décennies d'existence, le CIDC souffrait d'un déficit de visibilité et d'influence économique au sein de l'écosystème des 57 pays membres.", "After several decades of existence, the ICDT suffered from a deficit of visibility and economic influence within the 57-member country ecosystem.")}
        intervention={[
          t("Diagnostic stratégique et positionnement du CIDC", "Strategic diagnosis and ICDT positioning"),
          t("Benchmark des plateformes d'organisations internationales (WB & WEF)", "Benchmark of international organization platforms (WB & WEF)"),
          t("Déploiement de la « Doing Business Platform »", "Deployment of the \"Doing Business Platform\""),
          t("Structuration & Digitalisation d'un écosystème d'opportunités intra-OCI", "Structuring & Digitalization of an intra-OIC opportunities ecosystem"),
        ]}
        result={t("Repositionnement du CIDC comme hub d'opportunités économiques intra-OCI. Passage d'un rôle institutionnel passif à une plateforme d'orchestration économique insight-driven.", "Repositioning of ICDT as an intra-OIC economic opportunities hub. Transition from a passive institutional role to an insight-driven economic orchestration platform.")}
      />
      <CaseStudy
        logo={addLogo}
        title={t("Cas client 2 : ADD — Agence de Développement du Digital", "Client case 2: ADD — Digital Development Agency")}
        context={t("Malgré un mandat stratégique dans la transformation digitale nationale, l'agence souffrait d'un impact institutionnel limité et d'une faible empreinte dans l'écosystème digital marocain.", "Despite a strategic mandate in national digital transformation, the agency suffered from limited institutional impact and a weak footprint in the Moroccan digital ecosystem.")}
        intervention={[
          t("Cartographie de l'écosystème digital national", "National digital ecosystem mapping"),
          t("Audit organisationnel et analyse des verbatims internes", "Organizational audit and internal verbatim analysis"),
          t("Benchmark des meilleures pratiques internationales", "International best practices benchmark"),
          t("Élaboration d'une roadmap stratégique d'influence", "Development of a strategic influence roadmap"),
        ]}
        result={t("Déploiement d'une solution de veille stratégique basée sur l'IA. Recommandation stratégique retenue : activation autour de GITEX Africa Morocco. Renforcement de la visibilité internationale de l'écosystème digital marocain.", "Deployment of an AI-based strategic monitoring solution. Strategic recommendation adopted: activation around GITEX Africa Morocco. Strengthening of the international visibility of the Moroccan digital ecosystem.")}
      />
    </DetailPageLayout>
  );
};

export default DeficitInfluence;
