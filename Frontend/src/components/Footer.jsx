import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaHome,
  FaServicestack,
  FaInfoCircle,
  FaNewspaper,
  FaUsers,
} from "react-icons/fa";

const Footer = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container py-5">
        <div className="row">
          {/* Logo & About */}
          <div className="col-lg-3 mb-3">
            <a href="/" className="text-decoration-none">
              <span className="h1 text-white" style={{
                background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "800"}}>OTGMS</span>
            </a>
            <p className="text-white my-3 small">
              Your all-in-one platform for car servicing, repair, and rentals —
              trusted by users across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-2 offset-lg-1 mb-3">
            <h5 className="text-white">Quick Links</h5>
            <ul className="list-unstyled my-3 small">
              <li className="mb-2">
                <a
                  href="/"
                  className="text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <FaHome /> Home
                </a>
              </li>

              {/* Services with dropdown */}
              <li className="mb-2 position-relative">
                <button
                  className="btn btn-link text-decoration-none text-white d-flex align-items-center gap-2 p-0"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FaServicestack /> Services ▾
                </button>
                {showDropdown && (
                  <ul
                    className="position-absolute bg-dark border rounded mt-1"
                    style={{ listStyle: "none", padding: "5px 0", minWidth: "150px", zIndex: 100 }}
                  >
                    <li>
                      <a
                        href="/onsite"
                        className="dropdown-item text-white text-decoration-none px-3 py-1 d-block"
                      >
                        Onsite
                      </a>
                    </li>
                    <li>
                      <a
                        href="/offsite"
                        className="dropdown-item text-white text-decoration-none px-3 py-1 d-block"
                      >
                        Offsite
                      </a>
                    </li>
                    <li>
                      <a
                        href="/services/remote"
                        className="dropdown-item text-white text-decoration-none px-3 py-1 d-block"
                      >
                        Remote
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li className="mb-2">
                <a
                  href="/about"
                  className="text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <FaInfoCircle /> Our Story
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/blog"
                  className="text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <FaNewspaper /> News & Media
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/join-network"
                  className="text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <FaUsers /> Join our Network
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-6 col-lg-2 mb-3 offset-lg-1">
            <h5 className="text-white">Social Media</h5>
            <ul className="list-unstyled my-3 small">
              <li className="mb-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <FaFacebookF /> Facebook
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://twitter.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <FaTwitter /> Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-6 col-lg-2 mb-3 offset-lg-1">
            <h5 className="text-white">Contact Us</h5>
            <ul className="list-unstyled my-3 small">
              <li className="mb-2 text-white">📞 +91 9876543210</li>
              <li className="mb-2">
                <a
                  href="mailto:support@otgms.in"
                  className="text-decoration-none text-white"
                >
                  📧 support@otgms.in
                </a>
              </li>
              <li className="mb-2 text-white">
                📍 Noida, Uttar Pradesh, India
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
