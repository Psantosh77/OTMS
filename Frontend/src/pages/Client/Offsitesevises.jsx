import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCogs,
  faOilCan,
  faBatteryFull,
  faWrench,
  faGlobe,
  faStar,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";

export default function OffsiteServices() {
  const [selectedServices, setSelectedServices] = useState([]);

  const servicesList = [
    { id: 1, icon: faCogs, title: "Engine Overhaul", desc: "Complete engine rebuilding at workshop." },
    { id: 2, icon: faOilCan, title: "Transmission Service", desc: "Specialized transmission repairs." },
    { id: 3, icon: faBatteryFull, title: "AC Repair", desc: "Cooling system check and replacement." },
    { id: 4, icon: faWrench, title: "Suspension Repair", desc: "Shock absorbers & suspension work." },
  ];

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div
        className="position-relative text-white text-center"
        style={{ height: "70vh", overflow: "hidden" }}
      >
        <video
          autoPlay
          loop
          muted
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        >
          <source src="/videos/workshop.mp4" type="video/mp4" />
        </video>
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ background: "rgba(0,0,0,0.6)", padding: "2rem", borderRadius: "12px" }}
        >
          <h1 className="fw-bold display-5">Specialized Care That Needs Expert Facilities</h1>
          <p className="lead">Professional Service at Trusted Workshops</p>

          {/* Search Filters */}
          <div className="row g-2 mt-3">
            <div className="col-md-3">
              <select className="form-select">
                <option>Location (Dubai)</option>
                <option>Sharjah</option>
                <option>Ras Al Khaimah</option>
              </select>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Car Model / Make" />
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" />
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-4">Pick Your Offsite Services</h2>
        <div className="row g-4">
          {servicesList.map((srv) => (
            <div key={srv.id} className="col-md-3">
              <div
                className={`p-4 border rounded text-center shadow-sm h-100 ${
                  selectedServices.includes(srv.id) ? "border-danger" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => toggleService(srv.id)}
              >
                <FontAwesomeIcon icon={srv.icon} className="fs-1 text-danger mb-3" />
                <h5 className="fw-semibold">{srv.title}</h5>
                <p className="text-muted small">{srv.desc}</p>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(srv.id)}
                  readOnly
                  className="form-check-input mt-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Overview */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-4">How Off-Site Works</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="p-3">
              <FontAwesomeIcon icon={faCar} className="fs-1 text-danger mb-2" />
              <h6>1. Vehicle Pick-Up</h6>
              <p className="text-muted small">We pick your car from your location.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <FontAwesomeIcon icon={faGlobe} className="fs-1 text-danger mb-2" />
              <h6>2. Workshop Service</h6>
              <p className="text-muted small">Repairs at our certified workshop network.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <FontAwesomeIcon icon={faWrench} className="fs-1 text-danger mb-2" />
              <h6>3. Drop-Off</h6>
              <p className="text-muted small">Your car delivered back to your location.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials / Trust Badges */}
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-4">Trusted By Thousands</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <FontAwesomeIcon icon={faStar} className="fs-1 text-warning mb-2" />
            <p className="fw-semibold">4.8/5 Average Rating</p>
          </div>
          <div className="col-md-4">
            <FontAwesomeIcon icon={faMedal} className="fs-1 text-danger mb-2" />
            <p className="fw-semibold">Certified Technicians</p>
          </div>
          <div className="col-md-4">
            <FontAwesomeIcon icon={faGlobe} className="fs-1 text-primary mb-2" />
            <p className="fw-semibold">Service Across UAE</p>
          </div>
        </div>
      </div>

      {/* Sticky Quote Bar */}
      {selectedServices.length > 0 && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x bg-danger text-white py-3 px-4 d-flex justify-content-between align-items-center rounded-top shadow"
          style={{ width: "90%", maxWidth: "600px" }}
        >
          <span>
            ✅ You have selected <b>{selectedServices.length}</b> service(s)
          </span>
          <button className="btn btn-light fw-semibold">Request a Quote</button>
        </div>
      )}
    </div>
  );
}
