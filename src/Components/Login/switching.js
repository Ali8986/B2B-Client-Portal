import LoginForm from "./loginForm";
import ForgetForm from "../Forget Password/forget";
import OTP from "../Forget Password/oneTimePasswordField";
import ResetPassword from "../Forget Password/ResetPassword";
import { useState } from "react";

const ComponentState = () => {
  const [state, setState] = useState("LoginForm");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Forget = () => setState("ForgetForm");
  const handleOtp = () => setState("OTP");
  const Confirm = () => setState("ResetPassword");
  const Default = () => setState("LoginForm");

  switch (state) {
    case "ForgetForm":
      return (
        <ForgetForm
          handleOtp={handleOtp}
          formData={formData}
          onChange={handleInputChange}
        />
      );
    case "OTP":
      return (
        <OTP
          Confirm={Confirm}
          formData={formData}
          onChange={handleInputChange}
        />
      );
    case "ResetPassword":
      return (
        <ResetPassword
          Default={Default}
          formData={formData}
          onChange={handleInputChange}
        />
      );
    default:
      return (
        <LoginForm
          Forget={Forget}
          formData={formData}
          onChange={handleInputChange}
        />
      );
  }
};

export default ComponentState;
