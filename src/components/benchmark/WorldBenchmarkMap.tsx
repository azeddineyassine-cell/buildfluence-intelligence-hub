import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, RotateCcw } from "lucide-react";
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

type BenchmarkLocation = {
  id: string;
  legacyId: string;
  flag: string;
  countryFr: string;
  countryEn: string;
  agency: string;
  coordinates: [number, number];
};

const benchmarkLocations: BenchmarkLocation[] = [
  {
    id: "morocco",
    legacyId: "morocco",
    flag: "🇲🇦",
    countryFr: "Maroc",
    countryEn: "Morocco",
    agency: "Morocco Now (AMDIE)",
    coordinates: [-6.8416, 34.0209],
  },
  {
    id: "turkiye",
    legacyId: "turkey",
    flag: "🇹🇷",
    countryFr: "Türkiye",
    countryEn: "Türkiye",
    agency: "Invest.gov.tr",
    coordinates: [32.8597, 39.9334],
  },
  {
    id: "egypt",
    legacyId: "egypt",
    flag: "🇪🇬",
    countryFr: "Égypte",
    countryEn: "Egypt",
    agency: "GAFI Égypte",
    coordinates: [31.2357, 30.0444],
  },
  {
    id: "india",
    legacyId: "india",
    flag: "🇮🇳",
    countryFr: "Inde",
    countryEn: "India",
    agency: "Invest India",
    coordinates: [77.209, 28.6139],
  },
  {
    id: "south-korea",
    legacyId: "korea",
    flag: "🇰🇷",
    countryFr: "Corée du Sud",
    countryEn: "South Korea",
    agency: "Invest Korea",
    coordinates: [126.978, 37.5665],
  },
  {
    id: "singapore",
    legacyId: "edb",
    flag: "🇸🇬",
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
    zoomIn: "Zoom avant",
    zoomOut: "Zoom arrière",
    reset: "Réinitialiser la vue",
  },
  en: {
    mapTitle: "The 6 benchmark countries",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    reset: "Reset view",
  },
};

const MAP_STYLES = `
  .bfm-shell{--bfm-bg:#FAF6ED;--bfm-land:#D9CFBC;--bfm-border:rgba(13,27,42,.16);--bfm-route:#8A7537;--bfm-gold:#C9A84C;--bfm-ink:#0D1B2A;--bfm-muted:rgba(13,27,42,.68);--bfm-tip:#0D1B2A;--bfm-tip-ink:#F5F1E8;position:relative;width:100%;height:100%;min-height:360px;background:var(--bfm-bg);color:var(--bfm-ink);overflow:hidden}
  .bfm-shell[data-map-theme="dark"]{--bfm-bg:#08111C;--bfm-land:#142235;--bfm-border:rgba(245,241,232,.12);--bfm-ink:#F5F1E8;--bfm-muted:rgba(245,241,232,.68);--bfm-tip:#F5F1E8;--bfm-tip-ink:#0D1B2A}
  .bfm-stage{position:relative;height:calc(100% - 76px);min-height:290px;touch-action:pan-y;background:var(--bfm-bg)}
  .bfm-svg{display:block;width:100%;height:100%;outline:none}
  .bfm-country{fill:var(--bfm-land);stroke:var(--bfm-border);stroke-width:.55;vector-effect:non-scaling-stroke;transition:fill .2s ease}
  .bfm-route{fill:none;stroke:var(--bfm-route);stroke-width:1.1;stroke-dasharray:4 5;stroke-linecap:round;opacity:.72;vector-effect:non-scaling-stroke}
  .bfm-hit{cursor:pointer;outline:none}
  .bfm-hit:focus-visible .bfm-focus{stroke:var(--bfm-ink);stroke-width:3;opacity:1}
  .bfm-focus{fill:none;stroke:var(--bfm-ink);stroke-width:0;opacity:0;vector-effect:non-scaling-stroke}
  .bfm-ring{fill:color-mix(in srgb,var(--bfm-gold) 16%,transparent);stroke:var(--bfm-gold);stroke-width:1.5;vector-effect:non-scaling-stroke;transition:r .18s ease,stroke-width .18s ease,fill .18s ease}
  .bfm-core{fill:var(--bfm-gold);stroke:var(--bfm-bg);stroke-width:1.4;vector-effect:non-scaling-stroke}
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
  .bfm-legend{position:absolute;left:16px;right:16px;bottom:12px;z-index:4;display:flex;align-items:center;justify-content:flex-end;gap:7px;flex-wrap:wrap}
  .bfm-legend-title{width:100%;font-family:'JetBrains Mono',monospace;font-size:9px;line-height:1.3;letter-spacing:.16em;text-align:right;text-transform:uppercase;color:var(--bfm-muted)}
  .bfm-legend-btn{min-width:44px;height:44px;padding:0 8px;border:1px solid transparent;border-radius:2px;background:transparent;color:var(--bfm-ink);font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0;cursor:pointer;transition:border-color .18s ease,background .18s ease}
  .bfm-legend-btn:hover,.bfm-legend-btn[data-active="true"]{border-color:var(--bfm-gold);background:color-mix(in srgb,var(--bfm-gold) 12%,transparent)}
  .bfm-legend-btn:focus-visible{outline:2px solid var(--bfm-gold);outline-offset:2px}
  .bfm-legend-flag{font-size:17px;line-height:1}
  @keyframes bfm-pulse{0%{r:10px;opacity:.7}100%{r:25px;opacity:0}}
  @media(max-width:900px){
    .bfm-shell{min-height:320px}
    .bfm-stage{height:245px;min-height:245px}
    .bfm-legend{position:static;justify-content:center;padding:8px 12px 12px;background:var(--bfm-bg)}
    .bfm-legend-title{text-align:center}
    .bfm-legend-btn{width:44px;padding:0;font-size:0}
    .bfm-legend-flag{font-size:18px}
  }
  @media(prefers-reduced-motion:reduce){.bfm-pulse{animation:none}.bfm-ring,.bfm-country,.bfm-legend-btn{transition:none}}
`;

