import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/dashboard" },
  { text: "Services", path: "/services" },
  { text: "Orders", path: "/orders" },
  { text: "Setting", path: "/setting" },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle, isMobile }) => {
  const drawerContent = (
    <Box>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            onClick={isMobile ? handleDrawerToggle : undefined} // ✅ close on mobile click
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // better mobile perf
          sx={{
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Permanent Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
