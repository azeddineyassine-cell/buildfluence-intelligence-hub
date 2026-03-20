import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const DeficitInfluence = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Déficit d'influence institutionnel", "Institutional influence deficit")}
      chapeau={t(
        "Quand certains écrivent l'histoire, d'autres la subissent.",
        "When some write history, others suffer it."
      )}
      ctas={[
        { label: t("Lire le cas complet", "Read full case"), action: "/contact" },
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "/contact" },
      ]}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <p className="mt-2">
          {t(
            "Votre institution dispose d'un mandat stratégique mais peine à imposer son rôle dans l'écosystème.",
            "Your institution has a strategic mandate but struggles to impose its role in the ecosystem."
          )}
        </p>
        <DetailList items={[
          t("Votre parole est présente, mais n'oriente aucune décision.", "Your voice is present but doesn't guide any decision."),
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
          t("Une empreinte digitale institutionnelle faible ou mal structurée", "Weak or poorly structured institutional digital footprint"),
          t("Un positionnement stratégique mal perçu dans l'écosystème", "Strategic positioning poorly perceived in the ecosystem"),
          t("Une absence d'architecture d'intelligence pour piloter l'influence", "Absence of intelligence architecture to drive influence"),
          t("Une communication institutionnelle déconnectée des dynamiques d'influence", "Institutional communication disconnected from influence dynamics"),
        ]} />
      </DetailBlock>

      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <p className="mt-2 font-semibold text-primary">Political Intelligence</p>
      </DetailBlock>

      <CaseStudy
        title={t("Cas client 1 : CIDC — Organisation de la Coopération Islamique", "Case study 1: CIDC — Organisation of Islamic Cooperation")}
        context={t(
          "Après plusieurs décennies d'existence, le CIDC souffrait d'un déficit de visibilité et d'influence économique au sein de l'écosystème des 57 pays membres.",
          "After several decades of existence, CIDC suffered from a deficit of visibility and economic influence within the 57 member countries ecosystem."
        )}
        intervention={[
          t("Diagnostic stratégique et positionnement du CIDC", "Strategic diagnosis and positioning of CIDC"),
          t("Benchmark des plateformes d'organisations internationales (WB & WEF)", "Benchmark of international organization platforms (WB & WEF)"),
          t("Déploiement de la « Doing Business Platform »", "Deployment of the 'Doing Business Platform'"),
          t("Structuration & Digitalisation d'un écosystème d'opportunités intra-OCI", "Structuring & Digitalization of an intra-OIC opportunity ecosystem"),
        ]}
        result={t(
          "Repositionnement du CIDC comme hub d'opportunités économiques intra-OCI. Passage d'un rôle institutionnel passif à une plateforme d'orchestration économique insight-driven.",
          "Repositioning of CIDC as intra-OIC economic opportunities hub. Transition from passive institutional role to insight-driven economic orchestration platform."
        )}
      />

      <CaseStudy
        title={t("Cas client 2 : ADD — Agence de Développement du Digital", "Case study 2: ADD — Digital Development Agency")}
        context={t(
          "Malgré un mandat stratégique dans la transformation digitale nationale, l'agence souffrait d'un impact institutionnel limité et d'une faible empreinte dans l'écosystème digital marocain.",
          "Despite a strategic mandate in national digital transformation, the agency suffered from limited institutional impact and weak footprint in the Moroccan digital ecosystem."
        )}
        intervention={[
          t("Analyse des missions et positionnement institutionnel", "Mission analysis and institutional positioning"),
          t("Cartographie de l'écosystème digital national", "Mapping of the national digital ecosystem"),
          t("Audit organisationnel et analyse des verbatims internes", "Organizational audit and internal verbatim analysis"),
          t("Analyse de l'empreinte digitale de l'agence", "Analysis of the agency's digital footprint"),
          t("Benchmark des meilleures pratiques internationales", "Benchmark of international best practices"),
          t("Élaboration d'une roadmap stratégique d'influence", "Development of a strategic influence roadmap"),
        ]}
        result={t(
          "Déploiement d'une solution de veille stratégique basée sur l'IA. Recommandation stratégique retenue : activation autour de GITEX Africa Morocco. Renforcement de la visibilité internationale de l'écosystème digital marocain.",
          "Deployment of an AI-based strategic monitoring solution. Strategic recommendation retained: activation around GITEX Africa Morocco. Strengthening international visibility of the Moroccan digital ecosystem."
        )}
      />
    </DetailPageLayout>
  );
};

export default DeficitInfluence;
