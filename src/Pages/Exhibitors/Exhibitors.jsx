import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "./DeletingUser";
import Chip from "@mui/material/Chip";
import { DeletingExhibitor, ExhibitorList } from "../../DAL/Login/Login";
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
import ToolTip from "../../Components/GeneralComponents/ToolTip";
import ReactDataTable from "../../Components/GeneralComponents/React_Table";

function Exhibitors() {
  const [loading, setLoading] = useState(false);
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
  const FetchExhibitorsList = async (
    page,
    rowsPerPage,
    SearchUserOrFilterUser
  ) => {
    let postData = {
      search: SearchUserOrFilterUser,
    };
    setLoading(true);
    const response = await ExhibitorList(page, rowsPerPage, postData);
    if (response.code === 200) {
      const { exhibitors, total_exhibitors, total_pages } = response;
      const proccessedData = exhibitors.map((item) => ({
        ...item,
        name: item.name || "Unknown",
        status: item.status,
      }));
      setUsers(proccessedData);
      setTotalCount(total_pages);
      setTotalPages(total_exhibitors);
      localStorage.setItem("rowsPerPage", totalCount);
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

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchExhibitorsList(0, newRowsPerPage);
  };

  const searchFunction = (e) => {
    e.preventDefault();
    setPage(0);
    localStorage.setItem("searchText_exhibitor_page", searchText);
    FetchExhibitorsList(0, rowsPerPage, searchText);
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
      // eslint-disable-next-line
      const ExhibitorsAfterDeletion = users.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          // eslint-disable-next-line
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
      icon: <DeleteForeverIcon className='Delete-Icon' />,
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
  const handleAddingMember = () => {
    navigate("/exhibitors/addexhibitor/");
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
      <div className='d-flex justify-content-between align-items-center flex-wrap my-3'>
        <HeaderWithBackButton className='Layout-heading' title='Exhibitors' />
        <div>
          <Button
            variant='contained'
            size='medium'
            onClick={handleAddingMember}
            className='Data-Adding-Btn mx-2'
          >
            ADD Exhibitor
          </Button>
        </div>
      </div>
      <div className='Exhibitors_table'>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center circular_progress_bar '>
            <CircularProgress />
          </div>
        ) : (
          <>
            <ReactDataTable
              data={users}
              header={TABLE_HEAD}
              Menu={MENU_OPTIONS}
              pagination={{
                total_count: totalCount,
                rows_per_page: rowsPerPage,
                page: page,
                total_pages: totalPages,
                handleChangePage: handleChangePage,
                handleRowsPerPageChange: handleRowsPerPageChange,
              }}
              search={{
                searchText: searchText,
                setSearchText: setSearchText,
                handleSubmit: searchFunction,
              }}
            />
          </>
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
        className='Deleting-modal'
        open={modelOpen}
        handleClose={() => setModelOpen(false)}
        component={
          <DeletionConfirmation
            onConfirm={(e) => onConfirm(e)}
            onCancel={onCancel}
          />
        }
      />
    </div>
  );
}

export default Exhibitors;
