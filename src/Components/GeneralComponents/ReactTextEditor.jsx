import { enqueueSnackbar } from "notistack";
import React from "react";
import ReactEditor from "react-text-editor-kit";
import { s3baseUrl } from "../../config/config";
import { ImageUpload } from "../../DAL/Login/Login";

const ReactEditorComponent = ({
  value,
  onChange,
  attributeLabel,
  attributeState = true,
  placeholder,
}) => {
  let theme_config = {
    "background-color": "#fff",
    "border-color": "#c4c4c4",
    "text-color": "#414141",
    "toolbar-button-background": "#fff",
    "toolbar-text-color": "#414141",
    "toolbar-button-hover-background": "#efefef",
    "toolbar-button-selected-background": "#dee0e2",
    "svg-color": "#414141",
    "save-button-background": "#7c97c1",
  };
  const image_handler = async (e) => {
    let formData = new FormData();
    formData.append("image", e.image);
    formData.append("width", "600");
    const results = await ImageUpload(formData);
    if (results.code === 200) {
      return `${s3baseUrl}${results.path}`;
      enqueueSnackbar(results.message, { variant: "success" });
    } else {
      enqueueSnackbar(results.message, { variant: "error" });
    }
  };
  return (
    <div className='col-12'>
      <label htmlFor='ReactEditor' className='mb-2 mt-2'>
        <h4 className='m-0 p-0 editir_label'>
          {attributeState ? `${attributeLabel}*` : `${attributeLabel}`}
        </h4>
      </label>
      <ReactEditor
        value={value}
        onChange={onChange}
        image_handler={image_handler}
        placeholder={placeholder || "Enter Description Here..."}
        theme_config={theme_config}
      />
    </div>
  );
};

export default ReactEditorComponent;
