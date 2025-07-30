import React, { useState } from "react";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const SERVICES = [
  "Car Wash",
  "Oil Change",
  "Tire Replacement",
  "Battery Check",
  "AC Repair",
  "General Service",
];

const FAQS = [
  {
    question: "How do I book a service?",
    answer: "Select your location, brand, and model, then click 'Continue'. Choose a vendor and book your service.",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking from your dashboard before the scheduled time.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept credit/debit cards, UPI, and net banking.",
  },
  {
    question: "Are there any hidden charges?",
    answer: "No, all charges are displayed upfront before you confirm your booking.",
  },
];

const BLOGS = [
  {
    title: "Top 5 Car Maintenance Tips",
    summary: "Keep your car running smoothly with these essential maintenance tips.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    link: "#"
  },
  {
    title: "How to Choose the Right Service Vendor",
    summary: "Learn what to look for when selecting a car service vendor.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    link: "#"
  },
  {
    title: "Benefits of Regular Car Wash",
    summary: "Discover why regular car washing is important for your vehicle.",
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
    link: "#"
  }
];

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
     
      mx="auto"
      px={2}
      py={4}
      sx={{ bgcolor: "#fff" }}
    >
      {/* Filter Section */}
      <Box
        className="filters"
        display="flex"
        gap={0}
        mb={4}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "linear-gradient(90deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)",
          borderRadius: 3,
          boxShadow: "0 4px 24px rgba(34,34,34,0.08)",
          p: { xs: 2, md: 0 },
          border: "none",
          minHeight: 90,
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 1,
            px: 2,
            py: 1,
            m: 1,
            minHeight: 70,
            gap: 2,
          }}
        >
          <TextField
            label="Location"
            variant="standard"
            sx={{
              minWidth: 120,
              mx: 1,
              "& .MuiInputLabel-root": {
                color: "#3a1c71",
                fontWeight: 600,
                fontSize: 15,
              },
              "& .MuiInputBase-input": {
                fontWeight: 600,
                fontSize: 16,
                color: "#222",
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <TextField
            select
            label="Brand"
            variant="standard"
            sx={{
              minWidth: 120,
              mx: 1,
              "& .MuiInputLabel-root": {
                color: "#3a1c71",
                fontWeight: 600,
                fontSize: 15,
              },
              "& .MuiInputBase-input": {
                fontWeight: 600,
                fontSize: 16,
                color: "#222",
              },
            }}
            InputProps={{ disableUnderline: true }}
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
            variant="standard"
            sx={{
              minWidth: 120,
              mx: 1,
              "& .MuiInputLabel-root": {
                color: "#3a1c71",
                fontWeight: 600,
                fontSize: 15,
              },
              "& .MuiInputBase-input": {
                fontWeight: 600,
                fontSize: 16,
                color: "#222",
              },
            }}
            InputProps={{ disableUnderline: true }}
            disabled={false}
          >
            <MenuItem value="">Select Model</MenuItem>
            {MODELS.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name}
              </MenuItem>
            ))}
          </TextField>
          {/* Vendor Filter */}
          <TextField
            select
            label="Vendor"
            variant="standard"
            sx={{
              minWidth: 120,
              mx: 1,
              "& .MuiInputLabel-root": {
                color: "#3a1c71",
                fontWeight: 600,
                fontSize: 15,
              },
              "& .MuiInputBase-input": {
                fontWeight: 600,
                fontSize: 16,
                color: "#222",
              },
            }}
            InputProps={{ disableUnderline: true }}
          >
            <MenuItem value="">Select Vendor</MenuItem>
            {TOP_VENDORS.map((v) => (
              <MenuItem key={v.id} value={v.id}>
                {v.name}
              </MenuItem>
            ))}
          </TextField>
          {/* Service Filter */}
          <TextField
            select
            label="Service"
            variant="standard"
            sx={{
              minWidth: 120,
              mx: 1,
              "& .MuiInputLabel-root": {
                color: "#3a1c71",
                fontWeight: 600,
                fontSize: 15,
              },
              "& .MuiInputBase-input": {
                fontWeight: 600,
                fontSize: 16,
                color: "#222",
              },
            }}
            InputProps={{ disableUnderline: true }}
          >
            <MenuItem value="">Select Service</MenuItem>
            {SERVICES.map((s, idx) => (
              <MenuItem key={idx} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {/* Continue button removed */}
      </Box>

      {/* Vendor Cards Section */}
      <Box
        sx={{
          mt: 6,
          minHeight: 300,
          backgroundColor: "#fff",
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
                  p: 0,
                  width: "100%",
                  minWidth: "100%",
                  maxWidth: "100%",
                  margin: 0,
                  height: 260,
                  background: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  image={vendor.image}
                  alt={vendor.name}
                  sx={{
                    width: "33.33%",
                    height: 260,
                    objectFit: "cover",
                    mr: 4,
                    border: "0px solid #fff",
                    p: 0,
                    borderRadius: "16px 0 0 16px",
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
                      color="#222"
                      mb={1}
                      sx={{ fontSize: 22 }}
                    >
                      {vendor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#222"
                      mb={2}
                      sx={{ fontWeight: 500, fontSize: 16 }}
                    >
                      {vendor.address}
                    </Typography>
                  </Box>
                  {/* List of services */}
                  <Box>
                    <Typography variant="subtitle2" color="#222" mb={1} sx={{ fontWeight: 600 }}>
                      Services:
                    </Typography>
                    <Box
                      component="ul"
                      sx={{
                        pl: 2,
                        mb: 0,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        listStyle: "disc",
                      }}
                    >
                      {SERVICES.map((service, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: 18,
                            color: "#222",
                            marginRight: 16,
                            marginBottom: 8,
                            minWidth: 120,
                            fontWeight: 500,
                          }}
                        >
                          {service}
                        </li>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
                <Chip
                  label={`⭐ ${vendor.rating}`}
                  color="default"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontWeight: 700,
                    bgcolor: "#222",
                    color: "#fff",
                    fontSize: 16,
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    bgcolor: "#d32f2f",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#b71c1c",
                    },
                    ml: 4,
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                    boxShadow: "0 2px 8px rgba(211,47,47,0.15)",
                  }}
                  color="error"
                >
                  Visit & Choose Service
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box
        sx={{
          mt: 8,
          mb: 4,
          backgroundColor: "#f9f9f9",
          borderRadius: 3,
          boxShadow: 1,
          p: { xs: 2, md: 4 },
          maxWidth: "100%",
          width: "100%",
          mx: 0,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={3} color="#222">
          Frequently Asked Questions
        </Typography>
        {FAQS.map((faq, idx) => (
          <Accordion key={idx} sx={{ mb: 2, background: "#fff", boxShadow: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#d32f2f" }} />}
              sx={{
                fontWeight: 600,
                color: "#d32f2f",
                fontSize: 18,
                bgcolor: "#f9f9f9",
                borderRadius: 2,
              }}
            >
              {faq.question}
            </AccordionSummary>
            <AccordionDetails sx={{ color: "#222", fontSize: 16 }}>
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Related Blog Section */}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 1,
          p: { xs: 2, md: 4 },
          maxWidth: "100%",
          width: "100%",
          mx: 0,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={3} color="#222">
          Related Blog
        </Typography>
        <Grid container spacing={3}>
          {BLOGS.map((blog, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card sx={{ boxShadow: 2, borderRadius: 2, height: "100%", bgcolor: "#f9f9f9", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt={blog.title}
                  sx={{
                    height: 180,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700} color="#d32f2f" mb={1}>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="#222" mb={2}>
                    {blog.summary}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    href={blog.link}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: "none",
                      px: 3,
                      py: 1,
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
