import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/apiConfig/apiconfig";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/admin-login', { email, password });
      if (res?.data?.success) {
        const tokens = res.data.data || {};
        // Save tokens (access/refresh) if returned
        if (tokens.accessToken) {
          localStorage.setItem('token', tokens.accessToken);
          try { api.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`; } catch(e){}
        }
        if (tokens.refreshToken) localStorage.setItem('refreshToken', tokens.refreshToken);
  // Save admin info for later use in the admin UI
  if (tokens.admin) localStorage.setItem('admin', JSON.stringify(tokens.admin));
        // Optional: also set a flag
        localStorage.setItem('isAdminLoggedIn', 'true');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        alert(res?.data?.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Network or server error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          textAlign: "center",
          background: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Login
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" mb={3}>
          Please login to continue
        </Typography> */}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: "16px",
              borderRadius: 2,
              background: "#111",
              ":hover": { background: "#333" },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
