import { useState } from "react";

const StrategicWorkflow = () => {
  const [activeSector, setActiveSector] = useState<string>("geo");

  const sectors = {
    geo: {
      title: "Conflits Géopolitiques",
      list: [
        "Surveillance des tensions régionales et alliances émergentes",
        "Détection des ruptures géopolitiques avant médiatisation",
        "Analyse de l'impact sur vos marchés stratégiques",
        "Cartographie des acteurs d'influence politique",
        "Anticipation des décisions réglementaires",
      ],
    },
    eco: {
      title: "Économie & Marchés",
      list: [
        "Analyse des flux financiers mondiaux",
        "Veille concurrentielle sectorielle",
        "Étude des barrières à l'entrée",
        "Scoring d'attractivité des zones",
        "Anticipation des cycles économiques",
      ],
    },
    tech: {
      title: "Technologie & Innovation",
      list: [
        "Veille brevets et R&D",
        "Identification des technologies de rupture",
        "Analyse de maturité technologique",
        "Benchmarking des solutions IA",
        "Cartographie des écosystèmes tech",
      ],
    },
    sce: {
      title: "Scénarios Anticipés",
      list: [
        "Modélisation prospective",
        "War-gaming stratégique",
        "Analyse d'impact multicritères",
        "Définition de plans de contingence",
        "Signaux faibles et alertes précoces",
      ],
    },
    sys: {
      title: "Écosystème & Mapping",
      title_display: "ÉCOSYSTÈME",
      list: [
        "Visualisation des réseaux d'influence",
        "Cartographie des parties prenantes",
        "Analyse des liens de dépendance",
        "Suivi des flux informationnels",
        "Identification des nœuds de pouvoir",
      ],
    },
    dec: {
      title: "Décision Stratégique",
      title_display: "DÉCISION",
      list: [
        "Arbitrage Go/No-Go",
        "Optimisation du timing d'action",
        "Réduction de l'incertitude décisionnelle",
        "Briefing stratégique C-Level",
        "Livrables actionnables en temps réel",
      ],
    },
  };

  const angleStep = 360 / 6;

  return (
    <div
      style={{
        width: "100%",
        background: "#F0F7FF",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
      }}
    >
      {/* HEADER SECTION */}
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ color: "#C9A84C", fontSize: 10, fontWeight: 900, letterSpacing: 4, marginBottom: 10 }}>
          STRATEGIC INNOVATION
        </div>
        <h1 style={{ fontSize: "3.2rem", fontWeight: 900, color: "#0D1B2A", margin: 0 }}>
          Competitive <span style={{ color: "#C9A84C" }}>Velocity</span> Engine
        </h1>
        <p style={{ color: "#8899aa", fontSize: 16, marginTop: 15, maxWidth: 800, margin: "15px auto 0" }}>
          Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des
          environnements concurrentiels et hyper-complexes.
        </p>
      </div>

      {/* CORE INTERACTIVE SECTION */}
      <div
        style={{
          maxWidth: 1250,
          margin: "0 auto 60px",
          padding: "40px",
          background: "#fff",
          borderRadius: 30,
          boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* WHEEL */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg viewBox="0 0 500 500" style={{ width: "100%", maxWidth: 450 }}>
            {Object.keys(sectors).map((key, i) => {
              const startAngle = i * angleStep - 90;
              const endAngle = (i + 1) * angleStep - 90;
              const x1 = 250 + 200 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 250 + 200 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 250 + 200 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 250 + 200 * Math.sin((Math.PI * endAngle) / 180);
              return (
                <g key={key} onClick={() => setActiveSector(key)} style={{ cursor: "pointer" }}>
                  <path
                    d={`M250,250 L${x1},${y1} A200,200 0 0,1 ${x2},${y2} Z`}
                    fill={activeSector === key ? "#C9A84C" : "#1B3E6A"}
                    stroke="#FFF"
                    strokeWidth="4"
                  />
                </g>
              );
            })}
            <circle cx="250" cy="250" r="75" fill="#FFF" stroke="#F1F5F9" />
            <text
              x="250"
              y="255"
              textAnchor="middle"
              fill="#0D1B2A"
              fontSize="10"
              fontWeight="900"
              style={{ letterSpacing: 1 }}
            >
              BUILDFLUENCE
            </text>
          </svg>
        </div>

        {/* DETAIL PANEL */}
        <div
          style={{
            padding: "30px",
            borderLeft: "6px solid #C9A84C",
            background: "#F8FAFC",
            borderRadius: "0 20px 20px 0",
            minHeight: 400,
          }}
        >
          <div style={{ color: "#C9A84C", fontSize: 11, fontWeight: 900, letterSpacing: 2, marginBottom: 10 }}>
            DISPOSITIF STRATÉGIQUE
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#1B3E6A", marginBottom: 30 }}>
            {sectors[activeSector].title}
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {sectors[activeSector].list.map((item, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: 15,
                  color: "#475569",
                  padding: "12px 0",
                  borderBottom: "1px solid #e2e8f0",
                  display: "flex",
                  gap: 15,
                }}
              >
                <span style={{ color: "#C9A84C", fontWeight: "bold" }}>→</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* LOWER GRID CARDS */}
      <div
        style={{
          maxWidth: 1250,
          margin: "0 auto 100px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 25,
          padding: "0 20px",
        }}
      >
        {[
          {
            title: "C'est plus qu'une étude",
            desc: "Des écosystèmes de décision construits sur mesure, pas des rapports statiques livrés et oubliés",
          },
          {
            title: "C'est plus qu'un benchmark",
            desc: "Une lecture des stratégies implicites que les données seules ne révèlent jamais",
          },
          {
            title: "C'est un moteur décisionnel",
            desc: "Conçu pour inverser les rapports de force en votre faveur, avant que vos concurrents ne s'en aperçoivent",
            button: true,
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: i === 2 ? "#1B3E6A" : "#1B3E6Aee",
              padding: 40,
              borderRadius: 20,
              textAlign: "center",
              color: "#fff",
            }}
          >
            <div style={{ color: "#C9A84C", fontSize: 20, fontWeight: 800, marginBottom: 20 }}>{card.title}</div>
            <p style={{ fontSize: 14, lineHeight: "1.6", color: "#cbd5e1", marginBottom: card.button ? 25 : 0 }}>
              {card.desc}
            </p>
            {card.button && (
              <button
                style={{
                  background: "#C9A84C",
                  border: "none",
                  color: "#0D1B2A",
                  padding: "10px 20px",
                  borderRadius: 20,
                  fontWeight: 900,
                  fontSize: 11,
                  textTransform: "uppercase",
                }}
              >
                Competitive Velocity Engine
              </button>
            )}
          </div>
        ))}
      </div>

      {/* BOTTOM DATA GRID (4 CARDS) */}
      <div
        style={{
          maxWidth: 1250,
          margin: "0 auto 150px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          padding: "0 20px",
        }}
      >
        {[
          { val: "400M$", sub: "sécurisés en Deep Due Diligence" },
          { val: "180M MAD", sub: "générés via politiques publiques" },
          { val: "+14%", sub: "de parts de marché après crise" },
          { val: "2 sem.", sub: "crise nationale maîtrisée" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: 20,
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: "#C9A84C", marginBottom: 5 }}>{item.val}</div>
            <div style={{ fontSize: 12, color: "#8899aa" }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div
        style={{
          position: "fixed",
          bottom: 30,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 15,
            padding: "15px 30px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0D1B2A" }}>
            Activez votre <span style={{ color: "#C9A84C" }}>Competitive Velocity Engine</span>
          </div>
          <button
            style={{
              background: "#C9A84C",
              color: "#0D1B2A",
              border: "none",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 900,
              fontSize: 11,
            }}
          >
            ÉCHANGE STRATÉGIQUE →
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategicWorkflow;
