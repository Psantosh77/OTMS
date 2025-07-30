// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

const Hero = () => {
  return (
    <>
      <style jsx>{`
        .hero-section {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          position: relative;
          overflow: hidden;
          padding: 100px 0;
          min-height: 900px; /* increased section height */
        }
        .hero-section-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw;
          height: 100%;
          z-index: 0;
          background: url('https://images.unsplash.com/photo-1711386689622-1cda23e10217?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center center/cover no-repeat;
        }
        .hero-section-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw;
          height: 100%;
          z-index: 1;
         //  background: linear-gradient(90deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.32) 100%);
        }

        .hero-title {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          font-size: 3.5rem;
          line-height: 1.2;
          margin-bottom: 2rem;
        }

        .hero-description {
          font-size: 1.3rem;
          color: #f5f5f5;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .btn-explore {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border: none;
          border-radius: 50px;
          padding: 18px 45px;
          color: white;
          font-weight: 600;
          font-size: 18px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-explore::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn-explore:hover::before {
          left: 100%;
        }

        .btn-explore:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.4);
        }

        .hero-image {
          max-width: 600px !important;
          width: 100%;
          height: auto;
          filter: drop-shadow(0 20px 40px rgba(255, 107, 53, 0.2));
          transition: all 0.3s ease;
        }

        .hero-image:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 25px 50px rgba(255, 107, 53, 0.3));
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(50px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .fade-in-right {
          opacity: 0;
          transform: translateX(50px);
          animation: fadeInRight 0.8s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .stagger-1 { animation-delay: 0.2s; }
        .stagger-2 { animation-delay: 0.4s; }
        .stagger-3 { animation-delay: 0.6s; }

        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.1rem;
          }
          
          .hero-image {
            max-width: 400px !important;
          }
        }
      `}</style>

      <section className="hero-section" id="hero">
        <div className="hero-section-bg"></div>
        <div className="hero-section-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center flex-column-reverse flex-md-row">
            
            {/* Text Content */}
            <div className="col-md-6 text-center text-md-start mt-4 mt-md-0">
              <h2 className="hero-title fade-in-up">
                Revolutionize Your Car Service Experience with OTGMS
              </h2>
              <p className="hero-description fade-in-up stagger-1">
                Book trusted garages, compare prices, and get remote assistance. OTGMS brings convenience and transparency to your vehicle care.
              </p>
              <Link
                to="#services"
                className="btn btn-explore fade-in-up stagger-2"
              >
                Explore Services
              </Link>
            </div>
            {/* LoginModal placed to the right of revolution section */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <LoginModal showModal={true} handleCloseModal={() => {}} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
