import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Lock, X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export type ReaderLang = "fr" | "en" | "ar";
export type ReaderTheme = "light" | "dark";

const PREVIEW_PATH = "/reports/Buildfluence_Intelligence_Politique_Apercu_Pages_01-08.pdf";
const PREVIEW_PAGES = 8;
const TOTAL_PAGES = 16;

const COPY: Record<ReaderLang, Record<string, string>> = {
  fr: {
    kicker: "APERÇU GRATUIT · 8 PAGES SUR 16",
    title: "Analyse stratégique globale",
    close: "Fermer le lecteur",
    prev: "Page précédente",
    next: "Page suivante",
    zoomIn: "Zoom avant",
    zoomOut: "Zoom arrière",
    reset: "Réinitialiser le zoom",
    page: "Page",
    of: "sur",
    locked: "Page verrouillée",
    lockedHint: "Pages 9 à 16 réservées : renseignez le formulaire pour accéder au rapport complet.",
    endTitle: "Vous avez consulté les 8 premières pages.",
    endBody:
      "Le rapport complet comprend 16 pages d’analyses, de signaux stratégiques et de précisions méthodologiques.",
    endCta: "RECEVOIR ET TÉLÉCHARGER LE RAPPORT COMPLET",
    loading: "Chargement de l’aperçu…",
    error: "L’aperçu n’a pas pu être chargé. Merci de réessayer.",
    pagesNav: "Navigation des pages",
  },
  en: {
    kicker: "FREE PREVIEW · 8 OF 16 PAGES",
    title: "Global strategic analysis",
    close: "Close the reader",
    prev: "Previous page",
    next: "Next page",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    reset: "Reset zoom",
    page: "Page",
    of: "of",
    locked: "Locked page",
    lockedHint: "Pages 9 to 16 are restricted: complete the form to access the full report.",
    endTitle: "You have viewed the first 8 pages.",
    endBody:
      "The complete report contains 16 pages of analysis, strategic signals and methodological details.",
    endCta: "GET AND DOWNLOAD THE COMPLETE REPORT",
    loading: "Loading the preview…",
    error: "The preview could not be loaded. Please try again.",
    pagesNav: "Page navigation",
  },
  ar: {
    kicker: "معاينة مجانية · 8 صفحات من أصل 16",
    title: "التحليل الاستراتيجي الشامل",
    close: "إغلاق القارئ",
    prev: "الصفحة السابقة",
    next: "الصفحة التالية",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    reset: "إعادة ضبط التكبير",
    page: "صفحة",
    of: "من",
    locked: "صفحة مقفلة",
    lockedHint: "الصفحات من 9 إلى 16 محجوزة: يرجى إكمال الاستمارة للوصول إلى التقرير الكامل.",
    endTitle: "لقد اطلعت على الصفحات الثماني الأولى.",
    endBody: "يتضمن التقرير الكامل 16 صفحة من التحليلات والإشارات الاستراتيجية والتوضيحات المنهجية.",
    endCta: "الحصول على التقرير الكامل وتحميله",
    loading: "جارٍ تحميل المعاينة…",
    error: "تعذّر تحميل المعاينة. يرجى المحاولة مرة أخرى.",
    pagesNav: "التنقل بين الصفحات",
  },
};

interface Props {
  open: boolean;
  lang: ReaderLang;
  theme: ReaderTheme;
  onClose: () => void;
  onUnlock: () => void;
}

