import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Strategic intelligence network"
        className="h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
    </div>

    <div className="container relative z-10 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
          Strategic Intelligence & Influence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
        >
          La donnée est le{" "}
          <span className="text-gradient-gold">pouvoir</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Révélez les trésors cachés de vos données et prenez l'ascendant sur
          votre écosystème. Anticipez les ruptures, neutralisez les menaces,
          façonnez les perceptions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="rounded-sm bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-accent-foreground transition-all hover:brightness-110 hover:shadow-gold"
          >
            Évaluer ma situation
          </a>
          <a
            href="#nos-solutions"
            className="rounded-sm border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Découvrir nos solutions
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4"
        >
          {[
            { value: "15+", label: "Ans d'expertise" },
            { value: "9", label: "Success Stories" },
            { value: "57", label: "Pays couverts" },
            { value: "400M$", label: "Deals sécurisés" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-5 text-center">
              <div className="font-serif text-2xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
