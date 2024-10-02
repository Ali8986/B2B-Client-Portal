import FormInput from "../GeneralComponents/FormInput";
import { useState } from "react";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";
import { updatePassword } from "../../DAL/Login/Login";
import SuccessSnackBar from "../SnackBars/SuccessSnackBar";
import LoadingButton from "../GeneralComponents/buttonLoadingState";

const ResetPassword = ({ size, Default, onChange, handleSnackbarClose }) => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [formData, setFormData] = useState({
    email: "aliusama.vectorcoder@gmail.com",
    user_type: "admin",
    password: "",
    confirm_password: "",
  });
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      setLoading(true);
      const response = await updatePassword(formData);
      if (response.code === 200) {
        setSnackbarOpen(true);
        setSnackbarMessage("Password updated successfully");
        setSnackbarSeverity("success");
        console.log(formData);
        setTimeout(() => {
          Default();
        }, 1000);
      } else {
        setSnackbarOpen(true);
        setSnackbarMessage(response.message);
        setSnackbarSeverity("error");
        setLoading(false);
      }
    } else {
      setSnackbarOpen(false);
    }
  };
  return (
    <FormBox>
      <LogoBox />
      <div className="heading-text py-2">
        <h2>Change Password</h2>
      </div>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
        <FormInput
          size={size}
          label="New Password"
          type="password"
          value={formData.password}
          required
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {/* <FormInput
          label="New password"
          type="password"
          value={formData.newPassword}
          onChange={(e) => handleChange("newPassword", e.target.value)}
          required
        /> */}
        <FormInput
          label="Confirm Password"
          type="password"
          value={formData.confirm_password}
          onChange={(e) => handleChange("confirm_password", e.target.value)}
          required
        />
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          className="Loading-BTN mt-3"
          fullWidth
          isLoading={loading}
        >
          Confirm
        </LoadingButton>
      </form>

      <SuccessSnackBar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
        duration={2000}
      />
    </FormBox>
  );
};

export default ResetPassword;
