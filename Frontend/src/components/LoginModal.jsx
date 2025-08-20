import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
  const [loginAsVendor, setLoginAsVendor] = useState(false); // ✅ new state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showForm, setShowForm] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiService.post('/auth/sendotp', { email, role : loginAsVendor ? 'Vendor' : "customer" });
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
    setLoading(true); 
    try {
      const res = await apiService.post('/auth/verifyOpt', { email, otp , role : loginAsVendor ? 'Vendor' : "customer" });
      if (res?.data?.success) {
        if (res.data.accessToken) localStorage.setItem('accessToken', res.data.accessToken);
        if (res.data.refreshToken) localStorage.setItem('refreshToken', res.data.refreshToken);
        setSnackbar({ open: true, message: 'OTP verified successfully!', severity: 'success' });
        setTimeout(() => {
          navigate('/update-user', { state: { email, loginAsVendor } });
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
      <form
        className="login-modal-form animate-form"
        onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}
      >
        <div className="login-modal-tagline">
          Unlock Your Journey – Sign In to Experience Seamless Car Care!
        </div>

        {/* ✅ Checkbox above email */}
        <FormControlLabel
          className="vendor-checkbox"
          control={
            <Checkbox
              checked={loginAsVendor}
              onChange={(e) => setLoginAsVendor(e.target.checked)}
              color="warning"
            />
          }
          label="Login as a Vendor"
        />

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
    placeholder="Verify OTP"
    multiline
    rows={2}
    id="otp"
    name="otp"
    required
    fullWidth
    margin="normal"
    variant="outlined"
    value={otp}
    onChange={e => setOtp(e.target.value)}
    disabled={loading}
  />
)}


      <Button
  type="submit"
  variant="contained"
  color="primary"
  fullWidth
  disabled={loading || (showOtpField && !otp)}
  onClick={(e) => {
    if (showOtpField) {
      setShowForm(true); // Verify hone ke baad form show karega
    }
  }}
>
  {loading
    ? <CircularProgress size={24} color="inherit" />
    : showOtpField
      ? 'Verify OTP'
      : 'Send OTP'
  }
</Button>


      </form>
            {/* ✅ Card yahi add karo */}
   

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
