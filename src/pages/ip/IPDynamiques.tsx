import { useState } from "react";
import IPShell from "@/components/ip/IPShell";

type NodeKind = "parti" | "leader" | "sujet" | "opinion";

interface GNode {
  id: string;
  label: string;
  kind: NodeKind;
  x: number;
  y: number;
  r: number;
  color: string;
}

type LinkType = "soutien" | "proximite" | "opposition" | "influence" | "mention";

const LINK_STYLE: Record<LinkType, { color: string; label: string; dash?: string }> = {
  soutien: { color: "#C9A84C", label: "Soutien / alliance" },
  proximite: { color: "#5B8DB8", label: "Proximité / affinité" },
  opposition: { color: "#E06D4F", label: "Opposition / critique" },
  influence: { color: "#E09B4F", label: "Influence / impact" },
  mention: { color: "#8C8C8C", label: "Mentions / discussions", dash: "4 5" },
};

const X_PARTI = 130;
const X_LEADER = 430;
const X_SUJET = 760;
const X_OPINION = 1070;

const PARTIS: Array<[string, string, string]> = [
  ["pam", "PAM", "#0072BB"],
  ["rni", "RNI", "#5FB3E0"],
  ["pjd", "PJD", "#E0B341"],
  ["usfp", "USFP", "#D8422F"],
  ["istiqlal", "ISTIQLAL", "#9E1B32"],
  ["autres", "AUTRES PARTIS", "#7A7A7A"],
];

const LEADERS: Array<[string, string]> = [
  ["l1", "Chef de parti A"],
  ["l2", "Chef de parti B"],
  ["l3", "Leader C"],
  ["l4", "Leader D"],
  ["l5", "Porte-parole"],
];

const SUJETS: Array<[string, string]> = [
  ["s1", "Pouvoir d'achat"],
  ["s2", "Emploi jeunes"],
  ["s3", "Santé"],
  ["s4", "Éducation"],
  ["s5", "Eau / stress hydrique"],
  ["s6", "Logement"],
  ["s7", "Sécurité"],
  ["s8", "Transition énergétique"],
];

const CANAUX: Array<[string, string]> = [
  ["c1", "Réseaux sociaux"],
  ["c2", "Presse en ligne"],
  ["c3", "Sites d'actualité"],
  ["c4", "Forums / blogs"],
  ["c5", "Vidéos / podcasts"],
  ["c6", "Influenceurs"],
];

function spread(count: number, top: number, bottom: number): number[] {
  if (count === 1) return [(top + bottom) / 2];
  const step = (bottom - top) / (count - 1);
  return Array.from({ length: count }, (_, i) => top + i * step);
}

const NODES: GNode[] = [
  ...PARTIS.map(([id, label, color], i) => ({
    id,
    label,
    kind: "parti" as const,
    x: X_PARTI,
    y: spread(PARTIS.length, 90, 620)[i],
    r: 26,
    color,
  })),
  ...LEADERS.map(([id, label], i) => ({
    id,
    label,
    kind: "leader" as const,
    x: X_LEADER,
    y: spread(LEADERS.length, 130, 590)[i],
    r: 20,
    color: "#C9A84C",
  })),
  ...SUJETS.map(([id, label], i) => ({
    id,
    label,
    kind: "sujet" as const,
    x: X_SUJET,
    y: spread(SUJETS.length, 70, 650)[i],
    r: 17,
    color: "#5B8DB8",
  })),
  { id: "citoyens", label: "Citoyens", kind: "opinion", x: X_OPINION, y: 360, r: 30, color: "#4A6A8A" },
  ...CANAUX.map(([id, label], i) => ({
    id,
    label,
    kind: "opinion" as const,
    x: X_OPINION + 60,
    y: spread(CANAUX.length, 110, 610)[i],
    r: 13,
    color: "#6E8FAE",
  })),
];

const NODE_BY_ID = new Map(NODES.map((n) => [n.id, n]));

interface GLink { s: string; t: string; type: LinkType }

