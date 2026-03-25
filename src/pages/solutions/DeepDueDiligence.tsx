import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const DeepDueDiligence = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title="Deep Due Diligence"
      chapeau={t("Le risque n'est jamais visible. Il se loge dans l'angle mort de ceux qui ne vérifient pas assez profondément.", "Risk is never visible. It hides in the blind spot of those who don't verify deeply enough.")}
      ctas={[{ label: t("Parler de mon projet", "Discuss my project"), action: "#", formType: "f1" }]}
      situationContext="Deep Due Diligence"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { level: t("Niveau 1", "Level 1"), name: "Integrity Check", items: [t("Mapping express des acteurs", "Express stakeholder mapping"), t("Screening PEP et affiliations", "PEP screening and affiliations"), t("Signaux faibles : sanctions, litiges", "Weak signals: sanctions, litigation")], deliverable: t("Livrable : Fiche Go/Vigilance/No-Go", "Deliverable: Go/Vigilance/No-Go sheet") },
          { level: t("Niveau 2", "Level 2"), name: "Strategic Risk Profiling", items: [t("Cartographie des parties prenantes", "Stakeholder mapping"), t("Analyse géopolitique", "Geopolitical analysis")], deliverable: t("Livrable : Rapport stratégique + Cartographie", "Deliverable: Strategic report + Mapping") },
          { level: t("Niveau 3", "Level 3"), name: "Regulatory Compliance", items: [t("Décryptage actionnariats offshore", "Offshore shareholding decryption"), t("Audit KYC, KYS, LCB-FT, ESG", "KYC, KYS, AML-CFT, ESG audit")], deliverable: t("Livrable : Dossier forensique + Dashboard", "Deliverable: Forensic file + Dashboard") },
        ].map(l => (
          <div key={l.level} className="card-glass p-6">
            <h3 className="detail-subtitle text-lg font-bold">{l.level}</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">{l.name}</p>
            <DetailList items={l.items} />
            <p className="mt-4 text-xs font-semibold text-primary">{l.deliverable}</p>
          </div>
        ))}
      </div>
      <DetailBlock title={t("Outils mobilisés", "Tools deployed")}>
        <DetailList items={[
          t("OSINT premium et bases mondiales (PEP, OFAC, EU, UN)", "Premium OSINT and global databases (PEP, OFAC, EU, UN)"),
          t("IA d'analyse relationnelle", "Relational analysis AI"),
          t("Veille augmentée (dark web, deep web)", "Augmented monitoring (dark web, deep web)"),
          t("Graphes de connexions et détection de réseaux", "Connection graphs and network detection"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Signaux d'alerte détectés", "Detected warning signals")}>
        <DetailList items={[
          t("Montages opaques : structures offshore complexes", "Opaque structures: complex offshore schemes"),
          t("Affiliations politiques risquées : liens avec régimes autoritaires, PEP", "Risky political affiliations: links to authoritarian regimes, PEPs"),
          t("Passifs dissimulés : litiges non déclarés, dettes cachées", "Hidden liabilities: undeclared litigation, concealed debts"),
          t("Réputations compromises : scandales passés enterrés", "Compromised reputations: buried past scandals"),
          t("Vulnérabilités géopolitiques : exposition aux sanctions", "Geopolitical vulnerabilities: sanctions exposure"),
          t("Conflits d'intérêts structurels : interconnexions avec concurrents", "Structural conflicts of interest: interconnections with competitors"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Notre promesse", "Our promise")}>
        <p className="mt-2 font-semibold">{t("Éviter le mauvais deal, le faux partenaire ou le futur scandale.", "Avoid the bad deal, the false partner or the future scandal.")}</p>
      </DetailBlock>
      <CaseStudy
        title={t("400M$ sécurisés — Fonds d'investissement", "$400M secured — Investment fund")}
        context={t("Due Diligence Niveau 3 sur société Capital Risque.", "Level 3 Due Diligence on venture capital firm.")}
        intervention={[
          t("Vérifications sur plateformes de sanctions internationales (ONU, OFAC, EU)", "Checks on international sanctions platforms (UN, OFAC, EU)"),
          "Deep Due Diligence 3 niveaux / 3 levels",
        ]}
        result={t("Validation complète. Partenariat conclu en sécurité.", "Complete validation. Partnership concluded securely.")}
      />
    </DetailPageLayout>
  );
};
export default DeepDueDiligence;
