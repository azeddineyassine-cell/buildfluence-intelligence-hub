import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Demande envoyée",
        description: "Un conseiller Buildfluence vous contactera dans les 24 heures.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-28">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="label-accent">Contact confidentiel</span>
              <h1 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Réserver mon échange stratégique
              </h1>
              <p className="mt-4 text-muted-foreground">
                Échange stratégique confidentiel avec Buildfluence. Chaque demande est traitée avec la plus haute discrétion.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                Communication sécurisée et confidentielle
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="card-glass mt-12 space-y-6 p-8 md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom <span className="text-destructive">*</span></label>
                  <Input required name="name" placeholder="Votre nom complet" maxLength={100} className="border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organisation <span className="text-destructive">*</span></label>
                  <Input required name="organization" placeholder="Nom de votre organisation" maxLength={100} className="border-border bg-background" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fonction <span className="text-destructive">*</span></label>
                  <Input required name="position" placeholder="Votre titre / fonction" maxLength={100} className="border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email professionnel <span className="text-destructive">*</span></label>
                  <Input required type="email" name="email" placeholder="votre@organisation.com" maxLength={255} className="border-border bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Téléphone</label>
                <Input type="tel" name="phone" placeholder="+33 / +212 / +221..." maxLength={20} className="border-border bg-background" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Enjeu stratégique principal <span className="text-destructive">*</span></label>
                <select required name="enjeu" className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm">
                  <option value="">Sélectionner une situation</option>
                  {situations.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full disabled:opacity-60"
              >
                {isSubmitting ? "Envoi en cours..." : "Soumettre ma demande"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Vos informations sont traitées avec la plus stricte confidentialité. Réponse sous 24h.
              </p>
            </motion.form>
          </div>
        </div>
      </section>
      <CTAFooter />
    </div>
  );
};

export default Contact;
