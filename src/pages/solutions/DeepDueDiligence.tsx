import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const DeepDueDiligence = () => (
  <DetailPageLayout
    title="Deep Due Diligence"
    chapeau="Le risque n'est jamais visible. Il se loge dans l'angle mort de ceux qui ne vérifient pas assez profondément."
    ctas={[{ label: "Parler de mon projet", action: "#", formType: "f1" }]}
  >
    <div className="grid gap-5 md:grid-cols-3">
      {[
        { level: "Niveau 1", name: "Integrity Check", items: ["Mapping express des acteurs","Screening PEP et affiliations","Signaux faibles : sanctions, litiges"], deliverable: "Livrable : Fiche Go/Vigilance/No-Go" },
        { level: "Niveau 2", name: "Strategic Risk Profiling", items: ["Cartographie des parties prenantes","Analyse géopolitique"], deliverable: "Livrable : Rapport stratégique + Cartographie" },
        { level: "Niveau 3", name: "Regulatory Compliance", items: ["Décryptage actionnariats offshore","Audit KYC, KYS, LCB-FT, ESG"], deliverable: "Livrable : Dossier forensique + Dashboard" },
      ].map(l => (
        <div key={l.level} className="card-glass p-6">
          <h3 className="font-serif text-lg font-bold">{l.level}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">{l.name}</p>
          <DetailList items={l.items} />
          <p className="mt-4 text-xs font-semibold text-primary">{l.deliverable}</p>
        </div>
      ))}
    </div>
    <DetailBlock title="Outils mobilisés">
      <DetailList items={["OSINT premium et bases mondiales (PEP, OFAC, EU, UN)","IA d'analyse relationnelle","Veille augmentée (dark web, deep web)","Graphes de connexions et détection de réseaux"]} />
    </DetailBlock>
    <DetailBlock title="Signaux d'alerte détectés">
      <DetailList items={["Montages opaques : structures offshore complexes","Affiliations politiques risquées : liens avec régimes autoritaires, PEP","Passifs dissimulés : litiges non déclarés, dettes cachées","Réputations compromises : scandales passés enterrés","Vulnérabilités géopolitiques : exposition aux sanctions","Conflits d'intérêts structurels : interconnexions avec concurrents"]} />
    </DetailBlock>
    <DetailBlock title="Notre promesse">
      <p className="mt-2 font-semibold">Éviter le mauvais deal, le faux partenaire ou le futur scandale.</p>
    </DetailBlock>
    <CaseStudy title="400M$ sécurisés — Fonds d'investissement" context="Due Diligence Niveau 3 sur société Capital Risque." intervention={["Vérifications sur plateformes de sanctions internationales (ONU, OFAC, EU)","Deep Due Diligence 3 niveaux"]} result="Validation complète. Partenariat conclu en sécurité." />
  </DetailPageLayout>
);
export default DeepDueDiligence;
