import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFlatIndex, normalize, type SearchLang } from "@/data/searchIndex";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: Props) => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const flat = useMemo(() => getFlatIndex(lang as SearchLang), [lang]);

  const fuse = useMemo(
    () =>
      new Fuse(flat, {
        keys: [
          { name: "_title", weight: 0.6 },
          { name: "_keywords", weight: 0.3 },
          { name: "_excerpt", weight: 0.1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        includeScore: true,
        useExtendedSearch: false,
      }),
    [flat]
  );

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return flat.slice(0, 8);
    return fuse.search(q).map((r) => r.item).slice(0, 20);
  }, [query, fuse, flat]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        const item = results[active];
        if (item) goTo(item.url);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose]);

  const goTo = (url: string) => {
    onClose();
    if (url.includes("#")) {
      const [path, hash] = url.split("#");
      navigate(path || "/");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo(0, 0);
      }, 150);
    } else {
      navigate(url);
      window.scrollTo(0, 0);
    }
  };

  const highlight = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const nq = normalize(q);
    const nt = normalize(text);
    const i = nt.indexOf(nq);
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark style={{ background: "rgba(255, 222, 89, 0.45)", color: "inherit", padding: 0 }}>
          {text.slice(i, i + q.length)}
        </mark>
        {text.slice(i + q.length)}
      </>
    );
  };

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("Recherche", "Search")}
      className="fixed inset-0 z-[2000] flex items-start justify-center px-4 pt-[10vh] sm:pt-[15vh]"
      style={{ background: "rgba(13, 27, 42, 0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-lg shadow-2xl"
        style={{ background: "#ffffff", border: "1px solid #E5E7EB" }}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "#E5E7EB" }}>
          <Search className="h-5 w-5 shrink-0" style={{ color: "#103E8C" }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Rechercher une page, un mot, une expression…", "Search a page, a word, a phrase…")}
            className="flex-1 bg-transparent text-[14px] outline-none"
            style={{ color: "#0D1B2A" }}
            aria-label={t("Champ de recherche", "Search field")}
          />
          <button
            onClick={onClose}
            aria-label={t("Fermer", "Close")}
            className="rounded p-1 transition-colors hover:bg-gray-100"
          >
            <X className="h-4 w-4" style={{ color: "#4A5568" }} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-[13px]" style={{ color: "#8A8F9E" }}>
              {t("Aucun résultat", "No results")}
            </div>
          ) : (
            <ul role="listbox">
              {results.map((r, i) => (
                <li key={r.id + r.url + i}>
                  <button
                    onClick={() => goTo(r.url)}
                    onMouseEnter={() => setActive(i)}
                    role="option"
                    aria-selected={i === active}
                    className="block w-full px-4 py-2.5 text-left transition-colors"
                    style={{
                      background: i === active ? "#F4F6FA" : "transparent",
                      borderLeft: i === active ? "3px solid #C9A84C" : "3px solid transparent",
                    }}
                  >
                    <div className="text-[13px] font-semibold" style={{ color: "#1a1a2e" }}>
                      {highlight(r.title)}
                    </div>
                    <div className="mt-0.5 text-[11px]" style={{ color: "#8A8F9E" }}>
                      <span style={{ color: "#103E8C", fontWeight: 600 }}>{r.section}</span>
                      {" — "}
                      {highlight(r.excerpt)}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="hidden items-center justify-end gap-3 border-t px-4 py-2 text-[10px] sm:flex"
          style={{ borderColor: "#E5E7EB", color: "#8A8F9E" }}
        >
          <span>↑↓ {t("Naviguer", "Navigate")}</span>
          <span>↵ {t("Ouvrir", "Open")}</span>
          <span>Esc {t("Fermer", "Close")}</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchOverlay;
