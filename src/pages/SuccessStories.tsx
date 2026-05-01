import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import logoCentraleDanone from "@/assets/clients/centrale-danone.jpg";
import logoCidc from "@/assets/clients/cidc.jpg";
import logoMinistereSante from "@/assets/clients/ministere-sante.jpg";
import logoGinger from "@/assets/clients/ginger-international.jpg";

const C = {
  paper: "#F4F1EA",
  paperDeep: "#EDE8DD",
  navy: "#0A1628",
  navySoft: "#142340",
  gold: "#C9A84C",
  goldSoft: "#D9BC6A",
  ink: "#1A1A1A",
  inkSoft: "#4A4A4A",
  inkMuted: "#7A7A7A",
};

const fontPlayfair = "'Playfair Display', serif";
const fontCormorant = "'Cormorant Garamond', serif";
const fontDM = "'DM Sans', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

type Logo = { label: string; smallItalic?: boolean; fontSize?: number; src?: string };

type Story = {
  number: string;
  sector: string;
  logos: Logo[];
  photoCircle?: string;
  visualFrame: string;
  meta: { label: string; value: string }[];
  titleBefore: string;
  titleEm: string;
  titleAfter?: string;
  storytelling: string;
  mission: string;
  objectives: string[];
  methodo: string;
  kpis: { value: string; label: string }[];
  resultsExtra?: string;
  testimony?: { text: string; authorBold: string; authorRest: string; date: string };
  tags: (string | "·")[];
};

