import React, { useState } from "react";
import apiService from "../utils/apiService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogContent,
} from "@mui/material";
// CloseIcon removed: dialog will not show a close button
import Navbar from "./Navbar";
import StepContent  from './Register';

const steps = ["Basic Info", "Business Details", "Documents", "Optional"]; // ✅ define once

export default function LoginRegister({onLogin  }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { countryCode: "+91", mobile: "9876543210" },
  ]);

  const [email, setEmail] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [showRegister, setShowRegister] = useState(false);
  const [regForm, setRegForm] = useState({
    name: "",
    countryCode: "+91",
    mobile: "",
    shopName: "",
    businessAddress: "",
    timing: "",
    license: "",
    vat: "",
    bankInfo: "",
    logo: "",
  });

  const [activeStep, setActiveStep] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // ------------------- LOGIN -------------------
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  async function handleSendOtp(e) {
    e.preventDefault();
    try {
      const payload = {
        email,
  role: "vendor"
      };
  const res = await apiService.post("auth/sendotp", payload);
      if (res?.data?.success) {
        setSnackbar({
          open: true,
          message: "OTP sent successfully!",
          severity: "success",
        });
        setOtpSent(true);
      } else {
        setSnackbar({
          open: true,
          message: res?.data?.message || "Failed to send OTP.",
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Network error. Please try again.",
        severity: "error",
      });
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    try {
      const res = await apiService.post('auth/verifyOpt', { email, otp, role: 'vendor' });
      if (res?.data?.success) {
        setSnackbar({
          open: true,
          message: "OTP verified! Login successful.",
          severity: "success",
        });
        // Persist login state and tokens if returned
        try {
          localStorage.setItem('isLoggedIn', 'true');
          // backend may return tokens directly or nested under data.tokens
          const payload = res?.data?.data || {};
          const returnedTokens = payload.tokens || payload;
          if (returnedTokens?.accessToken) localStorage.setItem('accessToken', returnedTokens.accessToken);
          if (returnedTokens?.refreshToken) localStorage.setItem('refreshToken', returnedTokens.refreshToken);
        } catch (err) {
          // ignore storage errors  
        }
        // If vendor profile is incomplete, navigate to dashboard and open registration
        const payload = res?.data?.data || {};
        const isProfileComplete = typeof payload.isProfileComplete !== 'undefined' ? payload.isProfileComplete : (payload?.tokens ? payload.tokens.isProfileComplete : undefined);
        if (isProfileComplete === false) {
          // open the in-component register flow and prefill email
          setRegForm((p) => ({ ...p, email }));
          setShowRegister(true);
          return;
        }

        if (onLogin) onLogin();
      } else {
        setSnackbar({
          open: true,
          message: res?.data?.message || "Invalid OTP.",
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Network error. Please try again.",
        severity: "error",
      });
    }
  }

  // ------------------- REGISTER -------------------
  function handleRegisterSubmit() {
    // submit registration to backend
    (async () => {
      try {
        const payload = {
          email: regForm.email,
          name: regForm.name,
          phone: regForm.phone,
          businessName: regForm.shopName || regForm.businessName,
          address: regForm.businessAddress || regForm.address,
        };
        const res = await apiService.post('vendor/create', payload);
        if (res?.data?.success) {
          setSnackbar({ open: true, message: 'Registered successfully — logged in.', severity: 'success' });
          setShowRegister(false);
          try { localStorage.setItem('isLoggedIn', 'true'); } catch(e){}
          if (onLogin) onLogin();
        } else {
          setSnackbar({ open: true, message: res?.data?.message || 'Registration failed', severity: 'error' });
        }
      } catch (err) {
        setSnackbar({ open: true, message: err?.response?.data?.message || 'Network error', severity: 'error' });
      }
    })();
  }

  // ------------------- STEP FORM CONTENT -------------------



  return (
    <>
     {loggedInUser && (
  <Navbar
    loggedInUser={loggedInUser}
    onLogout={() => {
      setLoggedInUser(null);
  setCountryCode("+91");
  setMobile("");
  // setPassword("");
      setSnackbar({
        open: true,
        message: "Logged out.",
        severity: "info",
      });
    }}
  />
)}
     {!loggedInUser && (
  <Box
    sx={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "background.default"
    }}
  >
    <Box sx={{
      boxShadow: 6,
      borderRadius: 4,
      bgcolor: "background.paper",
      p: 0,
      width: "100vw",
      maxWidth: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch"
    }}>
      {/* Left: Illustration */}
      <Box sx={{
        flex: 2,
        bgcolor: '#eef2ff',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        p: 3
      }}>
        {/* Inline SVG illustration — light, no external deps */}
        <Box sx={{ width: 320, textAlign: 'center' }}>
          <svg viewBox="0 0 600 400" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Car service illustration">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="600" height="400" rx="20" fill="#fff" stroke="#e6eefc" />
            <g transform="translate(40,50)">
              <rect x="0" y="160" width="520" height="160" rx="12" fill="#f8fafc" stroke="#e6eefc" />
              <g transform="translate(40,20)">
                <rect x="0" y="40" width="320" height="80" rx="10" fill="url(#g1)" opacity="0.12" />
                <circle cx="80" cy="140" r="28" fill="#111827" opacity="0.08" />
                <circle cx="260" cy="140" r="28" fill="#111827" opacity="0.08" />
                <rect x="30" y="20" width="260" height="40" rx="8" fill="#fff" stroke="#c7ddff" />
              </g>
              <text x="40" y="30" fill="#0f172a" fontSize="20" fontFamily="Arial, Helvetica, sans-serif">Fast Car Service</text>
              <text x="40" y="52" fill="#475569" fontSize="12" fontFamily="Arial, Helvetica, sans-serif">Quick, reliable maintenance & repair</text>
            </g>
          </svg>
        </Box>
      </Box>
      {/* Right: Login Form */}
      <Box sx={{
        flex: 1,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom align="center">
          {showRegister ? "Register" : "Login"}
        </Typography>

        {showRegister ? (
  <Dialog open={showRegister} onClose={(e, reason) => { if (reason === 'backdropClick') return; setShowRegister(false); }} maxWidth="sm" fullWidth>
          <DialogContent>
            <Box>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ display: "grid", gap: 2, mt: 3 }}>
                <StepContent activeStep={activeStep} regForm={regForm} setRegForm={setRegForm} />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>Back</Button>
                {activeStep === steps.length - 1 ? (
                  <Button variant="contained" onClick={handleRegisterSubmit}>Submit</Button>
                ) : (
                  <Button variant="contained" onClick={() => setActiveStep((s) => s + 1)}>Next</Button>
                )}
              </Box>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button onClick={() => setShowRegister(false)}>Already have account? Login</Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      ) : (
        <Box
          component="form"
          onSubmit={handleSendOtp}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 2,
            alignItems: "center",
            width: '100%'
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ width: '100%', bgcolor: '#f3f4f6', borderRadius: 2 }}
          />
          {!otpSent && (
            <Button type="submit" variant="contained" size="large" sx={{ mt: 2, borderRadius: 2, fontWeight: 600, width: '100%' }}>
              Send OTP
            </Button>
          )}
          {otpSent && (
            <>
              <TextField
                label="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                sx={{ width: '100%', bgcolor: '#f3f4f6', borderRadius: 2, mt: 2 }}
              />
              <Button onClick={handleVerifyOtp} variant="contained" size="large" sx={{ mt: 2, borderRadius: 2, fontWeight: 600, width: '100%' }}>
                Verify OTP
              </Button>
            </>
          )}
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Button variant="text" onClick={() => setShowRegister(true)} sx={{ fontWeight: 500 }}>
              New? Register here
            </Button>
          </Box>
        </Box>
  )}
  </Box>
  </Box>
  </Box>
  
)}
 {/* ✅ Snackbar always at bottom */}
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>

    </>
  );
}
