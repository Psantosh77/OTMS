// src/components/BlogPage.jsx
import React, { useState , useEffect } from "react";
import "../../styles/Blog.css"; // aap apna existing CSS yahan import kar sakte ho

const blogData = [
  {
    img: "/assets/image/blog_card1.png",
    category: "Electric Cars",
    title: "Top 5 Electric Cars of 2025",
    desc: "Discover the most advanced electric cars of 2025 with extended range and eco-friendly performance."
  },
  {
    img: "/assets/image/blog_card2.png",
    category: "Luxury",
    title: "Best Luxury Sedans",
    desc: "Explore top sedans designed for unmatched comfort, elegance, and smooth driving."
  },
  {
    img: "/assets/image/blog_card3.png",
    category: "SUVs",
    title: "Top SUVs for Adventure",
    desc: "Check out the most rugged SUVs ready to conquer any terrain in 2025."
  },
  {
    img: "/assets/image/blog_card4.png",
    category: "Sports Cars",
    title: "Fastest Cars of the Year",
    desc: "Experience the thrill with the fastest sports cars hitting the roads this year."
  },
  {
    img: "/assets/image/blog_card5.png",
    category: "Hybrids",
    title: "Best Hybrid Models",
    desc: "Find the perfect balance of fuel efficiency and performance with these hybrids."
  },
  {
    img: "/assets/image/blog_card6.png",
    category: "Concept Cars",
    title: "Future of Automobiles",
    desc: "Take a peek into the future with groundbreaking concept cars."
  },
  {
    img: "/assets/image/blog_card7.png",
    category: "Off-Road",
    title: "Best Off-Road Vehicles",
    desc: "Discover machines built to handle the toughest terrains."
  },
  {
    img: "/assets/image/blog_card8.png",
    category: "Classic Cars",
    title: "Timeless Classics",
    desc: "Relive the golden era of automobiles with these timeless classics."
  }
];

const BlogPage = () => {
  const [modalData, setModalData] = useState(null);
    const [flippedCard, setFlippedCard] = useState(null);

  const openModal = (blog) => {
    setModalData(blog);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalData(null);
    document.body.style.overflow = "auto";
  };

useEffect(() => {
  if (window.innerWidth <= 768) { // Mobile/tablet
    const cards = document.querySelectorAll(".flip-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });
  }
}, []);

  return (
    <div>
      {/* Banner */}
      <div className="service-banner">
        <img src="/assets/image/blog_banner.png"alt="Car Blog Banner" />
        <div className="service-banner-txt">
          <p>Your Daily Dose of Auto Trends</p>
          <h1>Latest Car News & Reviews</h1>
          <div className="service-btn">
            <a href="#">Explore Blogs</a>
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      <section>
        <div className="blog-cards">
          {blogData.map((blog, idx) => (
           <div
  className={`flip-card ${flippedCard === idx ? "flipped" : ""}`}
  key={idx}
  onClick={() => {
    if (window.innerWidth <= 768) { // sirf mobile/tablet pe click flip
      setFlippedCard(flippedCard === idx ? null : idx);
    }
  }}
>
  <div className="flip-card-inner">
    {/* Tumhara front side */}
    <div className="flip-card-front">
      <img src={blog.img} alt={blog.title} />
      <h3>{blog.title}</h3>
    </div>

    {/* Tumhara back side */}
    <div className="flip-card-back">
      <span className="category">{blog.category}</span> <h3>{blog.title}</h3> <p>{blog.desc}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // flip na ho jab button click ho
          openModal(blog);
        }}
      >
        Read More
      </button>
    </div>
  </div>
</div>

          ))}
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="modal" style={{ display: "flex" }} onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
            <img src={modalData.img} alt={modalData.title} />
            <h3>{modalData.title}</h3>
            <p>{modalData.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};


export default BlogPage;
