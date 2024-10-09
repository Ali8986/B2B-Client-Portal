import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../../Pages/Exhibitors/DeletingUser";
import { DeletingSpeaker, SpeakersList } from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import defaultimg from "../../Assets/Images/Default.jpg";
import { s3baseUrl } from "../../config/config";
import { Avatar } from "@mui/material";
import HeaderWithBackButton from "../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Speaker() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const navigate = useNavigate();
  const FetchSpeakerList = async (page, rowsPerPage) => {
    setLoading(true);
    let postData = {
      search: searchText,
      status: false,
    };
    const response = await SpeakersList(page, rowsPerPage, postData);
    if (response.code === 200) {
      localStorage.setItem("searchResults", JSON.stringify(response.speakers));
      const { speakers, total_speakers, total_pages } = response;
      console.log(
        response,
        "klaslkdjslakjldksalkjdlksalkdjlksajlkdjslkajdlksalkjlksajlkd"
      );
      const mappedUsers = speakers.map((item) => ({
        ...item,
        name: `${item.first_name} ${item.last_name}` || "Unknown",
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
      setTotalPages(total_speakers);
      localStorage.setItem("rowsPerPage", totalCount);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
    FetchSpeakerList(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchSpeakerList(0, newRowsPerPage);
  };
  const handleEdit = (value) => {
    navigate(`/speakers/edit/${value._id}`, { state: value });
  };

  const handleDelete = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const response = await DeletingSpeaker(valueForDeleting._id);
    if (response.code === 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      FetchSpeakerList();
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };

  const onCancel = () => {
    setModelOpen(false);
  };

  const handleAddingMember = () => {
    navigate("/speakers/addspeaker");
  };

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
      id: "name",
      label: "Speaker",
      renderData: (row) => row.name,
    },
    {
      id: "phone",
      label: "Contact Number",
      type: "phone",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
    },

    {
      id: "expertise",
      label: "Expertise",
      renderData: (row) =>
        row.expertise.map((row, index) => {
          return <div key={index}>{row}</div>;
        }),
    },
    {
      id: "status",
      label: "Status",
      type: "row_status",
    },
  ];
  const Menu_Options = [
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
  ];
  const searchFunction = async (e) => {
    e.preventDefault();
    localStorage.setItem("searchText", searchText);
    // Reset to page 0 for a new search
    setPage(0);

    // Fetch the search result, now for page 0
    await FetchSpeakerList(0, rowsPerPage);
  };

  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText");
    const savedSearchResults = localStorage.getItem("searchResults");
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      const searchedData = JSON.parse(savedSearchResults);
      setUsers(
        searchedData.map((item) => ({
          ...item,
          name: `${item.first_name} ${item.last_name}` || "Unknown",
          status: item.status,
          is_show_celendar: false,
          link: {
            to: "https://www.google.com/",
            target: "_blank",
            show_text: "Preview",
          },
          html: "<div>Hello </div>",
        }))
      );
      setSearchText(savedSearchText);
      setTotalPages(count);
      setLoading(false);
    } else {
      FetchSpeakerList(page, rowsPerPage);
    }
  }, [page, rowsPerPage]);

  return (
    <div className="row my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center my-4 ">
        <HeaderWithBackButton className="Layout-heading" title="Speakers" />
        <Button
          variant="contained"
          size="medium"
          onClick={handleAddingMember}
          className="Data-Adding-Btn"
        >
          ADD Speaker
        </Button>
      </div>
      <div className="Speakers_Table">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
            <CircularProgress />
          </div>
        ) : (
          <ReactTable
            data={users}
            TABLE_HEAD={TABLE_HEAD}
            MENU_OPTIONS={Menu_Options}
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
    </div>
  );
}

export default Speaker;
