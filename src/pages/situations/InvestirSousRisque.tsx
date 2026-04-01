import DetailPageLayout, { DetailBlock, DetailList } from "@/components/DetailPageLayout";
import StickyClientCase from "@/components/StickyClientCase";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const InvestirSousRisque = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Investir sous risque invisible", "Investing under invisible risk")}
      chapeau={t("Miser sans connaissance profonde : chaque investissement devient une loterie", "Betting without deep knowledge: every investment becomes a lottery")}
      prevSituation={{ label: "Déficit d'influence", path: "/situations/deficit-influence" }}
      nextSituation={{ label: "Gouverner sous pression", path: "/situations/gouverner-sous-pression" }}
      ctas={[
        { label: t("Évaluer ma situation — GRATUIT", "Evaluate my situation — FREE"), action: "#", formType: "f2" },
      ]}
      sidebar={
        <StickyClientCase
          title={t("Société de Capital-Risque (confidentiel — NDA strict)", "Venture Capital Firm (confidential — strict NDA)")}
          sector={t("Finance — Capital-Risque", "Finance — Venture Capital")}
          context={t("Novembre 2024, due diligence sur une société de Capital Risque valorisée à 400M$ avant partenariat.", "November 2024, due diligence on a venture capital firm valued at $400M before partnership.")}
          intervention={[t("Deep Due Diligence 3 niveaux comprenant vérifications sur plateformes de sanctions internationales (ONU, OFAC, EU)", "3-level Deep Due Diligence including checks on international sanctions platforms (UN, OFAC, EU)")]}
          resultItems={[
            t("Validation complète avec identification de points de vigilance", "Complete validation with identification of vigilance points"),
            t("Partenariat verrouillé en toute sécurité", "Partnership securely locked"),
          ]}
        />
      }
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <DetailList items={[
          t("Vous engagez des ressources importantes sur des partenaires, projets ou marchés", "You commit significant resources to partners, projects or markets"),
          t("Vous vous appuyez sur des apparences et des présentations soignées plutôt que sur des faits vérifiés", "You rely on appearances and polished presentations rather than verified facts"),
          t("Les signaux d'alerte sur la fiabilité, l'intégrité ou la stabilité financière restent hors de portée", "Warning signals about reliability, integrity or financial stability remain out of reach"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("D'exposer votre organisation à des scandales, blacklist ou défaillances", "Exposing your organization to scandals, blacklists or failures"),
          t("De subir des pertes financières par association à des acteurs toxiques et peu fiables", "Suffering financial losses through association with toxic and unreliable actors"),
          t("De voir votre réputation dégradée par contamination", "Seeing your reputation degraded by contamination"),
          t("De perdre la confiance de vos Stakeholders (actionnaires, partenaires, régulateurs)", "Losing the trust of your stakeholders (shareholders, partners, regulators)"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("L'angle mort", "The blind spot")}>
        <DetailList items={[
          t("Les informations critiques sur vos cibles existent mais restent enfouies dans des sources disparates", "Critical information about your targets exists but remains buried in disparate sources"),
          t("Vous investissez sans la Due Diligence systématique que tout professionnel devrait conduire", "You invest without the systematic Due Diligence every professional should conduct"),
          t("Le coût de l'investigation vous semble élevé... jusqu'à ce que le coût d'une mauvaise décision vous rattrape", "The cost of investigation seems high... until the cost of a bad decision catches up with you"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Le coût de l'échec", "The cost of failure")}>
        <DetailList items={[
          t("70 à 90% des fusions-acquisitions échouent par manque de due diligence approfondie (CFA Institute, 2025)", "70-90% of mergers and acquisitions fail due to lack of thorough due diligence (CFA Institute, 2025)"),
          t("83% des leaders en Private Equity croient que leurs pratiques actuelles de Due Diligence nécessitent des améliorations substantielles (Accenture Research)", "83% of Private Equity leaders believe their current Due Diligence practices need substantial improvements (Accenture Research)"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Solution Buildfluence : Deep Due Diligence (3 Niveaux)", "Buildfluence Solution: Deep Due Diligence (3 Levels)")}>
        <div className="mt-4 space-y-4">
          <div className="card-glass p-4">
            <h4 className="font-serif text-lg font-bold">{t("NIVEAU 1 — Integrity Check", "LEVEL 1 — Integrity Check")}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{t("Screening PEP et affiliations sensibles. Signaux faibles : sanctions, litiges. Livrable : Fiche Go/Vigilance/No-Go", "PEP screening and sensitive affiliations. Weak signals: sanctions, litigation. Deliverable: Go/Vigilance/No-Go sheet")}</p>
          </div>
          <div className="card-glass p-4">
            <h4 className="font-serif text-lg font-bold">{t("NIVEAU 2 — Strategic Risk Profiling", "LEVEL 2 — Strategic Risk Profiling")}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{t("Cartographie des parties prenantes. Analyse géopolitique. Livrable : Rapport stratégique + Scoring de risque", "Stakeholder mapping. Geopolitical analysis. Deliverable: Strategic report + Risk scoring")}</p>
          </div>
          <div className="card-glass p-4">
            <h4 className="font-serif text-lg font-bold">{t("NIVEAU 3 — Regulatory Compliance", "LEVEL 3 — Regulatory Compliance")}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{t("Décryptage des actionnariats offshore. Audit KYC, KYS, LCB-FT, ESG. Livrable : Dossier forensique complet", "Decryption of offshore shareholdings. KYC, KYS, AML-CFT, ESG audit. Deliverable: Complete forensic file")}</p>
          </div>
        </div>
      </DetailBlock>
    </DetailPageLayout>
  );
};

export default InvestirSousRisque;
