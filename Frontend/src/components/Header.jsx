import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../utils/apiService";
import { useAuth } from "../hooks/useAuth";
import LoginModal from './LoginModal';
import SignupDropdown from './log'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Popover, Box, Typography, Button as MuiButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { motion } from "framer-motion";


const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
const sidebarVariants = {
  open: {
    clipPath: `circle(150% at 90% 40px)`,
    transition: { type: "spring", stiffness: 20, restDelta: 2 },
  },
  closed: {
    clipPath: "circle(0% at 90% 40px)",
    transition: { type: "spring", stiffness: 400, damping: 40 },
  },
};

const navVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
  open: { y: 0, opacity: 1, transition: { stiffness: 1000, velocity: -100 } },
  closed: { y: 50, opacity: 0, transition: { stiffness: 1000 } },
};

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

    // Optional auto-open behavior for clients on mobile
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


  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
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
  position: fixed;
  top: 0;
  z-index: 1100;
  width: 100%;
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

/* Mobile menu toggle */
.mobile-menu-toggle {
  display: none; /* visible only on mobile via media query */
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
  margin-left: 8px; /* moved spacing for right-side placement */
}
.mobile-menu-toggle:hover { background: rgba(255,107,53,0.1); }

/* Mobile menu overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0);
  transition: background 0.3s ease;
  pointer-events: none;
  z-index: 1200;
}
.mobile-menu-overlay.open {
  background: rgba(0,0,0,0.5);
  pointer-events: auto;
}

/* Mobile menu container (RIGHT SLIDE) */
.mobile-menu {
    position: fixed;
  top: 0;
  left: 0;       /* right:0 hataye */
  width: 100vw;  /* full width */
  height: 100vh; /* full height */
  background: antiquewhite; /* ya jo bhi color */
  overflow: hidden;
  z-index: 1300;
  border-radius: 24px 24px 0px 226px;
}
.mobile-menu.open {
transform: translateY(0);
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}


/* Mobile menu header */
.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ffe0b2;
}

/* Mobile menu nav links */
.mobile-menu-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 40px 20px 20px 20px;
  background-color: antiquewhite; /* optional, agar aap background chahte ho */
}

.mobile-menu-nav .mobile-nav-link {
  opacity: 0;
  transform: translateX(12px) rotateY(8deg); /* start from right side and rotate */
  transition: opacity 0.35s ease, transform 0.35s ease, box-shadow 0.25s ease;
}
.mobile-menu.open .mobile-menu-nav .mobile-nav-link {
  opacity: 1 !important;
  transform: translateX(0) rotateY(0) !important;
}
/* Staggered appearance */
.mobile-menu.open .mobile-menu-nav .mobile-nav-link:nth-child(1){transition-delay:.05s}
.mobile-menu.open .mobile-menu-nav .mobile-nav-link:nth-child(2){transition-delay:.10s}
.mobile-menu.open .mobile-menu-nav .mobile-nav-link:nth-child(3){transition-delay:.15s}
.mobile-menu.open .mobile-menu-nav .mobile-nav-link:nth-child(4){transition-delay:.20s}
.mobile-menu.open .mobile-menu-nav .mobile-nav-link:nth-child(5){transition-delay:.25s}
.mobile-menu.open .mobile-menu-nav .mobile-nav-link:nth-child(6){transition-delay:.30s}
.mobile-menu.open .mobile-menu-nav .mobile-nav-link:nth-child(7){transition-delay:.35s}

/* Mobile nav link hover */
.mobile-nav-link {
  color: #222;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 12px 16px;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  transform-style: preserve-3d;
}
.mobile-nav-link:hover {
  background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
  color: #fff;
  transform: translateX(6px) rotateY(12deg);
  box-shadow: 0 8px 18px rgba(255,107,53,0.28);
}

