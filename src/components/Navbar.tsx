import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: t("Situations critiques", "Critical Situations"), href: "#situations-critiques" },
    { label: t("Nos Solutions", "Our Solutions"), href: "#nos-solutions" },
    { label: t("Strategic Innovation", "Strategic Innovation"), href: "#strategic-innovation" },
    { label: t("Success Stories", "Success Stories"), href: "#success-stories" },
    { label: t("Insights", "Insights"), href: "#insights" },
    { label: t("Pourquoi Buildfluence", "Why Buildfluence"), href: "#pourquoi-buildfluence" },
  ];

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <a href="/" className="flex items-center gap-2.5" onClick={() => navigate("/")}>
          <img src={logo} alt="Buildfluence" className="h-8 w-auto" />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Build<span className="text-gradient-gold">fluence</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
            className="rounded bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground transition-all hover:shadow-navy"
          >
            {t("Échange stratégique", "Strategic Discussion")}
          </a>
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="ml-1 rounded border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 xl:hidden">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="rounded border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background xl:hidden"
          >
            <div className="container flex flex-col gap-4 py-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); setOpen(false); navigate("/contact"); }}
                className="mt-2 rounded bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                {t("Échange stratégique", "Strategic Discussion")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