const LINKS: GLink[] = [
  // Partis -> Leaders
  { s: "pam", t: "l1", type: "soutien" },
  { s: "rni", t: "l2", type: "soutien" },
  { s: "pjd", t: "l3", type: "soutien" },
  { s: "usfp", t: "l4", type: "soutien" },
  { s: "istiqlal", t: "l5", type: "soutien" },
  { s: "autres", t: "l4", type: "proximite" },
  { s: "pam", t: "l2", type: "proximite" },
  { s: "rni", t: "l1", type: "proximite" },
  { s: "pjd", t: "l1", type: "opposition" },
  { s: "usfp", t: "l2", type: "opposition" },
  { s: "istiqlal", t: "l3", type: "proximite" },
  // Leaders -> Sujets
  { s: "l1", t: "s1", type: "influence" },
  { s: "l1", t: "s2", type: "influence" },
  { s: "l1", t: "s6", type: "mention" },
  { s: "l2", t: "s1", type: "influence" },
  { s: "l2", t: "s5", type: "influence" },
  { s: "l2", t: "s8", type: "mention" },
  { s: "l3", t: "s3", type: "opposition" },
  { s: "l3", t: "s4", type: "influence" },
  { s: "l4", t: "s2", type: "influence" },
  { s: "l4", t: "s7", type: "mention" },
  { s: "l5", t: "s6", type: "influence" },
  { s: "l5", t: "s7", type: "opposition" },
  { s: "l5", t: "s4", type: "mention" },
  // Partis -> Sujets (positionnement direct)
  { s: "pam", t: "s5", type: "mention" },
  { s: "rni", t: "s8", type: "influence" },
  { s: "pjd", t: "s1", type: "opposition" },
  { s: "usfp", t: "s4", type: "mention" },
  { s: "istiqlal", t: "s6", type: "mention" },
  { s: "autres", t: "s7", type: "mention" },
  // Sujets -> Citoyens
  ...SUJETS.map(([id], i) => ({ s: id, t: "citoyens", type: (i % 3 === 0 ? "influence" : "mention") as LinkType })),
  // Citoyens -> Canaux
  ...CANAUX.map(([id]) => ({ s: "citoyens", t: id, type: "proximite" as LinkType })),
];

const KPIS: Array<[string, string]> = [
  ["Liens détectés", "1 284"],
  ["Mentions analysées", "46 900"],
  ["Portée potentielle cumulée", "12,4 M"],
  ["Sujets émergents détectés", "7"],
  ["Dernière mise à jour", "06:00 GMT+1"],
];

