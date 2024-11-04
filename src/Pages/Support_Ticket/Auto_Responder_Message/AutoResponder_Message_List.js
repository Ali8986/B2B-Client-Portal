import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import DeletingModal from "../../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../../Exhibitors/DeletingUser";
import {
  AutoResponder_Message_List,
  Delete_AutoResponder,
} from "../../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import HeaderWithBackButton from "../../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DetailsModal from "../../../Components/GeneralComponents/detailsModal";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ToolTip from "../../../Components/GeneralComponents/ToolTip";
import AutoResponderDetails from "../../../Components/AutoResponder/AutoResponder_Deatils";
import ReactDataTable from "../../../Components/GeneralComponents/React_Table";

function AutoResponderMessageList() {
  const { enqueueSnackbar } = useSnackbar();
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedObject, setSelectedObject] = useState(null);
  const [AutoResponderList, setAutoResponderList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const navigate = useNavigate();
  const FetchAutoResponderList = async (page, rowsPerPage, savedSearchText) => {
    setLoading(true);
    const response = await AutoResponder_Message_List(
      savedSearchText,
      page,
      rowsPerPage
    );
    console.log(response, "response");
    if (response.code === 200) {
      const { autoresponder_message_list, total_count, total_pages } = response;
      const proccessedData = autoresponder_message_list.map((item) => ({
        ...item,
        name: item.name || "name not found",
        status: item.status,
      }));
      setAutoResponderList(proccessedData);
      setTotalCount(total_pages);
      setTotalPages(total_count);
      localStorage.setItem("rowsPerPage", totalCount);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
    FetchAutoResponderList(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchAutoResponderList(0, newRowsPerPage);
  };
  const handleEdit = (value) => {
    navigate(`/autoresponder-message/Update/${value._id}`, { state: value });
  };

  const handleDelete = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const response = await Delete_AutoResponder(valueForDeleting._id);
    if (response.code === 200) {
      // eslint-disable-next-line
      const AutoResponderAfterDel = AutoResponderList?.filter(
        //eslint-disable-next-line
        (AutoResponder) => {
          if (AutoResponder._id !== valueForDeleting._id) {
            // eslint-disable-next-line
            return (AutoResponder.name = AutoResponder.name);
          }
        }
      );
      setTotalPages((prev) => prev - 1);
      setAutoResponderList(AutoResponderAfterDel);
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
    const selectedObj = AutoResponderList.find((item) => item._id === row._id);
    setSelectedObject(selectedObj);
    setShowDetails(true);
  };

  const AddingAutoResponderMessage = () => {
    navigate("/autoresponder-message/add-autoresponder-message");
  };

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "name",
      label: "Responder",
      renderData: (row, index) => {
        return (
          <ToolTip key={index} title='View Details' arrow>
            <span
              className=' cursor-pointer'
              onClick={() => handleDetails(row)}
            >
              {row.name}
            </span>
          </ToolTip>
        );
      },
    },
    {
      id: "any",
      label: "Action By",
      renderData: (row) => {
        return <div>{row.action_by.action_user_type}</div>;
      },
    },
    {
      id: "any",
      label: "Admin",
      renderData: (row) => {
        return <div>{row.action_by.name}</div>;
      },
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
    localStorage.setItem("searchText_AutoResponder_page", searchText);
    setPage(0);
    await FetchAutoResponderList(0, rowsPerPage, searchText);
  };
  const showAutoResponderMessageList = (e) => {
    e.preventDefault();
    setShowDetails(true);
  };
  const hideAutoResponderMessageList = (e) => {
    e.preventDefault();
    setShowDetails(false);
    setSelectedObject(null);
  };

  useEffect(() => {
    const savedSearchText = localStorage.getItem(
      "searchText_AutoResponder_page"
    );
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchAutoResponderList(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchAutoResponderList(page, rowsPerPage);
    }
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <div className='row my-4 mx-3'>
      <div className='d-flex justify-content-between align-items-center my-4 '>
        <HeaderWithBackButton
          className='Layout-heading'
          title='Auto Responder Message'
        />
        <Button
          variant='contained'
          size='medium'
          onClick={AddingAutoResponderMessage}
          className='Data-Adding-Btn'
        >
          add auto responder message
        </Button>
      </div>
      <div className='AutoResponder_Message_Table'>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center circular_progress_bar '>
            <CircularProgress />
          </div>
        ) : (
          <>
            <ReactDataTable
              data={AutoResponderList}
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
          </>
        )}
      </div>
      <DetailsModal
        open={showDetails}
        handleClose={hideAutoResponderMessageList}
        component={
          <AutoResponderDetails
            handleOpen={showAutoResponderMessageList}
            handleClose={hideAutoResponderMessageList}
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

export default AutoResponderMessageList;
