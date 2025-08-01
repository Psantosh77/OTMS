import React from "react";
import LoginModal from "./LoginModal"; // Adjust the import path as necessary

const Hero = () => {
  return (
    <section
      style={{
        background: "#f8f9fa",
        minHeight: 650,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 0", // padding increased
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100%",
          zIndex: 0,
          background: "url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80') center center/cover no-repeat",
          filter: "blur(8px)", // add blur effect
        }}
      />
      {/* Overlay */}
      {/* Removed overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          margin: "0 auto",
          padding: "0 24px",
          gap: 32,
        }}
      >
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}>
          <h2
            style={{
              color: "#fff", // white text
              fontWeight: 800,
              fontSize: "3rem",
              marginBottom: "1.6rem",
              letterSpacing: "0.5px",
              lineHeight: 1.15,
              textShadow: "0 2px 16px rgba(0,0,0,0.25)"
            }}
          >
            Drive In, Drive Out: Fast, Reliable Car Repairs. <br />
            Your Journey, Our Priority.
          </h2>
          <p
            style={{
              fontSize: "1.35rem",
              color: "#fff", // white text
              marginBottom: "2.2rem",
              lineHeight: 1.6,
              textAlign: "center",
              textShadow: "0 2px 12px rgba(0,0,0,0.18)"
            }}
          >
            Experience hassle-free car care. Trusted mechanics, transparent pricing, and quick turnaround—so you can get back on the road with confidence.
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Replace image with LoginModal component */}
          <LoginModal showModal={true} handleCloseModal={() => {}} />
        </div>
      </div>
    </section>
  );
};

export default Hero;