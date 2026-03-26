import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Client logos
import centraleDanoneLogo from "@/assets/clients/centrale-danone.jpg";
import gingerLogo from "@/assets/clients/ginger-international.jpg";
import ministereSanteLogo from "@/assets/clients/ministere-sante.jpg";
import ceisLogo from "@/assets/clients/ceis.png";
import ocpLogo from "@/assets/clients/ocp.png";
import avisaPartnersLogo from "@/assets/clients/avisa-partners.jpg";

interface Testimonial {
  name: string;
  title: string;
  logo: string;
  text: string;
}

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      name: "Samia Kabbaj",
      title: t("Secrétaire Générale", "Secretary General"),
      logo: centraleDanoneLogo,
      text: t(
        "Prestataire de référence depuis 2016 ayant réalisé avec succès de multiples missions grâce à un professionnalisme et une rigueur à toute épreuve. La qualité constante des livrables a instauré une relation de confiance durable pour le traitement de thématiques variées au sein du groupe. Une expertise éprouvée au service de la performance.",
        "Reference service provider since 2016 having successfully completed multiple missions with unwavering professionalism and rigor. The consistent quality of deliverables has established a lasting relationship of trust for handling various topics within the group. Proven expertise at the service of performance."
      ),
    },
    {
      name: "Olivier Laboue",
      title: t("Directeur de Développement International", "International Development Director"),
      logo: gingerLogo,
      text: t(
        "Mandaté pour un audit d'image, le cabinet Buildfluence a livré des solutions innovantes et créatives. La mission s'est distinguée par un professionnalisme exemplaire, une attention méticuleuse aux détails et un respect total des délais de livraison. Une vive recommandation pour tout projet alliant excellence opérationnelle et créativité.",
        "Mandated for an image audit, Buildfluence delivered innovative and creative solutions. The mission stood out for its exemplary professionalism, meticulous attention to detail and total respect for delivery deadlines. A strong recommendation for any project combining operational excellence and creativity."
      ),
    },
    {
      name: "Dr Hanan Fadlallah",
      title: t("Cheffe de DivCom", "Head of DivCom"),
      logo: ministereSanteLogo,
      text: t(
        "Conseiller stratégique lors de la crise H1N1, Azeddine Yassine a apporté une vision exceptionnelle en gestion & communication de crise et data intelligence. Son accompagnement du Ministre et de la Division de Communication a durablement renforcé la stratégie institutionnelle grâce à une analyse fine et une méthodologie rigoureuse.",
        "Strategic advisor during the H1N1 crisis, Azeddine Yassine brought an exceptional vision in crisis management & communication and data intelligence. His support of the Minister and the Communication Division has lastingly strengthened the institutional strategy through fine analysis and rigorous methodology."
      ),
    },
    {
      name: "Guillaume Tissier",
      title: t("Président", "President"),
      logo: ceisLogo,
      text: t(
        "Partenaire de confiance depuis 2011, spécialisé dans la mise en place de dispositif de veille spécifiques et le management de ressources transverses. Ses capacités d'analyse, de synthèse et ses investigations digitales à haute valeur ajoutée en font un conseiller parfait pour le décryptage de thématiques complexes.",
        "Trusted partner since 2011, specialized in setting up specific monitoring systems and managing cross-functional resources. His analytical and synthesis capabilities and high value-added digital investigations make him a perfect advisor for decrypting complex topics."
      ),
    },
    {
      name: "Sanae Alami",
      title: t("VP Chargée de mission", "VP Project Manager"),
      logo: ocpLogo,
      text: t(
        "Expert polyvalent, Azeddine Yassine a excellé dans l'élaboration d'orientations stratégiques du groupe, la mise en place des systèmes de veille et le décryptage de thématiques complexes. Ses capacités d'analyse et de synthèse ont apporté une plus-value certaine à l'information décisionnelle pour la Direction Générale.",
        "Versatile expert, Azeddine Yassine excelled in developing the group's strategic orientations, setting up monitoring systems and decrypting complex topics. His analytical and synthesis capabilities brought definite added value to decision-making information for the General Management."
      ),
    },
    {
      name: "Antoine Surcouf",
      title: t("Directeur Général", "Chief Executive Officer"),
      logo: avisaPartnersLogo,
      text: t(
        "Expert international sollicité depuis 2017 pour des analyses socio-économiques et géopolitiques complexes nécessitant des prises de décision rapides et factuelles. Son approche rigoureuse, organisée et discrète permet de produire des documents de haute volée qui dépassent systématiquement les exigences initiales. Une fiabilité sans faille sur des enjeux stratégiques globaux.",
        "International expert sought since 2017 for complex socio-economic and geopolitical analyses requiring rapid and factual decision-making. His rigorous, organized and discreet approach produces top-quality documents that systematically exceed initial requirements. Flawless reliability on global strategic issues."
      ),
    },
  ];

  return (
    <section ref={ref} className="py-[88px]" style={{ background: "#F4F4F4" }}>
      <div className="mx-auto max-w-[1100px] px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-11"
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-[18px]"
            style={{ color: "hsl(var(--gold))" }}
          >
            Testimonials
          </p>
          <h2 className="font-serif text-[36px] font-black" style={{ color: "#0D1B2A" }}>
            {t("Ce qu'ils disent de nous", "What they say about us")}
          </h2>
          <p className="mt-3 text-base italic" style={{ color: "#5A6170" }}>
            {t(
              "Retours d'expérience de nos clients, institutionnels et privés, qui ont fait confiance à notre expertise pour transformer leurs enjeux stratégiques en succès durables :",
              "Feedback from our institutional and private clients who trusted our expertise to transform their strategic challenges into lasting success:"
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((tm, i) => (
            <motion.div
              key={tm.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-sm p-7"
              style={{
                background: "#ffffff",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: "#f0f2f5" }}>
                  <span className="text-lg font-bold" style={{ color: "#0D1B2A" }}>
                    {tm.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold" style={{ color: "#0D1B2A" }}>{tm.name}</p>
                  <p className="text-[12px]" style={{ color: "#6B7280" }}>{tm.title}</p>
                </div>
              </div>
              <img
                src={tm.logo}
                alt=""
                className="h-8 w-auto object-contain mb-4"
                style={{ filter: "grayscale(30%)" }}
              />
              <p className="text-[13px] leading-[1.7] italic" style={{ color: "#4A5568" }}>
                "{tm.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
