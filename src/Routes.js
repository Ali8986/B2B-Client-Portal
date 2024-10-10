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
  AddingExhibitor,
  AddingSpeaker,
  EditingExhibitor,
  EditingSpeaker,
} from "./DAL/Login/Login";

const Router = () => {
  const handleNavigation = (nextLocation) => {
    // If the next location is not speakers, remove searchText
    if (nextLocation !== "/speakers") {
      console.log("Navigating away from Speakers, removing searchText");
      localStorage.removeItem("searchText");
    }
  };
  // Listen to the browser's popstate event to detect back/forward navigation
  window.onpopstate = () => handleNavigation(window.location.pathname);

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
        { path: "/events/addevent/", exact: true, element: <AddOrEditEvent /> },
        {
          path: "/events/editevent/:id",
          exact: true,
          element: <AddOrEditEvent />,
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
