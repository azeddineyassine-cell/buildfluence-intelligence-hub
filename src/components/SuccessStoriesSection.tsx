import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    client: "Présidence du Sénégal",
    tags: "Crise majeure • Baromètre politique • Réputation",
    result: "Stabilisation en période de haute tension",
    icon: "🏛",
  },
  {
    client: "Centrale Danone",
    tags: "Crise réputationnelle • 120M MAD de pertes",
    result: "+14% de parts de marché après reconquête",
    icon: "🏭",
  },
  {
    client: "Fonds d'Investissement",
    tags: "Capital-Risque 400M$",
    result: "Investissement sécurisé, partenariat verrouillé",
    icon: "💼",
  },
  {
    client: "Ministère de la Santé",
    tags: "Crise H1N1 • Désinformation massive",
    result: "Crise résolue en 2 semaines",
    icon: "🏥",
  },
  {
    client: "OCP Group",
    tags: "10 ans de guerre informationnelle",
    result: "Réputation restaurée, PDM protégées",
    icon: "⚙️",
  },
  {
    client: "CIDC (OCI) — 57 pays",
    tags: "Notoriété en déclin",
    result: "Doing Business Platform déployée",
    icon: "🌍",
  },
];

const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="success-stories" className="relative py-28" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px line-gold opacity-20" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Track Record
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Ils ont repris le contrôle de leurs{" "}
            <span className="text-gradient-gold">situations</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Gouvernements, multinationales, institutions internationales : quand
            les enjeux sont critiques, ils nous font confiance.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <motion.div
              key={s.client}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-lg border border-border bg-gradient-card p-6 transition-all hover:border-glow-gold hover:shadow-gold"
            >
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-4 font-serif text-lg font-bold">{s.client}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.tags}</p>
              <div className="mt-4 h-px w-full line-gold opacity-20" />
              <p className="mt-3 text-sm font-medium text-accent">
                → {s.result}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
