
import React from "react";


const JoinPartner= () => {
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
          <h1 style={{ fontSize : "50px",
                     lineHeight: "70px"
          }}>Reach More Buyers.<br></br>
            Move Inventory Faster.<br></br>
            Maximize Your Returns.</h1>
          <div className="banner-btn-wrap">
            <a className="banner-btn">
              Explore Now
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default JoinPartner;