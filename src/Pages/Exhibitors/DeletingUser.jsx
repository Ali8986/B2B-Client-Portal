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
      <div className="row">
        <div className="col-12 col-sm-7">
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={onConfirm}
          >
            Yes, Delete
          </Button>
        </div>
        <div className="col-12 col-sm-5 mt-3 mt-sm-0">
          <Button variant="outlined" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
      {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>

      </Box> */}
    </Box>
  );
};

export default DeletionConfirmation;
