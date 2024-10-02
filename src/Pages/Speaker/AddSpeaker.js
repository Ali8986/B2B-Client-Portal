import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { /*Avatar*/ Button } from "@mui/material";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormInput from "../../Components/GeneralComponents/FormInput";
// import profile from "../../Assets/Images/profile.jpg";
import HeaderWithBackButton from "../../Components/backButton";
import { AddingSpeaker } from "../../DAL/Login/Login";

function AddSpeaker() {
  // const navigate = useNavigate();
  // const [image, setImage] = useState(null);
  // const [imageName, setImageName] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    email: "",
    phone: "",
    expertise: "",
    status: false,
    social_links: [
      { platform: "Twitter", url: "" },
      { platform: "LinkedIn", url: "" },
      { platform: "GitHub", url: "" },
      { platform: "Website", url: "" },
    ],
    // profile_image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks[index].url = value;
    setFormData((prevData) => ({ ...prevData, social_links: updatedLinks }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageName(file);
  //       setImage(reader.result);
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         profile_image: reader.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     console.error("No image selected");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const response = await AddingSpeaker(formData);
    if (response.code === 200) {
      console.log("success");
    } else {
      console.error("Error adding speaker");
    }
    // const response = await fetch("http://localhost:8000/members", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // if (response.ok) {
    //   navigate("/speakers");
    // } else {
    //   console.error("Error adding speaker");
    // }
  };

  return (
    <div className="px-3 px-md-4 py-1 py-md-3">
      <form onSubmit={handleSubmit}>
        <div className="row p-0 p-lg-3 mt-5 mt-md-2">
          <HeaderWithBackButton title="Add Speaker" path="/speakers" />

          {/* First Name */}
          <div className="col-6 col-lg-6">
            <FormInput
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="col-6 col-lg-6">
            <FormInput
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div className="col-12">
            <FormInput
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
            />
          </div>

          {/* Social Links */}
          {formData.social_links.map((link, index) => (
            <div key={index} className="col-6">
              <FormInput
                label={link.platform}
                value={link.url}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
              />
            </div>
          ))}

          {/* Email */}
          <div className="col-6">
            <FormInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
          </div>

          {/* Phone */}
          <div className="col-6">
            <FormInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
            />
          </div>

          {/* Expertise */}
          <div className="col-6">
            <FormInput
              label="Expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className="col-12 flex-wrap d-flex justify-content-between align-items-center pb-3 mt-4">
            {/* <div className="col-4 col-lg-4 pb-3 pb-lg-0">
              <Avatar
                sx={{ width: 70, height: 70, borderRadius: 0 }}
                src={image || profile}
              />
            </div> */}
            {/* <div className="Upload-input-field">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-button"
                type="file"
                // onChange={handleImageChange}
              />
              <label
                htmlFor="upload-button"
                className="User_Image_Edit d-flex align-items-center"
              >
                <FileUploadIcon className="Upload-btn" />
                <div className="ps-1">Upload</div>
              </label>
            </div> */}
          </div>

          <hr />

          <div className="col-12 d-flex justify-content-between mt-3">
            {/* <p className="h6">
              Image Name: {imageName ? imageName.name : "No image uploaded yet"}
            </p> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                minWidth: "100px",
                padding: "10px 15px",
                marginLeft: "10px",
              }}
            >
              Add Speaker
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddSpeaker;
