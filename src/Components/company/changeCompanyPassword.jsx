import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, TextField } from "@mui/material";
import {
  UpdateCompanyPassword,
} from "../../DAL/Login/Login";
import { useSnackbar } from "notistack";

const ChangeCompanyPassword = ({ handleClose, selectedObject }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  const showOrHidePassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const showOrHideConfirmPassword = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const formData = {
    new_password: newPassword,
    confirm_password: confirmPassword,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Password Don't Match", { variant: "error" });
      return;
    }
    const response = await UpdateCompanyPassword(
      formData,
      selectedObject.user._id
    );
    if (response.code === 200) {
      handleClose(); //
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  return (
    <>
      <div>
        <div className="text-center">
          <h5>Change Password</h5>
        </div>
        <hr className="mb-4 pb-3" />
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12 mb-3 my-md-0 ">
              <TextField
                InputProps={{
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
            <div className="col-12">
              <TextField
                InputProps={{
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
              size="large"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeCompanyPassword;
