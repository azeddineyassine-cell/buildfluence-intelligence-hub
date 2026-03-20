import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const StrategicIntelligenceLab = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title="Strategic Intelligence Lab"
      chapeau={t(
        "Voir avant. Comprendre mieux. Décider plus vite que tous.",
        "See first. Understand better. Decide faster than everyone."
      )}
      ctas={[
        { label: t("Parler de mon projet", "Discuss my project"), action: "/contact" },
      ]}
    >
      <DetailBlock title="Introduction">
        <p className="mt-2">
          {t(
            "Le pouvoir appartient à ceux qui voient les ruptures avant qu'elles ne soient évidentes. À ceux qui détectent les signaux faibles pendant que les autres analysent les tendances. Le Strategic Intelligence Lab transforme l'incertain en décidable.",
            "Power belongs to those who see disruptions before they become obvious. To those who detect weak signals while others analyze trends. The Strategic Intelligence Lab transforms uncertainty into decidable."
          )}
        </p>
      </DetailBlock>

      {/* SERVICE 1 — Strategic Foresight */}
      <div className="rounded border border-border bg-secondary p-8">
        <h3 className="font-serif text-xl font-bold text-primary">SERVICE 1 — Strategic Foresight</h3>

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">Market & Competitive Intelligence</h4>
        <DetailList items={[
          t("Veille spécifique multicanale : marchés, concurrents, brevets, réglementaire", "Multichannel specific monitoring: markets, competitors, patents, regulatory"),
          t("Mapping concurrentiel dynamique : parts de marché, stratégies adverses, M&A", "Dynamic competitive mapping: market shares, adverse strategies, M&A"),
          t("Détection des tendances sectorielles et habitudes consommateurs", "Detection of sectoral trends and consumer habits"),
          t("Identification des marchés à fort potentiel d'investissement", "Identification of high-investment-potential markets"),
          t("Études prospectives, benchmarks internationaux, best practices", "Prospective studies, international benchmarks, best practices"),
          t("Cartographie des acteurs clés : Alliés / Réfractaires / Idiots utiles", "Mapping of key actors: Allies / Opponents / Useful idiots"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Attractivité & Compétitivité Territoriale", "Attractiveness & Territorial Competitiveness")}</h4>
        <DetailList items={[
          t("Guerre économique de l'investissement", "Economic war of investment"),
          t("Benchmark pays/régions concurrentes", "Benchmark competing countries/regions"),
          t("Politiques publiques comparées", "Compared public policies"),
          t("Narratifs d'attractivité et crédibilité internationale", "Attractiveness narratives and international credibility"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">Innovation Mapping</h4>
        <DetailList items={[
          t("Cartographie des technologies émergentes et startups à fort potentiel", "Mapping of emerging technologies and high-potential startups"),
          t("Écosystèmes d'innovation (Deeptech, AI, biotech)", "Innovation ecosystems (Deeptech, AI, biotech)"),
          t("Tendances d'investissement VC/CVC", "VC/CVC investment trends"),
          t("Opportunités d'Open Innovation et M&A stratégiques", "Open Innovation and strategic M&A opportunities"),
          t("Veille brevets (WIPO, EPO, USPTO)", "Patent monitoring (WIPO, EPO, USPTO)"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">Stakeholder Intelligence</h4>
        <DetailList items={[
          t("Mapping des stratégies adverses et des réseaux d'influence", "Mapping of adverse strategies and influence networks"),
          t("Cartographie des leaders d'opinion, investisseurs, think tanks, ONG", "Mapping of opinion leaders, investors, think tanks, NGOs"),
          t("Analyse des alliances et antagonismes dans votre écosystème", "Analysis of alliances and antagonisms in your ecosystem"),
        ]} />
      </div>

      <CaseStudy
        title={t("Cas client : OCP Group", "Case study: OCP Group")}
        context={t(
          "Cartographie de l'écosystème concurrentiel. Tableau de bord décisionnel au cabinet du Président.",
          "Mapping of the competitive ecosystem. Decision dashboard at the President's office."
        )}
        intervention={[
          t("Analyse par échiquiers : Géopolitique, Concurrentiel, Sociétal", "Analysis by chessboards: Geopolitical, Competitive, Societal"),
          t("Cartographie et Matrice dynamique des parties prenantes", "Mapping and dynamic stakeholder matrix"),
          t("Tableau de bord décisionnel au cabinet du Président", "Decision dashboard at the President's office"),
        ]}
        result={t("Protection de milliards de dollars de CA.", "Protection of billions of dollars in revenue.")}
      />

      {/* SERVICE 2 — Threat Intelligence */}
      <div className="rounded border border-border bg-secondary p-8">
        <h3 className="font-serif text-xl font-bold text-primary">SERVICE 2 — Threat Intelligence</h3>

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">OSINT & Fact-Checking</h4>
        <DetailList items={[
          t("Veille ciblée appuyée par l'IA", "AI-supported targeted monitoring"),
          t("Analyse de polarisation narrative", "Narrative polarization analysis"),
          t("Tracking des sources hostiles", "Hostile source tracking"),
          t("Stratégie de contre-influence", "Counter-influence strategy"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Risques Géopolitiques", "Geopolitical Risks")}</h4>
        <DetailList items={[
          t("Monitoring et analyse des conflits", "Conflict monitoring and analysis"),
          t("Veille géoéconomique sur zones d'instabilité", "Geoeconomic monitoring of instability zones"),
          t("Simulation d'impact Supply Chain", "Supply Chain impact simulation"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">Brand & Reputation</h4>
        <DetailList items={[
          t("Audit réputationnel 360° (Web & Social Listening)", "360° reputational audit (Web & Social Listening)"),
          t("Monitoring multi-plateformes", "Multi-platform monitoring"),
          t("Cartographie des vulnérabilités", "Vulnerability mapping"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Gestion de Crise", "Crisis Management")}</h4>
        <DetailList items={[
          "War room",
          t("Délai d'activation : 2h", "Activation time: 2h"),
          t("Fact-checking ultra-rapide", "Ultra-fast fact-checking"),
          t("Reconquête réputationnelle accélérée", "Accelerated reputational recovery"),
        ]} />
      </div>

      <CaseStudy
        title={t("Cas client : Ministère de la Santé", "Case study: Ministry of Health")}
        context={t(
          "Crise H1N1 avec 40 décès, désinformation massive.",
          "H1N1 crisis with 40 deaths, massive disinformation."
        )}
        intervention={[
          t("Digital Investigation et Fact-checking en temps réel", "Digital Investigation and real-time Fact-checking"),
          t("Identification des sources de désinformation", "Identification of disinformation sources"),
          "War room de crise",
        ]}
        result={t("Crise atténuée en 2 semaines.", "Crisis mitigated in 2 weeks.")}
      />

      {/* SERVICE 3 — Expérimentations & POCs */}
      <div className="rounded border border-border bg-secondary p-8">
        <h3 className="font-serif text-xl font-bold text-primary">SERVICE 3 — {t("Expérimentations & POCs", "Experiments & POCs")}</h3>

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">POCs (Proof of Concept)</h4>
        <DetailList items={[
          t("Intégration de vos enjeux stratégiques", "Integration of your strategic challenges"),
          t("Production des modèles d'analyse prédictive", "Production of predictive analysis models"),
          t("Plateformes de détection de signaux faibles", "Weak signal detection platforms"),
          t("Déploiement & Livrable POC : 1 semaine", "Deployment & POC Deliverable: 1 week"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{t("Nouveaux Indicateurs d'Attractivité", "New Attractiveness Indicators")}</h4>
        <DetailList items={[
          t("Baromètres adaptés à vos objectifs", "Barometers adapted to your objectives"),
          t("Scoring stratégique innovant", "Innovative strategic scoring"),
        ]} />

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">Productions Strategic Intelligence Lab</h4>
        <DetailList items={[
          t("Baromètres d'image", "Image barometers"),
          t("Tableaux de bord décisionnels", "Decision dashboards"),
          "Strategic Business Reviews",
        ]} />
      </div>
    </DetailPageLayout>
  );
};

export default StrategicIntelligenceLab;
