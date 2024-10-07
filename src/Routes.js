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
import { useEffect, useState } from "react";
import ProtectedRoute from "./Components/GeneralComponents/ProtectedRoute";
import { AddingSpeaker, EditingSpeaker } from "./DAL/Login/Login";
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
