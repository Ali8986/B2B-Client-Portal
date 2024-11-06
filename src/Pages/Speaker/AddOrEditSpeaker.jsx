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
import SocialLinksField from "../../Components/GeneralComponents/SocialLinksInput";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TagsInputField from "../../Components/GeneralComponents/React_Input_Tags_Field";

function AddEditSpeaker({ type }) {
  const platformIcons = {
    Facebook: FacebookIcon,
    LinkedIn: LinkedInIcon,
    Twitter: XIcon,
    Pinterest: PinterestIcon,
  };
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
    status: true,
    expertise: [],
    social_links: [
      { platform: "Facebook", url: "" },
      { platform: "LinkedIn", url: "" },
      { platform: "Twitter", url: "" },
      { platform: "Pinterest", url: "" },
    ],
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // function extractPhoneParts(phoneNumber) {
  //   const match = phoneNumber.match(/^(\+\d+)\s*(\d+[-\d]+)/);
  //   if (match) {
  //     return {
  //       countryCode: match[1], // Extracts the country code
  //       phone: match[2], // Extracts the rest of the phone number
  //     };
  //   }
  //   return null;
  // }

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
      social_links: data.social_links || formData.social_links,
    }));
    setPhoneNumber(data.phone || "");
  };
  const handlePhoneChange = (value, country) => {
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

  const handleTagsChange = (tags) => {
    setFormData((prev) => ({ ...prev, expertise: tags })); // Update expertise as tags
  };

  const handleSocialLinkChange = (index, url) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks[index].url = url; // Update the URL for the specific index
    setFormData((prev) => ({ ...prev, social_links: updatedLinks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // eslint-disable-next-line
    formData.social_links.map((social_link) => {
      if (social_link.url === "") {
        delete social_link.url;
      }
    });
    const social_links = JSON.stringify(formData.social_links);
    const formattedFormData = {
      ...formData,
      social_links,
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
      // const result = extractPhoneParts(state.phone);
    } else if (type === EditingSpeaker) {
      // eslint-disable-next-line
      GetSpeakerDetails();
    }
    // eslint-disable-next-line
  }, [type, state]);
  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center circular_progress_bar '>
          <CircularProgress />
        </div>
      ) : (
        <div className='px-3 px-md-4 py-1 py-md-3'>
          <form onSubmit={handleSubmit}>
            <div className='row p-0 p-lg-3 mt-5 mt-md-2'>
              <HeaderWithBackButton
                title={type === EditingSpeaker ? "Edit Speaker" : "Add Speaker"}
                path='/speakers'
              />
              <div className='col-6 col-lg-6'>
                <FormInput
                  label='First Name'
                  variant='outlined'
                  name='first_name'
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='col-6 col-lg-6'>
                <FormInput
                  label='Last Name'
                  variant='outlined'
                  name='last_name'
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='col-6'>
                <FormInput
                  label='Email'
                  variant='outlined'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  type='email'
                  required
                />
              </div>
              <div className='col-6 d-flex flex-column justify-content-center'>
                <PhoneInput
                  countryCodeEditable={false}
                  autoSelectCountry={true}
                  dropdownClass='select-div2'
                  country='pk'
                  required={true}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  setValue={setPhoneNumber}
                  enableSearch={true}
                />
              </div>
              <div className='col-12 col-lg-6 d-flex flex-column justify-content-center mt-2'>
                <Select
                  name='status'
                  value={formData.status ?? true}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true} selected>
                    Active
                  </MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </div>
              <div className='col-12 mt-3'>
                <TagsInputField
                  label='Expertise'
                  value={formData.expertise}
                  onChange={handleTagsChange}
                  placeholder='Enter Expertise Here...'
                />
              </div>
              <div className='col-12 flex-wrap d-flex justify-content-between align-items-center pb-3 pt-5 mb-2'>
                <div className='col-12 col-lg-4 pb-3 pb-lg-0'>
                  <h4 className='h5'>Upload Image</h4>
                  <p className='h6'>
                    Image Size (670 X 1000) ("JPG", "JPEG", "PNG", "WEBP","GIF")
                  </p>
                </div>
                <div className='col-4 col-lg-4 pb-3 pb-lg-0'>
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
                <div className='Upload-input-field'>
                  <input
                    accept='image/*'
                    style={{ display: "none" }}
                    id='upload-button'
                    type='file'
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor='upload-button'
                    className='User_Image_Edit d-flex align-items-center'
                  >
                    <FileUploadIcon className='Upload-btn' />
                    <div className='ps-1'>upload</div>
                  </label>
                </div>
              </div>
              <div className='images_box px-0'></div>
              {formData.social_links.map((link, index) => (
                <div className='col-6 mt-3' key={index}>
                  <SocialLinksField
                    label={`${link.platform}`}
                    variant='outlined'
                    value={link.url}
                    icon={platformIcons[link.platform]}
                    onChange={(e) =>
                      handleSocialLinkChange(index, e.target.value)
                    }
                    fullWidth
                  />
                </div>
              ))}{" "}
              <div className='col-12 mt-2'>
                {type === EditingSpeaker && formData.bio === "" ? null : (
                  <div className='col-12 mt-2'>
                    <TextField
                      fullWidth
                      label='Bio'
                      multiline
                      rows={3}
                      variant='outlined'
                      name='bio'
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder='Enter your bio Here..'
                    />
                  </div>
                )}
              </div>
              <div className='col-12 d-flex flex-wrap justify-content-end mt-3'>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  disabled={loading}
                  style={{ backgroundColor: "#7396CC" }}
                >
                  {loading ? (
                    type === EditingSpeaker ? (
                      <div className='d-flex align-items-center'>
                        <CircularProgress size={15} className='color' />
                        <p className='ms-2 mb-0 font-size'>Update</p>
                      </div>
                    ) : (
                      <div className='d-flex align-items-center'>
                        <CircularProgress size={15} className='color' />
                        <p className='ms-2 mb-0 font-size'>Submit</p>
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
