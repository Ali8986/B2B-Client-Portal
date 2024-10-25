import { useEffect, useState } from "react";
import {
  ImageUpload,
  Module_Configuration_Details,
  S3ImageDeletion,
  Update_Module_Data,
} from "../../../DAL/Login/Login";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HeaderWithBackButton from "../../../Components/backButton";
import Avatar from "@mui/material/Avatar";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormInput from "../../../Components/GeneralComponents/FormInput";
import { useSnackbar } from "notistack";
import { Button, CircularProgress } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import ReactEditorComponent from "../../../Components/GeneralComponents/ReactTextEditor";

const UpdateWebModData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [WebModuleData, setWebModuleData] = useState([]);
  const [formData, setFormData] = useState({});
  const [modId, setModId] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (event, attribute) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [attribute.attribute_db_name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
    const imageData = new FormData();
    imageData.append("image", file);
    const response = await ImageUpload(imageData);
    if (response.code === 200) {
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleEditorChange = (value, attributeName) => {
    setFormData((prevData) => ({
      ...prevData,
      [attributeName]: value.trim() === "<br>" ? "" : value,
    }));
  };

  const handleImageDelete = async (e, attribute) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [attribute.attribute_db_name]: "",
    }));
    const ImageTODelete = {
      path: [
        {
          Key: formData.media,
        },
      ],
    };
    const response = await S3ImageDeletion(ImageTODelete);
    if (response.code === 200) {
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const imageAttributes = WebModuleData?.filter(
    (attribute) => attribute.attribute_type === "file"
  );

  const editorAttributes = WebModuleData?.filter(
    (attribute) => attribute.attribute_type === "editor"
  );

  const inputAttributes = WebModuleData?.filter(
    (attribute) => attribute.attribute_type === "input"
  );

  const validateForm = () => {
    let hasError = false;

    const validateAttributes = (attributes) => {
      attributes.forEach((attribute) => {
        const currentValue = formData[attribute.attribute_db_name] || "";
        if (attribute.required && !currentValue) {
          enqueueSnackbar(`${attribute.attribute_label} is required`, {
            variant: "error",
          });
          hasError = true;
        }
      });
    };

    validateAttributes(imageAttributes);
    validateAttributes(editorAttributes);
    validateAttributes(inputAttributes);

    return hasError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    if (validateForm()) {
      setBtnLoading(false);
      return;
    }

    const postData = {
      module_data: formData,
    };

    const response = await Update_Module_Data(modId, postData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate(-1);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setBtnLoading(false);
  };

  const FetchWebModuleDetails = async () => {
    const response = await Module_Configuration_Details(id);
    if (response.code === 200) {
      setModId(state._id);
      setWebModuleData(
        response?.module_configuration?.module_configuration_attributes_info
      );
      setTitle(response?.module_configuration?.module_configuration_name);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (state.module_data) {
      setFormData(state?.module_data);
    }
    FetchWebModuleDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center circular_progress_bar'>
          <CircularProgress />
        </div>
      ) : (
        <div className='px-3 px-md-4 py-1 py-md-3'>
          <form className='row p-4' onSubmit={handleSubmit}>
            <HeaderWithBackButton title={`Update ${title} Data`} path='empty' />

            {/* Input Fields */}
            {inputAttributes?.map((attribute, index) => (
              <div key={index} className='col-6'>
                <FormInput
                  required={false}
                  label={
                    attribute.required
                      ? `${attribute.attribute_label}*`
                      : attribute.attribute_label
                  }
                  variant='outlined'
                  name={attribute.attribute_db_name}
                  value={formData[attribute.attribute_db_name] || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            {/* Image Uploads */}
            {imageAttributes?.map((attribute, index) => (
              <>
                <div
                  key={index}
                  className='col-12 d-flex justify-content-between align-items-center py-3 mt-4'
                >
                  <div className='col-12 col-lg-4 pb-2'>
                    <h4 className='h5'>
                      {attribute.required
                        ? `${attribute.attribute_label}*`
                        : attribute.attribute_label}
                    </h4>
                    <p className='h6'>
                      {`Image Size (${attribute.width} X ${
                        attribute.height
                      }) (${attribute.image_extension
                        .map(
                          (format) =>
                            `"${format.toUpperCase().replace(".", "")}"`
                        )
                        .join(", ")})`}
                    </p>
                  </div>
                  <div className='col-4 col-lg-4 position-relative'>
                    {formData[attribute.attribute_db_name] && (
                      <>
                        <Avatar
                          sx={{ width: 70, height: 70, borderRadius: 0 }}
                          src={
                            formData[attribute.attribute_db_name] || undefined
                          }
                        />
                        {!attribute.required ? (
                          <IconButton
                            className='Img_Btn_Delete position-absolute'
                            onClick={(e) => handleImageDelete(e, attribute)}
                          >
                            <CancelIcon className='image_Delete' />
                          </IconButton>
                        ) : null}
                      </>
                    )}
                  </div>
                  <div className='Upload-input-field'>
                    <input
                      accept='image/*'
                      style={{ display: "none" }}
                      id={`upload-button-${index}`}
                      type='file'
                      onChange={(e) => handleImageChange(e, attribute)}
                    />
                    <label
                      htmlFor={`upload-button-${index}`}
                      className='User_Image_Edit d-flex align-items-center'
                    >
                      <FileUploadIcon className='Upload-btn' />
                      <div className='ps-1'>Upload</div>
                    </label>
                  </div>
                </div>
                <div className='images_box mb-1'></div>
              </>
            ))}
            {/* Editor Fields */}
            {editorAttributes?.map((attribute, index) => (
              <div
                key={`${attribute.attribute_db_name}_${index}`}
                className='col-12 mt-3'
              >
                <ReactEditorComponent
                  value={formData[attribute.attribute_db_name] || ""}
                  onChange={(value) =>
                    handleEditorChange(value, attribute.attribute_db_name)
                  }
                  attributeLabel={attribute.attribute_label}
                  attributeState={attribute.required}
                />
              </div>
            ))}

            <div className='col-12 d-flex flex-wrap justify-content-end mt-4'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                disabled={btnLoading}
                style={{ backgroundColor: "#7396CC" }}
              >
                {btnLoading ? (
                  <div className='d-flex align-items-center'>
                    <CircularProgress size={15} className='color' />
                    <p className='ms-2 mb-0 font-size'>Submitting...</p>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateWebModData;
