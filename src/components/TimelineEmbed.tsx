const TimelineEmbed = () => {
  return (
    <div style={{
      width: "100vw",
      position: "relative",
      left: "calc(-50vw + 50%)", // Centre parfaitement l'élément par rapport au viewport
      marginTop: "40px",
      marginBottom: "40px",
      overflow: "hidden"
    }}>
      <iframe 
        src="/timeline.html" 
        style={{
          width: "100%",
          height: "1000px",
          border: "none",
          display: "block"
        }}
        title="Dispositif de Légitimation Éditoriale"
      />
    </div>
  );
};

export default TimelineEmbed;
