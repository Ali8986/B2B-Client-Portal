import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../../Pages/Exhibitors/DeletingUser";
import {
  Deleting_Module_Configuration,
  Module_Configuration_List,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import HeaderWithBackButton from "../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function ModuleConfiguration() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [Modules, setModules] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const FetchModuleConfig = async (page, rowsPerPage, savedSearchText) => {
    const postData = {
      search: savedSearchText,
    };
    setLoading(true);
    const response = await Module_Configuration_List(
      page,
      rowsPerPage,
      postData
    );
    if (response.code === 200) {
      const { module_configuration, total_count, total_pages } = response;
      const mappedUsers = module_configuration.map((item) => ({
        ...item,
        name: `${item.first_name} ${item.last_name}` || "Unknown",
        status: item.module_configuration_status,
      }));
      setModules(mappedUsers);
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
    FetchModuleConfig(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchModuleConfig(0, newRowsPerPage);
  };

  const handleEdit = (value) => {
    navigate(
      `/module-configuration/edit-module/${value.module_configuration_slug}`,
      {
        state: value,
      }
    );
  };

  const handleDelete = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onConfirm = async (e) => {
    e.preventDefault();

    const response = await Deleting_Module_Configuration(
      valueForDeleting.module_configuration_slug
    );
    if (response.code === 200) {
      const ModulesAfterDeletion = Modules.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          return (user.name = user.name);
        }
      });
      setTotalPages((prev) => prev - 1);
      setModules(ModulesAfterDeletion);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };

  const onCancel = () => {
    setModelOpen(false);
  };

  const handleAddingMember = () => {
    navigate("/module-configuration/add-module");
  };

  const searchFunction = async (e) => {
    e.preventDefault();
    localStorage.setItem("searchText_Module_Config_page", searchText);
    setPage(0);
    await FetchModuleConfig(0, rowsPerPage, searchText);
  };

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "any",
      label: "Template Name",
      className: "cursor-pointer",
      renderData: (row, index) => {
        return <span>{row.module_configuration_name}</span>;
      },
    },
    {
      id: "module_configuration_type",
      label: "Module Type",
      type: "module_configuration_type",
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

  useEffect(() => {
    const savedSearchText = localStorage.getItem(
      "searchText_Module_Config_page"
    );
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchModuleConfig(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchModuleConfig(page, rowsPerPage);
    }
  }, [page, rowsPerPage]);

  return (
    <div className="row my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center my-4 ">
        <HeaderWithBackButton
          className="Layout-heading"
          title="Module Configuration"
        />
        <Button
          variant="contained"
          size="medium"
          onClick={handleAddingMember}
          className="Data-Adding-Btn"
        >
          Create Module
        </Button>
      </div>
      <div className="Template_Configuration">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
            <CircularProgress />
          </div>
        ) : (
          <ReactTable
            data={Modules}
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

export default ModuleConfiguration;
