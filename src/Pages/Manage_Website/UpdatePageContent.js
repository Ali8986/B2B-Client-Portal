import { useEffect, useState } from "react";
import { Template_Configuration_Details } from "../../DAL/Login/Login";
import { useParams } from "react-router-dom";
import HeaderWithBackButton from "../../Components/backButton";
import Avatar from "@mui/material/Avatar";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormInput from "../../Components/GeneralComponents/FormInput";

const UpdatePageContent = () => {
  const { id } = useParams();
  const [TemplateData, SetTemplateData] = useState([]);

  const FetchTemplatedDetails = async () => {
    const response = await Template_Configuration_Details(id);
    if (response.code === 200) {
      SetTemplateData(response.template_configuration);
    } else {
      console.error("Failed to fetch template data: ", response.message);
    }
  };

  useEffect(() => {
    FetchTemplatedDetails();
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  // Separate image and editor content
  const imageAttributes = TemplateData?.template_attributes_info?.filter(
    (attribute) => attribute.attribute_type === "file"
  );

  const editorAttributes = TemplateData?.template_attributes_info?.filter(
    (attribute) => attribute.attribute_type === "editor"
  );
  const inputAttributes = TemplateData?.template_attributes_info?.filter(
    (attribute) => attribute.attribute_type === "input"
  );
  //   const input

  return (
    <div className='px-3 px-md-4 py-1 py-md-3'>
      <form className='row'>
        <div className='row p-0 p-lg-3 mt-5 mt-md-2'>
          <HeaderWithBackButton
            title='Update Page Content'
            path='/website-pages'
          />

          {/* First, render all image upload sections */}
          {imageAttributes?.map((attribute, index) => (
            <>
              <div
                key={index + 10}
                className='col-12 flex-wrap d-flex justify-content-between align-items-center pb-3 pt-5 mb-2'
              >
                <div className='col-12 col-lg-4 pb-3 pb-lg-0'>
                  <h4 className='h5'>{attribute.attribute_label}</h4>
                  <p className='h6'>
                    {`Image Size (${attribute.width} X ${
                      attribute.height
                    }) (${attribute.image_extension
                      .map(
                        (format) => `"${format.toUpperCase().replace(".", "")}"`
                      )
                      .join(", ")})`}
                  </p>
                </div>
                <div className='col-4 col-lg-4 pb-3 pb-lg-0'>
                  <Avatar sx={{ width: 70, height: 70, borderRadius: 0 }}>
                    A
                  </Avatar>
                </div>
                <div className='Upload-input-field'>
                  <input
                    accept='image/*'
                    style={{ display: "none" }}
                    id={`upload-button-${index}`}
                    type='file'
                    onChange={handleImageChange}
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
              <div className='Divider' />
            </>
          ))}
          <div className='row mt-3'>
            {editorAttributes?.map((attribute, index) => (
              <div key={index + 1} className='col-6'>
                <FormInput
                  label={attribute.attribute_label}
                  variant='outlined'
                  // name='website_page_title'
                  // // value={PagesData.website_page_title || ""}
                  // // onChange={handleInputChange}
                  // // required
                />
              </div>
            ))}
          </div>
          <div className='row mt-3'>
            {/* Then, render all input content after editor */}
            {inputAttributes?.map((attribute, index) => (
              <div key={index + 2} className='col-6'>
                <FormInput
                  label={attribute.attribute_label}
                  variant='outlined'
                  // name='website_page_title'
                  // // value={PagesData.website_page_title || ""}
                  // // onChange={handleInputChange}
                  // // required
                />
                {/* You can render other editor-specific content here */}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePageContent;
