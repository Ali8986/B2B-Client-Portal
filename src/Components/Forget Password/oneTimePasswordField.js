import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
const OTP = ({ Confirm }) => {
  const [otp, setOtp] = React.useState("");
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  return (
    <div className="d-flex flex-column justify-content-center text-center align-items-center p-4 login-form">
      <div className="heading-text py-2">
        <h2 className="text-decoration-underline">Email Verification Code</h2>
        <p>we have send a code to your email</p>
      </div>
      <div>
        <MuiOtpInput
          value={otp}
          TextFieldsProps={() => ({ size: "small" })}
          onChange={handleChange}
          className="my-3 otp-input"
        />
      </div>
      <div className="w-100 my-4">
        <Button variant="contained" fullWidth onClick={Confirm}>
          Verify Account
        </Button>
      </div>
    </div>
  );
};

export default OTP;
