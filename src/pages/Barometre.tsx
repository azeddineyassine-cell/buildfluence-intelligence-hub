import { useEffect, useMemo, useState } from "react";
import { FormStrategicExchange } from "@/components/FormModals";
import { useLanguage } from "@/contexts/LanguageContext";

const Barometre = () => {
  const { lang } = useLanguage();
  const src = useMemo(() => `${lang === "en" ? "/barometre-en.html" : "/barometre.html"}?v=${Date.now()}`, [lang]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e?.data === "open-strategic-exchange") setFormOpen(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <>
      <iframe
        src={src}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          zIndex: 0,
        }}
        title="Baromètre d'Investissement — Sep 2025"
      />
      <FormStrategicExchange open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
};

export default Barometre;
