import React from "react";
import Modal from "@mui/material/Modal";
import { Avatar, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxWidth: "100%",
  bgcolor: "background.paper",
  border: "1px solid #000",
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
      sx={{ backgroundColor: "rgba(0, 0, 0, 5%)" }}
    >
      <div
        style={style}
        className="Detail_Show_Model container bg-white p-md-4 border-0 rounded-4"
      >
        {component}
      </div>
    </Modal>
  );
};

export default DetailsModal;
