import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
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
import PhoneInput from "react-phone-number-validation";
import SocialLinksField from "../../Components/GeneralComponents/SocialLinksInput";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TagsInputField from "../../Components/GeneralComponents/React_Input_Tags_Field";
function EditOrAddExhibitor({ type }) {
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
  const [loading, setLoading] = useState(false);
  const [ProfileImage, setProfileImage] = useState(null);
  const { id } = useParams();
  const Company = JSON.parse(localStorage.getItem("company"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    products_services: [], // Initialize as an empty array
    booth: "",
    company: {
      _id: Company?._id,
      name: Company?.name,
      website: Company?.website,
    },
    status: "Pending",
    image: null,
    social_links: [
      // Initialize as an array of objects
      { platform: "LinkedIn", url: "" },
      { platform: "Facebook", url: "" },
      { platform: "Twitter", url: "" },
      { platform: "Pinterest", url: "" },
    ], // Initialize social_links as an empty array
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
      image: data.image || null, // Set image to null if not present
      social_links: data.social_links || [], // Initialize social_links as an empty array
    }));
    setPhoneNumber(data.phone);
  };

  const handlePhoneChange = (value, country) => {
    setPhoneNumber(value);
    setFormData((prev) => ({ ...prev, phone: value })); // Form data update
  };

  const handleTagsChange = (tags) => {
    setFormData((prev) => ({ ...prev, products_services: tags })); // Update expertise as tags
  };

  const handleSocialLinkChange = (index, url) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks[index].url = url; // Update the URL for the specific index
    setFormData((prev) => ({ ...prev, social_links: updatedLinks }));
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

    const EmptySocialLinks = formData.social_links.map(
      (social_link) => social_link.url !== ""
    );
    if (EmptySocialLinks.length > 0) {
      setLoading(false);
      formData.social_links = [];
    }

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

    if (formData.social_links && formData.social_links.length) {
      formDataas.append("social_links", JSON.stringify(formData.social_links));
    }

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
    // eslint-disable-next-line
  }, [type, state]);

  return (
    <div className='px-3 px-md-4 py-1 py-md-3'>
      <form onSubmit={handleSubmit}>
        <div className='row p-0 p-lg-3 mt-5 mt-md-2'>
          <HeaderWithBackButton
            title={
              type === EditingExhibitor ? "Edit Exhibitor" : "Add Exhibitor"
            }
            path='/exhibitors'
          />
          <div className='col-6 col-lg-6'>
            <FormInput
              label='Name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='col-6 col-lg-6'>
            <FormInput
              label='Email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='col-6 d-flex flex-column justify-content-center'>
            <PhoneInput
              dropdownClass='select-div2'
              country='pk'
              countryCodeEditable={false}
              required={true}
              value={phoneNumber}
              onChange={handlePhoneChange}
              setValue={setPhoneNumber}
              enableSearch={true}
              autoSelectCountry={true}
            />
          </div>
          <div className='col-6'>
            <FormInput
              label='Exhibit Space'
              name='booth'
              type='text'
              value={formData.booth}
              onChange={handleInputChange}
            />
          </div>
          <div className='col-12 col-lg-6 d-flex flex-column justify-content-center'>
            <FormInput
              disabled={true}
              label='Company Name'
              name='name'
              required={false}
              type='text'
              value={formData.company.name} // Add company URL
            />
          </div>
          <div className='col-12 col-lg-6'>
            <FormInput
              disabled={true}
              label='Website Link'
              name='website'
              required={false}
              type='text'
              value={formData.company.website} // Add company URL
            />
          </div>
          <div className='col-12 col-lg-6 d-flex flex-column justify-content-center mt-2'>
            <FormControl required={true}>
              <Select
                required={true}
                name='status'
                value={formData.status ?? true}
                onChange={handleInputChange}
              >
                <MenuItem value='Pending' selected>
                  Pending
                </MenuItem>
                <MenuItem value='Confirmed' selected>
                  Confirmed
                </MenuItem>
                <MenuItem value='Cancelled'>Cancelled</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='col-12 mt-3'>
            <TagsInputField
              label='Products and Services'
              value={formData.products_services}
              onChange={handleTagsChange}
              placeholder='Enter Products and Services...'
            />
          </div>
          <div className='col-12 flex-wrap d-flex justify-content-between align-items-center my-3'>
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
                      : `${s3baseUrl}${formData.image?.thumbnail_1 || ""}`
                  }
                >
                  A
                </Avatar>
              ) : null}
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
          <div className='images_box'></div>
          {formData.social_links.map((link, index) => (
            <div className='col-6 mt-3' key={index}>
              <SocialLinksField
                label={`${link.platform}`}
                variant='outlined'
                value={link.url}
                icon={platformIcons[link.platform]}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                fullWidth
              />
            </div>
          ))}
          <div className='col-12 d-flex flex-wrap justify-content-end mt-4'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              disabled={loading}
              style={{ backgroundColor: "#7396CC" }}
            >
              {loading ? (
                type === EditingExhibitor ? (
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
