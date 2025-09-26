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
  // const navigate = useNavigate();
  const handleSubmit = () => {
    // const query = new URLSearchParams(form).toString();
    // navigate(`/services?${query}`);
    alert("you are already in service page")
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
     <div
  className="position-relative text-white text-center"
  style={{ height: "100vh", overflow: "hidden" }}
>
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-100 h-100"
    style={{ objectFit: "cover", zIndex: -1 }}
  >
    <source src={onsiteVideo} type="video/mp4" />
  </video>

  <div className="position-absolute top-50 start-50 translate-middle w-100 px-3">
    <div className="bg-dark bg-opacity-50 p-3 p-md-4 rounded mx-auto col-12 col-md-10 col-lg-8">
      <h1 className="fw-bold display-6 display-md-5">
        Car Service at Your Doorstep
      </h1>
      <p className="lead text-white">Fast, Reliable, Certified.</p>

      {/* Form Box */}
      <div
        className="p-3 rounded shadow-lg"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="d-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "15px",
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

          {/* Model */}
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
            style={{ ...dropdownStyle, cursor: "pointer", background: "white" }}
          />

          {/* Date */}
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            style={dropdownStyle}
          />
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn fw-semibold mt-3 w-100"
          style={{
            background: "linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 32px",
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
        <h2 className="fw-bold text-center mb-4 mt-4">Pick Your OnSite Services</h2>
        <div className="row g-4">
          {/* LEFT: Services */}
         <div className="col-md-7">
                
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
                  <div key={srv.id} className="col-md-6">
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
          <div className="col-md-5">
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
          style={{ width: "35%", maxWidth: "100%" }} >
          <span className="text-center text-sm-start">
            ✅ You have selected <b>{selectedServices.length}</b> service(s)
          </span>
          <button className="btn btn-light fw-semibold ">
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
