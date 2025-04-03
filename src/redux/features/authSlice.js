import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload; // Store admin details
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    },
  },
});

export const { loginAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
