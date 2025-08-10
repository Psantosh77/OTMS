
import React from 'react';
import TextField from '@mui/material/TextField';


const BrandModelForm = () => {
  return (
    <form>
      <TextField
        label="Email"
        type="email"
        id="email"
        name="email"
        required
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <button type="submit">Send OTP</button>
    </form>
  );
}

export default BrandModelForm