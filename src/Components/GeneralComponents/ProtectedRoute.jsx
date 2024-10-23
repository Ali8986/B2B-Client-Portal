import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/" replace />;
  }

  // If token exists, render the children (dashboard routes)
  return children;
};

export default ProtectedRoute;
