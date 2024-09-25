import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import KeyIcon from "@mui/icons-material/Key";
import Logout from "@mui/icons-material/Logout";
import profile from "../../Assets/Images/profile.jpg";
import { useNavigate } from "react-router-dom";
import CustomModal from "../GeneralComponents/CustomModal";
import ResetPassword from "../Forget Password/ResetPassword";
// import ChangePassword from "./ChangePassword";
// import CustomModal from "../GeneralComponents/CustomModal";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ChangePassword from "./changePassword";

export default function ProfileIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };
  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };

  return (
    <>
      <div className="profile-icon">
        <Tooltip title="Account settings">
          <div
            onClick={handleClick}
            className="profile-icon-button"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }} src={profile}>
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
              filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.32))",
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
        <MenuItem
          onClick={handleClose}
          sx={{
            fontWeight: "600",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          Ali Osama
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            fontStyle: "italic",
            fontWeight: "200",
            color: "#a3a3a3",
            marginTop: "-16px",
            fontSize: "14px",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          aliosama8986@gmail.com
        </MenuItem>
        <Divider className="divider" />
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
        open={showChangePassword}
        handleClose={handleCloseChangePassword}
        component={<ChangePassword handleClose={handleCloseChangePassword} />}
      />
    </>
  );
}
