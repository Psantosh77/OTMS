import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

// Example blog data
const BLOGS = [
  {
    title: "Top 5 Car Maintenance Tips",
    summary: "Keep your car running smoothly with these essential maintenance tips.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    title: "How to Choose the Right Service Vendor",
    summary: "Learn what to look for when selecting a car service vendor.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    title: "Benefits of Regular Car Wash",
    summary: "Discover why regular car washing is important for your vehicle.",
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80",
    link: "#"
  }
];

const Blog = () => (
  <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 4 }}>
    <Typography variant="h4" fontWeight={700} mb={4} color="#d32f2f">
      Blog
    </Typography>
    <Grid container spacing={3}>
      {BLOGS.map((blog, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Card sx={{ boxShadow: 2, borderRadius: 2, height: "100%", bgcolor: "#f9f9f9", display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              image={blog.image}
              alt={blog.title}
              sx={{
                height: 220,
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
              <a href={blog.link} style={{ color: "#d32f2f", fontWeight: 600, textDecoration: "underline" }}>
                Read More
              </a>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Blog;
