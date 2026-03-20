import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const SoftPowerInfluence = () => (
  <DetailPageLayout
    title="Soft Power & Influence"
    chapeau="Ne laissez pas les autres écrire votre histoire. Façonnez votre perception. Imposez votre narratif."
    ctas={[{ label: "Parler de mon projet", action: "#", formType: "f1" }]}
  >
    <div className="card-glass p-8">
      <h3 className="font-serif text-xl font-bold text-primary">SERVICE 1 — Intelligence d'Influence</h3>
      <DetailList items={["Mapping des leaders d'opinion, investisseurs, relais médiatiques","Identification des nœuds d'amplification","Qui façonne les récits dominants ? Alliances, rivalités narratives","Choix des circuits d'amplification légitimes","Synchronisation messages / relais / timing"]} />
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Méthodologie</p>
        <p className="mt-1 text-sm text-foreground/80">OSINT renforcé, Social Graphing, NLP, Graphe sémantique</p>
        <p className="mt-2 text-sm font-semibold text-primary">Résultat : Vous orientez les perceptions avant qu'elles ne deviennent des décisions.</p>
      </div>
    </div>
    <div className="card-glass p-8">
      <h3 className="font-serif text-xl font-bold text-primary">SERVICE 2 — Political Intelligence</h3>
      <DetailList items={["Mapping des décideurs publics clés","Lecture des chaînes de décision formelles et informelles","Identification des points de blocage réglementaires","Monitoring des sentiments politiques structurants","Identification des opposants et analyse de leur capacité de nuisance","Design d'un narratif d'utilité publique","Production de contenus d'autorité pour décideurs"]} />
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-sm text-foreground/80">Valeur : Longueur d'avance réglementaire. Réduction du risque politique. Influence mesurable (KPIs).</p>
      </div>
    </div>
    <CaseStudy title="Cas client : Livre Blanc e-Santé" context="2 ans après, le Ministère de la Santé lance un appel d'offres de 180M MAD reprenant la recommandation principale." intervention={["Rédaction du Livre Blanc stratégique","Positionnement auprès des décideurs publics"]} result="Recommandation reprise dans l'appel d'offres national de 180M MAD." />
    <div className="card-glass p-8">
      <h3 className="font-serif text-xl font-bold text-primary">SERVICE 3 — Attractivité Territoriale</h3>
      <DetailList items={["Cartographie de votre écosystème territorial","Construction de narratifs territoriaux crédibles et différenciants","Benchmark pays/régions concurrentes","Captation de l'intérêt des investisseurs","Stratégie de présence dans les forums internationaux","Activation de think tanks et leaders d'opinion"]} />
    </div>
    <CaseStudy title="Cas client : CIDC (OCI) — 57 pays" context="Notoriété en déclin." intervention={["Doing Business Platform déployée","Repositionnement stratégique"]} result="Notoriété restaurée immédiatement." />
  </DetailPageLayout>
);
export default SoftPowerInfluence;