const stories: Story[] = [
  {
    number: "01",
    sector: "Industrie agroalimentaire",
    logos: [{ label: "CENTRALE DANONE", src: logoCentraleDanone }],
    photoCircle: "SK",
    visualFrame: "[ Capture média le360 — \u201cVidéo. Rumeurs et réseaux sociaux : quand Raïbi Jamila en paie le prix fort\u201d ]",
    meta: [
      { label: "CLIENT", value: "Centrale Danone" },
      { label: "TÉMOIGNAGE", value: "Samia Kabbaj Douiri" },
      { label: "PÉRIODE", value: "2015–2017" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Trois semaines pour défaire ",
    titleEm: "deux ans",
    titleAfter: " de crise",
    storytelling:
      "Août 2015, région d'Agadir. Deux enfants meurent après avoir consommé Raïbi Jamila. Sur les réseaux sociaux, la sentence tombe en quelques heures : la marque est coupable. Pendant deux ans, une campagne de dénigrement va s'installer, vider les rayons et faire fondre 120 millions de dirhams de chiffre d'affaires. La contagion gagne les autres produits du groupe. Et personne ne sait qui orchestre l'attaque.",
    mission:
      "Identifier les origines réelles de la campagne de dénigrement, documenter l'innocence du produit, et reconstruire la confiance des consommateurs.",
    objectives: [
      "Récupérer et exploiter les pièces sanitaires officielles",
      "Cartographier les acteurs et profiler les comptes virulents",
      "Bâtir une contre-narrative documentée et activer un canal médiatique de masse",
    ],
    methodo:
      "Déploiement d'une cellule de veille et d'intelligence économique dédiée. Analyse et décryptage des attaques en réseaux sociaux. Mapping et profiling des auteurs virulents. Récupération des documents sanitaires et du rapport d'autopsie. Construction d'un dossier d'innocentement et orchestration d'un reportage exclusif sur la chaîne nationale.",
    kpis: [
      { value: "3 sem.", label: "pour juguler une crise de 2 ans" },
      { value: "100 %", label: "marque innocentée" },
      { value: "+14 %", label: "parts de marché regagnées" },
    ],
    resultsExtra: "+ Reportage exclusif de 45 minutes diffusé sur RTM",
    testimony: {
      text: "\u201cPrestataire référencé chez nous depuis 2016, M. Azeddine Yassine (Buildfluence) a réalisé avec succès des missions pour Centrale Danone. Dès le début, M. Yassine a fait preuve d'un réel professionnalisme et d'une rigueur à toute épreuve. Nous le recommandons vivement.\u201d",
      authorBold: "Samia Kabbaj Douiri",
      authorRest: ", Secrétaire Générale, Centrale Danone",
      date: "(lettre du 2 février 2020)",
    },
    tags: ["AGROALIMENTAIRE", "·", "GESTION DE CRISE", "·", "RÉHABILITATION DE MARQUE", "·", "DÉSINFORMATION", "·", "🇲🇦 MAROC"],
  },
  {
    number: "02",
    sector: "Intelligence stratégique internationale",
    logos: [{ label: "CABINET EUROPÉEN\nD'INTELLIGENCE", smallItalic: true, fontSize: 12 }],
    visualFrame: "[ Visuel boycott — hashtag كلنا_مقاطعون# / iconographie 2018 ]",
    meta: [
      { label: "CLIENT", value: "Cabinet européen d'intelligence stratégique" },
      { label: "BÉNÉFICIAIRE", value: "Intérêts économiques marocains" },
      { label: "PÉRIODE", value: "2018" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Quand un boycott n'est ",
    titleEm: "pas",
    titleAfter: " un mouvement spontané",
    storytelling:
      "Avril 2018. Une vague de boycott sans précédent frappe trois marques emblématiques au Maroc : Centrale Danone, Sidi Ali, Afriquia. En quelques jours, des millions d'interactions, des pertes business massives, une psychose nationale. L'opinion croit à un réflexe citoyen. La donnée raconte autre chose : pages anonymes coordonnées, plus de 800 bots créés un mois avant le déclenchement, sponsorisation détectée, éléments de langage répliqués. L'opération est orchestrée — reste à le prouver.",
    mission:
      "Identifier, analyser et cartographier les instigateurs d'une campagne de désinformation visant les produits de première nécessité au Maroc, pour le compte d'un cabinet européen d'intelligence stratégique de premier plan.",
    objectives: [
      "Décoder les moyens techniques (pages anonymes, bots, astroturfing, sponsoring)",
      "Tracker les éléments de langage et reconstituer le réseau opérationnel",
      "Documenter l'orchestration et identifier la signature politique sous-jacente",
    ],
    methodo:
      "Veille multicanale et OSINT approfondi sur Facebook, Twitter, YouTube. Analyse de plus de 4 000 posts originaux et 500 000 commentaires. Cartographie des comptes clés et de leurs interconnexions. Détection des bots par profilage comportemental. Tracking des éléments de langage et identification des facteurs de vulnérabilité instrumentalisés.",
    kpis: [
      { value: "800+", label: "bots identifiés et profilés" },
      { value: "3 niveaux", label: "technique, narratif, opérationnel" },
      { value: "100 %", label: "chaîne d'orchestration documentée" },
    ],
    testimony: {
      text: "\u201cPartenaire depuis 2017, nous sollicitons M. Azeddine Yassine pour réaliser des missions concernant des études socio-économiques ou géopolitiques nécessitant la collecte de données, l'analyse des tendances et des recommandations facilitant des prises de décision éclairées. À chaque fois, M. Yassine a su travailler efficacement et ponctuellement pour répondre à nos demandes. Personne rigoureuse, organisée, perfectionniste et discrète. Approche en matière de gestion de tous projets qui dépasse nos exigences.\u201d",
      authorBold: "Directeur Général",
      authorRest: ", cabinet européen d'intelligence stratégique",
      date: "(lettre du 2 mars 2020)",
    },
    tags: ["INTELLIGENCE STRATÉGIQUE", "·", "DÉSINFORMATION", "·", "CARTOGRAPHIE D'ACTEURS", "·", "OSINT", "·", "🇲🇦 MAROC"],
  },
  {
    number: "03",
    sector: "Organisation internationale",
    logos: [{ label: "CIDC · OCI", src: logoCidc }],
    visualFrame: "[ Capture Doing Business Platform + magazine TIJARIS ]",
    meta: [
      { label: "CLIENT", value: "CIDC (organe OCI)" },
      { label: "SIÈGE", value: "🇲🇦 Casablanca" },
      { label: "COUVERTURE", value: "57 États membres" },
      { label: "PÉRIODE", value: "2022–2023" },
    ],
    titleBefore: "Faire renaître une organisation ",
    titleEm: "38 ans",
    titleAfter: " après sa création",
    storytelling:
      "Trente-huit ans après sa création, le CIDC peine à exister auprès de ses 57 États membres. Faible visibilité, sollicitation marginale, organisation perçue comme dépassée par les enjeux du commerce intra-OCI. Une nouvelle Direction Générale arrive, ambitieuse : transformer le centre en plateforme d'attractivité moderne, capable de générer du business réel entre ses pays membres. Restait à concevoir l'outil.",
    mission:
      "Concevoir et développer l'architecture d'une plateforme digitale d'attractivité et d'influence pour relancer la notoriété et l'utilité opérationnelle du CIDC.",
    objectives: [
      "Diagnostiquer les missions et le positionnement du CIDC",
      "Concevoir l'architecture d'une \u201cDoing Business Platform\u201d multi-composantes",
      "Transformer le CIDC en organisation orientée intelligence économique et insight-driven",
    ],
    methodo:
      "Compréhension fine des missions du CIDC, diagnostic opérationnel et stratégique. Conception de l'architecture digitale autour de six composantes : Business Ecosystem, Carte sectorielle interactive, Country Profile, Matchmaking, Knowledge Center, Outils décisionnels. Partenariat avec une solution spécialisée Halal. Production éditoriale soutenue (Lettre de Veille + magazine TIJARIS bimensuel).",
    kpis: [
      { value: "57", label: "États membres OCI couverts" },
      { value: "6", label: "composantes digitales déployées" },
      { value: "Bimensuel", label: "magazine TIJARIS lancé" },
    ],
    resultsExtra: "+ Repositionnement du CIDC en organisation orientée Intelligence Économique et approche Insight-Driven",
    tags: ["ORGANISATION INTERNATIONALE", "·", "PLATEFORME D'ATTRACTIVITÉ", "·", "INTELLIGENCE ÉCONOMIQUE", "·", "MATCHMAKING", "·", "🇲🇦 🇸🇦 OCI"],
  },
  {
    number: "04",
    sector: "Santé publique",
    logos: [{ label: "MINISTÈRE\nDE LA SANTÉ\nROYAUME DU MAROC", fontSize: 11, src: logoMinistereSante }],
    visualFrame: "[ Crisis Dashboard : Grippe A H1N1 — courbe mentions négatives ]",
    meta: [
      { label: "CLIENT", value: "Ministère de la Santé" },
      { label: "TÉMOIGNAGE", value: "Dr Hanan Fadlallah" },
      { label: "PÉRIODE", value: "2018–2019" },
      { label: "GÉOGRAPHIE", value: "🇲🇦 Maroc" },
    ],
    titleBefore: "Stopper une psychose nationale en ",
    titleEm: "deux semaines",
    storytelling:
      "2018. Le virus H1N1 frappe le Maroc. Une quarantaine de décès. Sur les réseaux sociaux, le silence du Ministère laisse un vide immédiatement comblé : rumeurs, fake news, désinformation organisée. La psychose s'installe, l'indignation citoyenne monte, l'autorité sanitaire perd la main. Pour reprendre le récit, il faut comprendre qui le fabrique — et avec quelle intensité.",
    mission:
      "Piloter la communication de crise H1N1 et installer un dispositif de veille stratégique au sein de la Division de l'Information et de la Communication du Ministère.",
    objectives: [
      "Mesurer en temps réel la perception publique et identifier les vecteurs de désinformation",
      "Outiller la Division Communication avec un baromètre d'image et des dashboards opérationnels",
      "Former les cadres aux techniques d'intelligence économique appliquées à la santé publique",
    ],
    methodo:
      "Déploiement d'une solution de veille et d'analyse stratégique. Fact-checking des contenus diffusés sur Facebook et YouTube. Décryptage et mapping des auteurs de messages nuisibles. Production de tableaux de bord hebdomadaires (Positionnement, Gouvernement, Partis politiques, Trending Public Opinion). Campagne digitale activant cadres du Ministère et experts externes.",
    kpis: [
      { value: "2 sem.", label: "pour atténuer la crise nationale" },
      { value: "Permanente", label: "solution de veille installée" },
      { value: "Formation", label: "des cadres à l'intelligence économique" },
    ],
    testimony: {
      text: "\u201cDoté d'une vision exceptionnelle, des capacités d'analyse fine et de synthèse, les conseils de M. Azeddine Yassine étaient un appui fort pour la stratégie de communication du Ministère de la Santé. Son intervention a laissé des marques de valeurs : installation d'une solution de veille stratégique et de Data Intelligence, formation des cadres et des journalistes de la DICom, compréhension et cartographie de l'écosystème du Ministère, méthodologie d'extraction des insights de risques et prévention de crise.\u201d",
      authorBold: "Dr Hanan Fadlallah",
      authorRest: ", Cheffe de la Division de l'Information et de la Communication, Ministère de la Santé",
      date: "(lettre du 2 janvier 2020)",
    },
    tags: ["SANTÉ PUBLIQUE", "·", "COMMUNICATION DE CRISE", "·", "DATA INTELLIGENCE", "·", "FACT-CHECKING", "·", "🇲🇦 MAROC"],
  },
  {
    number: "05",
    sector: "Coopération internationale & santé",
    logos: [{ label: "GINGER INTERNATIONAL", src: logoGinger }, { label: "KFW", fontSize: 12 }],
    visualFrame: "[ Visuel sobre — établissement hospitalier de référence ]",
    meta: [
      { label: "CLIENT", value: "Ginger International (France)" },
      { label: "BÉNÉFICIAIRE", value: "Établissement hospitalier de référence" },
      { label: "BAILLEUR", value: "KFW (Banque Allemande)" },
      { label: "PÉRIODE", value: "2022–2023 · 🇲🇦 🇫🇷 🇩🇪" },
    ],
    titleBefore: "Quand l'intelligence stratégique sert ",
    titleEm: "l'attractivité hospitalière",
    storytelling:
      "2022. Un grand établissement hospitalier de référence à Casablanca fait face à un enjeu d'attractivité et de positionnement. Le bailleur allemand KFW finance une mission d'assistance technique stratégique, confiée au cabinet français Ginger International. Mission : moderniser la communication d'un acteur de santé majeur, en s'appuyant sur la Data, l'analyse et l'intelligence économique appliquées au secteur hospitalier.",
    mission:
      "Accompagner la transformation de la communication d'un grand établissement hospitalier marocain via une approche d'intelligence stratégique et de Data Influence, dans le cadre d'une mission financée par KFW.",
    objectives: [
      "Asseoir la notoriété et le positionnement de l'établissement",
      "Outiller les équipes communication avec des dispositifs d'aide à la décision basés sur l'IA",
      "Produire des audits, recommandations et feuille de route opérationnelle",
    ],
    methodo:
      "Benchmarks et analyses de situation approfondies. Déploiement d'une plateforme de données basée sur l'intelligence artificielle pour l'extraction et l'analyse de données stratégiques. Création de tableaux de bord et de rapports d'analyse pour le suivi de performance. Accompagnement opérationnel du département communication par enjeu et par cible.",
    kpis: [
      { value: "11 mois", label: "de mission menée à terme" },
      { value: "Plateforme IA", label: "déployée pour l'aide à la décision" },
      { value: "Stratégie", label: "de communication repositionnée" },
    ],
    resultsExtra: "+ Mission internationale tripartite : bailleur public allemand — cabinet français — expertise marocaine",
    tags: ["COOPÉRATION INTERNATIONALE", "·", "SANTÉ", "·", "DATA INTELLIGENCE", "·", "ATTRACTIVITÉ HOSPITALIÈRE", "·", "🇲🇦 🇫🇷 🇩🇪"],
  },
];

const SuccessStoriesPage = () => {
  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: fontDM, minHeight: "100vh" }}>
      <Navbar />

      {/* PAGE HEADER */}
      <header
        className="mx-auto"
        style={{
          maxWidth: 1200,
          padding: "120px 40px 40px",
          borderBottom: `1px solid ${C.paperDeep}`,
        }}
      >
        <div
          style={{
            fontFamily: fontMono,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: C.gold,
            marginBottom: 16,
          }}
        >
          — Pilier III · Insight & Resources / Success Stories
        </div>
        <h1
          style={{
            fontFamily: fontPlayfair,
            fontWeight: 600,
            fontSize: 48,
            color: C.navy,
            lineHeight: 1.1,
            marginBottom: 18,
            maxWidth: 800,
          }}
        >
          Là où l'<em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>intelligence</em>
          <br />
          change l'issue.
        </h1>
        <p
          style={{
            fontFamily: fontCormorant,
            fontStyle: "italic",
            fontSize: 21,
            color: C.inkSoft,
            maxWidth: 720,
            lineHeight: 1.4,
          }}
        >
          Cinq missions, cinq contextes critiques. Une méthode constante : comprendre avant d'agir, agir sans bruit, mesurer ce qui change vraiment.
        </p>
      </header>

      {/* STORIES */}
      <main className="mx-auto stories-container" style={{ maxWidth: 1200, padding: "60px 40px 120px" }}>
        {stories.map((s, idx) => (
          <article
            key={idx}
            className="story-card"
            style={{
              background: "#FAF8F2",
              border: `1px solid ${C.paperDeep}`,
              marginBottom: 60,
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              borderRadius: 0,
            }}
          >
            {/* LEFT: VISUAL */}
            <div
              className="story-visual"
              style={{
                background: C.navy,
                padding: "36px 32px",
                color: C.paper,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: fontMono,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: C.gold,
                    marginBottom: 28,
                    lineHeight: 1.5,
                  }}
                >
                  — Success Story · {s.number}
                  <br />
                  {s.sector}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 28,
                    paddingBottom: 24,
                    borderBottom: `1px solid ${C.navySoft}`,
                    flexWrap: "wrap",
                  }}
                >
                  {s.logos.map((l, i) =>
                    l.src ? (
                      <div
                        key={i}
                        style={{
                          background: C.paper,
                          padding: "8px 12px",
                          borderRadius: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 50,
                        }}
                      >
                        <img
                          src={l.src}
                          alt={l.label}
                          style={{ maxHeight: 34, maxWidth: 140, objectFit: "contain", display: "block" }}
                        />
                      </div>
                    ) : (
                      <div
                        key={i}
                        style={{
                          background: C.paper,
                          color: C.navy,
                          fontFamily: fontPlayfair,
                          fontWeight: 600,
                          fontSize: l.fontSize ?? 14,
                          padding: "10px 14px",
                          borderRadius: 0,
                          lineHeight: 1.15,
                          letterSpacing: "0.02em",
                          fontStyle: l.smallItalic ? "italic" : "normal",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {l.label}
                      </div>
                    )
                  )}
                  {s.photoCircle && (
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: C.paperDeep,
                        border: `1px solid ${C.gold}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: fontPlayfair,
                        color: C.inkSoft,
                        fontSize: 11,
                        fontStyle: "italic",
                        flexShrink: 0,
                      }}
                    >
                      {s.photoCircle}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    background: "rgba(244, 241, 234, 0.05)",
                    border: `1px solid ${C.navySoft}`,
                    padding: 24,
                    marginBottom: 24,
                    textAlign: "center",
                    color: C.inkMuted,
                    fontFamily: fontCormorant,
                    fontStyle: "italic",
                    fontSize: 13,
                    minHeight: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.visualFrame}
                </div>
              </div>

              <div
                style={{
                  fontFamily: fontMono,
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  lineHeight: 1.7,
                  borderTop: `1px solid ${C.navySoft}`,
                  paddingTop: 18,
                }}
              >
                {s.meta.map((m, i) => (
                  <div key={i} style={{ color: "rgba(244, 241, 234, 0.65)", marginBottom: 4 }}>
                    <strong style={{ color: C.gold, fontWeight: 500 }}>{m.label}</strong> — {m.value}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="story-content" style={{ padding: "40px 44px" }}>
              <h2
                className="story-title"
                style={{
                  fontFamily: fontPlayfair,
                  fontWeight: 600,
                  fontSize: 32,
                  color: C.navy,
                  lineHeight: 1.15,
                  marginBottom: 28,
                }}
              >
                {s.titleBefore}
                <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 500 }}>{s.titleEm}</em>
                {s.titleAfter}
              </h2>

              <SectionLabel>— Storytelling</SectionLabel>
              <p style={{ fontFamily: fontDM, fontSize: 15, color: C.ink, lineHeight: 1.7, marginBottom: 28 }}>
                {s.storytelling}
              </p>

              <SectionLabel>— Mission</SectionLabel>
              <div
                style={{
                  background: C.paperDeep,
                  borderLeft: `2px solid ${C.gold}`,
                  padding: "18px 22px",
                  margin: "8px 0 28px",
                  fontFamily: fontPlayfair,
                  fontStyle: "italic",
                  fontSize: 16,
                  color: C.navy,
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {s.mission}
              </div>

              <SectionLabel>— Objectifs</SectionLabel>
              <ol style={{ listStyle: "none", marginBottom: 28, paddingLeft: 0 }}>
                {s.objectives.map((o, i) => (
                  <li
                    key={i}
                    style={{
                      position: "relative",
                      paddingLeft: 38,
                      marginBottom: 10,
                      fontSize: 14.5,
                      color: C.ink,
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        fontFamily: fontMono,
                        fontSize: 11,
                        color: C.gold,
                        fontWeight: 500,
                        width: 28,
                        textAlign: "right",
                        paddingTop: 3,
                      }}
                    >
                      {toRoman(i + 1)}.
                    </span>
                    {o}
                  </li>
                ))}
              </ol>

              <SectionLabel>— Méthodologie</SectionLabel>
              <p style={{ fontFamily: fontDM, fontSize: 14.5, color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>
                {s.methodo}
              </p>

              <SectionLabel>— Résultats</SectionLabel>
              <div
                className="results-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 0,
                  background: C.navy,
                  margin: "8px 0 24px",
                }}
              >
                {s.kpis.map((k, i) => (
                  <div
                    key={i}
                    className="kpi"
                    style={{
                      padding: "24px 16px",
                      textAlign: "center",
                      borderRight: i < s.kpis.length - 1 ? `1px solid ${C.navySoft}` : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fontPlayfair,
                        fontWeight: 600,
                        fontSize: 28,
                        color: C.gold,
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {k.value}
                    </div>
                    <div
                      style={{
                        fontFamily: fontDM,
                        fontSize: 11.5,
                        color: "rgba(244, 241, 234, 0.85)",
                        lineHeight: 1.4,
                        fontWeight: 300,
                      }}
                    >
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
              {s.resultsExtra && (
                <p
                  style={{
                    fontFamily: fontCormorant,
                    fontStyle: "italic",
                    fontSize: 14,
                    color: C.inkSoft,
                    textAlign: "center",
                    marginTop: -10,
                    marginBottom: 28,
                    padding: "0 10px",
                  }}
                >
                  {s.resultsExtra}
                </p>
              )}

              {s.testimony && (
                <div
                  style={{
                    background: "#FAF8F2",
                    border: `1px solid ${C.paperDeep}`,
                    borderLeft: `3px solid ${C.gold}`,
                    padding: "22px 26px",
                    margin: "24px 0",
                  }}
                >
                  <p
                    style={{
                      fontFamily: fontCormorant,
                      fontStyle: "italic",
                      fontSize: 16,
                      color: C.inkSoft,
                      lineHeight: 1.55,
                      marginBottom: 14,
                    }}
                  >
                    {s.testimony.text}
                  </p>
                  <div style={{ fontFamily: fontDM, fontSize: 13, color: C.navy, fontWeight: 500 }}>
                    <strong style={{ fontWeight: 600 }}>{s.testimony.authorBold}</strong>
                    {s.testimony.authorRest}
                    <span
                      style={{
                        color: C.inkMuted,
                        fontStyle: "italic",
                        fontFamily: fontCormorant,
                        fontSize: 13,
                        marginLeft: 6,
                      }}
                    >
                      {s.testimony.date}
                    </span>
                  </div>
                </div>
              )}

              <div
                style={{
                  marginTop: 28,
                  paddingTop: 22,
                  borderTop: `1px solid ${C.paperDeep}`,
                  fontFamily: fontMono,
                  fontSize: 9.5,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.inkMuted,
                  lineHeight: 1.8,
                }}
              >
                {s.tags.map((t, i) =>
                  t === "·" ? (
                    <span key={i} style={{ color: C.gold, margin: "0 6px" }}>
                      ·
                    </span>
                  ) : (
                    <span key={i}>{t}</span>
                  )
                )}
              </div>
            </div>
          </article>
        ))}
      </main>

      <CTAFooter />

      {/* Responsive */}
      <style>{`
        @media (max-width: 980px) {
          .story-card { grid-template-columns: 1fr !important; }
          .story-visual { min-height: auto; }
          .story-title { font-size: 26px !important; }
          .stories-container { padding: 40px 20px 80px !important; }
          .results-grid { grid-template-columns: 1fr !important; }
          .results-grid .kpi { border-right: none !important; border-bottom: 1px solid ${C.navySoft}; }
          .results-grid .kpi:last-child { border-bottom: none; }
        }
        @media (max-width: 640px) {
          header h1 { font-size: 36px !important; }
        }
      `}</style>
    </div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: fontMono,
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: C.gold,
      marginBottom: 12,
      marginTop: 24,
    }}
  >
    {children}
  </div>
);

function toRoman(n: number): string {
  const map: Record<number, string> = { 1: "i", 2: "ii", 3: "iii", 4: "iv", 5: "v", 6: "vi", 7: "vii", 8: "viii", 9: "ix", 10: "x" };
  return map[n] ?? String(n);
}

export default SuccessStoriesPage;
