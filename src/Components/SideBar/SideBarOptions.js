// SidebarOption.js
import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SidebarOption = ({ option, handleMobileViewChange }) => {
  const location = useLocation();
  
  return (
    <ListItem disablePadding className={location.pathname.includes(option.path) ? "active-tab" : ""}>
      <ListItemButton
        className="side-bar-btn"
        component={Link}
        to={option.path}
        onClick={handleMobileViewChange}
      >
        <ListItemIcon>{option.icon}</ListItemIcon>
        <ListItemText primary={option.title} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarOption;
