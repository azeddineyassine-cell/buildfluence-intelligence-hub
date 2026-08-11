import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ipCover from "@/assets/face1-legislatives-maroc.png.asset.json";
import isdCover from "@/assets/isd-decision.webp";

const NAVY = "#0D1B2A";
const GOLD = "#C9A84C";
const IVORY = "#F5F1E8";
const PAPER = "#FAF6ED";

const AUTOPLAY_MS = 6000;
const MANUAL_HOLD_MS = 10000;

type Slide = {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  mention: string;
  href: string;
};

const HeroInsightsCarousel = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const holdUntil = useRef<number>(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const slides: Slide[] = [
    {
      id: "intelligence-politique",
      image: ipCover.url,
      category: t("INTELLIGENCE POLITIQUE", "POLITICAL INTELLIGENCE"),
      date: t("LÉGISLATIVES MAROC 2026", "MOROCCO LEGISLATIVE 2026"),
      title: t(
        "1ère Plateforme d'Intelligence Politique au Maroc",
        "Morocco's First Political Intelligence Platform"
      ),
      mention: t(
        "IBDN® · GRAPHE NARRATIF · PARTIS · LEADERS POLITIQUES",
        "IBDN® · NARRATIVE GRAPH · PARTIES · POLITICAL LEADERS"
      ),
      href: "/insights-resources/intelligence-politique",
    },
    {
      id: "benchmark-api",
      image: "/Benchmark_API_Drapeaux-1.webp",
      category: t("BENCHMARK INTERNATIONAL", "INTERNATIONAL BENCHMARK"),
      date: t("MAI 2026", "MAY 2026"),
      title: t(
        "Benchmark des Agences de Promotion des Investissements (API)",
        "Investment Promotion Agencies (IPA) Benchmark"
      ),
      mention: t(
        "6 AGENCES · 12 CRITÈRES · 6 LEVIERS STRATÉGIQUES",
        "6 AGENCIES · 12 CRITERIA · 6 STRATEGIC LEVERS"
      ),
      href: "/benchmark-api-light.html",
    },
    {
      id: "enquete-isd",
      image: isdCover,
      category: t("ÉTUDE NATIONALE", "NATIONAL STUDY"),
      date: t("2026 · ENQUÊTE OUVERTE", "2026 · SURVEY OPEN"),
      title: t(
        "État de la maturité en souveraineté décisionnelle au Maroc",
        "The state of decision sovereignty maturity in Morocco"
      ),
      mention: t(
        "AUTODIAGNOSTIC · 4 PILIERS · 13 DIMENSIONS",
        "SELF-ASSESSMENT · 4 PILLARS · 13 DIMENSIONS"
      ),
      href: "/insights-resources/enquete-isd",
    },
  ];

  // Préchargement des trois couvertures
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback((next: number, manual = false) => {
    setIndex((prev) => (next + 3) % 3);
    if (manual) holdUntil.current = Date.now() + MANUAL_HOLD_MS;
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      if (Date.now() < holdUntil.current) return;
      setIndex((prev) => (prev + 1) % 3);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  const slide = slides[index];

  const open = () => {
    window.location.href = slide.href;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.2 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative"
      style={{ borderRadius: "2px" }}
      aria-roledescription="carousel"
      aria-label={t("Publications stratégiques", "Strategic publications")}
    >
      <a
        href={slide.href}
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        className="relative block overflow-hidden"
        style={{
          borderRadius: "2px",
          background: NAVY,
          boxShadow: "0 24px 60px -12px rgba(13, 27, 42, 0.35)",
          aspectRatio: "3 / 4",
          minHeight: "420px",
        }}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.5 }}
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: "cover" }}
          />
        </AnimatePresence>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,27,42,0.96) 0%, rgba(13,27,42,0.78) 32%, rgba(13,27,42,0.18) 62%, rgba(13,27,42,0.05) 100%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 px-7 pb-16 pt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1" style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.16em",
                color: GOLD,
                fontWeight: 500,
              }}
            >
              {slide.category}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.16em",
                color: "rgba(245,241,232,0.72)",
              }}
            >
              {slide.date}
            </span>
          </div>

          <h2
            className="font-serif"
            style={{
              fontWeight: 700,
              fontSize: "clamp(21px, 2vw, 27px)",
              lineHeight: 1.16,
              color: PAPER,
              margin: "0 0 14px",
            }}
          >
            {slide.title}
          </h2>

          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.12em",
              lineHeight: 1.6,
              color: IVORY,
              opacity: 0.85,
              margin: 0,
            }}
          >
            {slide.mention}
          </p>
        </div>
      </a>

      {/* Commandes et indicateurs */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 pb-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i, true)}
              aria-label={t(`Afficher : ${s.category}`, `Show: ${s.category}`)}
              aria-current={i === index}
              className="flex items-center justify-center"
              style={{
                width: "28px",
                height: "28px",
                background: "transparent",
                border: 0,
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: i === index ? "22px" : "10px",
                  height: "2px",
                  background: i === index ? GOLD : "rgba(245,241,232,0.45)",
                  transition: "all 0.25s ease",
                }}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1, true)}
            aria-label={t("Publication précédente", "Previous publication")}
            className="flex items-center justify-center"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "2px",
              border: "1px solid rgba(201,168,76,0.45)",
              background: "rgba(13,27,42,0.45)",
              color: IVORY,
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={16} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1, true)}
            aria-label={t("Publication suivante", "Next publication")}
            className="flex items-center justify-center"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "2px",
              border: "1px solid rgba(201,168,76,0.45)",
              background: "rgba(13,27,42,0.45)",
              color: IVORY,
              cursor: "pointer",
            }}
          >
            <ChevronRight size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroInsightsCarousel;
