
// import React from "react";
// import "./About.css"; // 👈 external css include

// const About = () => {
//   return (
//     <>

//       {/* 🔹 Banner Section */}
//       <div className="service-banner">
//         <img
//           src="/assets/image/blog_banner.webp"
//           alt="Car Blog Banner"
//           loading="lazy"
//           className="service-banner-img"
//         />
//         <div className="service-banner-txt">
//           <p>Your Daily Dose of Auto Trends</p>
//           <h1>Our Story</h1>
//           <div className="banner-btn-wrap">
//             <a className="banner-btn" href="#blog">
//               Explore Now
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 About Section */}
//       <section className="about-section py-5" id="about">
//         <div className="container">
//           <h2 className="text-center fw-bold mb-4">About OTGMS Bhanu</h2>
//           <p className="text-center text-muted mb-5">
//             Revolutionizing car care and rental experiences across India.
//           </p>

//           <div className="row justify-content-center">
//             <div className="col-lg-10">
//               <p className="lead text-justify about-lead">
//                 OTGMS (On-The-Go Motor Services) is a one-stop platform designed to
//                 bring car services and rentals into the digital era. Whether you're
//                 a B2C customer looking for fast service or a B2B fleet manager
//                 seeking accountability and scale, OTGMS delivers with verified
//                 garages, transparent pricing, live tracking, and doorstep
//                 convenience.
//               </p>
//               <p className="text-muted">
//                 From simple car washes to full repairs, from short-term rentals to
//                 long-term corporate solutions, OTGMS is built for modern vehicle
//                 owners and businesses. Our mission is to reduce friction, save
//                 time, and give every vehicle the service it deserves.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default About;

import React from "react";
import "./About.css"; // external css include

const About = () => {
  return (
    <>

      {/* 🔹 Banner Section */}
      <div className="service-banner">
        <img
          src="/assets/image/blog_banner.webp"
          alt="Car Blog Banner"
          loading="lazy"
          className="service-banner-img"
        />
        <div className="service-banner-txt">
          <p>Your Daily Dose of Auto Trends</p>
          <h1>Our Story</h1>
          <div className="banner-btn-wrap">
            <a className="banner-btn" href="#blog">
              Explore Now
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 New Section (same as screenshot) */}
      <section className="car-care-section py-5">
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left Side Text */}
            <div className="col-lg-7">
              <h2 className="fw-bold mb-3">
                On-demand car care & technology company
              </h2>
              <p className="text-muted mb-3">
                From mobile car washing & detailing to oil changes & diagnostics & 
                on-time servicing, MySyara offers a convenient, trusted & professional service.
              </p>
              <p className="text-muted mb-3">
                At home or at work, MySyara arrives with water, power and all the tools
                needed to complete the job, all we need is your keys. Free pick up & drop with
                any major repairs and on-time vehicle servicing. With all our on-demand, high-
                quality car care services, we offer a 100% satisfaction guarantee. Our
                experienced employees have over 100 hours of training, background checks,
                and full insurance policies.
              </p>
              <ul className="text-muted">
                <li>Complete car care services</li>
                <li>Best price guarantee</li>
                <li>Expert mechanics & technicians</li>
                <li>Free pick and drop</li>
              </ul>
            </div>

            {/* Right Side Image */}
            <div className="col-lg-5 text-center">
              <img
                src="/assets/image/blog_card1.png"
                alt="Car Service"
                className="img-fluid rounded shadow"
              />
              <p className="text-muted small mt-2">
                OTGMS - Don’t settle for good when you can get the best!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 🔹 About Section */}
      {/* <section className="about-section py-5" id="about">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">About OTGMS Bhanu</h2>
          <p className="text-center text-muted mb-5">
            Revolutionizing car care and rental experiences across India.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <p className="lead text-justify about-lead">
                OTGMS (On-The-Go Motor Services) is a one-stop platform designed to
                bring car services and rentals into the digital era. Whether you're
                a B2C customer looking for fast service or a B2B fleet manager
                seeking accountability and scale, OTGMS delivers with verified
                garages, transparent pricing, live tracking, and doorstep
                convenience.
              </p>
              <p className="text-muted">
                From simple car washes to full repairs, from short-term rentals to
                long-term corporate solutions, OTGMS is built for modern vehicle
                owners and businesses. Our mission is to reduce friction, save
                time, and give every vehicle the service it deserves.
              </p>
            </div>
          </div>
        </div> 
      </section>*/}
    </>
  );
};

export default About;
