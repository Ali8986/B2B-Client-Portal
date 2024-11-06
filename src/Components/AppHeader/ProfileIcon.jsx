import Avatar from "@mui/material/Avatar";
import { useSnackbar } from "notistack";
import { useEffect, useState, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import KeyIcon from "@mui/icons-material/Key";
import Logout from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import CustomModal from "../GeneralComponents/CustomModal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChangePassword from "./changePassword";
import { ProfileImageContext } from "../../Hooks/createContext"; // Import context
import { logout } from "../../DAL/Login/Login";
import LogoutComponent from "./Logout";

export default function ProfileIcon() {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({});
  const email = JSON.parse(localStorage.getItem("Email"));
  const companyName = localStorage.getItem("name");
  const companyLogo = localStorage.getItem("image");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);

  const getData = async () => {
    if(email&&companyName&&companyLogo){
      setProfileImage(companyLogo)
      setData({
        name: companyName,
        email: email,
      });
    }
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

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
      localStorage.removeItem("name");
      localStorage.removeItem("Email");
      localStorage.removeItem("email");
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const is_path_includes = (path) => {
        return pathname.toString().includes(path);
      };
      if (!is_path_includes("/speakers")) {
        localStorage.removeItem("searchText_speaker_page");
      }
      if (!is_path_includes("/exhibitors")) {
        localStorage.removeItem("searchText_exhibitor_page");
        localStorage.removeItem("filter_Exhibitor_Data");
        localStorage.removeItem("Chips");
      }
      if (!is_path_includes("/events")) {
        localStorage.removeItem("searchText_events_page");
      }
      if (!is_path_includes("/company")) {
        localStorage.removeItem("searchText_company_page");
      }
      if (!is_path_includes("/template-configuration")) {
        localStorage.removeItem("searchText_Template_Config_page");
      }
      if (!is_path_includes("/module-configuration")) {
        localStorage.removeItem("searchText_Module_Config_page");
      }
      if (!is_path_includes("/website-pages")) {
        localStorage.removeItem("searchText_Website_Pages");
      }
      if (!is_path_includes("/departments")) {
        localStorage.removeItem("searchText_Departments_page");
      }
      if (!is_path_includes("/autoresponder-message")) {
        localStorage.removeItem("searchText_AutoResponder_page");
      }
    }, 1000);
  }, [pathname]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Profile-DropDown">
      <div className="profile-icon">
        <Tooltip title="Account settings">
          <div
            onClick={handleClick}
            className="profile-icon-button me-3"
            aria-controls={anchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={!!anchorEl}
          >
            <Avatar
              sx={{ width: 45, height: 45 }}
              src={profileImage ? profileImage : data.profile_image}
            ></Avatar>
          </div>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
        <MenuItem
          className="Profile-Icon-Link"
          onClick={handleClose}
          sx={{ fontWeight: "600" }}
        >
          {data ? data.name :""}
        </MenuItem>
        <MenuItem
          className="Profile-Icon-Link"
          onClick={handleClose}
          sx={{
            fontStyle: "italic",
            fontWeight: "200",
            color: "#a3a3a3",
            fontSize: "14px",
            marginTop: "-10px",
          }}
        >
          {email || "No Email Provided"}
        </MenuItem>
        <Divider />
        <MenuItem
          className="Profile-Icon-Link"
          onClick={() => {
            handleEditProfile();
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditNoteIcon color="primary" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <MenuItem
          className="Profile-Icon-Link"
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
        <MenuItem
          className="Profile-Icon-Link"
          onClick={() => {
            handleClose();
            setShowLogoutModal(true);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <CustomModal
        open={showLogoutModal}
        handleClose={() => setShowLogoutModal(false)}
        component={
          <LogoutComponent
            handleCloseLogoutModal={() => setShowLogoutModal(false)}
            confirmLogout={confirmLogout}
          />
        }
      />
      <CustomModal
        open={showChangePassword}
        handleClose={() => setShowChangePassword(false)}
        component={
          <ChangePassword handleClose={() => setShowChangePassword(false)} />
        }
      />
    </div>
  );
}
