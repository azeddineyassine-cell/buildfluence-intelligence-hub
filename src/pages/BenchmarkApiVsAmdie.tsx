import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { WorldBenchmarkMapPortal } from "@/components/benchmark/WorldBenchmarkMap";
import { PositioningDecisionTrajectoryPortal } from "@/components/benchmark/PositioningDecisionTrajectory";


const BenchmarkApiVsAmdie = () => {
  const { session, loading } = useAuth();
  const { lang } = useLanguage();
  const location = useLocation();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [mounts, setMounts] = useState<{ landing?: HTMLElement; synthesis?: HTMLElement; trajectory?: HTMLElement; document: Document } | null>(null);
  
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
    if (document) {
      const landing = document.getElementById("landingWorldMapRoot") ?? undefined;
      const synthesis = document.getElementById("synthesisWorldMapRoot") ?? undefined;
      const trajectory = document.getElementById("positioningTrajectoryRoot") ?? undefined;
      if (landing || synthesis || trajectory) setMounts({ landing, synthesis, trajectory, document });
    }
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
      {mounts?.landing && (
        <WorldBenchmarkMapPortal mountNode={mounts.landing} hostDocument={mounts.document} mode="landing" />
      )}
      {mounts?.synthesis && (
        <WorldBenchmarkMapPortal mountNode={mounts.synthesis} hostDocument={mounts.document} mode="synthesis" />
      )}
      {mounts?.trajectory && (
        <PositioningDecisionTrajectoryPortal mountNode={mounts.trajectory} hostDocument={mounts.document} />
      )}
      
    </>
  );
};

export default BenchmarkApiVsAmdie;
