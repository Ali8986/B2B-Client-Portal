import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/Home";

const Router = () => {
  const router = createBrowserRouter([
    { path: "/login", exact: true, element: <LoginPage /> },
    { path: "/home", exact: true, element: <HomePage /> },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
