import React from "react";
import { IconButton, TextField } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

const EventDetailModal = ({ handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};
  const formatDate = (dateString) => {
    if (!dateString) return null;
    if (dateString.includes(":")) {
      return dayjs(dateString, "HH:mm:ss");
    }
    return dayjs(dateString, "YYYY:MM:DD");
  };

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-between align-items-baseline Divider py-2">
          <h2 className="h4 m-0">Event Details</h2>
          <IconButton className="Close_btn" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      <form className="row">
        <div className="col-6">
          <TextField
            className="form-control mt-4 fw-bold"
            label="Title"
            name="name"
            variant="outlined"
            value={selectedObject.name}
            disabled
          />
        </div>
        <div className="col-6">
          <TextField
            disabled
            className="form-control mt-4"
            label="Location"
            variant="outlined"
            value={selectedObject.location}
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Capacity"
            variant="outlined"
            value={selectedObject.capacity}
            disabled
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Status"
            variant="outlined"
            value={selectedObject.status}
            disabled
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Number of Attendees"
            variant="outlined"
            value={selectedObject.number_of_attendees}
            disabled
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Event Type"
            variant="outlined"
            value={selectedObject.event_type}
            disabled
          />
        </div>

        <div className="col-6 Data-Picker my-2 mt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={formatDate(selectedObject.start_date)}
              className="form-control mt-2"
              readOnly
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="col-6 Data-Picker my-2 mt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={formatDate(selectedObject.end_date)}
              className="form-control mt-2"
              readOnly
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="col-6 Data-Picker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={formatDate(selectedObject.start_time)}
              className="form-control mt-2"
              readOnly
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="col-6 Data-Picker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End Time"
              value={formatDate(selectedObject.end_time)}
              className="form-control mt-2"
              readOnly
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="col-12">
          <label htmlFor="dashboard-description" className="description-label">
            Description
          </label>
          <div
            className="events_Detail_description custom-scrollbar"
            dangerouslySetInnerHTML={{
              __html: selectedObject.description,
            }}
          ></div>
        </div>
      </form>
    </>
  );
};

export default EventDetailModal;
