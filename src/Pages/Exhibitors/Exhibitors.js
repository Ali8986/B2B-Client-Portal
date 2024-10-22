import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Avatar, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "./DeletingUser";
import Chip from "@mui/material/Chip";
import {
  DeletingExhibitor,
  ExhibitorList,
  CompanyList,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import defaultimg from "../../Assets/Images/Default.jpg";
import { s3baseUrl } from "../../config/config";
import HeaderWithBackButton from "../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";
import DetailsModal from "../../Components/GeneralComponents/detailsModal";
import ExhibitorDetailsModal from "../../Components/Exhibitors/ExhibitorDetails";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SearhingExhibitor from "../../Components/Exhibitors/SearchExhibitor";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import CustomDrawer from "../../Components/GeneralComponents/CustomDrawer";
import ReactFilterChips from "react-filter-chips";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function Exhibitors() {
  const EMPTY_FILTER = {
    status: "all",
    company_id: "",
  };
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const [searchCompanyData, setSearchCompanyData] = useState([]);
  const [filterState, setFilterState] = useState(EMPTY_FILTER);
  const [filterStateTem, setFilterStateTem] = useState(EMPTY_FILTER);
  const [filterData, setSetFilterData] = useState(EMPTY_FILTER);
  const [value, setValue] = useState(null);
  const FetchExhibitorsList = async (
    page,
    rowsPerPage,
    SearchUserOrFilterUser
  ) => {
    let postData = { ...SearchUserOrFilterUser };
    if (postData.status === "all") {
      delete postData.status;
    }
    if (!!postData.company_id) {
      postData.company_id = postData?.company_id?._id;
    }

    setLoading(true);
    const response = await ExhibitorList(page, rowsPerPage, postData);
    if (response.code === 200) {
      const { exhibitors, total_exhibitors, total_pages } = response;
      const mappedUsers = exhibitors.map((item) => ({
        ...item,
        name: item.name || "Unknown",
        status: item.status,
      }));
      setUsers(mappedUsers);
      setTotalCount(total_pages);
      setTotalPages(total_exhibitors);
      localStorage.setItem("rowsPerPage", totalCount);
      const chipData = { ...SearchUserOrFilterUser };
      if (!chipData.company_id) {
        delete chipData.company_id;
      }
      if (chipData.search) {
        delete chipData.search;
      }
      setFilterState(chipData);
      setFilterStateTem(chipData);
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    FetchExhibitorsList(newPage, rowsPerPage);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const fetchCompanyData = async (SearchForCompanyName) => {
    const postData = {
      search: SearchForCompanyName,
    };
    const response = await CompanyList(0, 10, postData);
    if (response.code === 200) {
      const company = response.companies.map((item, index) => {
        return {
          ...item,
          chip_label: item.name,
          chip_value: item.id,
        };
      });
      setSearchCompanyData(company);
    } else {
      enqueueSnackbar("Failed to fetch companies", { variant: "error" });
    }
  };

  const onDeleteChip = (data) => {
    localStorage.setItem("Chips", JSON.stringify(data));
    setFilterState(data);
    setFilterStateTem(data);
    FetchExhibitorsList(page, rowsPerPage, data);
  };

  const onClear = () => {
    localStorage.removeItem("Chips");
    localStorage.removeItem("filter_Exhibitor_Data");
    setFilterState(EMPTY_FILTER);
    setFilterStateTem(EMPTY_FILTER);
    FetchExhibitorsList(page, rowsPerPage, EMPTY_FILTER);
  };

  const handleStatusChange = (e) => {
    setSetFilterData((prevData) => ({
      ...prevData,
      status: e.target.value || "",
    }));
  };

  const RemoveFilterData = (e) => {
    e.preventDefault();
    setSetFilterData({
      search: "",
      status: "all",
      company_id: "",
    });
    setValue(null);
    setSetFilterData((prev) => {
      return {
        ...prev,
        status: "all",
      };
    });
    localStorage.removeItem("filter_Exhibitor_Data");
    localStorage.removeItem("Chips");
    setFilterState(EMPTY_FILTER);
    setFilterStateTem(EMPTY_FILTER);
    FetchExhibitorsList(page, rowsPerPage, EMPTY_FILTER);
    setIsOpen(false);
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  const handleCompanyNameChange = (event, newValue) => {
    setValue(newValue);
    setSetFilterData((prevData) => ({
      ...prevData,
      company_id: newValue,
    }));
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchExhibitorsList(0, newRowsPerPage);
  };

  const searchFunction = (e) => {
    e.preventDefault();
    setPage(0);
    setIsOpen(false);
    localStorage.setItem("filter_Exhibitor_Data", JSON.stringify(filterData));
    filterData.search = searchText;
    FetchExhibitorsList(page, rowsPerPage, filterData);
  };

  const handleEdit = (value) => {
    navigate(`/exhibitors/editexhibitor/${value._id}`, {
      state: { user: value },
    });
  };
  const handleDelete = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };
  const handleDetails = (row) => {
    const selectedObj = users.find((item) => item._id === row._id);
    setSelectedObject(selectedObj);
    setShowDetails(true);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const response = await DeletingExhibitor(valueForDeleting._id);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      const ExhibitorsAfterDeletion = users.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          return (user.name = user.name);
        }
      });
      setTotalPages((prev) => prev - 1);
      setUsers(ExhibitorsAfterDeletion);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };

  const onCancel = () => {
    setModelOpen(false);
  };

  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: <EditIcon />,
      handleClick: handleEdit,
    },
    {
      label: "Delete",
      icon: <DeleteForeverIcon className="Delete-Icon" />,
      handleClick: handleDelete,
    },
    {
      label: "View Details",
      icon: <ContactPageIcon />,
      handleClick: handleDetails,
    },
  ];

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "name",
      label: "Profile",
      renderData: (row, index) => {
        return (
          <div key={index} className="d-flex align-items-center">
            <div className="me-2">
              <Avatar
                className="img-fluid"
                src={
                  row.image && row.image.thumbnail_1
                    ? s3baseUrl + row.image.thumbnail_1
                    : defaultimg
                }
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "50px",
                  height: "50px",
                  maxWidth: "50px",
                  maxHeight: "50px",
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      id: "any",
      label: "Name",
      className: "cursor-pointer",
      renderData: (row, index) => {
        return (
          <Tooltip key={index} title="View Details" arrow>
            <span onClick={() => handleDetails(row)}>{row.name}</span>
          </Tooltip>
        );
      },
    },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Phone Number", type: "phone" },
    {
      id: "any",
      label: "Company",
      renderData: (row) => {
        return (
          <>
            <div>{row.company.name}</div>
            {/* <div>{row.company.website}</div> */}
          </>
        );
      },
    },
    {
      id: "any",
      label: "Exhibit Space",
      renderData: (row) => {
        return <div>{row.booth}</div>;
      },
    },
    {
      id: "any",
      label: "Status",
      renderData: (row) => {
        return (
          <div>
            <Chip
              label={
                row.status === "Pending"
                  ? "Pending"
                  : row.status === "Confirmed"
                  ? "Confirmed"
                  : row.status === "Cancelled"
                  ? "Cancelled"
                  : ""
              }
              color={
                row.status === "Pending"
                  ? "secondary"
                  : row.status === "Confirmed"
                  ? "success"
                  : row.status === "Cancelled"
                  ? "error"
                  : ""
              }
            />
          </div>
        );
      },
    },
  ];

  const showExhibitorDetailsModal = (e) => {
    setShowDetails(true);
  };
  const handleAddingMember = () => {
    navigate("/exhibitors/addexhibitor/");
  };
  const hideExhibitorDetailsModal = (e) => {
    setShowDetails(false);
    setSelectedObject(null);
  };

  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText_exhibitor_page");
    const FilterExhibitorData = JSON.parse(
      localStorage.getItem("filter_Exhibitor_Data")
    );
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchExhibitorsList(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else if (FilterExhibitorData) {
      FetchExhibitorsList(page, rowsPerPage, FilterExhibitorData);
    } else {
      FetchExhibitorsList(page, rowsPerPage, EMPTY_FILTER);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    const savedFilterData = localStorage.getItem("Chips");
    if (savedFilterData) {
      const parsedFilterData = JSON.parse(savedFilterData);
      setFilterState(parsedFilterData);
    }
  }, []);

  return (
    <div className="row mt-5 mb-0 mx-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <HeaderWithBackButton className="Layout-heading" title="Exhibitors" />
        <div>
          <Button
            variant="contained"
            size="medium"
            onClick={handleOpenDrawer}
            className="Data-Adding-Btn"
            endIcon={<FilterAltRoundedIcon />}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={handleAddingMember}
            className="Data-Adding-Btn mx-2"
          >
            ADD Exhibitor
          </Button>
        </div>
      </div>
      <div className="mb-4 mt-2 ms-2">
        <ReactFilterChips
          filterData={filterState}
          tempState={filterStateTem}
          emptyFilter={EMPTY_FILTER}
          clearLabel="Clear All"
          filterLabel="Filtered By:"
          onDeleteChip={onDeleteChip}
          onClear={onClear}
          customIcon={<CloseRoundedIcon className="Filter_Chip_ICon" />}
        />
      </div>
      <div className="Exhibitors_table">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
            <CircularProgress />
          </div>
        ) : (
          <ReactTable
            data={users}
            TABLE_HEAD={TABLE_HEAD}
            MENU_OPTIONS={MENU_OPTIONS}
            custom_pagination={{
              total_count: totalCount,
              rows_per_page: rowsPerPage,
              page: page,
              total_pages: totalPages,
              handleChangePage: handleChangePage,
              handleRowsPerPageChange: handleRowsPerPageChange,
            }}
            custom_search={{
              searchText: searchText,
              setSearchText: setSearchText,
              handleSubmit: searchFunction,
            }}
            class_name=""
            theme_config={{
              background: "white",
              color: "black",
              iconColor: "#7396CC",
            }}
            is_sticky_header={false}
            is_hide_footer_pagination={false}
            is_hide_header_pagination={false}
            is_hide_search={false}
          />
        )}
      </div>

      <DetailsModal
        open={showDetails}
        handleClose={hideExhibitorDetailsModal}
        component={
          <ExhibitorDetailsModal
            handleOpen={showExhibitorDetailsModal}
            handleClose={hideExhibitorDetailsModal}
            selectedObject={selectedObject}
          />
        }
      />
      <DeletingModal
        className="Deleting-modal"
        open={modelOpen}
        handleClose={() => setModelOpen(false)}
        component={
          <DeletionConfirmation
            onConfirm={(e) => onConfirm(e)}
            onCancel={onCancel}
          />
        }
      />
      <CustomDrawer
        title={"Filter Exhibitor"}
        isOpen={isOpen}
        setIsOpen={closeDrawer}
        component={
          <SearhingExhibitor
            searchCompanyData={searchCompanyData}
            filterData={filterData}
            value={value}
            handleStatusChange={handleStatusChange}
            searchFunction={searchFunction}
            RemoveFilterData={RemoveFilterData}
            handleCompanyNameChange={handleCompanyNameChange}
            fetchCompanyData={fetchCompanyData}
          />
        }
      />
    </div>
  );
}

export default Exhibitors;
