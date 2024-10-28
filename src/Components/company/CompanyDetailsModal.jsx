import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { Avatar, IconButton, TextField } from "@mui/material";
import { s3baseUrl } from "../../config/config";
import PhoneInput from "react-phone-number-validation";
import profile from "../../Assets/Images/profile.jpg";
import CloseIcon from "@mui/icons-material/Close";

const CompanyDetailsModal = ({ handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (value) => {};

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
        <div className="d-flex justify-content-between align-items-baseline py-2">
          <h2 className="h4 m-0">Company Details</h2>
          <IconButton className="Close_btn" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="Divider"></div>
      <div className="col-12 d-flex justify-content-center mt-4 py-2">
        <Avatar
          sx={{ width: 80, height: 80, borderRadius: 1 }}
          src={
            selectedObject.image
              ? `${s3baseUrl}${selectedObject?.image?.thumbnail_1}`
              : profile
          }
        />
      </div>
      <form className="row mt-1">
        <div className="col-6 mt-4">
          <TextField
            className="form-control fw-bold "
            label="Name"
            name="name"
            variant="outlined"
            value={selectedObject.name}
            aria-readonly="true"
            disabled
          />
        </div>

        <div className="col-6 mt-4">
          <TextField
            className="form-control"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={selectedObject.user.email}
            aria-readonly="true"
            disabled
          />
        </div>

        <div className="col-6 d-flex flex-column justify-content-center mt-4 Phone_Input">
          <PhoneInput
            dropdownClass="select-div2"
            country="pk"
            value={selectedObject.phone}
            onChange={handlePhoneChange}
            setValue={setPhoneNumber}
            disabled
          />
        </div>

        <div className="col-6 mt-4">
          <TextField
            className="form-control"
            label="Website Link"
            type="text"
            name="website"
            variant="outlined"
            value={selectedObject.website}
            aria-readonly="true"
            disabled
          />
        </div>
        <div className="col-6 mt-4">
          <TextField
            className="form-control"
            label="Status"
            type="text"
            name="Status"
            variant="outlined"
            value={selectedObject.status ? "Active" : "Inactive"}
            aria-readonly="true"
            disabled
          />
        </div>

        <div className="col-6 mt-4">
          <TextField
            className="form-control"
            label="Employees Count"
            type="number"
            name="employees_count"
            variant="outlined"
            value={selectedObject.employees_count}
            aria-readonly="true"
            disabled
          />
        </div>

        <div className="col-6 Data-Picker my-2 mt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Founded Date"
              value={formatDate(selectedObject.founded_date)}
              className="form-control"
              readOnly
              disabled
            />
          </LocalizationProvider>
        </div>

        <div className="col-6 mt-4">
          <TextField
            className="form-control"
            label="Industry Name"
            type="text"
            name="industry"
            variant="outlined"
            value={selectedObject.industry}
            aria-readonly="true"
            disabled
          />
        </div>

        <div className="col-12 mt-3">
          <TextField
            className="form-control"
            label="Address"
            type="text"
            name="address"
            variant="outlined"
            value={selectedObject.address}
            aria-readonly="true"
            disabled
          />
        </div>
      </form>
    </>
  );
};

export default CompanyDetailsModal;
