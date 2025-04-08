// Legend.js
import React from "react";
import "./legend.css";

const Legend = ({ type }) => {
  const getGradient = () => {
    if (type === "annonces") {
      return [
        { color: "#00FF00", label: "< 5" },
        { color: "#66FF00", label: "5 - 10" },
        { color: "#99FF00", label: "10 - 20" },
        { color: "#FFFF00", label: "20 - 30" },
        { color: "#FF9900", label: "30 - 50" },
        { color: "#FF5500", label: "50 - 100" },
        { color: "#FF0000", label: "100+" },
      ];
    } else {
      return [
        { color: "#00FF00", label: "< 3k€" },
        { color: "#66FF00", label: "3k - 4k€" },
        { color: "#99FF00", label: "4k - 5k€" },
        { color: "#FFFF00", label: "5k - 6k€" },
        { color: "#FF9900", label: "6k - 8k€" },
        { color: "#FF5500", label: "8k - 10k€" },
        { color: "#FF0000", label: "10k+" },
      ];
    }
  };

  const title = type === "annonces" ? "Nombre d'annonces" : "Prix moyen au m²";

  return (
    <div className="legend-container">
      <h4>{title}</h4>
      {getGradient().map((item, idx) => (
        <div key={idx} className="legend-item">
          <span className="legend-color" style={{ backgroundColor: item.color }} />
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
