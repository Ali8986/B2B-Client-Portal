import { Button } from "@mui/material";
import FormInput from "../GeneralComponents/FormInput";
import { useState } from "react";
import FormBox from "../GeneralComponents/Form-Box";
import SucessSnackBar from "../SnackBars/SuccessSnackBar";
import LogoBox from "../GeneralComponents/Logo-Box";

const ResetPassword = ({
  size,
  Default,
  formData,
  onChange,
  handleSnackbarClose,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      setSnackbarOpen(true);
      setTimeout(() => {
        Default();
      }, 1000);
    } else {
      setSnackbarOpen(false);
    }
  };
  return (
    <FormBox>
      <LogoBox />
      <SucessSnackBar
        open={snackbarOpen}
        handleClose={(handleSnackbarClose = () => setSnackbarOpen(false))}
        message="Password Changed SuccessFully"
        severity="success"
        duration={2000}
      />
      <div className="heading-text py-2">
        <h2>Change Password</h2>
      </div>
      <div className="underline"></div>
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          size={size}
          label="Old Password"
          type="password"
          value={formData.oldPassword}
          onChange={(e) => onChange("oldPassword", e.target.value)}
        />
        <FormInput
          label="New password"
          type="password"
          value={formData.newPassword}
          onChange={(e) => onChange("newPassword", e.target.value)}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
        />
        <Button type="submit" variant="contained" className="my-2" fullWidth>
          Confirm
        </Button>
      </form>
    </FormBox>
  );
};

export default ResetPassword;
