import { useEffect, useState } from "react";
import {
  ImageUpload,
  S3ImageDeletion,
  Updating_page_Details,
  Website_Pages_Details,
} from "../../DAL/Login/Login";
import { useNavigate, useParams } from "react-router-dom";
import HeaderWithBackButton from "../../Components/backButton";
import Avatar from "@mui/material/Avatar";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormInput from "../../Components/GeneralComponents/FormInput";
import { s3baseUrl } from "../../config/config";
import { useSnackbar } from "notistack";
import { Button, CircularProgress } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import ReactEditorComponent from "../../Components/GeneralComponents/ReactTextEditor";

const UpdatePageContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  const [formData, setFormData] = useState({});
  const [pageId, setPageId] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (event, attribute) => {
    const file = event.target.files[0];
    const imageData = new FormData();
    imageData.append("image", file);
    const response = await ImageUpload(imageData);
    if (response.code === 200) {
      setFormData((prevData) => ({
        ...prevData,
        [attribute.attribute_db_name]: s3baseUrl + response.path,
      }));
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

  const imageAttributes = templateData?.template_attributes_info?.filter(
    (attribute) => attribute.attribute_type === "file"
  );

  const editorAttributes = templateData?.template_attributes_info?.filter(
    (attribute) => attribute.attribute_type === "editor"
  );

  const inputAttributes = templateData?.template_attributes_info?.filter(
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
      page_details: formData,
    };

    const response = await Updating_page_Details(pageId, postData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate(`/website-pages`);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setBtnLoading(false);
  };

  const fetchTemplateDetails = async () => {
    const response = await Website_Pages_Details(id);
    if (response.code === 200) {
      setTemplateData(response.website_page.template);
      setPageId(response.website_page._id);
      setFormData({
        ...response.website_page.page_details,
        template_id: response.website_page.template._id,
      });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplateDetails();
    // eslint-disable-next-line
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
            <HeaderWithBackButton
              title='Update Page Content'
              path='/website-pages'
            />

            {/* Image Uploads */}
            {imageAttributes?.map((attribute, index) => (
              <>
                <div
                  key={index}
                  className='col-12 d-flex justify-content-between align-items-center py-3'
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
                <div className='images_box'></div>
              </>
            ))}

            <div className='mb-3'></div>

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

            {/* Editor Fields */}
            {editorAttributes?.map((attribute, index) => (
              <div
                key={`${attribute.attribute_db_name}_${index}`}
                className='col-12 mt-4'
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

export default UpdatePageContent;
