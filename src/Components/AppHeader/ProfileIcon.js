import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import KeyIcon from "@mui/icons-material/Key";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import CustomModal from "../GeneralComponents/CustomModal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChangePassword from "./changePassword";
import { ProfileImageContext } from "../../Hooks/createContext"; // Import context
import { logout } from "../../DAL/Login/Login";
import LogoutComponent from "./Logout";
import SuccessSnackBar from "../SnackBars/SuccessSnackBar";

export default function ProfileIcon() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const { profileImage } = React.useContext(ProfileImageContext); // Use context for image

  const handleEditProfile = () => {
    navigate("/update-profile");
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const confirmLogout = async () => {
    setShowLogoutModal(false);
    const response = await logout();
    if (response.code === 200) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleSignOut = () => {
    setShowLogoutModal(true);
  };

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };
  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  // Safely parsing UserData
  const UserData = JSON.parse(localStorage.getItem("User Data")) || {};

  return (
    <div className="Profile-DropDown">
      <div className="profile-icon">
        <Tooltip title="Account settings">
          <div
            onClick={handleClick}
            className="profile-icon-button me-3"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 45, height: 45 }} src={profileImage || ""}>
              A
            </Avatar>
          </div>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} sx={{ fontWeight: "600" }}>
          {UserData.name || "Guest"}{" "}
          {/* Default to "Guest" if name is not available */}
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            fontStyle: "italic",
            fontWeight: "200",
            color: "#a3a3a3",
            fontSize: "14px",
            marginTop: "-10px",
          }}
        >
          {UserData.email || "No Email Provided"}{" "}
          {/* Default message for email */}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleEditProfile}>
          <ListItemIcon>
            <EditNoteIcon color="primary" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setShowChangePassword(true);
          }}
        >
          <ListItemIcon>
            <KeyIcon fontSize="small" color="primary" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <CustomModal
        open={showLogoutModal}
        handleClose={handleCloseLogoutModal}
        component={
          <LogoutComponent
            handleCloseLogoutModal={handleCloseLogoutModal}
            confirmLogout={confirmLogout}
          />
        }
      />
      <SuccessSnackBar
        open={snackbarOpen}
        severity="error"
        message="Not Able to LogOut"
        handleClose={() => setSnackbarOpen(false)}
        duration={2000}
      />
      <CustomModal
        open={showChangePassword}
        handleClose={handleCloseChangePassword}
        component={<ChangePassword handleClose={handleCloseChangePassword} />}
      />
    </div>
  );
}
