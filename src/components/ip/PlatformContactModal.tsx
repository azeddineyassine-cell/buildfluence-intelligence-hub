import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type IPLang = "fr" | "en" | "ar";

const COPY: Record<IPLang, Record<string, string>> = {
  fr: {
    kicker: "CONTACT",
    title: "Contacter l’équipe Intelligence Politique",
    intro: "Vos coordonnées servent uniquement au traitement de votre demande.",
    lastName: "Nom",
    firstName: "Prénom",
    company: "Société",
    position: "Fonction",
    phone: "Téléphone",
    email: "Email",
    subject: "Objet",
    message: "Message",
    privacy: "Politique de confidentialité",
    submit: "Envoyer le message",
    sending: "Envoi en cours…",
    close: "Fermer",
    success: "Votre message a bien été transmis. Notre équipe vous répondra rapidement.",
    error: "Envoi impossible pour le moment. Merci de réessayer.",
    invalid: "Merci de compléter tous les champs avec un email valide.",
  },
  en: {
    kicker: "CONTACT",
    title: "Contact the Political Intelligence team",
    intro: "Your details are used solely to process your request.",
    lastName: "Last name",
    firstName: "First name",
    company: "Company",
    position: "Position",
    phone: "Phone",
    email: "Email",
    subject: "Subject",
    message: "Message",
    privacy: "Privacy policy",
    submit: "Send the message",
    sending: "Sending…",
    close: "Close",
    success: "Your message has been sent. Our team will reply shortly.",
    error: "Unable to send right now. Please try again.",
    invalid: "Please complete all fields with a valid email.",
  },
  ar: {
    kicker: "اتصال",
    title: "الاتصال بفريق الذكاء السياسي",
    intro: "تُستخدم بياناتك لمعالجة طلبك فقط.",
    lastName: "الاسم العائلي",
    firstName: "الاسم الشخصي",
    company: "المؤسسة",
    position: "الوظيفة",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "الرسالة",
    privacy: "سياسة الخصوصية",
    submit: "إرسال الرسالة",
    sending: "جارٍ الإرسال…",
    close: "إغلاق",
    success: "تم إرسال رسالتك. سيجيبكم فريقنا في أقرب وقت.",
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
  subject: "",
  message: "",
};

interface Props {
  open: boolean;
  lang: IPLang;
  onClose: () => void;
}

const PlatformContactModal = ({ open, lang, onClose }: Props) => {
  const t = COPY[lang] ?? COPY.fr;
  const rtl = lang === "ar";
  const [values, setValues] = useState(EMPTY);
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

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

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
        subject: values.subject.trim(),
        message: values.message.trim(),
        langue: lang,
        request_type: "political_platform_contact",
      },
    });
    if (error || !(data as { success?: boolean } | null)?.success) {
      setStatus("error");
      setMessage(t.error);
      return;
    }
    setStatus("done");
    setMessage(t.success);
    setValues(EMPTY);
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
        aria-labelledby="ip-contact-title"
        dir={rtl ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-xl overflow-auto rounded-[2px] border border-[#D9CFBC] bg-[#FAF6ED] p-7 text-[#0D1B2A] shadow-2xl"
      >
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7537]">{t.kicker}</p>
        <h2 id="ip-contact-title" className="font-serif text-2xl font-bold">
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
          <form className="mt-5 grid gap-3 sm:grid-cols-2" onSubmit={submit} noValidate>
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
                  ref={index === 0 ? firstRef : undefined}
                  type={type}
                  required
                  value={values[key]}
                  onChange={set(key)}
                  className={field}
                />
              </label>
            ))}
            <label className="grid gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C6670] sm:col-span-2">
              {t.subject}
              <input type="text" required value={values.subject} onChange={set("subject")} className={field} />
            </label>
            <label className="grid gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5C6670] sm:col-span-2">
              {t.message}
              <textarea
                required
                rows={4}
                value={values.message}
                onChange={set("message")}
                className="w-full rounded-[2px] border border-[#D9CFBC] bg-white p-3 text-sm font-normal normal-case tracking-normal text-[#0D1B2A] outline-none focus:border-[#C9A84C]"
              />
            </label>
            <a
              href="/politique-confidentialite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A7537] underline sm:col-span-2"
            >
              {t.privacy}
            </a>
            <div className="mt-1 flex flex-wrap items-center gap-3 sm:col-span-2">
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
              <p role="alert" className="text-sm text-[#E06D4F] sm:col-span-2">
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default PlatformContactModal;
