import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCogs,
  faOilCan,
  faBatteryFull,
  faWrench,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import onsiteVideo from "../../assets/onsite.mp4";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BrandModelDialog from "../../components/BrandModelDialog";
import ServiceDetailsPopup from "../../components/ServiceDetailsPopup"; // ✅ NEW IMPORT

export default function OnsiteServices() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});
  const [activeService, setActiveService] = useState(null);

  const servicesList = [
    { id: 1, icon: faCogs, title: "Engine Check", desc: "Full diagnostic of your engine." },
    { id: 2, icon: faOilCan, title: "Oil Change", desc: "Replace oil & filter." },
    { id: 3, icon: faBatteryFull, title: "Battery Service", desc: "Check & replace car battery." },
    { id: 4, icon: faWrench, title: "Brake Repair", desc: "Complete brake checkup." },
    { id: 5, icon: faCar, title: "AC Repair", desc: "Cooling system inspection." },
    { id: 6, icon: faGlobe, title: "Tyre Alignment", desc: "Wheel balancing & alignment." },
  ];

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };


  const [selectedCity, setSelectedCity] = useState("");
  const [isBrandModelDialogOpen, setIsBrandModelDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    brand: "",
    model: "",
    variant: "",
    cylinder: "",
  });

  const [form, setForm] = useState({
    service: "",
    location: "",
    category: "",
    make: "",
    model: "",
    year: "",
    engine: "",
    date: "",
  });
  const navigate = useNavigate();
  const handleSubmit = () => {
    const query = new URLSearchParams(form).toString();
    navigate(`/services?${query}`);
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div
        className="position-relative text-white text-center"
        style={{ minHeight: "80vh", overflow: "hidden" }}
      >
        <video
          autoPlay
          loop
          muted
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        >
          <source src={onsiteVideo} type="video/mp4" />
        </video>
        <div
          className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 p-3 p-md-4 rounded w-100 mb-4 mb-md-5"
          style={{ maxWidth: "1000px", marginTop: "4rem" }}
        >
          <h1 className="fw-bold display-6 display-md-5">
            Car Service at Your Doorstep
          </h1>
          <p className="lead" style={{ color: "white" }}>
            Fast, Reliable, Certified.
          </p>

          {/* Form Box */}
          <div
          className="p-3 p-md-4 rounded  text-dark mb-4"
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "16px",
              padding: "20px",
              width: "100%",
              maxWidth: "950px",
              margin: "0 auto",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Grid Inputs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
                width: "100%",
              }}
            >
              {/* Location */}
              <select
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={dropdownStyle}
              >
                <option value="">Select Location</option>
                <option value="dubai">Dubai (Onsite & Offsite)</option>
                <option value="sharjah">Sharjah (Onsite & Offsite)</option>
                <option value="rak">Ras Al Khaimah (Offsite only)</option>
                <option value="abu-dhabi" disabled>
                  Abu Dhabi
                </option>
                <option value="al-ain" disabled>
                  Al Ain
                </option>
                <option value="musaffah" disabled>
                  Musaffah
                </option>
              </select>

              {/* Category */}
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={dropdownStyle}
              >
                <option value="">Vehicle Category</option>
                <option value="passenger">Passenger</option>
                <option value="commercial">Commercial</option>
                <option value="bike">Bike</option>
              </select>

              {/* Select Model (popup trigger) */}
              <input
                type="text"
                placeholder="Select Model"
                readOnly
                value={
                  selectedCar.brand && selectedCar.model
                    ? `${selectedCar.brand} ${selectedCar.model}`
                    : ""
                }
                onClick={() => setIsBrandModelDialogOpen(true)}
                style={{
                  ...dropdownStyle,
                  cursor: "pointer",
                  background: "white",
                }}
              />

              {/* Date */}
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={dropdownStyle}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "12px 32px",
                  marginTop: "20px",
                }}
                onClick={handleSubmit}
              >
                Search Services
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-4">Pick Your OnSite Services</h2>
        <div className="row g-4">
          {/* LEFT: Services */}
          <div className="col-12 col-lg-7">
            <div
              className="border rounded shadow-sm p-3"
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                backgroundColor: "#f8f9fa",
              }}
            >
              <h5 className="mb-3 fw-bold text-danger">Available Services</h5>
              <div className="row g-3">
                {servicesList.map((srv) => (
                  <div key={srv.id} className="col-12 col-md-6">
                    <div
                      className={`p-3 border rounded text-center shadow-sm h-100 ${
                        selectedServices.includes(srv.id) ? "border-danger" : ""
                      }`}
                      style={{ cursor: "pointer", backgroundColor: "white" }}
                      onClick={() => toggleService(srv.id)}
                    >
                      <FontAwesomeIcon
                        icon={srv.icon}
                        className="fs-2 text-danger mb-2"
                      />
                      <h6>{srv.title}</h6>
                      <p className="text-muted small">{srv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Selected Services */}
          <div className="col-12 col-lg-5">
            <div
              className="border rounded shadow-sm p-3"
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                backgroundColor: "#fff",
              }}
            >
              <h5 className="mb-3 fw-bold text-success">Selected Services</h5>
              {selectedServices.length === 0 && <p>No service selected.</p>}
              {selectedServices.map((id) => (
                <div
                  key={id}
                  className="d-flex justify-content-between align-items-center border p-2 rounded mb-2"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <span>{servicesList.find((s) => s.id === id)?.title}</span>
                  {serviceDetails[id]?.length > 0 ? (
                    <span className="badge bg-success">
                      {serviceDetails[id].length} vehicle(s)
                    </span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setActiveService(id)}
                    >
                      Fill Details
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Quote Bar */}
      {selectedServices.length > 0 && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x bg-danger text-white py-3 px-3 px-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 gap-sm-0 rounded-top shadow"
          style={{ width: "95%", maxWidth: "600px", zIndex: 1000 }}
        >
          <span className="text-center text-sm-start">
            ✅ You have selected <b>{selectedServices.length}</b> service(s)
          </span>
          <button className="btn btn-light fw-semibold mt-2 mt-sm-0">
            Request a Quote
          </button>
        </div>
      )}

      {/* Popups */}
      <BrandModelDialog
        open={isBrandModelDialogOpen}
        onClose={() => setIsBrandModelDialogOpen(false)}
        email={localStorage.getItem("email") || ""}
        selectedCity={selectedCity}
        onSelect={(data) => {
          setSelectedCar({
            brand: data.brand?.display_name || "",
            model: data.model?.display_name || "",
            variant: data.variant || "",
            cylinder: data.cylinder || "",
          });
          setIsBrandModelDialogOpen(false);
        }}
      />

      {activeService && (
        <ServiceDetailsPopup
          service={servicesList.find((s) => s.id === activeService)}
          details={serviceDetails[activeService] || []}
          onClose={() => setActiveService(null)}
          onSave={(list) =>
            setServiceDetails((prev) => ({ ...prev, [activeService]: list }))
          }
        />
      )}
    </div>
  );
}

const dropdownStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.9rem",
  outline: "none",
  width: "100%",
};
