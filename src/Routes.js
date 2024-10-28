import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import HomePage from "./Pages/Dashboard/dashBoard";
import Exhibitors from "./Pages/Exhibitors/Exhibitors";
import EditOrAddExhibitor from "./Pages/Exhibitors/EditOrAddExhibitor";
import Events from "./Pages/Events/Events";
import ErrorPage from "./Components/404";
import EditProfile from "./Components/AppHeader/EditProfile";
import Speaker from "./Pages/Speaker/SpeakerPage";
import AddOrEditSpeaker from "./Pages/Speaker/AddOrEditSpeaker";
import AddOrEditEvent from "./Pages/Events/AddOrEditEvent";
import ProtectedRoute from "./Components/GeneralComponents/ProtectedRoute";
import TemplateConfiguration from "./Pages/Manage_Website/Template_Management/Template_Configuration";
import AddOrEditTemplate from "./Pages/Manage_Website/Template_Management/AddOrUpdate_Template";
import {
  AddingCompany,
  AddingEvent,
  AddingExhibitor,
  AddingSpeaker,
  Create_Website_Module,
  Creating_Module,
  Creating_Template,
  Creating_Website_Page,
  Editing_Module,
  Editing_Template,
  Editing_Website_Page,
  EditingCompany,
  EditingEvent,
  EditingExhibitor,
  EditingSpeaker,
  Updating_Website_Module,
} from "./DAL/Login/Login";
import AddorEditCompany from "./Pages/company/AddOrEditCompany";
import CompanyDetails from "./Pages/company/Companydetails";
import ModuleConfiguration from "./Pages/Manage_Website/Module_Management/Module_Configuration";
import AddOrUpdateModule from "./Pages/Manage_Website/Module_Management/AddorUpdate_Module";
import WebsitePages from "./Pages/Manage_Website/Website_Pages";
import AddorUpdateWebPages from "./Pages/Manage_Website/AddorUpdate_Pages";
import UpdatePageContent from "./Pages/Manage_Website/UpdatePageContent";
import ManageWebPageModule from "./Pages/Manage_Website/Module_Management/Manage_Website_Module";
import AddOrdEditWebModule from "./Pages/Manage_Website/Module_Management/Add_Or_Edit_Web_Module";
import UpdateWebModData from "./Pages/Manage_Website/Module_Management/Update_Web_Mod_Data";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <LoginPage />,
    },
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/dashboard", index: true, element: <HomePage /> },
        {
          path: "/exhibitors",
          exact: true,
          element: <Exhibitors />,
        },
        { path: "/speakers", exact: true, element: <Speaker /> },
        {
          path: "/speakers/addspeaker",
          element: <AddOrEditSpeaker type={AddingSpeaker} />,
        },
        {
          path: "/speakers/edit/:id",
          element: <AddOrEditSpeaker type={EditingSpeaker} />,
        },
        { path: "/events", exact: true, element: <Events /> },
        {
          path: "/events/addevent/",
          exact: true,
          element: <AddOrEditEvent type={AddingEvent} />,
        },
        {
          path: "/events/editevent/:id",
          exact: true,
          element: <AddOrEditEvent type={EditingEvent} />,
        },
        { path: "/edit-profile", exact: true, element: <EditProfile /> },
        {
          path: "/exhibitors/editexhibitor/:id",
          exact: true,
          element: <EditOrAddExhibitor type={EditingExhibitor} />,
        },
        {
          path: "/exhibitors/addexhibitor/",
          element: <EditOrAddExhibitor type={AddingExhibitor} />,
        },
        { path: "/company", exact: true, element: <CompanyDetails /> },
        {
          path: "/company/addcompany",
          exact: true,
          element: <AddorEditCompany type={AddingCompany} />,
        },
        {
          path: "/company/editcompany/:id",
          exact: true,
          element: <AddorEditCompany type={EditingCompany} />,
        },
        {
          path: "/template-configuration",
          exact: true,
          element: <TemplateConfiguration />,
        },
        {
          path: "/template-configuration/add-template",
          exact: true,
          element: <AddOrEditTemplate type={Creating_Template} />,
        },
        {
          path: "/template-configuration/edit-template/:id",
          exact: true,
          element: <AddOrEditTemplate type={Editing_Template} />,
        },
        {
          path: "/module-configuration",
          exact: true,
          element: <ModuleConfiguration />,
        },
        {
          path: "/module-configuration/add-module",
          exact: true,
          element: <AddOrUpdateModule type={Creating_Module} />,
        },
        {
          path: "/module-configuration/edit-module/:id",
          exact: true,
          element: <AddOrUpdateModule type={Editing_Module} />,
        },
        {
          path: "/website-pages",
          element: <WebsitePages />,
        },
        {
          path: "/website-pages/add-page",
          exact: true,
          element: <AddorUpdateWebPages type={Creating_Website_Page} />,
        },
        {
          path: "/website-pages/edit-page/:id",
          exact: true,
          element: <AddorUpdateWebPages type={Editing_Website_Page} />,
        },
        {
          path: "/website-pages/update-page-content/:id",
          exact: true,
          element: <UpdatePageContent />,
        },
        {
          path: "/website-pages/:webPageId/:module_configuration_slug",
          exact: true,
          element: <ManageWebPageModule />,
        },
        {
          path: "/website-pages/:web_page_id/:id/add-module",
          exact: true,
          element: <AddOrdEditWebModule type={Create_Website_Module} />,
        },
        {
          path: "/website-pages/:id/:id/edit-module/:module_id",
          exact: true,
          element: <AddOrdEditWebModule type={Updating_Website_Module} />,
        },
        {
          path: "/website-pages/:web_page_id/:id/update/:module_title_slug",
          exact: true,
          element: <UpdateWebModData />,
        },
      ],
    },

    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
