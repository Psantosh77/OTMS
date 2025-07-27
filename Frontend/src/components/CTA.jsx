// src/components/CTA.jsx
import React from "react";

const CTA = () => {
  return (
    <section className="py-5 bg-primary bg-opacity-10 text-center">
      <div className="container">
        <h2 className="fw-bold display-6 mb-3">
          Ready to Experience Seamless Car Care?
        </h2>
        <p className="lead mb-4">
          Book services, rent a car, or schedule maintenance — all at your fingertips.
        </p>
        <a
          href="#services"
          className="btn btn-light text-primary fw-semibold px-4 py-2 shadow-sm border rounded-pill"
        >
          Get Started with OTGMS
        </a>
      </div>
    </section>
  );
};

export default CTA;
