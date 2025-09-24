import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

  // ✅ Simple validation
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
      const res = await apiService.post('/auth/sendotp', { fullName, phone, email, role: 'Customer' });

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
      const res = await apiService.post('/auth/verifyOpt', { fullName, phone, email, otp, role: 'Customer' });

      if (res?.data?.success) {
        if (res.data.accessToken) localStorage.setItem('accessToken', res.data.accessToken);
        if (res.data.refreshToken) localStorage.setItem('refreshToken', res.data.refreshToken);

        setSnackbar({ open: true, message: 'OTP verified successfully!', severity: 'success' });
        setTimeout(() => {
          navigate('/update-user', { state: { fullName, phone, email, role: 'Customer' } });
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
      <form className="login-modal-form animate-form" onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}>
        <div className="login-modal-tagline">
          Unlock Your Journey – Sign In to Experience Seamless Car Care!
        </div>

        {/* Full Name */}
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

        {/* Phone Number */}
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

        {/* Email */}
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

        {/* OTP field */}
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

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || (showOtpField && !otp)}
          sx={{ mt: 2 }}
        >
          {loading
            ? <CircularProgress size={24} color="inherit" />
            : showOtpField
              ? 'Verify OTP'
              : 'Send OTP'
          }
        </Button>
      </form>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
