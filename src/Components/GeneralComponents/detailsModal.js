import React from "react";
import Modal from "@mui/material/Modal";
import { Avatar, TextField } from "@mui/material";
import { Height } from "@mui/icons-material";

const style = {
  height: "90%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxWidth: "90%",
  bgcolor: "background.paper",
  boxShadow: 3,
  p: 4,
};

const DetailsModal = ({ open, handleClose, component }) => {
  return (
    <Modal
      className="Details_Modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 5%)",
      }}
    >
      <div
        style={style}
        className="Detail_Show_Model container bg-white mx-1 my-2 m-md-0 pt-2 pt-md-4 pb-3 pb-md-5 px-md-5 border-0 rounded-4"
      >
        {component}
      </div>
    </Modal>
  );
};

export default DetailsModal;
