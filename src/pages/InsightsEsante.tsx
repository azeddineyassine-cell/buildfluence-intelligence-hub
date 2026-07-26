import SEO from "@/components/SEO";

const InsightsEsante = () => {
  return (
    <>
      <SEO
        titleFr="Livre Blanc e-Santé · Intelligence et innovation"
        titleEn="Digital Health White Paper · Buildfluence"
        descriptionFr={"Livre blanc Buildfluence sur la e-santé : dynamiques du secteur, innovation, acteurs clés et enjeux d'intelligence stratégique."}
        descriptionEn="Buildfluence white paper on digital health: sector dynamics, innovation, key players and strategic intelligence stakes."
        path="/insights/esante"
      />
      <div style={{ background: "#FAF6ED", minHeight: "100vh" }}>
        <iframe
          src="/esante_livre_blanc_v2_4.html"
          title="Livre Blanc e-Santé"
          style={{
            display: "block",
            width: "75%",
            height: "100vh",
            margin: "0 auto",
            border: "none",
            background: "#FAF6ED",
          }}
        />
      </div>
    </>
  );
};

export default InsightsEsante;
