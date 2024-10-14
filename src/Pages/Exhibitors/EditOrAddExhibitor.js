import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import profile from "../../Assets/Images/profile.jpg";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";
import {
  AddingExhibitor,
  EditingExhibitor,
  ExhibitorDetails,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import { s3baseUrl } from "../../config/config";
// import PhoneInput from "react-phone-number-validation";

function EditOrAddExhibitor({ type }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [phoneNumber, setPhoneNumber] = useState("");
  const locaion = useLocation();
  const { state } = locaion;
  const [loading, setLoading] = useState(false);
  const [ProfileImage, setProfileImage] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    products_services: [], // Initialize as an empty array
    booth: "",
    company: {
      _id: "6703ad92957ac08c04607764",
      name: "",
      website: "",
    },
    status: "Pending",
    image: null,
    social_links: [], // Initialize social_links as an empty array
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormateData = (data) => {
    setFormData((prev) => ({
      ...prev,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      products_services: data.products_services || [], // Ensure this is an array
      booth: data.booth,
      status: data.status,
      company: {
        _id: data.company._id,
        name: data.company.name,
        website: data.company.website,
      },
      image: data.image || null, // Set image to null if not present
      social_links: data.social_links || [], // Initialize social_links as an empty array
    }));

    setPhoneNumber(data.phone);
  };

  const handlePhoneChange = (value, country) => {
    setPhoneNumber(value);
    setFormData((prev) => ({ ...prev, phone: value })); // Form data update
  };

  const handleRender = (value, country) => {};

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

    const formDataas = new FormData();
    formDataas.append("email", formData.email);
    formDataas.append("phone", formData.phone);
    formDataas.append(
      "products_services",
      JSON.stringify(formData.products_services)
    );
    formDataas.append("status", formData.status);
    formDataas.append("booth", formData.booth);
    formDataas.append("name", formData.name);
    formDataas.append("company", JSON.stringify(formData.company));

    if (formData.image && formData.image instanceof File) {
      formDataas.append("image", formData.image);
    }

    const response =
      type === EditingExhibitor
        ? await EditingExhibitor(id, formDataas)
        : await AddingExhibitor(formDataas);

    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/exhibitors");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };
  const GetExhibitorDetails = async () => {
    const response = await ExhibitorDetails(id);
    if (response.code === 200) {
      handleFormateData(response.exhibitor);
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  useEffect(() => {
    if (state) {
      handleFormateData(state.user);
    } else if (type === EditingExhibitor) {
      GetExhibitorDetails();
    }
  }, [type, state]);

  return (
    <div className="px-3 px-md-4 py-1 py-md-3">
      <form onSubmit={handleSubmit}>
        <div className="row p-0 p-lg-3 mt-5 mt-md-2">
          <HeaderWithBackButton
            title={
              type === EditingExhibitor ? "Edit Exhibitor" : "Add Exhibitor"
            }
            path="/exhibitors"
          />
          <div className="col-6 col-lg-6">
            <FormInput
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-6 col-lg-6">
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="col-6 d-flex flex-column justify-content-center">
            <PhoneInput
              dropdownClass="select-div2"
              country="pk"
              countryCodeEditable={false}
              required={true}
              value={phoneNumber}
              onChange={handlePhoneChange}
              setValue={setPhoneNumber}
              enableSearch={true}
            />
          </div> */}
          <div className="col-6">
            <FormInput
              label="Display Space"
              name="booth"
              type="text"
              value={formData.booth}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FormInput
              label="Expertise"
              name="products_services"
              type="text"
              value={formData.products_services}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FormInput
              required={false}
              label="Company Name"
              name="name"
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
              required={false}
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
              onChange={handleInputChange}
            >
              <MenuItem value="Pending" selected>
                Pending
              </MenuItem>
              <MenuItem value="Confirmed" selected>
                Confirmed
              </MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </div>
          <div className="col-12 flex-wrap d-flex justify-content-between align-items-center my-3">
            <div className="col-12 col-lg-4 pb-3 pb-lg-0">
              <h4 className="h5">Upload Image</h4>
              <p className="h6">
                Image Size (670 X 1000) ("JPG", "JPEG", "PNG", "WEBP","GIF")
              </p>
            </div>
            <div className="col-4 col-lg-4 pb-3 pb-lg-0">
              {formData.image ? (
                <Avatar
                  sx={{ width: 70, height: 70, borderRadius: 0 }}
                  src={
                    ProfileImage
                      ? ProfileImage
                      : `${s3baseUrl}${formData.image?.thumbnail_1 || ""}`
                  }
                >
                  A
                </Avatar>
              ) : null}
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
          <div className=" border-bottom"></div>
          <div className="col-12 d-flex flex-wrap justify-content-end mt-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              style={{ backgroundColor: "#7396CC" }}
            >
              {loading ? (
                type === EditingExhibitor ? (
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
              ) : type === EditingExhibitor ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditOrAddExhibitor;
