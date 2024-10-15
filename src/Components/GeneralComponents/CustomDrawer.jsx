import * as React from "react";
import Drawer from "@mui/material/Drawer";

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
        <div className="d-flex justify-content-between align-items-center mt-4 mb-1 px-4">
          <div>
          <h2 className="drawer-title">{title}</h2>
          </div>
          <div>
            <div className="close-button mb-1" onClick={() => setIsOpen(false)}>
            &times;
            </div>
          </div>
        </div>
      <div className="Divider"></div>
        <div className="px-4">{component}</div>
      </Drawer>
    </>
  );
};

export default CustomDrawer;