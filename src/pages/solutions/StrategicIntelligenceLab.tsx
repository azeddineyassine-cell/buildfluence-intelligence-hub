import DetailPageLayout, { DetailBlock, DetailList, CaseStudy, SectionBlock } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import ocpLogo from "@/assets/clients/ocp.png";
import ministereSanteLogo from "@/assets/clients/ministere-sante.jpg";
import imgWheel from "@/assets/sections/buildfluence-wheel.jpg";
import imgDataBubbles from "@/assets/sections/buildfluence-data-bubbles.jpg";
import imgMarketIntel from "@/assets/sections/market-competitive-intelligence.jpg";
import imgTerritorial from "@/assets/sections/attractivite-territoriale.png";
import imgInnovation from "@/assets/sections/innovation-mapping-new.jpg";
import imgStakeholders from "@/assets/sections/stakeholders-intelligence.jpg";
import imgOcpCase from "@/assets/sections/cas-client-ocp.png";
import imgOsint from "@/assets/sections/osint-fact-checking.jpg";
import imgMinistereSante from "@/assets/sections/cas-client-ministere-sante.png";

const StrategicIntelligenceLab = () => {
  const { t } = useLanguage();

  const scrollToSuccessStories = (filter: string) => {
    const section = document.getElementById("success-stories");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      // Dispatch custom event to set the filter
      window.dispatchEvent(new CustomEvent("set-success-filter", { detail: filter }));
    }
  };

  return (
    <DetailPageLayout
      title="Strategic Intelligence Lab"
      chapeau={t(
        "Le pouvoir appartient à ceux qui voient les ruptures avant qu'elles ne soient évidentes. Le Strategic Intelligence Lab transforme l'incertain en actionnable.",
        "Power belongs to those who see disruptions before they become obvious. The Strategic Intelligence Lab transforms uncertainty into actionable."
      )}
      ctas={[{ label: t("Parler de mon projet", "Discuss my project"), action: "#", formType: "f1" }]}
      situationContext="Strategic Intelligence Lab"
    >
      {/* Correction 2: Intro text + wheel image side by side */}
      <SectionBlock image={imgWheel} imageAlt="Buildfluence Wheel">
        <p className="text-sm leading-relaxed text-foreground/80">
          {t(
            "L'influence stratégique ne résulte pas de l'accumulation d'informations ou de la cacophonie médiatique, mais de la capacité à transformer des données invisibles et dispersées en leviers exploitables dans les rapports de force.",
            "Strategic influence does not result from the accumulation of information or media cacophony, but from the ability to transform invisible and dispersed data into exploitable levers in power dynamics."
          )}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {t(
            "Dans un environnement complexe, saturé et où la compétition est intense, l'avantage décisif appartient aux acteurs capables d'anticiper plutôt que de réagir.",
            "In a complex, saturated and intensely competitive environment, the decisive advantage belongs to those capable of anticipating rather than reacting."
          )}
        </p>
      </SectionBlock>

      {/* Correction 2: Data bubbles image + 3 pillars */}
      <SectionBlock image={imgDataBubbles} imageAlt="Data Intelligence" reverse>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4">
          {t(
            "Le processus élaboré par Buildfluence repose sur trois leviers complémentaires :",
            "The process developed by Buildfluence is based on three complementary levers:"
          )}
        </p>
        <ol className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-foreground/80">
            <span className="font-bold text-primary flex-shrink-0">1.</span>
            <span>{t(
              "La captation et la corrélation en continue de signaux géopolitiques, économiques, technologiques, concurrentiels, jeux d'influence et dynamiques narratives.",
              "The continuous capture and correlation of geopolitical, economic, technological, competitive signals, influence games and narrative dynamics."
            )}</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-foreground/80">
            <span className="font-bold text-primary flex-shrink-0">2.</span>
            <span>{t(
              "L'identification précoce des dynamiques susceptibles d'activer l'attractivité et la crédibilité de nos clients.",
              "The early identification of dynamics likely to activate our clients' attractiveness and credibility."
            )}</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-foreground/80">
            <span className="font-bold text-primary flex-shrink-0">3.</span>
            <span>{t("La transformation de l'information.", "The transformation of information.")}</span>
          </li>
        </ol>
      </SectionBlock>

      {/* Correction 3: Text with clickable links to Success Stories */}
      <DetailBlock title="">
        <p className="text-sm leading-relaxed text-foreground/80">
          {t(
            "Aujourd'hui, les outils de veille sont accessibles à tous. En revanche, produire une lecture intégrée, capable de renforcer la souveraineté, le positionnement et la capacité d'influence, demeure rare.",
            "Today, monitoring tools are accessible to everyone. However, producing an integrated reading, capable of strengthening sovereignty, positioning and influence capacity, remains rare."
          )}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {t("Buildfluence ne vend pas seulement un outil ou des prestations de veille. Nous accompagnons nos clients sur plusieurs enjeux majeurs d'attractivité et de compétitivité : ", "Buildfluence doesn't just sell a tool or monitoring services. We support our clients on several major attractiveness and competitiveness challenges: ")}
          <button onClick={() => scrollToSuccessStories("ecosysteme")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-medium">{t("Écosystème concurrentiel", "Competitive Ecosystem")}</button>
          {", "}
          <button onClick={() => scrollToSuccessStories("communication")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-medium">{t("Stratégie & Ingénierie de communication", "Strategy & Communication Engineering")}</button>
          {", "}
          <button onClick={() => scrollToSuccessStories("influence")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-medium">{t("Influence & Soft Power", "Influence & Soft Power")}</button>
          {", "}
          <button onClick={() => scrollToSuccessStories("diligence")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-medium">{t("Due Diligence & Investissement", "Due Diligence & Investment")}</button>
          {", "}
          <button onClick={() => scrollToSuccessStories("crise")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-medium">{t("Gestion de crise", "Crisis Management")}</button>
          {" "}
          {t("et", "and")}
          {" "}
          <button onClick={() => scrollToSuccessStories("audit")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-medium">{t("Benchmark & Études", "Benchmark & Studies")}</button>
          {"."}
        </p>
      </DetailBlock>

      <h3 className="detail-subtitle text-2xl font-bold text-primary">Strategic Foresight</h3>

      <SectionBlock
        title="Market & Competitive Intelligence"
        image={imgMarketIntel}
        imageAlt="Market & Competitive Intelligence"
      >
        <DetailList items={[
          t("Veille multicanale : marchés, concurrents, brevets, réglementaire", "Multi-channel monitoring: markets, competitors, patents, regulatory"),
          t("Mapping concurrentiel dynamique", "Dynamic competitive mapping"),
          t("Détection des tendances sectorielles", "Sector trend detection"),
          t("Identification des marchés à fort potentiel", "Identification of high-potential markets"),
          t("Études prospectives, benchmarks internationaux", "Prospective studies, international benchmarks"),
          t("Cartographie des acteurs clés : Alliés / Réfractaires / Idiots utiles", "Key stakeholder mapping: Allies / Opponents / Useful idiots"),
        ]} />
      </SectionBlock>

      <SectionBlock
        title={t("Attractivité & Compétitivité Territoriale", "Territorial Attractiveness & Competitiveness")}
        image={imgTerritorial}
        imageAlt="Attractivité & Compétitivité Territoriale"
        reverse
      >
        <DetailList items={[
          t("Guerre économique de l'investissement", "Economic investment warfare"),
          t("Benchmark pays/régions concurrentes", "Competing countries/regions benchmark"),
          t("Politiques publiques comparées", "Compared public policies"),
          t("Narratifs d'attractivité et crédibilité internationale", "Attractiveness narratives and international credibility"),
        ]} />
      </SectionBlock>

      <SectionBlock
        title="Innovation Mapping"
        image={imgInnovation}
        imageAlt="Innovation Mapping"
      >
        <DetailList items={[
          t("Cartographie des technologies émergentes et startups", "Emerging technologies and startups mapping"),
          t("Écosystèmes d'innovation (Deeptech, AI, biotech)", "Innovation ecosystems (Deeptech, AI, biotech)"),
          t("Tendances VC/CVC", "VC/CVC trends"),
          t("Opportunités d'Open Innovation et M&A stratégiques", "Open Innovation and strategic M&A opportunities"),
          t("Veille brevets (WIPO, EPO, USPTO)", "Patent monitoring (WIPO, EPO, USPTO)"),
        ]} />
      </SectionBlock>

      <SectionBlock
        title="Stakeholder Intelligence"
        image={imgStakeholders}
        imageAlt="Stakeholder Intelligence"
        reverse
      >
        <DetailList items={[
          t("Mapping des stratégies adverses et des réseaux d'influence", "Adverse strategies and influence networks mapping"),
          t("Cartographie des leaders d'opinion, investisseurs, think tanks, ONG", "Opinion leaders, investors, think tanks, NGO mapping"),
          t("Analyse des alliances et antagonismes", "Alliance and antagonism analysis"),
        ]} />
      </SectionBlock>

      <CaseStudy
        logo={ocpLogo}
        title={t("Cas client : OCP Group", "Client case: OCP Group")}
        context={t("Cartographie de l'écosystème concurrentiel. Tableau de bord décisionnel au cabinet du Président.", "Competitive ecosystem mapping. Decision-making dashboard for the President's office.")}
        intervention={[
          t("Analyse par échiquiers : Géopolitique, Concurrentiel, Sociétal", "Chessboard analysis: Geopolitical, Competitive, Societal"),
          t("Cartographie et Matrice dynamique des parties prenantes", "Dynamic stakeholder mapping and matrix"),
          t("Tableau de bord décisionnel", "Decision-making dashboard"),
        ]}
        result={t("Protection de milliards de dollars de CA.", "Protection of billions of dollars in revenue.")}
        image={imgOcpCase}
      />

      <h3 className="detail-subtitle text-2xl font-bold text-primary">Threat Intelligence</h3>

      <SectionBlock
        title="OSINT & Fact-Checking"
        image={imgOsint}
        imageAlt="OSINT & Fact-Checking"
      >
        <DetailList items={[
          t("Veille ciblée appuyée par l'IA", "AI-supported targeted monitoring"),
          t("Analyse de polarisation narrative", "Narrative polarization analysis"),
          t("Tracking des sources hostiles", "Hostile source tracking"),
          t("Stratégie de contre-influence", "Counter-influence strategy"),
        ]} />
      </SectionBlock>

      <DetailBlock title={t("Gestion de Crise", "Crisis Management")}>
        <DetailList items={[
          t("War room — Délai d'activation : 2h", "War room — Activation time: 2h"),
          t("Fact-checking en temps réel", "Real-time fact-checking"),
          t("Reconquête réputationnelle accélérée", "Accelerated reputational recovery"),
        ]} />
      </DetailBlock>

      <CaseStudy
        logo={ministereSanteLogo}
        title={t("Cas client : Ministère de la Santé", "Client case: Ministry of Health")}
        context={t("Crise H1N1, 40 décès, désinformation massive.", "H1N1 crisis, 40 deaths, massive disinformation.")}
        intervention={[
          t("Digital Investigation et Fact-checking en temps réel", "Digital investigation and real-time fact-checking"),
          t("Identification des sources de désinformation", "Identification of disinformation sources"),
          t("War room de crise", "Crisis war room"),
        ]}
        result={t("Crise atténuée en 2 semaines.", "Crisis mitigated in 2 weeks.")}
        image={imgMinistereSante}
      />

      <DetailBlock title={t("Expérimentations & POCs", "Experiments & POCs")}>
        <DetailList items={[
          t("Intégration de vos enjeux stratégiques", "Integration of your strategic challenges"),
          t("Modèles d'analyse prédictive", "Predictive analysis models"),
          t("Plateformes de détection de signaux faibles", "Weak signal detection platforms"),
          t("Livrable POC : 1 semaine", "POC deliverable: 1 week"),
          t("Baromètres d'image", "Image barometers"),
          t("Tableaux de bord décisionnels", "Decision-making dashboards"),
          "Strategic Business Reviews",
        ]} />
      </DetailBlock>
    </DetailPageLayout>
  );
};
export default StrategicIntelligenceLab;
