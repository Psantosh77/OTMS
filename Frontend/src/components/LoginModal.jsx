


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import './LoginModal.scss';
import { apiService } from '../utils/apiService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const LoginModal = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiService.post('/auth/sendotp', { email });
      if (res && res.data && res.data.success) {
        setSnackbar({ open: true, message: 'OTP sent successfully!', severity: 'success' });
        setShowOtpField(true);
      } else {
        setSnackbar({ open: true, message: (res && res.data && res.data.message) || 'Failed to send OTP', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Network error. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiService.post('/auth/verifyOpt', { email, otp });
      if (res && res.data && res.data.success) {
        // Save tokens to localStorage
        if (res.data.accessToken) {
          localStorage.setItem('accessToken', res.data.accessToken);
        }
        if (res.data.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken);
        }
        setSnackbar({ open: true, message: 'OTP verified successfully!', severity: 'success' });
        setTimeout(() => {
          navigate('/update-user', { state: { email } });
        }, 800);
      } else {
        setSnackbar({ open: true, message: (res && res.data && res.data.message) || 'Failed to verify OTP', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Network error. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-container">
      <form className="login-modal-form" onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}>
        <div className="login-modal-tagline">
          Unlock Your Journey – Sign In to Experience Seamless Car Care!
        </div>
        <TextField
          label="Email"
          type="email"
          id="email"
          name="email"
          required
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading || showOtpField}
        />
        {showOtpField && (
          <TextField
            label="Enter OTP"
            type="text"
            id="otp"
            name="otp"
            required
            fullWidth
            margin="normal"
            variant="outlined"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            disabled={loading}
            inputProps={{ maxLength: 6 }}
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || (showOtpField && !otp)}>
          {loading ? <CircularProgress size={24} color="inherit" /> : showOtpField ? 'Verify OTP' : 'Send OTP'}
        </Button>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{ sx: { zIndex: 999999999999 } }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default LoginModal