import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const platforms = [
  "AI Powered Monitor",
  "Strategic Workflow",
  "Competitive Velocity Engine",
  "Knowledge Capitalization",
];

const darkInputStyle = {
  background: 'hsl(210 40% 12%)',
  borderColor: 'hsl(220 20% 20%)',
  color: '#F0EDE6',
};

const thematiques = ["Solution", "Strategic Innovation", "Situation critique"];
const priorites = ["Priorité basse", "Priorité normale", "Haute Priorité"];

/* ── FORM 1: Strategic Exchange ── */
export const FormStrategicExchange = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [thematique, setThematique] = useState("");
  const [priorite, setPriorite] = useState("Priorité normale");

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
      <DialogContent className="sm:max-w-2xl" style={{ background: '#1a1a2e', border: '1px solid hsl(220 20% 20%)', color: '#F0EDE6' }}>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl" style={{ color: '#F0EDE6' }}>Réserver mon échange stratégique</DialogTitle>
        </DialogHeader>
        <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: '#8A8F9E' }}>
          <Lock className="h-3 w-3" /> Communication sécurisée et confidentielle
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required name="name" placeholder="Nom" maxLength={100} style={darkInputStyle} />
            <Input required name="org" placeholder="Organisation" maxLength={100} style={darkInputStyle} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required name="poste" placeholder="Poste / Fonction" maxLength={100} style={darkInputStyle} />
            <Input required type="email" name="email" placeholder="Email professionnel" maxLength={255} style={darkInputStyle} />
          </div>
          <Input type="tel" name="phone" placeholder="Téléphone" maxLength={20} style={darkInputStyle} />

          {/* Thématique + Priorité side by side */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: '#8A8F9E' }}>Thématique choisie</label>
              <div className="space-y-2">
                {thematiques.map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#F0EDE6' }}>
                    <input
                      type="radio"
                      name="thematique"
                      value={t}
                      checked={thematique === t}
                      onChange={() => setThematique(t)}
                      className="accent-yellow-400"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: '#8A8F9E' }}>Priorité</label>
              <div className="space-y-2">
                {priorites.map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#F0EDE6' }}>
                    <input
                      type="radio"
                      name="priorite"
                      value={p}
                      checked={priorite === p}
                      onChange={() => setPriorite(p)}
                      className="accent-yellow-400"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            name="message"
            placeholder="Tapez votre texte..."
            maxLength={1000}
            rows={4}
            className="w-full rounded-sm px-3 py-2.5 text-sm"
            style={darkInputStyle}
          />

          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? "Envoi..." : "SOUMETTRE MA DEMANDE"}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px]" style={{ color: '#8A8F9E' }}>
            <Lock className="h-3 w-3" /> Communication sécurisée et confidentielle
          </div>
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
      <DialogContent className="sm:max-w-md" style={{ background: '#1a1a2e', border: '1px solid hsl(220 20% 20%)', color: '#F0EDE6' }}>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl" style={{ color: '#F0EDE6' }}>Évaluer ma situation — GRATUIT</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input required name="name" placeholder="Nom" maxLength={100} style={darkInputStyle} />
          <Input required type="email" name="email" placeholder="Email professionnel" maxLength={255} style={darkInputStyle} />
          <Input name="situation" defaultValue={situation} placeholder="Situation critique" readOnly={!!situation} style={darkInputStyle} />
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
      <DialogContent className="sm:max-w-md" style={{ background: '#1a1a2e', border: '1px solid hsl(220 20% 20%)', color: '#F0EDE6' }}>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl" style={{ color: '#F0EDE6' }}>Demander une démo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input required name="name" placeholder="Nom" maxLength={100} style={darkInputStyle} />
          <Input required name="org" placeholder="Organisation" maxLength={100} style={darkInputStyle} />
          <Input required type="email" name="email" placeholder="Email professionnel" maxLength={255} style={darkInputStyle} />
          <select required name="platform" className="w-full rounded-sm px-3 py-2.5 text-sm" style={{ ...darkInputStyle, appearance: 'auto' }}>
            <option value="">Plateforme d'intérêt</option>
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <textarea name="message" placeholder="Message (optionnel)" maxLength={500} rows={3} className="w-full rounded-sm px-3 py-2.5 text-sm" style={darkInputStyle} />
          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-50">
            {submitting ? "Envoi..." : "Demander une démo"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
