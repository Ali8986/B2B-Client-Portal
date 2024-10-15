import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  AddingCompany,
  EditingCompany,
  CompanyDetails,
  ImageUploadSpecificDirectory,
} from "../../DAL/Login/Login";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { s3baseUrl } from "../../config/config";
import PhoneInput from "react-phone-number-validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

function AddorEditCompany({ type }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ProfileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    website: "",
    industry: "",
    founded_date: dayjs(new Date()),
    employees_count: "",
    address: "",
    image: null,
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const locaion = useLocation();
  const { id } = useParams();
  const { state } = locaion;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleFormateData = (data) => {
    setFormData((prev) => ({
      ...prev,
      name: data.name,
      email: data.user.email,
      phone: data.phone || "",
      website: data.website,
      founded_date: dayjs(data.founded_date, "YYYY:MM:DD"),
      industry: data.industry,
      status: data.status,
      address: data.address,
      employees_count: data.employees_count || "",
      image: data.image,
    }));
    setPhoneNumber(data.phone || "");
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setFormData((prev) => ({ ...prev, phone: value })); // Form data update
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Prepare data for image upload
      const FormDat = {
        image: file,
        directory_name: "company",
      };

      // Call the image upload API
      setLoading(true);
      const response = await ImageUploadSpecificDirectory(FormDat);
      if (response.code === 200) {
        setFormData((prev) => ({
          ...prev,
          image: {
            thumbnail_1: response.path.thumbnail_1,
            thumbnail_2: response.path.thumbnail_2 || "",
          },
        }));

        const newImageURL = URL.createObjectURL(file);
        setProfileImage(newImageURL);
        setLoading(false);
      } else {
        setLoading(false);
        enqueueSnackbar(response.message, { variant: "error" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formattedFormData = {
      ...formData,
      image: formData.image,
      founded_date: formData.founded_date.format("YYYY:MM:DD"),
      phone: formData.phone,
    };

    if (type === EditingCompany) {
      delete formattedFormData.password;
    }
    const response =
      type === EditingCompany
        ? await EditingCompany(id, formattedFormData)
        : await AddingCompany(formattedFormData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/company");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  const GetCompanyDetails = async () => {
    const response = await CompanyDetails(id);
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
    } else if (type === EditingCompany) {
      GetCompanyDetails();
    }
  }, [type, state]);

  return (
    <>
      <div className="px-3 px-md-4 py-1 py-md-3">
        <form onSubmit={handleSubmit}>
          <div className="row p-0 p-lg-3 mt-5 mt-md-2">
            <HeaderWithBackButton
              title={type === EditingCompany ? "Edit Company" : "Add Company"}
              path="/company"
            />
            <div className="col-6 col-lg-6">
              <FormInput
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
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
            <div className="col-6 d-flex flex-column justify-content-center my-2 Company_Phone_Input">
              <PhoneInput
                dropdownClass="select-div2"
                required={true}
                country="pk"
                value={phoneNumber}
                onChange={handlePhoneChange}
                setValue={setPhoneNumber}
                enableSearch={true}
              />
            </div>
            {type === AddingCompany ? (
              <div className="col-6 my-2">
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    name="password"
                    id="outlined-adornment-password"
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
            ) : null}
            <div
              className={type === EditingCompany ? "col-6 my-2" : "col-6 my-0"}
            >
              <FormInput
                label="Website Link"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <FormInput
                label="Industry"
                name="industry"
                required={true}
                type="text"
                value={formData.industry}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <FormInput
                label="Employees Count"
                name="employees_count"
                required={true}
                type="number"
                value={formData.employees_count}
                onChange={handleInputChange}
              />
            </div>
            <div
              className={
                type === EditingCompany
                  ? "col-6 d-flex flex-column justify-content-center my-3"
                  : "col-6 d-flex flex-column justify-content-center my-2"
              }
            >
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
            <div
              className={
                type === EditingCompany
                  ? "col-6 Data-Picker my-3"
                  : "col-6 Data-Picker my-2"
              }
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Founded Date"
                  value={formData.founded_date}
                  className="form-control"
                  onChange={(newValue) =>
                    handleDateChange("founded_date", newValue)
                  }
                />
              </LocalizationProvider>
            </div>
            <div className="col-12 my-2">
              <FormInput
                label="Address"
                name="address"
                required={true}
                type="text"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 flex-wrap d-flex justify-content-between align-items-center pb-3 pt-5 mb-2">
              <div className="col-12 col-lg-4 pb-3 pb-lg-0">
                <h4 className="h5">Upload Company's Logo</h4>
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
                        : `${s3baseUrl}${formData.image.thumbnail_1}`
                    }
                  ></Avatar>
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
            <div className="images_box px-0"></div>
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
                  type === EditingCompany ? (
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
                ) : type === EditingCompany ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddorEditCompany;
