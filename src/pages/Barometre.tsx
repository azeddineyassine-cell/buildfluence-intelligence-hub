import { useMemo } from "react";

const Barometre = () => {
  // Cache-busting param so iframe always loads the freshest barometre.html
  const src = useMemo(() => `/barometre.html?v=${Date.now()}`, []);

  return (
    <iframe
      src={src}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        zIndex: 9999,
      }}
      title="Baromètre d'Investissement — Sep 2025"
    />
  );
};

export default Barometre;
