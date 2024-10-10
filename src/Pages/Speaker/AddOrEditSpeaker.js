import React, { useState, useEffect } from "react";
import { Avatar, Button, MenuItem, Select, TextField } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  AddingSpeaker,
  EditingSpeaker,
  SpeakerDetails,
} from "../../DAL/Login/Login";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { s3baseUrl } from "../../config/config";
import PhoneInput from "react-phone-number-validation";

function AddEditSpeaker({ type }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [phoneNumber, setPhoneNumber] = useState("");
  const locaion = useLocation();
  const { state } = locaion;
  const [ProfileImage, setProfileImage] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
    expertise: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormateData = (data) => {
    setFormData((prev) => ({
      ...prev,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || "",
      bio: data.bio,
      expertise: data.expertise,
      status: data.status,
      image: data.image,
    }));
    setPhoneNumber(data.phone || "");
  };
  const handlePhoneChange = (value) => {
    console.log(value);
    setPhoneNumber(value);
    setFormData((prev) => ({ ...prev, phone: value })); // Form data update
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setProfileImage(newImageURL);
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formattedFormData = {
      ...formData,
      expertise: formData.expertise.toString(),
      phone: formData.phone,
    };

    if (!(formData.image instanceof File)) {
      delete formattedFormData.image;
    }
    const response =
      type === EditingSpeaker
        ? await EditingSpeaker(id, formattedFormData)
        : await AddingSpeaker(formattedFormData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/speakers");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };
  const GetSpeakerDetails = async () => {
    const response = await SpeakerDetails(id);
    if (response.code === 200) {
      handleFormateData(response.company);
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  useEffect(() => {
    if (state) {
      handleFormateData(state);
    } else if (type === EditingSpeaker) {
      GetSpeakerDetails();
    }
  }, [type, state]);
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
          <CircularProgress />
        </div>
      ) : (
        <div className="px-3 px-md-4 py-1 py-md-3">
          <form onSubmit={handleSubmit}>
            <div className="row p-0 p-lg-3 mt-5 mt-md-2">
              <HeaderWithBackButton
                title={type === EditingSpeaker ? "Edit Speaker" : "Add Speaker"}
                path="/speakers"
              />
              <div className="col-6 col-lg-6">
                <FormInput
                  label="First Name"
                  variant="outlined"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6 col-lg-6">
                <FormInput
                  label="Last Name"
                  variant="outlined"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6">
                <FormInput
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  required
                />
              </div>
              <div className="col-6 d-flex flex-column justify-content-center">
                <PhoneInput
                  dropdownClass="select-div2"
                  required={true}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  setValue={setPhoneNumber}
                  enableSearch={true}
                />
              </div>
              <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
                <Select
                  name="status"
                  value={formData.status ?? true}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true} selected>
                    Active
                  </MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </div>
              <div className="col-12 col-lg-6">
                <FormInput
                  label="Expertise (comma separated)"
                  variant="outlined"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Engineering, Public Speaking"
                  required
                />
              </div>
              <div className="col-12">
                <TextField
                  label="Bio"
                  fullWidth
                  variant="outlined"
                  name="bio"
                  className="mt-2"
                  value={formData.bio}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  required
                />
              </div>
              <div className="col-12 flex-wrap d-flex justify-content-between align-items-center mt-4 pt-1 mb-2">
                <div className="col-12 col-lg-4 pb-3 pb-lg-0">
                  <h4 className="h5">Upload Image</h4>
                  <p className="h6">
                    Image Size(350 X 100) ("JPG", "JPEG", "PNG", "WEBP")
                  </p>
                </div>
                <div className="col-4 col-lg-4 pb-3 pb-lg-0">
                  {formData.image ? (
                    <Avatar
                      sx={{ width: 70, height: 70, borderRadius: 0 }}
                      src={
                        ProfileImage
                          ? ProfileImage
                          : `${s3baseUrl}${formData.image.thumbnail_1}`
                      }
                    >
                      A
                    </Avatar>
                  ) : (
                    <div>{null}</div>
                  )}
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
              <div className="hr"></div>
              <div className="col-12 d-flex flex-wrap justify-content-end mt-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  style={{ backgroundColor: "#7396CC" }}
                >
                  {loading ? (
                    type === EditingSpeaker ? (
                      <div className="d-flex align-items-center">
                        <CircularProgress size={15} className="color" />
                        <p className="ms-2 mb-0 font-size">Update</p>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <CircularProgress size={15} className="color" />
                        <p className="ms-2 mb-0 font-size">Submit</p>
                      </div>
                    )
                  ) : type === EditingSpeaker ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddEditSpeaker;
