import React, { useEffect, useRef, useState } from "react";

const C = {
  navy: "#0D1B2A",
  navy2: "#1a4a7a",
  gold: "#C9A84C",
  paper: "#FAF6ED",
  rule: "#D9CFBC",
  ink: "#0A1628",
  inkSoft: "#5a6776",
};

const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";
const FONT_SANS = "'DM Sans', system-ui, sans-serif";

type CountryEntry = { name: string; cat: "maroc" | "concurrent" | "strategique" | "coopetiteur"; col: string; sec: string; score?: number };

const COUNTRIES: Record<string, CountryEntry> = {
  "504": { name: "Maroc", cat: "maroc", col: "#22c55e", sec: "Aéro N°1 · Auto 4e · EnR 3e" },
  "710": { name: "Afrique du Sud", cat: "concurrent", col: "#dc2626", sec: "Auto · Digital · EnR · Textile", score: 9968 },
  "704": { name: "Vietnam", cat: "concurrent", col: "#dc2626", sec: "Digital · EnR · Textile · Auto", score: 9225 },
  "484": { name: "Mexique", cat: "concurrent", col: "#ef4444", sec: "Auto · EnR · Pharma", score: 4761 },
  "764": { name: "Thaïlande", cat: "concurrent", col: "#ef4444", sec: "Auto · EnR · Digital", score: 3218 },
  "404": { name: "Kenya", cat: "coopetiteur", col: "#f59e0b", sec: "Digital · EnR", score: 2506 },
  "818": { name: "Égypte", cat: "coopetiteur", col: "#f59e0b", sec: "Pharma · EnR · Digital", score: 1764 },
  "792": { name: "Turquie", cat: "coopetiteur", col: "#f59e0b", sec: "Auto · Textile · EnR", score: 638 },
  "100": { name: "Bulgarie", cat: "concurrent", col: "#fca5a5", sec: "Auto · Digital" },
  "616": { name: "Pologne", cat: "concurrent", col: "#fca5a5", sec: "Auto · Pharma · Digital" },
  "788": { name: "Tunisie", cat: "concurrent", col: "#fca5a5", sec: "Textile · Outsourcing" },
  "356": { name: "Inde", cat: "concurrent", col: "#fca5a5", sec: "Textile · Outsourcing · EnR" },
  "152": { name: "Chili", cat: "concurrent", col: "#fca5a5", sec: "EnR · Agriculture" },
  "440": { name: "Lituanie", cat: "concurrent", col: "#fca5a5", sec: "Digital · Outsourcing" },
  "646": { name: "Rwanda", cat: "coopetiteur", col: "#f59e0b", sec: "Digital · Services" },
  "686": { name: "Sénégal", cat: "coopetiteur", col: "#f59e0b", sec: "EnR · Digital · Agro" },
  "703": { name: "Slovaquie", cat: "concurrent", col: "#fca5a5", sec: "Automobile" },
  "348": { name: "Hongrie", cat: "concurrent", col: "#fca5a5", sec: "Auto · Pharma" },
  "203": { name: "Rép. Tchèque", cat: "concurrent", col: "#fca5a5", sec: "Automobile" },
  "76": { name: "Brésil", cat: "coopetiteur", col: "#f59e0b", sec: "EnR · Agriculture" },
  "840": { name: "États-Unis", cat: "strategique", col: "#3b82f6", sec: "Investisseur majeur · Global" },
  "724": { name: "Espagne", cat: "strategique", col: "#3b82f6", sec: "Textile · EnR · Géopolitique" },
  "250": { name: "France", cat: "strategique", col: "#3b82f6", sec: "1er investisseur au Maroc" },
  "380": { name: "Italie", cat: "strategique", col: "#3b82f6", sec: "Auto · Aéro · Agro · Textile" },
  "56": { name: "Belgique", cat: "strategique", col: "#3b82f6", sec: "Auto · Investisseur" },
  "276": { name: "Allemagne", cat: "strategique", col: "#3b82f6", sec: "Auto · Digital · EnR · Leader ind." },
  "528": { name: "Pays-Bas", cat: "strategique", col: "#3b82f6", sec: "Agro · Digital" },
  "826": { name: "Grande-Bretagne", cat: "strategique", col: "#3b82f6", sec: "Pharma · Digital" },
  "156": { name: "Chine", cat: "strategique", col: "#3b82f6", sec: "EnR · Digital · Auto · Infra." },
  "392": { name: "Japon", cat: "strategique", col: "#3b82f6", sec: "Auto · Aéro" },
  "410": { name: "Corée du Sud", cat: "strategique", col: "#3b82f6", sec: "Auto · Tech" },
};

