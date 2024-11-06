import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../DAL/Login/Login";

const initialState = {
  items: {},
  loading: false,
  error: null,
};

export const Login = createAsyncThunk("auth/login", async (formData) => {
  const response = await login(formData);
  if (response.code === 200) {
    console.log(response, "Message mesaagsse");
    return response;
  } else {
    throw new Error(response.message || "Login failed");
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default AuthSlice.reducer;
