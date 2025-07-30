import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setServiceSearch,
  addSelectedService,
  removeSelectedService,
  setLocationFilter,
  setBrandFilter,
  setModelFilter,
} from "../../redux/userSlice";
// Material UI imports
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
// Make sure you have installed MUI icons:
// npm install @mui/icons-material

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=80&h=80&facepad=2", // Unsplash example
    rating: 4.8,
  },
  {
    id: "v2",
    name: "Vendor B",
    address: "456 Elm St, City",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=80&h=80&facepad=2", // Unsplash example
    rating: 4.7,
  },
  {
    id: "v3",
    name: "Vendor C",
    address: "789 Oak St, City",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=80&h=80&facepad=2", // Unsplash example
    rating: 4.6,
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.user.serviceSearch || "");
  const selectedServices = useSelector(
    (state) => state.user.selectedServices || []
  );
  const locationFilter = useSelector((state) => state.user.locationFilter || "");
  const brandFilter = useSelector((state) => state.user.brandFilter || "");
  const modelFilter = useSelector((state) => state.user.modelFilter || "");

  const filteredModels = brandFilter
    ? MODELS.filter((m) => m.brandId === brandFilter)
    : MODELS;

  const handleSelect = (service) => {
    if (!selectedServices.some((s) => s.id === service.id)) {
      dispatch(addSelectedService(service));
    }
  };

  const handleRemove = (serviceId) => {
    dispatch(removeSelectedService(serviceId));
  };

  // Example selected car info (replace with dynamic data as needed)
  const selectedCar = {
    image:
      "https://imgd.aeplcdn.com/1056x594/cw/ec/37006/Maruti-Suzuki-Baleno-Exterior-148547.jpg?wm=0&q=80", // Example car image
    name: "Maruti Suzuki Baleno",
    fuel: "Petrol",
  };

  return (
    <Box
      className="dashboard-board"
      maxWidth="1200px"
      mx="auto"
      px={2}
      py={4}
      sx={{ bgcolor: "background.default" }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
        color="text.primary"
        textAlign="center"
      >
        Service Board
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Top Vendors */}
          <Box mb={6}>
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
              color="text.secondary"
              textAlign="center"
            >
              Top Rated Vendors
            </Typography>
            <Grid container spacing={3}>
              {TOP_VENDORS.map((vendor) => (
                <Grid item xs={12} key={vendor.id} sx={{ px: 0 }}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      position: "relative",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                      p: 4,
                      width: "100%",
                      maxWidth: "100%",
                      minWidth: "100%",
                      margin: 0,
                    }}
                  >
                    <CardMedia  
                      component="img"
                      image={vendor.image}
                      alt={vendor.name}
                      sx={{
                        width: 180,
                        height: 180,
                        borderRadius: "16px",
                        objectFit: "cover",
                        mr: { md: 6, xs: 0 },
                        mb: { xs: 2, md: 0 },
                        border: "3px solid #1976d2",
                      }}
                    />
                    <CardContent
                      sx={{
                        flex: 1,
                        textAlign: { xs: "center", md: "left" },
                        p: 0,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        color="text.primary"
                        mb={1}
                      >
                        {vendor.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        mb={2}
                      >
                        {vendor.address}
                      </Typography>
                    </CardContent>
                    <Chip
                      label={`⭐ ${vendor.rating}`}
                      color="warning"
                      sx={{
                        position: "absolute",
                        top: 24,
                        right: 24,
                        fontWeight: 700,
                        fontSize: 18,
                        px: 2,
                        py: 1,
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
                        ml: { md: 6, xs: 0 },
                        mt: { xs: 2, md: 0 },
                        px: 4,
                        py: 1.5,
                        fontSize: 16,
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
          {/* Filters */}
          <Box
            className="filters"
            display="flex"
            gap={2}
            mb={4}
            flexWrap="wrap"
            justifyContent="center"
          >
            <TextField
              label="Search location"
              variant="outlined"
              value={locationFilter}
              onChange={(e) => dispatch(setLocationFilter(e.target.value))}
              sx={{ minWidth: 180, flex: 1 }}
            />
            <TextField
              select
              label="Select Brand"
              variant="outlined"
              value={brandFilter}
              onChange={(e) => dispatch(setBrandFilter(e.target.value))}
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
              label="Select Model"
              variant="outlined"
              value={modelFilter}
              onChange={(e) => dispatch(setModelFilter(e.target.value))}
              sx={{ minWidth: 180, flex: 1 }}
              disabled={!brandFilter}
            >
              <MenuItem value="">Select Model</MenuItem>
              {filteredModels.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {/* Selected Services */}
          <Box mt={6}>
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
              color="text.secondary"
              textAlign="center"
            >
              Selected Services
            </Typography>
            {selectedServices.length === 0 ? (
              <Typography color="text.disabled" textAlign="center">
                No services selected.
              </Typography>
            ) : (
              <Box>
                {selectedServices.map((service) => (
                  <Card
                    key={service.id}
                    sx={{
                      mb: 2,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      background: "#e3f2fd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: 1,
                    }}
                  >
                    <Typography color="text.primary">{service.name}</Typography>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ borderRadius: 2, ml: 2 }}
                      onClick={() => handleRemove(service.id)}
                    >
                      Remove
                    </Button>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Car Card - right side */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              p: 3,
              minHeight: 340,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                style={{
                  width: "120px",
                  height: "auto",
                  objectFit: "contain",
                  marginBottom: 8,
                }}
              />
            </Box>
            <Box sx={{ width: "100%", textAlign: "center", mb: 1 }}>
              <Typography variant="h6" fontWeight={700} color="text.primary">
                {selectedCar.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontWeight: 500,
                }}
              >
                <DirectionsCarFilledOutlinedIcon
                  fontSize="small"
                  sx={{ mr: 0.5 }}
                />
                {selectedCar.fuel}
              </Typography>
              <Button
                size="small"
                color="error"
                sx={{
                  ml: 2,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: 13,
                }}
                startIcon={<EditOutlinedIcon />}
              >
                Change
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
              }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: 60, color: "grey.400", mb: 2 }}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Go ahead and book a service for your car.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
