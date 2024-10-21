import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../../Pages/Exhibitors/DeletingUser";
import {
  Deleting_Template_Configuration,
  Template_Configuration_List,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import HeaderWithBackButton from "../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import DetailsModal from "../../Components/GeneralComponents/detailsModal";
import Tooltip from "@mui/material/Tooltip";

function TemplateConfiguration() {
  const { enqueueSnackbar } = useSnackbar();
  // const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [selectedObject, setSelectedObject] = useState(null);
  const [Templates, setTemplates] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const navigate = useNavigate();
  const FetchTemplateConfig = async (page, rowsPerPage, savedSearchText) => {
    setLoading(true);
    const response = await Template_Configuration_List(
      page,
      rowsPerPage,
      savedSearchText
    );
    if (response.code === 200) {
      const { template_configuration, total_count, total_pages } = response;
      const mappedUsers = template_configuration.map((item) => ({
        ...item,
        name: `${item.first_name} ${item.last_name}` || "Unknown",
        status: item.template_status,
      }));
      setTemplates(mappedUsers);
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
    FetchTemplateConfig(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchTemplateConfig(0, newRowsPerPage);
  };
  const handleEdit = (value) => {
    navigate(`/template-configuration/edit-template/${value._id}`, {
      state: value,
    });
  };

  const handleDelete = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const response = await Deleting_Template_Configuration(
      valueForDeleting._id
    );
    if (response.code === 200) {
      const TemplatesAfterDeletion = Templates.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          return (user.name = user.name);
        }
      });
      setTotalPages((prev) => prev - 1);
      setTemplates(TemplatesAfterDeletion);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };

  const onCancel = () => {
    setModelOpen(false);
  };
  // const handleDetails = (row) => {
  //   const selectedObj = Templates.find((item) => item._id === row._id);
  //   setSelectedObject(selectedObj);
  //   setShowDetails(true);
  // };

  const handleAddingMember = () => {
    navigate("/template-configuration/add-template");
  };

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "any",
      label: "Template Name",
      className: "cursor-pointer",
      renderData: (row, index) => {
        return <span>{row.template_name}</span>;
      },
    },
    {
      id: "page_component_name",
      label: "Template Type",
      type: "page_component_name",
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
    localStorage.setItem("searchText_Template_Config_page", searchText);
    setPage(0);
    await FetchTemplateConfig(0, rowsPerPage, searchText);
  };

  // const showSpeakerDetailsModal = (e) => {
  //   e.preventDefault();
  //   setShowDetails(true);
  // };
  // const hideSpeakerDetailsModal = (e) => {
  //   e.preventDefault();
  //   setShowDetails(false);
  //   setSelectedObject(null);
  // };

  useEffect(() => {
    const savedSearchText = localStorage.getItem(
      "searchText_Template_Config_page"
    );
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchTemplateConfig(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchTemplateConfig(page, rowsPerPage);
    }
  }, [page, rowsPerPage]);

  return (
    <div className="row my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center my-4 ">
        <HeaderWithBackButton
          className="Layout-heading"
          title="Template Configuration"
        />
        <Button
          variant="contained"
          size="medium"
          onClick={handleAddingMember}
          className="Data-Adding-Btn"
        >
          Create Template
        </Button>
      </div>
      <div className="Template_Configuration">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
            <CircularProgress />
          </div>
        ) : (
          <ReactTable
            data={Templates}
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
      {/* <DetailsModal
        open={showDetails}
        handleClose={hideSpeakerDetailsModal}
        component={
          <SpeakerDetailsModal
            handleOpen={showSpeakerDetailsModal}
            handleClose={hideSpeakerDetailsModal}
            selectedObject={selectedObject}
          />
        }
      /> */}
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

export default TemplateConfiguration;
