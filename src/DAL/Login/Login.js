import { invokeApi } from "../../bl_libs/invokeApi";

export const dashboardApi = async (data) => {
  const requestObj = {
    path: `/admin_users/dashboard?start_date=${data.start_date}&end_date=${data.end_date}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const adminInitApi = async () => {
  const requestObj = {
    path: `/admin_users/init_api`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const login = async (data) => {
  const requestObj = {
    path: `api/app_api/login`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const changePasswordApi = async (data) => {
  const requestObj = {
    path: `api/app_api/email_verification`,
    method: "POST",
    headers: {
      // "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const logout = async (data) => {
  const requestObj = {
    path: `api/app_api/logout`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const register = async (data) => {
  const requestObj = {
    path: `api/user_registor.php`,
    method: "POST",
    headers: {
      // 'x-sh-auth': localStorage.getItem('token')
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const confirmEmail = async (data) => {
  const requestObj = {
    path: `/admin_users/email_confirmation`,
    method: "POST",
    headers: {
      // 'x-sh-auth': localStorage.getItem('token')
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const confirmPinCode = async (data) => {
  const requestObj = {
    path: `api/app_api/code_verification`,
    method: "POST",
    headers: {
      // 'x-sh-auth': localStorage.getItem('token')
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const updatePassword = async (data) => {
  const requestObj = {
    path: `api/app_api/reset_password`,
    method: "POST",
    headers: {
      // 'x-sh-auth': localStorage.getItem('token')
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const profileDetail = async (data) => {
  const requestObj = {
    path: `api/admin/edit_admin`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const updateAdminPassword = async (data) => {
  const requestObj = {
    path: `api/app_api/change_password`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const updateProfile = async (data) => {
  const requestObj = {
    path: `api/admin/detail_admin`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const SpeakersList = async (page, limit, data) => {
  const requestObj = {
    path: `api/speaker/list_speaker?page=${page}&limit=${limit}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data || "",
  };
  return invokeApi(requestObj);
};

