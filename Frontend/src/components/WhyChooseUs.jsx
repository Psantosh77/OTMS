import React from "react";
import '../styles/Home.css'
const features = [
  {
    title: "Verified Garages",
    icon: "✅",
    desc: "All vendors are verified & quality checked by our team.",
  },
  {
    title: "Transparent Pricing",
    icon: "💰",
    desc: "Upfront prices, no hidden charges, and full invoice breakdown.",
  },
  {
    title: "Live Tracking",
    icon: "📍",
    desc: "Track your service status and technician arrival in real-time.",
  },
  {
    title: "Doorstep Pickup & Drop",
    icon: "🚗",
    desc: "We come to your location and handle everything for you.",
  },
  {
    title: "Rental + Service Platform",
    icon: "🔁",
    desc: "Car rentals and servicing – all integrated in one system.",
  },
  {
    title: "B2C & B2B Solutions",
    icon: "🏢",
    desc: "We serve individual customers and fleet businesses alike.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-5 " id="why-choose-us">
      <div className="container text-center">
        <h2 className="fw-bold display-6 mb-3 text-dark">Why Choose OTGMS?</h2>
        <p className="text-muted mb-5">
          We're not just another car service. We're a smarter solution.
        </p>

        <div className="row g-4">
          {features.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <div className="feature-card">
                {/* 3D icon wrapper */}
                <div className="icon-wrapper">
                  <div className="icon">{item.icon}</div>
                </div>
                <div className="card-body text-center">
                  <h5 className="fw-semibold">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
