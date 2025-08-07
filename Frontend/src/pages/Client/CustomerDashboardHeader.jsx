import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Popover, Typography, Button as MuiButton } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const CustomerDashboardHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, email: loggedInEmail, logout } = useAuth();

  const handleAccountClick = (event) => setAccountAnchorEl(event.currentTarget);
  const handleAccountClose = () => setAccountAnchorEl(null);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <style jsx>{`
        .customer-header {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 24px rgba(255,107,53,0.10);
          border-bottom: 2px solid #ffe0b2;
          position: sticky;
          top: 0;
          z-index: 1100;
        }
        .customer-header .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 64px;
          padding: 0 18px;
        }
        .customer-logo {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .customer-nav {
          display: flex;
          gap: 1.2rem;
          align-items: center;
        }
        .customer-nav-link {
          color: #222;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 10px 18px;
          border-radius: 14px;
          background: transparent;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
        }
        .customer-nav-link:hover, .customer-nav-link.active {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          color: #fff;
        }
        .customer-mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
        }
        @media (max-width: 768px) {
          .customer-nav {
            display: none;
          }
          .customer-mobile-toggle {
            display: block;
          }
        }
        .customer-mobile-menu {
          position: fixed;
          top: 0;
          right: ${mobileMenuOpen ? "0" : "-100%"};
          width: 260px;
          height: 100%;
          background: #fff;
          z-index: 1300;
          transition: right 0.3s;
          box-shadow: -4px 0 24px rgba(0,0,0,0.12);
          padding: 20px;
          overflow-y: auto;
        }
        .customer-mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .customer-mobile-menu-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .customer-mobile-nav-link {
          color: #222;
          font-weight: 600;
          font-size: 1.08rem;
          padding: 12px 16px;
          border-radius: 10px;
          background: transparent;
          transition: background 0.2s;
          text-decoration: none;
        }
        .customer-mobile-nav-link:hover {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          color: #fff;
        }
      `}</style>
      <header className="customer-header">
        <div className="container">
          <Link to="/client/dashboard" className="customer-logo">OTGMS</Link>
          <nav className="customer-nav">
            <Link to="/client/dashboard" className="customer-nav-link">Dashboard</Link>
            <Link to="/services" className="customer-nav-link">Services</Link>
            <Link to="/bookings" className="customer-nav-link">Bookings</Link>
            <Link to="/history" className="customer-nav-link">History</Link>
            <Link to="/vehicle-info" className="customer-nav-link">Vehicle Info</Link>
            <AccountCircleIcon style={{ fontSize: 30, color: "#ff6b35", cursor: "pointer" }} onClick={handleAccountClick} />
            <Popover
              open={Boolean(accountAnchorEl)}
              anchorEl={accountAnchorEl}
              onClose={handleAccountClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{ sx: { p: 2, minWidth: 180, borderRadius: 2 } }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{loggedInEmail}</Typography>
                <MuiButton
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ mt: 1, borderRadius: 2, fontWeight: 600, textTransform: "none", px: 2, py: 0.5, fontSize: "1rem" }}
                  onClick={() => { handleAccountClose(); handleLogout(); }}
                >Logout</MuiButton>
              </Box>
            </Popover>
          </nav>
          <button className="customer-mobile-toggle" onClick={toggleMobileMenu}>
            <MenuIcon style={{ fontSize: 28, color: "#ff6b35" }} />
          </button>
        </div>
        {/* Mobile Menu */}
        <div className="customer-mobile-menu" style={{ right: mobileMenuOpen ? 0 : '-100%' }}>
          <div className="customer-mobile-menu-header">
            <span className="customer-logo" style={{ fontSize: '1.5rem' }}>OTGMS</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px' }} onClick={closeMobileMenu}>
              <CloseIcon style={{ fontSize: 22, color: "#ff6b35" }} />
            </button>
          </div>
          <nav className="customer-mobile-menu-nav">
            <Link to="/client/dashboard" className="customer-mobile-nav-link" onClick={closeMobileMenu}>Dashboard</Link>
            <Link to="/services" className="customer-mobile-nav-link" onClick={closeMobileMenu}>Services</Link>
            <Link to="/bookings" className="customer-mobile-nav-link" onClick={closeMobileMenu}>Bookings</Link>
            <Link to="/history" className="customer-mobile-nav-link" onClick={closeMobileMenu}>History</Link>
            <Link to="/vehicle-info" className="customer-mobile-nav-link" onClick={closeMobileMenu}>Vehicle Info</Link>
            <button className="customer-mobile-nav-link" onClick={() => { closeMobileMenu(); handleLogout(); }}>Logout</button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default CustomerDashboardHeader;
