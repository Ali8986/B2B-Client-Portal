import React, { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import { s3baseUrl } from "../../config/config";
import PhoneInput from "react-phone-number-validation";
import profile from "../../Assets/Images/profile.jpg";

const SpeakerDetailsModal = ({ handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (value) => {
    console.log("hello world");
  };

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-between align-items-center Divider">
          <div className="col-6">
            <h2 className="h4">Speaker Details</h2>
          </div>
          <div className="delete-modal-close" onClick={handleClose}>
            &times;
          </div>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-center my-4">
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
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 fw-bold "
            label="First Name"
            name="firstName"
            variant="outlined"
            value={selectedObject.first_name}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 fw-bold "
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={selectedObject.last_name}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center mt-4">
          <PhoneInput
            dropdownClass="select-div2"
            country="pk"
            value={selectedObject.phone}
            onChange={handlePhoneChange}
            setValue={setPhoneNumber}
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
          />
        </div>

        <div className="d-flex justify-content-end">
          <button className="Close_Button mt-3" onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default SpeakerDetailsModal;
