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
import AddEvent from "./Pages/Events/AddEvent";
import EditEvent from "./Pages/Events/EditEvent";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <LoginPage />,
    },
    {
      element: <DashboardLayout />,
      children: [
        { path: "/dashboard", index: true, element: <HomePage /> },
        {
          path: "/exhibitors",
          exact: true,
          element: <Exhibitors />,
        },
        { path: "/speakers", exact: true, element: <Speaker /> },
        { path: "/speakers/addspeaker", element: <AddOrEditSpeaker /> },
        { path: "/speakers/edit/:id", element: <AddOrEditSpeaker /> },
        { path: "/events", exact: true, element: <Events /> },
        { path: "/events/addevent/", exact: true, element: <AddEvent /> },
        { path: "/events/editevent/:id", exact: true, element: <EditEvent /> },
        { path: "/edit-profile", exact: true, element: <EditProfile /> },
        {
          path: "/exhibitors/editexhibitor/:id",
          exact: true,
          element: <EditOrAddExhibitor />,
        },
        {
          path: "/exhibitors/addexhibitor/",
          element: <EditOrAddExhibitor />,
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
