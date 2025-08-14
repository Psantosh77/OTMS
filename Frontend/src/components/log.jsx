// src/components/SignupDropdown.jsx
import React, { useState } from "react";

const SignupDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkbox:", checked, "Email:", email);
  };

  return (
    <div
      className="signup-wrapper"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Ye button aapke header style ke hisaab se rahega */}
      <span className="nav-link-modern">Sign up</span>

      {showDropdown && (
        <div
          className="signup-dropdown"
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            background: "#fff",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            minWidth: "220px",
            zIndex: 1000,
          }}
        >
          <form onSubmit={handleSubmit}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Login as a render</span>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                marginTop: "10px",
                padding: "8px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />

            <button
              type="submit"
              style={{
                marginTop: "10px",
                background: "linear-gradient(90deg, #ff6b35, #f7931e)",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignupDropdown;
