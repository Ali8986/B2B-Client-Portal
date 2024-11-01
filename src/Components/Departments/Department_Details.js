import React from "react";
import { TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DepartmentDetails = ({ open, handleClose, selectedObject }) => {
  console.log("Department", open, selectedObject);
  selectedObject = selectedObject || {};

  return (
    <div className='container'>
      <div className='row'>
        <div className='d-flex justify-content-between align-items-baseline pb-2 pt-2'>
          <h2 className='h4 m-0'>Department Details</h2>
          <IconButton className='Close_btn' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className='Divider'></div>
      <div className='row mt-4'>
        <div className='col-12 col-md-6'>
          <TextField
            className='form-control'
            label='Department'
            type='text'
            name='name'
            variant='outlined'
            value={selectedObject.name}
            aria-readonly='true'
            disabled
          />
        </div>
        <div className='col-12 col-md-6'>
          <TextField
            className='form-control'
            label='Status'
            type='text'
            name='status'
            variant='outlined'
            value={selectedObject.status}
            aria-readonly='true'
            disabled
          />
        </div>
        <div className='col-12 col-md-6 mt-3'>
          <TextField
            className='form-control'
            label='Action By'
            type='text'
            name='action_user_type'
            variant='outlined'
            value={selectedObject.action_by.action_user_type}
            aria-readonly='true'
            disabled
          />
        </div>
        <div className='col-12 col-md-6 mt-3'>
          <TextField
            className='form-control'
            label='Admin'
            type='text'
            name='name'
            variant='outlined'
            value={selectedObject.action_by.name}
            aria-readonly='true'
            disabled
          />
        </div>
        <div className='col-12'>
          <label htmlFor='dashboard-description' className='description-label'>
            Description
          </label>
          <div
            className='events_Detail_description custom-scrollbar'
            dangerouslySetInnerHTML={{
              __html: selectedObject.description,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
