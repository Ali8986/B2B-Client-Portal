import { Button, TextField } from "@mui/material";
import React from "react";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoginIcon from "@mui/icons-material/Login";
import LockResetIcon from "@mui/icons-material/LockReset";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ Forget, formData, onChange }) => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      navigate("/HomePage");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3 text-center login-form">
      <div className="icon">
        <LockOpenIcon className="Logo" />
      </div>
      <div className="heading-text py-2">
        <h2>Login</h2>
      </div>
      <div className="underline"></div>
      <form onSubmit={handleSubmit}>
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
          label="Enter Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          required
          InputProps={{
            endAdornment: <VisibilityIcon />,
          }}
        />
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
        <Button
          type="submit"
          variant="contained"
          className="my-2"
          fullWidth
          endIcon={<LoginIcon />}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
