import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/Faq/Faq";
import Blog from "./pages/Blog";
import Location from './pages/Location';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Header />
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={2} sx={{ minWidth: 220, background: '#fff', boxShadow: { md: '2px 0 8px #eee' } }}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10} sx={{ p: { xs: 2, md: 4 }, minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<Blog />} />
            {/* <Route path="/service" element={<Service />} /> */}
            <Route path="/location" element={<Location />} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
