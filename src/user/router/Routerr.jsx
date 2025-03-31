import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../component/Login"; 
import Register from "../component/Register"; 

const Routerr = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routerr;
