import { Button } from "@mui/material";
const LogoutComponent = ({ handleCloseLogoutModal, confirmLogout }) => {
  return (
    <div>
      <h4>Are you sure you want to log out?</h4>
      <div className="mt-4">
        <Button
          size="large"
          variant="contained"
          onClick={confirmLogout}
          className="bg-danger me-2 Logout-Confirmation-Btn"
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          onClick={handleCloseLogoutModal}
          size="large"
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default LogoutComponent;
