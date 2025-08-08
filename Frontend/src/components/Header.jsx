// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../utils/apiService";

import { useAuth } from "../hooks/useAuth";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Popover, Box, Typography, Button as MuiButton } from "@mui/material";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Use the auth hook
  const { isAuthenticated, userRole, email: loggedInEmail, logout } = useAuth();

  // Handle mobile menu close on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        closeMobileMenu();
      }
    };


    // Only auto-open mobile menu for client on mobile, and close on desktop
    if (isAuthenticated && userRole === 'client') {
      if (window.innerWidth <= 768) {
        setMobileMenuOpen(true);
      } else {
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isAuthenticated, userRole]);

  const handleLoginClick = () => setShowModal(true);

  const handleLogout = async () => {
    try {
      await apiService.post('/auth/logout', {}, {}, 
        () => {
          logout();
          navigate('/', { replace: true });
          window.location.reload();
        },
        () => {
          logout();
          navigate('/', { replace: true });
          window.location.reload();
        }
      );
    } catch {
      logout();
      navigate('/', { replace: true });
      window.location.reload();
    }
  };

  const handleCloseModal = () => setShowModal(false);

  // Account popover handlers
  const handleAccountClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };
  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style jsx>{`
        .header-modern {
          background: rgba(255,255,255,0.15); /* transparent white */
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 24px rgba(255,107,53,0.10);
          border-radius: 0 0 32px 32px;
          border-bottom: 2px solid #ffe0b2;
          position: relative;
          transition: box-shadow 0.2s, background 0.2s;
        }
        .header-modern.sticky-top {
          position: sticky;
          top: 0;
          z-index: 1100;
        }
        .logo-modern {
          font-size: 2.4rem;
          font-weight: 800;
          letter-spacing: 2.5px;
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 12px rgba(255,107,53,0.10);
          padding: 0 8px;
        }
        .nav-modern {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          background: rgba(255,255,255,0.85);
          border-radius: 18px;
          padding: 4px 18px;
          box-shadow: 0 2px 12px rgba(255,107,53,0.06);
        }
        .nav-link-modern {
          color: #222 !important;
          font-weight: 600;
          font-size: 1.18rem;
          position: relative;
          padding: 10px 22px;
          border-radius: 18px;
          background: transparent;
          transition: background 0.2s, color 0.2s, font-size 0.2s;
          cursor: pointer;
          letter-spacing: 0.5px;
          border: none;
          outline: none;
          text-decoration: none;
        }
        .nav-link-modern:hover, .nav-link-modern.active {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          color: #fff !important;
          font-size: 1.22rem;
          box-shadow: 0 2px 12px rgba(255,107,53,0.10);
        }
        .nav-link-modern::after {
          content: '';
          position: absolute;
          left: 18px;
          bottom: 6px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          transition: width 0.3s;
        }
        .nav-link-modern:hover::after, .nav-link-modern.active::after {
          width: calc(100% - 36px);
        }
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .mobile-menu-toggle:hover {
          background: rgba(255,107,53,0.1);
        }
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 1200;
          display: none;
        }
        .mobile-menu-overlay.open {
          display: block;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
         
          width: 280px;
          height: 100%;
          background: #fff;
          z-index: 1300;
          transition: right 0.3s ease;
          box-shadow: -4px 0 24px rgba(0,0,0,0.15);
          padding: 20px;
          overflow-y: auto;
          display: none;
        }
        .mobile-menu.open {
          right: 0;
          display: block;
        }
        @media (max-width: 768px) {
          .mobile-menu {
            display: block;
          }
        }
        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #ffe0b2;
        }
        .mobile-menu-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mobile-nav-link {
          color: #222;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 12px 16px;
          border-radius: 12px;
          background: transparent;
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
          border: none;
          outline: none;
          text-align: left;
          width: 100%;
        }
        .mobile-nav-link:hover {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          color: #fff;
          transform: translateX(4px);
        }
        .mobile-user-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ffe0b2;
        }
        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .mobile-user-email {
          color: #ff6b35;
          font-weight: 600;
          font-size: 1rem;
        }
        .mobile-logout-btn {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          font-size: 1rem;
          transition: transform 0.2s;
        }
        .mobile-logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255,107,53,0.3);
        }
        .welcome-email {
          color: #ff6b35;
          font-weight: 600;
          margin-right: 1rem;
          font-size: 1rem;
        }
        .account-popover .MuiPaper-root {
          border-radius: 18px !important;
          box-shadow: 0 4px 24px rgba(255,107,53,0.13) !important;
        }
        .account-popover .MuiTypography-subtitle1 {
          color: #ff6b35;
          font-weight: 700;
          font-size: 1.08rem;
        }
        .account-popover .MuiButton-root {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(255,107,53,0.10);
        }
        .account-popover .MuiButton-root:hover {
          background: linear-gradient(90deg, #f7931e 0%, #ff6b35 100%);
        }
        
        /* Responsive breakpoints */
        @media (max-width: 1024px) {
          .nav-modern {
            gap: 1rem;
            padding: 4px 12px;
          }
          .nav-link-modern {
            font-size: 1.1rem;
            padding: 8px 16px;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }
          .nav-modern {
            display: none;
          }
          .logo-modern {
            font-size: 2rem;
          }
          .header-modern {
            border-radius: 0 0 20px 20px;
            background: rgba(255,255,255,0.10); /* more transparent on mobile */
            backdrop-filter: blur(10px);
          }
          .container {
            padding: 0 16px !important;
          }
        }
        
        @media (max-width: 480px) {
          .logo-modern {
            font-size: 1.8rem;
            letter-spacing: 1.5px;
          }
          .header-modern {
            border-radius: 0 0 16px 16px;
          }
          .container {
            padding: 0 12px !important;
            min-height: 60px !important;
          }
          .mobile-menu {
            width: 100vw;
            left: 0;
            right: 0;
            transform: translateX(100vw);
            transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          }
          .mobile-menu.open {
            left: 0;
            right: 0;
            transform: translateX(0);
          }
        }
        
        @media (max-width: 360px) {
          .logo-modern {
            font-size: 1.6rem;
            letter-spacing: 1px;
          }
          .container {
            padding: 0 8px !important;
          }
        }
      `}</style>
      <header className="header-modern sticky-top py-3 px-0">
        <div className="container d-flex align-items-center justify-content-between" style={{ minHeight: 70, flexWrap: "wrap" }}>
          {/* Section 1: Logo */}
          <div style={{ flex: "0 0 auto" }}>
            <Link to="/" className="text-decoration-none">
              <span className="logo-modern">OTGMS</span>
            </Link>
          </div>
          
          {/* Section 2: Desktop Menu */}
          <div style={{ flex: "1 1 auto", display: "flex", justifyContent: "flex-end" }}>
            <nav className="nav-modern">
              <Link to="/" className="nav-link-modern">
                Home  
              </Link>
              
              {/* Role-based navigation */}
              {isAuthenticated && userRole === 'client' && (
                <>
                  <Link to="/services" className="nav-link-modern">
                    Services
                  </Link>
                  <Link to="/bookings" className="nav-link-modern">
                    Bookings
                  </Link>
                  <Link to="/history" className="nav-link-modern">
                    History
                  </Link>
                </>
              )}
              
              {isAuthenticated && userRole === 'vendor' && (
                <>
                  <Link to="/vendor/orders" className="nav-link-modern">
                    Orders
                  </Link>
                  <Link to="/vendor/services" className="nav-link-modern">
                    Services
                  </Link>
                  <Link to="/vendor/pricing" className="nav-link-modern">
                    Pricing
                  </Link>
                </>
              )}
              
              {isAuthenticated && userRole === 'admin' && (
                <>
                  <Link to="/admin/users" className="nav-link-modern">
                    Users
                  </Link>
                  <Link to="/admin/vendors" className="nav-link-modern">
                    Vendors
                  </Link>
                  <Link to="/admin/transactions" className="nav-link-modern">
                    Transactions
                  </Link>
                </>
              )}
              
              {/* Common links for all users */}
              <Link to="/about" className="nav-link-modern">
                About
              </Link>
              <Link to="/blog" className="nav-link-modern">
                Blog
              </Link>
              <Link to="/contact" className="nav-link-modern">
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Section 3: User Details & Mobile Menu Toggle */}
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Desktop Account Section */}
            {isAuthenticated && (
              <>
                <AccountCircleIcon
                  style={{
                    fontSize: 36,
                    color: "#ff6b35",
                    cursor: "pointer",
                    borderRadius: "50%",
                    background: "linear-gradient(90deg, #fff 60%, #ffe0b2 100%)",
                    boxShadow: "0 2px 8px rgba(255,107,53,0.10)",
                    padding: 2,
                  }}
                  onClick={handleAccountClick}
                />
                <Popover
                  className="account-popover"
                  open={Boolean(accountAnchorEl)}
                  anchorEl={accountAnchorEl}
                  onClose={handleAccountClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: { p: 2, minWidth: 220, borderRadius: 2 }
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {loggedInEmail}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#666', 
                        textTransform: 'capitalize',
                        display: 'block',
                        mb: 1 
                      }}
                    >
                      {userRole}
                    </Typography>
                    <MuiButton
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{
                        mt: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                        px: 2,
                        py: 0.5,
                        fontSize: "1rem"
                      }}
                      onClick={() => {
                        handleAccountClose();
                        handleLogout();
                      }}
                    >
                      Logout
                    </MuiButton>
                  </Box>
                </Popover>
              </>
            )}
            
            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              <MenuIcon style={{ fontSize: 28, color: "#ff6b35" }} />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={closeMobileMenu}
        />
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="logo-modern" style={{ fontSize: '1.8rem' }}>OTGMS</span>
            <button 
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '8px',
                borderRadius: '8px' 
              }}
              onClick={closeMobileMenu}
            >
              <CloseIcon style={{ fontSize: 24, color: "#ff6b35" }} />
            </button>
          </div>
          
          <nav className="mobile-menu-nav">
            <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </Link>
            
            {/* Role-based mobile navigation */}
            {isAuthenticated && userRole === 'client' && (
              <>
                <Link to="/services" className="mobile-nav-link" onClick={closeMobileMenu}>
                  Services
                </Link>
                <Link to="/bookings" className="mobile-nav-link" onClick={closeMobileMenu}>
                  Bookings
                </Link>
                <Link to="/history" className="mobile-nav-link" onClick={closeMobileMenu}>
                  History
                </Link>
              </>
            )}
            
            {isAuthenticated && userRole === 'vendor' && (
              <>
                <Link to="/vendor/orders" className="mobile-nav-link" onClick={closeMobileMenu}>
                  Orders
                </Link>
                <Link to="/vendor/services" className="mobile-nav-link" onClick={closeMobileMenu}>
                  Services
                </Link>
                <Link to="/vendor/pricing" className="mobile-nav-link" onClick={closeMobileMenu}>
                  Pricing
                </Link>
              </>
            )}
            
            {isAuthenticated && userRole === 'admin' && (
              <>
                <Link to="/admin/users" className="mobile-nav-link" onClick={closeMobileMenu}>
                  Users
                </Link>
                <Link to="/admin/vendors" className="mobile-nav-link" onClick={closeMobileMenu}>
                  Vendors
                </Link>
                <Link to="/admin/transactions" className="mobile-nav-link" onClick={closeMobileMenu}>
                  Transactions
                </Link>
              </>
            )}
            
            <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
              About
            </Link>
            <Link to="/blog" className="mobile-nav-link" onClick={closeMobileMenu}>
              Blog
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
              Contact
            </Link>
            
            {!isAuthenticated && (
              <button className="mobile-nav-link" onClick={() => {
                closeMobileMenu();
                handleLoginClick();
              }}>
                Login
              </button>
            )}
          </nav>
          
          {/* Mobile User Section */}
          {isAuthenticated && (
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <AccountCircleIcon style={{ fontSize: 32, color: "#ff6b35" }} />
                <div>
                  <span className="mobile-user-email">{loggedInEmail}</span>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#666', 
                    textTransform: 'capitalize',
                    marginTop: '2px' 
                  }}>
                    {userRole}
                  </div>
                </div>
              </div>
              <button 
                className="mobile-logout-btn"
                onClick={() => {
                  closeMobileMenu();
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      
    </>
  );
};

export default Header;



