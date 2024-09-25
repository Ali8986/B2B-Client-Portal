import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./Assets/Styles/errorpage.css"; // Assuming you'll place styles here

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <div className="error-content">
        <ErrorOutlineIcon className="error-icon" />
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link to="/">
          <Button
            variant="contained"
            className="back-home-btn"
            sx={{
              backgroundColor: "#7396CC",
              "&:hover": {
                backgroundColor: "#7c97c1",
                boxShadow: "0 6px 16px rgba(255, 87, 34, 0.5)",
              },
            }}
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