const CAT_LABEL: Record<CountryEntry["cat"], string> = {
  maroc: "Maroc",
  concurrent: "Concurrent direct",
  strategique: "Partenaire stratégique",
  coopetiteur: "Coopétiteur",
};

type SectorBadge = "sc-leader" | "sc-fort" | "sc-moyen" | "sc-alert";

const SECTORS: Array<{
  icon: string;
  name: string;
  badge: SectorBadge;
  badgeLabel: string;
  mentions: number | string;
  detail: string;
  comp: string;
  marocVal: number;
  bestVal: number;
  bestLabel: string;
}> = [
  { icon: "🚗", name: "Automobile", badge: "sc-fort", badgeLabel: "4e mondial", mentions: 335, detail: "Hub automobile consolidé. Renault, Stellantis, BYD. Export prioritaire vers l'Europe.", comp: "Maroc 335 vs Vietnam 428", marocVal: 335, bestVal: 428, bestLabel: "Vietnam" },
  { icon: "✈️", name: "Aéronautique", badge: "sc-leader", badgeLabel: "N°1 mondial", mentions: 118, detail: "Leader incontesté sur la période d'étude. Safran, Boeing, Airbus. Singularité africaine majeure.", comp: "Maroc N°1 — aucun concurrent proche", marocVal: 118, bestVal: 118, bestLabel: "—" },
  { icon: "👕", name: "Textile", badge: "sc-moyen", badgeLabel: "Régional", mentions: 102, detail: "Concurrent régional face à la Tunisie et Bangladesh. Main d'œuvre compétitive, proximité UE.", comp: "Maroc 102 vs Vietnam 238", marocVal: 102, bestVal: 238, bestLabel: "Vietnam" },
  { icon: "🌾", name: "Agroalimentaire", badge: "sc-moyen", badgeLabel: "Potentiel", mentions: 98, detail: "Ressources naturelles abondantes. Agritech en développement. Marché africain à saisir.", comp: "Maroc 98 vs Afrique du Sud 283", marocVal: 98, bestVal: 283, bestLabel: "Afrique du Sud" },
  { icon: "💊", name: "Pharma", badge: "sc-alert", badgeLabel: "Alerte", mentions: 23, detail: "Secteur critique sous-exploité. Le Mexique investit 643M USD. Retard stratégique urgent.", comp: "Maroc 23 vs Mexique 166", marocVal: 23, bestVal: 166, bestLabel: "Mexique" },
  { icon: "📞", name: "Outsourcing", badge: "sc-moyen", badgeLabel: "Nearshore", mentions: 31, detail: "Nearshore Europe, bilingue, fuseaux horaires compatibles. Face à la Tunisie et Pologne.", comp: "Maroc 31 vs Mexique 83", marocVal: 31, bestVal: 83, bestLabel: "Mexique" },
  { icon: "💻", name: "Digital & Tech", badge: "sc-alert", badgeLabel: "Retard critique", mentions: 674, detail: "Retard vs Vietnam (5519) et Afrique du Sud (5191). Fragilité numérique majeure.", comp: "Maroc 674 vs Vietnam 5519", marocVal: 674, bestVal: 5519, bestLabel: "Vietnam" },
  { icon: "⚓", name: "Industrie Navale", badge: "sc-moyen", badgeLabel: "Potentiel", mentions: 21, detail: "Façade atlantique stratégique. Infrastructures portuaires. Tanger Med levier majeur.", comp: "Données limitées", marocVal: 21, bestVal: 21, bestLabel: "—" },
  { icon: "⚡", name: "Énergies Renouvelables", badge: "sc-fort", badgeLabel: "3e mondial", mentions: 654, detail: "3e position mondiale. Gazoduc NMGP 25 Mds USD. Hub énergétique continental.", comp: "Maroc 654 vs Afrique du Sud 3076", marocVal: 654, bestVal: 3076, bestLabel: "Afrique du Sud" },
];

const BADGE_STYLES: Record<SectorBadge, React.CSSProperties> = {
  "sc-leader": { background: C.gold, color: "#fff", border: `1px solid ${C.gold}` },
  "sc-fort": { background: C.navy2, color: "#fff", border: `1px solid ${C.navy2}` },
  "sc-moyen": { background: "transparent", color: "#6b7280", border: `1px solid ${C.rule}` },
  "sc-alert": { background: "#E06D4F", color: "#fff", border: "1px solid #E06D4F" },
};

