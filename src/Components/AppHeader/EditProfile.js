import React, { useState, useEffect, useContext } from "react";
import { Button, Avatar, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ProfileImageContext } from "../../Hooks/createContext";
import {
  Company_Profile_Detail,
  ImageUploadSpecificDirectory,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import "../../Assets/Styles/EditProfile.css";
import { s3baseUrl } from "../../config/config";
import PhoneInput from "react-phone-number-validation";
import FormInput from "../GeneralComponents/FormInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const StyledAvatar = styled(Avatar)({
  width: "100px",
  height: "100px",
  marginBottom: "20px",
  position: "relative",
});

const EditProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const CompanyProfile = {
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    industry: "",
    employees_count: 30,
    founded_date: dayjs(new Date()),
    image: {
      thumbnail_1: profileImage,
    },
  };

  const [Profile, setProfile] = useState(CompanyProfile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Company_Profile_Detail(Profile);
    if (response.code === 200) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handlePhoneChange = (value, country) => {
    setPhoneNumber(value);
  };

  const handleDateChange = (name, date) => {
    setProfile({ ...Profile, [name]: date });
  };
  const getData = (data) => {
    setProfile((prev) => ({
      ...prev,
      name: data?.name,
      address: data?.address,
      phone: data?.phone,
      email: data?.user.email,
      website: data?.website,
      industry: data?.industry,
      employees_count: data?.employees_count,
      founded_date: dayjs(data?.founded_date),
    }));
    setPhoneNumber(data?.phone);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const newImageURL = URL.createObjectURL(file);
    setProfileImage(newImageURL);
    const imageData = {
      image: file,
      directory_name: "company",
    };
    const response = await ImageUploadSpecificDirectory(imageData);
    if (response.code === 200) {
      setProfile((prev) => {
        return {
          ...prev,
          image: { thumbnail_1: s3baseUrl + response.path.thumbnail_1 },
        };
      });
      // setProfileImage(response.path.thumbnail_1);
      localStorage.setItem("image", s3baseUrl + response.path.thumbnail_1);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    console.log(profileImage);
  };
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("Email"));
    const companyName = localStorage.getItem("name");
    const companyLogo = localStorage.getItem("image");
    const companyData = JSON.parse(localStorage.getItem("company"));
    if (email && companyLogo && companyName) {
      setProfileImage(companyLogo);
    }
    if (companyData) {
      getData(companyData);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='p-3 container'>
      <form onSubmit={handleSubmit} className='row m-4 justify-contentcenter'>
        <div className='ProfileContainer'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='Position_update'>
              <StyledAvatar
                alt='Profile Image'
                src={profileImage ? profileImage : Profile.image.thumbnail_1}
              />
              <Typography variant='h5' component='h1' gutterBottom>
                Edit Profile
              </Typography>
              <input
                accept='image/*'
                style={{ display: "none" }}
                id='upload-button'
                type='file'
                onChange={handleImageChange}
              />
              <label htmlFor='upload-button'>
                <IconButton
                  className='Profile-Image-Change'
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <CameraAltIcon />
                </IconButton>
              </label>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-6 mt-2'>
              <FormInput
                label='Name'
                variant='outlined'
                name='name'
                value={Profile.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='col-6 mt-2'>
              <FormInput
                label='Email'
                variant='outlined'
                name='email'
                value={Profile.email}
                onChange={handleInputChange}
                type='email'
                required
              />
            </div>
            <div className='col-6 mt-2'>
              <PhoneInput
                countryCodeEditable={false}
                autoSelectCountry={true}
                dropdownClass='select-div2'
                country='pk'
                required={true}
                inputClass='Phone_Input_Profile_Company'
                value={phoneNumber}
                onChange={handlePhoneChange}
                setValue={setPhoneNumber}
                enableSearch={true}
              />
            </div>
            <div className='col-6'>
              <FormInput
                label='Website Link'
                name='website'
                type='text'
                value={Profile.website}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-6'>
              <FormInput
                label='Industry'
                name='industry'
                required={true}
                type='text'
                value={Profile.industry}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-6'>
              <FormInput
                label='Employees Count'
                name='employees_count'
                required={true}
                type='number'
                value={Profile.employees_count}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-6 Data-Picker mt-2'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Founded Date'
                  value={Profile.founded_date}
                  className='form-control date_Picker_Profile'
                  onChange={(newValue) =>
                    handleDateChange("founded_date", newValue)
                  }
                />
              </LocalizationProvider>
            </div>
            <div className='col-12 my-2'>
              <FormInput
                multline={true}
                label='Address'
                name='address'
                required={true}
                type='text'
                value={Profile.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-12 d-flex justify-content-end'>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                sx={{ mt: 2 }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
