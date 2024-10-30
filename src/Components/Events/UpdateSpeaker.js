import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Button, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import defaultimg from "../../Assets/Images/Default.jpg";
import { s3baseUrl } from "../../config/config";
import { Avatar } from "@mui/material";
import HeaderWithBackButton from "../../Components/backButton";
import SpeakerDetailsModal from "../../Components/Speaker/SpeakerDetails";
import DetailsModal from "../../Components/GeneralComponents/detailsModal";
import BasicBreadcrumbs from "../GeneralComponents/BreadCrumbs";
import {
  List_Company_EXhibitor_Speaker,
  Update_Speaker_In_Event,
} from "../../DAL/Login/Login";
import { useParams } from "react-router-dom";
import ToolTip from "../GeneralComponents/ToolTip";

function UpdateEventsSpeaker() {
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [selected, setSelected] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedObject, setSelectedObject] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [eventName, setEventName] = useState("");

  const FetchSpeakerList = async (page, rowsPerPage, savedSearchText) => {
    setLoading(true);
    const response = await List_Company_EXhibitor_Speaker(
      page,
      rowsPerPage,
      savedSearchText,
      "speaker",
      id
    );
    if (response.code === 200) {
      const { list, event, total_speakers, total_pages } = response;
      const mappedUsers = list?.map((item) => ({
        ...item,
        name: `${item.first_name} ${item.last_name}` || "Unknown",
        status: item.status,
      }));
      setUsers(mappedUsers);
      setTotalCount(total_pages);
      setTotalPages(total_speakers);
      localStorage.setItem("rowsPerPage", totalCount);
      setSelected(event.speakers);
      setEventName(event.name);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  const breadcrumbItems = [
    {
      navigation: "/events",
      title: `${eventName}`,
      status: "Inactive",
    },
    { title: `Update Speaker`, status: "Active" },
  ];

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

  const handleDetails = (row) => {
    const selectedObj = users.find((item) => item._id === row._id);
    setSelectedObject(selectedObj);
    setShowDetails(true);
  };

  const HandleUpdate = async () => {
    const SelectedSpeakers = selected.map((user) => ({
      _id: user?._id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      expertise: user?.expertise || [],
    }));

    const formData = {
      speakers: SelectedSpeakers,
    };

    setLoading(true);
    const response = await Update_Speaker_In_Event(formData, id);
    if (response.code === 200) {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const TABLE_HEAD = [
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
          <ToolTip key={index} title='View Details'>
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
  const Menu_Options = [];
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
      <div className='col-12 mt-3'>
        {loading ? null : <BasicBreadcrumbs items={breadcrumbItems} />}
      </div>
      <div className='d-flex justify-content-between align-items-center my-4 '>
        {loading ? null : (
          <HeaderWithBackButton className='Layout-heading' title='Speakers' />
        )}
      </div>
      <div className='Speakers_Table'>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center circular_progress_bar '>
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
            checkbox_selection={{
              selected: selected,
              setSelected: setSelected,
              // selected_by: "",
            }}
            class_name=''
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
      <div className='d-flex justify-content-end mt-3'>
        <Button
          variant='contained'
          size='medium'
          onClick={HandleUpdate}
          className=''
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default UpdateEventsSpeaker;
