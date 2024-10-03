import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import HomePage from "./Pages/Dashboard/dashBoard";
import Exhibitors from "./Pages/Exhibitors/Exhibitors";
import Events from "./Pages/Events/Events";
import ErrorPage from "./Components/404";
import EditProfile from "./Components/AppHeader/EditProfile";
import EditUser from "./Components/Exhibitors/editUser";
import { useState } from "react";
import AddUser from "./Pages/Exhibitors/addingExhibitor";
import Speaker from "./Pages/Speaker/SpeakerPage";
import EditSpeaker from "./Pages/Speaker/EditSpeaker";
import AddSpeaker from "./Pages/Speaker/AddSpeaker";
import AddEvent from "./Pages/Events/AddEvent";
import EditEvent from "./Pages/Events/EditEvent";
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
    {
      _id: 3,
      name: "Ahmed Ali",
      email: "ahmedali@example.com",
      phoneNumber: "+1 555 123 4567",
      status: true,
      profileImage:
        "https://images.pexels.com/photos/11000150/pexels-photo-11000150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      address: "456 Oak Ave New York 10001 USA",
      jobTitle: "Product Manager",
      company: "Dynamite Lifestyle",
      bio: "Jane is a seasoned product manager with a passion for bringing ideas to life.",
    },
    {
      _id: 4,
      name: "Naruto Janes",
      email: "NJ@example.com",
      phoneNumber: "+1 555 123 4567",
      status: false,
      profileImage:
        "https://images.unsplash.com/photo-1715838854648-ea200803934a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "456 Oak Ave New York 10001 USA",
      jobTitle: "Product Manager",
      company: "Dynamite Lifestyle",
      bio: "Jane is a seasoned product manager with a passion for bringing ideas to life.",
    },
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
        { path: "/speakers", exact: true, element: <Speaker /> },
        {
          path: "/speakers/editspeaker/:id",
          exact: true,
          element: <EditSpeaker />,
        },
        {
          path: "/speakers/addspeaker",
          exact: true,
          element: <AddSpeaker />,
        },
        { path: "/events", exact: true, element: <Events /> },
        { path: "/events/addevent/", exact: true, element: <AddEvent /> },
        { path: "/events/editevent/:id", exact: true, element: <EditEvent /> },
        { path: "/edit-profile", exact: true, element: <EditProfile /> },
        {
          path: "/exhibitors/editexhibitor/:id",
          exact: true,
          element: <EditUser members={members} updateUser={updateUser} />,
        },
        {
          path: "/exhibitors/addexhibitor/",
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
