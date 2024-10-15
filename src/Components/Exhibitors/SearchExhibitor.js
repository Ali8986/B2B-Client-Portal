import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CompanyList } from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import AutoComplete from "../GeneralComponents/AutoComplete";

const SearhingExhibitor = ({ setIsOpen, FetchExhibitorsList }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [searchCompanyData, setSearchCompanyData] = useState([]);
  const [filterData, setSetFilterData] = useState({
    search: "",
    status: "Pending",
    company_id: "",
  });
  console.log(
    filterData,
    "filter filter datafilter datafilter datafilter data data"
  );
  const [status, setStatus] = useState("Pending");
  const [value, setValue] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCompanyData = async () => {
    const response = await CompanyList(0, 10, null);
    if (response.code === 200) {
      setSearchCompanyData(response.companies);
    } else {
      enqueueSnackbar("Failed to fetch companies", { variant: "error" });
    }
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setSetFilterData((prevData) => ({
      ...prevData,
      status: e.target.value || status,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      filterData.status === "" &&
      filterData.search === "" &&
      filterData.company_id === ""
    ) {
      delete filterData.status;
      delete filterData.company_id;
      FetchExhibitorsList(filterData);
      setIsOpen();
    } else {
      localStorage.setItem("filter_Exhibitor_Data", JSON.stringify(filterData));
      FetchExhibitorsList(page, rowsPerPage, filterData);
      setIsOpen();
    }
  };

  const RemoveFilterData = (e) => {
    e.preventDefault();
    setSetFilterData({
      search: "",
      status: status,
      company_id: "",
    });
    setValue(null);
    setStatus("Pending");
    console.log(
      filterData,
      "filterData filterData filterData filterData filterData"
    );
    localStorage.removeItem("filter_Exhibitor_Data");
    setIsOpen();
    FetchExhibitorsList(filterData);
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    const filterDataFromStorage = JSON.parse(
      localStorage.getItem("filter_Exhibitor_Data")
    );

    if (searchCompanyData.length > 0 && filterDataFromStorage) {
      const name = searchCompanyData.find(
        (value) => value._id === filterDataFromStorage.company_id
      );
      setValue(name || null); // Set the value if found, otherwise null
      setStatus(filterDataFromStorage.status);
      setSetFilterData(filterDataFromStorage);
    }
  }, [searchCompanyData]);

  console.log(filterData, "filterDatafilterDatafilterDatafilterDatafilterData");

  return (
    <>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-12 d-flex flex-column justify-content-center mt-3">
          <AutoComplete
            value={value}
            setValue={setValue}
            searchCompanyData={searchCompanyData} // Passing the company data here
            setSetFilterData={setSetFilterData}
          />
        </div>
        <div className="col-12 d-flex flex-column justify-content-center mt-3">
          <Select
            required
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="Pending" selected>
              Pending
            </MenuItem>
            <MenuItem value="Confirmed" selected>
              Confirmed
            </MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </div>
        <div className="col-12 mt-3 d-flex justify-content-between">
          <div>
            <Button
              variant="contained"
              size="medium"
              type="submit"
              className="Data-Adding-Btn"
              startIcon={<TuneRoundedIcon />}
            >
              Add Filter
            </Button>
          </div>
          <div>
            <Button
              onClick={(e) => RemoveFilterData(e)}
              variant="contained"
              size="medium"
              type="submit"
              className="Data-Adding-Btn"
              startIcon={<FilterAltOffRoundedIcon />}
            >
              Remove Filter
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearhingExhibitor;
