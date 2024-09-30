import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "./DeletingUser";

function Exhibitors({ members }) {
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
    navigate(`/exhibitors/edituser/${value._id}`, { state: { user: value } });
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
    const data = members.map((item) => {
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
  };

  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: "✏️",
      handleClick: handleEdit,
    },
    {
      label: "Delete",
      icon: "🗑️",
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
      label: "Exhibitor",
      renderData: (row) => {
        return (
          <div className="d-flex align-items-center">
            <div className="me-2">
              <img
                className="img-fluid"
                src={row.thumbnail.src}
                alt={row.thumbnail.alt}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
            <div className="ms-3">{row.name}</div>
          </div>
        );
      },
    },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone Number" },
    {
      id: "any",
      label: "Job Title",
      renderData: (row) => {
        return <div>{row.jobTitle}</div>;
      },
    },
    { id: "status", label: "Status", type: "row_status" },
  ];

  useEffect(() => {
    getData();
  }, []);
  const handleCloseModal = () => {
    setModelOpen(false);
  };
  const handleAddingMember = () => {
    navigate("/exhibitors/adduser");
  };

  return (
    <div className="row my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center my-4 ">
        <h2
          style={{
            fontSize: 28,
            margin: 0,
            color: "#7396CC",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "-1px",
          }}
        >
          Exhibitors
        </h2>
        <Button variant="contained" size="medium" onClick={handleAddingMember}>
          ADD Exhibitor
        </Button>
      </div>
      <div className="Exhibitors-Table">
        <ReactTable
          data={users} // required
          TABLE_HEAD={TABLE_HEAD} // required
          MENU_OPTIONS={MENU_OPTIONS} // required
          custom_search={
            {
              // searchText: searchText,
              // setSearchText: setSearchText,
              // handleSubmit: searchFunction,
            }
          }
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
          is_hide_search={false}
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
