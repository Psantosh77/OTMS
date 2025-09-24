// src/pages/BlogPage.jsx
import React, { useState, useEffect } from "react";
import "../../styles/Blog.css"; // CSS import
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

const blogData = [
  {
    img: "/assets/image/blog_card1.png",
    category: "Electric Cars",
    title: "Top 5 Electric Cars of 2025",
    desc: "Discover the most advanced electric cars of 2025 with extended range and eco-friendly performance.",
    details:
      "The top 5 electric cars of 2025 come with extended battery ranges, AI-assisted driving, and eco-friendly technology. Models include Tesla Model Z, Rivian X2, Lucid Air GT, and more."
  },
  {
    img: "/assets/image/blog_card2.png",
    category: "Luxury",
    title: "Best Luxury Sedans",
    desc: "Explore top sedans designed for unmatched comfort, elegance, and smooth driving.",
    details:
      "Luxury sedans like Mercedes S-Class, BMW 7 Series, and Audi A8 continue to dominate with premium comfort, smart interiors, and cutting-edge features."
  },
  {
    img: "/assets/image/blog_card3.png",
    category: "SUVs",
    title: "Top SUVs for Adventure",
    desc: "Check out the most rugged SUVs ready to conquer any terrain in 2025.",
    details:
      "Adventure SUVs like Land Rover Defender 2025, Jeep Wrangler EV, and Ford Bronco Hybrid bring power, durability, and off-road excellence."
  },
  {
    img: "/assets/image/blog_card4.png",
    category: "Sports Cars",
    title: "Fastest Cars of the Year",
    desc: "Experience the thrill with the fastest sports cars hitting the roads this year.",
    details:
      "Sports cars such as Ferrari SF90, Lamborghini Revuelto, and Porsche 911 GT3 RS deliver unmatched speed, aerodynamics, and luxury performance."
  }
];

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  // scroll lock when modal is open
  useEffect(() => {
    if (selectedBlog !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedBlog]);

  return (
    <div>
      {/* Banner */}
      <div className="service-banner">
        <img
          src="/assets/image/blog_banner.webp"
          alt="Car Blog Banner"
          loading="lazy"
        />
        <div className="service-banner-txt">
          <p style={{ color: "white" }}>Your Daily Dose of Auto Trends</p>
          <h1 style={{fontSize: "80px"}}>Latest Car News & Media</h1>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "18px" }}>
            <a
              style={{
                background: "linear-gradient(90deg, #ff8800 0%, #ffb84d 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1.08rem",
                border: "none",
                textDecoration: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                cursor: "pointer",
                letterSpacing: "0.5px",
               
              }}
              href="#blog"
            >
              Explore b
            </a>
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      <section className="blog-cards" id="blog">
        {blogData.map((blog, idx) => (
          <div className="blog-card" key={idx}>
            <img src={blog.img} alt={blog.title} loading="lazy" />
            <div className="blog-content">
              <span className="category">{blog.category}</span>
              <h3>{blog.title}</h3>
              <p>{blog.desc}</p>
              <button
                className="read-more"
                onClick={() => setSelectedBlog(blog)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Popup Modal */}
      {selectedBlog && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn text-danger" onClick={() => setSelectedBlog(null)}>
              &times;
            </button>
            <img src={selectedBlog.img} alt={selectedBlog.title} />
            <h2>{selectedBlog.title}</h2>
            <p><strong>{selectedBlog.category}</strong></p>
            <p>{selectedBlog.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
