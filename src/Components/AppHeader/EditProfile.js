import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ProfileImageContext } from "../../Hooks/createContext";
import { profileDetail, updateProfile } from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import { useUser } from "../../Hooks/adminUser"; // Correct path to your UserContext
import "../../Assets/Styles/EditProfile.css";
import { s3baseUrl } from "../../config/config";

const StyledAvatar = styled(Avatar)({
  width: "100px",
  height: "100px",
  marginBottom: "20px",
  position: "relative",
});

const EditProfile = () => {
  const { setUser } = useUser(); // Get user setter from context
  const { enqueueSnackbar } = useSnackbar();
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
      profile_image: profileImage,
      status: true,
    };
    const response = await profileDetail(updatedProfile);
    if (response.code === 200) {
      setUser(`${updatedProfile.first_name} ${updatedProfile.last_name}`);
      localStorage.setItem("Email", JSON.stringify(profileEmail));
      enqueueSnackbar("Admin details updated successfully", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const profileimg = localStorage.getItem("profileImage");
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await updateProfile();
      if (response.code === 200) {
        const profileData = response.admin;
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setUser(`${profileData.first_name} ${profileData.last_name}`);
        setContactNumber(profileData.contact_number);
        const email = JSON.parse(localStorage.getItem("Email"));
        setProfileEmail(email || "");
        setProfileImage(profileData.profile_image || "");
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    };

    fetchProfileData();
  }, [setProfileImage, setUser, enqueueSnackbar]);

  return (
    <div className="p-3">
      {/* <HeaderWithBackButton title="Edit Profile" path="/dashboard" /> */}
      <div className="ProfileContainer">
        <div className="Position_update">
          <StyledAvatar alt="Profile Image" src={profileImage || profileimg} />
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
            label="First Name"
            variant="standard"
            size="small"
            fullWidth
            value={firstName}
            margin="normal"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="standard"
            size="small"
            fullWidth
            value={lastName}
            margin="normal"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="Contact Number"
            type="tel"
            variant="standard"
            size="small"
            fullWidth
            value={contactNumber}
            margin="normal"
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <div className="col-12 d-flex justify-content-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
