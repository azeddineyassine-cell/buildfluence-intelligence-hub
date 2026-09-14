import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Anchor,
  BriefcaseBusiness,
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  Landmark,
  MapPin,
  Microscope,
  Plane,
  Sun,
  TrainFront,
  Warehouse,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

type AtlasRegionView = {
  key: string;
  d: string;
  cx: number;
  cy: number;
  name: string;
  match: boolean;
  selected: boolean;
  tone: number;
};

type AtlasAssetView = {
  i: number;
  x: number;
  y: number;
  t: string;
  name: string;
  city: string;
  selected: boolean;
};

type AtlasMapState = {
  regions: AtlasRegionView[];
  assets: AtlasAssetView[];
  view: { x: number; y: number; w: number; h: number };
  label: string;
  lang: "fr" | "en";
  theme: "light" | "dark";
};

export type InvestorAtlasHost = Window & {
  iatMapState?: () => AtlasMapState;
  iatSelectRegion?: (key: string) => void;
  iatSelectAsset?: (index: number) => void;
};

const icons: Record<string, LucideIcon> = {
  air: Plane,
  port: Anchor,
  auto: Factory,
  aero: Plane,
  logistics: Warehouse,
  univ: GraduationCap,
  gs: GraduationCap,
  data: Microscope,
  soft: Cpu,
  park: Cpu,
  startup: Cpu,
  battery: Zap,
  energy: Zap,
  solar: Sun,
  wind: Wind,
  rail: TrainFront,
  cri: BriefcaseBusiness,
  cr: Landmark,
  wilaya: Building2,
};

const styles = `
  .iam-shell{position:relative;width:100%;height:100%;background:var(--iam-paper,#FAF6ED);background-image:repeating-radial-gradient(circle at 28% 32%,rgba(13,27,42,.04) 0 1px,transparent 1px 9px)}
  .iam-shell[data-theme=dark]{--iam-paper:#142235;--iam-ivory:#142235;--iam-navy:#F5F1E8;--iam-line:#415064;background-image:repeating-radial-gradient(circle at 28% 32%,rgba(245,241,232,.04) 0 1px,transparent 1px 9px)}
  .iam-map{display:block;width:100%;height:100%}
  .iam-region{cursor:pointer;stroke:var(--iam-paper,#FAF6ED);stroke-width:1.1;vector-effect:non-scaling-stroke;transition:fill .2s ease,opacity .2s ease}
  .iam-region:hover,.iam-region:focus-visible{fill:var(--iam-gold-soft,#D4B866);outline:none}
  .iam-region[data-selected=true]{fill:var(--iam-navy,#0D1B2A);stroke:var(--iam-gold,#C9A84C);stroke-width:2.4}
  .iam-region[data-match=false]{opacity:.22}
  .iam-topo{fill:none;stroke:var(--iam-line,#D9CFBC);stroke-width:.5;opacity:.4;pointer-events:none}
  .iam-marker{cursor:pointer;outline:none}
  .iam-hit{fill:transparent}
  .iam-plate{fill:var(--iam-navy,#0D1B2A);stroke:var(--iam-gold,#C9A84C);stroke-width:1.4;vector-effect:non-scaling-stroke}
  .iam-marker:hover .iam-plate,.iam-marker:focus-visible .iam-plate,.iam-marker[data-selected=true] .iam-plate{fill:var(--iam-gold,#C9A84C);stroke:var(--iam-navy,#0D1B2A);stroke-width:2.4}
  .iam-glyph{color:var(--iam-ivory,#F5F1E8);pointer-events:none}
  .iam-marker:hover .iam-glyph,.iam-marker:focus-visible .iam-glyph,.iam-marker[data-selected=true] .iam-glyph{color:var(--iam-navy,#0D1B2A)}
  .iam-tip{pointer-events:none}
  .iam-tip rect{fill:var(--iam-navy,#0D1B2A);stroke:var(--iam-gold,#C9A84C);stroke-width:1}
  .iam-tip text{font:600 11px 'DM Sans',sans-serif;fill:var(--iam-ivory,#F5F1E8)}
`;

interface Props {
  hostDocument: Document;
  hostWindow: InvestorAtlasHost;
}

