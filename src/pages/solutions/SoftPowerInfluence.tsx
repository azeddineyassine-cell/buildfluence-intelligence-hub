import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DetailPageLayout from "@/components/DetailPageLayout";
import {
  sourcesData, destData, countries, fedData, apiData, coopData, logoData,
  getCompetitorBfApport, competitorOpportunities,
  type SourceDetail, type DestDetail, type Country, type Federation, type Api, type Coop, type Logo,
} from "@/data/softpower";

/* ═══════════════ Palette tokens (alignée SIL/DDD) ═══════════════ */
const C = {
  paper: "#F4F1EA",
  paperDeep: "#EDE8DD",
  navy: "#0A1628",
  navySoft: "#142340",
  navyLine: "#1F3050",
  gold: "#C9A84C",
  goldSoft: "#D9BC6E",
  ink: "#1A1A1A",
  inkSoft: "#4A4A4A",
  inkMute: "#7A7A7A",
  line: "rgba(10, 22, 40, 0.12)",
  lineSoft: "rgba(10, 22, 40, 0.06)",
  red: "#B0392E",
  redSoft: "rgba(176, 57, 46, 0.08)",
};
const FONT_DISPLAY = "'Playfair Display', serif";
const FONT_ITALIC = "'Cormorant Garamond', serif";
const FONT_MONO = "'JetBrains Mono', monospace";
const FONT_BODY = "'DM Sans', sans-serif";

/* ═══════════════ DETAIL MODAL ═══════════════ */
type DetailKind =
  | { kind: "source"; data: SourceDetail }
  | { kind: "dest"; data: DestDetail }
  | { kind: "country"; data: Country }
  | { kind: "fed"; key: string; data: Federation }
  | { kind: "api"; data: Api }
  | { kind: "coop"; data: Coop }
  | { kind: "logo"; data: Logo };

