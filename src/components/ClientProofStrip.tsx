import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  "Avisa Partners",
  "Ginger International",
  "ADD",
  "Centrale Danone",
  "OCP Group",
  "UM6SS",
  "HUI Mohammed VI",
  "CEIS",
  "Présidence du Sénégal",
  "CIDC (OCI)",
];

const ClientProofStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="border-y border-border/30 bg-background py-10" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="max-w-3xl text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Buildfluence leur a transformé l'incertitude en avantage décisionnel souverain :
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clients.map((client) => (
              <span
                key={client}
                className="text-sm font-semibold tracking-wide text-foreground/30 transition-colors duration-300 hover:text-primary grayscale hover:grayscale-0"
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
