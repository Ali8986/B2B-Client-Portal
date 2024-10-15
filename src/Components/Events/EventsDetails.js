import React from "react";
import { IconButton, TextField } from "@mui/material";
import { LocalizationProvider, DateTimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

const EventDetailModal = ({ handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return null;
    return dayjs(dateTimeString);
  };

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-between align-items-baseline py-2">
          <h2 className="h4 m-0">Event Details</h2>
          <IconButton className="Close_btn" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="Divider"></div>
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

        {/* Start Date and Time */}
        <div className="col-6 Data-Picker my-2 mt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              label="Start Date & Time"
              value={formatDateTime(selectedObject.start_date_time)}
              className="form-control mt-2"
              readOnly
              disabled
            />
          </LocalizationProvider>
        </div>

        {/* End Date and Time */}
        <div className="col-6 Data-Picker my-2 mt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              label="End Date & Time"
              value={formatDateTime(selectedObject.end_date_time)}
              className="form-control mt-2"
              readOnly
              disabled
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
