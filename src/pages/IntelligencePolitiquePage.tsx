import { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import ReportDownloadModal, { ReportLang } from "@/components/ReportDownloadModal";

/**
 * Page « intelligence-politique » — route /insights-resources/intelligence-politique
 * L'expérience est entièrement encapsulée dans un document isolé
 * (public/intelligence-politique/) afin qu'aucun style ni gestionnaire
 * d'évènement ne fuie vers le reste du site.
 */
const IntelligencePolitiquePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [lang, setLang] = useState<ReportLang>("fr");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Ouverture du formulaire depuis l'interface embarquée (iframe).
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; lang?: string } | undefined;
      if (!data || data.type !== "ip-report-download-request") return;
      setLang(data.lang === "en" ? "en" : data.lang === "ar" ? "ar" : "fr");
      setModalOpen(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <SEO
        titleFr="Intelligence Politique · Législatives Maroc 2026"
        titleEn="Political Intelligence · Morocco Legislative 2026"
        descriptionFr="Plateforme Buildfluence d'intelligence politique : classement, opinion, média, dynamiques et architecture du dispositif. Maquette de démonstration."
        descriptionEn="Buildfluence political intelligence platform: rankings, opinion, media, dynamics and system architecture. Demonstration mockup."
        path="/insights-resources/intelligence-politique"
      />
      <div
        id="intelligence-politique-page"
        style={{ position: "fixed", inset: 0, background: "#FAF6ED" }}
      >
        <iframe
          src="/intelligence-politique/index.html?v=20260816-1"
          title="Intelligence Politique"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
      <ReportDownloadModal open={modalOpen} lang={lang} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default IntelligencePolitiquePage;
