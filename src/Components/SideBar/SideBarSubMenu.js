// SidebarSubMenu.js
import React from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";

const SidebarSubMenu = ({
  option,
  inboxOpen,
  handleInboxOpen,
  handleMobileViewChange,
}) => {
  const location = useLocation();

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton className="side-bar-btn" onClick={handleInboxOpen}>
          <ListItemIcon>{option.icon}</ListItemIcon>
          <ListItemText primary={option.title} />
          <ExpandMoreIcon />
        </ListItemButton>
      </ListItem>
      <Collapse in={inboxOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {option.children.map((childOption) => (
            <ListItem
              disablePadding
              key={childOption.title}
              className={
                location.pathname.includes(childOption.path) ? "active-tab" : ""
              }
            >
              <ListItemButton
                sx={{ pl: 10 }}
                className="SubMenu-Btn"
                component={Link}
                to={childOption.path}
                onClick={handleMobileViewChange}
              >
                <ListItemIcon>{childOption.icon}</ListItemIcon>
                <ListItemText primary={childOption.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarSubMenu;
