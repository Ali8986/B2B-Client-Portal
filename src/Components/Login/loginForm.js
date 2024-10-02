import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";
import { login } from "../../DAL/Login/Login"; // Import the login API function
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";
import LoadingButton from "../GeneralComponents/buttonLoadingState";

const LoginForm = ({ Forget }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const HandleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
      user_type: "admin",
    };
    setLoading(true);
    const response = await login(formData);
    console.log("Login response:", response.token);

    if (response.code === 200) {
      console.log("Code is", response.code);
      localStorage.setItem("token", response.token);
      localStorage.setItem("SnackBarOpeningCount", JSON.stringify(true));
      localStorage.setItem("Email", JSON.stringify(email));
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/dashboard");
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  return (
    <FormBox>
      <LogoBox />
      <div className="heading-text py-2 mt-3">
        <h2>Login</h2>
      </div>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <TextField
            className="my-2"
            autoComplete="username"
            label="Email"
            type="email"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              endAdornment: <ContactMailIcon />,
            }}
          />
          <TextField
            className="my-2"
            autoComplete="current-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={HandleShowHidePassword}>
                  {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                </IconButton>
              ),
            }}
          />
        </div>
        <div className="text-end w-100">
          <Button
            variant="text"
            className="text-decoration-underline"
            onClick={Forget}
            startIcon={<LockResetIcon />}
          >
            Forget Password?
          </Button>
        </div>
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          className="Loading-BTN mt-3"
          isLoading={loading}
        >
          Login
        </LoadingButton>
      </form>
    </FormBox>
  );
};

export default LoginForm;