/* Mobile user section */
.mobile-user-section { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ffe0b2; }
.mobile-user-info { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.mobile-user-email { color: #ff6b35; font-weight: 600; font-size: 1rem; }
.mobile-logout-btn {
  background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
  color: #fff; border: none; padding: 10px 20px; border-radius: 12px;
  font-weight: 600; cursor: pointer; width: 100%; font-size: 1rem; transition: transform 0.2s;
}
.mobile-logout-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(255,107,53,0.3); }
.welcome-email { color: #ff6b35; font-weight: 600; margin-right: 1rem; font-size: 1rem; }

/* Account popover */
.account-popover .MuiPaper-root { border-radius: 18px !important; box-shadow: 0 4px 24px rgba(255,107,53,0.13) !important; }
.account-popover .MuiTypography-subtitle1 { color: #ff6b35; font-weight: 700; font-size: 1.08rem; }
.account-popover .MuiButton-root { background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%); color: #fff; font-weight: 600; border-radius: 12px; box-shadow: 0 2px 8px rgba(255,107,53,0.10); }
.account-popover .MuiButton-root:hover { background: linear-gradient(90deg, #f7931e 0%, #ff6b35 100%); }

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal-card { background: #fff; border-radius: 12px; padding: 24px; position: relative; max-width: 420px; width: 90%; box-shadow: 0 4px 24px rgba(0,0,0,0.2); }
.modal-close { position: absolute; top: 8px; right: 8px; background: none; border: none; font-size: 24px; cursor: pointer; color: #333; }

/* Responsive breakpoints */
@media (max-width: 1024px) {
  .nav-modern { gap: 1rem; padding: 4px 12px; }
  .nav-link-modern { font-size: 1.1rem; padding: 8px 16px; }
}
@media (max-width: 768px) {
  .mobile-menu-toggle { display: block; }
  .nav-modern { display: none; }
  .logo-modern { font-size: 2rem; }
  .header-modern { border-radius: 0 0 20px 20px; background: rgba(255,255,255,0.10); backdrop-filter: blur(10px); }
  .container { padding: 0 16px !important; }
}
@media (min-width: 769px) { .mobile-menu-toggle { display: none; } }
@media (max-width: 480px) { .logo-modern { font-size: 1.8rem; letter-spacing: 1.5px; } .header-modern { border-radius: 0 0 16px 16px; } .container { padding: 0 12px !important; min-height: 60px !important; } }
@media (max-width: 360px) { .logo-modern { font-size: 1.6rem; letter-spacing: 1px; } .container { padding: 0 8px !important; } }
      `}</style>

      <header className="header-modern sticky-top py-3 px-0">
        <div className="container d-flex align-items-center justify-content-between" style={{ minHeight: 70, flexWrap: "wrap" }}>
          {/* Left: Logo only */}
          <div style={{ flex: "0 0 auto", display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="text-decoration-none">
              <span className="logo-modern">OTGMS</span>
            </Link>
          </div>

          {/* Right: Desktop Menu + Mobile Menu Button */}
          <div style={{ flex: "1 1 auto", display: "flex", justifyContent: "flex-end", alignItems: 'center' }}>
         <nav className="nav-modern">
  {[
    { to: "/", label: "Home", icon: <HomeIcon /> },
    { to: "/Servicessection", label: "Services", icon: <BuildIcon /> },
    { to: "/about", label: "About", icon: <InfoIcon /> },
    { to: "/blog", label: "Blog", icon: <ArticleIcon /> },
    { to: "/contact", label: "Contact", icon: <ContactMailIcon /> },
  ].map(({ to, label, icon }, i) => (
    <motion.div
      key={i}
      whileHover={{ scale: 1.1, y: -2 }}
      style={{ display: "flex", alignItems: "center", gap: 6 }}
    >
      <Link to={to} className="nav-link-modern">
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {icon} {label}
        </span>
      </Link>
    </motion.div>
  ))}

  {/* Login Button with icon */}
  <motion.div
    whileHover={{ scale: 1.1, y: -2 }}
    style={{ display: "flex", alignItems: "center", gap: 6 }}
    onClick={() => setShowModal(true)}
  >
    <div className="nav-link-modern" style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <AccountCircleIcon /> Login
    </div>
  </motion.div>
</nav>


            {/* Mobile Menu Button (right side) */}
          <button
  className="mobile-menu-toggle"
  onClick={toggleMobileMenu}
  aria-label="Toggle Menu"
  aria-expanded={mobileMenuOpen}
>
  <MenuIcon style={{ fontSize: 28, color: "#ff6b35" }} />
</button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu} />

        {/* Mobile Sidebar Menu (slides from RIGHT) */}
      {/* Mobile Sidebar Menu with Motion */}
<motion.div
  className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
  initial={false}
  animate={mobileMenuOpen ? "open" : "closed"}
  variants={sidebarVariants}
>
  <div className="mobile-menu-header">
    <span className="logo-modern" style={{ fontSize: '1.6rem' }}>Menu</span>
    <button
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
      onClick={closeMobileMenu}
    >
      <CloseIcon style={{ fontSize: 24, color: "#ff6b35" }} />
    </button>
  </div>

  {/* ✅ Add Login Button below header */}
<div style={{ padding: '0 20px', marginBottom: '20px' }}>
  <button
    onClick={() => { setShowModal(true); closeMobileMenu(); }}
    style={{
      background: 'linear-gradient(90deg, #ff6b35 0%, #f7931e 100%)',
      color: '#fff',
      fontWeight: 600,
      borderRadius: 12,
      padding: '10px 16px',
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px' // space between icon and text
    }}
  >
    <AccountCircleIcon style={{ fontSize: 20, color: '#fff' }} />
    Login
  </button>
</div>

  <motion.ul className="mobile-menu-nav" variants={navVariants} style={{ listStyle: "none", padding: "20px" }}>
    {[
      { to: "/", label: "Home", icon: <HomeIcon style={{ color: "#ff6b35" }} /> },
      { to: "/Servicessection", label: "Services", icon: <BuildIcon style={{ color: "#ff6b35" }} /> },
      { to: "/about", label: "About", icon: <InfoIcon style={{ color: "#ff6b35" }} /> },
      { to: "/blog", label: "Blog", icon: <ArticleIcon style={{ color: "#ff6b35" }} /> },
      { to: "/contact", label: "Contact", icon: <ContactMailIcon style={{ color: "#ff6b35" }} /> }
    ].map(({ to, label, icon }, i) => (
      <motion.li
        key={i}
        variants={itemVariants}
        style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", cursor: "pointer" }}
        onClick={closeMobileMenu}
      >
        {icon}
        <Link to={to} className="mobile-nav-link">{label}</Link>
      </motion.li>
    ))}
  </motion.ul>
</motion.div>


      </header>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <LoginModal />
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
