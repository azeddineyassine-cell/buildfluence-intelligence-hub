import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, ChevronDown, Eye, Shield, TrendingDown, AlertTriangle, Zap, Building2, DollarSign, Radio, FlaskConical, Search, Satellite, Brain, Workflow, Database, Gauge } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FormStrategicExchange } from "./FormModals";

const situationsItems = [
  { label: "Décider sans visibilité", desc: "Manque d'information fiable pour décider", icon: Eye, route: "/situations/decider-sans-visibilite" },
  { label: "Subir des attaques", desc: "Manipulations et désinformation", icon: Shield, route: "/situations/attaques-informationnelles" },
  { label: "Perdre de l'attractivité", desc: "Déficit de rayonnement territorial", icon: TrendingDown, route: "/situations/deficit-attractivite" },
  { label: "Sombrer dans une crise", desc: "Effondrement progressif non maîtrisé", icon: AlertTriangle, route: "/situations/crises-non-maitrisees" },
  { label: "Perdre en vélocité", desc: "Retard face aux concurrents", icon: Zap, route: "/situations/perte-velocite" },
  { label: "Déficit d'influence", desc: "Marginalisation institutionnelle", icon: Building2, route: "/situations/deficit-influence" },
  { label: "Investir sous risque invisible", desc: "Due diligence insuffisante", icon: DollarSign, route: "/situations/investir-sous-risque" },
  { label: "Gouverner sous pression", desc: "Pression médiatique et émotionnelle", icon: Radio, route: "/situations/gouverner-sous-pression" },
];

const solutionsCols = [
  {
    icon: FlaskConical,
    title: "STRATEGIC\nINTELLIGENCE LAB",
    route: "/solutions/strategic-intelligence-lab",
    items: [
      { label: "Strategic Foresight", desc: "Veille et anticipation stratégique", route: "/solutions/strategic-intelligence-lab" },
      { label: "Threat Intelligence", desc: "Détection et neutralisation des menaces", route: "/solutions/strategic-intelligence-lab" },
      { label: "Expérimentations & POCs", desc: "Prototypes et modèles prédictifs", route: "/solutions/strategic-intelligence-lab" },
    ],
  },
  {
    icon: Search,
    title: "DEEP\nDUE DILIGENCE",
    route: "/solutions/deep-due-diligence",
    items: [
      { label: "Level 1: Integrity Check", desc: "Screening PEP et signaux faibles", route: "/solutions/deep-due-diligence" },
      { label: "Level 2: Strategic Risk Profiling", desc: "Cartographie et analyse géopolitique", route: "/solutions/deep-due-diligence" },
      { label: "Level 3: Regulatory Compliance", desc: "Audit KYC, KYS, LCB-FT, ESG", route: "/solutions/deep-due-diligence" },
    ],
  },
  {
    icon: Satellite,
    title: "SOFT POWER\n& INFLUENCE",
    route: "/solutions/soft-power-influence",
    items: [
      { label: "Intelligence d'Influence", desc: "Cartographie des réseaux de pouvoir", route: "/solutions/soft-power-influence" },
      { label: "Political Intelligence", desc: "Mapping des décideurs publics", route: "/solutions/soft-power-influence" },
      { label: "Territorial Influence Lab", desc: "Attractivité et compétitivité", route: "/solutions/soft-power-influence" },
    ],
  },
];

const innovationItems = [
  { label: "AI Powered Monitor", desc: "Veille stratégique augmentée par l'IA", icon: Brain, route: "/capacites/ai-powered-monitor" },
  { label: "Strategic Workflow", desc: "Culture de décision augmentée", icon: Workflow, route: "/capacites/strategic-workflow" },
  { label: "Knowledge Capitalization", desc: "Intelligence collective structurée", icon: Database, route: "/capacites/knowledge-capitalization" },
  { label: "Competitive Velocity Engine", desc: "Mapping dynamique concurrentiel", icon: Gauge, route: "/capacites/competitive-velocity-engine" },
];

