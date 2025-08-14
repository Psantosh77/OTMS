import React from "react";
import { motion } from "framer-motion";
import "../../styles/servicepage.css"; 

const ServicePage = () => {
  const services = [
    { icon: "fas fa-tools", title: "General Service", desc: "Oil change, filters, periodic servicing, inspection, AC gas top-up." },
    { icon: "fas fa-wrench", title: "Problem & Repairs", desc: "Car not starting, engine noise, overheating, warning lights, brake/suspension fix." },
    { icon: "fas fa-car-battery", title: "AC, Battery & Electrical", desc: "AC repair, battery replacement, alternator, power windows, lighting issue." },
    { icon: "fas fa-car-side", title: "Bodywork, Interior Fixes", desc: "Dent removal, repainting, glass, upholstery, dashboard, headliner, sunroof." },
    { icon: "fas fa-car-crash", title: "Brakes, Tires & Suspension", desc: "Brake pad/disc change, tire repair/replacement, wheel alignment, shocks." },
    { icon: "fas fa-spray-can-sparkles", title: "Cleaning, Detailing & Accessories", desc: "Car wash, polishing, ceramic coating, dashcams, sound system, wraps." },
    { icon: "fas fa-truck-monster", title: "At-Home & Emergency Services", desc: "Mobile oil change, battery jump-start, flat tire fix, fuel delivery, inspections." },
  ];

  return (
    <>
      <div className="service-banner">
        <img src="/assets/service_banner.jpg" alt="Car Service Banner" />
        <div className="service-banner-txt">
          <p>Anytime, Anywhere</p>
          <h1>One-Stop Car Service & Repairs</h1>
          <div className="service-btn">
            <a href="#">Show Now</a>
          </div>
        </div>
      </div>

      <section className="container">
        <div className="service-cards">
          {services.map((service, index) => (
            <motion.div
              className="service-card glass-card"
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="shine-effect"></div>

              
  {/* Orange border divs */}
  <div className="border-bottom"></div>
  <div className="border-left"></div>
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h5>{service.title}</h5>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicePage;
