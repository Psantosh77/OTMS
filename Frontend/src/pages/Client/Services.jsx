import React from "react";
import { Zoom } from "react-awesome-reveal"; // 👈 Zoom animation import
import CustomerDashboardHeader from "./CustomerDashboardHeader";

const services = [
  {
    title: "Car Spa & Cleaning",
    desc: "Professional interior and exterior car cleaning for a showroom shine.",
    icon: "🧼",
  },
  {
    title: "Car Repair",
    desc: "From minor fixes to major overhauls, our expert garages do it all.",
    icon: "🔧",
  },
  {
    title: "Vehicle Inspection",
    desc: "Multi-point inspection to ensure your car is roadworthy and safe.",
    icon: "🔍",
  },
  {
    title: "Car Rentals",
    desc: "Rent well-maintained vehicles for travel or business at competitive prices.",
    icon: "🚗",
  },
  {
    title: "Emergency Support",
    desc: "On-road breakdown support with live tracking and quick dispatch.",
    icon: "🚨",
  },
  {
    title: "Scheduled Maintenance",
    desc: "Never miss a service again. Get reminders and book in one tap.",
    icon: "📅",
  },
];

const Services = () => {
  return (
    <>
      <CustomerDashboardHeader />
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Services</h2>
          <p className="text-muted">
            Reliable, professional, and just a tap away.
          </p>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-4" key={index}>
              <Zoom
                triggerOnce   // 👈 Sirf ek baar zoom hoga
                duration={800} // 👈 Speed set
              >
                <div
                  className="card h-100 shadow-sm border-0 text-center"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
                  }}
                >
                  <div className="card-body">
                    <div className="display-4 mb-3">{service.icon}</div>
                    <h5 className="card-title fw-semibold">{service.title}</h5>
                    <p className="card-text text-muted">{service.desc}</p>
                  </div>
                </div>
              </Zoom>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
