import { Button, TextField } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";
import FormBox from "../GeneralComponents/Form-Box";
import LogoBox from "../GeneralComponents/Logo-Box";

const LoginForm = ({ Forget, formData, onChange }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const HandleShowHidePassword = () => {
    if (showPassword === false) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      localStorage.setItem("SnackBarOpeningCount", JSON.stringify(true));
      navigate("/dashboard");
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
            value={formData.email}
            fullWidth
            onChange={(e) => onChange("email", e.target.value)}
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
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={HandleShowHidePassword}>
                  {showPassword && formData.password ? (
                    <Visibility />
                  ) : (
                    <VisibilityOffIcon />
                  )}
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
        <Button type="submit" variant="contained" className="my-2" fullWidth>
          Login
        </Button>
      </form>
    </FormBox>
  );
};

export default LoginForm;
