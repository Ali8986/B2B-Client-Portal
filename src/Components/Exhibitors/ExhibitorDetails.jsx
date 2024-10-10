import React, { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import { s3baseUrl } from "../../config/config";
import profile from "../../Assets/Images/Default.jpg";
import PhoneInput from "react-phone-number-validation";

const ExhibitorDetailsModal = ({ open, handleClose, selectedObject }) => {
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
            <h2 className="h4">Exhibitor Details</h2>
          </div>
          <div className="delete-modal-close" onClick={handleClose}>&times;</div>
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
            className="form-control mt-3"
            label="Name"
            name="name"
            variant="outlined"
            value={selectedObject.name}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-3"
            label="Company"
            variant="outlined"
            name="company"
            value={selectedObject.company?.name}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-3"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={selectedObject.email}
            aria-readonly="true"
          />
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center mt-3">
          <PhoneInput
            dropdownClass="select-div2 "
            country="pk"
            value={selectedObject.phone}
            onChange={handlePhoneChange}
            setValue={setPhoneNumber}
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-3"
            label="Status"
            type="text"
            name="status"
            variant="outlined"
            value={selectedObject.status}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-3"
            label="Display Space"
            type="text"
            name="booth"
            variant="outlined"
            value={selectedObject.booth}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-3"
            label="Expertise"
            type="text"
            name="products"
            variant="outlined"
            value={selectedObject.products_services}
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

export default ExhibitorDetailsModal;
