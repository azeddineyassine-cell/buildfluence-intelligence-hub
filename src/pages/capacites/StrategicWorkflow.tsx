import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout"; // L'import pour le menu

const StrategicWorkflow = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (i: number) => setOpenStep(openStep === i ? null : i);

  const steps = [
    {
      num: 1,
      color: "#4a9a6a",
      icon: "🔍",
      title: "Évaluation des besoins",
      tag: "Semaines 1–5",
      items: [
        "Audit et identification des besoins",
        "Analyse des exigences stratégiques",
        "Construction de l'écosystème informationnel",
        "Définition des objectifs et KPIs",
        "Diagnostic de maturité décisionnelle",
        "Cartographie des angles morts",
      ],
    },
    {
      num: 2,
      color: "#1a7a5a",
      icon: "🏗️",
      title: "Préparation de l'infrastructure",
      tag: "Semaines 6–10",
      items: [
        "Ateliers, Brainstorming & Validation",
        "Setup : Requêtes, profils, livrables",
        "Arborescence des dossiers & sous-dossiers",
        "Paramétrage de la solution IA",
        "Démarche IES / Structuration de la recherche",
        "Sources décentralisées & bases de données",
      ],
    },
    {
      num: 3,
      color: "#1a5580",
      icon: "💡",
      title: "Brainstorming & Structuration",
      tag: "Semaines 11–15",
      items: [
        "Rédaction & formalisation des exigences",
        "Validation des axes stratégiques",
        "Workshops collaboratifs de co-construction",
        "Catégorisation des thématiques de veille",
        "Définition des livrables & formats",
        "Élaboration du cahier des charges",
      ],
    },
    {
      num: 4,
      color: "#2a6a9a",
      icon: "🚀",
      title: "Déploiement & Implémentation IA",
      tag: "Semaines 16–20",
      items: [
        "Intégration de la solution IA de veille",
        "Tests et ajustements en conditions réelles",
        "Optimisation et mise en production",
        "Installation Market & Competitive Intelligence Unit",
        "Détection automatique des signaux faibles",
        "Dashboards & KPIs temps réel",
      ],
    },
    {
      num: 5,
      color: "#C9A84C",
      icon: "🎓",
      title: "Formation Strategic Empowerment",
      tag: "Semaines 21–25",
      items: [
        "Formation sur-mesure Next-Level",
        "Programme de montée en compétences",
        "Méthodologie IES, OSINT, e-Lobbying",
        "Sovereign Data & Competitive Intelligence 2.0",
        "Groupe de 10 personnes / 10 jours",
        "Transfert de compétences opérationnelles",
      ],
    },
    {
      num: 6,
      color: "#7a3060",
      icon: "🔄",
      title: "Gestion du changement",
      tag: "Semaines 26–30",
      items: [
        "Direction de Communication interne",
        "Actions internes de conduite du changement",
        "One&One interviews dirigeants",
        "Culture de la résilience informationnelle",
        "Accompagnement transverse communauté/user",
        "Ateliers immersifs Leadership Digital",
      ],
    },
    {
      num: 7,
      color: "#0F365F",
      icon: "🏅",
      title: "Accompagnement continu & Autonomisation",
      tag: "Semaines 31–36 et au-delà",
      items: [
        "Support, suivi et visites sur site",
        "Retour d'expérience & amélioration continue",
        "Stratégies d'optimisation des solutions",
        "Construction des Orientations & Plans d'action",
        "Boucle d'amélioration continue",
        "Influence Builder : narratifs & e-Lobbying",
      ],
      full: true,
    },
  ];

  const piliers = [
    {
      color: "#4a4a5a",
      icon: "🏆",
      title: "Expertise",
      desc: "Expert en Intelligence Économique en France et au Maroc. +20 ans d'expérience.",
    },
    {
      color: "#1a6b5a",
      icon: "⚙️",
      title: "HumTech",
      desc: "IA Premium · OSINT · NLP · DataViz · Advanced Semantics · Graphes d'interactions.",
    },
    {
      color: "#C9A84C",
      icon: "🎯",
      title: "Engagement",
      desc: "Transformation de la donnée en décisions à fort impact. Transfert de compétences.",
    },
    {
      color: "#0F365F",
      icon: "⚡",
      title: "Impact",
      desc: "Une décision n'a de sens que si elle change le rapport de force en votre faveur.",
    },
  ];

  const kpis = [
    { val: "400M$", lbl: "sécurisés en Deep Due Diligence" },
    { val: "180M MAD", lbl: "générés via politiques publiques" },
    { val: "+14%", lbl: "de parts de marché après crise" },
    { val: "2 sem.", lbl: "crise nationale maîtrisée" },
  ];

  const cycle = [
    { letter: "D", label: "Définition", color: "#4a9a6a" },
    { letter: "S", label: "Sourcing", color: "#1a7a5a" },
    { letter: "C", label: "Collecte", color: "#1a5580" },
    { letter: "A", label: "Analyse", color: "#2a6a9a" },
    { letter: "D", label: "Diffusion", color: "#C9A84C" },
    { letter: "C", label: "Capitalisation", color: "#0F365F" },
  ];

  const adn = [
    {
      icon: "📡",
      title: "Geostrategic Monitoring",
      items: [
        "Web, Social Media, OSINT",
        "Bases de données institutionnelles",
        "Blog, Forum, News, Flux RSS",
        "Fact-Checking & Sources ad hoc",
        "Exploration Open Web",
      ],
    },
    {
      icon: "🔬",
      title: "Ecosystem Analysis",
      items: [
        "Investisseurs & Fonds",
        "Prescripteurs & Leaders d'Opinion",
        "Pays concurrents & pays cibles",
        "Géopolitique & Tendances",
        "AI : NLP, Sémantique, DataViz",
      ],
    },
    {
      icon: "⚡",
      title: "Impactful Influence",
      items: [
        "Prise de décision stratégique",
        "e-Lobbying & Leadership thought",
        "Création de contenu à fort impact",
        "Communication & Événements",
        "Livrables & Diffusion ciblée",
      ],
    },
  ];

  return (
    <DetailPageLayout title="" chapeau="">
      <div style={{ background: "#F0F7FF", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#0D1B2A" }}>
        {/* HERO */}
        <div style={{ textAlign: "center", padding: "52px 40px 32px" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#C9A84C",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Méthodologie Exclusive
          </div>
          <h1
            style={{
              fontSize: "clamp(24px, 3.5vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 10,
              letterSpacing: -0.5,
            }}
          >
            Buildfluence <span style={{ color: "#C9A84C" }}>Strategic Workflow</span>
          </h1>
          <p style={{ fontSize: 14, color: "#6b7c93", maxWidth: 640, margin: "0 auto 8px", lineHeight: 1.7 }}>
            Installer une culture d'intelligence stratégique et un système de décision augmentée au sein de votre
            entité.
          </p>
          <p style={{ fontSize: 13, color: "#C9A84C", fontStyle: "italic", marginBottom: 36 }}>
            Éviter les angles morts. Garder l'ascendant. Construire la souveraineté informationnelle.
          </p>
        </div>

        {/* PILIERS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            maxWidth: 1100,
            margin: "0 auto 44px",
            padding: "0 32px",
            gap: 12,
          }}
        >
          {piliers.map((p, i) => (
            <div
              key={i}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: p.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 10,
                  border: "3px solid #fff",
                  boxShadow: "0 4px 14px rgba(0,0,0,.1)",
                }}
              >
                {p.icon}
              </div>
              <h3
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: p.color,
                  marginBottom: 6,
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: 11, color: "#6b7c93", lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* KPIs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            maxWidth: 1100,
            margin: "0 auto 44px",
            padding: "0 32px",
          }}
        >
          {kpis.map((k, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "0.5px solid rgba(13,27,42,.08)",
                borderRadius: 12,
                padding: 16,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700, color: "#C9A84C", marginBottom: 4 }}>{k.val}</div>
              <div style={{ fontSize: 11, color: "#6b7c93", lineHeight: 1.4 }}>{k.lbl}</div>
            </div>
          ))}
        </div>

        {/* CYCLE VEILLE */}
        <div style={{ textAlign: "center", maxWidth: 1100, margin: "0 auto 16px", padding: "0 32px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>De la Veille au Partage d'Intelligence</h2>
          <p style={{ fontSize: 13, color: "#6b7c93" }}>
            Le cycle complet de transformation de l'information en décision souveraine
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            maxWidth: 1100,
            margin: "0 auto 44px",
            padding: "0 32px",
            flexWrap: "wrap",
          }}
        >
          {cycle.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: c.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 6,
                    border: "2px solid #fff",
                    boxShadow: "0 3px 10px rgba(0,0,0,.12)",
                  }}
                >
                  {c.letter}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#4a5568",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    maxWidth: 64,
                  }}
                >
                  {c.label}
                </div>
              </div>
              {i < cycle.length - 1 && (
                <div style={{ fontSize: 16, color: "#C9A84C", margin: "0 8px", paddingBottom: 20, opacity: 0.7 }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 7 ÉTAPES */}
        <div style={{ textAlign: "center", maxWidth: 1100, margin: "0 auto 16px", padding: "0 32px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Le Process en 7 Étapes</h2>
          <p style={{ fontSize: 13, color: "#6b7c93" }}>
            Cliquez sur chaque étape pour découvrir le détail de notre intervention
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
            maxWidth: 1100,
            margin: "0 auto 44px",
            padding: "0 32px",
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              onClick={() => toggleStep(i)}
              style={{
                background: "#fff",
                border: "0.5px solid rgba(13,27,42,.08)",
                borderLeft: `4px solid ${openStep === i ? s.color : "transparent"}`,
                borderRadius: 14,
                padding: "20px 22px",
                cursor: "pointer",
                gridColumn: s.full ? "1 / -1" : undefined,
                boxShadow: openStep === i ? `0 6px 24px rgba(0,0,0,.07)` : "none",
                transition: "all .25s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: s.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {s.num}
                </div>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <h3 style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{s.title}</h3>
                <span
                  style={{
                    fontSize: 12,
                    color: openStep === i ? s.color : "#aabbcc",
                    transform: openStep === i ? "rotate(180deg)" : "none",
                    transition: "transform .25s",
                  }}
                >
                  ▼
                </span>
              </div>
              <div style={{ fontSize: 10, color: "#C9A84C", fontStyle: "italic", marginTop: 6, marginLeft: 44 }}>
                {s.tag}
              </div>
              {openStep === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "0.5px solid rgba(13,27,42,.07)" }}>
                  <ul
                    style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}
                  >
                    {s.items.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: 11.5,
                          color: "#4a5568",
                          padding: "4px 0 4px 14px",
                          position: "relative",
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "#C9A84C", fontSize: 10 }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 10,
                      fontSize: 10,
                      padding: "3px 10px",
                      borderRadius: 10,
                      background: "#F0F7FF",
                      color: "#1a5580",
                      border: "0.5px solid #1a5580",
                    }}
                  >
                    ⏱ Durée : {s.tag}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ADN */}
        <div style={{ maxWidth: 1100, margin: "0 auto 44px", padding: "0 32px" }}>
          <div
            style={{
              background: "#0D1B2A",
              borderRadius: 16,
              padding: 32,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {adn.map((a, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: 16,
                  borderRight: i < 2 ? "0.5px solid rgba(255,255,255,.08)" : "none",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{a.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#C9A84C", marginBottom: 8 }}>{a.title}</div>
                <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                  {a.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 11,
                        color: "#8899aa",
                        padding: "3px 0 3px 10px",
                        position: "relative",
                        borderBottom: "0.5px solid rgba(255,255,255,.05)",
                      }}
                    >
                      <span style={{ position: "absolute", left: 0, color: "#C9A84C" }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "0 32px 52px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              background: "#fff",
              border: "1px solid rgba(201,168,76,.3)",
              borderRadius: 12,
              padding: "16px 28px",
            }}
          >
            <span style={{ fontSize: 22 }}>🚀</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>
                Installez votre <span style={{ color: "#C9A84C" }}>cellule d'intelligence stratégique</span>
              </div>
              <div style={{ fontSize: 11, color: "#8899aa", marginTop: 2 }}>
                Un accompagnement sur 36 semaines, de l'audit à l'autonomie
              </div>
            </div>
            <button
              style={{
                fontSize: 11,
                padding: "7px 16px",
                borderRadius: 20,
                background: "#C9A84C",
                color: "#0D1B2A",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
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

export default StrategicWorkflow;
