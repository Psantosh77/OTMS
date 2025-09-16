import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faUserTie, faGlobe } from "@fortawesome/free-solid-svg-icons";

// yaha import karo
import onsiteImg from "../assets/onsite.jpg";
import onlineImg from "../assets/online.png";
import remoteImg from "../assets/remote.jpg";

export default function ServicesOverview() {
  const services = [
    {
      id: "onsite",
      title: "Onsite Services",
      icon: faUserTie,
      image: onsiteImg, // imported image
      description:
        "Our technician comes to your location and provides hands-on support for your issues.",
    },
    {
      id: "online",
      title: "Online Services",
      icon: faLaptop,
      image: onlineImg,
      description:
        "Get instant support via online sessions, chat, or video call from our experts.",
    },
    {
      id: "remote",
      title: "Remote Services",
      icon: faGlobe,
      image: remoteImg,
      description:
        "We connect to your system remotely and fix problems without needing to visit.",
    },
  ];

  const [activeService, setActiveService] = useState(services[0]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold display-6 mb-3 text-dark text-center">
        Services Overview
      </h2>

      <div className="row align-items-center">
        {/* Left List */}
        <div className="col-md-3">
          <div className="d-flex flex-column gap-3">
            {services.map((service) => (
              <div
                key={service.id}
                className={`d-flex align-items-center p-3 rounded shadow-sm ${
                  activeService.id === service.id
                    ? "bg-light border-start border-3 border-danger"
                    : ""
                }`}
                style={{ cursor: "pointer", marginTop: "2rem" }}
                onClick={() => setActiveService(service)}
              >
                <FontAwesomeIcon
                  icon={service.icon}
                  className="me-2"
                  style={{
                    color: activeService.id === service.id ? "red" : "#444",
                  }}
                />
                <span
                  className={`fw-semibold ${
                    activeService.id === service.id
                      ? "text-danger"
                      : "text-dark"
                  }`}
                >
                  {service.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Image */}
        <div className="col-md-4 text-center">
          <img
            src={activeService.image}
            alt={activeService.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "280px", objectFit: "cover", marginTop:'2rem' }}
          />
        </div>

        {/* Right Content */}
        <div className="col-md-5">
            <div
                key={activeService.id}
                className="d-flex align-items-center p-3 rounded shadow-sm "style={{marginBottom:'2rem'}}
              >
                <FontAwesomeIcon
                  icon={activeService.icon}
                  className="me-2"
                  style={{
                    color: activeService.id === activeService.id ? "red" : "#444",
                  }}
                />
                <span
                  className={`fw-semibold ${
                    activeService.id === activeService.id
                      ? "text-danger"
                      : "text-dark"
                  }`}
                >
                  {activeService.title}
                </span>
              </div>
          <h3 className="fw-bold mb-3">{activeService.title}</h3>
          <p className="text-muted mb-4">{activeService.description}</p>
          <button className="btn btn-danger px-4 py-2 fw-semibold">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
