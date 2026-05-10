import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { FormStrategicExchange } from "@/components/FormModals";
import barometreCover from "@/assets/barometre-cover.png";
import rcaGradins from "@/assets/rca-gradins.png";
import rcaEquipe from "@/assets/rca-equipe.png";

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
  category: string;
  date: string;
  title: string;
  summary: string;
  href: string;
  image?: string;
  logo?: string;
  gradient?: string;
  overlayImage?: string;
};

const CARDS: Card[] = [
  {
    id: "barometre-sep-2025",
    filter: "barometre",
    category: "Baromètre",
    date: "Sep 2025",
    title: "Baromètre d'Investissement — Sep 2025",
    summary:
      "Vietnam, Afrique du Sud, Mexique… Le Maroc peut-il rivaliser ? 9 secteurs, 24 600 données, 18 pays concurrents analysés sur 31 jours d'observation continue.",
    href: "/barometre",
    image: barometreCover,
  },
  {
    id: "raja-club-athletic",
    filter: "veille-sport",
    category: "Veille Sport",
    date: "Juil. 2026 - Mars 2027",
    title: "Raja Club Athletic : la veille comme bouclier institutionnel",
    summary:
      "Comment le premier club de football marocain a transformé la pression médiatique en avantage décisionnel grâce à une cellule de veille souveraine. Période : Juil. 2026 - Mars 2027.",
    href: "/Cas_client_RCA_v2.html",
    image: rcaGradins,
    overlayImage: rcaEquipe,
  },
];

