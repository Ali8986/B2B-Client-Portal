import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Components/GeneralComponents/FormInput";
import HeaderWithBackButton from "../../Components/backButton";

function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    EventHost: "",
    StartDate: "23-09-2024, 3:44:05 PM",
    EndDate: "23-09-2024, 3:44:05 PM",
    Venue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/events");
  };

  return (
    <div className="px-3 px-md-4 py-1 py-md-3">
      <form onSubmit={handleSubmit}>
        <div className="row p-0 p-lg-3 mt-5 mt-md-2">
          <HeaderWithBackButton title="Add Event" path="/events" />
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
              label="Host Name"
              name="EventHost"
              type="text"
              value={formData.EventHost}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormInput
              label="Start Date"
              name="StartDate"
              type="text"
              value={formData.StartDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormInput
              label="End Date"
              name="StartDate"
              type="text"
              value={formData.EndDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <FormInput
              label="Venue"
              name="Venue"
              type="text"
              value={formData.Venue}
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
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
