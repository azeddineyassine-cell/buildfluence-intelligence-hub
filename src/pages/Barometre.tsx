const Barometre = () => {
  return (
    <iframe
      src="/barometre.html"
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
