import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
  ZoomableGroup,
  type ZoomPanCallbackProps,
} from "react-simple-maps";
import { Button } from "@/components/ui/button";
import worldGeography from "@/assets/maps/world-benchmark.geo.json";
import type { GeoJsonObject } from "geojson";

type BenchmarkLanguage = "fr" | "en";
type BenchmarkTheme = "light" | "dark";
type BenchmarkMapMode = "landing" | "synthesis";
type LocalizedText = string | { fr?: string; en?: string };

type BenchmarkLocation = {
  id: string;
  legacyId: string;
  code: string;
  countryFr: string;
  countryEn: string;
  agency: string;
  coordinates: [number, number];
};

type HostAgency = {
  name?: string;
  short?: string;
  tagline?: LocalizedText;
  diff?: LocalizedText;
  strat?: LocalizedText;
  tools?: LocalizedText;
  sector?: LocalizedText;
  fig?: LocalizedText;
  src?: string;
  verdict?: LocalizedText;
  global?: number;
  url?: string;
};

type HostMatrixRow = {
  label?: LocalizedText;
  vals?: number[];
};

type HostBenchmarkWindow = Window & {
  AG?: Record<string, HostAgency>;
  ORDER?: string[];
  MATRIX?: HostMatrixRow[];
  SRCURL?: Record<string, Record<number, string>>;
};

type CountryAnalysis = {
  model: string;
  strengths: string[];
  limits: string[];
  investorEffect: string;
  lesson: string;
  sourceLabel: string;
  sourceUrl: string;
  score: string;
};

const benchmarkLocations: BenchmarkLocation[] = [
  {
    id: "morocco",
    legacyId: "morocco",
    code: "MA",
    countryFr: "Maroc",
    countryEn: "Morocco",
    agency: "Morocco Now (AMDIE)",
    coordinates: [-6.8416, 34.0209],
  },
  {
    id: "turkiye",
    legacyId: "turkey",
    code: "TR",
    countryFr: "Türkiye",
    countryEn: "Türkiye",
    agency: "Invest.gov.tr",
    coordinates: [32.8597, 39.9334],
  },
  {
    id: "egypt",
    legacyId: "egypt",
    code: "EG",
    countryFr: "Égypte",
    countryEn: "Egypt",
    agency: "GAFI Égypte",
    coordinates: [31.2357, 30.0444],
  },
  {
    id: "india",
    legacyId: "india",
    code: "IN",
    countryFr: "Inde",
    countryEn: "India",
    agency: "Invest India",
    coordinates: [77.209, 28.6139],
  },
  {
    id: "south-korea",
    legacyId: "korea",
    code: "KR",
    countryFr: "Corée du Sud",
    countryEn: "South Korea",
    agency: "Invest Korea",
    coordinates: [126.978, 37.5665],
  },
  {
    id: "singapore",
    legacyId: "edb",
    code: "SG",
    countryFr: "Singapour",
    countryEn: "Singapore",
    agency: "Singapore EDB",
    coordinates: [103.8198, 1.3521],
  },
];

const MOROCCO = benchmarkLocations[0];
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

const copy = {
  fr: {
    mapTitle: "Les 6 pays du benchmark",
    mapFinalTitle: "Carte finale interactive",
    zoomIn: "Zoom avant",
    zoomOut: "Zoom arrière",
    reset: "Réinitialiser la vue",
    close: "Fermer la fiche",
    model: "Modèle dominant",
    strengths: "Ce que le dispositif maîtrise",
    limits: "Ce qu’il maîtrise moins",
    investorEffect: "Effet pour l’investisseur",
    lesson: "Enseignement pour le Maroc",
    cap: "Cap à atteindre pour le Maroc",
    score: "Score global existant",
    source: "Source officielle",
    fallback: "Information à consolider",
  },
  en: {
    mapTitle: "The 6 benchmark countries",
    mapFinalTitle: "Final interactive map",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    reset: "Reset view",
    close: "Close profile",
    model: "Dominant model",
    strengths: "What the system masters",
    limits: "What it masters less",
    investorEffect: "Investor effect",
    lesson: "Lesson for Morocco",
    cap: "Target for Morocco",
    score: "Existing global score",
    source: "Official source",
    fallback: "Information to be consolidated",
  },
};

