import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Why Car Service Matters: A Complete Guide",
      image: "https://via.placeholder.com/800x400",
      date: "July 27, 2025",
      excerpt: "Car maintenance isn’t just about oil changes. Discover why timely servicing can save you thousands...",
    },
    {
      id: 2,
      title: "Top 10 Car Problems You Shouldn’t Ignore",
      image: "https://via.placeholder.com/800x400",
      date: "July 22, 2025",
      excerpt: "We breakdown the top car issues users face, and when it's time to get it checked by a mechanic...",
    },
    {
      id: 3,
      title: "Electric vs Petrol Cars: Which Is Best in 2025?",
      image: "https://via.placeholder.com/800x400",
      date: "July 18, 2025",
      excerpt: "Still confused about switching to electric? This article compares cost, maintenance, and longevity...",
    },
  ];

  return (
    <>
      <style jsx>{`
        .blog-section {
          background: linear-gradient(145deg, #fff 0%, #f8f9fa 100%);
          min-height: 100vh;
          padding-top: 60px;
        }
        .blog-title {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .card-modern {
          border: none;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.12);
          transition: all 0.3s;
          background: #fff;
        }
        .card-modern:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 40px rgba(255, 107, 53, 0.18);
        }
        .card-img-top {
          border-top-left-radius: 25px;
          border-top-right-radius: 25px;
          height: 220px;
          object-fit: cover;
        }
        .btn-modern {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border: none;
          border-radius: 12px;
          padding: 10px 28px;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(255, 107, 53, 0.18);
        }
        .btn-modern:hover {
          background: linear-gradient(135deg, #f7931e 0%, #ff6b35 100%);
          transform: translateY(-2px);
        }
        .sidebar-modern {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(255, 107, 53, 0.10);
          padding: 32px 24px;
        }
        .list-group-item {
          border: none;
          background: transparent;
        }
        .badge-modern {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        }
        /* Animations */
        .fade-in-up {
          opacity: 0;
          transform: translateY(50px);
          animation: fadeInUp 0.8s ease forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stagger-1 { animation-delay: 0.2s; }
        .stagger-2 { animation-delay: 0.4s; }
        .stagger-3 { animation-delay: 0.6s; }
      `}</style>
      <div className="blog-section">
        <div className="container py-5">
          <div className="row">
            {/* Main Blog Posts */}
            <div className="col-lg-8">
              <h2 className="blog-title fade-in-up stagger-1">Latest Blog Posts</h2>
              {blogPosts.map((post, idx) => (
                <div
                  className={`card card-modern mb-4 fade-in-up stagger-${idx + 1}`}
                  key={post.id}
                  style={{ border: "none" }}
                >
                  <img src={post.image} className="card-img-top" alt={post.title} />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "#ff6b35" }}>{post.title}</h5>
                    <p className="text-muted small">{post.date}</p>
                    <p className="card-text">{post.excerpt}</p>
                    <a href="#" className="btn btn-modern">
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {/* Sidebar */}
            <div className="col-lg-4 fade-in-up stagger-3">
              <div className="sidebar-modern sticky-top" style={{ top: "80px" }}>
                <h4 className="mb-3" style={{ color: "#ff6b35" }}>Categories</h4>
                <ul className="list-group mb-4">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Maintenance
                    <span className="badge badge-modern rounded-pill">12</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Tips
                    <span className="badge badge-modern rounded-pill">8</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Electric Vehicles
                    <span className="badge badge-modern rounded-pill">5</span>
                  </li>
                </ul>
                <h4 className="mb-3" style={{ color: "#ff6b35" }}>Recent Posts</h4>
                <ul className="list-unstyled">
                  {blogPosts.slice(0, 2).map((post) => (
                    <li key={post.id} className="mb-2">
                      <a href="#" className="text-decoration-none text-dark">
                        ➤ {post.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;