const DetailModal = ({ detail, onClose }: { detail: DetailKind | null; onClose: () => void }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {detail && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[999]"
            style={{ background: "rgba(10, 22, 40, 0.7)", backdropFilter: "blur(4px)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 overflow-y-auto"
            style={{
              width: "min(900px, calc(100vw - 48px))",
              maxHeight: "calc(100vh - 80px)",
              background: C.paper,
              border: `1px solid ${C.gold}`,
              boxShadow: "0 30px 80px rgba(10,22,40,0.4), 0 0 0 1px rgba(201,168,76,0.2)",
              padding: "48px",
            }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center transition-all"
              style={{ border: `1px solid ${C.line}`, background: "transparent", color: C.inkSoft, fontFamily: FONT_MONO, fontSize: 14 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.paper; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.inkSoft; }}
              aria-label="Fermer"
            >✕</button>
            <DetailContent detail={detail} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 12, fontWeight: 500 }}>
    {children}
  </div>
);

const DetailTitle = ({ children, flag }: { children: React.ReactNode; flag?: string }) => (
  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 600, color: C.navy, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.015em", display: "flex", alignItems: "center", gap: 16 }}>
    {flag && <span style={{ fontSize: 40, lineHeight: 1 }}>{flag}</span>}
    <span>{children}</span>
  </h3>
);

const DetailTagline = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 18, color: C.inkSoft, lineHeight: 1.45, marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid ${C.line}` }}>
    {children}
  </p>
);

const ColsBlock = ({ cols }: { cols: { h: string; items: string[] }[] }) => (
  <div className="grid gap-9" style={{ gridTemplateColumns: cols.length === 3 ? "repeat(3, 1fr)" : "1fr 1fr" }}>
    {cols.map((c) => (
      <div key={c.h}>
        <h4 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 18, paddingBottom: 12, borderBottom: `1px solid ${C.gold}`, fontWeight: 600 }}>{c.h}</h4>
        <ul className="list-none">
          {c.items.map((it, i) => (
            <li key={i} style={{ fontSize: 13.5, color: C.inkSoft, padding: "8px 0 8px 22px", borderBottom: i === c.items.length - 1 ? "none" : `1px solid ${C.lineSoft}`, position: "relative", lineHeight: 1.55 }}>
              <span style={{ position: "absolute", left: 0, top: 8, color: C.gold, fontSize: 14 }}>→</span>
              {it}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const BfApport = ({ text }: { text: string }) => (
  <div style={{ background: C.navy, color: C.paper, padding: 24, marginTop: 28, position: "relative" }}>
    <span style={{ position: "absolute", top: 0, left: 0, width: 40, height: 1, background: C.gold }} />
    <h5 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 600 }}>L'apport Buildfluence</h5>
    <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 17, color: C.paper, lineHeight: 1.5, fontWeight: 400 }}>{text}</p>
  </div>
);

const MetaStrip = ({ items }: { items: { l: string; v: string; isScore?: boolean }[] }) => (
  <div className="flex flex-wrap gap-6" style={{ marginBottom: 32, padding: "16px 20px", background: C.paperDeep, borderLeft: `3px solid ${C.gold}` }}>
    {items.map((m, i) => (
      <div key={i} className="flex flex-col gap-1">
        <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute }}>{m.l}</div>
        <div style={m.isScore
          ? { fontFamily: FONT_DISPLAY, fontSize: 22, color: C.gold, fontWeight: 600 }
          : { fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: C.navy }
        }>{m.v}</div>
      </div>
    ))}
  </div>
);

const DetailContent = ({ detail }: { detail: DetailKind }) => {
  if (detail.kind === "source") {
    const d = detail.data;
    return (
      <>
        <Eyebrow>{d.eyebrow}</Eyebrow>
        <DetailTitle>{d.title}</DetailTitle>
        <DetailTagline>{d.tagline}</DetailTagline>
        <ColsBlock cols={d.cols} />
        {d.sources && (
          <div style={{ marginTop: 24, padding: "16px 20px", background: C.paperDeep, borderLeft: `3px solid ${C.gold}`, fontFamily: FONT_MONO, fontSize: 11, color: C.inkSoft }}>
            <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, marginBottom: 8 }}>Sources premium</div>
            {d.sources}
          </div>
        )}
        <BfApport text={d.bfApport} />
      </>
    );
  }
  if (detail.kind === "dest") {
    const d = detail.data;
    return (
      <>
        <Eyebrow>{d.eyebrow}</Eyebrow>
        <DetailTitle>{d.title}</DetailTitle>
        <DetailTagline>{d.tagline}</DetailTagline>
        {d.meta && <MetaStrip items={d.meta} />}
        <ColsBlock cols={d.cols} />
        <BfApport text={d.bfApport} />
      </>
    );
  }
  if (detail.kind === "country") {
    const c = detail.data;
    return (
      <>
        <Eyebrow>{c.isKey ? "Pays Clé · Partenaire stratégique" : "Pays Concurrent · Benchmark"}</Eyebrow>
        <DetailTitle flag={c.flag}>{c.name}</DetailTitle>
        <DetailTagline>{c.description}</DetailTagline>
        <MetaStrip items={[
          { l: "Catégorie", v: c.category },
          { l: c.isKey ? "Secteurs clés" : "Secteurs compétitifs", v: c.sectors },
          ...(!c.isKey && c.score !== undefined ? [{ l: "Score compétitivité", v: `${c.score}/10`, isScore: true }] : []),
        ]} />
        {c.isKey ? (
          <>
            <ColsBlock cols={[
              { h: "Opportunités d'influence", items: c.opportunities || [] },
              { h: "Levier stratégique", items: [
                `Le ${c.name} représente une relation stratégique à entretenir et renforcer.`,
                "Buildfluence cartographie en continu les décideurs émergents, les narratifs hostiles et les fenêtres d'opportunité que les approches diplomatiques classiques ne détectent pas.",
              ] },
            ]} />
            <BfApport text={c.bfApport || ""} />
          </>
        ) : (
          <>
            <ColsBlock cols={[
              { h: "Profil compétitif", items: [
                `Note globale : ${c.score}/10`,
                c.description,
                `Secteurs en compétition vs Maroc : ${c.sectors}`,
              ] },
              { h: "Opportunités Buildfluence", items: competitorOpportunities.map(o => o.replace("ce concurrent", c.name)) },
            ]} />
            <BfApport text={getCompetitorBfApport(c.score || 0)} />
          </>
        )}
      </>
    );
  }
  if (detail.kind === "fed") {
    const f = detail.data;
    return (
      <>
        <Eyebrow>Fédération Sectorielle · Partenaire stratégique</Eyebrow>
        <DetailTitle>{detail.key.toUpperCase()}</DetailTitle>
        <DetailTagline>{f.full}</DetailTagline>
        <MetaStrip items={[{ l: "Rôle", v: f.role }]} />
        <ColsBlock cols={[
          { h: "Synergie Buildfluence", items: [
            `Buildfluence opère comme partenaire d'intelligence pour ${detail.key.toUpperCase()}, avec un dispositif sur-mesure adapté à la filière.`,
            "Intelligence sectorielle partagée",
            "Benchmark concurrentiel continu",
            "Co-production de rapports stratégiques",
            "Veille narrative dédiée",
          ] },
          { h: "Apport sectoriel ciblé", items: [f.apport] },
        ]} />
        <BfApport text="Une fédération seule reçoit de la donnée. Une fédération avec Buildfluence reçoit une longueur d'avance." />
      </>
    );
  }
  if (detail.kind === "api") {
    const a = detail.data;
    return (
      <>
        <Eyebrow>Agence de Promotion d'Investissements · Benchmark international</Eyebrow>
        <DetailTitle>{a.full}</DetailTitle>
        <DetailTagline>{a.country} · Référentiel d'attractivité internationale</DetailTagline>
        <ColsBlock cols={[
          { h: "Pourquoi cette agence ?", items: [
            `${a.full} fait partie des agences de référence mondiale pour la promotion des investissements directs étrangers.`,
            "Buildfluence analyse en continu les méthodes, outils et succès de ces agences pour en transposer les meilleures pratiques au contexte marocain (AMDIE notamment).",
          ] },
          { h: "Apport Buildfluence dédié", items: [a.apport] },
        ]} />
        <BfApport text="L'AMDIE n'a pas besoin de réinventer ce qui marche. Buildfluence livre les playbooks éprouvés des meilleures agences mondiales." />
      </>
    );
  }
  if (detail.kind === "coop") {
    const c = detail.data;
    return (
      <>
        <Eyebrow>Coopération Internationale · Bailleur de fonds</Eyebrow>
        <DetailTitle>{c.full}</DetailTitle>
        <DetailTagline>{c.country} · Financeur de projets stratégiques au Maroc</DetailTagline>
        <ColsBlock cols={[
          { h: "Profil bailleur", items: [
            `${c.full} est un bailleur clé du développement économique au Maroc.`,
            "Comprendre ses priorités, instruments et fenêtres de financement permet d'aligner les projets nationaux et privés sur ses cycles.",
          ] },
          { h: "Apport Buildfluence dédié", items: [c.apport] },
        ]} />
        <BfApport text="Les bailleurs ne financent que les projets bien construits, bien narrés, bien timés. Buildfluence orchestre les trois." />
      </>
    );
  }
  // logo
  const l = detail.data as Logo;
  return (
    <>
      <Eyebrow>AMDIE · MICEPP · Morocco Now</Eyebrow>
      <DetailTitle>{l.name}</DetailTitle>
      <DetailTagline>{l.full}</DetailTagline>
      <BfApport text={l.apport} />
    </>
  );
};

/* ═══════════════ HERO SIGNALÉTIQUE (sidebar) ═══════════════ */
const SECTORS = [
  "Automobile", "Aéronautique", "Textile", "Agroalimentaire", "Pharma",
  "Outsourcing", "Digital & Tech", "Industrie navale", "EnR",
];