const MAP_STYLES = `
  .bfm-shell{--bfm-bg:#FAF6ED;--bfm-land:#D9CFBC;--bfm-border:rgba(13,27,42,.16);--bfm-route:#8A7537;--bfm-gold:#C9A84C;--bfm-ink:#0D1B2A;--bfm-muted:rgba(13,27,42,.68);--bfm-tip:#0D1B2A;--bfm-tip-ink:#F5F1E8;position:relative;width:100%;min-height:360px;background:var(--bfm-bg);color:var(--bfm-ink);overflow:hidden}
  .bfm-shell[data-map-theme="dark"]{--bfm-bg:#08111C;--bfm-land:#142235;--bfm-border:rgba(245,241,232,.12);--bfm-ink:#F5F1E8;--bfm-muted:rgba(245,241,232,.68);--bfm-tip:#F5F1E8;--bfm-tip-ink:#0D1B2A}
  .bfm-body{display:grid;grid-template-columns:minmax(0,7fr) minmax(300px,3fr);min-height:460px;border-top:1px solid var(--bfm-border)}
  .bfm-stage{position:relative;min-height:460px;touch-action:pan-y;background:var(--bfm-bg)}
  .bfm-shell[data-map-mode="landing"] .bfm-body{display:block;min-height:310px}
  .bfm-shell[data-map-mode="landing"] .bfm-stage{min-height:310px}
  .bfm-svg{display:block;width:100%;height:100%;outline:none}
  .bfm-country{fill:var(--bfm-land);stroke:var(--bfm-border);stroke-width:.55;vector-effect:non-scaling-stroke;transition:fill .2s ease}
  .bfm-route{fill:none;stroke:var(--bfm-route);stroke-width:1.1;stroke-dasharray:4 5;stroke-linecap:round;opacity:.72;vector-effect:non-scaling-stroke}
  .bfm-hit{cursor:pointer;outline:none}
  .bfm-hitarea{fill:transparent;stroke:none;pointer-events:all}
  .bfm-hit:focus-visible .bfm-focus{stroke:var(--bfm-ink);stroke-width:3;opacity:1}
  .bfm-focus{fill:none;stroke:var(--bfm-ink);stroke-width:0;opacity:0;vector-effect:non-scaling-stroke}
  .bfm-ring{fill:color-mix(in srgb,var(--bfm-gold) 16%,transparent);stroke:var(--bfm-gold);stroke-width:1.5;vector-effect:non-scaling-stroke;transition:r .18s ease,stroke-width .18s ease,fill .18s ease}
  .bfm-flag{pointer-events:none;filter:drop-shadow(0 1px 1px color-mix(in srgb,var(--bfm-ink) 25%,transparent))}
  .bfm-pulse{fill:none;stroke:var(--bfm-gold);stroke-width:1.2;transform-box:fill-box;transform-origin:center;animation:bfm-pulse 2.8s ease-out 2;vector-effect:non-scaling-stroke}
  .bfm-hit:hover .bfm-ring,.bfm-hit[data-active="true"] .bfm-ring{r:14px;stroke-width:2.4;fill:color-mix(in srgb,var(--bfm-gold) 28%,transparent)}
  .bfm-tooltip{pointer-events:none;overflow:visible}
  .bfm-tipbox{fill:var(--bfm-tip);stroke:var(--bfm-gold);stroke-width:1;vector-effect:non-scaling-stroke}
  .bfm-tipcountry{fill:var(--bfm-tip-ink);font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:0;text-transform:uppercase}
  .bfm-tipagency{fill:color-mix(in srgb,var(--bfm-tip-ink) 76%,transparent);font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0}
  .bfm-controls{position:absolute;top:14px;right:14px;display:flex;flex-direction:column;gap:5px;z-index:4}
  .bfm-control{width:40px!important;height:40px!important;min-width:40px!important;padding:0!important;border:1px solid var(--bfm-border)!important;border-radius:2px!important;background:color-mix(in srgb,var(--bfm-bg) 92%,transparent)!important;color:var(--bfm-ink)!important;box-shadow:none!important}
  .bfm-control:hover{border-color:var(--bfm-gold)!important;background:var(--bfm-bg)!important}
  .bfm-control:focus-visible{outline:2px solid var(--bfm-gold)!important;outline-offset:2px!important}
  .bfm-control svg{width:16px!important;height:16px!important}
  .bfm-legend{position:relative;z-index:4;display:flex;align-items:center;justify-content:flex-start;gap:6px;flex-wrap:nowrap;overflow-x:auto;padding:10px 12px;background:var(--bfm-bg);scrollbar-width:thin}
  .bfm-legend-title{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
  .bfm-legend-btn{flex:0 0 auto;min-width:max-content;height:38px;padding:0 9px;border:1px solid transparent;border-radius:2px;background:transparent;color:var(--bfm-ink);font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0;cursor:pointer;transition:border-color .18s ease,background .18s ease}
  .bfm-legend-btn:hover,.bfm-legend-btn[data-active="true"]{border-color:var(--bfm-gold);background:color-mix(in srgb,var(--bfm-gold) 12%,transparent)}
  .bfm-legend-btn:focus-visible{outline:2px solid var(--bfm-gold);outline-offset:2px}
  .bfm-legend-flag{display:inline-block;width:25px;height:17px;border:1px solid var(--bfm-border);border-radius:2px;object-fit:cover;vertical-align:middle}
  .bfm-detail{position:relative;z-index:2;width:100%;max-height:460px;overflow:auto;border-left:1px solid var(--bfm-gold);border-radius:0;background:#0D1B2A;color:#F5F1E8;padding:16px 17px;box-shadow:none}
  .bfm-detail-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;border-bottom:1px solid rgba(201,168,76,.36);padding-bottom:10px;margin-bottom:12px}
  .bfm-detail-country{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#C9A84C;margin-bottom:4px}
  .bfm-detail-agency{font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.1;color:#F5F1E8}
  .bfm-detail-close{width:32px!important;height:32px!important;min-width:32px!important;padding:0!important;border:1px solid rgba(201,168,76,.45)!important;border-radius:2px!important;background:transparent!important;color:#F5F1E8!important;box-shadow:none!important}
  .bfm-detail-grid{display:grid;gap:11px}
  .bfm-detail-block{border-top:1px solid rgba(245,241,232,.12);padding-top:9px}
  .bfm-detail-label{display:block;font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:.15em;text-transform:uppercase;color:#C9A84C;margin-bottom:5px}
  .bfm-detail-text,.bfm-detail-list li{font-family:'DM Sans',sans-serif;font-size:12.5px;line-height:1.5;color:rgba(245,241,232,.86)}
  .bfm-detail-list{margin:0;padding-left:16px;display:grid;gap:4px}
  .bfm-detail-meta{display:flex;align-items:center;justify-content:space-between;gap:14px;border-top:1px solid rgba(201,168,76,.36);padding-top:11px;margin-top:2px;font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(245,241,232,.78)}
  .bfm-detail-meta b{font-family:'Cormorant Garamond',serif;font-size:22px;color:#C9A84C}
  .bfm-source{color:#C9A84C;text-decoration:none;border-bottom:1px solid rgba(201,168,76,.55)}
  .bfm-source:hover{text-decoration:none;border-bottom-color:#F5F1E8}
  @keyframes bfm-pulse{0%{r:10px;opacity:.7}100%{r:25px;opacity:0}}
  @media(max-width:900px){
    .bfm-shell{min-height:320px}
    .bfm-body{grid-template-columns:1fr;min-height:0}
    .bfm-stage{height:340px;min-height:340px}
    .bfm-shell[data-map-mode="landing"] .bfm-stage{height:300px;min-height:300px}
    .bfm-legend{padding:8px 10px}
    .bfm-legend-btn{width:auto;padding:0 8px;font-size:11px}
    .bfm-legend-flag{width:25px;height:19px}
    .bfm-detail{position:relative;max-height:none;border-left:0;border-top:1px solid var(--bfm-gold)}
  }
  @media(prefers-reduced-motion:reduce){.bfm-pulse{animation:none}.bfm-ring,.bfm-country,.bfm-legend-btn{transition:none}}
`;

