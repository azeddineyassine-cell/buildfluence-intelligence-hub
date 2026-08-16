import { useCallback, useEffect, useState } from "react";
import SEO from "@/components/SEO";
import ReportDownloadModal, { ReportLang } from "@/components/ReportDownloadModal";
import ReportPreviewReader, { ReaderTheme } from "@/components/ip/ReportPreviewReader";
import AnalysisUpdatesModal from "@/components/ip/AnalysisUpdatesModal";
import PlatformContactModal from "@/components/ip/PlatformContactModal";

/**
 * Page « intelligence-politique » — route /insights-resources/intelligence-politique
 * L'expérience analytique est encapsulée dans un document isolé
 * (public/intelligence-politique/). Les parcours de conversion (lecteur d'aperçu,
 * formulaire de rapport, inscription, contact) sont rendus par React côté parent.
 */

type Overlay = "none" | "reader" | "report" | "updates" | "contact";

const MESSAGE_TYPES = {
  "ip-report-preview-request": "reader",
  "ip-report-download-request": "report",
  "ip-analysis-updates-request": "updates",
  "ip-platform-contact-request": "contact",
} as const;

const isLang = (v: unknown): v is ReportLang => v === "fr" || v === "en" || v === "ar";
const isTheme = (v: unknown): v is ReaderTheme => v === "light" || v === "dark";

const IntelligencePolitiquePage = () => {
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [lang, setLang] = useState<ReportLang>("fr");
  const [theme, setTheme] = useState<ReaderTheme>("light");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Bridge iframe → parent, avec validation stricte de l'origine et du schéma.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: unknown; lang?: unknown; theme?: unknown } | null;
      if (!data || typeof data.type !== "string") return;
      const target = MESSAGE_TYPES[data.type as keyof typeof MESSAGE_TYPES];
      if (!target) return;
      if (isLang(data.lang)) setLang(data.lang);
      if (isTheme(data.theme)) setTheme(data.theme);
      setOverlay(target);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const close = useCallback(() => setOverlay("none"), []);

  return (
    <>
      <SEO
        titleFr="Intelligence Politique · Législatives Maroc 2026"
        titleEn="Political Intelligence · Morocco Legislative 2026"
        descriptionFr="Plateforme Buildfluence d'intelligence politique : classements, médias, galaxie décisionnelle, influence narrative et traçabilité méthodologique."
        descriptionEn="Buildfluence political intelligence platform: rankings, media, decision galaxy, narrative influence and methodological traceability."
        path="/insights-resources/intelligence-politique"
      />
      <div
        id="intelligence-politique-page"
        style={{ position: "fixed", inset: 0, background: "#FAF6ED" }}
      >
        <iframe
          src="/intelligence-politique/index.html?v=20260816-2"
          title="Intelligence Politique"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>

      <ReportPreviewReader
        open={overlay === "reader"}
        lang={lang}
        theme={theme}
        onClose={close}
        onUnlock={() => setOverlay("report")}
      />
      <ReportDownloadModal open={overlay === "report"} lang={lang} onClose={close} />
      <AnalysisUpdatesModal open={overlay === "updates"} lang={lang} onClose={close} />
      <PlatformContactModal open={overlay === "contact"} lang={lang} onClose={close} />
    </>
  );
};

export default IntelligencePolitiquePage;
