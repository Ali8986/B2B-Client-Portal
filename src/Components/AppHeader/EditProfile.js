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
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const [firsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await updateProfile();
      if (response.code === 200) {
        const profileData = response.admin;
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setContactNumber(profileData.contact_number);
        const email = JSON.parse(localStorage.getItem("Email"));
        setProfileEmail(email || "");
        setProfileImage(profileData.profile_image || "");
        // enqueueSnackbar(response.message, { variant: "success" });
      } else {
        // enqueueSnackbar(response.message, { variant: "error" });
      }
    };

    fetchProfileData();
  }, [setProfileImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      first_name: firsName,
      last_name: lastName,
      contact_number: contactNumber,
      profile_image: profileImage,
      status: true,
    };
    const response = await profileDetail(updatedProfile);
    if (response.code === 200) {
      localStorage.setItem("Email", JSON.stringify(profileEmail));
      navigate("/dashboard");
      enqueueSnackbar("Admin details updated Successfuly", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
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
          label="First Name"
          name="name"
          variant="standard"
          size="small"
          fullWidth
          value={firsName}
          margin="normal"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          name="name"
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
          name="name"
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
