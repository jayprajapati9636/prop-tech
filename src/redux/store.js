import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"; // Ensure correct path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// ✅ Ensure the default export
export default store;
