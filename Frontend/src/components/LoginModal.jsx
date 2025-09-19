import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from "react-swipeable-views-react-18-fix"
import './LoginModal.scss';
import { apiService } from '../utils/apiService';

const LoginModal = () => {
  const navigate = useNavigate();

  // Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tabIndex, setTabIndex] = useState(0); // 0 = User, 1 = Vendor
  const loginAsVendor = tabIndex === 1;

  // ✅ simple validation
  const validateForm = () => {
    if (!fullName.trim()) {
      setSnackbar({ open: true, message: "Full Name is required", severity: "error" });
      return false;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setSnackbar({ open: true, message: "Enter a valid 10-digit Phone Number", severity: "error" });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setSnackbar({ open: true, message: "Enter a valid Email address", severity: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await apiService.post('/auth/sendotp', {
        fullName,
        phone,
        email,
        role: loginAsVendor ? 'Vendor' : 'Customer'
      });

      if (res?.data?.success) {
        setSnackbar({ open: true, message: 'OTP sent successfully!', severity: 'success' });
        setShowOtpField(true);
      } else {
        setSnackbar({ open: true, message: res?.data?.message || 'Failed to send OTP', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Network error. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setSnackbar({ open: true, message: "OTP is required", severity: "error" });
      return;
    }

    setLoading(true);
    try {
      const role = loginAsVendor ? "Vendor" : "Customer";
      const res = await apiService.post('/auth/verifyOpt', { fullName, phone, email, otp, role });

      if (res?.data?.success) {
        if (res.data.accessToken) localStorage.setItem('accessToken', res.data.accessToken);
        if (res.data.refreshToken) localStorage.setItem('refreshToken', res.data.refreshToken);

        setSnackbar({ open: true, message: 'OTP verified successfully!', severity: 'success' });
        setTimeout(() => {
          navigate('/update-user', { state: { fullName, phone, email, role } });
        }, 800);
      } else {
        setSnackbar({ open: true, message: res?.data?.message || 'Failed to verify OTP', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Network error. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-container">
      {/* ✅ Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(e, newVal) => setTabIndex(newVal)}
        centered
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "50px",
          border: "2px solid #1976d2",
          padding: "4px",
          minHeight: "40px",
          marginBottom: '2rem',
          "& .MuiTab-root": {
            textTransform: "none",
            borderRadius: "50px",
            minHeight: "40px",
            padding: "6px 20px",
            color: "#1976d2",
            fontWeight: 600,
          },
          "& .Mui-selected": {
            background: "linear-gradient(90deg, #ff6b35, #f7931e)",
            color: "#fff !important",
          },
        }}
      >
        <Tab label="User" />
        <Tab label="Vendor" />
      </Tabs>

      {/* ✅ Swipeable Views */}
      <SwipeableViews index={tabIndex} onChangeIndex={setTabIndex}>
        {[0, 1].map((i) => (
          <form
            key={i}
            className="login-modal-form animate-form"
            onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}
          >
            <div className="login-modal-tagline">
              Unlock Your Journey – Sign In to Experience Seamless Car Care!
            </div>

            {/* ✅ Full Name */}
            <TextField
              label="Full Name"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              disabled={loading || showOtpField}
              required
            />

            {/* ✅ Phone Number */}
            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              margin="normal"
              variant="outlined"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              disabled={loading || showOtpField}
              inputProps={{ maxLength: 10 }}
              required
            />

            {/* ✅ Email */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading || showOtpField}
              required
            />

            {/* ✅ OTP field (show only after Send OTP) */}
            {showOtpField && (
              <TextField
                placeholder="Enter OTP"
                id="otp"
                fullWidth
                margin="normal"
                variant="outlined"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                disabled={loading}
                required
              />
            )}

            {/* ✅ Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || (showOtpField && !otp)}
            >
              {loading
                ? <CircularProgress size={24} color="inherit" />
                : showOtpField
                  ? 'Verify OTP'
                  : 'Send OTP'
              }
            </Button>
          </form>
        ))}
      </SwipeableViews>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{ sx: { zIndex: 999999999999 } }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default LoginModal;
