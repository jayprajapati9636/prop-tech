import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../container/auth/Loging";
import Register from "../container/auth/Register";
import HomePage from "../container/page/Home";

const Routerr = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Routerr;
