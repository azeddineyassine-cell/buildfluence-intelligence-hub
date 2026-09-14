import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Anchor,
  BriefcaseBusiness,
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  Hotel,
  Landmark,
  MapPin,
  Microscope,
  Network,
  Plane,
  Route,
  Sun,
  TrainFront,
  Warehouse,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

type AtlasLanguage = "fr" | "en";
type AtlasTheme = "light" | "dark";
type AtlasRegion = { d: string; cx: number; cy: number };
type AtlasPoi = { n: string; c: string; t: string; city: string; x: number; y: number };
type AtlasData = { nom: { fr: string; en: string }; prime?: string; fam?: string; port?: boolean };

type AtlasHost = Window & {
  ATLAS_GEO?: Record<string, AtlasRegion>;
  ATLAS_DATA?: Record<string, AtlasData>;
  ATLAS_POI?: AtlasPoi[];
  IAT_ORDER?: string[];
  atlasSel?: string | null;
  atlasLayer?: string;
  atlasCat?: string;
  iatAsset?: string;
  iatAssetSel?: number | null;
  iatMatch?: (key: string) => boolean;
  iatAssetReg?: Record<number, string> | null;
  iatBuildAssetReg?: () => void;
  poiTypeOn?: (category: string, type: string) => boolean;
  renderAtlas?: () => void;
};

const icons: Record<string, LucideIcon> = {
  air: Plane,
  port: Anchor,
  auto: Factory,
  logistics: Warehouse,
  univ: GraduationCap,
  gs: GraduationCap,
  research: Microscope,
  soft: Cpu,
  data: Cpu,
  park: Network,
  startup: Network,
  energy: Zap,
  solar: Sun,
  wind: Wind,
  aquaculture: Waves,
  cri: BriefcaseBusiness,
  cr: Landmark,
  wilaya: Building2,
  rail: TrainFront,
  road: Route,
  golf: Hotel,
  horse: Hotel,
  default: MapPin,
};

const styles = `
  .iam-shell{--iam-ivory:#FAF6ED;--iam-navy:#0D1B2A;--iam-gold:#C9A84C;--iam-line:#D9CFBC;--iam-ink:#0D1B2A;position:relative;width:100%;height:100%;min-height:680px;overflow:hidden;border:1px solid var(--rule);border-radius:2px;background-color:var(--iam-ivory);background-image:repeating-radial-gradient(circle at 30% 35%,rgba(13,27,42,.035) 0 1px,transparent 1px 8px)}
  .iam-shell[data-theme=dark]{--iam-ivory:#142235;--iam-navy:#FAF6ED;--iam-line:#415064;--iam-ink:#FAF6ED;background-image:repeating-radial-gradient(circle at 30% 35%,rgba(250,246,237,.035) 0 1px,transparent 1px 8px)}
  .iam-map{display:block;width:100%;height:100%;min-height:680px}
  .iam-contours{fill:none;stroke:var(--iam-line);stroke-width:.55;opacity:.35;pointer-events:none}
  .iam-region{cursor:pointer;stroke:var(--iam-ivory);stroke-width:1.1;vector-effect:non-scaling-stroke;filter:drop-shadow(0 2px 2px rgba(13,27,42,.08));transition:fill .22s ease,opacity .22s ease,filter .22s ease,stroke .22s ease}
  .iam-region:hover,.iam-region:focus-visible{fill:color-mix(in srgb,var(--iam-gold) 55%,var(--iam-ivory));filter:drop-shadow(0 7px 5px rgba(13,27,42,.2));outline:none}
  .iam-region[data-selected=true]{fill:var(--iam-navy);stroke:var(--iam-gold);stroke-width:2.5}
  .iam-region[data-match=false]{opacity:.2}
  .iam-marker{cursor:pointer;color:var(--iam-navy);filter:drop-shadow(0 2px 2px rgba(13,27,42,.25));outline:none}
  .iam-marker-bg{fill:var(--iam-ivory);stroke:var(--iam-gold);stroke-width:1.3;vector-effect:non-scaling-stroke}
  .iam-marker:hover .iam-marker-bg,.iam-marker:focus-visible .iam-marker-bg,.iam-marker[data-selected=true] .iam-marker-bg{fill:var(--iam-gold);stroke:var(--iam-navy);stroke-width:2}
  .iam-marker-icon{pointer-events:none}
  .iam-cluster-count{font:700 8px 'JetBrains Mono',monospace;fill:var(--iam-navy);text-anchor:middle;pointer-events:none}
  .iam-tip{pointer-events:none}
  .iam-tip rect{fill:var(--iam-navy);stroke:var(--iam-gold);stroke-width:1;rx:2}
  .iam-tip text{font:600 10px 'DM Sans',sans-serif;fill:var(--iam-ivory)}
  @media(max-width:1100px){.iam-shell,.iam-map{min-height:580px}}
  @media(max-width:760px){.iam-shell,.iam-map{min-height:510px}}
  @media(prefers-reduced-motion:reduce){.iam-region{transition:none}}
`;

