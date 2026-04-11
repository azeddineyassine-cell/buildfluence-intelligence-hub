import { useState } from "react";

const StrategicWorkflow = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (i: number) => setOpenStep(openStep === i ? null : i);

  const steps = [
    { num: 1, color: "#4a9a6a", icon: "🔍", title: "Évaluation des besoins", tag: "Semaines 1–5", items: ["Audit et identification des besoins", "Analyse des exigences stratégiques", "Construction de l'écosystème informationnel", "Définition des objectifs et KPIs", "Diagnostic de maturité décisionnelle", "Cartographie des angles morts"] },
    { num: 2, color: "#1a7a5a", icon: "🏗️", title: "Préparation de l'infrastructure", tag: "Semaines 6–10", items: ["Ateliers, Brainstorming & Validation", "Setup : Requêtes, profils, livrables", "Arborescence des dossiers & sous-dossiers", "Paramétrage de la solution IA", "Démarche IES / Structuration de la recherche", "Sources décentralisées & bases de données"] },
    { num: 3, color: "#1a5580", icon: "💡", title: "Brainstorming & Structuration", tag: "Semaines 11–15", items: ["Rédaction & formalisation des exigences", "Validation des axes stratégiques", "Workshops collaboratifs de co-construction", "Catégorisation des thématiques de veille", "Définition des livrables & formats", "Élaboration du cahier des charges"] },
    { num: 4, color: "#2a6a9a", icon: "🚀", title: "Déploiement & Implémentation IA", tag: "Semaines 16–20", items: ["Intégration de la solution IA de veille", "Tests et ajustements en conditions réelles", "Optimisation et mise en production", "Installation Market & Competitive Intelligence Unit", "Détection automatique des signaux faibles", "Dashboards & KPIs temps réel"] },
    { num: 5, color: "#C9A84C", icon: "🎓", title: "Formation Strategic Empowerment", tag: "Semaines 21–25", items: ["Formation sur-mesure Next-Level", "Programme de montée en compétences", "Méthodologie IES, OSINT, e-Lobbying", "Sovereign Data & Competitive Intelligence 2.0", "Groupe de 10 personnes / 10 jours", "Transfert de compétences opérationnelles"] },
    { num: 6, color: "#7a3060", icon: "🔄", title: "Gestion du changement", tag: "Semaines 26–30", items: ["Direction de Communication interne", "Actions internes de conduite du changement", "One&One interviews dirigeants", "Culture de la résilience informationnelle", "Accompagnement transverse communauté/user", "Ateliers immersifs Leadership Digital"] }
  ];

  return (
    <div style={{ width: "100%", background: "#F0F7FF", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, sans-serif", paddingBottom: 100 }}>
      
      {/* HEADER */}
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ color: "#C9A84C", fontSize: 10, fontWeight: 900, letterSpacing: 4, marginBottom: 10 }}>MÉTHODOLOGIE EXCLUSIVE</div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#0D1B2A", margin: 0 }}>
          BUILDFLUENCE <span style={{ color: "#C9A84C" }}>STRATEGIC WORKFLOW</span>
        </h1>
        <p style={{ color: "#8899aa", fontSize: 14, marginTop: 15, fontStyle: "italic" }}>
          Installer une culture d'intelligence stratégique et un système de décision augmentée.
        </p>
      </div>

      {/* ROUE CENTRALE & GRILLE */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e1e8ef", overflow: "hidden" }}>
              <button 
                onClick={() => toggleStep(i)}
                style={{ width: "100%", border: "none", background: "none", padding: 25, display: "flex", alignItems: "center", gap: 20, cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ width: 45, height: 45, background: s.color, borderRadius: 10, display: "flex", alignItems: "center", justifyCenter: "center", color: "#fff", fontWeight: 900, fontSize: 18, flexShrink: 0 }}>
                  <span style={{ margin: "auto" }}>{s.num}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#C9A84C" }}>{s.tag}</div>