import React from "react";

const servicesData = [
  {
    img: "https://i.pravatar.cc/100?img=1",
    title: "Engine Diagnostics",
    desc: "Accurate engine check-ups with modern tools to ensure smooth performance."
  },
  {
    img: "https://i.pravatar.cc/100?img=2",
    title: "Oil Change",
    desc: "Premium oil replacements to keep your vehicle running efficiently."
  },
  {
    img: "https://i.pravatar.cc/100?img=3",
    title: "Brake Repair",
    desc: "Safe and reliable brake inspections and repairs for all vehicles."
  },
  {
    img: "https://i.pravatar.cc/100?img=4",
    title: "Tire Replacement",
    desc: "Durable tire replacements with professional fitting."
  },
  {
    img: "https://i.pravatar.cc/100?img=5",
    title: "Car Wash",
    desc: "Premium wash and detailing for a spotless ride."
  },
  {
    img: "https://i.pravatar.cc/100?img=6",
    title: "Battery Service",
    desc: "Quick battery testing and replacement services."
  },
  {
    img: "https://i.pravatar.cc/100?img=7",
    title: "AC Repair",
    desc: "Cool comfort with our expert AC maintenance and repair."
  },
  {
    img: "https://i.pravatar.cc/100?img=8",
    title: "Suspension Repair",
    desc: "Smooth rides with our suspension inspection and repair."
  },
  {
    img: "https://i.pravatar.cc/100?img=9",
    title: "Paint Job",
    desc: "Fresh coat of paint for a brand-new look."
  },
  {
    img: "https://i.pravatar.cc/100?img=10",
    title: "Wheel Alignment",
    desc: "Perfect alignment for better control and tire life."
  },
  {
    img: "https://i.pravatar.cc/100?img=11",
    title: "Transmission Repair",
    desc: "Expert care for all transmission systems."
  },
  {
    img: "https://i.pravatar.cc/100?img=12",
    title: "24/7 Roadside Assistance",
    desc: "Always here when you need us most."
  }
];

const Services = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center", background: "#0b0f19" }}>
      <h1 style={{ 
        fontFamily: "'Poppins', sans-serif",
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#fff",
        marginBottom: "10px"
      }}>
        Our Services
      </h1>
      <p style={{
        fontSize: "1.1rem",
        color: "rgba(255,255,255,0.8)",
        maxWidth: "700px",
        margin: "0 auto 40px",
        lineHeight: "1.6"
      }}>
        From diagnostics to repairs, our wide range of services ensures your car stays in perfect condition.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {servicesData.map((service, index) => (
          <div key={index} style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            animation: `fadeUp 0.6s ease ${index * 0.1}s both`,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
          }}>
            <img 
              src={service.img} 
              alt={service.title} 
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px",
                border: "3px solid rgba(255,255,255,0.3)"
              }}
            />
            <h3 style={{
              fontSize: "1.25rem",
              color: "#fff",
              marginBottom: "10px"
            }}>{service.title}</h3>
            <p style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: "1.5"
            }}>{service.desc}</p>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Services;
