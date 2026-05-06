import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const platforms = [
  "AI Powered Monitor",
  "Strategic Workflow",
  "Competitive Velocity Engine",
  "Knowledge Capitalization",
];

const lightInputStyle = {
  background: '#FFFFFF',
  borderColor: '#D1D5DB',
  color: '#1a2744',
};

export const FormStrategicExchange = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [thematique, setThematique] = useState("");
  const [priorite, setPriorite] = useState(t("Priorité normale", "Normal priority"));

  const thematiques = ["Solution", "Strategic Innovation", t("Situation critique", "Critical situation")];
  const priorites = [t("Priorité basse", "Low priority"), t("Priorité normale", "Normal priority"), t("Haute Priorité", "High priority")];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const { error } = await supabase.from("contact_submissions").insert({
      form_type: "strategic_exchange",
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      organization: fd.get("org") as string,
      position: fd.get("poste") as string,
      phone: (fd.get("phone") as string) || null,
      topic: thematique || null,
      priority: priorite,
      message: (fd.get("message") as string) || null,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: t("Erreur", "Error"), description: t("Une erreur est survenue. Veuillez réessayer.", "An error occurred. Please try again."), variant: "destructive" });
      return;
    }
    // Send email notification - must await before closing modal
    await supabase.functions.invoke('send-email', {
      body: {
        formType: "strategic_exchange",
        name: fd.get("name") as string,
        email: fd.get("email") as string,
        organization: fd.get("org") as string,
        position: fd.get("poste") as string,
        phone: (fd.get("phone") as string) || null,
        topic: thematique || null,
        priority: priorite,
        message: (fd.get("message") as string) || null,
      },
    });
    toast({ title: t("Demande envoyée", "Request sent"), description: t("Un conseiller vous contactera sous 24h.", "An advisor will contact you within 24h.") });
    form.reset();
    setThematique("");
    setPriorite(t("Priorité normale", "Normal priority"));
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl" style={{ background: '#F4F4F4', border: '1px solid #D1D5DB', color: '#1a2744' }}>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl" style={{ color: '#1a2744' }}>{t("Demander mon échange stratégique", "Request my strategic exchange")}</DialogTitle>
        </DialogHeader>
        <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
          <Lock className="h-3 w-3" /> {t("Communication sécurisée et confidentielle", "Secure and confidential communication")}
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required name="name" placeholder={t("Nom", "Name")} maxLength={100} style={lightInputStyle} />
            <Input required name="org" placeholder="Organisation" maxLength={100} style={lightInputStyle} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required name="poste" placeholder={t("Poste / Fonction", "Position / Role")} maxLength={100} style={lightInputStyle} />
            <Input required type="email" name="email" placeholder={t("Email professionnel", "Professional email")} maxLength={255} style={lightInputStyle} />
          </div>
          <Input type="tel" name="phone" placeholder={t("Téléphone", "Phone")} maxLength={20} style={lightInputStyle} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>{t("Thématique choisie", "Chosen topic")}</label>
              <div className="space-y-2">
                {thematiques.map((th) => (
                  <label key={th} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#1a2744' }}>
                    <input type="radio" name="thematique" value={th} checked={thematique === th} onChange={() => setThematique(th)} className="accent-yellow-400" />
                    {th}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>{t("Priorité", "Priority")}</label>
              <div className="space-y-2">
                {priorites.map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#1a2744' }}>
                    <input type="radio" name="priorite" value={p} checked={priorite === p} onChange={() => setPriorite(p)} className="accent-yellow-400" />
                    {p}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <textarea
            name="message"
            placeholder={t("Tapez votre texte...", "Type your message...")}
            maxLength={1000}
            rows={4}
            className="w-full rounded-sm px-3 py-2.5 text-sm"
            style={lightInputStyle}
          />

          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? t("Envoi...", "Sending...") : t("SOUMETTRE MA DEMANDE", "SUBMIT MY REQUEST")}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px]" style={{ color: '#6B7280' }}>
            <Lock className="h-3 w-3" /> {t("Communication sécurisée et confidentielle", "Secure and confidential communication")}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const FormDiagnostic = ({ open, onClose, situation = "" }: { open: boolean; onClose: () => void; situation?: string }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [riskType, setRiskType] = useState(situation || "");

  const riskTypes = [
    t("Décider sans visibilité", "Deciding without visibility"),
    t("Investir sous risque", "Investing under risk"),
    t("Crises non maîtrisées", "Uncontrolled crises"),
    t("Attaques informationnelles", "Informational attacks"),
    t("Gouverner sous pression", "Governing under pressure"),
    t("Déficit d'attractivité", "Attractiveness deficit"),
    t("Déficit d'influence", "Influence deficit"),
    t("Perte de vélocité", "Loss of velocity"),
    t("Autre", "Other"),
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const sectorVal = (fd.get("sector") as string) || "";
    const messageVal = (fd.get("message") as string) || "";
    const composedMessage = sectorVal ? `[${t("Secteur", "Sector")}: ${sectorVal}]\n${messageVal}` : messageVal;

    const { error } = await supabase.from("contact_submissions").insert({
      form_type: "diagnostic",
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      organization: (fd.get("organization") as string) || undefined,
      phone: (fd.get("phone") as string) || undefined,
      situation: riskType || (fd.get("situation") as string) || undefined,
      message: composedMessage || undefined,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: t("Erreur", "Error"), description: t("Une erreur est survenue.", "An error occurred."), variant: "destructive" });
      return;
    }
    await supabase.functions.invoke('send-email', {
      body: {
        formType: "diagnostic",
        name: fd.get("name") as string,
        email: fd.get("email") as string,
        organization: (fd.get("organization") as string) || null,
        sector: sectorVal || null,
        phone: (fd.get("phone") as string) || null,
        situation: riskType || (fd.get("situation") as string) || null,
        message: messageVal || null,
      },
    });
    toast({ title: t("Brief envoyé", "Brief sent"), description: t("Nous vous recontactons rapidement.", "We will get back to you shortly.") });
    form.reset();
    setRiskType("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" style={{ background: '#F4F4F4', border: '1px solid #D1D5DB', color: '#1a2744' }}>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl" style={{ color: '#1a2744' }}>{t("Activez votre bouclier stratégique dès maintenant", "Activate your strategic shield now")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm italic" style={{ color: '#6B7280' }}>{t("Transformez vos risques en opportunités maîtrisées.", "Turn your risks into controlled opportunities.")}</p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Input required name="name" placeholder={t("Nom complet *", "Full name *")} maxLength={100} style={lightInputStyle} />
          <Input required name="organization" placeholder={t("Société *", "Company *")} maxLength={150} style={lightInputStyle} />
          <Input name="sector" placeholder={t("Secteur", "Sector")} maxLength={100} style={lightInputStyle} />
          <Input required type="email" name="email" placeholder={t("Email professionnel *", "Professional email *")} maxLength={255} style={lightInputStyle} />
          <Input required type="tel" name="phone" placeholder={t("Téléphone *", "Phone *")} maxLength={40} style={lightInputStyle} />
          <select
            name="situation"
            value={riskType}
            onChange={(e) => setRiskType(e.target.value)}
            className="w-full rounded-sm px-3 py-2.5 text-sm"
            style={{ ...lightInputStyle, appearance: 'auto' }}
          >
            <option value="">{t("Type de risque", "Risk type")}</option>
            {riskTypes.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {riskType === t("Autre", "Other") && (
            <Input
              name="autre_precision"
              placeholder={t("Précisez votre besoin *", "Specify your need *")}
              maxLength={200}
              required
              style={lightInputStyle}
            />
          )}
          <textarea
            name="message"
            placeholder={t("Message libre", "Free message")}
            rows={4}
            maxLength={2000}
            className="w-full rounded-sm px-3 py-2.5 text-sm"
            style={lightInputStyle}
          />
          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? t("Envoi...", "Sending...") : t("ENVOYER LE BRIEF CONFIDENTIEL", "SEND CONFIDENTIAL BRIEF")}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const FormDemo = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const { error } = await supabase.from("contact_submissions").insert({
      form_type: "demo",
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      organization: fd.get("org") as string,
      platform: (fd.get("platform") as string) || null,
      message: (fd.get("message") as string) || null,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: t("Erreur", "Error"), description: t("Une erreur est survenue.", "An error occurred."), variant: "destructive" });
      return;
    }
    await supabase.functions.invoke('send-email', {
      body: {
        formType: "demo",
        name: fd.get("name") as string,
        email: fd.get("email") as string,
        organization: fd.get("org") as string,
        platform: (fd.get("platform") as string) || null,
        message: (fd.get("message") as string) || null,
      },
    });
    toast({ title: t("Demande envoyée", "Request sent"), description: t("Nous vous contacterons pour organiser la démo.", "We will contact you to schedule the demo.") });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" style={{ background: '#1a1a2e', border: '1px solid hsl(220 20% 20%)', color: '#F0EDE6' }}>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl" style={{ color: '#F0EDE6' }}>{t("Demander une démo", "Request a demo")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input required name="name" placeholder={t("Nom", "Name")} maxLength={100} style={lightInputStyle} />
          <Input required name="org" placeholder="Organisation" maxLength={100} style={lightInputStyle} />
          <Input required type="email" name="email" placeholder={t("Email professionnel", "Professional email")} maxLength={255} style={lightInputStyle} />
          <select required name="platform" className="w-full rounded-sm px-3 py-2.5 text-sm" style={{ ...lightInputStyle, appearance: 'auto' }}>
            <option value="">{t("Plateforme d'intérêt", "Platform of interest")}</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <textarea name="message" placeholder={t("Message (optionnel)", "Message (optional)")} maxLength={500} rows={3} className="w-full rounded-sm px-3 py-2.5 text-sm" style={lightInputStyle} />
          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? t("Envoi...", "Sending...") : t("Demander une démo", "Request a demo")}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
