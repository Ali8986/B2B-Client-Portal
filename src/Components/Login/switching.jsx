import { useState, useEffect } from "react";
import LoginForm from "./loginForm";
import ForgetForm from "../Forget Password/forget";
import OTP from "../Forget Password/oneTimePasswordField";
import ResetPassword from "../Forget Password/ResetPassword";

const ComponentState = () => {
  const [state, setState] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const savedState = localStorage.getItem("formState");
    if (savedState) {
      setState(savedState);
    } else {
      setState("LoginForm");
    }
  }, []);

  useEffect(() => {
    if (state !== null) {
      localStorage.setItem("formState", state);
    }
  }, [state]);

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

  if (state === null) {
    return null;
  }

  switch (state) {
    case "ForgetForm":
      return (
        <ForgetForm
          handleOtp={handleOtp}
          Default={Default}
          formData={formData}
          onChange={handleInputChange}
        />
      );
    case "OTP":
      return (
        <OTP
          Confirm={Confirm}
          Default={Default}
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
