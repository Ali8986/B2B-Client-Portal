import React, { useState } from "react";
import { Avatar, IconButton, TextField } from "@mui/material";
import { s3baseUrl } from "../../config/config";
import PhoneInput from "react-phone-number-validation";
import profile from "../../Assets/Images/profile.jpg";
import CloseIcon from "@mui/icons-material/Close";

const SpeakerDetailsModal = ({ handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (value) => {};

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-between align-items-baseline py-2">
          <h2 className="h4 m-0">Speaker Details</h2>
          <IconButton className="Close_btn" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="Divider"></div>
      <div className="col-12 d-flex justify-content-center mt-3 mb-0 py-4">
        <Avatar
          sx={{ width: 80, height: 80, borderRadius: 1 }}
          src={
            selectedObject.image
              ? `${s3baseUrl}${selectedObject?.image?.thumbnail_1}`
              : profile
          }
        />
      </div>
      <form className="row">
        <div className="col-6">
          <TextField
            className="form-control mt-4 fw-bold "
            label="First Name"
            name="firstName"
            variant="outlined"
            value={selectedObject.first_name}
            aria-readonly="true"
            disabled
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 fw-bold "
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={selectedObject.last_name}
            aria-readonly="true"
            disabled
          />
        </div>
        <div className="col-6 d-flex flex-column justify-content-center mt-4">
          <PhoneInput
            dropdownClass="select-div2"
            country="pk"
            value={selectedObject.phone}
            onChange={handlePhoneChange}
            setValue={setPhoneNumber}
            disabled
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={selectedObject.email}
            aria-readonly="true"
            disabled
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Expertise"
            type="text"
            name="expertise"
            variant="outlined"
            value={selectedObject.expertise}
            aria-readonly="true"
            disabled
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Status"
            type="text"
            name="Status"
            variant="outlined"
            value={selectedObject.status ? "Active" : "Inactive"}
            aria-readonly="true"
            disabled
          />
        </div>

        <div className="col-12">
          <TextField
            className="form-control mt-4"
            label="Bio"
            type="text"
            name="bio"
            variant="outlined"
            minRows={2}
            multiline
            value={selectedObject.bio}
            aria-readonly="true"
            disabled
          />
        </div>
      </form>
    </>
  );
};

export default SpeakerDetailsModal;
