import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";

const CompetitiveVelocityEngine = () => {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const data: Record<string, { sub: string; title: string; list: string[] }> = {
    geo: {
      sub: "Captation & Analyse",
      title: "Conflits Géopolitiques",
      list: [
        "Surveillance des tensions régionales",
        "Détection des ruptures avant médiatisation",
        "Analyse d'impact marchés stratégiques",
        "Cartographie influence diplomatique",
        "Anticipation décisions réglementaires",
      ],
    },
    eco: {
      sub: "Flux & Compétitivité",
      title: "Market Intelligence",
      list: [
        "Suivi des flux d'IDE et capitaux",
        "Analyse positions concurrentielles",
        "Détection opportunités haut levier",
        "Benchmarking attractivité international",
        "Scoring de compétitivité dynamique",
      ],
    },
    tech: {
      sub: "Innovation & Disruption",
      title: "Signaux Technologiques",
      list: [
        "Veille brevets et publications",
        "Détection disruptions émergentes",
        "Cartographie acteurs innovation",
        "Analyse impact rapports de force",
        "Partenariats technologiques clés",
      ],
    },
    sce: {
      sub: "Projection & Anticipation",
      title: "Scénarios Anticipés",
      list: [
        "Modélisation 3, 6 et 12 mois",
        "Projection mouvements concurrentiels",
        "Simulation ruptures géopolitiques",
        "Identification fenêtres opportunité",
        "Plans de contingence stratégiques",
      ],
    },
    sys: {
      sub: "Cartographie & Rapports",
      title: "Écosystème Modélisé",
      list: [
        "Mapping évolutif des acteurs",
        "Visualisation flux et rapports force",
        "Cartographie alliances et oppositions",
        "Identification nœuds d'amplification",
        "Mise à jour selon signaux captés",
      ],
    },
    dec: {
      sub: "Output & Action",
      title: "Décision Accélérée",
      list: [
        "Hiérarchisation Go/No-Go/Timing",
        "Réduction incertitude décisionnelle",
        "Logique d'action vs Description",
        "Livrables : Fiches, Dashboards",
        "Briefings C-Level en temps réel",
      ],
    },
  };

  return (
    <DetailPageLayout>
      <div
        style={{
          width: "100%",
          background: "#F0F7FF",
          minHeight: "100vh",
          fontFamily: "'Inter', sans-serif",
          color: "#0D1B2A",
          paddingBottom: 100,
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", padding: "60px 20px 40px" }}>
          <div style={{ color: "#C9A84C", fontSize: 10, fontWeight: 900, letterSpacing: 4, marginBottom: 10 }}>
            MÉTHODOLOGIE EXCLUSIVE
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 900,
              color: "#0D1B2A",
              margin: 0,
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
            }}
          >
            COMPETITIVE <span style={{ color: "#C9A84C" }}>VELOCITY</span> ENGINE
          </h1>
          <p
            style={{
              color: "#8899aa",
              fontSize: 16,
              marginTop: 15,
              fontStyle: "italic",
              maxWidth: 700,
              margin: "15px auto 0",
            }}
          >
            Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des
            environnements concurrentiels et hyper-complexes.
          </p>
        </div>

        {/* INTERACTIVE ENGINE */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: 30,
              background: "#fff",
              padding: 40,
              borderRadius: 20,
              border: "1px solid #e1e8ef",
              boxShadow: "0 10px 30px rgba(13,27,42,0.05)",
            }}
          >
            {/* SVG WHEEL (PARTAGÉE EN 6) */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <svg viewBox="0 0 500 500" style={{ width: "100%", maxWidth: 450 }}>
                {/* Geopolitics */}
                <g onClick={() => setActiveSector("geo")} style={{ cursor: "pointer" }}>
                  <path
                    d="M250,250 L250,50 A200,200 0 0,1 423,150 Z"
                    fill={activeSector === "geo" ? "#C9A84C" : "#1B3E6A"}
                    stroke="#FFF"
                    strokeWidth="3"
                  />
                  <text x="330" y="115" fill="white" fontSize="22" textAnchor="middle">
                    🌍
                  </text>
                  <text x="330" y="140" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
                    GÉOPOLITIQUE
                  </text>
                </g>
                {/* Market Intel */}
                <g onClick={() => setActiveSector("eco")} style={{ cursor: "pointer" }}>
                  <path
                    d="M250,250 L423,150 A200,200 0 0,1 423,350 Z"
                    fill={activeSector === "eco" ? "#C9A84C" : "#1B3E6A"}
                    stroke="#FFF"
                    strokeWidth="3"
                  />
                  <text x="400" y="240" fill="white" fontSize="22" textAnchor="middle">
                    📊
                  </text>
                  <text x="400" y="265" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
                    MARKET INTEL
                  </text>
                </g>
                {/* Technology */}
                <g onClick={() => setActiveSector("tech")} style={{ cursor: "pointer" }}>
                  <path
                    d="M250,250 L423,350 A200,200 0 0,1 250,450 Z"
                    fill={activeSector === "tech" ? "#C9A84C" : "#1B3E6A"}
                    stroke="#FFF"
                    strokeWidth="3"
                  />
                  <text x="330" y="375" fill="white" fontSize="22" textAnchor="middle">
                    💡
                  </text>
                  <text x="330" y="400" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
                    TECHNOLOGIE
                  </text>
                </g>
                {/* Scenarios */}
                <g onClick={() => setActiveSector("sce")} style={{ cursor: "pointer" }}>
                  <path
                    d="M250,250 L250,450 A200,200 0 0,1 77,350 Z"
                    fill={activeSector === "sce" ? "#C9A84C" : "#1B3E6A"}
                    stroke="#FFF"
                    strokeWidth="3"
                  />
                  <text x="170" y="375" fill="white" fontSize="22" textAnchor="middle">
                    🔮
                  </text>
                  <text x="170" y="400" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
                    SCÉNARIOS
                  </text>
                </g>
                {/* Ecosystem */}
                <g onClick={() => setActiveSector("sys")} style={{ cursor: "pointer" }}>
                  <path
                    d="M250,250 L77,350 A200,200 0 0,1 77,150 Z"
                    fill={activeSector === "sys" ? "#C9A84C" : "#1B3E6A"}
                    stroke="#FFF"
                    strokeWidth="3"
                  />
                  <text x="110" y="240" fill="white" fontSize="22" textAnchor="middle">
                    🗺️
                  </text>
                  <text x="110" y="265" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
                    ÉCOSYSTÈME
                  </text>
                </g>
                {/* Decision */}
                <g onClick={() => setActiveSector("dec")} style={{ cursor: "pointer" }}>
                  <path
                    d="M250,250 L77,150 A200,200 0 0,1 250,50 Z"
                    fill={activeSector === "dec" ? "#C9A84C" : "#1B3E6A"}
                    stroke="#FFF"
                    strokeWidth="3"
                  />
                  <text x="170" y="115" fill="white" fontSize="22" textAnchor="middle">
                    ⚡
                  </text>
                  <text x="170" y="140" fill="white" fontSize="9" fontWeight="800" textAnchor="middle">
                    DÉCISION
                  </text>
                </g>
                {/* Center Circle */}
                <circle
                  cx="250"
                  cy="250"
                  r="75"
                  fill="white"
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  onClick={() => setActiveSector(null)}
                />
                <image href="/logo.png" x="190" y="220" height="60" width="120" />
              </svg>
            </div>

            {/* DETAIL PANEL */}
            <div
              style={{
                background: "#F8FAFC",
                p: 30,
                borderRadius: 16,
                borderLeft: "6px solid #C9A84C",
                display: "flex",
                flexDirection: "column",
                justifyCenter: "center",
                minHeight: 400,
              }}
            >
              {activeSector ? (
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#C9A84C",
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      marginBottom: 8,
                    }}
                  >
                    {data[activeSector].sub}
                  </div>
                  <h2
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#1B3E6A",
                      margin: "0 0 20px 0",
                      fontFamily: "'Segoe UI', sans-serif",
                    }}
                  >
                    {data[activeSector].title}
                  </h2>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {data[activeSector].list.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 14,
                          color: "#556677",
                          padding: "8px 0",
                          display: "flex",
                          gap: 12,
                          borderBottom: "1px solid #e1e8ef",
                        }}
                      >
                        <span style={{ color: "#C9A84C", fontWeight: 900 }}>→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#8899aa" }}>
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#1B3E6A",
                      marginBottom: 15,
                      fontFamily: "'Segoe UI', sans-serif",
                    }}
                  >
                    Activez le Moteur
                  </h2>
                  <p style={{ fontSize: 14, fontStyle: "italic" }}>
                    Cliquez sur un secteur du cercle pour explorer notre méthodologie.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA FINAL (Réactivé) */}
        <div
          style={{
            position: "fixed",
            bottom: 40,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            padding: "0 20px",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(201,168,76,.3)",
              borderRadius: 16,
              padding: "20px 30px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              maxWidth: 800,
              width: "100%",
            }}
          >
            <div style={{ fontSize: 24 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1B2A" }}>
                Activez votre <span style={{ color: "#C9A84C" }}>Competitive Velocity Engine</span>
              </div>
              <div style={{ fontSize: 11, color: "#8899aa" }}>Stratégie & Influence • Accompagnement sur-mesure</div>
            </div>
            <button
              onClick={() => (window.location.href = "#contact")}
              style={{
                background: "#1B3E6A",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: 8,
                fontWeight: 800,
                fontSize: 11,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              ÉCHANGE STRATÉGIQUE →
            </button>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
};

export default CompetitiveVelocityEngine;
