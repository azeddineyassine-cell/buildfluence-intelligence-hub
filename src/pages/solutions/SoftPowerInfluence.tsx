import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const SoftPowerInfluence = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title="Soft Power & Influence"
      chapeau={t(
        "Ne laissez pas les autres écrire votre histoire. Façonnez votre perception. Imposez votre narratif.",
        "Don't let others write your story. Shape your perception. Impose your narrative."
      )}
      ctas={[
        { label: t("Parler de mon projet", "Discuss my project"), action: "/contact" },
      ]}
    >
      {/* SERVICE 1 — Intelligence d'Influence */}
      <div className="rounded border border-border bg-secondary p-8">
        <h3 className="font-serif text-xl font-bold text-primary">SERVICE 1 — {t("Intelligence d'Influence", "Influence Intelligence")}</h3>

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Cartographie des Réseaux de Pouvoir", "Power Network Mapping")}</h4>
        <DetailList items={[
          t("Mapping des leaders d'opinion, investisseurs, relais médiatiques, experts", "Mapping of opinion leaders, investors, media relays, experts"),
          t("Identification des nœuds d'amplification", "Identification of amplification nodes"),
          t("Construction de graphes d'influence", "Construction of influence graphs"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Analyse des Dynamiques d'Influence", "Influence Dynamics Analysis")}</h4>
        <DetailList items={[
          t("Qui façonne les récits dominants ?", "Who shapes the dominant narratives?"),
          t("Alliances informelles, frictions, rivalités narratives", "Informal alliances, frictions, narrative rivalries"),
          t("Détection des angles d'attaque réputationnels", "Detection of reputational attack angles"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Stratégie d'Activation d'Influence", "Influence Activation Strategy")}</h4>
        <DetailList items={[
          t("Choix des circuits d'amplification légitimes", "Choice of legitimate amplification circuits"),
          t("Positionnement stratégique dans les écosystèmes favorables", "Strategic positioning in favorable ecosystems"),
          t("Synchronisation messages / relais / timing", "Message / relay / timing synchronization"),
        ]} />

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Méthodologie", "Methodology")}</p>
          <p className="mt-1 text-sm text-foreground/80">OSINT renforcé, Social Graphing, NLP, Graphe sémantique</p>
          <p className="mt-2 text-sm font-semibold text-primary">
            {t("Résultat : Vous orientez les perceptions avant qu'elles ne deviennent des décisions.", "Result: You orient perceptions before they become decisions.")}
          </p>
        </div>
      </div>

      {/* SERVICE 2 — Political Intelligence */}
      <div className="rounded border border-border bg-secondary p-8">
        <h3 className="font-serif text-xl font-bold text-primary">SERVICE 2 — Political Intelligence</h3>

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Cartographie de l'Écosystème Politique", "Political Ecosystem Mapping")}</h4>
        <DetailList items={[
          t("Mapping des décideurs publics clés", "Mapping of key public decision-makers"),
          t("Lecture des chaînes de décision formelles et informelles", "Reading formal and informal decision chains"),
          t("Identification des points de blocage réglementaires", "Identification of regulatory blockage points"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Analyse politique & Opinion Publique", "Political Analysis & Public Opinion")}</h4>
        <DetailList items={[
          t("Monitoring des sentiments politiques structurants", "Monitoring of structuring political sentiments"),
          t("Cartographie des mouvements d'opinion à impact réglementaire", "Mapping of opinion movements with regulatory impact"),
          t("Suivi des expressions socio-économiques dominantes", "Tracking of dominant socio-economic expressions"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Gestion des acteurs réfractaires", "Management of resistant actors")}</h4>
        <DetailList items={[
          t("Identification des opposants institutionnels ou politiques", "Identification of institutional or political opponents"),
          t("Analyse de leur capacité de nuisance", "Analysis of their capacity for harm"),
          t("Scénarios de neutralisation non conflictuelle", "Non-conflictual neutralization scenarios"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Stratégie d'accès politique", "Political access strategy")}</h4>
        <DetailList items={[
          t("Design d'un narratif d'utilité publique", "Design of a public utility narrative"),
          t("Lecture et anticipation du processus législatif", "Reading and anticipation of the legislative process"),
          t("Production de contenus d'autorité pour décideurs", "Production of authority content for decision-makers"),
        ]} />

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Valeur créée", "Value created")}</p>
          <p className="mt-1 text-sm text-foreground/80">
            {t(
              "Longueur d'avance réglementaire. Réduction du risque politique. Influence mesurable (KPIs). Facilité d'accès aux décideurs.",
              "Regulatory head start. Political risk reduction. Measurable influence (KPIs). Ease of access to decision-makers."
            )}
          </p>
        </div>
      </div>

      <CaseStudy
        title={t("Cas client : Livre Blanc e-Santé", "Case study: e-Health White Paper")}
        context={t(
          "2 ans après, le Ministère de la Santé lance un appel d'offres de 180M MAD reprenant la recommandation principale.",
          "2 years later, the Ministry of Health launches a 180M MAD tender adopting the main recommendation."
        )}
        intervention={[
          t("Rédaction du Livre Blanc stratégique", "Drafting the strategic White Paper"),
          t("Positionnement auprès des décideurs publics", "Positioning with public decision-makers"),
        ]}
        result={t("Recommandation reprise dans l'appel d'offres national de 180M MAD.", "Recommendation adopted in the 180M MAD national tender.")}
      />

      {/* SERVICE 3 — Attractivité Territoriale */}
      <div className="rounded border border-border bg-secondary p-8">
        <h3 className="font-serif text-xl font-bold text-primary">SERVICE 3 — {t("Attractivité Territoriale", "Territorial Attractiveness")}</h3>

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Storytelling d'Attractivité", "Attractiveness Storytelling")}</h4>
        <DetailList items={[
          t("Cartographie de votre écosystème", "Mapping of your ecosystem"),
          t("Construction de narratifs territoriaux crédibles", "Construction of credible territorial narratives"),
          t("Architecture d'observatoire d'investissement", "Investment observatory architecture"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Compétitivité Territoriale", "Territorial Competitiveness")}</h4>
        <DetailList items={[
          t("Benchmark pays/régions concurrentes", "Benchmark competing countries/regions"),
          t("Guerre économique de l'investissement", "Economic war of investment"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Bataille de l'Attention", "Battle for Attention")}</h4>
        <DetailList items={[
          t("Captation de l'intérêt des investisseurs", "Capturing investor interest"),
          t("Stratégie de présence dans forums internationaux", "International forum presence strategy"),
          t("Activation de think tanks et leaders d'opinion", "Activation of think tanks and opinion leaders"),
        ]} />

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Ce que vous devez sécuriser", "What you must secure")}</p>
          <DetailList items={[
            t("Un narratif d'attractivité unique, cohérent et différenciant", "A unique, coherent and differentiating attractiveness narrative"),
            t("Une présence stratégique dans les cercles d'influence économiques, financiers et institutionnels", "Strategic presence in economic, financial and institutional influence circles"),
            t("Des relais crédibles capables d'amplifier votre message", "Credible relays capable of amplifying your message"),
            t("Des outils de mesure de perception pour piloter votre capital réputationnel", "Perception measurement tools to manage your reputational capital"),
            t("Une stratégie de Soft Power alignée sur vos priorités nationales", "A Soft Power strategy aligned with your national priorities"),
          ]} />
        </div>
      </div>

      <CaseStudy
        title={t("Cas client : CIDC (OCI) — 57 pays", "Case study: CIDC (OIC) — 57 countries")}
        context={t(
          "Notoriété en déclin.",
          "Declining notoriety."
        )}
        intervention={[
          t("Doing Business Platform déployée", "Doing Business Platform deployed"),
          t("Repositionnement stratégique", "Strategic repositioning"),
        ]}
        result={t("Notoriété restaurée immédiatement.", "Notoriety restored immediately.")}
      />
    </DetailPageLayout>
  );
};

export default SoftPowerInfluence;
