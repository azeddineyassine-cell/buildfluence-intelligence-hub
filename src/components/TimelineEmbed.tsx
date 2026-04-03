const TimelineEmbed = () => {
  return (
    <div style={{ width: "100%", margin: "40px 0" }}>
      <iframe
        src="/timeline.html"
        style={{
          width: "100%",
          height: "950px",
          border: "none",
          display: "block",
          borderRadius: "12px"
        }}
        title="Dispositif de Légitimation Durable"
      />
    </div>
  );
};

export default TimelineEmbed;
