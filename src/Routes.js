import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import HomePage from "./Pages/Dashboard/dashBoard";
import Exhibitors from "./Pages/Exhibitors/Exhibitors";
import Speaker from "./Pages/Speaker/SpeakerPage";
import Events from "./Pages/Events/Events";
import AllSpeakers from "./Pages/Speaker/AllSpeakers";
import AddSpeaker from "./Pages/Speaker/AddSpeaker";
import ErrorPage from "./404";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/Login",
      exact: true,
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "Dashboard", exact: true, element: <HomePage /> },
        { path: "Exhibitors", exact: true, element: <Exhibitors /> },
        { path: "allspeakerspage", exact: true, element: <AllSpeakers /> },
        { path: "add-speakers", exact: true, element: <AddSpeaker /> },
        { path: "Events", exact: true, element: <Events /> },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />, // Catch-all route for undefined paths (404)
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