const IPDynamiques = () => {
  const [hover, setHover] = useState<string | null>(null);

  const connected = new Set<string>();
  if (hover) {
    connected.add(hover);
    LINKS.forEach((l) => {
      if (l.s === hover) connected.add(l.t);
      if (l.t === hover) connected.add(l.s);
    });
  }

  const nodeOpacity = (id: string) => (!hover || connected.has(id) ? 1 : 0.12);
  const linkOpacity = (l: GLink) => (!hover ? 0.55 : l.s === hover || l.t === hover ? 1 : 0.06);

  return (
    <IPShell activeSlug="dynamiques">
      <section style={{ padding: "44px 5vw" }}>
        <div className="eyebrow">Réseau relationnel du débat politique</div>
        <h2 style={{ fontSize: 28, marginBottom: 14 }}>Cartographie des Rapports de Force</h2>
        <p className="lead" style={{ fontSize: 17, maxWidth: 980, marginBottom: 26, color: "var(--text-dim)" }}>
          Cette cartographie relationnelle synthétise les interactions entre les partis, les personnalités
          politiques, les principaux sujets de débat et les dynamiques de l'opinion publique. Elle offre une
          lecture globale des rapports de force et met en évidence les convergences, les oppositions et les
          influences qui structurent le débat politique au fil de la campagne.
        </p>

        <div className="card" style={{ padding: 20 }}>
          {/* Column headings above the graph */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text)", textAlign: "left" }}>Partis politiques</div>
            <div className="mono" style={{ fontSize: 10, color: "#C9A84C", textAlign: "left" }}>Leaders politiques</div>
            <div className="mono" style={{ fontSize: 10, color: "#5B8DB8", textAlign: "center" }}>Sujet de débat politique</div>
            <div className="mono" style={{ fontSize: 10, color: "#5B8DB8", textAlign: "right" }}>Opinion citoyenne</div>
          </div>

          <svg viewBox="0 0 1260 700" style={{ width: "100%", height: "auto", display: "block" }}>
            <g>
              {LINKS.map((l, i) => {
                const a = NODE_BY_ID.get(l.s)!;
                const b = NODE_BY_ID.get(l.t)!;
                const st = LINK_STYLE[l.type];
                const mx = (a.x + b.x) / 2;
                return (
                  <path
                    key={i}
                    d={`M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`}
                    fill="none"
                    stroke={st.color}
                    strokeWidth={1.2}
                    strokeDasharray={st.dash}
                    opacity={linkOpacity(l)}
                    style={{ transition: "opacity .2s" }}
                  />
                );
              })}
            </g>
            <g>
              {NODES.map((n) => {
                const anchor = n.kind === "parti" ? "start" : n.kind === "opinion" && n.id !== "citoyens" ? "start" : "middle";
                const tx = anchor === "start" ? n.x + n.r + 8 : n.x;
                const ty = anchor === "start" ? n.y + 4 : n.y + n.r + 15;
                return (
                  <g
                    key={n.id}
                    opacity={nodeOpacity(n.id)}
                    style={{ transition: "opacity .2s", cursor: "pointer" }}
                    onMouseEnter={() => setHover(n.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} stroke="rgba(0,0,0,0.15)" />
                    <text
                      x={tx}
                      y={ty}
                      textAnchor={anchor}
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize={9.5}
                      fill="currentColor"
                      style={{ color: "var(--text)", letterSpacing: "0.04em" }}
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginTop: 18,
          }}
        >
          <div className="card">
            <div className="mono" style={{ fontSize: 10, color: "var(--gold-dim)", marginBottom: 14 }}>Types de relations</div>
            {(Object.keys(LINK_STYLE) as LinkType[]).map((k) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <svg width="34" height="8">
                  <line x1="0" y1="4" x2="34" y2="4" stroke={LINK_STYLE[k].color} strokeWidth="2" strokeDasharray={LINK_STYLE[k].dash} />
                </svg>
                <span className="mono" style={{ fontSize: 9.5, color: "var(--text-dim)" }}>{LINK_STYLE[k].label}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="mono" style={{ fontSize: 10, color: "var(--gold-dim)", marginBottom: 14 }}>Indicateurs clés du réseau</div>
            {KPIS.map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "7px 0", borderBottom: "1px solid var(--line)" }}>
                <span className="mono" style={{ fontSize: 9.5, color: "var(--text-dim)" }}>{label}</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16 }}>{value}</span>
              </div>
            ))}
            <div className="mono" style={{ fontSize: 9, color: "var(--gold-dim)", marginTop: 12 }}>
              Valeurs fictives, fournies à titre d'exemple
            </div>
          </div>

          <div className="card">
            <div className="mono" style={{ fontSize: 10, color: "var(--gold-dim)", marginBottom: 14 }}>Notre méthodologie</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: "var(--text-dim)", lineHeight: 1.6 }}>
              Collecte quotidienne de données ouvertes issues des médias, des plateformes sociales et des
              publications institutionnelles. Traitement par intelligence artificielle pour qualifier les
              mentions et les tonalités. Modélisation des relations entre partis, leaders, sujets et opinion,
              consolidée en un réseau lisible.
            </p>
          </div>
        </div>

        <div className="mono" style={{ fontSize: 9, color: "var(--text-dim)", marginTop: 16 }}>
          Survolez un nœud pour mettre en évidence ses connexions directes · personnalités présentées sous
          libellé générique, périmètre nominatif en cours de validation juridique
        </div>
      </section>
    </IPShell>
  );
};

export default IPDynamiques;
