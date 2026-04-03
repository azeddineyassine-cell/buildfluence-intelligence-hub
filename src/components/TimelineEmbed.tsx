const TimelineEmbed = () => {
  return (
    <div style={{ 
      width: "100vw",
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50vw",
      marginRight: "-50vw",
      margin: "40px 0"
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