// Loader for d3 + topojson via CDN
let _libsPromise: Promise<{ d3: any; topojson: any }> | null = null;
function loadLibs() {
  if (_libsPromise) return _libsPromise;
  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`script[data-cdn="${src}"]`) as HTMLScriptElement | null;
      if (existing) {
        if ((existing as any)._loaded) return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("fail " + src)));
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.dataset.cdn = src;
      s.onload = () => {
        (s as any)._loaded = true;
        resolve();
      };
      s.onerror = () => reject(new Error("fail " + src));
      document.head.appendChild(s);
    });

  _libsPromise = (async () => {
    await loadScript("https://d3js.org/d3.v7.min.js");
    await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
    const w = window as any;
    return { d3: w.d3, topojson: w.topojson };
  })();
  return _libsPromise;
}

const WorldMap: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; html: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    (async () => {
      try {
        const { d3, topojson } = await loadLibs();
        if (cancelled || !ref.current) return;
        const container = ref.current;
        container.innerHTML = "";
        const width = container.clientWidth || 600;
        const height = Math.round(width * 0.55);

        const svg = d3.select(container).append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`)
          .attr("width", "100%")
          .attr("height", "100%")
          .style("display", "block")
          .style("background", "transparent");

        const projection = d3.geoNaturalEarth1().scale(width / 6.2).translate([width / 2, height / 2]);
        const path = d3.geoPath(projection);

        const data = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        if (cancelled) return;
        const countries = topojson.feature(data, data.objects.countries).features;

        svg.append("g").selectAll("path").data(countries).enter().append("path")
          .attr("d", path)
          .attr("fill", (d: any) => {
            const id = String(+d.id);
            return COUNTRIES[id]?.col || "#E6E3DB";
          })
          .attr("stroke", "#FAF6ED")
          .attr("stroke-width", 0.5)
          .style("cursor", (d: any) => (COUNTRIES[String(+d.id)] ? "pointer" : "default"))
          .style("transition", "opacity 0.2s")
          .on("mouseenter", function (this: any, ev: any, d: any) {
            const id = String(+d.id);
            const entry = COUNTRIES[id];
            if (!entry) return;
            d3.select(this).attr("stroke", C.navy).attr("stroke-width", 1.2);
            const rect = container.getBoundingClientRect();
            const html = `
              <div style="font-family:${FONT_DISPLAY};font-size:14px;font-weight:700;color:${C.navy};margin-bottom:4px;">${entry.name}</div>
              <div style="font-family:${FONT_MONO};font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${entry.col};margin-bottom:6px;">${CAT_LABEL[entry.cat]}${entry.score ? " · " + entry.score + "pts" : ""}</div>
              <div style="font-family:${FONT_SANS};font-size:11px;color:${C.inkSoft};">${entry.sec}</div>
            `;
            setTooltip({ x: ev.clientX - rect.left + 12, y: ev.clientY - rect.top + 12, html });
          })
          .on("mousemove", function (ev: any) {
            const rect = container.getBoundingClientRect();
            setTooltip((t) => (t ? { ...t, x: ev.clientX - rect.left + 12, y: ev.clientY - rect.top + 12 } : t));
          })
          .on("mouseleave", function (this: any) {
            d3.select(this).attr("stroke", "#FAF6ED").attr("stroke-width", 0.5);
            setTooltip(null);
          });

        cleanup = () => { container.innerHTML = ""; };
      } catch (e) {
        console.error("WorldMap load error", e);
      }
    })();
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div ref={ref} style={{ width: "100%", minHeight: 200 }} />
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            background: "#FFFFFF",
            border: `1px solid ${C.rule}`,
            borderTop: `2px solid ${C.gold}`,
            padding: "10px 12px",
            pointerEvents: "none",
            zIndex: 10,
            maxWidth: 240,
            boxShadow: "0 4px 16px rgba(13,27,42,0.12)",
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.html }}
        />
      )}
    </div>
  );
};

const CompetitiveLandscape: React.FC<{ variant?: "both" | "map" | "sectors" }> = ({ variant = "both" }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const showMap = variant === "both" || variant === "map";
  const showSectors = variant === "both" || variant === "sectors";

  return (
    <div style={{ marginTop: variant === "sectors" ? 32 : 8 }}>
      {showMap && (
      <div style={{ marginBottom: variant === "map" ? 0 : 56 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 600 }}>
            Cartographie concurrentielle
          </div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(28px,3vw,38px)", fontWeight: 600, color: C.navy, lineHeight: 1.1, letterSpacing: "-0.015em" }}>
            Concurrence, <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>Coopétition</em> &amp; Alliances globales du Maroc
          </h3>
          <p style={{ fontFamily: FONT_SANS, fontStyle: "italic", fontSize: 15, color: C.inkSoft, marginTop: 12, maxWidth: 720, marginInline: "auto", lineHeight: 1.5 }}>
            Lecture intégrée de l'environnement compétitif marocain — survolez un pays pour révéler son positionnement sectoriel.
          </p>
        </div>
        <div style={{ background: C.paper, border: `1px solid ${C.rule}`, borderTop: `2px solid ${C.gold}`, padding: "clamp(16px,2vw,28px)" }}>
          <WorldMap />
          {/* Légende */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center", marginTop: 18, paddingTop: 16, borderTop: `1px solid ${C.rule}` }}>
            {[
              { c: "#22c55e", l: "Maroc" },
              { c: "#ef4444", l: "Concurrents directs" },
              { c: "#3b82f6", l: "Partenaires stratégiques" },
              { c: "#f59e0b", l: "Coopétiteurs" },
            ].map((it) => (
              <div key={it.l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 12, height: 12, background: it.c, borderRadius: 0, display: "inline-block" }} />
                <span style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft, fontWeight: 600 }}>{it.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {showSectors && (
      <div>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(24px,2.4vw,30px)", fontWeight: 600, color: C.navy, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            Les 9 secteurs stratégiques identifiés par l'AMDIE
          </h3>
          <p style={{ fontFamily: FONT_SANS, fontStyle: "italic", fontSize: 13, color: C.inkSoft, marginTop: 10 }}>
            Cliquer sur un secteur pour voir le détail
          </p>
        </div>

        <div className="cl-sectors-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {SECTORS.map((s, i) => {
            const isOpen = openIdx === i;
            return (
              <React.Fragment key={s.name}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    gridColumn: "span 1",
                    background: isOpen ? "#FFFFFF" : C.paper,
                    border: `1px solid ${isOpen ? C.gold : C.rule}`,
                    borderTop: `2px solid ${isOpen ? C.gold : "transparent"}`,
                    padding: "16px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minHeight: 130,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 18px rgba(201,168,76,0.18)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 700, color: C.navy, lineHeight: 1.15, letterSpacing: "-0.005em" }}>{s.name}</span>
                  </div>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", padding: "4px 8px", display: "inline-block", width: "fit-content", fontWeight: 600, ...BADGE_STYLES[s.badge] }}>
                    {s.badgeLabel}
                  </span>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.inkSoft, letterSpacing: "0.08em", marginTop: "auto" }}>
                    {s.mentions} mentions
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      background: C.paper,
                      border: `1px solid ${C.gold}`,
                      borderTop: `2px solid ${C.gold}`,
                      padding: 22,
                      position: "relative",
                    }}
                  >
                    <button
                      onClick={() => setOpenIdx(null)}
                      aria-label="Fermer"
                      style={{ position: "absolute", top: 10, right: 14, background: "transparent", border: "none", cursor: "pointer", fontSize: 22, color: C.navy, lineHeight: 1 }}
                    >×</button>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 22 }}>{s.icon}</span>
                      <h5 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, color: C.navy }}>{s.name}</h5>
                    </div>
                    <p style={{ fontFamily: FONT_SANS, fontSize: 14, color: C.ink, lineHeight: 1.55, marginBottom: 16, maxWidth: 760 }}>{s.detail}</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 10, maxWidth: 560 }}>
                      {(() => {
                        const max = Math.max(s.marocVal, s.bestVal, 1);
                        const Bar = ({ label, val, color }: { label: string; val: number; color: string }) => (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.navy, letterSpacing: "0.10em" }}>{label}</span>
                              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.navy, fontWeight: 700 }}>{val}</span>
                            </div>
                            <div style={{ background: "#E6E3DB", height: 12, position: "relative" }}>
                              <div style={{ width: `${(val / max) * 100}%`, height: "100%", background: color, transition: "width 0.4s ease" }} />
                            </div>
                          </div>
                        );
                        return (
                          <>
                            <Bar label="MAROC" val={s.marocVal} color={C.gold} />
                            <Bar label={(s.bestLabel || "—").toUpperCase()} val={s.bestVal} color={C.navy2} />
                          </>
                        );
                      })()}
                    </div>
                    <p style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkSoft }}>{s.comp}</p>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .cl-sectors-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .cl-sectors-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default CompetitiveLandscape;
