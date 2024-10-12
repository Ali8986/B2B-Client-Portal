import React from "react";
import Modal from "@mui/material/Modal";
import { Avatar, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 3,
};

const DeletingModal = ({ open, handleClose, component }) => {
  return (
    <Modal
      className="main-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ backgroundColor: "rgba(0, 0, 0, 5%)", padding: "0px" }}
    >
      <div
        style={style}
        className="container bg-white text-center py-md-2 px-4 border-0 rounded-4 confirmation-btn"
      >
        <div className=" delete-modal-close" onClick={handleClose}>
          &times;
        </div>
        {component}
      </div>
    </Modal>
  );
};

export default DeletingModal;