interface WorldBenchmarkMapProps {
  hostDocument: Document;
}

const WorldBenchmarkMap = ({ hostDocument }: WorldBenchmarkMapProps) => {
  const [language, setLanguage] = useState<BenchmarkLanguage>(hostDocument.documentElement.lang === "en" ? "en" : "fr");
  const [theme, setTheme] = useState<BenchmarkTheme>(hostDocument.documentElement.dataset.theme === "dark" ? "dark" : "light");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [center, setCenter] = useState<[number, number]>([35, 18]);
  const [zoom, setZoom] = useState(1);
  const shellRef = useRef<HTMLDivElement>(null);

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
      if (event.key === "Escape") setSelectedId(null);
    };
    hostDocument.addEventListener("pointerdown", onPointerDown);
    hostDocument.addEventListener("keydown", onKeyDown);
    return () => {
      hostDocument.removeEventListener("pointerdown", onPointerDown);
      hostDocument.removeEventListener("keydown", onKeyDown);
    };
  }, [hostDocument]);

  const visibleId = selectedId ?? hoveredId;
  const labels = copy[language];

  const selectLocation = useCallback((location: BenchmarkLocation, shouldCenter = false) => {
    setSelectedId(location.id);
    setHoveredId(location.id);
    if (shouldCenter) {
      setCenter(location.coordinates);
      setZoom(2.2);
    }
  }, []);

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

  return (
    <div ref={shellRef} className="bfm-shell" data-map-theme={theme} data-selected={selectedId ?? ""}>
      <style>{MAP_STYLES}</style>
      <div className="bfm-stage">
        <ComposableMap
          className="bfm-svg"
          width={1000}
          height={500}
          projection="geoEqualEarth"
          projectionConfig={{ center: [35, 18], scale: 154 }}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={labels.mapTitle}
        >
          <ZoomableGroup
            center={center}
            zoom={zoom}
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
            filterZoomEvent={(event) => event.type !== "wheel"}
            onMoveEnd={onMoveEnd}
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
                    onMouseEnter={() => setHoveredId(location.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(location.id)}
                    onBlur={() => setHoveredId(null)}
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
                    <circle className="bfm-core" r={markerSize / 2} />
                    <circle r="22" fill="transparent" />
                  </g>
                  {active && (
                    <g className="bfm-tooltip" transform="translate(-82 -67)" role="status">
                      <rect className="bfm-tipbox" width="164" height="48" rx="2" />
                      <text className="bfm-tipcountry" x="10" y="19">{country.toUpperCase()}</text>
                      <text className="bfm-tipagency" x="10" y="36">{location.agency}</text>
                    </g>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        <div className="bfm-controls" aria-label={labels.mapTitle}>
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
      </div>

      <div className="bfm-legend" aria-label={labels.mapTitle}>
        <div className="bfm-legend-title" id="mapTitle">{labels.mapTitle}</div>
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
              onMouseEnter={() => setHoveredId(location.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(location.id)}
              onBlur={() => setHoveredId(null)}
              onClick={() => selectLocation(location, true)}
            >
              <span className="bfm-legend-flag" aria-hidden="true">{location.flag}</span>
              <span>{country}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface WorldBenchmarkMapPortalProps extends WorldBenchmarkMapProps {
  mountNode: HTMLElement;
}

export const WorldBenchmarkMapPortal = ({ mountNode, hostDocument }: WorldBenchmarkMapPortalProps) =>
  createPortal(<WorldBenchmarkMap hostDocument={hostDocument} />, mountNode);

export { benchmarkLocations };