const Signaletique = () => (
  <aside style={{ background: C.paperDeep, border: `1px solid ${C.line}`, padding: "32px 28px", position: "relative" }}>
    <span style={{ position: "absolute", top: 0, left: 0, width: 50, height: 1, background: C.gold }} />
    <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 600 }}>Fiche Signalétique</div>
    <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 18, fontWeight: 600, color: C.navy, marginBottom: 22, lineHeight: 1.2, paddingBottom: 14, borderBottom: `1px solid ${C.line}` }}>Pilier II — Soft Power & Influence</div>

    {[
      { l: "Trilogie", v: <><em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>Capter</em> · <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>Transformer</em> · <em style={{ color: C.gold, fontFamily: FONT_DISPLAY }}>Influencer</em></> },
      { l: "Périmètre géographique", v: "Maroc + 28 territoires (10 partenaires · 18 concurrents)" },
      { l: "Écosystème activé", v: "8 sphères de diffusion · Gouv · Fédérations · Bailleurs · Médias" },
    ].map((r) => (
      <div key={r.l} style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${C.lineSoft}` }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, fontWeight: 500 }}>{r.l}</span>
        <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.navy, lineHeight: 1.4, fontWeight: 500 }}>{r.v}</span>
      </div>
    ))}

    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, fontWeight: 500 }}>9 Secteurs Stratégiques</span>
      <div className="grid grid-cols-3 gap-1.5 mt-2">
        {SECTORS.map((s, i) => (
          <div key={s} style={{ background: C.paper, border: `1px solid ${C.line}`, padding: "8px 6px", textAlign: "center", minHeight: 52, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 8, letterSpacing: "0.15em", color: C.gold, fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.navy, lineHeight: 1.15, fontWeight: 500 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

/* ═══════════════ SECTION HEADER ═══════════════ */
const SectionHeader = ({ num, eyebrow, children, intro }: { num: string; eyebrow: string; children: React.ReactNode; intro: React.ReactNode }) => (
  <div className="grid gap-8 mb-12" style={{ gridTemplateColumns: "100px 1fr" }}>
    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 72, color: C.gold, fontWeight: 400, lineHeight: 0.9, fontStyle: "italic" }}>{num}</div>
    <div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 14, fontWeight: 500 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(34px,4.5vw,52px)", fontWeight: 600, color: C.navy, lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.015em" }}>{children}</h2>
      <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 20, color: C.inkSoft, maxWidth: 720, lineHeight: 1.5 }}>{intro}</p>
    </div>
  </div>
);

/* ═══════════════ SECTION 01 — MÉCANISME 3 COLONNES ═══════════════ */
type OpenDetail = (d: DetailKind) => void;

const SourceCard = ({ k, glyph, title, tagline, tags, mini, hum, open }: {
  k: keyof typeof sourcesData; glyph: string; title: string; tagline: string;
  tags?: string[]; mini?: string[]; hum?: boolean; open: OpenDetail;
}) => (
  <button
    onClick={() => open({ kind: "source", data: sourcesData[k] })}
    className="w-full text-left transition-all"
    style={{
      background: C.navySoft, border: `1px solid ${hum ? "rgba(176,57,46,0.3)" : C.navyLine}`,
      padding: "22px 20px", marginBottom: 14, cursor: "pointer", display: "block",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(20,35,64,0.95)"; e.currentTarget.style.borderColor = hum ? "rgba(176,57,46,0.6)" : "rgba(201,168,76,0.4)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = C.navySoft; e.currentTarget.style.borderColor = hum ? "rgba(176,57,46,0.3)" : C.navyLine; }}
  >
    <div className="flex items-center gap-3.5 mb-2.5">
      <div style={{ width: 36, height: 36, border: `1px solid ${hum ? C.red : C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_DISPLAY, fontSize: 16, fontStyle: "italic", color: hum ? C.red : C.gold, flexShrink: 0, fontWeight: 500 }}>{glyph}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 600, color: hum ? "#E8A89F" : C.paper, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</div>
    </div>
    <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 13, color: "rgba(244,241,234,0.6)", marginBottom: 12, lineHeight: 1.4 }}>{tagline}</p>
    {tags && (
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {tags.map((t) => (
          <span key={t} style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.08em", color: "rgba(244,241,234,0.6)", padding: "3px 8px", border: `1px solid ${hum ? "rgba(176,57,46,0.3)" : "rgba(244,241,234,0.15)"}`, textTransform: "uppercase" }}>{t}</span>
        ))}
      </div>
    )}
    {mini && (
      <div className="flex flex-wrap items-center gap-2 pt-2.5" style={{ borderTop: "1px solid rgba(244,241,234,0.08)" }}>
        {mini.map((m) => (
          <span key={m} style={{ fontFamily: FONT_MONO, fontSize: 9, color: "rgba(244,241,234,0.7)" }}>{m}</span>
        ))}
      </div>
    )}
    <div style={{ marginTop: 12, fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: hum ? "#E8A89F" : C.gold, opacity: 0.6 }}>→ Explorer le pilier</div>
  </button>
);

const DestCard = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={onClick ? "transition-all cursor-pointer" : "transition-all"}
    style={{ background: C.navySoft, border: `1px solid ${C.navyLine}`, padding: "22px 20px", marginBottom: 14 }}
    onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.background = "rgba(20,35,64,0.95)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; } }}
    onMouseLeave={(e) => { e.currentTarget.style.background = C.navySoft; e.currentTarget.style.borderColor = C.navyLine; }}
  >
    {children}
  </div>
);

const DestHeader = ({ glyph, title, sub }: { glyph: string; title: string; sub: string }) => (
  <>
    <div className="flex items-center gap-3.5 mb-2.5">
      <div style={{ width: 36, height: 36, border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_DISPLAY, fontSize: 14, fontStyle: "italic", color: C.gold, flexShrink: 0, fontWeight: 500 }}>{glyph}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 600, color: C.paper, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</div>
    </div>
    <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 12, color: "rgba(244,241,234,0.55)", lineHeight: 1.4, marginBottom: 12 }}>{sub}</p>
  </>
);

