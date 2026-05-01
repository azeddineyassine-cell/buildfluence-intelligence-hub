import { useEffect, useRef, useState, ReactNode } from "react";
import { BarChart3, Globe, AlertTriangle, Eye, Network } from "lucide-react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import TestimonialsSection from "@/components/TestimonialsSection";

// === Palette ===
const C = {
  navy: "#0D1B2A",
  navyMid: "#1a2d44",
  navyLight: "#142235",
  navyDeep: "#08111c",
  gold: "#C9A84C",
  goldSoft: "#d4b866",
  goldDim: "#8a7537",
  goldHover: "#e0c88a",
  ivory: "#F5F1E8",
  paper: "#FAF6ED",
  rule: "#D9CFBC",
  alert: "#E06D4F",
  ink: "#111827",
  mute: "#6b7280",
};

// === Pôles ===
type Pole = {
  id: string;
  num: string;
  title: string;
  tag: string;
  icon: ReactNode;
  panelTag: string;
  lead: string;
  items: string[];
};

const polesData: Pole[] = [
  {
    id: "p1",
    num: "P/01",
    title: "Données économiques",
    tag: "Marchés · Flux · Investissements",
    icon: <BarChart3 size={22} strokeWidth={1.6} />,
    panelTag: "P/01 · MARCHÉS · FLUX · INVESTISSEMENTS",
    lead: "Capter les flux d'investissement, lire les marchés en temps réel, anticiper les ruptures sectorielles avant qu'elles ne deviennent des évidences.",
    items: [
      "Veille macro et sectorielle augmentée par l'IA",
      "Cartographie des flux d'investissement étrangers",
      "Benchmarks de compétitivité multi-pays",
      "Détection des signaux faibles d'opportunités",
      "Analyse prédictive des tendances marchés",
    ],
  },
  {
    id: "p2",
    num: "P/02",
    title: "Contexte géopolitique",
    tag: "États · Alliances · Conflits",
    icon: <Globe size={22} strokeWidth={1.6} />,
    panelTag: "P/02 · ÉTATS · ALLIANCES · CONFLITS",
    lead: "Décoder les jeux d'États, identifier les souverainetés contestées, lire les rapports de force régionaux et internationaux.",
    items: [
      "Cartographie des alliances et des dépendances",
      "Suivi des décisions souveraines et réglementaires",
      "Analyse des stratégies d'influence étatique",
      "Veille des fonds souverains et agences internationales",
      "Décryptage des tensions géo-économiques",
    ],
  },
  {
    id: "p3",
    num: "P/03",
    title: "Risques réputationnels",
    tag: "Image · Crises · Vulnérabilités",
    icon: <AlertTriangle size={22} strokeWidth={1.6} />,
    panelTag: "P/03 · IMAGE · CRISES · VULNÉRABILITÉS",
    lead: "Détecter les vulnérabilités d'image, anticiper les crises de réputation, protéger les actifs intangibles avant qu'ils ne soient attaqués.",
    items: [
      "Audit de vulnérabilités réputationnelles",
      "Monitoring des signaux faibles de crise",
      "Identification des sources hostiles",
      "Cellule War Room en moins de 2h",
      "Stratégies de contre-narratifs et reconquête d'image",
    ],
  },
  {
    id: "p4",
    num: "P/04",
    title: "Dynamiques narratives",
    tag: "Récits · Médias · Opinion",
    icon: <Eye size={22} strokeWidth={1.6} />,
    panelTag: "P/04 · RÉCITS · MÉDIAS · OPINION",
    lead: "Lire les récits qui façonnent l'opinion, identifier les amplifications coordonnées, comprendre comment se forme et se déforme la perception.",
    items: [
      "Analyse de polarisation narrative multicanale",
      "Tracking des chaînes d'amplification médiatique",
      "Détection des opérations d'influence coordonnées",
      "Veille des leaders d'opinion et relais sectoriels",
      "Production de contre-narratifs crédibles et sourcés",
    ],
  },
  {
    id: "p5",
    num: "P/05",
    title: "Jeux d'influence",
    tag: "Acteurs · Réseaux · Coalitions",
    icon: <Network size={22} strokeWidth={1.6} />,
    panelTag: "P/05 · ACTEURS · RÉSEAUX · COALITIONS",
    lead: "Cartographier les acteurs qui pèsent réellement, identifier les coalitions cachées, modéliser les jeux de pression et de contre-influence.",
    items: [
      "Mapping des stratégies adverses et réseaux d'influence",
      "Cartographie des leaders, ONG, think tanks et investisseurs",
      "Analyse des alliances, antagonismes et coalitions",
      "Identification des acteurs clés sur vos décisions",
      "Modélisation des scénarios de pression et de contre-influence",
    ],
  },
];

