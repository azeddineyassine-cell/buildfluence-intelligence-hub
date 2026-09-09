import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const BenchmarkApiVsAmdie = () => {
  const { session, loading } = useAuth();
  const { lang } = useLanguage();
  const location = useLocation();
  const frameRef = useRef<HTMLIFrameElement>(null);
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
        onLoad={syncAccess}
        className="block min-h-screen w-full border-0"
      />
    </>
  );
};

export default BenchmarkApiVsAmdie;
