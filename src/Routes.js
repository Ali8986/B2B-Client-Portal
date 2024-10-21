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
import TemplateConfiguration from "./Pages/Manage_Website/Template_Configuration.js";
import AddOrEditTemplate from "./Pages/Manage_Website/AddOrUpdate_Template.js";
import {
  AddingCompany,
  AddingEvent,
  AddingExhibitor,
  AddingSpeaker,
  Creating_Module,
  Creating_Template,
  Editing_Module,
  Editing_Template,
  EditingCompany,
  EditingEvent,
  EditingExhibitor,
  EditingSpeaker,
} from "./DAL/Login/Login";
import AddorEditCompany from "./Pages/company/AddOrEditCompany";
import CompanyDetails from "./Pages/company/Companydetails";
import ModuleConfiguration from "./Pages/Manage_Website/Module_Configuration.js";
import AddOrUpdateModule from "./Pages/Manage_Website/AddorUpdate_Module.js";

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
