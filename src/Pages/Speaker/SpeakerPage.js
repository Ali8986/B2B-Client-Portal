import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../../Pages/Exhibitors/DeletingUser";
import Loader from "../../Components/GeneralComponents/LoadingIndicator";
import { SpeakersList } from "../../DAL/Login/Login";
function Speaker() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const navigate = useNavigate();

  // Data fetching logic
  useEffect(() => {
    const fetchData = async () => {
      const response = await SpeakersList();
      if (response.code === 200) {
        const mappedUsers = response.speakers.map((item) => ({
          ...item,
          name: item.name || "Unknown",
          is_show_celendar: false,
          link: {
            to: "https://www.google.com/",
            target: "_blank",
            show_text: "Preview",
          },
          html: "<div>Hello </div>",
        }));
        setUsers(mappedUsers);
      } else {
        console.error("Failed to fetch data");
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleEdit = (value) => {
    navigate(`/speakers/editspeaker/${value.id}`, { state: { user: value } });
  };

  const handleDelete = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onConfirm = () => {
    setUsers(users.filter((item) => item._id !== valueForDeleting._id));
    setModelOpen(false);
  };

  const onCancel = () => {
    setModelOpen(false);
  };

  const handleAddingMember = () => {
    navigate("/speakers/addspeaker");
  };

  // const filterDataByName = (searchTerm) => {
  //   return users.filter((user) =>
  //     (user.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // };

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "name",
      label: "Name",
      accessor: (row) => row.name,
    },
    {
      id: "first_name",
      label: "First Name",
      accessor: (row) => row.first_name,
    },
    {
      id: "last_name",
      label: "Last Name",
      accessor: (row) => row.last_name,
    },
    {
      id: "expertise",
      label: "Expertise",
      accessor: (row) => row.expertise.map((row) => row),
    },
  ];

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
          Speakers
        </h2>
        <Button
          variant="contained"
          size="medium"
          onClick={handleAddingMember}
          className="Data-Adding-Btn"
        >
          ADD Speaker
        </Button>
      </div>
      <div className="Exhibitors-Table">
        {loading ? (
          <Loader />
        ) : (
          <ReactTable
            data={users} // Example usage of filtering
            TABLE_HEAD={TABLE_HEAD}
            MENU_OPTIONS={[
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
              },
            ]}
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
      <DeletingModal
        className="Deleting-modal"
        open={modelOpen}
        handleClose={() => setModelOpen(false)}
        component={
          <DeletionConfirmation onConfirm={onConfirm} onCancel={onCancel} />
        }
      />
    </div>
  );
}

export default Speaker;
