import React, { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  Select,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Creating_Website_Page,
  Editing_Website_Page,
  Template_Or_Module_Listing,
  Website_Pages_Details,
} from "../../DAL/Login/Login";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";
import { useSnackbar } from "notistack";
import AutoComplete from "../../Components/GeneralComponents/AutoComplete";

function AddorUpdateWebPages({ type }) {
  const [activeField, setActiveField] = useState("");
  const [templateData, setTemplateData] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);

  const initialPageState = {
    website_page_title: "",
    meta_title: "",
    meta_description: "",
    template: "",
    module_configuration: [],
    status: true,
    page_alias_url: "",
  };

  const [PagesData, setPagesData] = useState(initialPageState);
  const [loading, setLoading] = useState(false);
  const [templateSearchText, setTemplateSearchText] = useState("");
  const [moduleSearchText, setModuleSearchText] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "page_alias_url") {
      const sanitizedURL = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      setPagesData((prev) => ({
        ...prev,
        page_alias_url: sanitizedURL,
      }));
    } else {
      setPagesData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleModuleConfigurationChange = (event, selectedTitles) => {
    // const updatedConfigurations = selectedTitles.map((title) => ({
    //   title,
    // }));
    setPagesData((prev) => ({
      ...prev,
      module_configuration: selectedTitles,
    }));
    setSelectedModules(selectedTitles);
  };

  const handleTemplateChange = (event, newValue) => {
    setSelectedTemplate(newValue);
    setPagesData((prev) => ({
      ...prev,
      template: newValue ? newValue._id : "",
      website_page_title: newValue ? newValue.template_name : "",
      meta_title: newValue ? newValue.template_name : "",
    }));
  };

  const handleTemplateSearchInputChange = (event, newValue) => {
    setTemplateSearchText(newValue);
  };

  const handleModuleSearchInputChange = (event, newValue) => {
    setModuleSearchText(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      typeof PagesData.template === "object" &&
      templateData.template !== null
    ) {
      PagesData.template = PagesData.template._id;
      setPagesData((prev) => {
        return {
          ...prev,
          template: PagesData.template.template_name,
        };
      });
    }

    const Template_Config_Data = {
      website_page_title: PagesData.website_page_title,
      meta_title: PagesData.meta_title,
      meta_description: PagesData.meta_description,
      template: PagesData.template,
      module_configuration: PagesData.module_configuration,
      status: PagesData.status,
      page_alias_url: PagesData.page_alias_url,
    };

    const response =
      type === Editing_Website_Page
        ? await Editing_Website_Page(id, Template_Config_Data)
        : await Creating_Website_Page(Template_Config_Data);

    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/website-pages");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    setLoading(false);
  };

  const handleFormateData = (data) => {
    setPagesData((prev) => ({
      ...prev,
      website_page_title: data.website_page_title || "",
      meta_title: data.meta_title || "",
      meta_description: data.meta_description || "",
      template: data.template || "",
      module_configuration: data.module_configuration || [],
      status: data.status !== undefined ? data.status : true,
      page_alias_url: data.page_alias_url || "",
    }));
  };

  const FetchTemplateList = async (type, searchText) => {
    const PostData = {
      type: type,
      search: searchText,
    };
    const response = await Template_Or_Module_Listing(0, 50, PostData);
    if (response.code === 200) {
      if (PostData.type === "template") {
        setTemplateData(response.module_or_template);
      } else if (PostData.type === "module") {
        setModuleData(response.module_or_template);
      }
    } else {
      enqueueSnackbar("Failed to fetch templates", { variant: "error" });
    }
  };

  const handleFocus = (type) => {
    setActiveField(type);
    FetchTemplateList(type, "");
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const Get_Website_Page_Details = async () => {
    const response = await Website_Pages_Details(id);
    if (response.code === 200) {
      handleFormateData(response.website_page);
      setSelectedTemplate(response.website_page.template);
      setSelectedModules(response.website_page.module_configuration || []);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  // Separate useEffect for initial data fetching
  useEffect(() => {
    if (state) {
      handleFormateData(state);
      setSelectedTemplate(state.template);
      setSelectedModules(state.module_configuration);
    } else if (type === Editing_Website_Page) {
      Get_Website_Page_Details();
    }
  }, [state, type]); // This runs only on initial render or state/type change

  // Separate useEffect for fetching templates/modules based on focus
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeField) {
        FetchTemplateList(
          activeField,
          activeField === "template" ? templateSearchText : moduleSearchText
        );
      } else {
        // No active field, so clear the search text
        setTemplateSearchText("");
        setModuleSearchText("");
      }
    }, 1000); // 1000ms debounce time

    return () => clearTimeout(timeoutId);
  }, [templateSearchText, moduleSearchText]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center circular_progress_bar">
          <CircularProgress />
        </div>
      ) : (
        <div className="px-3 px-md-4 py-1 py-md-3">
          <form onSubmit={handleSubmit}>
            <div className="row p-0 p-lg-3 mt-5 mt-md-2 ">
              <HeaderWithBackButton
                title={
                  type === Editing_Website_Page ? "Editing Page" : "Adding Page"
                }
                path="/website-pages"
              />
              <div className="col-6 d-flex flex-column justify-content-center">
                <AutoComplete
                  isMultiple={false}
                  value={selectedTemplate}
                  optionLabelKey="template_name"
                  searchCompanyData={templateData}
                  handleCompanyNameChange={handleTemplateChange}
                  onInputChange={handleTemplateSearchInputChange}
                  onFocus={() => handleFocus("template")}
                  onBlur={handleBlur}
                  DataNotFound="Not a Template"
                  label="Choose Template"
                />
              </div>
              <div className="col-6">
                <FormInput
                  label="Website Page Title"
                  variant="outlined"
                  name="website_page_title"
                  value={PagesData.website_page_title || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6">
                <FormInput
                  label="Meta Title"
                  variant="outlined"
                  name="meta_title"
                  value={PagesData.meta_title || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6">
                <FormInput
                  label="Page Alias URL"
                  variant="outlined"
                  name="page_alias_url"
                  value={PagesData.page_alias_url || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6 mt-2">
                <AutoComplete
                  isMultiple={true}
                  value={selectedModules}
                  optionLabelKey="module_configuration_name"
                  searchCompanyData={moduleData}
                  handleCompanyNameChange={handleModuleConfigurationChange}
                  onInputChange={handleModuleSearchInputChange}
                  onFocus={() => handleFocus("module")}
                  onBlur={handleBlur}
                  DataNotFound="Not a Module"
                  label="Module"
                />
              </div>
              <div className="col-6 mt-2">
                <Select
                  fullWidth
                  name="status"
                  value={PagesData.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </div>
              <div className="col-12 mt-2">
                <FormInput
                  label="Meta Description"
                  variant="outlined"
                  name="meta_description"
                  multline={true}
                  value={PagesData.meta_description || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
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
                        {type === Editing_Website_Page
                          ? "Updating"
                          : "Submitting"}
                      </p>
                    </div>
                  ) : type === Editing_Website_Page ? (
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

export default AddorUpdateWebPages;
