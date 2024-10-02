import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, TextField } from "@mui/material";
import { updateAdminPassword } from "../../DAL/Login/Login";
import SnackBar from "../SnackBars/errorSnackbar";

const ChangePassword = ({ handleClose }) => {
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  const [success, setSuccess] = useState(false);

  const showOrHidePassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const showOrHideConfirmPassword = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };
  const showOrHideOldPassword = () => {
    setOldPasswordVisibility(!oldPasswordVisibility);
  };

  const formData = {
    old_password: oldPassword,
    new_password: newPassword,
    confirm_password: confirmPassword,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSnackBarOpen(true);
      setSnackbarMessage("Password Do not match");
      return;
    }
    const response = await updateAdminPassword(formData);
    if (response.code === 200) {
      setSuccess(true);
      handleClose(); //
    } else {
      setSnackBarOpen(true);
      setSnackbarMessage(response.message);
    }
  };

  return (
    <>
      <div>
        <div className="text-center">
          <SnackBar
            open={snackbarOpen}
            severity="error"
            message={snackbarMessage}
            handleClose={() => setSnackBarOpen(false)}
            duration={1000}
          />
          <h5>Change Password</h5>
        </div>

        {success && (
          <div style={{ color: "green" }}>Password updated successfully!</div>
        )}

        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 my-3">
              <TextField
                InputProps={{
                  style: { borderRadius: 20 },
                  endAdornment: (
                    <IconButton onClick={showOrHideOldPassword}>
                      {oldPasswordVisibility ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  ),
                }}
                type={oldPasswordVisibility ? "password" : "text"}
                variant="outlined"
                label="Old Password"
                fullWidth
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-6 mb-3 my-md-0 ">
              <TextField
                InputProps={{
                  style: { borderRadius: 20 },
                  endAdornment: (
                    <IconButton onClick={showOrHidePassword}>
                      {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                type={passwordVisibility ? "password" : "text"}
                variant="outlined"
                label="New Password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                InputProps={{
                  style: { borderRadius: 20 },
                  endAdornment: (
                    <IconButton onClick={showOrHideConfirmPassword}>
                      {confirmPasswordVisibility ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  ),
                }}
                type={confirmPasswordVisibility ? "password" : "text"}
                variant="outlined"
                label="Confirm Password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="my-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: "10px" }}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
