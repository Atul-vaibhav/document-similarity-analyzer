// src/components/ContactButton.tsx
import React from "react";

export default function ContactButton(): JSX.Element {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdChXFvmV9na152hGnCAmzTl0P142IZaU0Xh8Gy7AQQhpzaxA/viewform?usp=dialog"; 

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    right: 24,
    bottom: 24,
    zIndex: 9999,
    background: "#f6f7fb",
    padding: "12px",
    borderRadius: 10,
    border: "1px solid rgba(20,26,40,0.05)",
    boxShadow: "0 6px 18px rgba(20,26,40,0.06)",
  };

  const buttonStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "10px 18px",
    borderRadius: 8,
    background: "#e11d48",
    color: "#fff",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    outline: "none",
  };

  function openForm() {
    window.open(formUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div style={containerStyle}>
      <button type="button" style={buttonStyle} onClick={openForm} aria-label="Contact Me">
        Contact Me
      </button>
    </div>
  );
}
