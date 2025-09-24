import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import BrandModelForm from "./BrandModelForm";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { MapPin, Car, Compass } from "lucide-react"; // animated icons ke liye
import "./LoginModal.scss"; // Adjust the import path as necessary
import CityModal from "./CitySelect";
import BrandModelDialog from "./BrandModelDialog";

const Hero = () => {
  const navigate = useNavigate();
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
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

  const handleSubmit = () => {
    // Redirect with query params
    // const query = new URLSearchParams(form).toString();
    // navigate(`/services?${query}`);
    alert("select services ")
  };

  return (
    <section
      style={{
        background: "#f8f9fa",
        minHeight: 763,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 0", // padding increased
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
         preload="auto"   // 👈 add this
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          filter: "blur(5px)",
          pointerEvents: "none",
        }}
        
      >
         
        <source src="/assets/vedio/herovedio.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      {/* Removed overlay */}

      <div className="heroGrid" style={{ zIndex: 1, display: "flex" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="heroMainHeading">
            <h2
              style={{
                color: "#fff",
                fontFamily: "'Anta','Poppins', sans-serif",

                fontWeight: 800,
                fontSize: "2.5rem",
                marginBottom: "1.2rem",
                letterSpacing: "0.5px",
                lineHeight: 1.15,
                textShadow: "0 2px 16px rgba(0,0,0,0.25)",
                textAlign: "center",
                maxWidth: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
             
                Driven By Service, Powered By Convenience!

             
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.92)", // softer white for comfort
                marginBottom: "1.5rem",
                lineHeight: 1.6,
                textAlign: "center",
                textShadow: "0 2px 12px rgba(0,0,0,0.18)",
                maxWidth: "750px", // keeps text readable
                marginLeft: "auto",
                marginRight: "auto",
                background: "rgba(255, 255, 255, 0.08)", // soft transparent bg
                padding: "15px 20px",
                borderRadius: "10px",
                backdropFilter: "blur(6px)", // glass effect
                animation: "fadeInUp 1s ease-out",
              }}
            >
              Experience hassle-free car care.{" "}
              <strong>Trusted mechanics</strong>, transparent pricing, and quick
              turnaround — so you can get back on the road with confidence.
            </p>

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
    {/* Service */}
    <select
      value={form.service}
      onChange={(e) => setForm({ ...form, service: e.target.value })}
      style={dropdownStyle}
    >
      <option value="">Select Service</option>
      <option value="onsite">Onsite</option>
      <option value="offsite">Offsite</option>
      <option value="remote" disabled>Remote (coming soon)</option>
    </select>

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
      placeholder="Date"
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
       
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "18px",
              }}
            >
              <button
                onClick={() => navigate("/Servicessection")}
                style={{
                  background:
                    "linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)", // orange gradient
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.08rem",
                  padding: "12px 32px",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  letterSpacing: "0.5px",
                }}
                aria-label="Explore Services"
                onMouseOver={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(90deg, #fff 0%, #ff8800 100%)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)")
                }
              >
                Explore Services
              </button>
            </div> */}
            {/* <div
              style={{
                display: "flex",
                background: "rgba(255, 255, 255, 0.2)", // transparent white
                backdropFilter: "blur(10px)", // glassmorphism effect
                WebkitBackdropFilter: "blur(10px)", // safari support
                borderRadius: "50px",
                padding: "15px 25px",
                gap: "25px",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                maxWidth: "700px",
                margin: "auto",
                marginTop: "2rem",
              }}
            >
              {/* City Selector */}
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setIsCityModalOpen(true)}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin size={22} color="#ff3b3b" />
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.8rem", color: "white" }}>
                    Select Your City
                  </span>
                  <strong style={{ fontSize: "1rem" }}>
                    {selectedCity || "Click to Choose"}
                  </strong>
                </div>
              </div> */}

              {/* Car Selector */}
              {/* <div
                style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                onClick={() => setIsBrandModelDialogOpen(true)}
              >
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Car size={22} color="#444" />
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.8rem", color: "#fff" }}>
                    Select Your Car
                  </span>
                  <strong style={{ fontSize: "1rem" }}>
                    {selectedCar.brand && selectedCar.model && selectedCar.variant && selectedCar.cylinder
                      ? `${selectedCar.brand} - ${selectedCar.model} - ${selectedCar.variant} - ${selectedCar.cylinder} Cyl`
                      : selectedCar.brand && selectedCar.model && selectedCar.variant
                      ? `${selectedCar.brand} - ${selectedCar.model} - ${selectedCar.variant}`
                      : selectedCar.brand && selectedCar.model
                      ? `${selectedCar.brand} - ${selectedCar.model}`
                      : selectedCar.brand || "Click Here"}
                  </strong>
                </div>
              </div> */}
              {/* <BrandModelDialog
                open={isBrandModelDialogOpen}
                onClose={() => setIsBrandModelDialogOpen(false)}
                email={localStorage.getItem("email") || ""}
                selectedCity={selectedCity}
                onSelect={(data) => {
                  setSelectedCar({
                    brand: data.brand?.display_name || '',
                    model: data.model?.display_name || '',
                    variant: data.variant || '',
                    cylinder: data.cylinder || ''
                  });
                  setIsBrandModelDialogOpen(false);
                }}
              /> */}
              {/* Check Price Button */}
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "red",
                  border: "none",
                  borderRadius: "40px",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: "600",
                  padding: "12px 30px",
                  cursor: "pointer",
                  boxShadow: "0 5px 15px rgba(255,0,0,0.3)",
                }}
                onClick={() => {
                  if (!selectedCity) {
                    alert("Please select a city first!");
                    return;
                  }

                  navigate("/client/dashboard");
                }}
              >
                Select Vandor
              </motion.button>
            </div> */} 

            {/* City Modal */}
            {/* <CityModal
              isOpen={isCityModalOpen}
              onClose={() => setIsCityModalOpen(false)}
              setSelectedCity={setSelectedCity}
            /> */}

            <style>
              {`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(15px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
            </style>
          </div>
        </div>
        {/* <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div className="heroLoginCol">
            Conditional rendering for login and brand model forms
            <HeroLoginBrandModel />
          </div>
        </div> */}
        
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

      </div>
    </section>
  );
};

// Helper component for conditional rendering of LoginModal and BrandModelForm

const dropdownStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.95rem",
  outline: "none",
};

export default Hero;