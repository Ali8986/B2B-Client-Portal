import React from "react";
import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <Button
      {...props}
      startIcon={isLoading ? <CircularProgress size={15} /> : null}
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
