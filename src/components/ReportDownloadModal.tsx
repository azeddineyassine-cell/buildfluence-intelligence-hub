import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ReportLang = "fr" | "en" | "ar";

const REPORT_SLUG = "analyse-strategique-globale-2026-08-05";
const HEYZINE_FR_URL = "https://heyzine.com/flip-book/5576753eea.html";


const COPY: Record<ReportLang, Record<string, string>> = {
  fr: {
    kicker: "RAPPORT INSTITUTIONNEL",
    title: "Analyse stratégique globale",
    intro:
      "Renseignez vos coordonnées professionnelles pour accéder au rapport. Vos données servent uniquement au suivi de la demande.",
    lastName: "Nom",
    firstName: "Prénom",
    company: "Société",
    position: "Fonction",
    phone: "Téléphone",
    email: "Email professionnel",
    submit: "Accéder au rapport",
    sending: "Envoi en cours…",
    close: "Fermer",
    success: "Demande enregistrée. Vous pouvez feuilleter le rapport ou télécharger le PDF.",
    interactive: "Feuilleter sur Heyzine",
    download: "Télécharger le PDF",
    error: "Envoi impossible pour le moment. Merci de réessayer.",
    invalid: "Merci de compléter tous les champs avec un email valide.",
  },
  en: {
    kicker: "INSTITUTIONAL REPORT",
    title: "Global strategic analysis",
    intro:
      "Provide your professional details to access the report. Your data is used only to track the request.",
    lastName: "Last name",
    firstName: "First name",
    company: "Company",
    position: "Position",
    phone: "Phone",
    email: "Business email",
    submit: "Get the report",
    sending: "Sending…",
    close: "Close",
    success: "Request recorded. The download is starting.",
    interactive: "View interactive report",
    download: "Download PDF",
    error: "Unable to send right now. Please try again.",
    invalid: "Please complete all fields with a valid email.",
  },
  ar: {
    kicker: "تقرير مؤسسي",
    title: "التحليل الاستراتيجي الشامل",
    intro:
      "يرجى إدخال بياناتك المهنية للوصول إلى التقرير. تُستخدم بياناتك لمتابعة الطلب فقط.",
    lastName: "الاسم العائلي",
    firstName: "الاسم الشخصي",
    company: "المؤسسة",
    position: "الوظيفة",
    phone: "الهاتف",
    email: "البريد المهني",
    submit: "الحصول على التقرير",
    sending: "جارٍ الإرسال…",
    close: "إغلاق",
    success: "تم تسجيل الطلب. سيبدأ التحميل.",
    interactive: "تصفح التقرير التفاعلي",
    download: "تحميل ملف PDF",
    error: "تعذّر الإرسال حالياً. يرجى المحاولة مرة أخرى.",
    invalid: "يرجى إكمال جميع الحقول ببريد إلكتروني صحيح.",
  },
};

const EMPTY = {
  lastName: "",
  firstName: "",
  company: "",
  position: "",
  phone: "",
  email: "",
};

interface Props {
  open: boolean;
  lang: ReportLang;
  onClose: () => void;
}

const ReportDownloadModal = ({ open, lang, onClose }: Props) => {
  const t = COPY[lang] ?? COPY.fr;
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setMessage("");
    setDownloadUrl("");
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const triggerDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "Buildfluence_Intelligence_Politique_Analyse_Strategique_Globale.pdf";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const openHeyzine = () => {
    const link = document.createElement("a");
    link.href = HEYZINE_FR_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const filled = Object.values(values).every((v) => v.trim().length > 0);
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());
    if (!filled || !validEmail) {
      setStatus("error");
      setMessage(t.invalid);
      return;
    }
    setStatus("sending");
    setMessage("");
    const { data, error } = await supabase.functions.invoke("send-access-request", {
      body: {
        name: `${values.firstName.trim()} ${values.lastName.trim()}`.trim(),
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        organization: values.company.trim(),
        position: values.position.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        langue: lang === "en" ? "en" : lang === "ar" ? "ar" : "fr",
        request_type: "political_report_download",
        report_slug: REPORT_SLUG,
      },
    });
    const payload = data as { success?: boolean; downloadUrl?: string } | null;
    if (error || !payload?.success || !payload.downloadUrl) {
      setStatus("error");
      setMessage(t.error);
      return;
    }
    setStatus("done");
    setMessage(t.success);
    setDownloadUrl(payload.downloadUrl);
    if (lang === "fr") openHeyzine();
    else triggerDownload(payload.downloadUrl);
  };


  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0D1B2A]/80 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="w-full max-w-xl rounded-[2px] border border-[#D9CFBC] bg-[#FAF6ED] p-7 text-[#0D1B2A] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A7537]">
          {t.kicker}
        </p>
        <h2 id="report-modal-title" className="font-serif text-2xl font-bold">
          {t.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#4A5460]">{t.intro}</p>

        <form className="mt-5 grid gap-3 sm:grid-cols-2" onSubmit={submit}>
          {(
            [
              ["lastName", t.lastName, "text"],
              ["firstName", t.firstName, "text"],
              ["company", t.company, "text"],
              ["position", t.position, "text"],
              ["phone", t.phone, "tel"],
              ["email", t.email, "email"],
            ] as Array<[keyof typeof EMPTY, string, string]>
          ).map(([key, label, type], index) => (
            <label key={key} className="grid gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C6670]">
              {label}
              <input
                ref={index === 0 ? firstFieldRef : undefined}
                type={type}
                required
                value={values[key]}
                onChange={set(key)}
                className="h-10 rounded-[2px] border border-[#D9CFBC] bg-white px-3 text-sm font-normal normal-case tracking-normal text-[#0D1B2A] outline-none focus:border-[#C9A84C]"
              />
            </label>
          ))}

          <div className="sm:col-span-2 mt-1 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="h-10 rounded-[2px] bg-[#C9A84C] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0D1B2A] disabled:opacity-60"
            >
              {status === "sending" ? t.sending : t.submit}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-[2px] border border-[#D9CFBC] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0D1B2A]"
            >
              {t.close}
            </button>
          </div>
        </form>

        {message && (
          <p
            role="status"
            className={`mt-4 text-sm ${status === "error" ? "text-[#E06D4F]" : "text-[#4E9A5F]"}`}
          >
            {message}
          </p>
        )}
        {status === "done" && (
          <div className="mt-4 flex flex-wrap gap-3">
            {lang === "fr" && (
              <button
                type="button"
                onClick={openHeyzine}
                className="h-10 rounded-[2px] bg-[#C9A84C] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0D1B2A]"
              >
                {t.interactive}
              </button>
            )}
            {downloadUrl && (
              <button
                type="button"
                onClick={() => triggerDownload(downloadUrl)}
                className="h-10 rounded-[2px] border border-[#C9A84C] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0D1B2A]"
              >
                {t.download}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDownloadModal;
