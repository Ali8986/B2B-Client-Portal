import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const CustomDrawer = ({ isOpen, setIsOpen, title, component }) => {
  return (
    <>
      <Drawer
        anchor={"right"}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="m-0"
        PaperProps={{ className: "exhibitor-form-div" }}
      >
        <div className="d-flex justify-content-between align-items-center my-2 px-4">
          <h2 className="drawer-title">{title}</h2>
          <div class="close-button" onClick={() => setIsOpen(false)}>
            &times;
          </div>
        </div>
        <Divider className="divider" />
        <div className="px-4">{component}</div>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
