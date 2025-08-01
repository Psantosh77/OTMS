import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ServiceDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const vendorId = params.get("vendorId");

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Service Details
      </Typography>
      <Typography variant="body1">
        Vendor ID: <b>{vendorId}</b>
      </Typography>
      {/* Add more details here as needed */}
    </Box>
  );
};

export default ServiceDetails;
