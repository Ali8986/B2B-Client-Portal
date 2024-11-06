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
import { useSnackbar } from "notistack";
import LoadingButton from "../GeneralComponents/buttonLoadingState";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../store/authorization/authSlice";

const LoginForm = ({ Forget }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const HandleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
      user_type: "company",
    };

    // Dispatch the Login thunk and await the result
    const response = await dispatch(Login(formData));

    if (Login.fulfilled.match(response)) {
      console.log(response, "response");
      const { user, token, message } = response.payload;
      localStorage.setItem("id", user._id);
      localStorage.setItem("token", token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("image", user.image.thumbnail_1);
      localStorage.setItem("Email", JSON.stringify(email));
      localStorage.setItem("company", JSON.stringify(user));
      enqueueSnackbar(message, { variant: "success" });
      navigate("/dashboard");
    } else if (Login.rejected.match(response)) {
      enqueueSnackbar(response.error.message || "Login failed", {
        variant: "error",
      });
    }
  };

  return (
    <FormBox>
      <LogoBox />
      <div className='heading-text py-2 mt-3'>
        <h2>Login</h2>
      </div>
      <div className='underline'></div>
      <form onSubmit={handleSubmit}>
        <div className='mt-2'>
          <TextField
            className='my-2'
            autoComplete='username'
            label='Email'
            type='email'
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              endAdornment: <ContactMailIcon />,
            }}
          />
          <TextField
            className='my-2'
            autoComplete='current-password'
            label='Password'
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
        <div className='text-end w-100'>
          <Button
            variant='text'
            className='text-decoration-underline'
            onClick={Forget}
            startIcon={<LockResetIcon />}
          >
            Forget Password?
          </Button>
        </div>
        <LoadingButton
          type='submit'
          size='large'
          variant='contained'
          className='Loading-BTN mt-3'
          isLoading={loading}
        >
          Login
        </LoadingButton>
      </form>
    </FormBox>
  );
};

export default LoginForm;
