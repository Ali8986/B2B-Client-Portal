import { Autocomplete, TextField } from "@mui/material";

const AutoComplete = ({
  value,
  searchCompanyData,
  handleCompanyNameChange,
  DataNotFound,
  label,
  onInputChange,
  optionLabelKey = "name",
  isMultiple = false,
  onFocus,
  onBlur
}) => { 
  return (
    <Autocomplete
      multiple={isMultiple} // Use the isMultiple prop to set multiple
      fullWidth
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      getOptionLabel={(option) => option[optionLabelKey]}
      onInputChange={onInputChange}
      options={searchCompanyData}
      isOptionEqualToValue={(option, value) => !!value && option._id === value._id}
      noOptionsText={DataNotFound}
      disablePortal
      renderOption={(props, option) => (
        <li {...props} key={option._id || option[optionLabelKey]}>
          {option[optionLabelKey]}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, newValue) => {
        handleCompanyNameChange(event, newValue); // Handle change with newValue
      }}
    />
  );
};

export default AutoComplete;