const localize = (value: LocalizedText | undefined, language: BenchmarkLanguage) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] ?? value.fr ?? value.en ?? "";
};

const getHostWindow = (hostDocument: Document): HostBenchmarkWindow | null => {
  const hostWindow = hostDocument.defaultView;
  return hostWindow ? (hostWindow as HostBenchmarkWindow) : null;
};

const splitDocumentedItems = (value: string) =>
  value
    .split(/;|\.|,/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .slice(0, 2);

const buildCountryAnalysis = (
  hostDocument: Document,
  location: BenchmarkLocation,
  language: BenchmarkLanguage,
): CountryAnalysis => {
  const labels = copy[language];
  const hostWindow = getHostWindow(hostDocument);
  const agency = hostWindow?.AG?.[location.legacyId];
  const order = hostWindow?.ORDER ?? [];
  const matrix = hostWindow?.MATRIX ?? [];
  const orderIndex = order.indexOf(location.legacyId);
  const fallback = labels.fallback;

  const model = localize(agency?.tagline, language) || localize(agency?.strat, language) || fallback;
  const strengthCandidates = [localize(agency?.tools, language), localize(agency?.diff, language)]
    .map((item) => item.trim())
    .filter(Boolean);
  const strengths = strengthCandidates.length ? strengthCandidates.slice(0, 2) : [fallback];
  const rankedCriteria = matrix
    .map((row, index) => ({
      label: localize(row.label, language),
      score: typeof row.vals?.[orderIndex] === "number" ? row.vals[orderIndex] : undefined,
      index,
    }))
    .filter((item): item is { label: string; score: number; index: number } => Boolean(item.label) && typeof item.score === "number")
    .sort((a, b) => a.score - b.score || a.index - b.index);
  const limits = rankedCriteria.slice(0, 2).map((item) => `${item.label} (${item.score}/5) · ${fallback}`);
  const sourceRows = hostWindow?.SRCURL?.[location.legacyId];
  const firstSourceUrl = sourceRows ? Object.values(sourceRows).find((url) => typeof url === "string" && url.length > 0) : undefined;
  const score = typeof agency?.global === "number" ? agency.global.toFixed(1) : fallback;

  return {
    model,
    strengths,
    limits: limits.length ? limits : [fallback],
    investorEffect: localize(agency?.verdict, language) || fallback,
    lesson: location.id === "morocco" ? localize(agency?.tools, language) || fallback : localize(agency?.diff, language) || fallback,
    sourceLabel: agency?.src ?? fallback,
    sourceUrl: firstSourceUrl ?? agency?.url ?? "",
    score,
  };
};

interface WorldBenchmarkMapProps {
  hostDocument: Document;
  mode?: BenchmarkMapMode;
}

const WorldBenchmarkMap = ({ hostDocument, mode = "synthesis" }: WorldBenchmarkMapProps) => {
  const [language, setLanguage] = useState<BenchmarkLanguage>(hostDocument.documentElement.lang === "en" ? "en" : "fr");
  const [theme, setTheme] = useState<BenchmarkTheme>(hostDocument.documentElement.dataset.theme === "dark" ? "dark" : "light");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [center, setCenter] = useState<[number, number]>([35, 18]);
  const [zoom, setZoom] = useState(1);
  const shellRef = useRef<HTMLDivElement>(null);
  const hoverClearRef = useRef<number | null>(null);

  useEffect(() => {
    const root = hostDocument.documentElement;
    const sync = () => {
      setLanguage(root.lang === "en" ? "en" : "fr");
      setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    };
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["lang", "data-theme"] });
    return () => observer.disconnect();
  }, [hostDocument]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (shellRef.current && !shellRef.current.contains(event.target as Node)) setSelectedId(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        setHoveredId(null);
      }
    };
    hostDocument.addEventListener("pointerdown", onPointerDown);
    hostDocument.addEventListener("keydown", onKeyDown);
    return () => {
      hostDocument.removeEventListener("pointerdown", onPointerDown);
      hostDocument.removeEventListener("keydown", onKeyDown);
      if (hoverClearRef.current) window.clearTimeout(hoverClearRef.current);
    };
  }, [hostDocument]);

  const visibleId = selectedId ?? hoveredId ?? (mode === "synthesis" ? MOROCCO.id : null);
  const labels = copy[language];
  const activeLocation = useMemo(
    () => benchmarkLocations.find((location) => location.id === visibleId),
    [visibleId],
  );
  const activeAnalysis = useMemo(
    () => (activeLocation ? buildCountryAnalysis(hostDocument, activeLocation, language) : null),
    [activeLocation, hostDocument, language],
  );

  const clearPendingHover = useCallback(() => {
    if (hoverClearRef.current) {
      window.clearTimeout(hoverClearRef.current);
      hoverClearRef.current = null;
    }
  }, []);

  const holdHover = useCallback((id: string) => {
    clearPendingHover();
    setHoveredId(id);
  }, [clearPendingHover]);

  const releaseHover = useCallback(() => {
    clearPendingHover();
    hoverClearRef.current = window.setTimeout(() => setHoveredId(null), 140);
  }, [clearPendingHover]);

  const selectLocation = useCallback((location: BenchmarkLocation, shouldCenter = false) => {
    setSelectedId(location.id);
    setHoveredId(location.id);
    if (shouldCenter && mode === "synthesis") {
      setCenter(location.coordinates);
      setZoom(2.2);
    }
  }, [mode]);

  const resetView = useCallback(() => {
    setCenter([35, 18]);
    setZoom(1);
    setSelectedId(null);
    setHoveredId(null);
  }, []);

  const onMoveEnd = useCallback((position: ZoomPanCallbackProps) => {
    if (position.coordinates) setCenter(position.coordinates);
    if (typeof position.zoom === "number") setZoom(position.zoom);
  }, []);

  const routes = useMemo(() => benchmarkLocations.filter((location) => location.id !== MOROCCO.id), []);
  const mapTitle = mode === "landing" ? labels.mapTitle : labels.mapFinalTitle;

  return (
    <div ref={shellRef} className="bfm-shell" data-map-theme={theme} data-map-mode={mode} data-selected={selectedId ?? ""}>
      <style>{MAP_STYLES}</style>
      <div className="bfm-legend" aria-label={mapTitle}>
        <div className="bfm-legend-title" id={mode === "landing" ? "landingMapTitle" : "synthesisMapTitle"}>{mapTitle}</div>
        {benchmarkLocations.map((location) => {
          const country = language === "fr" ? location.countryFr : location.countryEn;
          return (
            <button
              key={location.id}
              className="bfm-legend-btn"
              data-legend-location={location.id}
              data-active={visibleId === location.id}
              type="button"
              aria-label={`${country}, ${location.agency}`}
              aria-pressed={selectedId === location.id}
              onMouseEnter={() => holdHover(location.id)}
              onMouseLeave={releaseHover}
              onFocus={() => holdHover(location.id)}
              onBlur={releaseHover}
              onClick={() => selectLocation(location, true)}
            >
              <img className="bfm-legend-flag" src={`/flags/${location.code.toLowerCase()}.svg`} alt="" aria-hidden="true" />
              <span>{country}</span>
            </button>
          );
        })}
      </div>
      <div className="bfm-body">
        <div className="bfm-stage">
        <ComposableMap
          className="bfm-svg"
          width={1000}
          height={500}
          projection="geoEqualEarth"
          projectionConfig={{ center: [35, 18], scale: mode === "landing" ? 142 : 154 }}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={mapTitle}
        >
          <ZoomableGroup
            center={center}
            zoom={mode === "landing" ? 1 : zoom}
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
            filterZoomEvent={(event) => mode === "synthesis" && event.type !== "wheel"}
            onMoveEnd={mode === "synthesis" ? onMoveEnd : undefined}
          >
            <Geographies geography={worldGeography as GeoJsonObject}>
              {({ geographies }) =>
                geographies.map((geography) => (
                  <Geography key={geography.rsmKey} geography={geography} className="bfm-country" tabIndex={-1} />
                ))
              }
            </Geographies>

            {routes.map((location) => (
              <Line
                key={`route-${location.id}`}
                from={MOROCCO.coordinates}
                to={location.coordinates}
                className="bfm-route"
              />
            ))}

            {benchmarkLocations.map((location) => {
              const active = visibleId === location.id;
              const country = language === "fr" ? location.countryFr : location.countryEn;
              const markerSize = location.id === MOROCCO.id ? 10 : 8;
              return (
                <Marker key={location.id} coordinates={location.coordinates}>
                  <g
                    className="bfm-hit"
                    data-location={location.id}
                    data-active={active}
                    role="button"
                    tabIndex={0}
                    aria-label={`${country}, ${location.agency}`}
                    aria-pressed={selectedId === location.id}
                    onMouseEnter={() => holdHover(location.id)}
                    onMouseLeave={releaseHover}
                    onFocus={() => holdHover(location.id)}
                    onBlur={releaseHover}
                    onClick={(event) => {
                      event.stopPropagation();
                      selectLocation(location);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectLocation(location);
                      }
                    }}
                  >
                    <circle className="bfm-focus" r="20" />
                    <circle className="bfm-pulse" r="10" />
                    <circle className="bfm-ring" r={location.id === MOROCCO.id ? 12 : 10} />
                    <image
                      className="bfm-flag"
                      href={`/flags/${location.code.toLowerCase()}.svg`}
                      x={-markerSize}
                      y={-(markerSize * 0.66)}
                      width={markerSize * 2}
                      height={markerSize * 1.32}
                      preserveAspectRatio="xMidYMid slice"
                      aria-hidden="true"
                    />
                    <circle className="bfm-hitarea" r="30" />
                  </g>
                  {active && (
                    <g className="bfm-tooltip" transform="translate(-82 -67)" role="status">
                      <rect className="bfm-tipbox" width="164" height={mode === "landing" ? "30" : "48"} rx="2" />
                      <text className="bfm-tipcountry" x="10" y="19">{country.toUpperCase()}</text>
                      {mode === "synthesis" && <text className="bfm-tipagency" x="10" y="36">{location.agency}</text>}
                    </g>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {mode === "synthesis" && (
          <div className="bfm-controls" aria-label={mapTitle}>
            <Button className="bfm-control" variant="outline" size="icon" type="button" title={labels.zoomIn} aria-label={labels.zoomIn} onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + 0.5))}>
              <Plus aria-hidden="true" />
            </Button>
            <Button className="bfm-control" variant="outline" size="icon" type="button" title={labels.zoomOut} aria-label={labels.zoomOut} onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - 0.5))}>
              <Minus aria-hidden="true" />
            </Button>
            <Button className="bfm-control" variant="outline" size="icon" type="button" title={labels.reset} aria-label={labels.reset} onClick={resetView}>
              <RotateCcw aria-hidden="true" />
            </Button>
          </div>
        )}

        </div>
        {mode === "synthesis" && activeLocation && activeAnalysis && (
          <aside className="bfm-detail" aria-live="polite" aria-label={`${language === "fr" ? activeLocation.countryFr : activeLocation.countryEn} · ${activeLocation.agency}`}>
            <div className="bfm-detail-head">
              <div>
                <div className="bfm-detail-country">{language === "fr" ? activeLocation.countryFr : activeLocation.countryEn}</div>
                <div className="bfm-detail-agency">{activeLocation.agency}</div>
              </div>
              <Button className="bfm-detail-close" variant="ghost" size="icon" type="button" title={labels.close} aria-label={labels.close} onClick={() => { setSelectedId(null); setHoveredId(null); }}>
                <X aria-hidden="true" />
              </Button>
            </div>
            <div className="bfm-detail-grid">
              <div className="bfm-detail-block"><span className="bfm-detail-label">{labels.model}</span><p className="bfm-detail-text">{activeAnalysis.model}</p></div>
              <div className="bfm-detail-block"><span className="bfm-detail-label">{labels.strengths}</span><ul className="bfm-detail-list">{activeAnalysis.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="bfm-detail-block"><span className="bfm-detail-label">{labels.limits}</span><ul className="bfm-detail-list">{activeAnalysis.limits.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="bfm-detail-block"><span className="bfm-detail-label">{labels.investorEffect}</span><p className="bfm-detail-text">{activeAnalysis.investorEffect}</p></div>
              <div className="bfm-detail-block"><span className="bfm-detail-label">{activeLocation.id === "morocco" ? labels.cap : labels.lesson}</span><p className="bfm-detail-text">{activeAnalysis.lesson}</p></div>
              <div className="bfm-detail-meta">
                <span><span className="bfm-detail-label">{labels.score}</span><b>{activeAnalysis.score}/5</b></span>
                {activeAnalysis.sourceUrl ? <a className="bfm-source" href={activeAnalysis.sourceUrl} target="_blank" rel="noopener noreferrer"><span className="bfm-detail-label">{labels.source}</span>{activeAnalysis.sourceLabel}</a> : <span><span className="bfm-detail-label">{labels.source}</span>{activeAnalysis.sourceLabel}</span>}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

interface WorldBenchmarkMapPortalProps extends WorldBenchmarkMapProps {
  mountNode: HTMLElement;
}

export const WorldBenchmarkMapPortal = ({ mountNode, hostDocument, mode = "synthesis" }: WorldBenchmarkMapPortalProps) =>
  createPortal(<WorldBenchmarkMap hostDocument={hostDocument} mode={mode} />, mountNode);

export { benchmarkLocations };
