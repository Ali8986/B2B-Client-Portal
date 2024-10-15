import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const AutoComplete = ({
  value,
  setValue,
  searchCompanyData,
  setSetFilterData,
}) => {
  return (
    <Autocomplete
      fullWidth
      id="company_name"
      value={value}
      getOptionLabel={(option) => `${option.name}`}
      options={searchCompanyData}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      noOptionsText={"Not a company name"}
      disablePortal
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label="Search Company Name" />
      )}
      onChange={(event, newValue) => {
        setValue(newValue);
        setSetFilterData((prevData) => ({
          ...prevData,
          company_id: newValue ? newValue._id : "", // Handle case when no company is selected
        }));
      }}
    />
  );
};

export default AutoComplete;
