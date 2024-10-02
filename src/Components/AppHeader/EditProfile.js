import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import { ProfileImageContext } from "../../Hooks/createContext";
import { profileDetail, updateProfile } from "../../DAL/Login/Login";
import SuccessSnackBar from "../SnackBars/SuccessSnackBar";

const ProfileContainer = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  maxWidth: "500px",
  height: "65%",
  margin: "80px auto",
  backgroundColor: "#f7f7f7",
  borderRadius: "30px",
  boxShadow: "rgba(17, 12, 46, 0.15) 0px 20px 30px 0px;",
});

const StyledAvatar = styled(Avatar)({
  width: "100px",
  height: "100px",
  marginBottom: "20px",
  position: "relative",
});

const EditProfile = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await updateProfile();
      if (response.code === 200) {
        const profileData = response.admin;
        setProfileName(profileData.first_name || "");
        const email = JSON.parse(localStorage.getItem("Email"));

        setProfileEmail(email || "");
        setProfileImage(profileData.profile_image || "");
      } else {
        setSnackbarOpen(true);
        setSnackbarMessage("Failed to load profile data.");
      }
    };

    fetchProfileData();
  }, [setProfileImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      first_name: profileName,
      last_name: profileName,
      profile_image: profileImage,
      status: true,
    };
    const response = await profileDetail(updatedProfile);
    if (response.code === 200) {
      console.log("SuccessMessage", response.message);
      localStorage.setItem("Email", JSON.stringify(profileEmail));
      navigate("/dashboard");
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage(response.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setProfileImage(newImageURL);
    }
  };

  return (
    <ProfileContainer>
      <SuccessSnackBar
        open={snackbarOpen}
        severity="error"
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
        duration={2000}
      />
      <div className="Position_update">
        <StyledAvatar alt="Profile Image" src={profileImage} />
        <Typography variant="h5" component="h1" gutterBottom>
          Edit Profile
        </Typography>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-button"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="upload-button">
          <IconButton
            className="Profile-Image-Change"
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <CameraAltIcon />
          </IconButton>
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          variant="standard"
          size="small"
          fullWidth
          value={profileName}
          margin="normal"
          onChange={(e) => setProfileName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          name="email"
          variant="standard"
          fullWidth
          value={profileEmail}
          size="small"
          margin="normal"
          onChange={(e) => setProfileEmail(e.target.value)}
          required
        />
        <div className="col-12 d-flex justify-content-end">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 2,
            }}
          >
            Update
          </Button>
        </div>
      </form>
    </ProfileContainer>
  );
};

export default EditProfile;
