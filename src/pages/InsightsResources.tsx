import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Pub = {
  id: string;
  category: string;
  title: string;
  excerpt?: string;
  date: string;
  readTime?: string;
  badge?: string;
  featured?: boolean;
  ctaLabel?: string;
  ctaRoute?: string;
  stats?: { value: string; label: string }[];
};

const CATEGORIES = ["Tous", "Baromètre", "Analyse Sectorielle", "Intelligence Économique", "Nation Branding", "Threat Intelligence"];

const PUBLICATIONS: Pub[] = [
  {
    id: "barometre-sep-2025",
    category: "Baromètre",
    title: "Baromètre d'Investissement — Sep 2025",
    excerpt: "Vietnam, Afrique du Sud, Mexique… Le Maroc peut-il rivaliser ? 9 secteurs, 24 600 données, 18 pays concurrents.",
    date: "Sep 2025",
    badge: "NOUVEAU",
    featured: true,
    ctaLabel: "Accéder au Baromètre",
    ctaRoute: "/barometre",
    stats: [
      { value: "24,6k", label: "mentions" },
      { value: "18", label: "pays" },
      { value: "9", label: "secteurs" },
      { value: "31", label: "jours" },
    ],
  },
  { id: "vietnam-afsud", category: "Analyse Sectorielle", title: "Pourquoi le Vietnam surclasse l'Afrique du Sud en visibilité ?", date: "Août 2025", readTime: "8 min" },
  { id: "butterfly", category: "Intelligence Économique", title: "Butterfly Strategy — La riposte sud-africaine", date: "Août 2025", readTime: "6 min" },
  { id: "boussole", category: "Intelligence Économique", title: "Boussole des investisseurs", date: "Sep 2025", readTime: "5 min", badge: "NOUVEAU" },
  { id: "maroc-challenger", category: "Nation Branding", title: "Maroc — Un Challenger Majeur méconnu", date: "Sep 2025", readTime: "7 min" },
  { id: "nmgp", category: "Analyse Sectorielle", title: "Le Gazoduc NMGP — Hub énergétique continental", date: "Août 2025", readTime: "6 min" },
];

