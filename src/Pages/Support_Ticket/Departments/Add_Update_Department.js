import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Add_Department,
  Department_details,
  Update_Department,
} from "../../../DAL/Login/Login";
import FormInput from "../../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../../Components/backButton";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import ReactEditorComponent from "../../../Components/GeneralComponents/ReactTextEditor";

function AddOrUpdateDepartment({ type }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const locaion = useLocation();
  const { state } = locaion;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: true,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormateData = (data) => {
    setFormData((prev) => ({
      ...prev,
      name: data.name || "",
      description: data.description || "",
      status: data.status,
    }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };
  const GetDepartmentDetails = async () => {
    const response = await Department_details(id);
    if (response.code === 200) {
      handleFormateData(response.department);
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize an array to hold error messages
    const errors = [];

    // Check each required field and add to errors if empty
    if (!formData.name) {
      errors.push("Name");
    }
    if (!formData.status) {
      errors.push("Status");
    }
    console.log(
      formData.description,
      "formData.descriptionformData.descriptionformData.description"
    );
    if (!formData.description) {
      errors.push("Description");
    }
    if (formData.description === "<br>") {
      errors.push("Description");
    }

    // If there are any errors, show a message with the empty fields
    if (errors.length > 0) {
      enqueueSnackbar(
        `Please fill in the following required fields: ${errors.join(", ")}`,
        { variant: "error" }
      );
      return;
    }

    setLoading(true);
    const DepartmentData = {
      name: formData.name,
      description: formData.description,
      status: formData.status,
    };

    const response =
      type === Update_Department
        ? await Update_Department(id, DepartmentData)
        : await Add_Department(DepartmentData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/departments");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (state) {
      console.log(state, "State is active sakldsakjlksjlk");
      handleFormateData(state);
    } else if (type === Update_Department) {
      // eslint-disable-next-line
      GetDepartmentDetails();
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
                title={
                  type === Update_Department
                    ? "Edit Department"
                    : "Add Department"
                }
                path='/departments'
              />
              <div className='col-6 col-lg-6'>
                <FormInput
                  label='Department Name*'
                  variant='outlined'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required={false}
                />
              </div>
              <div className='col-12 col-lg-6 d-flex flex-column justify-content-center'>
                <Select
                  name='status'
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true} selected>
                    Active
                  </MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </div>
              <div className='col-12 mt-2'>
                <ReactEditorComponent
                  value={formData.description}
                  onChange={(value) =>
                    handleEditorChange(value, formData.description)
                  }
                  attributeLabel='Description'
                  attributeState={true}
                />
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
                    type === Update_Department ? (
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
                  ) : type === Update_Department ? (
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

export default AddOrUpdateDepartment;
