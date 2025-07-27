// src/components/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    feedback:
      "OTGMS made my life easier. Booked a car spa, got doorstep pickup, and it came back sparkling!",
    stars: 5,
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Aarti Mehra",
    feedback:
      "Loved the transparent pricing and smooth rental process. Highly recommended!",
    stars: 4,
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Mohit Rajput",
    feedback:
      "Real-time tracking was very helpful. No more garage confusion. OTGMS is the future!",
    stars: 5,
    image: "https://i.pravatar.cc/100?img=33",
  },
];

const Testimonials = () => {
  return (
    <section className="py-5 bg-light" id="testimonials">
      <div className="container text-center">
        <h2 className="fw-bold display-6 mb-3 text-dark">What Our Customers Say</h2>
        <p className="text-muted mb-5">Real reviews from real users across India.</p>

        <div className="row g-4">
          {testimonials.map((user, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 text-start">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="rounded-circle me-3"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <div>
                      <h6 className="mb-0 fw-semibold">{user.name}</h6>
                      <div className="text-warning small">
                        {"★".repeat(user.stars) + "☆".repeat(5 - user.stars)}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted small mb-0">{user.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
