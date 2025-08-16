// src/components/HowItWorks.jsx
import React from "react";
import "animate.css";
import { Flip } from "react-awesome-reveal"; // ✅ sahi import

const steps = [
  {
    title: "1. Select a Service",
    icon: "📋",
    description:
      "Choose from car servicing, repairs, rentals, or detailing based on your needs.",
  },
  {
    title: "2. Schedule Pickup or Visit",
    icon: "📅",
    description:
      "Pick a convenient date & time for garage visit or doorstep service.",
  },
  {
    title: "3. Track Progress",
    icon: "📍",
    description: "Get live updates on your vehicle's service or rental status.",
  },
  {
    title: "4. Make Payment",
    icon: "💳",
    description:
      "Pay securely via UPI, Card, or Net Banking. Get invoice instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-5 overflow-hidden" id="how-it-works">
      {/* Background */}
      <div className="absolute top-0 left-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="container text-center relative z-10">
        <h2 className="fw-bold display-6 mb-3 text-dark">How OTGMS Works</h2>
        <p className="text-muted mb-5">
          Book, Track, and Get your car services or rentals – all in a few taps.
        </p>

        <div className="row g-4">
          {steps.map((step, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-3">
              <Flip
                direction="horizontal" // ✅ flipInX ke jaisa
                triggerOnce={false}
                duration={800}
                delay={index * 200}
              >
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="fs-1 mb-3">{step.icon}</div>
                    <h5 className="fw-semibold">{step.title}</h5>
                    <p className="text-muted small">{step.description}</p>
                  </div>
                </div>
              </Flip>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