// === Tableau comparatif ===
type Mark = "no" | "partial" | "yes";
type Cell = { mark: Mark; note?: "1" | "2" };
type Row = { criterion: string; cells: [Cell, Cell, Cell, Cell]; bf: string };

// Ordre colonnes : Cabinets de Stratégie / Agrégateurs de Presse / Cabinets de Veille IE / Agences d'Influence
const compareRows: Row[] = [
  {
    criterion: "Mode de livraison",
    cells: [{ mark: "no" }, { mark: "partial" }, { mark: "partial" }, { mark: "no" }],
    bf: "Dispositif permanent",
  },
  {
    criterion: "Action sur le réel",
    cells: [{ mark: "no" }, { mark: "no" }, { mark: "no" }, { mark: "partial" }],
    bf: "Intelligence + Influence",
  },
  {
    criterion: "Vitesse de mise en route",
    cells: [{ mark: "no" }, { mark: "partial" }, { mark: "no" }, { mark: "no" }],
    bf: "POC en 1 semaine",
  },
  {
    criterion: "Analyse & Interprétation",
    cells: [{ mark: "yes" }, { mark: "no", note: "1" }, { mark: "partial" }, { mark: "no" }],
    bf: "Signature experte du métier",
  },
  {
    criterion: "Technologie propriétaire",
    cells: [{ mark: "no" }, { mark: "no", note: "2" }, { mark: "partial" }, { mark: "no" }],
    bf: "Stack OSINT + IA souveraine",
  },
  {
    criterion: "Posture souveraineté",
    cells: [{ mark: "no" }, { mark: "no" }, { mark: "no" }, { mark: "no" }],
    bf: "Souveraine & alignée",
  },
  {
    criterion: "Mix Intelligence + Influence",
    cells: [{ mark: "no" }, { mark: "no" }, { mark: "no" }, { mark: "no" }],
    bf: "Signature unique du métier",
  },
  {
    criterion: "Confidentialité du dispositif",
    cells: [{ mark: "partial" }, { mark: "no" }, { mark: "partial" }, { mark: "no" }],
    bf: "NDA + serveurs souverains",
  },
];

