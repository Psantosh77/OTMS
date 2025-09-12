import React from "react";
import { Box } from "@mui/material";

export default function StepContent({ activeStep, regForm, setRegForm }) {
  switch (activeStep) {
    case 0:
      return (
        <Box sx={{ display: "grid", gap: 2 }}>
          <input
            type="text"
            placeholder="Full Name"
            value={regForm.name}
            onChange={(e) => setRegForm((p) => ({ ...p, name: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={regForm.email}
            onChange={(e) => setRegForm((p) => ({ ...p, email: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={regForm.password}
            onChange={(e) => setRegForm((p) => ({ ...p, password: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </Box>
      );
    case 1:
      return (
        <Box sx={{ display: "grid", gap: 2 }}>
          <input
            type="text"
            placeholder="Phone Number"
            value={regForm.phone}
            onChange={(e) => setRegForm((p) => ({ ...p, phone: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="Shop Name"
            value={regForm.shopName}
            onChange={(e) => setRegForm((p) => ({ ...p, shopName: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <textarea
            placeholder="Business Address"
            value={regForm.businessAddress}
            onChange={(e) => setRegForm((p) => ({ ...p, businessAddress: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="Business Timing"
            value={regForm.timing}
            onChange={(e) => setRegForm((p) => ({ ...p, timing: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </Box>
      );
    case 2:
      return (
        <Box sx={{ display: "grid", gap: 2 }}>
          <input
            type="text"
            placeholder="Business Trade License"
            value={regForm.license}
            onChange={(e) => setRegForm((p) => ({ ...p, license: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        <label
  style={{
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    color: "#555",
  }}
>
  VAT Certificate
</label>

<input
  type="file"
  accept="image/*,.pdf,.doc,.docx"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setRegForm((p) => ({ ...p, vat: file }));
    }
  }}
  style={{
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f9f9f9",
  }}
/>


          <input
            type="text"
            placeholder="Bank Account Info"
            value={regForm.bankInfo}
            onChange={(e) => setRegForm((p) => ({ ...p, bankInfo: e.target.value }))}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </Box>
      );
    case 3:
      return (
        <Box sx={{ display: "grid", gap: 2 }}>
          <label
  style={{
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    color: "#555",
  }}
>
  Logo Shope
</label>

<input
  type="file"
  accept="image/*,.pdf,.doc,.docx"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
 setRegForm((p) => ({ ...p, logo: e.target.value }))
    }
  }}
  style={{
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f9f9f9",
  }}
/>


        </Box>
      );
    default:
      return null;
  }
}
