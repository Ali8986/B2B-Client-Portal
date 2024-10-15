import React, { useState } from "react";
import { Avatar, TextField , IconButton} from "@mui/material";
import { s3baseUrl } from "../../config/config";
import profile from "../../Assets/Images/Default.jpg";
import PhoneInput from "react-phone-number-validation";
import CloseIcon from '@mui/icons-material/Close';

const ExhibitorDetailsModal = ({ open, handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (value) => {};

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-between align-items-baseline pb-2 pt-2">
            <h2 className="h4 m-0">Exhibitor Details</h2>
          <IconButton className="Close_btn" onClick={handleClose}><CloseIcon /></IconButton>
        </div>
      </div>
      <div className="Divider"></div>
      <div className="col-12 d-flex justify-content-center my-3 py-4">
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
            disabled
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
            disabled
          />
        </div>
        <div className="col-12 col-md-6 mt-4">
          <TextField
            className="form-control"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={selectedObject.email}
            aria-readonly="true"
            disabled
          />
        </div>

        <div className="col-6 d-flex justify-content-center align-items-center mt-4">
          <PhoneInput
            dropdownClass="select-div2 "
            country="pk"
            value={selectedObject.phone}
            onChange={handlePhoneChange}
            setValue={setPhoneNumber}
            disabled
          />
        </div>
        
        <div className="col-12 col-md-6 mt-4">
          <TextField
            className="form-control"
            label="Status"
            type="text"
            name="status"
            variant="outlined"
            value={selectedObject.status}
            aria-readonly="true"
            disabled
          />
        </div>
        <div className="col-12 col-md-6 mt-4">
          <TextField
            className="form-control"
            label="Display Space"
            type="text"
            name="booth"
            variant="outlined"
            value={selectedObject.booth}
            aria-readonly="true"
            disabled
          />
        </div>
        <div className="col-12 mt-4">
          <TextField
            className="form-control"
            label="Expertise"
            type="text"
            name="products"
            variant="outlined"
            value={selectedObject.products_services}
            aria-readonly="true"
            disabled
          />
        </div>
      </form>
    </>
  );
};

export default ExhibitorDetailsModal;
