import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Example static data
const BRANDS = [
  { id: "b1", name: "Toyota" },
  { id: "b2", name: "Honda" },
  { id: "b3", name: "Ford" },
];
const MODELS = [
  { id: "m1", brandId: "b1", name: "Corolla" },
  { id: "m2", brandId: "b1", name: "Camry" },
  { id: "m3", brandId: "b2", name: "Civic" },
  { id: "m4", brandId: "b3", name: "F-150" },
];
const TOP_VENDORS = [
  {
    id: "v1",
    name: "Vendor A",
    address: "123 Main St, City",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
  },
  {
    id: "v2",
    name: "Vendor B",
    address: "456 Elm St, City",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
  },
  {
    id: "v3",
    name: "Vendor C",
    address: "789 Oak St, City",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
  },
];

const selectedCar = {
  image:
    "https://imgd.aeplcdn.com/1056x594/cw/ec/37006/Maruti-Suzuki-Baleno-Exterior-148547.jpg?wm=0&q=80",
  name: "Maruti Suzuki Baleno",
  fuel: "Petrol",
};

const Dashboard = () => {
  // Generate 30 vendor cards for demo
  const vendorCards = Array.from({ length: 30 }).map((_, idx) => {
    const vendor = TOP_VENDORS[idx % TOP_VENDORS.length];
    return {
      ...vendor,
      id: `vendor-${idx + 1}`,
      name: `${vendor.name} ${idx + 1}`,
    };
  });

  return (
    <Box
      className="dashboard-board"
      maxWidth="1200px"
      mx="auto"
      px={2}
      py={4}
      sx={{ bgcolor: "background.default" }}
    >
      {/* Filter Section */}
      <Box
        className="filters"
        display="flex"
        gap={2}
        mb={4}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: 2, p: 3 }}
      >
        <TextField
          label="Location"
          variant="outlined"
          sx={{ minWidth: 180, flex: 1 }}
        />
        <TextField
          select
          label="Brand"
          variant="outlined"
          sx={{ minWidth: 180, flex: 1 }}
        >
          <MenuItem value="">Select Brand</MenuItem>
          {BRANDS.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              {b.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Model"
          variant="outlined"
          sx={{ minWidth: 180, flex: 1 }}
          disabled={false}
        >
          <MenuItem value="">Select Model</MenuItem>
          {MODELS.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.5, fontWeight: 600, fontSize: 16, borderRadius: 2 }}
        >
          Search
        </Button>
      </Box>

      {/* Vendor Cards Section */}
      <Box
        sx={{
          mt: 6,
          minHeight: 300,
          backgroundColor: "grey.100",
          borderRadius: 2,
          boxShadow: 1,
          p: 3,
        }}
      >
        <Grid container spacing={3}>
          {vendorCards.map((vendor) => (
            <Grid item xs={12} key={vendor.id} sx={{ px: 0, width: "100%" }}>
              {/* Each card takes full row */}
              <Card
                sx={{
                  boxShadow: 3,
                  position: "relative",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  p: 0, // card padding set to 0
                  width: "100%",
                  minWidth: "100%",
                  maxWidth: "100%",
                  margin: 0,
                  height: 260, // increased card height
                }}
              >
                <CardMedia
                  component="img"
                  image={vendor.image}
                  alt={vendor.name}
                  sx={{
                    width: "33.33%",
                    height: 260, // match card height
                    objectFit: "cover",
                    mr: 4,
                    border: "0px solid #1976d2",
                    p: 0,
                  }}
                />
                <CardContent
                  sx={{
                    flex: 1,
                    textAlign: "left",
                    p: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="text.primary"
                      mb={1}
                    >
                      {vendor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={2}
                    >
                      {vendor.address}
                    </Typography>
                  </Box>
                  {/* ...existing code for rest of CardContent... */}
                </CardContent>
                <Chip
                  label={`⭐ ${vendor.rating}`}
                  color="warning"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontWeight: 700,
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    ml: 4,
                  }}
                  color="primary"
                >
                  View Profile
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;

