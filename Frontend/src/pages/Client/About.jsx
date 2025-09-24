
import React from "react";
import "./About.css"; // 👈 external css include

const About = () => {
  return (
    <>

      {/* 🔹 Banner Section */}
      <div className="service-banner">
        <img
          src="/assets/image/blog_banner.webp"
          alt="Car Blog Banner"
          loading="lazy"
          className="service-banner-img"
        />
        <div className="service-banner-txt">
          <p>Your Daily Dose of Auto Trends</p>
          <h1>Our Story</h1>
          <div className="banner-btn-wrap">
            <a className="banner-btn" href="#blog">
              Explore Now
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 About Section */}
      <section className="about-section py-5" id="about">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">About OTGMS Bhanu</h2>
          <p className="text-center text-muted mb-5">
            Revolutionizing car care and rental experiences across India.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <p className="lead text-justify about-lead">
                OTGMS (On-The-Go Motor Services) is a one-stop platform designed to
                bring car services and rentals into the digital era. Whether you're
                a B2C customer looking for fast service or a B2B fleet manager
                seeking accountability and scale, OTGMS delivers with verified
                garages, transparent pricing, live tracking, and doorstep
                convenience.
              </p>
              <p className="text-muted">
                From simple car washes to full repairs, from short-term rentals to
                long-term corporate solutions, OTGMS is built for modern vehicle
                owners and businesses. Our mission is to reduce friction, save
                time, and give every vehicle the service it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

