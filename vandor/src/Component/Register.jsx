import React from "react";
import { Box, TextField, Button, Input } from "@mui/material";

export default function StepContent({ activeStep, regForm, setRegForm }) {
  switch (activeStep) {
    case 0:
      return (
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField label="Full Name" value={regForm.name} onChange={(e) => setRegForm((p) => ({ ...p, name: e.target.value }))} fullWidth />
          <TextField label="Email" type="email" value={regForm.email} onChange={(e) => setRegForm((p) => ({ ...p, email: e.target.value }))} fullWidth />
        </Box>
      );
    case 1:
      return (
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField label="Phone Number" value={regForm.phone} onChange={(e) => setRegForm((p) => ({ ...p, phone: e.target.value }))} fullWidth />
          <TextField label="Shop Name" value={regForm.shopName} onChange={(e) => setRegForm((p) => ({ ...p, shopName: e.target.value }))} fullWidth />
          <TextField label="Business Address" value={regForm.businessAddress} onChange={(e) => setRegForm((p) => ({ ...p, businessAddress: e.target.value }))} fullWidth multiline rows={3} />
          <TextField label="Business Timing" value={regForm.timing} onChange={(e) => setRegForm((p) => ({ ...p, timing: e.target.value }))} fullWidth />
        </Box>
      );
    case 2:
      return (
        <Box sx={{ display: "grid", gap: 2 }}>
          <Box>
            <Box sx={{ mb: 1, fontSize: 14, color: '#555' }}>Business Trade License</Box>
            <Input type="file" inputProps={{ accept: 'image/*,.pdf,.doc,.docx' }} onChange={(e) => { const file = e.target.files[0]; if (file) setRegForm((p) => ({ ...p, license: file })); }} fullWidth />
          </Box>
          <Box>
            <Box sx={{ mb: 1, fontSize: 14, color: '#555' }}>VAT Certificate</Box>
            <Input type="file" inputProps={{ accept: 'image/*,.pdf,.doc,.docx' }} onChange={(e) => { const file = e.target.files[0]; if (file) setRegForm((p) => ({ ...p, vat: file })); }} fullWidth />
          </Box>
          <TextField label="Bank Account Info" value={regForm.bankInfo} onChange={(e) => setRegForm((p) => ({ ...p, bankInfo: e.target.value }))} fullWidth />
        </Box>
      );
    case 3:
      return (
        <Box sx={{ display: "grid", gap: 2 }}>
          <Box>
            <Box sx={{ mb: 1, fontSize: 14, color: '#555' }}>Logo Shop</Box>
            <Input type="file" inputProps={{ accept: 'image/*,.pdf,.doc,.docx' }} onChange={(e) => { const file = e.target.files[0]; if (file) setRegForm((p) => ({ ...p, logo: file })); }} fullWidth />
          </Box>
        </Box>
      );
    default:
      return null;
  }
}
