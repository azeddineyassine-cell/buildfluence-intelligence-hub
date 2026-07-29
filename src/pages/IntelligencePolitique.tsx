import { useEffect } from "react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const IntelligencePolitique = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <>
      <SEO
        titleFr="Intelligence Politique · Législatives Maroc 2026"
        titleEn="Political Intelligence · Morocco Legislative 2026"
        descriptionFr={"Plateforme d'analyse de données Buildfluence pour les législatives Maroc 2026. IBDN®, cartographie narrative, opinion, acteurs. Maquette de démonstration."}
        descriptionEn="Buildfluence data-analysis platform for Morocco's 2026 legislative election. IBDN®, narrative graph, opinion, actors. Demonstration mockup."
        path="/insights-resources/intelligence-politique"
      />
      <div style={{ position: "fixed", inset: 0, background: "#0D1B2A" }}>
        <iframe
          src={`/intelligence-politique.html?lang=${lang}`}
          title="Intelligence Politique"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
    </>
  );
};

export default IntelligencePolitique;
