// src/components/HowItWorks.jsx
import React from "react";
import "animate.css";
import { Flip } from "react-awesome-reveal"; // ✅ sahi import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";

import '../styles/Home.css'

const steps = [
  {
    title: "Book Your Service",
    icon: "📋",
    iconstep: <FontAwesomeIcon icon={fa1} />,
    description:
      "Online form / WhatsApp / Call.",
  },
  {
    title: "We Come To You",
    icon: "📅",
     iconstep: <FontAwesomeIcon icon={fa2} />,
    description:
      "Certified technician arrives with tools & parts.",
  },
  {
    title: "Drive Stress-Free ",
    icon: "📍",
     iconstep: <FontAwesomeIcon icon={fa3} />,
    description: "Service completed + digital report delivered.",
  },

];

const HowItWorks = () => {
  return (
    <section className="relative py-5 overflow-hidden" id="how-it-works">
      {/* Background */}
    
      <div className="container text-center relative z-10">
        <h2 className="fw-bold display-6 mb-3 text-dark">How OTGMS Works</h2>
        <p className="text-muted mb-5">
          Book, Track, and Get your car services or rentals – all in a few taps.
        </p>

        <div className="row g-4" style={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
  {steps.map((step, index) => (
    <div key={index} className="col-12 col-sm-6 col-md-3 d-flex">
      <div className="How-its-work-cards card border-0 w-100 h-100 d-flex flex-column" style={{ backgroundColor: "#EFEFEF" }}>
        <div className="card-body text-center d-flex flex-column flex-grow-1">
          <div
            className="mb-3"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#f0f4ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "#333",
              margin: "0 auto",
            }}
          >
            {step.iconstep}
          </div>

          <div className="fs-1 mb-3">{step.icon}</div>
          <h5 className="fw-200">{step.title}</h5>

          {/* flex-grow-1 se description stretch hogi aur bottom align hoga */}
          <p className="text-muted small flex-grow-1">{step.description}</p>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default HowItWorks;
