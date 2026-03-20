import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const DeciderSansVisibilite = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Décider sans visibilité", "Deciding without visibility")}
      chapeau={t(
        "Manque d'information fiable transformant chaque décision stratégique en pari hasardeux",
        "Lack of reliable information turning every strategic decision into a hazardous bet"
      )}
      ctas={[
        { label: t("Lire le cas complet", "Read full case"), action: "/contact" },
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "/contact" },
      ]}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <DetailList items={[
          t("Vous évoluez dans un environnement politique et économique instable.", "You operate in an unstable political and economic environment."),
          t("Les réseaux sociaux accélèrent les dynamiques d'opinion.", "Social media accelerates opinion dynamics."),
          t("Les narratifs hostiles émergent avant les données officielles.", "Hostile narratives emerge before official data."),
        ]} />
      </DetailBlock>

      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("Décisions prises sur des indicateurs partiels", "Decisions taken on partial indicators"),
          t("Sous-estimation de signaux faibles critiques", "Underestimation of critical weak signals"),
          t("Amplification d'une crise avant sa détection", "Crisis amplification before detection"),
          t("Perte de confiance des investisseurs", "Loss of investor confidence"),
          t("Débordement géopolitique : médiatisation internationale et pression diplomatique accrue", "Geopolitical spillover: international media coverage and increased diplomatic pressure"),
          t("Fuite des investisseurs : départ des étrangers, gel de projets et ralentissement des flux de capitaux", "Investor flight: departure of foreigners, project freezes and slowdown of capital flows"),
          t("Baisse de notoriété territoriale : érosion de l'attractivité économique et institutionnelle", "Decline in territorial reputation: erosion of economic and institutional attractiveness"),
        ]} />
      </DetailBlock>

      <DetailBlock title={t("Les angles morts", "Blind spots")}>
        <DetailList items={[
          t("Absence de cartographie dynamique des acteurs", "Absence of dynamic actor mapping"),
          t("Incapacité à visualiser les réseaux d'influence", "Inability to visualize influence networks"),
          t("Manque de suivi en temps réel des tendances émergentes", "Lack of real-time tracking of emerging trends"),
          t("Confusion entre volume d'information et visibilité stratégique", "Confusion between information volume and strategic visibility"),
        ]} />
      </DetailBlock>

      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <p className="mt-2 font-semibold text-primary">Strategic Foresight Lab</p>
      </DetailBlock>

      <CaseStudy
        title={t("Cas client : Présidence de la République du Sénégal", "Case study: Presidency of the Republic of Senegal")}
        context={t(
          "Annonce de la 3e candidature présidentielle dans un climat tendu. Montée des appels à la rébellion, désinformation et polarisation numérique.",
          "Announcement of the 3rd presidential candidacy in a tense climate. Rise of calls to rebellion, disinformation and digital polarization."
        )}
        intervention={[
          t("Déploiement d'une plateforme de veille stratégique / IA en temps réel", "Deployment of a real-time AI strategic monitoring platform"),
          t("Analyse dynamique de l'évolution des mots-clés sensibles", "Dynamic analysis of sensitive keyword evolution"),
          t("Cartographie des acteurs, alliances et oppositions", "Mapping of actors, alliances and oppositions"),
          t("Détection précoce des narratifs à risque", "Early detection of risky narratives"),
          t("Scénarios d'anticipation pour la communication présidentielle", "Anticipation scenarios for presidential communication"),
        ]}
        result={t(
          "Décision éclairée même sous forte pression. Réduction des angles morts. Meilleure anticipation des risques narratifs. Restauration progressive de la lisibilité stratégique.",
          "Informed decision even under high pressure. Reduced blind spots. Better anticipation of narrative risks. Progressive restoration of strategic readability."
        )}
      />
    </DetailPageLayout>
  );
};

export default DeciderSansVisibilite;
