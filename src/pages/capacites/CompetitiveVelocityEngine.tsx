import { useState } from "react";

const CompetitiveVelocityEngine = () => {
  const [activeSector, setActiveSector] = useState<string>("geo");

  const sectors = {
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
    <div
      style={{
        width: "100%",
        background: "#F0F7FF",
        minHeight: "100vh",
        margin: 0,
        padding: "0 0 120px 0",
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
      }}
    >
      {/* HEADER - TEXTE SEGOE UI */}
      <div style={{ textAlign: "center", padding: "80px 20px 40px" }}>
        <div style={{ color: "#C9A84C", fontSize: 11, fontWeight: 900, letterSpacing: 4, marginBottom: 15 }}>
          MÉTHODOLOGIE EXCLUSIVE
        </div>
        <h1 style={{ fontSize: "3.2rem", fontWeight: 900, color: "#0D1B2A", margin: 0 }}>
          COMPETITIVE <span style={{ color: "#C9A84C" }}>VELOCITY</span> ENGINE
        </h1>
        <p
          style={{
            color: "#64748b",
            fontSize: 18,
            marginTop: 20,
            fontStyle: "italic",
            maxWidth: 900,
            margin: "20px auto 0",
          }}
        >
          "Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des
          environnements concurrentiels et hyper-complexes."
        </p>
      </div>

      {/* BLOC CENTRAL INTERACTIF */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 60px",
          padding: "50px",
          background: "#fff",
          borderRadius: "35px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
          boxShadow: "0 25px 50px rgba(0,0,0,0.04)",
        }}
      >
        {/* ROUE 6 SECTIONS */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg viewBox="0 0 500 500" style={{ width: "100%", maxWidth: "450px" }}>
            {Object.keys(sectors).map((key, i) => {
              const angles = [0, 60, 120, 180, 240, 300];
              const start = ((angles[i] - 90) * Math.PI) / 180;
              const end = ((angles[i] + 60 - 90) * Math.PI) / 180;
              return (
                <path
                  key={key}
                  onClick={() => setActiveSector(key)}
                  d={`M250,250 L${250 + 200 * Math.cos(start)},${250 + 200 * Math.sin(start)} A200,200 0 0,1 ${250 + 200 * Math.cos(end)},${250 + 200 * Math.sin(end)} Z`}
                  fill={activeSector === key ? "#C9A84C" : "#1B3E6A"}
                  stroke="#FFF"
                  strokeWidth="4"
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                />
              );
            })}
            <circle cx="250" cy="250" r="75" fill="#FFF" />
            <text x="250" y="258" textAnchor="middle" fill="#1B3E6A" fontSize="14" fontWeight="900">
              ENGINE
            </text>
          </svg>
        </div>

        {/* PANNEAU DÉTAILS DROITE */}
        <div style={{ borderLeft: "8px solid #C9A84C", paddingLeft: "40px" }}>
          <div
            style={{
              color: "#C9A84C",
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            {sectors[activeSector].sub}
          </div>
          <h2 style={{ fontSize: "38px", fontWeight: 800, color: "#1B3E6A", marginBottom: 30 }}>
            {sectors[activeSector].title}
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {sectors[activeSector].list.map((item, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: "16px",
                  color: "#475569",
                  padding: "12px 0",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  gap: "15px",
                }}
              >
                <span style={{ color: "#C9A84C", fontWeight: 900 }}>—</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* GRILLE D'IMPACT 2X2 RÉTABLIE */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          padding: "0 20px",
        }}
      >
        {[
          { label: "EXPERTISE", val: "400M$", desc: "sécurisés en Deep Due Diligence" },
          { label: "HUMTECH", val: "180M MAD", desc: "générés via politiques publiques" },
          { label: "ENGAGEMENT", val: "+14%", desc: "de parts de marché après crise" },
          { label: "IMPACT", val: "2 sem.", desc: "crise nationale maîtrisée" },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "25px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{ color: "#C9A84C", fontSize: "11px", fontWeight: 900, marginBottom: "15px", letterSpacing: 2 }}
            >
              {card.label}
            </div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: "#1B3E6A", marginBottom: "10px" }}>{card.val}</div>
            <div style={{ fontSize: "14px", color: "#94a3b8" }}>{card.desc}</div>
          </div>
        ))}
      </div>

      {/* CTA FIXE - DESIGN CORRIGÉ */}
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #C9A84C",
            borderRadius: "20px",
            padding: "20px 40px",
            display: "flex",
            alignItems: "center",
            gap: "30px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
            width: "95%",
            maxWidth: "900px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#0D1B2A" }}>
              Activez votre <span style={{ color: "#C9A84C" }}>Competitive Velocity Engine</span>
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Stratégie & Influence • Accompagnement sur-mesure</div>
          </div>
          <button
            style={{
              background: "#1B3E6A",
              color: "#fff",
              border: "none",
              padding: "15px 35px",
              borderRadius: "10px",
              fontWeight: 900,
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            ÉCHANGE STRATÉGIQUE →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveVelocityEngine;
