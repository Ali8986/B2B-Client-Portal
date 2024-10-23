import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../Exhibitors/DeletingUser";
import {
  Deleting_Website_Pages,
  Website_Pages_List,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import HeaderWithBackButton from "../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveAsIcon from '@mui/icons-material/SaveAs';

function WebsitePages() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [WebsitePages, setWebsitePages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const FetchWebsitePages = async (page, rowsPerPage, SearhPage) => {
    setLoading(true);
    const response = await Website_Pages_List(page, rowsPerPage, SearhPage);
    if (response.code === 200) {
      const { website_pages, total_count, total_pages } = response;
      const mappedUsers = website_pages.map((item) => ({
        ...item,
        name: item.website_page_title || "Unknown",
        status: item.status,
      }));
      setWebsitePages(mappedUsers);
      setTotalCount(total_pages);
      setTotalPages(total_count);
      localStorage.setItem("rowsPerPage", totalCount);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  const searchFunction = (e) => {
    e.preventDefault();
    localStorage.setItem("searchText_Website_Pages", searchText);
    setPage(0);
    FetchWebsitePages(page, rowsPerPage, searchText);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    FetchWebsitePages(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchWebsitePages(0, newRowsPerPage);
  };

  const HandleEditingWebsitePAges = (value) => {
    navigate(`/website-pages/edit-page/${value.page_slug}`, {
      state: value,
    });
  };

  const HandleAddingPages = () => {
    navigate("/website-pages/add-page");
  };

  const handleDeletingWebsitePages = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onCancel = () => {
    setModelOpen(false);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const response = await Deleting_Website_Pages(valueForDeleting.page_slug);
    if (response.code === 200) {
      const WebsitePagesAfterDeletion = WebsitePages.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          return (user.name = user.name);
        }
      });
      setTotalPages((prev) => prev - 1);
      setWebsitePages(WebsitePagesAfterDeletion);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };

  const handleUpdatePageContent = (value) => {
    navigate(`/website-pages/update-page-content/${value.template._id}`);
  }

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "any",
      label: "Page Title",
      renderData: (row, index) => {
        return <span>{row.website_page_title}</span>;
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
      handleClick: HandleEditingWebsitePAges,
    },
    {
      label: "Delete",
      icon: <DeleteForeverIcon className="Delete-Icon" />,
      handleClick: handleDeletingWebsitePages,
    },
    {
      label: "Update Page Content",
      icon: <SaveAsIcon />,
      handleClick: handleUpdatePageContent,
    },
  ];

  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText_Website_Pages");
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchWebsitePages(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchWebsitePages(page, rowsPerPage);
    }
  }, [page, rowsPerPage]);

  return (
    <div className="row my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center my-4 ">
        <HeaderWithBackButton
          className="Layout-heading"
          title="Website Pages"
        />
        <Button
          variant="contained"
          size="medium"
          onClick={HandleAddingPages}
          className="Data-Adding-Btn"
        >
          Add New Page
        </Button>
      </div>
      <div className="Website_Configuration">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
            <CircularProgress />
          </div>
        ) : (
          <ReactTable
            data={WebsitePages}
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

export default WebsitePages;
