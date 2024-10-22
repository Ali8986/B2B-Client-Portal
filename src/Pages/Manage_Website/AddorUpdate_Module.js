import React, { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  Select,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Checkbox, ListItemText } from "@mui/material";
import {
  Creating_Module,
  Editing_Module,
  Module_Configuration_Details,
} from "../../DAL/Login/Login";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";

function AddOrUpdateModule({ type }) {
  const imageExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".JPG",
    ".JPEG",
    ".PNG",
    ".WEBP",
  ];

  const Module = {
    module_configuration_name: "",
    module_configuration_status: true,
    module_configuration_type: "",
    module_configuration_slug: "",
    module_configuration_attributes_info: [
      {
        attribute_type: "input",
        attribute_label: "",
        width: "",
        height: "",
        image_extension: [...imageExtensions],
        required: true,
        attribute_db_name: "",
        attribute_db_type: "string",
        // is_access: true,
      },
    ],
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;

  const [ModuleData, setModuleData] = useState(Module);
  const [loading, setLoading] = useState(false);

  const handleExtensionChange = (event, index) => {
    const { value } = event.target;
    const updatedAttributes = [
      ...ModuleData.module_configuration_attributes_info,
    ];
    updatedAttributes[index].image_extension = value;
    // Update ModuleData state
    setModuleData((prev) => ({
      ...prev,
      module_configuration_attributes_info: updatedAttributes,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModuleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [
      ...ModuleData.module_configuration_attributes_info,
    ];
    if (field === "attribute_label") {
      const dbName = value.toLowerCase().replace(/\s+/g, "_");
      updatedAttributes[index]["attribute_db_name"] = dbName;
    }

    updatedAttributes[index][field] = value;

    if (field === "attribute_type" && value === "file") {
      updatedAttributes[index].image_extension = [...imageExtensions];
    }
    setModuleData((prev) => ({
      ...prev,
      module_configuration_attributes_info: updatedAttributes,
    }));
  };

  const handleAddingAttributes = (e, index) => {
    e.preventDefault();
    const newAttribute = {
      attribute_type: "input",
      attribute_label: "",
      image_extension: [...imageExtensions],
      required: true,
      // is_access: true,
      attribute_db_name: "",
      attribute_db_type: "string",
    };
    setModuleData((prev) => ({
      ...prev,
      module_configuration_attributes_info: [
        ...prev.module_configuration_attributes_info,
        newAttribute,
      ],
    }));
  };

  const handleRemovingAttributes = (e, index) => {
    e.preventDefault();
    ModuleData.module_configuration_attributes_info.splice(index, 1);
    setModuleData((prev) => ({
      ...prev,
      module_configuration_attributes_info: [
        ...prev.module_configuration_attributes_info,
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (ModuleData.module_configuration_attributes_info) {
      ModuleData.module_configuration_attributes_info.map((value) => {
        if (value._id) {
          delete value._id;
        }
      });
    }

    const Module_Config_Data = {
      module_configuration_name: ModuleData.module_configuration_name,
      module_configuration_status: ModuleData.module_configuration_status,
      module_configuration_type: ModuleData.module_configuration_type,
      module_configuration_attributes_info:
        ModuleData.module_configuration_attributes_info,
    };

    const response =
      type === Editing_Module
        ? await Editing_Module(
            ModuleData.module_configuration_slug,
            Module_Config_Data
          )
        : await Creating_Module(Module_Config_Data);

    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/module-configuration");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  const handleFormateData = (data) => {
    setModuleData((prev) => ({
      ...prev,
      module_configuration_name: data.module_configuration_name,
      module_configuration_status: data.module_configuration_status,
      module_configuration_type: data.module_configuration_type,
      module_configuration_slug: data.module_configuration_slug,
      module_configuration_attributes_info:
        data.module_configuration_attributes_info || [],
    }));
  };

  const Get_Module_Details = async () => {
    const response = await Module_Configuration_Details(id);
    if (response.code === 200) {
      handleFormateData(response.module_configuration);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (state) {
      handleFormateData(state);
    } else if (type === Editing_Module) {
      Get_Module_Details();
    }
  }, [state]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center circular_progress_bar">
          <CircularProgress />
        </div>
      ) : (
        <div className="px-3 px-md-4 py-1 py-md-3">
          <form onSubmit={handleSubmit}>
            <div className="row p-0 p-lg-3 mt-5 mt-md-2">
              <HeaderWithBackButton
                title={type === Editing_Module ? "Edit Module" : "Add Module"}
                path="/module-configuration"
              />
              <div className="col-6">
                <FormInput
                  label="Module Name"
                  variant="outlined"
                  name="module_configuration_name"
                  value={ModuleData.module_configuration_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6">
                <FormInput
                  label="Module Type"
                  variant="outlined"
                  name="module_configuration_type"
                  value={ModuleData.module_configuration_type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6 mt-2">
                <Select
                  fullWidth
                  name="module_configuration_status"
                  value={ModuleData.module_configuration_status}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </div>
              <div className="mt-3 pt-2">
                <h2 className="mb-0 h4">Module Attributes</h2>
              </div>
              {ModuleData.module_configuration_attributes_info.map(
                (Attribute, index) => {
                  return (
                    <div className="mt-3  mx-0" key={index}>
                      <div className="col-12 background-color mx-0 rounded-4 main_Template_Congif">
                        <div className="row">
                          <div className="col-12">
                            <FormInput
                              label="Attribute Label"
                              variant="outlined"
                              value={Attribute.attribute_label}
                              onChange={(e) =>
                                handleAttributeChange(
                                  index,
                                  "attribute_label",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="col-6 mt-3">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Type
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                label="Type"
                                value={Attribute.attribute_type}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    index,
                                    "attribute_type",
                                    e.target.value
                                  )
                                }
                              >
                                <MenuItem value="input" selected>
                                  Input
                                </MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>
                                <MenuItem value="file">File</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          {Attribute.attribute_type === "file" && (
                            <>
                              <div className="col-6 mt-2">
                                <FormInput
                                  label="Width"
                                  variant="outlined"
                                  value={Attribute.width}
                                  onChange={(e) =>
                                    handleAttributeChange(
                                      index,
                                      "width",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-6 mt-2">
                                <FormInput
                                  label="Height"
                                  variant="outlined"
                                  value={Attribute.height}
                                  onChange={(e) =>
                                    handleAttributeChange(
                                      index,
                                      "height",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-6 mt-3">
                                <FormControl fullWidth>
                                  <InputLabel id="image-extension-label">
                                    Extensions
                                  </InputLabel>
                                  <Select
                                    labelId="image-extension-label"
                                    id="image-extension-select"
                                    label="Extensions"
                                    multiple
                                    value={Attribute.image_extension}
                                    onChange={(e) =>
                                      handleExtensionChange(e, index)
                                    }
                                    renderValue={(selected) =>
                                      selected.join(", ")
                                    }
                                  >
                                    {imageExtensions.map((extension) => (
                                      <MenuItem
                                        key={extension}
                                        value={extension}
                                      >
                                        <Checkbox
                                          checked={
                                            Attribute.image_extension.indexOf(
                                              extension
                                            ) > -1
                                          }
                                        />
                                        <ListItemText primary={extension} />
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                            </>
                          )}

                          <div className="col-6 mt-3">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                is Required ?
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                label="is Required ?"
                                value={Attribute.required}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    index,
                                    "required",
                                    e.target.value
                                  )
                                }
                              >
                                <MenuItem value={true} selected>
                                  Yes
                                </MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          {/* <div className="col-6 mt-3">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                access allowed ?
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                label="access allowed ?"
                                value={Attribute.is_access}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    index,
                                    "is_access",
                                    e.target.value
                                  )
                                }
                              >
                                <MenuItem value={true} selected>
                                  Yes
                                </MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </FormControl>
                          </div> */}
                        </div>
                        <IconButton
                          className="adding_template_attributes"
                          onClick={(e) => handleAddingAttributes(e, index)}
                        >
                          <AddCircleSharpIcon />
                        </IconButton>
                        {ModuleData.module_configuration_attributes_info
                          .length > 1 && (
                          <IconButton
                            className="removing_template_attributes"
                            onClick={(e) => handleRemovingAttributes(e, index)}
                          >
                            <DoNotDisturbOnIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
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
                    <div className="d-flex align-items-center">
                      <CircularProgress size={15} className="color" />
                      <p className="ms-2 mb-0 font-size">
                        {type === Editing_Module ? "Updating" : "Submitting"}
                      </p>
                    </div>
                  ) : type === Editing_Module ? (
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

export default AddOrUpdateModule;
