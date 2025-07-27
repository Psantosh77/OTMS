// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../utils/apiService";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for access token in cookies on component mount
  useEffect(() => {
    const checkAuthToken = () => {
      const cookies = document.cookie.split(';');
      const accessTokenCookie = cookies.find(cookie => 
        cookie.trim().startsWith('accessToken=') || 
        cookie.trim().startsWith('access_token=') ||
        cookie.trim().startsWith('token=')
      );
      
      // Check if cookie has actual value (not empty)
      const hasValidToken = accessTokenCookie && accessTokenCookie.split('=')[1] && accessTokenCookie.split('=')[1] !== '';
      setIsAuthenticated(hasValidToken);
    };

    checkAuthToken();
    
    // Check auth state periodically to catch cookie changes
    const interval = setInterval(checkAuthToken, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Also check auth state when the component re-renders
  useEffect(() => {
    if (isAuthenticated) {
      const cookies = document.cookie.split(';');
      const accessTokenCookie = cookies.find(cookie => 
        cookie.trim().startsWith('accessToken=') || 
        cookie.trim().startsWith('access_token=') ||
        cookie.trim().startsWith('token=')
      );
      
      const hasValidToken = accessTokenCookie && accessTokenCookie.split('=')[1] && accessTokenCookie.split('=')[1] !== '';
      if (!hasValidToken) {
        setIsAuthenticated(false);
      }
    }
  }, [isAuthenticated]);

  // Debug: Add console log to check authentication state
  useEffect(() => {
    console.log('Authentication state changed:', isAuthenticated);
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleLogout = async () => {
    // Set authenticated to false immediately
    setIsAuthenticated(false);
    
    try {
      // Call logout API
      await apiService.post(
        '/auth/logout',
        {},
        {},
        (data, status) => {
          // Success callback
          console.log('Logout successful:', data);
          // Clear cookies
          document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          // Clear any local storage if needed
          localStorage.clear();
          // Redirect to home page
          window.location.href = '/';
        },
        (error, status) => {
          // Error callback - still logout locally even if API fails
          console.error('Logout API failed:', error);
          // Clear cookies even if API fails
          document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          localStorage.clear();
          // Redirect to home page
          window.location.href = '/';
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
      // Clear cookies on error
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.clear();
      // Redirect to home page
      window.location.href = '/';
    }
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    
    await apiService.post(
      '/auth/sendotp',
      { email },
      {},
      (data, status) => {
        // Success callback
        console.log('OTP sent successfully:', data);
        setIsLoading(false);
        setOtpSent(true);
        setSuccessMessage('OTP sent successfully! Check your email.');
        setCountdown(60);
        
        // Start countdown timer
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      },
      (error, status) => {
        // Error callback
        console.error('Failed to send OTP:', error);
        setIsLoading(false);
        setSuccessMessage('Failed to send OTP. Please try again.');
      }
    );
  };

  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    
    await apiService.post(
      '/auth/verifyOpt',
      { email, otp },
      {},
      (data, status) => {
        // Success callback
        console.log('OTP verified successfully:', data);
        setIsVerifying(false);
        setSuccessMessage('Login successful!');
        
        // Set authenticated state immediately
        setIsAuthenticated(true);
        
        // Close modal and redirect
        setTimeout(() => {
          handleCloseModal();
          // Redirect to services page
          window.location.href = '/services';
        }, 1000);
      },
      (error, status) => {
        // Error callback
        console.error('OTP verification failed:', error);
        setIsVerifying(false);
        setSuccessMessage('Invalid OTP. Please try again.');
      }
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail('');
    setOtp('');
    setIsLoading(false);
    setIsVerifying(false);
    setOtpSent(false);
    setCountdown(0);
    setSuccessMessage('');
  };

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
            <h1 className="h3 fw-bold m-0" style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              OTGMS
            </h1>
          </Link>

          <nav className="d-none d-md-flex gap-4">
            {isAuthenticated && (
              <a href="/services" className="text-dark text-decoration-none nav-link-modern">Services</a>
            )}
            <a href="/about" className="text-dark text-decoration-none nav-link-modern">About</a>
            <a href="/blog" className="text-dark text-decoration-none nav-link-modern">Blog</a>
            <a href="/contact" className="text-dark text-decoration-none nav-link-modern">Contact</a>
          </nav>

          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          ) : (
            <button onClick={handleLoginClick} className="btn btn-modern">
              Login
            </button>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showModal && (
        <div className="modal fade show d-block modal-modern">
          <div className="modal-dialog" style={{ position: 'fixed', right: '30px', top: '30px', margin: '0', maxWidth: '500px', width: '500px' }}>
            <div className="modal-content modal-content-modern">
              <div className="modal-header modal-header-modern d-flex justify-content-between align-items-center">
                <h5 className="modal-title modal-title-modern m-0">Welcome Back</h5>
                <button 
                  type="button" 
                  className="btn-close-modern" 
                  onClick={handleCloseModal}
                >
                  ×
                </button>
              </div>
              <div className="modal-body" style={{ padding: '30px' }}>
                {successMessage && (
                  <div className={successMessage.includes('Failed') || successMessage.includes('Invalid') ? 'error-message' : 'success-message'}>
                    {successMessage}
                  </div>
                )}
                
                <form onSubmit={(e) => { e.preventDefault(); otpSent ? handleVerifyOTP() : handleSendOTP(); }}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold mb-3" style={{ color: '#495057', fontSize: '16px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-modern w-100"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isLoading || otpSent}
                    />
                  </div>

                  {otpSent && (
                    <div className="mb-4">
                      <label htmlFor="otp" className="form-label fw-semibold mb-3" style={{ color: '#495057', fontSize: '16px' }}>
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-modern w-100"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                        required
                        disabled={isVerifying}
                      />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-send-otp w-100"
                    disabled={otpSent ? isVerifying : (isLoading || countdown > 0)}
                  >
                    {otpSent ? (
                      isVerifying ? (
                        <>
                          <span className="loading-spinner me-2"></span>
                          Verifying OTP...
                        </>
                      ) : (
                        'Submit'
                      )
                    ) : (
                      isLoading ? (
                        <>
                          <span className="loading-spinner me-2"></span>
                          Sending OTP...
                        </>
                      ) : (
                        countdown > 0 ? `Resend OTP in ${countdown}s` : 'Send OTP'
                      )
                    )}
                  </button>

                  {countdown > 0 && !otpSent && (
                    <div className="countdown-text">
                      You can resend OTP in {countdown} seconds
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
