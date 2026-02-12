import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  "Situations Critiques",
  "Nos Solutions",
  "Strategic Innovation",
  "Success Stories",
  "Pourquoi Buildfluence",
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Build<span className="text-accent">fluence</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
          >
            Évaluer ma situation
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-foreground lg:hidden"
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
            className="border-t border-border bg-background lg:hidden"
          >
            <div className="container flex flex-col gap-4 py-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 rounded-sm bg-accent px-5 py-2.5 text-center text-sm font-semibold text-accent-foreground"
              >
                Évaluer ma situation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
