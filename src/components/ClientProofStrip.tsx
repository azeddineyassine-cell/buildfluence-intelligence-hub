import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ClientProofStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  const clients = [
    "Avisa Partners",
    "Ginger International",
    "ADD",
    "Centrale Danone",
    "OCP",
    "UM6SS",
    "HUI Mohammed VI",
    "CEIS",
    t("Présidence du Sénégal", "Presidency of Senegal"),
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
          <p className="max-w-2xl text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {t(
              "Buildfluence leur a transformé l'incertitude en avantage décisionnel souverain :",
              "Buildfluence transformed their uncertainty into sovereign decision advantage:"
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clients.map((client) => (
              <span
                key={client}
                className="text-sm font-semibold tracking-wide text-foreground/40 transition-colors hover:text-foreground grayscale hover:grayscale-0"
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
