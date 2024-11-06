import { Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./TopBar";
import AppSidebar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 350;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
    // eslint-disable-next-line
  }, []);
  return (
    <div className={"Dashboard-layout-container"}>
      <CssBaseline />
      <AppHeader
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setIsClosing={isClosing}
        drawerWidth={drawerWidth}
      />

      <AppSidebar
        drawerWidth={drawerWidth}
        className='drawer-main-sidebar'
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
