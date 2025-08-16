// src/components/Services.jsx
import React from "react";
import { Zoom } from "react-awesome-reveal"; // Animation

const services = [
  { title: "General Service", icon: "🛠️", desc: "Periodic maintenance to keep your car running smoothly." },
  { title: "AC Repair", icon: "❄️", desc: "Cool your drive with our expert AC services." },
  { title: "Denting & Painting", icon: "🎨", desc: "Restore your car’s shine with professional touch-ups." },
  { title: "Battery Replacement", icon: "🔋", desc: "Reliable battery checks and replacements." },
  { title: "Car Spa & Cleaning", icon: "🧼", desc: "Interior & exterior deep cleaning for a fresh look." },
  { title: "Tyre & Wheel Care", icon: "🚗", desc: "Alignment, balancing, and replacements." },
  { title: "Car Rental Services", icon: "🚙", desc: "Rent self-drive or chauffeur-driven cars at the best rates." },
];

const Services = () => {
  return (
    <section className="py-5" id="services">
      <div className="container text-center">
        <h2 className="fw-bold display-6 text-dark mb-3">Our Services</h2>
        <p className="text-muted mb-5">
          Everything your car needs, including rentals – all in one place.
        </p>

        <div className="row gy-4">
          {services.map((service, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              {/* Zoom triggers on scroll when visible */}
              <Zoom 
                triggerOnce={false} // scroll ke sath har baar trigger hoga
  duration={800} 
  delay={index * 100} 
  fraction={0.2} 
              >
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="fs-1 mb-3">{service.icon}</div>
                    <h5 className="card-title fw-semibold">{service.title}</h5>
                    <p className="card-text text-muted">{service.desc}</p>
                  </div>
                </div>
              </Zoom>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
