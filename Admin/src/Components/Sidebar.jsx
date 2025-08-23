import React, { useState } from "react";
import "./Sidebar.css";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleDropdown = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="logo">OTGMA</div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><FaUser style={{ color: "white", marginRight: "8px" }} /> Master</li>
          {/* Submenu */}
          <li onClick={toggleDropdown}>
            📄 Submenu
            <span className={`arrow ${submenuOpen ? "rotate" : ""}`}>▶</span>
          </li>
          <ul className={`submenu ${submenuOpen ? "open" : ""}`}>
            <li><Link to="/service">🛠 Services</Link></li>
            <li><Link to="/blog">📝 Blog</Link></li>
            <li><Link to="/faq">❓ FAQ</Link></li>
            <li><Link to="/location">❓ Location</Link></li>
          </ul>

          <li>📞 Contact</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* Content */}
      
    </div>
  );
};

export default Sidebar;
