import React from "react";
import { motion } from "framer-motion";
import  { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

    const [activeCard, setActiveCard] = useState(null);
      const navigate = useNavigate();

  // touch device detect
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  return (
    <>
      <div className="service-banner">
        <img src="/assets/service_banner.jpg" alt="Car Service Banner" />
        <div className="service-banner-txt">
          <p>Anytime, Anywhere</p>
          <h1>One-Stop Car Service & Repairs</h1>
        
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
    <button
    className="service-btn"
  onClick={() => navigate('/service-details')}
      style={{
        background: 'linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)', // orange gradient
        color: '#fff',
        fontWeight: 600,
        fontSize: '1.08rem',
      
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        transition: 'background 0.2s',
        letterSpacing: '0.5px',
      }}
      aria-label="Explore Services"
      onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #fff 0%, #ff8800 100%)'}
      onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)'}
    >
      Explore Services
    </button>
  </div>

            
       
        </div>
      </div>

      <section className="container">
        <div className="service-cards">
          
         {services.map((service, index) => (
  <motion.div
    key={index}
    className={`service-card glass-card ${activeCard === index ? "is-active" : ""}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => {
      if (isTouch) {
        // mobile/tablet par tap se hover jaisa effect
        setActiveCard(activeCard === index ? null : index);
      }
        // ✅ Redirect to ServiceDetails page
            navigate("/service-details");
    }}
    role="button"
    tabIndex={0}
  >
    <div className="shine-effect"></div>
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
