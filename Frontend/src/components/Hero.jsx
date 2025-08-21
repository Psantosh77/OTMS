import React from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import BrandModelForm from "./BrandModelForm";
import { ReactTyped } from "react-typed";
import {motion} from "framer-motion"
import "./LoginModal.scss"; // Adjust the import path as necessary

const Hero = () => {
  const navigate = useNavigate();
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
function HeroLoginBrandModel() {
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
    setSelectedBrandObj(manufacturers.find(m => String(m.id) === String(selectedBrand)) || null);
    setSelectedModelObj(models.find(m => String(m.id) === String(selectedModel)) || null);
  }, [manufacturers, selectedBrand, models, selectedModel]);

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