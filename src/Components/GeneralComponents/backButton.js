import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <IconButton variant="contained" color="primary" onClick={handleBackClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
