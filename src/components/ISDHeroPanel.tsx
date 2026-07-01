import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Panneau d'entrée de l'Enquête ISD, logé en haut-droite de la hero.
 * Variante A (navy) validée. Un seul CTA vers /insights-resources/enquete-isd.
 * Charte : navy hsl(var(--navy)), or hsl(var(--gold)). Aucune couleur verte,
 * aucun rouge, aucun tiret cadratin, le mot "gratuit" est proscrit.
 */
const ISDHeroPanel = () => {
  const { t } = useLanguage();

  const go = () => {
    window.location.href = "/insights-resources/enquete-isd";
  };

  const creme = "#FAF6ED";
  const cremeMut = "rgba(250,246,237,0.74)";
  const orLine = "hsl(var(--gold) / 0.42)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.2 }}
      className="relative overflow-hidden"
      style={{
        background: "hsl(var(--navy))",
        borderRadius: "14px",
        padding: "26px 26px 24px",
      }}
    >
      {/* Sceau Premier Livre Blanc */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          top: "50px",
          right: "24px",
          width: "76px",
          height: "76px",
          borderRadius: "50%",
          border: "1.5px solid hsl(var(--gold))",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "23px",
            lineHeight: 1,
            color: "hsl(var(--gold))",
          }}
        >
          1<span style={{ fontSize: "11px", verticalAlign: "top" }}>er</span>
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "8px",
            letterSpacing: "0.1em",
            marginTop: "3px",
            textAlign: "center",
            lineHeight: 1.3,
            color: "hsl(var(--gold))",
          }}
        >
          {t("LIVRE BLANC", "WHITE PAPER")}
          <br />
          2026
        </span>
      </div>

      {/* Tags */}
      <div className="flex gap-2" style={{ marginBottom: "16px" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            background: "hsl(var(--gold))",
            color: "hsl(var(--navy))",
            padding: "4px 9px",
            borderRadius: "3px",
            fontWeight: 500,
          }}
        >
          {t("Autodiagnostic", "Self-assessment")}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "hsl(var(--gold))",
            border: `1px solid ${orLine}`,
            padding: "3px 9px",
            borderRadius: "3px",
          }}
        >
          {t("Étude nationale 2026", "National study 2026")}
        </span>
      </div>

      {/* Titre */}
      <p
        className="font-serif"
        style={{
          fontWeight: 600,
          fontSize: "27px",
          lineHeight: 1.13,
          margin: "0 0 12px",
          maxWidth: "80%",
          color: "#fff",
        }}
      >
        {t(
          "Quel est votre niveau de souveraineté décisionnelle ?",
          "What is your level of decision sovereignty?"
        )}
      </p>

      {/* Sous-texte */}
      <p
        style={{
          fontSize: "13.5px",
          lineHeight: 1.6,
          color: cremeMut,
          margin: "0 0 18px",
          maxWidth: "82%",
        }}
      >
        {t(
          "Votre score, votre radar des 4 piliers, en 10 minutes. Diagnostic personnalisé remis à l'issue de l'étude.",
          "Your score, your 4-pillar radar, in 10 minutes. Personalized diagnosis delivered at the end of the study."
        )}
      </p>

      {/* Filet or */}
      <div style={{ height: "1px", background: orLine, margin: "0 0 16px" }} />

      {/* Enjeu national */}
      <div className="flex items-start" style={{ gap: "12px", marginBottom: "20px" }}>
        <BookOpen size={22} style={{ color: "hsl(var(--gold))", marginTop: "2px", flexShrink: 0 }} />
        <p style={{ fontSize: "13px", lineHeight: 1.55, color: "#fff", margin: 0, maxWidth: "88%" }}>
          {t("Votre réponse construit la ", "Your response builds the ")}
          <span style={{ color: "hsl(var(--gold))" }}>
            {t("première étude nationale et sectorielle", "first national and sectoral study")}
          </span>
          {t(
            " de la souveraineté décisionnelle au Maroc, socle du premier Livre Blanc du domaine.",
            " of decision sovereignty in Morocco, foundation of the field's first White Paper."
          )}
        </p>
      </div>

      {/* CTA + meta */}
      <div className="flex items-center flex-wrap" style={{ gap: "18px" }}>
        <button
          onClick={go}
          style={{
            fontWeight: 500,
            fontSize: "13px",
            letterSpacing: "0.02em",
            border: 0,
            borderRadius: "6px",
            padding: "11px 18px",
            cursor: "pointer",
            background: "hsl(var(--gold))",
            color: "hsl(var(--navy))",
            transition: "0.18s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "hsl(var(--gold-light))")}
          onMouseOut={(e) => (e.currentTarget.style.background = "hsl(var(--gold))")}
        >
          {t("Évaluer ma maturité", "Assess my maturity")}
        </button>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: cremeMut,
          }}
        >
          {t("10 MIN · 4 PILIERS · 13 DIMENSIONS", "10 MIN · 4 PILLARS · 13 DIMENSIONS")}
        </span>
      </div>
    </motion.div>
  );
};

export default ISDHeroPanel;