interface InvestorAtlasMapProps {
  hostDocument: Document;
  hostWindow: AtlasHost;
}

const InvestorAtlasMap = ({ hostDocument, hostWindow }: InvestorAtlasMapProps) => {
  const reducedMotion = useReducedMotion();
  const [revision, setRevision] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);
  const language: AtlasLanguage = hostDocument.documentElement.lang === "en" ? "en" : "fr";
  const theme: AtlasTheme = hostDocument.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const regions = hostWindow.ATLAS_GEO ?? {};
  const data = hostWindow.ATLAS_DATA ?? {};
  const order = hostWindow.IAT_ORDER ?? [];
  const pois = hostWindow.ATLAS_POI ?? [];
  const selected = hostWindow.atlasSel ?? null;

  useEffect(() => {
    const sync = () => setRevision((value) => value + 1);
    hostWindow.addEventListener("bf-atlas-update", sync);
    const observer = new MutationObserver(sync);
    observer.observe(hostDocument.documentElement, { attributes: true, attributeFilter: ["lang", "data-theme"] });
    return () => {
      hostWindow.removeEventListener("bf-atlas-update", sync);
      observer.disconnect();
    };
  }, [hostDocument, hostWindow]);

  hostWindow.iatBuildAssetReg?.();
  const visiblePois = useMemo(() => {
    if (hostWindow.atlasLayer !== "loc") return [];
    return pois.map((poi, index) => ({ poi, index, region: hostWindow.iatAssetReg?.[index] }))
      .filter(({ poi, region }) => (!selected || region === selected) && (hostWindow.iatAsset === "all" || poi.c === hostWindow.iatAsset) && (hostWindow.poiTypeOn?.(poi.c, poi.t) ?? true));
  }, [hostWindow, pois, selected, revision]);

  const clusters = useMemo(() => {
    const groups = new Map<string, typeof visiblePois>();
    visiblePois.forEach((entry) => {
      const key = `${Math.round(entry.poi.x / 24)}:${Math.round(entry.poi.y / 24)}`;
      groups.set(key, [...(groups.get(key) ?? []), entry]);
    });
    return [...groups.entries()];
  }, [visiblePois]);

  const governanceMarkers = useMemo(() => {
    if (hostWindow.atlasLayer !== "gov") return [];
    const actorTypes = hostWindow.iatAsset === "all" ? ["cri", "cr", "wilaya"] : [hostWindow.iatAsset];
    return order.flatMap((key) => {
      const region = regions[key];
      if (!region || (selected && selected !== key)) return [];
      return actorTypes.filter((type) => ["cri", "cr", "wilaya"].includes(type)).map((type, offset) => ({
        key,
        type,
        x: region.cx + (offset - 1) * 22,
        y: region.cy,
      }));
    });
  }, [hostWindow.iatAsset, hostWindow.atlasLayer, order, regions, selected, revision]);

  const viewBox = selected && regions[selected]
    ? `${regions[selected].cx - 150} ${regions[selected].cy - 155} 300 310`
    : "0 0 600 639";

  const chooseRegion = useCallback((key: string) => {
    hostWindow.atlasSel = key;
    hostWindow.iatAssetSel = null;
    hostWindow.renderAtlas?.();
  }, [hostWindow]);

  const choosePoi = useCallback((index: number) => {
    hostWindow.iatAssetSel = index;
    hostWindow.renderAtlas?.();
  }, [hostWindow]);

  return (
    <div className="iam-shell" data-theme={theme} data-revision={revision}>
      <style>{styles}</style>
      <motion.svg
        className="iam-map"
        viewBox={viewBox}
        animate={{ viewBox }}
        transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={language === "fr" ? "Carte d’attractivité des douze régions du Maroc" : "Investment attractiveness map of Morocco’s twelve regions"}
      >
        <defs>
          <pattern id="iam-topo" width="42" height="30" patternUnits="userSpaceOnUse">
            <path className="iam-contours" d="M-8 20 Q10 4 28 20 T64 20M-8 29 Q10 13 28 29 T64 29" />
          </pattern>
        </defs>
        {order.map((key) => {
          const region = regions[key];
          if (!region) return null;
          const name = data[key]?.nom?.[language] ?? data[key]?.nom?.fr ?? key;
          const matches = hostWindow.iatMatch?.(key) ?? true;
          const layer = hostWindow.atlasLayer;
          const tone = layer === "prime"
            ? data[key]?.prime === "b" ? 42 : data[key]?.prime === "a" ? 27 : 14
            : layer === "fam" ? data[key]?.fam === "export" ? 38 : data[key]?.fam === "industry" ? 28 : 18
            : layer === "gov" ? 12 : data[key]?.port ? 32 : 17;
          return (
            <g key={key}>
              <path
                className="iam-region"
                data-region={key}
                data-selected={selected === key}
                data-match={matches}
                d={region.d}
                fill={selected === key ? undefined : `color-mix(in srgb,var(--iam-gold) ${tone}%,var(--iam-ivory))`}
                role="button"
                tabIndex={0}
                aria-label={name}
                aria-pressed={selected === key}
                onMouseEnter={() => setHovered(`r-${key}`)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(`r-${key}`)}
                onBlur={() => setHovered(null)}
                onClick={() => chooseRegion(key)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    chooseRegion(key);
                  }
                }}
              />
              <path d={region.d} fill="url(#iam-topo)" pointerEvents="none" opacity={selected === key ? 0.32 : 0.18} />
              {hovered === `r-${key}` && (
                <g className="iam-tip" transform={`translate(${region.cx - 65} ${region.cy - 45})`}>
                  <rect width="130" height="28" />
                  <text x="65" y="18" textAnchor="middle">{name}</text>
                </g>
              )}
            </g>
          );
        })}
        {hostWindow.atlasLayer === "fam" && order.map((key) => {
          const region = regions[key];
          if (!region || (selected && selected !== key)) return null;
          return (
            <g key={`eco-${key}`} transform={`translate(${region.cx} ${region.cy})`} pointerEvents="none">
              <path d="M-24 0H24M0-24V24M-17-17L17 17M17-17L-17 17" stroke="var(--iam-gold)" strokeWidth="1" opacity=".55" />
              <Network x={-9} y={-9} width={18} height={18} color="var(--iam-navy)" strokeWidth={1.7} aria-hidden="true" />
            </g>
          );
        })}
        {governanceMarkers.map(({ key, type, x, y }) => {
          const Icon = icons[type] ?? icons.default;
          const label = type === "cri" ? "CRI" : type === "cr" ? (language === "fr" ? "Conseil régional" : "Regional Council") : "Wilaya";
          return (
            <g key={`${key}-${type}`} className="iam-marker" transform={`translate(${x} ${y})`} role="button" tabIndex={0} aria-label={`${label} · ${data[key]?.nom?.[language] ?? key}`} onClick={() => chooseRegion(key)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); chooseRegion(key); } }}>
              <rect className="iam-marker-bg" x="-12" y="-12" width="24" height="24" rx="2" />
              <foreignObject className="iam-marker-icon" x="-8" y="-8" width="16" height="16"><Icon size={16} strokeWidth={1.8} aria-hidden="true" /></foreignObject>
            </g>
          );
        })}
        {clusters.map(([clusterKey, entries]) => {
          const clustered = entries.length > 1 && expandedCluster !== clusterKey;
          const visibleEntries = clustered ? [entries[0]] : entries;
          return visibleEntries.map(({ poi, index }, offset) => {
            const Icon = icons[poi.t] ?? icons[poi.c] ?? icons.default;
            const x = poi.x + (clustered ? 0 : (offset % 3) * 18 - 9);
            const y = poi.y + (clustered ? 0 : Math.floor(offset / 3) * 18 - 9);
            const markerKey = `p-${index}`;
            return (
              <g
                key={markerKey}
                className="iam-marker"
                data-atlas-poi={index}
                data-selected={hostWindow.iatAssetSel === index}
                transform={`translate(${x} ${y})`}
                role="button"
                tabIndex={0}
                aria-label={clustered ? `${entries.length} ${language === "fr" ? "actifs regroupés" : "clustered assets"}` : `${poi.n}, ${poi.city}`}
                onMouseEnter={() => setHovered(markerKey)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(markerKey)}
                onBlur={() => setHovered(null)}
                onClick={() => clustered ? setExpandedCluster(clusterKey) : choosePoi(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    clustered ? setExpandedCluster(clusterKey) : choosePoi(index);
                  }
                }}
              >
                <rect className="iam-marker-bg" x="-12" y="-12" width="24" height="24" rx="2" />
                <foreignObject className="iam-marker-icon" x="-8" y="-8" width="16" height="16">
                  <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                </foreignObject>
                {clustered && <text className="iam-cluster-count" x="11" y="-8">{entries.length}</text>}
                {hovered === markerKey && (
                  <g className="iam-tip" transform="translate(-72 -48)">
                    <rect width="144" height="32" />
                    <text x="72" y="14" textAnchor="middle">{clustered ? `${entries.length} ${language === "fr" ? "actifs" : "assets"}` : poi.n}</text>
                    <text x="72" y="26" textAnchor="middle" opacity=".72">{clustered ? (language === "fr" ? "Cliquer pour déployer" : "Click to expand") : poi.city}</text>
                  </g>
                )}
              </g>
            );
          });
        })}
      </motion.svg>
    </div>
  );
};

interface InvestorAtlasMapPortalProps extends InvestorAtlasMapProps {
  mountNode: HTMLElement;
}

export const InvestorAtlasMapPortal = ({ mountNode, hostDocument, hostWindow }: InvestorAtlasMapPortalProps) =>
  createPortal(<InvestorAtlasMap hostDocument={hostDocument} hostWindow={hostWindow} />, mountNode);