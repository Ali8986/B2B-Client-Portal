import React, { useState } from "react";
import FormBox from "../GeneralComponents/Form-Box";
import { MuiOtpInput } from "mui-one-time-password-input";
import LogoBox from "../GeneralComponents/Logo-Box";
import { confirmPinCode } from "../../DAL/Login/Login";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import SuccessSnackBar from "../SnackBars/SuccessSnackBar";

const OTP = ({ Default, Confirm }) => {
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [email] = React.useState("aliusama.vectorcoder@gmail.com");
  const handleClick = () => {
    Default();
  };
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      verification_code: otp,
      user_type: "admin",
    };
    setLoading(true);
    const response = await confirmPinCode(formData);
    if (response && response.code === 200) {
      console.log("Success: OTP Verified");
      setSnackbarMessage("Success: OTP Verified");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      Confirm();
    } else {
      setLoading(false);
      setSnackbarMessage("Failed to verify OTP");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error(
        "Failed to verify OTP:",
        response?.message || "Unknown error"
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormBox>
        <LogoBox />
        <div className="heading-text">
          <h2 className="text-decoration-underline">Email Verification Code</h2>
          <p>We have sent a code to your email</p>
        </div>
        <div>
          <MuiOtpInput
            value={otp}
            TextFieldsProps={() => ({ size: "small" })}
            onChange={handleChange}
            className="my-2 px-4 otp-input"
            length={6}
          />
        </div>
        <div className="text-end w-100 px-4 py-0 my-0">
          <a href="#home" className="Back-To-Login" onClick={handleClick}>
            Back to Login
          </a>
        </div>
        <div className="w-100 my-2">
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            className="Loading-BTN mt-3"
            fullWidth
            isLoading={loading}
          >
            Verify Account
          </LoadingButton>
        </div>
      </FormBox>
      <SuccessSnackBar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
        duration={2000}
      />
    </form>
  );
};

export default OTP;
