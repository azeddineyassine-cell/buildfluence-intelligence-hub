import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const situations = [
    t("Décider sans visibilité", "Deciding without visibility"),
    t("Subir des attaques informationnelles", "Suffering information attacks"),
    t("Perdre la bataille de l'attractivité", "Losing the battle for attractiveness"),
    t("Sombrer dans une crise non maîtrisée", "Sinking into an uncontrolled crisis"),
    t("Perdre en vélocité face aux concurrents", "Losing velocity against competitors"),
    t("Déficit d'influence institutionnel", "Institutional influence deficit"),
    t("Investir sous risque invisible", "Investing under invisible risk"),
    t("Gouverner sous pression médiatique", "Governing under media pressure"),
    t("Autre", "Other"),
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const { error } = await supabase.from("contact_submissions").insert({
      form_type: "contact",
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      organization: (fd.get("organization") as string) || null,
      position: (fd.get("position") as string) || null,
      phone: (fd.get("phone") as string) || null,
      situation: (fd.get("enjeu") as string) || null,
    });

    setIsSubmitting(false);
    if (error) {
      toast({ title: t("Erreur", "Error"), description: t("Une erreur est survenue. Veuillez réessayer.", "An error occurred. Please try again."), variant: "destructive" });
      return;
    }
    await supabase.functions.invoke('send-email', {
      body: {
        formType: "contact",
        name: fd.get("name") as string,
        email: fd.get("email") as string,
        organization: (fd.get("organization") as string) || null,
        position: (fd.get("position") as string) || null,
        phone: (fd.get("phone") as string) || null,
        situation: (fd.get("enjeu") as string) || null,
      },
    });
    toast({
      title: t("Demande envoyée", "Request sent"),
      description: t("Un conseiller Buildfluence vous contactera dans les 24 heures.", "A Buildfluence advisor will contact you within 24 hours."),
    });
    form.reset();
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
              <span className="label-accent">{t("Contact confidentiel", "Confidential contact")}</span>
              <h1 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {t("Réserver mon échange stratégique", "Book my strategic exchange")}
              </h1>
              <p className="mt-4 text-muted-foreground">
                {t("Échange stratégique confidentiel avec Buildfluence. Chaque demande est traitée avec la plus haute discrétion.", "Confidential strategic exchange with Buildfluence. Every request is treated with the highest discretion.")}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                {t("Communication sécurisée et confidentielle", "Secure and confidential communication")}
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
                  <label className="text-sm font-medium">{t("Nom", "Name")} <span className="text-destructive">*</span></label>
                  <Input required name="name" placeholder={t("Votre nom complet", "Your full name")} maxLength={100} className="border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organisation <span className="text-destructive">*</span></label>
                  <Input required name="organization" placeholder={t("Nom de votre organisation", "Your organization name")} maxLength={100} className="border-border bg-background" />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("Fonction", "Position")} <span className="text-destructive">*</span></label>
                  <Input required name="position" placeholder={t("Votre titre / fonction", "Your title / position")} maxLength={100} className="border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("Email professionnel", "Professional email")} <span className="text-destructive">*</span></label>
                  <Input required type="email" name="email" placeholder={t("votre@organisation.com", "your@organisation.com")} maxLength={255} className="border-border bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Téléphone", "Phone")}</label>
                <Input type="tel" name="phone" placeholder="+33 / +212 / +221..." maxLength={20} className="border-border bg-background" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Enjeu stratégique principal", "Main strategic challenge")} <span className="text-destructive">*</span></label>
                <select required name="enjeu" className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm">
                  <option value="">{t("Sélectionner une situation", "Select a situation")}</option>
                  {situations.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full disabled:opacity-60"
              >
                {isSubmitting ? t("Envoi en cours...", "Sending...") : t("Soumettre ma demande", "Submit my request")}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                {t("Vos informations sont traitées avec la plus stricte confidentialité. Réponse sous 24h.", "Your information is treated with the strictest confidentiality. Response within 24h.")}
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
