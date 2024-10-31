import { useState, useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AutoComplete from "../GeneralComponents/AutoComplete";

const SearchExhibitor = ({
  searchCompanyData,
  filterData,
  value,
  handleStatusChange,
  searchFunction,
  RemoveFilterData,
  handleCompanyNameChange,
  fetchCompanyData,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (event, newValue) => {
    setSearchText(newValue);
  };

  useEffect(() => {
    if (searchText) {
      const timeoutId = setTimeout(() => {
        fetchCompanyData(searchText);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      fetchCompanyData();
    }
    // eslint-disable-next-line
  }, [searchText]);
  return (
    <form className="row" onSubmit={searchFunction}>
      <div className="col-12 mt-4">
        <AutoComplete
          isMultiple={false}
          value={value}
          searchCompanyData={searchCompanyData}
          handleCompanyNameChange={handleCompanyNameChange}
          onInputChange={handleSearchInputChange}
          DataNotFound="Not a company name"
          label="Select Company"
        />
      </div>
      <div className="col-12 mt-3">
        <Select
          value={filterData.status}
          onChange={handleStatusChange}
          fullWidth
        >
          <MenuItem value="all" selected>
            All
          </MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
        </Select>
      </div>
      <div className="col-12 d-flex justify-content-end mt-3">
        <Button
          fullWidth
          variant="contained"
          type="submit"
          className="Data-Adding-Btn"
          startIcon={<TuneRoundedIcon />}
        >
          Apply Filter
        </Button>
      </div>
      <div className="col-12 d-flex justify-content-end mt-3">
        <Button
          fullWidth
          variant="contained"
          onClick={RemoveFilterData}
          className="Data-Adding-Btn"
          startIcon={<FilterAltOffRoundedIcon />}
        >
          Clear Filter
        </Button>
      </div>
    </form>
  );
};

export default SearchExhibitor;
