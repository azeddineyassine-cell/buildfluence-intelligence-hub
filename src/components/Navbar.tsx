import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FormStrategicExchange } from "./FormModals";

const megaMenuCols = [
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
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
    { label: "Vos Situations Critiques", href: "#situations-critiques" },
    { label: "Nos Solutions", href: "#nos-solutions", hasMega: true },
    { label: "Strategic Innovation", href: "#strategic-innovation" },
    { label: "Success Stories", href: "#success-stories" },
    { label: "Insights & Resources", href: "#insights" },
    { label: "Pourquoi Buildfluence", href: "#pourquoi-buildfluence" },
  ];

  const handleNavClick = (href: string) => {
    setOpen(false);
    setMegaOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
    }
  };

  const goTo = (route: string) => {
    setMegaOpen(false);
    setOpen(false);
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/40" : "bg-transparent"}`}>
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center gap-4">
            <span className="font-serif text-xl font-bold tracking-tight text-primary">
              BUILDFLUENCE
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:inline">
              Strategic Intelligence & Influence
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasMega && setMegaOpen(true)}
                onMouseLeave={() => item.hasMega && setMegaOpen(false)}
              >
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                  {item.hasMega && <ChevronDown className="h-3 w-3" />}
                </a>

                {/* Mega menu */}
                {item.hasMega && (
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-sm border border-border bg-card p-6 shadow-xl"
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {megaMenuCols.map((col) => (
                            <div key={col.title}>
                              <button
                                onClick={() => goTo(col.route)}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80"
                              >
                                <span>{col.icon}</span> {col.title}
                              </button>
                              <div className="mt-3 space-y-2">
                                {col.items.map((sub) => (
                                  <button
                                    key={sub.label}
                                    onClick={() => goTo(sub.route)}
                                    className="block w-full text-left text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    · {sub.label}
                                  </button>
                                ))}
                              </div>
                              <button
                                onClick={() => goTo(col.route)}
                                className="mt-3 text-[11px] font-medium text-primary/70 transition-colors hover:text-primary"
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
              </div>
            ))}
            <button
              onClick={() => setFormOpen(true)}
              className="btn-gold px-6 py-2.5 text-[12px]"
            >
              Réserver mon échange stratégique
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground xl:hidden"
            aria-label="Menu"
          >
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
              className="border-t border-border bg-card xl:hidden"
            >
              <div className="container flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => { setOpen(false); setFormOpen(true); }}
                  className="btn-gold mt-2 w-full text-center"
                >
                  Réserver mon échange stratégique
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
