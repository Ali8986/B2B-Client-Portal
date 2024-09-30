import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Button } from "@mui/material";
import { json, useNavigate } from "react-router-dom";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../Exhibitors/DeletingUser";
import EditOutlined from "@mui/icons-material/EditOutlined";
import ProfileImage from "../../Assets/Images/profile.jpg";

function Exhibitors() {
  const [events, setEvents] = useState([
    {
      _id: 1,
      name: "Tech Conference 2024",
      EventHost: "Ahmed Ali",
      StartDate: "30-09-2024, 3:44:00 PM",
      EndDate: "30-09-2024, 5:30:00 PM",
      Venue: "Tech Hub, New York, NY",
      status: true,
    },
    {
      _id: 2,
      name: "Startup Pitch Day",
      EventHost: "Waqar Zaka",
      StartDate: "23-09-2024, 12:00:00 PM",
      EndDate: "23-09-2024, 3:15:00 PM",
      Venue: "Hilton Hotel, London, UK",
      status: false,
    },
    {
      _id: 3,
      name: "JavaScript Workshop",
      EventHost: "John Doe",
      StartDate: "19-09-2024, 1:30:00 PM",
      EndDate: "19-09-2024, 5:30:00 PM",
      Venue: "Tech Park, Berlin, Germany",
      status: false,
    },
  ]);
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [ValueForDeleting, setValueForDeleting] = useState(null);
  // const [searchText, setSearchText] = useState("");
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(1);
  // const [totalCount, setTotalCount] = useState(0);
  // const [totalPages, setTotalPages] = useState(2);

  // const handleChangePage = (newPage) => {y
  //   if (newPage == 1) {
  //     setUsers([members[1]]);
  //   } else {
  //     setUsers([members[0]]);
  //   }
  //   setPage(newPage);
  // };
  // const searchFunction = () => {
  //   const filteredData = members.filter((item) =>
  //     item.name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setUsers(filteredData);
  // };

  const handleEdit = (value) => {
    navigate(`/events/editevent/${value._id}`, { state: { user: value } });
  };
  const handleDelete = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onConfirm = () => {
    setUsers(users.filter((item) => item._id !== ValueForDeleting._id));
    setModelOpen(false);
  };
  const onCancel = () => {
    setModelOpen(false);
  };

  const getData = () => {
    const data = events.map((item) => {
      return {
        ...item,
        // is_show_celendar: true,
        // link: {
        //   to: "https://www.google.com/",
        //   target: "_blank",
        //   show_text: "Preview",
        // },
        // thumbnail: {
        //   src: item.profileImage,
        //   alt: "Profile Image",
        // },
        // html: "<div>html text </div>",
      };
    });
    setUsers(data);
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
        >
          <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
        </svg>
      ),
      handleClick: handleDelete,
      // child_options: [
      //   {
      //     label: "Setting",
      //      icon: "📄",
      //     handleClick: handleEdit,
      //   },
      // ],
    },
  ];

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "number",
      label: "Id",
      type: "number",
    },
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
    { id: "EventHost", label: "Event Host" },
    { id: "StartDate", label: "Start Date" },
    {
      id: "any",
      label: "End Date",
      renderData: (row) => {
        return <div>{row.EndDate}</div>;
      },
    },
    { id: "Venue", label: "Venue", type: "row_Venue" },
    { id: "status", label: "Status", type: "row_status" },
  ];

  useEffect(() => {
    getData();
  }, []);
  const handleCloseModal = () => {
    setModelOpen(false);
  };
  const handleAddingMember = () => {
    navigate("/events/addevent");
  };

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
      <div className="Exhibitors-Table">
        <ReactTable
          data={users} // required
          TABLE_HEAD={TABLE_HEAD} // required
          MENU_OPTIONS={MENU_OPTIONS} // required
          // custom_search={
          //   {
          //     // searchText: searchText,
          //     // setSearchText: setSearchText,
          //     // handleSubmit: searchFunction,
          //   }
          // }
          // custom_pagination={{
          //   total_count: totalCount,
          //   rows_per_page: rowsPerPage,
          //   page: page,
          //   total_pages: totalPages,
          //   handleChangePage: handleChangePage,
          // }}
          class_name=""
          theme_config={{
            background: "white",
            color: "black",
            iconColor: "#7396CC",
          }}
          is_sticky_header={false}
          is_hide_footer_pagination={false}
          is_hide_header_pagination={true}
          is_hide_search={true}
        />
      </div>
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
