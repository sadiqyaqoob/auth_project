import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";

import { EmailVerify, Home, Login, ResetPassword } from "./pages";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPasswod" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
      </Routes>
    </>
  );
};

export default App;
