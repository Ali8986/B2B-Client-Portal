import React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";

const AutoComplete = ({
  value,
  searchCompanyData,
  handleCompanyNameChange,
  DataNotFound,
  label,
  onInputChange,
  isMultiple,
}) => {

  return (
    <Autocomplete
      fullWidth
      value={value}
      sx={{display: 'flex', flexWrap: 'wrap' ,width: '100%'}}
      getOptionLabel={(option) => `${option.name}`}
      onInputChange={onInputChange}
      options={searchCompanyData}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      noOptionsText={DataNotFound}
      disablePortal
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
      onChange={handleCompanyNameChange}
    />
  );
};

export default AutoComplete;
