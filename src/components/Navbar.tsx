import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FormStrategicExchange } from "./FormModals";

const solutionsCols = [
  {
    icon: "🔬",
    title: "STRATEGIC INTELLIGENCE LAB",
    route: "/solutions/strategic-intelligence-lab",
    items: [
      { label: "Strategic Foresight", route: "/solutions/strategic-intelligence-lab" },
      { label: "Threat Intelligence", route: "/solutions/strategic-intelligence-lab" },
      { label: "Expérimentations & POCs", route: "/solutions/strategic-intelligence-lab" },
    ],
  },
  {
    icon: "🔍",
    title: "DEEP DUE DILIGENCE",
    route: "/solutions/deep-due-diligence",
    items: [
      { label: "Level 1: Integrity Check", route: "/solutions/deep-due-diligence" },
      { label: "Level 2: Strategic Risk Profiling", route: "/solutions/deep-due-diligence" },
      { label: "Level 3: Regulatory Compliance", route: "/solutions/deep-due-diligence" },
    ],
  },
  {
    icon: "📡",
    title: "SOFT POWER & INFLUENCE",
    route: "/solutions/soft-power-influence",
    items: [
      { label: "Intelligence d'Influence", route: "/solutions/soft-power-influence" },
      { label: "Political Intelligence", route: "/solutions/soft-power-influence" },
      { label: "Territorial Influence Lab", route: "/solutions/soft-power-influence" },
    ],
  },
];

const situationsItems = [
  { label: "Décider sans visibilité", route: "/situations/decider-sans-visibilite" },
  { label: "Subir des attaques", route: "/situations/attaques-informationnelles" },
  { label: "Perdre de l'attractivité", route: "/situations/deficit-attractivite" },
  { label: "Sombrer dans une crise", route: "/situations/crises-non-maitrisees" },
  { label: "Perdre en vélocité", route: "/situations/perte-velocite" },
  { label: "Déficit d'influence", route: "/situations/deficit-influence" },
  { label: "Investir sous risque invisible", route: "/situations/investir-sous-risque" },
  { label: "Gouverner sous pression", route: "/situations/gouverner-sous-pression" },
];

const innovationItems = [
  { label: "AI Powered Monitor", route: "/capacites/ai-powered-monitor" },
  { label: "Strategic Workflow", route: "/capacites/strategic-workflow" },
  { label: "Knowledge Capitalization", route: "/capacites/knowledge-capitalization" },
  { label: "Competitive Velocity Engine", route: "/capacites/competitive-velocity-engine" },
];

const Navbar = () => {
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
          scrolled
            ? "border-b shadow-sm"
            : "bg-transparent"
        }`}
        style={{
          background: scrolled ? 'hsla(0, 0%, 100%, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderColor: scrolled ? 'hsl(220 10% 90%)' : 'transparent',
        }}
      >
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center gap-4">
            <span className="font-serif text-xl font-bold tracking-tight" style={{ color: 'hsl(43 50% 54%)' }}>
              BUILDFLUENCE
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] sm:inline" style={{ color: '#8A8F9E' }}>
              Strategic Intelligence & Influence
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

                {/* Situations dropdown */}
                {item.dropdown === "situations" && (
                  <AnimatePresence>
                    {activeDropdown === "situations" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full mt-2 w-[480px] -translate-x-1/2 rounded-sm border p-5 shadow-xl"
                        style={{ background: '#F5F5F5', borderColor: '#E5E7EB' }}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {situationsItems.map((s, idx) => (
                            <button
                              key={s.label}
                              onClick={() => goTo(s.route)}
                              className="rounded-sm px-3 py-2.5 text-left text-[13px] font-medium transition-all"
                              style={{
                                background: idx === 0 ? 'hsl(213 40% 18%)' : 'transparent',
                                color: idx === 0 ? '#FFFFFF' : '#4A5568',
                              }}
                              onMouseOver={(e) => {
                                if (idx !== 0) { e.currentTarget.style.background = '#EAEAEA'; }
                              }}
                              onMouseOut={(e) => {
                                if (idx !== 0) { e.currentTarget.style.background = 'transparent'; }
                              }}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Solutions mega menu */}
                {item.dropdown === "solutions" && (
                  <AnimatePresence>
                    {activeDropdown === "solutions" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-sm border p-6 shadow-xl"
                        style={{ background: '#F5F5F5', borderColor: '#E5E7EB' }}
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {solutionsCols.map((col) => (
                            <div key={col.title}>
                              <button
                                onClick={() => goTo(col.route)}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
                                style={{ color: 'hsl(213 40% 18%)' }}
                                onMouseOver={(e) => (e.currentTarget.style.color = 'hsl(43 50% 54%)')}
                                onMouseOut={(e) => (e.currentTarget.style.color = 'hsl(213 40% 18%)')}
                              >
                                <span>{col.icon}</span> {col.title}
                              </button>
                              <div className="mt-3 space-y-2">
                                {col.items.map((sub) => (
                                  <button
                                    key={sub.label}
                                    onClick={() => goTo(sub.route)}
                                    className="block w-full text-left text-[13px] transition-colors"
                                    style={{ color: '#6B7280' }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = '#0D1B2A')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = '#6B7280')}
                                  >
                                    · {sub.label}
                                  </button>
                                ))}
                              </div>
                              <button
                                onClick={() => goTo(col.route)}
                                className="mt-3 text-[11px] font-medium transition-colors"
                                style={{ color: 'hsl(43 50% 54% / 0.7)' }}
                                onMouseOver={(e) => (e.currentTarget.style.color = 'hsl(43 50% 54%)')}
                                onMouseOut={(e) => (e.currentTarget.style.color = 'hsl(43 50% 54% / 0.7)')}
                              >
                                → Voir toute l'offre
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Innovation dropdown */}
                {item.dropdown === "innovation" && (
                  <AnimatePresence>
                    {activeDropdown === "innovation" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full mt-2 w-[400px] -translate-x-1/2 rounded-sm border p-5 shadow-xl"
                        style={{ background: '#F5F5F5', borderColor: '#E5E7EB' }}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {innovationItems.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => goTo(item.route)}
                              className="rounded-sm px-3 py-2.5 text-left text-[13px] font-medium transition-all"
                              style={{ color: '#4A5568' }}
                              onMouseOver={(e) => { e.currentTarget.style.background = '#EAEAEA'; }}
                              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                        <div className="mt-4 text-center">
                          <a
                            href="#strategic-innovation"
                            onClick={(e) => { e.preventDefault(); handleNavClick("#strategic-innovation"); }}
                            className="btn-gold inline-block px-5 py-2 text-[11px]"
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
            <span className="flex items-center gap-1 text-[12px] font-medium" style={{ color: '#8A8F9E' }}>
              🇬🇧 EN
            </span>

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