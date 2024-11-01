import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import DeletingModal from "../../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../../Exhibitors/DeletingUser";
import { Delete_Department, Departments_List } from "../../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import HeaderWithBackButton from "../../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DetailsModal from "../../../Components/GeneralComponents/detailsModal";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ToolTip from "../../../Components/GeneralComponents/ToolTip";
import DepartmentDetails from "../../../Components/Departments/Department_Details";
import ReactDataTable from "../../../Components/GeneralComponents/React_Table";

function Departments() {
  const { enqueueSnackbar } = useSnackbar();
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedObject, setSelectedObject] = useState(null);
  const [Departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const navigate = useNavigate();
  const FetchDepartmentsList = async (page, rowsPerPage, savedSearchText) => {
    setLoading(true);
    const response = await Departments_List(savedSearchText, page, rowsPerPage);
    console.log(response, "response");
    if (response.code === 200) {
      const { department, total_count, total_pages } = response;
      const proccessedData = department.map((item) => ({
        ...item,
        name: item.name || "name not found",
        status: item.status,
      }));
      setDepartments(proccessedData);
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
    FetchDepartmentsList(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchDepartmentsList(0, newRowsPerPage);
  };
  const handleEdit = (value) => {
    navigate(`/departments/Update/${value._id}`, { state: value });
  };

  const handleDelete = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const response = await Delete_Department(valueForDeleting._id);
    if (response.code === 200) {
      // eslint-disable-next-line
      const DepartmentAfterDel = Departments?.filter((department) => {
        if (department._id !== valueForDeleting._id) {
          // eslint-disable-next-line
          return (department.name = department.name);
        }
      });
      setTotalPages((prev) => prev - 1);
      setDepartments(DepartmentAfterDel);
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
    const selectedObj = Departments.find((item) => item._id === row._id);
    setSelectedObject(selectedObj);
    setShowDetails(true);
  };

  const handleAddingDepartment = () => {
    navigate("/departments/add-department");
  };

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "name",
      label: "Department",
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
    localStorage.setItem("searchText_Departments_page", searchText);
    setPage(0);
    await FetchDepartmentsList(0, rowsPerPage, searchText);
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
    const savedSearchText = localStorage.getItem("searchText_Departments_page");
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchDepartmentsList(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchDepartmentsList(page, rowsPerPage);
    }
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <div className='row my-4 mx-3'>
      <div className='d-flex justify-content-between align-items-center my-4 '>
        <HeaderWithBackButton className='Layout-heading' title='Departments' />
        <Button
          variant='contained'
          size='medium'
          onClick={handleAddingDepartment}
          className='Data-Adding-Btn'
        >
          ADD Department
        </Button>
      </div>
      <div className='Speakers_Table'>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center circular_progress_bar '>
            <CircularProgress />
          </div>
        ) : (
          <>
            <ReactDataTable
              data={Departments}
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
        handleClose={hideSpeakerDetailsModal}
        component={
          <DepartmentDetails
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

export default Departments;
