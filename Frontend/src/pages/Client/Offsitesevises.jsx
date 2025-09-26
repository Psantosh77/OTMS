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
import LoginModal from "../../components/LoginModal"
import AfterloginDetailsModal from "../../components/aferloginDetailsModal"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import BrandModelDialog from "../../components/BrandModelDialog";
import ServiceDetailsPopup from "../../components/ServiceDetailsPopup"; // ✅ NEW IMPORT
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


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
      // const navigate = useNavigate();
      const handleSubmit = () => {
        // Redirect with query params
        // const query = new URLSearchParams(form).toString();
        // navigate(`/services?${query}`);
        alert("you are already in service page")
      };
    
      // data trnfer from hero section to this component 
      const location = useLocation();
      const [searchParams] = useSearchParams();

      // login model open 
      // const [isLoginOpen, setIsLoginOpen] = useState(false);

      // servises list 
      const [vehicles, setVehicles] = useState([]); // global vehicle list

      // after login model open 

      const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isDetailsOpen, setIsDetailsOpen] = useState(false);

// User object localStorage se
const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("accessToken");
  const email = localStorage.getItem("email"); // agar save kar rahe ho
  const name = localStorage.getItem("fullName"); // agar save kar rahe ho
  if (token) {
    setUser({ name, email });
  }
}, []);


React.useEffect(() => {
  const service = searchParams.get("service");
  const loc = searchParams.get("location");
  const date = searchParams.get("date");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const variant = searchParams.get("variant");
  const cylinder = searchParams.get("cylinder");

  if (service) setForm(prev => ({ ...prev, service }));
  if (loc) {
    setForm(prev => ({ ...prev, location: loc }));
    setSelectedCity(loc);
  }
  if (date) setForm(prev => ({ ...prev, date }));
  if (brand || model) {
    setSelectedCar({ brand, model, variant, cylinder });
  }
}, [searchParams]);



  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div
        className="position-relative text-white text-center"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <video autoPlay loop muted   className="w-100 h-100 "
    style={{ objectFit: "cover", zIndex: -1 }}>
                 <source src={onsiteVideo} type="video/mp4" />
               </video>
         <div 
           className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 p-3 p-md-4 rounded w-100"
    style={{ maxWidth: "1000px", marginTop: "2rem" }}>
          <h1 className="fw-bold display-6 display-md-5">Car Service at Your Doorstep</h1>
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
        <h2 className="fw-bold text-center mb-4 mt-4">Pick Your Offsite Services</h2>
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
    className="position-fixed bottom-0 start-50 translate-middle-x bg-danger text-white py-3 px-4 d-flex justify-content-between align-items-center rounded-top shadow "
    style={{ width: "60%", maxWidth: "100%", borderRadius: "12px 12px 0 0" }}
  >
    <span className="text-center text-sm-start">
      ✅ You have selected <b>{selectedServices.length}</b> service(s)
    </span>
   <button
  className="btn btn-light fw-semibold"
  onClick={() => {
    if (user) {
      setIsDetailsOpen(true); // already logged in → details modal
    } else {
      setIsLoginOpen(true);   // not logged in → login modal
    }
  }}
>
  Request a Quote
</button>
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
  details={vehicles} // same list sabko pass ho rahi hai
  onClose={() => setActiveService(null)}
  onSave={(list) => setVehicles(list)} // global update
/>
      )}
      {/* Bootstrap Modal */}
{/* Login Modal */}
{isLoginOpen && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    role="dialog"
    style={{ backgroundColor: "rgba(0,0,0,0.5)", marginTop: "5rem" }}
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Login</h5>
          <button type="button" className="btn-close" onClick={() => setIsLoginOpen(false)}></button>
        </div>
        <div className="modal-body">
          <LoginModal />
        </div>
      </div>
    </div>
  </div>
)}

{/* After Login Details Modal */}
{isDetailsOpen && (
  <AfterloginDetailsModal
    form={form}
    selectedCar={selectedCar}
    user={user}
    onClose={() => setIsDetailsOpen(false)}
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
