import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Avatar, Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import {
  Update_Exhibitor_In_Event,
  List_Company_EXhibitor_Speaker,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import defaultimg from "../../Assets/Images/Default.jpg";
import { s3baseUrl } from "../../config/config";
import HeaderWithBackButton from "../../Components/backButton";
import CircularProgress from "@mui/material/CircularProgress";
import DetailsModal from "../../Components/GeneralComponents/detailsModal";
import ExhibitorDetailsModal from "../../Components/Exhibitors/ExhibitorDetails";
import BasicBreadcrumbs from "../GeneralComponents/BreadCrumbs";
import { useParams } from "react-router-dom";
import ToolTip from "../GeneralComponents/ToolTip";

function UpdateEventsExhibitor() {
  const { id } = useParams();

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [eventName, setEventName] = useState("");
  const breadcrumbItems = [
    {
      navigation: "/events",
      title: `${eventName}`,
      status: "Inactive",
    },
    {
      title: `Update Exhibitor`,
      status: "Active",
    },
  ];

  const FetchExhibitorsList = async (
    page,
    rowsPerPage,
    SearchUserOrFilterUser
  ) => {
    setLoading(true);
    const response = await List_Company_EXhibitor_Speaker(
      page,
      rowsPerPage,
      SearchUserOrFilterUser,
      "exhibitor",
      id
    );
    if (response.code === 200) {
      const { list, event, total_exhibitors, total_pages } = response;
      const mappedUsers = list?.map((item) => ({
        ...item,
        name: item.name || "Unknown",
        status: item.status,
      }));
      setUsers(mappedUsers);
      setTotalCount(total_pages);
      setTotalPages(total_exhibitors);
      localStorage.setItem("rowsPerPage", totalCount);
      setLoading(false);
      setSelected(event.exhibitors);
      setEventName(event.name);
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    FetchExhibitorsList(newPage, rowsPerPage);
  };

  const HandleUpDate = async () => {
    const SelectedExhibitors = selected.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      booth: user.booth,
      products_services: user.products_services || [],
    }));

    const formData = {
      exhibitors: SelectedExhibitors,
    };
    setLoading(true);
    const response = await Update_Exhibitor_In_Event(formData, id);
    if (response.code === 200) {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
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
    localStorage.setItem("filter_Exhibitor_Data", searchText);
    FetchExhibitorsList(page, rowsPerPage, searchText);
  };

  const handleDetails = (row) => {
    const selectedObj = users.find((item) => item._id === row._id);
    setSelectedObject(selectedObj);
    setShowDetails(true);
  };

  const MENU_OPTIONS = [];

  const TABLE_HEAD = [
    {
      id: "name",
      label: "Profile",
      renderData: (row, index) => {
        return (
          <div key={index} className='d-flex align-items-center'>
            <div className='me-2'>
              <Avatar
                className='img-fluid'
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
          <ToolTip key={index} title='View Details' arrow>
            <span onClick={() => handleDetails(row)}>{row.name}</span>
          </ToolTip>
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

  const hideExhibitorDetailsModal = (e) => {
    setShowDetails(false);
    setSelectedObject(null);
  };

  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText_exhibitor_page");
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchExhibitorsList(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchExhibitorsList(page, rowsPerPage);
    }
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <div className='row mt-5 mb-0 mx-3'>
      <div className='col-12 mt-2 mb-4 ms-1'>
        {!loading && <BasicBreadcrumbs items={breadcrumbItems} />}
      </div>
      <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
        {!loading && (
          <HeaderWithBackButton className='Layout-heading' title='Exhibitors' />
        )}
      </div>
      <div className='Exhibitors_table'>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center circular_progress_bar '>
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
            checkbox_selection={{
              selected: selected,
              setSelected: setSelected,
              // selected_by: "",
            }}
            custom_search={{
              searchText: searchText,
              setSearchText: setSearchText,
              handleSubmit: searchFunction,
            }}
            class_name=''
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
      <div className='d-flex justify-content-end mt-3 mb-3'>
        <Button
          variant='contained'
          size='medium'
          onClick={HandleUpDate}
          className='Data-Adding-Btn mx-2'
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default UpdateEventsExhibitor;
