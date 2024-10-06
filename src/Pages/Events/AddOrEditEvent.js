import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";
import { AddingEvent, EditingEvent } from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";

function AddOrEditEvent() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const IsEdinting = !!state;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    start_date: "",
    start_time: "20:00:00",
    end_date: "",
    end_time: "18:00:00",
    status: "scheduled",
    capacity: "",
    numeber_of_attendees: "",
    event_type: "",
    description: "",
  });

  //setting formData in case of User Clicks on Editing
  useEffect(() => {
    if (IsEdinting && state) {
      const useData = state.users;
      setFormData({
        name: useData.name,
        location: useData.location,
        start_date: useData.start_date,
        start_time: useData.start_time,
        end_date: useData.end_date,
        end_time: useData.end_time,
        status: useData.status,
        capacity: useData.capacity,
        numeber_of_attendees: useData.numeber_of_attendees,
        event_type: useData.event_type,
        description: useData.description,
      });
    }
  }, [IsEdinting, state]);

  //Inputs Fields Change handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedFormData = {
      ...formData,
    };
    if (IsEdinting) {
      setLoading(true);
      const response = await EditingEvent(id, formattedFormData);
      if (response.code === 200) {
        enqueueSnackbar(response.message, { variant: "success" });
        setLoading(false);
      } else {
        setLoading(false);
        enqueueSnackbar(response.message, { variant: "error" });
      }
    } else if (IsEdinting !== true) {
      setLoading(true);
      const response = await AddingEvent(formattedFormData);
      if (response.code === 200) {
        enqueueSnackbar(response.message, { variant: "success" });
        setLoading(false);
      } else {
        setLoading(false);
        enqueueSnackbar(response.message, { variant: "error" });
      }
    }
  };

  return (
    <div className="px-3 px-md-4 py-1 py-md-3">
      <form onSubmit={handleSubmit}>
        <div className="row p-0 p-lg-3 mt-5 mt-md-2">
          <HeaderWithBackButton
            title={IsEdinting ? "Edit Event" : "Add Event"}
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
          <div className="col-6">
            <FormInput
              label="Start Date"
              name="start_date"
              type="text"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormInput
              label="End Date"
              name="end_date"
              type="text"
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6 mt-2">
            <Select
              fullWidth
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="completed" selected>
                completed
              </MenuItem>
              <MenuItem value="scheduled" selected>
                scheduled
              </MenuItem>
              <MenuItem value="ongoing" selected>
                ongoing
              </MenuItem>
              <MenuItem value="cancelled" selected>
                cancelled
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
              label="Attendees"
              name="numeber_of_attendees"
              type="number"
              value={formData.numeber_of_attendees}
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
          <div className="col-12 mt-2">
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 d-flex flex-wrap justify-content-end mt-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                minWidth: "100px",
                padding: "10px 15px",
                marginLeft: "10px",
              }}
            >
              {loading ? (
                IsEdinting ? (
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
              ) : IsEdinting ? (
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
