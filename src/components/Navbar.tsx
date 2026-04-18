import { useState, useEffect } from "react";
import logoBuildfluence from "@/assets/Logo_Buildfluence.png";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Menu,
  X,
  ChevronDown,
  Eye,
  Shield,
  TrendingDown,
  AlertTriangle,
  Zap,
  Building2,
  DollarSign,
  Radio,
  FlaskConical,
  Search,
  Satellite,
  Brain,
  Workflow,
  Database,
  Gauge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FormStrategicExchange } from "./FormModals";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [espaceClientOpen, setEspaceClientOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const situationsItems = [
    {
      label: t("Décider sans visibilité", "Deciding without visibility"),
      desc: t("Manque d'information fiable pour décider", "Lack of reliable information for decision-making"),
      icon: Eye,
      route: "/situations/decider-sans-visibilite",
    },
    {
      label: t("Subir des attaques", "Suffering information attacks"),
      desc: t("Manipulations et désinformation", "Manipulation and disinformation"),
      icon: Shield,
      route: "/situations/attaques-informationnelles",
    },
    {
      label: t("Perdre de l'attractivité", "Losing attractiveness"),
      desc: t("Déficit de rayonnement territorial", "Territorial influence deficit"),
      icon: TrendingDown,
      route: "/situations/deficit-attractivite",
    },
    {
      label: t("Sombrer dans une crise", "Sinking into a crisis"),
      desc: t("Effondrement progressif non maîtrisé", "Uncontrolled progressive collapse"),
      icon: AlertTriangle,
      route: "/situations/crises-non-maitrisees",
    },
    {
      label: t("Perdre en vélocité", "Losing velocity"),
      desc: t("Retard face aux concurrents", "Falling behind competitors"),
      icon: Zap,
      route: "/situations/perte-velocite",
    },
    {
      label: t("Déficit d'influence", "Influence deficit"),
      desc: t("Marginalisation institutionnelle", "Institutional marginalization"),
      icon: Building2,
      route: "/situations/deficit-influence",
    },
    {
      label: t("Investir sous risque invisible", "Investing under invisible risk"),
      desc: t("Due diligence insuffisante", "Insufficient due diligence"),
      icon: DollarSign,
      route: "/situations/investir-sous-risque",
    },
    {
      label: t("Gouverner sous pression", "Governing under pressure"),
      desc: t("Pression médiatique et émotionnelle", "Media and emotional pressure"),
      icon: Radio,
      route: "/situations/gouverner-sous-pression",
    },
  ];

  const solutionsCols = [
    {
      icon: FlaskConical,
      title: "STRATEGIC\nINTELLIGENCE LAB",
      route: "/solutions/strategic-intelligence-lab",
      items: [
        {
          label: "Strategic Foresight",
          desc: t("Veille et anticipation stratégique", "Strategic monitoring and foresight"),
          route: "/solutions/strategic-intelligence-lab#strategic-foresight",
        },
        {
          label: "Threat Intelligence",
          desc: t("Détection et neutralisation des menaces", "Threat detection and neutralization"),
          route: "/solutions/strategic-intelligence-lab#threat-intelligence",
        },
        {
          label: t("Expérimentations & POCs", "Experiments & POCs"),
          desc: t("Prototypes et modèles prédictifs", "Prototypes and predictive models"),
          route: "/solutions/strategic-intelligence-lab#experimentations-pocs",
        },
      ],
    },
    {
      icon: Satellite,
      title: "SOFT POWER\n& INFLUENCE",
      route: "/solutions/soft-power-influence",
      items: [
        {
          label: t("Intelligence d'Influence", "Influence Intelligence"),
          desc: t("Cartographie des réseaux de pouvoir", "Power network mapping"),
          route: "/solutions/soft-power-influence",
        },
        {
          label: "Political Intelligence",
          desc: t("Mapping des décideurs publics", "Public decision-maker mapping"),
          route: "/solutions/soft-power-influence",
        },
        {
          label: "Territorial Influence Lab",
          desc: t("Attractivité et compétitivité", "Attractiveness and competitiveness"),
          route: "/solutions/soft-power-influence",
        },
      ],
    },
    {
      icon: Search,
      title: "DEEP\nDUE DILIGENCE",
      route: "/solutions/deep-due-diligence",
      items: [
        {
          label: "Level 1: Integrity Check",
          desc: t("Screening PEP et signaux faibles", "PEP screening and weak signals"),
          route: "/solutions/deep-due-diligence#level-1",
        },
        {
          label: "Level 2: Strategic Risk Profiling",
          desc: t("Cartographie et analyse géopolitique", "Mapping and geopolitical analysis"),
          route: "/solutions/deep-due-diligence#level-2",
        },
        {
          label: "Level 3: Regulatory Compliance",
          desc: t("Audit KYC, KYS, LCB-FT, ESG", "KYC, KYS, AML-CFT, ESG Audit"),
          route: "/solutions/deep-due-diligence#level-3",
        },
      ],
    },
  ];

  const innovationItems = [
    {
      label: "AI Powered Monitor",
      desc: t("Veille stratégique augmentée par l'IA", "AI-augmented strategic monitoring"),
      icon: Brain,
      route: "/capacites/ai-powered-monitor",
    },
    {
      label: "Strategic Workflow",
      desc: t("Culture de décision augmentée", "Augmented decision culture"),
      icon: Workflow,
      route: "/capacites/strategic-workflow",
    },
    {
      label: "Knowledge Capitalization",
      desc: t("Intelligence collective structurée", "Structured collective intelligence"),
      icon: Database,
      route: "/capacites/knowledge-capitalization",
    },
    {
      label: "Competitive Velocity Engine",
      desc: t("Mapping dynamique concurrentiel", "Dynamic competitive mapping"),
      icon: Gauge,
      route: "/capacites/competitive-velocity-engine",
    },
  ];

  const navItems = [
    { label: t("Vos Situations Critiques", "Your Critical Situations"), href: "/situations-critiques", maxW: "120px" },
    { label: "Strategic Innovation", href: "#strategic-innovation", dropdown: "innovation", maxW: "90px" },
    { label: t("Nos Solutions", "Our Solutions"), href: "#nos-solutions", dropdown: "solutions", maxW: "90px" },
    { label: "Success Stories", href: "#success-stories", maxW: "90px" },
    { label: "Insights & Resources", href: "#insights", maxW: "90px" },
    { label: t("Pourquoi Buildfluence", "Why Buildfluence"), href: "#pourquoi-buildfluence", maxW: "90px" },
    { label: t("Espace\nClients", "Client\nArea"), href: "#espace-clients", maxW: "90px", isModal: true, isGold: true },
  ];

  const handleNavClick = (href: string) => {
    setOpen(false);
    setActiveDropdown(null);
    // Route navigation (starts with "/")
    if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }
    // Anchor navigation (e.g. "#section")
    if (location.pathname !== "/") {
      navigate("/" + href);
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 400);
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
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled ? "border-b shadow-sm" : ""
        }`}
        style={{
          background: "#ffffff",
          backdropFilter: "blur(16px)",
          borderColor: scrolled ? "hsl(220 10% 90%)" : "transparent",
        }}
      >
        <div className="container flex h-20 items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="flex items-center gap-2"
          >
            <img src={logoBuildfluence} alt="Buildfluence" className="h-10 w-auto" />
            <span className="font-serif text-xl tracking-tight">
              <span className="font-bold" style={{ color: "#103E8C" }}>
                Build
              </span>
              <span className="font-bold" style={{ color: "#FFDE59" }}>
                fluence
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-4 xl:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.dropdown)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if ((item as any).isModal) {
                      setEspaceClientOpen(true);
                    } else {
                      handleNavClick(item.href);
                    }
                  }}
                  className="flex items-center gap-1 text-[12.5px] font-medium transition-colors leading-tight whitespace-pre-line"
                  style={{ color: (item as any).isGold ? "#C9A84C" : "#4A5568", maxWidth: item.maxW || "90px" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = (item as any).isGold ? "#FFDE59" : "#0D1B2A")}
                  onMouseOut={(e) => (e.currentTarget.style.color = (item as any).isGold ? "#C9A84C" : "#4A5568")}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="h-3 w-3" />}
                </a>

                {item.dropdown === "situations" && (
                  <AnimatePresence>
                    {activeDropdown === "situations" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full w-[580px] rounded-lg border bg-white p-6 shadow-2xl"
                        style={{ borderColor: "#E5E7EB" }}
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {situationsItems.map((s) => {
                            const Icon = s.icon;
                            return (
                              <button
                                key={s.route}
                                onClick={() => goTo(s.route)}
                                className="flex items-start gap-3 rounded-lg px-3 py-3 text-left"
                                style={{
                                  background: "transparent",
                                  border: "1px solid #e5e7eb",
                                  transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#0f1f3d";
                                  e.currentTarget.style.borderColor = "#0f1f3d";
                                  const title = e.currentTarget.querySelector("[data-title]") as HTMLElement;
                                  const desc = e.currentTarget.querySelector("[data-desc]") as HTMLElement;
                                  const icon = e.currentTarget.querySelector("[data-icon]") as HTMLElement;
                                  if (title) title.style.color = "#ffffff";
                                  if (desc) desc.style.color = "rgba(255,255,255,0.7)";
                                  if (icon) icon.style.color = "#ffffff";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "transparent";
                                  e.currentTarget.style.borderColor = "#e5e7eb";
                                  const title = e.currentTarget.querySelector("[data-title]") as HTMLElement;
                                  const desc = e.currentTarget.querySelector("[data-desc]") as HTMLElement;
                                  const icon = e.currentTarget.querySelector("[data-icon]") as HTMLElement;
                                  if (title) title.style.color = "#1a1a2e";
                                  if (desc) desc.style.color = "#8A8F9E";
                                  if (icon) icon.style.color = "#103E8C";
                                }}
                              >
                                <Icon
                                  data-icon
                                  className="mt-0.5 h-4 w-4 shrink-0"
                                  style={{ color: "#103E8C", transition: "color 0.15s ease" }}
                                />
                                <div>
                                  <div
                                    data-title
                                    className="text-[13px] font-semibold"
                                    style={{ color: "#1a1a2e", transition: "color 0.15s ease" }}
                                  >
                                    {s.label}
                                  </div>
                                  <div
                                    data-desc
                                    className="mt-0.5 text-[11px]"
                                    style={{ color: "#8A8F9E", transition: "color 0.15s ease" }}
                                  >
                                    {s.desc}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {item.dropdown === "solutions" && (
                  <AnimatePresence>
                    {activeDropdown === "solutions" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full w-[720px] rounded-lg border bg-white p-6 shadow-2xl"
                        style={{ borderColor: "#E5E7EB" }}
                      >
                        <div className="grid grid-cols-3 gap-0">
                          {solutionsCols.map((col) => {
                            const ColIcon = col.icon;
                            return (
                              <div
                                key={col.title}
                                className="flex flex-col border-r last:border-r-0"
                                style={{ borderColor: "#E5E7EB" }}
                              >
                                <button
                                  onClick={() => goTo(col.route)}
                                  className="flex items-center gap-2 px-4 py-3 rounded-none"
                                  style={{ background: "#0f1f3d", color: "#ffffff" }}
                                >
                                  <ColIcon className="h-4 w-4 shrink-0" style={{ color: "#ffffff" }} />
                                  <span className="text-[11px] font-bold uppercase tracking-wider whitespace-pre-line leading-tight text-white">
                                    {col.title}
                                  </span>
                                </button>
                                <div className="px-4 pt-3 pb-2 space-y-1 flex-1">
                                  {col.items.map((sub) => (
                                    <button
                                      key={sub.label}
                                      onClick={() => goTo(sub.route)}
                                      className="block w-full rounded-md px-2 py-2 text-left"
                                      style={{ transition: "all 0.15s ease" }}
                                      onMouseEnter={(e) => {
                                        const label = e.currentTarget.querySelector("[data-sublabel]") as HTMLElement;
                                        if (label) {
                                          label.style.color = "#c9a84c";
                                          label.style.textDecoration = "underline";
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        const label = e.currentTarget.querySelector("[data-sublabel]") as HTMLElement;
                                        if (label) {
                                          label.style.color = "#1a1a2e";
                                          label.style.textDecoration = "none";
                                        }
                                      }}
                                    >
                                      <div
                                        data-sublabel
                                        className="text-[12px] font-semibold"
                                        style={{ color: "#1a1a2e", transition: "all 0.15s ease" }}
                                      >
                                        {sub.label}
                                      </div>
                                      <div className="mt-0.5 text-[11px]" style={{ color: "#8A8F9E" }}>
                                        {sub.desc}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                                <button
                                  onClick={() => goTo(col.route)}
                                  className="mx-4 mb-3 text-[11px] font-semibold text-left"
                                  style={{ color: "#c9a84c", transition: "color 0.15s ease" }}
                                  onMouseOver={(e) => (e.currentTarget.style.color = "#FFDE59")}
                                  onMouseOut={(e) => (e.currentTarget.style.color = "#c9a84c")}
                                >
                                  → {t("Voir toute l'offre", "View full offering")}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {item.dropdown === "innovation" && (
                  <AnimatePresence>
                    {activeDropdown === "innovation" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full w-[480px] rounded-lg border bg-white p-6 shadow-2xl"
                        style={{ borderColor: "#E5E7EB" }}
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
                                <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#103E8C" }} />
                                <div>
                                  <div className="text-[13px] font-semibold" style={{ color: "#1a1a2e" }}>
                                    {innoItem.label}
                                  </div>
                                  <div className="mt-0.5 text-[11px]" style={{ color: "#8A8F9E" }}>
                                    {innoItem.desc}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="flex items-center gap-1.5 text-[12px] font-medium cursor-pointer transition-colors"
              style={{ color: "#8A8F9E" }}
            >
              {lang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
            </button>

            <button
              onClick={() => setFormOpen(true)}
              className="px-6 py-2.5 text-[12px] font-semibold uppercase tracking-wider transition-all"
              style={{ background: "hsl(213 40% 18%)", color: "#FFFFFF" }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "hsl(213 40% 22%)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "hsl(213 40% 18%)";
              }}
            >
              {t("Échange Stratégique", "Strategic Exchange")}
            </button>
          </div>

          <button onClick={() => setOpen(!open)} className="xl:hidden" style={{ color: "#0D1B2A" }} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t xl:hidden"
              style={{ background: "#FFFFFF", borderColor: "#E5E7EB" }}
            >
              <div className="container flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if ((item as any).isModal) {
                        setOpen(false);
                        setEspaceClientOpen(true);
                      } else {
                        handleNavClick(item.href);
                      }
                    }}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "#4A5568" }}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setOpen(false);
                    setFormOpen(true);
                  }}
                  className="mt-2 w-full py-3 text-center text-sm font-semibold uppercase tracking-wider"
                  style={{ background: "hsl(213 40% 18%)", color: "#FFFFFF" }}
                >
                  {t("Échange Stratégique", "Strategic Exchange")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />

      {/* Espace Clients Modal */}
      <AnimatePresence>
        {espaceClientOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ background: "rgba(13, 27, 42, 0.7)" }}
            onClick={() => setEspaceClientOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: "#0F365F" }}
              >
                <span className="text-white text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#0D1B2A" }}>
                {t("Espace Réservé", "Reserved Area")}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#4A5568" }}>
                {t(
                  "Cet espace est une Plateforme exclusivement réservé aux clients de Buildfluence.\n\nVeuillez contacter votre chargé de compte ou nous envoyer un message pour obtenir vos identifiants d'accès.",
                  "This area is a Platform exclusively reserved for Buildfluence clients.\n\nPlease contact your account manager or send us a message to obtain your access credentials.",
                )}
              </p>
              <button
                onClick={() => setEspaceClientOpen(false)}
                className="px-8 py-2.5 text-sm font-semibold uppercase tracking-wider rounded transition-all"
                style={{ background: "#0F365F", color: "#FFFFFF" }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#1a4a73";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#0F365F";
                }}
              >
                {t("Fermer", "Close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
