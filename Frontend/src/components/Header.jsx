// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../utils/apiService";
import LoginModal from "./LoginModal";
import UpdateUser from "./UpdateUser";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInEmail } from "../redux/userSlice"; // adjust path as needed
import { isUserLoggedIn } from "../utils/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Popover, Box, Typography, Button as MuiButton } from "@mui/material";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Try to get email from Redux, fallback to localStorage if null (for refresh)
  let loggedInEmail = useSelector(state => state.user.loggedInEmail);
  if (!loggedInEmail) {
    loggedInEmail = localStorage.getItem("loggedInEmail") || null;
  }

  // Save email to localStorage when it changes
  useEffect(() => {
    if (loggedInEmail) {
      localStorage.setItem("loggedInEmail", loggedInEmail);
    } else {
      localStorage.removeItem("loggedInEmail");
    }
  }, [loggedInEmail]);

  // Only check authentication once on mount (not every second)
  useEffect(() => {
    let isMounted = true;
    const checkAuthToken = async () => {
      const hasValidToken = await isUserLoggedIn();
      if (isMounted) {
        setIsAuthenticated(hasValidToken);
        // Auto-login: if cookies present and not logged in, set dummy email if needed
        if (hasValidToken && !loggedInEmail) {
          dispatch(setLoggedInEmail(loggedInEmail));
        }
      }
    };
    checkAuthToken();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    // Only check again if isAuthenticated changes to true
    if (isAuthenticated) {
      let isMounted = true;
      const checkAuthToken = async () => {
        const hasValidToken = await isUserLoggedIn();
        if (isMounted && !hasValidToken) setIsAuthenticated(false);
      };
      checkAuthToken();
      return () => { isMounted = false; };
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
          navigate('/', { replace: true });
          window.location.reload(); // reload after logout
        },
        () => {
          document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          localStorage.clear();
          navigate('/', { replace: true });
          window.location.reload(); // reload after logout
        }
      );
    } catch {
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.clear();
      navigate('/', { replace: true });
      window.location.reload(); // reload after logout
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

  return (
    <>
      <style jsx>{`
        .header-modern {
          background: #fff;
          box-shadow: 0 4px 24px rgba(255,107,53,0.10);
          border-radius: 0 0 32px 32px;
          border-bottom: 2px solid #ffe0b2;
          position: relative;
          transition: box-shadow 0.2s;
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
        @media (max-width: 900px) {
          .logo-modern {
            font-size: 1.7rem;
            padding: 0 2px;
          }
          .nav-modern {
            gap: 0.6rem;
            padding: 2px 8px;
          }
          .nav-link-modern {
            font-size: 1rem;
            padding: 7px 10px;
          }
        }
        @media (max-width: 600px) {
          .header-modern {
            border-radius: 0 0 18px 18px;
            padding: 0 !important;
          }
          .container {
            flex-direction: column !important;
            align-items: stretch !important;
            min-height: 0 !important;
            padding: 0 2vw !important;
          }
          .logo-modern {
            font-size: 1.3rem;
            padding: 0 2px;
            margin-bottom: 6px;
          }
          .nav-modern {
            flex-direction: column;
            gap: 0.2rem;
            padding: 2px 2px;
            border-radius: 10px;
            box-shadow: none;
            margin-bottom: 8px;
          }
          .nav-link-modern {
            font-size: 0.98rem;
            padding: 7px 8px;
            border-radius: 10px;
            width: 100%;
            text-align: left;
          }
          .account-popover .MuiPaper-root {
            min-width: 160px !important;
            padding: 8px !important;
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
          {/* Section 2: Menu */}
          <div style={{ flex: "1 1 auto", display: "flex", justifyContent: "flex-end" }}>
            <nav className="nav-modern">
              {/* Show Dashboard menu only if cookies/token is present */}
              {isAuthenticated && (
                <Link to="/services" className="nav-link-modern">
                  Services
                </Link>
              )}
               <Link to="/" className="nav-link-modern">
                Home  
              </Link>
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
            {isAuthenticated && (
              <>
                <AccountCircleIcon
                  style={{
                    fontSize: 36,
                    color: "#ff6b35",
                    cursor: "pointer",
                    marginRight: 8,
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
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {loggedInEmail}
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



