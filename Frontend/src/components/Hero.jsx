import React  , {useState}from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import BrandModelForm from "./BrandModelForm";
import { ReactTyped } from "react-typed";
import {motion} from "framer-motion"
import { MapPin, Car, Compass } from "lucide-react"; // animated icons ke liye
import "./LoginModal.scss"; // Adjust the import path as necessary
import CityModal  from "./CitySelect";

const Hero = (  ) => {
  const navigate = useNavigate();
const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState("");



  

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
        
      <div className="heroGrid" style={{zIndex:1, display:'flex'}}>
        <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center'}}>
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
    marginRight: "auto"
  }}
>

<ReactTyped
  strings={[
    'Drive In, Drive Out: Fast, Reliable Car Repairs.<br/>Your Journey, Our Priority.'
  ]}
  typeSpeed={40}        // typing speed
  backSpeed={20}        // erase speed
  backDelay={1500}      // delay before erase
  loop                  // repeat forever
  smartBackspace        // erase only what's needed
  contentType="html"    // ✅ allow HTML tags in strings
/>
</h2>
           <p
  style={{
    fontSize: "1.15rem",
    fontFamily: "'Poppins', sans-serif",
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
    animation: "fadeInUp 1s ease-out"
  }}
>
  Experience hassle-free car care. <strong>Trusted mechanics</strong>, 
  transparent pricing, and quick turnaround — so you can get back on the 
  road with confidence.
</p>

  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
    <button
  onClick={() => navigate('/Servicessection')}
      style={{
        background: 'linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)', // orange gradient
        color: '#fff',
        fontWeight: 600,
        fontSize: '1.08rem',
        padding: '12px 32px',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        transition: 'background 0.2s',
        letterSpacing: '0.5px',
      }}
      aria-label="Explore Services"
      onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #fff 0%, #ff8800 100%)'}
      onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)'}
    >
      Explore Services
    </button>


  </div>
      <div
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
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
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
            <span style={{ fontSize: "0.8rem", color: "white" }}>Select Your City</span>
            <strong style={{ fontSize: "1rem" }}>
              {selectedCity || "Click to Choose"}
            </strong>
          </div>
        </div>

        {/* Car Selector */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          onClick={() => navigate("/update-user")} // <-- direct navigate karega
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
            <span style={{ fontSize: "0.8rem", color: "#fff" }}>Select Your Car</span>
            <strong style={{ fontSize: "1rem" }}>
              Click Here
            </strong>
          </div>
        </div>

        {/* Check Price Button */}
        <motion.button
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
           
            navigate("/Servicessection");
          }}
        >
          Check Price
        </motion.button>
      </div>

      {/* City Modal */}
      <CityModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        setSelectedCity={setSelectedCity}
      />


   
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
      </div>
    </section>
  );
};

// Helper component for conditional rendering of LoginModal and BrandModelForm
function HeroLoginBrandModel(setModelsFromApiOrBrandForm) {
  const [showLoginModal, setShowLoginModal] = React.useState(true);
  const [isOtpVerified, setIsOtpVerified] = React.useState(false);
  const [form, setForm] = React.useState({ email: '', otp: '' });
  const [manufacturers, setManufacturers] = React.useState([]);
  const [selectedBrand, setSelectedBrand] = React.useState('');
  const [models, setModels] = React.useState([]);
  const [selectedModel, setSelectedModel] = React.useState('');
  const [selectedBrandObj, setSelectedBrandObj] = React.useState(null);
  const [selectedModelObj, setSelectedModelObj] = React.useState(null);
  const [brandModelSubmitted, setBrandModelSubmitted] = React.useState(false);

  // Handler for OTP verification (simulate, or pass from LoginModal)
  const handleOtpVerified = (email, manufacturersList) => {
    setIsOtpVerified(true);
    setForm(f => ({ ...f, email }));
    setManufacturers(manufacturersList || []);
  };

  // Handler for BrandModelForm submit
  const handleBrandModelSubmit = (data) => {
    if (data.brand) setSelectedBrand(data.brand);
    if (data.model) setSelectedModel(data.model);
    setBrandModelSubmitted(true);
    // You can add additional logic here, e.g., API call or navigation
    // data.email is available here
    console.log('BrandModelForm submit payload:', data);
  };

  // Find selected brand/model objects
  React.useEffect(() => {
    if (Array.isArray(models) && models.length > 0) {
      setModelsFromApiOrBrandForm(models);   // ✅ Hero ko models bhejna
    }
  }, [models, setModelsFromApiOrBrandForm]);

  // Fetch models when brand changes
  React.useEffect(() => {
    if (selectedBrand) {
      const brand = manufacturers.find(m => String(m.id) === String(selectedBrand));
      setModels(brand && Array.isArray(brand.models) ? brand.models : []);
    } else {
      setModels([]);
    }
  }, [selectedBrand, manufacturers]);

  if (!isOtpVerified) {
    return (
      <LoginModal
        showModal={showLoginModal}
        handleCloseModal={() => setShowLoginModal(false)}
        onOtpVerified={handleOtpVerified}
        form={form}
        setForm={setForm}
      />
    );
  }
  return (
    <BrandModelForm
      manufacturers={manufacturers}
      selectedBrand={selectedBrand}
      setSelectedBrand={setSelectedBrand}
      models={models}
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
      selectedBrandObj={selectedBrandObj}
      selectedModelObj={selectedModelObj}
      email={form.email}
      handleBrandModelSubmit={handleBrandModelSubmit}
    />
  );
}

export default Hero;