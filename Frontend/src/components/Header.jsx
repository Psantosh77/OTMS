// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../utils/apiService";
import LoginModal from "./LoginModal";
import UpdateUser from "./UpdateUser";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInEmail } from "../redux/userSlice"; // adjust path as needed

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInEmail = useSelector(state => state.user.loggedInEmail);

  useEffect(() => {
    const checkAuthToken = () => {
      const cookies = document.cookie.split(';');
      const accessTokenCookie = cookies.find(cookie =>
        cookie.trim().startsWith('accessToken=') ||
        cookie.trim().startsWith('access_token=') ||
        cookie.trim().startsWith('token=')
      );
      const hasValidToken = accessTokenCookie && accessTokenCookie.split('=')[1] && accessTokenCookie.split('=')[1] !== '';
      setIsAuthenticated(hasValidToken);
    };
    checkAuthToken();
    const interval = setInterval(checkAuthToken, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const cookies = document.cookie.split(';');
      const accessTokenCookie = cookies.find(cookie =>
        cookie.trim().startsWith('accessToken=') ||
        cookie.trim().startsWith('access_token=') ||
        cookie.trim().startsWith('token=')
      );
      const hasValidToken = accessTokenCookie && accessTokenCookie.split('=')[1] && accessTokenCookie.split('=')[1] !== '';
      if (!hasValidToken) setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const handleLoginClick = () => setShowModal(true);

  const handleLogout = async () => {
    setIsAuthenticated(false);
    dispatch(setLoggedInEmail(null));
    try {
      await apiService.post(
        '/auth/logout',
        {},
        {},
        () => {
          document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          localStorage.clear();
          navigate('/');
        },
        () => {
          document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          localStorage.clear();
          navigate('/');
        }
      );
    } catch {
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.clear();
      navigate('/');
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <style jsx>{`
        .header-gradient {
          background: linear-gradient(90deg, #fff7ed 0%, #ffe0b2 100%);
        }
        .header-modern {
          background: linear-gradient(90deg, #fff7ed 0%, #ffe0b2 100%);
          box-shadow: 0 12px 32px rgba(255,167,38,0.13);
          border-radius: 0 0 40px 40px;
          border-bottom: 3px solid #ffd180;
          position: relative;
        }
        .header-modern::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -10px;
          height: 18px;
          background: radial-gradient(circle, #ffd180 0%, transparent 70%);
          opacity: 0.5;
          z-index: 0;
        }
        .logo-modern {
          font-size: 2.6rem;
          font-weight: 900;
          letter-spacing: 2.5px;
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 12px #ffd18044;
        }
        .nav-modern {
          display: flex;
          gap: 2.8rem;
          align-items: center;
        }
        .nav-link-modern {
          color: #222 !important;
          font-weight: 700;
          font-size: 1.18rem;
          position: relative;
          padding: 12px 26px;
          border-radius: 26px;
          background: transparent; // removed white background
          transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
          letter-spacing: 0.7px;
          box-shadow: none; // removed box-shadow
        }
        .nav-link-modern:hover, .nav-link-modern.active {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          color: #fff !important;
          box-shadow: 0 6px 18px rgba(255,107,53,0.22);
          transform: translateY(-3px) scale(1.06);
        }
        .nav-link-modern::after {
          content: '';
          position: absolute;
          left: 26px;
          bottom: 10px;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          border-radius: 2px;
          transition: width 0.3s;
        }
        .nav-link-modern:hover::after, .nav-link-modern.active::after {
          width: calc(100% - 52px);
        }
        .btn-modern {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          border: none;
          border-radius: 30px;
          padding: 14px 36px;
          color: #fff;
          font-weight: 800;
          font-size: 1.15rem;
          box-shadow: 0 6px 20px rgba(255,107,53,0.22);
          transition: all 0.3s;
          letter-spacing: 1px;
        }
        .btn-modern:hover {
          transform: translateY(-3px) scale(1.07);
          box-shadow: 0 12px 32px rgba(255,107,53,0.32);
          background: linear-gradient(90deg, #f7931e 0%, #ff6b35 100%);
        }
        .btn-logout {
          background: linear-gradient(90deg, #d32f2f 0%, #b71c1c 100%);
          border: none;
          border-radius: 30px;
          padding: 14px 36px;
          color: #fff;
          font-weight: 800;
          font-size: 1.15rem;
          box-shadow: 0 6px 20px rgba(211,47,47,0.22);
          transition: all 0.3s;
          letter-spacing: 1px;
        }
        .btn-logout:hover {
          transform: translateY(-3px) scale(1.07);
          box-shadow: 0 12px 32px rgba(211,47,47,0.32);
          background: linear-gradient(90deg, #b71c1c 0%, #d32f2f 100%);
        }
        .welcome-email {
          color: #222;
          font-weight: 700;
          margin-right: 1.2rem;
          font-size: 1.12rem;
          letter-spacing: 0.5px;
        }
      `}</style>

      <header className="header-modern sticky-top py-3 px-0">
        <div className="container d-flex align-items-center" style={{ minHeight: 70 }}>
          {/* Section 1: Logo */}
          <div style={{ flex: "0 0 auto" }}>
            <Link to="/" className="text-decoration-none">
              <span className="logo-modern">OTGMS</span>
            </Link>
          </div>
          {/* Section 2: Menu */}
          <div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center" }}>
            <nav className="nav-modern">
              {isAuthenticated && (
                <Link to="/services" className="nav-link-modern">
                  Services
                </Link>
              )}
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
          {/* Section 3: User Details */}
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center" }}>
            {loggedInEmail ? (
              <span className="welcome-email">Welcome, <b>{loggedInEmail}</b></span>
            ) : null}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
      {showUpdateUser && (
        <UpdateUser
          onClose={() => setShowUpdateUser(false)}
        />
      )}
    </>
  );
};

export default Header;

