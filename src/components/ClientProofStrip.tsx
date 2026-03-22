import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const clients = [
  "Avisa Partners",
  "Ginger International",
  "ADD",
  "Centrale Danone",
  "OCP Group",
  "UM6SS",
  "HUI Mohammed VI",
  "CEIS",
  { fr: "Présidence du Sénégal", en: "Presidency of Senegal" },
  "CIDC (OCI)",
];

const ClientProofStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section className="py-10" ref={ref} style={{ background: '#FAFAFA', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="max-w-3xl text-center text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#8A8F9E' }}>
            {t(
              "Buildfluence leur a transformé l'incertitude en avantage décisionnel souverain :",
              "Buildfluence transformed their uncertainty into sovereign decision-making advantage:"
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clients.map((client) => {
              const name = typeof client === "string" ? client : t(client.fr, client.en);
              return (
                <span
                  key={name}
                  className="text-sm font-semibold tracking-wide transition-colors duration-300 grayscale hover:grayscale-0 cursor-pointer"
                  style={{ color: '#B0B5C0' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'hsl(43 50% 54%)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#B0B5C0')}
                >
                  {name}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientProofStrip;
