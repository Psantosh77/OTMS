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

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './App.css';
import Service from './pages/service';
import Login from './pages/Login';


function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

   if (location.pathname === "/") {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }

  return (
  <Box sx={{ minHeight: '100vh', background: '#f8f9fa', width: '100vw', overflowX: 'hidden', color: '#111' }}>
      <AppBar position="sticky" color="default" elevation={1} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OTMS Admin
          </Typography>
        </Toolbar>
      </AppBar>
  <Box sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
        {/* Sidebar for desktop, Drawer for mobile */}
        {isMobile ? (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: 220 } }}
          >
            <Sidebar />
          </Drawer>
        ) : (
          <Box sx={{ width: 220, minHeight: '100vh', background: '#fff', boxShadow: '2px 0 8px #eee', flexShrink: 0 }}>
            <Sidebar />
          </Box>
        )}
  <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, minHeight: '80vh', width: '100%', color: '#111' }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/service" element={<Service />} />
            <Route path="/location" element={<Location />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
