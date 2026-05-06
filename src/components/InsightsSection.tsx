import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoRaja from "@/assets/clients/raja-club-athletic.jpg";

const InsightsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  const caseUrl = "/Cas_client_RCA_v2.html";
  const pdfUrl = "/Cas_client_RCA_v2.pdf";

  return (
    <section id="insights" className="relative py-10" ref={ref} style={{ background: '#FFFFFF' }}>
      <div className="mx-auto max-w-[1600px] px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label-accent">Insights & Resources</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl" style={{ color: '#0D1B2A' }}>
            {t("Éclairages stratégiques", "Strategic insights")}
          </h2>
          <p className="mt-4 text-base" style={{ color: '#5A6170' }}>
            {t(
              "Cas clients, analyses et notes stratégiques — des preuves, pas des promesses.",
              "Client cases, analyses and strategic notes — evidence, not promises."
            )}
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-sm bg-white"
          style={{
            borderLeft: '6px solid #006233',
            boxShadow: '0 12px 40px -12px rgba(13,27,42,0.18), 0 2px 8px -2px rgba(13,27,42,0.08)',
            border: '1px solid #E5E7EB',
            borderLeftWidth: '6px',
            borderLeftColor: '#006233',
          }}
        >
          <div
            className="absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ background: '#C8972A', color: '#FFFFFF' }}
          >
            {t("Nouveau", "New")}
          </div>

          <div className="p-8 sm:p-10 md:p-12">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" style={{ color: '#C8972A' }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#C8972A' }}>
                {t("Veille sous pression", "Intelligence under pressure")}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold leading-tight sm:text-3xl md:text-[34px]" style={{ color: '#0D1B2A' }}>
              {t(
                "Raja Club Athletic : quand la veille stratégique devient un bouclier institutionnel",
                "Raja Club Athletic: when strategic intelligence becomes an institutional shield"
              )}
            </h3>

            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed" style={{ color: '#3A5470' }}>
              {t(
                "Comment le premier club de football marocain a transformé la pression médiatique en avantage décisionnel grâce à une cellule de veille souveraine.",
                "How Morocco's leading football club turned media pressure into a decision-making advantage through a sovereign intelligence cell."
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[13px]" style={{ color: '#5A6170' }}>
              <span>🏟️ {t("Secteur", "Sector")} : {t("Football professionnel", "Professional football")}</span>
              <span>🇲🇦 {t("Marché", "Market")} : Maroc · Afrique</span>
              <span>📅 {t("Période", "Period")} : Juil. 2025 — Mai 2026</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={caseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all hover:opacity-90"
                style={{ background: '#0D1B2A', color: '#FFFFFF' }}
              >
                {t("Lire le cas", "Read the case")} <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-sm border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all hover:bg-[#FDF3E0]"
                style={{ borderColor: '#C8972A', color: '#C8972A', background: 'transparent' }}
              >
                {t("Télécharger en PDF", "Download as PDF")} <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default InsightsSection;
