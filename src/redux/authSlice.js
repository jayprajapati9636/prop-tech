// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  admin: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      state.token = null;
    },
  },
});

export const { loginAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
