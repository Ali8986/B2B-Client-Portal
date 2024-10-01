import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import profile from "../../Assets/Images/profile.jpg";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";

function EditUser() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    jobTitle: "",
    company: "",
    bio: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/exhibitors");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      console.log("Image uploaded successfully:", image);
      setImageName(file);
      setImage(newImageURL);
      setFormData((prevData) => {
        return { ...prevData, profileImage: newImageURL };
      });
    } else {
      console.error("No image selected");
    }
  };

  return (
    <div className="px-3 px-md-4 py-1 py-md-3">
      <form onSubmit={handleSubmit}>
        <div className="row p-0 p-lg-3 mt-5 mt-md-2">
          <HeaderWithBackButton title="Add Exhibitor" path="/exhibitors" />
          <div className="col-6 col-lg-6">
            <FormInput
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-6 col-lg-6">
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormInput
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormInput
              label="Job Title"
              name="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FormInput
              label="Address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FormInput
              label="Company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-12 pb-4">
            <FormInput
              label="Bio"
              name="bio"
              type="text"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 flex-wrap d-flex justify-content-between align-items-center pb-3">
            <div className="col-12 col-lg-4 pb-3 pb-lg-0">
              <h4 className="h5">Upload Image</h4>
              <p className="h6">
                Image Size(350 X 100) ("JPG", "JPEG", "PNG", "WEBP")
              </p>
            </div>
            <div className="col-4 col-lg-4 pb-3 pb-lg-0">
              <Avatar
                sx={{ width: 70, height: 70, borderRadius: 0 }}
                src={image || profile}
              >
                A
              </Avatar>
            </div>
            <div className="Upload-input-field">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-button"
                type="file"
                onChange={handleImageChange}
              />
              <label
                htmlFor="upload-button"
                className="User_Image_Edit d-flex align-items-center"
              >
                <FileUploadIcon className="Upload-btn" />
                <div className="ps-1">upload</div>
              </label>
            </div>
          </div>
          <hr />
          <div className="col-12 d-flex flex-wrap justify-content-between mt-3">
            <p className="h6">
              Image Name: {imageName ? imageName.name : profile}
            </p>
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
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
