import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const InvestirSousRisque = () => (
  <DetailPageLayout
    title="Investir sous risque invisible"
    chapeau="Miser sans connaissance profonde : chaque investissement devient une loterie"
    ctas={[
      { label: "Lire le cas complet", action: "#", formType: "f1" },
      { label: "Évaluer ma situation — GRATUIT", action: "#", formType: "f2" },
    ]}
  >
    <DetailBlock title="Votre réalité">
      <DetailList items={[
        "Vous engagez des ressources importantes sur des partenaires, projets ou marchés",
        "Vous vous appuyez sur des apparences et des présentations soignées plutôt que sur des faits vérifiés",
        "Les signaux d'alerte sur la fiabilité, l'intégrité ou la stabilité financière restent hors de portée",
      ]} />
    </DetailBlock>

    <DetailBlock title="Vous risquez">
      <DetailList items={[
        "D'exposer votre organisation à des scandales, blacklist ou défaillances",
        "De subir des pertes financières par association à des acteurs toxiques et peu fiables",
        "De voir votre réputation dégradée par contamination",
        "De perdre la confiance de vos Stakeholders (actionnaires, partenaires, régulateurs)",
      ]} />
    </DetailBlock>

    <DetailBlock title="L'angle mort">
      <DetailList items={[
        "Les informations critiques sur vos cibles existent mais restent enfouies dans des sources disparates",
        "Vous investissez sans la Due Diligence systématique que tout professionnel devrait conduire",
        "Le coût de l'investigation vous semble élevé... jusqu'à ce que le coût d'une mauvaise décision vous rattrape",
      ]} />
    </DetailBlock>

    <DetailBlock title="Le coût de l'échec">
      <DetailList items={[
        "70 à 90% des fusions-acquisitions échouent par manque de due diligence approfondie (CFA Institute, 2025)",
        "83% des leaders en Private Equity croient que leurs pratiques actuelles de Due Diligence nécessitent des améliorations substantielles (Accenture Research)",
      ]} />
    </DetailBlock>

    <DetailBlock title="Solution Buildfluence : Deep Due Diligence (3 Niveaux)">
      <div className="mt-4 space-y-4">
        <div className="card-glass p-4">
          <h4 className="font-serif text-lg font-bold">NIVEAU 1 — Integrity Check</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Screening PEP et affiliations sensibles. Signaux faibles : sanctions, litiges. Livrable : Fiche Go/Vigilance/No-Go
          </p>
        </div>
        <div className="card-glass p-4">
          <h4 className="font-serif text-lg font-bold">NIVEAU 2 — Strategic Risk Profiling</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Cartographie des parties prenantes. Analyse géopolitique. Livrable : Rapport stratégique + Scoring de risque
          </p>
        </div>
        <div className="card-glass p-4">
          <h4 className="font-serif text-lg font-bold">NIVEAU 3 — Regulatory Compliance</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Décryptage des actionnariats offshore. Audit KYC, KYS, LCB-FT, ESG. Livrable : Dossier forensique complet
          </p>
        </div>
      </div>
    </DetailBlock>

    <CaseStudy
      title="Cas client : Société de Capital-Risque (confidentiel — NDA strict)"
      context="Novembre 2024, due diligence sur une société de Capital Risque valorisée à 400M$ avant partenariat."
      intervention={[
        "Deep Due Diligence 3 niveaux comprenant vérifications sur plateformes de sanctions internationales (ONU, OFAC, EU)",
      ]}
      result="Validation complète avec identification de points de vigilance. Partenariat verrouillé en toute sécurité."
    />
  </DetailPageLayout>
);

export default InvestirSousRisque;
