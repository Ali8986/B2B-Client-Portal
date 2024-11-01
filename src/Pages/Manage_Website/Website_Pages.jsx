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
      const proccessedData = website_pages.map((item) => ({
        ...item,
        name: item.website_page_title || "Unknown",
        status: item.status,
      }));
      setWebsitePages(proccessedData);
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
      // eslint-disable-next-line
      const WebsitePagesAfterDeletion = WebsitePages.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          // eslint-disable-next-line
          return user;
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
    navigate(`/website-pages/update-page-content/${value.page_slug}`);
  };

  const handleClick = (value) =>{
    const Website_Id = value.module_configuration.find(page => page._id)
    navigate(`/website-pages/${value._id}/${Website_Id.module_configuration_slug}`, {
      state: {userData: value.module_configuration, pageId:value._id},
    })
  }

  const generateMenuOptions = (page) => {
    let Menu_Options = [
      {
        label: "Update Page Content",
        icon: <EditIcon />,
        handleClick: () => handleUpdatePageContent(page),
      },
      {
        label: "Edit",
        icon: <EditIcon />,
        handleClick: () => HandleEditingWebsitePAges(page),
      },
      {
        label: "Delete",
        icon: <DeleteForeverIcon className="Delete-Icon" />,
        handleClick: () => handleDeletingWebsitePages(page),
      },
    ];

    // Dynamically add options based on `module_configuration`
    if (page.module_configuration && Array.isArray(page.module_configuration)) {
      page.module_configuration.forEach((config) => {
        Menu_Options.splice(1,0,{
          label: config.module_configuration_name || "Custom Action",
          icon: <EditIcon />, 
          handleClick: handleClick,
        });
      });
    }
    return Menu_Options;
  };

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "any",
      label: "Page Title",
      renderData: (row) => {
        return <span>{row.website_page_title}</span>;
      },
    },
    {
      id: "status",
      label: "Status",
      type: "row_status",
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
    // eslint-disable-next-line
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
            data={WebsitePages.map((page) => ({
              ...page,
              menuOptions: generateMenuOptions(page), // Attach dynamic Menu_Options per row
            }))}
            TABLE_HEAD={TABLE_HEAD}
            MENU_OPTIONS={(row) => row.menuOptions} // Pass dynamic menu options per row
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
