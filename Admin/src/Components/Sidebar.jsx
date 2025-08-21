import React, { useState } from "react";
import "./Sidebar.css";
import { FaUser } from "react-icons/fa";

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
          <li>🏠 Home</li>
          <li><FaUser style={{ color: "white", marginRight: "8px" }} /> Master</li>
          {/* Submenu */}
          <li onClick={toggleDropdown}>
            📄 Submenu
            <span className={`arrow ${submenuOpen ? "rotate" : ""}`}>▶</span>
          </li>
          <ul className={`submenu ${submenuOpen ? "open" : ""}`}>
            <li>🛠 Services</li>
            <li>📝 Blog</li>
            <li>❓ FAQ</li>
          </ul>

          <li>📞 Contact</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* Content */}
      <div className="content">
        <h2>Welcome!</h2>
      </div>
    </div>
  );
};

export default Sidebar;
