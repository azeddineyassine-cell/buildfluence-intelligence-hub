const TimelineEmbed = () => {
  return (
    <div style={{
      width: "100vw",
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50vw",
      marginRight: "-50vw",
      marginTop: "40px",
      marginBottom: "40px",
      overflow: "hidden" // Empêche les débordements indésirables
    }}>
      <iframe 
        src="/timeline.html" 
        style={{
          width: "100%",
          height: "1000px",
          border: "none",
          display: "block"
        }}
        title="Dispositif de Légitimation Durable"
      />
    </div>
  );
};

export default TimelineEmbed;
