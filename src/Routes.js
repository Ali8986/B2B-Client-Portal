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
import {
  Add_AutoResponder_Message,
  Add_Department,
  AddingEvent,
  AddingExhibitor,
  AddingSpeaker,
  EditingEvent,
  EditingExhibitor,
  EditingSpeaker,
  Update_AutoResponder_Message,
  Update_Department,
} from "./DAL/Login/Login";
import UpdateEventsSpeaker from "./Components/Events/UpdateSpeaker";
import UpdateEventsExhibitor from "./Components/Events/UpdateExhibitor";
import UpdateEventsCompany from "./Components/Events/UpdateCompany";
import Departments from "./Pages/Support_Ticket/Departments/departments";
import AddOrUpdateDepartment from "./Pages/Support_Ticket/Departments/Add_Update_Department";
import AutoResponderMessageList from "./Pages/Support_Ticket/Auto_Responder_Message/AutoResponder_Message_List";
import AddOrUpdateAutoResponder from "./Pages/Support_Ticket/Auto_Responder_Message/Add_Or_Update_AutoResponder";

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
        {
          path: "/events/:id/update-speaker",
          element: <UpdateEventsSpeaker />,
        },
        {
          path: "/events/:id/update-exhibitor",
          exact: true,
          element: <UpdateEventsExhibitor />,
        },
        {
          path: "/events/:id/update-companies",
          exact: true,
          element: <UpdateEventsCompany />,
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
        {
          path: "/departments",
          exact: true,
          element: <Departments />,
        },
        {
          path: "/departments/add-department",
          exact: true,
          element: <AddOrUpdateDepartment type={Add_Department} />,
        },
        {
          path: "/departments/Update/:id",
          exact: true,
          element: <AddOrUpdateDepartment type={Update_Department} />,
        },
        {
          path: "/autoresponder-message",
          exact: true,
          element: <AutoResponderMessageList />,
        },
        {
          path: "/autoresponder-message/add-autoresponder-message",
          exact: true,
          element: (
            <AddOrUpdateAutoResponder type={Add_AutoResponder_Message} />
          ),
        },
        {
          path: "/autoresponder-message/Update/:id",
          exact: true,
          element: (
            <AddOrUpdateAutoResponder type={Update_AutoResponder_Message} />
          ),
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
