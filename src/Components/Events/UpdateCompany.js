import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { Button, CircularProgress } from "@mui/material";
import {
  List_Company_EXhibitor_Speaker,
  Update_Company_In_Event,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import defaultimg from "../../Assets/Images/Default.jpg";
import { s3baseUrl } from "../../config/config";
import { Avatar } from "@mui/material";
import HeaderWithBackButton from "../../Components/backButton";
import Tooltip from "@mui/material/Tooltip";
import BasicBreadcrumbs from "../GeneralComponents/BreadCrumbs";
import { useParams } from "react-router-dom";
import ToolTip from "../GeneralComponents/ToolTip";

function UpdateEventsCompany() {
  const [eventName, setEventName] = useState("");
  const { id } = useParams();
  const breadcrumbItems = [
    {
      navigation: "/events",
      title: `${eventName}`,
      status: "Inactive",
    },
    {
      title: `Update Company`,
      status: "Active",
    },
  ];
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const FetchCompnayList = async (page, rowsPerPage, savedSearchText) => {
    setLoading(true);
    const response = await List_Company_EXhibitor_Speaker(
      page,
      rowsPerPage,
      savedSearchText,
      "company",
      id
    );
    if (response.code === 200) {
      const { event } = response;
      const processedCompanyList = response.list.map((item) => ({
        ...item,
        name: item.name || "Unknown",
        status: item.status,
      }));

      setUsers(processedCompanyList);
      setTotalCount(response.total_pages);
      setTotalPages(response.total_companies);
      localStorage.setItem("rowsPerPage", totalCount);
      setSelected([event.company]);
      setEventName(event.name);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    setLoading(false);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    FetchCompnayList(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchCompnayList(0, newRowsPerPage);
  };

  const handleUpdate = async () => {
    const formData = {
      company: selected[0],
    };
    setLoading(true);
    const response = await Update_Company_In_Event(formData, id);
    if (response.code === 200) {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleSelectRow = (row) => {
    setSelected([
      {
        _id: row._id,
        name: row.name,
        website: row.website,
      },
    ]);
  };

  const TABLE_HEAD = [
    {
      id: "checkbox",
      label: (
        <ToolTip title='Cannot Select All Fields Select Only One Company For the Events'>
          <input
            disabled
            type='checkbox'
            className='rowCheckbox disabled_checkbox'
          />
        </ToolTip>
      ),
      renderData: (row) => (
        <input
          type='checkbox'
          className={`rowCheckbox ${
            row.status !== true ? "disabled_checkbox" : "checked"
          }`}
          checked={
            Array.isArray(selected) &&
            selected.some((item) => item?._id === row?._id)
          }
          onChange={() => handleSelectRow(row)}
          disabled={row.status !== true}
          title={
            row.status !== true
              ? "The Status of This Speaker Is Inactive So cannot use Select Speaker"
              : ""
          }
        />
      ),
    },
    {
      id: "any",
      label: "Logo",
      renderData: (row, index) => {
        return (
          <div key={index} className='d-flex align-items-center'>
            <div className='me-2'>
              <Avatar
                className='img-fluid React_Table_image'
                src={
                  row.image && row.image.thumbnail_1
                    ? s3baseUrl + row.image.thumbnail_1
                    : defaultimg
                }
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
          <Tooltip key={index} title='View Details' arrow>
            <span>{row.name}</span>
          </Tooltip>
        );
      },
    },
    {
      id: "phone",
      label: "Contact Number",
      type: "phone",
    },
    {
      id: "industry",
      label: "Industry",
      type: "industry",
    },
    {
      id: "address",
      label: "Address",
      type: "address",
    },
    {
      id: "employees_count",
      label: "Employees Count",
      type: "employees_count",
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
    localStorage.setItem("searchText_company_page", searchText);
    setPage(0);
    await FetchCompnayList(0, rowsPerPage, searchText);
  };

  useEffect(() => {
    const savedSearchText = localStorage.getItem("searchText_company_page");
    const count = localStorage.getItem("rowsPerPage");

    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchCompnayList(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchCompnayList(page, rowsPerPage);
    }
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <div className='row my-4 mx-3'>
      <div className='col-12 mt-2 '>
        {!loading && <BasicBreadcrumbs items={breadcrumbItems} />}
      </div>
      <div className='d-flex justify-content-between align-items-center my-4 '>
        {!loading && (
          <HeaderWithBackButton className='Layout-heading' title='Company' />
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
            onRowSelect={handleSelectRow}
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
      <div className='d-flex justify-content-end mb-3 mt-4'>
        <Button
          variant='contained'
          size='medium'
          onClick={handleUpdate}
          className='Data-Adding-Btn'
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default UpdateEventsCompany;
