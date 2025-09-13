import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCar, 
  faCogs, 
  faOilCan, 
  faBatteryFull, 
  faWrench, 
  faGlobe 
} from "@fortawesome/free-solid-svg-icons";
import onsiteVideo from "../../assets/onsite.mp4";

export default function OnsiteServices() {
  const [selectedServices, setSelectedServices] = useState([]);

  const servicesList = [
    { id: 1, icon: faCogs, title: "Engine Check", desc: "Full diagnostic of your engine." },
    { id: 2, icon: faOilCan, title: "Oil Change", desc: "Replace oil & filter." },
    { id: 3, icon: faBatteryFull, title: "Battery Service", desc: "Check & replace car battery." },
    { id: 4, icon: faWrench, title: "Brake Repair", desc: "Complete brake checkup." },
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
      <video autoPlay loop muted className="w-100 h-100" style={{ objectFit: "cover" }}>
  <source src={onsiteVideo} type="video/mp4" />
</video>
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ background: "rgba(0,0,0,0.6)", padding: "2rem", borderRadius: "12px" }}
        >
          <h1 className="fw-bold display-5">Car Service at Your Doorstep</h1>
          <p className="lead">Fast, Reliable, Certified.</p>

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
        <h2 className="fw-bold text-center mb-4">Pick Your Services</h2>
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
        <h2 className="fw-bold text-center mb-4">How On-Site Works</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="p-3">
              <FontAwesomeIcon icon={faCar} className="fs-1 text-danger mb-2" />
              <h6>1. Book Your Service</h6>
              <p className="text-muted small">Select your service online.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <FontAwesomeIcon icon={faWrench} className="fs-1 text-danger mb-2" />
              <h6>2. Technician Arrives</h6>
              <p className="text-muted small">Certified mechanic comes to your location.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <FontAwesomeIcon icon={faGlobe} className="fs-1 text-danger mb-2" />
              <h6>3. Drive Stress-Free</h6>
              <p className="text-muted small">Work completed + report delivered.</p>
            </div>
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
