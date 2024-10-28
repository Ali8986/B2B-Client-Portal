import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Avatar, Button, CircularProgress } from "@mui/material";
import DeletingModal from "../../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../../Exhibitors/DeletingUser";
import {
  Deleting_Web_Mod,
  List_Website_Module_Against_Page,
  Website_Pages_List,
} from "../../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import HeaderWithBackButton from "../../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BasicBreadcrumbs from "../../../Components/GeneralComponents/BreadCrumbs";

function ManageWebPageModule() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { webPageId } = useParams();
  const location = useLocation();
  const { state } = location || {};
  const [loading, setLoading] = useState(true);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [WebsiteModules, setWebsiteModules] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageId, setPageId] = useState("");
  const [userData, setUserData] = useState([]);
  const breadcrumbItems = [
    {
      navigation: "/website-pages",
      title: "Website Pages",
      status: "Inactive",
    },
    { title: `${userData[0]?.module_configuration_name}`, status: "Active" },
  ];

  const Fetch_Website_Module = async (page, rowsPerPage, SearhPage) => {
    setLoading(true);
    const response = await List_Website_Module_Against_Page(
      page,
      rowsPerPage,
      pageId || webPageId,
      SearhPage
    );
    if (response.code === 200) {
      const { website_module, total_count, total_pages } = response;
      const mappedUsers = website_module.map((item) => ({
        ...item,
        name: item.module_title || "Unknown",
        status: item.status,
        // data: Object.entries(item.module_data || {}).map(([key, value]) => ({
        //   field: key,
        //   content: value,
        // })),
      }));
      setWebsiteModules(mappedUsers);
      setTotalCount(total_pages);
      setTotalPages(total_count);
      localStorage.setItem("rowsPerPage", totalCount);
      setLoading(false);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  const searchFunction = (e) => {
    e.preventDefault();
    localStorage.setItem("searchText_Website_Module_Pages", searchText);
    setPage(0);
    Fetch_Website_Module(page, rowsPerPage, searchText);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    Fetch_Website_Module(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    Fetch_Website_Module(0, newRowsPerPage);
  };

  const HandleEditingWebsiteModules = (value) => {
    navigate(
      `/website-pages/${value?.web_page_id}/${userData[0]?.module_configuration_slug}/edit-module/${value?.module_title_slug}`,
      {
        state: {
          webPageID: pageId,
          ModuleData: userData[0] ? userData[0] : "",
          pageData: value,
        },
      }
    );
  };

  const HandleAddingWebModule = () => {
    const isAddingTrue = true;
    navigate(
      `/website-pages/${pageId}/${userData[0]?.module_configuration_slug}/add-module`,
      {
        state: {
          webPageID: pageId,
          ModuleData: userData[0] ? userData[0] : "",
          isAdding: isAddingTrue,
        },
      }
    );
  };

  const handleDeletingWebsiteModules = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onCancel = () => {
    setModelOpen(false);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const response = await Deleting_Web_Mod(valueForDeleting.module_title_slug);
    if (response.code === 200) {
      const WebsiteModulesAfterDeletion = WebsiteModules.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          return user;
        }
      });
      setTotalPages((prev) => prev - 1);
      setWebsiteModules(WebsiteModulesAfterDeletion);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };

  const handle_Update_Web_Module_Content = (value) => {
    navigate(
      `/website-pages/${value.web_page_id}/${userData[0]?.module_configuration_slug}/update/${value.module_title_slug}`,
      { state: value }
    );
  };

  // const handleClick = (value) => {
  //   const Website_Id = value.module_configuration.find((page) => page._id);
  //   navigate(
  //     `/website-pages/${Website_Id._id}/${Website_Id.module_configuration_slug}`,
  //     {
  //       state: { userData: value.module_configuration },
  //     }
  //   );
  // };

  const Menu_Options = [
    {
      label: "Update Web Module Content",
      icon: <EditIcon />,
      handleClick: handle_Update_Web_Module_Content,
    },
    {
      label: "Edit",
      icon: <EditIcon />,
      handleClick: HandleEditingWebsiteModules,
    },
    {
      label: "Delete",
      icon: <DeleteForeverIcon className='Delete-Icon' />,
      handleClick: handleDeletingWebsiteModules,
    },
  ];

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "name",
      label: "Name",
      type: "row_name",
    },
    // {
    //   id: "any",
    //   label: "Photo",
    //   renderData: (row) => {
    //     return row.data.map((item, index) => {
    //       return (
    //         <div key={index}>
    //           <div>
    //             {item.content.startsWith("http") && (
    //               <Avatar
    //                 sx={{ width: 50, height: 50 }}
    //                 src={item.content}
    //                 alt={item.field}
    //               />
    //             )}
    //           </div>
    //         </div>
    //       );
    //     });
    //   },
    // },
    {
      id: "action_by",
      label: "Action by",
      type: "action_by",
    },
    {
      id: "status",
      label: "Status",
      type: "row_status",
    },
  ];

  const Get_Web_Pages = async () => {
    setLoading(true);
    const response = await Website_Pages_List();
    if (response.code === 200) {
      const page = response.website_pages.find(
        (value) => value._id === webPageId
      );
      setUserData(page.module_configuration);
      setPageId(page._id);
      // setUserData(response.data);
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    const savedSearchText = localStorage.getItem(
      "searchText_Website_Module_Pages"
    );
    if (state) {
      const { userData, pageId } = state;
      setUserData(userData);
      setPageId(pageId);
      const count = localStorage.getItem("rowsPerPage");
      if (savedSearchText) {
        setSearchText(savedSearchText);
        Fetch_Website_Module(page, rowsPerPage, savedSearchText);
        setTotalPages(count);
      } else {
        Fetch_Website_Module(page, rowsPerPage);
      }
    } else {
      Fetch_Website_Module(page, rowsPerPage, savedSearchText);
      Get_Web_Pages();
    }
  }, [page, rowsPerPage]);
  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center circular_progress_bar '>
          <CircularProgress />
        </div>
      ) : (
        <div className='row my-4 mx-3'>
          <div className='d-flex justify-content-between align-items-center my-4 ps-1'>
            <div className='col-6'>
              <HeaderWithBackButton
                className='Layout-heading'
                main={true}
                path='/website-pages'
                title={`${userData[0]?.module_configuration_name}`}
              />
            </div>
            <div className='col-4 d-flex justify-content-end'>
              <Button
                variant='contained'
                size='medium'
                onClick={HandleAddingWebModule}
                className='Data-Adding-Btn'
              >
                {`Add ${userData[0]?.module_configuration_name}`}
              </Button>
            </div>
          </div>
          <div className='col-12 mb-3 ms-4 ps-4'>
            <BasicBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className='Website_Configuration'>
            <ReactTable
              data={WebsiteModules}
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
      )}
    </>
  );
}

export default ManageWebPageModule;
