import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const StrategicIntelligenceLab = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title="Strategic Intelligence Lab"
      chapeau={t("Voir avant. Comprendre mieux. Décider plus vite que tous.", "See first. Understand better. Decide faster than everyone.")}
      ctas={[{ label: t("Parler de mon projet", "Discuss my project"), action: "#", formType: "f1" }]}
    >
      <DetailBlock title="Introduction">
        <p className="mt-2">{t("Le pouvoir appartient à ceux qui voient les ruptures avant qu'elles ne soient évidentes. Le Strategic Intelligence Lab transforme l'incertain en décidable.", "Power belongs to those who see disruptions before they become obvious. The Strategic Intelligence Lab transforms uncertainty into decidable.")}</p>
      </DetailBlock>
      <div className="card-glass p-8">
        <h3 className="font-serif text-xl font-bold text-primary">SERVICE 1 — Strategic Foresight</h3>
        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Market & Competitive Intelligence</h4>
        <DetailList items={[
          t("Veille multicanale : marchés, concurrents, brevets, réglementaire", "Multi-channel monitoring: markets, competitors, patents, regulatory"),
          t("Mapping concurrentiel dynamique", "Dynamic competitive mapping"),
          t("Détection des tendances sectorielles", "Sector trend detection"),
          t("Identification des marchés à fort potentiel", "Identification of high-potential markets"),
          t("Études prospectives, benchmarks internationaux", "Prospective studies, international benchmarks"),
          t("Cartographie des acteurs clés : Alliés / Réfractaires / Idiots utiles", "Key stakeholder mapping: Allies / Opponents / Useful idiots"),
        ]} />
        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">{t("Attractivité & Compétitivité Territoriale", "Territorial Attractiveness & Competitiveness")}</h4>
        <DetailList items={[
          t("Guerre économique de l'investissement", "Economic investment warfare"),
          t("Benchmark pays/régions concurrentes", "Competing countries/regions benchmark"),
          t("Politiques publiques comparées", "Compared public policies"),
          t("Narratifs d'attractivité et crédibilité internationale", "Attractiveness narratives and international credibility"),
        ]} />
        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Innovation Mapping</h4>
        <DetailList items={[
          t("Cartographie des technologies émergentes et startups", "Emerging technologies and startups mapping"),
          t("Écosystèmes d'innovation (Deeptech, AI, biotech)", "Innovation ecosystems (Deeptech, AI, biotech)"),
          t("Tendances VC/CVC", "VC/CVC trends"),
          t("Opportunités d'Open Innovation et M&A stratégiques", "Open Innovation and strategic M&A opportunities"),
          t("Veille brevets (WIPO, EPO, USPTO)", "Patent monitoring (WIPO, EPO, USPTO)"),
        ]} />
        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Stakeholder Intelligence</h4>
        <DetailList items={[
          t("Mapping des stratégies adverses et des réseaux d'influence", "Adverse strategies and influence networks mapping"),
          t("Cartographie des leaders d'opinion, investisseurs, think tanks, ONG", "Opinion leaders, investors, think tanks, NGO mapping"),
          t("Analyse des alliances et antagonismes", "Alliance and antagonism analysis"),
        ]} />
      </div>
      <CaseStudy
        title={t("Cas client : OCP Group", "Client case: OCP Group")}
        context={t("Cartographie de l'écosystème concurrentiel. Tableau de bord décisionnel au cabinet du Président.", "Competitive ecosystem mapping. Decision-making dashboard for the President's office.")}
        intervention={[
          t("Analyse par échiquiers : Géopolitique, Concurrentiel, Sociétal", "Chessboard analysis: Geopolitical, Competitive, Societal"),
          t("Cartographie et Matrice dynamique des parties prenantes", "Dynamic stakeholder mapping and matrix"),
          t("Tableau de bord décisionnel", "Decision-making dashboard"),
        ]}
        result={t("Protection de milliards de dollars de CA.", "Protection of billions of dollars in revenue.")}
      />
      <div className="card-glass p-8">
        <h3 className="font-serif text-xl font-bold text-primary">SERVICE 2 — Threat Intelligence</h3>
        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">OSINT & Fact-Checking</h4>
        <DetailList items={[
          t("Veille ciblée appuyée par l'IA", "AI-supported targeted monitoring"),
          t("Analyse de polarisation narrative", "Narrative polarization analysis"),
          t("Tracking des sources hostiles", "Hostile source tracking"),
          t("Stratégie de contre-influence", "Counter-influence strategy"),
        ]} />
        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">{t("Gestion de Crise", "Crisis Management")}</h4>
        <DetailList items={[
          t("War room — Délai d'activation : 2h", "War room — Activation time: 2h"),
          t("Fact-checking en temps réel", "Real-time fact-checking"),
          t("Reconquête réputationnelle accélérée", "Accelerated reputational recovery"),
        ]} />
      </div>
      <CaseStudy
        title={t("Cas client : Ministère de la Santé", "Client case: Ministry of Health")}
        context={t("Crise H1N1, 40 décès, désinformation massive.", "H1N1 crisis, 40 deaths, massive disinformation.")}
        intervention={[
          t("Digital Investigation et Fact-checking en temps réel", "Digital investigation and real-time fact-checking"),
          t("Identification des sources de désinformation", "Identification of disinformation sources"),
          t("War room de crise", "Crisis war room"),
        ]}
        result={t("Crise atténuée en 2 semaines.", "Crisis mitigated in 2 weeks.")}
      />
      <div className="card-glass p-8">
        <h3 className="font-serif text-xl font-bold text-primary">{t("SERVICE 3 — Expérimentations & POCs", "SERVICE 3 — Experiments & POCs")}</h3>
        <DetailList items={[
          t("Intégration de vos enjeux stratégiques", "Integration of your strategic challenges"),
          t("Modèles d'analyse prédictive", "Predictive analysis models"),
          t("Plateformes de détection de signaux faibles", "Weak signal detection platforms"),
          t("Livrable POC : 1 semaine", "POC deliverable: 1 week"),
          t("Baromètres d'image", "Image barometers"),
          t("Tableaux de bord décisionnels", "Decision-making dashboards"),
          "Strategic Business Reviews",
        ]} />
      </div>
    </DetailPageLayout>
  );
};
export default StrategicIntelligenceLab;