const InsightsResources = () => {
  const [active, setActive] = useState<Filter>("all");
  const [email, setEmail] = useState("");

  const visible = useMemo(
    () => (active === "all" ? CARDS : CARDS.filter((c) => c.filter === active)),
    [active]
  );

  const openCard = (card: Card) => {
    window.open(card.href, "_blank", "noopener,noreferrer");
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
  .ir-hero { max-width: 1400px; margin: 0 auto; padding: 140px 40px 40px; }
  .ir-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 16px; }
  .ir-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 48px; color: var(--bf-navy); line-height: 1.1; margin: 0 0 18px; max-width: 900px; }
  .ir-title em { font-style: italic; color: var(--bf-gold); font-weight: 400; }
  .ir-chapeau { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 21px; color: var(--bf-ink-soft); max-width: 760px; line-height: 1.4; margin: 0; }

  .ir-filters { max-width: 1400px; margin: 28px auto 0; padding: 0 40px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  .ir-filter-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bf-ink-muted); margin-right: 12px; }
  .ir-filter-btn { background: transparent; border: 1px solid var(--bf-paper-deep); color: var(--bf-ink-soft); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; padding: 7px 14px; cursor: pointer; border-radius: 2px; transition: all 0.15s ease; letter-spacing: 0.02em; }
  .ir-filter-btn:hover { border-color: var(--bf-gold); color: var(--bf-navy); }
  .ir-filter-btn.active { background: var(--bf-navy); border-color: var(--bf-navy); color: var(--bf-gold); font-weight: 500; }

  .ir-grid { max-width: 1400px; margin: 36px auto 0; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

  /* BCG-style card */
  .ir-card {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    aspect-ratio: 4 / 5;
    cursor: pointer;
    background: var(--bf-navy);
    box-shadow: 0 4px 18px rgba(13, 27, 42, 0.08);
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
  }
  .ir-card:hover { transform: translateY(-6px); box-shadow: 0 18px 44px rgba(13, 27, 42, 0.18); }

  .ir-card-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .ir-card:hover .ir-card-bg { transform: scale(1.06); }

  .ir-card-shade {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(13,27,42,0) 0%, rgba(13,27,42,0.15) 45%, rgba(13,27,42,0.85) 100%);
  }

  .ir-card-content {
    position: absolute; left: 0; right: 0; bottom: 0;
    padding: 26px 26px 28px;
    color: var(--bf-ivory);
    z-index: 2;
  }
  .ir-card-cat {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 600; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--bf-navy);
    background: var(--bf-gold);
    padding: 5px 10px;
    border-radius: 2px;
    margin-bottom: 14px;
  }
  .ir-card-date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(244,241,234,0.78);
    margin-bottom: 8px;
  }
  .ir-card-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 22px;
    line-height: 1.22;
    color: var(--bf-ivory);
    margin: 0;
  }

  /* Hover overlay (frosted) */
  .ir-card-overlay {
    position: absolute; left: 0; right: 0; bottom: 0;
    height: 0;
    overflow: hidden;
    background: rgba(13, 27, 42, 0.78);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid rgba(201, 168, 76, 0.35);
    transition: height 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
    z-index: 3;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 26px;
  }
  .ir-card:hover .ir-card-overlay { height: 100%; padding: 28px 26px; }

  .ir-overlay-inner {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease 0.15s, transform 0.4s ease 0.15s;
    color: var(--bf-ivory);
  }
  .ir-card:hover .ir-overlay-inner { opacity: 1; transform: translateY(0); }

  .ir-overlay-cat {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 600; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--bf-gold);
    margin-bottom: 10px;
  }
  .ir-overlay-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700; font-size: 22px; line-height: 1.22;
    color: var(--bf-ivory); margin: 0 0 14px;
  }
  .ir-overlay-summary {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; line-height: 1.55;
    color: rgba(244, 241, 234, 0.86);
    margin: 0 0 22px;
  }
  .ir-learn-more {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--bf-gold); color: var(--bf-navy);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 12px 18px;
    border: none; border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .ir-learn-more:hover { background: var(--bf-gold-soft); }

  /* Logo card variant (Raja) */
  .ir-card-logo-wrap {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    padding: 40px;
  }
  .ir-card-logo {
    max-width: 60%; max-height: 55%;
    object-fit: contain;
    filter: drop-shadow(0 6px 18px rgba(0,0,0,0.25));
  }

  .ir-newsletter { max-width: 1400px; margin: 56px auto 80px; padding: 0 40px; }
  .ir-newsletter-inner { background: var(--bf-navy); color: var(--bf-ivory); border-radius: 2px; padding: 56px 48px; }
  .ir-news-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bf-gold); margin-bottom: 14px; }
  .ir-news-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 34px; color: var(--bf-ivory); line-height: 1.15; margin: 0 0 12px; max-width: 720px; }
  .ir-news-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 19px; color: rgba(244,241,234,0.78); margin: 0 0 24px; max-width: 640px; }
  .ir-news-form { display: flex; gap: 10px; max-width: 560px; flex-wrap: wrap; }
  .ir-news-input { flex: 1 1 280px; background: rgba(255,255,255,0.06); border: 1px solid rgba(201,168,76,0.4); color: var(--bf-ivory); font-family: 'DM Sans', sans-serif; font-size: 14px; padding: 13px 16px; border-radius: 2px; outline: none; }
  .ir-news-input:focus { border-color: var(--bf-gold); }
  .ir-news-note { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(244,241,234,0.5); margin-top: 16px; }
  .ir-btn-gold { background: var(--bf-gold); color: var(--bf-navy); font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; padding: 12px 20px; border-radius: 2px; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; }
  .ir-btn-gold:hover { background: var(--bf-gold-soft); }

  @media (max-width: 1100px) {
    .ir-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 700px) {
    .ir-grid { grid-template-columns: 1fr; }
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
          <article
            key={card.id}
            className="ir-card"
            onClick={() => openCard(card)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") openCard(card); }}
          >
            {card.image ? (
              <div
                className="ir-card-bg"
                style={{ backgroundImage: `url(${card.image})` }}
                aria-hidden
              />
            ) : (
              <>
                <div
                  className="ir-card-bg"
                  style={{ background: card.gradient ?? "linear-gradient(135deg,#0D1B2A,#1E2C3F)" }}
                  aria-hidden
                />
                {card.logo && (
                  <div className="ir-card-logo-wrap" aria-hidden>
                    <img src={card.logo} alt="" className="ir-card-logo" />
                  </div>
                )}
              </>
            )}
            <div className="ir-card-shade" aria-hidden />
            <div className="ir-card-content">
              <span className="ir-card-cat">{card.category}</span>
              <div className="ir-card-date">{card.date}</div>
              <h2 className="ir-card-title">{card.title}</h2>
            </div>

            <div className="ir-card-overlay" aria-hidden>
              <div className="ir-overlay-inner">
                <div className="ir-overlay-cat">{card.category} · {card.date}</div>
                <h3 className="ir-overlay-title">{card.title}</h3>
                <p className="ir-overlay-summary">{card.summary}</p>
                <button
                  type="button"
                  className="ir-learn-more"
                  onClick={(e) => { e.stopPropagation(); openCard(card); }}
                >
                  Learn more →
                </button>
              </div>
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
            <button type="submit" className="ir-btn-gold">
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