const ReportPreviewReader = ({ open, lang, theme, onClose, onUnlock }: Props) => {
  const t = COPY[lang] ?? COPY.fr;
  const rtl = lang === "ar";
  const dark = theme === "dark";

  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const docRef = useRef<pdfjs.PDFDocumentProxy | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const palette = useMemo(
    () =>
      dark
        ? {
            shell: "#0D1B2A",
            panel: "#132335",
            text: "#F5F1E8",
            muted: "#A9B3BF",
            rule: "#26384C",
          }
        : {
            shell: "#FAF6ED",
            panel: "#F5F1E8",
            text: "#0D1B2A",
            muted: "#5C6670",
            rule: "#D9CFBC",
          },
    [dark]
  );

  /* Load document once opened */
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setStatus("loading");
    setPage(1);
    setZoom(1);
    const task = pdfjs.getDocument({ url: PREVIEW_PATH });
    task.promise
      .then((doc) => {
        if (cancelled) return;
        docRef.current = doc;
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
      task.destroy().catch(() => undefined);
      docRef.current = null;
    };
  }, [open]);

  /* Render current page */
  const render = useCallback(async () => {
    const doc = docRef.current;
    const canvas = canvasRef.current;
    if (!doc || !canvas || page > PREVIEW_PAGES) return;
    const pdfPage = await doc.getPage(page);
    const available = (stageRef.current?.clientWidth ?? 900) - 24;
    const base = pdfPage.getViewport({ scale: 1 });
    const fit = Math.min(1.8, Math.max(0.35, available / base.width));
    const viewport = pdfPage.getViewport({ scale: fit * zoom });
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(viewport.width * ratio);
    canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    await pdfPage.render({ canvasContext: ctx, viewport, canvas }).promise;
  }, [page, zoom]);

  useEffect(() => {
    if (status !== "ready") return;
    render().catch(() => undefined);
  }, [status, render]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => render().catch(() => undefined);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, render]);

  /* Focus management + keyboard */
  useEffect(() => {
    if (!open) {
      restoreFocus.current?.focus?.();
      return;
    }
    restoreFocus.current = document.activeElement as HTMLElement;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") setPage((p) => Math.min(PREVIEW_PAGES, p + 1));
      else if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const btn = `inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-[2px] border px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C] disabled:opacity-40`;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-[#0D1B2A]/85 p-2 sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${t.title} — ${t.kicker}`}
        dir={rtl ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
        className="flex h-[96vh] w-full max-w-[1200px] flex-col rounded-[2px] border shadow-2xl"
        style={{ background: palette.shell, borderColor: palette.rule, color: palette.text }}
      >
        {/* Header */}
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-3"
          style={{ borderColor: palette.rule }}
        >
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
              <bdi dir={rtl ? "rtl" : "ltr"}>{t.kicker}</bdi>
            </p>
            <h2 className="truncate font-serif text-lg font-bold sm:text-xl">{t.title}</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className={btn}
              style={{ borderColor: palette.rule, color: palette.text }}
              aria-label={t.zoomOut}
              title={t.zoomOut}
              onClick={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.2) * 10) / 10))}
            >
              <ZoomOut size={15} />
            </button>
            <button
              type="button"
              className={btn}
              style={{ borderColor: palette.rule, color: palette.text }}
              aria-label={t.reset}
              title={t.reset}
              onClick={() => setZoom(1)}
            >
              <RotateCcw size={15} />
            </button>
            <button
              type="button"
              className={btn}
              style={{ borderColor: palette.rule, color: palette.text }}
              aria-label={t.zoomIn}
              title={t.zoomIn}
              onClick={() => setZoom((z) => Math.min(2.4, Math.round((z + 0.2) * 10) / 10))}
            >
              <ZoomIn size={15} />
            </button>
            <button
              ref={closeRef}
              type="button"
              className={btn}
              style={{ borderColor: palette.rule, color: palette.text }}
              aria-label={t.close}
              title={t.close}
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Stage */}
        <div
          ref={stageRef}
          className="flex-1 overflow-auto px-3 py-4"
          style={{ background: palette.panel }}
        >
          {status === "loading" && (
            <p className="py-16 text-center text-sm" style={{ color: palette.muted }}>
              {t.loading}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="py-16 text-center text-sm text-[#E06D4F]">
              {t.error}
            </p>
          )}
          {status === "ready" && (
            <div className="flex flex-col items-center gap-4" dir="ltr">
              <canvas
                ref={canvasRef}
                className="max-w-full select-none border"
                style={{ borderColor: palette.rule, background: "#fff" }}
                aria-label={`${t.page} ${page} / ${TOTAL_PAGES}`}
              />
              {page === PREVIEW_PAGES && (
                <div
                  dir={rtl ? "rtl" : "ltr"}
                  className="w-full max-w-[720px] rounded-[2px] border p-5 text-center"
                  style={{ borderColor: "#C9A84C", background: dark ? "#0D1B2A" : "#FAF6ED" }}
                >
                  <p className="font-serif text-lg font-bold">{t.endTitle}</p>
                  <p className="mx-auto mt-2 max-w-[52ch] text-sm leading-relaxed" style={{ color: palette.muted }}>
                    {t.endBody}
                  </p>
                  <button
                    type="button"
                    onClick={onUnlock}
                    className="mt-4 inline-flex h-11 items-center rounded-[2px] bg-[#C9A84C] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0D1B2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D1B2A]"
                  >
                    {t.endCta}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer: 16-page progress */}
        <div className="border-t px-4 py-3" style={{ borderColor: palette.rule }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className={btn}
                style={{ borderColor: palette.rule, color: palette.text }}
                aria-label={t.prev}
                title={t.prev}
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                {rtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
              <span className="font-mono text-[11px] tracking-[0.12em]" style={{ color: palette.muted }}>
                <bdi dir="ltr">
                  {t.page} {page} / {PREVIEW_PAGES} — {t.of} {TOTAL_PAGES}
                </bdi>
              </span>
              <button
                type="button"
                className={btn}
                style={{ borderColor: palette.rule, color: palette.text }}
                aria-label={t.next}
                title={t.next}
                disabled={page >= PREVIEW_PAGES}
                onClick={() => setPage((p) => Math.min(PREVIEW_PAGES, p + 1))}
              >
                {rtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
            <p className="max-w-[46ch] text-[11px] leading-snug" style={{ color: palette.muted }}>
              {t.lockedHint}
            </p>
          </div>

          <div
            className="mt-3 flex flex-wrap gap-1"
            role="group"
            aria-label={t.pagesNav}
            dir={rtl ? "rtl" : "ltr"}
          >
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((n) => {
              const locked = n > PREVIEW_PAGES;
              const current = n === page && !locked;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => (locked ? onUnlock() : setPage(n))}
                  aria-current={current ? "page" : undefined}
                  aria-label={locked ? `${t.locked} ${n}` : `${t.page} ${n}`}
                  title={locked ? `${t.locked} ${n}` : `${t.page} ${n}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[2px] border font-mono text-[11px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]"
                  style={{
                    borderColor: current ? "#C9A84C" : palette.rule,
                    background: current ? "#C9A84C" : "transparent",
                    color: current ? "#0D1B2A" : locked ? palette.muted : palette.text,
                    opacity: locked ? 0.75 : 1,
                  }}
                >
                  {locked ? <Lock size={12} aria-hidden="true" /> : <bdi dir="ltr">{n}</bdi>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreviewReader;