// === Composant principal ===
const PourquoiBuildfluence = () => {
  const [activePole, setActivePole] = useState<string | null>(null);
  const [panelFading, setPanelFading] = useState(false);
  const [polesVisible, setPolesVisible] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [connectorVisible, setConnectorVisible] = useState(false);
  const polesRef = useRef<HTMLDivElement>(null);

  // Observer pour la cascade des pôles
  useEffect(() => {
    const node = polesRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setPolesVisible(true);
            setTimeout(() => setConnectorVisible(true), 700);
            setTimeout(() => setResultsVisible(true), 900);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const handlePoleClick = (id: string) => {
    if (activePole === id) {
      setActivePole(null);
      return;
    }
    if (activePole && activePole !== id) {
      setPanelFading(true);
      setTimeout(() => {
        setActivePole(id);
        setPanelFading(false);
      }, 200);
    } else {
      setActivePole(id);
    }
  };

  const activePoleData = polesData.find((p) => p.id === activePole);

  return (
    <div style={{ background: C.navy, minHeight: "100vh" }}>
      <Navbar />
      <PageStyles />

      {/* ════════ SECTION 1 — HERO ════════ */}
      <section
        style={{
          minHeight: "100vh",
          background: C.navy,
          backgroundImage: `radial-gradient(800px 600px at 80% 20%, rgba(201,168,76,.10), transparent 60%), radial-gradient(700px 500px at 10% 80%, rgba(20,52,90,.45), transparent 60%)`,
          padding: "120px 0 80px",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="pwb-wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 36 }}>
            <span style={{ width: 50, height: 1, background: C.gold }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: C.gold,
                letterSpacing: ".32em",
                textTransform: "uppercase",
              }}
            >
              Pourquoi Buildfluence
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(48px, 8vw, 108px)",
              lineHeight: 0.95,
              letterSpacing: "-.025em",
              color: C.ivory,
              margin: 0,
              maxWidth: 1200,
            }}
          >
            Ce n'est pas{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: C.gold }}>un cabinet</em>.
            <br />
            C'est{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: C.gold }}>
              une nouvelle génération hybride
            </em>
            .
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.4vw, 28px)",
              lineHeight: 1.5,
              color: "rgba(245,241,232,.85)",
              borderLeft: `2px solid ${C.gold}`,
              paddingLeft: 26,
              maxWidth: 780,
              marginTop: 40,
            }}
          >
            Buildfluence construit la souveraineté décisionnelle. Un dispositif unifié qui croise
            cinq pôles d'intelligence pour produire ce qui compte vraiment :{" "}
            <span style={{ color: C.gold }}>Attractivité, Influence et Compétitivité.</span>
          </p>

          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: C.gold,
              letterSpacing: ".3em",
              textTransform: "uppercase",
              animation: "pwb-pulse 2s ease-in-out infinite",
            }}
          >
            Faire défiler ↓
          </div>
        </div>
      </section>

      {/* ════════ SECTION 2 — MOUVEMENT 1 ════════ */}
      <section
        style={{
          background: C.navyDeep,
          padding: "130px 0 110px",
          borderTop: "1px solid rgba(201,168,76,.15)",
          borderBottom: "1px solid rgba(201,168,76,.15)",
        }}
      >
        <div className="pwb-wrap">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <span style={{ width: 60, height: 1, background: C.gold, opacity: 0.5 }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: C.gold,
                  letterSpacing: ".4em",
                  textTransform: "uppercase",
                }}
              >
                · Architecture Buildfluence ·
              </span>
              <span style={{ width: 60, height: 1, background: C.gold, opacity: 0.5 }} />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(36px, 5.5vw, 60px)",
                lineHeight: 1.05,
                color: C.ivory,
                letterSpacing: "-.02em",
                margin: "0 auto 22px",
                maxWidth: 1000,
              }}
            >
              Cinq pôles. Une seule{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: C.gold }}>architecture</em>.
              <br />
              Trois résultats stratégiques.
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: 20,
                color: "rgba(245,241,232,.7)",
                maxWidth: 680,
                margin: "0 auto",
                lineHeight: 1.45,
              }}
            >
              L'équation Buildfluence : ce que d'autres séparent en silos, nous l'orchestrons sous
              un seul toit.
            </p>
          </div>

          {/* Grille des 5 pôles */}
          <div
            ref={polesRef}
            className="pwb-poles-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}
          >
            {polesData.map((p, i) => {
              const isActive = activePole === p.id;
              return (
                <div
                  key={p.id}
                  className={`pwb-pole ${polesVisible ? "appear" : ""} ${isActive ? "active" : ""}`}
                  style={{ transitionDelay: polesVisible ? `${i * 130}ms` : "0ms" }}
                  onClick={() => handlePoleClick(p.id)}
                >
                  <div className="pwb-pole-icon">{p.icon}</div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: C.gold,
                      letterSpacing: ".25em",
                      textTransform: "uppercase",
                      marginTop: 14,
                    }}
                  >
                    {p.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: C.ivory,
                      lineHeight: 1.25,
                      marginTop: 8,
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: C.goldHover,
                      marginTop: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.tag}
                  </div>
                  <div
                    className="pwb-pole-arrow"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: C.gold,
                      letterSpacing: ".15em",
                      marginTop: 16,
                    }}
                  >
                    EXPLORER →
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panneau détail */}
          <div
            className={`pwb-detail-panel ${activePole ? "open" : ""}`}
            style={{ opacity: panelFading ? 0.4 : activePole ? 1 : 0 }}
          >
            {activePoleData && (
              <>
                <div className="pwb-pd-left">
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: "rgba(245,241,232,.6)",
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      marginBottom: 14,
                    }}
                  >
                    › {activePoleData.panelTag}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 26,
                      fontWeight: 700,
                      color: C.gold,
                      letterSpacing: "-.01em",
                      lineHeight: 1.15,
                      margin: "0 0 16px",
                    }}
                  >
                    {activePoleData.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: 16,
                      lineHeight: 1.5,
                      color: "rgba(245,241,232,.85)",
                      margin: 0,
                    }}
                  >
                    {activePoleData.lead}
                  </p>
                </div>
                <div className="pwb-pd-right">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {activePoleData.items.map((it) => (
                      <li key={it} className="pwb-pd-item">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Connecteur */}
          <div
            className={`pwb-connector ${connectorVisible ? "appear" : ""}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              margin: "50px auto 0",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: C.gold,
                letterSpacing: ".3em",
                textTransform: "uppercase",
              }}
            >
              égale
            </span>
            <span
              style={{
                width: 1,
                height: 50,
                background: `linear-gradient(to bottom, transparent, ${C.gold})`,
              }}
            />
            <span style={{ color: C.gold, fontSize: 18, lineHeight: 1 }}>▾</span>
          </div>

          {/* 3 résultats */}
          <div
            className={`pwb-results-row ${resultsVisible ? "appear" : ""}`}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 30,
              flexWrap: "wrap",
              marginTop: 40,
            }}
          >
            {[
              { label: "· Résultat 01 ·", word: "Attractivité" },
              { label: "· Résultat 02 ·", word: "Influence" },
              { label: "· Résultat 03 ·", word: "Compétitivité" },
            ].map((r) => (
              <div key={r.word} className="pwb-result">
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: C.gold,
                    letterSpacing: ".3em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {r.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: 36,
                    fontWeight: 400,
                    color: C.gold,
                    lineHeight: 1,
                  }}
                >
                  {r.word}
                </div>
              </div>
            ))}
          </div>

          {/* Tagline finale */}
          <div
            style={{
              marginTop: 70,
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.2vw, 26px)",
              color: C.goldHover,
              maxWidth: 780,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.4,
            }}
          >
            <strong
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontStyle: "normal",
                fontWeight: 500,
                color: C.ivory,
              }}
            >
              Buildfluence n'est pas un cabinet de plus.
            </strong>
            <br />
            C'est la nouvelle génération hybride de l'intelligence souveraine.
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 — TABLEAU COMPARATIF ════════ */}
      <section style={{ background: "#F4F1EA", color: C.ink, padding: "120px 0 100px" }}>
        <div className="pwb-wrap">
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.gold,
              marginBottom: 16,
            }}
          >
            — Positionnement / Le Marché vs Buildfluence
          </div>

          {/* Titre */}
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 42px)",
              color: C.navy,
              lineHeight: 1.15,
              margin: "0 0 12px",
              maxWidth: 800,
            }}
          >
            Pourquoi{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: C.gold }}>
              aucun acteur
            </em>
            <br />
            ne fait ce que nous faisons.
          </h2>

          {/* Chapeau */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: 19,
              color: "#4A4A4A",
              maxWidth: 720,
              marginBottom: 48,
              lineHeight: 1.4,
            }}
          >
            Le marché de l'intelligence stratégique est saturé d'offres partielles. Études
            ponctuelles, agrégateurs, cabinets de veille, agences d'influence — chacun couvre une
            fraction du besoin. Buildfluence est conçu pour la couverture intégrale.
          </p>

          {/* Tableau */}
          <div className="pwb-table-wrap">
            <table className="pwb-compare">
              <thead>
                <tr>
                  <th>
                    <span className="col-name col-criterion">Critère</span>
                  </th>
                  <th>
                    <span className="col-name">Cabinets de Stratégie</span>
                    <span className="col-sub">type BCG, Roland Berger</span>
                  </th>
                  <th>
                    <span className="col-name">Agrégateurs de Presse</span>
                    <span className="col-sub">type Factiva, Europresse</span>
                  </th>
                  <th>
                    <span className="col-name">Cabinets de Veille / IE</span>
                    <span className="col-sub">type Kantar, Cision</span>
                  </th>
                  <th>
                    <span className="col-name">Agences d'Influence</span>
                    <span className="col-sub">type Havas, Publicis</span>
                  </th>
                  <th className="bf-header">
                    <span className="col-name">Buildfluence</span>
                    <span className="col-sub">dispositif souverain</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r) => (
                  <tr key={r.criterion}>
                    <td className="criterion">{r.criterion}</td>
                    {r.cells.map((c, i) => (
                      <td key={i}>
                        <span
                          className={`sym ${
                            c.mark === "yes"
                              ? "sym-yes"
                              : c.mark === "partial"
                              ? "sym-mid"
                              : "sym-no"
                          }`}
                        >
                          {c.mark === "yes" ? "✓" : c.mark === "partial" ? "~" : "✕"}
                        </span>
                        {c.note && <span className="note-mark">{c.note === "1" ? "¹" : "²"}</span>}
                      </td>
                    ))}
                    <td className="bf-cell">
                      <span className="bf-content">
                        <span className="bf-check">✓</span>
                        {r.bf}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Légende */}
          <div className="pwb-legend">
            <span className="pwb-legend-item">
              <span className="sym sym-yes pwb-legend-sym">✓</span> Couvert
            </span>
            <span className="pwb-legend-item">
              <span className="sym sym-mid pwb-legend-sym">~</span> Partiel
            </span>
            <span className="pwb-legend-item">
              <span className="sym sym-no pwb-legend-sym">✕</span> Non couvert
            </span>
          </div>

          {/* Notes */}
          <div className="pwb-notes">
            <div className="pwb-notes-eyebrow">— Notes de lecture</div>
            <p className="pwb-note" data-num="¹">
              <strong>Sur l'agrégation de presse —</strong> L'agrégation de presse est à
              l'intelligence économique ce que la météo est à la stratégie militaire : une entrée,
              jamais une sortie. Confondre les deux, c'est croire qu'avoir un thermomètre suffit
              pour gagner une bataille.
            </p>
            <p className="pwb-note" data-num="²">
              <strong>Sur la dépendance technologique —</strong> Les solutions d'agrégation
              dominantes opèrent en cloud américain. Pour des données stratégiques marocaines, ce
              n'est pas un détail technique : c'est une vulnérabilité structurelle.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 4 — TRACK RECORD ════════ */}
      <section
        style={{
          background: C.navy,
          color: C.ivory,
          padding: "120px 0",
          borderTop: "1px solid rgba(201,168,76,.2)",
          backgroundImage: `radial-gradient(700px 500px at 90% 10%, rgba(201,168,76,.08), transparent 60%), radial-gradient(800px 600px at 5% 90%, rgba(201,168,76,.05), transparent 60%)`,
        }}
      >
        <div className="pwb-wrap">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ width: 50, height: 1, background: C.gold, opacity: 0.6 }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: C.gold,
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                }}
              >
                Track Record · Depuis 2016
              </span>
              <span style={{ width: 50, height: 1, background: C.gold, opacity: 0.6 }} />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(36px, 5.5vw, 56px)",
                color: C.ivory,
                lineHeight: 1.1,
                margin: "0 auto 18px",
              }}
            >
              Buildfluence{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: C.gold }}>
                ne raconte pas
              </em>
              .
              <br />
              Buildfluence{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: C.gold }}>livre</em>.
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: 20,
                color: "rgba(245,241,232,.7)",
                maxWidth: 640,
                margin: "0 auto",
                lineHeight: 1.5,
              }}
            >
              Une décennie de missions stratégiques pour des institutions souveraines, des
              multinationales et des fonds d'investissement.
            </p>
          </div>

          <div className="pwb-stats" style={{ maxWidth: 1100, margin: "0 auto" }}>
            {[
              {
                num: "100",
                unit: "%",
                label: "Missions réussies",
                detail: "Toutes les missions livrées<br/>depuis la création (2016)",
              },
              {
                num: "47",
                unit: "",
                label: "Missions livrées",
                detail: "Sur 5 continents,<br/>secteurs publics et privés",
              },
              {
                num: "<1",
                unit: "sem",
                label: "Pour le POC",
                detail: "Preuve par l'action,<br/>pas par le PowerPoint",
              },
            ].map((s) => (
              <div key={s.label} className="t-stat">
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: "clamp(64px, 10vw, 108px)",
                    color: C.gold,
                    lineHeight: 0.9,
                    letterSpacing: "-.03em",
                    marginBottom: 14,
                  }}
                >
                  {s.num}
                  {s.unit && (
                    <span
                      style={{
                        fontStyle: "italic",
                        fontSize: 36,
                        color: C.goldSoft,
                        verticalAlign: "super",
                        marginLeft: 4,
                        fontWeight: 400,
                      }}
                    >
                      {s.unit}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: C.ivory,
                    letterSpacing: ".28em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "rgba(245,241,232,.6)",
                    lineHeight: 1.4,
                  }}
                  dangerouslySetInnerHTML={{ __html: s.detail }}
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 60 }}>
            <button className="pwb-cta" onClick={() => {}}>
              Voir nos Success Stories <span className="arr">→</span>
            </button>
          </div>
        </div>
      </section>

      <div style={{ background: "#fff", padding: "40px 0" }}>
        <TestimonialsSection />
      </div>

      <CTAFooter />
    </div>
  );
};

// === Styles ===
const PageStyles = () => (
  <style>{`
    .pwb-wrap {
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 40px;
      position: relative;
    }
    @media (max-width: 640px) {
      .pwb-wrap { padding: 0 24px; }
    }

    @keyframes pwb-pulse {
      0%, 100% { transform: translateY(0); opacity: .5; }
      50% { transform: translateY(6px); opacity: 1; }
    }

    /* Pôles */
    .pwb-pole {
      background: ${C.navyMid};
      border: 1px solid rgba(201,168,76,.25);
      padding: 30px 20px 26px;
      text-align: center;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity .55s cubic-bezier(.22,.9,.35,1),
                  transform .55s cubic-bezier(.22,.9,.35,1),
                  background .35s, border-color .35s, box-shadow .35s;
    }
    .pwb-pole.appear { opacity: 1; transform: translateY(0); }
    .pwb-pole::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: ${C.gold};
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s cubic-bezier(.22,.9,.35,1);
    }
    .pwb-pole:hover {
      background: ${C.navyLight};
      border-color: ${C.gold};
      transform: translateY(-6px);
    }
    .pwb-pole:hover::before, .pwb-pole.active::before { transform: scaleX(1); }
    .pwb-pole.active {
      background: ${C.navyLight};
      border-color: ${C.gold};
      box-shadow: 0 12px 30px -10px rgba(201,168,76,.3);
    }
    .pwb-pole-icon {
      width: 46px; height: 46px;
      border-radius: 50%;
      background: rgba(201,168,76,.1);
      border: 1px solid rgba(201,168,76,.3);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${C.gold};
      transition: background .3s, border-color .3s, color .3s;
    }
    .pwb-pole:hover .pwb-pole-icon, .pwb-pole.active .pwb-pole-icon {
      background: ${C.gold};
      border-color: ${C.gold};
      color: ${C.navy};
    }
    .pwb-pole-arrow { opacity: .5; transition: opacity .3s; }
    .pwb-pole:hover .pwb-pole-arrow, .pwb-pole.active .pwb-pole-arrow { opacity: 1; }

    @media (max-width: 1100px) {
      .pwb-poles-grid { grid-template-columns: repeat(3, 1fr) !important; }
    }
    @media (max-width: 640px) {
      .pwb-poles-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }

    /* Panneau détail */
    .pwb-detail-panel {
      background: rgba(13,27,42,.5);
      border: 1px solid ${C.gold};
      border-top: 3px solid ${C.gold};
      max-height: 0;
      overflow: hidden;
      padding: 0 40px;
      margin-top: 30px;
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 40px;
      transition: max-height .55s cubic-bezier(.22,.9,.35,1),
                  opacity .25s, padding .55s cubic-bezier(.22,.9,.35,1);
    }
    .pwb-detail-panel.open {
      max-height: 500px;
      padding: 34px 40px;
    }
    .pwb-pd-item {
      font-size: 13.5px;
      line-height: 1.55;
      color: rgba(245,241,232,.85);
      padding: 9px 0 9px 22px;
      border-bottom: 1px dashed rgba(201,168,76,.15);
      position: relative;
    }
    .pwb-pd-item::before {
      content: '›';
      color: ${C.gold};
      position: absolute;
      left: 0;
      font-weight: 600;
      font-size: 16px;
    }
    @media (max-width: 900px) {
      .pwb-detail-panel { grid-template-columns: 1fr; gap: 20px; }
      .pwb-detail-panel.open { max-height: 800px; }
    }

    /* Connecteur & résultats */
    .pwb-connector { opacity: 0; transition: opacity .8s; }
    .pwb-connector.appear { opacity: 1; }
    .pwb-results-row { opacity: 0; transition: opacity .8s; transition-delay: .2s; }
    .pwb-results-row.appear { opacity: 1; }
    .pwb-result {
      background: rgba(201,168,76,.08);
      border: 1px solid ${C.gold};
      padding: 30px 50px;
      min-width: 240px;
      text-align: center;
      position: relative;
    }
    .pwb-result::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background: ${C.gold};
    }
    @media (max-width: 640px) {
      .pwb-results-row { flex-direction: column; align-items: center; }
    }

    /* Tableau comparatif v3 */
    .pwb-table-wrap {
      background: #FAF8F2;
      border: 1px solid #EDE8DD;
      overflow-x: auto;
      border-radius: 2px;
    }
    .pwb-compare {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      min-width: 1000px;
    }
    .pwb-compare thead tr { background: #EDE8DD; }
    .pwb-compare thead th {
      padding: 22px 16px;
      text-align: left;
      vertical-align: top;
      border-right: 1px solid #DCD5C5;
      font-weight: 400;
    }
    .pwb-compare thead th:last-child { border-right: none; }
    .pwb-compare thead th .col-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #0A1628;
      line-height: 1.3;
      display: block;
      margin-bottom: 6px;
    }
    .pwb-compare thead th .col-sub {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 13px;
      color: #7A7A7A;
      font-weight: 400;
    }
    .pwb-compare thead th:first-child .col-name { color: #4A4A4A; }
    .pwb-compare thead th.bf-header {
      background: #0A1628;
      border-right: none;
    }
    .pwb-compare thead th.bf-header .col-name { color: ${C.gold}; }
    .pwb-compare thead th.bf-header .col-sub { color: rgba(217,188,106,0.7); }

    .pwb-compare tbody td {
      padding: 20px 16px;
      border-top: 1px solid #EDE8DD;
      border-right: 1px solid #EDE8DD;
      vertical-align: middle;
      text-align: center;
      color: #1A1A1A;
    }
    .pwb-compare tbody td:last-child { border-right: none; }
    .pwb-compare tbody td.criterion {
      font-family: 'Playfair Display', serif;
      font-weight: 500;
      font-size: 15px;
      color: #0A1628;
      text-align: left;
      background: #FAF8F2;
      width: 200px;
    }

    .sym {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
    }
    .sym-no { background: rgba(176,57,46,0.12); color: #B0392E; font-weight: 600; }
    .sym-mid { background: rgba(217,142,47,0.15); color: #C97A1F; font-size: 16px; font-weight: 700; }
    .sym-yes { background: rgba(46,125,73,0.15); color: #2E7D49; font-weight: 700; }

    .note-mark {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: ${C.gold};
      margin-left: 4px;
      vertical-align: super;
      font-weight: 500;
    }

    .pwb-compare tbody td.bf-cell {
      background: #0A1628;
      color: ${C.gold};
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 14px;
      text-align: left;
      padding: 20px 18px;
      border-right: none;
      border-top: 1px solid #142340;
      line-height: 1.4;
    }
    .pwb-compare tbody td.bf-cell .bf-content {
      display: inline-flex;
      align-items: center;
    }
    .pwb-compare tbody td.bf-cell .bf-check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${C.gold};
      color: #0A1628;
      font-size: 11px;
      font-weight: 700;
      margin-right: 10px;
      flex-shrink: 0;
    }

    /* Légende */
    .pwb-legend {
      margin-top: 24px;
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #7A7A7A;
    }
    .pwb-legend-item { display: flex; align-items: center; gap: 8px; }
    .pwb-legend-sym { width: 18px !important; height: 18px !important; font-size: 10px !important; }

    /* Notes */
    .pwb-notes {
      margin-top: 36px;
      padding-top: 28px;
      border-top: 1px solid #EDE8DD;
      max-width: 900px;
    }
    .pwb-notes-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #7A7A7A;
      margin-bottom: 18px;
    }
    .pwb-note {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 17px;
      color: #4A4A4A;
      line-height: 1.55;
      margin-bottom: 16px;
      padding-left: 24px;
      position: relative;
    }
    .pwb-note::before {
      content: attr(data-num);
      position: absolute;
      left: 0;
      top: 2px;
      font-family: 'JetBrains Mono', monospace;
      font-style: normal;
      font-size: 11px;
      font-weight: 500;
      color: ${C.gold};
    }
    .pwb-note strong {
      font-style: normal;
      color: #0A1628;
      font-weight: 600;
      font-family: 'Playfair Display', serif;
    }

    @media (max-width: 1024px) {
      .pwb-table-wrap { overflow-x: auto; }
      .pwb-compare { min-width: 1000px; }
    }

    /* Track record stats */
    .pwb-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border: 1px solid ${C.gold};
      background: ${C.navyMid};
    }
    .t-stat {
      padding: 50px 30px;
      text-align: center;
      border-right: 1px solid rgba(201,168,76,.25);
      transition: background .3s;
    }
    .t-stat:last-child { border-right: none; }
    .t-stat:hover { background: ${C.navyLight}; }
    @media (max-width: 900px) {
      .pwb-stats { grid-template-columns: 1fr; }
      .t-stat { border-right: none; border-bottom: 1px solid rgba(201,168,76,.25); }
      .t-stat:last-child { border-bottom: none; }
    }

    /* CTA button */
    .pwb-cta {
      display: inline-flex;
      align-items: center;
      gap: 14px;
      background: ${C.gold};
      color: ${C.navy};
      padding: 20px 42px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      letter-spacing: .25em;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 2px;
      border: none;
      cursor: pointer;
      transition: background .3s, transform .3s, box-shadow .3s;
    }
    .pwb-cta:hover {
      background: ${C.goldHover};
      transform: translateY(-2px);
      box-shadow: 0 14px 30px -10px rgba(201,168,76,.5);
    }
    .pwb-cta .arr { transition: transform .3s; display: inline-block; }
    .pwb-cta:hover .arr { transform: translateX(4px); }

    @media (max-width: 640px) {
      section { padding-left: 0; padding-right: 0; }
    }
  `}</style>
);

export default PourquoiBuildfluence;
