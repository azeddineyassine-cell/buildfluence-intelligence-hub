import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const StrategicIntelligenceLab = () => (
  <DetailPageLayout
    title="Strategic Intelligence Lab"
    chapeau="Voir avant. Comprendre mieux. Décider plus vite que tous."
    ctas={[{ label: "Parler de mon projet", action: "#", formType: "f1" }]}
  >
    <DetailBlock title="Introduction">
      <p className="mt-2">Le pouvoir appartient à ceux qui voient les ruptures avant qu'elles ne soient évidentes. Le Strategic Intelligence Lab transforme l'incertain en décidable.</p>
    </DetailBlock>
    <div className="card-glass p-8">
      <h3 className="font-serif text-xl font-bold text-primary">SERVICE 1 — Strategic Foresight</h3>
      <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Market & Competitive Intelligence</h4>
      <DetailList items={["Veille multicanale : marchés, concurrents, brevets, réglementaire","Mapping concurrentiel dynamique","Détection des tendances sectorielles","Identification des marchés à fort potentiel","Études prospectives, benchmarks internationaux","Cartographie des acteurs clés : Alliés / Réfractaires / Idiots utiles"]} />
      <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Attractivité & Compétitivité Territoriale</h4>
      <DetailList items={["Guerre économique de l'investissement","Benchmark pays/régions concurrentes","Politiques publiques comparées","Narratifs d'attractivité et crédibilité internationale"]} />
      <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Innovation Mapping</h4>
      <DetailList items={["Cartographie des technologies émergentes et startups","Écosystèmes d'innovation (Deeptech, AI, biotech)","Tendances VC/CVC","Opportunités d'Open Innovation et M&A stratégiques","Veille brevets (WIPO, EPO, USPTO)"]} />
      <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Stakeholder Intelligence</h4>
      <DetailList items={["Mapping des stratégies adverses et des réseaux d'influence","Cartographie des leaders d'opinion, investisseurs, think tanks, ONG","Analyse des alliances et antagonismes"]} />
    </div>
    <CaseStudy title="Cas client : OCP Group" context="Cartographie de l'écosystème concurrentiel. Tableau de bord décisionnel au cabinet du Président." intervention={["Analyse par échiquiers : Géopolitique, Concurrentiel, Sociétal","Cartographie et Matrice dynamique des parties prenantes","Tableau de bord décisionnel"]} result="Protection de milliards de dollars de CA." />
    <div className="card-glass p-8">
      <h3 className="font-serif text-xl font-bold text-primary">SERVICE 2 — Threat Intelligence</h3>
      <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">OSINT & Fact-Checking</h4>
      <DetailList items={["Veille ciblée appuyée par l'IA","Analyse de polarisation narrative","Tracking des sources hostiles","Stratégie de contre-influence"]} />
      <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Gestion de Crise</h4>
      <DetailList items={["War room — Délai d'activation : 2h","Fact-checking en temps réel","Reconquête réputationnelle accélérée"]} />
    </div>
    <CaseStudy title="Cas client : Ministère de la Santé" context="Crise H1N1, 40 décès, désinformation massive." intervention={["Digital Investigation et Fact-checking en temps réel","Identification des sources de désinformation","War room de crise"]} result="Crise atténuée en 2 semaines." />
    <div className="card-glass p-8">
      <h3 className="font-serif text-xl font-bold text-primary">SERVICE 3 — Expérimentations & POCs</h3>
      <DetailList items={["Intégration de vos enjeux stratégiques","Modèles d'analyse prédictive","Plateformes de détection de signaux faibles","Livrable POC : 1 semaine","Baromètres d'image","Tableaux de bord décisionnels","Strategic Business Reviews"]} />
    </div>
  </DetailPageLayout>
);
export default StrategicIntelligenceLab;
