// src/components/Services.jsx
import React, { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal"; // Animation
import { useNavigate } from "react-router-dom"; // 👈 yeh import karo
import { apiService } from "../utils/apiService";


// const services = [
//   { icon: "fas fa-tools", title: "General Service", desc: "Oil change, filters, periodic servicing, inspection, AC gas top-up." },
//     { icon: "fas fa-wrench", title: "Problem & Repairs", desc: "Car not starting, engine noise, overheating, warning lights, brake/suspension fix." },
//     { icon: "fas fa-car-battery", title: "AC, Battery & Electrical", desc: "AC repair, battery replacement, alternator, power windows, lighting issue." },
//     { icon: "fas fa-car-side", title: "Bodywork, Interior Fixes", desc: "Dent removal, repainting, glass, upholstery, dashboard, headliner, sunroof." },
//     { icon: "fas fa-car-crash", title: "Brakes, Tires & Suspension", desc: "Brake pad/disc change, tire repair/replacement, wheel alignment, shocks." },
//     { icon: "fas fa-spray-can-sparkles", title: "Cleaning, Detailing & Accessories", desc: "Car wash, polishing, ceramic coating, dashcams, sound system, wraps." },
   
// ];

const Services = () => {
   const navigate = useNavigate(); // 👈 hook call

// -------------------------------Api ko fetch kiya ---------------------

const [services, setservices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchservices = async () => {
      setLoading(true);
      try {
      
        const res = await apiService.post("/services/getAllServices",  {}, // agar body nahi bhejni hai to empty object

  );
  console.log("Services API Response:", res.data);

        if (res?.data?.success) {
            setservices(res.data.data);
        } else {
          setError("Failed to fetch services Data");
        }
      } catch (err) {
        console.error("services Fetch Error:", err);
        setTimeout(fetchservices, 2000);
    setError("Something went wrong while fetching services.");
        setError("Something went wrong while fetching services.");
      } finally {
        setLoading(false);
      }
    };

    fetchservices();
  }, []);

  if (loading) return <p className="text-center text-white">Loading FAQs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  

  return (
    <section className="py-5" id="services">
      <div className="container text-center">
        <h2 className="fw-bold display-6 text-dark mb-3">Our Services</h2>
        <p className="text-muted mb-5">
          Everything your car needs, including rentals – all in one place.
        </p>

        <div className="row gy-4 align-items-stretch">
  {services.map((service, index) => (
   <div key={index} className="col-12 col-sm-6 col-md-4 d-flex">
  <Zoom 
    triggerOnce={false}
    duration={800}
    delay={index * 100}
    fraction={0.2}
    className="w-100"
  >
    {/* Added h-100 here */}
    <div className="card shadow-sm border-0 w-100 h-100 d-flex flex-column"
    onClick={() => navigate('/Servicessection')} 
                  style={{ cursor: "pointer" }} 
    >
      <div className="card-body text-center d-flex flex-column">
       <div className="fs-1 mb-3">
<img
                        src={service.image || "https://via.placeholder.com/80"}
                        alt={service.name}
                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }}
                      />
</div>
        <h5 className="card-title fw-semibold">{service.name}</h5>
        {/* flex-grow-1 ensures desc takes space but equalizes height */}
        <p className="card-text text-muted flex-grow-1">{service.description}</p>
      </div>
    </div>
  </Zoom>
</div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Services;
