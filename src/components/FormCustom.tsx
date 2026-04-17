import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

export interface FormCustomField {
  name: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  maxLength?: number;
  rows?: number;
}

interface FormCustomProps {
  open: boolean;
  onClose: () => void;
  title: string;
  submitLabel: string;
  formType: string;
  fields: FormCustomField[];
}

const lightInputStyle = {
  background: "#FFFFFF",
  borderColor: "#D1D5DB",
  color: "#1a2744",
};

export const FormCustom = ({ open, onClose, title, submitLabel, formType, fields }: FormCustomProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    // Collect all fields into a message payload
    const payload: Record<string, string> = {};
    fields.forEach((f) => {
      const v = fd.get(f.name);
      if (v) payload[f.name] = v.toString();
    });

    const messageBlob = Object.entries(payload)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const { error } = await supabase.from("contact_submissions").insert({
      form_type: formType,
      name: payload.name || payload.fullname || "—",
      email: payload.email || "noreply@buildfluence.com",
      organization: payload.organization || null,
      phone: payload.phone || null,
      topic: payload.sector || payload.topic || null,
      message: messageBlob,
    });

    setSubmitting(false);
    if (error) {
      toast({
        title: t("Erreur", "Error"),
        description: t("Une erreur est survenue. Veuillez réessayer.", "An error occurred. Please try again."),
        variant: "destructive",
      });
      return;
    }

    await supabase.functions.invoke("send-email", {
      body: {
        formType,
        name: payload.name || payload.fullname || "—",
        email: payload.email || null,
        organization: payload.organization || null,
        phone: payload.phone || null,
        topic: payload.sector || payload.topic || null,
        message: messageBlob,
      },
    });

    toast({
      title: t("Demande envoyée", "Request sent"),
      description: t("Un conseiller vous contactera sous 24h.", "An advisor will contact you within 24h."),
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl" style={{ background: "#F4F4F4", border: "1px solid #D1D5DB", color: "#1a2744" }}>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl" style={{ color: "#1a2744" }}>
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
          <Lock className="h-3 w-3" /> {t("Communication sécurisée et confidentielle", "Secure and confidential communication")}
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {fields.map((f) =>
            f.type === "textarea" ? (
              <textarea
                key={f.name}
                name={f.name}
                placeholder={f.placeholder}
                required={f.required}
                maxLength={f.maxLength || 1000}
                rows={f.rows || 4}
                className="w-full rounded-sm px-3 py-2.5 text-sm"
                style={lightInputStyle}
              />
            ) : (
              <Input
                key={f.name}
                name={f.name}
                type={f.type || "text"}
                placeholder={f.placeholder}
                required={f.required}
                maxLength={f.maxLength || 200}
                style={lightInputStyle}
              />
            )
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full disabled:opacity-50 transition-colors"
            style={{
              background: "#C9A84C",
              color: "#0D1B2A",
              fontWeight: 700,
              padding: "12px",
              borderRadius: 4,
              border: "none",
              fontSize: 13,
              letterSpacing: 0.5,
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            {submitting ? t("Envoi...", "Sending...") : submitLabel}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px]" style={{ color: "#6B7280" }}>
            <Lock className="h-3 w-3" /> {t("Communication sécurisée et confidentielle", "Secure and confidential communication")}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
