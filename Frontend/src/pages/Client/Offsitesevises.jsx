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
import BrandModelDialog from "../../components/BrandModelDialog";
import ServiceDetailsPopup from "../../components/ServiceDetailsPopup"; // ✅ NEW IMPORT
import { motion } from "framer-motion";


export default function OffsiteServices() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});
    const [activeService, setActiveService] = useState(null);

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

      const [selectedCity, setSelectedCity] = useState("");
      const [isBrandModelDialogOpen, setIsBrandModelDialogOpen] = useState(false);
      const [selectedCar, setSelectedCar] = useState({ brand: '', model: '', variant: '', cylinder: '' });
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
        // Redirect with query params
        const query = new URLSearchParams(form).toString();
        navigate(`/services?${query}`);
      };
    

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div
        className="position-relative text-white text-center"
        style={{ height: "90vh", overflow: "hidden" }}
      >
        <video autoPlay loop muted className="w-100 h-100" style={{ objectFit: "cover" }}>
                 <source src={onsiteVideo} type="video/mp4" />
               </video>
         <div className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 p-4 rounded"style={{marginTop:'4rem'}}>
          <h1 className="fw-bold display-5">Car Service at Your Doorstep</h1>
          <p className="lead" style={{color:'white'}}>Fast, Reliable, Certified.</p>
                    {/* Form Box */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              background: "rgba(255,255,255,0.15)", // transparent glass effect
              borderRadius: "16px",
              padding: "25px 20px",
              width: "90%",
              maxWidth: "950px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              backdropFilter: "blur(10px)", // glass effect
            }}
          >
            {/* Grid Inputs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "15px",
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
                <option value="abu-dhabi" disabled>Abu Dhabi</option>
                <option value="al-ain" disabled>Al Ain</option>
                <option value="musaffah" disabled>Musaffah</option>
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
          
            {/* Submit Button - Centered Below */}
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

      {/* Service Categories */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-4">Pick Your Offsite Services</h2>
        <div className="row g-4">
                 
                 {/* LEFT: Services Box */}
                 <div className="col-md-7">
                   <div 
                     className="border rounded shadow-sm p-3" 
                     style={{ height: "500px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
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
                             <FontAwesomeIcon icon={srv.icon} className="fs-2 text-danger mb-2" />
                             <h6>{srv.title}</h6>
                             <p className="text-muted small">{srv.desc}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
       
                 {/* RIGHT: Selected Services Box */}
                 <div className="col-md-5">
                   <div 
                     className="border rounded shadow-sm p-3" 
                     style={{ height: "500px", overflowY: "auto", backgroundColor: "#fff" }}
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
                           <span className="badge bg-success">{serviceDetails[id].length} vehicle(s)</span>
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
          style={{ width: "90%", maxWidth: "600px" }}
        >
          <span>
            ✅ You have selected <b>{selectedServices.length}</b> service(s)
          </span>
          <button className="btn btn-light fw-semibold">Request a Quote</button>
        </div>
      )}
       {/* Popup Include */}
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

      {/* Popup */}
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
  fontSize: "0.95rem",
  outline: "none",
};
