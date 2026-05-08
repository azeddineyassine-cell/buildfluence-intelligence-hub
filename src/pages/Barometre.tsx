import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { useNavigate } from "react-router-dom";

const Barometre = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: "#FAF7F1", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "160px 40px 120px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 16 }}>
          Baromètre · Sep 2025
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 44, color: "#0D1B2A", lineHeight: 1.1, margin: "0 0 18px" }}>
          Baromètre d'Investissement — <em style={{ color: "#C9A84C", fontWeight: 400 }}>Sep 2025</em>
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 21, color: "#3A3A3A", maxWidth: 720, margin: "0 0 32px" }}>
          Vietnam, Afrique du Sud, Mexique… Le Maroc peut-il rivaliser ? 9 secteurs, 24 600 données, 18 pays concurrents analysés.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#3A3A3A", lineHeight: 1.6, maxWidth: 720 }}>
          Le rapport complet est en cours de finalisation. Inscrivez-vous à la newsletter pour le recevoir en avant-première.
        </p>
        <button
          onClick={() => navigate("/insights-resources")}
          style={{ marginTop: 32, background: "#0D1B2A", color: "#F4F1EA", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", padding: "12px 22px", borderRadius: 2, border: "none", cursor: "pointer" }}
        >
          ← Retour aux Insights
        </button>
      </section>
      <CTAFooter />
    </div>
  );
};

export default Barometre;
