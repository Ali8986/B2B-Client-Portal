import { Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./TopBar";
import AppSidebar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import SucessSnackBar from "../../Components/SnackBars/SuccessSnackBar";

const drawerWidth = 350;

const DashboardLayout = ({ handleSnackbarClose }) => {
  const page = JSON.parse(localStorage.getItem("SnackBarOpeningCount"));
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(page);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  setTimeout(() => {
    if (page === true) {
      setSnackbarOpen(false);
      localStorage.setItem("SnackBarOpeningCount", JSON.stringify(false));
    }
  }, 1000);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div className={"Dashboard-layout-container"}>
      <SucessSnackBar
        open={snackbarOpen}
        handleClose={(handleSnackbarClose = () => setSnackbarOpen(false))}
        message="Login is successful"
        severity="success"
        duration={2000}
      />
      <CssBaseline />
      <AppHeader
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setIsClosing={setIsClosing}
        drawerWidth={drawerWidth}
      />

      <AppSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <div
        className={"Dashboard-layout-main"}
        style={{
          height: "100%",
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