const InsightsResources = () => {
  const [filter, setFilter] = useState("Tous");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const filtered = filter === "Tous" ? PUBLICATIONS : PUBLICATIONS.filter((p) => p.category === filter);
  const featured = filtered.find((p) => p.featured);
  const standard = filtered.filter((p) => !p.featured);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: "Newsletter Baromètre",
        email,
        form_type: "newsletter_barometre",
      });
      if (error) throw error;
      toast.success("Inscription enregistrée. Merci !");
      setEmail("");
    } catch {
      toast.error("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF6ED" }}>
      <Navbar />

      <style>{`
        .ir-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: #C9A84C; display: inline-flex; align-items: center; gap: 12px; }
        .ir-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: #C9A84C; }
        .ir-title { font-family: 'Playfair Display', serif; font-weight: 900; color: #0D1B2A; line-height: 1.05; letter-spacing: -0.02em; }
        .ir-italic-gold { font-style: italic; color: #C9A84C; font-weight: 700; }
        .ir-lead { font-family: 'Cormorant Garamond', serif; font-style: italic; color: #3d3226; font-size: 22px; line-height: 1.5; }
        .ir-card { background: #fff; border: 1px solid #D9CFBC; border-radius: 2px; transition: all 0.25s ease; padding: 28px; display: flex; flex-direction: column; height: 100%; }
        .ir-card:hover { transform: translateY(-3px); border-color: #C9A84C; box-shadow: 0 12px 30px -12px rgba(201,168,76,0.35); }
        .ir-cat { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #C9A84C; }
        .ir-card-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22px; line-height: 1.25; color: #0D1B2A; margin-top: 14px; }
        .ir-meta { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: #6b5c48; text-transform: uppercase; }
        .ir-badge { display: inline-block; background: #C9A84C; color: #0D1B2A; font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.18em; padding: 4px 8px; border-radius: 2px; }
        .ir-filter { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; padding: 10px 18px; border: 1px solid #D9CFBC; background: transparent; color: #3d3226; border-radius: 2px; cursor: pointer; transition: all 0.2s; }
        .ir-filter:hover { border-color: #C9A84C; color: #C9A84C; }
        .ir-filter.active { background: #0D1B2A; border-color: #0D1B2A; color: #F5E8C0; }
        .ir-featured { background: #0D1B2A; color: #F5F1E8; padding: 48px; border-radius: 2px; transition: all 0.25s ease; }
        .ir-featured:hover { transform: translateY(-3px); box-shadow: 0 16px 40px -12px rgba(201,168,76,0.4); }
        .ir-featured .ir-card-title { color: #F5F1E8; font-size: 38px; line-height: 1.1; }
        .ir-stat-v { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: #C9A84C; font-size: 38px; line-height: 1; }
        .ir-stat-l { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,241,232,0.6); margin-top: 6px; }
        .ir-cta-gold { display: inline-block; background: #C9A84C; color: #0D1B2A; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 14px 28px; border-radius: 2px; cursor: pointer; border: none; transition: all 0.2s; }
        .ir-cta-gold:hover { background: #D4A83A; transform: translateY(-1px); }
        .ir-readmore { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #0D1B2A; margin-top: auto; padding-top: 18px; }
        .ir-readmore::after { content: ' →'; color: #C9A84C; }
      `}</style>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-[1200px]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="ir-eyebrow">Intelligence · Ressources · Analyses</span>
            <h1 className="ir-title mt-6 text-5xl md:text-7xl">
              Insights & <span className="ir-italic-gold">Resources</span>
            </h1>
            <p className="ir-lead mt-6 max-w-3xl">
              Décryptages stratégiques, baromètres d'investissement et analyses de compétitivité pour décider avant les autres.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-[1200px] flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`ir-filter ${filter === c ? "active" : ""}`}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1200px] space-y-8">
          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="ir-featured relative"
            >
              {featured.badge && (
                <div className="absolute right-6 top-6"><span className="ir-badge">{featured.badge}</span></div>
              )}
              <div className="ir-cat" style={{ color: "#C9A84C" }}>{featured.category}</div>
              <h2 className="ir-card-title">{featured.title}</h2>
              {featured.excerpt && (
                <p className="mt-5 max-w-3xl text-[16px] leading-relaxed" style={{ color: "rgba(245,241,232,0.78)", fontFamily: "'DM Sans', sans-serif" }}>
                  {featured.excerpt}
                </p>
              )}
              {featured.stats && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                  {featured.stats.map((s) => (
                    <div key={s.label}>
                      <div className="ir-stat-v">{s.value}</div>
                      <div className="ir-stat-l">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 flex items-center gap-6">
                <button className="ir-cta-gold" onClick={() => navigate(featured.ctaRoute || "/barometre")}>
                  {featured.ctaLabel || "Accéder"} →
                </button>
                <span className="ir-meta">{featured.date}</span>
              </div>
            </motion.article>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standard.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="ir-card relative"
              >
                {p.badge && <div className="absolute right-4 top-4"><span className="ir-badge">{p.badge}</span></div>}
                <div className="ir-cat">{p.category}</div>
                <h3 className="ir-card-title">{p.title}</h3>
                {p.excerpt && <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "#3d3226" }}>{p.excerpt}</p>}
                <div className="mt-5 flex items-center gap-4">
                  <span className="ir-meta">{p.date}</span>
                  {p.readTime && <span className="ir-meta">· {p.readTime}</span>}
                </div>
                <div className="ir-readmore">Lire l'analyse</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER STRIP */}
      <section className="px-6 py-16" style={{ background: "#0D1B2A" }}>
        <div className="mx-auto max-w-[1200px] grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="ir-eyebrow">Newsletter Baromètre</span>
            <h3 className="mt-4 text-3xl md:text-4xl" style={{ fontFamily: "'Playfair Display', serif", color: "#F5F1E8", fontWeight: 700 }}>
              Recevez le prochain Baromètre <span className="ir-italic-gold">en avant-première</span>
            </h3>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="flex-1 px-5 py-4 text-[14px] outline-none"
              style={{ background: "rgba(255,255,255,0.06)", color: "#F5F1E8", border: "1px solid rgba(245,241,232,0.18)", borderRadius: 2, fontFamily: "'DM Sans', sans-serif" }}
            />
            <button type="submit" disabled={loading} className="ir-cta-gold whitespace-nowrap">
              {loading ? "..." : "Je m'inscris →"}
            </button>
          </form>
        </div>
      </section>

      <CTAFooter />
    </div>
  );
};

export default InsightsResources;
