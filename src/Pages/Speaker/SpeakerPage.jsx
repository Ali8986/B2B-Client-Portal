import React, { useState, useEffect } from "react";
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
import SpeakerDetailsModal from "../../Components/Speaker/SpeakerDetails";
import DetailsModal from "../../Components/GeneralComponents/detailsModal";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ToolTip from "../../Components/GeneralComponents/ToolTip";
import ReactDataTable from "../../Components/GeneralComponents/React_Table";

function Speaker() {
  const { enqueueSnackbar } = useSnackbar();
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedObject, setSelectedObject] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const navigate = useNavigate();
  const FetchSpeakerList = async (page, rowsPerPage, savedSearchText) => {
    setLoading(true);
    let postData = {
      search: savedSearchText,
    };
    const response = await SpeakersList(page, rowsPerPage, postData);
    if (response.code === 200) {
      const { speakers, total_speakers, total_pages } = response;
      const proccessedData = speakers.map((item) => ({
        ...item,
        name: `${item.first_name} ${item.last_name}` || "Unknown",
        status: item.status,
      }));
      setUsers(proccessedData);
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
      // eslint-disable-next-line
      const SpeakersAfterDeletion = users.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          // eslint-disable-next-line
          return (user.name = user.name);
        }
      });
      setTotalPages((prev) => prev - 1);
      setUsers(SpeakersAfterDeletion);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };

  const onCancel = () => {
    setModelOpen(false);
  };
  const handleDetails = (row) => {
    const selectedObj = users.find((item) => item._id === row._id);
    setSelectedObject(selectedObj);
    setShowDetails(true);
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
      icon: <DeleteForeverIcon className='Delete-Icon' />,
      handleClick: handleDelete,
    },
    {
      label: "View Details",
      icon: <ContactPageIcon />,
      handleClick: handleDetails,
    },
  ];
  const searchFunction = async (e) => {
    e.preventDefault();
    localStorage.setItem("searchText_speaker_page", searchText);
    setPage(0);
    await FetchSpeakerList(0, rowsPerPage, searchText);
  };
  const showSpeakerDetailsModal = (e) => {
    e.preventDefault();
    setShowDetails(true);
  };
  const hideSpeakerDetailsModal = (e) => {
    e.preventDefault();
    setShowDetails(false);
    setSelectedObject(null);
  };

  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText_speaker_page");
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchSpeakerList(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchSpeakerList(page, rowsPerPage);
    }
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <div className='row my-4 mx-3'>
      <div className='d-flex justify-content-between align-items-center my-4 '>
        <HeaderWithBackButton className='Layout-heading' title='Speakers' />
        <Button
          variant='contained'
          size='medium'
          onClick={handleAddingMember}
          className='Data-Adding-Btn'
        >
          ADD Speaker
        </Button>
      </div>
      <div className='Speakers_Table'>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center circular_progress_bar '>
            <CircularProgress />
          </div>
        ) : (
          <ReactDataTable
            data={users}
            header={TABLE_HEAD}
            Menu={Menu_Options}
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
        )}
      </div>
      <DetailsModal
        open={showDetails}
        handleClose={hideSpeakerDetailsModal}
        component={
          <SpeakerDetailsModal
            handleOpen={showSpeakerDetailsModal}
            handleClose={hideSpeakerDetailsModal}
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

export default Speaker;
