import { motion } from "framer-motion";
import { Gauge, Radar, Search } from "lucide-react";
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

  const triptyque = [
    {
      icon: Gauge,
      label: t("MESURER", "MEASURE"),
      desc: t("Votre maturité décisionnelle", "Your decision maturity"),
    },
    {
      icon: Search,
      label: t("ÉVALUER", "EVALUATE"),
      desc: t("Vos angles de vulnérabilité", "Your vulnerability angles"),
    },
    {
      icon: Radar,
      label: t("POSITIONNER", "POSITION"),
      desc: t("Votre rayonnement", "Your reach"),
    },
  ];

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
        boxShadow: "0 24px 60px -12px rgba(31, 58, 95, 0.35)",
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
          margin: "0 0 18px",
          maxWidth: "80%",
          color: "#fff",
        }}
      >
        {t(
          "Quel est votre niveau de souveraineté décisionnelle ?",
          "What is your level of decision sovereignty?"
        )}
      </p>

      {/* Triptyque à impact */}
      <div
        className="grid grid-cols-3"
        style={{ gap: "10px", marginBottom: "16px" }}
      >
        {triptyque.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center text-center"
            style={{ gap: "6px" }}
          >
            <item.icon
              size={20}
              strokeWidth={1.8}
              style={{ color: "hsl(var(--gold))", flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                fontWeight: 500,
                color: "hsl(var(--gold))",
                lineHeight: 1.2,
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontSize: "11px",
                lineHeight: 1.35,
                color: creme,
              }}
            >
              {item.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Ligne de contrat */}
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: cremeMut,
          margin: "0 0 16px",
          lineHeight: 1.5,
        }}
      >
        {t(
          "10 MIN · 4 PILIERS · 13 DIMENSIONS · DIAGNOSTIC IMMÉDIAT",
          "10 MIN · 4 PILLARS · 13 DIMENSIONS · IMMEDIATE DIAGNOSIS"
        )}
      </p>

      {/* Filet or */}
      <div style={{ height: "1px", background: orLine, margin: "0 0 16px" }} />

      {/* Les deux livrables */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "hsl(var(--gold))",
              fontWeight: 500,
            }}
          >
            {t("Immédiat, pour vous :", "Immediate, for you:")}
          </span>
          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.5,
              color: creme,
              margin: "4px 0 0",
            }}
          >
            {t(
              "Votre diagnostic personnalisé (indice, radar, feuille de route).",
              "Your personalized diagnosis (index, radar, roadmap)."
            )}
          </p>
        </div>
        <div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "hsl(var(--gold))",
              fontWeight: 500,
            }}
          >
            {t("À l'issue de l'étude :", "At the end of the study:")}
          </span>
          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.5,
              color: creme,
              margin: "4px 0 0",
            }}
          >
            {t(
              "Le premier Livre Blanc national de la souveraineté décisionnelle · Benchmark sectoriel · Tendances nationales · Feuille de route.",
              "The first national White Paper on decision sovereignty · Sectoral benchmark · National trends · Roadmap."
            )}
          </p>
        </div>
      </div>

      {/* CTA */}
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
      </div>
    </motion.div>
  );
};

export default ISDHeroPanel;
