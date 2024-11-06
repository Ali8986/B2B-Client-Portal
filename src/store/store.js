import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authorization/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