export const AddingSpeaker = async (data) => {
  const requestObj = {
    path: `api/speaker/add_speaker`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const EditingSpeaker = async (id, data) => {
  const requestObj = {
    path: `api/speaker/update_speaker/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
export const DeletingSpeaker = async (id) => {
  const requestObj = {
    path: `api/speaker/delete_speaker/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const ExhibitorList = async (page, limit, data) => {
  const requestObj = {
    path: `api/exhibitor/list_exhibitor?page=${page}&limit=${limit}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data || "",
  };
  return invokeApi(requestObj);
};

export const AddingExhibitor = async (data) => {
  const requestObj = {
    path: `api/exhibitor/add_exhibitor`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const EventList = async (page, limt, data) => {
  const requestObj = {
    path: `api/event/list_event?page=${page}&limit=${limt}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data || "",
  };
  return invokeApi(requestObj);
};

export const EditingEvent = async (id, data) => {
  const requestObj = {
    path: `api/event/update_event/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const AddingEvent = async (data) => {
  const requestObj = {
    path: `api/event/add_event`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const DeletingEvent = async (id) => {
  const requestObj = {
    path: `api/event/delete_event/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const SpeakerDetails = async (id) => {
  const requestObj = {
    path: `api/speaker/detail_speaker/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const ExhibitorDetails = async (id) => {
  const requestObj = {
    path: `api/exhibitor/detail_exhibitor/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const EditingExhibitor = async (id, data) => {
  const requestObj = {
    path: `api/exhibitor/update_exhibitor/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const DeletingExhibitor = async (id) => {
  const requestObj = {
    path: `api/exhibitor/delete_exhibitor/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const EventDetails = async (id) => {
  const requestObj = {
    path: `api/event/detail_event/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const ImageUpload = async (data) => {
  const requestObj = {
    path: `api/app_api/upload_image_s3`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const CompanyList = async (page, limt, data) => {
  const requestObj = {
    path: `api/company/list_company?page=${page}&limit=${limt}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data ? data : {},
  };
  return invokeApi(requestObj);
};

export const EditingCompany = async (id, data) => {
  const requestObj = {
    path: `api/company/update_company/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const AddingCompany = async (data) => {
  const requestObj = {
    path: `api/company/add_company`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const CompanyDetails = async (id) => {
  const requestObj = {
    path: `/api/company/detail_company/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
export const DeletingCompany = async (id) => {
  const requestObj = {
    path: `api/company/delete_company/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const ImageUploadSpecificDirectory = async (data) => {
  const requestObj = {
    path: `api/app_api/upload_image_s3_specific_directory`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const UpdateCompanyPassword = async (data, id) => {
  const requestObj = {
    path: `api/app_api/change_password_by_admin/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const S3ImageDeletion = async (data) => {
  const requestObj = {
    path: `api/app_api/delete_files_from_s3`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Template_Configuration_List = async (page, limt, data) => {
  const requestObj = {
    path: `api/template_configuration/list_template_configuration?page=${page}&limit=${limt}&search=${
      data ? data : ""
    }`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Creating_Template = async (data) => {
  const requestObj = {
    path: `api/template_configuration/add_template_configuration`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Editing_Template = async (id, data) => {
  const requestObj = {
    path: `api/template_configuration/update_template_configuration/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Template_Configuration_Details = async (id) => {
  const requestObj = {
    path: `api/template_configuration/get_template_configuration/${id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Deleting_Template_Configuration = async (id) => {
  const requestObj = {
    path: `api/template_configuration/delete_template_configuration/${id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Module_Configuration_List = async (page, limt, data) => {
  const requestObj = {
    path: `api/module_configuration/list_module_configuration_info?page=${page}&limit=${limt}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data ? data : {},
  };
  return invokeApi(requestObj);
};

export const Deleting_Module_Configuration = async (slug) => {
  const requestObj = {
    path: `api/module_configuration/delete_module_configuration_info/${slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Creating_Module = async (data) => {
  const requestObj = {
    path: `api/module_configuration/add_module_configuration_info`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Editing_Module = async (slug, data) => {
  const requestObj = {
    path: `api/module_configuration/update_module_configuration_info/${slug}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Module_Configuration_Details = async (slug) => {
  console.log(
    "Hello World Hello WorldHello WorldHello WorldHello WorldHello World",
    slug
  );

  const requestObj = {
    path: `api/module_configuration/get_module_configuration_info/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Website_Pages_List = async (page, limt, data) => {
  const requestObj = {
    path: `api/website_page/list_website_page?page=${page}&limit=${limt}&search=${
      data ? data : ""
    }`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data ? data : {},
  };
  return invokeApi(requestObj);
};

export const Deleting_Website_Pages = async (slug) => {
  const requestObj = {
    path: `api/website_page/delete_website_page/${slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Creating_Website_Page = async (data) => {
  const requestObj = {
    path: `api/website_page/add_website_page`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Editing_Website_Page = async (slug, data) => {
  const requestObj = {
    path: `api/website_page/update_website_page/${slug}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Website_Pages_Details = async (slug) => {
  const requestObj = {
    path: `api/website_page/get_website_page/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Template_Or_Module_Listing = async (page, limt, data) => {
  const requestObj = {
    path: `api/template_configuration/list_template_or_module?page=${page}&limit=${limt}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data ? data : {},
  };
  return invokeApi(requestObj);
};

export const Updating_page_Details = async (id, data) => {
  const requestObj = {
    path: `api/website_page/update_page_details_object/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data ? data : {},
  };
  return invokeApi(requestObj);
};

export const List_Website_Module = async (page, limt, data) => {
  const requestObj = {
    path: `api/website_module/list_website_module?page=${page}&limit=${limt}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data ? data : {},
  };
  return invokeApi(requestObj);
};

export const Update_Module_Data = async (id, data) => {
  const requestObj = {
    path: `api/website_module/update_module_data_object/${id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data ? data : {},
  };
  return invokeApi(requestObj);
};

export const List_Website_Module_Against_Page = async (
  page,
  limit,
  id,
  data
) => {
  const requestObj = {
    path: `api/website_module/list_website_module_against_web_page_id/${id}?page=${page}&limit=${limit}&search=${
      data ? data : ""
    }`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Create_Website_Module = async (data) => {
  const requestObj = {
    path: `api/website_module/add_website_module`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const Updating_Website_Module = async (slug, data) => {
  const requestObj = {
    path: `api/website_module/update_website_module/${slug}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data ? data : {},
  };
  return invokeApi(requestObj);
};

export const Get_Web_Mod_Detail = async (slug) => {
  const requestObj = {
    path: `api/website_module/get_website_module/${slug}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const Deleting_Web_Mod = async (slug) => {
  const requestObj = {
    path: `api/website_module/delete_website_module/${slug}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
