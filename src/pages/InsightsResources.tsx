import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

type Filter =
  | "all"
  | "barometre"
  | "veille-sport"
  | "intelligence-economique"
  | "nation-branding"
  | "threat-intelligence";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "barometre", label: "Baromètre" },
  { value: "veille-sport", label: "Veille Sport" },
  { value: "intelligence-economique", label: "Intelligence Économique" },
  { value: "nation-branding", label: "Nation Branding" },
  { value: "threat-intelligence", label: "Threat Intelligence" },
];

type Card = {
  id: string;
  filter: Exclude<Filter, "all">;
  variant: "featured" | "light";
  category: string;
  badge?: string;
  title: string;
  lead: string;
  meta?: string;
  stats?: string[];
  date?: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
};

const CARDS: Card[] = [
  {
    id: "barometre-sep-2025",
    filter: "barometre",
    variant: "featured",
    category: "Baromètre",
    badge: "Nouveau",
    title: "Baromètre d'Investissement — Sep 2025",
    lead:
      "Vietnam, Afrique du Sud, Mexique… Le Maroc peut-il rivaliser ? 9 secteurs, 24 600 données, 18 pays concurrents analysés.",
    stats: ["24,6k MENTIONS", "18 PAYS", "9 SECTEURS", "31 JOURS"],
    date: "Sep 2025",
    primaryCta: { label: "Accéder au Baromètre →", href: "/barometre" },
  },
  {
    id: "raja-club-athletic",
    filter: "veille-sport",
    variant: "light",
    category: "Veille Sport",
    badge: "Veille sous pression",
    title:
      "Raja Club Athletic : quand la veille stratégique devient un bouclier institutionnel",
    lead:
      "Comment le premier club de football marocain a transformé la pression médiatique en avantage décisionnel grâce à une cellule de veille souveraine.",
    meta:
      "Secteur : Football professionnel · Marché : Maroc · Afrique · Période : Juil. 2025 — Mai 2026",
    primaryCta: { label: "Lire le cas →", href: "/Cas_client_RCA_v2.html", external: true },
    secondaryCta: { label: "Télécharger en PDF ↓", href: "/Cas_client_RCA_v2.html?print=true", external: true },
  },
];

