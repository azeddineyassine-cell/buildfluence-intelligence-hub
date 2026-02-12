import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, SearchCheck, Radio } from "lucide-react";

const pillars = [
  {
    icon: FlaskConical,
    label: "Pilier 1",
    title: "Strategic Intelligence Lab",
    punchline: "Voir avant. Comprendre mieux. Décider plus vite que tous.",
    services: ["Strategic Foresight", "Threat Intelligence", "Expérimentations & POCs"],
    bullets: [
      "Anticipez les ruptures",
      "Contrôlez vos angles morts",
      "Détectez les opportunités",
      "Imposez votre vision",
    ],
  },
  {
    icon: SearchCheck,
    label: "Pilier 2",
    title: "Deep Due Diligence",
    punchline: "Le risque n'est jamais visible, il se loge dans l'angle mort.",
    services: ["Integrity Check", "Strategic Risk Profiling", "Regulatory Compliance"],
    bullets: [
      "Détecter l'invisible",
      "Décrypter vos partenaires",
      "Décoder les montages Off-Shore",
      "Sécuriser vos investissements",
    ],
  },
  {
    icon: Radio,
    label: "Pilier 3",
    title: "Soft Power & Influence",
    punchline: "Ne laissez plus les autres écrire votre histoire.",
    services: ["Intelligence d'Influence", "Political Intelligence", "Attractivité Territoriale"],
    bullets: [
      "Dominez votre écosystème",
      "Imposez votre narratif",
      "Pesez dans les cercles décisionnels",
      "Façonnez les perceptions",
    ],
  },
];

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nos-solutions" className="relative py-28" ref={ref}>
      {/* Subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px line-gold opacity-20" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Nos Solutions
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            3 Piliers pour dominer votre{" "}
            <span className="text-gradient-gold">écosystème</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nous ne vendons pas de la veille. Nous bâtissons des écosystèmes
            décisionnels au service de la compétitivité et de la souveraineté.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group flex flex-col rounded-lg border border-border bg-gradient-card p-8 transition-all hover:border-glow-gold hover:shadow-gold"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <p.icon className="h-6 w-6 text-accent" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {p.label}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm italic text-accent/80">
                "{p.punchline}"
              </p>

              <ul className="mt-6 flex-1 space-y-2">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6 h-px w-full line-gold opacity-20" />

              <div className="mt-4 space-y-1">
                {p.services.map((s) => (
                  <span
                    key={s}
                    className="mr-2 inline-block rounded-sm border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-6 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
              >
                Explorer →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
