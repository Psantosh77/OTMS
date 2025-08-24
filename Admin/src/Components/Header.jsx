import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./Header.css";

function Header() {
  // You can replace with actual user data from context/store
  const userName = "Santosh";
  return (
    <Box className="admin-header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1 }}>
      <Typography variant="h6" className="admin-header-logo" sx={{ fontWeight: 700 }}>
        OTGMS
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar alt={userName} src="" sx={{ bgcolor: 'orange', color: '#000' }} />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>{userName}</Typography>
      </Box>
    </Box>
  );
}

export default Header;