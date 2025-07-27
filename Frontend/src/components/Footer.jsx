// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 px-3" id="footer">
      <div className="container">
        <div className="row g-4">
          {/* Logo & About */}
          <div className="col-md-4">
            <h2 className="h4 fw-bold mb-3">OTGMS</h2>
            <p className="text-light small">
              Your all-in-one platform for car servicing, repair, and rentals — trusted by users across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li><a href="#services" className="text-light text-decoration-none d-block mb-1">Services</a></li>
              <li><a href="#how-it-works" className="text-light text-decoration-none d-block mb-1">How It Works</a></li>
              <li><a href="#testimonials" className="text-light text-decoration-none d-block mb-1">Testimonials</a></li>
              <li><a href="#contact" className="text-light text-decoration-none d-block">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3">Contact Us</h5>
            <p className="small mb-1">📍 Noida, Uttar Pradesh, India</p>
            <p className="small mb-1">📞 +91 9876543210</p>
            <p className="small">📧 support@otgms.in</p>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary small">
          © {new Date().getFullYear()} OTGMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
