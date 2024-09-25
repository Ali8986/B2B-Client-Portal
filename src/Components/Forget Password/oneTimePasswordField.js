import React from "react";
import FormBox from "../GeneralComponents/Form-Box";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import LogoBox from "../GeneralComponents/Logo-Box";
const OTP = ({ Default, Confirm }) => {
  const [otp, setOtp] = React.useState("");
  const handleClick = () => {
    Default();
  };
  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  return (
    <FormBox>
      <LogoBox />
      <div className="heading-text">
        <h2 className="text-decoration-underline">Email Verification Code</h2>
        <p>we have send a code to your email</p>
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
      <div className="w-100 my-4">
        <Button variant="contained" fullWidth onClick={Confirm}>
          Verify Account
        </Button>
      </div>
    </FormBox>
  );
};

export default OTP;
