// CustomSnackbar.js
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SucessSnackBar = ({
  open,
  handleClose,
  message,
  severity = "success",
  duration = 2000,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SucessSnackBar;
