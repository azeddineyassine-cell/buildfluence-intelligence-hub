import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { WorldBenchmarkMapPortal } from "@/components/benchmark/WorldBenchmarkMap";
import { InvestorAtlasMapPortal, type InvestorAtlasHost } from "@/components/benchmark/InvestorAtlasMap";

const BenchmarkApiVsAmdie = () => {
  const { session, loading } = useAuth();
  const { lang } = useLanguage();
  const location = useLocation();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [mapMount, setMapMount] = useState<{ node: HTMLElement; document: Document } | null>(null);
  const [atlasMount, setAtlasMount] = useState<{ node: HTMLElement; document: Document; hostWindow: InvestorAtlasHost } | null>(null);
  const requestedPremium = new URLSearchParams(location.search).get("access") === "premium";
  const premium = requestedPremium || (!loading && Boolean(session));

  const frameSrc = useMemo(() => {
    const params = new URLSearchParams({ lang });
    if (premium) params.set("access", "premium");
    return `/benchmark-api-vs-amdie.html?${params.toString()}`;
  }, [lang, premium]);

  const syncAccess = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      { type: "bf-access", premium },
      window.location.origin,
    );
  }, [premium]);

  const handleFrameLoad = useCallback(() => {
    syncAccess();
    const frame = frameRef.current;
    const document = frame?.contentDocument;
    const node = document?.getElementById("worldMapRoot");
    if (document && node) setMapMount({ node, document });
    const atlasNode = document?.getElementById("investorAtlasMapRoot");
    const hostWindow = frame?.contentWindow;
    if (document && atlasNode && hostWindow) setAtlasMount({ node: atlasNode, document, hostWindow: hostWindow as InvestorAtlasHost });
  }, [syncAccess]);

  useEffect(() => {
    syncAccess();
  }, [syncAccess]);

  return (
    <>
      <SEO
        titleFr="Benchmark API vs AMDIE · Buildfluence"
        titleEn="API Benchmark vs AMDIE · Buildfluence"
        descriptionFr="Benchmark interactif des agences de promotion des investissements et de l’AMDIE."
        descriptionEn="Interactive benchmark of investment promotion agencies and AMDIE."
        path="/benchmark-api-vs-amdie"
      />
      <iframe
        ref={frameRef}
        src={frameSrc}
        title="Benchmark API vs AMDIE"
        onLoad={handleFrameLoad}
        className="block min-h-screen w-full border-0"
      />
      {mapMount && <WorldBenchmarkMapPortal mountNode={mapMount.node} hostDocument={mapMount.document} />}
      {atlasMount && <InvestorAtlasMapPortal mountNode={atlasMount.node} hostDocument={atlasMount.document} hostWindow={atlasMount.hostWindow} />}
    </>
  );
};

export default BenchmarkApiVsAmdie;
