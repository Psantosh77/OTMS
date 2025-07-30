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
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        }
        
        .btn-modern {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border: none;
          border-radius: 25px;
          padding: 10px 25px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }
        
        .btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
          background: linear-gradient(135deg, #f7931e 0%, #ff6b35 100%);
        }
        
        .nav-link-modern {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link-modern::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          transition: width 0.3s ease;
        }
        
        .nav-link-modern:hover::after {
          width: 100%;
        }
        
        .nav-link-modern:hover {
          color: #ff6b35 !important;
        }
        
        .modal-modern {
          backdrop-filter: blur(10px);
          background-color: rgba(0, 0, 0, 0.4);
        }
        
        .modal-content-modern {
          border: none;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          animation: slideInRight 0.4s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .form-control-modern {
          border: 2px solid #e9ecef;
          border-radius: 15px;
          padding: 15px 20px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }
        
        .form-control-modern:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25);
          background: white;
        }
        
        .btn-send-otp {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border: none;
          border-radius: 15px;
          padding: 15px;
          color: white;
          font-weight: 600;
          font-size: 18px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn-send-otp:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
        }
        
        .btn-send-otp:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .modal-header-modern {
          border-bottom: 1px solid rgba(255, 107, 53, 0.1);
          padding: 25px 30px 20px;
        }
        
        .modal-title-modern {
          color: #ff6b35;
          font-weight: 700;
          font-size: 24px;
        }
        
        .btn-close-modern {
          background: none;
          border: none;
          font-size: 24px;
          color: #ff6b35;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        .btn-close-modern:hover {
          opacity: 1;
          transform: rotate(90deg);
        }
        
        .success-message {
          color: #28a745;
          font-size: 14px;
          margin-bottom: 15px;
          padding: 10px;
          background: rgba(40, 167, 69, 0.1);
          border-radius: 8px;
          text-align: center;
        }
        
        .error-message {
          color: #dc3545;
          font-size: 14px;
          margin-bottom: 15px;
          padding: 10px;
          background: rgba(220, 53, 69, 0.1);
          border-radius: 8px;
          text-align: center;
        }
        
        .countdown-text {
          font-size: 14px;
          color: #6c757d;
          text-align: center;
          margin-top: 10px;
        }
        
        .btn-logout {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          border: none;
          border-radius: 25px;
          padding: 10px 25px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        }
        
        .btn-logout:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
          background: linear-gradient(135deg, #c82333 0%, #dc3545 100%);
        }
      `}</style>

      <header className="bg-white shadow-lg sticky-top">
        <div className="container d-flex justify-content-between align-items-center py-4">
          <Link to="/" className="text-decoration-none">
            <div className="flex items-center gap-2">
              <h1
                className="h3 fw-bold m-0"
                style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                OTGMS
              </h1>
            </div>
          </Link>

          <nav className="d-none d-md-flex gap-4">
            {isAuthenticated && (
              <Link to="/services" className="nav-link-modern text-dark">
                Services
              </Link>
            )}
            <Link to="/about" className="nav-link-modern text-dark">
              About
            </Link>
            <Link to="/blog" className="nav-link-modern text-dark">
              Blog
            </Link>
            <Link to="/contact" className="nav-link-modern text-dark">
              Contact
            </Link>
          </nav>

          {loggedInEmail ? (
            <>
              <span className="welcome-email">Welcome, <b>{loggedInEmail}</b></span>
              <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={handleLoginClick} className="btn btn-modern">
              Login
            </button>
          )}
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
