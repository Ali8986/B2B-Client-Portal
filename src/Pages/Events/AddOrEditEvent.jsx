import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";
import {
  AddingEvent,
  CompanyList,
  EditingEvent,
  EventDetails,
  ImageUpload,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import ReactEditor from "react-text-editor-kit";
import { s3baseUrl } from "../../config/config";
import AutoComplete from "../../Components/GeneralComponents/AutoComplete";
import ReactEditorComponent from "../../Components/GeneralComponents/ReactTextEditor";
import { Description } from "@mui/icons-material";

function AddOrEditEvent({ type }) {
  const array = [
    {_id:1,name:"aliosama"},
    {_id:2,name:"rehman"},
    {_id:3,name:"kareem Ali"}
  ]
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const [searchText, setSearchText] = useState("");
  const [searchCompanyData, setSearchCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentTime = dayjs(new Date().getTime());
  const endTime = currentTime.add(1, "hour");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    start_date: dayjs(new Date()), // Use dayjs instead of moment
    start_time: dayjs(new Date().getTime()), // Initialize start_time to 00:00
    end_date: dayjs(), // Use dayjs instead of moment
    end_time: endTime, // Initialize end_time to 00:00
    status: "completed",
    capacity: "",
    number_of_attendees: "",
    company: {},
    event_type: "",
    description: "",
  });
  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSearchInputChange = (event, newValue) => {
    setSearchText(newValue);
  };

  const handleCompanyNameChange = (event, newValue) => {
    setValue(newValue);
    setFormData((prevData) => ({
      ...prevData,
      company: {
        _id: newValue?._id,
        name: newValue?.name,
        website: newValue?.website,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditorChange = (value, attributeName) => {
    setFormData((prevData) => ({
      ...prevData,
      [attributeName]: value.trim() === "<br>" ? "" : value,
    }));
  };
  
  const handleFormateData = (data) => {
    setFormData({
      name: data.name,
      location: data.location,
      start_date: dayjs(data.start_date, "YYYY:MM:DD"), // Parsing start date
      start_time: dayjs(data.start_time, "HH:mm:ss"), // Parsing start time
      end_date: dayjs(data.end_date, "YYYY:MM:DD"), // Parsing end date
      end_time: dayjs(data.end_time, "HH:mm:ss"), // Parsing end time
      status: data.status,
      capacity: data.capacity,
      number_of_attendees: data.number_of_attendees,
      event_type: data.event_type,
      description: data.description,
    });
    setValue(data.company)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedFormData = {
      ...formData,
      start_date: formData.start_date.format("YYYY:MM:DD"),
      end_date: formData.end_date.format("YYYY:MM:DD"),
      start_time: formData.start_time.format("HH:mm:ss"),
      end_time: formData.end_time.format("HH:mm:ss"),
      number_of_attendees: formData.number_of_attendees,
    };
    const response =
      type === EditingEvent
        ? await EditingEvent(id, formattedFormData)
        : await AddingEvent(formattedFormData);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/events");
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };
  const fetchCompanyData = async (SearchText) => {
    const postData = {
      search: SearchText,
    };
    const response = await CompanyList(0, 50, postData);
    if (response.code === 200) {
      setSearchCompanyData(response.companies);
    } else {
      enqueueSnackbar("Failed to fetch companies", { variant: "error" });
    }
  };

  const getEventDetail = async () => {
    const response = await EventDetails(id);
    if (response.code === 200) {
      handleFormateData(response.event);
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  useEffect(() => {
    if (state) {
      handleFormateData(state.users);
    } else if (type === EditingEvent) {
      getEventDetail();
    }
    // eslint-disable-next-line
  }, [type, state]);

  useEffect(() => {
    if (searchText) {
      const timeoutId = setTimeout(() => {
        fetchCompanyData(searchText);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      formData.company.website = "";
      fetchCompanyData();
      // eslint-disable-next-line
      setSearchCompanyData([]);
    }
    // eslint-disable-next-line
  }, [searchText]);

  return (
    <div className="px-3 px-md-4 py-1 py-md-3">
      <form onSubmit={handleSubmit}>
        <div className="row p-0 p-lg-3 mt-5 mt-md-2">
          <HeaderWithBackButton
            title={type === EditingEvent ? "Edit Event" : "Add Event"}
            path="/events"
          />
          <div className="col-6 col-lg-6">
            <FormInput
              label="Title"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-6 col-lg-6">
            <FormInput
              label="Venue"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="col-6 Data-Picker mb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast={type === EditingEvent ? false : true}
                label="Start Date"
                value={formData.start_date}
                className="form-control mt-2"
                onChange={(newValue) =>
                  handleDateChange("start_date", newValue)
                }
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 Data-Picker mb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={formData.end_date}
                className="form-control mt-2"
                onChange={(newValue) => handleDateChange("end_date", newValue)}
                minDate={formData.start_date}
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 Data-Picker mb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Start Time"
                value={formData.start_time}
                className="form-control mt-2"
                onChange={(newValue) =>
                  handleDateChange("start_time", newValue)
                }
              />
            </LocalizationProvider>
          </div>
          <div className="col-6 Data-Picker mb-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="End Time"
                value={formData.end_time}
                className="form-control mt-2"
                onChange={(newValue) => handleDateChange("end_time", newValue)}
                minTime={
                  formData.start_date.isSame(formData.end_date, "day")
                    ? formData.start_time
                    : null
                }
              />
            </LocalizationProvider>
          </div>
          <div className="col-12 col-lg-6 mt-2">
            <Select
              fullWidth
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="completed" selected>
                Completed
              </MenuItem>
              <MenuItem value="scheduled" selected>
                Scheduled
              </MenuItem>
              <MenuItem value="ongoing" selected>
                Ongoing
              </MenuItem>
              <MenuItem value="cancelled" selected>
                Cancelled
              </MenuItem>
            </Select>
          </div>
          <div className="col-6">
            <FormInput
              label="Hall Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormInput
              label="Event Type"
              name="event_type"
              type="text"
              value={formData.event_type}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormInput
              required={false}
              type="number"
              name="number_of_attendees"
              className="form-control"
              label="Number of Attendees"
              variant="outlined"
              value={formData.number_of_attendees}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mt-2">
          <AutoComplete
              isMultiple={false}
              value={value}
              searchCompanyData={searchCompanyData}
              handleCompanyNameChange={handleCompanyNameChange}
              onInputChange={handleSearchInputChange}
              DataNotFound="Not a company name"
              label="Select Company"
            />
          </div>
          <div
            className='col-12 mt-2'
              >
                <ReactEditorComponent
                  value={formData.description}
                  onChange={(value) =>
                    handleEditorChange(value, formData.description)
                  }
                  attributeLabel="Description"
                  attributeState={false}
                />
              </div>
          <div className="col-12 d-flex flex-wrap justify-content-end mt-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              style={{ backgroundColor: "#7396CC" }}
            >
              {loading ? (
                type === EditingEvent ? (
                  <div className="d-flex align-items-center">
                    <CircularProgress size={15} className="color" />
                    <p className="ms-2 mb-0 font-size">Update</p>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <CircularProgress size={15} className="color" />
                    <p className="ms-2 mb-0 font-size">Submit</p>
                  </div>
                )
              ) : type === EditingEvent ? (
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

export default AddOrEditEvent;
