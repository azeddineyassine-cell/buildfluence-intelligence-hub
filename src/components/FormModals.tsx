import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const situations = [
  "Décider sans visibilité",
  "Subir des attaques informationnelles",
  "Perdre la bataille de l'attractivité",
  "Sombrer dans une crise non maîtrisée",
  "Perdre en vélocité face aux concurrents",
  "Déficit d'influence institutionnel",
  "Investir sous risque invisible",
  "Gouverner sous pression médiatique",
  "Autre",
];

const platforms = [
  "AI Powered Monitor",
  "Strategic Workflow",
  "Competitive Velocity Engine",
  "Knowledge Capitalization",
];

/* ── FORM 1: Strategic Exchange ── */
export const FormStrategicExchange = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Demande envoyée", description: "Un conseiller vous contactera sous 24h." });
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-border bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-foreground">Réserver mon échange stratégique</DialogTitle>
        </DialogHeader>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Communication sécurisée et confidentielle
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required name="name" placeholder="Nom" maxLength={100} className="border-border bg-background text-foreground" />
            <Input required name="org" placeholder="Organisation" maxLength={100} className="border-border bg-background text-foreground" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required name="poste" placeholder="Poste / Fonction" maxLength={100} className="border-border bg-background text-foreground" />
            <Input required type="email" name="email" placeholder="Email professionnel" maxLength={255} className="border-border bg-background text-foreground" />
          </div>
          <Input type="tel" name="phone" placeholder="Téléphone" maxLength={20} className="border-border bg-background text-foreground" />
          <select required name="enjeu" className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground">
            <option value="">Enjeu stratégique principal</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? "Envoi..." : "Soumettre ma demande"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

/* ── FORM 2: Diagnostic ── */
export const FormDiagnostic = ({ open, onClose, situation = "" }: { open: boolean; onClose: () => void; situation?: string }) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Demande envoyée", description: "Diagnostic gratuit en cours de traitement." });
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-foreground">Évaluer ma situation — GRATUIT</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input required name="name" placeholder="Nom" maxLength={100} className="border-border bg-background text-foreground" />
          <Input required type="email" name="email" placeholder="Email professionnel" maxLength={255} className="border-border bg-background text-foreground" />
          <Input name="situation" defaultValue={situation} placeholder="Situation critique" readOnly={!!situation} className="border-border bg-background text-foreground" />
          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

/* ── FORM 3: Demo ── */
export const FormDemo = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Demande envoyée", description: "Nous vous contacterons pour organiser la démo." });
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-foreground">Demander une démo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input required name="name" placeholder="Nom" maxLength={100} className="border-border bg-background text-foreground" />
          <Input required name="org" placeholder="Organisation" maxLength={100} className="border-border bg-background text-foreground" />
          <Input required type="email" name="email" placeholder="Email professionnel" maxLength={255} className="border-border bg-background text-foreground" />
          <select required name="platform" className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground">
            <option value="">Plateforme d'intérêt</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <textarea name="message" placeholder="Message (optionnel)" maxLength={500} rows={3} className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground" />
          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? "Envoi..." : "Demander une démo"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
