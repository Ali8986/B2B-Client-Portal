import React from "react";
import { Button, Typography, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const DeletionConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 4,
      }}
    >
      <WarningIcon sx={{ fontSize: 50, color: "orange" }} />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Are you sure you want to delete this user?
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 3 }}>
        This action cannot be undone.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Yes, Delete
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeletionConfirmation;