const Navbar = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Vos Situations Critiques", href: "#situations-critiques", dropdown: "situations" },
    { label: "Nos Solutions", href: "#nos-solutions", dropdown: "solutions" },
    { label: "Strategic Innovation", href: "#strategic-innovation", dropdown: "innovation" },
    { label: "Success Stories", href: "#success-stories" },
    { label: "Insights & Resources", href: "#insights" },
    { label: "Pourquoi Buildfluence", href: "#pourquoi-buildfluence" },
  ];

  const handleNavClick = (href: string) => {
    setOpen(false);
    setActiveDropdown(null);
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goTo = (route: string) => {
    setActiveDropdown(null);
    setOpen(false);
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b shadow-sm" : "bg-transparent"
        }`}
        style={{
          background: scrolled ? 'hsla(0, 0%, 100%, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderColor: scrolled ? 'hsl(220 10% 90%)' : 'transparent',
        }}
      >
        <div className="container flex h-20 items-center justify-between">
          {/* Logo — Build in navy, fluence in yellow */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center">
            <span className="font-serif text-xl tracking-tight">
              <span className="font-bold" style={{ color: '#103E8C' }}>Build</span>
              <span className="font-bold" style={{ color: '#FFDE59' }}>fluence</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-5 xl:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.dropdown)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="flex items-center gap-1 text-[13px] font-medium transition-colors"
                  style={{ color: '#4A5568' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#0D1B2A')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#4A5568')}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="h-3 w-3" />}
                </a>

                {/* ─── Situations dropdown (cision-style) ─── */}
                {item.dropdown === "situations" && (
                  <AnimatePresence>
                    {activeDropdown === "situations" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full w-[580px] rounded-lg border bg-white p-6 shadow-2xl"
                        style={{ borderColor: '#E5E7EB' }}
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {situationsItems.map((s, idx) => {
                            const Icon = s.icon;
                            return (
                              <button
                                key={s.label}
                                onClick={() => goTo(s.route)}
                                className="flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-all hover:bg-gray-50"
                                style={{
                                  background: idx === 0 ? 'hsl(213 40% 96%)' : 'transparent',
                                }}
                              >
                                <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#103E8C' }} />
                                <div>
                                  <div className="text-[13px] font-semibold" style={{ color: '#1a1a2e' }}>{s.label}</div>
                                  <div className="mt-0.5 text-[11px]" style={{ color: '#8A8F9E' }}>{s.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* ─── Solutions mega menu (cision-style) ─── */}
                {item.dropdown === "solutions" && (
                  <AnimatePresence>
                    {activeDropdown === "solutions" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full w-[720px] rounded-lg border bg-white p-6 shadow-2xl"
                        style={{ borderColor: '#E5E7EB' }}
                      >
                        <div className="grid grid-cols-3 gap-8">
                          {solutionsCols.map((col) => {
                            const ColIcon = col.icon;
                            return (
                              <div key={col.title}>
                                <button
                                  onClick={() => goTo(col.route)}
                                  className="flex items-center gap-2 transition-colors"
                                  onMouseOver={(e) => (e.currentTarget.style.color = '#103E8C')}
                                  onMouseOut={(e) => (e.currentTarget.style.color = '#1a1a2e')}
                                  style={{ color: '#1a1a2e' }}
                                >
                                  <ColIcon className="h-4 w-4 shrink-0" style={{ color: '#103E8C' }} />
                                  <span className="text-[11px] font-bold uppercase tracking-wider whitespace-pre-line leading-tight">{col.title}</span>
                                </button>
                                <div className="mt-4 space-y-1">
                                  {col.items.map((sub) => (
                                    <button
                                      key={sub.label}
                                      onClick={() => goTo(sub.route)}
                                      className="block w-full rounded-md px-2 py-2 text-left transition-all hover:bg-gray-50"
                                    >
                                      <div className="text-[12px] font-semibold" style={{ color: '#1a1a2e' }}>{sub.label}</div>
                                      <div className="mt-0.5 text-[11px]" style={{ color: '#8A8F9E' }}>{sub.desc}</div>
                                    </button>
                                  ))}
                                </div>
                                <button
                                  onClick={() => goTo(col.route)}
                                  className="mt-3 text-[11px] font-semibold transition-colors"
                                  style={{ color: '#FFDE59' }}
                                  onMouseOver={(e) => (e.currentTarget.style.color = '#e6c84e')}
                                  onMouseOut={(e) => (e.currentTarget.style.color = '#FFDE59')}
                                >
                                  → Voir toute l'offre
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* ─── Innovation dropdown (cision-style) ─── */}
                {item.dropdown === "innovation" && (
                  <AnimatePresence>
                    {activeDropdown === "innovation" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full w-[480px] rounded-lg border bg-white p-6 shadow-2xl"
                        style={{ borderColor: '#E5E7EB' }}
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {innovationItems.map((innoItem) => {
                            const Icon = innoItem.icon;
                            return (
                              <button
                                key={innoItem.label}
                                onClick={() => goTo(innoItem.route)}
                                className="flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-all hover:bg-gray-50"
                              >
                                <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#103E8C' }} />
                                <div>
                                  <div className="text-[13px] font-semibold" style={{ color: '#1a1a2e' }}>{innoItem.label}</div>
                                  <div className="mt-0.5 text-[11px]" style={{ color: '#8A8F9E' }}>{innoItem.desc}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-4 border-t pt-4 text-center" style={{ borderColor: '#E5E7EB' }}>
                          <a
                            href="#strategic-innovation"
                            onClick={(e) => { e.preventDefault(); handleNavClick("#strategic-innovation"); }}
                            className="btn-gold inline-block px-6 py-2 text-[11px]"
                          >
                            Explorer...
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* EN flag */}
            <button className="flex items-center gap-1.5 text-[12px] font-medium cursor-pointer" style={{ color: '#8A8F9E' }}>
              🇬🇧 EN
            </button>

            <button
              onClick={() => setFormOpen(true)}
              className="px-6 py-2.5 text-[12px] font-semibold uppercase tracking-wider transition-all"
              style={{ background: 'hsl(213 40% 18%)', color: '#FFFFFF' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'hsl(213 40% 22%)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'hsl(213 40% 18%)'; }}
            >
              Échange Stratégique
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="xl:hidden" style={{ color: '#0D1B2A' }} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t xl:hidden"
              style={{ background: '#FFFFFF', borderColor: '#E5E7EB' }}
            >
              <div className="container flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className="text-sm font-medium transition-colors"
                    style={{ color: '#4A5568' }}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => { setOpen(false); setFormOpen(true); }}
                  className="mt-2 w-full py-3 text-center text-sm font-semibold uppercase tracking-wider"
                  style={{ background: 'hsl(213 40% 18%)', color: '#FFFFFF' }}
                >
                  Échange Stratégique
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default Navbar;
