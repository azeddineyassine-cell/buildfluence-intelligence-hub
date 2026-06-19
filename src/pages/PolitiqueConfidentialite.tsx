import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

const PolitiqueConfidentialite = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("Qui sommes-nous", "Who we are"),
      body: t(
        "Buildfluence est éditeur du site buildfluence.ai. Pour toute question relative à vos données personnelles, vous pouvez nous contacter à l'adresse info@buildfluence.ai.",
        "Buildfluence operates the website buildfluence.ai. For any question regarding your personal data, you can reach us at info@buildfluence.ai."
      ),
    },
    {
      title: t("Les données que nous traitons", "Data we process"),
      body: t(
        "Nous collectons uniquement les données que vous nous transmettez volontairement, par exemple via un formulaire de contact ou une demande d'échange (nom, email, message). Avec votre consentement, nous collectons aussi des données de navigation anonymisées à des fins de mesure d'audience.",
        "We only collect data you provide voluntarily, for example through a contact form or an enquiry (name, email, message). With your consent, we also collect anonymised browsing data for audience measurement."
      ),
    },
    {
      title: t("Les cookies", "Cookies"),
      body: t(
        "Notre site utilise des cookies nécessaires à son fonctionnement, sans consentement requis. Avec votre accord, nous utilisons des cookies de mesure d'audience pour améliorer le site. Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment via le lien « Gérer les cookies » en bas de page. Aucun cookie de mesure ou de marketing n'est déposé avant votre consentement.",
        "Our website uses cookies that are strictly necessary for it to function, which do not require consent. With your agreement, we use audience measurement cookies to improve the site. You can accept, refuse or customise your choices at any time through the \"Manage cookies\" link at the bottom of every page. No measurement or marketing cookie is set before your consent."
      ),
    },
    {
      title: t("Finalités", "Purposes"),
      body: t(
        "Vos données servent à répondre à vos demandes, vous recontacter, améliorer nos contenus, et, si vous y avez consenti, vous adresser nos analyses et actualités.",
        "Your data is used to respond to your requests, contact you back, improve our content, and, where you have consented, send you our analyses and updates."
      ),
    },
    {
      title: t("Base légale", "Legal basis"),
      body: t(
        "Le traitement repose sur votre consentement et sur notre intérêt légitime à répondre à vos sollicitations et à améliorer notre site.",
        "Processing relies on your consent and on our legitimate interest in responding to your requests and improving our site."
      ),
    },
    {
      title: t("Durée de conservation", "Retention"),
      body: t(
        "Vos données sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées selon les durées légales applicables.",
        "Your data is kept for as long as necessary to handle your request, then archived or deleted in accordance with applicable legal periods."
      ),
    },
    {
      title: t("Partage des données", "Data sharing"),
      body: t(
        "Vos données ne sont jamais vendues. Elles peuvent être traitées par nos prestataires techniques (hébergement, mesure d'audience) agissant pour notre compte et tenus à la confidentialité.",
        "Your data is never sold. It may be processed by our technical providers (hosting, audience measurement) acting on our behalf and bound by confidentiality."
      ),
    },
    {
      title: t("Vos droits", "Your rights"),
      body: t(
        "Conformément à la loi marocaine 09-08 et, le cas échéant, au RGPD pour les résidents de l'Union européenne, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité. Pour les exercer, écrivez-nous à info@buildfluence.ai. Vous pouvez aussi saisir l'autorité compétente, au Maroc la CNDP.",
        "In accordance with Moroccan Law 09-08 and, where applicable, the GDPR for residents of the European Union, you have the right to access, rectify, erase, object to, and port your data. To exercise these rights, write to us at info@buildfluence.ai. You may also lodge a complaint with the competent authority, in Morocco the CNDP."
      ),
    },
    {
      title: t("Modifications", "Changes"),
      body: t(
        "Cette politique peut être mise à jour. La date de dernière mise à jour figure en haut de page.",
        "This policy may be updated. The last update date appears at the top of the page."
      ),
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--cream))" }}>
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <p
            className="text-[11px] uppercase tracking-[0.2em] mb-4"
            style={{ color: "hsl(var(--gold))" }}
          >
            {t("Mentions légales", "Legal")}
          </p>
          <h1
            className="text-4xl md:text-5xl font-serif mb-3"
            style={{ color: "hsl(var(--navy))" }}
          >
            {t("Politique de confidentialité", "Privacy Policy")}
          </h1>
          <p className="text-sm mb-12" style={{ color: "hsl(var(--navy) / 0.6)" }}>
            {t("Dernière mise à jour : 15 avril 2026", "Last updated: April 15, 2026")}
          </p>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2
                  className="text-xl md:text-2xl font-serif mb-3"
                  style={{ color: "hsl(var(--navy))" }}
                >
                  {s.title}
                </h2>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: "hsl(var(--navy) / 0.85)" }}
                >
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <CTAFooter />
    </div>
  );
};

export default PolitiqueConfidentialite;
