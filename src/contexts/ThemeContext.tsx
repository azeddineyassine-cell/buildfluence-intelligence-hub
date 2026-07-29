import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type IPTheme = "dark" | "light";
const KEY = "ip-theme";

interface Ctx {
  theme: IPTheme;
  setTheme: (t: IPTheme) => void;
}

const ThemeContext = createContext<Ctx | undefined>(undefined);

function readInitial(): IPTheme {
  if (typeof window === "undefined") return "dark";
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === "light" || v === "dark") return v;
  } catch { /* ignore */ }
  return "dark";
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<IPTheme>(readInitial);

  const setTheme = (t: IPTheme) => {
    setThemeState(t);
    try { window.localStorage.setItem(KEY, t); } catch { /* ignore */ }
  };

  // Listen for theme changes coming from the iframe mockup
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data as { type?: string; theme?: IPTheme } | undefined;
      if (d && d.type === "ip-theme" && (d.theme === "dark" || d.theme === "light")) {
        setTheme(d.theme);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useIPTheme = (): Ctx => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useIPTheme must be used within ThemeProvider");
  return ctx;
};