const InvestorAtlasMap = ({ hostDocument, hostWindow }: Props) => {
  const reduced = useReducedMotion();
  const [state, setState] = useState<AtlasMapState | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const read = useCallback(() => {
    const next = hostWindow.iatMapState?.();
    if (next) setState(next);
  }, [hostWindow]);

  useEffect(() => {
    read();
    hostWindow.addEventListener("bf-atlas-update", read);
    const observer = new MutationObserver(read);
    observer.observe(hostDocument.documentElement, { attributes: true, attributeFilter: ["lang", "data-theme"] });
    return () => {
      hostWindow.removeEventListener("bf-atlas-update", read);
      observer.disconnect();
    };
  }, [hostDocument, hostWindow, read]);

  if (!state) return null;

  const { view } = state;
  const scale = 600 / view.w;
  const duration = reduced ? 0 : 0.22;

  return (
    <div className="iam-shell" data-theme={state.theme}>
      <style>{styles}</style>
      <svg
        className="iam-map"
        viewBox="0 0 600 639"
        preserveAspectRatio="xMidYMid meet"
        role="group"
        aria-label={state.label}
      >
        <defs>
          <pattern id="iam-topo" width="44" height="32" patternUnits="userSpaceOnUse">
            <path className="iam-topo" d="M-8 21 Q11 5 30 21 T68 21M-8 31 Q11 15 30 31 T68 31" />
          </pattern>
        </defs>
        <motion.g
          style={{ transformOrigin: "0px 0px" }}
          animate={{ x: -view.x * scale, y: -view.y * scale, scale }}
          transition={{ duration, ease: "easeOut" }}
        >
          {state.regions.map((region) => (
            <g key={region.key}>
              <path
                className="iam-region"
                d={region.d}
                data-selected={region.selected}
                data-match={region.match}
                fill={region.selected ? undefined : `color-mix(in srgb,#C9A84C ${region.tone}%,var(--iam-paper,#FAF6ED))`}
                role="button"
                tabIndex={0}
                aria-label={region.name}
                aria-pressed={region.selected}
                onMouseEnter={() => setHover(`r:${region.key}`)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(`r:${region.key}`)}
                onBlur={() => setHover(null)}
                onClick={() => hostWindow.iatSelectRegion?.(region.key)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    hostWindow.iatSelectRegion?.(region.key);
                  }
                }}
              />
              <path d={region.d} fill="url(#iam-topo)" pointerEvents="none" opacity={region.selected ? 0.3 : 0.16} />
            </g>
          ))}
          {state.regions.map((region) =>
            hover === `r:${region.key}` ? (
              <g key={`tip-${region.key}`} className="iam-tip" transform={`translate(${region.cx} ${region.cy}) scale(${1 / scale})`}>
                <rect x={-78} y={-42} width={156} height={26} rx={2} />
                <text x={0} y={-24} textAnchor="middle">{region.name}</text>
              </g>
            ) : null,
          )}
          {state.assets.map((asset) => {
            const Icon = icons[asset.t] ?? MapPin;
            const inv = 1 / scale;
            return (
              <g
                key={asset.i}
                className="iam-marker"
                data-selected={asset.selected}
                transform={`translate(${asset.x} ${asset.y}) scale(${inv})`}
                role="button"
                tabIndex={0}
                aria-label={`${asset.name}, ${asset.city}`}
                onMouseEnter={() => setHover(`a:${asset.i}`)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(`a:${asset.i}`)}
                onBlur={() => setHover(null)}
                onClick={() => hostWindow.iatSelectAsset?.(asset.i)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    hostWindow.iatSelectAsset?.(asset.i);
                  }
                }}
              >
                <rect className="iam-hit" x={-22} y={-22} width={44} height={44} />
                <rect className="iam-plate" x={-17} y={-17} width={34} height={34} rx={2} />
                <Icon className="iam-glyph" x={-9} y={-9} width={18} height={18} strokeWidth={1.7} aria-hidden="true" />
                {hover === `a:${asset.i}` && (
                  <g className="iam-tip">
                    <rect x={-86} y={-58} width={172} height={34} rx={2} />
                    <text x={0} y={-42} textAnchor="middle">{asset.name}</text>
                    <text x={0} y={-30} textAnchor="middle" opacity={0.72}>{asset.city}</text>
                  </g>
                )}
              </g>
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};

interface PortalProps extends Props {
  mountNode: HTMLElement;
}

export const InvestorAtlasMapPortal = ({ mountNode, hostDocument, hostWindow }: PortalProps) =>
  createPortal(<InvestorAtlasMap hostDocument={hostDocument} hostWindow={hostWindow} />, mountNode);
