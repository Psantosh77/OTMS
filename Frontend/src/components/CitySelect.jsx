import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const cities = [
  { name: "Delhi", icon: "🕌" },
  { name: "Gurgaon", icon: "🏢" },
  { name: "Noida", icon: "🌉" },
  { name: "Ghaziabad", icon: "✈️" },
  { name: "Mumbai", icon: "⛵" },
  { name: "Pune", icon: "🏰" },
  { name: "Hyderabad", icon: "🏯" },
  { name: "Bangalore", icon: "🌆" },
  { name: "Chennai", icon: "🏝️" },
  { name: "Jaipur", icon: "🏜️" },
  { name: "Chandigarh", icon: "🌳" },
  { name: "Ahmedabad", icon: "🕌" }
];

const CityModal = ({ isOpen, onClose, setSelectedCity }) => {
  if (!isOpen) return null;

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          alert(`Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`);
          // yaha tum API call karke city fetch kar sakte ho
        },
        (err) => {
          alert("Location access denied ❌");
        }
      );
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          width: "80%",
          maxWidth: "700px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          marginTop:"9rem"
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2>Choose Your City</h2>
          <button onClick={onClose} style={{ fontSize: "1.5rem", border: "none", background: "transparent", cursor: "pointer" }}>✖</button>
        </div>
        <p style={{ marginBottom: "20px", color: "#555" }}>
          This would help us in providing you quick service.
        </p>

        {/* Cities Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          {cities.map((city, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedCity(city.name);
                onClose();
              }}
              style={{
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "auto",
                  borderRadius: "50%",
                 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2rem",
                  color: "#fff",
                }}
              >
                {city.icon}
              </div>
              <p style={{ marginTop: "10px", fontWeight: "500" }}>{city.name}</p>
            </div>
          ))}
        </div>

        {/* Detect Location */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={handleDetectLocation}
            style={{
              padding: "10px 20px",
              border: "1px solid #333",
              borderRadius: "8px",
              cursor: "pointer",
              background: "transparent",
              fontWeight: "600",
              color:"black"
            }}
          >
            <MapPin size={18} style={{ marginRight: "8px" }} />
            Detect my location
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CityModal;
