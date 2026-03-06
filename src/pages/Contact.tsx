import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t("Demande envoyée", "Request sent"),
        description: t(
          "Un conseiller Buildfluence vous contactera dans les 24 heures.",
          "A Buildfluence advisor will contact you within 24 hours."
        ),
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
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {t("Contact confidentiel", "Confidential Contact")}
              </span>
              <h1 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {t("Réserver mon échange stratégique", "Book my strategic discussion")}
              </h1>
              <p className="mt-4 text-muted-foreground">
                {t(
                  "Échange stratégique confidentiel avec Buildfluence. Chaque demande est traitée avec la plus haute discrétion.",
                  "Confidential strategic discussion with Buildfluence. Every request is handled with the utmost discretion."
                )}
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
              className="mt-12 space-y-6 rounded border border-border bg-card p-8 md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t("Nom", "Name")} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    name="name"
                    placeholder={t("Votre nom complet", "Your full name")}
                    maxLength={100}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Organisation <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    name="organization"
                    placeholder={t("Nom de votre organisation", "Your organization name")}
                    maxLength={100}
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t("Fonction", "Position")} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    name="position"
                    placeholder={t("Votre titre / fonction", "Your title / position")}
                    maxLength={100}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t("Email professionnel", "Professional email")} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder={t("votre@organisation.com", "your@organization.com")}
                    maxLength={255}
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t("Téléphone", "Phone")}
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder={t("+33 / +212 / +221...", "+1 / +44 / +33...")}
                  maxLength={20}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t("Enjeu stratégique principal", "Primary strategic challenge")} <span className="text-destructive">*</span>
                </label>
                <Textarea
                  required
                  name="challenge"
                  placeholder={t(
                    "Décrivez brièvement la nature de votre enjeu stratégique...",
                    "Briefly describe the nature of your strategic challenge..."
                  )}
                  maxLength={1000}
                  className="min-h-[120px] bg-background"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-primary py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-navy disabled:opacity-60"
              >
                {isSubmitting
                  ? t("Envoi en cours...", "Sending...")
                  : t("Soumettre ma demande", "Submit my request")}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                {t(
                  "Vos informations sont traitées avec la plus stricte confidentialité. Réponse sous 24h.",
                  "Your information is handled with the strictest confidentiality. Response within 24h."
                )}
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
