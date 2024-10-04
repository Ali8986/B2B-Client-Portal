import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "./DeletingUser";
import Loader from "../../Components/GeneralComponents/LoadingIndicator";
import { ExhibitorList } from "../../DAL/Login/Login";
import { type } from "@testing-library/user-event/dist/type";
import Chip from "@mui/material/Chip";

function Exhibitors() {
  const [loading, setLoading] = useState(true); // Set to true initially
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const [members, setMembers] = useState([
    {
      _id: 1,
      name: "John Smith",
      company: {
        name: "ABC Innovations",
        website: "https://abcinnovations.com",
      },
      email: "john.smith@example.com",
      phone: "+1-555-123-4567",
      social_links: JSON.stringify([
        { platform: "LinkedIn", url: "https://linkedin.com/in/johnsmith" },
        { platform: "Twitter", url: "https://twitter.com/johnsmith" },
      ]),
      products_services: JSON.stringify(["AI Software", "Cloud Solutions"]),
      status: "Rejected",
      image: null,
      booth: "A1",
    },
    {
      _id: 2,
      name: "Jane Doe",
      company: {
        name: "XYZ Corp",
        website: "https://xyzcorp.com",
      },
      email: "jane.doe@example.com",
      phone: "+1-555-987-6543",
      social_links: JSON.stringify([
        { platform: "Facebook", url: "https://facebook.com/janedoe" },
        { platform: "LinkedIn", url: "https://linkedin.com/in/janedoe" },
      ]),
      products_services: JSON.stringify([
        "SEO Services",
        "Digital Advertising",
      ]),
      status: "Pending",
      image: null,
      booth: "B5",
    },
    {
      _id: 3,
      name: "Michael Johnson",
      company: {
        name: "DEF Solutions",
        website: "https://defsolutions.com",
      },
      email: "michael.johnson@example.com",
      phone: "+44-7890-123456",
      social_links: JSON.stringify([
        { platform: "LinkedIn", url: "https://linkedin.com/in/michaeljohnson" },
        { platform: "Twitter", url: "https://twitter.com/michaeljohnson" },
      ]),
      products_services: JSON.stringify([
        "IoT Devices",
        "Smart Home Solutions",
      ]),
      status: "Confirmed",
      image: null,
      booth: "C12",
    },
  ]);
  const [users, setUsers] = useState([]);
  const getData = () => {
    const data = members.map((item) => {
      return {
        ...item,
        is_show_celendar: true,
        name: item.name,
        link: {
          to: "https://www.google.com/",
          target: "_blank",
          show_text: "Preview",
        },
        thumbnail: {
          src: item.profileImage,
          alt: "Profile Image",
        },
        status: item.status,
        html: "<div>html text </div>",
      };
    });
    setUsers(data);
  };
  const [ValueForDeleting, setValueForDeleting] = useState(null);

  // getting data from API
  // const GetExhibitorsList = async () => {
  //   const response = await ExhibitorList();
  //   if (response.code === 200) {
  //     console.log(response, "Success....................................");
  //     const mappedUsers = response.exhibitors.map((item) => ({
  //       ...item,
  //       name: item.name || "Unknown",
  //       status: item.status,
  //       is_show_celendar: false,
  //       link: {
  //         to: "https://www.google.com/",
  //         target: "_blank",
  //         show_text: "Preview",
  //       },
  //       html: "<div>Hello </div>",
  //     }));
  //     setUsers(mappedUsers);
  //     setLoading(false);
  //   } else {
  //     alert("Please select");
  //     setLoading(false);
  //   }
  // };
  // const mappedUsers = response.speakers.map((item) => ({
  //   ...item,
  //   name: `${item.first_name} ${item.last_name}` || "Unknown",
  //   status: item.status,
  //   is_show_celendar: false,
  //   link: {
  //     to: "https://www.google.com/",
  //     target: "_blank",
  //     show_text: "Preview",
  //   },
  //   html: "<div>Hello </div>",
  // }));
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
    navigate(`/exhibitors/editexhibitor/${value._id}`, {
      state: { user: value },
    });
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
      id: "name",
      label: "Exhibitor",
      type: "name ",
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
            <div>{row.company.website}</div>
          </>
        );
      },
    },
    {
      id: "any",
      label: "Booth",
      renderData: (row) => {
        return <div>{row.booth}</div>;
      },
    },
    {
      id: "any",
      label: "Products/Services",
      renderData: (row) => {
        // Parsing the products/services JSON string to display
        const products = JSON.parse(row.products_services);
        return <div>{products.join(", ")}</div>;
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
                  : row.status === "Rejected"
                  ? "Rejected"
                  : ""
              }
              color={
                row.status === "Pending"
                  ? "secondary"
                  : row.status === "Confirmed"
                  ? "success"
                  : row.status === "Rejected"
                  ? "error"
                  : ""
              }
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
    // GetExhibitorsList();
    setLoading(false);
  }, []);
  const handleCloseModal = () => {
    setModelOpen(false);
  };
  const handleAddingMember = () => {
    navigate("/exhibitors/addexhibitor/");
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
          Exhibitors
        </h2>
        <Button
          variant="contained"
          size="medium"
          onClick={handleAddingMember}
          className="Data-Adding-Btn"
        >
          ADD Exhibitor
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
