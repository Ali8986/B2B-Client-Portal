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

export const CompanyList = async (page, limt) => {
  const requestObj = {
    path: `api/company/list_company`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
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
      "Content-Type": "multipart/form-data",
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
