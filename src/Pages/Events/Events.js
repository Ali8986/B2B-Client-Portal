import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Button, Chip, CircularProgress, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../Exhibitors/DeletingUser";
import { DeletingEvent, EventList } from "../../DAL/Login/Login";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSnackbar } from "notistack";
import DetailsModal from "../../Components/GeneralComponents/detailsModal";
import EventDetailModal from "../../Components/Events/EventsDetails";
import ContactPageIcon from "@mui/icons-material/ContactPage";
function Exhibitors() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [modelOpen, setModelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [ValueForDeleting, setValueForDeleting] = useState("");

  const FetchEvnetsList = async (page, rowsPerPage, savedSearchText) => {
    setLoading(true);
    let postData = {
      search: savedSearchText,
    };
    const response = await EventList(page, rowsPerPage, postData);
    if (response.code === 200) {
      const { events, total_events, total_pages } = response;
      const mappedUsers = events.map((item) => ({
        ...item,
        name: item.name || "Unknown",
        status: item.status,
        is_show_celendar: false,
        link: {
          to: "https://www.google.com/",
          target: "_blank",
          show_text: "Preview",
        },
        html: "<div>Hello </div>",
      }));
      setUsers(mappedUsers);
      setTotalCount(total_pages);
      setTotalPages(total_events);
      localStorage.setItem("rowsPerPage", totalCount);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
    FetchEvnetsList(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchEvnetsList(0, newRowsPerPage);
  };
  const handleEdit = (value) => {
    navigate(`/events/editevent/${value._id}`, { state: { users: value } });
  };
  const handleDelete = (value) => {
    setValueForDeleting(value._id);
    setModelOpen(true);
  };
  const hideEventsDetailsModal = (e) => {
    e.preventDefault();
    setShowDetails(false);
    setSelectedObject(null);
  };
  const showEventsDetailsModal = (e) => {
    e.preventDefault();
    setShowDetails(true);
  };

  const handleDetails = (row) => {
    const selectedObj = users.find((item) => item._id === row._id);
    setSelectedObject(selectedObj);
    setShowDetails(true);
  };

  const onConfirm = async () => {
    const response = await DeletingEvent(ValueForDeleting);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      const EventsAfterDeletion = users.filter((user) => {
        if (user._id !== ValueForDeleting) {
          return (user.name = user.name);
        }
      });
      setTotalPages((prev) => prev - 1);
      setUsers(EventsAfterDeletion);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };
  const onCancel = () => {
    setModelOpen(false);
  };
  const searchFunction = async (e) => {
    e.preventDefault();
    localStorage.setItem("searchText_events_page", searchText);
    setPage(0); // Reset to the first page
    await FetchEvnetsList(0, rowsPerPage, searchText); // Fetch the speaker list with the new search text
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
  function formatDateTime(dateString, timeString) {
    const combinedString = `${dateString.replace(/:/g, "-")}T${timeString}`;
    const dateObj = new Date(combinedString);
    const formattedDate = dateObj.toLocaleDateString(); // e.g., "10/15/2024"
    const formattedTime = dateObj.toLocaleTimeString(); // e.g., "10:30:00 AM"
    return `${formattedDate} ${formattedTime}`;
  }

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "any",
      label: "Title",
      className: "cursor-pointer",
      renderData: (row, index) => {
        return (
          <Tooltip key={index} title="View Details" arrow className="Tooltip">
            <span onClick={() => handleDetails(row)}>{row.name}</span>
          </Tooltip>
        );
      },
    },
    { id: "location", label: "Venue", type: "location" },
    {
      id: "any",
      label: "Start Date/Time",
      renderData: (row) => {
        return (
          <div className="d-flex align-items-center">
            <div>{formatDateTime(row.start_date, row.start_time)}</div>
          </div>
        );
      },
    },
    {
      id: "any",
      label: "End Date/Time",
      renderData: (row) => {
        return (
          <div className="d-flex align-items-center">
            <div>{formatDateTime(row.end_date, row.end_time)}</div>
          </div>
        );
      },
    },
    {
      id: "status",
      label: "Status",
      id: "any",
      label: "Status",
      renderData: (row) => {
        return (
          <div>
            <Chip
              label={
                row.status === "scheduled"
                  ? "scheduled"
                  : row.status === "completed"
                  ? "completed"
                  : row.status === "ongoing"
                  ? "ongoing"
                  : row.status === "cancelled"
                  ? "cancelled"
                  : ""
              }
              color={
                row.status === "ongoing"
                  ? "secondary"
                  : row.status === "completed"
                  ? "success"
                  : row.status === "cancelled"
                  ? "error"
                  : row.status === "scheduled"
                  ? "primary"
                  : ""
              }
            />
          </div>
        );
      },
    },
    { id: "capacity", label: "Capacity", type: "capacity" },
    {
      id: "number_of_attendees",
      label: "Attendees",
      type: "number_of_attendees",
    },
  ];
  const handleCloseModal = () => {
    setModelOpen(false);
  };
  const handleAddingMember = () => {
    navigate("/events/addevent");
  };
  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText_events_page");
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText); // Set the saved search text
      FetchEvnetsList(page, rowsPerPage, savedSearchText);
      setTotalPages(count); // Fetch the speaker list with the saved search text
    } else {
      FetchEvnetsList(page, rowsPerPage); // Fetch the default speaker list
    }
  }, [page, rowsPerPage]); // Run on page or rows per page change

  return (
    <div className="row my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center my-4 ">
        <h2
          className="Layout-heading"
          style={{
            fontSize: 32,
            margin: 0,
            color: "#7396CC",
            fontWeight: 500,
            letterSpacing: "-1px",
          }}
        >
          Events
        </h2>
        <Button
          variant="contained"
          size="medium"
          onClick={handleAddingMember}
          className="Data-Adding-Btn"
        >
          ADD Event
        </Button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
          <CircularProgress />
        </div>
      ) : (
        <div className="Exhibitors-Table">
          <ReactTable
            data={users} // required
            TABLE_HEAD={TABLE_HEAD} // required
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
            }} // required
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
        </div>
      )}
      <DetailsModal
        open={showDetails}
        handleClose={hideEventsDetailsModal}
        component={
          <EventDetailModal
            handleOpen={showEventsDetailsModal}
            handleClose={hideEventsDetailsModal}
            selectedObject={selectedObject}
          />
        }
      />
      <DeletingModal
        className="Deleting-modal"
        open={modelOpen}
        handleClose={handleCloseModal}
        component={
          <DeletionConfirmation onConfirm={onConfirm} onCancel={onCancel} />
        }
      />
    </div>
  );
}

export default Exhibitors;
