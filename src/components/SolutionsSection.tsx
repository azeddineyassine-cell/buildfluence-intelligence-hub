import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, SearchCheck, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const navigate = useNavigate();

  const pillars = [
    {
      icon: FlaskConical,
      label: "Pilier I",
      title: "Strategic Intelligence Lab",
      route: "/solutions/strategic-intelligence-lab",
      punchline: "Anticiper les ruptures, neutraliser les menaces, saisir les opportunités avant qu'elles ne deviennent visibles.",
      services: [
        { label: "Strategic Foresight", route: "/solutions/strategic-intelligence-lab" },
        { label: "Threat Intelligence", route: "/solutions/strategic-intelligence-lab" },
        { label: "Competitive Mapping", route: "/solutions/strategic-intelligence-lab" },
      ],
      capabilities: [
        "Veille stratégique multicanale augmentée par l'IA",
        "Détection de signaux faibles et ruptures technologiques",
        "Cartographie dynamique des écosystèmes concurrentiels",
        "Recommandations tactiques actionnables",
      ],
    },
    {
      icon: SearchCheck,
      label: "Pilier II",
      title: "Deep Due Diligence",
      route: "/solutions/deep-due-diligence",
      punchline: "Le risque n'est jamais visible. Il se loge dans l'angle mort de ceux qui ne vérifient pas assez profondément.",
      services: [
        { label: "Integrity Check", route: "/solutions/deep-due-diligence" },
        { label: "Risk Profiling", route: "/solutions/deep-due-diligence" },
        { label: "Regulatory Compliance", route: "/solutions/deep-due-diligence" },
      ],
      capabilities: [
        "Vérification d'intégrité des contreparties",
        "Analyse des structures offshore et montages complexes",
        "Profilage de risque stratégique",
        "Conformité réglementaire et sanctions",
      ],
    },
    {
      icon: Radio,
      label: "Pilier III",
      title: "Soft Power & Influence",
      route: "/solutions/soft-power-influence",
      punchline: "Ceux qui n'écrivent pas leur propre récit sont condamnés à subir celui des autres.",
      services: [
        { label: "Intelligence d'Influence", route: "/solutions/soft-power-influence" },
        { label: "Political Intelligence", route: "/solutions/soft-power-influence" },
        { label: "Attractivité Territoriale", route: "/solutions/soft-power-influence" },
      ],
      capabilities: [
        "Construction et protection du narratif stratégique",
        "Intelligence politique et cartographie des cercles décisionnels",
        "Stratégies d'attractivité territoriale et de marque pays",
        "Positionnement dans les cercles de pouvoir",
      ],
    },
  ];

  const goTo = (route: string) => { navigate(route); window.scrollTo(0, 0); };

  return (
    <section id="nos-solutions" className="relative bg-background py-28" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Nos Solutions</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Trois piliers au service de votre compétitivité et votre attractivité
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nous bâtissons des écosystèmes décisionnels au service de la compétitivité, de l'attractivité et de la souveraineté.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => goTo(p.route)}
              className="card-glass group flex cursor-pointer flex-col overflow-hidden transition-all hover:shadow-gold-hover"
            >
              <div className="flex h-44 items-center justify-center bg-muted/30">
                <p.icon className="h-12 w-12 text-primary/20" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary/10">
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{p.label}</span>
                </div>
                <h3 className="font-serif text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-[13px] italic text-muted-foreground">{p.punchline}</p>

                <ul className="mt-5 flex-1 space-y-2">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-[13px] text-foreground/70">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 h-px w-full bg-border" />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.services.map((s) => (
                    <span
                      key={s.label}
                      onClick={(e) => { e.stopPropagation(); goTo(s.route); }}
                      className="cursor-pointer rounded-sm border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <span className="btn-gold inline-block px-5 py-2 text-[11px] group-hover:shadow-gold">
                    Explorer →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
