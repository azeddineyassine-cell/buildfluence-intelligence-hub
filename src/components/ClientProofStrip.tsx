import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ClientProofStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  const clients = [
    t("Présidence du Sénégal", "Presidency of Senegal"),
    "Centrale Danone",
    "OCP Group",
    "CIDC (OCI)",
    t("Ministère de la Santé", "Ministry of Health"),
    t("Fonds d'Investissement International", "International Investment Fund"),
  ];

  return (
    <section className="border-y border-border bg-background py-10" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t("Ils nous font confiance", "They trust us")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clients.map((client) => (
              <span
                key={client}
                className="text-sm font-semibold tracking-wide text-foreground/60 transition-colors hover:text-foreground"
              >
                {client}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientProofStrip;