const LogoChip = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="transition-all"
    style={{ padding: "4px 8px", cursor: "pointer", borderRadius: 2, background: "rgba(244,241,234,0.08)", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 50, height: 24, border: "none" }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(244,241,234,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 600, color: C.paper, letterSpacing: "0.02em" }}>{label}</span>
  </button>
);

const FlagChip = ({ code, flag, label, onClick }: { code: string; flag: string; label: string; onClick: () => void }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="relative group transition-all"
    style={{ fontSize: 18, lineHeight: 1, cursor: "pointer", padding: 4, borderRadius: 2, background: "transparent", border: "none" }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.transform = "scale(1.3)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
    title={label}
    data-country={code}
  >
    {flag}
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100"
      style={{ padding: "4px 8px", background: C.navy, border: `1px solid ${C.gold}`, color: C.paper, fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.1em", zIndex: 10 }}>
      {label}
    </span>
  </button>
);

const MechanismSection = ({ open }: { open: OpenDetail }) => {
  const keyCountries = ["FR","DE","US","GB","JP","CN","BE","NL","ES","KR"];
  const competitors = ["TR","IN","MX","VN","TN","EG","PL","CZ","TH","ZA","HU","SK","CL","BG","KE","LT","SN","RW"];
  return (
    <div style={{ background: C.navy, color: C.paper, padding: "80px clamp(20px,5vw,60px)", position: "relative", marginTop: 40 }}>
      <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)", opacity: 0.4 }} />

      {/* Mini-flow */}
      <div className="grid items-center gap-0 mx-auto mb-12 pb-12" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr", maxWidth: 920, borderBottom: "1px solid rgba(244,241,234,0.08)" }}>
        {[
          { num: "Phase 01", label: "Capter", desc: "Veille, DDD, BI, HumInt" },
          { num: "Phase 02", label: "Transformer", desc: "Infrastructure décisionnelle" },
          { num: "Phase 03", label: "Influencer", desc: "Diffusion & rayonnement" },
        ].map((s, i, arr) => (
          <>
            <div key={s.label} className="text-center px-4">
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", color: C.gold, marginBottom: 8 }}>{s.num}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 600, color: C.paper, marginBottom: 6, letterSpacing: "-0.01em" }}>{s.label}</div>
              <div style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 15, color: "rgba(244,241,234,0.6)", lineHeight: 1.4 }}>{s.desc}</div>
            </div>
            {i < arr.length - 1 && <div key={"a" + i} style={{ color: C.gold, fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 300, opacity: 0.6 }}>→</div>}
          </>
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>Workflow propriétaire</div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 600, color: C.paper, marginBottom: 14, letterSpacing: "-0.015em", lineHeight: 1.1 }}>
          Mécanisme de <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>Rayonnement & d'Attractivité</em>
        </h3>
        <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 18, color: "rgba(244,241,234,0.65)", maxWidth: 640, margin: "0 auto", lineHeight: 1.5 }}>
          Captation premium · Infrastructure décisionnelle Buildfluence · Diffusion vers un écosystème mondial.
        </p>
        <div style={{ marginTop: 20, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, opacity: 0.7 }}>▸ Cliquez sur un bloc pour explorer</div>
      </div>

      {/* Grille 3 colonnes */}
      <div className="grid items-start" style={{ gridTemplateColumns: "320px 1fr 320px", gap: 32, marginBottom: 32 }}>
        {/* COL GAUCHE — Back-Office */}
        <div>
          <div style={colLabel}>Back-Office · Captation</div>
          <SourceCard k="veille" glyph="i" title="Veille & Intelligence" tagline="Voir avant les autres. Détecter les signaux invisibles." tags={["6 dimensions","NLP","Temps réel"]} open={open} />
          <SourceCard k="ddd" glyph="ii" title="Deep Due Diligence" tagline="Sécuriser la décision dans des environnements incertains." mini={["OFAC","EU Sanctions","ICIJ","GAFI","PitchBook","D&B"]} open={open} />
          <SourceCard k="bi" glyph="iii" title="Business Intelligence" tagline="Lire la compétition avant qu'elle ne s'impose." mini={["Growth Lab","Statista","fDi","World Bank","Harvard"]} open={open} />
          <SourceCard k="humint" glyph="iv" title="HumInt — Intelligence Humaine" tagline="Activer le réseau qualifié. Comprendre les intentions réelles." tags={["Analystes terrain","Sources primaires"]} hum open={open} />
        </div>

        {/* COL CENTRE — BF Core */}
        <div className="flex flex-col items-center gap-6">
          <div style={{ ...colLabel, width: "100%" }}>Infrastructure Décisionnelle</div>
          <button
            onClick={() => open({ kind: "source", data: sourcesData["bf-core"] })}
            className="relative flex flex-col items-center justify-center transition-all"
            style={{
              width: 240, height: 240, borderRadius: "50%", background: C.paper,
              border: `2px solid rgba(201,168,76,0.4)`, cursor: "pointer",
              boxShadow: "0 0 0 8px rgba(201,168,76,0.05), 0 0 0 16px rgba(201,168,76,0.025)",
              animation: "bfPulse 3s ease-in-out infinite",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = "0 0 0 8px rgba(201,168,76,0.1), 0 0 0 16px rgba(201,168,76,0.05), 0 0 40px rgba(201,168,76,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; e.currentTarget.style.boxShadow = "0 0 0 8px rgba(201,168,76,0.05), 0 0 0 16px rgba(201,168,76,0.025)"; }}
          >
            <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontWeight: 600, fontSize: 56, color: C.navy, lineHeight: 1, letterSpacing: "-0.02em" }}><em style={{ color: C.gold, fontStyle: "italic" }}>B</em>F</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 600, color: C.navy, marginTop: 8, letterSpacing: "0.02em" }}>Buildfluence</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginTop: 4 }}>Operator</div>
          </button>

          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: C.gold, opacity: 0.6, lineHeight: 1 }}>↓</div>

          <div className="w-full text-center" style={{ background: "rgba(244,241,234,0.04)", border: "1px solid rgba(244,241,234,0.1)", padding: "28px 24px" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 17, color: C.gold, lineHeight: 1.35, marginBottom: 14, fontWeight: 400 }}>Une architecture conçue pour transformer l'information en pouvoir décisionnel.</p>
            <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 14, color: "rgba(244,241,234,0.7)", lineHeight: 1.5, marginBottom: 20 }}>Buildfluence ne livre pas des rapports volumineux. Buildfluence livre une capacité d'anticipation.</p>
            <ul className="list-none text-left">
              {["Voir ce que les autres ne voient pas","Décider avec un temps d'avance","Neutraliser les risques invisibles","Identifier les vrais leviers d'attractivité","Transformer la visibilité en influence réelle"].map((it, i, arr) => (
                <li key={it} style={{ fontSize: 12, color: "rgba(244,241,234,0.85)", padding: "8px 0 8px 18px", borderBottom: i === arr.length - 1 ? "none" : "1px solid rgba(244,241,234,0.06)", position: "relative", lineHeight: 1.4 }}>
                  <span style={{ position: "absolute", left: 0, color: C.gold }}>—</span>{it}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: C.gold, opacity: 0.6, lineHeight: 1 }}>↓</div>
          <div style={{ textAlign: "center", fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, opacity: 0.7 }}>Visibilité — Rayonnement — Influence</div>
        </div>

        {/* COL DROITE — Ecosystem */}
        <div>
          <div style={colLabel}>Ecosystem · Diffusion</div>

          <DestCard onClick={() => open({ kind: "dest", data: destData.amdie })}>
            <DestHeader glyph="i" title="AMDIE / MICEPP" sub="Agence d'Investissement & Ministère de tutelle" />
            <div className="flex flex-wrap gap-2 pt-2.5" style={{ borderTop: "1px solid rgba(244,241,234,0.08)" }}>
              <LogoChip label="AMDIE" onClick={() => open({ kind: "logo", data: logoData.amdie })} />
              <LogoChip label="MICEPP" onClick={() => open({ kind: "logo", data: logoData.micepp })} />
              <LogoChip label="Morocco Now" onClick={() => open({ kind: "logo", data: logoData.moroccoNow })} />
            </div>
          </DestCard>

          <DestCard onClick={() => open({ kind: "dest", data: destData.gouv })}>
            <DestHeader glyph="ii" title="Gouvernement Marocain" sub="Agences d'État · Instances publiques · CRI" />
          </DestCard>

          <DestCard>
            <DestHeader glyph="iii" title="Pays Clés" sub="10 partenaires stratégiques — cliquez un drapeau" />
            <div className="flex flex-wrap gap-1 mt-2">
              {keyCountries.map((c) => (
                <FlagChip key={c} code={c} flag={countries[c].flag} label={countries[c].name} onClick={() => open({ kind: "country", data: countries[c] })} />
              ))}
            </div>
          </DestCard>

          <DestCard>
            <DestHeader glyph="iv" title="Pays Concurrents" sub="18 territoires scorés — cliquez un drapeau" />
            <div className="flex flex-wrap gap-1 mt-2">
              {competitors.map((c) => (
                <FlagChip key={c} code={c} flag={countries[c].flag} label={`${countries[c].name} · ${countries[c].score}/10`} onClick={() => open({ kind: "country", data: countries[c] })} />
              ))}
            </div>
          </DestCard>

          <DestCard>
            <DestHeader glyph="v" title="Fédérations Sectorielles" sub="Partenaires & entreprises stratégiques — cliquez un acteur" />
            <div className="flex flex-wrap gap-2 pt-2.5" style={{ borderTop: "1px solid rgba(244,241,234,0.08)" }}>
              {Object.keys(fedData).map((k) => (
                <LogoChip key={k} label={k.toUpperCase()} onClick={() => open({ kind: "fed", key: k, data: fedData[k] })} />
              ))}
            </div>
          </DestCard>

          <DestCard>
            <DestHeader glyph="vi" title="Agences de Promotion d'Investissements" sub="Benchmark international — cliquez une agence" />
            <div className="flex flex-wrap gap-2 pt-2.5" style={{ borderTop: "1px solid rgba(244,241,234,0.08)" }}>
              {Object.entries(apiData).map(([k, v]) => (
                <LogoChip key={k} label={v.full.length > 14 ? k : v.full} onClick={() => open({ kind: "api", data: v })} />
              ))}
            </div>
          </DestCard>

          <DestCard>
            <DestHeader glyph="vii" title="Coopération Internationale" sub="Bailleurs & financeurs — cliquez une institution" />
            <div className="flex flex-wrap gap-2 pt-2.5" style={{ borderTop: "1px solid rgba(244,241,234,0.08)" }}>
              {Object.entries(coopData).map(([k, v]) => (
                <LogoChip key={k} label={k === "bm" ? "B. Mondiale" : k.toUpperCase()} onClick={() => open({ kind: "coop", data: v })} />
              ))}
            </div>
          </DestCard>

          <DestCard onClick={() => open({ kind: "dest", data: destData.medias })}>
            <DestHeader glyph="viii" title="Médias & Prescripteurs" sub="Leaders d'opinion · Diaspora · Journalistes" />
          </DestCard>
        </div>
      </div>

      {/* Footer 3 colonnes */}
      <div className="grid mt-8 pt-6" style={{ gridTemplateColumns: "320px 1fr 320px", gap: 32, borderTop: "1px solid rgba(244,241,234,0.08)" }}>
        {["Strategic Workflow · Veille & Intelligence","Infrastructure Décisionnelle Souveraine","Diffusion · Inter & Intra · National & International"].map((l) => (
          <div key={l} style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(244,241,234,0.4)", textAlign: "center" }}>{l}</div>
        ))}
      </div>

      <style>{`
        @keyframes bfPulse {
          0%, 100% { box-shadow: 0 0 0 8px rgba(201,168,76,0.05), 0 0 0 16px rgba(201,168,76,0.025); }
          50% { box-shadow: 0 0 0 12px rgba(201,168,76,0.08), 0 0 0 24px rgba(201,168,76,0.04); }
        }
        @media (max-width: 1100px) {
          .softpower-mech-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const colLabel: React.CSSProperties = {
  fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
  color: "rgba(244,241,234,0.5)", textAlign: "center", marginBottom: 24, paddingBottom: 16,
  borderBottom: "1px solid rgba(244,241,234,0.1)", position: "relative",
};

/* ═══════════════ SECTION 02 — 3 AXES ═══════════════ */
const AxisCard = ({ eyebrow, roman, title, tagline, viz, items }: {
  eyebrow: string; roman: string; title: string; tagline: string; viz: React.ReactNode; items: string[];
}) => (
  <article className="relative flex flex-col transition-all hover:-translate-y-1.5" style={{ background: C.navy, color: C.paper, padding: "44px 32px", border: `1px solid ${C.navyLine}`, minHeight: 520 }}>
    <span className="absolute top-0 left-0 transition-all" style={{ width: 40, height: 1, background: C.gold }} />
    <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 28 }}>{eyebrow}</div>
    <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 36, color: C.gold, lineHeight: 1, marginBottom: 20, fontWeight: 400 }}>{roman}</div>
    <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 600, color: C.paper, lineHeight: 1.1, marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h3>
    <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 17, color: "rgba(244,241,234,0.65)", marginBottom: 30, lineHeight: 1.45 }}>{tagline}</p>
    <div className="flex items-center justify-center" style={{ height: 130, marginBottom: 26, border: "1px solid rgba(244,241,234,0.08)", background: "rgba(244,241,234,0.02)", padding: 18 }}>{viz}</div>
    <ul className="list-none mt-auto pt-5" style={{ borderTop: "1px solid rgba(244,241,234,0.1)" }}>
      {items.map((it) => (
        <li key={it} style={{ fontSize: 13, color: "rgba(244,241,234,0.78)", padding: "6px 0 6px 16px", lineHeight: 1.5, position: "relative" }}>
          <span style={{ position: "absolute", left: 0, color: C.gold }}>—</span>{it}
        </li>
      ))}
    </ul>
  </article>
);

const AxesSection = () => (
  <section className="mt-32">
    <SectionHeader num="ii" eyebrow="Trois axes pour peser sur votre écosystème" intro="Chaque axe activable seul ou en combinaison. La somme structure votre soft power. La séquence le rend opérationnel.">
      Activer les <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>leviers</em> qui déplacent les décisions.
    </SectionHeader>
    <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      <AxisCard
        eyebrow="S/I — Influence Intelligence" roman="I" title="Intelligence d'Influence"
        tagline="Orienter les perceptions avant qu'elles ne deviennent des décisions."
        viz={
          <svg viewBox="0 0 240 110" width="100%" height="100%">
            <line x1="120" y1="55" x2="40" y2="25" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="40" y2="85" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="200" y2="25" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="200" y2="85" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="80" y2="55" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <line x1="120" y1="55" x2="160" y2="55" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
            <circle cx="40" cy="25" r="4" fill="#C9A84C" opacity="0.7" />
            <circle cx="40" cy="85" r="4" fill="#C9A84C" opacity="0.7" />
            <circle cx="200" cy="25" r="4" fill="#C9A84C" opacity="0.7" />
            <circle cx="200" cy="85" r="4" fill="#C9A84C" opacity="0.7" />
            <circle cx="80" cy="55" r="3" fill="#F4F1EA" opacity="0.6" />
            <circle cx="160" cy="55" r="3" fill="#F4F1EA" opacity="0.6" />
            <circle cx="120" cy="55" r="11" fill="none" stroke="#C9A84C" strokeWidth="1" />
            <circle cx="120" cy="55" r="5" fill="#C9A84C" />
            <text x="120" y="102" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#F4F1EA" opacity="0.5" letterSpacing="1">NARRATIVE NODES</text>
          </svg>
        }
        items={[
          "Mapping des leaders d'opinion & relais médiatiques",
          "Identification des nœuds d'amplification narrative",
          "Cartographie alliances & rivalités narratives",
          "Synchronisation messages / relais / timing",
        ]}
      />
      <AxisCard
        eyebrow="S/II — Political Intelligence" roman="II" title="Political Intelligence"
        tagline="Prendre un temps d'avance sur votre écosystème décisionnel."
        viz={
          <svg viewBox="0 0 240 110" width="100%" height="100%">
            <line x1="120" y1="15" x2="120" y2="100" stroke="#F4F1EA" strokeWidth="0.3" opacity="0.3" strokeDasharray="2,2" />
            <line x1="20" y1="55" x2="220" y2="55" stroke="#F4F1EA" strokeWidth="0.3" opacity="0.3" strokeDasharray="2,2" />
            <text x="20" y="18" fontFamily="JetBrains Mono" fontSize="6" fill="#F4F1EA" opacity="0.4" letterSpacing="0.5">+ POUVOIR</text>
            <text x="220" y="108" textAnchor="end" fontFamily="JetBrains Mono" fontSize="6" fill="#F4F1EA" opacity="0.4" letterSpacing="0.5">+ INTÉRÊT</text>
            <circle cx="180" cy="28" r="6" fill="#C9A84C" />
            <circle cx="160" cy="38" r="5" fill="#C9A84C" opacity="0.7" />
            <circle cx="140" cy="44" r="4" fill="#C9A84C" opacity="0.5" />
            <circle cx="195" cy="46" r="4" fill="#C9A84C" opacity="0.6" />
            <circle cx="80" cy="32" r="4" fill="#F4F1EA" opacity="0.5" />
            <circle cx="60" cy="70" r="3" fill="#F4F1EA" opacity="0.4" />
            <circle cx="170" cy="78" r="3" fill="#F4F1EA" opacity="0.4" />
            <circle cx="100" cy="82" r="2" fill="#F4F1EA" opacity="0.3" />
            <rect x="130" y="18" width="80" height="38" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,3" />
            <text x="170" y="14" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="#C9A84C" opacity="0.7" letterSpacing="1">ZONE CRITIQUE</text>
          </svg>
        }
        items={[
          "Cartographie des décideurs publics clés",
          "Lecture chaînes de décision formelles & informelles",
          "Identification points de blocage & leviers",
          "Production d'un Baromètre politique actionnable",
        ]}
      />
      <AxisCard
        eyebrow="S/III — Territorial Lab" roman="III" title="Territorial Influence Lab"
        tagline="Piloter votre territoire vers l'attractivité et l'influence."
        viz={
          <svg viewBox="0 0 240 110" width="100%" height="100%">
            <path d="M 20 35 Q 40 25, 60 35 L 70 55 Q 50 65, 30 60 Z" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="0.5" />
            <path d="M 90 30 Q 130 25, 160 35 L 170 60 Q 130 70, 90 55 Z" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="0.5" />
            <path d="M 180 40 Q 210 30, 225 45 L 220 70 Q 195 75, 180 65 Z" fill="#C9A84C" opacity="0.15" stroke="#C9A84C" strokeWidth="0.5" />
            <circle cx="50" cy="47" r="3" fill="#C9A84C" />
            <circle cx="125" cy="45" r="4" fill="#C9A84C" />
            <circle cx="200" cy="55" r="3" fill="#C9A84C" />
            <path d="M 50 47 Q 90 30, 125 45" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.6" />
            <path d="M 125 45 Q 165 30, 200 55" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.6" />
            <text x="120" y="95" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="#F4F1EA" opacity="0.4" letterSpacing="1">TERRITORIAL FOOTPRINT</text>
          </svg>
        }
        items={[
          "Captation de l'intérêt des investisseurs",
          "Benchmark pays / régions concurrentes",
          "Stratégie de présence dans les forums internationaux",
          "Activation de think tanks & leaders d'opinion",
        ]}
      />
    </div>
  </section>
);

/* ═══════════════ SECTION 03 — CASE FILE OBSERVATOIRE ═══════════════ */
const CaseFileSection = () => (
  <section className="mt-32">
    <SectionHeader num="iii" eyebrow="Cas concret · Réalisation Buildfluence" intro="Un dispositif d'intelligence permanent au service de l'attractivité économique nationale. Une démonstration concrète de ce que le mécanisme produit quand il s'incarne dans un projet structurant.">
      L'Observatoire <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>d'Investissement</em>.
    </SectionHeader>

    <div className="relative" style={{ background: C.navy, color: C.paper, padding: "80px clamp(24px,4vw,64px)", border: `1px solid ${C.navyLine}` }}>
      <span className="absolute" style={{ top: 0, left: 0, width: 80, height: 1, background: C.gold }} />
      <span className="absolute" style={{ bottom: 0, right: 0, width: 80, height: 1, background: C.gold }} />

      <div className="grid items-start gap-14" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 16 }}>Pièce au dossier</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 80, color: C.gold, lineHeight: 1, marginBottom: 28, fontWeight: 400 }}>III</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 600, color: C.paper, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.015em" }}>Observer pour <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>devancer</em>.</h3>
          <p style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 19, color: "rgba(244,241,234,0.85)", lineHeight: 1.5 }}>
            Une infrastructure de veille permanente sur les flux d'investissement, les pays concurrents et les dynamiques narratives — pour transformer la promotion économique nationale en arme de précision.
          </p>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(244,241,234,0.5)", marginTop: 24 }}>— Méthodologie Buildfluence · Architecture propriétaire</div>
        </div>

        <div>
          {[
            { h: "Les piliers du projet", p: <>Veille concurrentielle continue sur 18 territoires, mapping des décideurs économiques dans 10 pays partenaires, monitoring narratif et anticipation des dynamiques d'opinion, production d'un <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>Baromètre d'Investissement actionnable</em> par les opérateurs publics et privés.</> },
            { h: "La maîtrise Buildfluence", p: <>Une <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>infrastructure technologique souveraine</em> couplée à une équipe d'analystes spécialisés. Croisement OSINT + HumInt + BI + IA augmentée. Capacité à délivrer en continu une <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>longueur d'avance stratégique</em> sur l'ensemble du périmètre couvert.</> },
            { h: "L'impact opérationnel", p: <>Les missions d'attractivité deviennent des <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>opérations chirurgicales</em>, briefées par de la donnée fraîche. La promotion économique passe de campagne ponctuelle à <em style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", color: C.paper }}>infrastructure d'influence permanente</em>. Chaque décideur public dispose d'un cockpit dédié.</> },
          ].map((b) => (
            <div key={b.h} className="mb-7">
              <h4 style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>{b.h}</h4>
              <p style={{ fontSize: 15, color: "rgba(244,241,234,0.85)", lineHeight: 1.65 }}>{b.p}</p>
            </div>
          ))}

          <div className="grid grid-cols-3 gap-5 pt-8 mt-8" style={{ borderTop: "1px solid rgba(244,241,234,0.1)" }}>
            {[
              { num: "10", label: "Pays partenaires\ncartographiés" },
              { num: "18", label: "Concurrents\nscorés en continu" },
              { num: "∞", label: "Veille narrative\npermanente" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 600, color: C.gold, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,241,234,0.6)", lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-6" style={{ padding: "20px 24px", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, marginBottom: 6 }}>Espace Client · Bientôt accessible</div>
              <div style={{ fontFamily: FONT_ITALIC, fontStyle: "italic", fontSize: 16, color: C.paper, lineHeight: 1.4 }}>Une page dédiée détaillera l'ensemble du dispositif, sa méthodologie et ses livrables.</div>
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, padding: "10px 16px", border: `1px solid ${C.gold}`, whiteSpace: "nowrap" }}>→ Accès réservé</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════ SECTION 04 — POCS ═══════════════ */
const POCS = [
  { num: "i", eyebrow: "Express", title: "POC Express", duration: "— 2 à 4 semaines", desc: "Cartographie d'influence ciblée sur un sujet, un territoire ou un dossier. Livrable opérationnel rapide pour valider la pertinence de la démarche avant déploiement large." },
  { num: "ii", eyebrow: "Pilot", title: "Pilot Programme", duration: "— 2 à 4 mois", desc: "Déploiement structuré sur un périmètre élargi. Combinaison Veille + DDD + BI + HumInt avec dashboards mensuels et points stratégiques réguliers." },
  { num: "iii", eyebrow: "Infrastructure", title: "Infrastructure Souveraine", duration: "— Engagement annuel", desc: "Mise en place d'un dispositif d'intelligence permanent. Observatoire dédié, équipe d'analystes, infrastructure technologique sur-mesure intégrée à vos process décisionnels." },
];

const PocsSection = () => (
  <section className="mt-32">
    <SectionHeader num="iv" eyebrow="Modélisations & POCs" intro="Du test rapide à l'infrastructure complète. Choisissez le format adapté à votre maturité — chacun est conçu pour produire un résultat tangible dès le premier mois.">
      Trois portes d'entrée pour <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>activer</em>.
    </SectionHeader>
    <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      {POCS.map((p) => (
        <article key={p.num} className="relative overflow-hidden transition-all hover:-translate-y-1" style={{ background: C.paperDeep, border: `1px solid ${C.line}`, padding: "40px 32px" }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 64, color: C.gold, lineHeight: 0.9, marginBottom: 20, fontWeight: 400 }}>{p.num}</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.inkMute, marginBottom: 8 }}>{p.eyebrow}</div>
          <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 600, color: C.navy, marginBottom: 14, lineHeight: 1.15, letterSpacing: "-0.01em" }}>{p.title}</h4>
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.gold, marginBottom: 18, letterSpacing: "0.05em" }}>{p.duration}</div>
          <p style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.65 }}>{p.desc}</p>
        </article>
      ))}
    </div>
  </section>
);

/* ═══════════════ CHUTE FINALE ═══════════════ */
const CLOSINGS = [
  { key: "a", label: "Compétitivité", title: <>Quand vos concurrents <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>réagissent</em>,<br />vous avez déjà pris une longueur d'avance.</> },
  { key: "b", label: "Attractivité", title: <>Capter, transformer, <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>influencer</em>.<br />Le triptyque d'une souveraineté décisionnelle.</> },
  { key: "c", label: "Rayonnement", title: <>Le rayonnement <em style={{ fontStyle: "normal", color: C.gold, fontWeight: 600 }}>ne se proclame pas</em>.<br />Il se construit, s'orchestre, se mesure.</> },
];

const ClosingSection = () => {
  const [opt, setOpt] = useState("a");
  const current = CLOSINGS.find((c) => c.key === opt)!;
  return (
    <section className="relative mt-32 text-center" style={{ background: C.navy, color: C.paper, padding: "120px clamp(24px,5vw,60px)" }}>
      <span className="absolute left-1/2 -translate-x-1/2" style={{ top: 60, width: 80, height: 1, background: C.gold }} />
      <span className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 60, width: 80, height: 1, background: C.gold }} />

      <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: 28 }}>Pilier II — Soft Power & Influence / Synthèse</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-7 text-left"
          style={{ maxWidth: 920, padding: "24px 32px", border: "1px solid rgba(201,168,76,0.25)", background: "rgba(201,168,76,0.02)" }}
        >
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>{current.label}</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, color: C.paper, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{current.title}</h3>
        </motion.div>
      </AnimatePresence>

      <div className="inline-flex gap-2 mt-6 p-1.5" style={{ border: "1px solid rgba(244,241,234,0.15)", borderRadius: 2 }}>
        {CLOSINGS.map((c) => (
          <button
            key={c.key}
            onClick={() => setOpt(c.key)}
            className="transition-all"
            style={{
              padding: "8px 16px", background: opt === c.key ? C.gold : "transparent", border: "none", cursor: "pointer",
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
              color: opt === c.key ? C.navy : "rgba(244,241,234,0.5)", fontWeight: opt === c.key ? 600 : 400,
            }}
          >{c.label}</button>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════ MAIN PAGE ═══════════════ */
const SoftPowerInfluence = () => {
  const [detail, setDetail] = useState<DetailKind | null>(null);
  const open: OpenDetail = (d) => setDetail(d);
  const close = () => setDetail(null);

  useEffect(() => {
    document.title = "Soft Power & Influence — Buildfluence";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Pilier II — Capter, transformer, influencer. Mécanisme propriétaire de rayonnement et d'attractivité Buildfluence.";
    if (meta) meta.setAttribute("content", desc);
  }, []);

  return (
    <DetailPageLayout
      title={<>Soft Power & <em style={{ fontStyle: "italic", color: "#C9A84C", fontWeight: 400 }}>Influence</em></>}
      chapeau={<span style={{ color: C.inkSoft, fontFamily: FONT_ITALIC, fontStyle: "italic" }}>Structurer et piloter les dynamiques d'influence pour transformer votre position en avantage compétitif durable.</span>}
      ctas={[{ label: "Parler de mon projet", action: "#", formType: "f1" }]}
      situationContext="Soft Power & Influence"
      sidebar={<Signaletique />}
    >
      {/* SECTION 01 — Mécanisme */}
      <section>
        <SectionHeader num="i" eyebrow="Mécanisme d'Attractivité & d'Influence" intro="Trois temps qui structurent l'intelligence stratégique. Une infrastructure souveraine au centre. Un écosystème de diffusion qui rayonne du Maroc vers le monde — et inversement.">
          Capter, transformer, <em style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}>influencer</em>.
        </SectionHeader>
        <MechanismSection open={open} />
      </section>

      <AxesSection />
      <CaseFileSection />
      <PocsSection />
      <ClosingSection />

      <DetailModal detail={detail} onClose={close} />
    </DetailPageLayout>
  );
};

export default SoftPowerInfluence;
