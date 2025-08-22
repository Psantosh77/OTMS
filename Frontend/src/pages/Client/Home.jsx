// src/pages/Client/Home.jsx
import React from 'react';

import Hero from '../../components/Hero';
import Services from '../../components/Services';
import HowItWorks from '../../components/HowItWorks';
import WhyChooseUs from '../../components/WhyChooseUs';
import Testimonials from '../../components/Testimonials';
import CTA from '../../components/CTA';
import Header from '../../components/Header';
import FAQSection from '../Client/Faq';

const Home = () => {
  return (
    <>
      <style jsx global>{`
        :root {
          --primary-orange: #ff6b35;
          --secondary-orange: #f7931e;
          --light-orange: rgba(255, 107, 53, 0.1);
          --gradient-primary: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          --gradient-secondary: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          --shadow-light: 0 10px 30px rgba(255, 107, 53, 0.15);
          --shadow-medium: 0 15px 40px rgba(255, 107, 53, 0.2);
          --shadow-heavy: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        * {
          scroll-behavior: smooth;
        }

        .modern-section {
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .modern-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, var(--light-orange) 50%, transparent 70%);
          opacity: 0.03;
          z-index: 0;
        }

        .modern-card {
          background: var(--gradient-secondary);
          border: none;
          border-radius: 20px;
          padding: 40px 30px;
          transition: all 0.4s ease;
          box-shadow: var(--shadow-light);
          position: relative;
          overflow: hidden;
        }

        .modern-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: var(--gradient-primary);
          opacity: 0;
          transform: rotate(45deg);
          transition: all 0.6s ease;
          z-index: 0;
        }

        .modern-card:hover::before {
          opacity: 0.05;
        }

        .modern-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-medium);
        }

        .modern-card > * {
          position: relative;
          z-index: 1;
        }

        .modern-btn {
          background: var(--gradient-primary);
          border: none;
          border-radius: 50px;
          padding: 15px 40px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-light);
          position: relative;
          overflow: hidden;
        }

        .modern-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .modern-btn:hover::before {
          left: 100%;
        }

        .modern-btn:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-medium);
        }

        .modern-title {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          position: relative;
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(50px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .fade-in-left {
          opacity: 0;
          transform: translateX(-50px);
          animation: fadeInLeft 0.8s ease forwards;
        }

        .fade-in-right {
          opacity: 0;
          transform: translateX(50px);
          animation: fadeInRight 0.8s ease forwards;
        }

        .scale-in {
          opacity: 0;
          transform: scale(0.8);
          animation: scaleIn 0.6s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .pulse-orange {
          animation: pulseOrange 2s ease-in-out infinite;
        }

        @keyframes pulseOrange {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(255, 107, 53, 0); }
        }

        .section-bg-white {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
        }

        .section-bg-light {
          background: linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%);
        }

        .icon-modern {
          width: 80px;
          height: 80px;
          background: var(--gradient-primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          margin: 0 auto 20px;
          box-shadow: var(--shadow-light);
          transition: all 0.3s ease;
        }

        .icon-modern:hover {
          transform: rotate(360deg) scale(1.1);
        }
      `}</style>
      <style>{`
        .home-main {
          width: 100%;
        
          margin: 0 auto;
          
        }
        .modern-section {
          padding: 80px 0;
        }
        .modern-card {
          padding: 40px 30px;
        }
        .modern-btn {
          padding: 15px 40px;
          font-size: 16px;
        }
        @media (max-width: 1200px) {
          .home-main {
            max-width: 98vw !important;
            padding: 0 12px !important;
          }
          .modern-section {
            padding: 60px 0;
          }
        }
        @media (max-width: 900px) {
          .home-main {
            max-width: 100vw !important;
            padding: 0 8px !important;
          }
          .modern-section {
            padding: 40px 0;
          }
          .modern-card {
            padding: 28px 12px;
            border-radius: 16px;
          }
        }
        @media (max-width: 600px) {
          .home-main {
            max-width: 100vw !important;
            padding: 0 2vw !important;
          }
          .home-section {
            flex-direction: column !important;
            gap: 1rem !important;
            padding: 0 !important;
          }
          .modern-section {
            padding: 24px 0;
          }
          .modern-card {
            padding: 16px 4px;
            border-radius: 10px;
          }
          .modern-btn {
            padding: 12px 18px;
            font-size: 14px;
          }
          .home-title {
            font-size: 1.3rem !important;
            margin-bottom: 8px !important;
          }
          .home-desc {
            font-size: 1rem !important;
            margin-bottom: 8px !important;
          }
          .home-img {
            width: 100vw !important;
            max-width: 100vw !important;
            height: auto !important;
            border-radius: 12px !important;
          }
        }
        @media (max-width: 400px) {
          .modern-card {
            padding: 8px 2px;
            border-radius: 6px;
          }
          .modern-btn {
            padding: 8px 8px;
            font-size: 12px;
          }
        }
      `}</style>
      
      <Header />
      <div className="font-sans">
        <div className="home-main">
          <div className="fade-in-up">
            <Hero  />
          </div>
          <div className="fade-in-up stagger-1">
            <Services />
          </div>
          <div className="fade-in-up stagger-2">
            <HowItWorks />
          </div>
          <div className="fade-in-up stagger-3">
            <WhyChooseUs />
          </div>
          <div className="fade-in-up stagger-4">
            <Testimonials />
          </div>
          <div className="fade-in-up stagger-5">
            <FAQSection />
          </div>
          <div className="fade-in-up stagger-5">
            <CTA />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
