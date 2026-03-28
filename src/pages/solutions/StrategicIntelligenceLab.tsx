import { useEffect } from "react";
import DetailPageLayout, { DetailBlock, DetailList, CaseStudy, SectionBlock } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

import ConstructionInfluence from "@/components/ConstructionInfluence";
import ocpLogo from "@/assets/clients/ocp.png";
import ministereSanteLogo from "@/assets/clients/ministere-sante.jpg";
import imgMarketIntel from "@/assets/sections/market-competitive-intelligence.jpg";
import imgTerritorial from "@/assets/sections/attractivite-territoriale.png";
import imgInnovation from "@/assets/sections/innovation-mapping-new.jpg";
import imgStakeholders from "@/assets/sections/stakeholders-intelligence.jpg";
import imgOcpCase from "@/assets/sections/cas-client-ocp.png";
import imgOsint from "@/assets/sections/osint-fact-checking.jpg";
import imgMinistereSante from "@/assets/sections/cas-client-ministere-sante.png";

const StrategicIntelligenceLab = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.hash]);

  const scrollToSuccessStories = (filter: string) => {
    // Store filter in sessionStorage so Index page can pick it up
    sessionStorage.setItem("success-stories-filter", filter);
    navigate("/#success-stories");
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
      <ConstructionInfluence />

      {/* Paragraphes mis en valeur */}
      <div className="rounded-lg border-l-4 px-6 py-5 space-y-4" style={{ borderColor: '#103E8C', background: 'rgba(16,62,140,0.04)' }}>
        <p className="text-sm leading-relaxed text-foreground/85">
          {t(
            "Aujourd'hui, les outils de veille sont accessibles à tous. En revanche, produire une lecture intégrée, capable de renforcer la souveraineté, le positionnement et la capacité d'influence, demeure rare.",
            "Today, monitoring tools are accessible to everyone. However, producing an integrated reading, capable of strengthening sovereignty, positioning and influence capacity, remains rare."
          )}
        </p>

        <p className="text-sm leading-relaxed text-foreground/85">
          {t("Buildfluence ne vend pas seulement un outil ou des prestations de veille. Nous accompagnons nos clients sur plusieurs enjeux majeurs d'attractivité et de compétitivité : ", "Buildfluence doesn't just sell a tool or monitoring services. We support our clients on several major attractiveness and competitiveness challenges: ")}
          <button onClick={() => scrollToSuccessStories("ecosysteme")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-semibold">{t("Écosystème concurrentiel", "Competitive Ecosystem")}</button>
          {", "}
          <button onClick={() => scrollToSuccessStories("communication")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-semibold">{t("Stratégie & Ingénierie de communication", "Strategy & Communication Engineering")}</button>
          {", "}
          <button onClick={() => scrollToSuccessStories("influence")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-semibold">{t("Influence & Soft Power", "Influence & Soft Power")}</button>
          {", "}
          <button onClick={() => scrollToSuccessStories("diligence")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-semibold">{t("Due Diligence & Investissement", "Due Diligence & Investment")}</button>
          {", "}
          <button onClick={() => scrollToSuccessStories("crise")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-semibold">{t("Gestion de crise", "Crisis Management")}</button>
          {" "}{t("et", "and")}{" "}
          <button onClick={() => scrollToSuccessStories("audit")} className="underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors text-foreground/90 font-semibold">{t("Benchmark & Études", "Benchmark & Studies")}</button>
          {"."}
        </p>
      </div>

      <h3 id="strategic-foresight" className="detail-subtitle text-2xl font-bold text-primary scroll-mt-24">Strategic Foresight</h3>

      <SectionBlock title="Market & Competitive Intelligence" image={imgMarketIntel} imageAlt="Market & Competitive Intelligence">
        <DetailList items={[
          t("Veille multicanale : marchés, concurrents, brevets, réglementaire", "Multi-channel monitoring: markets, competitors, patents, regulatory"),
          t("Mapping concurrentiel dynamique", "Dynamic competitive mapping"),
          t("Détection des tendances sectorielles", "Sector trend detection"),
          t("Identification des marchés à fort potentiel", "Identification of high-potential markets"),
          t("Études prospectives, benchmarks internationaux", "Prospective studies, international benchmarks"),
          t("Cartographie des acteurs clés : Alliés / Réfractaires / Idiots utiles", "Key stakeholder mapping: Allies / Opponents / Useful idiots"),
        ]} />
      </SectionBlock>

      <SectionBlock title={t("Attractivité & Compétitivité Territoriale", "Territorial Attractiveness & Competitiveness")} image={imgTerritorial} imageAlt="Attractivité & Compétitivité Territoriale" reverse>
        <DetailList items={[
          t("Guerre économique de l'investissement", "Economic investment warfare"),
          t("Benchmark pays/régions concurrentes", "Competing countries/regions benchmark"),
          t("Politiques publiques comparées", "Compared public policies"),
          t("Narratifs d'attractivité et crédibilité internationale", "Attractiveness narratives and international credibility"),
        ]} />
      </SectionBlock>

      <SectionBlock title="Innovation Mapping" image={imgInnovation} imageAlt="Innovation Mapping">
        <DetailList items={[
          t("Cartographie des technologies émergentes et startups", "Emerging technologies and startups mapping"),
          t("Écosystèmes d'innovation (Deeptech, AI, biotech)", "Innovation ecosystems (Deeptech, AI, biotech)"),
          t("Tendances VC/CVC", "VC/CVC trends"),
          t("Opportunités d'Open Innovation et M&A stratégiques", "Open Innovation and strategic M&A opportunities"),
          t("Veille brevets (WIPO, EPO, USPTO)", "Patent monitoring (WIPO, EPO, USPTO)"),
        ]} />
      </SectionBlock>

      <SectionBlock title="Stakeholder Intelligence" image={imgStakeholders} imageAlt="Stakeholder Intelligence" reverse>
        <DetailList items={[
          t("Mapping des stratégies adverses et des réseaux d'influence cachés", "Mapping of adverse strategies and hidden influence networks"),
          t("Cartographie des leaders d'opinion, investisseurs, think tanks, ONG et relais médiatiques", "Mapping of opinion leaders, investors, think tanks, NGOs and media relays"),
          t("Analyse des alliances, antagonismes et dynamiques de coalition", "Analysis of alliances, antagonisms and coalition dynamics"),
          t("Identification des acteurs clés susceptibles de peser sur vos décisions stratégiques", "Identification of key players likely to influence your strategic decisions"),
          t("Modélisation des scénarios de pression et de contre-influence", "Modeling of pressure and counter-influence scenarios"),
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
        result={t(
          "Actions de sensibilisation et de contre-influence auprès des clients et partenaires. Maîtrise des menaces sociétales.",
          "Awareness and counter-influence actions with clients and partners. Control of societal threats."
        )}
        image={imgOcpCase}
      />

      <h3 id="threat-intelligence" className="detail-subtitle text-2xl font-bold text-primary scroll-mt-24">Threat Intelligence</h3>

      <SectionBlock title="OSINT & Fact-Checking" image={imgOsint} imageAlt="OSINT & Fact-Checking">
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
        result={t(
          "Crise maîtrisée en 2 semaines. Renforcement de l'image digitale du Ministre. Accompagnement de l'équipe de communication et du Cabinet Ministériel.",
          "Crisis controlled in 2 weeks. Strengthening of the Minister's digital image. Support for the communication team and Ministerial Cabinet."
        )}
        image={imgMinistereSante}
      />

      <DetailBlock id="experimentations-pocs" title={t("Expérimentations & POCs", "Experiments & POCs")} className="scroll-mt-24">
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
