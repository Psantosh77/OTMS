import React from "react";

const JoinPartner = () => {
  return (
    <>
      {/* 🔹 Hero Section (Your Existing Code - unchanged) */}
      <style>{`
        .partner-banner {
          position: relative;
          overflow: hidden;
          height: 100vh;
        }
        .partner-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .partner-banner::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1;
        }
        .partner-banner-txt {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          text-align: center;
          z-index: 2;
          padding: 0 15px;
        }
        .partner-banner-txt p {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .partner-banner-txt h1 {
          font-size: 45px;
          line-height : 70px;
          margin: 0 0 20px 0;
          text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 768px) {
          .partner-banner {
            height: 70vh;
          }
          .partner-banner-txt h1 {
            font-size: 18px;
            line-height : 28px;
          }
          .partner-banner-txt p {
            font-size: 14px;
          }
        }

        /* 🔹 Partner Section (screenshot style) */
        .partner-section {
          display: flex;
          gap: 3rem;
          padding: 3rem 1rem;
          max-width: 1300px;
          margin: 0 auto;
          flex-wrap: wrap;
        }
        .partner-left {
          flex: 1;
          min-width: 300px;
        }
        .partner-left h2 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .partner-left p {
          font-size: 16px;
          margin-bottom: 1rem;
          color: #333;
          line-height: 1.6;
        }
        .steps {
          margin-top: 1.5rem;
        }
        .step-item {
          margin-bottom: 1rem;
          font-size: 15px;
        }
        .step-badge {
          display: inline-block;
          background: #ffeded;
          color: #e53935;
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          font-weight: 600;
          margin-right: 8px;
        }
        .partner-right {
          flex: 1;
          min-width: 320px;
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .partner-right h3 {
          font-size: 20px;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .partner-right input,
        .partner-right select,
        .partner-right textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 1rem;
          font-size: 14px;
        }
        .partner-right label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 0.5rem;
          display: block;
        }
        .partner-right .checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 1rem;
          margin-bottom: 1rem;
        }
        .partner-right button {
          background: #e53935;
          border: none;
          color: #fff;
          padding: 12px;
          width: 100%;
          font-size: 16px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>

      <div className="partner-banner">
        <img
          src="/assets/image/blog_banner.webp"
          alt="Car Blog Banner"
          loading="lazy"
          className="partner-banner-img"
        />
        <div className="partner-banner-txt">
          <p>Your Daily Dose of Auto Trends</p>
          <h1>
            Reach More Buyers. <br />
            Move Inventory Faster. <br />
            Maximize Your Returns.
          </h1>
          <div className="banner-btn-wrap">
            <a
              style={{
                background: "linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "clamp(0.9rem, 2.2vw, 1.08rem)",
                border: "none",
                textDecoration: "none",
                borderRadius: "8px",
                padding: "10px 22px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                cursor: "pointer",
                letterSpacing: "0.5px",
                display: "inline-block",
              }}
              href="#partner"
            >
              Explore Now
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Partner Section (Screenshot wala) */}
      <section className="partner-section" id="partner">
        {/* Left Content */}
        <div className="partner-left">
          <h2>
            Unlock New Sales Channels. <br />
            Reach More Buyers. <br />
            Maximize Vehicle Value.
          </h2>
          <p>
            Join Egaragi’s trusted network of auction partners and transform the way you sell vehicles. Our
            platform empowers dealers, fleet operators, and resellers to list and auction cars with speed,
            transparency, and efficiency—reaching thousands of verified buyers nationwide.
          </p>

          <h4 style={{ marginTop: "1.5rem" }}>
            Start Auction in <span style={{ color: "red" }}>5 Simple Steps</span>
          </h4>
          <img
            src="/assets/image/auction-step.jpg"
            alt="Steps"
            style={{ maxWidth: "100%", margin: "1rem 0", borderRadius: "8px" }}
          />

          <div className="steps">
            <div className="step-item">
              <span className="step-badge">Step 1</span> Fill the form to become a Partner.
            </div>
            <div className="step-item">
              <span className="step-badge">Step 2</span> Login into <a href="#">Partner Panel</a>
            </div>
            <div className="step-item">
              <span className="step-badge">Step 3</span> Go to <b>Seller Dashboard</b> → click <b>“My Auction.”</b>
            </div>
            <div className="step-item">
              <span className="step-badge">Step 4</span> Add Car Listings (Details, Images, Price & Duration)
            </div>
            <div className="step-item">
              <span className="step-badge">Step 5</span> Start Auction → <b>Change Auction Status (Ongoing)</b>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="partner-right">
          <h3>Become a Partner</h3>
          <p style={{ fontSize: "13px", marginBottom: "1rem", color: "#666" }}>
            Please note : To join EGARAGI as a partner, you must be a registered company or brokerage with an official registered address.
          </p>

          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Company Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="+971 50 123 4567" />

          <select>
            <option>Select Emirates Location</option>
            <option>Dubai</option>
            <option>Sharjah</option>
            <option>Abu Dhabi</option>
          </select>

          <label>Select Business Type</label>
          <div className="checkbox-group">
            <label><input type="checkbox" /> Garage</label>
            <label><input type="checkbox" /> Car Recovery</label>
            <label><input type="checkbox" /> Car Rental</label>
            <label><input type="checkbox" /> Car Auctions</label>
            <label><input type="checkbox" /> Car Insurance</label>
            <label><input type="checkbox" /> Vehicle Loan</label>
            <label><input type="checkbox" /> Other</label>
          </div>

          <textarea placeholder="Write something about your business if it is non of above. (Optional)" rows="4"></textarea>

          <button type="submit">Submit</button>
        </div>
      </section>
    </>
  );
};

export default JoinPartner;
