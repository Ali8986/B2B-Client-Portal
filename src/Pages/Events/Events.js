import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../Exhibitors/DeletingUser";
import Loader from "../../Components/GeneralComponents/LoadingIndicator";
import { DeletingEvent, EventList } from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";

function Exhibitors() {
  const navigate = useNavigate();
  localStorage.removeItem("searchText");
  localStorage.removeItem("searchResults");
  localStorage.removeItem("rowsPerPage");
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [modelOpen, setModelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [ValueForDeleting, setValueForDeleting] = useState("");

  const getData = async () => {
    const response = await EventList();
    if (response.code === 200) {
      console.log(response);
      const data = response.events.map((item) => {
        return {
          ...item,
          is_show_celendar: true,
          link: {
            to: "https://www.google.com/",
            target: "_blank",
            show_text: "Preview",
          },
          thumbnail: {
            src: item.profileImage,
            alt: "Profile Image",
          },
          html: "<div>html text </div>",
        };
      });
      setUsers(data);
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setLoading(false);
    }
  };

  const handleEdit = (value) => {
    navigate(`/events/editevent/${value._id}`, { state: { users: value } });
  };
  const handleDelete = (value) => {
    setValueForDeleting(value._id);
    setModelOpen(true);
  };

  const onConfirm = async () => {
    const response = await DeletingEvent(ValueForDeleting);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      getData();
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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#7396cc"
        >
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
      ),
      handleClick: handleEdit,
    },
    {
      label: "Delete",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#7396cc"
          className="Delete-Icon"
        >
          <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
        </svg>
      ),
      handleClick: handleDelete,
    },
  ];
  function formatDateTime(dateString, timeString) {
    const combinedString = `${dateString.replace(/:/g, "-")}T${timeString}`;
    // Create a new Date object
    const dateObj = new Date(combinedString);
    // Format the date and time as desired
    const formattedDate = dateObj.toLocaleDateString(); // e.g., "10/15/2024"
    const formattedTime = dateObj.toLocaleTimeString(); // e.g., "10:30:00 AM"
    return `${formattedDate} ${formattedTime}`;
  }

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "any",
      label: "Title",
      renderData: (row) => {
        return (
          <div className="d-flex align-items-center">
            <div>{row.name}</div>
          </div>
        );
      },
    },
    { id: "location", label: "Location", type: "location" },
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
    { id: "status", label: "Status", type: "status" },
    { id: "capacity", label: "Capacity", type: "capacity" },
    {
      id: "numeber_of_attendees",
      label: "Attendees",
      type: "numeber_of_attendees",
    },
  ];
  const handleCloseModal = () => {
    setModelOpen(false);
  };
  const handleAddingMember = () => {
    navigate("/events/addevent");
  };
  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  return (
    <div className="row my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center my-4 ">
        <h2
          className="Layout-heading"
          style={{
            fontSize: 28,
            margin: 0,
            color: "#7396CC",
            fontWeight: 500,
            textTransform: "uppercase",
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
        <Loader />
      ) : (
        <div className="Exhibitors-Table">
          <ReactTable
            data={users} // required
            TABLE_HEAD={TABLE_HEAD} // required
            MENU_OPTIONS={MENU_OPTIONS} // required
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
