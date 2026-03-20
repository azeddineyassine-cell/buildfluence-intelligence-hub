import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FormStrategicExchange } from "./FormModals";

/* Animated grid background */
const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const spacing = 60;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      ctx.strokeStyle = "rgba(30, 58, 95, 0.15)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        const x = i * spacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        const y = j * spacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Animated dots at intersections
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const pulse = Math.sin(time * 0.002 + i * 0.3 + j * 0.5) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(201, 168, 76, ${0.05 + pulse * 0.12})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.5 + pulse * 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time++;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const stats = [
    { value: "25+", label: "Années d'expertise" },
    { value: "59", label: "Pays couverts" },
    { value: "19M$", label: "Politiques publiques" },
    { value: "400M$", label: "Investissements sécurisés" },
  ];

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-background">
        {/* Animated background */}
        <GridBackground />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        <div className="container relative z-10 pt-20">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="label-accent mb-8 inline-block"
            >
              INFRASTRUCTURE DÉCISIONNELLE HYBRIDE
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ lineHeight: 1.08 }}
            >
              Révéler l'architecture dissimulée du
              <br />
              <span className="text-gold">pouvoir décisionnel</span>
            </motion.h1>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-10 max-w-xl text-lg italic text-muted-foreground"
            >
              "Les crises ne naissent pas du chaos, mais de l'illusion du contrôle."
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <button onClick={() => setFormOpen(true)} className="btn-gold">
                Réserver mon échange stratégique
              </button>
              <a href="#situations-critiques" className="btn-ghost-gold">
                Découvrir les situations critiques
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mt-16 max-w-2xl"
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Gouvernements · Institutions Internationales · Multinationales · Fonds d'Investissement
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-12 flex max-w-3xl items-center justify-center divide-x divide-border"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="px-6 py-3 text-center sm:px-8">
                  <div className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default HeroSection;
