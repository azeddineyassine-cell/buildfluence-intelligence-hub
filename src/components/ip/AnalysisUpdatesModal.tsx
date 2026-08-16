import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type IPLang = "fr" | "en" | "ar";

const COPY: Record<IPLang, Record<string, string>> = {
  fr: {
    kicker: "PROCHAINES ANALYSES",
    title: "Recevez les prochaines analyses stratégiques",
    intro:
      "Inscrivez-vous pour recevoir en avant-première les prochaines vagues d’analyse de la période préélectorale, jusqu’au 23 septembre 2026.",
    firstName: "Prénom (facultatif)",
    email: "Email",
    company: "Société ou organisation (facultatif)",
    consent: "J’accepte de recevoir ces publications d’analyse par email. Désinscription possible à tout moment via le lien présent dans chaque email.",
    privacy: "Politique de confidentialité",
    submit: "M’INSCRIRE AUX PROCHAINES ANALYSES",
    sending: "Envoi en cours…",
    close: "Fermer",
    success: "Votre inscription est confirmée. Vous recevrez les prochaines analyses stratégiques dès leur publication.",
    error: "Envoi impossible pour le moment. Merci de réessayer.",
    invalidEmail: "Merci de saisir une adresse email valide.",
    needConsent: "Merci de confirmer votre consentement pour recevoir ces publications.",
  },
  en: {
    kicker: "UPCOMING ANALYSES",
    title: "Receive the next strategic analyses",
    intro:
      "Sign up to receive early access to the next waves of analysis covering the pre-election period, through 23 September 2026.",
    firstName: "First name (optional)",
    email: "Email",
    company: "Company or organisation (optional)",
    consent: "I agree to receive these analysis publications by email. You can unsubscribe at any time using the link in every email.",
    privacy: "Privacy policy",
    submit: "SIGN ME UP FOR THE NEXT ANALYSES",
    sending: "Sending…",
    close: "Close",
    success: "Your registration is confirmed. You will receive the next strategic analyses as soon as they are published.",
    error: "Unable to send right now. Please try again.",
    invalidEmail: "Please enter a valid email address.",
    needConsent: "Please confirm your consent to receive these publications.",
  },
  ar: {
    kicker: "التحليلات القادمة",
    title: "استلم التحليلات الاستراتيجية القادمة",
    intro:
      "سجّل للحصول على الأسبقية في تلقي الموجات القادمة من تحليل المرحلة ما قبل الانتخابية، إلى غاية 23 شتنبر 2026.",
    firstName: "الاسم الشخصي (اختياري)",
    email: "البريد الإلكتروني",
    company: "المؤسسة أو المنظمة (اختياري)",
    consent: "أوافق على تلقي هذه المنشورات التحليلية بالبريد الإلكتروني. يمكن إلغاء الاشتراك في أي وقت عبر الرابط الموجود في كل رسالة.",
    privacy: "سياسة الخصوصية",
    submit: "التسجيل في التحليلات القادمة",
    sending: "جارٍ الإرسال…",
    close: "إغلاق",
    success: "تم تأكيد تسجيلك. ستتلقى التحليلات الاستراتيجية القادمة بمجرد نشرها.",
    error: "تعذّر الإرسال حالياً. يرجى المحاولة مرة أخرى.",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
    needConsent: "يرجى تأكيد موافقتك على تلقي هذه المنشورات.",
  },
};

interface Props {
  open: boolean;
  lang: IPLang;
  onClose: () => void;
}

const AnalysisUpdatesModal = ({ open, lang, onClose }: Props) => {
  const t = COPY[lang] ?? COPY.fr;
  const rtl = lang === "ar";
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const firstRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setMessage("");
    const timer = window.setTimeout(() => firstRef.current?.focus(), 60);
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setMessage(t.invalidEmail);
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage(t.needConsent);
      return;
    }
    setStatus("sending");
    setMessage("");
    const { data, error } = await supabase.functions.invoke("send-access-request", {
      body: {
        name: firstName.trim() || email.trim(),
        first_name: firstName.trim(),
        organization: company.trim(),
        email: email.trim(),
        langue: lang,
        consent: true,
        request_type: "political_analysis_updates",
      },
    });
    if (error || !(data as { success?: boolean } | null)?.success) {
      setStatus("error");
      setMessage(t.error);
      return;
    }
    setStatus("done");
    setMessage(t.success);
  };

  const field =
    "h-10 w-full rounded-[2px] border border-[#D9CFBC] bg-white px-3 text-sm font-normal normal-case tracking-normal text-[#0D1B2A] outline-none focus:border-[#C9A84C]";

  return (
    <div
      className="fixed inset-0 z-[125] flex items-center justify-center bg-[#0D1B2A]/80 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ip-updates-title"
        dir={rtl ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[2px] border border-[#D9CFBC] bg-[#FAF6ED] p-7 text-[#0D1B2A] shadow-2xl"
      >
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7537]">{t.kicker}</p>
        <h2 id="ip-updates-title" className="font-serif text-2xl font-bold">
          {t.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#4A5460]">{t.intro}</p>

        {status === "done" ? (
          <div className="mt-5">
            <p role="status" className="text-sm text-[#4E9A5F]">
              {message}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 h-10 rounded-[2px] border border-[#D9CFBC] px-5 text-[11px] font-bold uppercase tracking-[0.16em]"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <form className="mt-5 grid gap-3" onSubmit={submit} noValidate>
            <label className="grid gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C6670]">
              {t.firstName}
              <input ref={firstRef} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={field} />
            </label>
            <label className="grid gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C6670]">
              {t.email}
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
            </label>
            <label className="grid gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C6670]">
              {t.company}
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className={field} />
            </label>
            <label className="mt-1 flex items-start gap-2 text-[12px] leading-snug text-[#4A5460]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-[2px] border-[#D9CFBC] accent-[#C9A84C]"
              />
              <span>{t.consent}</span>
            </label>
            <a
              href="/politique-confidentialite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A7537] underline"
            >
              {t.privacy}
            </a>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="h-11 rounded-[2px] bg-[#C9A84C] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0D1B2A] disabled:opacity-60"
              >
                {status === "sending" ? t.sending : t.submit}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-[2px] border border-[#D9CFBC] px-5 text-[11px] font-bold uppercase tracking-[0.16em]"
              >
                {t.close}
              </button>
            </div>
            {message && (
              <p role="alert" className="text-sm text-[#E06D4F]">
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default AnalysisUpdatesModal;
