import DetailPageLayout, { DetailBlock, DetailList, CaseStudy, SectionBlock } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import cidcLogo from "@/assets/clients/cidc.jpg";
import imgSoftPower from "@/assets/sections/soft-power-influence.jpg";

const SoftPowerInfluence = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title="Soft Power & Influence"
      chapeau={t("Ne laissez pas les autres écrire votre histoire. Façonnez votre perception. Imposez votre narratif.", "Don't let others write your story. Shape your perception. Impose your narrative.")}
      ctas={[{ label: t("Parler de mon projet", "Discuss my project"), action: "#", formType: "f1" }]}
      situationContext="Soft Power & Influence"
    >
      <DetailBlock title="">
        <p>{t("Ne laissez pas les autres écrire votre histoire. Façonnez votre perception. Imposez votre narratif.", "Don't let others write your story. Shape your perception. Impose your narrative.")}</p>
      </DetailBlock>

      <img src={imgSoftPower} alt="Soft Power & Influence" className="w-full rounded-sm" />

      <SectionBlock title={t("Intelligence d'Influence", "Influence Intelligence")}>
        <DetailList items={[
          t("Mapping des leaders d'opinion, investisseurs, relais médiatiques", "Mapping of opinion leaders, investors, media relays"),
          t("Identification des nœuds d'amplification", "Identification of amplification nodes"),
          t("Qui façonne les récits dominants ? Alliances, rivalités narratives", "Who shapes dominant narratives? Alliances, narrative rivalries"),
          t("Choix des circuits d'amplification légitimes", "Choice of legitimate amplification circuits"),
          t("Synchronisation messages / relais / timing", "Message / relay / timing synchronization"),
        ]} />
        <div className="mt-4 border-t border-border pt-3">
          <p className="detail-subtitle text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Méthodologie", "Methodology")}</p>
          <p className="mt-1 text-sm text-foreground/80">OSINT {t("renforcé", "enhanced")}, Social Graphing, NLP, {t("Graphe sémantique", "Semantic graph")}</p>
          <p className="mt-2 text-sm font-semibold text-primary">{t("Résultat : Vous orientez les perceptions avant qu'elles ne deviennent des décisions.", "Result: You shape perceptions before they become decisions.")}</p>
        </div>
      </SectionBlock>

      <SectionBlock title="Political Intelligence">
        <DetailList items={[
          t("Mapping des décideurs publics clés", "Mapping of key public decision-makers"),
          t("Lecture des chaînes de décision formelles et informelles", "Reading formal and informal decision chains"),
          t("Identification des points de blocage réglementaires", "Identification of regulatory blocking points"),
          t("Monitoring des sentiments politiques structurants", "Monitoring of structuring political sentiments"),
          t("Identification des opposants et analyse de leur capacité de nuisance", "Identification of opponents and analysis of their harmful capacity"),
          t("Design d'un narratif d'utilité publique", "Design of a public utility narrative"),
          t("Production de contenus d'autorité pour décideurs", "Production of authority content for decision-makers"),
        ]} />
        <div className="mt-4 border-t border-border pt-3">
          <p className="text-sm text-foreground/80">{t("Valeur : Longueur d'avance réglementaire. Réduction du risque politique. Influence mesurable (KPIs).", "Value: Regulatory head start. Political risk reduction. Measurable influence (KPIs).")}</p>
        </div>
      </SectionBlock>

      <CaseStudy
        title={t("Cas client : Livre Blanc e-Santé", "Client case: e-Health White Paper")}
        context={t("2 ans après, le Ministère de la Santé lance un appel d'offres de 180M MAD reprenant la recommandation principale.", "2 years later, the Ministry of Health launches a 180M MAD tender incorporating the main recommendation.")}
        intervention={[
          t("Rédaction du Livre Blanc stratégique", "Strategic White Paper drafting"),
          t("Positionnement auprès des décideurs publics", "Positioning with public decision-makers"),
        ]}
        result={t("Recommandation reprise dans l'appel d'offres national de 180M MAD.", "Recommendation incorporated into the 180M MAD national tender.")}
      />

      <SectionBlock title={t("Territorial Influence Lab", "Territorial Influence Lab")}>
        <DetailList items={[
          t("Cartographie de votre écosystème territorial", "Mapping of your territorial ecosystem"),
          t("Construction de narratifs territoriaux crédibles et différenciants", "Construction of credible and differentiating territorial narratives"),
          t("Benchmark pays/régions concurrentes", "Competing countries/regions benchmark"),
          t("Captation de l'intérêt des investisseurs", "Capturing investor interest"),
          t("Stratégie de présence dans les forums internationaux", "Strategy for presence in international forums"),
          t("Activation de think tanks et leaders d'opinion", "Activation of think tanks and opinion leaders"),
        ]} />
      </SectionBlock>

      <CaseStudy
        logo={cidcLogo}
        title={t("Cas client : CIDC (OCI) — 57 pays", "Client case: ICDT (OIC) — 57 countries")}
        context={t("Notoriété en déclin.", "Declining visibility.")}
        intervention={[
          t("Doing Business Platform déployée", "Doing Business Platform deployed"),
          t("Repositionnement stratégique", "Strategic repositioning"),
        ]}
        result={t("Notoriété restaurée immédiatement.", "Visibility restored immediately.")}
      />
    </DetailPageLayout>
  );
};
export default SoftPowerInfluence;
