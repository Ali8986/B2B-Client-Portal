import React, { useState, useContext, useEffect } from "react";
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
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const navigate = useNavigate();
  const UserInfo = JSON.parse(localStorage.getItem("User Data"));
  const [profileName, setProfileName] = useState(UserInfo?.name || "");
  const [profileEmail, setProfileEmail] = useState(UserInfo?.email || "");

  useEffect(() => {
    const savedImage = localStorage.getItem("User Image");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [setProfileImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      name: profileName,
      email: profileEmail,
      profileImage: profileImage,
      updated_at: new Date().toISOString(),
    };
    console.log("Profile Data:", updatedProfile);
    localStorage.setItem("User Data", JSON.stringify(updatedProfile));
    localStorage.setItem("User Image", profileImage);
    navigate("/dashboard");
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
            Save Changes
          </Button>
        </div>
      </form>
    </ProfileContainer>
  );
};

export default EditProfile;
