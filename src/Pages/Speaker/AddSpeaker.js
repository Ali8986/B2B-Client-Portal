import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormInput from "../../Components/GeneralComponents/FormInput";
import profile from "../../Assets/Images/profile.jpg";
import BackButton from "../../Components/GeneralComponents/backButton";

function AddSpeaker() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    company: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    navigate("/speaker");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
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
          <div className="col-2 p-0">
            <BackButton />
          </div>
          <h2
            style={{
              color: "#7396cc",
              marginBottom: "5px",
            }}
          >
            Add Speaker
          </h2>

          <div className="col-6 col-lg-6">
            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 col-lg-6">
            <FormInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
          </div>

          <div className="col-6 col-lg-6">
            <FormInput
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="col-6 col-lg-6">
            <FormInput
              label="Conpany Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="col-6">
            <FormInput
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              type="tel"
            />
          </div>

          {/* Image Upload Section */}
          <div className="col-12 flex-wrap d-flex justify-content-between align-items-center pb-3 mt-4">
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

          <div className="col-12 d-flex justify-content-between mt-3">
            <p className="h6">
              Image Name:{" "}
              {imageName ? imageName.name : " no image uploaded yet"}
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
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddSpeaker;
