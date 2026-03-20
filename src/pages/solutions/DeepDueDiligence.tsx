import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const DeepDueDiligence = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title="Deep Due Diligence"
      chapeau={t(
        "Le risque n'est jamais visible. Il se loge dans l'angle mort de ceux qui ne vérifient pas assez profondément.",
        "Risk is never visible. It lies in the blind spot of those who don't verify deeply enough."
      )}
      ctas={[
        { label: t("Parler de mon projet", "Discuss my project"), action: "/contact" },
      ]}
    >
      {/* 3 Niveaux */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded border border-border bg-secondary p-6">
          <h3 className="font-serif text-lg font-bold">Niveau 1</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">Integrity Check</p>
          <DetailList items={[
            t("Mapping express des acteurs", "Express actor mapping"),
            t("Screening PEP et affiliations", "PEP screening and affiliations"),
            t("Signaux faibles : sanctions, litiges", "Weak signals: sanctions, litigation"),
          ]} />
          <p className="mt-4 text-xs font-semibold text-accent">{t("Livrable : Fiche Go/Vigilance/No-Go", "Deliverable: Go/Vigilance/No-Go sheet")}</p>
        </div>
        <div className="rounded border border-border bg-secondary p-6">
          <h3 className="font-serif text-lg font-bold">Niveau 2</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">Strategic Risk Profiling</p>
          <DetailList items={[
            t("Cartographie des parties prenantes", "Stakeholder mapping"),
            t("Analyse géopolitique", "Geopolitical analysis"),
          ]} />
          <p className="mt-4 text-xs font-semibold text-accent">{t("Livrable : Rapport stratégique + Cartographie", "Deliverable: Strategic report + Mapping")}</p>
        </div>
        <div className="rounded border border-border bg-secondary p-6">
          <h3 className="font-serif text-lg font-bold">Niveau 3</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">Regulatory Compliance</p>
          <DetailList items={[
            t("Décryptage actionnariats offshore", "Offshore shareholding decryption"),
            t("Audit KYC, KYS, LCB-FT, ESG", "KYC, KYS, AML-CFT, ESG audit"),
          ]} />
          <p className="mt-4 text-xs font-semibold text-accent">{t("Livrable : Dossier forensique + Dashboard", "Deliverable: Forensic file + Dashboard")}</p>
        </div>
      </div>

      <DetailBlock title={t("Outils mobilisés", "Tools deployed")}>
        <DetailList items={[
          t("OSINT premium et bases mondiales (PEP, OFAC, EU, UN)", "Premium OSINT and global databases (PEP, OFAC, EU, UN)"),
          t("IA d'analyse relationnelle", "Relational analysis AI"),
          t("Veille augmentée (dark web, deep web)", "Augmented monitoring (dark web, deep web)"),
          t("Graphes de connexions et détection de réseaux", "Connection graphs and network detection"),
        ]} />
      </DetailBlock>

      <DetailBlock title={t("Les signaux d'alerte que nous détectons", "Warning signals we detect")}>
        <DetailList items={[
          t("Montages opaques : structures offshore complexes, actionnariat difficile à tracer", "Opaque structures: complex offshore structures, hard-to-trace shareholding"),
          t("Affiliations politiques risquées : liens avec régimes autoritaires, PEP, réseaux d'influence toxiques", "Risky political affiliations: links with authoritarian regimes, PEPs, toxic influence networks"),
          t("Passifs dissimulés : litiges en cours non déclarés, dettes cachées, procédures judiciaires dans d'autres pays", "Hidden liabilities: undeclared ongoing litigation, hidden debts, judicial proceedings in other countries"),
          t("Réputations compromises : scandales passés enterrés, associations avec acteurs condamnés", "Compromised reputations: buried past scandals, associations with convicted actors"),
          t("Vulnérabilités géopolitiques : exposition à des sanctions potentielles, zones de conflit", "Geopolitical vulnerabilities: exposure to potential sanctions, conflict zones"),
          t("Conflits d'intérêts structurels : interconnexions avec concurrents, double-jeu commercial", "Structural conflicts of interest: interconnections with competitors, commercial double-dealing"),
        ]} />
      </DetailBlock>

      <DetailBlock title={t("Notre promesse", "Our promise")}>
        <p className="mt-2 font-semibold">
          {t(
            "Éviter le mauvais deal, le faux partenaire ou le futur scandale.",
            "Avoid the bad deal, the false partner or the future scandal."
          )}
        </p>
      </DetailBlock>

      <CaseStudy
        title={t("400M$ sécurisés — Fonds d'investissement", "$400M secured — Investment Fund")}
        context={t(
          "Due Diligence Niveau 3 sur société Capital Risque.",
          "Level 3 Due Diligence on Venture Capital firm."
        )}
        intervention={[
          t("Vérifications sur plateformes de sanctions internationales (ONU, OFAC, EU)", "Checks on international sanctions platforms (UN, OFAC, EU)"),
          t("Deep Due Diligence 3 niveaux", "3-level Deep Due Diligence"),
        ]}
        result={t("Validation complète. Partenariat conclu en sécurité.", "Complete validation. Partnership concluded safely.")}
      />
    </DetailPageLayout>
  );
};

export default DeepDueDiligence;
