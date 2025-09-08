import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import BuildIcon from '@mui/icons-material/Build';
import BookIcon from '@mui/icons-material/Book';
import HelpIcon from '@mui/icons-material/Help';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const Sidebar = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();

  return (
    <List component="nav" sx={{ width: '100%', pt: 2 }}>
      <ListItem sx={{ mb: 2 }}>
        <ListItemText primary={<span style={{ fontWeight: 700, fontSize: 20 }}>OTGMA</span>} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard"
        selected={location.pathname === '/dashboard'}
        sx={location.pathname === '/dashboard' ? {
          color: 'orange',
          fontWeight: 700,
          bgcolor: 'rgba(255, 165, 0, 0.15)'
        } : {}}
      >
        <ListItemIcon sx={location.pathname === '/dashboard' ? { color: 'orange' } : {}}><HomeIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => setSubmenuOpen(!submenuOpen)}>
        <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
        <ListItemText primary="Master" />
        {submenuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/service"
            selected={location.pathname === '/service'}
            sx={{
              pl: 4,
              ...(location.pathname === '/service' ? {
                color: 'orange',
                fontWeight: 700,
                bgcolor: 'rgba(255, 165, 0, 0.15)'
              } : {})
            }}
          >
            <ListItemIcon sx={location.pathname === '/service' ? { color: 'orange' } : {}}><BuildIcon /></ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/blog"
            selected={location.pathname === '/blog'}
            sx={{
              pl: 4,
              ...(location.pathname === '/blog' ? {
                color: 'orange',
                fontWeight: 700,
                bgcolor: 'rgba(255, 165, 0, 0.15)'
              } : {})
            }}
          >
            <ListItemIcon sx={location.pathname === '/blog' ? { color: 'orange' } : {}}><BookIcon /></ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/faq"
            selected={location.pathname === '/faq'}
            sx={{
              pl: 4,
              ...(location.pathname === '/faq' ? {
                color: 'orange',
                fontWeight: 700,
                bgcolor: 'rgba(255, 165, 0, 0.15)'
              } : {})
            }}
          >
            <ListItemIcon sx={location.pathname === '/faq' ? { color: 'orange' } : {}}><HelpIcon /></ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/location"
            selected={location.pathname === '/location'}
            sx={{
              pl: 4,
              ...(location.pathname === '/location' ? {
                color: 'orange',
                fontWeight: 700,
                bgcolor: 'rgba(255, 165, 0, 0.15)'
              } : {})
            }}
          >
            <ListItemIcon sx={location.pathname === '/location' ? { color: 'orange' } : {}}><LocationOnIcon /></ListItemIcon>
            <ListItemText primary="Location" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemIcon><ContactPhoneIcon /></ListItemIcon>
        <ListItemText primary="vender" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><ContactPhoneIcon /></ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
      <ListItem button>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  );
};

export default Sidebar;