const InsightsResources = () => {
  const [active, setActive] = useState<Filter>("all");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const visible = useMemo(
    () => (active === "all" ? CARDS : CARDS.filter((c) => c.filter === active)),
    [active]
  );

  const handlePrimary = (card: Card) => {
    if (card.primaryCta.external) {
      window.open(card.primaryCta.href, "_blank", "noopener,noreferrer");
    } else {
      navigate(card.primaryCta.href);
      window.scrollTo(0, 0);
    }
  };

  const handleSecondary = (card: Card) => {
    if (!card.secondaryCta) return;
    const w = window.open(card.secondaryCta.href, "_blank", "noopener,noreferrer");
    if (w && card.secondaryCta.href.includes("print=true")) {
      w.addEventListener("load", () => {
        try { w.print(); } catch { /* noop */ }
      });
    }
  };

  return (
    <div className="ir-page">
      <Navbar />
      <style>{`
  .ir-page {
    --bf-navy: #0D1B2A;
    --bf-navy-soft: #1E2C3F;
    --bf-ink: #1A1A1A;
    --bf-ink-soft: #3A3A3A;
    --bf-ink-muted: #6B6B6B;
    --bf-paper: #FAF7F1;
    --bf-paper-deep: #D9CFBC;
    --bf-ivory: #F4F1EA;
    --bf-gold: #C9A84C;
    --bf-gold-soft: #D9BC6A;
    background: var(--bf-paper);
    color: var(--bf-ink);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    line-height: 1.55;
    min-height: 100vh;
  }
  .ir-hero { max-width: 1200px; margin: 0 auto; padding: 140px 40px 40px; }
  .ir-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 16px; }
  .ir-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 48px; color: var(--bf-navy); line-height: 1.1; margin: 0 0 18px; max-width: 900px; }
  .ir-title em { font-style: italic; color: var(--bf-gold); font-weight: 400; }
  .ir-chapeau { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 21px; color: var(--bf-ink-soft); max-width: 760px; line-height: 1.4; margin: 0; }

  .ir-filters { max-width: 1200px; margin: 28px auto 0; padding: 0 40px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  .ir-filter-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-ink-muted); margin-right: 12px; }
  .ir-filter-btn { background: transparent; border: 1px solid var(--bf-paper-deep); color: var(--bf-ink-soft); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; padding: 7px 14px; cursor: pointer; border-radius: 2px; transition: all 0.15s ease; letter-spacing: 0.02em; }
  .ir-filter-btn:hover { border-color: var(--bf-gold); color: var(--bf-navy); }
  .ir-filter-btn.active { background: var(--bf-navy); border-color: var(--bf-navy); color: var(--bf-gold); font-weight: 500; }

  .ir-grid { max-width: 1200px; margin: 36px auto 0; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .ir-card { border-radius: 2px; padding: 32px; display: flex; flex-direction: column; transition: transform 0.25s ease, box-shadow 0.25s ease; position: relative; min-height: 360px; }
  .ir-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(201,168,76,0.1); }
  .ir-card.featured { background: var(--bf-navy); color: var(--bf-ivory); grid-column: span 2; }
  .ir-card.light { background: #FFFFFF; border: 1px solid var(--bf-paper-deep); color: var(--bf-ink); grid-column: span 1; }

  .ir-cat { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 14px; }
  .ir-badge { position: absolute; top: 20px; right: 20px; font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-navy); background: var(--bf-gold); padding: 5px 10px; border-radius: 2px; }
  .ir-badge.outline { background: transparent; border: 1px solid var(--bf-gold); color: var(--bf-gold); position: static; display: inline-block; margin-bottom: 12px; }

  .ir-card-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 26px; line-height: 1.2; margin: 0 0 14px; }
  .ir-card.featured .ir-card-title { color: var(--bf-ivory); }
  .ir-card.light .ir-card-title { color: var(--bf-navy); font-size: 22px; }

  .ir-card-lead { font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.55; margin: 0 0 18px; }
  .ir-card.featured .ir-card-lead { color: rgba(244, 241, 234, 0.78); }
  .ir-card.light .ir-card-lead-italic { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 17px; color: var(--bf-ink-soft); line-height: 1.45; margin: 0 0 18px; }

  .ir-stats { display: flex; flex-wrap: wrap; gap: 18px; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: var(--bf-gold-soft); margin-bottom: 22px; padding: 12px 0; border-top: 1px solid rgba(201,168,76,0.25); border-bottom: 1px solid rgba(201,168,76,0.25); }

  .ir-meta { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--bf-ink-muted); line-height: 1.7; margin: 0 0 18px; }

  .ir-actions { margin-top: auto; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
  .ir-btn { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; padding: 12px 20px; border-radius: 2px; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; text-decoration: none; display: inline-block; }
  .ir-btn-gold { background: var(--bf-gold); color: var(--bf-navy); }
  .ir-btn-gold:hover { background: var(--bf-gold-soft); }
  .ir-btn-navy { background: var(--bf-navy); color: var(--bf-ivory); }
  .ir-btn-navy:hover { background: var(--bf-navy-soft); }
  .ir-link-gold { background: transparent; color: var(--bf-gold); padding: 12px 4px; }
  .ir-link-gold:hover { color: var(--bf-navy); }

  .ir-date { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(244,241,234,0.55); margin-left: auto; }

  .ir-newsletter { max-width: 1200px; margin: 56px auto 80px; padding: 0 40px; }
  .ir-newsletter-inner { background: var(--bf-navy); color: var(--bf-ivory); border-radius: 2px; padding: 56px 48px; }
  .ir-news-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 14px; }
  .ir-news-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 34px; color: var(--bf-ivory); line-height: 1.15; margin: 0 0 12px; max-width: 720px; }
  .ir-news-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 19px; color: rgba(244,241,234,0.78); margin: 0 0 24px; max-width: 640px; }
  .ir-news-form { display: flex; gap: 10px; max-width: 560px; flex-wrap: wrap; }
  .ir-news-input { flex: 1 1 280px; background: rgba(255,255,255,0.06); border: 1px solid rgba(201,168,76,0.4); color: var(--bf-ivory); font-family: 'DM Sans', sans-serif; font-size: 14px; padding: 13px 16px; border-radius: 2px; outline: none; }
  .ir-news-input:focus { border-color: var(--bf-gold); }
  .ir-news-note { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(244,241,234,0.5); margin-top: 16px; }

  @media (max-width: 980px) {
    .ir-grid { grid-template-columns: 1fr; }
    .ir-card.featured, .ir-card.light { grid-column: span 1; }
    .ir-title { font-size: 36px; }
    .ir-news-title { font-size: 26px; }
    .ir-newsletter-inner { padding: 36px 28px; }
  }
      `}</style>

      <section className="ir-hero">
        <div className="ir-eyebrow">Intelligence · Ressources · Analyses</div>
        <h1 className="ir-title">
          Insights & <em>Resources</em>
        </h1>
        <p className="ir-chapeau">
          Décryptages stratégiques, baromètres d'investissement et analyses de compétitivité pour décider avant les autres.
        </p>
      </section>

      <section className="ir-filters" aria-label="Filtres thématiques">
        <span className="ir-filter-label">Thématique</span>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`ir-filter-btn ${active === f.value ? "active" : ""}`}
          >
            {f.label}
          </button>
        ))}
      </section>

      <section className="ir-grid">
        {visible.map((card) => (
          <article key={card.id} className={`ir-card ${card.variant}`}>
            {card.variant === "featured" && card.badge && (
              <span className="ir-badge">{card.badge}</span>
            )}
            <div className="ir-cat">{card.category}</div>
            {card.variant === "light" && card.badge && (
              <span className="ir-badge outline">{card.badge}</span>
            )}
            <h2 className="ir-card-title">{card.title}</h2>
            {card.variant === "light" ? (
              <p className="ir-card-lead-italic">{card.lead}</p>
            ) : (
              <p className="ir-card-lead">{card.lead}</p>
            )}
            {card.stats && (
              <div className="ir-stats">
                {card.stats.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            )}
            {card.meta && <p className="ir-meta">{card.meta}</p>}
            <div className="ir-actions">
              <button
                className={`ir-btn ${card.variant === "featured" ? "ir-btn-gold" : "ir-btn-navy"}`}
                onClick={() => handlePrimary(card)}
              >
                {card.primaryCta.label}
              </button>
              {card.secondaryCta && (
                <button
                  className="ir-btn ir-link-gold"
                  onClick={() => handleSecondary(card)}
                >
                  {card.secondaryCta.label}
                </button>
              )}
              {card.date && card.variant === "featured" && (
                <span className="ir-date">{card.date}</span>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="ir-newsletter">
        <div className="ir-newsletter-inner">
          <div className="ir-news-eyebrow">Newsletter · Baromètre</div>
          <h2 className="ir-news-title">Recevez le prochain Baromètre en avant-première</h2>
          <p className="ir-news-sub">
            Décryptages exclusifs et analyses concurrentielles — chaque mois.
          </p>
          <form
            className="ir-news-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              alert("Merci ! Votre inscription a bien été prise en compte.");
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@exemple.com"
              className="ir-news-input"
              aria-label="Adresse e-mail"
            />
            <button type="submit" className="ir-btn ir-btn-gold">
              Je m'inscris →
            </button>
          </form>
          <p className="ir-news-note">Aucun spam · Données protégées · Désabonnement en 1 clic</p>
        </div>
      </section>

      <CTAFooter />
    </div>
  );
};

export default InsightsResources;
