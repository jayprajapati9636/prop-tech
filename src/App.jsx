import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminRoutes from "./Admin/routes/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;
