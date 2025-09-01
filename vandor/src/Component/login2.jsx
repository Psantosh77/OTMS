import React, { useState } from "react";
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
} from "@mui/material";
import Navbar from "./Navbar";
import StepContent  from './Register';

const steps = ["Basic Info", "Business Details", "Documents", "Optional"]; // ✅ define once

export default function LoginRegister({onLogin  }) {
  const [users, setUsers] = useState([
    { email: "user@test.com", password: "password123" },
  ]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [showRegister, setShowRegister] = useState(false);
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
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
  function handleLogin(e) {
    e.preventDefault();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
       setLoggedInUser(found.email);   // local state
  onLogin(found.email);           // parent App ko inform karega
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Invalid credentials — you can register below.",
        severity: "error",
      });
    }
  }

  // ------------------- REGISTER -------------------
  function handleRegisterSubmit() {
    if (users.find((u) => u.email === regForm.email)) {
      setSnackbar({
        open: true,
        message: "Email already registered.",
        severity: "error",
      });
      return;
    }

    const newUser = {
      email: regForm.email,
      password: regForm.password,
    };
    setUsers((prev) => [...prev, newUser]);
    setLoggedInUser(regForm.email);
    setShowRegister(false);
    setSnackbar({
      open: true,
      message: "Registered successfully — logged in.",
      severity: "success",
    });
  }

  // ------------------- STEP FORM CONTENT -------------------



  return (
    <>
     {loggedInUser && (
  <Navbar
    loggedInUser={loggedInUser}
    onLogout={() => {
      setLoggedInUser(null);
      setEmail("");
      setPassword("");
      setSnackbar({
        open: true,
        message: "Logged out.",
        severity: "info",
      });
    }}
  />
)}
     {!loggedInUser && (
  <Container
    maxWidth="sm"
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
      <Typography variant="h5" gutterBottom align="center">
        {showRegister ? "Register" : "Login"}
      </Typography>

      {showRegister ? (
        <>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ display: "grid", gap: 2, mt: 3 }}>
            <StepContent
             activeStep={activeStep} 
  regForm={regForm} 
  setRegForm={setRegForm}  />
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((s) => s - 1)}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleRegisterSubmit}>
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setActiveStep((s) => s + 1)}
              >
                Next
              </Button>
            )}
          </Box>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button onClick={() => setShowRegister(false)}>
              Already have account? Login
            </Button>
          </Box>
        </>
      ) : (
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "grid", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Button variant="text" onClick={() => setShowRegister(true)}>
              New? Register here
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  </Container>
  
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
