import { useEffect } from "react";
import SEO from "@/components/SEO";

/**
 * Page « intelligence-politique » — route /insights-resources/intelligence-politique
 * L'expérience est entièrement encapsulée dans un document isolé
 * (public/intelligence-politique/) afin qu'aucun style ni gestionnaire
 * d'évènement ne fuie vers le reste du site.
 */
const IntelligencePolitiquePage = () => {
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
        descriptionFr="Plateforme Buildfluence d'intelligence politique : IBDN®, classement, opinion, acteurs et réseau relationnel du débat. Maquette de démonstration."
        descriptionEn="Buildfluence political intelligence platform: IBDN®, rankings, opinion, actors and relational network of the debate. Demonstration mockup."
        path="/insights-resources/intelligence-politique"
      />
      <div
        id="intelligence-politique-page"
        style={{ position: "fixed", inset: 0, background: "#020f1b" }}
      >
        <iframe
          src="/intelligence-politique/index.html?v=20260815-1"
          title="Intelligence Politique"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
    </>
  );
};

export default IntelligencePolitiquePage;
