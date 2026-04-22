import { useState } from "react";
import DetailPageLayout from "@/components/DetailPageLayout";
import { FormCustom } from "@/components/FormCustom";

const StrategicWorkflow = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (i: number) => setOpenStep(openStep === i ? null : i);

  const steps = [
    {
      num: 1,
      color: "#4a9a6a",
      icon: "🔍",
      title: "Needs Assessment",
      tag: "Weeks 1–3",
      items: [
        "Audit and identification of needs",
        "Analysis of strategic requirements",
        "Building the informational ecosystem",
        "Definition of objectives and KPIs",
        "Decision-making maturity diagnosis",
        "Mapping of blind spots",
      ],
    },
    {
      num: 2,
      color: "#1a7a5a",
      icon: "🏗️",
      title: "Infrastructure Preparation",
      tag: "Weeks 4–6",
      items: [
        "Workshops, Brainstorming & Validation",
        "Setup: Queries, profiles, deliverables",
        "Folder & sub-folder architecture",
        "AI solution configuration",
        "SIE approach / Research structuring",
        "Decentralized sources & databases",
      ],
    },
    {
      num: 3,
      color: "#1a5580",
      icon: "💡",
      title: "Brainstorming & Structuring",
      tag: "Weeks 7–9",
      items: [
        "Drafting & formalization of requirements",
        "Validation of strategic axes",
        "Collaborative co-construction workshops",
        "Categorization of monitoring themes",
        "Definition of deliverables & formats",
        "Drafting of specifications",
      ],
    },
    {
      num: 4,
      color: "#2a6a9a",
      icon: "🚀",
      title: "Deployment & AI Implementation",
      tag: "Weeks 10–11",
      items: [
        "Integration of the AI monitoring solution",
        "Real-world testing and adjustments",
        "Optimization and production rollout",
        "Setup of Market & Competitive Intelligence Unit",
        "Automatic detection of weak signals",
        "Real-time dashboards & KPIs",
      ],
    },
    {
      num: 5,
      color: "#C9A84C",
      icon: "🎓",
      title: "Strategic Empowerment Training",
      tag: "Weeks 12–13",
      items: [
        "Custom Next-Level training",
        "Skills-development programme",
        "Methodology: SIE, OSINT, e-Lobbying",
        "Sovereign Data & Competitive Intelligence 2.0",
        "Group of 10 people / 10 days",
        "Transfer of operational skills",
      ],
    },
    {
      num: 6,
      color: "#7a3060",
      icon: "🔄",
      title: "Change Management",
      tag: "Weeks 14–15",
      items: [
        "Internal communications direction",
        "Internal change-management initiatives",
        "One-on-one executive interviews",
        "Culture of informational resilience",
        "Cross-functional community/user support",
        "Immersive Digital Leadership workshops",
      ],
    },
    {
      num: 7,
      color: "#0F365F",
      icon: "🏅",
      title: "Continuous Support & Empowerment",
      tag: "Weeks 16–17",
      items: [
        "Support, follow-up and on-site visits",
        "Feedback & continuous improvement",
        "Solution optimization strategies",
        "Building Strategic Orientations & Action Plans",
        "Continuous improvement loop",
        "Influence Builder: narratives & e-Lobbying",
      ],
      full: true,
    },
  ];

  const piliers = [
    {
      color: "#4a4a5a",
      icon: "🏆",
      title: "Expertise",
      desc: "Competitive Intelligence expert in France and Morocco. 20+ years of experience.",
    },
    {
      color: "#1a6b5a",
      icon: "⚙️",
      title: "HumTech",
      desc: "Premium AI · OSINT · NLP · DataViz · Advanced Semantics · Interaction graphs.",
    },
    {
      color: "#C9A84C",
      icon: "🎯",
      title: "Engagement",
      desc: "Turning data into high-impact decisions. Skills transfer to your teams.",
    },
    {
      color: "#0F365F",
      icon: "⚡",
      title: "Impact",
      desc: "A decision only matters if it shifts the balance of power in your favor.",
    },
  ];

  const kpis = [
    { val: "$400M", lbl: "secured through Deep Due Diligence" },
    { val: "180M MAD", lbl: "generated via public policy" },
    { val: "+14%", lbl: "market share gained post-crisis" },
    { val: "2 wks", lbl: "national crisis brought under control" },
  ];

  const cycle = [
    { letter: "D", label: "Definition", color: "#4a9a6a" },
    { letter: "S", label: "Sourcing", color: "#1a7a5a" },
    { letter: "C", label: "Collection", color: "#1a5580" },
    { letter: "A", label: "Analysis", color: "#2a6a9a" },
    { letter: "D", label: "Dissemination", color: "#C9A84C" },
    { letter: "C", label: "Capitalization", color: "#0F365F" },
  ];

  const adn = [
    {
      icon: "📡",
      title: "Geostrategic Monitoring",
      items: [
        "Web, Social Media, OSINT",
        "Institutional databases",
        "Blogs, Forums, News, RSS feeds",
        "Fact-Checking & ad hoc sources",
        "Open Web exploration",
      ],
    },
    {
      icon: "🔬",
      title: "Ecosystem Analysis",
      items: [
        "Investors & Funds",
        "Influencers & Opinion Leaders",
        "Competing & target countries",
        "Geopolitics & Trends",
        "AI: NLP, Semantics, DataViz",
      ],
    },
    {
      icon: "⚡",
      title: "Impactful Influence",
      items: [
        "Strategic decision-making",
        "e-Lobbying & Thought Leadership",
        "High-impact content creation",
        "Communications & Events",
        "Deliverables & targeted dissemination",
      ],
    },
  ];

  const [f1Open, setF1Open] = useState(false);

  return (
    <DetailPageLayout title="" chapeau="">
      <div style={{ background: "#F0F7FF", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#0D1B2A", width: "100vw", position: "relative", left: "calc(-50vw + 50%)", marginLeft: 0, marginRight: 0 }}>
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
            Exclusive Methodology
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
            Embed a culture of strategic intelligence and an augmented decision-making system inside your
            organization.
          </p>
          <p style={{ fontSize: 13, color: "#C9A84C", fontStyle: "italic", marginBottom: 36 }}>
            Eliminate blind spots. Stay one step ahead. Build informational sovereignty.
          </p>
        </div>

        {/* PILIERS */}
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            maxWidth: 1100,
            margin: "0 auto 44px",
            padding: "0 32px",
            gap: 12,
          }}
        >
          {/* Gold connecting bar through pillar icons */}
          <div
            style={{
              position: "absolute",
              left: "calc(32px + 12.5%)",
              right: "calc(32px + 12.5%)",
              top: 27,
              height: 2,
              background: "#C9A84C",
              zIndex: 0,
            }}
          />
          {piliers.map((p, i) => (
            <div
              key={i}
              style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
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
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>From Monitoring to Intelligence Sharing</h2>
          <p style={{ fontSize: 13, color: "#6b7c93" }}>
            The complete cycle of turning information into sovereign decision-making
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
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>The 7-Step Process</h2>
          <p style={{ fontSize: 13, color: "#6b7c93" }}>
            Click each step to see the details of our intervention
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            alignItems: "start",
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
                    ⏱ Duration: {s.tag}
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
                Set up your <span style={{ color: "#C9A84C" }}>Strategic Intelligence Cell</span>
              </div>
              <div style={{ fontSize: 11, color: "#8899aa", marginTop: 2 }}>
                A 36-week engagement, from audit to autonomy
              </div>
            </div>
            <button
              onClick={() => setF1Open(true)}
              className="hover:bg-[#dbb85c] transition-colors duration-200"
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
              STRATEGIC EXCHANGE →
            </button>
          </div>
        </div>
      </div>
      <FormCustom
        open={f1Open}
        onClose={() => setF1Open(false)}
        title="Launch Your Monitoring & Intelligence Cell"
        submitLabel="Start the Diagnosis"
        formType="strategic_workflow_cell"
        fields={[
          { name: "name", placeholder: "Full Name", required: true, maxLength: 100 },
          { name: "organization", placeholder: "Organization", required: true, maxLength: 100 },
          { name: "sector", placeholder: "Industry", required: true, maxLength: 150 },
          { name: "challenge", placeholder: "Your main strategic challenge", required: true, type: "textarea", rows: 4 },
          { name: "phone", placeholder: "Phone", required: true, type: "tel", maxLength: 20 },
        ]}
      />
    </DetailPageLayout>
  );
};

export default StrategicWorkflow;
