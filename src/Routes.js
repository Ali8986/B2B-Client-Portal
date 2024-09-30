import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import HomePage from "./Pages/Dashboard/dashBoard";
import Exhibitors from "./Pages/Exhibitors/Exhibitors";
import Events from "./Pages/Events/Events";
import AllSpeakers from "./Pages/Speaker/AllSpeakers";
import AddSpeaker from "./Pages/Speaker/AddSpeaker";
import ErrorPage from "./Components/404";
import EditProfile from "./Components/AppHeader/EditProfile";
import EditUser from "./Components/Exhibitors/editUser";
import { useState } from "react";
import AddUser from "./Pages/Exhibitors/addingExhibitor";

const Router = () => {
  const [members, setMembers] = useState([
    {
      _id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "+44 1233 123456",
      status: true,
      profileImage:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      address: "123 Main St London WC2N 5DU UK",
      jobTitle: "Software Engineer",
      company: "Meta Logix Tech",
      bio: "John is a skilled software engineer with over 10 years of experience.",
    },
    {
      _id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phoneNumber: "+1 555 123 4567",
      status: false,
      profileImage:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      address: "456 Oak Ave New York 10001 USA",
      jobTitle: "Product Manager",
      company: "Dynamite Lifestyle",
      bio: "Jane is a seasoned product manager with a passion for bringing ideas to life.",
    },
    // More data
  ]);

  const updateUser = (updatedUser) => {
    if (updatedUser._id) {
      // Update existing user
      setMembers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
    } else {
      // Add new user
      setMembers((prevUsers) => [
        ...prevUsers,
        { ...updatedUser, _id: prevUsers.length + 1 },
      ]);
    }
  };

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
          element: <Exhibitors members={members} updateUser={updateUser} />,
        },
        { path: "/allspeakerspage", exact: true, element: <AllSpeakers /> },
        { path: "/add-speakers", exact: true, element: <AddSpeaker /> },
        { path: "/events", exact: true, element: <Events /> },
        { path: "/update-profile", exact: true, element: <EditProfile /> },
        {
          path: "/exhibitors/edituser/:id",
          exact: true,
          element: <EditUser members={members} updateUser={updateUser} />,
        },
        {
          path: "/exhibitors/adduser",
          element: <AddUser members={members} updateUser={updateUser} />,
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
