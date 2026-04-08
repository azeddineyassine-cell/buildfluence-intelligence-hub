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
import imgH1n1 from "@/assets/sections/h1n1-vaccines.jpg";
import imgOcpProtesters from "@/assets/sections/ocp-protesters.jpg";

const StrategicIntelligenceLab = () => {
  const { t, lang } = useLanguage();
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
      {/* Paragraphes mis en valeur */}
      <div className="rounded-lg border-l-4 px-6 py-5 space-y-4" style={{ borderColor: '#103E8C', background: 'rgba(16,62,140,0.04)' }}>
        <p className="text-sm leading-relaxed text-foreground/85">
          {lang === "fr"
            ? <>Le Strategic Intelligence Lab est le dispositif que Buildfluence a conçu pour transformer cette capacité en <strong>infrastructure décisionnelle permanente</strong>.</>
            : <>The Strategic Intelligence Lab is the system Buildfluence has designed to transform this capacity into a <strong>permanent decision-making infrastructure</strong>.</>}
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          {lang === "fr"
            ? <>Nous ne produisons pas de rapports volumineux; <strong>nous construisons des écosystèmes de décision</strong> : Des dispositifs factuels, alimentés en temps réel, capables de capter les signaux faibles, de cartographier les menaces invisibles et de <strong>traduire l'intelligence brute en leviers d'action stratégique</strong>.</>
            : <>We don't produce bulky reports; <strong>we build decision ecosystems</strong>: Factual systems, fed in real time, capable of capturing weak signals, mapping invisible threats and <strong>translating raw intelligence into strategic action levers</strong>.</>}
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          {lang === "fr"
            ? <>Aujourd'hui, <strong>les outils de veille sont accessibles à tous</strong>. En revanche, produire une lecture intégrée, un décryptage approfondi et une cartographie multidimensionnelle capables de <strong>renforcer la souveraineté, le positionnement et la capacité d'influence</strong>, demeure rare.</>
            : <>Today, <strong>monitoring tools are accessible to everyone</strong>. However, producing an integrated reading, in-depth analysis and multidimensional mapping capable of <strong>strengthening sovereignty, positioning and influence capacity</strong>, remains rare.</>}
        </p>
      </div>

      <ConstructionInfluence />

      {/* ═══ SECTION 1 : STRATEGIC FORESIGHT — fond blanc ═══ */}
      <div className="rounded-xl px-8 py-8" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '2px solid #103E8C' }}>
          <span className="text-xs font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full" style={{ background: '#103E8C', color: '#FFFFFF' }}>01</span>
          <h3 id="strategic-foresight" className="text-xl font-bold scroll-mt-24" style={{ color: '#103E8C' }}>Strategic Foresight</h3>
        </div>

        <div className="space-y-8">
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
            image={imgOcpProtesters}
            imageCaption={t("Agitation des idiots utiles manipulés par les ONG de l'Europe du Nord", "Agitation of useful idiots manipulated by Northern European NGOs")}
            image2={imgOcpCase}
          />
        </div>
      </div>

      {/* ═══ SECTION 2 : THREAT INTELLIGENCE — fond bleu très léger ═══ */}
      <div className="rounded-xl px-8 py-8" style={{ background: '#F0F4FB', border: '1px solid #D0DCF0' }}>
        <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '2px solid #103E8C' }}>
          <span className="text-xs font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full" style={{ background: '#103E8C', color: '#FFFFFF' }}>02</span>
          <h3 id="threat-intelligence" className="text-xl font-bold scroll-mt-24" style={{ color: '#103E8C' }}>Threat Intelligence</h3>
        </div>

        <div className="space-y-8">
          <SectionBlock
            title="OSINT & Fact-Checking"
            image={imgOsint}
            imageAlt="OSINT & Fact-Checking"
            reverse
          >
            <p className="text-sm leading-relaxed text-foreground/80 mb-4">
              {t(
                "Dans un environnement saturé de narratifs concurrents, savoir qui parle, depuis où, avec quels relais et quels objectifs est devenu un avantage décisif. Notre dispositif OSINT transforme les signaux numériques en intelligence opérationnelle.",
                "In an environment saturated with competing narratives, knowing who speaks, from where, with what relays and what objectives has become a decisive advantage. Our OSINT system transforms digital signals into operational intelligence."
              )}
            </p>
            <DetailList items={[
              t("Veille multicanale augmentée par l'IA : presse, réseaux sociaux, dark web, forums spécialisés", "AI-augmented multi-channel monitoring: press, social networks, dark web, specialized forums"),
              t("Identification et cartographie des sources hostiles, trolls et comptes coordonnés", "Identification and mapping of hostile sources, trolls and coordinated accounts"),
              t("Analyse de polarisation narrative et détection des campagnes de désinformation", "Narrative polarization analysis and disinformation campaign detection"),
              t("Fact-checking en temps réel avec traçabilité des sources primaires", "Real-time fact-checking with primary source traceability"),
              t("Tracking des influenceurs et relais d'amplification (organique vs coordonné)", "Tracking of influencers and amplification relays (organic vs coordinated)"),
              t("Analyse sémantique et détection des signaux faibles précurseurs de crise", "Semantic analysis and detection of weak pre-crisis signals"),
              t("Stratégie de contre-influence : production de contre-narratifs et plan de réponse", "Counter-influence strategy: counter-narrative production and response plan"),
              t("Rapports d'intelligence périodiques pour les décideurs", "Periodic intelligence reports for decision-makers"),
            ]} />
          </SectionBlock>

          <DetailBlock title={t("Gestion de Crise", "Crisis Management")} className="[&_.detail-subtitle]:text-primary [&_.detail-subtitle]:text-xl [&_.detail-subtitle]:font-bold">
            <p className="text-sm leading-relaxed text-foreground/80 mb-4">
              {t(
                "Une crise mal gérée peut détruire en 48h ce qui a été construit en 20 ans. Buildfluence intervient en mode War Room pour neutraliser la menace, reprendre le contrôle du récit et protéger l'image de vos dirigeants et de vos institutions.",
                "A poorly managed crisis can destroy in 48h what was built over 20 years. Buildfluence intervenes in War Room mode to neutralize the threat, regain control of the narrative and protect the image of your leaders and institutions."
              )}
            </p>
            <DetailList items={[
              t("Activation War Room en moins de 2h — cellule de crise opérationnelle immédiate", "War Room activation in under 2h — immediate operational crisis unit"),
              t("Veille et monitoring en temps réel des flux médiatiques, sociaux et numériques", "Real-time monitoring of media, social and digital flows"),
              t("Digital Investigation & OSINT : identification des sources hostiles et des relais de désinformation", "Digital Investigation & OSINT: identification of hostile sources and disinformation relays"),
              t("Fact-checking en continu et production de contre-narratifs crédibles", "Continuous fact-checking and production of credible counter-narratives"),
              t("Stratégie de communication de crise : messages clés, porte-paroles, calendrier de prise de parole", "Crisis communication strategy: key messages, spokespersons, speaking schedule"),
              t("Accompagnement des équipes dirigeantes et des cabinets sous pression médiatique", "Support for leadership teams and offices under media pressure"),
              t("Reconquête réputationnelle accélérée post-crise", "Accelerated post-crisis reputational recovery"),
              t("Rapport de sortie de crise et plan de résilience long terme", "Crisis exit report and long-term resilience plan"),
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
            image={imgH1n1}
            image2={imgMinistereSante}
          />
        </div>
      </div>

      {/* ═══ SECTION 3 : EXPÉRIMENTATIONS & POCs — fond blanc ═══ */}
      <div className="rounded-xl px-8 py-8" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '2px solid #103E8C' }}>
          <span className="text-xs font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full" style={{ background: '#103E8C', color: '#FFFFFF' }}>03</span>
          <h3 id="experimentations-pocs" className="text-xl font-bold scroll-mt-24" style={{ color: '#103E8C' }}>{t("Expérimentations & POCs", "Experiments & POCs")}</h3>
        </div>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4">
          {t(
            "Avant de déployer une infrastructure décisionnelle complète, Buildfluence propose des phases d'expérimentation ciblées. En 1 semaine, nous prouvons la valeur de nos outils sur vos données réelles, avec des livrables concrets et mesurables.",
            "Before deploying a complete decision-making infrastructure, Buildfluence offers targeted experimentation phases. In 1 week, we prove the value of our tools on your real data, with concrete and measurable deliverables."
          )}
        </p>
        <DetailList items={[
          t("Intégration de vos enjeux stratégiques", "Integration of your strategic challenges"),
          t("Audit de maturité décisionnelle (diagnostic initial)", "Decision maturity audit (initial diagnosis)"),
          t("Modèles d'analyse prédictive sur données client", "Predictive analysis models on client data"),
          t("Plateformes de détection de signaux faibles (POC live)", "Weak signal detection platforms (live POC)"),
          t("Baromètres d'image et de réputation en temps réel", "Real-time image and reputation barometers"),
          t("Tableaux de bord décisionnels interactifs", "Interactive decision-making dashboards"),
          t("Strategic Business Reviews avec recommandations actionnables", "Strategic Business Reviews with actionable recommendations"),
          t("Livrable garanti en 1 semaine", "Deliverable guaranteed in 1 week"),
        ]} />
        <div className="mt-6 rounded-lg p-4 text-center" style={{ background: 'rgba(16,62,140,0.06)', borderLeft: '4px solid #103E8C' }}>
          <p className="text-sm font-semibold italic text-foreground/85">
            {t("« Un POC Buildfluence, c'est la preuve par l'action. Zéro théorie, 100% opérationnel. »", "\"A Buildfluence POC is proof by action. Zero theory, 100% operational.\"")}
          </p>
        </div>
      </div>
    </DetailPageLayout>
  );
};
export default StrategicIntelligenceLab;
