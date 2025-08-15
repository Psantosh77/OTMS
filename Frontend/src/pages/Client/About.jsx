// src/pages/About.jsx
import React from "react";


const About = () => {
  return (
    
    <section className="py-5 bg-white" id="about" style={{ top: "4rem", position: "relative", display: "flex", marginBottom:'2rem'}}>
      <div className="container">
        <h2 className="text-center fw-bold mb-4">About OTGMS Bhanu</h2>
        <p className="text-center text-muted mb-5">
          Revolutionizing car care and rental experiences across India.
        </p>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <p className="lead text-justify">
              OTGMS (On-The-Go Motor Services) is a one-stop platform designed to bring car services and rentals into the digital era. 
              Whether you're a B2C customer looking for fast service or a B2B fleet manager seeking accountability and scale, 
              OTGMS delivers with verified garages, transparent pricing, live tracking, and doorstep convenience.
            </p>
            <p className="text-muted">
              From simple car washes to full repairs, from short-term rentals to long-term corporate solutions, 
              OTGMS is built for modern vehicle owners and businesses. Our mission is to reduce friction, save time, 
              and give every vehicle the service it deserves.
            </p>
          </div>
        </div>
      </div>
    </section>

  );
};

export default About;
