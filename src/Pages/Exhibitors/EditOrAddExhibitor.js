import React, { useEffect, useState } from "react";
import { Avatar, Button, MenuItem, Select } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import profile from "../../Assets/Images/profile.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";
import { AddingExhibitor } from "../../DAL/Login/Login";

function EditOrAddExhibitor() {
  const location = useLocation();
  const { state } = location;
  const isEditing = !!state;
  console.log(state);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    products_services: "",
    booth: "",
    company: {
      _id: `${new Date().getTime().toString()}`,
      name: "",
      website: "",
    },
    status: "",
  });

  useEffect(() => {
    if (isEditing && state) {
      const useData = state.user;
      setFormData({
        name: useData.name,
        email: useData.email,
        phone: useData.phone,
        products_services: useData.products_services,
        booth: useData.booth,
        company: {
          name: useData.company.name,
          website: useData.company.website,
        },
        status: useData.status,
      });
    }
  }, [isEditing, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedFormData = {
      ...formData,
    };
    const response = await AddingExhibitor(formattedFormData);
    if (response.code === 200) {
      alert("Exhibitor added successfully");
    } else {
      alert("Failed to add exhibitor");
    }
    console.log(formData);
    // navigate("/exhibitors");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      console.log("Image uploaded successfully:", image);
      setImageName(file);
      setImage(newImageURL);
      // setFormData((prevData) => {
      //   return { ...prevData, profileImage: newImageURL };
      // });
    } else {
      console.error("No image selected");
    }
  };

  return (
    <div className="px-3 px-md-4 py-1 py-md-3">
      <form onSubmit={handleSubmit}>
        <div className="row p-0 p-lg-3 mt-5 mt-md-2">
          <HeaderWithBackButton
            title={isEditing ? "Edit Speaker" : "Add Speaker"}
            path="/exhibitors"
          />
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
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormInput
              label="Booth"
              name="booth"
              type="text"
              value={formData.booth}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FormInput
              label="Product Services"
              name="products_services"
              type="text"
              value={formData.products_services}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FormInput
              label="Company Name"
              name="company_name"
              type="text"
              value={formData.company.name}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  company: { ...prevData.company, name: e.target.value },
                }))
              }
            />
          </div>
          <div className="col-12 col-lg-6">
            <FormInput
              label="Website Link"
              name="website"
              type="url"
              value={formData.company.website} // Add company URL
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  company: { ...prevData.company, website: e.target.value },
                }))
              }
            />
          </div>
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
            <Select
              name="status"
              value={formData.status ?? true}
              onChange={handleChange}
            >
              <MenuItem value="Pending" selected>
                Pending
              </MenuItem>
              <MenuItem value="Confirmed" selected>
                Confirmed
              </MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
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
              {isEditing ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditOrAddExhibitor;
